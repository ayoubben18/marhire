<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\Agency;
use Auth;

class CategoryController extends Controller
{
    public function list(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $categories = Category::latest()->get();

        return view('categories.list')->with([
                                          'layout' => $layout, 
                                          'categories' => $categories
                                        ]);
    }

    public function new(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        return view('categories.add')->with([
                                        'layout' => $layout
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'category' => 'required'
        ]);

        $imageName = '';
        if($request->hasFile('logo'))
		{
			$imageName = 'logo_' . uniqid() . '.' . $request->logo->extension();  
     
        	$request->logo->move(public_path('images') . '/logos', $imageName);
			
			$imageName = 'images/logos/' . $imageName;
		}

        Category::create([
            'category' => $request->category,
            'short_description' => $request->short_description,
            'logo' => $imageName
        ]);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = Auth::user()->isAdmin()?'layouts.dashboard_admin':'layouts.dashboard';
        $category = Category::where('id', $id)->first();

        if($category)
        {
            return view('categories.update')->with([
                                                'layout' => $layout,
                                                'category' => $category
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'category' => 'required'
        ]);

        $category = Category::findOrFail($request->id);

        $imageName = $category->logo;
        if($request->hasFile('logo'))
		{
			$imageName = 'logo_' . uniqid() . '.' . $request->logo->extension();  
     
        	$request->logo->move(public_path('images') . '/logos', $imageName);
			
			$imageName = 'images/logos/' . $imageName;
		}

        $category->update([
            'category' => $request->category,
            'short_description' => $request->short_description,
            'logo' => $imageName
        ]);

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $category = Category::findOrFail($request->id);

        $category->delete();
        return 'success';
    }

    public function getSubcategories(Request $request)
    {
        $subcategories = SubCategory::where('id_category', $request->category_id)
                                    ->orderBy('subcategory')
                                    ->get();

        return response()->json($subcategories);
    }

    public function getCategoryData(Request $request){
        $addons = ListingAddon::where('category_id', $request->category_id)
                                    ->orderBy('addon')
                                    ->get();
        $providers = Agency::where('category_id', $request->category_id)
                                    ->orderBy('agency_name')
                                    ->get();

        return response()->json([
            'addons' => $addons,
            'providers' => $providers
        ]);
    }

    public function getListings(Request $request){
        $listings = Listing::where('category_id', $request->category_id)
                                    ->orderBy('title')
                                    ->get();

        return response()->json([
            'listings' => $listings
        ]);
    }

    public function get_categories(Request $request)
    {
        $categories = Category::orderBy('category')->get();

        return response()->json(['categories' => $categories]);
    }
}
