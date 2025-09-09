@extends('layouts.app')

@section('title', $page?->meta_title ?? 'Search Results - MarHire')

@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @else
        <meta name="description" content="Search for car rentals, private drivers, boats and activities in Morocco. Find the best deals and book instantly.">
    @endif
@endsection

@section('content')
    <div id="search_root" data-type="{{ $type }}">
    </div>
@endsection