// eslint-disable-next-line no-unused-vars
import * as dt_bs4 from "datatables.net-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_select_bs4 from "datatables.net-select-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_buttons_bs4 from "datatables.net-buttons-bs4"

// eslint-disable-next-line no-unused-vars
export function init_datatables(obj, url) {
    return obj.DataTable({
        dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        processing: true,
        serverSide: true,
        scrollY: 500,
        scrollCollapse: false,
        pageLength: 25,
        ordering: false,
        ajax: {
            url: url,
            type: 'POST',
            // eslint-disable-next-line no-unused-vars
            data: function (d) {
                d.category_code = $("#setting_trans").val();
                d.tstatus = $("#setting_tStatus").val();
            }
        },
        columns: [
            {
                data: 'trans_date',
                width: '12%'
            },
            {
                data: 'trans_desc',
                width: '53%'
            },
            {
                data: 'trans_code',
                width: '25%'
            },
            {
                data: 'trans_status',
                 width: '5%'
            },
            {
                data: 'trans_amount',
                render:$.fn.dataTable.render.number( ',', '.', 2, '$' ),
                className:'dt-body-right',
                width: '5%'
            }
 
        ],
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
                    text: '<svg class="icon"><use xlink:href="#file-upload"></use></svg>',
                    titleAttr: 'Load Data',
                    action: function () {

                        $("#form_load_trans").find("input").removeClass("is-invalid");
                        $("#form_load_trans").find("input invalid-tooltip").empty();
                        $("#form_load_trans").find("input[type=file]").val("");
                        $("#form_load_trans").find("label.custom-file-label").text("Choose file");
                        $("#load_trans_status").html("");

                        $("#loadTransModal").modal("show");
                    }
                },
                {
                    text: '<svg class="icon"><use xlink:href="#file-alt"></use></svg>',
                    titleAttr: 'Match Data',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        $.ajax({
                            url: "settings/match_transactions",
                            type: "POST",
                            dataType: "JSON",
                            success: function(data) {
                                //data = JSON.parse(data);
                                if (data.status) {
                                    dt.draw();
                                }
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem to get category data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    }
                },
                {
                    text: '<svg class="icon"><use xlink:href="#file-import"></use></svg>',
                    titleAttr: 'Apply Data',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                    //     var rowId = dt.row({ selected: true }).id();
                    //     if (confirm("Are you sure you wish to delete this?")) {
                    //         $.ajax({
                    //             url: "settings/delete_categories/",
                    //             type: "POST",
                    //             datatype: "JSON",
                    //             data: {
                    //                 id: rowId
                    //             },
                    //             // eslint-disable-next-line no-unused-vars
                    //             success: function (data) {
                    //                 dt.row({ selected: true }).deselect();
                    //                 dt.draw();
                    //             },
                    //             error: function (xhr, status, errorThrown) {
                    //                 alert("Sorry, there was a problem to delete category data");
                    //                 console.log("Error: " + errorThrown);
                    //                 console.log("Status: " + status);
                    //                 console.dir(xhr);
                    //             }
                    //         });
                    //     }
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