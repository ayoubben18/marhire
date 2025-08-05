<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;

class EmailTemplateSeeder extends Seeder
{
    public function run()
    {
        $templates = EmailTemplate::getDefaultTemplates();
        $categories = [null]; // Start with general templates
        
        // Available variables for all templates
        $generalVariables = [
            '{{client_name}}' => 'Customer full name',
            '{{client_email}}' => 'Customer email',
            '{{booking_reference}}' => 'Booking reference number',
            '{{booking_id}}' => 'Booking ID',
            '{{listing_title}}' => 'Service/Product name',
            '{{total_amount}}' => 'Total price',
            '{{currency}}' => 'Currency symbol',
            '{{admin_email}}' => 'Admin email address',
            '{{check_in_date}}' => 'Check-in/Start date',
            '{{check_out_date}}' => 'Check-out/End date',
        ];
        
        foreach ($categories as $category) {
            foreach ($templates as $eventType => $template) {
                EmailTemplate::create([
                    'category' => $category,
                    'event_type' => $eventType,
                    'subject' => $template['subject'],
                    'body_html' => $template['body'],
                    'default_subject' => $template['subject'], // Store original
                    'default_body_html' => $template['body'],  // Store original
                    'available_variables' => $generalVariables,
                    'is_active' => true
                ]);
            }
        }
    }
}