$(document).ready(function () {
    let produitsToAdd = [];
    let listProduits = config.ids;

    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    function displayGroups() {
        const table = $("#DataTables_new_colis").DataTable();

        // Clear existing rows
        table.clear().draw();

        // Populate the table with group data
        produitsToAdd.forEach((produit) => {
            let row = `
                <td>${produit.id}</td>
                <td>${produit.reference}</td>
                <td>${produit.designation}</td>
                <td>${formatDate(produit.created_at)}</td>
                <td>
                    <span class="money">${produit.prix + " MAD"}</span>
                </td>
                <td>${produit.qte}</td>
                <td>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input colis-new-checkbox" id="colisNew_${
                            produit.id
                        }" data-id="${produit.id}">
                        <label class="custom-control-label" for="colisNew_${
                            produit.id
                        }"></label>
                    </div>
                </td>
            `;

            table.row
                .add($('<tr class="row_' + colis.id + '">' + row + "</tr>"))
                .draw();
        });
    }

    function emptyData() {
        let tableDest = $("#DataTables_liste_colis").DataTable();

        tableDest.clear().draw();
    }

    function addRow(id) {
            let tableSource = $("#DataTables_new_colis").DataTable();
            let tableDest = $("#DataTables_liste_colis").DataTable();

            $("tr.row_" + id).find(".colis-new-checkbox")
                .removeClass("colis-new-checkbox")
                .addClass("colis-checkbox");

            //get row content
            row = $(".row_" + id).closest("tr").html();

            //append on the second table
            tableDest.row
                .add($('<tr class="row_' + id + '">' + row + "</tr>"))
                .draw();

            //remove row from the first table
            tableSource
                .row($(".row_" + id))
                .remove()
                .draw();


            //add id
            listProduits.push(id);
    }

    //Check all new
    $("body").on("change", "#colisNew_0", function () {
        //verify if checked
        if ($(this).prop("checked")) {
            $(".colis-new-checkbox").prop("checked", true);
        } else {
            $(".colis-new-checkbox").prop("checked", false);
        }
    });

    //Check all list
    $("body").on("change", "#colis_0", function () {
        //verify if checked
        if ($(this).prop("checked")) {
            $(".colis-checkbox").prop("checked", true);
        } else {
            $(".colis-checkbox").prop("checked", false);
        }
    });

    //Add new colis
    $("#add_new_colis").click(function () {
        //get all checked
        $(".colis-new-checkbox:checked").each(function () {
            let id = $(this).data("id");
            let tableSource = $("#DataTables_new_colis").DataTable();
            let tableDest = $("#DataTables_liste_colis").DataTable();

            //change checkbox class
            $(this)
                .closest("tr")
                .find(".colis-new-checkbox")
                .removeClass("colis-new-checkbox")
                .addClass("colis-checkbox");

            //get row content
            row = $(this).closest("tr").html();

            //append on the second table
            tableDest.row
                .add($('<tr class="row_' + id + '">' + row + "</tr>"))
                .draw();

            //remove row from the first table
            tableSource
                .row($(".row_" + id))
                .remove()
                .draw();

            //check false
            $("#colisNew_0").prop("checked", false);

            //add id
            listProduits.push(id);
        });
    });

    //Retirer colis
    $("#retirer_btn").click(function () {
        //get all checked
        $(".colis-checkbox:checked").each(function () {
            let id = $(this).data("id");
            let tableSource = $("#DataTables_new_colis").DataTable();
            let tableDest = $("#DataTables_liste_colis").DataTable();

            //change checkbox class
            $(this)
                .closest("tr")
                .find(".colis-checkbox")
                .removeClass("colis-checkbox")
                .addClass("colis-new-checkbox");

            //get row content
            row = $(this).closest("tr").html();

            //append on the first table
            tableSource.row
                .add($('<tr class="row_' + id + '">' + row + " < /tr>"))
                .draw();

            //remove row from the second table
            tableDest
                .row($(".row_" + id))
                .remove()
                .draw();

            //check false
            $("#colis_0").prop("checked", false);

            //remove id
            listProduits = $.grep(listProduits, function (n) {
                return n != id;
            });
        });
    });

    //Save bon livraison
    $("#btnSaveBon").click(function () {
  
        $.ajax({
            type: "post",
            url: config.routes.submitUrl,
            data: {
                produits: listProduits,
                remarque_admin: $("#remarque_admin").val(),
            },
            success: function (data) {
                if (data == "success") {
                    listProduits = [];
                    swal({
                        title: "Enregistré!",
                        text: "Votre bon de stock a été bien créer",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            },
        });
    });

    //update bon livraison
    $("#btnUpdateBon").click(function () {

        $.ajax({
            type: "post",
            url: config.routes.updateUrl,
            data: {
                id: config.id,
                produits: listProduits
            },
            success: function (data) {
                if (data == "success") {
                    swal({
                        title: "Enregistré!",
                        text: "Votre bon de stock a été bien modifier",
                        icon: "success",
                    }).then((value) => {
                        location.reload();
                    });
                }
            },
        });
    });

    //scann Colis
    // $("body").on("keypress", "#scanColis", function (e) {
    //     let inputVal = $(this).val();
    //     let idRegion = $("#id_region").val();

    //     if (e.which == 13 && inputVal != "" && idRegion != "-1") {
    //         $.ajax({
    //             type: "post",
    //             url: '/bon-distribution/scanColis',
    //             data: {
    //                 id_region: idRegion,
    //                 code: inputVal
    //             },
    //             dataType: 'json',
    //             success: function (data) {
    //                if(data.colis[0]) {
    //                     addRow(data.colis[0].id);
    //                }
    //                else
    //                {
    //                    alert("Ce colis n'existe pas dans cette région");
    //                }
    //                $('#scanColis').val('');
    //             },
    //         });
    //     }
    // });
});
