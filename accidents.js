var findTimeEdges = function(data, numberOfDeviations, treshold) {
  var accidentsMean, accidentsNumbers, accidentsSum, acctargets, acctargetsHours, filteredTargets, max, maxAccidents, maxDate, min, minDate, sdt, simplehourFormat, targets;
  if (numberOfDeviations == null) {
    numberOfDeviations = 1;
  }
  if (treshold == null) {
    treshold = 2;
  }
  accidentsNumbers = data.map(function(d) {
    return d.value;
  });
  accidentsSum = d3.sum(accidentsNumbers);
  maxAccidents = d3.max(accidentsNumbers);
  accidentsMean = d3.mean(accidentsNumbers);
  sdt = d3.deviation(accidentsNumbers);
  targets = findWithin(accidentsNumbers, maxAccidents, sdt, numberOfDeviations);
  acctargets = findTargets(data, targets, maxAccidents, 'value');
  simplehourFormat = d3.timeFormat('%H');
  acctargetsHours = acctargets.map(function(d) {
    return parseInt(simplehourFormat(d.key));
  });
  filteredTargets = stats.filterOutliers(acctargetsHours, stats.outlierMethod.MAD, treshold);
  min = d3.min(filteredTargets);
  max = d3.max(filteredTargets);
  minDate = new Date();
  minDate.setHours(min);
  maxDate = new Date();
  maxDate.setHours(max);
  return {
    min: minDate,
    max: maxDate
  };
};

var accidentsPerHour = function(data) {
  var h;
  return {
    "key": newDate,
    "name": "Collissions",
    "values": (function() {
      var i, results1;
      results1 = [];
      for (h = i = 0; i <= 23; h = ++i) {
        results1.push(nestHour(h, newDate, data, "accidents", accidents));
      }
      return results1;
    })()
  };
};
var mapAccidentsData = function(data) {
  return [accidentsPerHour(data)];
};

module.exports.accidentsChart = function(data) {
    var data, dowChartAccidents, maxEntry, timeEdges;
    data = mapAccidentsData(accidentsData);
    mapData = function(data) {
      return data;
    };
    maxAccidents = d3.max(data, function(d) {
      return parseInt(d.accidents);
    });
    maxEntry = _.find(data[0].values, {
      value: maxAccidents
    });
    timeEdges = findTimeEdges(data[0].values);
    d3.selectAll('.most-collisions-start-hour').text(hourFormat(timeEdges.min));
    d3.selectAll('.most-collisions-end-hour').text(hourFormat(timeEdges.max));
    d3.selectAll('.number-of-collisions').text(d3.sum(data[0].values.map(function(d) {
      return d.value;
    })));
    dowChartAccidents = dayofWeekChart().valueKey("accidents").startDate(new Date(2016, 0, 1)).colorDomain([0, maxAccidents]).mapData(mapData).yValue(yValue).tooltipTemplate(tooltipTemplate);
    return d3.select('#dow-chart-accidents').data([data]).call(dowChartAccidents);
};
