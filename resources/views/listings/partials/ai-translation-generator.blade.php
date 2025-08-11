{{-- AI Translation Generator - Simple Clean Design --}}
<div class="card mt-4">
    <div class="card-header bg-primary text-white">
        <h5 class="mb-0">
            <i class="fas fa-language me-2"></i>
            AI Translation Generator
        </h5>
    </div>
    
    <div class="card-body">
        <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            @if(isset($listing) && $listing->id)
                Update your content above, then generate new translations.
            @else
                Fill in the Title and Description above to enable translation generation.
            @endif
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <label class="form-label fw-bold">Select Languages:</label>
                <div class="d-flex" style="gap: 20px;">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTranslateFr" value="fr" checked>
                        <label class="form-check-label" for="tempTranslateFr">French</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTranslateEs" value="es" checked>
                        <label class="form-check-label" for="tempTranslateEs">Spanish</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-end">
                <button type="button" class="btn btn-primary" onclick="generateNewListingTranslations()">
                    <i class="fas fa-magic" style="margin-right: 8px;"></i>Generate
                </button>
                <button type="button" class="btn btn-secondary" onclick="viewGeneratedTranslations()" id="viewTranslationsBtn" style="display:none;">
                    <i class="fas fa-eye" style="margin-right: 8px;"></i>View
                </button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="pendingTranslations" name="pending_translations" value="">

<script>
// Get current locale from the URL (if not already defined)
if (typeof locale === 'undefined') {
    var locale = '{{ app()->getLocale() }}' || 'en';
}

function collectFormContent() {
    const content = {};
    
    const titleInput = document.querySelector('[name="title"]');
    if (titleInput) content.title = titleInput.value;
    
    if (window.CKEDITOR) {
        for (let instance in CKEDITOR.instances) {
            const editor = CKEDITOR.instances[instance];
            const fieldName = editor.element.$.name;
            if (fieldName) {
                content[fieldName] = editor.getData();
            }
        }
    }
    
    const textFields = ['meta_title', 'meta_description', 'cancellation_policy', 'rental_terms', 'pickup_info'];
    textFields.forEach(field => {
        const element = document.querySelector(`[name="${field}"]`);
        if (element) {
            content[field] = element.value;
        }
    });
    
    return content;
}

function generateNewListingTranslations() {
    const languages = [];
    if (document.getElementById('tempTranslateFr').checked) languages.push('fr');
    if (document.getElementById('tempTranslateEs').checked) languages.push('es');
    
    if (languages.length === 0) {
        swal('Warning', 'Please select at least one language to translate.', 'warning');
        return;
    }
    
    const content = collectFormContent();
    
    if (!content.title || !content.description) {
        swal('Warning', 'Please fill in the Title and Description fields before generating translations.', 'warning');
        return;
    }
    
    const fields = Object.keys(content).filter(key => content[key] && content[key].trim() !== '');
    
    swal({
        title: 'Generating Translations',
        text: 'Please wait...',
        icon: 'info',
        buttons: false,
        closeOnClickOutside: false
    });
    
    fetch(`/${locale}/listings/translate-preview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            content: content,
            locales: languages,
            fields: fields
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
    .then(data => {
        swal.close();
        
        if (data.status === 'success') {
            window.tempTranslations = data.translations;
            document.getElementById('viewTranslationsBtn').style.display = 'inline-block';
            document.getElementById('pendingTranslations').value = JSON.stringify(data.translations);
            
            // Only update badges if the function exists (defined in translation-viewer.blade.php)
            if (typeof updateTranslationBadges === 'function') {
                updateTranslationBadges(data.translations);
            }
            
            swal('Success', 'Translations generated successfully!', 'success');
        } else {
            swal('Error', data.message || 'Failed to generate translations.', 'error');
        }
    })
    .catch(error => {
        swal.close();
        const errorMsg = error.message || error.error || 'Failed to generate translations. Please check your API key configuration.';
        swal('Error', errorMsg, 'error');
        console.error('Translation error:', error);
    });
}

function viewGeneratedTranslations() {
    if (window.tempTranslations && typeof showTranslationViewer === 'function') {
        showTranslationViewer(window.tempTranslations);
    } else {
        swal('Info', 'No translations available. Please generate translations first.', 'info');
    }
}
</script>