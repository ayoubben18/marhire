@extends('layouts.dashboard_admin')

@section('content')
<div class="container mt-5">
    <h2 class="mb-4">Email Template Preview - All Languages</h2>
    
    <div class="row mb-4">
        <div class="col-md-6">
            <label for="event_type">Email Type:</label>
            <select id="event_type" class="form-control" onchange="changeEventType(this.value)">
                <option value="booking_received" {{ $eventType == 'booking_received' ? 'selected' : '' }}>Booking Received</option>
                <option value="booking_confirmed" {{ $eventType == 'booking_confirmed' ? 'selected' : '' }}>Booking Confirmed</option>
                <option value="booking_cancelled" {{ $eventType == 'booking_cancelled' ? 'selected' : '' }}>Booking Cancelled</option>
                <option value="booking_reminder" {{ $eventType == 'booking_reminder' ? 'selected' : '' }}>Booking Reminder</option>
            </select>
        </div>
        <div class="col-md-6">
            <a href="{{ route('admin.email-templates.index') }}" class="btn btn-secondary float-right">Back to Templates</a>
        </div>
    </div>
    
    <div class="row">
        @foreach(['en' => 'English', 'fr' => 'French', 'es' => 'Spanish'] as $locale => $language)
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">{{ $language }} ({{ $locale }})</h5>
                </div>
                <div class="card-body">
                    @if(isset($previews[$locale]))
                        <div class="mb-3">
                            <strong>Subject:</strong>
                            <p class="text-muted">{{ $previews[$locale]['subject'] }}</p>
                        </div>
                        
                        <div class="email-preview-container" style="border: 1px solid #dee2e6; padding: 10px; max-height: 500px; overflow-y: auto;">
                            {!! $previews[$locale]['body'] !!}
                        </div>
                        
                        <div class="mt-3">
                            <a href="{{ route('admin.email-templates.edit', $previews[$locale]['template_id']) }}" 
                               class="btn btn-sm btn-outline-primary">
                                Edit Template
                            </a>
                        </div>
                    @else
                        <div class="alert alert-warning">
                            Template not found for {{ $language }}
                        </div>
                        <p class="text-muted">This template has not been created yet for the {{ $language }} language.</p>
                    @endif
                </div>
            </div>
        </div>
        @endforeach
    </div>
    
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Variable Reference</h5>
                </div>
                <div class="card-body">
                    <p>The following variables are available in all email templates:</p>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><code>@{{client_name}}</code> - Customer full name</li>
                                <li><code>@{{client_email}}</code> - Customer email</li>
                                <li><code>@{{booking_reference}}</code> - Booking reference number</li>
                                <li><code>@{{booking_id}}</code> - Booking ID</li>
                                <li><code>@{{listing_title}}</code> - Service/Product name</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><code>@{{check_in_date}}</code> - Check-in/Start date</li>
                                <li><code>@{{check_out_date}}</code> - Check-out/End date</li>
                                <li><code>@{{total_amount}}</code> - Total price</li>
                                <li><code>@{{currency}}</code> - Currency symbol</li>
                                <li><code>@{{admin_email}}</code> - Admin email address</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function changeEventType(eventType) {
    window.location.href = '{{ route("admin.email-templates.preview-multilingual") }}?event_type=' + eventType;
}
</script>

<style>
.email-preview-container {
    background: white;
    border-radius: 4px;
}

.email-preview-container table {
    width: 100% !important;
}
</style>
@endsection