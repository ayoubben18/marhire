@extends($layout)

@section('title', 'Cities')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Cities</span></h3>
            <div class="nk-block-des text-soft">
                <p>view cities list.</p>
            </div>
        </div>
        <div>
            <a href="javascript:void(0);" data-toggle="modal" data-target="#addModal" class="btn-signup">Add</a>
        </div>
    </div>
</div>
<div class="card card-preview">
    <div class="card-inner">
        <div class="preview-block">
            <div class="table-container">
               <table class="datatable-init nowrap table dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr>
                            <th class="sorting">City</th>
                            <th class="sorting">Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        @foreach($cities as $city)
                        <tr>
                            <td>{{ $city->city_name }}</td>
                            <td>
                                <a class="edit-city" href="javascript:void(0);" data-toggle="modal" data-target="#editModal" data-id="{{ $city->id }}" data-city="{{ $city->city_name }}" >
                                    <i class="icon ni ni-edit action-link"></i>
                                </a>
                                <a href="javascript:void(0)" class="delete" data-toggle="modal" data-target="#deleteModal" data-id="{{ $city->id }}">
                                    <i class="icon ni ni-trash action-link"></i>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!--addModal -->
<div class="modal fade" tabindex="-1" id="addModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
            </a>
            <div class="modal-header">
                <h5 class="modal-title">New City</h5>
            </div>
            <form id="add_form" method="post">
            @csrf
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mt-3">
                        <div class="form-group">
                            <label class="form-label" for="city">City Name <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="city" id="city" placeholder="City Name"  autocomplete="false" required>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="mt-3">
                    <button type="submit" class="w-100 btn-signup">Save</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>

<!-- editModal -->
<div class="modal fade" tabindex="-1" id="editModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
            </a>
            <div class="modal-header">
                <h5 class="modal-title">Edit City</h5>
            </div>
            <form id="update_form" method="post">
            @csrf
            <input type="hidden" name="id" id="update_id" value="">
            <div class="modal-body">
                    <div class="col-12 mt-3">
                        <div class="form-group">
                            <label class="form-label" for="city">City Name <span class="lbl-obligatoire">*</span></label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" name="city" id="city_u" placeholder="City Name"  autocomplete="false" required>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="mt-3">
                        <button type="submit" class="w-100 btn-signup">Save</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade hide delete-modal" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <input type="hidden" id="delete_id" value="">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <div class="delete-modal-header">
                        <span>
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                    </div>
                </div>
                <div class="modal-body">
                     <h5 style="text-align:center;">Delete</h5>
                     <p style="text-align:center">
                       Are you sure?
                     </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Cancel</button>
                    <button type="button" id="delete_option" class="btn btn-primary save-btn">Delete</button>
                </div>
            </div>
        </div>
</div>
<!-- End Modal -->

<!-- Script JS -->
<script type="text/javascript">
    $(document).ready(function(){

        $('body').on('click', '.delete', function() {
            let id = $(this).data('id');

            $('#delete_id').val(id);
            $('#addModal').modal('hide');
            $('.modal-backdrop').hide();
        });

        $('body').on('click', '.edit-city', function() {
            let id = $(this).data('id');
            let city = $(this).data('city');
            
            $('#update_id').val(id);
            $('#city_u').val(city);
            
        });

        $('#add_form').submit(function(event){
            event.preventDefault();
            $.ajax({
                url: "{{ route('cities.insert') }}",
                type: 'post',
                data: $(this).serialize(),
                success: function(response){
                    if(response == 'success')
                    {
                        //hide modal
                        $('#addModal').modal('hide');
                        $('.modal-backdrop').hide();

                        //show success message
                        swal({
                            title: "Success!",
                            text: "Your city has been added.",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            }); 

            //reset form
            $('#add_form').trigger('reset');
        });

        $('#update_form').submit(function(event){
            event.preventDefault();
            $.ajax({
                url: "{{ route('cities.update') }}",
                type: 'post',
                data: $(this).serialize(),
                success: function(response){
                    if(response == 'success')
                    {
                        //hide modal
                        $('#editModal').modal('hide');
                        $('.modal-backdrop').hide();

                        //show success message
                        swal({
                            title: "Success!",
                            text: "Your city has been updated.",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            }); 

            //reset form
            $('#update_form').trigger('reset');
        });

        $('#delete_option').click(function(){
            let id = $('#delete_id').val();

            //hide modal
            $('#deleteModal').modal('hide');
            $('.modal-backdrop').hide();

            //send
            $.ajax({
                url: "{{ route('cities.delete') }}",
                type: 'post',
                data: {id: id},
                success: function(data){
                    if(data == 'success')
                    {
                        swal({
                            title: "Success!",
                            text: "Your city has been deleted.",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            });
        });
    });
</script>
@endsection