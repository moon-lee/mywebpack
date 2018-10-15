import Chart from "chart.js";

const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    grey2: '#727272'
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
            if (!meta.hidden) {
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
    datasets: [
        {
            label: "BASE",
            data: [],
            fill: 'origin',
            stack: "Stack 0",
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            id: "pay_base"
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
            fill: 1,
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

    ]
};

var payment_BarChartOptions = {
    responsive: true,
    legend: {
        position: 'left',
        padding:20,
    },
    tooltips: {
        mode: 'index',
        callbacks: {
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
        },
        footerFontStyle: 'normal',
        backgroundColor: chartColors.grey2

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
    }
};

var payment_barctx = $('#paymentBarChart');
export var paymentBarChart = new Chart(payment_barctx, {
    type: 'bar',
    plugins: [plugin],
    data: payment_BarChartData,
    options: payment_BarChartOptions
});

function get_payment_detail() {

    $.ajax({
        url: "payments/list_paydata",
        type: "POST",
        datatype: "JSON",
        success: function (data) {
            data = JSON.parse(data);
            listPaymentData(paymentBarChart, data);
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
    var pay_date = [], gross_pay = [], net_pay = [], withholding_pay = [];
    var base_pay = [], overtime_1_5_pay = [], overtime_2_pay = [], shift_pay = [];
    var personal_pay = [], holiday_pay = [], holiday_load_pay = [];

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
    }

    pay_date.forEach(function (element) {
        chart.data.labels.push(element);
    });

    chart.data.datasets.forEach(function (dataset) {
        switch (dataset.id) {
            case "pay_base":
                base_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_shift":
                shift_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_overtime_1_5":
                overtime_1_5_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_overtime_2":
                overtime_2_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_personal_leave":
                personal_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_holiday_pay":
                holiday_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_holiday_load":
                holiday_load_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;
            case "pay_withholding":
                withholding_pay.forEach(function (element) {
                    dataset.data.push(element);
                });
                break;

            default:
            // break;
        }
    });

    chart.update();
}

var payment_PieChartData = {
    labels: [],
    datasets: [
        {
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
        }
    ]
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

function get_payment_summary() {

    $.ajax({
        url: "payments/summary_paydata",
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
    for (var key in data) {
        for (var id in data[key]) {
            console.log("[" + id + "][" + data[key][id] + "]");
        }
    }

    for (var key in data) {
        for (var id in data[key]) {
            switch (id) {
                case "sum_gross":
                case "sum_net":
                case "sum_super":
                case "sum_holiday_leave":
                    break;
                default:
                    chart.data.labels.push(id);
                    summarydata.push(data[key][id]);
                    break;
            }
        }
    };

    console.log(summarydata);

    chart.data.datasets.forEach(function (dataset) {
        summarydata.forEach(function (element) {
            dataset.data.push(element);
        });
    });

    chart.update();
}

$(document).ready(function () {
    //call function
    get_payment_detail();
    get_payment_summary();
});