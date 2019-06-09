import * as dtCategory from "./myDataTables_Category";
import * as dtKeyword from "./myDataTables_Keyword";
import * as dtTransaction from "./myDataTables_Transaction";

// eslint-disable-next-line no-unused-vars
var dt_category, dt_keyword, dt_transaction;

function setting_category_crud() {
    //Submit Data
    $("#form_categories").submit(function (event) {
        event.preventDefault();

        var ajax_url, error_msg, post_data;
        var rowId = dt_category.row({ selected: true }).id();

        if (dtCategory.save_method == 'add') {
            ajax_url = "settings/add_categories";
            error_msg = "Sorry, there was a problem to add category data";
            post_data = $("#form_categories").serialize();
        } else {
            ajax_url = "settings/update_categories";
            error_msg = "Sorry, there was a problem to update category data";
            post_data = $("#form_categories").serialize() + "&id=" + rowId;
        }

        $.ajax({
            url: ajax_url,
            type: "POST",
            data: post_data,
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#categoriesInfo").modal("hide");
                    if (dtCategory.save_method == 'edit') {
                        dt_category.row({ selected: true }).deselect();
                    }
                    dt_category.draw();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                    }
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(error_msg);
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });

    // Clear Error
    $("#form_categories").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $("#form_categories").find("select").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });


    // datatables select and deselect
    dt_category.on('select deselect', function () {
        var selectedRows = dt_category.rows({ selected: true }).count();
        dt_category.button(1).enable(selectedRows === 1);
        dt_category.button(2).enable(selectedRows === 1);
    });

    // Filer selection change
    $("#setting_category").change(function () {
        dt_category.ajax.reload();
    });
}


function setting_keyword_crud() {
    //Submit Data
    $("#form_keywords").submit(function (event) {
        event.preventDefault();

        var ajax_url, error_msg, post_data;
        var rowId = dt_keyword.row({ selected: true }).id();

        if (dtKeyword.save_method == 'add') {
            ajax_url = "settings/add_keywords";
            error_msg = "Sorry, there was a problem to add keyword data";
            post_data = $("#form_keywords").serialize();
        } else {
            ajax_url = "settings/update_keywords";
            error_msg = "Sorry, there was a problem to update keyword data";
            post_data = $("#form_keywords").serialize() + "&id=" + rowId;
        }

        $.ajax({
            url: ajax_url,
            type: "POST",
            data: post_data,
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#keywordsInfo").modal("hide");
                    if (dtKeyword.save_method == 'edit') {
                        dt_keyword.row({ selected: true }).deselect();
                    }
                    dt_keyword.draw();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                    }
                }
            },
            error: function (xhr, status, errorThrown) {
                alert(error_msg);
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });

    // Clear Error
    $("#form_keywords").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $("#form_keywords").find("select").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    // Dynamic select options 
    $("#keyword_mainCategory").change(function () {
        var mCategory = $(this).val();
        if (mCategory != '') {
            $.ajax({
                url: "settings/get_subcategory",
                type: "POST",
                datatype: "JSON",
                data: { mcategory_code: mCategory },
                success: function (data) {
                    $("#subCategory").html(data);
                },
                error: function (xhr, status, errorThrown) {
                    alert("Sorry, there was a problem to get sub category");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                }
            });
        } else {
            $("#subCategory").html('<option value="">Select Main Category first</option>');
        }

    });

    // datatables select and deselect
    dt_keyword.on('select deselect', function () {
        var selectedRows = dt_keyword.rows({ selected: true }).count();
        dt_keyword.button(1).enable(selectedRows === 1);
    });

    // Filer selection change
    $("#setting_keyword").change(function () {
        dt_keyword.ajax.reload();
    });
}

function setting_transaction_crud() {
    dt_transaction.on('select deselect', function () {
         var selectedRows = dt_transaction.rows({ selected: true }).count();
        dt_transaction.button(3).enable(selectedRows === 1);
        dt_transaction.button(4).enable(selectedRows === 1);
    });
    // Filer selection change
    $("#setting_trans").change(function () {
        dt_transaction.ajax.reload();
    });

    $("#setting_tStatus").change(function () {
        dt_transaction.ajax.reload();
    });
}

function load_transaction_data() {
    $("#form_load_trans").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "settings/load_transactions",
            type: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#form_load_trans").find("input[type=file]").val("");
                    $("#form_load_trans").find("label.custom-file-label").text("Choose file");
                    var msg = data.msg + "  " + data.upload_orig_name + "  " + data.upload_file_size + " (Kb).";
                    $("#load_trans_status").html("<p>" + msg + "</p>");
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                    }
                }
            },
            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem to upload spending data");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });

    // Clear Error
    $("#form_load_trans").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $('#loadTransModal').on('hidden.bs.modal', function () {
        location.reload(true);
    });
}

$(document).ready(function () {
    //call function
    dt_category = dtCategory.init_datatables($("#tb-categories"), "settings/list_categories");
    dt_keyword = dtKeyword.init_datatables($("#tb-keywords"), "settings/list_keywords");
    dt_transaction = dtTransaction.init_datatables($("#tb-load-spend"), "settings/list_tranactions");
    setting_category_crud();
    setting_keyword_crud();
    load_transaction_data();
    setting_transaction_crud();
});