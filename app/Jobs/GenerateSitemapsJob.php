<?php

namespace App\Jobs;

use App\Services\SitemapGeneratorService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class GenerateSitemapsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;
    
    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 600; // 10 minutes
    
    private ?string $notifyEmail;
    
    /**
     * Create a new job instance.
     */
    public function __construct(?string $notifyEmail = null)
    {
        $this->notifyEmail = $notifyEmail;
    }
    
    /**
     * Execute the job.
     */
    public function handle(SitemapGeneratorService $service): void
    {
        try {
            Log::info('Starting queued sitemap generation job');
            
            $results = $service->generateAllSitemaps();
            
            Log::info('Sitemap generation job completed successfully', ['results' => $results]);
            
            // Send notification email if requested
            if ($this->notifyEmail) {
                $this->sendNotificationEmail(true, $results);
            }
            
        } catch (\Exception $e) {
            Log::error('Sitemap generation job failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Send failure notification
            if ($this->notifyEmail) {
                $this->sendNotificationEmail(false, null, $e->getMessage());
            }
            
            throw $e; // Re-throw to mark job as failed
        }
    }
    
    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Sitemap generation job permanently failed after retries', [
            'error' => $exception->getMessage()
        ]);
        
        // Alert administrators
        if ($this->notifyEmail) {
            $this->sendNotificationEmail(false, null, $exception->getMessage());
        }
    }
    
    /**
     * Send notification email about job completion
     */
    private function sendNotificationEmail(bool $success, ?array $results = null, ?string $error = null): void
    {
        try {
            $subject = $success 
                ? 'Sitemap Generation Completed Successfully' 
                : 'Sitemap Generation Failed';
            
            $data = [
                'success' => $success,
                'results' => $results,
                'error' => $error,
                'timestamp' => now()->toDateTimeString()
            ];
            
            Mail::raw($this->buildEmailMessage($data), function ($message) use ($subject) {
                $message->to($this->notifyEmail)
                    ->subject($subject);
            });
            
        } catch (\Exception $e) {
            Log::error('Failed to send sitemap notification email', [
                'error' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Build email message content
     */
    private function buildEmailMessage(array $data): string
    {
        if ($data['success']) {
            $message = "Sitemap generation completed successfully.\n\n";
            $message .= "Generated at: {$data['timestamp']}\n\n";
            
            if ($data['results']) {
                $message .= "URLs generated per locale:\n";
                foreach ($data['results'] as $locale => $count) {
                    $message .= "- {$locale}: {$count} URLs\n";
                }
            }
        } else {
            $message = "Sitemap generation failed.\n\n";
            $message .= "Failed at: {$data['timestamp']}\n";
            $message .= "Error: {$data['error']}\n";
        }
        
        return $message;
    }
}