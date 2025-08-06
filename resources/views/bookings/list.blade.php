@extends($layout)

@section('title', 'Bookings')

@push('scripts')
<script src="{{ mix('js/dashboard.js') }}" defer></script>
@endpush

@push('styles')
<style>
    /* Prevent flickering and layout shifts */
    #booking-email-manager {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
    }
    
    #booking-email-manager .modal {
        pointer-events: auto;
    }
    
    /* Smooth transitions for modal appearance */
    #booking-email-manager .modal.fade {
        transition: opacity 0.15s linear;
    }
    
    /* Prevent table layout shift during initialization */
    .datatable-init {
        min-height: 200px;
    }
    
    /* Ensure email button doesn't cause layout jumps */
    .send-email {
        display: inline-block;
        vertical-align: middle;
    }
</style>
@endpush

@section('content')
<div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Bookings</span></h3>
            <div class="nk-block-des text-soft">
                <p>view list of bookings.</p>
            </div>
        </div>
        <div>
            <a href="{{ route('bookings.new') }}" class="btn-signup">Add</a>
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
                            <th class="sorting">ID</th>
                            <th class="sorting">Category</th>
                            <th class="sorting">Listing</th>
                            <th class="sorting">Status</th>
                            <th class="sorting">Total</th>
                            <th class="sorting">Created At</th>
                            <th class="sorting">Created By</th>
                            <th class="sorting">Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        @foreach($bookings as $booking)
                        @php
                            switch($booking->status)
                            {
                                case 'Completed': $badgeType = 'badge-success';
                                    break;
                                case 'Confirmed': $badgeType = 'badge-blue';
                                    break;
                                case 'Cancelled': $badgeType = 'badge-danger';
                                    break;
                                default:  $badgeType = 'badge-secondary';
                                    break;

                            }
                        @endphp
                        <tr>
                            <td>{{ str_pad($booking->id, 4, '0', STR_PAD_LEFT) }}</td>
                            <td>{{ $booking->category ? $booking->category->category : '' }}</td>
                            <td>{{ $booking->listing ? $booking->listing->title : '' }}</td>
                            <td>
                                <span class="badge {{ $badgeType }}">{{ $booking->status }}</span>
                            </td>
                            <td>
                                <span>Booking Price: <span class="">{{ number_format($booking->booking_price,2) . '€' }}</span></span>
                                <br>
                                <span>Addons: <span class="">{{ number_format($booking->total_addons,2) . '€' }}</span></span>
                                <br>
                                <span>Total: <span class="money">{{ number_format($booking->total_price,2) . '€' }}</span></span>
                            </td>
                            <td>{{ $booking->created_at }}</td>
                            <td>{{ $booking->createdBy ? $booking->createdBy->prenom . ' ' . $booking->createdBy->nom : '' }}</td>
                            <td>
                                <a href="javascript:void(0)" class="change-status" data-toggle="modal" data-target="#editModal" data-id="{{ $booking->id }}" data-status="{{ $booking->status }}">
                                    <i class="icon ni ni-clipboad-check action-link"></i>
                                </a>
                                <a href="{{ route('bookings.edit', $booking->id) }}">
                                    <i class="icon ni ni-edit action-link"></i>
                                </a>
                                <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteModal" class="delete" data-id="{{ $booking->id }}">
                                    <i class="icon ni ni-trash action-link"></i>
                                </a>
                                <span style="margin: 0 5px;">|</span>
                                <a href="javascript:void(0)" class="send-email" data-toggle="modal" data-target="#emailModal" data-id="{{ $booking->id }}" data-status="{{ $booking->status }}" style="color: #5b9bd1;">
                                    <i class="icon ni ni-mail action-link"></i>
                                </a>
                                <a href="{{ route('bookings.download-invoice', $booking->id) }}" title="Download Invoice" style="color: #28a745;">
                                    <i class="icon ni ni-file-download action-link"></i>
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
<div class="modal fade" id="editModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
            </a>
            <div class="modal-header">
                <h5 class="modal-title">Booking Status</h5>
            </div>
            <form id="update_form" method="post" >
            @csrf
            <input type="hidden" name="id" id="update_id" value="">
            <div class="modal-body">
                <div class="row g-2">
                    <div class="col-12">
                        <div class="form-group">
                            <label class="form-label" for="id_u">ID</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="id_u" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label class="form-label" for="status_u">Type</label>
                            <div class="form-control-wrap">
                                <select class="form-control select2-single" name="status" id="status_u">
                                   <option value="Pending">Pending</option>
                                   <option value="Confirmed">Confirmed</option>
                                   <option value="Completed">Completed</option>
                                   <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="mt-3">
                        <button type="submit" class="w-100 btn-signup" id="sendStatusBtn">Save</button>
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

<!-- React Email Modal Container -->
<div id="booking-email-manager"></div>

<script type="text/javascript">
    $(document).ready(function(){
        // DataTables is already initialized by scripts.js, no need to reinitialize
        
        // Handle email button click - open React modal
        $(document).on('click', '.send-email', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let bookingId = $(this).data('id');
            console.log('Opening email modal for booking:', bookingId);
            
            // Call the React component's function with retry mechanism
            if (window.openBookingEmailModal) {
                window.openBookingEmailModal(bookingId);
            } else {
                console.warn('React email modal not ready, retrying...');
                // Single quick retry after minimal delay
                requestAnimationFrame(() => {
                    if (window.openBookingEmailModal) {
                        window.openBookingEmailModal(bookingId);
                    } else {
                        alert('Email modal is still loading. Please try again in a moment.');
                    }
                });
            }
        });
        
        // Keep existing delete and status change handlers
        
        $('body').on('click', '.delete', function() {
            let id = $(this).data('id');
            $('#delete_id').val(id);
        });

        $('.change-status').click(function(){
            let id = $(this).data('id');
            let status = $(this).data('status');

            $('#update_id').val(id);
            $('#id_u').val(id);
            $('#status_u').val(status);
            $('#status_u').trigger('change');
        });

        $('#delete_option').click(function(){
            let id = $('#delete_id').val();

            //hide modal
            $('#deleteModal').modal('hide');
            $('.modal-backdrop').hide();

            //send
            $.ajax({
                url: "{{ route('bookings.delete') }}",
                type: 'post',
                data: {id: id},
                success: function(data){
                    if(data == 'success')
                    {
                        swal({
                            title: "Deleted!",
                            text: "Booking has been deleted.",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            });
        });

        $('#update_form').submit(function(event){
            event.preventDefault();

            var formData = new FormData(this);

            $.ajax({
                type: 'post',
                url: "{{ route('bookings.changeStatus') }}",
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
                            text: "Status has been updated",
                            icon: "success",
                        }).then((value) => {
                            location.reload();
                        });
                    }
                }
            })
        });

    });
</script>
@endsection