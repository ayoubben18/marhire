@extends('layouts.dashboard_admin')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 class="h3 mb-4">Edit Email Template: {{ ucwords(str_replace('_', ' ', $template->event_type)) }}</h1>
            
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif
            
            <form method="POST" action="{{ route('admin.email-templates.update', $template->id) }}">
                @csrf
                @method('PUT')
                
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" class="form-control" value="{{ $template->subject }}" required>
                </div>
                
                <div class="form-group">
                    <label>Email Body (HTML)</label>
                    <textarea name="body_html" class="form-control" rows="20" required>{{ $template->body_html }}</textarea>
                </div>
                
                <div class="card mb-3">
                    <div class="card-header">Available Variables</div>
                    <div class="card-body">
                        <div class="row">
                            @if($template->available_variables)
                                @foreach($template->available_variables as $var => $description)
                                <div class="col-md-6 mb-2">
                                    <code>{{ $var }}</code> - {{ $description }}
                                </div>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
                
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">Save Template</button>
                    <a href="{{ route('admin.email-templates.preview', $template->id) }}" class="btn btn-info" target="_blank">
                        Preview
                    </a>
                    <button type="button" class="btn btn-warning" onclick="resetTemplate()">
                        Reset to Default
                    </button>
                    <a href="{{ route('admin.email-templates.index') }}" class="btn btn-secondary">
                        Back to List
                    </a>
                </div>
            </form>
            
            <!-- Hidden form for reset -->
            <form id="reset-form" method="POST" action="{{ route('admin.email-templates.reset', $template->id) }}" style="display: none;">
                @csrf
            </form>
        </div>
    </div>
</div>

<script>
function resetTemplate() {
    if (confirm('Are you sure you want to reset this template to its default? Your changes will be lost.')) {
        document.getElementById('reset-form').submit();
    }
}
</script>
@endsection