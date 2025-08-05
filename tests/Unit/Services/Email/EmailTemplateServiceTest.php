<?php

namespace Tests\Unit\Services\Email;

use Tests\TestCase;
use App\Services\Email\EmailService;
use App\Models\EmailTemplate;
use App\Models\Booking;
use App\Models\EmailLog;
use App\Repositories\EmailLogRepository;
use Illuminate\Support\Facades\Mail;
use Mockery;

class EmailTemplateServiceTest extends TestCase
{
    protected $emailService;
    protected $mockRepository;
    
    protected function setUp(): void
    {
        parent::setUp();
        
        // Mock the repository
        $this->mockRepository = Mockery::mock(EmailLogRepository::class);
        $this->emailService = new EmailService($this->mockRepository);
        
        // Prevent actual mail sending
        Mail::fake();
    }
    
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
    
    public function testReplaceVariablesInTemplate()
    {
        // Create a mock booking
        $booking = $this->createMockBooking();
        
        // Create test template text
        $templateText = 'Hello {{client_name}}, your booking {{booking_reference}} for {{listing_title}} is confirmed.';
        
        // Use reflection to test protected method
        $reflection = new \ReflectionClass($this->emailService);
        $method = $reflection->getMethod('replaceVariables');
        $method->setAccessible(true);
        
        $result = $method->invoke($this->emailService, $templateText, $booking);
        
        $expected = 'Hello John Doe, your booking BK-2025-123 for Test Listing is confirmed.';
        $this->assertEquals($expected, $result);
    }
    
    public function testEmailServiceUsesTemplateWhenAvailable()
    {
        // Create a mock booking
        $booking = $this->createMockBooking();
        
        // Mock email log creation
        $mockEmailLog = Mockery::mock(EmailLog::class);
        $mockEmailLog->shouldReceive('markAsSent')->once();
        $mockEmailLog->id = 1;
        
        $this->mockRepository->shouldReceive('create')
            ->once()
            ->andReturn($mockEmailLog);
        
        // Send email
        $result = $this->emailService->send('test@example.com', 'booking_received', $booking);
        
        $this->assertTrue($result);
        Mail::assertSent(\App\Mail\DatabaseTemplateEmail::class, function ($mail) {
            return $mail->hasTo('test@example.com');
        });
    }
    
    public function testEmailServiceFallsBackToBladeTemplate()
    {
        // Create a mock booking
        $booking = $this->createMockBooking();
        
        // Mock email log
        $mockEmailLog = Mockery::mock(EmailLog::class);
        $mockEmailLog->shouldReceive('markAsSent')->once();
        $mockEmailLog->id = 1;
        
        $this->mockRepository->shouldReceive('create')
            ->once()
            ->andReturn($mockEmailLog);
        
        // Send email with non-existent template type
        $result = $this->emailService->send('test@example.com', 'non_existent_type', $booking);
        
        $this->assertTrue($result);
        Mail::assertSent(\App\Mail\SimpleBookingEmail::class, function ($mail) {
            return $mail->hasTo('test@example.com');
        });
    }
    
    private function createMockBooking()
    {
        $booking = Mockery::mock(Booking::class)->makePartial();
        $booking->id = 123;
        $booking->name = 'John Doe';
        $booking->email = 'john@example.com';
        $booking->reference = 'BK-2025-123';
        $booking->total_amount = 1500.00;
        $booking->currency = 'MAD';
        $booking->check_in = now()->addDays(7);
        $booking->check_out = now()->addDays(10);
        
        $listing = new \stdClass();
        $listing->title = 'Test Listing';
        
        $category = new \stdClass();
        $category->slug = 'test-category';
        
        $listing->category = $category;
        $booking->listing = $listing;
        
        return $booking;
    }
}