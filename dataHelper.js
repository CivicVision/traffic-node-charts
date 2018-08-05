const d3 = require('d3');
const _ = require('lodash');

const dowHodMapper = function(data, valueKey, dateKey, startDate) {
  const xValue = function(date) {
    var dowHFormat, entry;
    dowHFormat = d3.timeFormat("%w %H");
    entry = _.filter(this, function(d) {
      d.date = new Date(d[dateKey])
      return dowHFormat(d.date) === dowHFormat(date);
    });
    if (entry) {
      return d3.sum(entry, function(d) {
        return d[valueKey];
      });
    }
  };
  const nestHour = function(h, newDate, data) {
    var hourDate;
    hourDate = d3.timeHour.offset(newDate, h);
    return {
      "key": hourDate,
      "value": xValue.call(data, hourDate)
    };
  };
  const nestDate = function(dow, data) {
    var h, newDate;
    newDate = d3.timeDay.offset(startDate, dow);
    return {
      "key": newDate,
      "values": (function() {
        var j, results;
        results = [];
        for (h = j = 0; j <= 23; h = ++j) {
          results.push(nestHour(h, newDate, data));
        }
        return results;
      })()
    };
  };
  var dow, nData;
  if (startDate === undefined) {
    startDate = new Date(2015, 4, 3);
  }
  nData = (function() {
    console.log(startDate)
    var j, results;
    results = [];
    for (dow = j = 0; j <= 6; dow = ++j) {
      results.push(nestDate(dow, data));
    }
    return results;
  })();
  return nData;
};

module.exports = {
  dowHodMapper: dowHodMapper
};
