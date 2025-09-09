@extends('layouts.app')

@section('title', $page?->meta_title ?? 'Support - MarHire')

@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @else
        <meta name="description" content="Get support and help with MarHire services. Contact us for assistance with car rentals, private drivers, boats and activities in Morocco.">
    @endif
@endsection

@section('content')
    <div id="support_root">
    </div>
@endsection
