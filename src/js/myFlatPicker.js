export function init_flatpicker(obj) {
    return obj.flatpickr({
        defaultDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        weekNumbers: true,
        onChange: function (selectedDates, dateStr, instance) {
            $("#obj").next().removeClass("is-invalid");
            $("#obj").next().next().empty();
        }
    });
}