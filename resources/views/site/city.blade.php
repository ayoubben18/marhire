@extends('layouts.app')

@section('title', str_replace('$CITY', $city, $page?->meta_title) ?? 'Travel Services | Car Rental, Drivers, Boats & Tours - MarHire')
@section('meta')
    @if($page)
        <meta name="title" content="{{ str_replace('$CITY', $city,$page->meta_title) }}">
        <meta name="description" content="{{ str_replace('$CITY', $city, $page->meta_description) }}">
        {!! $page->schema_markup !!}
    @endif
@endsection
@section('content')
<div id="city_root" data-city="{{ $city }}">
</div>
@endsection