@extends('layouts.dashboard_admin')

@section('title', 'Settings')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Settings</h3>
                <div class="nk-block-des text-soft">
                    <p>Set your business informations.</p>
                </div>
            </div>
        </div>
</div>
<h1>{{ config('theme.color1')}}</h1>
<form action="{{ route('parametrage.save') }}" method="post" enctype="multipart/form-data">
@csrf
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            @if(session('inserted'))
            <div class="example-alert mb-3">
                <div class="alert alert-success alert-icon">
                    <em class="icon ni ni-check-circle"></em> <strong>Success</strong>.Business informations has been updated successfully.
                </div>
            </div>
            @endif
            <div class="row gy-4">
                <div class="col-md-12">
                    <div class="profile-img-container">
                        <div class="profile-img">
                            <img class='pr-img soc' style="object-fit:contain;" src="{{ asset($societe->logo) }}">
                        </div>
                        <div class="upload-img-container">
                             <button onclick="$('.file-upload-input').trigger( 'click' )" class="btn profile-upload-btn" type="button"><i class="fa-solid fa-camera"></i></button>
                        </div>
                        <input class="file-upload-input" name="image" type="file" accept="image/png, image/gif, image/jpeg" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="code_suivi">Business name <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control @error('raison_sociale') is-invalid @enderror" value="{{ (isset($societe->raison_sociale))?$societe->raison_sociale:'' }}" name="raison_sociale" id="raison_sociale" placeholder="Business name">
                            @error('raison_sociale')
                            <small class="error"> {{ $message }}</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="email">Email <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="email" class="form-control @error('email') is-invalid @enderror" value="{{ (isset($societe->email))?$societe->email:'' }}" name="email" id="email" placeholder="Email">
                            @error('email')
                            <small class="error"> {{ $message }}</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="addresse">Address</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ (isset($societe->addresse))?$societe->addresse:'' }}" name="addresse" id="addresse" placeholder="Address">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="telephone">Phone number <span class="lbl-obligatoire">*</span></label>
                        <div class="form-control-wrap">
                            <input type="tel" class="form-control @error('telephone') is-invalid @enderror" value="{{ (isset($societe->telephone))?$societe->telephone:'' }}" name="telephone" id="telephone" placeholder="Phone number">
                            @error('telephone')
                            <small class="error"> {{ $message }}</small>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="sitezeb">Website</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ (isset($societe->siteweb))?$societe->siteweb:'' }}" name="siteweb" id="siteweb" placeholder="Website">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="whatsapp">Whatsapp</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ isset($societe->whatsapp) ? $societe->whatsapp : '' }}" name="whatsapp" id="whatsapp" placeholder="Whatsapp">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="instagram">Instagram</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ isset($societe->instagram) ? $societe->instagram : '' }}" name="instagram" id="instagram" placeholder="Instagram" >
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="facebook">Facebook</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ isset($societe->facebook) ? $societe->facebook : '' }}" name="facebook" id="facebook" placeholder="Facebook">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="twitter">Twitter</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ isset($societe->twitter) ? $societe->twitter : '' }}" name="twitter" id="twitter" placeholder="Twitter" >
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label" for="youtube">Youtube</label>
                        <div class="form-control-wrap">
                            <input type="text" class="form-control" value="{{ isset($societe->youtube) ? $societe->youtube : '' }}" name="youtube" id="youtube" placeholder="Youtube" >
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label" for="">Coulers</label>
                        <div class="form-control-wrap d-flex">
                            <div class="container-color">
                                <input type="color" class="color-picker" id="color-picker1" name="color1" value="{{ $societe->color1 }}"/>
                                <span class="color-value">{{ $societe->color1 }}</span>
                            </div>
                            <div class="container-color">
                                <input type="color" class="color-picker" id="color-picker2" name="color2" value="{{ $societe->color2 }}"/>
                                <span class="color-value">{{ $societe->color2 }}</span>
                            </div>
                            <div class="container-color">
                                <input type="color" class="color-picker" name="color3" value="{{ $societe->color3 }}"/>
                                <span class="color-value">{{ $societe->color3 }}</span>
                            </div>
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
<script>
    $(".color-picker").change(function(){
        $(this).parent().find(".color-value").text($(this).val());
    });

    $("#color-picker1").change(function(){
        $(".nk-sidebar.is-dark").css("background", $(this).val());
        $(".btn-signup").css("background", $(this).val());
        $(".nk-sidebar.is-dark").css("border-right-color", $(this).val());
        $(".btn-signup").css("border-color", $(this).val());
    });

    $("#color-picker2").change(function(){
        $("li.nk-menu-item.has-sub.active").css("background", $(this).val());
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
	});

	function readURL(input) 
	{
	   if (input.files && input.files[0]) 
	   {
		    var preview = document.getElementById("preview");

           for (var i = 0; i < input.files.length; i++) 
		   {
               var reader = new FileReader();
               reader.onload = function(e) {
                $('.pr-img.soc').attr('src', e.target.result);
               }
               reader.readAsDataURL(input.files[i]);
           }
	   }
	}

	$(".file-upload-input").change(function() {
			readURL(this);
	});
</script>
@endsection