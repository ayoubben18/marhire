@extends('layouts.dashboard_admin')

@section('title', 'Users list')

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Users list</span></h3>
            <div class="nk-block-des text-soft">
                <p>View the users list.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('utilisateur.new') }}" class="btn-signup">Add user</a>
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
                            <th class="sorting">First name</th>
                            <th class="sorting">Last name</th>
                            <th class="sorting">Email</th>
                            <th class="sorting">Phone</th>
                            <th class="sorting">Role</th>
                            <th class="sorting">Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        @foreach($utilisateurs as $utilisateur)
                        @if($utilisateur->email != 'supadmin@gmail.com')
                        <tr>
                            <td>{{ $utilisateur->prenom }}</td>
                            <td>{{ $utilisateur->nom }}</td>
                            <td>{{ $utilisateur->email }}</td>
                            <td>{{ $utilisateur->telephone }}</td>
                            <td>{{ $utilisateur->type_compte }}</td>
                            <td>
                                <a href="{{ route('utilisateur.update', $utilisateur->id) }}">
                                    <i class="icon ni ni-edit action-link"></i>
                                </a>
                                <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteModal" class="delete" data-id="{{ $utilisateur->id }}">
                                    <i class="icon ni ni-trash action-link"></i>
                                </a>
                            </td>
                        </tr>
                        @endif
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
                     <h5 style="text-align:center;">Remove user</h5>
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

<script type="text/javascript">
 
    $(document).ready(function(){
        $('body').on('click', '.delete', function() {
            let id = $(this).data('id');
            $('#delete_id').val(id);
        });

        $('#delete_option').click(function(){
            let id = $('#delete_id').val();

            //hide modal
            $('#deleteModal').modal('hide');
            $('.modal-backdrop').hide();

            //send
            $.ajax({
                url: "{{ route('utilisateur.delete') }}",
                type: 'post',
                data: {id: id},
                success: function(data){
                    if(data == 'success')
                    {
                        swal({
                            title: "Deleted!",
                            text: "User deleted successfuly!",
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