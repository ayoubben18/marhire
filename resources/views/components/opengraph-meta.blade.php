{{-- OpenGraph Meta Tags Component --}}
@if(isset($data['title']))
    <meta property="og:title" content="{{ $data['title'] }}" />
@endif

@if(isset($data['description']))
    <meta property="og:description" content="{{ $data['description'] }}" />
@endif

@if(isset($data['url']))
    <meta property="og:url" content="{{ $data['url'] }}" />
@else
    <meta property="og:url" content="{{ url()->current() }}" />
@endif

<meta property="og:type" content="{{ $data['type'] ?? 'website' }}" />

@if(isset($data['image']))
    <meta property="og:image" content="{{ $data['image'] }}" />
    @if(isset($data['image_width']))
        <meta property="og:image:width" content="{{ $data['image_width'] }}" />
    @endif
    @if(isset($data['image_height']))
        <meta property="og:image:height" content="{{ $data['image_height'] }}" />
    @endif
    @if(isset($data['image_alt']))
        <meta property="og:image:alt" content="{{ $data['image_alt'] }}" />
    @endif
@endif

@php
    $locale = app()->getLocale();
    $localeMap = [
        'en' => 'en_US',
        'fr' => 'fr_FR',
        'es' => 'es_ES'
    ];
    $ogLocale = $localeMap[$locale] ?? 'en_US';
@endphp

<meta property="og:locale" content="{{ $data['locale'] ?? $ogLocale }}" />

@if(isset($data['locale_alternate']))
    @foreach($data['locale_alternate'] as $altLocale)
        <meta property="og:locale:alternate" content="{{ $altLocale }}" />
    @endforeach
@else
    @foreach(array_diff_key($localeMap, [$locale => '']) as $altLocale)
        <meta property="og:locale:alternate" content="{{ $altLocale }}" />
    @endforeach
@endif

<meta property="og:site_name" content="{{ $data['site_name'] ?? config('app.name') }}" />

@if(isset($data['video']))
    <meta property="og:video" content="{{ $data['video'] }}" />
@endif

@if(isset($data['audio']))
    <meta property="og:audio" content="{{ $data['audio'] }}" />
@endif

@if(isset($data['determiner']))
    <meta property="og:determiner" content="{{ $data['determiner'] }}" />
@endif

@if(isset($data['updated_time']))
    <meta property="og:updated_time" content="{{ $data['updated_time'] }}" />
@endif