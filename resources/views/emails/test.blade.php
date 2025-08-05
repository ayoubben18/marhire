<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test Email</title>
</head>
<body>
    <h1>Test Email - MarHire Booking System</h1>
    
    <p>This is a test email to verify email deliverability.</p>
    
    <h2>Test Booking Details:</h2>
    <ul>
        <li><strong>Booking ID:</strong> {{ $booking->id }}</li>
        <li><strong>Reference:</strong> {{ $booking->reference }}</li>
        <li><strong>Customer:</strong> {{ $booking->name }}</li>
        <li><strong>Email:</strong> {{ $booking->email }}</li>
        <li><strong>Property:</strong> {{ $booking->listing->title }}</li>
        <li><strong>Check-in:</strong> {{ $booking->check_in }}</li>
        <li><strong>Check-out:</strong> {{ $booking->check_out }}</li>
        <li><strong>Total Amount:</strong> ${{ number_format($booking->total_amount, 2) }}</li>
    </ul>
    
    <p><strong>Email Type:</strong> {{ $emailData['email_type'] }}</p>
    <p><strong>Timestamp:</strong> {{ $emailData['timestamp'] }}</p>
    
    <hr>
    <p><small>This is a test email from MarHire Booking System. If you received this email, your email configuration is working correctly.</small></p>
</body>
</html>