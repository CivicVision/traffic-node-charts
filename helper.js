module.exports.killed = function(d) {
  return parseInt(d.killed);
};

module.exports.injured = function(d) {
  return parseInt(d.injured);
};

module.exports.killedInjured = function(d) {
  return parseInt(d.killed) + parseInt(d.injured);
};

module.exports.sumKilled = function(data) {
  return d3.sum(data, killed);
};

module.exports.sumInjured = function(data) {
  return d3.sum(data, injured);
};

module.exports.sumKilledInjured = function(data) {
  return d3.sum(data, killedInjured);
};

module.exports.construct_street_name = function(d) {
  var street_name;
  street_name = d.street_name + " " + d.street_type;
  if (d.cross_st_name) {
    return street_name + " / " + d.cross_st_name + " " + d.cross_st_type;
  } else {
    if (d.street_dir) {
      return d.street_no + " " + d.street_dir + " " + street_name;
    } else {
      return d.street_no + " " + street_name;
    }
  }
};

