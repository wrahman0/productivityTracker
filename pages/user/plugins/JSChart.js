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
                    enabled: false
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
            pointStart: Date.UTC(2012, 0, 01),
            data: [

                0.7718, 0.7728, 0.7729, 0.7698, 0.7685, 0.7681, 0.769, 0.769, 0.7698, 0.7699,
                0.7651, 0.7613, 0.7616, 0.7614, 0.7614, 0.7607, 0.7602, 0.7611, 0.7622, 0.7615,
                0.7598, 0.7598, 0.7592, 0.7573, 0.7566, 0.7567, 0.7591, 0.7582, 0.7585, 0.7613,
                0.7631, 0.7615, 0.76, 0.7613, 0.7627, 0.7627, 0.7608, 0.7583, 0.7575, 0.7562,
                0.752, 0.7512, 0.7512, 0.7517, 0.752, 0.7511, 0.748, 0.7509, 0.7531, 0.7531,
                0.7527, 0.7498, 0.7493, 0.7504, 0.75, 0.7491, 0.7491, 0.7485, 0.7484, 0.7492,
                0.7471, 0.7459, 0.7477, 0.7477, 0.7483, 0.7458, 0.7448, 0.743, 0.7399, 0.7395,
                0.7395, 0.7378, 0.7382, 0.7362, 0.7355, 0.7348, 0.7361, 0.7361, 0.7365, 0.7362,
                0.7331, 0.7339, 0.7344, 0.7327, 0.7327, 0.7336, 0.7333, 0.7359, 0.7359, 0.7372,
                0.736, 0.736, 0.735, 0.7365, 0.7384, 0.7395, 0.7413, 0.7397, 0.7396, 0.7385,
                0.7378, 0.7366, 0.74, 0.7411, 0.7406, 0.7405, 0.7414, 0.7431, 0.7431, 0.7438,
                0.7443, 0.7443, 0.7443, 0.7434, 0.7429, 0.7442, 0.744, 0.7439, 0.7437, 0.7437,
                0.7429, 0.7403, 0.7399, 0.7418, 0.7468, 0.748, 0.748, 0.749, 0.7494, 0.7522,
                0.7515, 0.7502, 0.7472, 0.7472, 0.7462, 0.7455, 0.7449, 0.7467, 0.7458, 0.7427,
                0.7427, 0.743, 0.7429, 0.744, 0.743, 0.7422, 0.7388, 0.7388, 0.7369, 0.7345,
                0.7345, 0.7345, 0.7352, 0.7341, 0.7341, 0.734, 0.7324, 0.7272, 0.7264, 0.7255,
                0.7258, 0.7258, 0.7256, 0.7257, 0.7247, 0.7243, 0.7244, 0.7235, 0.7235, 0.7235,
                0.7235, 0.7262, 0.7288, 0.7301, 0.7337, 0.7337, 0.7324, 0.7297, 0.7317, 0.7315,
                0.7288, 0.7263, 0.7263, 0.7242, 0.7253, 0.7264, 0.727, 0.7312, 0.7305, 0.7305,
                0.7318, 0.7358, 0.7409, 0.7454, 0.7437, 0.7424, 0.7424, 0.7415, 0.7419, 0.7414,
                0.7377, 0.7355, 0.7315, 0.7315, 0.732, 0.7332, 0.7346, 0.7328, 0.7323, 0.734,
                0.734, 0.7336, 0.7351, 0.7346, 0.7321, 0.7294, 0.7266, 0.7266, 0.7254, 0.7242,
                0.7213, 0.7197, 0.7209, 0.721, 0.721, 0.721, 0.7209, 0.7159, 0.7133, 0.7105,
                0.7099, 0.7099, 0.7093, 0.7093, 0.7076, 0.707, 0.7049, 0.7012, 0.7011, 0.7019,
                0.7046, 0.7063, 0.7089, 0.7077, 0.7077, 0.7077, 0.7091, 0.7118, 0.7079, 0.7053,
                0.705, 0.7055, 0.7055, 0.7045, 0.7051, 0.7051, 0.7017, 0.7, 0.6995, 0.6994,
                0.7014, 0.7036, 0.7021, 0.7002, 0.6967, 0.695, 0.695, 0.6939, 0.694, 0.6922,
                0.6919, 0.6914, 0.6894, 0.6891, 0.6904, 0.689, 0.6834, 0.6823, 0.6807, 0.6815,
                0.6815, 0.6847, 0.6859, 0.6822, 0.6827, 0.6837, 0.6823, 0.6822, 0.6822, 0.6792,
                0.6746, 0.6735, 0.6731, 0.6742, 0.6744, 0.6739, 0.6731, 0.6761, 0.6761, 0.6785,
                0.6818, 0.6836, 0.6823, 0.6805, 0.6793, 0.6849, 0.6833, 0.6825, 0.6825, 0.6816,
                0.6799, 0.6813, 0.6809, 0.6868, 0.6933, 0.6933, 0.6945, 0.6944, 0.6946, 0.6964,
                0.6965, 0.6956, 0.6956, 0.695, 0.6948, 0.6928, 0.6887, 0.6824, 0.6794, 0.6794,
                0.6803, 0.6855, 0.6824, 0.6791, 0.6783, 0.6785, 0.6785, 0.6797, 0.68, 0.6803,
                0.6805, 0.676, 0.677, 0.677, 0.6736, 0.6726, 0.6764, 0.6821, 0.6831, 0.6842,
                0.6842, 0.6887, 0.6903, 0.6848, 0.6824, 0.6788, 0.6814, 0.6814, 0.6797, 0.6769,
                0.6765, 0.6733, 0.6729, 0.6758, 0.6758, 0.675, 0.678, 0.6833, 0.6856, 0.6903,
                0.6896, 0.6896, 0.6882, 0.6879, 0.6862, 0.6852, 0.6823, 0.6813, 0.6813, 0.6822,
                0.6802, 0.6802, 0.6784, 0.6748, 0.6747, 0.6747, 0.6748, 0.6733, 0.665, 0.6611,
                0.6583, 0.659, 0.659, 0.6581, 0.6578, 0.6574, 0.6532, 0.6502, 0.6514, 0.6514,
                0.6507, 0.651, 0.6489, 0.6424, 0.6406, 0.6382, 0.6382, 0.6341, 0.6344, 0.6378,
                0.6439, 0.6478, 0.6481, 0.6481, 0.6494, 0.6438, 0.6377, 0.6329, 0.6336, 0.6333,
                0.6333, 0.633, 0.6371, 0.6403, 0.6396, 0.6364, 0.6356, 0.6356, 0.6368, 0.6357,
                0.6354, 0.632, 0.6332, 0.6328, 0.6331, 0.6342, 0.6321, 0.6302, 0.6278, 0.6308,
                0.6324, 0.6324, 0.6307, 0.6277, 0.6269, 0.6335, 0.6392, 0.64, 0.6401, 0.6396,
                0.6407, 0.6423, 0.6429, 0.6472, 0.6485, 0.6486, 0.6467, 0.6444, 0.6467, 0.6509,
                0.6478, 0.6461, 0.6461, 0.6468, 0.6449, 0.647, 0.6461, 0.6452, 0.6422, 0.6422,
                0.6425, 0.6414, 0.6366, 0.6346, 0.635, 0.6346, 0.6346, 0.6343, 0.6346, 0.6379,
                0.6416, 0.6442, 0.6431, 0.6431, 0.6435, 0.644, 0.6473, 0.6469, 0.6386, 0.6356,
                0.634, 0.6346, 0.643, 0.6452, 0.6467, 0.6506, 0.6504, 0.6503, 0.6481, 0.6451,
                0.645, 0.6441, 0.6414, 0.6409, 0.6409, 0.6428, 0.6431, 0.6418, 0.6371, 0.6349,
                0.6333, 0.6334, 0.6338, 0.6342, 0.632, 0.6318, 0.637, 0.6368, 0.6368, 0.6383,
                0.6371, 0.6371, 0.6355, 0.632, 0.6277, 0.6276, 0.6291, 0.6274, 0.6293, 0.6311,
                0.631, 0.6312, 0.6312, 0.6304, 0.6294, 0.6348, 0.6378, 0.6368, 0.6368, 0.6368,
                0.636, 0.637, 0.6418, 0.6411, 0.6435, 0.6427, 0.6427, 0.6419, 0.6446, 0.6468,
                0.6487, 0.6594, 0.6666, 0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811,
                0.6811, 0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777, 0.6815,
                0.6802, 0.678, 0.6796, 0.6817, 0.6817, 0.6832, 0.6877, 0.6912, 0.6914, 0.7009,
                0.7012, 0.701, 0.7005, 0.7076, 0.7087, 0.717, 0.7105, 0.7031, 0.7029, 0.7006,
                0.7035, 0.7045, 0.6956, 0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815,
                0.6843, 0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262, 0.7266,
                0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461, 0.7366, 0.7319, 0.7361,
                0.7437, 0.7432, 0.7461, 0.7461, 0.7454, 0.7549, 0.7742, 0.7801, 0.7903, 0.7876,
                0.7928, 0.7991, 0.8007, 0.7823, 0.7661, 0.785, 0.7863, 0.7862, 0.7821, 0.7858,
                0.7731, 0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004, 0.7857,
                0.7932, 0.7938, 0.7927, 0.7918, 0.7919, 0.7989, 0.7988, 0.7949, 0.7948, 0.7882,
                0.7745, 0.771, 0.775, 0.7791, 0.7882, 0.7882, 0.7899, 0.7905, 0.7889, 0.7879,
                0.7855, 0.7866, 0.7865, 0.7795, 0.7758, 0.7717, 0.761, 0.7497, 0.7471, 0.7473,
                0.7407, 0.7288, 0.7074, 0.6927, 0.7083, 0.7191, 0.719, 0.7153, 0.7156, 0.7158,
                0.714, 0.7119, 0.7129, 0.7129, 0.7049, 0.7095
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
