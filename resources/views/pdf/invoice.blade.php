<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .invoice {
            max-width: 600px;
            margin: auto;
        }
        .header {
            background: #225f54;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #225f54;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .row {
            margin: 8px 0;
            display: table;
            width: 100%;
        }
        .label {
            font-weight: bold;
            display: table-cell;
            width: 40%;
            padding-right: 10px;
        }
        .value {
            display: table-cell;
            width: 60%;
        }
        .total-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #225f54;
            text-align: right;
        }
        .total {
            font-size: 24px;
            color: #225f54;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
            background: #28a745;
            color: white;
        }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <h1>MarHire Invoice</h1>
            <p>Invoice #{{ $invoiceData['invoice_number'] }}</p>
            <p>{{ $invoiceData['invoice_date'] }}</p>
        </div>
        
        <div class="content">
            <!-- Customer Information -->
            <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="row">
                    <span class="label">Name:</span>
                    <span class="value">{{ $invoiceData['client_name'] }}</span>
                </div>
                <div class="row">
                    <span class="label">Email:</span>
                    <span class="value">{{ $invoiceData['client_email'] }}</span>
                </div>
                <div class="row">
                    <span class="label">Phone:</span>
                    <span class="value">{{ $invoiceData['client_phone'] }}</span>
                </div>
            </div>
            
            <!-- Booking Details -->
            <div class="section">
                <div class="section-title">Booking Details</div>
                <div class="row">
                    <span class="label">Service:</span>
                    <span class="value">{{ $invoiceData['service_name'] }}</span>
                </div>
                <div class="row">
                    <span class="label">Check-in Date:</span>
                    <span class="value">{{ $invoiceData['check_in'] }}</span>
                </div>
                <div class="row">
                    <span class="label">Check-out Date:</span>
                    <span class="value">{{ $invoiceData['check_out'] }}</span>
                </div>
                <div class="row">
                    <span class="label">Status:</span>
                    <span class="value">
                        <span class="status-badge">{{ $invoiceData['status'] }}</span>
                    </span>
                </div>
            </div>
            
            <!-- Pricing Breakdown -->
            <div class="section">
                <div class="section-title">Pricing Breakdown</div>
                <div class="row">
                    <span class="label">Base Booking Price:</span>
                    <span class="value">€{{ number_format($invoiceData['booking_price'], 2) }}</span>
                </div>
                
                @if(!empty($invoiceData['addons']))
                    @foreach($invoiceData['addons'] as $addon)
                    <div class="row">
                        <span class="label">{{ $addon['name'] }}:</span>
                        <span class="value">€{{ number_format($addon['price'], 2) }}</span>
                    </div>
                    @endforeach
                    <div class="row">
                        <span class="label">Total Addons:</span>
                        <span class="value">€{{ number_format($invoiceData['total_addons'], 2) }}</span>
                    </div>
                @endif
                
                @if($invoiceData['discount_or_extra'] != 0)
                <div class="row">
                    <span class="label">{{ $invoiceData['discount_label'] }}:</span>
                    <span class="value">€{{ number_format(abs($invoiceData['discount_or_extra']), 2) }}</span>
                </div>
                @endif
            </div>
            
            <!-- Total Amount -->
            <div class="total-section">
                <div class="row">
                    <span class="label">Grand Total:</span>
                    <span class="total">€{{ number_format($invoiceData['grand_total'], 2) }}</span>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <p><strong>MarHire - Your Maritime Rental Partner</strong></p>
                <p>Email: {{ $invoiceData['company_email'] }} | Phone: {{ $invoiceData['company_phone'] }}</p>
                <p>Thank you for choosing MarHire!</p>
            </div>
        </div>
    </div>
</body>
</html>