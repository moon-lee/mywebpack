import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css"


function payment_datepick() {
    console.log("payment datepicker ready");
    flatpickr("#paymentDate", {});
}

$(document).ready(function () {
    payment_datepick();
});