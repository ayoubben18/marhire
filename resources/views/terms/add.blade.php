@extends($layout)

@section('title', 'Add Term')

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
                <h3 class="nk-block-title page-title">Add Term</h3>
                <div class="nk-block-des text-soft">
                    <p>Add the informations of new term.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('terms.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('terms.insert') }}" method="post" enctype="multipart/form-data">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new term has been created.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-6">
                    <div class="form-group">
                         <label class="form-label" for="title">Title <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                             <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" id="title" placeholder="Title" value="{{ old('title') }}"/>
                             @error('title')
                            <small class="error">Invalid title</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="content">Content</label>
                         <div class="form-control-wrap">
                             <textarea class="form-control editor" name="content">{{ old('content') }}</textarea>
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

@include('terms.partials.ai-translation-generator')
@include('terms.partials.translation-viewer')

</form>
<script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
<script>
    // Initialize window.editorInstances if not exists
    if (!window.editorInstances) {
        window.editorInstances = {};
    }

    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .then(editor => {
                // Store editor instance globally
                const fieldName = element.getAttribute('name') || element.id || 'content';
                window.editorInstances[fieldName] = editor;
                console.log(`CKEditor instance '${fieldName}' stored globally`);
            })
            .catch(error => {
                console.error(error);
            });
    });
</script>
@endsection