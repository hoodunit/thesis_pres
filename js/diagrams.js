(function() {
  function init(){
    $('#startupOverallComparison').highcharts(startupOverallComparison);
    $('#bootstrappingTimes').highcharts(bootstrappingTimes);
    $('#dalvikBootstrappingTimes').highcharts(dalvikBootstrappingTimes);
    $('#helloBenchmark').highcharts(makeBenchmarksChart(times['hello'], true, true));
  }

  var startupOverallComparison = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['JVM', 'Dalvik'],
      labels: {
        style: {
          fontSize: '16px'
        }
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Run Time (ms)'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "16px"
          },
        }
      }
    },
    colors: ['blue', 'green', 'red', 'orange'],
    series: [{
      name: 'Java',
      data: [42, 209]
    }, {
      name: 'Clojure',
      data: [800, 1821]
    }, {
      name: 'Skummet',
      data: [596.5, 808]
    }, {
      name: 'Oxcart',
      data: [910.5]
    }]
  };

  var bootstrappingTimes = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.y: f} ({point.percentage: .1f}%)',
          distance: 20,
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
            fontSize: "16px"
          },
        },
        innerSize: "50%",
        showInLegend: true
      }
    },
    legend: {
      align: "right",
      layout: "vertical",
      borderWidth: 1,
      x: 0,
      y: -25,
      padding: 16,
      itemStyle: {
        fontSize: "14px"
      }
    },
    series: [{
      type: 'pie',
      name: 'Clojure Bootstrapping Times (ms)',
      data: [
        ['Load JVM', 51],
        ['Load Clojure Runtime', 85],
        ['Load Clojure Core', 693],
        ['Print Hello World', 12]
      ]
    }]
  };

  var dalvikBootstrappingTimes = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: true
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.y: f} ({point.percentage: .1f}%)',
          distance: 20,
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
            fontSize: "16px"
          },
        },
        innerSize: "50%",
        showInLegend: true
      }
    },
    legend: {
      align: "right",
      layout: "vertical",
      borderWidth: 1,
      x: 0,
      y: -25,
      padding: 16,
      itemStyle: {
        fontSize: "14px"
      }
    },
    series: [{
      type: 'pie',
      name: 'Clojure Bootstrapping Times (ms)',
      data: [
        ['Load VM', 118],
        ['Load Clojure Runtime', 66],
        ['Load Clojure Core', 1503.5],
        ['Print Hello World', 253]
      ]
    }]
  };

  // Average run times for benchmarks
  var times = {
    hello: {
      java: { startup: [138, 138, 158, 200],
              task: [126, 151, 171, 211]},
      skummet: { startup: [732, 726, 937, 961],
                 task: [121, 169, 174, 222]},
      clojure: { startup: [1898, 1555, 2494, 2124],
                 task: [121, 144, 171, 223]},
    },
    binarytrees: {
      java: { startup: [131, 139, 171, 194],
              task: [254, 207, 327, 282]},
      skummet: { startup: [782, 726, 950, 987],
                 task: [534, 340, 732, 407]},
      clojure: { startup: [1982, 1623, 2607, 2170],
                 task: [607, 306, 838, 430]},
    },
    fannkuchredux: {
      java: { startup: [162, 127, 161, 197],
              task: [169, 150, 228, 229]},
      skummet: { startup: [883, 743, 978, 979],
                 task: [1255, 392, 1475, 546]},
      clojure: { startup: [2333, 1609, 2631, 2180],
                 task: [1242, 377, 1182, 539]},
    },
    nbody: {
      java: { startup: [203, 155, 171, 194],
              task: [1134, 201, 1222, 306]},
      skummet: { startup: [874, 662, 975, 1015],
                 task: [2330, 482, 2579, 775]},
      clojure: { startup: [2351, 1606, 2584, 2195],
                 task: [1774, 534, 1930, 749]},
    },
    pidigits: {
      java: { startup: [210, 162, 167, 187],
              task: [2252, 2081, 2734, 2297]},
      skummet: { startup: [924, 839, 959, 968],
                 task: [4381, 3070, 5223, 3823]},
      clojure: { startup: [2598, 1848, 2593, 2174],
                 task: [4969, 3042, 5437, 3865]},
    },
    spectralnorm: {
      java: { startup: [240, 180, 161, 191],
              task: [2563, 738, 2496, 873]},
      skummet: { startup: [1207, 861, 969, 979],
                 task: [4112, 1838, 3768, 1840]},
      clojure: { startup: [3003, 2291, 2620, 2160],
                 task: [2805, 2092, 2552, 1763]},
    },
    dependencies: {
      java: { startup: [160, 178, 170, 195],
              task: [155, 202, 189, 253]},
      skummet: { startup: [962, 979, 1223, 1193],
                 task: [161, 216, 227, 295]},
      clojure: { startup: [2687, 1964, 3673, 2716],
                 task: [157, 196, 262, 305]},
    }
  };

  function makeStartupChart(times, isStartup, index){
    var max = 4000;
    var type = isStartup ? 'startup' : 'task';
    var textStyle = {
      fontSize: '16px',
      color: 'black'
    };
    var series = [
        {
          name: 'Clojure',
          data: [
            times.hello.clojure[type][index],
            times.dependencies.clojure[type][index],
            times.binarytrees.clojure[type][index],
            times.fannkuchredux.clojure[type][index],
            times.nbody.clojure[type][index],
            times.pidigits.clojure[type][index],
            times.spectralnorm.clojure[type][index],
          ]
        },
        {
          name: 'Skummet',
          data: [
            times.hello.skummet[type][index],
            times.dependencies.skummet[type][index],
            times.binarytrees.skummet[type][index],
            times.fannkuchredux.skummet[type][index],
            times.nbody.skummet[type][index],
            times.pidigits.skummet[type][index],
            times.spectralnorm.skummet[type][index],
          ]
        },
        {
          name: 'Java',
          data: [
            times.hello.java[type][index],
            times.dependencies.java[type][index],
            times.binarytrees.java[type][index],
            times.fannkuchredux.java[type][index],
            times.nbody.java[type][index],
            times.pidigits.java[type][index],
            times.spectralnorm.java[type][index],
          ]
        },
      ];
    console.log('series:', series);
    return {
      chart: {
        type: 'bar',
      },
      series: series,
      title: {
        text: ''
      },
      xAxis: {
        categories: ['hello', 'dependencies', 'binarytrees', 'fannkuchredux', 'nbody', 'pidigits', 'spectralnorm'],
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black',
        labels: { style: textStyle }
      },
      yAxis: {
        min: 0,
        max: max,
        title: {
          text: 'Run Time (ms)',
          style: textStyle
        },
        labels: {
          // Remove abbreviation of 1000 with k
          formatter: function() { return this.value; },
          style: textStyle
        },
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black',
      },
      legend: {
        enabled: true,
        reversed: true,
        itemStyle: {
          fontSize: textStyle.fontSize
        },
        itemDistance: 30,
        margin: 15,
        x: 55,
        verticalAlign: 'top'
      },
      plotOptions: {
        series: {
          pointPadding: 0.15,
          borderWidth: 1,
          borderColor: 'black'
        },
        bar: {
          groupPadding: 0.0,
          borderColor: 'black',
          borderWidth: 2
        }
      },
      colors: ['blue', 'green', 'red']
    }
  };

  function makeBenchmarksChart(times, includeStartup, includeTask, max){
    var javaStartup = {
      name: 'Java Startup',
      stack: 'Java',
      data: times.java.startup
    }
    var javaTask = {
      name: 'Java Task',
      stack: 'Java',
      data: times.java.task
    }
    var skummetStartup = {
      name: 'Skummet Startup',
      stack: 'Skummet',
      data: times.skummet.startup
    };
    var skummetTask = {
      name: 'Skummet Task',
      stack: 'Skummet',
      data: times.skummet.task
    };
    var clojureStartup = {
      name: 'Clojure Startup',
      stack: 'Clojure',
      data: times.clojure.startup
    };
    var clojureTask = {
      name: 'Clojure Task',
      stack: 'Clojure',
      data: times.clojure.task
    };
    var series;
    if(includeStartup && includeTask) {
      series = [clojureTask, clojureStartup, skummetTask, skummetStartup, javaTask, javaStartup]
    } else if(includeStartup) {
      series = [clojureStartup, skummetStartup, javaStartup];
    } else if(includeTask) {
      series = [clojureTask, skummetTask, javaTask];
    } else {
      series = {};
    }
    var textStyle = {
      fontSize: '14px',
      color: 'black'
    };
    return {
      chart: {
        type: 'bar',
        // marginBottom: 70,
        //spacingBottom: 0
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Nexus 5 Dalvik', 'Nexus 5 ART', 'Nexus 7 Dalvik', 'Nexus 7 ART'],
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black',
        labels: { style: textStyle }
      },
      yAxis: {
        min: 0,
        max: max,
        title: {
          text: 'Run Time (ms)',
          style: textStyle
        },
        labels: {
          // Remove abbreviation of 1000 with k
          formatter: function() { return this.value; },
          style: textStyle
        },
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black',
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          pointPadding: 0.15,
          stacking: 'normal',
          borderWidth: 1,
          borderColor: 'black'
        },
        bar: {
          groupPadding: 0.0,
          borderColor: 'black',
          borderWidth: 2
        }
      },
      colors: ((includeStartup && includeTask) ?
               ['lightblue', 'blue', 'lightgreen', 'green', 'lightpink', 'red'] :
               ['blue', 'green', 'red']),
      series: series
    }
  };
  
  init();
})();
