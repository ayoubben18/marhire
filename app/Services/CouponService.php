<?php

namespace App\Services;
use App\Models\Coupon;

class CouponService
{
    public function getAll(){
        $coupons = Coupon::latest()->get();

        return $coupons;
    }

    public function store($couponCode, $discountType, $discountValue, $validFrom, $validUntill, $usageLimit, $categories=''):Coupon
    {   
        return Coupon::create([
            'coupon_code' => $couponCode,
            'discount_type' => $discountType,
            'discount_value' => $discountValue,
            'categories' => $categories,
            'valid_from' => $validFrom,
            'valid_untill' => $validUntill,
            'usage_limit' => $usageLimit
        ]);
    }

    public function update($id, $couponCode, $discountType, $discountValue, $validFrom, $validUntill, $usageLimit, $status, $categories = '')
    {
        $coupon = Coupon::findOrFail($id);

        return $coupon->update([
            'coupon_code' => $couponCode,
            'discount_type' => $discountType,
            'discount_value' => $discountValue,
            'valid_from' => $validFrom,
            'valid_untill' => $validUntill,
            'usage_limit' => $usageLimit,
            'categories' => $categories,
            'status' => $status
        ]);
    }

    public function delete($id)
    {
        return Coupon::where('id', $id)->delete();
    }
}