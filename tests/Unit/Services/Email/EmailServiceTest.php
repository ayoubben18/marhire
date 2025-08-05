<?php

namespace Tests\Unit\Services\Email;

use App\Models\Booking;
use App\Models\EmailLog;
use App\Repositories\EmailLogRepository;
use App\Services\Email\EmailService;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Tests\TestCase;

class EmailServiceTest extends TestCase
{
    protected $emailService;
    protected $emailLogRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Mock the repository
        $this->emailLogRepository = Mockery::mock(EmailLogRepository::class);
        $this->emailService = new EmailService($this->emailLogRepository);
        
        // Fake mail
        Mail::fake();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_send_creates_email_log_and_sends_email()
    {
        // Arrange
        $booking = Mockery::mock(Booking::class);
        $booking->id = 123;
        $booking->shouldReceive('getAttribute')->with('id')->andReturn(123);
        $booking->name = 'John Doe';
        $booking->email = 'john@example.com';
        $booking->check_in = '2025-08-10';
        $booking->check_out = '2025-08-15';
        $booking->total_amount = 500.00;
        $booking->reference = 'REF123';
        $booking->listing = (object)['title' => 'Test Listing'];
        
        $emailLog = Mockery::mock(EmailLog::class)->makePartial();
        $emailLog->id = 1;
        $emailLog->booking = $booking;
        $emailLog->shouldReceive('markAsSent')->once();
        
        $this->emailLogRepository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function ($data) {
                return $data['booking_id'] === 123 &&
                       $data['recipient_email'] === 'customer@example.com' &&
                       $data['email_type'] === 'booking_confirmed' &&
                       $data['status'] === 'sending';
            }))
            ->andReturn($emailLog);

        // Act
        $result = $this->emailService->send('customer@example.com', 'booking_confirmed', $booking);

        // Assert
        $this->assertTrue($result);
        Mail::assertSent(\App\Mail\SimpleBookingEmail::class);
    }

    public function test_send_handles_exception_gracefully()
    {
        // Arrange
        $booking = Mockery::mock(Booking::class);
        $booking->id = 123;
        $booking->shouldReceive('getAttribute')->with('id')->andReturn(123);
        
        $this->emailLogRepository->shouldReceive('create')
            ->once()
            ->andThrow(new \Exception('Database error'));

        // Act
        $result = $this->emailService->send('customer@example.com', 'booking_confirmed', $booking);

        // Assert
        $this->assertFalse($result);
        Mail::assertNothingSent();
    }

    public function test_sendBulk_sends_to_multiple_recipients()
    {
        // Arrange
        $booking = Mockery::mock(Booking::class);
        $booking->id = 123;
        $booking->shouldReceive('getAttribute')->with('id')->andReturn(123);
        $booking->name = 'John Doe';
        $booking->email = 'john@example.com';
        $booking->check_in = '2025-08-10';
        $booking->check_out = '2025-08-15';
        $booking->total_amount = 500.00;
        $booking->reference = 'REF123';
        $booking->listing = (object)['title' => 'Test Listing'];
        
        $recipients = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
        
        $this->emailLogRepository->shouldReceive('create')
            ->times(3)
            ->andReturn(new EmailLog(['id' => 1]));

        // Act
        $result = $this->emailService->sendBulk($recipients, 'booking_confirmed', $booking);

        // Assert
        $this->assertTrue($result);
        Mail::assertSent(\App\Mail\SimpleBookingEmail::class, 3);
    }

    public function test_resend_failed_email()
    {
        // Arrange
        $booking = Mockery::mock(Booking::class);
        $booking->listing = (object)['title' => 'Test'];
        
        $emailLog = Mockery::mock(EmailLog::class)->makePartial();
        $emailLog->status = 'failed';
        $emailLog->recipient_email = 'test@example.com';
        $emailLog->booking = $booking;
        $emailLog->shouldReceive('load')->with('booking.listing')->once();
        $emailLog->shouldReceive('update')->with(['status' => 'sending'])->once();
        $emailLog->shouldReceive('markAsSent')->once();
        
        $this->emailLogRepository->shouldReceive('findById')
            ->with(123)
            ->once()
            ->andReturn($emailLog);

        // Act
        $result = $this->emailService->resend(123);

        // Assert
        $this->assertTrue($result);
        Mail::assertSent(\App\Mail\SimpleBookingEmail::class);
    }

    public function test_resend_returns_false_for_already_sent_email()
    {
        // Arrange
        $emailLog = Mockery::mock(EmailLog::class);
        $emailLog->status = 'sent';
        
        $this->emailLogRepository->shouldReceive('findById')
            ->with(123)
            ->once()
            ->andReturn($emailLog);

        // Act
        $result = $this->emailService->resend(123);

        // Assert
        $this->assertFalse($result);
        Mail::assertNothingSent();
    }

    public function test_determineRecipientType_identifies_admin()
    {
        // Arrange
        config(['mail.admin_address' => 'admin@marhire.com']);
        
        // Use reflection to test protected method
        $reflection = new \ReflectionClass($this->emailService);
        $method = $reflection->getMethod('determineRecipientType');
        $method->setAccessible(true);

        // Act & Assert
        $this->assertEquals('admin', $method->invoke($this->emailService, 'admin@marhire.com'));
        $this->assertEquals('customer', $method->invoke($this->emailService, 'customer@example.com'));
    }
}