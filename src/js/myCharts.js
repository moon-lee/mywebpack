import Chart from "chart.js";

const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    sb0: 'rgb(147, 204, 235)',
    sb1: 'rgb(125, 193, 231)',
    sb2: 'rgb(104, 183, 227)',
    sb3: 'rgb(82, 173, 223)',
    sb4: 'rgb(60, 163, 219)',
    sb5: 'rgb(40, 152, 214)',
    sb6: 'rgb(58, 157, 58)',
};


// Define a plugin to provide data labels
Chart.plugins.register({
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

        var idx = chart.data.datasets.length;

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
});


function payment_chart_1() {
    $.ajax({
        url: "payments/list_paydata",
        type: "POST",
        datatype: "JSON",
        success: function (data) {

            var pay_date = [], gross_pay = [], net_pay = [], withholding_pay = [];
            var base_pay = [], overtime_1_5_pay = [], overtime_2_pay = [], shift_pay = [];
            var personal_pay = [], holiday_pay = [], holiday_load_pay = [];

            data = JSON.parse(data);

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

            var color = Chart.helpers.color;
            var chartdata = {
                labels: pay_date,
                datasets: [
                    {
                        label: "BASE",
                        data: base_pay,
                        fill: 'origin',
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString()
                    },
                    {
                        label: "SHIFT",
                        data: shift_pay,
                        fill: '-1',
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString()
                    },
                    {
                        label: "OVERTIME(1.5)",
                        data: overtime_1_5_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.green).alpha(0.5).rgbString()
                    },
                    {
                        label: "OVERTIME(2)",
                        data: overtime_2_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.green).alpha(1.5).rgbString()
                    },
                    {
                        label: "PERSONAL LEAVE",
                        data: personal_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString()
                    },
                    {
                        label: "HOLIDAY PAY",
                        data: holiday_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.yellow).alpha(1.5).rgbString()
                    },
                    {
                        label: "HOLIDAY LOAD",
                        data: holiday_load_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString()
                    },
                    {
                        label: "WITHHOLDING (PAYG)",
                        data: withholding_pay,
                        fill: 1,
                        stack: "Stack 0",
                        backgroundColor: color(chartColors.red).alpha(0.5).rgbString()
                    },

                ]
            };

            var chartOptions = {
                responsive: true,

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
                                if (tooltipItem.datasetIndex < 7) {
                                    sum += parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                                } else {
                                    sum -= parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                                }
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
                    backgroundColor: chartColors.sb6

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


            var ctx = $('#paymentChart2');

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: chartOptions
            });
        },
        error: function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }
    });
}

function payment_chart_2() {
    var chartdata = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                chartColors.red,
                chartColors.yellow,
                chartColors.blue
            ]
        }],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };

    var chartOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    var ctx = $('#paymentChart1');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartdata,
        options: chartOptions
    });



}

$(document).ready(function () {
    //call function
    payment_chart_1();
    payment_chart_2();
});