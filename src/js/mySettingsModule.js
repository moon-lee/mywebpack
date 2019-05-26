import { init_datatables, save_method } from "./myDataTables_Category";

var dt;

function setting_category_crud() {
        //Submit Data
        $("#form_categories").submit(function (event) {
            event.preventDefault();

            var ajax_url, error_msg, post_data;
            var rowId = dt.row({ selected: true }).id();

            if (save_method == 'add') {
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
                        if (save_method == 'edit') {
                            dt.row({ selected: true }).deselect();
                        }
                        dt.draw();
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
    dt.on('select deselect', function () {
        var selectedRows = dt.rows({ selected: true }).count();
        dt.button(1).enable(selectedRows === 1);
        dt.button(2).enable(selectedRows === 1);
    });

     // Filer selection change
    $("#setting_category").change(function(){
        dt.ajax.reload();
    });   
}


$(document).ready(function () {
    //call function
    dt = init_datatables($("#tb-categories"), "settings/list_categories");
    setting_category_crud();
});