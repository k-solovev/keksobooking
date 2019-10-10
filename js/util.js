'use strict';

(function () {
  /**
 * функция вывода случайных данных из массива
 * @param {Array} arr - массив из которого выбираются данные
 * @return {string | number} элемент массива
 */
  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /**
 * функция рандомного числа от min до max
 * @param {Number} min - минимальное значение диапазона
 * @param {Number} max - максимальное значение диапазона
 * @return {Number} - возвращает рандомное число
 */
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  /**
 * функция перемешивания массива
 * @param {Array} arr - массив для перемешивания
 * @return {Array} перемешанный массив
 */
  var getShuffleArr = function (arr) {
    var copyArr = arr.slice();
    var newArr = [];
    var j;

    for (var i = 0; i < arr.length; i++) {
      j = Math.floor(Math.random() * copyArr.length);
      newArr.push(copyArr[j]);
      copyArr.splice(j, 1);
    }

    return newArr;
  };

  /**
 * функция выдающая случайное кол-во элементов из массива
 * @param {Array} arr - исходный массив
 * @return {Array} новый массив со случайными элементами от исходного
 */
  var getRandomArr = function (arr) {
    var newArr = getShuffleArr(arr);

    newArr.splice(0, Math.floor(Math.random() * newArr.length));

    return newArr;
  };

  /**
  * обработчик ошибки загрузки данных с сервера
  */
  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElem = errorTemplate.cloneNode(true);
    var mainElem = document.querySelector('main');
    var errBtn = errorElem.querySelector('.error__button');
    mainElem.appendChild(errorElem);

    errBtn.addEventListener('click', function () {
      mainElem.removeChild(errorElem);
      window.map.loadServerData();
    });
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomInteger: getRandomInteger,
    getShuffleArr: getShuffleArr,
    getRandomArr: getRandomArr,
    errorHandler: errorHandler
  };
})();