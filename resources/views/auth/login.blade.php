@extends('layouts.auth_layout')

@section('meta')
    @section('title', 'Connexion')
    <meta name="title" content="Connexion">
    <meta name="description" content="connecter au votre compte vendeur et commencer la livraison.">

    <style>
        .nk-split-content.nk-split-stretch.nk-auth-second-section {
            overflow: hidden;
            margin: 6px;
            border-top-right-radius: 24px;
            border-bottom-left-radius: 24px;
            min-height: unset;
        }
    </style>
@endsection 
@section('content')
<div class="nk-main ">
    <!-- wrap @s -->
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="nk-split nk-split-page nk-split-md nk-heigh-100vh">
                <div class="nk-split-content nk-split-stretch nk-auth-second-section" style="
background-color: initial !important; position:relative;
">
                   <img src="{{ asset('images/auth-background.webp') }}" style="width:100%; height:100%; object-fit:cover;" />
                   {{-- <div class="bg-overlay" style="width: 100%; height: 100%; top: 0px;"></div> --}}
                </div>
                <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white vh">
                    <form action="{{ route('login') }}" method="post">
                        @csrf
                    <div class="nk-block nk-block-middle nk-auth-body">
                        <div class="brand-logo pb-5">
                            <a href="/" class="logo-link">
                                <img class="logo-dark logo-img logo-img-lg" src="{{ asset(config('logo')) }}" alt="logo">
                            </a>
                        </div>
                        <div class="nk-block-head">
                            <div class="nk-block-head-content">
                                @error('email')
                                <div class="alert alert-sm alert-danger">
                                    <i class="fa-solid fa-triangle-exclamation mr-1"></i> Email or password is not correct.
                                </div>
                                @enderror
                                <h5 class="nk-block-title">Sign In</h5>
                                <div class="nk-block-des">
                                    <p>Connect to your account and access all system functions.</p>
                                </div>
                            </div>
                        </div><!-- .nk-block-head -->
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="email-address">Email</label>
                                </div>
                                <div class="form-control-wrap">
                                    <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Email" value="{{ old('email') }}" required autofocus>
                                </div>
                            </div><!-- .form-group -->
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="password">Password</label>
                                    <a class="link link-primary link-sm" tabindex="-1" href="/">Forgot password?</a>
                                </div>
                                <div class="form-control-wrap">
                                    <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password" required>
                                    
                                </div>
                            </div><!-- .form-group -->
                            <div class="form-group">
                                <button class="btn btn-lg btn-success btn-block rounded-32px">Sign In</button>
                            </div>
                    </div><!-- .nk-block -->
                    <div class="nk-block nk-auth-footer">
                        <div class="mt-3">
                            <p>© {{ date('Y') . ' ' . config('raison_sociale') }}. All rights reserved.</p>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
