import "fullcalendar";
import "../../node_modules/fullcalendar/dist/fullcalendar.min.css"


function init_fullcalendar() {

	var localeCode = "en-au";
	console.log("fullcalendar loaded!!!");

	$('#calendar').fullCalendar({
		//themeSystem: "bootstrap4",
		header: {
			left: 'prev,next',
			center: 'title',
			right: 'today'
		},
		locale: localeCode,
		firstDay: 0,
		//aspectRatio: 1.86,

		eventLimit: true, // allow "more" link when too many events

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
		]
	})
}

$(document).ready(function () {
	init_fullcalendar();
});