<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->json('value');
            $table->string('group', 50)->nullable();
            $table->timestamps();
            
            $table->index(['group', 'key']);
        });
        
        // Seed default settings
        $this->seedDefaultSettings();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_settings');
    }
    
    /**
     * Seed default email settings
     */
    private function seedDefaultSettings()
    {
        $defaults = [
            // General settings
            ['key' => 'sender_email', 'value' => json_encode(env('MAIL_FROM_ADDRESS', 'noreply@marhire.com')), 'group' => 'general'],
            ['key' => 'sender_name', 'value' => json_encode(env('MAIL_FROM_NAME', 'MarHire')), 'group' => 'general'],
            ['key' => 'admin_email', 'value' => json_encode(env('MAIL_ADMIN_ADDRESS', 'admin@marhire.com')), 'group' => 'general'],
            ['key' => 'reminder_hours', 'value' => json_encode(48), 'group' => 'general'],
            
            // Default all emails to enabled for all categories
            ['key' => 'car_rental.booking_received', 'value' => json_encode(true), 'group' => 'car_rental'],
            ['key' => 'car_rental.booking_confirmed', 'value' => json_encode(true), 'group' => 'car_rental'],
            ['key' => 'car_rental.booking_cancelled', 'value' => json_encode(true), 'group' => 'car_rental'],
            ['key' => 'car_rental.booking_reminder', 'value' => json_encode(true), 'group' => 'car_rental'],
            
            ['key' => 'private_driver.booking_received', 'value' => json_encode(true), 'group' => 'private_driver'],
            ['key' => 'private_driver.booking_confirmed', 'value' => json_encode(true), 'group' => 'private_driver'],
            ['key' => 'private_driver.booking_cancelled', 'value' => json_encode(true), 'group' => 'private_driver'],
            ['key' => 'private_driver.booking_reminder', 'value' => json_encode(true), 'group' => 'private_driver'],
            
            ['key' => 'boat_rental.booking_received', 'value' => json_encode(true), 'group' => 'boat_rental'],
            ['key' => 'boat_rental.booking_confirmed', 'value' => json_encode(true), 'group' => 'boat_rental'],
            ['key' => 'boat_rental.booking_cancelled', 'value' => json_encode(true), 'group' => 'boat_rental'],
            ['key' => 'boat_rental.booking_reminder', 'value' => json_encode(true), 'group' => 'boat_rental'],
            
            ['key' => 'things_to_do.booking_received', 'value' => json_encode(true), 'group' => 'things_to_do'],
            ['key' => 'things_to_do.booking_confirmed', 'value' => json_encode(true), 'group' => 'things_to_do'],
            ['key' => 'things_to_do.booking_cancelled', 'value' => json_encode(true), 'group' => 'things_to_do'],
            ['key' => 'things_to_do.booking_reminder', 'value' => json_encode(true), 'group' => 'things_to_do'],
        ];
        
        foreach ($defaults as $setting) {
            DB::table('email_settings')->insert(array_merge($setting, [
                'created_at' => now(),
                'updated_at' => now()
            ]));
        }
    }
}