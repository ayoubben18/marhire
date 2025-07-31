<?php

namespace App\Http\Controllers;

use App\Models\SubCategoryOption;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Category;
use App\Models\SubCategory;
use Auth;

class SubCategoryController extends Controller
{
    public function list(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $subcategories = SubCategory::latest()->get();

        return view('subcategories.list')->with([
                                          'layout' => $layout, 
                                          'subcategories' => $subcategories
                                        ]);
    }

    public function new(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $categories = Category::orderBy('category')->get();
        return view('subcategories.add')->with([
                                        'layout' => $layout,
                                        'categories' => $categories
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'subcategory' => 'required',
            'id_category' => ['required', Rule::notIn([-1])]
        ]);

        $imageName = '';
        if($request->hasFile('logo'))
		{
			$imageName = 'logo_' . uniqid() . '.' . $request->logo->extension();  
     
        	$request->logo->move(public_path('images') . '/logos', $imageName);
			
			$imageName = 'images/logos/' . $imageName;
		}

        $subcategory = SubCategory::create([
            'subcategory' => $request->subcategory,
            'short_description' => $request->short_description,
            'logo' => $imageName,
            'id_category' => $request->id_category
        ]);

        if($subcategory && $request->has('options'))
        {
            foreach($request->options as $option)
            {
                SubCategoryOption::create([
                    'option' => $option,
                    'subcategory_id' => $subcategory->id
                ]);
            }
        }

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = Auth::user()->isAdmin()?'layouts.dashboard_admin':'layouts.dashboard';
        $categories = Category::orderBy('category')->get();
        $subcategory = SubCategory::where('id', $id)->with('options')->first();

        if($subcategory)
        {
            return view('subcategories.update')->with([
                                                'layout' => $layout,
                                                'categories' => $categories,
                                                'subcategory' => $subcategory
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'subcategory' => 'required'
        ]);

        $optionsIds = collect($request->input('options'))
                    ->pluck('id')
                    ->filter();

        $subcategory = SubCategory::findOrFail($request->id);

        $imageName = $subcategory->logo;
        if($request->hasFile('logo'))
		{
			$imageName = 'logo_' . uniqid() . '.' . $request->logo->extension();  
     
        	$request->logo->move(public_path('images') . '/logos', $imageName);
			
			$imageName = 'images/logos/' . $imageName;
		}

        $subcategory->update([
            'id_category' => $request->id_category,
            'subcategory' => $request->subcategory,
            'short_description' => $request->short_description,
            'logo' => $imageName
        ]);

        SubCategoryOption::where('subcategory_id', $subcategory->id)
                          ->whereNotIn('id', $optionsIds)
                          ->delete();
                          
        foreach ($request->options ?? [] as $option) {
            if (!empty($option['id'])) {
                SubCategoryOption::where('id', $option['id'])->update(['option' => $option['name']]);
            } else {
                SubCategoryOption::create([
                    'option' => $option['name'],
                    'subcategory_id' => $subcategory->id
                ]);
            }
        }

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $subcategory = SubCategory::findOrFail($request->id);

        $subcategory->delete();
        return 'success';
    }

    public function getOptions(Request $request)
    {
        $options = SubCategoryOption::where('subcategory_id', $request->subcategory_id)
                                    ->orderBy('option')
                                    ->get();

        return response()->json($options);
    }
}
