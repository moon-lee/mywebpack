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

// function getUploadFileName() {
//     $(".custom-file-input").on("change", function () {
//         var fileName = $(this).val().split("\\").pop();
//         //$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
//         $(this).siblings(".custom-file-label").html(fileName);
//     });
// }

$(document).ready(function () {
    //call function
    myFonts.init_fonts();
    sidebar_toggle();
    //getUploadFileName();
});


