@extends('layouts.dashboard_admin')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Email History</h3>
                </div>
                <div class="card-body">
                    <form method="GET" class="mb-3">
                        <div class="form-group">
                            <label for="status">Filter by Status:</label>
                            <select name="status" id="status" class="form-control" style="width: 200px;" onchange="this.form.submit()">
                                <option value="all">All Emails</option>
                                <option value="sent" {{ request('status') == 'sent' ? 'selected' : '' }}>Sent</option>
                                <option value="failed" {{ request('status') == 'failed' ? 'selected' : '' }}>Failed</option>
                            </select>
                        </div>
                    </form>
                    
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Recipient</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Booking</th>
                                    <th>Error</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($emails as $email)
                                <tr>
                                    <td>{{ $email->created_at->format('Y-m-d H:i') }}</td>
                                    <td>{{ $email->recipient_email }}</td>
                                    <td>{{ $email->email_type }}</td>
                                    <td>
                                        <span class="badge badge-{{ $email->status == 'sent' ? 'success' : 'danger' }}">
                                            {{ $email->status }}
                                        </span>
                                    </td>
                                    <td>{{ $email->booking ? '#' . $email->booking->id : 'N/A' }}</td>
                                    <td>
                                        @if($email->status == 'failed' && $email->error_message)
                                            <span class="text-danger">{{ $email->error_message }}</span>
                                        @else
                                            -
                                        @endif
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="6" class="text-center">No email logs found</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                    
                    {{ $emails->appends(['status' => request('status')])->links() }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection