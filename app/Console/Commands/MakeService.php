<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {service_name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class command.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('service_name');
        $path = app_path("Services/{$name}.php");

        // Check if service already exists
        if (file_exists($path)) {
            $this->error('Service already exists!');
            return;
        }

        // Create Services directory if not exists
        if (!is_dir(app_path('Services'))) {
            mkdir(app_path('Services'), 0755, true);
        }

        // Service template
        $stub = <<<PHP
        <?php

        namespace App\Services;

        class {$name}
        {
            public function __construct()
            {
                // Constructor logic (if needed)
            }

            public function handle()
            {
                // Business logic
            }
        }
        PHP;

        // Create the file
        file_put_contents($path, $stub);

        $this->info("Service {$name} created successfully.");
        return 0;
    }
}
