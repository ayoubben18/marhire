{{-- AI Translation Generator for Pages --}}
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
            @if(isset($page) && $page->id)
                @if($page->translations && $page->translations->count() > 0)
                    This page has existing translations. Click "View Existing" to see them or "Generate" to create new ones.
                @else
                    Update your content above, then generate new translations.
                @endif
            @else
                Fill in the meta title and content sections above to enable translation generation.
            @endif
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <label class="form-label fw-bold">Select Languages:</label>
                <div class="d-flex" style="gap: 20px;">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTranslateFrPage" value="fr" checked>
                        <label class="form-check-label" for="tempTranslateFrPage">French</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempTranslateEsPage" value="es" checked>
                        <label class="form-check-label" for="tempTranslateEsPage">Spanish</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-end">
                <button type="button" class="btn btn-primary" onclick="generateNewPageTranslations()">
                    <i class="fas fa-magic me-2"></i>Generate
                </button>
                <button type="button" class="btn btn-info" onclick="viewExistingPageTranslations()" id="viewExistingPageTranslationsBtn" 
                        @if(!isset($page) || !$page->id || !$page->translations || $page->translations->count() == 0) style="display:none;" @endif>
                    <i class="fas fa-eye me-2"></i>View Existing
                </button>
                <button type="button" class="btn btn-secondary" onclick="viewGeneratedPageTranslations()" id="viewPageTranslationsBtn" style="display:none;">
                    <i class="fas fa-eye me-2"></i>View Generated
                </button>
            </div>
        </div>
    </div>
</div>

{{-- Hidden input to store translations for form submission --}}
<input type="hidden" id="pageTranslationsInput" name="translations" value="">

<script>
// Helper functions for page form content
function collectPageFormContent() {
    // Get content sections from the main form
    const sections = [];
    document.querySelectorAll('#sections-wrapper .section-item').forEach(sectionDiv => {
        const title = sectionDiv.querySelector('input[name*="[title]"]')?.value || '';
        const text = sectionDiv.querySelector('textarea[name*="[text]"]')?.value || '';
        if (title || text) {
            sections.push({ title, text });
        }
    });

    return {
        meta_title: document.querySelector('input[name="meta_title"]')?.value || '',
        meta_description: document.querySelector('textarea[name="meta_description"]')?.value || '',
        content_sections: sections
    };
}

function applyPageTranslations(translations) {
    // Store translations in hidden input for form submission
    document.getElementById('pageTranslationsInput').value = JSON.stringify(translations);
    
    // Show success message
    if (typeof swal !== 'undefined') {
        swal('Success!', 'Translations have been prepared and will be saved with the page.', 'success');
    } else {
        alert('Translations have been prepared and will be saved with the page.');
    }
}

function generateNewPageTranslations() {
    const languages = [];
    if (document.getElementById('tempTranslateFrPage').checked) languages.push('fr');
    if (document.getElementById('tempTranslateEsPage').checked) languages.push('es');
    
    if (languages.length === 0) {
        if (typeof swal !== 'undefined') {
            swal('Warning', 'Please select at least one language to translate.', 'warning');
        } else {
            alert('Please select at least one language to translate.');
        }
        return;
    }
    
    const content = collectPageFormContent();
    
    // Allow translation if there's at least a title, description, or content section
    if (!content.meta_title && !content.meta_description && content.content_sections.length === 0) {
        if (typeof swal !== 'undefined') {
            swal('Warning', 'Please provide at least some content (title, description, or content sections) before generating translations.', 'warning');
        } else {
            alert('Please provide at least some content (title, description, or content sections) before generating translations.');
        }
        return;
    }
    
    if (typeof swal !== 'undefined') {
        swal({
            title: 'Generating Translations',
            text: 'Please wait...',
            icon: 'info',
            buttons: false,
            closeOnClickOutside: false
        });
    }
    
    // Get CSRF token more robustly
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || 
                     document.querySelector('input[name="_token"]')?.value || 
                     '{{ csrf_token() }}';
    
    fetch('/pages/translate-preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            content: content,
            locales: languages
        })
    })
    .then(response => {
        if (!response.ok) {
            // Try to parse JSON error response, fallback to text
            return response.text().then(text => {
                try {
                    const err = JSON.parse(text);
                    return Promise.reject(err);
                } catch (e) {
                    return Promise.reject({ 
                        message: `HTTP ${response.status}: ${text || 'Unknown error'}` 
                    });
                }
            });
        }
        return response.json();
    })
    .then(data => {
        if (typeof swal !== 'undefined') {
            swal.close();
        }
        
        if (data.status === 'success') {
            window.generatedPageTranslations = data.translations;
            
            // Store the translations in the hidden field for form submission
            document.getElementById('pageTranslationsInput').value = JSON.stringify(data.translations);
            
            // Show success message
            if (typeof swal !== 'undefined') {
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
                        viewGeneratedPageTranslations();
                    }
                });
            } else {
                alert('Translations generated successfully. You can view and edit them before saving.');
            }
            
            // Show the view button
            document.getElementById('viewPageTranslationsBtn').style.display = 'inline-block';
            
        } else {
            if (typeof swal !== 'undefined') {
                swal('Error', data.message || 'Translation generation failed.', 'error');
            } else {
                alert(data.message || 'Translation generation failed.');
            }
        }
    })
    .catch(error => {
        if (typeof swal !== 'undefined') {
            swal.close();
            swal('Error', error.message || 'Failed to generate translations. Please try again.', 'error');
        } else {
            alert(error.message || 'Failed to generate translations. Please try again.');
        }
        console.error('Translation error:', error);
    });
}

function viewGeneratedPageTranslations() {
    if (!window.generatedPageTranslations) {
        if (typeof swal !== 'undefined') {
            swal('Warning', 'No translations available. Please generate translations first.', 'warning');
        } else {
            alert('No translations available. Please generate translations first.');
        }
        return;
    }
    
    showPageTranslationModal(window.generatedPageTranslations);
}

function viewExistingPageTranslations() {
    @if(isset($page) && $page->id)
        // Load existing translations via AJAX
        fetch(`/pages/{{ $page->id }}/translations`)
            .then(response => response.json())
            .then(data => {
                if (data.translations && Object.keys(data.translations).length > 0) {
                    // Format translations for the modal
                    const existingTranslations = {};
                    Object.keys(data.translations).forEach(key => {
                        const translation = data.translations[key];
                        existingTranslations[translation.locale] = {
                            meta_title: translation.meta_title,
                            meta_description: translation.meta_description,
                            content_sections: translation.content_sections
                        };
                    });
                    showPageTranslationModal(existingTranslations);
                } else {
                    if (typeof swal !== 'undefined') {
                        swal('Info', 'No existing translations found for this page.', 'info');
                    } else {
                        alert('No existing translations found for this page.');
                    }
                }
            })
            .catch(error => {
                console.error('Error loading translations:', error);
                if (typeof swal !== 'undefined') {
                    swal('Error', 'Failed to load translations.', 'error');
                } else {
                    alert('Failed to load translations.');
                }
            });
    @else
        if (typeof swal !== 'undefined') {
            swal('Info', 'Please save the page first to view existing translations.', 'info');
        } else {
            alert('Please save the page first to view existing translations.');
        }
    @endif
}

function openPageTranslationManager() {
    // Get existing translations if we're editing a page
    let existingTranslations = {};
    
    @if(isset($page) && $page->id)
        // Load existing translations via AJAX
        fetch(`/pages/{{ $page->id }}/translations`)
            .then(response => response.json())
            .then(data => {
                if (data.translations) {
                    // Format translations for the modal
                    Object.keys(data.translations).forEach(key => {
                        const translation = data.translations[key];
                        existingTranslations[translation.locale] = {
                            meta_title: translation.meta_title,
                            meta_description: translation.meta_description,
                            content_sections: translation.content_sections
                        };
                    });
                }
                showPageTranslationModal(existingTranslations);
            })
            .catch(error => {
                console.error('Error loading translations:', error);
                showPageTranslationModal({});
            });
    @else
        // New page - no existing translations
        showPageTranslationModal({});
    @endif
}
</script>