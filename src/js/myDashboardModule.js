import flatpickr from "flatpickr";

var fp_task = $("#taskDueDate").flatpickr({
    //defaultDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    weekNumbers: true,
    onChange: function (selectedDates, dateStr, instance) {
        $("#taskDueDate").next().removeClass("is-invalid");
        $("#taskDueDate").next().next().empty();
    }
});

function tasklist_crud() {
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
                    get_task_detail(1);
                    //task_pagination();
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

function get_task_detail(page) {

    $.ajax({
        url: "dashboard/pagination_task/" + page,
        type: "POST",
        datatype: "JSON",
        success: function (data) {
            data = JSON.parse(data);
            $("#task_pagination_link").html(data.pagination_link);
            $("#task_details").html(data.task_details);

        },
        error: function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }
    });
}

function task_pagination() {
    $(document).on("click", ".pagination li a", function (event) {
        event.preventDefault();
        var page = $(this).data("ci-pagination-page");
        get_task_detail(page);
    });
}

function task_delete() {
    $(document).on("click", ".task-list li #delete_task", function (event) {
        event.preventDefault();
        var element = $(this).parents(".task_item").find(".badge");
        var task_id = element.data("task-id");

        if (confirm("Are you sure you wish to delete this task?")) {
            $.ajax({
                url: "dashboard/delete_taskitem/" + task_id,
                type: "POST",
                datatype: "JSON",
                success: function (data) {
                    data = JSON.parse(data);
                    get_task_detail(1);
                },
                error: function (xhr, status, errorThrown) {
                    alert("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                }
            });
        }
    });
}


$(document).ready(function () {
    //call function
    tasklist_crud();
    get_task_detail(1);
    task_pagination();
    task_delete();
});