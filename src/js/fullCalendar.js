import 'fullcalendar';
import "fullcalendar/dist/fullcalendar.min.css";

(function ($) {
  var localeCode = "en-au";
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var started; 
  var ended;
  var categoryClass;

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
    selectable: true,
    selectHelper: true,

    select: function (start, end, allDay) {
      $('#fc_create').click();

      started = start;
      ended = end;

      $(".antosubmit").on("click", function () {
        var title = $("#title").val();
        if (end) {
          ended = end;
        }

        categoryClass = $("#event_type").val();

        if (title) {
          calendar.fullCalendar('renderEvent', {
            title: title,
            start: started,
            end: end,
            allDay: allDay
          },
            true // make the event "stick"
          );
        }

        $('#title').val('');

        calendar.fullCalendar('unselect');

        $('.antoclose').click();

        return false;
      });
    },
    eventClick: function (calEvent, jsEvent, view) {
      $('#fc_edit').click();
      $('#title2').val(calEvent.title);

      categoryClass = $("#event_type").val();

      $(".antosubmit2").on("click", function () {
        calEvent.title = $("#title2").val();

        calendar.fullCalendar('updateEvent', calEvent);
        $('.antoclose2').click();
      });

      calendar.fullCalendar('unselect');
    }
  })
})(jQuery); // End of use strict;