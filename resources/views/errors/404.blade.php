@extends('layouts.app')

@section('title', '404 - Page Not Found')

@section('meta')
    <meta name="title" content="404 - Page Not Found | MarHire">
    <meta name="description" content="The page you are looking for does not exist. Browse our car rentals, boat rentals, private drivers and activities in Morocco.">
@endsection

@section('force_not_sticky', true)

@section('content')
<div id="notfound_root"></div>
<style>
    /* Minimal page-level accent alignment for 404 */
    .site main { min-height: 60vh; }
    .notfound-accent { color: #048667; }
    .notfound-accent-bg { background-color: rgba(4, 134, 103, 0.12); }
    .notfound-btn { background-color: #048667; color: #fff; }
    .notfound-btn:hover { opacity: .9; color: #fff; }
    a.notfound-link { color: #048667; }
    a.notfound-link:hover { text-decoration: underline; }
    /* Ensure container width similar to site layout */
    #notfound_root .container { max-width: 960px; }
@media (min-width: 768px) {
    #notfound_root .container { max-width: 900px; }
}
</style>
@endsection