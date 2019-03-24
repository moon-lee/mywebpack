//import * as dt from "datatables.net";
// eslint-disable-next-line no-unused-vars
import * as dt_bs4 from "datatables.net-bs4"

export function init_datatables(obj,url) {
    return obj.DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": url,
            "type": "POST"
        },
        "columns": [
            {"data": "spend_date"},
            {"data": "spend_category"},
            {"data": "spend_amount"},
            {"data": "spend_account"},
            {"data": "spend_description"}
        ],
        "order":[[0,'desc']],
        "orderFixed": { 
            "post": [ 0, 'desc' ]
        }
    });
}