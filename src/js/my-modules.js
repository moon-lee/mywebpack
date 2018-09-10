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

function get_events() {
    console.log("Calendar events loaded!!!");
    $('#event_load').on('click', function () {
        var url = "dashboard/eventslist";

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
        })
        .done(function (data) {
            $.each(data, function (key, value) {
                $("<p>").text("ID : " + value.id).appendTo("body");
                $("<p>").text("Summary : " + value.title).appendTo("body"); 
                $("<p>").text("Start date : " + value.start).appendTo("body");
                $("<p>").text("End date : " + value.end).appendTo("body");
            });
            // $("<h1>").text(json.name).appendTo("body");
            // $("<div class=\"content\">").html(json.name).appendTo("body");
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function (xhr, status) {
            console.log("The request is complete!");
        });
    });
}

export { sidebar_toggle, addclass_active, get_events };

