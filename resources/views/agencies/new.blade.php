@extends('layouts.dashboard_admin')

@section('title', 'Add agency')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Add agency</h3>
            <div class="nk-block-des text-soft">
                <p>Add informations of new agency.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('agencies.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<style>
    .ck-editor__editable_inline {
        height: 220px !important;  /* Fixed height */
        resize: none;
        overflow-y: auto;
    }
</style>
<form action="{{ route('agencies.insert') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('inserted'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. new agency has been created.
                    </div>
                </div>
                @endif
                <div class="row gy-4">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="agency_name">Agency Name <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('agency_name') is-invalid @enderror" name="agency_name" id="agency_name" value="{{ old('agency_name') }}" placeholder="Agency Name" />
                                @error('agency_name')
                                <small class="error">Required field.</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="slug">Slug (auto-generated)</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="slug" id="slug" value="{{ old('slug') }}" placeholder="Slug will be auto-generated" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="id_city">City <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="id_city" id="id_city">
                                    <option value="-1">Choose option</option>
                                    @foreach($cities as $city)
                                    <option value="{{ $city->id }}">{{ $city->city_name }}</option>
                                    @endforeach
                                </select>
                                @error('id_city')
                                <small class="error">Required field.</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="category_id">Category <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="category_id" id="category_id">
                                    <option value="-1">Choose option</option>
                                    @foreach($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->category }}</option>
                                    @endforeach
                                </select>
                                @error('category_id')
                                <small class="error">Required field.</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="contact_name">Contact Name</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="contact_name" id="contact_name" value="{{ old('contact_name') }}" placeholder="Contact Name" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="phone_number">Phone Number</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="phone_number" id="phone_number" value="{{ old('phone_number') }}" placeholder="Phone Number" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="whatsapp">Whatsapp</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="whatsapp" id="whatsapp" value="{{ old('whatsapp') }}" placeholder="Whatsapp" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="email" id="email" value="{{ old('email') }}" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="notes">Notes</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="notes" id="notes" value="{{ old('notes') }}" placeholder="Notes" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="ice_number">ICE Number</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="ice_number" id="ice_number" value="{{ old('ice_number') }}" placeholder="ICE Number" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label" for="rc_number">RC Number</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="rc_number" id="rc_number" value="{{ old('rc_number') }}" placeholder="RC Number" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <h5>Subcategories</h5>
                        <table class="table table-bordered" id="subcategories-table">
                            <thead>
                                <tr>
                                    <th>Subcategory</th>
                                    <th>Option</th>
                                    <th width="200"><button type="button" id="add-subcategory" class="btn btn-success btn-sm">+ Add Option</button></th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="col-12">
                        <h5>Features</h5>
                        <table class="table table-bordered" id="features-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Icon (60px X 60px)</th>
                                    <th width="200"><button type="button" id="add-feature" class="btn btn-success btn-sm">+ Add Option</button></th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label" for="logo">Agency Logo</label>
                            <div class="form-control-wrap">
                                <div class="alert alert-info mb-2" style="padding: 8px 12px; font-size: 13px;">
                                    <i class="fa fa-info-circle"></i> <strong>Recommended:</strong> Square image (1:1 ratio)
                                    <br><small>Example: 500x500px, 800x800px, 1000x1000px</small>
                                </div>
                                <div id="logo-preview" style="display: none; margin-bottom: 10px;">
                                    <img id="preview-image" src="" alt="Logo Preview" style="max-height: 100px; max-width: 200px; display: block; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">
                                    <div id="aspect-ratio-warning" class="text-warning mt-1" style="display: none; font-size: 12px;">
                                        <i class="fa fa-warning"></i> Image is not square (1:1 ratio)
                                    </div>
                                </div>
                                <input type="file" class="form-control" name="logo" id="logo" placeholder="Logo" accept="image/png, image/webp, image/jpeg" onchange="previewLogo(this)" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="short_description" class="form-label">Short Description</label>
                            <textarea class="form-control editor" rows="8" name="short_description"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="short_description" class="form-label">Description</label>
                            <textarea class="form-control editor" rows="8" name="description"></textarea>
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
        $(document).ready(function(){
            let subcategoriesOptions = '<option value="">Choose Subcategory</option>';

            $('#category_id').change(function(){
                const category_id = $(this).val();

                $.ajax({
                    type: 'post',
                    url: '{{ route("categories.getSubcategories") }}',
                    data: {category_id: category_id},
                    dataType: 'json',
                    success: function(resp){
                        let options = '<option value="">Choose Subcategory</option>';
                        resp.forEach(function (sub) {
                            options += `<option value="${sub.id}">${sub.subcategory}</option>`;
                        });

                        subcategoriesOptions = options;
                        $('.subcategory').html(options);
                        $('.ctm-option').html('<option value="">Choose Option</option>');
                    }
                });
            });

            $('body').on('change', '.subcategory', function(){
                const subcategory_id = $(this).val();
                const current = $(this);

                $.ajax({
                    type: 'post',
                    url: '{{ route("subcategories.getOptions") }}',
                    data: {subcategory_id: subcategory_id},
                    dataType: 'json',
                    success: function(resp){
                        let options = '<option value="">Choose Option</option>';
                        resp.forEach(function (opt) {
                            options += `<option value="${opt.id}">${opt.option}</option>`;
                        });

                        $(current).closest('tr').find('.ctm-option').html(options);
                    }
                });
            });

    $('#add-feature').click(function(){
        const newOption = `
                        <tr>
                            <td>
                                <input type="text" name="features[]" class="form-control" required>
                            </td>
                            <td>
                                <input type="file" name="features_icon[]" class="form-control-file" accept=".png,.jpg,.jpeg,.webp,.svg" required>
                            </td>
                            <td>
                              <button type="button" class="btn btn-sm remove-feature" style="color:#ff313b;">
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                        </tr>
                    `;
            $('#features-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-feature', function(){
            $(this).closest('tr').remove();
        });

        $('#add-subcategory').click(function(){
            const newOption = `
                            <tr>
                                <td>
                                    <select name="subcategories[]" class="form-control subcategory" required>
                                        ${subcategoriesOptions}
                                    </select>
                                </td>
                                <td>
                                    <select name="options[]" class="form-control ctm-option">
                                        <option value="">Choose Option</option>
                                    </select>
                                </td>
                                <td>
                                <button type="button" class="btn btn-sm remove-subcategory" style="color:#ff313b;">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                                </td>
                            </tr>
                        `;
            $('#subcategories-table > tbody').append(newOption);
        });

        $('body').on('click', '.remove-subcategory', function(){
            $(this).closest('tr').remove();
        });
    });
    
    // Preview logo function
    function previewLogo(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview-image').attr('src', e.target.result);
                $('#logo-preview').show();
                
                // Check aspect ratio
                var img = new Image();
                img.onload = function() {
                    var width = this.width;
                    var height = this.height;
                    var ratio = width / height;
                    
                    // Check if image is square (1:1 ratio with 5% tolerance)
                    if (ratio < 0.95 || ratio > 1.05) {
                        $('#aspect-ratio-warning').show();
                    } else {
                        $('#aspect-ratio-warning').hide();
                    }
                };
                img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    document.querySelectorAll('.editor').forEach((element) => {
        ClassicEditor
            .create(element)
            .catch(error => {
                console.error(error);
            });
    });
</script>
@endsection
