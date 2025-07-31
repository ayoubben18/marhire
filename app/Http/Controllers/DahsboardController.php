<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Booking;
use App\Models\Category;
use App\Models\City;
use App\Models\Coupon;
use App\Models\Listing;
use Illuminate\Http\Request;
use Carbon;

class DahsboardController extends Controller
{
    public function index()
    {
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $agenciesCount = Agency::count();
        $listingsCount = Listing::count();
        $couponsCount = Coupon::where('status', 'Active')->count();
        $totalBookings = Booking::whereIn('status', ['Confirmed', 'Completed'])->sum('total_price');
        $pendingCount = Booking::pending()->count();
        $confirmedCount = Booking::confirmed()->count();
        $completedCount = Booking::completed()->count();
        $cancelledCount = Booking::cancelled()->count();

        return view('admin_dashboard')->with([
            'cities' => $cities,
            'categories' => $categories,
            'agenciesCount' => $agenciesCount,
            'listingsCount' => $listingsCount,
            'couponsCount' => $couponsCount,
            'totalBookings' => $totalBookings,
            'pendingCount' => $pendingCount,
            'confirmedCount' => $confirmedCount,
            'completedCount' => $completedCount,
            'cancelledCount' => $cancelledCount
        ]);
    }
}
