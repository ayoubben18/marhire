<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Booking Update - MarHire</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f4f4f4; }
        .booking-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MarHire Booking System</h1>
        </div>
        
        <div class="content">
            <h2>Booking Update</h2>
            <p>Dear {{ $booking->name }},</p>
            
            <p>This email is regarding your booking with MarHire.</p>
            
            <div class="booking-details">
                <h3>Booking Details:</h3>
                <p><strong>Booking Reference:</strong> {{ $booking->reference ?? $booking->id }}</p>
                <p><strong>Property:</strong> {{ $booking->listing->title ?? 'N/A' }}</p>
                <p><strong>Check-in Date:</strong> {{ $booking->check_in }}</p>
                <p><strong>Check-out Date:</strong> {{ $booking->check_out }}</p>
                <p><strong>Total Amount:</strong> ${{ number_format($booking->total_amount, 2) }}</p>
            </div>
            
            <p>If you have any questions, please contact us at {{ config('mail.admin_address') }}</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>