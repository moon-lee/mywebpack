import * as myUtils from "./myUtils";
import * as myChart from "./myCharts";

export function payment_crud() {
    // Open Modal
    $("#addPayment").click(function (event) {
        $("#form_payment").find("input").removeClass("is-invalid");
        $("#form_payment").find("input invalid-tooltip").empty();
        $("#grossPay").val("");
        $("#netPay").val("");
        $("#withHolding").val("");
        $("#overTime_15").val("");
        $("#shiftAllow").val("");
        $("#baseHour").val("");
        $("#overTime_2").val("");
        $("#personalLeave").val("");
        $("#holidayPay").val("");
        $("#holidayLoad").val("");
        $("#holidayHours").val("");
        $("#superAnnuation").val("");
        $("#addPaymentinfo").modal("show");
    });

    //Submit Data
    $("#form_payment").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "payments/add_paydata",
            type: "POST",
            data: $("#form_payment").serialize(),
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#addPaymentinfo").modal("hide");
                    addPaymentData(myChart.paymentBarChart, data.saved_data);

                    // myChart.paymentBarChart.data.labels.push(data.saved_data.pay_date);
                    // myChart.paymentBarChart.data.datasets.forEach(function (dataset) {
                    //     switch (dataset.id) {
                    //         case "pay_base":
                    //             dataset.data.push(data.saved_data.pay_base);
                    //             break;
                    //         case "pay_shift":
                    //             dataset.data.push(data.saved_data.pay_shift);
                    //             break;
                    //         case "pay_overtime_1_5":
                    //             dataset.data.push(data.saved_data.pay_overtime_1_5);
                    //             break;
                    //         case "pay_overtime_2":
                    //             dataset.data.push(data.saved_data.pay_overtime_2);
                    //             break;
                    //         case "pay_personal_leave":
                    //             dataset.data.push(data.saved_data.pay_personal_leave);
                    //             break;
                    //         case "pay_holiday_pay":
                    //             dataset.data.push(data.saved_data.pay_holiday_pay);
                    //             break;
                    //         case "pay_holiday_load":
                    //             dataset.data.push(data.saved_data.pay_holiday_load);
                    //             break;
                    //         case "pay_withholding":
                    //             dataset.data.push(data.saved_data.pay_withholding);
                    //             break;
                    //         default:
                    //     }
                    // });
                    // myChart.paymentBarChart.update();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                    }
                }
            },
            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });

    // Clear Error
    $("#form_payment").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $("#grossPay").on("keyup", function () {
        var gross = $(this).val().replace(/,/g, "");
        var net = $("#netPay").val().replace(/,/g, "");
        var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
        myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    })

    $("#netPay").on("keyup", function () {
        var gross = $("#grossPay").val().replace(/,/g, "");
        var net = $(this).val().replace(/,/g, "");
        var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
        myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    })

    //format currency
    $("input[data-format-type='currency']").on({
        keyup: function () {
            myUtils.formatCurrency($(this));
        },
        blur: function () {
            myUtils.formatCurrency($(this), "blur");
        }
    });
    //refresh page
    $('#addPaymentinfo').on('hidden.bs.modal', function () {
        //location.reload();
    });

}


function addPaymentData(chart, data) {
    chart.data.labels.push(data.pay_date);
    chart.data.datasets.forEach(function (dataset) {
        switch (dataset.id) {
            case "pay_base":
                dataset.data.push(data.pay_base);
                break;
            case "pay_shift":
                dataset.data.push(data.pay_shift);
                break;
            case "pay_overtime_1_5":
                dataset.data.push(data.pay_overtime_1_5);
                break;
            case "pay_overtime_2":
                dataset.data.push(data.pay_overtime_2);
                break;
            case "pay_personal_leave":
                dataset.data.push(data.pay_personal_leave);
                break;
            case "pay_holiday_pay":
                dataset.data.push(data.pay_holiday_pay);
                break;
            case "pay_holiday_load":
                dataset.data.push(data.pay_holiday_load);
                break;
            case "pay_withholding":
                dataset.data.push(data.pay_withholding);
                break;
            default:
        }
    });
    chart.update();
}