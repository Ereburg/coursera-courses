/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */


// ! А вот тут уже готовый код лежит, и к нему вот такая подсказка по решению

// * вдруг кому поможет:
// * решение было на поверхности. код рабочий полностью. не хватало одной маленькой проверки - что у нас может не передаваться select. И в этом случае мы должны возвращать набор полей для селекта без изменений, а у меня при пустом селекте удалялись из объектов все поля.
// * В этом и была ошибка.
// * При этом анализатор ругался на Фильтр и я не мог понять, что с ним не так. А с ним было все ок.




function query(collection) {
    var newCollectionArray = [];
    collection.forEach(function (el) {
        newCollectionArray.push(makeClone(el));
    });

    if (arguments.length === 1) {return newCollectionArray;}

    //получаем перечень полей самого большого бъекта в коллекции
    var fieldsOfBiggestObj = [];
    newCollectionArray.forEach(function (el) {
        fieldsOfBiggestObj = (fieldsOfBiggestObj.length < Object.keys(el).length) ? Object.keys(el) : fieldsOfBiggestObj;
    });

    //получаем наборы операций и их параметры из аргументов запроса
    var operations = [].slice.call(arguments).slice(1),
        selections = [],
        filters = {};
    operations.forEach(function (el) {
        if (el[0] === 'select') {
            selections.push(el[1]);
        } else if (el[0] === 'filter' && fieldsOfBiggestObj.indexOf(el[1]) > -1) {
            (filters.hasOwnProperty(el[1])) ? filters[el[1]].push(el[2]) : filters[el[1]] = [el[2]];
        }
    });

    //получаем результирующий набор полей для выборки
    selections = (selections.length > 1) ? findIntersection(selections) : [].concat.apply([], selections);
    //отсеиваем несуществующие поля
    selections = findIntersection([fieldsOfBiggestObj, selections]);


    //получаем результирующий набор фильтров
    for (var key in filters) {
        filters[key] = (filters[key].length > 1) ? findIntersection(filters[key]) : [].concat.apply([], filters[key]);
    }
    var filteredCol = filterCollection(newCollectionArray, filters);
    return makeSelect(filteredCol, selections);
}

function makeSelect(collection, select) {
    var result = [];
    collection.forEach(function (el) {
        Object.keys(el).forEach(function (field) {
            if (!select.includes(field)) delete el[field];
        });
        result.push(el);
    });
    return result;
}

function filterCollection(collection, filters) {
    var result = collection;
    for (var key in filters) {
        result = result.filter(function (el) {
            return filters[key].includes(el[key]); // ПОЛАГАЮ, НУЖНО ИЗМЕНИТЬ ГДЕ-ТО ТУТ
        });
    }
    return result;
}

//функция поиска пересечений N массивов
function findIntersection(arr) {
    var shortestArr = arr[0],
        result = [];
    for (var i = 1; i < arr.length; i++) {
        shortestArr = (shortestArr.length < arr[i].length) ? shortestArr : arr[i];
    }
    arr.splice(arr.indexOf(shortestArr), 1);
    var counter;
    for (i = 0; i < shortestArr.length; i++) {
        counter = 0;
        arr.forEach(function (el) {
            if (el.indexOf(shortestArr[i]) > -1) counter++;
        });
        if (counter === arr.length) result.push(shortestArr[i]);
    }

    return result;
}

//клонирование объекта
function makeClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * @params {String[]}
 */
function select() {
    var fields = [].slice.call(arguments);
    return ['select', fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ['filter', property, values];
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

