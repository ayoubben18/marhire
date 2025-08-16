@extends('layouts.dashboard_admin')

@section('title', isset($booking) ? 'Edit Booking' : 'Add Booking')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">{{ isset($booking) ? 'Edit' : 'Add' }} Booking</h3>
            <div class="nk-block-des text-soft">
                <p>{{ isset($booking) ? 'Edit informations of booking.' : 'Add informations of new booking.' }}</p>
            </div>
        </div>
        <div>
            <a href="{{ route('bookings.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<style>
    .ck-editor__editable_inline {
        height: 220px !important;
        /* Fixed height */
        resize: none;
        overflow-y: auto;
    }

</style>
<form id="bookingFrm" action="{{ isset($booking) ? route('bookings.update') : route('bookings.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    @if(isset($booking))
    <input type="hidden" name="id" value="{{ $booking->id }}" />
    @endif
    <input type="hidden" name="booking_price" id="booking_price" />
    <input type="hidden" name="total_addons" id="total_addons" />
    <input type="hidden" name="total_price" id="total_price" />

    <div class="row">
        <div class="col-md-8">
            <div class="card card-preview">
                <div class="card-inner">
                    <div class="preview-block">
                        @if(session('updated'))
                        <div class="example-alert mb-3">
                            <div class="alert alert-success alert-icon">
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. booking has been updated.
                            </div>
                        </div>
                        @endif
                        @if(session('inserted'))
                        <div class="example-alert mb-3">
                            <div class="alert alert-success alert-icon">
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. booking has been created.
                            </div>
                        </div>
                        @endif
                        <div id="step1">
                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="category_id">Category <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="category_id" id="category_id">
                                                <option value="" disabled selected>--Choose option--</option>
                                                @foreach($categories as $category)
                                                <option value="{{ $category->id }}" {{ isset($booking) && $booking->category_id == $category->id ? 'selected' : '' }}>{{ $category->category }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="city_a_id">Departure City <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="city_a_id" id="city_a_id">
                                                <option value="" disabled selected>--Choose option--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}" {{ isset($booking) && $booking->city_a_id == $city->id ? 'selected' : '' }}>{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="city_b_id">Arrival City <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="city_b_id" id="city_b_id">
                                                <option value="" disabled selected>--Choose option--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}" {{ isset($booking) && $booking->city_b_id == $city->id ? 'selected' : '' }}>{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="listing_id">Listing <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="listing_id" id="listing_id">
                                                <option value="" disabled selected>--Choose Option--</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="pricing_option_id">Option <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="pricing_option_id" id="pricing_option_id">
                                                <option value="" selected disabled>--Choose Option--</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="time_preference">Time Preference</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="time_preference" id="time_preference">
                                                <option value="">--Choose Option--</option>
                                                <option value="morning" {{ isset($booking) && $booking->time_preference == 'morning' ? 'selected' : '' }}>Morning</option>
                                                <option value="afternoon" {{ isset($booking) && $booking->time_preference == 'afternoon' ? 'selected' : '' }}>Afternoon</option>
                                                <option value="evening" {{ isset($booking) && $booking->time_preference == 'evening' ? 'selected' : '' }}>Evening</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_date">Pickup Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" name="pickup_date" id="pickup_date" class="form-control" value="{{ isset($booking) ? $booking->pickup_date : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="dropoff_date">Dropoff Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" name="dropoff_date" id="dropoff_date" class="form-control" value="{{ isset($booking) ? $booking->dropoff_date : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_time">Pickup Time <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            @php
                                            $start = 0;
                                            $end = 23 * 60 + 45;
                                            $interval = 30;
                                            @endphp
                                            <select class="form-control select2-single" name="pickup_time" id="pickup_time">
                                                <option value="" selected disabled>--Choose Option--</option>
                                                @for ($i = $start; $i <= $end; $i +=$interval) @php $hours=floor($i / 60); $minutes=$i % 60; $time=sprintf('%02d:%02d', $hours, $minutes); @endphp <option value="{{ $time }}">{{ $time }}</option>
                                                    @endfor
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="dropoff_time">Dropoff Time <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            @php
                                            $start = 0;
                                            $end = 23 * 60 + 45;
                                            $interval = 30;
                                            @endphp
                                            <select class="form-control select2-single" name="dropoff_time" id="dropoff_time">
                                                <option value="" selected disabled>--Choose Option--</option>
                                                @for ($i = $start; $i <= $end; $i +=$interval) @php $hours=floor($i / 60); $minutes=$i % 60; $time=sprintf('%02d:%02d', $hours, $minutes); @endphp <option value="{{ $time }}">{{ $time }}</option>
                                                    @endfor
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_location">Pickup City <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="pickup_location" id="pickup_location">
                                                <option value="" disabled selected>--Choose City--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}" {{ isset($booking) && $booking->pickup_location == $city->id ? 'selected' : '' }}>{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="droppoff_location">Dropoff City <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="droppoff_location" id="droppoff_location">
                                                <option value="" disabled selected>--Choose City--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}" {{ isset($booking) && $booking->droppoff_location == $city->id ? 'selected' : '' }}>{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- Boat -->
                                <div class="col-md-6" data-categories="4">
                                    <div class="form-group">
                                        <label class="form-label" for="duration">Duration <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="duration" id="duration">
                                                <option value="" selected disabled>--Choose Option--</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="4">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_time_boat">Pickup Time</label>
                                        <div class="form-control-wrap">
                                            @php
                                            $start = 0;
                                            $end = 23 * 60 + 45;
                                            $interval = 30;
                                            @endphp
                                            <select class="form-control select2-single" name="pickup_time_boat" id="pickup_time_boat">
                                                <option value="" selected disabled>--Choose Option--</option>
                                                @for ($i = $start; $i <= $end; $i +=$interval) 
                                                    @php 
                                                    $hours = floor($i / 60); 
                                                    $minutes = $i % 60; 
                                                    $time = sprintf('%02d:%02d', $hours, $minutes); 
                                                    @endphp 
                                                    <option value="{{ $time }}" {{ isset($booking) && $booking->pickup_time == $time ? 'selected' : '' }}>{{ $time }}</option>
                                                @endfor
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3,4,5">
                                    <div class="form-group">
                                        <label class="form-label" for="prefered_date">Prefered Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" class="form-control" name="prefered_date" id="prefered_date" placeholder="Prefered Date" value="{{ isset($booking) ? $booking->prefered_date : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="4,5">
                                    <div class="form-group">
                                        <label class="form-label" for="number_of_people">Number Of People <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="1" class="form-control" name="number_of_people" id="number_of_people" placeholder="Number Of People" value="{{ isset($booking) ? $booking->number_of_people : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- Additional Private Driver Fields -->
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_time_private">Pickup Time</label>
                                        <div class="form-control-wrap">
                                            @php
                                            $start = 0;
                                            $end = 23 * 60 + 45;
                                            $interval = 30;
                                            @endphp
                                            <select class="form-control select2-single" name="pickup_time_private" id="pickup_time_private">
                                                <option value="" selected disabled>--Choose Option--</option>
                                                @for ($i = $start; $i <= $end; $i +=$interval) 
                                                    @php 
                                                    $hours = floor($i / 60); 
                                                    $minutes = $i % 60; 
                                                    $time = sprintf('%02d:%02d', $hours, $minutes); 
                                                    @endphp 
                                                    <option value="{{ $time }}" {{ isset($booking) && $booking->pickup_time == $time ? 'selected' : '' }}>{{ $time }}</option>
                                                @endfor
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="service_types">Service Types</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="service_types" id="service_types">
                                                <option value="" disabled {{ !isset($booking) || !$booking->service_types ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="airport_transfer" {{ isset($booking) && $booking->service_types == 'airport_transfer' ? 'selected' : '' }}>Airport Transfer</option>
                                                <option value="intercity" {{ isset($booking) && $booking->service_types == 'intercity' ? 'selected' : '' }}>Intercity</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="road_types">Road Types</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="road_types" id="road_types">
                                                <option value="" disabled {{ !isset($booking) || !$booking->road_types ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="one_way" {{ isset($booking) && $booking->road_types == 'one_way' ? 'selected' : '' }}>One Way</option>
                                                <option value="round_trip" {{ isset($booking) && $booking->road_types == 'round_trip' ? 'selected' : '' }}>Round Trip</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="number_of_passengers">Number of Passengers <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" class="form-control" name="number_of_passengers" id="number_of_passengers" placeholder="Number of Passengers" value="{{ isset($booking) ? $booking->number_of_passengers : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="number_of_luggage">Number of Luggage</label>
                                        <div class="form-control-wrap">
                                            <input type="number" class="form-control" name="number_of_luggage" id="number_of_luggage" value="{{ isset($booking) ? $booking->number_of_luggage : '' }}" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_address">Pickup Address</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="pickup_address" id="pickup_address" value="{{ isset($booking) ? $booking->pickup_address : '' }}" placeholder="Airport or address" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="dropoff_address">Dropoff Address</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="dropoff_address" id="dropoff_address" value="{{ isset($booking) ? $booking->dropoff_address : '' }}" placeholder="Hotel or address" />
                                        </div>
                                    </div>
                                </div>
                                {{-- <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="booking_source">Booking Source <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="booking_source" id="booking_source">
                                                <option value="Admin Entry" {{ $booking->booking_source == 'Admin Entry' ? 'selected' : '' }}>Admin Entry</option>
                                                <option value="Website" {{ $booking->booking_source == 'Website' ? 'selected' : '' }}>Website</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> --}}
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="discount_or_extra">Discount Or Extra Price</label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="discount_or_extra" id="discount_or_extra" value="{{ isset($booking) ? (old('discount_or_extra') ?? $booking->discount_or_extra) : old('discount_or_extra') }}" placeholder="Discount Or Extra Price" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h5>Customer Informations</h5>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="first_name">First Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" value="{{ isset($booking) ? $booking->first_name : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="last_name">Last Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" value="{{ isset($booking) ? $booking->last_name : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="date_of_birth">Date of Birth <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" class="form-control" name="date_of_birth" id="date_of_birth" 
                                                   value="{{ isset($booking) ? $booking->date_of_birth : '' }}" 
                                                   max="{{ date('Y-m-d', strtotime('-18 years')) }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="email">Email <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="email" class="form-control" name="email" id="email" placeholder="Email" value="{{ isset($booking) ? $booking->email : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="whatsapp">Whatsapp <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="whatsapp" id="whatsapp" placeholder="Whatsapp" value="{{ isset($booking) ? $booking->whatsapp : '' }}" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="flight_number">Flight Number</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="flight_number" id="flight_number" placeholder="Flight Number (Optional)" value="{{ isset($booking) ? old('flight_number', $booking->flight_number) : old('flight_number') }}" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="country">Country <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="country" id="country">
                                                <option value="" selected disabled>--Choose Option--</option>
                                                @foreach($countries as $country)
                                                <option value="{{ $country->country }}" {{ isset($booking) && $booking->country == $country->country ? 'selected' : '' }}>{{ $country->country }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label" for="notes">Notes</label>
                                        <div class="form-control-wrap">
                                            <textarea rows="3" class="form-control" name="notes" id="notes" placeholder="Notes">{{ isset($booking) ? $booking->notes : '' }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h5>Addons</h5>
                                    <table class="table table-bordered" id="addons-table">
                                        <thead>
                                            <tr>
                                                <th>Addon</th>
                                                <th width="200"><button type="button" id="add-addon" class="btn btn-success btn-sm">+ Add Option</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if(isset($booking) && $booking->addons && count($booking->addons) > 0)
                                                @foreach($booking->addons as $bookingAddon)
                                                <tr>
                                                    <td>
                                                        <select name="addons[]" class="form-control addon" required>
                                                            <option value="" disabled>--Choose Option--</option>
                                                            @foreach($listingAddons as $listingAddon)
                                                            <option value="{{ $listingAddon->addon_id }}" 
                                                                data-price="{{ $listingAddon->addon->price }}" 
                                                                {{ $bookingAddon->addon_id == $listingAddon->addon->id ? 'selected' : '' }}>
                                                                {{ $listingAddon->addon->addon }} ({{ number_format($listingAddon->addon->price, 2) }}€)
                                                            </option>
                                                            @endforeach
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm remove-addon" style="color:#ff313b;">
                                                            <i class="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            @endif
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                            <div class="d-flex justify-content-end align-items-center mt-2">
                                <button type="button" class="btn-signup" id="submit-form-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card card-preview">
                <div class="card-inner">
                    <div class="preview-block">
                        <h3 class="nk-block-title nk-block-title--card-head">Pricing</h3>
                        <div>
                            <div class="booking-pricing-item" style="display:none">
                                <span class="label">Duration</span>
                                <span class="price" id="summary_duration">-</span>
                            </div>
                            <div class="booking-pricing-item per_day" style="display: none;">
                                <span class="label">Booking Per Day</span>
                                <span class="price" id="summary_per_day">0.00€</span>
                            </div>
                            <div class="booking-pricing-item">
                                <span class="label">Booking Price</span>
                                <span class="price" id="summary_booking_price">{{ isset($booking) ? $booking->booking_price : 0 }}€</span>
                            </div>
                            <div class="booking-pricing-item">
                                <span class="label">Addons Total</span>
                                <span class="price" id="summary_total_addons">{{ isset($booking) ? $booking->total_addons : 0 }}€</span>
                            </div>
                            <div class="booking-pricing-item">
                                <span class="label">Discount/Extra</span>
                                <span class="price" id="summary_discount">{{ isset($booking) ? $booking->discount_or_extra : 0 }}€</span>
                            </div>
                            <div class="booking-pricing-item total">
                                <span class="label">Total</span>
                                <span class="price" id="summary_total">{{ isset($booking) ? ($booking->booking_price + $booking->total_addons + $booking->discount_or_extra) : 0 }}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</form>
<script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
<script>
// CLEAN WORKING IMPLEMENTATION FOR BOOKING EDIT FORM
$(document).ready(function() {
    // ========================================
    // GLOBAL VARIABLES
    // ========================================
    const booking = @json(isset($booking) ? $booking : null); // Will be set from blade template
    let addonsOptions = '<option value="" selected disabled>--Choose Addon--</option>';
    
    console.log('Starting booking form initialization', booking);
    
    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        // Hide all category-specific fields first
        $('[data-categories]').hide();
        
        // Set category and show relevant fields
        if (booking) {
            $('#category_id').val(booking.category_id);
            $(`[data-categories*="${booking.category_id}"]`).show();
            
            // Set all form fields
            setFormFields();
            
            // Load listings after a short delay
            setTimeout(() => {
                loadListings();
            }, 500);
        }
        
        // Setup event handlers
        setupEventHandlers();
    }
    
    // ========================================
    // SET FORM FIELDS
    // ========================================
    function setFormFields() {
        if (!booking) return;
        
        // Common fields
        $('#first_name').val(booking.first_name);
        $('#last_name').val(booking.last_name);
        $('#email').val(booking.email);
        $('#whatsapp').val(booking.whatsapp);
        $('#country').val(booking.country);
        $('#flight_number').val(booking.flight_number);
        $('#discount_or_extra').val(booking.discount_or_extra || 0);
        
        // Category specific fields
        switch(parseInt(booking.category_id)) {
            case 2: // Car Rental
                $('#pickup_date').val(booking.pickup_date);
                $('#dropoff_date').val(booking.dropoff_date);
                $('#pickup_time').val(booking.pickup_time);
                $('#dropoff_time').val(booking.dropoff_time);
                $('#pickup_location').val(booking.pickup_location);
                $('#droppoff_location').val(booking.droppoff_location);
                $('#date_of_birth').val(booking.date_of_birth);
                break;
                
            case 3: // Private Driver
                $('#prefered_date').val(booking.prefered_date);
                // Note: Private drivers use number_of_passengers, not number_of_people
                $('#pickup_time_private').val(booking.pickup_time);
                $('#service_types').val(booking.service_types);
                $('#road_types').val(booking.road_types);
                $('#city_a_id').val(booking.city_a_id);
                $('#city_b_id').val(booking.city_b_id);
                $('#number_of_passengers').val(booking.number_of_passengers || booking.number_of_people); // Fallback for existing data
                $('#number_of_luggage').val(booking.number_of_luggage);
                $('#pickup_address').val(booking.pickup_address);
                $('#dropoff_address').val(booking.dropoff_address);
                break;
                
            case 4: // Boat Rental
                $('#duration').val(booking.duration);
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                $('#pickup_time_boat').val(booking.pickup_time);
                break;
                
            case 5: // Activities
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                $('#time_preference').val(booking.time_preference);
                break;
        }
    }
    
    // ========================================
    // LOAD LISTINGS
    // ========================================
    function loadListings() {
        if (!booking) return;
        const categoryId = parseInt(booking.category_id);
        
        if (categoryId === 3) {
            // Private Driver - special handling
            loadPrivateDriverListings();
        } else if (categoryId === 5) {
            // Activities
            loadCategoryListings(5);
        } else {
            // All other categories
            loadCategoryListings(categoryId);
        }
    }
    
    function loadCategoryListings(categoryId) {
        $.ajax({
            type: 'post',
            url: "{{ route('categories.getListings') }}",
            data: { 
                category_id: categoryId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                populateListingDropdown(resp.listings, 'category');
            },
            error: function() {
                console.error('Failed to load category listings');
            }
        });
    }
    
    function loadPrivateDriverListings() {
        // Check if we have all required fields
        const cityA = (booking && booking.city_a_id) || $('#city_a_id').val();
        const cityB = (booking && booking.city_b_id) || $('#city_b_id').val();
        
        if (!cityA || !cityB) {
            // Fall back to category listings if missing data
            loadCategoryListings(3);
            return;
        }
        
        $.ajax({
            type: 'post',
            url: "{{ route('bookings.getListings') }}",
            data: {
                city_a_id: cityA,
                city_b_id: cityB,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                populateListingDropdown(resp.listings, 'private_driver');
            },
            error: function() {
                console.error('Failed to load private driver listings');
                loadCategoryListings(3);
            }
        });
    }
    
    
    function populateListingDropdown(listings, type) {
        let options = '<option value="" disabled>--Choose Option--</option>';
        
        listings.forEach(function(listing) {
            const isSelected = booking && listing.id == booking.listing_id ? 'selected' : '';
            
            if (type === 'private_driver') {
                // Private driver specific attributes
                const pricing = listing.pricings && listing.pricings[0] ? listing.pricings[0] : {};
                options += `<option value="${listing.id}" ${isSelected}
                    airport_one="${pricing.airport_one || 0}"
                    airport_round="${pricing.airport_round || 0}"
                    intercity_one="${pricing.intercity_one || 0}"
                    intercity_round="${pricing.intercity_round || 0}"
                    >${listing.title}</option>`;
            } else {
                // Regular listings with price data
                options += `<option value="${listing.id}" ${isSelected}
                    data-price-per-hour="${listing.price_per_hour || 0}"
                    data-price-per-half-day="${listing.price_per_half_day || 0}"
                    data-price-per-day="${listing.price_per_day || 0}"
                    data-price-per-week="${listing.price_per_week || 0}"
                    data-price-per-month="${listing.price_per_month || 0}"
                    data-durations="${listing.duration_options || ''}"
                    data-proposes="${listing.purpose_tags || ''}"
                    data-private-or-group="${listing.private_or_group || 'Group'}"
                    >${listing.title}</option>`;
            }
        });
        
        $('#listing_id').html(options);
        
        // If we have a selected listing, trigger change to load addons and options
        // But only if we don't already have addon rows (to preserve initial server-side values)
        if (booking && booking.listing_id) {
            setTimeout(() => {
                // Check if we already have addon rows from server
                const hasExistingAddons = $('#addons-table tbody tr').length > 0;
                if (!hasExistingAddons) {
                    $('#listing_id').trigger('change');
                } else {
                    // Just load the addons options for the "Add addon" button without updating existing selects
                    loadAddonsForNewRows(booking.listing_id);
                    
                    // Load boat options if it's a boat rental
                    if (parseInt(booking.category_id) === 4) {
                        loadBoatOptions(booking.listing_id);
                    }
                    
                    // Load pricing options for categories 3 and 5
                    if ([3, 5].includes(parseInt(booking.category_id))) {
                        loadPricingOptions(booking.listing_id);
                    }
                }
            }, 300);
        }
    }
    
    // ========================================
    // LOAD ADDONS FOR NEW ROWS (without affecting existing selects)
    // ========================================
    function loadAddonsForNewRows(listingId) {
        if (!listingId) return;
        
        $.ajax({
            type: 'post',
            url: "{{ route('listings.getAddons') }}",
            data: { 
                listing_id: listingId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled selected>--Choose Option--</option>';
                resp.addons.forEach(function(addon) {
                    options += `<option value="${addon.addon_id}" data-price="${addon.price}">
                        ${addon.addon} (${parseFloat(addon.price).toFixed(2)}€)</option>`;
                });
                
                addonsOptions = options;
            }
        });
    }
    
    // ========================================
    // LOAD ADDONS
    // ========================================
    function loadAddons(listingId) {
        if (!listingId) return;
        
        // Store the currently selected addon values before making AJAX call
        const selectedAddonValues = [];
        $('.addon').each(function() {
            const val = $(this).val();
            if (val) {
                selectedAddonValues.push(val);
            }
        });
        
        $.ajax({
            type: 'post',
            url: "{{ route('listings.getAddons') }}",
            data: { 
                listing_id: listingId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled>--Choose Option--</option>';
                resp.addons.forEach(function(addon) {
                    // Use addon_id instead of id to match the backend data
                    options += `<option value="${addon.addon_id}" data-price="${addon.price}">
                        ${addon.addon} (${parseFloat(addon.price).toFixed(2)}€)</option>`;
                });
                
                addonsOptions = options;
                
                // Update existing addon selects and restore their values
                $('.addon').each(function(index) {
                    const $select = $(this);
                    const previousValue = selectedAddonValues[index];
                    
                    // Update options
                    $select.html(options);
                    
                    // Restore the previous selection if it exists
                    if (previousValue) {
                        $select.val(previousValue);
                        // If value couldn't be set (addon not available), remove the default selected
                        if (!$select.val()) {
                            $select.find('option[selected]').prop('selected', false);
                        }
                    }
                });
                
                // These are now handled in the listing change event handler
            }
        });
    }
    
    function loadPricingOptions(listingId) {
        $.ajax({
            type: 'post',
            url: "{{ route('listings.getPricing') }}",
            data: { 
                listing_id: listingId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled>--Choose Option--</option>';
                resp.options.forEach(function(option) {
                    const isSelected = booking && option.id == booking.pricing_option_id ? 'selected' : '';
                    options += `<option value="${option.id}" ${isSelected} data-price="${option.price}">
                        ${option.element}</option>`;
                });
                $('#pricing_option_id').html(options);
            }
        });
    }
    
    function loadBoatOptions(listingId) {
        const $selectedListing = $('#listing_id option:selected');
        const durations = $selectedListing.data('durations');
        
        // Load duration options
        if (durations) {
            let durationsArr = durations.toString().split(',');
            let durationOptions = '<option value="" disabled>--Choose Option--</option>';
            durationsArr.forEach(function(duration) {
                const trimmedDuration = duration.trim();
                if (trimmedDuration) {
                    const isSelected = booking && trimmedDuration == booking.duration ? 'selected' : '';
                    durationOptions += `<option value="${trimmedDuration}" ${isSelected}>${trimmedDuration}</option>`;
                }
            });
            $('#duration').html(durationOptions);
        }
    }
    
    // ========================================
    // PRICE CALCULATION FOR FORM SUBMISSION
    // ========================================
    function calculateAndSetPrices() {
        const categoryId = parseInt($('#category_id').val());
        let basePrice = 0;
        let addonsTotal = 0;
        const discountOrExtra = parseFloat($('#discount_or_extra').val()) || 0;
        const $selectedListing = $('#listing_id option:selected');
        const groupOrPrivate = $selectedListing.data('private-or-group') || 'Group';
        const numPeople = parseInt($('#number_of_people').val()) || 1;
        
        // Calculate addon prices - only multiply by people for category 5 private activities
        $('.addon').each(function() {
            let addonPrice = parseFloat($(this).find(':selected').data('price')) || 0;
            
            // Only multiply by number of people for category 5 private activities
            if (categoryId === 5 && groupOrPrivate === 'Private') {
                addonPrice *= numPeople;
            }
            
            addonsTotal += addonPrice;
        });
        
        // Calculate base price by category (matching server PricingService logic)
        switch(categoryId) {
            case 2: // Car Rental - matches PricingService::calculateCarRentalPrice()
                const startDate = $('#pickup_date').val();
                const endDate = $('#dropoff_date').val();
                const pickupTime = $('#pickup_time').val() || '10:00';
                const dropoffTime = $('#dropoff_time').val() || '10:00';
                const pricePerDay = parseFloat($selectedListing.data('price-per-day')) || 0;
                const pricePerWeek = parseFloat($selectedListing.data('price-per-week')) || null;
                const pricePerMonth = parseFloat($selectedListing.data('price-per-month')) || null;
                
                if (startDate && endDate) {
                    const start = new Date(`${startDate}T${pickupTime}`);
                    const end = new Date(`${endDate}T${dropoffTime}`);
                    const totalMinutes = (end - start) / (1000 * 60);
                    
                    // Every 24h = 1 day, any excess = +1 day
                    const days = Math.ceil(totalMinutes / 1440) || 1;
                    
                    let effectivePricePerDay = 0;
                    if (days < 7) {
                        // Daily rate for less than 7 days
                        effectivePricePerDay = pricePerDay || 0;
                    } else if (days < 30) {
                        // Weekly rate for 7-29 days (with fallback)
                        const weeklyPrice = pricePerWeek || (pricePerDay * 7);
                        effectivePricePerDay = weeklyPrice / 7;
                    } else {
                        // Monthly rate for 30+ days (with fallback)
                        const monthlyPrice = pricePerMonth || (pricePerDay * 30);
                        effectivePricePerDay = monthlyPrice / 30;
                    }
                    
                    basePrice = effectivePricePerDay * days;
                }
                break;
                
            case 3: // Private Driver - matches PricingService::calculatePrivateDriverPrice()
                const serviceType = $('#service_types').val();
                const roadType = $('#road_types').val();
                const airportOne = parseFloat($selectedListing.attr('airport_one')) || 0;
                const airportRound = parseFloat($selectedListing.attr('airport_round')) || 0;
                const intercityOne = parseFloat($selectedListing.attr('intercity_one')) || 0;
                const intercityRound = parseFloat($selectedListing.attr('intercity_round')) || 0;
                
                const isAirportTransfer = serviceType === 'airport_transfer';
                const isRoundTrip = roadType === 'round_trip' || roadType === 'road_trip';
                
                if (isAirportTransfer) {
                    if (isRoundTrip) {
                        // Airport Round Trip - with fallback to intercity round
                        basePrice = airportRound || intercityRound || 0;
                    } else {
                        // Airport One Way - with fallback to intercity one
                        basePrice = airportOne || intercityOne || 0;
                    }
                } else {
                    // Intercity
                    if (isRoundTrip) {
                        basePrice = intercityRound || 0;
                    } else {
                        basePrice = intercityOne || 0;
                    }
                }
                break;
                
            case 4: // Boat Rental - matches PricingService::calculateBoatRentalPrice()
                const duration = $('#duration').val();
                const pricePerHour = parseFloat($selectedListing.data('price-per-hour')) || 0;
                const pricePerHalfDay = parseFloat($selectedListing.data('price-per-half-day')) || 0;
                const pricePerDayBoat = parseFloat($selectedListing.data('price-per-day')) || 0;
                
                // Convert duration to numeric hours to match server logic
                let hours = 0;
                if (duration) {
                    if (duration === '30min') {
                        hours = 0.5;
                    } else if (duration.includes('min')) {
                        hours = parseFloat(duration.replace('min', '')) / 60;
                    } else if (duration === 'Half-Day') {
                        hours = 4; // Treat as 4 hours for half-day
                    } else if (duration === 'Full-Day') {
                        hours = 8; // Treat as 8 hours for full-day
                    } else if (duration.includes('h')) {
                        hours = parseFloat(duration.replace('h', ''));
                    } else {
                        hours = parseFloat(duration) || 0;
                    }
                }
                
                // Apply pricing based on hour ranges (matching server logic)
                if (hours >= 0.5 && hours <= 1.5) {
                    // 30min to 1.5 hours: price_per_hour * hours
                    basePrice = pricePerHour * hours;
                } else if (hours >= 2 && hours <= 4) {
                    // 2 to 4 hours: FLAT half-day rate
                    basePrice = pricePerHalfDay || (pricePerHour * 4);
                } else if (hours >= 4.5 && hours <= 8) {
                    // 4.5 to 8 hours: FLAT full-day rate
                    basePrice = pricePerDayBoat || (pricePerHour * 8);
                } else {
                    // Invalid duration - use hourly rate as fallback
                    basePrice = pricePerHour * hours;
                }
                break;
                
            case 5: // Activities - matches PricingService::calculateActivityPrice()
                const $pricingOption = $('#pricing_option_id option:selected');
                const optionPrice = parseFloat($pricingOption.data('price')) || 0;
                
                if (optionPrice > 0) {
                    basePrice = groupOrPrivate === 'Group' ?
                        optionPrice :
                        optionPrice * numPeople;
                } else {
                    // Fallback if no pricing option selected
                    const fallbackPrice = parseFloat($selectedListing.data('price-per-day')) || 0;
                    basePrice = groupOrPrivate === 'Group' ?
                        fallbackPrice :
                        fallbackPrice * numPeople;
                }
                break;
        }
        
        // Calculate final total (matching server logic)
        const finalTotal = basePrice + addonsTotal + discountOrExtra;
        
        // Set hidden form fields according to server documentation:
        // booking_price = base price only (NO addons, NO discount)
        // total_addons = sum of addon prices
        // total_price = base + addons + discount
        $('#booking_price').val(basePrice.toFixed(2));
        $('#total_addons').val(addonsTotal.toFixed(2));
        $('#total_price').val(finalTotal.toFixed(2));
        
        // Update display fields
        $('#summary_booking_price').text(basePrice.toFixed(2) + '€');
        $('#summary_total_addons').text(addonsTotal.toFixed(2) + '€');
        $('#summary_total').text(finalTotal.toFixed(2) + '€');
    }
    
    // ========================================
    // EVENT HANDLERS
    // ========================================
    function setupEventHandlers() {
        // Category change
        $('#category_id').change(function() {
            const categoryId = $(this).val();
            $('[data-categories]').hide();
            $(`[data-categories*="${categoryId}"]`).show();
            $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
            
            // Load listings for all categories
            if (categoryId == 2 || categoryId == 4 || categoryId == 5) {
                loadCategoryListings(categoryId);
            } else if (categoryId == 3) {
                // For private driver, check if cities are already selected
                const cityA = $('#city_a_id').val();
                const cityB = $('#city_b_id').val();
                if (cityA && cityB) {
                    loadPrivateDriverListings();
                } else {
                    // Load all private driver listings as fallback
                    loadCategoryListings(3);
                }
            }
        });
        
        // Listing change
        $('#listing_id').change(function() {
            const listingId = $(this).val();
            const categoryId = parseInt($('#category_id').val());
            
            if (listingId) {
                loadAddons(listingId);
                
                // Load boat options for boat rentals
                if (categoryId === 4) {
                    loadBoatOptions(listingId);
                }
                
                // Load pricing options for categories 3 and 5
                if ([3, 5].includes(categoryId)) {
                    loadPricingOptions(listingId);
                }
            }
        });
        
        // Private driver fields change
        $('#city_a_id, #city_b_id').change(function() {
            if (parseInt($('#category_id').val()) === 3) {
                loadPrivateDriverListings();
            }
        });
        
        
        // Price recalculation triggers removed - price will be calculated on save
        
        // Add addon
        $('#add-addon').click(function() {
            $('#addons-table tbody').append(`
                <tr>
                    <td>
                        <select name="addons[]" class="form-control addon" required>
                            ${addonsOptions}
                        </select>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm remove-addon" style="color:#ff313b;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
        
        // Remove addon
        $(document).on('click', '.remove-addon', function() {
            $(this).closest('tr').remove();
        });
        
        // Form submit
        $('#submit-form-btn').click(function() {
            // Calculate and set price values before submitting
            calculateAndSetPrices();
            $('#bookingFrm').submit();
        });
    }
    
    // ========================================
    // START INITIALIZATION  
    // ========================================
    init();
});</script>
@endsection
