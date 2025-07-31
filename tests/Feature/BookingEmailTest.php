<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\Agency;
use App\Models\City;
use App\Mail\BookingClientConfirmation;
use App\Mail\BookingProviderNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;

class BookingEmailTest extends TestCase
{
    use DatabaseTransactions;

    protected $listing;
    protected $listingWithoutProviderEmail;

    public function setUp(): void
    {
        parent::setUp();
        
        // Use existing data from database
        $this->listing = Listing::where('category_id', 2)
            ->whereHas('provider', function($query) {
                $query->whereNotNull('email');
            })
            ->first();
            
        if (!$this->listing) {
            $this->markTestSkipped('No car rental listing with provider email found in database');
        }

        // Find a listing without provider email
        $this->listingWithoutProviderEmail = Listing::where('category_id', 2)
            ->whereDoesntHave('provider', function($query) {
                $query->whereNotNull('email');
            })
            ->first();
    }

    /** @test */
    public function it_sends_confirmation_emails_on_successful_booking()
    {
        Mail::fake();

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201);

        // Assert client email was sent
        Mail::assertQueued(BookingClientConfirmation::class, function ($mail) use ($bookingData) {
            return $mail->hasTo($bookingData['email']);
        });

        // Assert provider email was sent
        Mail::assertQueued(BookingProviderNotification::class, function ($mail) {
            return $mail->hasTo($this->listing->provider->email);
        });

        // Assert both emails were queued (not sent immediately)
        Mail::assertQueued(BookingClientConfirmation::class, 1);
        Mail::assertQueued(BookingProviderNotification::class, 1);
    }

    /** @test */
    public function it_still_creates_booking_if_provider_email_is_missing()
    {
        if (!$this->listingWithoutProviderEmail) {
            $this->markTestSkipped('No listing without provider email found');
        }

        Mail::fake();

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listingWithoutProviderEmail->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 30,
            'pickup_date' => now()->addDays(2)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(4)->format('Y-m-d'),
            'pickup_time' => '09:00',
            'dropoff_time' => '17:00',
            'pickup_location' => 'City Center',
            'droppoff_location' => 'Airport',
            'booking_price' => 150,
            'total_price' => 150
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201);

        // Assert client email was sent
        Mail::assertQueued(BookingClientConfirmation::class, function ($mail) use ($bookingData) {
            return $mail->hasTo($bookingData['email']);
        });

        // Assert provider email was NOT sent
        Mail::assertNotQueued(BookingProviderNotification::class);

        // Verify booking was created in database
        $this->assertDatabaseHas('bookings', [
            'email' => 'jane@example.com',
            'first_name' => 'Jane',
            'last_name' => 'Smith'
        ]);
    }

    /** @test */
    public function it_includes_confirmation_number_in_emails()
    {
        Mail::fake();

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201);
        
        $confirmationNumber = $response->json('confirmation_number');
        
        // Assert confirmation number is in correct format
        $this->assertMatchesRegularExpression('/^BK\d{8}-\d{4}$/', $confirmationNumber);

        // Assert emails include the confirmation number
        Mail::assertQueued(BookingClientConfirmation::class, function ($mail) use ($confirmationNumber) {
            return $mail->confirmationNumber === $confirmationNumber;
        });

        Mail::assertQueued(BookingProviderNotification::class, function ($mail) use ($confirmationNumber) {
            return $mail->confirmationNumber === $confirmationNumber;
        });
    }

    /** @test */
    public function it_includes_all_required_booking_details_in_emails()
    {
        Mail::fake();

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'Detail',
            'last_name' => 'Test',
            'email' => 'detail@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'Canada',
            'age' => 35,
            'pickup_date' => now()->addDays(5)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(7)->format('Y-m-d'),
            'pickup_time' => '14:00',
            'dropoff_time' => '16:00',
            'pickup_location' => 'Downtown Office',
            'droppoff_location' => 'Hotel Plaza',
            'flight_number' => 'AC123',
            'notes' => 'Please provide child seat',
            'booking_price' => 200,
            'total_price' => 200
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201);

        // Get the created booking
        $booking = Booking::where('email', 'detail@example.com')->latest()->first();

        // Assert client email contains booking instance
        Mail::assertQueued(BookingClientConfirmation::class, function ($mail) use ($booking) {
            return $mail->booking->id === $booking->id;
        });

        // Assert provider email contains booking instance
        Mail::assertQueued(BookingProviderNotification::class, function ($mail) use ($booking) {
            return $mail->booking->id === $booking->id;
        });
    }

    /** @test */
    public function it_queues_emails_instead_of_sending_immediately()
    {
        Queue::fake();
        Mail::fake();

        $bookingData = [
            'category_id' => 2,
            'listing_id' => $this->listing->id,
            'first_name' => 'Queue',
            'last_name' => 'Test',
            'email' => 'queue@example.com',
            'whatsapp' => '+1234567890',
            'country' => 'USA',
            'age' => 25,
            'pickup_date' => now()->addDays(1)->format('Y-m-d'),
            'dropoff_date' => now()->addDays(3)->format('Y-m-d'),
            'pickup_time' => '10:00',
            'dropoff_time' => '18:00',
            'pickup_location' => 'Airport',
            'droppoff_location' => 'Hotel',
            'booking_price' => 100,
            'total_price' => 100
        ];

        $response = $this->postJson('/api/submit_booking', $bookingData);

        $response->assertStatus(201);

        // Assert emails were queued, not sent
        Mail::assertQueued(BookingClientConfirmation::class);
        Mail::assertQueued(BookingProviderNotification::class);
        Mail::assertNothingSent();
    }
}