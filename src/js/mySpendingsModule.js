import * as myUtils from "./myUtils";
import { init_flatpicker } from "./myWebext_Flatpickr";
import { init_datatables } from "./myDataTables_Spending";

var fp;
var dt;

function spending_crud() {
    //Submit Data
    $("#form_spending").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "spendings/add_spendingdata",
            type: "POST",
            data: $("#form_spending").serialize(),
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#addSpendinginfo").modal("hide");
                    dt.draw();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                    }
                }
            },
            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem to add spending data");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });

    // Clear Error
    $("#form_spending").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $("#form_spending").find("select").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    //format currency
    $("input[data-format-type='currency']").on({
        keyup: function () {
            myUtils.formatCurrency($(this));
        },
        blur: function () {
            myUtils.formatCurrency($(this), "blur");
        }
    });

    // Dynamic select options 
    $("#mainCategory").change(function () {
        var mCategory = $(this).val();
        if (mCategory != '') {
            $.ajax({
                url: "spendings/get_subcategory",
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
    dt.on('select deselect', function () {
        var selectedRows = dt.rows({ selected: true }).count();
        dt.button(2).enable(selectedRows === 1);
    });

    // Filer selection change
    $("#sp_year_month").change(function(){
        dt.ajax.reload();
    });

    $("#sp_category").change(function(){
        dt.ajax.reload();
    });

}

function upload_spend_data() {
    $("#form_upload").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "spendings/upload_spendingdata",
            type: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#form_upload").find("input[type=file]").val("");
                    $("#form_upload").find("label.custom-file-label").text("Choose file");
                    var msg = data.msg + "  " + data.upload_orig_name + "  " + data.upload_file_size + " (Kb).";
                    $("#upload_status").html("<p>" + msg + "</p>");
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
    $("#form_upload").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $('#uploadFile').on('hidden.bs.modal', function () {
        // dt.ajax.reload();
       location.reload(true);
    });
}

$(document).ready(function () {
    //call function
    fp = init_flatpicker($("#spendingDate"));
    dt = init_datatables($("#tb-spending"), "spendings/list_spendingdata", fp);
    spending_crud();
    upload_spend_data();
});