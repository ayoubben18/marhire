@extends('layouts.app')

@section('title', $page?->meta_title ?? 'List Your Property')
@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @endif
@endsection

@section('content')
    <div id="list_property_root">
    </div>
@endsection
