{{-- AI Translation Generator for Terms - Simple Clean Design --}}
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
            @if(isset($term) && $term->id)
                @if($term->translations && $term->translations->count() > 0)
                    This term has existing translations. Click "View Existing" to see them or "Generate" to create new ones.
                @else
                    Update your content above, then generate new translations.
                @endif
            @else
                Fill in the Title and Content above to enable translation generation.
            @endif
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <label class="form-label fw-bold">Select Languages:</label>
                <div class="d-flex" style="gap: 20px;">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTermTranslateFr" value="fr" checked>
                        <label class="form-check-label" for="tempTermTranslateFr">French</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTermTranslateEs" value="es" checked>
                        <label class="form-check-label" for="tempTermTranslateEs">Spanish</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-end">
                <button type="button" class="btn btn-primary" onclick="generateNewTermTranslations()">
                    <i class="fas fa-magic" style="margin-right: 8px;"></i>Generate
                </button>
                <button type="button" class="btn btn-info" onclick="viewExistingTermTranslations()" id="viewExistingTermTranslationsBtn" style="display:none;">
                    <i class="fas fa-eye" style="margin-right: 8px;"></i>View Existing
                </button>
                <button type="button" class="btn btn-secondary" onclick="viewGeneratedTermTranslations()" id="viewTermTranslationsBtn" style="display:none;">
                    <i class="fas fa-eye" style="margin-right: 8px;"></i>View Generated
                </button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="pendingTermTranslations" name="pending_translations" value="">

<script>
// Get current locale from the URL (if not already defined)
if (typeof locale === 'undefined') {
    var locale = '{{ app()->getLocale() }}' || 'en';
}

function collectTermFormContent() {
    const content = {};
    
    const titleInput = document.querySelector('[name="title"]');
    if (titleInput) content.title = titleInput.value;
    
    // Handle CKEditor 5 content field - try multiple methods
    let contentValue = '';
    
    // Method 1: Try window.editorInstances
    if (window.editorInstances && window.editorInstances['content']) {
        contentValue = window.editorInstances['content'].getData();
        console.log('Method 1 - Got content from window.editorInstances:', contentValue ? contentValue.substring(0, 100) + '...' : 'empty');
    }
    
    // Method 2: Try to find CKEditor instance from the DOM element
    if (!contentValue) {
        const ckEditable = document.querySelector('.ck-editor__editable');
        if (ckEditable && ckEditable.ckeditorInstance) {
            contentValue = ckEditable.ckeditorInstance.getData();
            console.log('Method 2 - Got content from DOM ckeditorInstance:', contentValue ? contentValue.substring(0, 100) + '...' : 'empty');
        }
    }
    
    // Method 3: Fallback to textarea value
    if (!contentValue) {
        const contentTextarea = document.querySelector('[name="content"]');
        if (contentTextarea) {
            contentValue = contentTextarea.value;
            console.log('Method 3 - Got content from textarea:', contentValue ? contentValue.substring(0, 100) + '...' : 'empty');
        }
    }
    
    content.content = contentValue;
    console.log('Final content value:', content.content ? content.content.substring(0, 100) + '...' : 'empty');
    console.log('Editor instances available:', Object.keys(window.editorInstances || {}));
    
    return content;
}

function generateNewTermTranslations() {
    const languages = [];
    if (document.getElementById('tempTermTranslateFr').checked) languages.push('fr');
    if (document.getElementById('tempTermTranslateEs').checked) languages.push('es');
    
    if (languages.length === 0) {
        swal('Warning', 'Please select at least one language to translate.', 'warning');
        return;
    }
    
    const content = collectTermFormContent();
    
    if (!content.title || !content.content) {
        swal('Warning', 'Please fill in the Title and Content fields before generating translations.', 'warning');
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
    
    fetch('/terms/translate-preview', {
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
            window.generatedTermTranslations = data.translations;
            
            // Store the translations in the hidden field for form submission
            document.getElementById('pendingTermTranslations').value = JSON.stringify(data.translations);
            
            // Show success message
            swal({
                title: 'Success!',
                text: 'Translations generated successfully. You can view and edit them before saving.',
                icon: 'success',
                buttons: {
                    view: {
                        text: 'View Translations',
                        value: 'view',
                        className: 'btn-primary'
                    },
                    ok: {
                        text: 'Continue',
                        value: 'continue',
                        className: 'btn-secondary'
                    }
                }
            }).then((value) => {
                if (value === 'view') {
                    viewGeneratedTermTranslations();
                }
            });
            
            // Show the view button
            document.getElementById('viewTermTranslationsBtn').style.display = 'inline-block';
            
        } else {
            swal('Error', data.message || 'Translation generation failed.', 'error');
        }
    })
    .catch(error => {
        swal.close();
        console.error('Translation error:', error);
        swal('Error', error.message || 'Failed to generate translations. Please try again.', 'error');
    });
}

function viewGeneratedTermTranslations() {
    if (!window.generatedTermTranslations) {
        swal('Warning', 'No translations available. Please generate translations first.', 'warning');
        return;
    }
    
    // This function will be called by the translation viewer modal
    showTermTranslationModal(window.generatedTermTranslations);
}

function viewExistingTermTranslations() {
    if (!window.existingTermTranslations || Object.keys(window.existingTermTranslations).length === 0) {
        swal('Info', 'No existing translations found for this term.', 'info');
        return;
    }
    
    // Format existing translations for the modal
    const formattedTranslations = {};
    
    Object.keys(window.existingTermTranslations).forEach(locale => {
        const translation = window.existingTermTranslations[locale];
        formattedTranslations[locale] = {
            title: translation.title || '',
            content: translation.content || ''
        };
    });
    
    showTermTranslationModal(formattedTranslations);
}

// Function to be called when translations are applied from the modal
function applyTermTranslationsFromModal(translations) {
    window.generatedTermTranslations = translations;
    document.getElementById('pendingTermTranslations').value = JSON.stringify(translations);
    
    swal({
        title: 'Applied!',
        text: 'Translations have been applied. Save the form to store them.',
        icon: 'success',
        timer: 2000,
        buttons: false
    });
}
</script>