<?php

namespace App\Services\Email;

use App\Models\Booking;
use Illuminate\Support\Collection;

interface EmailServiceInterface
{
    public function send(string $recipient, string $emailType, Booking $booking, ?string $pdfPath = null, ?string $locale = null): bool;
    public function sendBulk(array $recipients, string $emailType, Booking $booking): bool;
    public function getFailedEmails(int $days = 7): Collection;
    public function resend(int $emailLogId): bool;
}