@extends($layout)

@section('title', 'Add Category')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Add Category</h3>
                <div class="nk-block-des text-soft">
                    <p>Add the informations of new category.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('categories.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('categories.insert') }}" method="post" enctype="multipart/form-data">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new category has been created.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="category">Category <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                             <input type="text" class="form-control @error('brand') is-invalid @enderror" name="category" id="category" placeholder="Category (Car Rental, Private Car with Driver...etc)" value="{{ old('category') }}"/>
                             @error('category')
                            <small class="error">Invalid category</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="short_description">Description</label>
                         <div class="form-control-wrap">
                             <textarea class="form-control" name="short_description" value="{{ old('short_description') }}"></textarea>
                         </div>
                     </div> 
                 </div>
                <div class="col-md-6">
                    <div class="form-group">
                         <label class="form-label" for="logo">Logo</label>
                         <div class="form-control-wrap">
                             <input type="file" class="form-control" name="logo" id="logo" placeholder="Logo" accept="image/png, image/gif, image/jpeg"/>
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
@endsection