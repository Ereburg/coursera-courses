/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  var obj = {
      _value: null,
      get value() {
          return this+"";
      },
      init: function(date) {
          if(date instanceof Date) this._value = date;
          else {
          var arr = date.split(/[\s:-]/);
          this._value = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]));
          }
          return this;
      },
      add: function(value, type) {
              if (value > 0 && type in this.method) {
                  return this.setValue(value, this.method[type]);
              } else {
                  throw new TypeError("Передано неверное значение");
              }
      },
      subtract: function(value, type) {
          if (value > 0 && type in this.method) {
              return this.setValueSubtract(value, this.method[type]);
          } else {
              throw new TypeError("Передано неверное значение");
          }
      },
      method: {
          "years": "FullYear",
          "months": "Month",
          "days": "Date",
          "hours": "Hours",
          "minutes": "Minutes"
      },
      setValue: function(value, method) {
          this._value['setUTC' + method](value + this._value['getUTC' + method]());
          return this;
      },
      setValueSubtract: function(value, method) {
          this._value['setUTC' + method](-value + this._value['getUTC' + method]());
          return this;
      },
      valueOf: function() {
              var year = this._value.getFullYear();
              var month = this._value.toLocaleString("ru",{timeZone : "UTC",month: '2-digit'});
              var day = this._value.toLocaleString("ru",{timeZone : "UTC",day: '2-digit'});
              var time = this._value.toLocaleString("ru",{timeZone : "UTC", hour: '2-digit', minute: '2-digit' });
              var dates = year + "-" + month + "-" + day + " " + time;
              return dates;
      },
      toString: this.valueOf,
  };
  return obj.init(date);
};
