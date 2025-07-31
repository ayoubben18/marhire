@extends('layouts.dashboard_admin')

@section('title', 'Nouveau client')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Nouveau Client</h3>
            <div class="nk-block-des text-soft">
                <p>Ajouter les informations de votre nouveau client.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('client.list_clients') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<form action="{{ route('client.insert') }}" method="post">
    @csrf
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('inserted'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Félécitation</strong>.votre nouveau client a été bien ajouter.
                    </div>
                </div>
                @endif
                <div class="row gy-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Nom <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('nom') is-invalid @enderror" name="nom" placeholder="Nom" value="{{ old('nom') }}">
                                @error('nom')
                                <small class="error">Nom est invalide</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Prénom <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('prenom') is-invalid @enderror" name="prenom" placeholder="Prénom" value="{{ old('prenom') }}">
                                @error('prenom')
                                <small class="error">Prénom est invalide</small>
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
                                <small class="error">Email est invalide</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Téléphone <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="tel" class="form-control @error('telephone') is-invalid @enderror" name="telephone" placeholder="Téléphone" value="{{ old('telephone') }}">
                                @error('telephone')
                                <small class="error">Téléphone est invalide</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Zone <span class="lbl-obligatoire">*</span></label>
                            <select class="form-control select2-single" name="zone" placeholder="Zone">
                                @foreach($zones as $zone)
                                <option value="{{ $zone->id }}">{{ $zone->zone }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Tarif de livraison</label>
                            <div class="form-control-wrap">
                                <input type="number" step="any" class="form-control" name="client_tarif_livraison" placeholder="Tarif de livraison" value="{{ old('client_tarif_livraison') }}">
                                <small>la valeur par défault selon la ville. </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Tarif d'annulation</label>
                            <div class="form-control-wrap">
                                <input type="number" step="any" class="form-control" name="client_tarif_annulation" placeholder="Tarif d'annulation" value="{{ old('client_tarif_annulation') }}">
                                <small>la valeur par défault selon la ville. </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Tarif de refusé</label>
                            <div class="form-control-wrap">
                                <input type="number" step="any" class="form-control" name="client_tarif_retour" placeholder="Tarif de refusé" value="{{ old('client_tarif_retour') }}">
                                <small>la valeur par défault selon la ville. </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Banque</label>
                            <select class="form-control select2-single" name="banque">
                                <option value="-1">Choisissez un banque</option>
                                <option value="Bank Al-Maghrib">Bank Al-Maghrib</option>
                                <option value="Attijariwafa Bank">Attijariwafa Bank</option>
                                <option value="BMCE">BMCE</option>
                                <option value="Crédit Agricole">Crédit Agricole</option>
                                <option value="Groupe Banque Populaire">Groupe Banque Populaire</option>
                                <option value="CIH">CIH</option>
                                <option value="BMCI">BMCI</option>
                                <option value="Société Générale Maroc">Société Générale Maroc</option>
                                <option value="Crédit du Maroc">Crédit du Maroc</option>
                                <option value="Al-Barid Bank">Al-Barid Bank</option>
                                <option value="Casablanca Finance Group">Casablanca Finance Group</option>
                                <option value="Attijari Finances Corp">Attijari Finances Corp</option>
                                <option value="CDG Capital">CDG Capital</option>
                                <option value="Arab Bank Maroc">Arab Bank Maroc</option>
                                <option value="Bank Al Amal">Bank Al Amal</option>
                                <option value="Citibank">Citibank</option>
                                <option value="Crédit Populaire du Maroc">Crédit Populaire du Maroc</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Numéro de compte banquaire</label>
                            <input type="text" class="form-control" name="rip" placeholder="RIB">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Mot de passe <span class="lbl-obligatoire">*</span></label>
                            <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Mot de passe">
                            @error('password')
                            <small class="error">Mot de passe est invalide</small>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="">Confirmer Mot de passe <span class="lbl-obligatoire">*</span></label>
                            <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" name="password_confirmation" placeholder="Confirmer Mot de passe">
                            @error('password_confirmation')
                            <small class="error">Mot de passe n'est identique</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center mt-2">
                    <button type="submit" class="btn-signup">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection
