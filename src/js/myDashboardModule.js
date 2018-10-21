import flatpickr from "flatpickr";


function payment_datepick() {
    flatpickr("#todo_Date", {
        defaultDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        weekNumbers: true,
    });
}

function todolist_crud () {
    $("#addTodo_list").click(function (event) {
        $("#addtodo").modal("show");
    });

    //Submit Data
    $("#form_todo").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "#",
            type: "POST",
            data: $("#form_todo").serialize(),
            datatype: "JSON",
            success: function (data) {
                //data = JSON.parse(data);
                $("#addtodo").modal("hide");
            },
            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    });
}

$(document).ready(function () {
    //call function
    todolist_crud();
    payment_datepick();
});