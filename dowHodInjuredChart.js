const d3 = require('d3');
const d3Node = require('d3-node');
const fs = require('fs');

const dayofWeekChart = require('./dow-node');
const dataHelper = require('./dataHelper')

module.exports.generate = function (data) {
  data = dataHelper.dowHodMapper(data, "injured", "date_hour");
  dowHodInjured = dayofWeekChart().valueKey("injured").colorDomain([0,220])
  const d3n = new d3Node({selector: '#chart', container: '<div id="container"><div id="chart"></div></div>'});
  var svg = d3n.createSVG(700, 600);
  d3.select(d3n.document.querySelector('#chart')).data([data]).call(dowHodInjured);
  fs.writeFile('./dowHodInjured.svg', d3n.svgString(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('success')
  });
};

