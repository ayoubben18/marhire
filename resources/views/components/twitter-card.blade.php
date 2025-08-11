{{-- Twitter Card Meta Tags Component --}}
<meta name="twitter:card" content="{{ $data['card'] ?? 'summary_large_image' }}" />

@if(isset($data['site']))
    <meta name="twitter:site" content="{{ $data['site'] }}" />
@endif

@if(isset($data['creator']))
    <meta name="twitter:creator" content="{{ $data['creator'] }}" />
@endif

@if(isset($data['title']))
    <meta name="twitter:title" content="{{ $data['title'] }}" />
@endif

@if(isset($data['description']))
    <meta name="twitter:description" content="{{ $data['description'] }}" />
@endif

@if(isset($data['image']))
    <meta name="twitter:image" content="{{ $data['image'] }}" />
    @if(isset($data['image_alt']))
        <meta name="twitter:image:alt" content="{{ $data['image_alt'] }}" />
    @endif
@endif

{{-- Player Card --}}
@if(isset($data['player']))
    <meta name="twitter:player" content="{{ $data['player'] }}" />
    @if(isset($data['player_width']))
        <meta name="twitter:player:width" content="{{ $data['player_width'] }}" />
    @endif
    @if(isset($data['player_height']))
        <meta name="twitter:player:height" content="{{ $data['player_height'] }}" />
    @endif
    @if(isset($data['player_stream']))
        <meta name="twitter:player:stream" content="{{ $data['player_stream'] }}" />
    @endif
@endif

{{-- App Card --}}
@if(isset($data['app_name_iphone']))
    <meta name="twitter:app:name:iphone" content="{{ $data['app_name_iphone'] }}" />
@endif

@if(isset($data['app_id_iphone']))
    <meta name="twitter:app:id:iphone" content="{{ $data['app_id_iphone'] }}" />
@endif

@if(isset($data['app_url_iphone']))
    <meta name="twitter:app:url:iphone" content="{{ $data['app_url_iphone'] }}" />
@endif

@if(isset($data['app_name_ipad']))
    <meta name="twitter:app:name:ipad" content="{{ $data['app_name_ipad'] }}" />
@endif

@if(isset($data['app_id_ipad']))
    <meta name="twitter:app:id:ipad" content="{{ $data['app_id_ipad'] }}" />
@endif

@if(isset($data['app_url_ipad']))
    <meta name="twitter:app:url:ipad" content="{{ $data['app_url_ipad'] }}" />
@endif

@if(isset($data['app_name_googleplay']))
    <meta name="twitter:app:name:googleplay" content="{{ $data['app_name_googleplay'] }}" />
@endif

@if(isset($data['app_id_googleplay']))
    <meta name="twitter:app:id:googleplay" content="{{ $data['app_id_googleplay'] }}" />
@endif

@if(isset($data['app_url_googleplay']))
    <meta name="twitter:app:url:googleplay" content="{{ $data['app_url_googleplay'] }}" />
@endif