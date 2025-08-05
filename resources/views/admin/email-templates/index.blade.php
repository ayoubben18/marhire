@extends('layouts.dashboard_admin')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 class="h3 mb-4">Email Templates</h1>
            
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif
            
            <div class="card">
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Event Type</th>
                                <th>Subject</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($templates as $template)
                            <tr>
                                <td>{{ ucwords(str_replace('_', ' ', $template->event_type)) }}</td>
                                <td>{{ $template->subject }}</td>
                                <td>{{ $template->category ?? 'General' }}</td>
                                <td>
                                    @if($template->is_active)
                                        <span class="badge badge-success">Active</span>
                                    @else
                                        <span class="badge badge-secondary">Inactive</span>
                                    @endif
                                </td>
                                <td>
                                    <a href="{{ route('admin.email-templates.edit', $template->id) }}" class="btn btn-sm btn-primary">
                                        Edit
                                    </a>
                                    <a href="{{ route('admin.email-templates.preview', $template->id) }}" class="btn btn-sm btn-info" target="_blank">
                                        Preview
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection