<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'coupon_code',
        'discount_type',
        'discount_value',
        'categories',
        'valid_from',
        'valid_untill',
        'usage_limit',
        'used_count',
        'status'
    ];
}
