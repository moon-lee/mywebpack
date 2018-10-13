import * as myUtils from "./myUtils";

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
