<!DOCTYPE html>
<html>
<head>
    <title>{{ config('business_name') }}</title>
</head>
<body>
    <h3>New Message</h3>
    <p><strong>Name:</strong> {{ $details['name'] }}</p>
    <p><strong>Email:</strong> {{ $details['email'] }}</p>
    @if(!empty($details['phone']))
    <p><strong>Phone:</strong> {{ $details['phone'] }}</p>
    @endif
    <p><strong>Message:</strong></p>
    <p>{{ $details['message'] }}</p>
</body>
</html>
