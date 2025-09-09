@extends('layouts.app')

@section('title', $page?->meta_title ?? 'Partners - MarHire')

@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @else
        <meta name="description" content="Become a MarHire partner. Join our network of trusted providers for car rentals, private drivers, boats and activities in Morocco.">
    @endif
@endsection

@section('content')
    <div id="partners_root">
    </div>
@endsection