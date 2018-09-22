export function sidebar_toggle() {
    console.log("sidebar toggle ready!!!");

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
}

export function addclass_active() {
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


