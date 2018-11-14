import * as myUtils from "./myUtils";
import flatpickr from "flatpickr";

var fp_spendingDate = $("#spendingDate").flatpickr({
    defaultDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    weekNumbers: true,
    onChange: function (selectedDates, dateStr, instance) {
        $("#spendingDate").next().removeClass("is-invalid");
        $("#spendingDate").next().next().empty();
    }
});

function spending_crud() {
    // Open Modal
    $("#addSpending").click(function (event) {
        $("#form_spending").find("input").removeClass("is-invalid");
        $("#form_spending").find("input invalid-tooltip").empty();
        fp_spendingDate.clear();
        $("#addSpendinginfo").modal("show");
    });

    //Submit Data
    $("#form_spending").submit(function (event) {
        event.preventDefault();
        // $.ajax({
        //     url: "payments/add_paydata",
        //     type: "POST",
        //     data: $("#form_payment").serialize(),
        //     datatype: "JSON",
        //     success: function (data) {
        //         data = JSON.parse(data);
        //         if (data.status) {
        //             $("#addPaymentinfo").modal("hide");
        //             get_payment_detail(1);
        //             get_payment_summary();
        //         } else {
        //             for (var i = 0; i < data.inputerror.length; i++) {
        //                 if (data.inputerror[i] == "bpaymentdate") {
        //                     $('[name="' + data.inputerror[i] + '"]').next().addClass('is-invalid');
        //                     $('[name="' + data.inputerror[i] + '"]').next().next().text(data.error_string[i]);

        //                 } else {
        //                     $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
        //                     $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
        //                 }
        //             }
        //         }
        //     },
        //     error: function (xhr, status, errorThrown) {
        //         alert("Sorry, there was a problem!");
        //         console.log("Error: " + errorThrown);
        //         console.log("Status: " + status);
        //         console.dir(xhr);
        //     }
        // });
    });

    // Clear Error
    $("#form_spending").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    // $("#grossPay").on("keyup", function () {
    //     var gross = $(this).val().replace(/,/g, "");
    //     var net = $("#netPay").val().replace(/,/g, "");
    //     var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
    //     myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    // })

    // $("#netPay").on("keyup", function () {
    //     var gross = $("#grossPay").val().replace(/,/g, "");
    //     var net = $(this).val().replace(/,/g, "");
    //     var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
    //     myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    // })

    //format currency
    $("input[data-format-type='currency']").on({
        keyup: function () {
            myUtils.formatCurrency($(this));
        },
        blur: function () {
            myUtils.formatCurrency($(this), "blur");
        }
    });

    // payment_barctx.on("click", function (event) {
    //     event.preventDefault();
    //     $("#paymentContextMenu").removeClass("show").hide();
    // });

    // $("body").on("click", function () {
    //     $("#paymentContextMenu").removeClass("show").hide();
    // });

    // payment_barctx.contextmenu(function (event) {
    //     event.preventDefault();

    //     var activePoints = paymentBarChart.getElementsAtEvent(event);
    //     if (activePoints.length > 0) {

    //         var clickedElementindex = activePoints[0]._index;
    //         var label = paymentBarChart.data.labels[clickedElementindex];
    //         var meta = paymentBarChart.getDatasetMeta(8);
    //         var value = meta.controller._data[activePoints[0]._index]
    //         // console.log("Clicked: " + label + " - " + value);

    //         var chartTop = activePoints[0]._chart.canvas.offsetTop;
    //         var chartLeft = activePoints[0]._chart.canvas.offsetLeft;
    //         var contextTop = event.offsetY + chartTop;
    //         var contextLeft = event.offsetX + chartLeft;

    //         $("#paymentContextMenu").css({
    //             display: "block",
    //             position: "absolute",
    //             left: contextLeft,
    //             top: contextTop
    //         }).addClass("show");
    //         $("#paymentContextMenu .dropdown-item").data("paymentDetailKey", {
    //             payDate: label,
    //             payId: value
    //         });
    //     }
    // });

    // $("#paymentContextMenu a").on("click", function () {
    //     $(this).parent().removeClass("show").hide();

    //     var selectOpt = $(this).text();
    //     var selectedId = $(this).data("paymentDetailKey").payId;
    //     var selectedDate = $(this).data("paymentDetailKey").payDate;


    //     switch (selectOpt) {
    //         case "Update":
    //             // console.log(selectOpt);
    //             break;
    //         case "Delete":
    //             // console.log(selectOpt);
    //             delete_payment_detail(selectedId, selectedDate);
    //             break;
    //         default:
    //             // break;
    //     }

    // });

}

$(document).ready(function () {
    //call function
    spending_crud();
});