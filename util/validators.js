const isAmount = (value) => value.match('^[d]+[.][d]{3}$');

module.exports = { isAmount };
