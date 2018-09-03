import 'fullcalendar';
import "fullcalendar/dist/fullcalendar.min.css";

(function ($) {
  var localeCode = "en-au";

  $('#calendar').fullCalendar({
    themeSystem: "bootstrap4",
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    locale: localeCode,
    aspectRatio: 1.86,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events

  })
})(jQuery); // End of use strict;