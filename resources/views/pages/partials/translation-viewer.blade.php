{{-- Translation Viewer Modal for Pages - Simple Clean Design --}}
<div class="modal fade" id="pageTranslationViewerModal" tabindex="-1" aria-labelledby="pageTranslationViewerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="pageTranslationViewerModalLabel">
                    <i class="fas fa-language me-2"></i>
                    Page Translation Manager
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body">
                <!-- Simple Tab Navigation -->
                <ul class="nav nav-tabs mb-3" id="pageTranslationTabs" role="tablist">
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
                <div class="tab-content" id="pageTranslationTabContent">
                    <!-- English Tab -->
                    <div class="tab-pane fade show active" id="english" role="tabpanel" aria-labelledby="english-tab">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            This is the original English content from your form.
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="english-meta_title" readonly>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="english-meta_description" readonly></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content Sections</label>
                                <div id="english-content-sections" class="border rounded p-3 bg-light">
                                    <!-- Content sections will be populated here -->
                                </div>
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
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="french-meta_title">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="french-meta_description"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content Sections</label>
                                <div id="french-content-sections">
                                    <!-- French content sections will be populated here -->
                                </div>
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
                        </div>
                        
                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Title</label>
                                <input type="text" class="form-control" id="spanish-meta_title">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Meta Description</label>
                                <textarea class="form-control" rows="2" id="spanish-meta_description"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-bold">Content Sections</label>
                                <div id="spanish-content-sections">
                                    <!-- Spanish content sections will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="applyPageTranslationsFromModal()">
                    <i class="fas fa-check me-2"></i>Apply Translations
                </button>
            </div>
        </div>
    </div>
</div>

<script>
// Page translation modal functions
let currentPageTranslations = {};

function showPageTranslationModal(translations) {
    currentPageTranslations = translations || {};
    
    // Get original content from form
    const originalContent = collectPageFormContent();
    console.log('Original page content collected:', originalContent);
    
    // Populate English tab with original content
    document.getElementById('english-meta_title').value = originalContent.meta_title || '';
    document.getElementById('english-meta_description').value = originalContent.meta_description || '';
    
    // Display English content sections as read-only
    displayContentSections('english', originalContent.content_sections || []);
    
    // Populate translated content
    const localeMap = { 'fr': 'french', 'es': 'spanish' };
    ['fr', 'es'].forEach(locale => {
        const tabName = localeMap[locale];
        const translation = translations[locale] || {};
        
        document.getElementById(`${tabName}-meta_title`).value = translation.meta_title || '';
        document.getElementById(`${tabName}-meta_description`).value = translation.meta_description || '';
        
        // Display editable content sections
        displayEditableContentSections(tabName, translation.content_sections || []);
    });
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('pageTranslationViewerModal'));
    modal.show();
}

// Display content sections for view (English tab)
function displayContentSections(locale, sections) {
    const container = document.getElementById(`${locale}-content-sections`);
    
    if (!sections || sections.length === 0) {
        container.innerHTML = '<em class="text-muted">No content sections</em>';
        return;
    }
    
    container.innerHTML = sections.map((section, index) => `
        <div class="border rounded p-3 mb-2 bg-white">
            <h6 class="fw-bold">${section.title || 'Untitled'}</h6>
            <p class="mb-0">${section.text || 'No content'}</p>
        </div>
    `).join('');
}

// Display editable content sections for translations
function displayEditableContentSections(locale, sections) {
    const container = document.getElementById(`${locale}-content-sections`);
    
    container.innerHTML = `
        <div id="${locale}-sections-wrapper">
            ${(sections || []).map((section, index) => `
                <div class="section-item border rounded p-3 mb-2">
                    <div class="form-group mb-2">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control section-title" value="${section.title || ''}" data-index="${index}">
                    </div>
                    <div class="form-group mb-2">
                        <label class="form-label">Text</label>
                        <textarea class="form-control section-text" rows="3" data-index="${index}">${section.text || ''}</textarea>
                    </div>
                    <button type="button" class="btn btn-sm btn-danger" onclick="removeTranslationSection('${locale}', ${index})">
                        <i class="fas fa-trash me-1"></i>Remove
                    </button>
                </div>
            `).join('')}
        </div>
        <button type="button" class="btn btn-outline-primary btn-sm mt-2" onclick="addTranslationSection('${locale}')">
            <i class="fas fa-plus me-1"></i>Add Section
        </button>
    `;
}

// Add new content section for translation
function addTranslationSection(locale) {
    const wrapper = document.getElementById(`${locale}-sections-wrapper`);
    const existingSections = wrapper.querySelectorAll('.section-item');
    const newIndex = existingSections.length;
    
    const newSection = document.createElement('div');
    newSection.className = 'section-item border rounded p-3 mb-2';
    newSection.innerHTML = `
        <div class="form-group mb-2">
            <label class="form-label">Title</label>
            <input type="text" class="form-control section-title" value="" data-index="${newIndex}">
        </div>
        <div class="form-group mb-2">
            <label class="form-label">Text</label>
            <textarea class="form-control section-text" rows="3" data-index="${newIndex}"></textarea>
        </div>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeTranslationSection('${locale}', ${newIndex})">
            <i class="fas fa-trash me-1"></i>Remove
        </button>
    `;
    wrapper.appendChild(newSection);
}

// Remove content section from translation
function removeTranslationSection(locale, index) {
    const wrapper = document.getElementById(`${locale}-sections-wrapper`);
    const sections = wrapper.querySelectorAll('.section-item');
    if (sections[index]) {
        sections[index].remove();
        
        // Re-index remaining sections
        wrapper.querySelectorAll('.section-item').forEach((section, newIndex) => {
            section.querySelectorAll('[data-index]').forEach(input => {
                input.setAttribute('data-index', newIndex);
            });
            const removeBtn = section.querySelector('.btn-danger');
            removeBtn.setAttribute('onclick', `removeTranslationSection('${locale}', ${newIndex})`);
        });
    }
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#pageTranslationTabs button[data-tab]');
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

function applyPageTranslationsFromModal() {
    // Collect all edited translations from the modal
    const localeMap = { 'french': 'fr', 'spanish': 'es' };
    const updatedTranslations = {};
    
    Object.keys(localeMap).forEach(tabName => {
        const locale = localeMap[tabName];
        updatedTranslations[locale] = {};
        
        // Get meta fields
        updatedTranslations[locale].meta_title = document.getElementById(`${tabName}-meta_title`).value;
        updatedTranslations[locale].meta_description = document.getElementById(`${tabName}-meta_description`).value;
        
        // Get content sections
        const wrapper = document.getElementById(`${tabName}-sections-wrapper`);
        const sections = [];
        wrapper.querySelectorAll('.section-item').forEach(sectionDiv => {
            const title = sectionDiv.querySelector('.section-title').value;
            const text = sectionDiv.querySelector('.section-text').value;
            if (title || text) {
                sections.push({ title, text });
            }
        });
        updatedTranslations[locale].content_sections = sections;
    });
    
    // Apply the translations (store in hidden input for form submission)
    applyPageTranslations(updatedTranslations);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('pageTranslationViewerModal'));
    modal.hide();
}
</script>