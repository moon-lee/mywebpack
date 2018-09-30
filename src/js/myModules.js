import * as myFonts from "./myFontawesome";
import * as myUtils from "./myUtils";

function sidebar_toggle() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('.sidebar-list > ul > li').find('a').click(function (e) {
        var $li = $(this).parent();
        if ($li.is('.active')) {
            $li.removeClass('active');
        } else {
            $li.addClass('active');
        }
    });
}


function payment_crud() {
    // Open Modal
    $("#addPayment").click(function (event) {
        $("#form_payment").find("input").removeClass("is-invalid");
        $("#form_payment").find("input").next().empty();
        $("#grossPay").val(""); 
        $("#netPay").val("");
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
        $(this).next().empty();
    }); 

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
        location.reload();
    })

}

$(document).ready(function () {
    //call function
    myFonts.init_fonts();

    sidebar_toggle();
    payment_crud();
});




