@extends('layouts.app')

@section('title', $page?->meta_title ?? 'Terms')
@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @endif
@endsection

@section('content')
<div id="legal_root" data-title="{{ $title }}" data-type="{{ $type }}">
</div>
@endsection
