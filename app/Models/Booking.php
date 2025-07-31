<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'listing_id',
        'first_name',
        'last_name',
        'email',
        'whatsapp',
        'whatsapp_number',
        'country',
        'country_of_residence',
        'status',
        'age',
        'date_of_birth',
        'booking_price',
        'total_addons',
        'total_price',
        'net_agency_price',
        'commission_amount',
        'notes',
        'pickup_date',
        'pickup_time',
        'dropoff_date',
        'dropoff_time',
        'pickup_location',
        'droppoff_location',
        'duration',
        'propose',
        'number_of_people',
        'pricing_option_id',
        'prefered_date',
        'booking_source',
        'flight_number',
        'discount_or_extra',
        'airport_or_intercity',
        'car_type',
        'city_id',
        'city_a_id',
        'city_b_id',
        'activity_type',
        'created_by',
        'terms_accepted',
        'full_name',
        'additional_notes'
    ];

    public function addons()
    {
        return $this->hasMany(BookingAddon::class, 'booking_id');
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class, 'listing_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'Pending');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'Confirmed');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'Completed');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'Cancelled');
    }
}
