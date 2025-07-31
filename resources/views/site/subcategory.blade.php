@extends('layouts.app')

@section('title', 'Sub category')

@section('content')
<div id="subcategory_root" 
     data-category="{{ $category ?? '' }}" 
     data-subcategory="{{ $subcategory ?? '' }}" 
     data-city="{{ $city ?? '' }}">
</div>
@endsection