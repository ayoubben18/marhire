<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListingAddon;
use App\Models\Category;
use Auth;

class ListingAddonController extends Controller
{
    public function list(Request $request){
        $layout = 'layouts.dashboard_admin';
        $listingAddons = ListingAddon::latest()->get();

        return view('listing_addons.list')->with([
                                          'layout' => $layout, 
                                          'listingAddons' => $listingAddons
                                        ]);
    }

    public function new(Request $request){
        $layout = 'layouts.dashboard_admin';
        $categories = Category::orderBy('category')->get();

        return view('listing_addons.add')->with([
                                        'layout' => $layout,
                                        'categories' => $categories
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'addon' => 'required',
            'category_id' => 'required',
            'price' => 'required'
        ]);

        ListingAddon::create([
            'addon' => $request->addon,
            'category_id' => $request->category_id,
            'price' => $request->price
        ]);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = 'layouts.dashboard_admin';
        $listingAddon = ListingAddon::where('id', $id)->first();
        $categories = Category::orderBy('category')->get();

        if($listingAddon)
        {
            return view('listing_addons.update')->with([
                                                'layout' => $layout,
                                                'categories' => $categories,
                                                'listingAddon' => $listingAddon
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'addon' => 'required',
            'category_id' => 'required',
            'price' => 'required'
        ]);

        $listingAddon = ListingAddon::findOrFail($request->id);

        $listingAddon->update([
            'addon' => $request->addon,
            'category_id' => $request->category_id,
            'price' => $request->price
        ]);

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $listingAddon = ListingAddon::findOrFail($request->id);

        $listingAddon->delete();
        return 'success';
    }

    public function getAddons(Request $request)
    {
        $addons = ListingAddon::where('category_id', $request->category_id)
                                ->orderBy('addon')
                                ->get();

        return response()->json($addons);
    }
}
