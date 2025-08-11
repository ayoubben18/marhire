@extends('layouts.dashboard_admin')

@section('title', 'Translation Interface Test')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Translation Interface Test</h3>
            <div class="nk-block-des text-soft">
                <p>Test the Google Gemini translation interface</p>
            </div>
        </div>
    </div>
</div>

<div class="card card-preview">
    <div class="card-inner">
        <h5>Quick Access to Translation Interface</h5>
        <p>The translation interface has been integrated into the listing edit pages.</p>
        
        <div class="alert alert-info">
            <h6>How to access the Translation Manager:</h6>
            <ol>
                <li>Go to <a href="{{ route('listings.list') }}">Listings Management</a></li>
                <li>Click "Edit" on any listing</li>
                <li>The Translation Manager will appear below the description fields</li>
                <li>Click "Generate Translations" to translate content using Google Gemini AI</li>
            </ol>
        </div>

        <div class="alert alert-warning">
            <h6>Requirements:</h6>
            <ul>
                <li>You must be logged in as an admin user</li>
                <li>Set your GEMINI_API_KEY in the .env file</li>
                <li>API Key can be obtained from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
            </ul>
        </div>

        @if($listings->count() > 0)
        <h5 class="mt-4">Available Listings for Testing</h5>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Translation Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($listings as $listing)
                    <tr>
                        <td>{{ $listing->id }}</td>
                        <td>{{ $listing->title }}</td>
                        <td>
                            @php
                                $frTranslation = $listing->translations()->where('locale', 'fr')->exists();
                                $esTranslation = $listing->translations()->where('locale', 'es')->exists();
                            @endphp
                            @if($frTranslation)
                                <span class="badge badge-success">FR ✓</span>
                            @else
                                <span class="badge badge-secondary">FR ✗</span>
                            @endif
                            @if($esTranslation)
                                <span class="badge badge-success">ES ✓</span>
                            @else
                                <span class="badge badge-secondary">ES ✗</span>
                            @endif
                        </td>
                        <td>
                            <a href="{{ route('listings.edit', ['locale' => app()->getLocale(), 'id' => $listing->id]) }}" class="btn btn-sm btn-primary">
                                Edit & Translate
                            </a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="alert alert-warning">
            No listings available. Please create a listing first.
        </div>
        @endif

        <div class="mt-4">
            <h5>API Configuration Status</h5>
            <div class="card card-bordered">
                <div class="card-inner">
                    @if(config('services.gemini.api_key'))
                        <p class="text-success">✓ GEMINI_API_KEY is configured</p>
                        <p>Model: {{ config('services.gemini.model', 'gemini-1.5-flash') }}</p>
                        <p>Rate Limit: {{ config('services.gemini.rate_limit', 60) }} requests/minute</p>
                    @else
                        <p class="text-danger">✗ GEMINI_API_KEY is not configured</p>
                        <p>Please add <code>GEMINI_API_KEY=your-api-key</code> to your .env file</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection