// eslint-disable-next-line no-unused-vars
import * as dt_bs4 from "datatables.net-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_select_bs4 from "datatables.net-select-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_buttons_bs4 from "datatables.net-buttons-bs4"

export var save_method;

// eslint-disable-next-line no-unused-vars
export function init_datatables(obj, url) {
    return obj.DataTable({
        dom: "<'row'<'col-sm-12 'B>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        processing: true,
        serverSide: true,
        scrollY: 150,
        scrollCollapse: false,
        pageLength: 25,
        ordering: false,
        ajax: {
            url: url,
            type: 'POST',
            data: function (d) {
                d.category_code = $("#setting_category").val()
            }
        },
        columns: [
            {
                data: null,
                defaultContent: '',
            },
            {
                data: 'code_name',
            },
            {
                data: 'code_status',
            }
        ],
        columnDefs: [{
            searchable: false,
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        select: {
            style: 'single',
            selector: 'td:first-child'
        },
        buttons: {
            dom: {
                button: {
                    className: 'btn btn-primary btn-sm',
                },
                container: {
                    className: ''
                }
            },
            buttons: [
                {
                    text: '<svg class="icon"><use xlink:href="#plus-circle"></use></svg>',
                    titleAttr: 'Add',
                    action: function () {
                        save_method = "add";

                        $("#form_categories").find("input").removeClass("is-invalid");
                        $("#form_categories").find("input invalid-tooltip").empty();

                        $("#form_categories").find("select").removeClass("is-invalid");
                        $("#form_categories").find("select invalid-tooltip").empty();

                        $("#form_categories").find("input[type=text]").val("");
                        $("#form_categories").find("select").val("");
                        $("#form_categories").find("select").attr('disabled', false);

                        $("#categoriesInfo").modal("show");

                        $(".modal-title").text("Add Category");
                    }
                },
                {
                    text: '<svg class="icon"><use xlink:href="#edit"></use></svg>',
                    titleAttr: 'Edit',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        save_method = "edit";

                        $("#form_categories").find("input").removeClass("is-invalid");
                        $("#form_categories").find("input invalid-tooltip").empty();

                        $("#form_categories").find("select").removeClass("is-invalid");
                        $("#form_categories").find("select invalid-tooltip").empty();

                        $("#form_categories").find("input[type=text]").val("");
                        $("#form_categories").find("select").val("");
                        $("#form_categories").find("select").attr('disabled', false);
                        $("#form_categories").find("input[type=checkbox]").prop("checked", false);

                        var rowId = dt.row({ selected: true }).id();
                        $.ajax({
                            url: "settings/edit_categories/",
                            type: "POST",
                            dataType: "JSON",
                            data: {
                                id: rowId
                            },
                            success: function(data) {
                                $('[name="maincategory"]').val(data.mastercode);
                                $('[name="maincategory"]').attr('disabled', true);
                                $('[name="subcategoryname"]').val(data.subcodename);
                                $("#categoriesInfo").modal("show");
                                $(".modal-title").text("Edit Category");
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem to get category data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    },
                    enabled: false
                },
                {
                    text: '<svg class="icon"><use xlink:href="#minus-circle"></use></svg>',
                    titleAttr: 'Delete',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        var rowId = dt.row({ selected: true }).id();
                        if (confirm("Are you sure you wish to delete this?")) {
                            $.ajax({
                                url: "settings/delete_categories/",
                                type: "POST",
                                datatype: "JSON",
                                data: {
                                    id: rowId
                                },
                                // eslint-disable-next-line no-unused-vars
                                success: function (data) {
                                    dt.row({ selected: true }).deselect();
                                    dt.draw();
                                },
                                error: function (xhr, status, errorThrown) {
                                    alert("Sorry, there was a problem to delete category data");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                    console.dir(xhr);
                                }
                            });
                        }
                    },
                    enabled: false
                },
            ]
        },
        drawCallback: function () {
            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
        }
    });
}