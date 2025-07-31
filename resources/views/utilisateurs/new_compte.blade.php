@extends('layouts.dashboard_admin')

@section('title', 'New user')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">New user</h3>
                <div class="nk-block-des text-soft">
                    <p>Add the the informations of new user.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('utilisateur.list_utilisateurs') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('utilisateur.insert') }}" method="post">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new user has been added.
                </div>
            </div>
            @endif
            <div class="row gy-4">
            <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">First name <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control @error('prenom') is-invalid @enderror" name="prenom" placeholder="First name" value="{{ old('prenom') }}">
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
                            <input type="text" class="form-control @error('nom') is-invalid @enderror" name="nom" placeholder="Last name" value="{{ old('nom') }}">
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
                            <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Email" value="{{ old('email') }}">
                            @error('email')
                            <small class="error">Invalid email</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Role <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <select name="role" class="form-control select2-single" id="role">
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Phone number <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="tel" class="form-control @error('telephone') is-invalid @enderror" name="telephone" placeholder="Phone number" value="{{ old('telephone') }}">
                            @error('telephone')
                            <small class="error">Invalid phone number</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Password <span class="lbl-obligatoire">*</span></label>
                        <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password">
                        @error('password')
                        <small class="error">Invalid password</small>
                        @enderror
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="">Confirm password <span class="lbl-obligatoire">*</span></label>
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