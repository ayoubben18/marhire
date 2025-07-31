@extends('layouts.app')

@section('title', $page?->meta_title?? 'Article')
@section('meta')
    @if($page)
        <meta name="title" content="{{ $page->meta_title }}">
        <meta name="description" content="{{ $page->meta_description }}">
        {!! $page->schema !!}
    @endif
@endsection
@section('content')
<div id="article_root" data-slug="{{ $slug }}">
</div>
@endsection