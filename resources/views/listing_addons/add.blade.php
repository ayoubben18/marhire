@extends($layout)

@section('title', 'Add Addon')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Add Addon</h3>
                <div class="nk-block-des text-soft">
                    <p>Add the informations of new addon.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('listingaddons.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('listingaddons.insert') }}" method="post" enctype="multipart/form-data">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new addon has been created.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="addon">Addon <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                            <input type="text" class="form-control @error('addon') is-invalid @enderror" name="addon" id="addon" placeholder="Addon" value="{{ old('addon') }}"/>
                            @error('addon')
                            <small class="error">{{ $message }}</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="category_id">Category <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                            <select class="form-control select2-single" name="category_id" id="category_id">
                                <option value="" disabled selected>--Choose Option--</option>
                                @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->category }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                            <small class="error">Invalid category</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="price">Price <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                             <input type="number" step="any" class="form-control @error('price') is-invalid @enderror" name="price" id="price" value="{{ old('price') }}" />
                             @error('price')
                                <small class="error">Invalid Price</small>
                            @enderror
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