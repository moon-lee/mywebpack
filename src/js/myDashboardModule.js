import flatpickr from "flatpickr";

var fp_task = $("#taskDueDate").flatpickr({
    //defaultDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    weekNumbers: true,
});
function payment_datepick() {
    // flatpickr("#taskDueDate", {
    //     defaultDate: "today",
    //     altInput: true,
    //     altFormat: "F j, Y",
    //     dateFormat: "Y-m-d",
    //     weekNumbers: true,
    // });

    // $("#taskDueDate").flatpickr({
    //     //defaultDate: "today",
    //     altInput: true,
    //     altFormat: "F j, Y",
    //     dateFormat: "Y-m-d",
    //     weekNumbers: true,
    // });
}

function todolist_crud() {
    $("#addTaskList").click(function (event) {
        $("#form_task").find("input").removeClass("is-invalid");
        $("#form_task").find("input invalid-tooltip").empty();
        $("#form_task").find("select").removeClass("is-invalid");
        $("#form_task").find("select").next().empty();
        $("#form_task").find("select").val("0");
        fp_task.clear();
        $("#taskItem").val("");

        $("#addTask").modal("show");
    });

    // Clear Error
    $("#form_task").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });
    $("#form_task").find("select").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next().empty();
    });

    //Submit Data
    $("#form_task").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "dashboard/add_taskitem",
            type: "POST",
            data: $("#form_task").serialize(),
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#addTask").modal("hide");
                    // get_payment_detail(1);
                    // payment_pagination();
                    // get_payment_summary();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {

                        if (data.inputerror[i] == "task_due_date") {
                            $('[name="' + data.inputerror[i] + '"]').next().addClass('is-invalid');
                            $('[name="' + data.inputerror[i] + '"]').next().next().text(data.error_string[i]);

                        } else {
                            $('[name="' + data.inputerror[i] + '"]').addClass('is-invalid');
                            $('[name="' + data.inputerror[i] + '"]').next().text(data.error_string[i]);
                        }
                    }
                }
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