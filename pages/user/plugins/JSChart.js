window.addEventListener("load", init);

$(function () {


    $('#container-Chart').highcharts({
        chart: {
            zoomType: 'x',
            spacingRight: 20
        },

        exporting: { enabled: false },

        credits: {
            enabled: false
        },
        
        title: {
            text: 'Productivity from January 2014 to Date'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag the chart to zoom in' :
                'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            maxZoom: 2 * 24 * 3600000, // fourteen days
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        tooltip: {
            shared: true
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[2]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.5).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: true
                },
                shadow: true,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Hours Studied',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2014, 0, 01),
            data: [
                2.8446, 2.8445, 2.8444, 10.8451,    2.8418, 2.8264,    2.8258, 2.8232,    2.8233, 2.8258,
                2.8283, 2.8278, 2.8256, 2.8292,    2.8239, 2.8239,    2.8245, 2.8265,    2.8261, 2.8269,
                2.8273, 2.8244, 2.8244, 2.8172,    2.8139, 20.8146
            ]
        },{
            type: 'area',
            name: 'ECE 106',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2014, 0, 01),
            data: [
                2.8446, 0, 2.8444, 0,    2.8418, 2.8264,    1.8258, 2.8232,    0, 0,
                2.8283, 2.8278, 2.8256, 2.8292,    2.8239, 0,    2.8245, 2.8265,    2.8261, 2.8269,
                2.8273, 2.8244, 2.8244, 2.8172,    2.8139, 0
            ]
        }]
    });
});

$(function () {
    var chart = new Highcharts.Chart({
        
        chart: {

            renderTo: 'container-Guage',
            type: 'gauge',
            alignTicks: true,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: true,
            backgroundColor:'rgba(255, 255, 255, 0)'
        },

        credits: {
            enabled: false
        },

        exporting: { enabled: false },
    
        title: {
            text: 'Performance Meter',
        },
        
        pane: {
            startAngle: -150,
            endAngle: 150
        },            
    
        yAxis: [{
            min: 0,
            max: 12,
            lineColor: '#339',
            tickColor: '#339',
            minorTickColor: '#339',
            offset: -25,
            lineWidth: 2,
            labels: {
                distance: -20,
                rotation: 'auto'
            },
            tickLength: 5,
            minorTickLength: 5,
            endOnTick: false
        }],
    
        series: [{
            name: 'DailyHours',
            data: [3],
            dataLabels: {
                formatter: function () {
                    var kmh = this.y,
                        mph = Math.round(kmh * 0.621);
                    return '<span style="color:#339">'+ kmh + ' hr/day</span><br/>' +
                        '<span style="color:#933">' + mph + ' hr/day</span>';
                },
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#DDD'],
                        [1, '#FFF']
                    ]
                }
            },
            tooltip: {
                valueSuffix: ' hrs/day on Avg'
            }
        }]
    
    },
    // Add some life
    function(chart) {
        // setInterval(function() {
        //     var point = chart.series[0].points[0],
        //         newVal, inc = Math.round((0.2 - Math.random(.2,.1)));
    
        //     newVal = point.y + inc;
        //     if (newVal < 0 || newVal > 200) {
        //         newVal = point.y - inc;
        //     }
    
        //     point.update(newVal);
    
        // }, 200);
    
    });
});
