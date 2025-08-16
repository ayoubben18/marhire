@extends('layouts.dashboard_admin')

@section('title', 'Add Booking')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Add Booking</h3>
            <div class="nk-block-des text-soft">
                <p>Add informations of new booking.</p>
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
<form id="bookingFrm" action="{{ route('bookings.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    <input type="hidden" name="booking_price" id="booking_price" />
    <input type="hidden" name="total_addons" id="total_addons" />
    <input type="hidden" name="total_price" id="total_price" />

    <div class="row">
        <div class="col-md-8">
            <div class="card card-preview">
                <div class="card-inner">
                    <div class="preview-block">
                        @if(session('inserted'))
                        <div class="example-alert mb-3">
                            <div class="alert alert-success alert-icon">
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new booking has been created.
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
                                                <option value="{{ $category->id }}">{{ $category->category }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="activity_type">Activity Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="activity_type" id="activity_type">
                                                <option value="" disabled selected>--Choose option--</option>
                                                @foreach($activityTypes as $type)
                                                <option value="{{ $type['id'] }}">{{ $type['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="car_type">Vehicule Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="car_type" id="car_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($vehiculeTypes as $type)
                                                <option value="{{ $type['id'] }}">{{ $type['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3">
                                    <div class="form-group">
                                        <label class="form-label" for="airport_or_intercity">Airport / Intercity <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="airport_or_intercity" id="airport_or_intercity">
                                                <option value="Airport (One Way)">Airport (One Way)</option>
                                                <option value="Airport (Round Way)">Airport (Round Way)</option>
                                                <option value="Intercity (One Way)">Intercity (One Way)</option>
                                                <option value="Intercity (Round Way)">Intercity (Round Way)</option>
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
                                                <option value="{{ $city->id }}">{{ $city->city_name }}</option>
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
                                                <option value="{{ $city->id }}">{{ $city->city_name }}</option>
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
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="pickup_date">Pickup Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" name="pickup_date" id="pickup_date" class="form-control" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="dropoff_date">Dropoff Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" name="dropoff_date" id="dropoff_date" class="form-control" />
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
                                        <label class="form-label" for="pickup_location">Pickup Location <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="pickup_location" id="pickup_location" placeholder="Pickup Location" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="droppoff_location">Dropoff Location <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="droppoff_location" id="droppoff_location" placeholder="Dropoff Location" />
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
                                            <input type="time" class="form-control" name="pickup_time" id="pickup_time_boat" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3,4,5">
                                    <div class="form-group">
                                        <label class="form-label" for="prefered_date">Prefered Date <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="date" class="form-control" name="prefered_date" id="prefered_date" placeholder="Prefered Date" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="3,4,5">
                                    <div class="form-group">
                                        <label class="form-label" for="number_of_people">Number Of People <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="1" class="form-control" name="number_of_people" id="number_of_people" placeholder="Number Of People" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="flight_number">Flight Number</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="flight_number" id="flight_number" placeholder="Flight Number" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                {{-- <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="booking_source">Booking Source <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="booking_source" id="booking_source">
                                                <option value="Admin Entry">Admin Entry</option>
                                                <option value="Website">Website</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> --}}
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="discount_or_extra">Discount Or Extra Price</label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="discount_or_extra" id="discount_or_extra" value="{{ old('discount_or_extra') }}" placeholder="Discount Or Extra Price" />
                                        </div>
                                    </div>
                                </div>
                                <!-- End Boat -->

                                <div class="col-12">
                                    <h5>Customer Informations</h5>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="first_name">First Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="last_name">Last Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="email">Email <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="email" class="form-control" name="email" id="email" placeholder="Email" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="age">Age <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="1" class="form-control" name="age" id="age" placeholder="Age" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="whatsapp">Whatsapp <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="whatsapp" id="whatsapp" placeholder="Whatsapp" />
                                            <small class="error d-none">Required field.</small>
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
                                                <option value="{{ $country->country }}">{{ $country->country }}</option>
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
                                            <textarea rows="3" class="form-control" name="notes" id="notes" placeholder="Notes"></textarea>
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
                            <div class="booking-pricing-item">
                                <span class="label">Duration</span>
                                <span class="price" id="summary_duration">-</span>
                            </div>
                            <div class="booking-pricing-item per_day">
                                <span class="label">Booking Per Day</span>
                                <span class="price" id="summary_per_day">0.00€</span>
                            </div>
                            <div class="booking-pricing-item">
                                <span class="label">Booking Price</span>
                                <span class="price" id="summary_booking_price">0.00€</span>
                            </div>
                            <div class="booking-pricing-item">
                                <span class="label">Addons Total</span>
                                <span class="price" id="summary_total_addons">0.00€</span>
                            </div>
                            <div class="booking-pricing-item total">
                                <span class="label">Total</span>
                                <span class="price" id="summary_total">0.00€</span>
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
    let addonsOptions = '<option value="" selected disabled>--Choose Addon--</option>';
    let stepper = 1;

    $('[data-categories]').css('display', 'none');

    function changeStepper(currentStep) {
        const steps = document.querySelectorAll(".ctm-step");
        const lines = document.querySelectorAll(".line");

        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');

            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else if (index + 1 < currentStep) {
                step.classList.add('completed');
            }
        });

        lines.forEach((line, index) => {
            line.classList.remove("completed");
            if (index < currentStep - 1) {
                line.classList.add("completed");
            }
        });

        Stepper = currentStep;
    }

    function validateForm() {
        const categoryId = parseInt(document.querySelector('[name="category_id"]').value);
        let requiredFields = ['category_id', 'listing_id', 'first_name', 'last_name', 'email', 'whatsapp', 'country'];

        const categoryRequiredMap = {
            2: ['age', 'pickup_date', 'dropoff_date', 'pickup_time', 'dropoff_time', 'pickup_location', 'droppoff_location']
            , 3: ['prefered_date', 'number_of_people', 'city_a_id', 'city_b_id', 'car_type', 'airport_or_intercity']
            , 4: ['duration', 'prefered_date', 'number_of_people']
            , 5: ['pricing_option_id', 'prefered_date', 'number_of_people']
        , };

        if (categoryRequiredMap[categoryId]) {
            requiredFields = requiredFields.concat(categoryRequiredMap[categoryId]);
        }

        let valid = true;

        requiredFields.forEach(fieldName => {
            const input = document.querySelector(`[id="${fieldName}"]`);
            const errorElement = input.closest('.form-control-wrap').querySelector('.error');
            if (input && !input.value.trim()) {
                input.classList.add("is-invalid");
                errorElement.classList.remove('d-none');
                valid = false;
            } else if (input) {
                input.classList.remove("is-invalid");
                errorElement.classList.add('d-none');
            }
        });

        return valid;
    }

    function toggleFieldsByCategory(categoryId) {
        $('[data-categories]').each(function() {
            const allowed = $(this).data('categories').toString().split(',');
            if (allowed.includes(categoryId.toString())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function generateOptions(selectId, options) {

        let optionsHtml = '<option value="" selected disabled>--Choose Option--</option>';

        optionsHtml += options.map((option) => `<option value="${option}">${option}</option>`);

        $('#' + selectId).html(optionsHtml);
    }

    $(document).ready(function() {
        const today = new Date().toISOString().split('T')[0];
        $('#pickup_date').attr('min', today);
        $('#dropoff_date').attr('min', today);

        $('#pickup_date').on('change', function() {
            const pickupDate = $(this).val();

            // Set dropoff_date min to pickup_date
            $('#dropoff_date').attr('min', pickupDate);

            // If dropoff_date is before pickup_date, reset it
            const dropoffDate = $('#dropoff_date').val();
            if (dropoffDate && dropoffDate < pickupDate) {
                $('#dropoff_date').val('');
            }
        });

        $('#submit-form-btn').click(function() {
            if (validateForm()) {
                $('#bookingFrm').submit();
            } else {
                $('html, body').animate({
                    scrollTop: 10
                }, 500);
            }
        });

        function getListings() {
            const airportOrIntercity = $('#airport_or_intercity').val();
            const carType = $('#car_type').val();
            const cityA = $('#city_a_id').val();
            const cityB = $('#city_b_id').val();

            if (airportOrIntercity && carType && cityA && cityB) {
                $.ajax({
                    type: 'post'
                    , url: '{{ route("bookings.getListings") }}'
                    , data: {
                        airportOrIntercity: airportOrIntercity,
                        car_type: carType,
                        city_a_id: cityA,
                        city_b_id: cityB
                    }
                    , dataType: 'json'
                    , success: function(resp) {
                        let options = '<option value="" disabled selected>--Choose Option--</option>';
                        resp.listings.forEach(function(listing) {
                            const airport_one = listing.pricings[0].airport_one || 0;
                            const airport_round = listing.pricings[0].airport_round || 0;
                            const intercity_one = listing.pricings[0].intercity_one || 0;
                            const intercity_round = listing.pricings[0].intercity_round || 0;

                            options += `<option value="${listing.id}"   
                                                airport_one="${airport_one}"                          
                                                airport_round="${airport_round}"                          
                                                intercity_one="${intercity_one}"                          
                                                intercity_round="${intercity_round}"                          
                                            >${listing.title}</option>`;
                        });

                        $('#listing_id').html(options);
                    }
                });

            } else {
                $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
            }
        }

        $('#activity_type').change(function(){
            const activity_type = $(this).val();

            $.ajax({
                    type: 'post'
                    , url: '{{ route("bookings.getActivityListings") }}'
                    , data: {
                        activity_type: activity_type
                    }
                    , dataType: 'json'
                    , success: function(resp) {
                        let options = '<option value="" disabled selected>--Choose Option--</option>';
                        resp.listings.forEach(function(listing) {

                            options += `<option value="${listing.id}"                          
                                            >${listing.title}</option>`;
                        });

                        $('#listing_id').html(options);
                    }
                });

        });

        function getListings() {
            const airportOrIntercity = $('#airport_or_intercity').val();
            const carType = $('#car_type').val();
            const cityA = $('#city_a_id').val();
            const cityB = $('#city_b_id').val();

            if (airportOrIntercity && carType && cityA && cityB) {
                $.ajax({
                    type: 'post'
                    , url: '{{ route("bookings.getListings") }}'
                    , data: {
                        airportOrIntercity: airportOrIntercity,
                        car_type: carType,
                        city_a_id: cityA,
                        city_b_id: cityB
                    }
                    , dataType: 'json'
                    , success: function(resp) {
                        let options = '<option value="" disabled selected>--Choose Option--</option>';
                        resp.listings.forEach(function(listing) {
                            const airport_one = listing.pricings[0].airport_one || 0;
                            const airport_round = listing.pricings[0].airport_round || 0;
                            const intercity_one = listing.pricings[0].intercity_one || 0;
                            const intercity_round = listing.pricings[0].intercity_round || 0;

                            options += `<option value="${listing.id}"   
                                                airport_one="${airport_one}"                          
                                                airport_round="${airport_round}"                          
                                                intercity_one="${intercity_one}"                          
                                                intercity_round="${intercity_round}"                          
                                            >${listing.title}</option>`;
                        });

                        $('#listing_id').html(options);
                    }
                });

            } else {
                $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
            }
        }

        function calculatePrice() {
            const category_id = parseInt($('#category_id').val());
            const startDate = $('#pickup_date').val();
            const startTime = $('#pickup_time').val() || '10:00';
            const endDate = $('#dropoff_date').val();
            const endTime = $('#dropoff_time').val() || '10:00';
            const groupOrPrivate = $('#listing_id > option:selected').data('private-or-group') || 'Group';
            const numPeople = parseInt($('#number_of_people').val()) || 1;
            const discountOrExtra = parseFloat($('#discount_or_extra').val()) || 0;

            const $selectedOption = $('#listing_id option:selected');
            const pricePerHour = parseFloat($selectedOption.data('price-per-hour')) || 0;
            const pricePerHalfDay = parseFloat($selectedOption.data('price-per-half-day')) || 0;
            const pricePerDay = parseFloat($selectedOption.data('price-per-day')) || 0;
            const pricePerWeek = parseFloat($selectedOption.data('price-per-week')) || null;
            const pricePerMonth = parseFloat($selectedOption.data('price-per-month')) || null;
            const airportOne = parseFloat($selectedOption.attr('airport_one')) || 0;
            const airportRound = parseFloat($selectedOption.attr('airport_round')) || 0;
            const intercityOne = parseFloat($selectedOption.attr('intercity_one')) || 0;
            const intercityRound = parseFloat($selectedOption.attr('intercity_round')) || 0;
            const airportOrIntercity = $('#airport_or_intercity').val();
            let totalPrice = 0;
            let addonsTotal = 0;

            // Calculate add-ons - only multiply by people for category 5 private activities
            $('select.addon').each(function() {
                let selectedOption = $(this).find(':selected');
                let addonPrice = parseFloat(selectedOption.data('price')) || 0;

                // Only multiply by number of people for category 5 private activities
                if (category_id === 5 && groupOrPrivate === 'Private') {
                    addonPrice *= numPeople;
                }

                addonsTotal += addonPrice;
            });

            if (category_id === 2) {
                // Car Rental - matches PricingService::calculateCarRentalPrice()
                if (startDate && endDate) {
                    const start = new Date(startDate + 'T' + startTime);
                    const end = new Date(endDate + 'T' + endTime);

                    const diffMs = end - start;
                    const totalMinutes = diffMs / (1000 * 60);
                    // Every 24h = 1 day, any excess = +1 day
                    const diffDays = Math.ceil(totalMinutes / 1440);

                    let effectivePricePerDay = 0;
                    if (diffDays < 7) {
                        // Daily rate for less than 7 days
                        effectivePricePerDay = pricePerDay || 0;
                    } else if (diffDays < 30) {
                        // Weekly rate for 7-29 days (with fallback)
                        const weeklyPrice = pricePerWeek || (pricePerDay * 7);
                        effectivePricePerDay = weeklyPrice / 7;
                    } else {
                        // Monthly rate for 30+ days (with fallback)
                        const monthlyPrice = pricePerMonth || (pricePerDay * 30);
                        effectivePricePerDay = monthlyPrice / 30;
                    }

                    totalPrice = effectivePricePerDay * diffDays;

                    $('#summary_duration').text(diffDays + ' Days');
                    $('#summary_per_day').text(effectivePricePerDay.toFixed(2) + '€');
                }
            } else if (category_id === 4) {
                // Boat Rental - matches PricingService::calculateBoatRentalPrice()
                let duration = $('#duration').val();
                
                // Convert duration to numeric hours to match server logic
                let hours = 0;
                switch (duration) {
                    case '30min':
                        hours = 0.5;
                        break;
                    case '1h':
                        hours = 1;
                        break;
                    case '2h':
                        hours = 2;
                        break;
                    case '3h':
                        hours = 3;
                        break;
                    case '4h':
                        hours = 4;
                        break;
                    case 'Half-Day':
                        hours = 4; // Treat as 4 hours for half-day
                        break;
                    case 'Full-Day':
                        hours = 8; // Treat as 8 hours for full-day
                        break;
                    default:
                        hours = parseFloat(duration) || 0;
                        break;
                }

                // Apply pricing based on hour ranges (matching server logic)
                if (hours >= 0.5 && hours <= 1.5) {
                    // 30min to 1.5 hours: price_per_hour * hours
                    totalPrice = pricePerHour * hours;
                } else if (hours >= 2 && hours <= 4) {
                    // 2 to 4 hours: FLAT half-day rate
                    totalPrice = pricePerHalfDay || (pricePerHour * 4);
                } else if (hours >= 4.5 && hours <= 8) {
                    // 4.5 to 8 hours: FLAT full-day rate
                    totalPrice = pricePerDay || (pricePerHour * 8);
                } else {
                    // Invalid duration - use hourly rate as fallback
                    totalPrice = pricePerHour * hours;
                }

                $('#summary_duration').text(duration);
            } else if (category_id === 3) {
                // Private Driver - simplified but more accurate
                // Parse the airport_or_intercity value to determine service and road type
                let isAirportTransfer = airportOrIntercity.includes('Airport');
                let isRoundTrip = airportOrIntercity.includes('Round');
                
                if (isAirportTransfer) {
                    if (isRoundTrip) {
                        // Airport Round Trip - with fallback to intercity round
                        totalPrice = airportRound || intercityRound || 0;
                    } else {
                        // Airport One Way - with fallback to intercity one
                        totalPrice = airportOne || intercityOne || 0;
                    }
                } else {
                    // Intercity
                    if (isRoundTrip) {
                        totalPrice = intercityRound || 0;
                    } else {
                        totalPrice = intercityOne || 0;
                    }
                }
            } else if (category_id === 5) {
                // Activities - matches PricingService::calculateActivityPrice()
                let optionPrice = $('#pricing_option_id > option:selected').data('price') || 0;
                totalPrice = groupOrPrivate == 'Group' ?
                    parseFloat(optionPrice) :
                    parseFloat(optionPrice) * numPeople;
            }

            // IMPORTANT: According to documentation:
            // booking_price = base price only (NO addons, NO discount)
            // total_price = base price + addons + discount
            let basePrice = totalPrice;  // This is the base price before addons
            let finalTotal = basePrice + addonsTotal + discountOrExtra;

            // Update summary fields
            $('#summary_booking_price').text(basePrice.toFixed(2) + '€');
            $('#summary_total').text(finalTotal.toFixed(2) + '€');
            
            // Set hidden form fields according to server documentation:
            $('#booking_price').val(basePrice);  // Base price only
            $('#total_addons').val(addonsTotal); // Sum of addon prices
            $('#total_price').val(finalTotal);   // Base + addons + discount
            
            $('#summary_total_addons').text(addonsTotal.toFixed(2) + '€');
        }

        $('#pickup_date, #pickup_time, #dropoff_date, #dropoff_time, #duration, #pricing_option_id, #number_of_people, #discount_or_extra').on('change', calculatePrice);

        $('#city_a_id, #city_b_id, #car_type, #airport_or_intercity').on('change', getListings);

        $('#category_id').change(function() {
            const category_id = $(this).val();

            toggleFieldsByCategory(category_id);

            $('#addons-table > tbody').html('');
            if (category_id == 2) {
                $('.booking-pricing-item.per_day').show();
            } else {
                $('.booking-pricing-item.per_day').hide();
            }

            if (category_id == 3 || category_id == 5) {
                $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
                return;
            }

            $.ajax({
                type: 'post'
                , url: '{{ route("categories.getListings") }}'
                , data: {
                    category_id: category_id
                }
                , dataType: 'json'
                , success: function(resp) {
                    let options = '<option value="" disabled selected>--Choose Option--</option>';
                    resp.listings.forEach(function(listing) {
                        pricePerHour = parseFloat(listing.price_per_hour) || 0;
                        pricePerHalfDay = parseFloat(listing.price_per_half_day) || 0;
                        pricePerDay = parseFloat(listing.price_per_day) || 0;
                        pricePerWeek = parseFloat(listing.price_per_week) || 0;
                        pricePerMonth = parseFloat(listing.price_per_month) || 0;
                        options += `<option value="${listing.id}" 
                                            data-durations="${listing.duration_options}"
                                            data-price-per-hour="${pricePerHour}"
                                            data-price-per-half-day="${pricePerHalfDay}"
                                            data-price-per-day="${pricePerDay}"
                                            data-price-per-week="${pricePerWeek}"
                                            data-price-per-month="${pricePerMonth}"
                                            data-private-or-group="${listing.private_or_group}"
                                            >${listing.title}</option>`;
                    });

                    $('#listing_id').html(options);
                }
            });
        });

        $('#listing_id').change(function() {
            const listing_id = $(this).val();
            const category_id = $('#category_id').val();
            const $selectedOption = $('#listing_id option:selected');

            let durations = $selectedOption.data('durations');

            $('#addons-table > tbody').html('');

            if (durations) {
                let durationsArr = durations.split(',');

                generateOptions('duration', durationsArr);
            }

            if (category_id == 3 || category_id == 5) {
                $.ajax({
                    type: 'post'
                    , url: '{{ route("listings.getPricing") }}'
                    , data: {
                        listing_id: listing_id
                    }
                    , dataType: 'json'
                    , success: function(resp) {

                        let options = '<option value="" disabled selected>--Choose Option--</option>';
                        resp.options.forEach(function(option) {
                            options += `<option value="${option.id}" data-price="${option.price}">${option.element}</option>`;
                        });

                        $('#pricing_option_id').html(options);
                    }
                    , error: function(err) {
                        console.log(err);
                    }
                });
            }

            calculatePrice();

            $.ajax({
                type: 'post'
                , url: '{{ route("listings.getAddons") }}'
                , data: {
                    listing_id: listing_id
                }
                , dataType: 'json'
                , success: function(resp) {
                    let options = '<option value="" disabled selected>--Choose Option--</option>';
                    resp.addons.forEach(function(addon) {
                        options += `<option value="${addon.id}" data-price="${addon.price}">${addon.addon} (${parseFloat(addon.price).toFixed(2)}€)</option>`;
                    });

                    addonsOptions = options;
                    $('.addon').html(options);
                }
                , error: function(err) {
                    console.log(err);
                }
            });
        });

        $('body').on('change', 'select.addon', function() {
            calculatePrice();
        })

        $('#add-addon').click(function() {
            const newOption = `
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
                    `;
            $('#addons-table > tbody').append(newOption);
            calculatePrice();
        });

        $('body').on('click', '.remove-addon', function() {
            $(this).closest('tr').remove();
            calculatePrice();
        });
    });
    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .catch(error => {
                console.error(error);
            });
    });

</script>
@endsection
