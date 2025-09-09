<?php

namespace App\Services\Email;

class EmailConfigService
{
    public function getFromAddress(): string
    {
        return config('mail.from.address', 'noreply@marhire.com');
    }

    public function getFromName(): string
    {
        return config('mail.from.name', 'MarHire Booking System');
    }

    public function getAdminEmail(): string
    {
        return \App\Models\EmailSetting::getAdminEmail();
    }

    public function getMailer(): string
    {
        return config('mail.default', 'smtp');
    }

    public function getQueueConnection(): string
    {
        return config('queue.default', 'redis');
    }

    public function getEmailRetentionDays(): int
    {
        return config('mail.retention_days', 30);
    }

    public function getRateLimitPerMinute(): int
    {
        return config('mail.rate_limit', 100);
    }

    public function getMaxEmailSize(): int
    {
        return config('mail.max_size', 25 * 1024 * 1024); // 25MB in bytes
    }

    public function isEmailLoggingEnabled(): bool
    {
        return config('mail.logging_enabled', true);
    }

    public function getEmailQueueName(): string
    {
        return config('mail.queue_name', 'emails');
    }
}