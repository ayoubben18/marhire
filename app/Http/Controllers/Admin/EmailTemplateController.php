<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use App\Models\Booking;
use Illuminate\Http\Request;

class EmailTemplateController extends Controller
{
    public function index()
    {
        $templates = EmailTemplate::whereNull('category')
            ->orWhere('category', '')
            ->get();
        return view('admin.email-templates.index', compact('templates'));
    }
    
    public function edit(EmailTemplate $template)
    {
        return view('admin.email-templates.edit', compact('template'));
    }
    
    public function update(Request $request, EmailTemplate $template)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'body_html' => 'required|string'
        ]);
        
        $template->update([
            'subject' => $request->subject,
            'body_html' => $request->body_html
        ]);
        
        return redirect()->route('admin.email-templates.index')
            ->with('success', 'Template updated successfully');
    }
    
    public function reset(EmailTemplate $template)
    {
        $template->resetToDefault();
        
        return redirect()->route('admin.email-templates.edit', $template)
            ->with('success', 'Template reset to default');
    }
    
    public function preview(EmailTemplate $template)
    {
        // Create dummy booking for preview
        $dummyBooking = $this->createDummyBooking();
        $html = $this->replaceVariables($template->body_html, $dummyBooking);
        
        return response($html);
    }
    
    private function createDummyBooking()
    {
        $booking = new \stdClass();
        $booking->id = 12345;
        $booking->name = 'John Doe';
        $booking->email = 'john.doe@example.com';
        $booking->reference = 'BK-2025-12345';
        $booking->total_amount = 2500.00;
        $booking->currency = '€';
        $booking->check_in = now()->addDays(7);
        $booking->check_out = now()->addDays(10);
        
        $listing = new \stdClass();
        $listing->title = 'Luxury Yacht Experience';
        
        $category = new \stdClass();
        $category->slug = 'yachts';
        
        $listing->category = $category;
        $booking->listing = $listing;
        
        return $booking;
    }
    
    private function replaceVariables($text, $booking)
    {
        $adminEmail = config('mail.admin_address', 'admin@marhire.com');
        
        $replacements = [
            '{{client_name}}' => $booking->name,
            '{{client_email}}' => $booking->email,
            '{{booking_reference}}' => $booking->reference,
            '{{booking_id}}' => $booking->id,
            '{{listing_title}}' => $booking->listing->title,
            '{{total_amount}}' => number_format($booking->total_amount, 2),
            '{{currency}}' => $booking->currency ?? '€',
            '{{admin_email}}' => $adminEmail,
            '{{check_in_date}}' => $booking->check_in->format('M d, Y'),
            '{{check_out_date}}' => $booking->check_out->format('M d, Y'),
        ];
        
        return str_replace(array_keys($replacements), array_values($replacements), $text);
    }
}