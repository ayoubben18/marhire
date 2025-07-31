<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
    public function list(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $cities = City::all();

        return view('cities.list')->with([
            'layout' => $layout,
            'cities' => $cities
        ]);
    }

    public function insert(Request $request)
    {
        $request->validate([
            'city' => 'required'
        ]);

        City::create([
            'city_name' => $request->city
        ]);

        return 'success';
    }

    public function update(Request $request)
    {
        $city = City::findOrFail($request->id);

        $city->update([
            'city_name' => $request->city
        ]);

        return 'success';
    }

    public function delete(Request $request)
    {
        $city = City::findOrFail($request->id);

        $city->delete();

        return 'success';
    }
    public function get_cities(Request $request)
    {
        $cities = City::orderBy('city_name')->get();

        return response()->json(['cities' => $cities]);
    }
}

