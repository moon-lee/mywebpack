import Chart from "chart.js";

const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

// Define a plugin to provide data labels
Chart.plugins.register({
    afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;
        ctx.fillStyle = 'rgb(0, 0, 0)';

        var fontSize = 14;
        var fontStyle = 'normal';
        var fontFamily = 'Helvetica Neue';
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        // Make sure alignment settings are correct
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var save_data = [];

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            var total = 0;
            if (!meta.hidden) {

                if (i == 1) {
                    meta.data.forEach(function (element, index) {
                        total = parseInt(dataset.data[index]) + parseInt(save_data[index]);

                        total = "$" + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        var padding = 5;
                        var position = element.tooltipPosition();
                        ctx.fillText(total, position.x, position.y - (fontSize / 2) - padding);
                    });
                } else {
                    meta.data.forEach(function (element, index) {
                        var dataString = dataset.data[index];
                        save_data.push(dataString);
                        dataString = "$" + parseInt(dataString).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        var padding = 5;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            }
        });
    }
});


function payment_chart_1() {
    console.log("chart 1");

    $.ajax({
        url: "payments/list_paydata",
        type: "POST",
        datatype: "JSON",
        success: function (data) {

            var pay_date = [];
            var gross_pay = [];
            var net_pay = [];
            var gap_pay = [];
            data = JSON.parse(data);

            for (var i = 0; i < data.length; i++) {
                pay_date.push(data[i].pay_date);
                gross_pay.push(data[i].pay_gross - data[i].pay_net);
                net_pay.push(data[i].pay_net);

            }

            var chartdata = {
                labels: pay_date,
                datasets: [
                    {
                        label: "NET PAY",
                        data: net_pay,
                        fill: 'origin',
                        backgroundColor: 'rgba(30,144,255, 0.5)',
                        borderColor: 'rgba(30,120,255, 1)'
                    },
                    {
                        label: "GROSS PAY",
                        data: gross_pay,
                        fill: '-1',
                        backgroundColor: 'rgba(255,99,71, 0.5)',
                        borderColor: 'rgba(255,79,61, 1)'

                        // backgroundColor: 'rgba(34,139,34, 0.5)',
                        // borderColor: 'rgba(12,139,12, 1)'
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
                            if (tooltipItem.datasetIndex == 1) {
                                var total = 0;
                                for (var i = 0; i < data.datasets.length; i++)
                                    total += parseInt(data.datasets[i].data[tooltipItem.index]);
                                value = total;
                            }

                            return label + " : $" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
                                return '$' + value + '.00';
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
    console.log("chart2");

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