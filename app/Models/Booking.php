<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_no',
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
        'pickup_address',
        'dropoff_address',
        'duration',
        'propose',
        'number_of_people',
        'number_of_passengers',
        'number_of_luggage',
        'pricing_option_id',
        'prefered_date',
        'booking_source',
        'flight_number',
        'discount_or_extra',
        'airport_or_intercity',
        'service_types',
        'road_types',
        'car_type',
        'city_id',
        'city_a_id',
        'city_b_id',
        'activity_type',
        'time_preference',
        'created_by',
        'terms_accepted',
        'full_name',
        'additional_notes',
        'booking_language'
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

    /**
     * Accessor to get the combined name from first_name and last_name
     */
    public function getNameAttribute()
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Accessor to get booking reference (use booking ID since no invoice_no exists)
     */
    public function getReferenceAttribute()
    {
        // For pending bookings, show 'N/A', otherwise use booking ID
        return $this->status === 'Pending' ? 'N/A' : 'BK-' . str_pad($this->id, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Generate a unique invoice number for this booking using booking ID
     */
    public static function generateInvoiceNumber($bookingId = null)
    {
        // If no booking ID provided, get the next auto-increment value
        if (!$bookingId) {
            $statement = \DB::select("SHOW TABLE STATUS LIKE 'bookings'");
            $bookingId = $statement[0]->Auto_increment;
        }
        
        // Simple formula: 500 + booking ID
        // This ensures consistency and no synchronization issues
        $dateString = date('Ymd');
        $invoiceNumber = 500 + $bookingId;
        
        // Format: INV-YYYYMMDD-####
        return 'INV-' . $dateString . '-' . str_pad($invoiceNumber, 4, '0', STR_PAD_LEFT);
    }
    
    /**
     * Boot method to generate invoice number on creation
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($booking) {
            // Generate invoice number if not set
            if (!$booking->invoice_no) {
                $booking->invoice_no = self::generateInvoiceNumber();
            }
        });
        
        static::created(function ($booking) {
            // Update invoice number with actual booking ID if needed
            $expectedInvoiceNo = self::generateInvoiceNumber($booking->id);
            if ($booking->invoice_no !== $expectedInvoiceNo) {
                $booking->invoice_no = $expectedInvoiceNo;
                $booking->saveQuietly(); // Save without triggering events
            }
        });
    }

    /**
     * Accessor to get check-in date based on category
     */
    public function getCheckInAttribute()
    {
        if ($this->category_id == 2) {
            // Car Rental uses pickup_date
            return $this->pickup_date;
        }
        // Other categories use prefered_date
        return $this->prefered_date;
    }

    /**
     * Accessor to get check-out date based on category
     */
    public function getCheckOutAttribute()
    {
        if ($this->category_id == 2) {
            // Car Rental uses dropoff_date
            return $this->dropoff_date;
        }
        // For other categories, check_out is same as check_in (single-day activities)
        return $this->prefered_date;
    }

    /**
     * Accessor to provide total_amount alias for total_price
     */
    public function getTotalAmountAttribute()
    {
        return $this->total_price;
    }

    /**
     * Accessor to provide currency
     */
    public function getCurrencyAttribute()
    {
        return '€';
    }
}
