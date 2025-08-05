<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'recipient_email',
        'recipient_type',
        'email_type',
        'status',
        'error_message',
        'pdf_path',
        'email_data',
        'retry_count',
        'sent_at'
    ];

    protected $casts = [
        'email_data' => 'array',
        'sent_at' => 'datetime'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class)->withDefault();
    }

    public function scopeSending($query)
    {
        return $query->where('status', 'sending');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeSent($query)
    {
        return $query->where('status', 'sent');
    }
    
    public function scopeSkipped($query)
    {
        return $query->where('status', 'skipped');
    }

    public function incrementRetryCount()
    {
        $this->increment('retry_count');
    }

    public function markAsSent()
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => now()
        ]);
    }

    public function markAsFailed($errorMessage = null)
    {
        $this->update([
            'status' => 'failed',
            'error_message' => $errorMessage
        ]);
    }
}
