@extends($layout)

@section('title', 'Add Article')

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
            <h3 class="nk-block-title page-title">Add Article</h3>
            <div class="nk-block-des text-soft">
                <p>Add the informations of new article.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('articles.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<form action="{{ route('articles.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('inserted'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new article has been created.
                    </div>
                </div>
                @endif
                <div class="row gy-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="title">Title <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" id="title" placeholder="Title" value="{{ old('title') }}" />
                                @error('title')
                                <small class="error">Invalid title</small>
                                @enderror
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
                                <textarea class="form-control" name="short_description">{{ old('short_description') }}</textarea>
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
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="meta_title">Meta Title</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('meta_title') is-invalid @enderror" name="meta_title" id="meta_title" value="{{ old('meta_title') }}" placeholder="Meta Title" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="meta_description">Meta Description</label>
                            <div class="form-control-wrap">
                                <textarea class="form-control no-resize" name="meta_description" id="meta_description" value="{{ old('meta_description') }}" placeholder="Meta Description" rows="6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="schema_markup">Schema Markup (JSON-LD)</label>
                            <div class="form-control-wrap">
                                <textarea class="form-control no-resize" name="schema" id="schema" value="{{ old('schema') }}" placeholder="Schema Markup (JSON-LD)" rows="6"></textarea>
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
<script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
<script>
    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .catch(error => {
                console.error(error);
            });
    });

</script>
@endsection
