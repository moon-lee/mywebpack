import * as myFonts from "./myFontawesome";
import * as myUtils from "./myUtils";

function sidebar_toggle() {
    console.log("sidebar toggle ready!!!");

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
}

function addclass_active() {
    console.log("sidebar list add active class!!!");

    $('.sidebar-list > ul > li').find('a').click(function (e) {
        var $li = $(this).parent();
        if ($li.is('.active')) {
            $li.removeClass('active');
        } else {
            $li.addClass('active');
        }
    });
}

function format_input() {

    console.log("input format ready");
    $("input[data-format-type='currency']").on({
        keyup: function () {
            myUtils.formatCurrency($(this));
        },
        blur: function () {
            myUtils.formatCurrency($(this), "blur");
        }
    });
    
}

function add_payment() {
    $("#form_payment").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url : "payments/add_paydata",
            type : "POST",
            data: $("#form_payment").serialize(),
            datatype : "JSON",
            success : function (data) {
                data = JSON.parse(data);
                console.log(data.status);
                if (data.status) {
                    console.log("hit");

                    $("#addPaymentinfo").modal("hide");
                    $("#form_payment")[0].reset();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        $('[name="' + data.inputerror[i] + '"]').parent().parent().addClass('has-error'); //select parent twice to select div form-group class and add has-error class
                        $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]); //select span help-block class set text error string
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
}

$(document).ready(function () {
    //call function
    addclass_active();
    sidebar_toggle();
    format_input();
    myFonts.init_fonts();
    add_payment();
});




