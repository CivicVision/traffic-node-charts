accidents = require('./accidents.js');
data = require('./data.js');

data.getCsv('https://s3.amazonaws.com/traffic-sd/per_hour_accidents.csv').then(function(result) {
  //console.log(result)
  accidents.generate(result);
});
