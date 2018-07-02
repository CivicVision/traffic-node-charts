accidents = require('./accidents.js');
dowHodInjured = require('./dowHodInjuredChart.js');
data = require('./data.js');

data.getCsv('https://s3.amazonaws.com/traffic-sd/per_hour_accidents.csv').then(function(result) {
  //console.log(result)
  accidents.generate(result);
});
data.getCsv("https://s3.amazonaws.com/traffic-sd/full_hour_accidents.csv").then(function(result) {
  console.log('dowHod')
  console.log(result)
  dowHodInjured.generate(result);
});

