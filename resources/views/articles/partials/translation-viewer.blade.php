{{-- Translation Viewer Modal for Articles - Simple Clean Design --}}
<div class="modal fade" id="articleTranslationViewerModal" tabindex="-1" aria-labelledby="articleTranslationViewerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="articleTranslationViewerModalLabel">
                    <i class="fas fa-language me-2"></i>
                    Article Translation Viewer
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                <!-- Simple Tab Navigation -->
                <ul class="nav nav-tabs mb-3" id="articleTranslationTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" 
                                id="english-tab" 
                                data-tab="english"
                                type="button" 
                                role="tab" 
                                aria-controls="english" 
                                aria-selected="true">
                            English
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" 
                                id="french-tab" 
                                data-tab="french"
                                type="button" 
                                role="tab" 
                                aria-controls="french" 
                                aria-selected="false">
                            French
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" 
                                id="spanish-tab" 
                                data-tab="spanish"
                                type="button" 
                                role="tab" 
                                aria-controls="spanish" 
                                aria-selected="false">
                            Spanish
                        </button>
                    </li>
                </ul>

                <!-- Tab Content -->
                <div class="tab-content" id="articleTranslationTabContent">
                    <!-- English Tab -->
                    <div class="tab-pane fade show active" id="english" role="tabpanel" aria-labelledby="english-tab">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            This is the original English content from your form.
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="english-title" readonly>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Short Description</label>
                                <textarea class="form-control" rows="3" id="english-short_description" readonly></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="10" id="english-content" readonly></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="english-meta_title" readonly>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="english-meta_description" readonly></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- French Tab -->
                    <div class="tab-pane fade" id="french" role="tabpanel" aria-labelledby="french-tab">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="alert alert-success flex-grow-1 me-3 mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                French translations - Edit as needed
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="regenerateLanguage('fr')">
                                <i class="fas fa-sync-alt me-1"></i>Regenerate
                            </button>
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="french-title">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Short Description</label>
                                <textarea class="form-control" rows="3" id="french-short_description"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="10" id="french-content"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="french-meta_title">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="french-meta_description"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Spanish Tab -->
                    <div class="tab-pane fade" id="spanish" role="tabpanel" aria-labelledby="spanish-tab">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="alert alert-success flex-grow-1 me-3 mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                Spanish translations - Edit as needed
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="regenerateLanguage('es')">
                                <i class="fas fa-sync-alt me-1"></i>Regenerate
                            </button>
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="spanish-title">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Short Description</label>
                                <textarea class="form-control" rows="3" id="spanish-short_description"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="10" id="spanish-content"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="spanish-meta_title">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="spanish-meta_description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="applyArticleTranslationsFromModal()">
                    <i class="fas fa-check me-2"></i>Apply Translations
                </button>
            </div>
        </div>
    </div>
</div>

<script>
// Article translation modal functions
let currentArticleTranslations = {};

function showTranslationModal(translations) {
    currentArticleTranslations = translations;
    
    // Get original content from form
    const originalContent = collectArticleFormContent();
    console.log('Original content collected:', originalContent);
    console.log('Content field specifically:', originalContent.content ? originalContent.content.substring(0, 100) + '...' : 'empty or undefined');
    
    // Populate English tab with original content - simple textarea approach
    const fields = ['title', 'short_description', 'content', 'meta_title', 'meta_description'];
    fields.forEach(field => {
        const element = document.getElementById(`english-${field}`);
        if (element) {
            element.value = originalContent[field] || '';
        }
    });
    
    // Populate translated content
    Object.keys(translations).forEach(locale => {
        const localeMap = { 'fr': 'french', 'es': 'spanish' };
        const tabName = localeMap[locale];
        
        if (tabName) {
            fields.forEach(field => {
                const element = document.getElementById(`${tabName}-${field}`);
                if (element) {
                    // Set value for all fields, including content
                    // Use empty string if field doesn't exist in translations
                    element.value = (translations[locale] && translations[locale][field]) ? translations[locale][field] : '';
                }
            });
        }
    });
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('articleTranslationViewerModal'));
    modal.show();
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#articleTranslationTabs button[data-tab]');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('show', 'active');
        });
    });
});

function applyArticleTranslationsFromModal() {
    // Collect all edited translations from the modal
    const fields = ['title', 'short_description', 'content', 'meta_title', 'meta_description'];
    const localeMap = { 'french': 'fr', 'spanish': 'es' };
    const updatedTranslations = {};
    
    Object.keys(localeMap).forEach(tabName => {
        const locale = localeMap[tabName];
        updatedTranslations[locale] = {};
        
        fields.forEach(field => {
            const element = document.getElementById(`${tabName}-${field}`);
            if (element) {
                // Simply get the value from the textarea/input
                updatedTranslations[locale][field] = element.value;
            }
        });
    });
    
    // Apply the translations
    applyArticleTranslations(updatedTranslations);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('articleTranslationViewerModal'));
    modal.hide();
}

function regenerateLanguage(locale) {
    const content = collectArticleFormContent();
    
    swal({
        title: 'Regenerating Translation',
        text: 'Please wait...',
        icon: 'info',
        buttons: false,
        closeOnClickOutside: false
    });
    
    fetch('/articles/translate-preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            content: content,
            locales: [locale]
        })
    })
    .then(response => response.json())
    .then(data => {
        swal.close();
        
        if (data.status === 'success') {
            // Update the translations in memory
            currentArticleTranslations[locale] = data.translations[locale];
            
            // Update the UI
            const localeMap = { 'fr': 'french', 'es': 'spanish' };
            const tabName = localeMap[locale];
            const fields = ['title', 'short_description', 'content', 'meta_title', 'meta_description'];
            
            fields.forEach(field => {
                const element = document.getElementById(`${tabName}-${field}`);
                if (element && data.translations[locale] && data.translations[locale][field]) {
                    // Simply set the value for all fields
                    element.value = data.translations[locale][field];
                }
            });
            
            swal('Success', `${locale.toUpperCase()} translation regenerated!`, 'success');
        } else {
            swal('Error', 'Failed to regenerate translation.', 'error');
        }
    })
    .catch(error => {
        swal.close();
        swal('Error', 'Failed to regenerate translation.', 'error');
    });
}

// No CKEditor initialization needed - using plain textareas for simplicity
</script>