import 'fullcalendar';

function init_fullcalendar() {

	var localeCode = "en-au";

	var started;
	var ended;
	var categoryClass;

	console.log("fullcalendar loaded!!!");

	$('#calendar').fullCalendar({
		//themeSystem: "bootstrap4",
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
		eventSources: [
			{
				url: "dashboard/eventslist",
			
				error: function (xhr, status, errorThrown ) {
					alert("Sorry, there was a problem!");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				},
				color: '#9DD9ED'
			}
		],

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
					$('#calendar').fullCalendar('renderEvent', {
						title: title,
						start: started,
						end: end,
						allDay: allDay
					},
						true // make the event "stick"
					);
				}

				$('#title').val('');

				$('#calendar').fullCalendar('unselect');

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

				$('#calendar').fullCalendar('updateEvent', calEvent);
				$('.antoclose2').click();
			});

			$('#calendar').fullCalendar('unselect');
		}
	})
}

$(document).ready(function () {
	init_fullcalendar();
});