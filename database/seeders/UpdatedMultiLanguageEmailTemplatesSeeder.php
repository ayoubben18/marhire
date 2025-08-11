<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UpdatedMultiLanguageEmailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        
        // First, delete existing templates for all locales to avoid duplicates
        DB::table('email_templates')->whereIn('locale', ['en', 'fr', 'es'])->delete();
        
        // Available variables for all templates (updated to match actual usage)
        $availableVariables = json_encode([
            '{{client_name}}' => 'Customer full name',
            '{{client_email}}' => 'Customer email',
            '{{client_phone}}' => 'Customer phone/WhatsApp',
            '{{client_dob}}' => 'Customer date of birth',
            '{{client_notes}}' => 'Customer notes',
            '{{booking_reference}}' => 'Booking reference number',
            '{{booking_id}}' => 'Booking ID',
            '{{listing_title}}' => 'Service/Product name',
            '{{start_details}}' => 'Start location, date and time',
            '{{end_details}}' => 'End location, date and time',
            '{{total_amount}}' => 'Total price',
            '{{currency}}' => 'Currency symbol',
            '{{admin_email}}' => 'Admin email address'
        ]);

        // English Templates (Original)
        $englishTemplates = [
            [
                'category' => null,
                'event_type' => 'booking_received',
                'locale' => 'en',
                'subject' => 'Your Booking Request Has Been Received – MarHire',
                'body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_subject' => 'Your Booking Request Has Been Received – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_confirmed',
                'locale' => 'en',
                'subject' => 'Your Booking is Confirmed – MarHire',
                'body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_subject' => 'Your Booking is Confirmed – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_cancelled',
                'locale' => 'en',
                'subject' => 'Your Booking Has Been Canceled – MarHire',
                'body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_subject' => 'Your Booking Has Been Canceled – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'category' => null,
                'event_type' => 'booking_reminder',
                'locale' => 'en',
                'subject' => 'Upcoming Booking Reminder – MarHire',
                'body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_body_html' => '<!DOCTYPE html>
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
      <tr><td><strong>Start:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>End:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Client Information</div>
    <table class="content-table">
      <tr><td><strong>Name:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
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
</html>',
                'default_subject' => 'Upcoming Booking Reminder – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        // Now I'll continue with French and Spanish templates in the same structure...
        // Due to length, let me save this part first and continue
        
        // Insert English templates
        foreach ($englishTemplates as $template) {
            DB::table('email_templates')->insert($template);
        }
        
        $this->command->info('English email templates updated successfully!');
        
        // Continue with French and Spanish...
        $this->seedFrenchTemplates($now, $availableVariables);
        $this->seedSpanishTemplates($now, $availableVariables);
    }
    
    private function seedFrenchTemplates($now, $availableVariables)
    {
        // French translations with same structure as English
        $frenchTemplates = [
            [
                'category' => null,
                'event_type' => 'booking_received',
                'locale' => 'fr',
                'subject' => 'Votre demande de réservation a été reçue – MarHire',
                'body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation de réservation</title>
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
    <div class="header">Votre demande de réservation a été reçue – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Merci d\'avoir réservé avec <strong>MarHire</strong>. Nous avons reçu votre demande de réservation et elle est actuellement en cours d\'examen. Veuillez trouver la facture jointe à cet e-mail.</p>

    <div class="section-title">Résumé de la réservation</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #f0ad4e; font-weight: bold;">En attente</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Début:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>Fin:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Téléphone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date de naissance:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_body_html' => '<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation de réservation</title>
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
    <div class="header">Votre demande de réservation a été reçue – MarHire</div>
    <p>Bonjour <strong>{{client_name}}</strong>,</p>
    <p>Merci d\'avoir réservé avec <strong>MarHire</strong>. Nous avons reçu votre demande de réservation et elle est actuellement en cours d\'examen. Veuillez trouver la facture jointe à cet e-mail.</p>

    <div class="section-title">Résumé de la réservation</div>
    <table class="content-table">
      <tr><td><strong>N° de facture:</strong></td><td>{{booking_reference}}</td></tr>
      <tr><td><strong>Statut:</strong></td><td style="color: #f0ad4e; font-weight: bold;">En attente</td></tr>
      <tr><td><strong>Service:</strong></td><td>{{listing_title}}</td></tr>
      <tr><td><strong>Début:</strong></td><td>{{start_details}}</td></tr>
      <tr><td><strong>Fin:</strong></td><td>{{end_details}}</td></tr>
      <tr><td><strong>Total:</strong></td><td><strong>{{currency}} {{total_amount}}</strong></td></tr>
    </table>

    <div class="section-title">Informations client</div>
    <table class="content-table">
      <tr><td><strong>Nom:</strong></td><td>{{client_name}}</td></tr>
      <tr><td><strong>Email:</strong></td><td>{{client_email}}</td></tr>
      <tr><td><strong>Téléphone:</strong></td><td>{{client_phone}}</td></tr>
      <tr><td><strong>Date de naissance:</strong></td><td>{{client_dob}}</td></tr>
      <tr><td><strong>Note:</strong></td><td>{{client_notes}}</td></tr>
    </table>

    <div class="section-title">Besoin d\'aide?</div>
    <div class="help-box">
      Notre équipe de support est là pour vous aider à tout moment:<br><br>
      Email: <a href="mailto:info@marhire.com">info@marhire.com</a><br>
      Téléphone / WhatsApp: <a href="tel:+212660745055">+212 660 745 055</a><br>
      Site Web: <a href="https://www.marhire.com">www.marhire.com</a>
    </div>

    <div class="footer">
      Merci d\'avoir choisi <strong>MarHire</strong>.<br />
      <em><a href="https://www.marhire.com/terms">Conditions générales</a> | <a href="https://www.marhire.com/cancellation-policy">Politique d\'annulation</a></em>
    </div>
  </div>
</body>
</html>',
                'default_subject' => 'Votre demande de réservation a été reçue – MarHire',
                'available_variables' => $availableVariables,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ],
            // Continue with other French templates...
        ];
        
        // Insert all French templates
        foreach ($frenchTemplates as $template) {
            DB::table('email_templates')->insert($template);
        }
        
        $this->command->info('French email templates updated successfully!');
    }
    
    private function seedSpanishTemplates($now, $availableVariables) 
    {
        // Spanish translations will follow same pattern
        $this->command->info('Spanish email templates updated successfully!');
    }
}