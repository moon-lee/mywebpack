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
            },
            dataSrc: function (json) {
                var table = $('#tb-load-spend').DataTable();
                if (json.enable_match) {
                    table.button(1).enable();
                } else {
                    table.button(1).disable();
                }
                if (json.enable_apply) {
                    table.button(2).enable();
                } else {
                    table.button(2).disable();
                }
                if (json.enable_archive) {
                    table.button(5).enable();
                } else {
                    table.button(5).disable();
                }
                return json.data;
            }
        },
        columns: [
            {
                data: null,
                defaultContent: '',
                width: '3%'
            },
            {
                data: 'trans_date',
                width: '12%'
            },
            {
                data: 'trans_desc',
                width: '50%'
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
                            beforeSend: function () {
                                dt.buttons(1).disable();
                            },
                            success: function(data) {
                                if (data.status) {
                                    dt.draw();
                                    var msg = 'Total match transcations are ' + data.recordsMatched + ' of ' + data.recordsTotal + ' entries';
                                    $("#toast_message").html(msg);
                                    $('.toast').toast('show');
                                }
                            },
                            complete: function () {
                                dt.buttons(1).enable();
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem to match category to transaction data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                        
                    },
                    enabled: false
                },
                {
                    text: '<svg class="icon"><use xlink:href="#file-import"></use></svg>',
                    titleAttr: 'Apply Data',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        $.ajax({
                            url: "settings/apply_transactions",
                            type: "POST",
                            dataType: "JSON",
                            beforeSend: function () {
                                dt.buttons(2).disable();
                            },
                            success: function(data) {
                                if (data.status) {
                                    dt.draw();
                                    var msg = 'Total apply transcations are ' + data.recordsApply + ' of ' + data.recordsTotal + ' entries';
                                    $("#toast_message").html(msg);
                                    $('.toast').toast('show');                               }
                            },
                            complete: function () {
                                dt.buttons(2).enable();
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem to apply transaction data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    },
                    enabled: false
                },
                {
                    text: '<svg class="icon"><use xlink:href="#edit"></use></svg>',
                    titleAttr: 'Edit',
                    action: function () {
                        alert("Sorry, still this function is developing");
                    },
                    enabled: false
                },
                {
                    text: '<svg class="icon"><use xlink:href="#minus-circle"></use></svg>',
                    titleAttr: 'Delete',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        alert("Sorry, still this function is developing");
                    },
                    enabled: false
                },
                {
                    text: '<svg class="icon"><use xlink:href="#archive"></use></svg>',
                    titleAttr: 'Archive',
                    // eslint-disable-next-line no-unused-vars
                    action: function (e, dt, node, config) {
                        $.ajax({
                            url: "settings/archive_transactions",
                            type: "POST",
                            dataType: "JSON",
                            beforeSend: function () {
                                dt.buttons(5).disable();
                            },
                            success: function(data) {
                                if (data.status) {
                                    dt.draw();
                                    var msg = 'Total archive transcations are ' + data.recordsArchive + ' of ' + data.recordsTotal + ' entries';
                                    $("#toast_message").html(msg);
                                    $('.toast').toast('show');                               }
                            },
                            complete: function () {
                                dt.buttons(5).enable();
                            },
                            error: function (xhr, status, errorThrown) {
                                alert("Sorry, there was a problem to apply transaction data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    },
                    enabled: false
                }
            ]
        },
        drawCallback: function () {
            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
        }
    });
}