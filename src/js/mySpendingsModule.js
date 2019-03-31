import * as myUtils from "./myUtils";
import { init_flatpicker } from "./myWebext_Flatpickr";
import { init_datatables } from "./myWebext_datatables";

var fp;
var dt;

function spending_crud() {
    // Open Modal
    $("#addSpending").click(function () {
        $("#form_spending").find("input").removeClass("is-invalid");
        $("#form_spending").find("input invalid-tooltip").empty();

        $("#form_spending").find("select").removeClass("is-invalid");
        $("#form_spending").find("select invalid-tooltip").empty();

        $("#form_spending").find("input[type=text]").val("");
        $("#form_spending").find("select").val("");
        $("#form_spending").find("input[type=checkbox]").prop("checked", false);
        fp.setDate(new Date());

        $("#addSpendinginfo").modal("show");
    });

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
        console.log(mCategory);
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
    dt.on('select deselect', function() {
        var selectedRows = dt.rows({selected:true}).count();
        dt.button(0).enable(selectedRows === 1);
    });
}


$(document).ready(function () {
    //call function
    fp = init_flatpicker($("#spendingDate"));
    dt = init_datatables($("#tb-spending"), "spendings/list_spendingdata");
    spending_crud();
});