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

    //Save bon livraison
    $('#btnSaveBon').click(function() {
        let banque = config.banque;
        let rip = config.rip;
        let ville = $('#id_ville').val();
        let addresse = $('#addresse_ramassage').val();
        let telephone = $('#telephone').val();

        if(ville == "-1")
        {
            $('#ville_error').text('Ville est obligatoire.');
            return;
        }
        else
        {
            $('#ville_error').text('');
        }

        if(addresse == "")
        {
            $('#addresse_error').text('Addresse est obligatoire.');
            return;
        }
        else
        {
            $('#addresse_error').text('');
        }

        if(telephone == "")
        {
            $('#telephone_error').text('Téléphone est obligatoire.');
            return;
        }
        else
        {
            $('#telephone_error').text('');
        }

        if(banque == "-1" || rip == "")
        {
            swal({
                title: "Error!",
                text: "Il faut saisir vos informations banquaire",
                icon: "error",
                dangerMode: true,
                button: {
                    text: "Saisir RIB",
                    closeModal: false,
                  },
            }).then((value) => {
                window.location.href = config.routes.profileUrl;
            });

            return;
        }

        $.ajax({
            type: 'post',
            url: config.routes.submitUrl,
            data: { id_ville: ville, addresse_ramassage: addresse, telephone: telephone, colis: listColis },
            success: function(data) {
                if (data == 'success') {
                    listColis = [];
                    swal({
                        title: "Enregistré!",
                        text: "Votre bon de ramassage a été bien créer",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            }
        });
    });

    //update bon livraison
    $('#btnUpdateBon').click(function() {

        let ville = $('#id_ville').val();
        let addresse = $('#addresse_ramassage').val();
        let telephone = $('#telephone').val();

        if(ville == "-1")
        {
            $('#ville_error').text('Ville est obligatoire.');
            return;
        }
        else
        {
            $('#ville_error').text('');
        }

        if(addresse == "")
        {
            $('#addresse_error').text('Addresse est obligatoire.');
            return;
        }
        else
        {
            $('#addresse_error').text('');
        }

        if(telephone == "")
        {
            $('#telephone_error').text('Téléphone est obligatoire.');
            return;
        }
        else
        {
            $('#telephone_error').text('');
        }

        $.ajax({
            type: 'post',
            url: config.routes.updateUrl,
            data: { id: config.id, id_ville: ville, addresse_ramassage: addresse, telephone: telephone, colis: listColis },
            success: function(data) {

                if (data == 'success') {
                    swal({
                        title: "Enregistré!",
                        text: "Votre bon de ramassage a été bien modifier",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            }
        });
    });
});