exports.isAmount = function (value) {
  value.match('^[d]+[.][d]{3}$');
};
