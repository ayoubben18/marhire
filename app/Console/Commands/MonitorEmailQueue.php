<?php

namespace App\Console\Commands;

use App\Repositories\EmailLogRepository;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MonitorEmailQueue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:monitor {--days=7 : Number of days to analyze}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Monitor email queue status and performance';

    protected $emailLogRepository;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(EmailLogRepository $emailLogRepository)
    {
        parent::__construct();
        $this->emailLogRepository = $emailLogRepository;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = $this->option('days');
        $startDate = Carbon::now()->subDays($days);

        $this->info("Email Queue Monitor - Last {$days} days");
        $this->info("=====================================");

        // Get statistics
        $stats = $this->getEmailStatistics($startDate);

        // Display overall statistics
        $this->table(
            ['Status', 'Count', 'Percentage'],
            [
                ['Sent', $stats['sent'], $this->percentage($stats['sent'], $stats['total'])],
                ['Sending', $stats['sending'], $this->percentage($stats['sending'], $stats['total'])],
                ['Failed', $stats['failed'], $this->percentage($stats['failed'], $stats['total'])],
                ['Total', $stats['total'], '100%']
            ]
        );

        // Display failed emails
        if ($stats['failed'] > 0) {
            $this->warn("\nFailed Emails:");
            $failedEmails = $this->emailLogRepository->getFailedEmails($days);
            
            $this->table(
                ['ID', 'Recipient', 'Type', 'Error', 'Retries', 'Failed At'],
                $failedEmails->map(function ($email) {
                    return [
                        $email->id,
                        $email->recipient_email,
                        $email->email_type,
                        substr($email->error_message ?? 'Unknown', 0, 30) . '...',
                        $email->retry_count,
                        $email->updated_at->format('Y-m-d H:i:s')
                    ];
                })->toArray()
            );
        }

        // Display performance metrics
        $this->displayPerformanceMetrics($startDate);

        return 0;
    }

    private function getEmailStatistics(Carbon $startDate): array
    {
        $sent = $this->emailLogRepository->countEmailsByStatus('sent', $startDate);
        $sending = $this->emailLogRepository->countEmailsByStatus('sending', $startDate);
        $failed = $this->emailLogRepository->countEmailsByStatus('failed', $startDate);
        $total = $sent + $sending + $failed;

        return compact('sent', 'sending', 'failed', 'total');
    }


    private function displayPerformanceMetrics(Carbon $startDate): void
    {
        $this->info("\nPerformance Metrics:");

        $avgSendTime = DB::table('email_logs')
            ->where('status', 'sent')
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('sent_at')
            ->selectRaw('AVG(TIMESTAMPDIFF(SECOND, created_at, sent_at)) as avg_time')
            ->value('avg_time');

        $emailTypes = DB::table('email_logs')
            ->where('created_at', '>=', $startDate)
            ->groupBy('email_type')
            ->selectRaw('email_type, COUNT(*) as count')
            ->get();

        $this->line("Average Send Time: " . ($avgSendTime ? round($avgSendTime, 2) . " seconds" : "N/A"));
        
        $this->table(
            ['Email Type', 'Count'],
            $emailTypes->map(function ($type) {
                return [$type->email_type, $type->count];
            })->toArray()
        );
    }

    private function percentage($value, $total): string
    {
        if ($total == 0) {
            return '0%';
        }
        
        return round(($value / $total) * 100, 2) . '%';
    }
}
