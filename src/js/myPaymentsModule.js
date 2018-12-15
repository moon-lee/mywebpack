import * as myUtils from "./myUtils";
import Chart from "chart.js";
import flatpickr from "flatpickr";


const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    grey2: '#727272',
    ramdon: '#28a745'
};

var plugin = {
    afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;
        ctx.fillStyle = 'rgb(0, 0, 0)';

        var fontSize = 12;
        var fontStyle = 'normal';
        var fontFamily = 'Helvetica Neue';
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        // Make sure alignment settings are correct
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var save_data = [];

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);

            // console.log(meta);
            // console.log(i);

            if (!chart.data.datasets[i].hidden) {
                meta.data.forEach(function (element, index) {
                    var dataString = dataset.data[index];
                    var datavalue = parseFloat(dataString);
                    var position = element.tooltipPosition();
                    save_data.push(dataString);

                    if (datavalue > 0) {
                        dataString = "$" + datavalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        if (datavalue < 35) {
                            ctx.fillText(dataString, position.x, position.y + (fontSize / 2) - 2);
                        } else if (datavalue < 65) {
                            ctx.fillText(dataString, position.x, position.y + (fontSize / 2) + 4);
                        } else if (datavalue >= 65) {
                            ctx.fillText(dataString, position.x, position.y + (fontSize / 2) + 8);
                        }
                    } else if (datavalue < 0) {
                        dataString = "-$" + datavalue.toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        if (datavalue < 0) {
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - 8);
                        }
                    }
                });
                // }
            }
        });
    }
}

var color = Chart.helpers.color;

var payment_BarChartData = {
    labels: [],
    datasets: [{
            label: "BASE",
            data: [],
            fill: 'origin',
            stack: "Stack 0",
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            id: "pay_base",
        },
        {
            label: "SHIFT",
            data: [],
            fill: '-1',
            stack: "Stack 0",
            backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
            id: "pay_shift"
        },
        {
            label: "OVERTIME(1.5)",
            data: [],
            //fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
            id: "pay_overtime_1_5"
        },
        {
            label: "OVERTIME(2)",
            data: [],
            fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.green).alpha(1.5).rgbString(),
            id: "pay_overtime_2"
        },
        {
            label: "PERSONAL LEAVE",
            data: [],
            fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
            id: "pay_personal_leave"
        },
        {
            label: "HOLIDAY PAY",
            data: [],
            fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.yellow).alpha(1.5).rgbString(),
            id: "pay_holiday_pay"
        },
        {
            label: "HOLIDAY LOAD",
            data: [],
            fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
            id: "pay_holiday_load"
        },
        {
            label: "WITHHOLDING (PAYG)",
            data: [],
            fill: 1,
            stack: "Stack 0",
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            id: "pay_withholding"
        },
        {
            label: "ID",
            data: [],
            stack: "Stack 0",
            hidden: true,
            id: "pay_id"
        }
    ]
};

var tooltips_callbacks = {
    label: function (tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label;
        var value = tooltipItem.yLabel;
        if (value < 0) {
            return label + " : -$" + value.toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        } else if (value > 0) {
            return label + " : $" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
    },
    footer: function (tooltipItems, data) {
        var sum = 0;
        tooltipItems.forEach(function (tooltipItem) {
            if (tooltipItem.datasetIndex < 7) {
                sum += parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            }
        });
        var dataString = "";
        if (sum < 0) {
            dataString = "-$" + parseFloat(sum).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

        } else {
            dataString = "$" + parseFloat(sum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        return 'GROSS: ' + dataString;
    },
    afterFooter: function (tooltipItems, data) {
        var sum = 0;
        tooltipItems.forEach(function (tooltipItem) {
            sum += parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
        });
        var dataString = "";
        if (sum < 0) {
            dataString = "-$" + parseFloat(sum).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

        } else {
            dataString = "$" + parseFloat(sum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        return 'NET: ' + dataString;
    },

};

var customTooltips = function (tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';

        this._chart.canvas.parentNode.appendChild(tooltipEl);
    }
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        //console.log(bodyItem);
        return bodyItem.lines;
    }
    // Set Text
    if (tooltip.body) {
        var titleLines = tooltip.title || [];
        //console.log(tooltip.title);
        var bodyLines = tooltip.body.map(getBody);
        var innerHtml = '<thead>';
        var sumGross = 0,
            sumNet = 0;
        titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            var formattedbody = myUtils.splitString(body.toString(), ":");
            if (formattedbody !== undefined) {
                innerHtml += '<tr><td>' + span + formattedbody + '</td></tr>';
            }
            sumNet += myUtils.getValue(body.toString(), ":");
            if (i < 7) {
                sumGross += myUtils.getValue(body.toString(), ":");
            }
        });

        var footstyle = 'background:' + color(chartColors.purple).alpha(0.5).rgbString();
        footstyle += '; border-color:' + color(chartColors.purple).alpha(0.5).rgbString();
        footstyle += '; border-width: 2px';
        var footerSpan = '<span class="chartjs-tooltip-key" style="' + footstyle + '"></span>';

        innerHtml += '</tbody>';
        innerHtml += '<tfoot>';
        innerHtml += '<tr><td>' + footerSpan + 'GROSS: ' + myUtils.formatString(sumGross) + '</td></tr>';
        innerHtml += '<tr><td>' + footerSpan + 'NET: ' + myUtils.formatString(sumNet) + '</td></tr>';
        innerHtml += '</tfoot>'

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }


    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;
    var shiftX = -80;
    var shiftY = 80;
    // Display, position, and set styles for font
    tooltipEl.style.left = shiftX + positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = shiftY + positionY + tooltip.caretY + 'px';

    // console.log("canvas x:[" + positionX + "],y:[" + positionY + "]");
    // console.log("x:[" + tooltip.caretX + "],y:[" + tooltip.caretY + "]");

    tooltipEl.style.opacity = 1;
    tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
    tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

var payment_BarChartOptions = {
    responsive: true,
    legend: {
        position: 'left',
        padding: 20,
        labels: {
            filter: function (legendItem, data) {
                // console.log(legendItem);
                return legendItem.text != "ID";
            }
        }
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            stacked: true,
            scaleLabel: {
                fontColor: '#000',
                display: true,
                labelString: 'Payments Date'
            }
        }],

        yAxes: [{
            stacked: true,
            position: 'right',
            scaleLabel: {
                fontColor: '#000',
                display: true,
                labelString: 'Amounts'
            },
            ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                    if (value < 0) {
                        return '-$' + value.toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    } else {
                        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    }
                }
            }
        }]
    },
    tooltips: {
        mode: 'index',
        position: 'average',
        // callbacks: tooltips_callbacks,
        enabled: false,
        custom: customTooltips,
    }
};

var payment_barctx = $('#paymentBarChart');
var paymentBarChart = new Chart(payment_barctx, {
    type: 'bar',
    plugins: [plugin],
    data: payment_BarChartData,
    options: payment_BarChartOptions
});

var payment_PieChartData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
            color(chartColors.blue).alpha(0.5).rgbString(),
            color(chartColors.orange).alpha(0.5).rgbString(),
            color(chartColors.green).alpha(0.5).rgbString(),
            color(chartColors.green).alpha(1.5).rgbString(),
            color(chartColors.purple).alpha(0.5).rgbString(),
            color(chartColors.yellow).alpha(1.5).rgbString(),
            color(chartColors.yellow).alpha(0.5).rgbString(),
            color(chartColors.red).alpha(0.5).rgbString()
        ]
    }]
};

var payment_PieChartOptions = {
    responsive: true,
    animation: {
        animateScale: true,
        animateRotate: true
    },
    legend: {
        display: false
    },
    tooltips: {
        mode: 'nearest',
        callbacks: {
            label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                var value = parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                if (value < 0) {
                    return label + " : -$" + value.toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                } else if (value > 0) {
                    return label + " : $" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }

            }
        },
        footerFontStyle: 'normal',
        backgroundColor: chartColors.grey2

    }
};

var payment_piectx = $('#paymentPieChart');
var paymentPieChart = new Chart(payment_piectx, {
    type: 'doughnut',
    plugins: [plugin],
    data: payment_PieChartData,
    options: payment_PieChartOptions
});

var fp_task = $("#paymentDate").flatpickr({
    defaultDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    weekNumbers: true,
    onChange: function (selectedDates, dateStr, instance) {
        $("#paymentDate").next().removeClass("is-invalid");
        $("#paymentDate").next().next().empty();
    }
});

function payment_crud() {
    // Open Modal
    $("#addPayment").click(function (event) {
        $("#form_payment").find("input").removeClass("is-invalid");
        $("#form_payment").find("input invalid-tooltip").empty();
        $("#grossPay").val("");
        $("#netPay").val("");
        $("#withHolding").val("");
        $("#overTime_15").val("");
        $("#shiftAllow").val("");
        $("#baseHour").val("");
        $("#overTime_2").val("");
        $("#personalLeave").val("");
        $("#holidayPay").val("");
        $("#holidayLoad").val("");
        $("#holidayHours").val("");
        $("#superAnnuation").val("");
        fp_task.clear();
        $("#addPaymentinfo").modal("show");
    });

    //Submit Data
    $("#form_payment").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: "payments/add_paydata",
            type: "POST",
            data: $("#form_payment").serialize(),
            datatype: "JSON",
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#addPaymentinfo").modal("hide");
                    get_payment_detail(1);
                    get_payment_summary();
                } else {
                    for (var i = 0; i < data.inputerror.length; i++) {
                        if (data.inputerror[i] == "bpaymentdate") {
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

    // Clear Error
    $("#form_payment").find("input").change(function () {
        $(this).removeClass("is-invalid");
        $(this).next("invalid-tooltip").empty();
    });

    $("#grossPay").on("keyup", function () {
        var gross = $(this).val().replace(/,/g, "");
        var net = $("#netPay").val().replace(/,/g, "");
        var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
        myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    })

    $("#netPay").on("keyup", function () {
        var gross = $("#grossPay").val().replace(/,/g, "");
        var net = $(this).val().replace(/,/g, "");
        var payg = -(parseFloat(gross).toFixed(2) - parseFloat(net).toFixed(2));
        myUtils.formatCurrency($("#withHolding").val(parseFloat(payg).toFixed(2)), "blur");
    })

    //format currency
    $("input[data-format-type='currency']").on({
        keyup: function () {
            myUtils.formatCurrency($(this));
        },
        blur: function () {
            myUtils.formatCurrency($(this), "blur");
        }
    });

    payment_barctx.on("click", function (event) {
        event.preventDefault();
        $("#paymentContextMenu").removeClass("show").hide();
    });

    $("body").on("click", function () {
        $("#paymentContextMenu").removeClass("show").hide();
    });

    payment_barctx.contextmenu(function (event) {
        event.preventDefault();

        var activePoints = paymentBarChart.getElementsAtEvent(event);
        if (activePoints.length > 0) {

            var clickedElementindex = activePoints[0]._index;
            var label = paymentBarChart.data.labels[clickedElementindex];
            var meta = paymentBarChart.getDatasetMeta(8);
            var value = meta.controller._data[activePoints[0]._index]
            // console.log("Clicked: " + label + " - " + value);

            var chartTop = activePoints[0]._chart.canvas.offsetTop;
            var chartLeft = activePoints[0]._chart.canvas.offsetLeft;
            var contextTop = event.offsetY + chartTop;
            var contextLeft = event.offsetX + chartLeft;

            $("#paymentContextMenu").css({
                display: "block",
                position: "absolute",
                left: contextLeft,
                top: contextTop
            }).addClass("show");
            $("#paymentContextMenu .dropdown-item").data("paymentDetailKey", {
                payDate: label,
                payId: value
            });
        }
    });

    $("#paymentContextMenu a").on("click", function () {
        $(this).parent().removeClass("show").hide();

        var selectOpt = $(this).text();
        var selectedId = $(this).data("paymentDetailKey").payId;
        var selectedDate = $(this).data("paymentDetailKey").payDate;


        switch (selectOpt) {
            case "Update":
                // console.log(selectOpt);
                break;
            case "Delete":
                // console.log(selectOpt);
                delete_payment_detail(selectedId, selectedDate);
                break;
            default:
                // break;
        }

    });

}

function delete_payment_detail(payment_id, payment_date) {

    //console.log("selecte id :" + payment_id + ", selecte date :" + payment_date);

    if (confirm("Are you sure you wish to delete this detail?")) {
        $.ajax({
            url: "payments/delete_payment_detail/",
            type: "POST",
            datatype: "JSON",
            data: {
                id: payment_id,
                pay_date: payment_date,
                pay_status: 99
            },
            success: function (data) {
                data = JSON.parse(data);
                get_payment_detail(1);
                get_payment_summary();
            },
            error: function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        });
    }
}

function get_payment_detail(page) {

    $.ajax({
        url: "payments/pagination_paydata/" + page,
        type: "POST",
        datatype: "JSON",
        success: function (data) {
            data = JSON.parse(data);
            $("#payments_pagination_link").html(data.pagination_link);
            listPaymentData(paymentBarChart, data.payment_details);
        },
        error: function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }
    });

}

function listPaymentData(chart, data) {
    var pay_date = [],
        gross_pay = [],
        net_pay = [],
        withholding_pay = [];
    var base_pay = [],
        overtime_1_5_pay = [],
        overtime_2_pay = [],
        shift_pay = [];
    var personal_pay = [],
        holiday_pay = [],
        holiday_load_pay = [];

    var pay_id = [];

    for (var i = 0; i < data.length; i++) {
        pay_date.push(data[i].pay_date);
        gross_pay.push(data[i].pay_gross);
        net_pay.push(data[i].pay_net);
        withholding_pay.push(data[i].pay_withholding);
        base_pay.push(data[i].pay_base);
        overtime_1_5_pay.push(data[i].pay_overtime_1_5);
        overtime_2_pay.push(data[i].pay_overtime_2);
        shift_pay.push(data[i].pay_shift);
        personal_pay.push(data[i].pay_personal_leave);
        holiday_pay.push(data[i].pay_holiday_pay);
        holiday_load_pay.push(data[i].pay_holiday_load);

        pay_id.push(data[i].id);
    }

    chart.data.labels = [];
    pay_date.forEach(function (element) {
        chart.data.labels.push(element);
    });

    chart.data.datasets.forEach(function (dataset) {
        switch (dataset.id) {
            case "pay_base":
                dataset.data = [];
                base_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_shift":
                dataset.data = [];
                shift_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_overtime_1_5":
                dataset.data = [];
                overtime_1_5_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_overtime_2":
                dataset.data = [];
                overtime_2_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_personal_leave":
                dataset.data = [];
                personal_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_holiday_pay":
                dataset.data = [];
                holiday_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_holiday_load":
                dataset.data = [];
                holiday_load_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_withholding":
                dataset.data = [];
                withholding_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;

            case "pay_id":
                dataset.data = [];
                pay_id.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            default:
                // break;
        }
    });

    chart.update();
}

function get_payment_summary() {

    $.ajax({
        url: "/wom/payments/summary_paydata",
        type: "POST",
        datatype: "JSON",
        success: function (data) {
            data = JSON.parse(data);
            summaryPaymentData(paymentPieChart, data);
        },
        error: function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }
    });


}

function summaryPaymentData(chart, data) {

    var summarydata = [];
    chart.data.labels = [];

    for (var key in data) {
        for (var id in data[key]) {
            var value = data[key][id];
            switch (id) {
                case "sum_gross":
                    $("#tbody_summary #sum_gross").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "sum_net":
                    $("#tbody_summary #sum_net").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "sum_withholding":
                    $("#tbody_summary #sum_withholding").text(function () {
                        return "-$" + parseFloat(value).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    chart.data.labels.push(id);
                    summarydata.push(value);
                    break;
                case "sum_super":
                    $("#tbody_summary #sum_super").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "sum_holiday_leave":
                    $("#tbody_summary #sum_holiday_leave").text(function () {
                        return value;
                    });
                    break;
                case "est_gross":
                    $("#tbody_summary #est_gross").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "est_net":
                    $("#tbody_summary #est_net").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "est_withholding":
                    $("#tbody_summary #est_withholding").text(function () {
                        return "-$" + parseFloat(value).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                case "est_super":
                    $("#tbody_summary #est_super").text(function () {
                        return "$" + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    });
                    break;
                default:
                    chart.data.labels.push(id);
                    summarydata.push(value);
                    break;
            }
        }
    };

    console.log(chart.data.labels);
    console.log(summarydata);

    chart.data.datasets.forEach(function (dataset) {
        dataset.data = [];
        summarydata.forEach(function (element) {
            dataset.data.push(element);
        });
    });

    chart.update();
}

function payment_pagination() {
    $(document).on("click", ".pagination li a", function (event) {
        event.preventDefault();
        var page = $(this).data("ci-pagination-page");
        get_payment_detail(page);
    });
}



$(document).ready(function () {
    //call function
    payment_crud();
    get_payment_detail(1);
    payment_pagination();
    get_payment_summary();
});