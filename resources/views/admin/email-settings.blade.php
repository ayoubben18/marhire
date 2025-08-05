@extends('layouts.dashboard_admin')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 class="h3 mb-4">Email Settings & Testing</h1>
            
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif
            
            @if(session('error'))
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ session('error') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif
            
            <form method="POST" action="{{ route('admin.email-settings.update') }}">
                @csrf
                
                <!-- General Settings -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">General Settings</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="sender_email">Sender Email</label>
                                    <input type="email" name="sender_email" id="sender_email" class="form-control" 
                                           value="{{ $settings['sender_email'] }}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="sender_name">Sender Name</label>
                                    <input type="text" name="sender_name" id="sender_name" class="form-control" 
                                           value="{{ $settings['sender_name'] }}" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="admin_email">Admin Email</label>
                                    <input type="email" name="admin_email" id="admin_email" class="form-control" 
                                           value="{{ $settings['admin_email'] }}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="reminder_hours">Send Reminder Before Service</label>
                                    <select name="reminder_hours" id="reminder_hours" class="form-control">
                                        <option value="24" {{ $settings['reminder_hours'] == 24 ? 'selected' : '' }}>24 hours</option>
                                        <option value="48" {{ $settings['reminder_hours'] == 48 ? 'selected' : '' }}>48 hours</option>
                                        <option value="72" {{ $settings['reminder_hours'] == 72 ? 'selected' : '' }}>72 hours</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Email Enable/Disable Matrix -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">Email Triggers by Category</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th class="text-center">Booking Received</th>
                                        <th class="text-center">Booking Confirmed</th>
                                        <th class="text-center">Booking Cancelled</th>
                                        <th class="text-center">Reminder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($categories as $category)
                                    <tr>
                                        <td>{{ $category->category }}</td>
                                        @foreach($emailTypes as $type)
                                        <td class="text-center">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" 
                                                       class="custom-control-input"
                                                       id="email_{{ $category->slug }}_{{ $type }}"
                                                       name="emails[{{ $category->slug }}.{{ $type }}]"
                                                       {{ $settings[$category->slug . '.' . $type] ? 'checked' : '' }}>
                                                <label class="custom-control-label" for="email_{{ $category->slug }}_{{ $type }}"></label>
                                            </div>
                                        </td>
                                        @endforeach
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary">Save Settings</button>
            </form>
            
            <!-- Test Email Section -->
            <div class="card mt-4">
                <div class="card-header">
                    <h5 class="mb-0">Test Email</h5>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('admin.email-settings.test') }}">
                        @csrf
                        <div class="form-group">
                            <label for="test_email">Send Test Email To:</label>
                            <div class="input-group">
                                <input type="email" name="test_email" id="test_email" class="form-control" 
                                       placeholder="Enter email address" required>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-success">Send Test Email</button>
                                </div>
                            </div>
                            <small class="form-text text-muted">This will send a sample booking confirmation email to the specified address.</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection