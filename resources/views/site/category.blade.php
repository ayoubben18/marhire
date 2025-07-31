@extends('layouts.app')

@section('title', str_replace('$city', $city ?? '', $page?->meta_title) ?? 'Category')
@section('meta')
    @if($page)
        <meta name="title" content="{{ str_replace('$city', $city ?? '', $page->meta_title) }}">
        <meta name="description" content="{{ str_replace('$city', $city ?? '', $page->meta_description) }}">
        {!! $page->schema_markup !!}
    @endif
@endsection
@section('content')
<div id="category_root" data-slug="{{ $slug ?? '' }}" data-city="{{ $city ?? '' }}">
</div>
@endsection