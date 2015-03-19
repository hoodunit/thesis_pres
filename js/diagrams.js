(function() {
  function init(){
    $('#startupJvm').highcharts(makeDesktopStartupComparison(false));
    $('#startupJvmAndDalvik').highcharts(makeDesktopStartupComparison(true));
    $('#startupArt').highcharts(makeBenchmarksChart(times['hello'],
      {includeStartup: true, includeTask: false, max: 3000, includeSkummet: false, includeNexus7: false, includeLegend: true}));
    $('#startupOtherDevices').highcharts(makeBenchmarksChart(times['hello'],
      {includeStartup: true, includeTask: false, max: 3000, includeSkummet: false, includeNexus7: true, includeLegend: true}));
    $('#startupOtherAppsHello').highcharts(makeBenchmarksChart(times['hello'],
      {includeStartup: true, includeTask: false, max: 3000, includeSkummet: false, includeNexus7: false, includeLegend: true}));
    $('#startupOtherAppsDependencies').highcharts(makeBenchmarksChart(times['dependencies'],
      {includeStartup: true, includeTask: false, max: 3000, includeSkummet: false, includeNexus7: false, includeLegend: true}));
    $('#bootstrappingTimes').highcharts(bootstrappingTimes);
    $('#dalvikBootstrappingTimes').highcharts(dalvikBootstrappingTimes);
    $('#startupTimesNexus5dalvik').highcharts(makeStartupChart(times, true, 0));
    $('#startupTimesNexus5art').highcharts(makeStartupChart(times, true, 1));
    $('#startupTimesNexus7dalvik').highcharts(makeStartupChart(times, true, 2));
    $('#startupTimesNexus7art').highcharts(makeStartupChart(times, true, 3));

    var benchmarks = ['hello', 'dependencies', 'binarytrees', 'fannkuchredux', 'nbody', 'pidigits', 'spectralnorm'];
    benchmarks.forEach(function(benchmark) {
      var divSelector = '#' + benchmark + 'Benchmark';
      $(divSelector).highcharts(makeBenchmarksChart(times[benchmark],
        {includeStartup: true, includeTask: true, title: benchmark}));
      $(divSelector + '2').highcharts(makeBenchmarksChart(times[benchmark],
        {includeStartup: true, includeTask: true, title: benchmark}));
    })
  }

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
          }
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
          }
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
                 task: [121, 144, 171, 223]}
    },
    binarytrees: {
      java: { startup: [131, 139, 171, 194],
              task: [254, 207, 327, 282]},
      skummet: { startup: [782, 726, 950, 987],
                 task: [534, 340, 732, 407]},
      clojure: { startup: [1982, 1623, 2607, 2170],
                 task: [607, 306, 838, 430]}
    },
    fannkuchredux: {
      java: { startup: [162, 127, 161, 197],
              task: [169, 150, 228, 229]},
      skummet: { startup: [883, 743, 978, 979],
                 task: [1255, 392, 1475, 546]},
      clojure: { startup: [2333, 1609, 2631, 2180],
                 task: [1242, 377, 1182, 539]}
    },
    nbody: {
      java: { startup: [203, 155, 171, 194],
              task: [1134, 201, 1222, 306]},
      skummet: { startup: [874, 662, 975, 1015],
                 task: [2330, 482, 2579, 775]},
      clojure: { startup: [2351, 1606, 2584, 2195],
                 task: [1774, 534, 1930, 749]}
    },
    pidigits: {
      java: { startup: [210, 162, 167, 187],
              task: [2252, 2081, 2734, 2297]},
      skummet: { startup: [924, 839, 959, 968],
                 task: [4381, 3070, 5223, 3823]},
      clojure: { startup: [2598, 1848, 2593, 2174],
                 task: [4969, 3042, 5437, 3865]}
    },
    spectralnorm: {
      java: { startup: [240, 180, 161, 191],
              task: [2563, 738, 2496, 873]},
      skummet: { startup: [1207, 861, 969, 979],
                 task: [4112, 1838, 3768, 1840]},
      clojure: { startup: [3003, 2291, 2620, 2160],
                 task: [2805, 2092, 2552, 1763]}
    },
    dependencies: {
      java: { startup: [160, 178, 170, 195],
              task: [155, 202, 189, 253]},
      skummet: { startup: [962, 979, 1223, 1193],
                 task: [161, 216, 227, 295]},
      clojure: { startup: [2687, 1964, 3673, 2716],
                 task: [157, 196, 262, 305]}
    }
  };

  var platformNames = ['Nexus 5 Dalvik', 'Nexus 5 ART', 'Nexus 7 Dalvik', 'Nexus 7 ART'];

  function makeDesktopStartupComparison(includeDalvik) {
    var series = includeDalvik ? [ { name: 'Clojure', data: [800, 1821] }, { name: 'Java', data: [42, 209] } ] : [ { name: 'Clojure', data: [800] }, { name: 'Java', data: [42] } ];
    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      legend: {
        reversed: true
      },
      xAxis: {
        categories: ['Nexus 5 JVM', 'Nexus 5 Dalvik'],
        labels: {
          style: {
            fontSize: '16px'
          }
        }
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
            }
          }
        }
      },
      colors: ['blue', 'red'],
      series: series
    };
  }

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
    return {
      chart: {
        type: 'bar'
      },
      series: series,
      title: {
        text: platformNames[index],
        style: { fontWeight: 'bold' }
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
        gridLineColor: 'black'
      },
      legend: {
        enabled: true,
        reversed: true,
        itemStyle: {
          fontSize: textStyle.fontSize
        },
        margin: 0
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

  function makeBenchmarksChart(times, options) {
    var optionsWithDefaults = {
      includeStartup: valueOrDefault(options.includeStartup, true),
      includeTask: valueOrDefault(options.includeTask, true),
      includeSkummet: valueOrDefault(options.includeSkummet, true),
      max: valueOrDefault(options.max, undefined),
      includeNexus7: valueOrDefault(options.includeNexus7, true),
      includeLegend: valueOrDefault(options.includeLegend, false),
      includeAxisTitle: valueOrDefault(options.includeAxisTitle, true),
      title: valueOrDefault(options.title, '')
    };
    return _makeBenchmarksChart(times, optionsWithDefaults);
  }

  function _makeBenchmarksChart(times, options){
    var javaStartup = {
      name: 'Java Startup',
      stack: 'Java',
      data: options.includeNexus7 ? times.java.startup : _.dropRight(times.java.startup, 2)
    };
    var javaTask = {
      name: 'Java Task',
      stack: 'Java',
      data: options.includeNexus7 ? times.java.task : _.dropRight(times.java.task, 2)
    }
    var skummetStartup = {
      name: 'Skummet Startup',
      stack: 'Skummet',
      data: options.includeNexus7 ? times.skummet.startup : _.dropRight(times.skummet.startup, 2)
    };
    var skummetTask = {
      name: 'Skummet Task',
      stack: 'Skummet',
      data: options.includeNexus7 ? times.skummet.task : _.dropRight(times.skummet.task, 2)
    };
    var clojureStartup = {
      name: 'Clojure Startup',
      stack: 'Clojure',
      data: options.includeNexus7 ? times.clojure.startup : _.dropRight(times.clojure.startup, 2)
    };
    var clojureTask = {
      name: 'Clojure Task',
      stack: 'Clojure',
      data: options.includeNexus7 ? times.clojure.task : _.dropRight(times.clojure.task, 2)
    };
    var series;
    if(options.includeStartup && options.includeTask) {
      if(options.includeSkummet) {
        series = [clojureTask, clojureStartup, skummetTask, skummetStartup, javaTask, javaStartup]
      } else {
        series = [clojureTask, clojureStartup, javaTask, javaStartup]
      }
    } else if(options.includeStartup) {
      if(options.includeSkummet) {
        series = [clojureStartup, skummetStartup, javaStartup];
      } else {
        series = [clojureStartup, javaStartup];
      }
    } else if(options.includeTask) {
      if(options.includeSkummet) {
        series = [clojureTask, skummetTask, javaTask];
      } else {
        series = [clojureTask, javaTask];
      }
    } else {
      series = {};
    }
    var textStyle = {
      fontSize: '14px',
      color: 'black'
    };
    var categories = options.includeNexus7 ? ['Nexus 5 Dalvik', 'Nexus 5 ART', 'Nexus 7 Dalvik', 'Nexus 7 ART'] : ['Nexus 5 Dalvik', 'Nexus 5 ART'];
    var colors;
    if(options.includeStartup && options.includeTask){
      if(options.includeSkummet){
        colors = ['lightblue', 'blue', 'lightgreen', 'green', 'lightpink', 'red'];
      } else {
        colors = ['lightblue', 'blue', 'lightpink', 'red'];
      }
    } else {
      if(options.includeSkummet){
        colors = ['blue', 'green', 'red'];
      } else {
        colors = ['blue', 'red'];
      }
    }
    return {
      chart: {
        type: 'bar',
      },
      title: {
        text: options.title
      },
      xAxis: {
        categories: categories,
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black',
        labels: { style: textStyle }
      },
      yAxis: {
        min: 0,
        max: options.max,
        title: {
          text: 'Run Time (ms)',
          style: textStyle,
          enabled: options.includeXAxisTitle
        },
        labels: {
          // Remove abbreviation of 1000 with k
          formatter: function() { return this.value; },
          style: textStyle
        },
        tickColor: 'black',
        lineColor: 'black',
        gridLineColor: 'black'
      },
      legend: {
        reversed: true,
        enabled: options.includeLegend
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
      colors: colors,
      series: series
    }
  };

  function valueOrDefault(value, defaultValue){
    return typeof value !== 'undefined' ? value : defaultValue;
  }

  init();
})();
