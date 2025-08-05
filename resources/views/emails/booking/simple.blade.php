<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $emailData['email_type'] ?? 'Booking Update' }} - MarHire</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f4f4f4; }
        .booking-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MarHire Booking System</h1>
        </div>
        
        <div class="content">
            @if($emailLog->email_type === 'booking_received')
                <h2>Booking Received!</h2>
                <p>Dear {{ $booking->name }},</p>
                <p>Thank you for your booking. We have received your request and will process it shortly.</p>
            @elseif($emailLog->email_type === 'booking_confirmed')
                <h2>Booking Confirmed!</h2>
                <p>Dear {{ $booking->name }},</p>
                <p>Great news! Your booking has been confirmed.</p>
            @elseif($emailLog->email_type === 'booking_cancelled')
                <h2>Booking Cancelled</h2>
                <p>Dear {{ $booking->name }},</p>
                <p>Your booking has been cancelled as requested.</p>
            @else
                <h2>Booking Update</h2>
                <p>Dear {{ $booking->name }},</p>
                <p>This is an update regarding your booking with MarHire.</p>
            @endif
            
            <div class="booking-details">
                <h3>Booking Details:</h3>
                <p><strong>Booking Reference:</strong> {{ $booking->reference ?? $booking->id }}</p>
                <p><strong>Property:</strong> {{ $booking->listing->title ?? 'N/A' }}</p>
                <p><strong>Check-in Date:</strong> {{ $booking->check_in }}</p>
                <p><strong>Check-out Date:</strong> {{ $booking->check_out }}</p>
                <p><strong>Total Amount:</strong> ${{ number_format($booking->total_amount, 2) }}</p>
                <p><strong>Status:</strong> {{ ucfirst($booking->status ?? 'pending') }}</p>
            </div>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>
                <strong>Email:</strong> {{ config('mail.admin_address') }}<br>
                <strong>Phone:</strong> +1 (555) 123-4567
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} MarHire. All rights reserved.</p>
            <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
    </div>
</body>
</html>