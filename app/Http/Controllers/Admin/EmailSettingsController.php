<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Category;
use App\Models\EmailSetting;
use App\Models\Listing;
use App\Services\Email\EmailServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class EmailSettingsController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $emailTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled', 'booking_reminder'];
        
        // Load all settings
        $settings = [
            'sender_email' => EmailSetting::get('sender_email', env('MAIL_FROM_ADDRESS', 'noreply@marhire.com')),
            'sender_name' => EmailSetting::get('sender_name', env('MAIL_FROM_NAME', 'MarHire')),
            'admin_email' => EmailSetting::get('admin_email', env('MAIL_ADMIN_ADDRESS', 'admin@marhire.com')),
            'reminder_hours' => EmailSetting::get('reminder_hours', 48),
        ];
        
        // Load email enable/disable settings
        foreach ($categories as $category) {
            foreach ($emailTypes as $type) {
                $key = "{$category->slug}.{$type}";
                $settings[$key] = EmailSetting::get($key, true);
            }
        }
        
        return view('admin.email-settings', compact('categories', 'emailTypes', 'settings'));
    }
    
    public function update(Request $request)
    {
        // Validate input data
        $validated = $request->validate([
            'sender_email' => 'required|email|max:255',
            'sender_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'reminder_hours' => 'required|in:24,48,72'
        ]);
        
        // Save general settings
        EmailSetting::set('sender_email', $validated['sender_email']);
        EmailSetting::set('sender_name', $validated['sender_name']);
        EmailSetting::set('admin_email', $validated['admin_email']);
        EmailSetting::set('reminder_hours', $validated['reminder_hours']);
        
        // Save email enable/disable settings
        $categories = Category::all();
        $emailTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled', 'booking_reminder'];
        
        foreach ($categories as $category) {
            foreach ($emailTypes as $type) {
                $key = "{$category->slug}.{$type}";
                $enabled = $request->has("emails.{$key}");
                EmailSetting::set($key, $enabled, $category->slug);
            }
        }
        
        return back()->with('success', 'Settings saved successfully!');
    }
    
    public function sendTest(Request $request)
    {
        // Rate limiting: 3 test emails per minute per user
        $key = 'test-email:' . auth()->id();
        
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->with('error', "Too many test emails. Please try again in {$seconds} seconds.");
        }
        
        RateLimiter::hit($key, 60); // 60 seconds decay
        
        $validated = $request->validate(['test_email' => 'required|email']);
        
        // Create dummy booking without setting ID to avoid conflicts
        $dummyBooking = new Booking([
            'name' => 'Test Customer',
            'email' => $validated['test_email'],
            'phone' => '+212 600 000 000',
            'check_in' => now()->addDays(7),
            'check_out' => now()->addDays(10),
            'total_amount' => 1500,
            'status' => 'confirmed',
            'reference' => 'TEST-' . uniqid()
        ]);
        
        // Don't set an ID - let it be null for test emails
        $dummyBooking->id = null;
        
        $dummyBooking->listing = new Listing(['title' => 'Test Service']);
        $dummyBooking->listing->category = new Category(['name' => 'Test Category', 'slug' => 'car_rental']);
        
        $emailService = app(EmailServiceInterface::class);
        $sent = $emailService->send($validated['test_email'], 'booking_confirmed', $dummyBooking);
        
        return back()->with($sent ? 'success' : 'error', 
            $sent ? 'Test email sent!' : 'Failed to send test email.');
    }
}