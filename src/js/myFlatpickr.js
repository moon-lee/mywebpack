import flatpickr from "flatpickr";

function payment_datepick() {
    console.log("payment datepicker ready");
    var ctx = $("#paymentDate");
    var fp = flatpickr(ctx, {});
}

$(document).ready(function () {
    payment_datepick();
});