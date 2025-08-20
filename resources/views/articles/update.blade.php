@extends($layout)

@section('title', 'Edit Article')

@section('content')
<style>
    .ck-editor__editable_inline {
        height: 220px !important;
        resize: none;
        overflow-y: auto;
    }

</style>
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Edit Article</h3>
            <div class="nk-block-des text-soft">
                <p>Edit the informations of article.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('articles.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<form action="{{ route('articles.update') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('updated'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. the informations of article has been updated.
                    </div>
                </div>
                @endif
                <div class="row gy-4">
                    <input type="hidden" name="id" value="{{ $article->id }}"/> 
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="title">Title <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" id="title" placeholder="Title" value="{{ old('title') ?? $article->title }}" />
                            @error('title')
                            <small class="error">Invalid title</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="category_id">Category</label>
                        <div class="form-control-wrap">
                            <select class="form-control" name="category_id" id="category_id">
                                <option value="">--Choose Category--</option>
                                @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ (old('category_id') ?? $article->category_id) == $category->id ? 'selected' : '' }}>{{ $category->category }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="featured_img">Featured Image</label>
                        <div class="form-control-wrap">
                            <input type="file" class="form-control" name="featured_img" id="featured_img" placeholder="Image" accept="image/png, image/webp, image/jpeg" />
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="short_description">Short Description</label>
                        <div class="form-control-wrap">
                            <textarea class="form-control" name="short_description">{{ old('short_description') ?? $article->short_description }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="content">Content</label>
                        <div class="form-control-wrap">
                            <textarea class="form-control editor" name="content">{{ old('content') ?? $article->content }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="meta_title">Meta Title</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control @error('meta_title') is-invalid @enderror" name="meta_title" id="meta_title" value="{{ old('meta_title') ?? $article->meta_title }}" placeholder="Meta Title" />
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="meta_description">Meta Description</label>
                        <div class="form-control-wrap">
                            <textarea class="form-control no-resize" name="meta_description" id="meta_description"  placeholder="Meta Description" rows="6">{{ old('meta_description') ?? $article->meta_description }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="schema_markup">Schema Markup (JSON-LD)</label>
                        <div class="form-control-wrap">
                            <textarea class="form-control no-resize" name="schema" id="schema" placeholder="Schema Markup (JSON-LD)" rows="6">{{ old('schema') ?? $article->schema }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-2">
                <button type="submit" class="btn-signup">Save</button>
            </div>
        </div>
    </div>
    
    {{-- Translation UI Components --}}
    @include('articles.partials.ai-translation-generator')
    @include('articles.partials.translation-viewer')
    </div>
    
    {{-- Pass existing translations to JavaScript --}}
    <script>
        window.existingArticleTranslations = @json($article->translations->keyBy('locale')->toArray());
        
        // Check if article has existing translations on page load
        document.addEventListener('DOMContentLoaded', function() {
            if (window.existingArticleTranslations && Object.keys(window.existingArticleTranslations).length > 0) {
                // Show the view button for existing translations
                document.getElementById('viewExistingTranslationsBtn').style.display = 'inline-block';
            }
        });
    </script>
</form>
<script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
<script>
    // Initialize global editor instances storage
    window.editorInstances = {};
    
    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .then(editor => {
                // Store the editor instance with the field name as key
                const fieldName = element.getAttribute('name');
                if (fieldName) {
                    window.editorInstances[fieldName] = editor;
                }
                
                // Also store on the editable element (CKEditor 5 standard)
                const editable = editor.editing.view.document.getRoot();
                const editableElement = editor.sourceElement.nextElementSibling.querySelector('.ck-editor__editable');
                if (editableElement) {
                    editableElement.ckeditorInstance = editor;
                }
                
                console.log('Editor initialized for field:', fieldName);
            })
            .catch(error => {
                console.error('Error initializing editor:', error);
            });
    });

</script>
@endsection
