function isValidDate(dateString) 
{
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

function refreshPrices()
{
    let sumPrix = 0;
    let sumTarif = 0;
    let sumEmballage = 0;
    let sumFacture = 0;
    let tarifSupplimentaire = eval($('#tarif_supplimentaire').val());

    //sum prix
    $("#DataTables_liste_colis .prix-val").each(function(){
        sumPrix += eval($(this).text().replace(',', ''));
        console.log($(this).text());
    });

    //sum tarif
    $("#DataTables_liste_colis .tarif-val").each(function(){
        sumTarif += eval($(this).text().replace(',', ''));
    });

    //sum emballage
    $("#DataTables_liste_colis .emballage-val").each(function(){
        sumEmballage += eval($(this).text().replace(',', ''));
    });

    sumFacture = sumPrix - sumTarif - tarifSupplimentaire - sumEmballage;

    //refresh
    $('#tarif_facture').val(sumTarif.toFixed(2));
    $('#emballage_facture').val(sumEmballage.toFixed(2));
    $('#montant_facture').val(sumFacture.toFixed(2));

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

    $('#tarif_supplimentaire').focusout(function(){
        let prix = $(this).val();

        if(prix == '')
        {
            $('#tarif_supplimentaire').val(0);
        }

        refreshPrices();
    })

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

            //refresh prices
            refreshPrices();
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

        //refresh prices
        refreshPrices();
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

    //Save facture
    $('#btnSave').click(function() {

        //Validation
        let id_client = $('#id_client').val();
        let date_facture = $('#date_facture').val();
        let remarque = $('#remarque').val();
        let tarif_facture = $('#tarif_facture').val();
        let tarif_supplimentaire = $('#tarif_supplimentaire').val();
        let emballage_facture = $('#emballage_facture').val();
        let montant_facture = $('#montant_facture').val();


        //id_client
        if (id_client == -1) {
            $('#error_client').removeClass('d-none');
        } else {
            $('#error_client').addClass('d-none');
        }

        //date_facture
        if (!isValidDate(date_facture)) {
            $('#error_date').removeClass('d-none');
        } else {
            $('#error_date').addClass('d-none');
        }

        if (id_client == -1 || !isValidDate(date_facture)) {
            return;
        }


        $.ajax({
            type: 'post',
            url: config.routes.submitUrl,
            data: { id_client: id_client, remarque: remarque, tarif_facture: tarif_facture, tarif_supplimentaire: tarif_supplimentaire, montant_facture: montant_facture, date_facture: date_facture, colis: listColis, emballage_facture: emballage_facture },
            success: function(data) {
                if (data == 'success') {
                    listColis = [];
                    swal({
                        title: "Enregistré!",
                        text: "Votre facture a été bien créer",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    });

    //update facture
    $('#btnUpdate').click(function() {

        //Validation
        let id_client = $('#id_client').val();
        let date_facture = $('#date_facture').val();
        let remarque = $('#remarque').val();
        let tarif_facture = $('#tarif_facture').val();
        let tarif_supplimentaire = $('#tarif_supplimentaire').val();
        let emballage_facture = $('#emballage_facture').val();
        let montant_facture = $('#montant_facture').val();
        let status = $('#status').val();

        //id_client
        if (id_client == -1) {
            $('#error_client').removeClass('d-none');
        } else {
            $('#error_client').addClass('d-none');
        }

        //date_facture
        if (!isValidDate(date_facture)) {
            $('#error_date').removeClass('d-none');
        } else {
            $('#error_date').addClass('d-none');
        }

        if (id_client == -1 || !isValidDate(date_facture)) {
            return;
        }

        $.ajax({
            type: 'post',
            url: config.routes.updateUrl,
            data: { id_client: id_client, remarque: remarque, tarif_facture: tarif_facture, tarif_supplimentaire: tarif_supplimentaire, montant_facture: montant_facture, date_facture: date_facture, id: config.id, colis: listColis, status: status, emballage_facture: emballage_facture },
            success: function(data) {

                if (data == 'success') {
                    swal({
                        title: "Enregistré!",
                        text: "Votre facture a été bien modifier",
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