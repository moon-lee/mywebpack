// eslint-disable-next-line no-unused-vars
//import * as dt from "datatables.net";
// eslint-disable-next-line no-unused-vars
import * as dt_bs4 from "datatables.net-bs4"

export function init_datatables(obj,url) {
    return obj.DataTable({
        "processing": true,
        "serverSide": true,
        "lengthMenu": [ 15, 30, 50 ],
        "ajax": {
            "url": url,
            "type": "POST"
        },
        "columns": [
            {"data": "spend_date"},
            {"data": "spend_category"},
            {"data": "spend_account"},
            {
                data:'spend_amount',
                render:$.fn.dataTable.render.number( ',', '.', 2, '$' ),
                className:'dt-body-right table-primary' 
            },
            {
                "data": "spend_description",
                className:'dt-body-right'
            }
        ],
        "order":[[0,'desc']]
    });
}