@extends($layout)

@section('title', 'Edit Coupon')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Edit Coupon</h3>
            <div class="nk-block-des text-soft">
                <p>Edit the informations of coupon.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('coupons.list') }}" class="btn-signup btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        </div>
    </div>
</div>
<form action="{{ route('coupons.update') }}" method="post" enctype="multipart/form-data">
    @csrf
    <input type="hidden" name="id" value="{{ $coupon->id }}" />
    <div class="card card-preview">
        <div class="card-inner">
            <div class="preview-block">
                @if(session('updated'))
                <div class="example-alert mb-3">
                    <div class="alert alert-success alert-icon">
                        <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. coupon has been updated.
                    </div>
                </div>
                @endif
                <div class="row gy-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="coupon_code">Coupon Code <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control @error('coupon_code') is-invalid @enderror" name="coupon_code" id="coupon_code" placeholder="Coupon Code" value="{{ old('coupon_code') ?? $coupon->coupon_code }}" />
                                @error('coupon_code')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="categories">Categories</label>
                            <div class="form-control-wrap">
                                @php
                                $selectedCategories = explode(',', $coupon->categories) ?? [];
                                @endphp
                                <select class="form-control select2-single" name="categories[]" multiple>
                                    @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ in_array($category->id, $selectedCategories) ? 'selected' : '' }}>{{ $category->category }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="discount_type">Discount Type <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="discount_type">
                                    <option value="fixed_price" {{ $coupon->discount_type == 'fixed_price' ? 'selected' : '' }}>Fixed Price</option>
                                    <option value="pourcentage" {{ $coupon->discount_type == 'pourcentage' ? 'selected' : '' }}>Pourcentage</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="discount_value">Discount Value <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="number" step="any" class="form-control @error('discount_value') is-invalid @enderror" name="discount_value" id="discount_value" value="{{ old('discount_value') ?? $coupon->discount_value }}" />
                                @error('discount_value')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="valid_from">Valid From</label>
                            <div class="form-control-wrap">
                                <input type="date" class="form-control @error('valid_from') is-invalid @enderror" name="valid_from" id="valid_from" value="{{ old('valid_from') ?? $coupon->valid_from }}" />
                                @error('valid_from')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="valid_untill">Valid Untill</label>
                            <div class="form-control-wrap">
                                <input type="date" class="form-control @error('valid_untill') is-invalid @enderror" name="valid_untill" id="valid_untill" value="{{ old('valid_untill') ?? $coupon->valid_untill }}" />
                                @error('valid_untill')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="usage_limit">Usage Limit</label>
                            <div class="form-control-wrap">
                                <input type="number" step="1" class="form-control @error('usage_limit') is-invalid @enderror" name="usage_limit" id="usage_limit" value="{{ old('usage_limit') ?? $coupon->usage_limit }}" placeholder="Usage Limit" />
                                @error('usage_limit')
                                <small class="error">{{ $message }}</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label" for="status">Status <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="status">
                                    <option value="Active" {{ $coupon->status == 'Active' ? 'selected' : '' }}>Active</option>
                                    <option value="Inactive" {{ $coupon->status == 'Inactive' ? 'selected' : '' }}>Inactive</option>
                                </select>
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
