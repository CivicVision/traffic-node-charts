accidents = require('./accidents.js');
data = require('./data.js');

data.getCsv('https://s3.amazonaws.com/traffic-sd/full_hour_accidents.csv').then(function(result) {
  //console.log(result)
  accidents.generate(result);
});
