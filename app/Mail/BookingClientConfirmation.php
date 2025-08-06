<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingClientConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $booking;
    public $confirmationNumber;

    /**
     * Create a new message instance.
     *
     * @param Booking $booking
     * @param string $confirmationNumber
     * @return void
     */
    public function __construct(Booking $booking, string $confirmationNumber)
    {
        $this->booking = $booking;
        $this->confirmationNumber = $confirmationNumber;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // Load necessary relationships
        $this->booking->load([
            'listing.city',
            'listing.provider',
            'category',
            'addons.addon'
        ]);

        $subject = "MarHire: Booking Confirmation #{$this->confirmationNumber}";

        return $this->subject($subject)
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->view('emails.booking-client')
                    ->with([
                        'booking' => $this->booking,
                        'confirmationNumber' => $this->confirmationNumber,
                        'serviceName' => $this->getServiceName(),
                        'bookingDates' => $this->getBookingDates(),
                        'locationDetails' => $this->getLocationDetails(),
                        'priceBreakdown' => $this->getPriceBreakdown()
                    ]);
    }

    /**
     * Get the service name based on category
     */
    private function getServiceName(): string
    {
        return $this->booking->category->category ?? 'Service';
    }

    /**
     * Get formatted booking dates based on category
     */
    private function getBookingDates(): array
    {
        $dates = [];
        
        switch ($this->booking->category_id) {
            case 2: // Car rental
                $dates = [
                    'type' => 'rental_period',
                    'pickup' => [
                        'date' => $this->booking->pickup_date,
                        'time' => $this->booking->pickup_time,
                        'location' => $this->booking->pickup_location
                    ],
                    'dropoff' => [
                        'date' => $this->booking->dropoff_date,
                        'time' => $this->booking->dropoff_time,
                        'location' => $this->booking->droppoff_location
                    ]
                ];
                break;
                
            case 3: // Private driver
            case 4: // Boat rental
            case 5: // Activity
                $dates = [
                    'type' => 'single_date',
                    'date' => $this->booking->prefered_date,
                    'people' => $this->booking->number_of_people
                ];
                break;
        }
        
        return $dates;
    }

    /**
     * Get location details
     */
    private function getLocationDetails(): array
    {
        $details = [
            'city' => $this->booking->listing->city->city_name ?? ''
        ];
        
        if ($this->booking->category_id == 3) { // Private driver
            $details['route'] = [
                'from' => $this->booking->cityA->city_name ?? '',
                'to' => $this->booking->cityB->city_name ?? ''
            ];
        }
        
        return $details;
    }

    /**
     * Get price breakdown
     */
    private function getPriceBreakdown(): array
    {
        return [
            'base_price' => $this->booking->booking_price,
            'addons_total' => $this->booking->total_addons,
            'discount_or_extra' => $this->booking->discount_or_extra,
            'total' => $this->booking->total_price,
            'addons' => $this->booking->addons->map(function ($bookingAddon) {
                return [
                    'name' => $bookingAddon->addon->addon ?? 'Add-on',
                    'price' => $bookingAddon->price
                ];
            })
        ];
    }
}