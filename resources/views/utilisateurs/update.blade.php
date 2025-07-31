@extends('layouts.dashboard_admin')

@section('title', 'Edit user')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Edit user</h3>
                <div class="nk-block-des text-soft">
                    <p>Update the user informations.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('utilisateur.list_utilisateurs') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('utilisateur.save') }}" method="post">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('updated'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. user informations has been updated.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">First name <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control @error('prenom') is-invalid @enderror" name="prenom" placeholder="First name" value="{{ $utilisateur->prenom }}">
                            @error('prenom')
                            <small class="error">Invalid first name</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Last name <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="hidden" name="id" value="{{ $utilisateur->id }}">
                            <input type="text" class="form-control @error('nom') is-invalid @enderror" name="nom" placeholder="Last name" value="{{ $utilisateur->nom }}">
                            @error('nom')
                            <small class="error">Invalid last name</small>
                            @enderror
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Email <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Email" value="{{ $utilisateur->email }}">
                            @error('email')
                            <small class="error">Invalid email</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Phone number <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="tel" class="form-control @error('telephone') is-invalid @enderror" name="telephone" placeholder="Phone number" value="{{ $utilisateur->telephone }}">
                            @error('telephone')
                            <small class="error">Invalid phone number</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Password</label>
                        <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password">
                        @error('password')
                        <small class="error">Invalid password</small>
                        @enderror
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Confirm password</label>
                        <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" name="password_confirmation" placeholder="Confirm password">
                        @error('password_confirmation')
                        <small class="error">Password not identical</small>
                        @enderror
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-2">
                <button type="submit" class="btn-signup">Save</button>
            </div>
        </div>
    </div>
</div>
</form>

@endsection