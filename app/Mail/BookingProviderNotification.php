<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingProviderNotification extends Mailable implements ShouldQueue
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
            'addons.addon',
            'city',
            'cityA',
            'cityB'
        ]);

        $subject = "MarHire: New Booking #{$this->confirmationNumber}";

        return $this->subject($subject)
                    ->from('contact@marhire.com', 'MarHire')
                    ->view('emails.booking-provider')
                    ->with([
                        'booking' => $this->booking,
                        'confirmationNumber' => $this->confirmationNumber,
                        'adminLink' => url("/admin/bookings/edit/{$this->booking->id}"),
                        'serviceName' => $this->getServiceName(),
                        'clientDetails' => $this->getClientDetails(),
                        'bookingDetails' => $this->getBookingDetails(),
                        'priceDetails' => $this->getPriceDetails()
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
     * Get client details
     */
    private function getClientDetails(): array
    {
        return [
            'name' => $this->booking->first_name . ' ' . $this->booking->last_name,
            'email' => $this->booking->email,
            'whatsapp' => $this->booking->whatsapp,
            'country' => $this->booking->country,
            'notes' => $this->booking->notes
        ];
    }

    /**
     * Get booking details based on category
     */
    private function getBookingDetails(): array
    {
        $details = [
            'listing_title' => $this->booking->listing->title ?? '',
            'category' => $this->getServiceName(),
            'booking_source' => $this->booking->booking_source,
            'status' => $this->booking->status
        ];
        
        switch ($this->booking->category_id) {
            case 2: // Car rental
                $details['dates'] = [
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
                $details['age'] = $this->booking->age;
                $details['flight_number'] = $this->booking->flight_number;
                break;
                
            case 3: // Private driver
                $details['date'] = $this->booking->prefered_date;
                $details['route'] = [
                    'from' => $this->booking->cityA->city_name ?? '',
                    'to' => $this->booking->cityB->city_name ?? ''
                ];
                $details['car_type'] = $this->booking->car_type;
                $details['airport_or_intercity'] = $this->booking->airport_or_intercity;
                $details['number_of_people'] = $this->booking->number_of_people;
                break;
                
            case 4: // Boat rental
                $details['date'] = $this->booking->prefered_date;
                $details['duration'] = $this->booking->duration;
                $details['purpose'] = $this->booking->propose;
                $details['number_of_people'] = $this->booking->number_of_people;
                break;
                
            case 5: // Activity
                $details['date'] = $this->booking->prefered_date;
                $details['activity_type'] = $this->booking->activity_type;
                $details['number_of_people'] = $this->booking->number_of_people;
                break;
        }
        
        // Add selected addons
        if ($this->booking->addons->count() > 0) {
            $details['addons'] = $this->booking->addons->map(function ($bookingAddon) {
                return $bookingAddon->addon->addon ?? 'Add-on';
            })->toArray();
        }
        
        return $details;
    }

    /**
     * Get price details for provider
     */
    private function getPriceDetails(): array
    {
        return [
            'booking_price' => $this->booking->booking_price,
            'addons_total' => $this->booking->total_addons,
            'discount_or_extra' => $this->booking->discount_or_extra,
            'total_price' => $this->booking->total_price,
            'net_agency_price' => $this->booking->net_agency_price,
            'commission_amount' => $this->booking->commission_amount
        ];
    }
}