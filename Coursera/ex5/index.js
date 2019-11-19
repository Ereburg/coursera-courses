/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  var testArr = [];

  // привели к нижнему регистру
  hashtags.forEach(function (el) {
    testArr.push(el.toLowerCase());
  });

  for (var i = 0; i < testArr.length - 1; i++) {
    for (var j = i + 1; j < testArr.length; j++) {
      if (testArr[i] === testArr[j]) {
        testArr.splice(j, 1);
        j--;
      }
    }
  }

  var arrToString = testArr.join(', ');

  return arrToString;

};