<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Coupon;
use App\Services\CouponService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CouponController extends Controller
{
    protected $couponService;
    protected $layout = 'layouts.dashboard_admin';

    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }

    public function list(Request $request)
    {
        $coupons = $this->couponService->getAll();

        return view('coupons.list')->with([
            'layout' => $this->layout,
            'coupons' => $coupons
        ]);
    }

    public function new(Request $request)
    {
        $categories = Category::orderBy('category')->get();
        return view('coupons.add')->with([
            'layout' => $this->layout,
            'categories' => $categories
        ]);
    }

    public function insert(Request $request)
    {
        $validate = $request->validate([
            'coupon_code' => 'nullable|unique:coupons,coupon_code',
            'discount_value' => 'required|numeric'
        ]);

        if (empty($request->coupon_code)) {
            $request->merge([
                'coupon_code' => $this->generateUniqueCouponCode()
            ]);
        }
        
        $categories = implode(',', $request->categories ?? []);

        $this->couponService->store($request->coupon_code, $request->discount_type, $request->discount_value, $request->valid_from, $request->valid_untill, $request->usage_limit, $categories);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $categories = Category::orderBy('category')->get();

        return view('coupons.update')->with([
            'layout' => $this->layout,
            'categories' => $categories,
            'coupon' => $coupon
        ]);
    }

    public function update(Request $request)
    {
        $validate = $request->validate([
            'coupon_code' => 'required|unique:coupons,coupon_code,' . $request->id,
            'discount_value' => 'required|numeric'
        ]);
        $coupon = Coupon::findOrFail($request->id);
        $categories = implode(',', $request->categories ?? []);

        $this->couponService->update(
            $request->id,
            $request->coupon_code,
            $request->discount_type,
            $request->discount_value,
            $request->valid_from,
            $request->valid_untill,
            $request->usage_limit,
            $request->status,
            $categories
        );

        return back()->with('updated', true);
    }

    public function delete(Request $request)
    {
        $this->couponService->delete($request->id);

        return 'success';
    }

    private function generateUniqueCouponCode($length = 8)
    {
        do {
            $code = strtoupper(Str::random($length));
        } while (Coupon::where('coupon_code', $code)->exists());

        return $code;
    }
}
