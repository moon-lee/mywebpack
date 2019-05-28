import * as dtCategory from "./myDataTables_Category";
import * as dtKeyword from "./myDataTables_Keyword";

var dt_category, dt_keyword;

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
    // datatables select and deselect
    dt_keyword.on('select deselect', function () {
        var selectedRows = dt_keyword.rows({ selected: true }).count();
        dt_keyword.button(1).enable(selectedRows === 1);
        dt_keyword.button(2).enable(selectedRows === 1);
    });
}

$(document).ready(function () {
    //call function
    dt_category = dtCategory.init_datatables($("#tb-categories"), "settings/list_categories");
    dt_keyword = dtKeyword.init_datatables($("#tb-keywords"), "settings/list_keywords");
    setting_category_crud();
    setting_keyword_crud();
});