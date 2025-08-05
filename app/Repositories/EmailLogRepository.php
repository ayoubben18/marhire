<?php

namespace App\Repositories;

use App\Models\EmailLog;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class EmailLogRepository
{
    public function create(array $data): EmailLog
    {
        return EmailLog::create($data);
    }

    public function findById(int $id): ?EmailLog
    {
        return EmailLog::find($id);
    }

    public function getFailedEmails(int $days = 7): Collection
    {
        return EmailLog::failed()
            ->where('created_at', '>=', Carbon::now()->subDays($days))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getSendingEmails(): Collection
    {
        return EmailLog::where('status', 'sending')
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function getEmailsByBooking(int $bookingId): Collection
    {
        return EmailLog::where('booking_id', $bookingId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getEmailsByRecipient(string $email): Collection
    {
        return EmailLog::where('recipient_email', $email)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getRecentEmailsByType(string $type, int $hours = 24): Collection
    {
        return EmailLog::where('email_type', $type)
            ->where('created_at', '>=', Carbon::now()->subHours($hours))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function countEmailsByStatus(string $status, ?Carbon $startDate = null, ?Carbon $endDate = null): int
    {
        $query = EmailLog::where('status', $status);

        if ($startDate) {
            $query->where('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->where('created_at', '<=', $endDate);
        }

        return $query->count();
    }

    public function getRetryableEmails(): Collection
    {
        return EmailLog::failed()
            ->where('retry_count', '<', 3)
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function updateStatus(int $id, string $status, ?string $errorMessage = null): bool
    {
        $data = ['status' => $status];

        if ($status === 'sent') {
            $data['sent_at'] = now();
        }

        if ($errorMessage) {
            $data['error_message'] = $errorMessage;
        }

        return EmailLog::where('id', $id)->update($data) > 0;
    }

    public function deleteOldLogs(int $days = 30): int
    {
        return EmailLog::where('created_at', '<', Carbon::now()->subDays($days))
            ->delete();
    }
}