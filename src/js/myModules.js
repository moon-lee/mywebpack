import * as myFonts from "./myFontawesome";
import * as myUtils from "./myUtils";

var max_items = 10;
var item_cnt = 0;
var selected_opts = [];
var select_opts = [];
var flitered_opts = [];

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
        $(".dynamic-element:first").nextAll().remove();
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
        console.log("close here");
        var elements = $(".dynamic-element:first").nextAll();
        elements.find("label").each(function () {
            delete_options($(this).text());
            flitered_options();
            //attach_options();
        });
        //location.reload();
    });

    $("#addDetails").click(function () {
        if (item_cnt === 0) {
            select_options();
        }

        if (item_cnt < max_items) {
            item_cnt++;
            var selectedOpt = $("#detailOpts").find("option:selected");
            if (selectedOpt.val() > 0) {
                var clonedElement = $(".dynamic-element").first().clone(true).appendTo(".modal-body").show();
                clonedElement.find("#payItems").val(selectedOpt.val());
                clonedElement.find("label").text(selectedOpt.text());
                selected_options();
                flitered_options();
                //attach_options();
                attach_delete();
            }
        }
    });

    function select_options() {
        select_opts = [];
        $("#detailOpts").find("option").each(function () {
            select_opts.push({
                value: $(this).val(),
                text: $(this).text()
            });
        });
    }

    function attach_options() {
        $("#detailOpts").empty().data("options");
        flitered_opts.forEach(function (flitered) {
            $("#detailOpts").append(
                $("<option>").text(flitered.text).val(flitered.value));
        });
    }


    function selected_options() {
        $("#detailOpts").find("option:selected").each(function () {
            var idx = selected_opts.findIndex(option => option.value === $(this).val());

            if (idx === -1) {
                selected_opts.push({
                    value: $(this).val(),
                    text: $(this).text()
                });
            }
        });
    }

    function flitered_options() {
        flitered_opts = [];
        select_opts.forEach(function (select) {
            var idx = selected_opts.findIndex(selected => selected.value === select.value);

            if (idx === -1) {
                flitered_opts.push({
                    value: select.value,
                    text: select.text,
                });
            }
        });

        $("#detailOpts").empty().data("options");
        flitered_opts.forEach(function (flitered) {
            $("#detailOpts").append(
                $("<option>").text(flitered.text).val(flitered.value));
        });
    }

    function delete_options(text) {
        var idx = selected_opts.findIndex(selected => selected.text === text);
        if (idx > -1) {
            selected_opts.splice(idx, 1);
        }
    }


    function attach_delete() {
        $(".removeDetail").off();
        $(".removeDetail").click(function (event) {
            var deleted_opt = $(this).closest(".form-group").find("label").text();
            delete_options(deleted_opt);
            flitered_options();
            //attach_options();
            $(this).closest(".form-group").remove();
            if (item_cnt > 0) {
                item_cnt--;
            }
        });
    }
}

$(document).ready(function () {
    //call function
    myFonts.init_fonts();

    sidebar_toggle();
    payment_crud();
});




