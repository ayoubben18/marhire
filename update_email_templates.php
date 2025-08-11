<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\EmailTemplate;
use Illuminate\Support\Facades\DB;

// Start transaction
DB::beginTransaction();

try {
    // Delete all existing templates for en, fr, es
    EmailTemplate::whereIn('locale', ['en', 'fr', 'es'])->delete();
    echo "Deleted existing templates.\n";
    
    // Run the seeder
    $seeder = new \Database\Seeders\MultiLanguageEmailTemplatesSeeder();
    $seeder->run();
    
    echo "Templates seeded successfully!\n";
    
    // Verify
    $count = EmailTemplate::whereIn('locale', ['en', 'fr', 'es'])->count();
    echo "Total templates created: $count\n";
    
    DB::commit();
    echo "\n✅ All templates updated successfully!\n";
    
} catch (\Exception $e) {
    DB::rollback();
    echo "❌ Error: " . $e->getMessage() . "\n";
}