@extends($layout)

@section('title', 'Edit Addon')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Edit Addon</h3>
            <div class="nk-block-des text-soft">
                <p>Edit the informations of addon.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('listingaddons.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<form action="{{ route('listingaddons.update') }}" method="post">
    @csrf
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('updated'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. addon has been updated.
                    </div>
                </div>
                @endif
                <input type="hidden" name="id" value="{{ $listingAddon->id }}">

                <div class="row gy-4">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="addon">
                                Addon <span class="lbl-obligatoire">*</span>
                                <button type="button" class="btn btn-sm btn-outline-primary ml-2" onclick="openTranslationModal()">
                                    <i class="icon ni ni-globe"></i> Manage Translations
                                </button>
                            </label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('addon') is-invalid @enderror" name="addon" id="addon" placeholder="Addon" value="{{ old('addon') ?? $listingAddon->addon }}" />
                                @error('addon')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="category_id">Category <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="category_id" id="category_id">
                                    <option value="" disabled selected>--Choose Option--</option>
                                    @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $category->id == $listingAddon->category_id ? 'selected' : '' }}>{{ $category->category }}</option>
                                    @endforeach
                                </select>
                                @error('category_id')
                                <small class="error">Invalid category</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="price">Price <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="number" step="any" class="form-control @error('price') is-invalid @enderror" name="price" id="price" value="{{ old('price') ?? $listingAddon->price }}" />
                                @error('price')
                                <small class="error">Invalid Price</small>
                                @enderror
                            </div>
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

<!-- Translation Modal -->
<div class="modal fade" id="translationModal" tabindex="-1" role="dialog" aria-labelledby="translationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="translationModalLabel">Manage Addon Translations</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" onclick="generateTranslations()">
                        <i class="icon ni ni-spark-fill"></i> Generate AI Translations
                    </button>
                </div>
                
                <div id="translationForms">
                    <div class="form-group">
                        <label class="form-label">French Translation (FR)</label>
                        <input type="text" class="form-control" id="translation_fr" placeholder="French translation">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Spanish Translation (ES)</label>
                        <input type="text" class="form-control" id="translation_es" placeholder="Spanish translation">
                    </div>
                </div>
                
                <div id="translationLoader" class="text-center" style="display: none;">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p>Generating translations...</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="saveTranslations()">Save Translations</button>
            </div>
        </div>
    </div>
</div>

<script>
let addonId = {{ $listingAddon->id }};

function openTranslationModal() {
    $('#translationModal').modal('show');
    loadTranslations();
}

function loadTranslations() {
    $.ajax({
        url: `/listing_addons/${addonId}/translations`,
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(data) {
            if (data.translations) {
                if (data.translations.fr) {
                    $('#translation_fr').val(data.translations.fr.addon);
                }
                if (data.translations.es) {
                    $('#translation_es').val(data.translations.es.addon);
                }
            }
        }
    });
}

function generateTranslations() {
    let addonName = $('#addon').val();
    
    if (!addonName) {
        swal('Warning', 'Please enter the addon name first', 'warning');
        return;
    }
    
    $('#translationForms').hide();
    $('#translationLoader').show();
    
    $.ajax({
        url: `/listing_addons/${addonId}/generate-translations`,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            target_locales: ['fr', 'es'],
            service: 'gemini'
        },
        success: function(data) {
            $('#translationLoader').hide();
            $('#translationForms').show();
            
            if (data.translations) {
                if (data.translations.fr) {
                    $('#translation_fr').val(data.translations.fr.addon);
                }
                if (data.translations.es) {
                    $('#translation_es').val(data.translations.es.addon);
                }
            }
            
            swal('Success', 'Translations generated successfully', 'success');
        },
        error: function(xhr) {
            $('#translationLoader').hide();
            $('#translationForms').show();
            
            let message = 'Failed to generate translations';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            swal('Error', message, 'error');
        }
    });
}

function saveTranslations() {
    let translations = [
        {
            locale: 'fr',
            addon: $('#translation_fr').val()
        },
        {
            locale: 'es',
            addon: $('#translation_es').val()
        }
    ];
    
    // Filter out empty translations
    translations = translations.filter(t => t.addon);
    
    if (translations.length === 0) {
        swal('Warning', 'Please enter at least one translation', 'warning');
        return;
    }
    
    $.ajax({
        url: `/listing_addons/${addonId}/translations`,
        type: 'PUT',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            translations: translations
        },
        success: function(data) {
            swal('Success', 'Translations saved successfully', 'success');
            $('#translationModal').modal('hide');
        },
        error: function(xhr) {
            let message = 'Failed to save translations';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            }
            swal('Error', message, 'error');
        }
    });
}
</script>
@endsection
