// eslint-disable-next-line no-unused-vars
import * as fp from "flatpickr";

export function init_flatpicker(obj) {
    return obj.flatpickr({
        defaultDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        weekNumbers: true,
        onChange: function () {
            $("#obj").next().removeClass("is-invalid");
            $("#obj").next().next().empty();
        }
    });
}
