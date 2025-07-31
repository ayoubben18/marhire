@extends('layouts.app')

@section('title', str_replace('$AGENCY', $agency_name, $page?->meta_title) ?? 'Rental Agency')
@section('meta')
    @if($page)
        <meta name="title" content="{{ str_replace('$AGENCY', $agency_name,$page->meta_title) }}">
        <meta name="description" content="{{ str_replace('$AGENCY', $agency_name, $page->meta_description) }}">
        {!! $page->schema_markup !!}
    @endif
@endsection

@section('content')
<div id="agency_root" data-agency="{{ $agency }}">
</div>
@endsection