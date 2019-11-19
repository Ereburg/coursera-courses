/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {

  var resultArray = [];
  var arr = tweet.split(' ').forEach(function(el) {
    if (el.indexOf('#') !== -1) {
      resultArray.push(el.slice(1));
    }
  });
  
  return resultArray;
};