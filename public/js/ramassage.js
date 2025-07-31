function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

$(document).ready(function() {

    //Check all new
    $('body').on('change', '#colisNew_0', function() {

        //verify if checked
        if ($(this).prop('checked')) {
            $('.colis-new-checkbox').prop('checked', true);
        } else {
            $('.colis-new-checkbox').prop('checked', false);
        }
    });

    //Check all list
    $('body').on('change', '#colis_0', function() {

        //verify if checked
        if ($(this).prop('checked')) {
            $('.colis-checkbox').prop('checked', true);
        } else {
            $('.colis-checkbox').prop('checked', false);
        }
    });

    var listColis = config.ids;

    //Add new colis
    $('#add_new_colis').click(function() {

        //get all checked
        $('.colis-new-checkbox:checked').each(function() {
            let id = $(this).data('id');
            let tableSource = $('#DataTables_new_colis').DataTable();
            let tableDest = $('#DataTables_liste_colis').DataTable();

            //change checkbox class
            $(this).closest('tr').find('.colis-new-checkbox').removeClass('colis-new-checkbox').addClass('colis-checkbox');

            //get row content
            row = $(this).closest('tr').html();

            //append on the second table
            tableDest.row.add($('<tr class="row_' + id +
                '">' + row + '</tr>')).draw();

            //remove row from the first table
            tableSource.row($('.row_' + id)).remove().draw();

            //check false
            $('#colisNew_0').prop('checked', false);

            //add id
            listColis.push(id);
        });

    });

    //Retirer colis
    $('#retirer_btn').click(function() {
        //get all checked
        $('.colis-checkbox:checked').each(function() {
            let id = $(this).data('id');
            let tableSource = $('#DataTables_new_colis').DataTable();
            let tableDest = $('#DataTables_liste_colis').DataTable();

            //change checkbox class
            $(this).closest('tr').find('.colis-checkbox').removeClass('colis-checkbox').addClass('colis-new-checkbox');

            //get row content
            row = $(this).closest('tr').html();

            //append on the first table
            tableSource.row.add($('<tr class="row_' + id +
                '">' + row + ' < /tr>')).draw();

            //remove row from the second table
            tableDest.row($('.row_' + id)).remove().draw();

            //check false
            $('#colis_0').prop('checked', false);

            //remove id
            listColis = $.grep(listColis, function(n) {
                return n != id;
            });
        });
    });

    //change client 
    $('#id_client').change(function() {
        let id = $(this).val();

        $.ajax({
            type: 'post',
            url: config.routes.clientUrl,
            data: { id_client: id },
            success: function(data) {
                reloadDataTable('DataTables_new_colis', 'tab1_tbody', data);
            }
        });
    });

    //Save bon livraison
    $('#btnSave').click(function() {

        //Validation
        let id_livreur = $('#id_livreur').val();
        let id_client = $('#id_client').val();
        let date_visite = $('#date_visite').val();
        let heure_visite = $('#heure_visite').val();
        let remarque = $('#remarque').val();

        //id_livreur
        if (id_livreur == -1) {
            $('#error_livreur').removeClass('d-none');
        } else {
            $('#error_livreur').addClass('d-none');
        }

        //id_client
        if (id_client == -1) {
            $('#error_client').removeClass('d-none');
        } else {
            $('#error_client').addClass('d-none');
        }

        //date_visite
        if (!isValidDate(date_visite)) {
            $('#error_date').removeClass('d-none');
        } else {
            $('#error_date').addClass('d-none');
        }

        if (id_livreur == -1 || id_client == -1 || !isValidDate(date_visite)) {
            return;
        }


        $.ajax({
            type: 'post',
            url: config.routes.submitUrl,
            data: { id_client: id_client, id_livreur: id_livreur, remarque: remarque, date_visite: date_visite, heure_visite: heure_visite, colis: listColis },
            success: function(data) {
                if (data == 'success') {
                    listColis = [];
                    swal({
                        title: "Enregistré!",
                        text: "Votre ramassage a été bien créer",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            }
        });
    });

    //update ramassage
    $('#btnUpdate').click(function() {

        //Validation
        let id_livreur = $('#id_livreur').val();
        let id_client = $('#id_client').val();
        let date_visite = $('#date_visite').val();
        let heure_visite = $('#heure_visite').val();
        let remarque = $('#remarque').val();

        //id_livreur
        if (id_livreur == -1) {
            $('#error_livreur').removeClass('d-none');
        } else {
            $('#error_livreur').addClass('d-none');
        }

        //id_client
        if (id_client == -1) {
            $('#error_client').removeClass('d-none');
        } else {
            $('#error_client').addClass('d-none');
        }

        //date_visite
        if (!isValidDate(date_visite)) {
            $('#error_date').removeClass('d-none');
        } else {
            $('#error_date').addClass('d-none');
        }

        if (id_livreur == -1 || id_client == -1 || !isValidDate(date_visite)) {
            return;
        }

        $.ajax({
            type: 'post',
            url: config.routes.updateUrl,
            data: { id_client: id_client, id_livreur: id_livreur, remarque: remarque, date_visite: date_visite, heure_visite: heure_visite, id: config.id, colis: listColis },
            success: function(data) {

                if (data == 'success') {
                    swal({
                        title: "Enregistré!",
                        text: "Votre ramassage a été bien modifier",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            }
        });
    });
});

function reloadDataTable(tableId, tbodyId, rowsHtml) {
    $('#' + tableId).dataTable().fnDestroy();
    $('#' + tbodyId).html(rowsHtml);

    $('#' + tableId).dataTable({
        responsive: true,
        autoWidth: false,
        sDom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6 d-flex justify-content-end'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        language: {
            search: "",
            searchPlaceholder: "Search",
            lengthMenu: "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
            info: "_START_ / _END_",
            infoEmpty: "Aucun enregistrement disponible",
            infoFiltered: "( Total _MAX_  )",
            paginate: {
                "first": "Premier",
                "last": "Dernier",
                "next": "Next",
                "previous": "Previous"
            }
        }
    });
}