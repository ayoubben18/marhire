@extends('layouts.app')

@section('title')
    @if($page && isset($page->processed_meta_title))
        {{ $page->processed_meta_title }}
    @else
        {{ ucfirst($subcategory ?? 'Subcategory') }} - MarHire
    @endif
@endsection

@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->processed_meta_title ?? $page->meta_title }}">
        <meta name="description" content="{{ $page->processed_meta_description ?? $page->meta_description }}">
        {!! $page->schema_markup !!}
    @else
        <meta name="description" content="Find the best {{ $subcategory ?? 'services' }} for {{ $category ?? 'your needs' }} in Morocco{{ isset($city) ? ' in ' . $city : '' }}. Book now with MarHire.">
    @endif
@endsection

@section('content')
<div id="subcategory_root" 
     data-category="{{ $category ?? '' }}" 
     data-subcategory="{{ $subcategory ?? '' }}" 
     data-city="{{ $city ?? '' }}">
</div>
@endsection