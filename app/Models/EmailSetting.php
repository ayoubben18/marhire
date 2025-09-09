<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailSetting extends Model
{
    protected $fillable = ['key', 'value', 'group'];
    
    protected $casts = [
        'value' => 'json'
    ];
    
    /**
     * Get a setting value by key
     */
    public static function get($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }
    
    /**
     * Set a setting value
     */
    public static function set($key, $value, $group = null)
    {
        return self::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );
    }
    
    /**
     * Check if an email type is enabled for a category
     */
    public static function isEmailEnabled($category, $emailType)
    {
        // If category is an object, get the slug
        if (is_object($category)) {
            $category = $category->slug ?? 'general';
        }
        
        $key = "{$category}.{$emailType}";
        return self::get($key, true); // Default to enabled
    }
    
    /**
     * Get reminder hours setting
     */
    public static function getReminderHours()
    {
        return self::get('reminder_hours', 48);
    }
    
    /**
     * Get admin email address
     */
    public static function getAdminEmail()
    {
        // First try database setting, then ADMIN_MAIL from .env, then fallback
        return self::get('admin_email', env('ADMIN_MAIL', config('mail.admin_address', 'admin@marhire.com')));
    }
    
    /**
     * Get sender email address
     */
    public static function getSenderEmail()
    {
        return self::get('sender_email', config('mail.from.address', 'noreply@marhire.com'));
    }
    
    /**
     * Get sender name
     */
    public static function getSenderName()
    {
        return self::get('sender_name', config('mail.from.name', 'MarHire'));
    }
}