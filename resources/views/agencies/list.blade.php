@extends($layout)

@section('title', 'La liste des annonces')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Agencies</span></h3>
            <div class="nk-block-des text-soft">
                <p>view agencies list.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('agencies.new') }}" class="btn-signup">Add</a>
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
                            <th class="sorting">Agency</th>
                            <th class="sorting">City</th>
                            <th class="sorting">Category</th>
                            <th class="sorting">Contact Name</th>
                            <th class="sorting">Email</th>
                            <th class="sorting">Phone / whatsapp</th>
                            <th class="sorting">Status</th>
                            <th class="sorting">Notes</th>
                            <th class="sorting">Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        @foreach($agencies as $agency)
                        @php
                            switch($agency->status)
                            {
                                case 'Active': $badgeType = 'badge-success';
                                    break;
                                case 'Inactive': $badgeType = 'badge-danger';
                                    break;
                                default: $badgeType = 'badge-secondary';
                                    break;
                            }
                        @endphp
                        <tr>
                            <td>{{ $agency->agency_name }}</td>
                            <td>{{ $agency->city ? $agency->city->city_name : '' }}</td>
                            <td>{{ $agency->category ? $agency->category->category : '' }}</td>
                            <td>{{ $agency->contact_name }}</td>
                            <td>{{ $agency->email }}</td>
                            <td>
                                Phone: {{ $agency->phone_number }}
                                <br>
                                Whatsapp: {{ $agency->whatsapp }}
                            </td>
                            <td>
                                <span class="badge {{ $badgeType }}">
                                    {{ $agency->status }}
                                </span>
                            </td>
                            <td>{{ $agency->notes }}</td>
                            <td>
                                <a href="{{ route('agencies.edit', $agency->id) }}">
                                    <i class="icon ni ni-edit action-link"></i>
                                </a>
                                <a href="javascript:void(0);" class="change-status" data-toggle="modal" data-target="#editModal" data-id="{{ $agency->id }}" data-agency="{{ $agency->agency_name }}" data-status="{{ $agency->status }}">
                                    <i class="icon ni ni-edit action-link"></i>
                                </a>
                                <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteModal" class="delete" data-id="{{ $agency->id }}">
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
                     <h5 style="text-align:center;">Suppression</h5>
                     <p style="text-align:center">
                        Vous Voulez vraiment supprimer cette annonce?
                     </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancel-btn" data-dismiss="modal">Annuler</button>
                    <button type="button" id="delete_option" class="btn btn-primary save-btn">Supprimer</button>
                </div>
            </div>
        </div>
</div>
<div class="modal fade" id="editModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
            </a>
            <div class="modal-header">
                <h5 class="modal-title">Agency status</h5>
            </div>
            <form id="update_form" method="post">
            @csrf
            <input type="hidden" name="id" id="update_id" value="">
            <div class="modal-body">
                <div class="row g-2">
                    <div class="col-12">
                        <div class="form-group">
                            <label class="form-label" for="agence_u">Agency</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="agency_u" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label class="form-label" for="status_u">Status</label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="status" id="status_u">
                                   <option value="Active">Active</option>
                                   <option value="Inactive">Inactive</option>
                                   <option value="Need Approval">Need Approval</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="mt-3">
                    <button type="submit" class="w-100 btn-signup" id="sendEtatBtn">Enregistrer</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
 
    $(document).ready(function(){
        $('body').on('click', '.change-status', function() {
            let id = $(this).data('id');
            let agency = $(this).data('agency');
            let status = $(this).data('status');

            $('#update_id').val(id);
            $('#agency_u').val(agency);
            $('#status_u').val(status);
            $('#status_u').trigger('change');
        });

        $('body').on('click', '.delete', function() {
            let id = $(this).data('id');
            $('#delete_id').val(id);
        });

        $('#update_form').submit(function(event){
            event.preventDefault();

            var formData = new FormData(this);
    
            $('#sendEtatBtn').text('Charging...');
            $('#sendEtatBtn').addClass('disable');
            $('#sendEtatBtn').attr('disabled', 'disabled');

            $.ajax({
                type: 'post',
                url: "{{ route('agencies.changeStatus') }}",
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    if(data == 'success')
                    {
                        //hide modal
                        $('#editModal').modal('hide');
                        $('.modal-backdrop').hide();

                        //show success message
                        swal({
                            title: "Success!",
                            text: "the agency status has been updated.",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            })
        });

        $('#delete_option').click(function(){
            let id = $('#delete_id').val();

            //hide modal
            $('#deleteModal').modal('hide');
            $('.modal-backdrop').hide();

            //send
            $.ajax({
                url: "{{ route('agencies.delete') }}",
                type: 'post',
                data: {id: id},
                success: function(data){
                    if(data == 'success')
                    {
                        swal({
                            title: "Supprimé!",
                            text: "Votre annonce a été bien supprimer",
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