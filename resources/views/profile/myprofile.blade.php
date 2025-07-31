@extends($layout)

@section('title', 'My account')

@section('content')
<div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
            <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">My account</h3>
                <div class="nk-block-des text-soft">
                    <p>View your account information.</p>
                </div>
            </div>
        </div>
</div>
<div class="card card-preview">
    <div class="card-inner" style="
    padding-top: 42px;
    padding-bottom: 22px;
">
        <div class="preview-block">
            <div class="row">
                <div class="col-md-3">
                    <div class="d-flex justify-content-center">
                        <div class="profile-img-container">
                            <div class="profile-img">
                                <img class='pr-img' src="{{ asset($profile->image) }}">
                            </div>
                            <div class="upload-img-container">
                                 <button onclick="$('.file-upload-input').trigger( 'click' )" class="btn profile-upload-btn" type="button"><i class="fa-solid fa-camera"></i></button>
                            </div>
                            <form id="avatar_frm" method="post" action="" enctype="multipart/form-data">
                                @csrf
                                <input class="file-upload-input" name="image" type="file" accept="image/png, image/gif, image/jpeg" />
                            </form>
                        </div>
                    </div>
                    <div class="profile-informations py-3">
                        <h5 id="profile_name">{{ $profile->prenom . ' ' . $profile->nom}}</h5>
                        <h5 id="profile_type">{{ $profile->type_compte }}</h5>
                        <h5 id="profile_type">Crée le {{ date('d/m/Y', strtotime($profile->created_at) )}}</h5>
                    </div>
                </div>
                <div class="col-md-9">
                    <form action="{{ route('profile.save') }}" method="post" enctype="multipart/form-data">
                        @csrf
                    <h5 class="mb-3">Personel informations</h5>
                    @if(session('updated'))
                    <div class="example-alert my-3">
                        <div class="alert alert-success alert-icon">
                            <em class="icon ni ni-check-circle"></em> <strong>Success</strong>. your informations has been updated successfully.
                        </div>
                    </div>
                    @endif
                    <div class="row gy-4">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">UID</label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control" value="{{ str_pad(auth()->user()->id, 4, '0', STR_PAD_LEFT) }}" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">Email <span class="lbl-obligatoire">*</span></label>
                                <div class="form-control-wrap">
                                    <input type="email" class="form-control" placeholder="Email" value="{{ $profile->email }}" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">First name <span class="lbl-obligatoire">*</span></label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control @error('prenom') is-invalid @enderror" name="prenom" placeholder="First name" value="{{ $profile->prenom }}">
                                    @error('prenom')
                                    <small class="error">Invalid first name</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">Last name <span class="lbl-obligatoire">*</span></label>
                                <div class="form-control-wrap">
                                    <input type="text" class="form-control @error('nom') is-invalid @enderror" name="nom" placeholder="Last name" value="{{ $profile->nom }}">
                                    @error('nom')
                                    <small class="error">Invalid last name</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">Phone number <span class="lbl-obligatoire">*</span></label>
                                <div class="form-control-wrap">
                                    <input type="tel" class="form-control @error('telephone') is-invalid @enderror" name="telephone" placeholder="Phone number" value="{{ $profile->telephone }}">
                                    @error('telephone')
                                    <small class="error">Invalid Phone</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">Password</label>
                                <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password">
                                @error('password')
                                <small class="error">Invalid password</small>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label" for="">Confirm password</label>
                                <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" name="password_confirmation" placeholder="Confirm password">
                                @error('password_confirmation')
                                <small class="error">Password not identical</small>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center mt-2">
                        <button type="submit" class="btn-signup">Save</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        $('#banque').val("{{ $profile->banque }}");
        $('#banque').trigger('change');
    });
</script>
<script type="text/javascript">
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
               reader.onload = function(readerEvent) {
				  
				    let formData = new FormData(document.getElementById('avatar_frm'));
					$.ajax({
                        url: "{{ route('profile.upload') }}",
                        data: formData,
                        type:'POST',
                        dataType: 'text',
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function(data) {
                            $('.pr-img').attr('src', data);
                        }
					   });
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