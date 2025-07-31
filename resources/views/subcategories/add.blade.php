@extends($layout)

@section('title', 'Add Subcategory')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Add Subcategory</h3>
                <div class="nk-block-des text-soft">
                    <p>Add the informations of new subcategory.</p>
                </div>
            </div>
            <div>
                <a href="{{ route('subcategories.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
            </div>
        </div>
</div>
<form action="{{ route('subcategories.insert') }}" method="post" enctype="multipart/form-data">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new subcategory has been created.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-6">
                    <div class="form-group">
                         <label class="form-label" for="subcategory">Category <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                             <select class="form-control select2-single" name="id_category">
                                <option value="-1">-Choose category-</option>
                                @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->category }}</option>
                                @endforeach
                             </select>
                             @error('id_category')
                            <small class="error">Invalid category</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-6">
                    <div class="form-group">
                         <label class="form-label" for="subcategory">Subategory <span class="lbl-obligatoire">*</span></label>
                         <div class="form-control-wrap">
                             <input type="text" class="form-control @error('brand') is-invalid @enderror" name="subcategory" id="subcategory" placeholder="Subcategory" value="{{ old('category') }}"/>
                             @error('subcategory')
                            <small class="error">Invalid subcategory</small>
                            @enderror
                         </div>
                     </div>
                 </div>
                <div class="col-md-12">
                    <div class="form-group">
                         <label class="form-label" for="short_description">Description</label>
                         <div class="form-control-wrap">
                             <textarea class="form-control" name="short_description">{{ old('short_description') }}</textarea>
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
                 <div class="col-12">
                    <h5>Options</h5>
                    <table class="table table-bordered" id="options-table">
                        <thead>
                            <tr>
                                <th>Option Name</th>
                                <th><button type="button" id="add-option" class="btn btn-success btn-sm">+ Add Option</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                 </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-2">
                <button type="submit" class="btn-signup">Save</button>
            </div>
        </div>
    </div>
</div>
</form>
<script>
    $('#add-option').click(function(){
        const newOption = `
                        <tr>
                            <td><input type="text" name="options[]" class="form-control" required></td>
                            <td>
                              <button type="button" class="btn btn-sm remove-option" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
        $('#options-table > tbody').append(newOption);
    });

    $('body').on('click', '.remove-option', function(){
        $(this).closest('tr').remove();
    });
</script>
@endsection