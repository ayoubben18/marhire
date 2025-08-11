<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\BookingAddon;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Listing;
use App\Models\ListingAddon;
use App\Models\Booking;
use App\Models\SubCategoryOption;
use App\Models\City;
use App\Models\CustomBookingOption;
use App\Models\DriverPricing;
use App\Models\ScheduledReminder;
use App\Models\EmailSetting;
use App\Models\EmailLog;
use App\Services\BookingValidationService;
use App\Services\Email\EmailServiceInterface;
use App\Services\PDFService;
use App\Mail\BookingClientConfirmation;
use App\Mail\BookingProviderNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Auth;

class BookingController extends Controller
{
    public function list(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $bookings = Booking::latest()->get();

        return view('bookings.list')->with([
            'layout' => $layout,
            'bookings' => $bookings
        ]);
    }

    public function new(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $categories = Category::orderBy('category')->get();
        $cities = City::orderBy('city_name')->get();
        $countries = Country::orderBy('country')->get();
        $vehiculeTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 3)
            ->where('subcategory', 'Vehicule Type')
            ->select('sub_category_options.id', 'option')
            ->get();
        $activityTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 5)
            ->where('subcategory', 'Activity Type')
            ->select('sub_category_options.id', 'option')
            ->get();

        return view('bookings.add')->with([
            'layout' => $layout,
            'categories' => $categories,
            'countries' => $countries,
            'vehiculeTypes' => $vehiculeTypes,
            'activityTypes' => $activityTypes,
            'cities' => $cities
        ]);
    }

    public function insert(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'listing_id' => ['required']
        ]);

        $addons = array_filter($request->input('addons', []));

        $listing = Listing::find($request->listing_id);

        // Get language from session or request, default to app locale
        $locale = session('locale', config('app.locale'));
        if ($request->has('booking_language')) {
            $locale = $request->booking_language;
        }
        // Validate locale
        $supportedLocales = config('app.supported_locales', ['en']);
        if (!in_array($locale, $supportedLocales)) {
            $locale = config('app.fallback_locale', 'en');
        }

        $bookingFields = [
            'category_id' => $request->category_id,
            'listing_id' => $request->listing_id,
            'city_id' => $listing->city_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'whatsapp' => $request->whatsapp,
            'country' => $request->country,
            'notes' => $request->notes,
            'booking_price' => $request->booking_price ?? 0,
            'total_addons' => $request->total_addons ?? 0,
            'total_price' => $request->total_price ?? 0,
            'booking_source' => 'Admin Entry',
            'booking_language' => $locale,
            'discount_or_extra' => $request->discount_or_extra ?? 0,
            'created_by' => Auth::id()
        ];

        switch ((int) $request->category_id) {
            case 2:
                $bookingFields += [
                    'age' => $request->age,
                    'flight_number' => $request->flight_number,
                    'pickup_date' => $request->pickup_date,
                    'dropoff_date' => $request->dropoff_date,
                    'pickup_time' => $request->pickup_time,
                    'dropoff_time' => $request->dropoff_time,
                    'pickup_location' => $request->pickup_location,
                    'dropoff_location' => $request->dropoff_location
                ];
                break;

            case 3:
                $bookingFields += [
                    'car_type' => $request->car_type,
                    'airport_or_intercity' => $request->airport_or_intercity,
                    'city_a_id' => $request->city_a_id,
                    'city_b_id' => $request->city_b_id,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people
                ];
                break;

            case 4:
                $bookingFields += [
                    'duration' => $request->duration,
                    'propose' => $request->propose,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people
                ];
                break;

            case 5:
                $bookingFields += [
                    'prefered_date' => $request->prefered_date,
                    'pricing_option_id' => $request->pricing_option_id,
                    'number_of_people' => $request->number_of_people,
                    'activity_type' => $request->activity_type
                ];
                break;
        }

        $booking = Booking::create($bookingFields);

        foreach ($addons as $addonId) {
            BookingAddon::create([
                'booking_id' => $booking->id,
                'addon_id' => $addonId
            ]);
        }

        // Send booking created emails (with settings check)
        $emailService = app(EmailServiceInterface::class);
        $booking->load('listing.category');
        
        if (EmailSetting::isEmailEnabled($booking->listing->category, 'booking_received')) {
            // Get customer's preferred language for returning customers
            $customerLanguage = getCustomerLanguage($booking->email);
            
            // Send to customer in their preferred language
            $emailService->send($booking->email, 'booking_received', $booking, null, $customerLanguage);
            // Send to admin (always in English)
            $emailService->send(EmailSetting::getAdminEmail(), 'booking_received', $booking, null, 'en');
        }

        return back()->with('inserted', true);
    }

    public function delete(Request $request)
    {
        $booking = Booking::findOrFail($request->id);

        $booking->delete();

        return 'success';
    }

    public function getListings(Request $request)
    {
        $listings = Listing::where('category_id', 3)
            ->where('vehicule_type', $request->car_type)
            ->where('city_id', $request->city_a_id)
            ->orderBy('title')
            ->with([
                'pricings' => function ($query) use ($request) {
                    $query->where('city_id', $request->city_b_id);
                }
            ])
            ->get();

        return response()->json([
            'listings' => $listings
        ]);
    }

    public function getActivityListings(Request $request)
    {
        $listings = Listing::where('category_id', 5)
            ->where('activity_type', $request->activity_type)
            ->orderBy('title')
            ->with('pricings')
            ->get();

        return response()->json([
            'listings' => $listings
        ]);
    }

    public function changeStatus(Request $request)
    {
        $booking = Booking::with('listing.category')->findOrFail($request->id);
        $oldStatus = $booking->status;
        $newStatus = $request->status;

        // Update booking status
        $booking->update([
            'status' => $newStatus
        ]);

        // Only handle reminder scheduling on status change, not email sending
        if (strtolower($newStatus) === 'confirmed' && strtolower($oldStatus) !== 'confirmed') {
            // Schedule reminder if applicable and enabled
            if (EmailSetting::isEmailEnabled($booking->listing->category, 'booking_reminder')) {
                $this->scheduleReminderIfNeeded($booking);
            }
        } elseif (strtolower($newStatus) === 'cancelled' && strtolower($oldStatus) !== 'cancelled') {
            // Cancel any pending reminders
            ScheduledReminder::where('booking_id', $booking->id)
                ->where('status', 'pending')
                ->update(['status' => 'cancelled']);
        }

        return 'success';
    }
    public function edit(Request $request, $id)
    {
        $layout = 'layouts.dashboard_admin';
        $categories = Category::orderBy('category')->get();
        $countries = Country::orderBy('country')->get();
        $cities = City::orderBy('city_name')->get();
        $booking = Booking::where('id', $id)->with('addons')->first();
        $vehiculeTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 3)
            ->where('subcategory', 'Vehicule Type')
            ->select('sub_category_options.id', 'option')
            ->get();
        $activityTypes = SubCategoryOption::leftJoin('sub_categories', 'sub_categories.id', '=', 'sub_category_options.subcategory_id')
            ->where('id_category', 5)
            ->where('subcategory', 'Activity Type')
            ->select('sub_category_options.id', 'option')
            ->get();

        return view('bookings.update')->with([
            'layout' => $layout,
            'booking' => $booking,
            'countries' => $countries,
            'categories' => $categories,
            'vehiculeTypes' => $vehiculeTypes,
            'activityTypes' => $activityTypes,
            'cities' => $cities
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:bookings,id',
            'category_id' => 'required',
            'listing_id' => ['required']
        ]);

        $addons = array_filter($request->input('addons', []));
        $listing = Listing::find($request->listing_id);

        // Base booking fields
        $bookingFields = [
            'category_id' => $request->category_id,
            'listing_id' => $request->listing_id,
            'city_id' => $listing->city_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'whatsapp' => $request->whatsapp,
            'country' => $request->country,
            'notes' => $request->notes,
            'booking_price' => $request->booking_price ?? 0,
            'total_addons' => $request->total_addons ?? 0,
            'total_price' => $request->total_price ?? 0,
            'discount_or_extra' => $request->discount_or_extra ?? 0,
            'status' => $request->status ?? 'Pending' // Maintain existing status if not provided
        ];

        // Category-specific fields
        switch ((int) $request->category_id) {
            case 2:
                $bookingFields += [
                    'age' => $request->age,
                    'flight_number' => $request->flight_number,
                    'pickup_date' => $request->pickup_date,
                    'dropoff_date' => $request->dropoff_date,
                    'pickup_time' => $request->pickup_time,
                    'dropoff_time' => $request->dropoff_time,
                    'pickup_location' => $request->pickup_location,
                    'dropoff_location' => $request->dropoff_location
                ];
                break;

            case 3:
                $bookingFields += [
                    'car_type' => $request->car_type,
                    'airport_or_intercity' => $request->airport_or_intercity,
                    'city_a_id' => $request->city_a_id,
                    'city_b_id' => $request->city_b_id,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people
                ];
                break;

            case 4:
                $bookingFields += [
                    'duration' => $request->duration,
                    'propose' => $request->propose,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people
                ];
                break;

            case 5:
                $bookingFields += [
                    'prefered_date' => $request->prefered_date,
                    'pricing_option_id' => $request->pricing_option_id,
                    'number_of_people' => $request->number_of_people
                ];
                break;
        }

        // Find and update the booking
        $booking = Booking::findOrFail($request->id);
        $booking->update($bookingFields);

        // Sync addons - delete existing and create new ones
        $booking->addons()->delete(); // Remove all existing addons

        foreach ($addons as $addonId) {
            $addonPrice = ListingAddon::find($addonId)->price ?? 0;
            BookingAddon::create([
                'booking_id' => $booking->id,
                'addon_id' => $addonId,
                'price' => $addonPrice
            ]);
        }

        return back()->with('updated', true);
    }

    public function calendarData(Request $request)
    {
        $query = Booking::query();

        // Optional filters
        if ($request->has('category_id') && $request->category_id != 'all') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status') && $request->status != 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('city_id') && $request->city_id != 'all') {
            $query->where('city_id', $request->city_id);
        }

        $bookings = $query->with('listing')->get();


        $events = $bookings->map(function ($booking) {
            // Logic for determining start/end
            if ($booking->category_id == 2) {
                $start = $booking->pickup_date . 'T' . $booking->pickup_time;
                $end = $booking->dropoff_date . 'T' . $booking->dropoff_time;
            } else {
                $start = $booking->prefered_date;
                $end = $booking->prefered_date; // one-day event
            }

            return [
                'id' => $booking->id,
                'title' => $booking->first_name . ' ' . $booking->last_name . ' - ' . optional($booking->category)->name,
                'start' => $start,
                'end' => $end,
                'booking' => $booking->city,
                'color' => $this->getColorByCategory($booking->category_id),
                'extendedProps' => [
                    'status' => $booking->status,
                    'city_a' => $booking->city_a_id,
                    'category' => $booking->category_id,
                    'details' => $booking,
                ]
            ];
        });

        return response()->json($events);
    }

    private function getColorByCategory($categoryId)
    {
        switch ((int) $categoryId) {
            case 2:
                return '#44A9AA'; // Car
            case 3:
                return '#583759'; // Driver
            case 4:
                return '#4F42B5'; // Boat
            case 5:
                return '#E2725B'; // Activity
            default:
                return '#6c757d'; // Default gray
        }
    }

    public function bookingsPerMonth(Request $request)
    {
        $type = $request->input('filter_type', 'per_month');
        $status = $request->input('filter_status', 'all');
        $city = $request->input('filter_city', 'all');
        $category = $request->input('filter_category', 'all');

        $query = Booking::query();

        // Apply filters
        if ($status !== 'all') {
            $query->where('status', $status);
        }
        if ($city !== 'all') {
            $query->where('city_id', $city);
        }
        if ($category !== 'all') {
            $query->where('category_id', $category);
        }

        // Data transformation based on type
        switch ($type) {
            case 'per_category':
                $data = $query->selectRaw('category_id, COUNT(*) as total')
                    ->groupBy('category_id')
                    ->get()
                    ->map(function ($item) {
                        return [
                            'label' => $item->category->category ?? 'Unknown',
                            'total' => $item->total
                        ];
                    });
                break;

            case 'per_city':
                $data = $query->selectRaw('city_id, COUNT(*) as total')
                    ->groupBy('city_id')
                    ->get()
                    ->map(function ($item) {
                        return [
                            'label' => $item->city->city_name ?? 'Unknown',
                            'total' => $item->total
                        ];
                    });
                break;

            case 'per_agency':

                $items = $query->join('listings', 'listings.id', '=', 'bookings.listing_id')
                              ->selectRaw('provider_id, COUNT(*) as total')  
                              ->groupBy('provider_id')
                              ->get();
                              $data = [];
                foreach($items as $index=>$item)
                {
                    $data[] = [
                                'label' => Agency::find($item->provider_id)->agency_name ?? 'Unknown',
                                'total' => $item->total,
                            ];
                }
                break;

            default: // per_month
                $start = Carbon::now()->subMonths(11)->startOfMonth();
                $end = Carbon::now()->endOfMonth();

                $rawData = $query->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as total")
                    ->whereBetween('created_at', [$start, $end])
                    ->groupBy('month')
                    ->pluck('total', 'month');

                // Fill missing months
                $cursor = $start->copy();
                $data = [];
                while ($cursor <= $end) {
                    $monthKey = $cursor->format('Y-m');
                    $data[] = [
                        'label' => ucfirst($cursor->translatedFormat('F')),
                        'total' => $rawData[$monthKey] ?? 0,
                    ];
                    $cursor->addMonth();
                }
                break;
        }

        return response()->json($data);
    }

    public function getFilters(Request $request)
    {
        $categories = Category::orderBy('category')->get();
        $cities = City::orderBy('city_name')->get();
        $agencies = Agency::orderBy('agency_name')->get();

        return response()->json([
            'categories' => $categories,
            'cities' => $cities,
            'agencies' => $agencies
        ]);
    }

    public function submitBooking(Request $request, BookingValidationService $validationService)
    {
        try {
            // Validate all booking data using the validation service
            $validationResult = $validationService->validateBookingData($request);
            $listing = $validationResult['listing'];
            $pricingData = $validationResult['pricing'];

            \DB::beginTransaction();

            // Split fullName into first_name and last_name
            $nameParts = explode(' ', $request->fullName, 2);
            $firstName = $nameParts[0] ?? '';
            $lastName = $nameParts[1] ?? '';

            // Get language from request or session, default to app locale
            $locale = $request->booking_language ?? $request->locale ?? session('locale', config('app.locale'));
            
            // Validate locale
            $supportedLocales = config('app.supported_locales', ['en']);
            if (!in_array($locale, $supportedLocales)) {
                $locale = config('app.fallback_locale', 'en');
            }

            // Prepare base booking fields with validated pricing
            $bookingFields = [
                'category_id' => $request->category_id,
                'listing_id' => $request->listing_id,
                'city_id' => $listing->city_id,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $request->email,
                'whatsapp' => $request->whatsAppNumber,
                'country' => $request->countryOfResidence,
                'date_of_birth' => $request->dateOfBirth,
                'notes' => $request->additionalNotes ?? null,
                'additional_notes' => $request->additionalNotes ?? null,
                'booking_price' => $pricingData['booking_price'],
                'total_addons' => $pricingData['total_addons'],
                'total_price' => $pricingData['total_price'],
                'booking_language' => $locale,
                'status' => 'Pending',
                'booking_source' => 'Client Booking',
                'discount_or_extra' => $request->discount_or_extra ?? 0,
                'created_by' => -1, // Guest booking (using default value)
                'terms_accepted' => $request->termsAccepted
            ];

            // Add category-specific fields
            $bookingFields = array_merge($bookingFields, $this->getCategorySpecificFields($request));

            // Create booking
            $booking = Booking::create($bookingFields);

            // Handle addons if provided
            $addons = array_filter($request->input('addons', []));
            foreach ($addons as $addonId) {
                $addon = ListingAddon::find($addonId);
                BookingAddon::create([
                    'booking_id' => $booking->id,
                    'addon_id' => $addonId,
                    'price' => $addon ? $addon->price : 0
                ]);
            }

            \DB::commit();

            // Generate confirmation number using booking ID
            $confirmationNumber = 'BK' . date('Ymd') . '-' . str_pad($booking->id, 4, '0', STR_PAD_LEFT);

            // Send booking created emails using EmailService (with settings check)
            $emailService = app(EmailServiceInterface::class);
            $booking->load('listing.category');
            
            // Send booking_received email to customer and admin
            if (EmailSetting::isEmailEnabled($booking->listing->category, 'booking_received')) {
                // Get customer's preferred language for returning customers
                $customerLanguage = getCustomerLanguage($booking->email);
                
                // Send to customer in their preferred language
                $emailService->send($booking->email, 'booking_received', $booking, null, $customerLanguage);
                // Send to admin (always in English)
                $emailService->send(EmailSetting::getAdminEmail(), 'booking_received', $booking, null, 'en');
                
                Log::info('Booking emails sent', [
                    'booking_id' => $booking->id,
                    'customer_email' => $booking->email,
                    'admin_email' => EmailSetting::getAdminEmail(),
                    'status' => $booking->status
                ]);
            }

            return response()->json([
                'success' => true,
                'booking_id' => $booking->id,
                'confirmation_number' => $confirmationNumber,
                'message' => 'Thank you! Your booking has been successfully submitted. We\'ve received your request and our team is reviewing the details. You\'ll receive a confirmation shortly by email or WhatsApp.'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \DB::rollback();
            
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \DB::rollback();
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating your booking. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }


    private function getCategorySpecificFields(Request $request)
    {
        $categoryId = (int) $request->category_id;
        $fields = [];
        
        // Calculate age from dateOfBirth for backward compatibility
        $dateOfBirth = $request->dateOfBirth ? \Carbon\Carbon::parse($request->dateOfBirth) : null;
        $age = $dateOfBirth ? $dateOfBirth->age : null;
        
        switch ($categoryId) {
            case 2: // Car rental
                $fields = [
                    'age' => $age,
                    'flight_number' => $request->flightNumber ?? null,
                    'pickup_date' => $request->pickup_date,
                    'dropoff_date' => $request->dropoff_date,
                    'pickup_time' => $request->pickup_time,
                    'dropoff_time' => $request->dropoff_time,
                    'pickup_location' => $request->pickup_location,
                    'dropoff_location' => $request->dropoff_location
                ];
                break;
                
            case 3: // Private driver
                $fields = [
                    'car_type' => $request->car_type,
                    'airport_or_intercity' => is_array($request->service_type) ? implode(',', $request->service_type) : $request->service_type,
                    'city_a_id' => $request->city_a_id,
                    'city_b_id' => $request->city_b_id,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people,
                    'notes' => (isset($request->road_type) ? 'Road type: ' . (is_array($request->road_type) ? implode(',', $request->road_type) : $request->road_type) : '') .
                              (isset($request->number_of_luggage) ? ' Luggage: ' . $request->number_of_luggage : '')
                ];
                break;
                
            case 4: // Boat rental
                $fields = [
                    'duration' => $request->duration,
                    'propose' => $request->propose,
                    'prefered_date' => $request->prefered_date,
                    'number_of_people' => $request->number_of_people,
                    'pickup_time' => $request->pickup_time ?? null
                ];
                break;
                
            case 5: // Activity
                $fields = [
                    'prefered_date' => $request->prefered_date,
                    'pricing_option_id' => $request->pricing_option_id ?? 0,
                    'number_of_people' => $request->number_of_people,
                    'activity_type' => $request->activity_type,
                    'pickup_time' => $request->pickup_time ?? null
                ];
                break;
        }
        
        return $fields;
    }

    /**
     * Send booking confirmation emails
     */
    private function sendBookingEmails(Booking $booking, string $confirmationNumber): void
    {
        try {
            // Send client confirmation email
            Mail::to($booking->email)->queue(
                new BookingClientConfirmation($booking, $confirmationNumber)
            );

            // Send provider notification email if provider has email
            $booking->load('listing.provider');
            
            if ($booking->listing && 
                $booking->listing->provider && 
                $booking->listing->provider->email) {
                
                Mail::to($booking->listing->provider->email)->queue(
                    new BookingProviderNotification($booking, $confirmationNumber)
                );
            } else {
                // Log warning if provider email is missing
                Log::warning('Provider email not found for booking ID: ' . $booking->id);
            }
        } catch (\Exception $e) {
            // Log the error but don't throw - emails should not block booking creation
            Log::error('Failed to send booking emails for booking ID: ' . $booking->id, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Calculate booking price without authentication
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculatePrice(Request $request)
    {
        // Validate request parameters
        $validationRules = [
            'listing_id' => 'required|exists:listings,id',
            'category_id' => 'required|in:2,3,4,5',
            'addon_ids' => 'nullable|array',
            'addon_ids.*' => 'integer|exists:listing_addons,id',
        ];

        // Category-specific validation
        switch ((int) $request->category_id) {
            case 2: // Car rental
                $validationRules += [
                    'pickup_date' => 'required|date',
                    'pickup_time' => 'required|date_format:H:i',
                    'dropoff_date' => 'required|date|after_or_equal:pickup_date',
                    'dropoff_time' => 'required|date_format:H:i',
                    'pickup_location' => 'required|string',
                    'dropoff_location' => 'required|string'
                ];
                break;
            case 3: // Private driver
                $validationRules += [
                    'service_type' => 'required|array',
                    'service_type.*' => 'in:airport_transfer,intercity',
                    'road_type' => 'required|array',
                    'road_type.*' => 'in:one_way,road_trip',
                    'city_a_id' => 'required|exists:cities,id',
                    'city_b_id' => 'nullable|exists:cities,id'
                ];
                break;
            case 4: // Boat rental
                $validationRules += [
                    'duration' => 'required|numeric|min:0.5|max:8',
                    'number_of_people' => 'required|integer|min:1'
                ];
                break;
            case 5: // Things to do
                $validationRules += [
                    'custom_booking_option_id' => 'required|integer',
                    'number_of_people' => 'required|integer|min:1',
                    'activity_type' => 'required|string'
                ];
                break;
        }

        $request->validate($validationRules);

        try {
            // Load listing with necessary relationships
            $listing = Listing::with(['addons.addon', 'pricings', 'customBookingOptions'])
                ->findOrFail($request->listing_id);

            // Verify category matches
            if ($listing->category_id != $request->category_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Listing category does not match the requested category'
                ], 400);
            }

            // Calculate base price based on category
            $priceCalculation = $this->calculateAdvancedPrice($listing, $request);
            
            // Calculate add-on prices
            $addonDetails = [];
            $totalAddons = 0;
            
            if ($request->has('addon_ids') && is_array($request->addon_ids)) {
                // Load addon details directly
                $addons = ListingAddon::whereIn('id', $request->addon_ids)->get();
                
                foreach ($addons as $addon) {
                    // Check if this addon is available for this listing
                    $isAvailable = $listing->addons->where('addon_id', $addon->id)->first();
                    if ($isAvailable) {
                        $addonDetails[] = [
                            'id' => $addon->id,
                            'name' => $addon->addon,
                            'price' => (float) $addon->price
                        ];
                        $totalAddons += (float) $addon->price;
                    }
                }
            }

            // Prepare response data
            $responseData = [
                'base_price' => round($priceCalculation['base_price'], 2),
                'pricing_details' => $priceCalculation['pricing_details'],
                'addons' => $addonDetails,
                'total_addons' => round($totalAddons, 2),
                'total' => round($priceCalculation['base_price'] + $totalAddons, 2),
                'currency' => '€'
            ];

            // Add any notifications (like drop-off fee notice)
            if (!empty($priceCalculation['notifications'])) {
                $responseData['notifications'] = $priceCalculation['notifications'];
            }

            return response()->json([
                'success' => true,
                'data' => $responseData
            ]);

        } catch (\Exception $e) {
            Log::error('Price calculation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error calculating price: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get email status for a booking
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEmailStatus($id)
    {
        $booking = Booking::findOrFail($id);
        $emailLogs = EmailLog::where('booking_id', $id)
            ->select('id', 'email_type', 'status', 'created_at', 'error_message', 'pdf_path', 'recipient_email', 'retry_count')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('email_type');
        
        // Only three email types - no reminders
        $emailTypes = ['booking_received', 'booking_confirmed', 'booking_cancelled'];
        $status = [];
        
        foreach ($emailTypes as $type) {
            $logs = $emailLogs->get($type);
            if ($logs && $logs->count() > 0) {
                // Get all logs for this email type, sorted by created_at DESC
                $logsArray = $logs->map(function($log) {
                    return [
                        'id' => $log->id,
                        'status' => $log->status,
                        'created_at' => $log->created_at ? $log->created_at->format('Y-m-d H:i:s') : null,
                        'recipient_email' => $log->recipient_email,
                        'error_message' => $log->error_message,
                        'retry_count' => $log->retry_count ?? 0,
                        'has_pdf' => !empty($log->pdf_path)
                    ];
                })->toArray();
                
                // Get the latest log to determine can_retry and can_resend
                $latestLog = $logs->first();
                $maxRetries = config('mail.max_retries', 3);
                
                $status[$type] = [
                    'logs' => array_values($logsArray),
                    'can_retry' => $latestLog->status === 'failed' && ($latestLog->retry_count ?? 0) < $maxRetries,
                    'can_resend' => $latestLog->status === 'sent'
                ];
            } else {
                $status[$type] = [
                    'logs' => [],
                    'can_retry' => false,
                    'can_resend' => false
                ];
            }
        }
        
        return response()->json([
            'booking' => $booking,
            'email_status' => $status
        ]);
    }

    /**
     * Send email for a booking
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendEmail(Request $request, $id)
    {
        $request->validate([
            'email_type' => 'required|in:booking_received,booking_confirmed,booking_cancelled'
        ]);
        
        $booking = Booking::with('listing.category')->findOrFail($id);
        $emailType = $request->email_type;
        
        // Validate email type matches booking status
        $statusMismatch = false;
        $expectedStatus = '';
        
        switch ($emailType) {
            case 'booking_received':
                if (strtolower($booking->status) !== 'pending') {
                    $statusMismatch = true;
                    $expectedStatus = 'Pending';
                }
                break;
            case 'booking_confirmed':
                if (strtolower($booking->status) !== 'confirmed') {
                    $statusMismatch = true;
                    $expectedStatus = 'Confirmed';
                }
                break;
            case 'booking_cancelled':
                if (strtolower($booking->status) !== 'cancelled') {
                    $statusMismatch = true;
                    $expectedStatus = 'Cancelled';
                }
                break;
        }
        
        if ($statusMismatch) {
            return response()->json([
                'success' => false,
                'message' => "Cannot send this email type. Please update the booking status to '{$expectedStatus}' first.",
                'mismatch' => true,
                'current_status' => $booking->status,
                'required_status' => $expectedStatus
            ], 422);
        }
        
        try {
            $emailService = app(EmailServiceInterface::class);
            
            // Send to customer
            $customerSuccess = $emailService->send($booking->email, $emailType, $booking);
            
            if ($customerSuccess) {
                // Also send to admin
                $adminEmail = EmailSetting::getAdminEmail();
                if ($adminEmail) {
                    $emailService->send($adminEmail, $emailType, $booking);
                }
                
                // Get updated email status
                return response()->json([
                    'success' => true,
                    'message' => 'Email sent successfully',
                    'history' => $this->getEmailStatus($id)->getData()
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to send email',
                    'history' => $this->getEmailStatus($id)->getData()
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error sending email for booking ' . $id, [
                'email_type' => $emailType,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while sending the email',
                'error' => config('app.debug') ? $e->getMessage() : null,
                'history' => $this->getEmailStatus($id)->getData()
            ]);
        }
    }

    /**
     * Retry sending a failed email
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function retryEmail(Request $request, $id)
    {
        $request->validate([
            'email_log_id' => 'required|integer|exists:email_logs,id'
        ]);

        try {
            $emailLog = EmailLog::findOrFail($request->email_log_id);
            
            // Verify this log belongs to the booking
            if ($emailLog->booking_id != $id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email log does not belong to this booking'
                ], 403);
            }
            
            // Get booking with relationships
            $booking = Booking::with('listing.category')->findOrFail($id);
            
            // Validate email type matches booking status
            $statusMismatch = false;
            $expectedStatus = '';
            
            switch ($emailLog->email_type) {
                case 'booking_received':
                    if (strtolower($booking->status) !== 'pending') {
                        $statusMismatch = true;
                        $expectedStatus = 'Pending';
                    }
                    break;
                case 'booking_confirmed':
                    if (strtolower($booking->status) !== 'confirmed') {
                        $statusMismatch = true;
                        $expectedStatus = 'Confirmed';
                    }
                    break;
                case 'booking_cancelled':
                    if (strtolower($booking->status) !== 'cancelled') {
                        $statusMismatch = true;
                        $expectedStatus = 'Cancelled';
                    }
                    break;
            }
            
            if ($statusMismatch) {
                return response()->json([
                    'success' => false,
                    'message' => "Cannot retry this email type. Please update the booking status to '{$expectedStatus}' first.",
                    'mismatch' => true,
                    'current_status' => $booking->status,
                    'required_status' => $expectedStatus
                ], 422);
            }
            
            // Check max retries
            $maxRetries = config('mail.max_retries', 3);
            if ($emailLog->retry_count >= $maxRetries) {
                return response()->json([
                    'success' => false,
                    'message' => 'Maximum retry attempts reached'
                ]);
            }
            
            // Increment retry count
            $emailLog->increment('retry_count');
            
            // Apply optional delay
            if ($delay = config('mail.retry_delay_seconds', 0)) {
                sleep($delay);
            }
            
            // Resend the email using the same type
            $emailService = app(EmailServiceInterface::class);
            $success = $emailService->send($emailLog->recipient_email, $emailLog->email_type, $booking);
            
            if ($success) {
                return response()->json([
                    'success' => true,
                    'message' => 'Email retry successful',
                    'history' => $this->getEmailStatus($id)->getData()
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to retry email',
                    'history' => $this->getEmailStatus($id)->getData()
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error retrying email for booking ' . $id, [
                'email_log_id' => $request->email_log_id,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrying the email',
                'error' => config('app.debug') ? $e->getMessage() : null,
                'history' => $this->getEmailStatus($id)->getData()
            ]);
        }
    }

    /**
     * Download invoice for a booking
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function downloadInvoice($id)
    {
        try {
            $booking = Booking::with([
                'listing.category',
                'listing.city',
                'listing.provider'
            ])->findOrFail($id);
            
            // Generate the PDF (always generate fresh to ensure latest data)
            $emailService = app(EmailServiceInterface::class);
            
            // Use reflection to access the private method
            $reflection = new \ReflectionClass($emailService);
            $method = $reflection->getMethod('prepareInvoiceData');
            $method->setAccessible(true);
            $invoiceData = $method->invoke($emailService, $booking);
            
            // Generate PDF with category-specific template
            $pdfService = new PDFService();
            $relativePath = $pdfService->generateInvoice($invoiceData, $booking->category_id);
            
            if (!$relativePath) {
                return response()->json(['error' => 'Failed to generate invoice'], 500);
            }
            
            // Convert relative path to absolute path
            $filePath = storage_path('app/' . $relativePath);
            
            if (!file_exists($filePath)) {
                return response()->json(['error' => 'Invoice file not found after generation'], 500);
            }
            
            // Return the PDF as download
            return response()->download($filePath, 'invoice-' . $booking->invoice_no . '.pdf', [
                'Content-Type' => 'application/pdf',
            ]);
        } catch (\Exception $e) {
            Log::error('Error downloading invoice for booking ' . $id, [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'error' => 'Failed to download invoice',
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    /**
     * Calculate advanced price based on category with exact formulas
     *
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    public function calculateAdvancedPrice(Listing $listing, Request $request): array
    {
        $result = [
            'base_price' => 0,
            'pricing_details' => [],
            'notifications' => []
        ];

        switch ((int) $request->category_id) {
            case 2: // Car Rental
                $result = $this->calculateCarRentalPrice($listing, $request);
                break;

            case 3: // Private Driver
                $result = $this->calculatePrivateDriverPrice($listing, $request);
                break;

            case 4: // Boat Rental
                $result = $this->calculateBoatRentalPrice($listing, $request);
                break;

            case 5: // Things to Do
                $result = $this->calculateThingsToDoPrice($listing, $request);
                break;
        }

        return $result;
    }

    /**
     * Calculate car rental price with exact formula
     *
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    private function calculateCarRentalPrice(Listing $listing, Request $request): array
    {
        // Calculate exact hours between dates
        $start = Carbon::parse($request->pickup_date . ' ' . $request->pickup_time);
        $end = Carbon::parse($request->dropoff_date . ' ' . $request->dropoff_time);
        $totalMinutes = $end->diffInMinutes($start);

        // Every 24h (1440 minutes) = 1 day, any excess = +1 day
        $days = ceil($totalMinutes / 1440);

        // Apply pricing tiers
        if ($days < 7) {
            $price = $listing->price_per_day * $days;
            $rateType = 'daily';
            $pricePerDay = $listing->price_per_day;
        } elseif ($days < 30) {
            $pricePerDay = $listing->price_per_week / 7;
            $price = $pricePerDay * $days;
            $rateType = 'weekly';
        } else {
            $pricePerDay = $listing->price_per_month / 30;
            $price = $pricePerDay * $days;
            $rateType = 'monthly';
        }

        $result = [
            'base_price' => $price,
            'pricing_details' => [
                'car' => [
                    'days_calculated' => $days,
                    'minutes_total' => $totalMinutes,
                    'rate_type' => $rateType,
                    'price_per_day' => round($pricePerDay, 2)
                ]
            ],
            'notifications' => []
        ];

        // Drop-off fee notification
        if ($request->pickup_location != $request->dropoff_location) {
            $result['pricing_details']['car']['drop_off_fee_notice'] = 'Drop-off fee will be added';
            $result['notifications'][] = 'Drop-off fee will be added for different pickup/dropoff locations';
        }

        return $result;
    }

    /**
     * Calculate boat rental price with exact hour ranges
     *
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    private function calculateBoatRentalPrice(Listing $listing, Request $request): array
    {
        $hours = floatval($request->duration);
        
        if ($hours >= 0.5 && $hours <= 1.5) {
            $price = $listing->price_per_hour * $hours;
            $rateType = 'hourly';
            $calculation = $listing->price_per_hour . ' * ' . $hours;
        } elseif ($hours >= 2 && $hours <= 4) {
            $price = $listing->price_per_half_day * ($hours / 4);
            $rateType = 'half_day';
            $calculation = $listing->price_per_half_day . ' * (' . $hours . '/4)';
        } elseif ($hours >= 4.5 && $hours <= 8) {
            $price = $listing->price_per_day * ($hours / 8);
            $rateType = 'full_day';
            $calculation = $listing->price_per_day . ' * (' . $hours . '/8)';
        } else {
            throw new \Exception('Invalid duration selected. Must be between 0.5 and 8 hours in valid ranges.');
        }

        return [
            'base_price' => $price,
            'pricing_details' => [
                'boat' => [
                    'duration_hours' => $hours,
                    'rate_type' => $rateType,
                    'calculation' => $calculation
                ]
            ],
            'notifications' => []
        ];
    }

    /**
     * Calculate things to do price
     *
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    private function calculateThingsToDoPrice(Listing $listing, Request $request): array
    {
        // Debug logging
        \Log::info('Things to Do price calculation', [
            'listing_id' => $listing->id,
            'custom_booking_option_id' => $request->custom_booking_option_id,
            'duration_option_id' => $request->duration_option_id,
            'available_options' => $listing->customBookingOptions()->pluck('id')->toArray()
        ]);
        
        // Get selected custom booking option
        $selectedOption = $listing->customBookingOptions()
            ->find($request->custom_booking_option_id);

        if (!$selectedOption) {
            throw new \Exception('Invalid booking option selected. Option ID: ' . $request->custom_booking_option_id);
        }

        // Check if activity is private or group
        $isPrivate = false;
        if ($listing->private_or_group === 'private' || 
            (is_string($listing->activity_type) && strtolower($listing->activity_type) === 'private') ||
            $request->activity_type === 'private') {
            $isPrivate = true;
        }
        
        if ($isPrivate) {
            $price = $selectedOption->price * $request->number_of_people;
            $type = 'private';
        } else {
            $price = $selectedOption->price; // Fixed group price
            $type = 'group';
        }

        return [
            'base_price' => $price,
            'pricing_details' => [
                'activity' => [
                    'option_selected' => $selectedOption->name,
                    'type' => $type,
                    'people' => $request->number_of_people,
                    'price_per_person' => $type === 'private' ? $selectedOption->price : null,
                    'group_price' => $type === 'group' ? $selectedOption->price : null
                ]
            ],
            'notifications' => []
        ];
    }

    /**
     * Calculate private driver price
     *
     * @param Listing $listing
     * @param Request $request
     * @return array
     */
    private function calculatePrivateDriverPrice(Listing $listing, Request $request): array
    {
        // Build query based on selected options
        $query = DriverPricing::where('listing_id', $listing->id);

        // Handle service type
        if (count($request->service_type) === 1) {
            $query->where('service_type', $request->service_type[0]);
        } else {
            $query->whereIn('service_type', $request->service_type);
        }

        // Handle road type
        if (count($request->road_type) === 1) {
            $query->where('road_type', $request->road_type[0]);
        } else {
            $query->whereIn('road_type', $request->road_type);
        }

        $query->where('city_a_id', $request->city_a_id);

        // Handle city_b based on service type
        if (in_array('airport_transfer', $request->service_type) && count($request->service_type) === 1) {
            $query->whereNull('city_b_id');
        } else if ($request->city_b_id) {
            $query->where('city_b_id', $request->city_b_id);
        }

        $pricing = $query->first();

        if (!$pricing) {
            throw new \Exception('Route pricing not available for the selected options');
        }

        // Build route description
        $routeDesc = '';
        if (in_array('airport_transfer', $request->service_type)) {
            $cityA = City::find($request->city_a_id);
            $routeDesc = 'Airport → ' . ($cityA ? $cityA->city_name : 'City');
        } else {
            $cityA = City::find($request->city_a_id);
            $cityB = City::find($request->city_b_id);
            $routeDesc = ($cityA ? $cityA->city_name : 'City A') . ' → ' . ($cityB ? $cityB->city_name : 'City B');
        }

        return [
            'base_price' => $pricing->price,
            'pricing_details' => [
                'driver' => [
                    'service' => implode(', ', $request->service_type),
                    'road' => implode(', ', $request->road_type),
                    'route' => $routeDesc
                ]
            ],
            'notifications' => []
        ];
    }

    /**
     * Schedule reminder if needed
     *
     * @param Booking $booking
     * @return void
     */
    private function scheduleReminderIfNeeded(Booking $booking)
    {
        $serviceDateTime = $this->getServiceDateTime($booking);
        
        if (!$serviceDateTime) {
            return;
        }
        
        $reminderHours = EmailSetting::getReminderHours();
        $reminderTime = Carbon::parse($serviceDateTime)->subHours($reminderHours);
        
        // Only schedule if reminder time is in the future
        if ($reminderTime->isFuture()) {
            ScheduledReminder::create([
                'booking_id' => $booking->id,
                'send_at' => $reminderTime,
                'status' => 'pending'
            ]);
        }
    }

    /**
     * Get service date/time based on category
     *
     * @param Booking $booking
     * @return string|null
     */
    private function getServiceDateTime(Booking $booking)
    {
        if (!$booking->listing || !$booking->listing->category) {
            return null;
        }
        
        $category = $booking->listing->category->slug ?? '';
        
        switch ($category) {
            case 'car_rental':
                return $booking->pickup_date . ' ' . ($booking->pickup_time ?? '09:00:00');
            case 'private_driver':
                return $booking->pickup_date . ' ' . $booking->pickup_time;
            case 'boat_rental':
                return $booking->booking_date . ' ' . ($booking->departure_time ?? '09:00:00');
            case 'things_to_do':
                return $booking->activity_date . ' ' . ($booking->activity_time ?? '09:00:00');
            default:
                // Fallback to check by category_id if slug not available
                switch ((int) $booking->category_id) {
                    case 2: // Car rental
                        return $booking->pickup_date . ' ' . ($booking->pickup_time ?? '09:00:00');
                    case 3: // Private driver
                        return $booking->prefered_date . ' ' . ($booking->pickup_time ?? '09:00:00');
                    case 4: // Boat rental
                        return $booking->prefered_date . ' ' . ($booking->pickup_time ?? '09:00:00');
                    case 5: // Things to do
                        return $booking->prefered_date . ' ' . ($booking->pickup_time ?? '09:00:00');
                    default:
                        return null;
                }
        }
    }
}
