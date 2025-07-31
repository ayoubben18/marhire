let variations = variationsArr ?? [];

$("#btn_add_variation").click(function () {
    let variation = $("#variation").val().toLowerCase();

    if (!variation) {
        $("#variationError").text("Saisir la variation");
    } else {

        $("#variation").val('');
        variations.push(variation);
        let newVariation = `<div class="card">
                        <div class="card-header d-flex justify-between" id="${variation}">
                            <span>${variation}</span>
                            <button class="btn btn-remove-variation" data-variation="${variation}">
                                <span class="icon ni ni-trash"></i>
                            </button>
                        </div>

                        <div id="collapseOne" class="collapse show variation-opt" data-variation="${variation}" aria-labelledby="${variation}" data-parent="#VariationItems">
                            <table class="table w-100">
                                <tr>
                                    <td>
                                        <input type="text" name="${variation}_opt[]" class="form-control" placeholder="Nom d'option (L,XL..)" />
                                    </td>
                                    <td>
                                        <input type="number" step="1" name="${variation}_qte[]" class="form-control" placeholder="Quantité" />
                                    </td>
                                    <td>
                                        <button type="button" class="btn remove-variation-option" style="color:#e85347;">X</button>
                                    </td>
                                </tr>
                            </table>
                            <div class="d-flex justify-center">
                                <button type="button" class="btn btn-success btn-add-variationOpt">
                                    <span class="icon ni ni-plus"></span> Ajouter Element
                                </button>
                            </div>
                        </div>
                    </div>`;
        $("#VariationItems").append(newVariation);
    }
});

$("body").on("click", ".btn-add-variationOpt", function () {
    let variation = $(this).closest(".variation-opt").data("variation");

    let newOption = `<tr>
                        <td>
                            <input type="text" name="${variation}_opt[]" class="form-control" placeholder="Nom d'option (L,XL..)" />
                        </td>
                        <td>
                            <input type="number" step="1" name="${variation}_qte[]" class="form-control" placeholder="Quantité" />
                        </td>
                        <td>
                            <button type="button" class="btn remove-variation-option" data-variation="${variation}" style="color:#e85347;">X</button>
                        </td>
                    </tr>`;
    $(this).closest(".variation-opt").find('table').append(newOption);
});

$("body").on("click", ".remove-variation-option", function(){
    $(this).closest("tr").remove();
});

$("body").on("click", ".btn-remove-variation", function(){
    let variation = $(this).data('variation');
    variations = variations.filter(item => item !== variation);

    $(this).closest(".card").remove();
});

$('#addProductForm').submit(function(e){
    e.preventDefault();

    let formData = new FormData(document.getElementById('addProductForm'));
    formData.append('variations', variations);

    $.ajax({
        type: 'post',
        url: '/stocks/nouveau',
        data: formData,
        dataType: 'json',
        processData : false,
        contentType:false,
        success: function(resp){
            $('#addProductForm')[0].reset();
            $('#successAlert').removeClass('d-none');
            variations = [];

            $("#VariationItems").empty();

            $('.error').text('');
        },
        error: function(err){
            $('#successAlert').addClass('d-none');
            if (err.status === 422) {
                let errors = err.responseJSON.errors;
                
                $('.error').text('');

                $.each(errors, function(field, messages) {
                    let msg = field === 'id_brand' ? 'Champs est obligatoire.' : messages[0];
                    $('#' + field + '_error').text(msg); 
                });
            }
        }
    }).always(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});

$('#updateProductForm').submit(function(e){
    e.preventDefault();

    let formData = new FormData(document.getElementById('updateProductForm'));
    formData.append('variations', variations);

    $.ajax({
        type: 'post',
        url: '/stocks/update',
        data: formData,
        dataType: 'json',
        processData : false,
        contentType:false,
        success: function(resp){
            $('#successAlert').removeClass('d-none');

            $('.error').text('');

        },
        error: function(err){
            $('#successAlert').addClass('d-none');
            if (err.status === 422) {
                let errors = err.responseJSON.errors;
                
                $('.error').text('');

                $.each(errors, function(field, messages) {
                    let msg = field === 'id_brand' ? 'Champs est obligatoire.' : messages[0];
                    $('#' + field + '_error').text(msg); 
                });
            }
        }

    }).always(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});

$('#addAugmentationForm').submit(function(e){
    e.preventDefault();

    let formData = new FormData(document.getElementById('addAugmentationForm'));
    formData.append('variations', variations);

    $.ajax({
        type: 'post',
        url: '/demande-augmentation/nouveau',
        data: formData,
        dataType: 'json',
        processData : false,
        contentType:false,
        success: function(resp){
            $('#addAugmentationForm')[0].reset();
            $('#successAlert').removeClass('d-none');
            variations = [];

            $("#VariationItems").empty();

            $('.error').text('');
        },
        error: function(err){
            $('#successAlert').addClass('d-none');
            if (err.status === 422) {
                let errors = err.responseJSON.errors;
                
                $('.error').text('');
                $.each(errors, function(field, messages) {
                    let msg = field === 'id_produit' ? 'Produit est obligatoire.' : messages[0];
                    $('#' + field + '_error').text(msg); 
                });
            }
        }

    })
});