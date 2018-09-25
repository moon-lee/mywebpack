import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css"


function payment_datepick() {
    console.log("payment datepicker ready");
    flatpickr("#paymentDate", {
        defaultDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        weekNumbers: true
    });
}

$(document).ready(function () {
    payment_datepick();
});