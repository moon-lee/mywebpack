(function ($) {
    "use strict"; // Start of use strict

    console.log("sidebar toggle ready!!!");
        
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

})(jQuery); // End of use strict