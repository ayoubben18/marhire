{{-- Translation Viewer Modal for Terms - Simple Clean Design --}}
<div class="modal fade" id="termTranslationViewerModal" tabindex="-1" aria-labelledby="termTranslationViewerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="termTranslationViewerModalLabel">
                    <i class="fas fa-language me-2"></i>
                    Terms Translation Viewer
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                <!-- Simple Tab Navigation -->
                <ul class="nav nav-tabs mb-3" id="termTranslationTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" 
                                id="term-english-tab" 
                                data-tab="english"
                                type="button" 
                                role="tab" 
                                aria-controls="term-english" 
                                aria-selected="true">
                            English
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" 
                                id="term-french-tab" 
                                data-tab="french"
                                type="button" 
                                role="tab" 
                                aria-controls="term-french" 
                                aria-selected="false">
                            French
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" 
                                id="term-spanish-tab" 
                                data-tab="spanish"
                                type="button" 
                                role="tab" 
                                aria-controls="term-spanish" 
                                aria-selected="false">
                            Spanish
                        </button>
                    </li>
                </ul>

                <!-- Tab Content -->
                <div class="tab-content" id="termTranslationTabContent">
                    <!-- English Tab -->
                    <div class="tab-pane fade show active" id="term-english" role="tabpanel" aria-labelledby="term-english-tab">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            This is the original English content from your form.
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="term-english-title" readonly>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="15" id="term-english-content" readonly></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- French Tab -->
                    <div class="tab-pane fade" id="term-french" role="tabpanel" aria-labelledby="term-french-tab">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="alert alert-success flex-grow-1 me-3 mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                French translations - Edit as needed
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="regenerateTermLanguage('fr')">
                                <i class="fas fa-sync-alt me-1"></i>Regenerate
                            </button>
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="term-french-title">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="15" id="term-french-content"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Spanish Tab -->
                    <div class="tab-pane fade" id="term-spanish" role="tabpanel" aria-labelledby="term-spanish-tab">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="alert alert-success flex-grow-1 me-3 mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                Spanish translations - Edit as needed
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="regenerateTermLanguage('es')">
                                <i class="fas fa-sync-alt me-1"></i>Regenerate
                            </button>
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-12">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" class="form-control" id="term-spanish-title">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content</label>
                                <textarea class="form-control" rows="15" id="term-spanish-content"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="applyTermTranslationsFromModal()">
                    <i class="fas fa-check me-2"></i>Apply Translations
                </button>
            </div>
        </div>
    </div>
</div>

<script>
// Term translation modal functions
let currentTermTranslations = {};

function showTermTranslationModal(translations) {
    currentTermTranslations = translations;
    
    // Get original content from form
    const originalContent = collectTermFormContent();
    console.log('Original term content collected:', originalContent);
    console.log('Content field specifically:', originalContent.content ? originalContent.content.substring(0, 100) + '...' : 'empty or undefined');
    
    // Populate English tab with original content - simple textarea approach
    const fields = ['title', 'content'];
    fields.forEach(field => {
        const element = document.getElementById(`term-english-${field}`);
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
                const element = document.getElementById(`term-${tabName}-${field}`);
                if (element) {
                    // Set value for all fields, including content
                    // Use empty string if field doesn't exist in translations
                    element.value = translations[locale] && translations[locale][field] ? translations[locale][field] : '';
                }
            });
        }
    });
    
    // Setup tab click handlers using simple approach
    setupTermTabHandlers();
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('termTranslationViewerModal'));
    modal.show();
}

function setupTermTabHandlers() {
    // Simple tab switching for term modal
    const tabs = document.querySelectorAll('#termTranslationTabs .nav-link');
    const tabPanes = document.querySelectorAll('#termTranslationTabContent .tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('show', 'active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetTab = this.getAttribute('data-tab');
            const targetPane = document.getElementById(`term-${targetTab}`);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

function applyTermTranslationsFromModal() {
    // Collect translations from the modal form fields
    const updatedTranslations = {};
    const fields = ['title', 'content'];
    const locales = ['fr', 'es'];
    const localeMap = { 'fr': 'french', 'es': 'spanish' };
    
    locales.forEach(locale => {
        const tabName = localeMap[locale];
        updatedTranslations[locale] = {};
        
        fields.forEach(field => {
            const element = document.getElementById(`term-${tabName}-${field}`);
            if (element) {
                updatedTranslations[locale][field] = element.value;
            }
        });
    });
    
    console.log('Updated term translations:', updatedTranslations);
    
    // Update the global variable and hidden field
    window.generatedTermTranslations = updatedTranslations;
    if (typeof applyTermTranslationsFromModal === 'function') {
        applyTermTranslationsFromModal(updatedTranslations);
    }
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('termTranslationViewerModal'));
    modal.hide();
    
    // Show success message
    swal({
        title: 'Applied!',
        text: 'Translations have been applied. Save the form to store them.',
        icon: 'success',
        timer: 2000,
        buttons: false
    });
}

function regenerateTermLanguage(locale) {
    const originalContent = collectTermFormContent();
    
    if (!originalContent.title || !originalContent.content) {
        swal('Warning', 'Please fill in the Title and Content fields before regenerating translations.', 'warning');
        return;
    }
    
    const fields = Object.keys(originalContent).filter(key => originalContent[key] && originalContent[key].trim() !== '');
    
    swal({
        title: 'Regenerating Translation',
        text: `Regenerating ${locale === 'fr' ? 'French' : 'Spanish'} translation...`,
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
            content: originalContent,
            locales: [locale],
            fields: fields
        })
    })
    .then(response => response.json())
    .then(data => {
        swal.close();
        
        if (data.status === 'success' && data.translations[locale]) {
            // Update the modal fields
            const localeMap = { 'fr': 'french', 'es': 'spanish' };
            const tabName = localeMap[locale];
            const fields = ['title', 'content'];
            
            fields.forEach(field => {
                const element = document.getElementById(`term-${tabName}-${field}`);
                if (element && data.translations[locale][field]) {
                    element.value = data.translations[locale][field];
                }
            });
            
            // Update the stored translations
            currentTermTranslations[locale] = data.translations[locale];
            
            swal('Success!', `${locale === 'fr' ? 'French' : 'Spanish'} translation regenerated successfully.`, 'success');
        } else {
            swal('Error', 'Failed to regenerate translation.', 'error');
        }
    })
    .catch(error => {
        swal.close();
        console.error('Regeneration error:', error);
        swal('Error', 'Failed to regenerate translation. Please try again.', 'error');
    });
}
</script>