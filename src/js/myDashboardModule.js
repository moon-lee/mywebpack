import { init_flatpicker } from "./myWebext_Flatpickr";

function tasklist_crud() {
    // Open Modal
    $("#addTaskList").click(function (event) {
        $("#form_task").find("input").removeClass("is-invalid");
        $("#form_task").find("input invalid-tooltip").empty();
        $("#form_task").find("select").removeClass("is-invalid");
        $("#form_task").find("select").next().empty();
        $("#form_task").find("select").val("0");
        $("#taskItem").val("");
        $("#taskItemLength").text("[" + $("#taskItem").val().length + "/" + $("#taskItem").attr('maxlength') + "]");

        $("#addTask").modal("show");
    });

    // Clear Error
    $("#form_task").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });
    $("#form_task").find("select").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
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

    $("#taskItem").on("keyup", function () {
        var maxLength = $(this).attr('maxlength');
        var currentLength = "[" + $(this).val().length + "/" + maxLength + "]";
        $("#taskItemLength").text(currentLength);
    });

    //task pagination click event
    $(document).on("click", ".pagination li a", function (event) {
        event.preventDefault();
        var page = $(this).data("ci-pagination-page");
        get_task_detail(page);
    });

    //Delete task
    $(document).on("click", ".task-list li #delete_task", function (event) {
        event.preventDefault();
        var element = $(this).parents(".task_item").find(".badge");
        var task_id = element.data("task-id");

        if (confirm("Are you sure you wish to delete this task?")) {
            $.ajax({
                url: "dashboard/update_taskstatus/",
                type: "POST",
                datatype: "JSON",
                data: {
                    id: task_id,
                    task_status: 99
                },
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


    //Update task status
    $(document).on("click", ".task-list li input", function (event) {
        console.log($(this));

        var element_parent = $(this).parents(".task_item");
        var task_id = element_parent.find(".badge").data("task-id");
        element_parent.toggleClass("done");
        var task_status = 0;

        if (element_parent.is('.done')) {
            task_status = 1;
        } else {
            task_status = 0;
        }


        $.ajax({
            url: "dashboard/update_taskstatus/",
            type: "POST",
            datatype: "JSON",
            data: {
                id: task_id,
                task_status: task_status
            },
            success: function (data) {},
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


$(document).ready(function () {
    //call function
    init_flatpicker($("#taskDueDate"));
    tasklist_crud();
    get_task_detail(1);
});