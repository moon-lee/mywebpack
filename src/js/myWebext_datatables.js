// eslint-disable-next-line no-unused-vars
//import * as dt from "datatables.net";
// eslint-disable-next-line no-unused-vars
import * as dt_bs4 from "datatables.net-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_select_bs4 from "datatables.net-select-bs4"
// eslint-disable-next-line no-unused-vars
import * as dt_buttons_bs4 from "datatables.net-buttons-bs4"

export function init_datatables(obj,url) {
    return obj.DataTable({
        dom: "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
             "<'row'<'col-sm-12'tr>>" +
             "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        processing: true,
        serverSide: true,
        pageLength: 15,
        ajax: {
            url: url,
            type: 'POST'
        },
        columns: [
            {
                data: null,
                defaultContent: ''
            },
            {data: 'spend_date'},
            {data: 'spend_category'},
            {data: 'spend_account'},
            {
                data:'spend_amount',
                render:$.fn.dataTable.render.number( ',', '.', 2, '$' ),
                className:'dt-body-right' 
            },
            {
                data: "spend_description",
                className:'dt-body-right'
            }
        ],
        order:[[1,'desc']],
        columnDefs :[{
            searchable: false,
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        buttons: {
            dom: {
                button: {
                    className: 'btn btn-primary btn-sm',
                }
            },
            buttons: [
                {
                    text: '<svg class="icon"><use xlink:href="#minus-circle"></use></svg> Delete Data',
                    // eslint-disable-next-line no-unused-vars
                    action: function(e, dt, node, config) {
                        var rowId = dt.row({ selected: true }).id();
                        console.log(rowId);
                        $.ajax({
                            url: "spendings/delete_spendingdata/",
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
                                alert("Sorry, there was a problem to delete spending data");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    },
                    enabled: false
                }
            ]
        }
    });
}