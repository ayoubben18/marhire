<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\EmailSetting;

class UpdateEmailSettingsToEnvDomain extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Update sender email to use the domain from .env
        $senderEmail = env('MAIL_FROM_ADDRESS', 'no-reply@testdev.info');
        EmailSetting::set('sender_email', $senderEmail);
        
        // Extract domain from sender email for admin email
        $domain = substr($senderEmail, strpos($senderEmail, '@'));
        $adminEmail = 'admin' . $domain;
        EmailSetting::set('admin_email', $adminEmail);
        
        // Also update the sender name from env
        $senderName = env('MAIL_FROM_NAME', 'MarHire');
        EmailSetting::set('sender_name', $senderName);
        
        \Log::info('Updated email settings:', [
            'sender_email' => $senderEmail,
            'admin_email' => $adminEmail,
            'sender_name' => $senderName
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // We don't want to revert to marhire.com domain
        // So we'll leave this empty
    }
}
