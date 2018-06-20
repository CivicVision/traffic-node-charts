const https = require('https');
const d3Dsv = require('d3-dsv');
var Promise = require('promise');

module.exports.getCsv = function(url) {
	return new Promise(function (resolve, reject) {
		https.get(url, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				resolve(d3Dsv.csvParse(data));
			});
		}).on("error", (err) => {
			reject("Error: " + err.message);
		});
	});
};

/* usage 
getCsv('https://s3.amazonaws.com/traffic-sd/accidents_killed_injured_b_year.csv').then(function(result) {
console.log(result);
});
*/
