@extends('layouts.app')

@section('title', $metaTags['title'] ?? $page?->meta_title ?? 'Details')

@section('meta')
    @if(isset($metaTags['description']))
        <meta name="description" content="{{ $metaTags['description'] }}">
    @elseif($page)
        <meta name="description" content="{{ $page->meta_description }}">
    @endif
    
    @if(isset($metaTags['keywords']) && $metaTags['keywords'])
        <meta name="keywords" content="{{ $metaTags['keywords'] }}">
    @endif
@endsection

{{-- OpenGraph Meta Tags --}}
@section('og_title', $metaTags['og_title'] ?? $page?->meta_title ?? 'Details')
@section('og_description', $metaTags['og_description'] ?? $page?->meta_description ?? '')
@section('og_type', 'product')
@if(isset($metaTags['og_image']))
    @section('og_image', $metaTags['og_image'])
@endif

{{-- Twitter Card Meta Tags --}}
@section('twitter_card', 'summary_large_image')
@section('twitter_title', $metaTags['og_title'] ?? $page?->meta_title ?? 'Details')
@section('twitter_description', $metaTags['og_description'] ?? $page?->meta_description ?? '')
@if(isset($metaTags['twitter_image']))
    @section('twitter_image', $metaTags['twitter_image'])
@endif

@section('content')
    <div id="listing_root" data-slug="{{ $slug }}">
    </div>
    
    {{-- Structured Data removed to fix indexing issues --}}
    
    {{-- Legacy schema markup if available --}}
    @if($page && $page->schema_markup)
        {!! $page->schema_markup !!}
    @endif
@endsection
