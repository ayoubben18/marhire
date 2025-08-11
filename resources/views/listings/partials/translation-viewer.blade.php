{{-- Translation Viewer Modal - Simple Clean Design --}}
<div class="modal fade" id="translationViewerModal" tabindex="-1" aria-labelledby="translationViewerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="translationViewerModalLabel">
                    <i class="fas fa-language me-2"></i>
                    Translation Viewer
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                <!-- Simple Tab Navigation -->
                <ul class="nav nav-tabs mb-3" id="translationTabs" role="tablist">
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
                <div class="tab-content">
                    <!-- English Tab -->
                    <div class="tab-pane fade show active" id="english" role="tabpanel" aria-labelledby="english-tab">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Original Content</strong> - This is your source content for translation.
                        </div>
                        <div id="englishContent">
                            <!-- Content will be loaded here dynamically -->
                        </div>
                    </div>

                    <!-- French Tab -->
                    <div class="tab-pane fade" id="french" role="tabpanel" aria-labelledby="french-tab">
                        <div class="d-flex justify-content-between mb-3">
                            <div>
                                <button type="button" class="btn btn-sm btn-outline-primary" id="editFrenchBtn" onclick="editTranslation('fr')">
                                    <i class="fas fa-edit" style="margin-right: 6px;"></i>Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-success d-none" id="saveFrenchBtn" onclick="saveTranslation('fr')">
                                    <i class="fas fa-save" style="margin-right: 6px;"></i>Save
                                </button>
                                <button type="button" class="btn btn-sm btn-secondary d-none" id="cancelFrenchBtn" onclick="cancelEdit('fr')">
                                    <i class="fas fa-times" style="margin-right: 6px;"></i>Cancel
                                </button>
                            </div>
                            <button type="button" class="btn btn-sm btn-warning" onclick="regenerateTranslation('fr')">
                                <i class="fas fa-sync-alt" style="margin-right: 6px;"></i>Regenerate
                            </button>
                        </div>
                        <div id="frenchContent">
                            <!-- French translations will be loaded here -->
                        </div>
                    </div>

                    <!-- Spanish Tab -->
                    <div class="tab-pane fade" id="spanish" role="tabpanel" aria-labelledby="spanish-tab">
                        <div class="d-flex justify-content-between mb-3">
                            <div>
                                <button type="button" class="btn btn-sm btn-outline-primary" id="editSpanishBtn" onclick="editTranslation('es')">
                                    <i class="fas fa-edit" style="margin-right: 6px;"></i>Edit
                                </button>
                                <button type="button" class="btn btn-sm btn-success d-none" id="saveSpanishBtn" onclick="saveTranslation('es')">
                                    <i class="fas fa-save" style="margin-right: 6px;"></i>Save
                                </button>
                                <button type="button" class="btn btn-sm btn-secondary d-none" id="cancelSpanishBtn" onclick="cancelEdit('es')">
                                    <i class="fas fa-times" style="margin-right: 6px;"></i>Cancel
                                </button>
                            </div>
                            <button type="button" class="btn btn-sm btn-warning" onclick="regenerateTranslation('es')">
                                <i class="fas fa-sync-alt" style="margin-right: 6px;"></i>Regenerate
                            </button>
                        </div>
                        <div id="spanishContent">
                            <!-- Spanish translations will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="applyTranslations()">
                    <i class="fas fa-check" style="margin-right: 8px;"></i>Apply Translations
                </button>
            </div>
        </div>
    </div>
</div>

<style>
/* Simple Clean Styles */
.field-group {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 0.25rem;
}

.field-label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
    display: block;
}

.field-content {
    color: #212529;
    line-height: 1.6;
}

.field-content.empty {
    color: #6c757d;
    font-style: italic;
}

.field-editor {
    width: 100%;
    min-height: 80px;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    resize: vertical;
}

.field-editor:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

/* Fix tab styling - gray tabs with green for active */
#translationViewerModal .nav-tabs {
    border-bottom: 1px solid #dee2e6;
}

#translationViewerModal .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-bottom: none;
    background-color: #f8f9fa;
    color: #6c757d;
    margin-bottom: -1px;
    margin-right: 2px;
    padding: 0.5rem 1rem;
    font-weight: 500;
}

#translationViewerModal .nav-tabs .nav-link.active {
    border-color: #198754 #198754 #fff;
    border-bottom: 2px solid #198754;
    background-color: #fff;
    color: #198754;
    font-weight: 600;
}

#translationViewerModal .nav-tabs .nav-link:not(.active):hover {
    background-color: #e9ecef;
    color: #495057;
    border-bottom: none;
}
</style>

<script>
// Get current locale from the URL (if not already defined)
if (typeof locale === 'undefined') {
    var locale = '{{ app()->getLocale() }}' || 'en';
}

// Enhanced Translation Viewer Component
class TranslationViewer {
    constructor() {
        this.tempTranslations = {};
        this.originalTranslations = {};
        this.currentTab = 'english';
        this.editingMode = {};
        this.modal = null;
        
        this.init();
    }
    
    init() {
        // Initialize modal
        this.modal = new bootstrap.Modal(document.getElementById('translationViewerModal'));
        
        // Initialize tab switching
        this.initTabSwitching();
        
        // Initialize modal events
        this.initModalEvents();
    }
    
    initTabSwitching() {
        const tabButtons = document.querySelectorAll('#translationTabs [data-tab]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }
    
    initModalEvents() {
        const modalElement = document.getElementById('translationViewerModal');
        
        modalElement.addEventListener('hidden.bs.modal', () => {
            this.resetEditingStates();
        });
    }
    
    switchTab(tabName) {
        // Update button states
        document.querySelectorAll('#translationTabs .nav-link').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Update tab pane states
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        
        // Activate new tab
        const tabButton = document.getElementById(`${tabName}-tab`);
        const tabPane = document.getElementById(tabName);
        
        if (tabButton && tabPane) {
            tabButton.classList.add('active');
            tabButton.setAttribute('aria-selected', 'true');
            tabPane.classList.add('show', 'active');
        }
        
        this.currentTab = tabName;
    }
    
    show(translations) {
        // Store translations
        this.tempTranslations = JSON.parse(JSON.stringify(translations));
        this.originalTranslations = JSON.parse(JSON.stringify(translations));
        
        // Reset to first tab
        this.switchTab('english');
        
        // Load content for all tabs
        this.loadOriginalContent();
        this.loadTranslationContent('fr', 'frenchContent');
        this.loadTranslationContent('es', 'spanishContent');
        
        // Show modal
        this.modal.show();
    }
    
    hide() {
        this.modal.hide();
    }
    
    loadOriginalContent() {
        const originalContent = this.collectOriginalContent();
        const container = document.getElementById('englishContent');
        container.innerHTML = this.generateFieldsDisplay(originalContent, false);
    }
    
    loadTranslationContent(locale, containerId) {
        const container = document.getElementById(containerId);
        const translations = this.tempTranslations[locale];
        
        if (translations && Object.keys(translations).length > 0) {
            container.innerHTML = this.generateFieldsDisplay(translations, false);
        } else {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No ${locale === 'fr' ? 'French' : 'Spanish'} translation available. 
                    Click "Regenerate" to create a new translation.
                </div>
            `;
        }
    }
    
    generateFieldsDisplay(data, editable = false) {
        const fields = [
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            { key: 'short_description', label: 'Short Description' },
            { key: 'special_notes', label: 'Special Notes' },
            { key: 'pickup_info', label: 'Pickup Information' },
            { key: 'dealer_note', label: 'Dealer Note' },
            { key: 'meta_title', label: 'Meta Title' },
            { key: 'meta_description', label: 'Meta Description' }
        ];
        
        let html = '';
        fields.forEach(field => {
            const value = data[field.key] || '';
            const hasValue = value.trim().length > 0;
            
            html += `
                <div class="field-group">
                    <label class="field-label">${field.label}</label>
                    ${editable ? 
                        `<textarea class="field-editor translation-field" data-field="${field.key}" placeholder="Enter ${field.label.toLowerCase()}...">${value}</textarea>` :
                        `<div class="field-content ${!hasValue ? 'empty' : ''}">${hasValue ? value : 'Not provided'}</div>`
                    }
                </div>
            `;
        });
        
        return html;
    }
    
    collectOriginalContent() {
        const content = {};
        
        // Collect from title input
        const titleInput = document.querySelector('[name="title"]');
        if (titleInput) content.title = titleInput.value || '';
        
        // Collect from CKEditor instances (description, short_description, special_notes)
        // Check for ClassicEditor instances (newer CKEditor)
        if (window.editorInstances) {
            Object.keys(window.editorInstances).forEach(fieldName => {
                const editor = window.editorInstances[fieldName];
                if (editor && editor.getData) {
                    const data = editor.getData();
                    // Strip HTML tags for display
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    content[fieldName] = tempDiv.textContent || tempDiv.innerText || '';
                }
            });
        }
        
        // Fallback to old CKEDITOR if exists
        if (window.CKEDITOR && window.CKEDITOR.instances) {
            for (let instance in CKEDITOR.instances) {
                const editor = CKEDITOR.instances[instance];
                const fieldName = editor.element.$.name;
                if (fieldName && !content[fieldName]) {
                    // Strip HTML tags for display
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = editor.getData();
                    content[fieldName] = tempDiv.textContent || tempDiv.innerText || '';
                }
            }
        }
        
        // Try to get from textareas with class 'editor' if still not found
        document.querySelectorAll('textarea.editor').forEach(textarea => {
            const fieldName = textarea.name;
            if (fieldName && !content[fieldName]) {
                content[fieldName] = textarea.value || '';
            }
        });
        
        // Collect from all text fields and textareas
        const textFields = [
            'meta_title', 
            'meta_description', 
            'dealer_note',
            'pickup_info'
        ];
        
        textFields.forEach(field => {
            const element = document.querySelector(`[name="${field}"]`);
            if (element) {
                content[field] = element.value || '';
            }
        });
        
        // Ensure all expected fields exist (even if empty)
        const expectedFields = [
            'title', 
            'description', 
            'short_description', 
            'special_notes',
            'pickup_info',
            'meta_title', 
            'meta_description',
            'dealer_note'
        ];
        
        expectedFields.forEach(field => {
            if (!(field in content)) {
                content[field] = '';
            }
        });
        
        return content;
    }
    
    resetEditingStates() {
        this.editingMode = {};
        
        // Reset all button states
        ['fr', 'es'].forEach(locale => {
            const langName = locale === 'fr' ? 'French' : 'Spanish';
            const editBtn = document.getElementById(`edit${langName}Btn`);
            const saveBtn = document.getElementById(`save${langName}Btn`);
            const cancelBtn = document.getElementById(`cancel${langName}Btn`);
            
            if (editBtn) editBtn.classList.remove('d-none');
            if (saveBtn) saveBtn.classList.add('d-none');
            if (cancelBtn) cancelBtn.classList.add('d-none');
        });
    }
}

// Global instance
let translationViewer = new TranslationViewer();

// Global functions
function showTranslationViewer(translations) {
    translationViewer.show(translations);
}

function hideTranslationViewer() {
    translationViewer.hide();
}

function editTranslation(locale) {
    const langName = locale === 'fr' ? 'French' : 'Spanish';
    const containerId = locale === 'fr' ? 'frenchContent' : 'spanishContent';
    const data = translationViewer.tempTranslations[locale] || {};
    
    // Switch to editing mode
    translationViewer.editingMode[locale] = true;
    
    // Update content to editable
    document.getElementById(containerId).innerHTML = translationViewer.generateFieldsDisplay(data, true);
    
    // Update button states
    document.getElementById(`edit${langName}Btn`).classList.add('d-none');
    document.getElementById(`save${langName}Btn`).classList.remove('d-none');
    document.getElementById(`cancel${langName}Btn`).classList.remove('d-none');
}

function saveTranslation(locale) {
    const langName = locale === 'fr' ? 'French' : 'Spanish';
    const containerId = locale === 'fr' ? 'frenchContent' : 'spanishContent';
    const translations = {};
    
    // Collect edited values
    document.querySelectorAll(`#${containerId} .translation-field`).forEach(field => {
        translations[field.dataset.field] = field.value;
    });
    
    // Update translations
    translationViewer.tempTranslations[locale] = translations;
    
    // Switch back to view mode
    translationViewer.editingMode[locale] = false;
    translationViewer.loadTranslationContent(locale, containerId);
    
    // Update button states
    document.getElementById(`edit${langName}Btn`).classList.remove('d-none');
    document.getElementById(`save${langName}Btn`).classList.add('d-none');
    document.getElementById(`cancel${langName}Btn`).classList.add('d-none');
    
    // Show success message
    swal('Success', `${langName} translation saved successfully!`, 'success');
}

function cancelEdit(locale) {
    const langName = locale === 'fr' ? 'French' : 'Spanish';
    const containerId = locale === 'fr' ? 'frenchContent' : 'spanishContent';
    
    // Restore original content
    translationViewer.tempTranslations[locale] = JSON.parse(JSON.stringify(translationViewer.originalTranslations[locale] || {}));
    
    // Switch back to view mode
    translationViewer.editingMode[locale] = false;
    translationViewer.loadTranslationContent(locale, containerId);
    
    // Update button states
    document.getElementById(`edit${langName}Btn`).classList.remove('d-none');
    document.getElementById(`save${langName}Btn`).classList.add('d-none');
    document.getElementById(`cancel${langName}Btn`).classList.add('d-none');
}

function regenerateTranslation(locale) {
    const originalContent = translationViewer.collectOriginalContent();
    const fields = Object.keys(originalContent).filter(key => originalContent[key]);
    
    if (fields.length === 0) {
        swal('Warning', 'No content to translate. Please fill in the original fields first.', 'warning');
        return;
    }
    
    const langName = locale === 'fr' ? 'French' : 'Spanish';
    
    // Show loading state
    swal({
        title: 'Generating Translation',
        text: `Using AI to translate content to ${langName}...`,
        icon: 'info',
        buttons: false,
        closeOnClickOutside: false
    });
    
    // Generate translation
    generateTemporaryTranslation(originalContent, [locale], fields)
        .then(translations => {
            swal.close();
            if (translations && translations[locale]) {
                translationViewer.tempTranslations[locale] = translations[locale];
                translationViewer.originalTranslations[locale] = JSON.parse(JSON.stringify(translations[locale]));
                
                const containerId = locale === 'fr' ? 'frenchContent' : 'spanishContent';
                translationViewer.loadTranslationContent(locale, containerId);
                
                swal('Success', `${langName} translation generated successfully!`, 'success');
            }
        })
        .catch(error => {
            swal.close();
            swal('Error', 'Failed to generate translation. Please try again.', 'error');
            console.error('Translation error:', error);
        });
}

function applyTranslations() {
    // Store translations for later saving
    let translationsInput = document.getElementById('pendingTranslations');
    if (!translationsInput) {
        translationsInput = document.createElement('input');
        translationsInput.type = 'hidden';
        translationsInput.id = 'pendingTranslations';
        translationsInput.name = 'pending_translations';
        document.querySelector('form').appendChild(translationsInput);
    }
    
    translationsInput.value = JSON.stringify(translationViewer.tempTranslations);
    
    // Update UI badges
    updateTranslationBadges(translationViewer.tempTranslations);
    
    // Hide modal
    translationViewer.hide();
    
    // Show success message
    swal('Success', 'Translations have been applied and will be saved with the listing.', 'success');
}

function updateTranslationBadges(translations) {
    const frBadge = document.getElementById('tempTranslationStatusFr');
    const esBadge = document.getElementById('tempTranslationStatusEs');
    
    // Only update if elements exist (they might not exist on all pages)
    if (frBadge && translations && translations.fr && Object.keys(translations.fr).length > 0) {
        frBadge.className = 'badge rounded-pill bg-success bg-opacity-75 px-3 py-2';
        frBadge.innerHTML = '<i class="fas fa-check-circle me-1"></i> French (Ready)';
    }
    
    if (esBadge && translations && translations.es && Object.keys(translations.es).length > 0) {
        esBadge.className = 'badge rounded-pill bg-success bg-opacity-75 px-3 py-2';
        esBadge.innerHTML = '<i class="fas fa-check-circle me-1"></i> Spanish (Ready)';
    }
}

// API function for generating temporary translations
async function generateTemporaryTranslation(content, locales, fields) {
    const response = await fetch(`/listings/translate-preview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            content: content,
            locales: locales,
            fields: fields
        })
    });
    
    const data = await response.json();
    if (data.status === 'success') {
        return data.translations;
    } else {
        throw new Error(data.message || 'Translation failed');
    }
}
</script>