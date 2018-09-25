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

$(document).ready(function () {
    //call function
    addclass_active();
    sidebar_toggle();
    format_input();

    myFonts.init_fonts();
});


