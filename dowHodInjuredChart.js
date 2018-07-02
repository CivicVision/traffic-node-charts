const d3 = require('d3');
const d3Node = require('d3-node');
const dayofWeekChart = require('./dow-node');
const fs = require('fs');

module.exports.generate = function (data) {
  dowHodInjured = dayofWeekChart().valueKey("injured").colorDomain([0,220])
  var svg = d3n.createSVG(700, 600);
  d3.select(d3n.document.querySelector('#chart')).data([data]).call(dowHodInjured);
  console.log(d3n.html())
  fs.writeFile('./dowHodInjured.svg', d3n.svgString(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('success')
  });
};

