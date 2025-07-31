@extends($layout)

@section('title', 'Add Page')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Add Page</h3>
            <div class="nk-block-des text-soft">
                <p>Add page SEO info and content sections.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('pages.list') }}" class="btn-signup btn-back">
                <i class="fa-solid fa-chevron-left"></i>
            </a>
        </div>
    </div>
</div>

<form action="{{ route('pages.insert') }}" method="POST">
    @csrf

    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">

                @if(session('inserted'))
                <div class="alert alert-success">
                    <em class="icon ni ni-check-circle"></em> <strong>Success!</strong> Page added.
                </div>
                @endif

                <div class="row gy-4">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Slug <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('slug') is-invalid @enderror" name="slug" value="{{ old('slug') }}" placeholder="page-slug">
                                @error('slug')
                                <small class="text-danger">Slug is required and must be unique.</small>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Meta Title</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="meta_title" value="{{ old('meta_title') }}">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Meta Description</label>
                            <div class="form-control-wrap">
                                <textarea class="form-control" name="meta_description">{{ old('meta_description') }}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Schema Markup (JSON-LD)</label>
                            <div class="form-control-wrap">
                                <textarea class="form-control" name="schema_markup">{{ old('schema_markup') }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <hr>
                <h5>Content Sections</h5>
                <div id="sections-wrapper">
                    @if(old('content_sections'))
                    @foreach(old('content_sections') as $index => $section)
                    <div class="section-item border p-3 mb-2">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" name="content_sections[{{ $index }}][title]" class="form-control" value="{{ $section['title'] ?? '' }}">
                        </div>
                        <div class="form-group">
                            <label>Text</label>
                            <textarea name="content_sections[{{ $index }}][text]" class="form-control">{{ $section['text'] ?? '' }}</textarea>
                        </div>
                        <button type="button" class="btn btn-sm btn-danger mt-2 remove-section">Remove</button>
                    </div>
                    @endforeach
                    @endif
                </div>

                <button type="button" class="btn btn-outline-primary mt-3" id="add-section">+ Add Section</button>

                <div class="d-flex justify-content-end align-items-center mt-4">
                    <button type="submit" class="btn-signup">Save</button>
                </div>
            </div>
        </div>
    </div>
</form>
<script>
    let sectionIndex = {{
            old('content_sections') ? count(old('content_sections')) : 0
        }};

    document.getElementById('add-section').addEventListener('click', function() {
        const wrapper = document.getElementById('sections-wrapper');
        const section = document.createElement('div');
        section.classList.add('section-item', 'border', 'p-3', 'mb-2');
        section.innerHTML = `
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="content_sections[${sectionIndex}][title]" class="form-control">
            </div>
            <div class="form-group">
                <label>Text</label>
                <textarea name="content_sections[${sectionIndex}][text]" class="form-control"></textarea>
            </div>
            <button type="button" class="btn btn-sm btn-danger mt-2 remove-section">Remove</button>
        `;
        wrapper.appendChild(section);
        sectionIndex++;
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-section')) {
            e.target.closest('.section-item').remove();
        }
    });

</script>
@endsection
