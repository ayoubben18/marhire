<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification - MarHire</title>
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
            background-color: #e74c3c;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .alert-box {
            background-color: #f39c12;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            font-size: 18px;
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
            min-width: 140px;
        }
        .info-value {
            color: #2c3e50;
            flex: 1;
        }
        .client-info {
            background-color: #e8f4f8;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .price-details {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .admin-button {
            display: inline-block;
            background-color: #3498db;
            color: #ffffff;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .admin-button:hover {
            background-color: #2980b9;
        }
        .footer {
            background-color: #ecf0f1;
            padding: 20px;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
        }
        .total-row {
            font-size: 18px;
            font-weight: bold;
            color: #27ae60;
            border-top: 2px solid #bdc3c7;
            padding-top: 10px;
            margin-top: 10px;
        }
        .addons-list {
            margin-left: 20px;
            margin-top: 10px;
        }
        .addon-item {
            margin: 5px 0;
            color: #555;
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
            <p>New Booking Received!</p>
        </div>
        
        <div class="alert-box">
            Booking #{{ $confirmationNumber }}
        </div>
        
        <div class="content">
            <div style="text-align: center;">
                <a href="{{ $adminLink }}" class="admin-button">View in Admin Dashboard</a>
            </div>
            
            <div class="section">
                <div class="client-info">
                    <h2 style="margin-top: 0;">Client Information</h2>
                    
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">{{ $clientDetails['name'] }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">{{ $clientDetails['email'] }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">WhatsApp:</span>
                        <span class="info-value">{{ $clientDetails['whatsapp'] }}</span>
                    </div>
                    
                    <div class="info-row">
                        <span class="info-label">Country:</span>
                        <span class="info-value">{{ $clientDetails['country'] }}</span>
                    </div>
                    
                    @if($clientDetails['notes'])
                    <div class="info-row">
                        <span class="info-label">Notes:</span>
                        <span class="info-value">{{ $clientDetails['notes'] }}</span>
                    </div>
                    @endif
                </div>
            </div>
            
            <div class="section">
                <h2>Booking Details</h2>
                
                <div class="info-row">
                    <span class="info-label">Service Type:</span>
                    <span class="info-value">{{ $bookingDetails['category'] }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Listing:</span>
                    <span class="info-value">{{ $bookingDetails['listing_title'] }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Booking Source:</span>
                    <span class="info-value">{{ $bookingDetails['booking_source'] }}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span class="info-value">{{ $bookingDetails['status'] }}</span>
                </div>
                
                @if(isset($bookingDetails['dates']))
                    <!-- Car Rental Dates -->
                    <div style="margin-top: 15px;">
                        <strong>Pickup Details:</strong>
                        <div class="info-row">
                            <span class="info-label">Date & Time:</span>
                            <span class="info-value">{{ $bookingDetails['dates']['pickup']['date'] }} at {{ $bookingDetails['dates']['pickup']['time'] }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Location:</span>
                            <span class="info-value">{{ $bookingDetails['dates']['pickup']['location'] }}</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <strong>Dropoff Details:</strong>
                        <div class="info-row">
                            <span class="info-label">Date & Time:</span>
                            <span class="info-value">{{ $bookingDetails['dates']['dropoff']['date'] }} at {{ $bookingDetails['dates']['dropoff']['time'] }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Location:</span>
                            <span class="info-value">{{ $bookingDetails['dates']['dropoff']['location'] }}</span>
                        </div>
                    </div>
                    
                    @if(isset($bookingDetails['age']))
                    <div class="info-row">
                        <span class="info-label">Driver Age:</span>
                        <span class="info-value">{{ $bookingDetails['age'] }}</span>
                    </div>
                    @endif
                    
                    @if(isset($bookingDetails['flight_number']) && $bookingDetails['flight_number'])
                    <div class="info-row">
                        <span class="info-label">Flight Number:</span>
                        <span class="info-value">{{ $bookingDetails['flight_number'] }}</span>
                    </div>
                    @endif
                @else
                    <!-- Single Date Services -->
                    @if(isset($bookingDetails['date']))
                    <div class="info-row">
                        <span class="info-label">Service Date:</span>
                        <span class="info-value">{{ $bookingDetails['date'] }}</span>
                    </div>
                    @endif
                    
                    @if(isset($bookingDetails['route']))
                    <div class="info-row">
                        <span class="info-label">Route:</span>
                        <span class="info-value">{{ $bookingDetails['route']['from'] }} → {{ $bookingDetails['route']['to'] }}</span>
                    </div>
                    @endif
                    
                    @if(isset($bookingDetails['number_of_people']))
                    <div class="info-row">
                        <span class="info-label">Number of People:</span>
                        <span class="info-value">{{ $bookingDetails['number_of_people'] }}</span>
                    </div>
                    @endif
                    
                    @if(isset($bookingDetails['duration']))
                    <div class="info-row">
                        <span class="info-label">Duration:</span>
                        <span class="info-value">{{ $bookingDetails['duration'] }}</span>
                    </div>
                    @endif
                    
                    @if(isset($bookingDetails['purpose']) && $bookingDetails['purpose'])
                    <div class="info-row">
                        <span class="info-label">Purpose:</span>
                        <span class="info-value">{{ $bookingDetails['purpose'] }}</span>
                    </div>
                    @endif
                @endif
                
                @if(isset($bookingDetails['addons']) && count($bookingDetails['addons']) > 0)
                <div style="margin-top: 15px;">
                    <strong>Selected Add-ons:</strong>
                    <div class="addons-list">
                        @foreach($bookingDetails['addons'] as $addon)
                            <div class="addon-item">• {{ $addon }}</div>
                        @endforeach
                    </div>
                </div>
                @endif
            </div>
            
            <div class="section">
                <h2>Financial Details</h2>
                
                <div class="price-details">
                    <div class="info-row">
                        <span class="info-label">Base Price:</span>
                        <span class="info-value">${{ number_format($priceDetails['booking_price'], 2) }}</span>
                    </div>
                    
                    @if($priceDetails['addons_total'] > 0)
                    <div class="info-row">
                        <span class="info-label">Add-ons Total:</span>
                        <span class="info-value">${{ number_format($priceDetails['addons_total'], 2) }}</span>
                    </div>
                    @endif
                    
                    @if($priceDetails['discount_or_extra'] != 0)
                    <div class="info-row">
                        <span class="info-label">{{ $priceDetails['discount_or_extra'] > 0 ? 'Extra Charge' : 'Discount' }}:</span>
                        <span class="info-value">${{ number_format(abs($priceDetails['discount_or_extra']), 2) }}</span>
                    </div>
                    @endif
                    
                    <div class="info-row total-row">
                        <span>Total Price:</span>
                        <span>${{ number_format($priceDetails['total_price'], 2) }}</span>
                    </div>
                    
                    @if(isset($priceDetails['net_agency_price']) && $priceDetails['net_agency_price'])
                    <div class="info-row" style="margin-top: 10px;">
                        <span class="info-label">Net Agency Price:</span>
                        <span class="info-value">${{ number_format($priceDetails['net_agency_price'], 2) }}</span>
                    </div>
                    @endif
                    
                    @if(isset($priceDetails['commission_amount']) && $priceDetails['commission_amount'])
                    <div class="info-row">
                        <span class="info-label">Commission:</span>
                        <span class="info-value">${{ number_format($priceDetails['commission_amount'], 2) }}</span>
                    </div>
                    @endif
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ $adminLink }}" class="admin-button">Manage This Booking</a>
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated notification from MarHire booking system.</p>
            <p>Booking ID: {{ $booking->id }} | Created: {{ $booking->created_at->format('Y-m-d H:i:s') }}</p>
            <p>&copy; {{ date('Y') }} MarHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>