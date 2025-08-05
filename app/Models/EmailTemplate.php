<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $fillable = [
        'category', 
        'event_type', 
        'subject', 
        'body_html', 
        'default_body_html', 
        'default_subject', 
        'available_variables',
        'is_active'
    ];
    
    protected $casts = [
        'available_variables' => 'json',
        'is_active' => 'boolean'
    ];
    
    public function resetToDefault()
    {
        $this->body_html = $this->default_body_html;
        $this->subject = $this->default_subject;
        $this->save();
    }
    
    public static function getDefaultTemplates()
    {
        return [
            'booking_received' => [
                'subject' => 'Booking Received - {{booking_reference}}',
                'body' => self::getDefaultBookingReceivedTemplate()
            ],
            'booking_confirmed' => [
                'subject' => 'Booking Confirmed - {{booking_reference}}',
                'body' => self::getDefaultBookingConfirmedTemplate()
            ],
            'booking_cancelled' => [
                'subject' => 'Booking Cancelled - {{booking_reference}}',
                'body' => self::getDefaultBookingCancelledTemplate()
            ],
            'booking_reminder' => [
                'subject' => 'Reminder: Your booking is coming up - {{booking_reference}}',
                'body' => self::getDefaultReminderTemplate()
            ]
        ];
    }
    
    private static function getDefaultBookingReceivedTemplate()
    {
        return '<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }
        .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MarHire</h1>
            <p>Booking Received</p>
        </div>
        <div class="content">
            <p>Dear {{client_name}},</p>
            <p>Thank you for your booking request. We have received your booking and will review it shortly.</p>
            
            <div class="booking-details">
                <h3>Booking Details:</h3>
                <p><strong>Reference:</strong> {{booking_reference}}</p>
                <p><strong>Service:</strong> {{listing_title}}</p>
                <p><strong>Date:</strong> {{check_in_date}}</p>
                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>
            </div>
            
            <p>You will receive a confirmation email once your booking has been approved.</p>
            <p>If you have any questions, please contact us at {{admin_email}}</p>
            
            <p>Best regards,<br>The MarHire Team</p>
        </div>
        <div class="footer">
            <p>© 2025 MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>';
    }
    
    private static function getDefaultBookingConfirmedTemplate()
    {
        return '<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }
        .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
        .success { color: #27ae60; font-weight: bold; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MarHire</h1>
            <p>Booking Confirmed</p>
        </div>
        <div class="content">
            <p>Dear {{client_name}},</p>
            <p class="success">Great news! Your booking has been confirmed.</p>
            
            <div class="booking-details">
                <h3>Confirmed Booking Details:</h3>
                <p><strong>Reference:</strong> {{booking_reference}}</p>
                <p><strong>Service:</strong> {{listing_title}}</p>
                <p><strong>Check-in Date:</strong> {{check_in_date}}</p>
                <p><strong>Check-out Date:</strong> {{check_out_date}}</p>
                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>
            </div>
            
            <p>Please keep this confirmation for your records.</p>
            <p>If you have any questions, please contact us at {{admin_email}}</p>
            
            <p>We look forward to serving you!</p>
            
            <p>Best regards,<br>The MarHire Team</p>
        </div>
        <div class="footer">
            <p>© 2025 MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>';
    }
    
    private static function getDefaultBookingCancelledTemplate()
    {
        return '<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }
        .header { background-color: #e74c3c; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
        .cancelled { color: #e74c3c; font-weight: bold; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MarHire</h1>
            <p>Booking Cancelled</p>
        </div>
        <div class="content">
            <p>Dear {{client_name}},</p>
            <p class="cancelled">Your booking has been cancelled.</p>
            
            <div class="booking-details">
                <h3>Cancelled Booking Details:</h3>
                <p><strong>Reference:</strong> {{booking_reference}}</p>
                <p><strong>Service:</strong> {{listing_title}}</p>
                <p><strong>Original Date:</strong> {{check_in_date}}</p>
            </div>
            
            <p>If you believe this is an error or would like to rebook, please contact us at {{admin_email}}</p>
            
            <p>We hope to serve you in the future.</p>
            
            <p>Best regards,<br>The MarHire Team</p>
        </div>
        <div class="footer">
            <p>© 2025 MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>';
    }
    
    private static function getDefaultReminderTemplate()
    {
        return '<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; }
        .header { background-color: #f39c12; color: #fff; text-align: center; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .booking-details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
        .reminder { color: #f39c12; font-weight: bold; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>MarHire</h1>
            <p>Booking Reminder</p>
        </div>
        <div class="content">
            <p>Dear {{client_name}},</p>
            <p class="reminder">This is a friendly reminder about your upcoming booking!</p>
            
            <div class="booking-details">
                <h3>Upcoming Booking Details:</h3>
                <p><strong>Reference:</strong> {{booking_reference}}</p>
                <p><strong>Service:</strong> {{listing_title}}</p>
                <p><strong>Check-in Date:</strong> {{check_in_date}}</p>
                <p><strong>Check-out Date:</strong> {{check_out_date}}</p>
                <p><strong>Total Amount:</strong> {{currency}} {{total_amount}}</p>
            </div>
            
            <p>Please ensure you have all necessary documents and preparations ready.</p>
            <p>If you have any questions or need to make changes, please contact us at {{admin_email}}</p>
            
            <p>We look forward to seeing you soon!</p>
            
            <p>Best regards,<br>The MarHire Team</p>
        </div>
        <div class="footer">
            <p>© 2025 MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>';
    }
}