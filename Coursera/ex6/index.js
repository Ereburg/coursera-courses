// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var commandStringArr = command.split(' ');
  var commandName = commandStringArr[0];

  if (commandName === 'ADD') {
    return addContact(command);
  }

  if (commandName === 'REMOVE_PHONE') {
    return removePhone(command);
  }

  if (commandName === 'SHOW') {
    return show();
  }

  function addContact() {
    var newPerson = commandStringArr[1];
    var personPhoneNumbers = commandStringArr[2].split(',');

    if (phoneBook.hasOwnProperty(newPerson)) {
      var initialPhonesArray = phoneBook[newPerson].split(', ');
      var updatedPhoneList = initialPhonesArray.concat(personPhoneNumbers);
      phoneBook[newPerson] = updatedPhoneList.join(', ');
      return;
    }

    phoneBook[newPerson] = personPhoneNumbers.join(', ');
  }

  function removePhone() {
    var phoneToRemove = commandStringArr[1];
    var clone = {};

    for (var key in phoneBook) {
      clone[key] = phoneBook[key];
    }

    for (var name in phoneBook) {
      if (phoneBook[name] == phoneToRemove) {
        delete phoneBook[name];
      } else if (phoneBook[name].split(', ').indexOf(phoneToRemove) != -1) {
        var initialPhonesArray = phoneBook[name].split(', ');
        for (var i = 0; i < initialPhonesArray.length; i++) {
          if (initialPhonesArray[i] == phoneToRemove) {
            initialPhonesArray.splice(i, 1);
          }
        }
        phoneBook[name] = initialPhonesArray.join(', ');
      }
    }

    return JSON.stringify(clone) === JSON.stringify(phoneBook) ? false : true;
  }

  function show() {
    var arr = [];
    var j = 0;
    for (var key in phoneBook) {
      arr[j] = key + ': ' + phoneBook[key];
      j++;
    }

    return arr.sort();
  }
};
