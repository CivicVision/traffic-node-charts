const fs = require('fs');
accidents = require('./accidents.js');
dowHodInjured = require('./dowHodInjuredChart.js');
data = require('./data.js');

const writeFile = function(fileName, d) {
  fs.writeFile(fileName, d, 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('success')
  });
}
const hour_accidents = function() {
  data.getCsv('https://s3.amazonaws.com/traffic-sd/per_hour_accidents.csv').then(function(result) {
    const d3n = accidents.generate(result);
    console.log('chart generated')
    writeFile('./accidents.svg', d3n.svgString());
  });
};
const dow_chart = function() {
  data.getCsv("https://s3.amazonaws.com/traffic-sd/full_hour_accidents.csv").then(function(result) {
    const d3n = dowHodInjured.generate(result);
    writeFile('./dowHodInjured.svg', d3n.svgString());
  });
};
hour_accidents();
