{{-- SEO Meta Tags Component --}}
@if(isset($metaTags['title']))
    <title>{{ $metaTags['title'] }}</title>
    <meta name="title" content="{{ $metaTags['title'] }}">
@endif

@if(isset($metaTags['description']))
    <meta name="description" content="{{ $metaTags['description'] }}">
@endif

@if(isset($metaTags['keywords']))
    <meta name="keywords" content="{{ $metaTags['keywords'] }}">
@endif

{{-- Canonical URL --}}
@if(isset($metaTags['canonical']))
    <link rel="canonical" href="{{ $metaTags['canonical'] }}" />
@endif

{{-- Hreflang Tags --}}
@if(isset($metaTags['hreflang']))
    {!! $metaTags['hreflang'] !!}
@endif

{{-- OpenGraph Tags --}}
@if(isset($metaTags['og_title']))
    <meta property="og:title" content="{{ $metaTags['og_title'] }}" />
@endif

@if(isset($metaTags['og_description']))
    <meta property="og:description" content="{{ $metaTags['og_description'] }}" />
@endif

@if(isset($metaTags['og_url']))
    <meta property="og:url" content="{{ $metaTags['og_url'] }}" />
@endif

@if(isset($metaTags['og_type']))
    <meta property="og:type" content="{{ $metaTags['og_type'] }}" />
@endif

@if(isset($metaTags['og_image']))
    <meta property="og:image" content="{{ $metaTags['og_image'] }}" />
@endif

@if(isset($metaTags['og_locale']))
    <meta property="og:locale" content="{{ $metaTags['og_locale'] }}" />
@endif

@if(isset($metaTags['og_locale_alternate']) && is_array($metaTags['og_locale_alternate']))
    @foreach($metaTags['og_locale_alternate'] as $locale)
        <meta property="og:locale:alternate" content="{{ $locale }}" />
    @endforeach
@endif

<meta property="og:site_name" content="{{ config('app.name') }}" />

{{-- Twitter Card Tags --}}
@if(isset($metaTags['twitter_card']))
    <meta name="twitter:card" content="{{ $metaTags['twitter_card'] }}" />
@endif

@if(isset($metaTags['twitter_title']))
    <meta name="twitter:title" content="{{ $metaTags['twitter_title'] }}" />
@endif

@if(isset($metaTags['twitter_description']))
    <meta name="twitter:description" content="{{ $metaTags['twitter_description'] }}" />
@endif

@if(isset($metaTags['twitter_image']))
    <meta name="twitter:image" content="{{ $metaTags['twitter_image'] }}" />
@endif