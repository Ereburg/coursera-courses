/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  var min = (minutes + interval) % 60; 
  var hrs = (hours + Math.floor((minutes + interval)/60)) % 24;

  if (hrs < 10) {
    hrs = '0' + hrs;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return hrs + ':' + min;
};

var arr = [];
arr.push(1);
arr.push(2);
arr.pop();
arr.push(3);
console.log(arr);