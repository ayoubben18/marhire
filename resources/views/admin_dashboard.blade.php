@extends('layouts.dashboard_admin')

@section('title', 'dashboard')

@section('content')
<style>
    .dashboard-item-val a {
        color: black !important;
    }

    span.dashboard-item-title {
        display: block;
        margin-bottom: 6px;
        font-size: 11pt;
        font-weight: 500;
        color: #222 !important;
    }

    .dashboard-item-container>div:nth-child(1) {
        display: none;
    }

    .g-gs>li,
    .g-gs>div {
        padding: 7px !important;
    }

    @media (min-width: 768px) {
        .dashboard-item-icon {
            display: flex;
        }

        .dashboard-item-container>div:nth-child(1) {
            display: block;
        }

        .g-gs>li,
        .g-gs>div {
            padding: 16px !important;
        }
    }

    .progress-bar {
        z-index: unset;
    }

</style>
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Hi, {{ auth()->user()->prenom }} 👋</span></h3>
            <div class="nk-block-des text-soft">
                <p>view the statistiques of your business.</p>
            </div>
        </div>
        <div class="nk-block-head-content">
            <div class="toggle-wrap nk-block-tools-toggle">
                <a href="#" class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>
                <div class="toggle-expand-content" data-content="pageMenu">
                    {{-- <ul class="nk-block-tools g-3">
                        <li>
                            <div class="form-group">
                                <div class="form-control-wrap">
                                    <div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                        <i class="fa-regular fa-calendar"></i>&nbsp;
                                        <span></span> <i class="fa fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nk-block-tools-opt">
                            <div class="drodown show">
                                <a href="#" class="dropdown-toggle btn btn-icon btn-primary" data-toggle="dropdown" aria-expanded="true"><em class="icon ni ni-plus"></em></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <ul class="link-list-opt no-bdr">

                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul> --}}
                </div>
            </div>
        </div>
    </div>
</div>
<div class="nk-block">

</div>
<div class="nk-block">
    <div class="row g-gs">
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container">
                <div>
                    <div class="dashboard-item-icon">
                        <i class="icon ti ti-briefcase"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="agenciesVal">{{ $agenciesCount }}</span>
                    <span class="dashboard-item-title">Agencies</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container">
                <div>
                    <div class="dashboard-item-icon icon-color1">
                        <i class="icon ni ni-box"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="icon ti ti-car">{{ $listingsCount }}</span>
                    <span class="dashboard-item-title">Listings</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container last-child">
                <div>
                    <div class="dashboard-item-icon icon-color7">
                        <i class="icon ni ni-ticket-alt"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="activeCouponsVal">{{ $couponsCount }}</span>
                    <span class="dashboard-item-title">Active Coupons</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container">
                <div>
                    <div class="dashboard-item-icon icon-color2">
                        <i class="icon ti ti-money"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="totalBookingsVal">{{ number_format($totalBookings, 2) . ' €' }}</span>
                    <span class="dashboard-item-title">Total Booking</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container last-child">
                <div>
                    <div class="dashboard-item-icon icon-color12">
                        <i class="icon ni ni-calender-date"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="bookingPendingVal">{{ $pendingCount }}</span>
                    <span class="dashboard-item-title">Pending</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container last-child">
                <div>
                    <div class="dashboard-item-icon icon-color10">
                        <i class="icon ni ni-calender-date"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="bookingConfirmedVal">{{ $confirmedCount }}</span>
                    <span class="dashboard-item-title">Confirmed</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container last-child">
                <div>
                    <div class="dashboard-item-icon icon-color2">
                        <i class="icon ni ni-calender-date"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="bookingCompletedVal">{{ $completedCount }}</span>
                    <span class="dashboard-item-title">Completed</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="dashboard-item-container last-child">
                <div>
                    <div class="dashboard-item-icon icon-color3">
                        <i class="icon ni ni-calender-date"></i>
                    </div>
                </div>
                <div class="dashboard-item-content">
                    <span class="dashboard-item-val" id="bookingCancelledVal">{{ $cancelledCount }}</span>
                    <span class="dashboard-item-title">Cancelled</span>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="bookingModal" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Booking Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row g-2">
                    <div class="col-md-6">
                        <span>Listing</span>
                        <br>
                        <strong id="vw-listing">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Status</span>
                        <br>
                        <strong id="vw-status">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>First Name</span>
                        <br>
                        <strong id="vw-firstname">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Last Name</span>
                        <br>
                        <strong id="vw-lastname">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Email</span>
                        <br>
                        <strong id="vw-email">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Whatsapp</span>
                        <br>
                        <strong id="vw-whatsapp">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Country</span>
                        <br>
                        <strong id="vw-country">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>City</span>
                        <br>
                        <strong id="vw-city">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Booking Source</span>
                        <br>
                        <strong id="vw-source">-</strong>
                    </div>
                    <div class="col-md-6">
                        <span>Booking Amount</span>
                        <br>
                        <strong id="vw-amount" class="money">-</strong>
                    </div>
                </div>
                <div class="d-flex">
                    <a class="btn btn-success w-100 mt-3" id="vw-btn" target="_blank" style="color: white; display: flex; justify-content: center;">See Details</a>
                    <a class="btn btn-secondary w-100 mt-3" id="edit-btn" target="_blank" style="color: white; display: flex; justify-content: center;">Edit</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="nk-block">
    <div class="row g-gs">
        <div class="col-12">
            <div class="card card-statistique">
                <div class="card-inner">
                    <div class="card-title-group align-start mb-2">
                        <div class="card-title card-default-title">
                            <h6 class="card-ctm-title">Calendar</h6>
                            <p id="livreLbl"></p>
                        </div>
                    </div>
                    <div class="cardCalendar__filter">
                        <select class="form-control select2-single" id="filter_category_id">
                            <option value="all">All Categories</option>
                            @foreach ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->category }}</option>
                            @endforeach
                        </select>

                        <select class="form-control select2-single" id="filter_city_id">
                            <option value="all">All Cities</option>
                            @foreach($cities as $city)
                            <option value="{{ $city->id }}">{{ $city->city_name }}</option>
                            @endforeach
                        </select>

                        <select class="form-control select2-single" id="filter_status">
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div class="card-statistique-chart calendar" id="cardCalendar">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card card-statistique">
                <div class="card-inner">
                    <div class="card-title-group align-start mb-2">
                        <div class="card-title card-default-title">
                            <h6 class="card-ctm-title">Total bookings</h6>
                        </div>
                    </div>
                    <div class="card-statistique-chart" id="totalBookingsPerMonthCard">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/dashboard.js') }}"></script>
<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(document).ready(function() {
        const calendarEl = document.getElementById('cardCalendar');

        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth'
            , headerToolbar: {
                left: 'prev,next today'
                , center: 'title'
                , right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
            , events: function(info, successCallback, failureCallback) {
                let categoryId = $('#filter_category_id').val();
                let cityId = $('#filter_city_id').val();
                let status = $('#filter_status').val();

                $.ajax({
                    url: '/bookings/calendarData'
                    , data: {
                        start: info.startStr
                        , end: info.endStr
                        , category_id: categoryId
                        , city_id: cityId
                        , status: status
                    , }
                    , success: function(data) {
                        successCallback(data);
                    }
                    , error: failureCallback
                });
            }
            , eventClick: function(info) {
                let data = info.event.extendedProps.details;

                $('#vw-listing').text(data.listing.title);
                $('#vw-status').text(data.status);
                $('#vw-firstname').text(data.first_name);
                $('#vw-lastname').text(data.last_name);
                $('#vw-email').text(data.email);
                $('#vw-whatsapp').html(`${data.whatsapp} <a href="https://wa.me/${data.whatsapp}" class="btn-dsh-wtsp" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>`);
                $('#vw-country').text(data.country);
                $('#vw-city').text(data.city ? data.city.city_name : '');
                $('#vw-source').text(data.booking_source);
                $('#vw-amount').text(parseFloat(data.total_price).toFixed(2) + ' €');
                $('#vw-btn').attr('href', '/bookings/edit/' + data.id);
                $('#edit-btn').attr('href', '/bookings/edit/' + data.id);
                $('#bookingModal').modal('show');
            }
            , eventDidMount: function(info) {
                $(info.el).tooltip({
                    title: `Client: ${info.event.title}\nStatus: ${info.event.extendedProps.status}`
                    , placement: 'top'
                    , trigger: 'hover'
                    , container: 'body'
                });
            }
        });

        calendar.render();

        $('#filter_category_id, #filter_city_id, #filter_status').on('change', function() {
            calendar.refetchEvents();
        });
    });

</script>
@endsection
