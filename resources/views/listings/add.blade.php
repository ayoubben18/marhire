@extends('layouts.dashboard_admin')

@section('title', isset($listing) ? 'Edit Listing' : 'Add Listing')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">{{ isset($listing) ? 'Edit' : 'Add' }} Listing</h3>
            <div class="nk-block-des text-soft">
                <p>{{ isset($listing) ? 'Edit informations of listing.' : 'Add informations of new listing.' }}</p>
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
    
    /* Car Types Multi-Select Styles */
    .car-types-multiselect {
        border: 1px solid #e1e5eb;
        border-radius: 0.375rem;
        padding: 0.75rem;
        background-color: #fff;
    }
    
    .car-types-multiselect.is-invalid {
        border-color: #dc3545;
    }
    
    .car-types-grid .form-check {
        margin-bottom: 0.5rem;
    }
    
    .car-type-chips .badge {
        margin-right: 0.25rem;
        margin-bottom: 0.25rem;
    }
    
    .selected-car-types {
        border-top: 1px solid #e1e5eb;
        padding-top: 0.5rem;
        margin-top: 0.5rem;
    }
    
    /* Duration Grid Styles */
    .duration-grid {
        border: 1px solid #e1e5eb;
        border-radius: 0.375rem;
        padding: 0.75rem;
        background-color: #fff;
    }
    
    .duration-grid.is-invalid {
        border-color: #dc3545;
    }
    
    .duration-grid .form-check {
        margin-bottom: 0.5rem;
    }
    
    .duration-grid .form-check-input {
        margin-top: 0.25rem;
    }
    
    .duration-grid .form-check-label {
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
    }
    
    /* Image Processing Styles */
    .image-overlay {
        border-radius: 0.375rem;
    }
    
    #image-processing-status {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .progress {
        height: 1.5rem;
    }
    
    .progress-bar {
        transition: width 0.6s ease;
    }

</style>
{{-- Display Validation Errors at Top --}}
@if($errors->any())
<div class="alert alert-danger alert-icon mb-4">
    <em class="icon ni ni-cross-circle"></em>
    <strong>Validation Error!</strong> Please fix the following errors and navigate through the form steps to correct them:
    <ul class="mt-2 mb-0">
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form action="{{ isset($listing) ? route('listings.update') : route('listings.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    @if(isset($listing))
        <input type="hidden" name="id" value="{{ $listing->id }}">
    @endif
    
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
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. New listing has been created.
                            </div>
                        </div>
                        @endif
                        @if(session('updated'))
                        <div class="example-alert mb-3">
                            <div class="alert alert-success alert-icon">
                                <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. Listing has been updated successfully.
                            </div>
                        </div>
                        @endif
                        <div id="step1">
                            <div class="row gy-4">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label" for="title">Lising Name <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" id="title" value="{{ old('title', isset($listing) ? $listing->title : '') }}" placeholder="Listing Name" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label" for="category_id">Category <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="category_id" id="category_id">
                                                <option value="" disabled {{ !isset($listing) || !$listing->category_id ? 'selected' : '' }}>--Choose option--</option>
                                                @foreach($categories as $category)
                                                <option value="{{ $category->id }}" {{ old('category_id', isset($listing) ? $listing->category_id : '') == $category->id ? 'selected' : '' }}>{{ $category->category }}</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->city_id ? 'selected' : '' }}>--Choose option--</option>
                                                @foreach($cities as $city)
                                                <option value="{{ $city->id }}" {{ old('city_id', isset($listing) ? $listing->city_id : '') == $city->id ? 'selected' : '' }}>{{ $city->city_name }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_types" class="form-label">Car Types <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <!-- Multi-select Car Types -->
                                            <div class="car-types-multiselect" id="car-types-container">
                                                <div class="car-types-grid row">
                                                    @foreach($carTypes as $type)
                                                    <div class="col-md-6 mb-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input car-type-checkbox" 
                                                                   type="checkbox" 
                                                                   name="car_types[]" 
                                                                   value="{{ $type['id'] }}" 
                                                                   id="car_type_{{ $type['id'] }}"
                                                                   data-type-id="{{ $type['id'] }}">
                                                            <label class="form-check-label" for="car_type_{{ $type['id'] }}">
                                                                {{ $type['option'] }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                </div>
                                                <!-- Selected items display -->
                                                <div class="selected-car-types mt-2" id="selected-car-types" style="display: none;">
                                                    <small class="text-muted">Selected:</small>
                                                    <div class="car-type-chips d-flex flex-wrap gap-1 mt-1"></div>
                                                </div>
                                            </div>
                                            
                                            <!-- Hidden field for backward compatibility -->
                                            <input type="hidden" name="car_type" id="car_type_legacy" value="{{ old('car_type', isset($listing) ? $listing->car_type : '') }}">
                                            
                                            <small class="error d-none" data-error="car_types">At least one car type must be selected.</small>
                                            @error('car_types')
                                                <small class="text-danger">{{ $message }}</small>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label for="car_model" class="form-label">Car Brand <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="car_model" id="car_model">
                                                <option value="" disabled {{ !isset($listing) || !$listing->car_model ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($carModels as $model)
                                                <option value="{{ $model['id'] }}" {{ old('car_model', isset($listing) ? $listing->car_model : '') == $model['id'] ? 'selected' : '' }}>{{ $model['option'] }}</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->vehicule_type ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($vehiculeTypes as $vehiculeType)
                                                <option value="{{ $vehiculeType['id'] }}" {{ old('vehicule_type', isset($listing) ? $listing->vehicule_type : '') == $vehiculeType['id'] ? 'selected' : '' }}>{{ $vehiculeType['option'] }}</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->vehicule_model ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($vehiculeModels as $vehiculeModel)
                                                <option value="{{ $vehiculeModel['id'] }}" {{ old('vehicule_model', isset($listing) ? $listing->vehicule_model : '') == $vehiculeModel['id'] ? 'selected' : '' }}>{{ $vehiculeModel['option'] }}</option>
                                                @endforeach
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="service_type" class="form-label">Service Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="service_type" id="service_type">
                                                <option value="" disabled {{ !isset($listing) || !$listing->service_type ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($serviceTypes as $serviceType)
                                                <option value="{{ $serviceType['id'] }}" {{ old('service_type', isset($listing) ? $listing->service_type : '') == $serviceType['id'] ? 'selected' : '' }}>{{ $serviceType['option'] }}</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->year ? 'selected' : '' }}>--Choose Option--</option>
                                                @for($year = date('Y'); $year >= 2016; $year--)
                                                <option value="{{ $year }}" {{ old('year', isset($listing) ? $listing->year : '') == $year ? 'selected' : '' }}>{{ $year }}</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->fuel_type ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Petrol" {{ old('fuel_type', isset($listing) ? $listing->fuel_type : '') == 'Petrol' ? 'selected' : '' }}>Petrol</option>
                                                <option value="Diesel" {{ old('fuel_type', isset($listing) ? $listing->fuel_type : '') == 'Diesel' ? 'selected' : '' }}>Diesel</option>
                                                <option value="Hybrid" {{ old('fuel_type', isset($listing) ? $listing->fuel_type : '') == 'Hybrid' ? 'selected' : '' }}>Hybrid</option>
                                                <option value="Electric" {{ old('fuel_type', isset($listing) ? $listing->fuel_type : '') == 'Electric' ? 'selected' : '' }}>Electric</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->transmission ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Manual" {{ old('transmission', isset($listing) ? $listing->transmission : '') == 'Manual' ? 'selected' : '' }}>Manual</option>
                                                <option value="Automatic" {{ old('transmission', isset($listing) ? $listing->transmission : '') == 'Automatic' ? 'selected' : '' }}>Automatic</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->seats ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="2" {{ old('seats', isset($listing) ? $listing->seats : '') == '2' ? 'selected' : '' }}>2</option>
                                                <option value="4" {{ old('seats', isset($listing) ? $listing->seats : '') == '4' ? 'selected' : '' }}>4</option>
                                                <option value="5" {{ old('seats', isset($listing) ? $listing->seats : '') == '5' ? 'selected' : '' }}>5</option>
                                                <option value="6" {{ old('seats', isset($listing) ? $listing->seats : '') == '6' ? 'selected' : '' }}>6</option>
                                                <option value="7" {{ old('seats', isset($listing) ? $listing->seats : '') == '7' ? 'selected' : '' }}>7</option>
                                                <option value="8" {{ old('seats', isset($listing) ? $listing->seats : '') == '8' ? 'selected' : '' }}>8</option>
                                                <option value="9+" {{ old('seats', isset($listing) ? $listing->seats : '') == '9+' ? 'selected' : '' }}>9+</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->doors ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="2" {{ old('doors', isset($listing) ? $listing->doors : '') == '2' ? 'selected' : '' }}>2</option>
                                                <option value="4" {{ old('doors', isset($listing) ? $listing->doors : '') == '4' ? 'selected' : '' }}>4</option>
                                                <option value="5" {{ old('doors', isset($listing) ? $listing->doors : '') == '5' ? 'selected' : '' }}>5</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->provider_id ? 'selected' : '' }}>--Choose Option--</option>
                                                @if(isset($listing) && $listing->provider_id)
                                                    @foreach($agencies as $agency)
                                                        <option value="{{ $agency->id }}" {{ old('provider_id', $listing->provider_id) == $agency->id ? 'selected' : '' }}>{{ $agency->agency_name }}</option>
                                                    @endforeach
                                                @endif
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
                                                <option value="Yes" {{ old('ac', isset($listing) ? $listing->ac : 'Yes') == 'Yes' ? 'selected' : '' }}>Yes</option>
                                                <option value="No" {{ old('ac', isset($listing) ? $listing->ac : '') == 'No' ? 'selected' : '' }}>No</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->mileage_policy ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Unlimited km" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == 'Unlimited km' ? 'selected' : '' }}>Unlimited km</option>
                                                <option value="100 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '100 km/day' ? 'selected' : '' }}>100 km/day</option>
                                                <option value="150 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '150 km/day' ? 'selected' : '' }}>150 km/day</option>
                                                <option value="200 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '200 km/day' ? 'selected' : '' }}>200 km/day</option>
                                                <option value="250 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '250 km/day' ? 'selected' : '' }}>250 km/day</option>
                                                <option value="300 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '300 km/day' ? 'selected' : '' }}>300 km/day</option>
                                                <option value="350 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '350 km/day' ? 'selected' : '' }}>350 km/day</option>
                                                <option value="400 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '400 km/day' ? 'selected' : '' }}>400 km/day</option>
                                                <option value="450 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '450 km/day' ? 'selected' : '' }}>450 km/day</option>
                                                <option value="500 km/day" {{ old('mileage_policy', isset($listing) ? $listing->mileage_policy : '') == '500 km/day' ? 'selected' : '' }}>500 km/day</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->fuel_policy ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Full to Full" {{ old('fuel_policy', isset($listing) ? $listing->fuel_policy : '') == 'Full to Full' ? 'selected' : '' }}>Full to Full</option>
                                                <option value="Same to Same" {{ old('fuel_policy', isset($listing) ? $listing->fuel_policy : '') == 'Same to Same' ? 'selected' : '' }}>Same to Same</option>
                                                <option value="Prepaid Fuel" {{ old('fuel_policy', isset($listing) ? $listing->fuel_policy : '') == 'Prepaid Fuel' ? 'selected' : '' }}>Prepaid Fuel</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->driver_requirement ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="21-70 years" {{ old('driver_requirement', isset($listing) ? $listing->driver_requirement : '') == '21-70 years' ? 'selected' : '' }}>21-70 years</option>
                                                <option value="26-70 years" {{ old('driver_requirement', isset($listing) ? $listing->driver_requirement : '') == '26-70 years' ? 'selected' : '' }}>26-70 years</option>
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
                                                <option value="yes" {{ old('deposit_required', isset($listing) ? $listing->deposit_required : 'yes') == 'yes' ? 'selected' : '' }}>Yes</option>
                                                <option value="no" {{ old('deposit_required', isset($listing) ? $listing->deposit_required : '') == 'no' ? 'selected' : '' }}>No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 deposit" data-categories="2">
                                    <div class="form-group">
                                        <label for="deposit_amount" class="form-label">Deposit Amount</label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="deposit_amount" id="deposit_amount" value="{{ old('deposit_amount', isset($listing) ? $listing->deposit_amount : '1000') }}" placeholder="Deposit Amount" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 deposit" data-categories="2">
                                    <div class="form-group">
                                        <label for="deposit_note" class="form-label">Deposit Note</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="deposit_note" id="deposit_note" value="{{ old('deposit_note', isset($listing) ? $listing->deposit_note : '') }}" placeholder="Deposit Note" />
                                        </div>
                                    </div>
                                </div>
                                <!-- Boats fields -->
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="boat_type" class="form-label">Boat Type <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="boat_type" id="boat_type">
                                                <option value="" disabled {{ !isset($listing) || !$listing->boat_type ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($boatTypes as $type)
                                                <option value="{{ $type['id'] }}" {{ old('boat_type', isset($listing) ? $listing->boat_type : '') == $type['id'] ? 'selected' : '' }}>{{ $type['option'] }}</option>
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
                                                <option value="yes" {{ old('with_captain', isset($listing) ? $listing->with_captain : 'yes') == 'yes' ? 'selected' : '' }}>Yes</option>
                                                <option value="no" {{ old('with_captain', isset($listing) ? $listing->with_captain : '') == 'no' ? 'selected' : '' }}>No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="capacity" class="form-label">Capacity <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control @error('capacity') is_invalid @enderror" name="capacity" id="capacity" value="{{ old('capacity', isset($listing) ? $listing->capacity : '') }}" placeholder="Capacity" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- Boat Duration Options (Category 4) -->
                                <div class="col-md-12" data-categories="4">
                                    <div class="form-group">
                                        <label for="duration_options" class="form-label">Duration Options</label>
                                        <div class="form-control-wrap">
                                            @php
                                                $selectedDurationOptions = isset($listing) && $listing->duration_options ? explode(',', $listing->duration_options) : old('duration_options', []);
                                                $boatDurationIntervals = [
                                                    '0.5' => '30 min',
                                                    '1' => '1h',
                                                    '1.5' => '1h 30min',
                                                    '2' => '2h',
                                                    '2.5' => '2h 30min',
                                                    '3' => '3h',
                                                    '3.5' => '3h 30min',
                                                    '4' => '4h',
                                                    '4.5' => '4h 30min',
                                                    '5' => '5h',
                                                    '5.5' => '5h 30min',
                                                    '6' => '6h',
                                                    '6.5' => '6h 30min',
                                                    '7' => '7h',
                                                    '7.5' => '7h 30min',
                                                    '8' => '8h'
                                                ];
                                            @endphp
                                            <div class="row">
                                                @foreach($boatDurationIntervals as $value => $label)
                                                    <div class="col-md-3 col-sm-4 col-6 mb-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" name="duration_options[]" value="{{ $value }}" id="duration_{{ str_replace('.', '_', $value) }}" {{ in_array($value, $selectedDurationOptions) ? 'checked' : '' }}>
                                                            <label class="form-check-label" for="duration_{{ str_replace('.', '_', $value) }}">{{ $label }}</label>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <!-- Boat Deposit Fields -->
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="deposit_required_boat" class="form-label">Deposit Required</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="deposit_required" id="deposit_required_boat">
                                                <option value="no" {{ old('deposit_required', isset($listing) ? $listing->deposit_required : 'no') == 'no' ? 'selected' : '' }}>No</option>
                                                <option value="yes" {{ old('deposit_required', isset($listing) ? $listing->deposit_required : '') == 'yes' ? 'selected' : '' }}>Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 boat-deposit" style="display: none;">
                                    <div class="form-group">
                                        <label for="deposit_amount" class="form-label">Deposit Amount</label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="deposit_amount" id="deposit_amount_boat" value="{{ old('deposit_amount', isset($listing) ? $listing->deposit_amount : '') }}" placeholder="Deposit Amount" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 boat-deposit" style="display: none;">
                                    <div class="form-group">
                                        <label for="deposit_currency" class="form-label">Deposit Currency</label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="deposit_currency" id="deposit_currency">
                                                <option value="EUR" {{ old('deposit_currency', isset($listing) ? $listing->deposit_currency : 'EUR') == 'EUR' ? 'selected' : '' }}>EUR</option>
                                                <option value="USD" {{ old('deposit_currency', isset($listing) ? $listing->deposit_currency : '') == 'USD' ? 'selected' : '' }}>USD</option>
                                                <option value="MAD" {{ old('deposit_currency', isset($listing) ? $listing->deposit_currency : '') == 'MAD' ? 'selected' : '' }}>MAD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label for="departure_location" class="form-label">Marina/Departure Location <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon1"><span class="ti ti-location-pin"></span></span>
                                                <input type="text" class="form-control" name="departure_location" id="departure_location" value="{{ old('departure_location', isset($listing) ? $listing->departure_location : '') }}" placeholder="Enter marina or port name" list="marina-suggestions" />
                                                <datalist id="marina-suggestions">
                                                    <option value="Marina Bouregreg - Salé">
                                                    <option value="Port de Rabat">
                                                    <option value="Marina Smir - Tétouan">
                                                    <option value="Port de Tanger">
                                                    <option value="Marina Casablanca">
                                                    <option value="Port de Mohammedia">
                                                    <option value="Marina Agadir">
                                                    <option value="Port d'Essaouira">
                                                    <option value="Marina Al Hoceima">
                                                    <option value="Port de Nador">
                                                </datalist>
                                            </div>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="max_passengers" class="form-label">Max Passengers <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="max_passengers" id="max_passengers" value="{{ old('max_passengers', isset($listing) ? $listing->max_passengers : '') }}" placeholder="Max Passengers" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="max_luggage" class="form-label">Max Luggage <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="max_luggage" id="max_luggage" value="{{ old('max_luggage', isset($listing) ? $listing->max_luggage : '') }}" placeholder="Max Luggage" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3">
                                    <div class="form-group">
                                        <label for="pickup_location_display" class="form-label">Pickup Location (Auto-filled from City)</label>
                                        <div class="form-control-wrap">
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon1"><span class="ti ti-location-pin"></span></span>
                                                <input type="text" class="form-control" id="pickup_location_display" value="{{ old('pickup_location', isset($listing) ? $listing->pickup_location : '') }}" placeholder="Select a city first" disabled />
                                            </div>
                                            <small class="text-muted">This field is automatically filled based on the selected city</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="3,5">
                                    <div class="form-group">
                                        <label for="pickup_location" class="form-label">Languages Spoken <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
@php
                                                $selectedLanguages = isset($listing) && $listing->languages_spoken ? explode(',', $listing->languages_spoken) : old('languages_spoken', []);
                                            @endphp
                                            <select class="form-control select2-single" name="languages_spoken[]" id="languages_spoken" multiple>
                                                <option value="English" {{ in_array('English', $selectedLanguages) ? 'selected' : '' }}>English</option>
                                                <option value="French" {{ in_array('French', $selectedLanguages) ? 'selected' : '' }}>French</option>
                                                <option value="Arabic" {{ in_array('Arabic', $selectedLanguages) ? 'selected' : '' }}>Arabic</option>
                                                <option value="Spanish" {{ in_array('Spanish', $selectedLanguages) ? 'selected' : '' }}>Spanish</option>
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
                                                <option value="" disabled {{ !isset($listing) || !$listing->activity_type ? 'selected' : '' }}>--Choose Option--</option>
                                                @foreach($activityTypes as $type)
                                                    <option value="{{ $type['id'] }}" {{ old('activity_type', isset($listing) ? $listing->activity_type : '') == $type['id'] ? 'selected' : '' }}>{{ $type['option'] }}</option>
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
                                                <option value="yes" {{ old('pickup', isset($listing) ? strtolower($listing->pickup ?? 'yes') : 'yes') == 'yes' ? 'selected' : '' }}>Yes</option>
                                                <option value="no" {{ old('pickup', isset($listing) ? strtolower($listing->pickup ?? '') : '') == 'no' ? 'selected' : '' }}>No</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="meeting_point">Meeting Point <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" name="meeting_point" id="meeting_point" value="{{ old('meeting_point', isset($listing) ? $listing->meeting_point : '') }}" placeholder="Meeting Point" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="private_or_group" class="form-label">Private Or Group <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="private_or_group" id="private_or_group">
                                                <option value="" disabled {{ !isset($listing) || !$listing->private_or_group ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Private" {{ old('private_or_group', isset($listing) ? $listing->private_or_group : '') == 'Private' ? 'selected' : '' }}>Private</option>
                                                <option value="Group" {{ old('private_or_group', isset($listing) ? $listing->private_or_group : '') == 'Group' ? 'selected' : '' }}>Group</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" id="group_size_min_cont" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="group_size_min">Minimum Group Size <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="group_size_min" id="group_size_min" value="{{ old('group_size_min', isset($listing) ? $listing->group_size_min : '') }}" placeholder="Minimum Group Size" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" id="group_size_max_cont" data-categories="5">
                                    <div class="form-group">
                                        <label class="form-label" for="group_size_max">Maximum Group Size <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="group_size_max" id="group_size_max" value="{{ old('group_size_max', isset($listing) ? $listing->group_size_max : '') }}" placeholder="Maximum Group Size" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4" data-categories="5">
                                    <div class="form-group">
                                        <label for="difficulty" class="form-label">Difficulty <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <select class="form-control select2-single" name="difficulty" id="difficulty">
                                                <option value="" disabled {{ !isset($listing) || !$listing->difficulty ? 'selected' : '' }}>--Choose Option--</option>
                                                <option value="Easy" {{ old('difficulty', isset($listing) ? $listing->difficulty : '') == 'Easy' ? 'selected' : '' }}>Easy</option>
                                                <option value="Medium" {{ old('difficulty', isset($listing) ? $listing->difficulty : '') == 'Medium' ? 'selected' : '' }}>Medium</option>
                                                <option value="Hard" {{ old('difficulty', isset($listing) ? $listing->difficulty : '') == 'Hard' ? 'selected' : '' }}>Hard</option>
                                            </select>
                                            <small class="error d-none">Required field.</small>
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
                                            <textarea class="form-control editor" name="special_notes" id="special_notes">{{ old('special_notes', isset($listing) ? $listing->special_notes : '') }}</textarea>
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
                                            <textarea class="form-control editor" name="short_description" id="short_description">{{ old('short_description', isset($listing) ? $listing->short_description : '') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="description" class="form-label">Description</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control editor" name="description" id="description">{{ old('description', isset($listing) ? $listing->description : '') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="dealer_note" class="form-label">Dealer Note</label>
                                        <div class="form-control-wrap">
                                            <textarea class="form-control" rows="3" name="dealer_note" id="dealer_note">{{ old('dealer_note', isset($listing) ? $listing->dealer_note : '') }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {{-- AI Translation Generator - Same for both Add and Edit --}}
                            @include('listings.partials.ai-translation-generator')
                            
                            {{-- Include Translation Viewer --}}
                            @include('listings.partials.translation-viewer')
                            
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
                                            <input type="number" step="any" class="form-control" name="price_per_hour" id="price_per_hour" value="{{ old('price_per_hour', isset($listing) ? $listing->price_per_hour : '') }}" placeholder="Price Per Hour" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="4">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_half_day">Price Per Half Day <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_half_day" id="price_per_half_day" value="{{ old('price_per_half_day', isset($listing) ? $listing->price_per_half_day : '') }}" placeholder="Price Per Half Day" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2,4">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_day">Price Per Day <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_day" id="price_per_day" value="{{ old('price_per_day', isset($listing) ? $listing->price_per_day : '') }}" placeholder="Price Per Day" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_week">Price Per Week <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_week" id="price_per_week" value="{{ old('price_per_week', isset($listing) ? $listing->price_per_week : '') }}" placeholder="Price Per Week" />
                                            <small class="error d-none">Required field.</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4" data-categories="2">
                                    <div class="form-group">
                                        <label class="form-label" for="price_per_month">Price Per Month <span class="lbl-obligatoire">*</span></label>
                                        <div class="form-control-wrap">
                                            <input type="number" step="any" class="form-control" name="price_per_month" id="price_per_month" value="{{ old('price_per_month', isset($listing) ? $listing->price_per_month : '') }}" placeholder="Price Per Month" />
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
                                            <tr data-city-id="{{ $city->id }}">
                                                <td>
                                                    {{ $city->city_name }}
                                                    <input type="hidden" name="private_city[]" value="{{ $city->id }}"/>
                                                </td>
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
                            <!-- Existing Images Section (Edit Mode Only) -->
                            @if(isset($listing) && $listing->galleries && $listing->galleries->count() > 0)
                            <div class="form-group">
                                <label class="font-weight-bold mb-2">Current Images</label>
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="row" id="existing-images-grid">
                                            @foreach($listing->galleries as $image)
                                            <div class="col-md-3 mb-3" id="image-{{ $image->id }}">
                                                <div class="card">
                                                    <div class="position-relative">
                                                        <img src="{{ asset($image->file_path) }}" class="card-img-top img-thumbnail" style="height: 150px; object-fit: cover;" alt="Listing Image">
                                                        <div class="position-absolute" style="top: 5px; right: 5px;">
                                                            <button type="button" class="btn btn-danger btn-sm remove-existing-image" 
                                                                    data-id="{{ $image->id }}" title="Remove Image">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="card-body p-2">
                                                        <small class="text-muted">{{ basename($image->file_path) }}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                        </div>
                                        <div class="mt-2">
                                            <small class="text-info">
                                                <i class="fas fa-info-circle"></i> You can remove images or set a primary image. Changes will be applied when you save the listing.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endif
                            
                            <div class="form-group">
                                <label class="font-weight-bold mb-2">{{ isset($listing) ? 'Upload Additional Images' : 'Upload Images' }}</label>
                                <!-- Enhanced Image Guidelines -->
                                <div class="mb-3">
                                    <div class="alert alert-info">
                                        <h6 class="mb-2"><i class="fas fa-info-circle"></i> Image Guidelines</h6>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <strong>Recommended Sizes:</strong>
                                                <ul class="mb-2">
                                                    <li><strong>Optimal Size:</strong> 1000×750px (4:3 ratio)</li>
                                                    <li><strong>Alternative:</strong> Any 4:3 aspect ratio</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <strong>File Requirements:</strong>
                                                <ul class="mb-2">
                                                    <li><strong>Formats:</strong> JPG, PNG</li>
                                                    <li><strong>Max Size:</strong> 2MB per file</li>
                                                    <li><strong>Max Upload:</strong> 8MB total</li>
                                                    <li><strong>Auto-convert:</strong> WebP format</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <small class="text-success">
                                                <i class="fas fa-magic"></i> Images will be automatically optimized and converted to WebP format for better performance
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Processing Status -->
                                    <div id="image-processing-status" class="mt-2" style="display: none;">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                        </div>
                                        <small class="text-muted mt-1" id="processing-message">Processing images...</small>
                                    </div>
                                </div>

                                <div id="drop-area" class="border border-primary rounded d-flex flex-column align-items-center justify-content-center p-4" style="cursor: pointer;">
                                    <i class="fas fa-cloud-upload-alt fa-2x text-primary mb-2"></i>
                                    <p class="">Click or drag images here to upload</p>
                                    <input type="file" id="listing_images" name="images[]" multiple class="d-none" accept="image/jpeg,image/jpg,image/png">
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
                                    <input type="text" class="form-control @error('slug') is-invalid @enderror" name="slug" id="slug" value="{{ old('slug', isset($listing) ? $listing->slug : '') }}" placeholder="Slug" />
                                    @error('slug')
                                    <small class="error">Required field.</small>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="meta_title">Meta Title</label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control @error('meta_title') is-invalid @enderror" name="meta_title" id="meta_title" value="{{ old('meta_title', isset($listing) ? $listing->meta_title : '') }}" placeholder="Meta Title" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="meta_description">Meta Description</label>
                                <div class="form-control-wrap">
                                    <textarea class="form-control no-resize" name="meta_description" id="meta_description" placeholder="Meta Description" rows="6">{{ old('meta_description', isset($listing) ? $listing->meta_description : '') }}</textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="schema_markup">Schema Markup (JSON-LD)</label>
                                <div class="form-control-wrap">
                                    <textarea class="form-control no-resize" name="schema_markup" id="schema_markup" placeholder="Schema Markup (JSON-LD)" rows="6">{{ old('schema_markup', isset($listing) ? $listing->schema_markup : '') }}</textarea>
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
    let Stepper = 1; // Global stepper variable

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
        stepper = currentStep;
    }

    function validateForm() {
        const categoryId = parseInt(document.querySelector('[name="category_id"]').value);
        let requiredFields = ['title', 'category_id', 'city_id', 'provider_id'];

        const categoryRequiredMap = {
            2: ['car_types', 'car_model', 'year', 'fuel_type', 'transmission', 'seats', 'doors', 'ac', 'mileage_policy', 'fuel_policy', 'driver_requirement', 'deposit_required']
            , 3: ['vehicule_type', 'vehicule_model', 'service_type', 'max_passengers', 'max_luggage', 'languages_spoken']
            , 4: ['boat_type', 'with_captain', 'capacity', 'departure_location']
            , 5: ['languages_spoken', 'activity_type', 'pickup', 'meeting_point', 'private_or_group', 'difficulty']
        };

        if (categoryRequiredMap[categoryId]) {
            requiredFields = requiredFields.concat(categoryRequiredMap[categoryId]);
        }

        let valid = true;

        if (stepper == 1) {
            const step1 = document.getElementById("step1");

            requiredFields.forEach(fieldName => {
                // Special handling for car_types multi-select
                if (fieldName === 'car_types') {
                    const checkedBoxes = step1.querySelectorAll('.car-type-checkbox:checked');
                    const errorElement = step1.querySelector('[data-error="car_types"]');
                    const container = step1.querySelector('#car-types-container');
                    
                    if (checkedBoxes.length === 0) {
                        container.classList.add('is-invalid');
                        errorElement.classList.remove('d-none');
                        valid = false;
                    } else {
                        container.classList.remove('is-invalid');
                        errorElement.classList.add('d-none');
                    }
                } else {
                    const input = step1.querySelector(`[id="${fieldName}"]`);
                    const errorElement = input ? input.closest('.form-control-wrap').querySelector('.error') : null;
                    if (input && !input.value.trim()) {
                        input.classList.add("is-invalid");
                        if (errorElement) errorElement.classList.remove('d-none');
                        valid = false;
                    } else if (input) {
                        input.classList.remove("is-invalid");
                        if (errorElement) errorElement.classList.add('d-none');
                    }
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
        
        // Special handling for boat deposit fields (category 4)
        // They should only show if deposit_required_boat is 'yes'
        if (categoryId == 4) {
            const boatDepositRequired = $('#deposit_required_boat').val();
            if (boatDepositRequired !== 'yes' && boatDepositRequired !== 'Yes') {
                $('.boat-deposit').hide();
            }
        }
        
        // Duration fields are now handled automatically by data-categories attributes
    }

    $(document).ready(function() {
        // Hide all steps except step 1
        $('#step2, #step3').hide();
        $('#step1').show();
        
        // Check if there are validation errors and scroll to them
        @if($errors->any())
            // Scroll to error messages at top of page
            $('html, body').animate({
                scrollTop: $('.alert-danger').offset().top - 100
            }, 500);
        @endif
        
        // Initialize car types multi-select functionality
        initializeCarTypesMultiSelect();
        
        // Initialize boat deposit fields visibility
        initializeBoatDepositFields();
        
        // Load existing data if editing
        @if(isset($listing))
            loadExistingListingData();
        @endif

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

            // Auto-populate pickup location display for Private Driver if city is already selected
            if (category_id == 3) { // Private Driver category
                const cityName = $('#city_id').find('option:selected').text();
                if (cityName && cityName !== '--Choose option--') {
                    $('#pickup_location_display').val(cityName);
                }
            }

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

            if (depositRequired == 'yes' || depositRequired == 'Yes') {
                $('.deposit').removeClass('d-none');
            } else {
                $('#deposit_amount').val('');
                $('#deposit_note').val('');
                $('.deposit').addClass('d-none');
            }
        });

        // Handle boat deposit fields visibility
        $('#deposit_required_boat').change(function() {
            const boatDepositRequired = $(this).val();

            if (boatDepositRequired == 'yes' || boatDepositRequired == 'Yes') {
                $('.boat-deposit').show();
            } else {
                $('#deposit_amount_boat').val('');
                $('#deposit_currency').val('EUR');
                $('.boat-deposit').hide();
            }
        });

        // Auto-populate pickup location display for Private Driver when city is selected
        $('#city_id').change(function() {
            const categoryId = $('#category_id').val();
            if (categoryId == 3) { // Private Driver category
                const cityName = $(this).find('option:selected').text();
                // Only update if a valid city is selected (not the placeholder)
                if (cityName && cityName !== '--Choose option--') {
                    $('#pickup_location_display').val(cityName);
                }
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
            // Clear previous previews
            preview.empty();
            
            // Show processing status
            showImageProcessingStatus();
            
            [...files].forEach((file, index) => {
                if (!file.type.startsWith('image/')) {
                    console.warn('Skipping non-image file:', file.name);
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    const col = $('<div class="col-md-3 mb-2 gallery-img"></div>');
                    const imgContainer = $('<div class="position-relative"></div>');
                    const img = $('<img class="img-fluid rounded border" style="max-height: 150px;">');
                    const overlay = $('<div class="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded" style="display: none !important;"></div>');
                    const statusIcon = $('<i class="fas fa-check text-success"></i>');
                    
                    img.attr('src', e.target.result);
                    overlay.append(statusIcon);
                    imgContainer.append(img, overlay);
                    col.append(imgContainer);
                    preview.append(col);
                    
                    // Simulate WebP conversion feedback
                    setTimeout(() => {
                        overlay.show();
                        updateProcessingProgress(index + 1, files.length);
                        
                        if (index === files.length - 1) {
                            setTimeout(() => {
                                hideImageProcessingStatus();
                                showConversionSuccess(files.length);
                            }, 500);
                        }
                    }, (index + 1) * 300);
                };
                reader.readAsDataURL(file);
            });
            
            // Log file count for debugging
            console.log('Files selected:', files.length);
        }
    });
    // Store editor instances globally for access
    window.editorInstances = {};
    
    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .then(editor => {
                // Store the editor instance with the field name as key
                const fieldName = element.getAttribute('name');
                if (fieldName) {
                    window.editorInstances[fieldName] = editor;
                }
            })
            .catch(error => {
                console.error(error);
            });
    });

    // Load existing listing data for editing
    function loadExistingListingData() {
        const listing = @json($listing);
        
        // Show category-specific fields
        if (listing.category_id) {
            toggleFieldsByCategory(listing.category_id);
            
            // Load providers for the selected category
            $.ajax({
                type: 'post',
                url: '{{ route("categories.getCategoryData") }}',
                data: {
                    category_id: listing.category_id
                },
                dataType: 'json',
                success: function(resp) {
                    let options = '<option value="" disabled>--Choose Option--</option>';
                    resp.providers.forEach(function(provider) {
                        const selected = provider.id == listing.provider_id ? 'selected' : '';
                        options += `<option value="${provider.id}" ${selected}>${provider.agency_name}</option>`;
                    });
                    $('#provider_id').html(options);
                    
                    // Set addons options for dynamic population
                    let addonOptions = '<option value="" selected disabled>--Choose Addon--</option>';
                    resp.addons.forEach(function(addon) {
                        addonOptions += `<option value="${addon.id}">${addon.addon}</option>`;
                    });
                    addonsOptions = addonOptions;
                }
            });
        }
        
        // Load existing included items
        if (listing.included && listing.included.length > 0) {
            listing.included.forEach(function(item) {
                const newRow = `
                    <tr>
                        <td>
                            <input type="text" name="included[]" class="form-control" value="${item.item}" />
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm remove-included" style="color:#ff313b;">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
                $('#included-table > tbody').append(newRow);
            });
        }
        
        // Load existing not included items
        if (listing.not_included && listing.not_included.length > 0) {
            listing.not_included.forEach(function(item) {
                const newRow = `
                    <tr>
                        <td>
                            <input type="text" name="not_included[]" class="form-control" value="${item.item}" />
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm remove-not-included" style="color:#ff313b;">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
                $('#not-included-table > tbody').append(newRow);
            });
        }
        
        // Load existing addons
        if (listing.addons && listing.addons.length > 0) {
            listing.addons.forEach(function(addon) {
                const newRow = `
                    <tr>
                        <td>
                            <select name="addons[]" class="form-control addon" required>
                                <option value="" disabled>--Choose Addon--</option>
                                <option value="${addon.addon_id}" selected>${addon.addon ? addon.addon.addon : 'Unknown'}</option>
                            </select>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm remove-addon" style="color:#ff313b;">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
                $('#addons-table > tbody').append(newRow);
            });
        }
        
        // Load existing pricing options (activities)
        if (listing.act_pricings && listing.act_pricings.length > 0) {
            listing.act_pricings.forEach(function(pricing) {
                const newRow = `
                    <tr>
                        <td>
                            <input type="text" name="pricing_els[]" class="form-control" value="${pricing.element}" required />
                        </td>
                        <td>
                            <input type="number" step="any" name="pricings[]" class="form-control" value="${pricing.price}" required />
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm remove-pricing" style="color:#ff313b;">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
                $('#pricing-table > tbody').append(newRow);
            });
        }
        
        // Load existing private pricing (for category 3)
        if (listing.pricings && listing.pricings.length > 0) {
            listing.pricings.forEach(function(privatePricing) {
                // Use data-city-id attribute for more reliable selection
                const cityRow = $(`#pricing-private-table tr[data-city-id="${privatePricing.city_id}"]`);
                
                if (cityRow.length > 0) {
                    cityRow.find('input[name="airport_one[]"]').val(privatePricing.airport_one);
                    cityRow.find('input[name="airport_round[]"]').val(privatePricing.airport_round);
                    cityRow.find('input[name="intercity_one[]"]').val(privatePricing.intercity_one);
                    cityRow.find('input[name="intercity_round[]"]').val(privatePricing.intercity_round);
                } else {
                    console.warn('City row not found for city_id:', privatePricing.city_id);
                }
            });
        }
        
        // Handle deposit fields visibility
        if (listing.deposit_required === 'yes' || listing.deposit_required === 'Yes') {
            $('.deposit').removeClass('d-none');
        } else {
            $('.deposit').addClass('d-none');
        }
        
        // Handle boat deposit fields visibility
        if (listing.boat_deposit_required === 'yes' || listing.boat_deposit_required === 'Yes') {
            $('.boat-deposit').show();
        } else {
            $('.boat-deposit').hide();
        }
        
        // Initialize boat deposit fields on page load
        const currentBoatDepositRequired = $('#deposit_required_boat').val();
        if (currentBoatDepositRequired === 'yes' || currentBoatDepositRequired === 'Yes') {
            $('.boat-deposit').show();
        } else {
            $('.boat-deposit').hide();
        }
        
        // Handle group size fields visibility
        if (listing.private_or_group === 'Private') {
            $('#group_size_min_cont').hide();
            $('#group_size_max_cont').hide();
        } else if (listing.private_or_group === 'Group') {
            $('#group_size_min_cont').show();
            $('#group_size_max_cont').show();
        }
        
        // Load existing car types for multi-select
        loadExistingCarTypes(listing);
    }
    
    function loadExistingCarTypes(listing) {
        // Load from car_types_new JSON field (new format)
        if (listing.car_types_new) {
            try {
                // car_types_new might already be parsed as an array by Laravel
                const carTypesArray = Array.isArray(listing.car_types_new) 
                    ? listing.car_types_new 
                    : JSON.parse(listing.car_types_new);
                    
                carTypesArray.forEach(function(carType) {
                    $(`.car-type-checkbox[value="${carType}"]`).prop('checked', true);
                });
                updateSelectedCarTypes();
                console.log('Loaded car types:', carTypesArray);
            } catch (e) {
                console.warn('Error parsing car_types_new:', e);
                // Fallback to legacy field
                loadLegacyCarType(listing);
            }
        }
        // Fallback to legacy car_type field
        else if (listing.car_type) {
            loadLegacyCarType(listing);
        }
    }
    
    function loadLegacyCarType(listing) {
        // Find checkbox by matching the option value or text with the car_type
        $(`.car-type-checkbox`).each(function() {
            const checkbox = $(this);
            const value = checkbox.val();
            const label = checkbox.next('label').text().trim();
            
            const typeId = checkbox.data('type-id');
            
            // Try to match by ID first, then by value or label
            if (typeId == listing.car_type ||
                value === listing.car_type || 
                label.toLowerCase() === listing.car_type.toLowerCase() ||
                value.toLowerCase() === listing.car_type.toLowerCase()) {
                checkbox.prop('checked', true);
            }
        });
        updateSelectedCarTypes();
    }
    
    // Translation Functions (same for both Add and Edit)
    let generatedTranslations = {};
    
    function generateNewListingTranslations() {
        // Check if required fields are filled
        const title = document.querySelector('[name="title"]').value;
        const hasDescription = checkCKEditorContent();
        
        if (!title) {
            swal('Error', 'Please fill in at least the Title field before generating translations.', 'error');
            return;
        }
        
        // Get selected languages
        const languages = [];
        if (document.getElementById('tempTranslateFr').checked) languages.push('fr');
        if (document.getElementById('tempTranslateEs').checked) languages.push('es');
        
        if (languages.length === 0) {
            swal('Error', 'Please select at least one language to translate.', 'error');
            return;
        }
        
        // Collect content
        const content = collectFormContent();
        const fields = Object.keys(content).filter(key => content[key]);
        
        // Show loading
        swal({
            title: 'Generating Translations',
            text: 'Using Google Gemini AI to translate your content...',
            icon: 'info',
            buttons: false,
            closeOnClickOutside: false
        });
        
        // Determine API endpoint based on whether we're editing or creating
        @if(isset($listing) && $listing->id)
            const apiUrl = `/listings/{{ $listing->id }}/translate`;
            const requestBody = {
                locales: languages,
                force: true,
                fields: fields
            };
        @else
            const apiUrl = `/listings/translate-preview`;
            const requestBody = {
                content: content,
                locales: languages,
                fields: fields
            };
        @endif
        
        // Make API request
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            swal.close();
            
            if (data.status === 'success') {
                generatedTranslations = data.translations;
                
                // Update badges (only if elements exist)
                if (data.translations.fr) {
                    const frBadge = document.getElementById('tempTranslationStatusFr');
                    if (frBadge) {
                        frBadge.className = 'badge badge-dim badge-success';
                        frBadge.innerHTML = '<i class="fas fa-check-circle"></i> French (Ready)';
                    }
                }
                if (data.translations.es) {
                    const esBadge = document.getElementById('tempTranslationStatusEs');
                    if (esBadge) {
                        esBadge.className = 'badge badge-dim badge-success';
                        esBadge.innerHTML = '<i class="fas fa-check-circle"></i> Spanish (Ready)';
                    }
                }
                
                // Show view button
                document.getElementById('viewTranslationsBtn').style.display = 'inline-block';
                
                // Show viewer immediately with the new modal
                if (window.translationViewer) {
                    window.translationViewer.show(generatedTranslations);
                } else {
                    // Fallback to old method if new viewer not initialized
                    showTranslationViewer(generatedTranslations);
                }
            } else {
                swal('Error', data.message || 'Translation failed', 'error');
            }
        })
        .catch(error => {
            swal.close();
            console.error('Error:', error);
            swal('Error', 'Failed to generate translations. Please check your API key configuration.', 'error');
        });
    }
    
    function viewGeneratedTranslations() {
        if (Object.keys(generatedTranslations).length === 0) {
            swal('Info', 'No translations generated yet. Please generate translations first.', 'info');
            return;
        }
        
        // Use the new modal viewer
        if (window.translationViewer) {
            window.translationViewer.show(generatedTranslations);
        } else {
            // Fallback to old method if new viewer not initialized
            showTranslationViewer(generatedTranslations);
        }
    }
    
    function collectFormContent() {
        const content = {};
        
        // Get title
        const titleInput = document.querySelector('[name="title"]');
        if (titleInput) content.title = titleInput.value;
        
        // Get content from CKEditor instances (description, short_description, special_notes)
        // Check for ClassicEditor instances (newer CKEditor)
        if (window.editorInstances) {
            Object.keys(window.editorInstances).forEach(fieldName => {
                const editor = window.editorInstances[fieldName];
                if (editor && editor.getData) {
                    const data = editor.getData();
                    // Strip HTML tags for translation
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    content[fieldName] = tempDiv.textContent || tempDiv.innerText || '';
                }
            });
        }
        
        // Fallback to old CKEDITOR if exists
        if (window.CKEDITOR && window.CKEDITOR.instances) {
            for (let instance in CKEDITOR.instances) {
                const editor = CKEDITOR.instances[instance];
                const fieldName = editor.element.$.name;
                if (fieldName && !content[fieldName]) {
                    const data = editor.getData();
                    // Strip HTML tags for translation
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    content[fieldName] = tempDiv.textContent || tempDiv.innerText || '';
                }
            }
        }
        
        // Try to get from textareas with class 'editor' if still not found
        document.querySelectorAll('textarea.editor').forEach(textarea => {
            const fieldName = textarea.name;
            if (fieldName && !content[fieldName]) {
                content[fieldName] = textarea.value || '';
            }
        });
        
        // Get all other text fields
        const textFields = [
            'meta_title', 
            'meta_description', 
            'dealer_note',
            'pickup_info'
        ];
        
        textFields.forEach(field => {
            const element = document.querySelector(`[name="${field}"]`);
            if (element) {
                content[field] = element.value || '';
            }
        });
        
        // Ensure all expected fields exist (even if empty)
        const expectedFields = [
            'title', 
            'description', 
            'short_description', 
            'special_notes',
            'pickup_info',
            'meta_title', 
            'meta_description',
            'dealer_note'
        ];
        
        expectedFields.forEach(field => {
            if (!(field in content)) {
                content[field] = '';
            }
        });
        
        return content;
    }
    
    function checkCKEditorContent() {
        // Check ClassicEditor instances first
        if (window.editorInstances) {
            for (let fieldName in window.editorInstances) {
                const editor = window.editorInstances[fieldName];
                if (editor && editor.getData) {
                    const data = editor.getData();
                    if (data && data.trim() !== '' && data !== '<p>&nbsp;</p>') {
                        return true;
                    }
                }
            }
        }
        
        // Fallback to old CKEDITOR
        if (window.CKEDITOR && window.CKEDITOR.instances) {
            for (let instance in CKEDITOR.instances) {
                const editor = CKEDITOR.instances[instance];
                const data = editor.getData();
                if (data && data.trim() !== '') {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Car Types Multi-Select Functions
    function initializeCarTypesMultiSelect() {
        // Handle checkbox changes
        $('.car-type-checkbox').on('change', function() {
            updateSelectedCarTypes();
            updateBackwardCompatibility();
        });
        
        // Initialize display
        updateSelectedCarTypes();
    }
    
    function updateSelectedCarTypes() {
        const selectedChips = $('.car-type-chips');
        const selectedContainer = $('#selected-car-types');
        const checkedBoxes = $('.car-type-checkbox:checked');
        
        selectedChips.empty();
        
        if (checkedBoxes.length > 0) {
            selectedContainer.show();
            checkedBoxes.each(function() {
                const label = $(this).next('label').text();
                const chip = $(`<span class="badge badge-primary me-1">${label}</span>`);
                selectedChips.append(chip);
            });
        } else {
            selectedContainer.hide();
        }
    }
    
    function updateBackwardCompatibility() {
        // Update legacy car_type field with first selected value for backward compatibility
        const firstChecked = $('.car-type-checkbox:checked').first();
        const legacyField = $('#car_type_legacy');
        
        if (firstChecked.length > 0) {
            const selectedValue = firstChecked.val();
            legacyField.val(selectedValue);
        } else {
            legacyField.val('');
        }
    }
    
    function initializeBoatDepositFields() {
        // Initialize boat deposit fields visibility on page load
        const currentBoatDepositRequired = $('#deposit_required_boat').val();
        if (currentBoatDepositRequired === 'yes' || currentBoatDepositRequired === 'Yes') {
            $('.boat-deposit').show();
        } else {
            $('.boat-deposit').hide();
        }
    }
    
    // Image Processing Status Functions
    function showImageProcessingStatus() {
        const statusDiv = $('#image-processing-status');
        const progressBar = statusDiv.find('.progress-bar');
        const message = $('#processing-message');
        
        statusDiv.show();
        progressBar.css('width', '0%').attr('aria-valuenow', '0').text('0%');
        message.text('Processing and converting images to WebP format...');
    }
    
    function updateProcessingProgress(current, total) {
        const statusDiv = $('#image-processing-status');
        const progressBar = statusDiv.find('.progress-bar');
        const message = $('#processing-message');
        const percentage = Math.round((current / total) * 100);
        
        progressBar.css('width', percentage + '%').attr('aria-valuenow', percentage).text(percentage + '%');
        message.text(`Converting image ${current} of ${total} to WebP format...`);
    }
    
    function hideImageProcessingStatus() {
        const statusDiv = $('#image-processing-status');
        setTimeout(() => {
            statusDiv.hide();
        }, 1000);
    }
    
    function showConversionSuccess(count) {
        const message = $('#processing-message');
        message.html(`<i class="fas fa-check text-success"></i> Successfully processed ${count} image(s) and converted to WebP format!`);
        
        setTimeout(() => {
            hideImageProcessingStatus();
        }, 2000);
    }

    // Handle existing image removal
    $(document).on('click', '.remove-existing-image', function() {
        const imageId = $(this).data('id');
        const imageContainer = $('#image-' + imageId);
        
        if (confirm('Are you sure you want to remove this image? This action cannot be undone.')) {
            // Show loading state
            $(this).html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
            
            $.ajax({
                type: 'POST',
                url: '{{ route("listings.unlink") }}',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: imageId
                },
                success: function(response) {
                    if (response.status === 'success') {
                        // Remove the image container with animation
                        imageContainer.fadeOut(300, function() {
                            $(this).remove();
                            
                            // Check if no more images exist and hide the section
                            if ($('#existing-images-grid .col-md-3').length === 0) {
                                $('#existing-images-grid').closest('.form-group').fadeOut();
                            }
                        });
                        
                        // Show success message
                        showAlert('success', 'Image removed successfully');
                    } else {
                        showAlert('danger', 'Failed to remove image: ' + (response.message || 'Unknown error'));
                    }
                },
                error: function() {
                    showAlert('danger', 'Failed to remove image. Please try again.');
                    $(this).html('<i class="fas fa-trash"></i>').prop('disabled', false);
                }
            });
        }
    });


    // Helper function to show alert messages
    function showAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Insert the alert at the top of the form or step
        const step3 = $('#step3');
        step3.prepend(alertHtml);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            step3.find('.alert').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
        
        // Scroll to the alert
        $('html, body').animate({
            scrollTop: step3.offset().top - 100
        }, 300);
    }

</script>
@endsection
