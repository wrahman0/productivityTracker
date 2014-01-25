$(function () {
        $('#container-Chart').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
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
                    2.8446, 2.8445, 2.8444, 2.8451,    2.8418, 2.8264,    2.8258, 2.8232,    2.8233, 2.8258,
                    2.8283, 2.8278, 2.8256, 2.8292,    2.8239, 2.8239,    2.8245, 2.8265,    2.8261, 2.8269,
                    2.8273, 2.8244, 2.8244, 2.8172,    2.8139, 2.8146
                ]
            }]
        });
    });
    
