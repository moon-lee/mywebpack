import * as myFonts from "./myFontawesome";

function sidebar_toggle() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('.sidebar-list > ul > li').find('a').click(function () {
        var parent_element = $(this).parent();
        if (parent_element.is('.active')) {
            parent_element.removeClass('active');
        } else {
            parent_element.addClass('active');
        }
    });
}

function getNewColor() {
    $("#getColor").click(function () {
        var symbols, color;
        symbols = "0123456789ABCDEF";

        color = "#";

        for (var i = 0; i < 6; i++) {
            color += symbols[Math.floor(Math.random() * 16)];
        }

        $(".cd-color").css("background", color);
        $("#hex").text(color);

    });
}

function getUploadFileName() {
    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
}

$(document).ready(function () {
    //call function
    myFonts.init_fonts();
    sidebar_toggle();
    getNewColor();
    getUploadFileName();
});


