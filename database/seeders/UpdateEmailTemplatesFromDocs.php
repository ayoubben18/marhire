<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use Illuminate\Database\Seeder;

class UpdateEmailTemplatesFromDocs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Template for booking_received (pending)
        $pendingTemplate = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Your Booking Request Has Been Received – MarHire</div>
    <p>Hello <strong>{{client_name}}</strong>,</p>
    <p>Thank you for booking with <strong>MarHire</strong>. We\'ve received your booking request and it is currently under review. Please find the invoice attached to this email.</p>

    <div class="section-title">Booking Summary</div>
    <table class="content-table">
      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Status:</strong></td><td style="color: #f0ad4e; font-weight: bold;">Pending</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Need Help?</div>
    <div class="help-box">
      Our support team is here to assist you anytime:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Phone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Website: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Thank you for choosing <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Terms & Conditions</a> | <a href="https://www.marhire.com/cancellation-policy">Cancellation Policy</a></em>
    </div>
  </div>
</body>
</html>';

        // Template for booking_confirmed
        $confirmedTemplate = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Your Booking is Confirmed – MarHire</div>
    <p>Hello <strong>{{client_name}}</strong>,</p>
    <p>Thank you for booking with <strong>MarHire</strong>. We\'re pleased to confirm your reservation. Please find the invoice attached to this email.</p>

    <div class="section-title">Booking Summary</div>
    <table class="content-table">
      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Status:</strong></td><td style="color: #28a745; font-weight: bold;">Confirmed</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Need Help?</div>
    <div class="help-box">
      Our support team is here to assist you anytime:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Phone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Website: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Thank you for choosing <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Terms & Conditions</a> | <a href="https://www.marhire.com/cancellation-policy">Cancellation Policy</a></em>
    </div>
  </div>
</body>
</html>';

        // Template for booking_cancelled
        $cancelledTemplate = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Your Booking Has Been Canceled – MarHire</div>
    <p>Hello <strong>{{client_name}}</strong>,</p>
    <p>Thank you for booking with <strong>MarHire</strong>. Unfortunately, your booking has been canceled. If you have any questions or would like to reschedule, please contact our support team. Please find the invoice attached to this email.</p>

    <div class="section-title">Booking Summary</div>
    <table class="content-table">
      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Status:</strong></td><td style="color: #d9534f; font-weight: bold;">Canceled</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Need Help?</div>
    <div class="help-box">
      Our support team is here to assist you anytime:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Phone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Website: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Thank you for choosing <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Terms & Conditions</a> | <a href="https://www.marhire.com/cancellation-policy">Cancellation Policy</a></em>
    </div>
  </div>
</body>
</html>';

        // Template for booking_reminder
        $reminderTemplate = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Reminder</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f8f8; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; padding: 20px; }
    .header { background-color: #225f54; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold; }
    .section-title { font-size: 16px; font-weight: bold; color: #225f54; margin-top: 25px; }
    .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .content-table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
    .help-box {
      background-color: #f1fdfb;
      border: 1px solid #cbe8e4;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      margin-top: 10px;
    }
    .help-box a {
      font-weight: bold;
    }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; }
    a { color: #225f54; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Upcoming Booking Reminder – MarHire</div>
    <p>Hello <strong>{{client_name}}</strong>,</p>
    <p>This is a friendly reminder that your upcoming booking with <strong>MarHire</strong> is scheduled to start soon. Please review the details below and make sure everything is in order. <strong>If you decide to cancel or make changes, please let us know as soon as possible.</strong> If you have any questions or last-minute changes, feel free to contact us.</p>

    <div class="section-title">Booking Summary</div>
    <table class="content-table">
      <tr><td><strong>Invoice No:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Status:</strong></td><td style="color: #f0ad4e; font-weight: bold;">Upcoming</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Check In:</strong></td><td>{{check_in_date}}</td></tr>
      <tr><td><strong>Check Out:</strong></td><td>{{check_out_date}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
    </table>

    <div class="section-title">Need Help?</div>
    <div class="help-box">
      Our support team is here to assist you anytime:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Phone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Website: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Thank you for choosing <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Terms & Conditions</a> | <a href="https://www.marhire.com/cancellation-policy">Cancellation Policy</a></em>
    </div>
  </div>
</body>
</html>';

        // Update templates
        EmailTemplate::where('event_type', 'booking_received')->update([
            'subject' => 'Your Booking Request Has Been Received – MarHire',
            'body_html' => $pendingTemplate
        ]);

        EmailTemplate::where('event_type', 'booking_confirmed')->update([
            'subject' => 'Your Booking is Confirmed – MarHire',
            'body_html' => $confirmedTemplate
        ]);

        EmailTemplate::where('event_type', 'booking_cancelled')->update([
            'subject' => 'Your Booking Has Been Canceled – MarHire',
            'body_html' => $cancelledTemplate
        ]);

        EmailTemplate::where('event_type', 'booking_reminder')->update([
            'subject' => 'Upcoming Booking Reminder – MarHire',
            'body_html' => $reminderTemplate
        ]);

        echo "Email templates updated successfully!\n";
    }
}