@extends('layouts.app')

@section('title', $page?->meta_title ?? 'About Marhire')
@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema_markup !!}
    @endif
@endsection

@section('content')
<div id="about_root">
</div>
@endsection