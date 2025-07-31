<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - MarHire</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .confirmation-number {
            background-color: #3498db;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h2 {
            color: #2c3e50;
            font-size: 20px;
            margin-bottom: 15px;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 10px;
        }
        .info-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        .info-label {
            font-weight: bold;
            color: #7f8c8d;
        }
        .info-value {
            color: #2c3e50;
        }
        .price-breakdown {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .total-row {
            font-size: 18px;
            font-weight: bold;
            color: #27ae60;
            border-top: 2px solid #bdc3c7;
            padding-top: 10px;
            margin-top: 10px;
        }
        .footer {
            background-color: #ecf0f1;
            padding: 20px;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
        }
        .contact-info {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            .info-row {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MarHire</h1>
            <p>Your Booking is Confirmed!</p>
        </div>
        
        <div class="confirmation-number">
            Confirmation Number: {{ $confirmationNumber }}
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Booking Details</h2>
                
                <div class="info-row">
                    <span class="info-label">Service:</span>
                    <span class="info-value">{{ $serviceName }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">{{ $booking->listing->title ?? 'Service' }}:</span>
                    <span class="info-value">{{ $booking->listing->short_description ?? '' }}</span>
                </div>
                
                @if($booking->listing->city)
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span class="info-value">{{ $booking->listing->city->city_name }}</span>
                </div>
                @endif
            </div>
            
            <div class="section">
                <h2>Schedule</h2>
                
                @if($bookingDates['type'] == 'rental_period')
                    <div class="info-row">
                        <span class="info-label">Pickup:</span>
                        <span class="info-value">{{ $bookingDates['pickup']['date'] }} at {{ $bookingDates['pickup']['time'] }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Pickup Location:</span>
                        <span class="info-value">{{ $bookingDates['pickup']['location'] }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Dropoff:</span>
                        <span class="info-value">{{ $bookingDates['dropoff']['date'] }} at {{ $bookingDates['dropoff']['time'] }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Dropoff Location:</span>
                        <span class="info-value">{{ $bookingDates['dropoff']['location'] }}</span>
                    </div>
                @else
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">{{ $bookingDates['date'] }}</span>
                    </div>
                    @if(isset($bookingDates['people']))
                    <div class="info-row">
                        <span class="info-label">Number of People:</span>
                        <span class="info-value">{{ $bookingDates['people'] }}</span>
                    </div>
                    @endif
                @endif
                
                @if(isset($locationDetails['route']))
                    <div class="info-row">
                        <span class="info-label">Route:</span>
                        <span class="info-value">{{ $locationDetails['route']['from'] }} to {{ $locationDetails['route']['to'] }}</span>
                    </div>
                @endif
            </div>
            
            <div class="section">
                <h2>Price Summary</h2>
                
                <div class="price-breakdown">
                    <div class="info-row">
                        <span class="info-label">Base Price:</span>
                        <span class="info-value">${{ number_format($priceBreakdown['base_price'], 2) }}</span>
                    </div>
                    
                    @if($priceBreakdown['addons']->count() > 0)
                        <div style="margin: 15px 0;">
                            <strong>Add-ons:</strong>
                            @foreach($priceBreakdown['addons'] as $addon)
                                <div class="info-row" style="margin-left: 20px;">
                                    <span>{{ $addon['name'] }}</span>
                                    <span>${{ number_format($addon['price'], 2) }}</span>
                                </div>
                            @endforeach
                        </div>
                        <div class="info-row">
                            <span class="info-label">Add-ons Total:</span>
                            <span class="info-value">${{ number_format($priceBreakdown['addons_total'], 2) }}</span>
                        </div>
                    @endif
                    
                    @if($priceBreakdown['discount_or_extra'] != 0)
                        <div class="info-row">
                            <span class="info-label">{{ $priceBreakdown['discount_or_extra'] > 0 ? 'Extra Charge' : 'Discount' }}:</span>
                            <span class="info-value">${{ number_format(abs($priceBreakdown['discount_or_extra']), 2) }}</span>
                        </div>
                    @endif
                    
                    <div class="info-row total-row">
                        <span>Total Amount:</span>
                        <span>${{ number_format($priceBreakdown['total'], 2) }}</span>
                    </div>
                </div>
            </div>
            
            @if($booking->listing->provider)
            <div class="section">
                <div class="contact-info">
                    <h3 style="margin-top: 0;">Provider Contact Information</h3>
                    <div class="info-row">
                        <span class="info-label">Agency:</span>
                        <span class="info-value">{{ $booking->listing->provider->agency_name }}</span>
                    </div>
                    @if($booking->listing->provider->email)
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">{{ $booking->listing->provider->email }}</span>
                    </div>
                    @endif
                    @if($booking->listing->provider->whatsapp)
                    <div class="info-row">
                        <span class="info-label">WhatsApp:</span>
                        <span class="info-value">{{ $booking->listing->provider->whatsapp }}</span>
                    </div>
                    @endif
                </div>
            </div>
            @endif
            
            <div class="section">
                <p><strong>Important:</strong> Please keep this confirmation number for your records. You may need it when checking in or if you need to contact us about your booking.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing MarHire!</p>
            <p>If you have any questions, please contact us at contact@marhire.com</p>
            <p>&copy; {{ date('Y') }} MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>