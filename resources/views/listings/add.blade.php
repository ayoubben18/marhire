@extends('layouts.dashboard_admin')

@section('title', 'Add Listing')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Add Listing</h3>
            <div class="nk-block-des text-soft">
                <p>Add informations of new listing.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('listings.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
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
<form action="{{ route('listings.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="row">
        <div class="col-md-8">
            <div class="card card-preview">
                <div class="card-inner">
                    <div class="preview-block">
                        <div class="pagination-header">
                            <div class="ctm-step active">
                                <div class="ctm-circle">1</div>
                                <p>Informations</p>
                            </div>
                            <div class="line"></div>
                            <div class="ctm-step ">
                                <div class="ctm-circle">2</div>
                                <p>Pricing</p>
                            </div>
                            <div class="line"></div>
                            <div class="ctm-step ">
                                <div class="ctm-circle">3</div>
                                <p>Galleries</p>
                            </div>
                        </div>
                        @if(session('inserted'))
                        <div class="example-alert mb-3">
                            <div class="alert alert-success alert-icon">
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new listing has been created.
                            </div>
                        </div>
                        @endif
                        <div id="step1">
                            <div class="row gy-4">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label" for="title">Lising Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" id="title" value="{{ old('title') }}" placeholder="Lising Name" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
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
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="city_id">City <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="city_id" id="city_id">
                                                <option value="" disabled selected>--Choose option--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}">{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_type" class="form-label">Car Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="car_type" id="car_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($carTypes as $type)
                                                <option value="{{ $type['id'] }}">{{ $type['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_model" class="form-label">Car Brand <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="car_model" id="car_model">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($carModels as $model)
                                                <option value="{{ $model['id'] }}">{{ $model['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="vehicule_type" class="form-label">Vehicule Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="vehicule_type" id="vehicule_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($vehiculeTypes as $vehiculeType)
                                                <option value="{{ $vehiculeType['id'] }}">{{ $vehiculeType['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="vehicule_model" class="form-label">Vehicule Model <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="vehicule_model" id="vehicule_model">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($vehiculeModels as $vehiculeModel)
                                                <option value="{{ $vehiculeModel['id'] }}">{{ $vehiculeModel['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_make_model" class="form-label">Year <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="year" id="year">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @for($year = date('Y'); $year >= 2016; $year--)
                                                <option value="{{ $year }}">{{ $year }}</option>
                                                @endfor
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_make_model" class="form-label">Fuel Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="fuel_type" id="fuel_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Hybrid">Hybrid</option>
                                                <option value="Electric">Electric</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="transmission" class="form-label">Transmission <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="transmission" id="transmission">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Automatic">Automatic</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="seats" class="form-label">Number of Seats <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="seats" id="seats">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="2">2</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9+">9+</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="doors" class="form-label">Number of Doors <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="doors" id="doors">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="2">2</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="provider_id" class="form-label">Provider <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="provider_id" id="provider_id">
                                                <option value="" disabled selected>--Choose Option--</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="ac" class="form-label">A/C <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="ac" id="ac">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="mileage_policy" class="form-label">Mileage Policy <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="mileage_policy" id="mileage_policy">
                                                <option value="Yes">--Choose Option--</option>
                                                <option value="Unlimited km">Unlimited km</option>
                                                <option value="100 km/day">100 km/day</option>
                                                <option value="150 km/day">150 km/day</option>
                                                <option value="200 km/day">200 km/day</option>
                                                <option value="250 km/day">250 km/day</option>
                                                <option value="300 km/day">300 km/day</option>
                                                <option value="350 km/day">350 km/day</option>
                                                <option value="400 km/day">400 km/day</option>
                                                <option value="450 km/day">450 km/day</option>
                                                <option value="500 km/day">500 km/day</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="fuel_policy" class="form-label">Fuel Policy <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="fuel_policy" id="fuel_policy">
                                                <option value="Yes">--Choose Option--</option>
                                                <option value="Full to Full">Full to Full</option>
                                                <option value="Same to Same">Same to Same</option>
                                                <option value="Prepaid Fuel">Prepaid Fuel</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="driver_requirement" class="form-label">Driver Age Requirement <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="driver_requirement" id="driver_requirement">
                                                <option value="Yes">--Choose Option--</option>
                                                <option value="21-70 years">21-70 years</option>
                                                <option value="26-70 years">26-70 years</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="deposit_required" class="form-label">Deposit Required<span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="deposit_required" id="deposit_required">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 deposit" data-categories="2">
                                    <div class="form-group">
                                        <label for="deposit_amount" class="form-label">Deposit Amount</label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="deposit_amount" id="deposit_amount" value="{{ old('deposit_amount') }}" placeholder="Deposit Amount" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 deposit" data-categories="2">
                                    <div class="form-group">
                                        <label for="deposit_note" class="form-label">Deposit Note</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="deposit_note" id="deposit_note" value="{{ old('deposit_note') }}" placeholder="Deposit Note" />
                                        </div>
                                    </div>
                                </div>
                                <!-- Boats fields -->
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="boat_type" class="form-label">Boat Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="boat_type" id="boat_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($boatTypes as $type)
                                                <option value="{{ $type['id'] }}">{{ $type['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="with_captain" class="form-label">With Captain <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="with_captain" id="with_captain">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="capacity" class="form-label">Capacity <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control @error('capacity') is_invalid @enderror" name="capacity" id="capacity" value="{{ old('capacity') }}" placeholder="Capacity" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4,5">
                                    <div class="form-group">
                                        <label for="duration_options" class="form-label">Duration Options</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="duration_options[]" id="duration_options" multiple>
                                                <option value="1h">1h</option>
                                                <option value="2h">2h</option>
                                                <option value="3h">3h</option>
                                                <option value="Half-Day">Half-Day</option>
                                                <option value="Full-Day">Full-Day</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="purpose_tags" class="form-label">Purpose Tags</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="purpose_tags[]" id="purpose_tags" multiple>
                                                <option value="Private Cruise">Private Cruise</option>
                                                <option value="Romantic Experience">Romantic Experience</option>
                                                <option value="Family Outing">Family Outing</option>
                                                <option value="Fishing Trip">Fishing Trip</option>
                                                <option value="Sunset Cruise">Sunset Cruise</option>
                                                <option value="Birthday Celebration">Birthday Celebration</option>
                                                <option value="Corporate Event">Corporate Event</option>
                                                <option value="Luxury Experience">Luxury Experience</option>
                                                <option value="Water Sports & Adventure">Water Sports & Adventure</option>
                                                <option value="Photography Tour">Photography Tour</option>
                                                <option value="Snorkeling Tour">Snorkeling Tour</option>
                                                <option value="Island Hopping">Island Hopping</option>
                                                <option value="Jet Ski Add-On Available">Jet Ski Add-On Available</option>
                                                <option value="Party on Boat">Party on Boat</option>
                                                <option value="Half-Day Rental">Half-Day Rental</option>
                                                <option value="Full-Day Rental">Full-Day Rental</option>
                                                <option value="Weekend Getaway">Weekend Getaway</option>
                                                <option value="Swimming & Relaxation">Swimming & Relaxation</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="departure_location" class="form-label">Departure Location <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon1"><span class="ti ti-location-pin"></span></span>
                                                <input type="text" class="form-control" name="departure_location" id="departure_location" value="{{ old('departure_location') }}" placeholder="Departure Location" />
                                            </div>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="max_passengers" class="form-label">Max Passengers <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="max_passengers" id="max_passengers" value="{{ old('max_passengers') }}" placeholder="Max Passengers" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="max_luggage" class="form-label">Max Luggage <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="max_luggage" id="max_luggage" value="{{ old('max_luggage') }}" placeholder="Max Luggage" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="pickup_location" class="form-label">Pickup Location <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon1"><span class="ti ti-location-pin"></span></span>
                                                <input type="text" class="form-control" name="pickup_location" id="pickup_location" value="{{ old('pickup_location') }}" placeholder="Pickup Location" />
                                            </div>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3,5">
                                    <div class="form-group">
                                        <label for="pickup_location" class="form-label">Languages Spoken <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="languages_spoken[]" id="languages_spoken" multiple>
                                                <option value="English">English</option>
                                                <option value="French">French</option>
                                                <option value="Arabic">Arabic</option>
                                                <option value="Spanish">Spanish</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="activity_type" class="form-label">Activity Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="activity_type" id="activity_type">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                @foreach($activityTypes as $type)
                                                    <option value="{{ $type['id'] }}">{{ $type['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="pickup" class="form-label">Pickup Included <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="pickup" id="pickup">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="meeting_point">Meeting Point <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="meeting_point" id="meeting_point" value="{{ old('meeting_point') }}" placeholder="Meeting Point" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="private_or_group" class="form-label">Private Or Group <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="private_or_group" id="private_or_group">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="Private">Private</option>
                                                <option value="Group">Group</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" id="group_size_min_cont" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="group_size_min">Minimum Group Size <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="group_size_min" id="group_size_min" value="{{ old('group_size_min') }}" placeholder="Minimum Group Size" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" id="group_size_max_cont" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="group_size_max">Maximum Group Size <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="group_size_max" id="group_size_max" value="{{ old('group_size_max') }}" placeholder="Maximum Group Size" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="difficulty" class="form-label">Difficulty <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="difficulty" id="difficulty">
                                                <option value="" disabled selected>--Choose Option--</option>
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" data-categories="3">
                                    <h5>Amenities</h5>
                                    <table class="table table-bordered" id="amenities-table">
                                        <thead>
                                            <tr>
                                                <th>Amenity</th>
                                                <th width="200"><button type="button" id="add-amenity" class="btn btn-success btn-sm">+ Add Option</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-12" data-categories="5">
                                    <h5>Schedule</h5>
                                    <table class="table table-bordered" id="schedules-table">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th width="200"><button type="button" id="add-schedule" class="btn btn-success btn-sm">+ Add Option</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
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
                                <div class="col-12">
                                    <h5>Included Items</h5>
                                    <table class="table table-bordered" id="included-table">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th width="200"><button type="button" id="add-included" class="btn btn-success btn-sm">+ Add Item</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-12">
                                    <h5>Not Included Items</h5>
                                    <table class="table table-bordered" id="not-included-table">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th width="200"><button type="button" id="add-not-included" class="btn btn-success btn-sm">+ Add Item</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="special_notes" class="form-label">Special Notes or Requirements</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control editor" name="special_notes" id="special_notes">{{ old('special_notes') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                {{-- <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="pickup_info" class="form-label">Pick-up / Drop-off Info</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control" name="pickup_info" id="pickup_info">{{ old('pickup_info') }}</textarea>
                                        </div>
                                    </div>
                                </div> --}}
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="short_description" class="form-label">Short Description</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control editor" name="short_description" id="short_description">{{ old('short_description') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="description" class="form-label">Description</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control editor" name="description" id="description">{{ old('description') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="dealer_note" class="form-label">Dealer Note</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control" rows="3" name="dealer_note" id="dealer_note">{{ old('dealer_note') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end align-items-center mt-2">
                                <button type="button" class="btn-signup go-to-step2">Next</button>
                            </div>
                        </div>
                        <div id="step2" style="display:none;">
                            <div class="row gy-4">
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_hour">Price Per Hour <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_hour" id="price_per_hour" value="{{ old('price_per_hour') }}" placeholder="Price Per Hour" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_half_day">Price Per Half Day <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_half_day" id="price_per_half_day" value="{{ old('price_per_half_day') }}" placeholder="Price Per Half Day" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2,4">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_day">Price Per Day <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_day" id="price_per_day" value="{{ old('price_per_day') }}" placeholder="Price Per Day" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_week">Price Per Week <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_week" id="price_per_week" value="{{ old('price_per_week') }}" placeholder="Price Per Week" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_month">Price Per Month <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_month" id="price_per_month" value="{{ old('price_per_month') }}" placeholder="Price Per Month" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" data-categories="5">
                                    <table class="table table-bordered" id="pricing-table">
                                        <thead>
                                            <tr>
                                                <th>Option</th>
                                                <th>Price</th>
                                                <th width="200"><button type="button" id="add-pricing" class="btn btn-success btn-sm">+ Add Option</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-12" data-categories="3">
                                    <table class="table table-bordered" id="pricing-private-table">
                                        <thead>
                                            <tr>
                                                <th>City</th>
                                                <th>Airport (One Way)</th>
                                                <th>Airport (Round Way)</th>
                                                <th>Intercity (One Way)</th>
                                                <th>Intercity (Round Way)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($cities as $city)
                                            <input type="hidden" name="private_city[]" value="{{ $city->id }}"/>
                                            <tr>
                                                <td>{{ $city->city_name }}</td>
                                                <td>
                                                    <input type="number" step="any" class="form-control" name="airport_one[]" />
                                                </td>
                                                <td>
                                                    <input type="number" step="any" class="form-control" name="airport_round[]" />
                                                </td>
                                                <td>
                                                    <input type="number" step="any" class="form-control" name="intercity_one[]" />
                                                </td>
                                                <td>
                                                    <input type="number" step="any" class="form-control" name="intercity_round[]" />
                                                </td>
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end align-items-center mt-2">
                                <button type="button" class="btn back-to-step1">Previous</button>
                                <button type="button" class="btn-signup go-to-step3">Next</button>
                            </div>
                        </div>
                        <div id="step3" style="display: none;">
                            <div class="form-group">
                                <label class="font-weight-bold mb-2">Upload Images</label>

                                <div id="drop-area" class="border border-primary rounded d-flex flex-column align-items-center justify-content-center p-4" style="cursor: pointer;">
                                    <i class="fas fa-cloud-upload-alt fa-2x text-primary mb-2"></i>
                                    <p class="">Click or drag images here to upload</p>
                                    <input type="file" id="listing_images" name="images[]" multiple class="d-none">
                                </div>

                                <div class="image-preview row mt-3"></div>
                            </div>
                            <div class="d-flex justify-content-end align-items-center mt-2">
                                <button type="button" class="btn back-to-step2">Previous</button>
                                <button type="submit" class="btn-signup">Save</button>
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
                        <h3 class="nk-block-title nk-block-title--card-head">SEO settings</h3>
                        <div>
                            <div class="form-group">
                                <label class="form-label" for="slug">Slug (optional)</label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control @error('slug') is-invalid @enderror" name="slug" id="slug" value="{{ old('slug') }}" placeholder="Slug" />
                                    @error('slug')
                                    <small class="error">Required field.</small>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="meta_title">Meta Title</label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control @error('meta_title') is-invalid @enderror" name="meta_title" id="meta_title" value="{{ old('meta_title') }}" placeholder="Meta Title" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="meta_description">Meta Description</label>
                                <div class="form-control-wrap">
                                    <textarea class="form-control no-resize" name="meta_description" id="meta_description" value="{{ old('meta_description') }}" placeholder="Meta Description" rows="6"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="schema_markup">Schema Markup (JSON-LD)</label>
                                <div class="form-control-wrap">
                                    <textarea class="form-control no-resize" name="schema_markup" id="schema_markup" value="{{ old('schema_markup') }}" placeholder="Schema Markup (JSON-LD)" rows="6"></textarea>
                                </div>
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
    const cities = @json($cities);
    let addonsOptions = '<option value="" selected disabled>--Choose Addon--</option>';
    let pricingOptions = '<option value="" selected disabled>--Choose City--</option>';
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
        let requiredFields = ['title', 'category_id', 'city_id', 'provider_id'];

        const categoryRequiredMap = {
            2: ['car_type', 'car_model', 'year', 'fuel_type', 'transmission', 'seats', 'doors', 'ac', 'mileage_policy', 'fuel_policy', 'driver_requirement', 'deposit_required']
            , 3: ['vehicule_type', 'vehicule_model', 'max_passengers', 'max_luggage', 'pickup_location', 'languages_spoken']
            , 4: ['boat_type', 'with_captain', 'capacity', 'departure_location']
            , 5: ['duration_options', 'languages_spoken', 'activity_type', 'pickup', 'meeting_point', 'private_or_group', 'difficulty']
        };

        if (categoryRequiredMap[categoryId]) {
            requiredFields = requiredFields.concat(categoryRequiredMap[categoryId]);
        }

        let valid = true;

        if (stepper == 1) {
            const step1 = document.getElementById("step1");

            requiredFields.forEach(fieldName => {
                const input = step1.querySelector(`[id="${fieldName}"]`);
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
        }

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

    $(document).ready(function() {
        $('#step2, #step3').hide();
        $('#step1').show();

        $('.go-to-step2').click(function() {
            if (validateForm()) {
                changeStepper(2);
                $('#step1').hide();
                $('#step2').show();
            } else {
                $('html, body').animate({
                    scrollTop: 10
                }, 500);
            }
        });

        $('.back-to-step1').click(function() {
            $('#step1').show();
            $('#step2').hide();

            changeStepper(1);
        });

        $('.go-to-step3').click(function() {
            if (validateForm()) {
                changeStepper(3);
                $('#step2').hide();
                $('#step3').show();
            } else {
                $('html, body').animate({
                    scrollTop: 10
                }, 500);
            }
        });

        $('.back-to-step2').click(function() {
            $('#step2').show();
            $('#step3').hide();

            changeStepper(2);
        });

        $('#category_id').change(function() {
            const category_id = $(this).val();

            toggleFieldsByCategory(category_id);

            $.ajax({
                type: 'post'
                , url: '{{ route("categories.getCategoryData") }}'
                , data: {
                    category_id: category_id
                }
                , dataType: 'json'
                , success: function(resp) {
                    let options = '<option value="" disabled selected>--Choose Addon--</option>';
                    resp.addons.forEach(function(addon) {
                        options += `<option value="${addon.id}">${addon.addon}</option>`;
                    });

                    addonsOptions = options;
                    $('.addon').html(options);

                    options = '<option value="" disabled selected>--Choose Option--</option>';
                    resp.providers.forEach(function(provider) {
                        options += `<option value="${provider.id}">${provider.agency_name}</option>`;
                    });

                    $('#provider_id').html(options);

                }
            });
        });

        $('body').on('change', '.subcategory', function() {
            const subcategory_id = $(this).val();
            const current = $(this);

            $.ajax({
                type: 'post'
                , url: '{{ route("subcategories.getOptions") }}'
                , data: {
                    subcategory_id: subcategory_id
                }
                , dataType: 'json'
                , success: function(resp) {
                    let options = '<option value="">Choose Option</option>';
                    resp.forEach(function(opt) {
                        options += `<option value="${opt.id}">${opt.option}</option>`;
                    });

                    $(current).closest('tr').find('.ctm-option').html(options);
                }
            });
        });

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
        });

        $('body').on('click', '.remove-addon', function() {
            $(this).closest('tr').remove();
        });

        $('#add-pricing').click(function() {
            const newOption = `
                        <tr>
                            <td>
                                <input type="text" name="pricing_els[]" class="form-control" required />
                            </td>
                            <td>
                                <input type="number" step="any" name="pricings[]" class="form-control" required />
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-pricing" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#pricing-table > tbody').append(newOption);
        })

        $('body').on('click', '.remove-pricing', function() {
            $(this).closest('tr').remove();
        });

        $('#add-included').click(function() {
            const newOption = `
                        <tr>
                            <td>

                                <input type="text" name="included[]" class="form-control" />
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-included" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#included-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-included', function() {
            $(this).closest('tr').remove();
        });

        $('#add-amenity').click(function() {
            const newOption = `
                        <tr>
                            <td>
                                <input type="text" name="amenities[]" class="form-control" />
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-amenity" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#amenities-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-amenity', function() {
            $(this).closest('tr').remove();
        });

        $('#add-schedule').click(function() {
            const newOption = `
                        <tr>
                            <td>
                                <input type="text" name="schedules[]" class="form-control" />
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-schedule" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#schedules-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-schedule', function() {
            $(this).closest('tr').remove();
        });

        $('#add-not-included').click(function() {
            const newOption = `
                        <tr>
                            <td>

                                <input type="text" name="not_included[]" class="form-control" />
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-not-included" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#not-included-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-not-included', function() {
            $(this).closest('tr').remove();
        });

        $('#deposit_required').change(function() {
            const depositRequired = $(this).val();

            if (depositRequired == 'Yes') {
                $('.deposit').removeClass('d-none');
            } else {
                $('#deposit_amount').val('');
                $('#deposit_note').val('');
                $('.deposit').addClass('d-none');
            }
        });

        $('#private_or_group').change(function(){
            const selectedVal = $(this).val();

            if(selectedVal == 'Private')
            {
                $('#group_size_min_cont').hide();
                $('#group_size_max_cont').hide();
            }
            else
            {
                $('#group_size_min_cont').show();
                $('#group_size_max_cont').show();
            }
        });

        const dropArea = $('#drop-area');
        const input = $('#listing_images');
        const preview = $('.image-preview');

        // Click to open file dialog
        dropArea.on('click', function(e) {
            if (!$(e.target).is('input')) {
                input.get(0).click(); // Use native click to avoid recursion
            }
        });

        // On file select
        input.on('change', function(e) {
            handleFiles(e.target.files);
        });

        // Drag and drop
        dropArea.on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropArea.addClass('bg-light');
        });

        dropArea.on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropArea.removeClass('bg-light');
        });

        dropArea.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropArea.removeClass('bg-light');

            const files = e.originalEvent.dataTransfer.files;
            input.get(0).files = files; // Optional: update input field
            handleFiles(files);
        });

        function handleFiles(files) {
            [...files].forEach(file => {
                if (!file.type.startsWith('image/')) return;

                const reader = new FileReader();
                reader.onload = function(e) {
                    const col = $('<div class="col-md-3 mb-2 gallery-img"></div>');
                    const img = $('<img class="img-fluid rounded border" style="max-height: 150px;">');
                    img.attr('src', e.target.result);
                    col.append(img);
                    preview.append(col);
                };
                reader.readAsDataURL(file);
            });
        }
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
