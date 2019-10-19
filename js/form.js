'use strict';

(function () {
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TAIL_HEIGHT = 22;
  var inpCapacity = adForm.querySelector('#capacity');
  var capacityOptions = inpCapacity.querySelectorAll('option');
  var inpRooms = adForm.querySelector('#room_number');
  var inpPrice = adForm.querySelector('#price');
  var inpTypeOfHouses = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var avatarChooser = adForm.querySelector('.ad-form-header__input[type=file]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');

  var picChooser = adForm.querySelector('.ad-form__input[type=file]');
  var picPreview = adForm.querySelector('.ad-form__photo img');

  /**
   * добавление атрибута disabled полям input/select
   * @param {Array} collInp - коллекция инпутов
   * @param {Array} collSel - коллекция селектов
  */
  var addDisabled = function (collInp, collSel) {
    collInp.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
    collSel.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
    // for (var i = 0; i < collInp.length; i++) {
    //   collInp[i].setAttribute('disabled', 'disabled');
    // }
    // for (i = 0; i < collSel.length; i++) {
    //   collSel[i].setAttribute('disabled', 'disabled');
    // }
  };

  addDisabled(inputs, selects);

  /**
   * удаление атрибута disabled полям input/select
   * @param {Array} collInp - коллекция инпутов
   * @param {Array} collSel - коллекция селектов
   */
  var removeDisabled = function (collInp, collSel) {
    collInp.forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
    collSel.forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
    // for (var i = 0; i < collInp.length; i++) {
    //   collInp[i].removeAttribute('disabled', 'disabled');
    // }
    // for (i = 0; i < collSel.length; i++) {
    //   collSel[i].removeAttribute('disabled', 'disabled');
    // }
  };

  /**
   * функция обработчик для активации состояний полей форм
   */
  var activeState = function () {
    removeDisabled(inputs, selects);
    window.map.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  // стартовое значение пина
  addressInput.setAttribute('value', Math.floor(MAIN_PIN_START_X + MAIN_PIN_WIDTH / 2) + ', ' + Math.floor(MAIN_PIN_START_Y + MAIN_PIN_HEIGHT / 2));

  /**
 * @property {string} x - содержит св-во left исключая "px"
 * @property {string} y - содержит св-во top исключая "px"
 * @description обновляет строку с координатами главного пина и записывает ее в инпут адрес
 */
  var setCoordinatePin = function () {
    var x = window.map.mainPin.style.left.slice(0, -2);
    var y = window.map.mainPin.style.top.slice(0, -2);
    x = Math.floor(+x + MAIN_PIN_WIDTH / 2);
    y = Math.floor(+y + MAIN_PIN_HEIGHT + PIN_TAIL_HEIGHT);

    if (y > window.data.LOCATION_Y_MAX) {
      y = window.data.LOCATION_Y_MAX;
    } if (y < window.data.LOCATION_Y_MIN) {
      y = window.data.LOCATION_Y_MIN;
    } if (x > window.data.LOCATION_X_MAX) {
      x = window.data.LOCATION_X_MAX;
    } if (x < window.data.LOCATION_X_MIN) {
      x = window.data.LOCATION_X_MIN;
    }

    addressInput.value = x + ', ' + y;
  };

  var removeSelectedAttribute = function (arr) {
    arr.forEach(function (elem) {
      elem.setAttribute('selected', 'false');
    });
  };

  /**
   * проверка валидности поля гостей к полю комнаты
   * @description доступные поля:
   * 1 комната — «для 1 гостя»;
   * 2 комнаты — «для 2 гостей» или «для 1 гостя»;
   * 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
   * 100 комнат — «не для гостей».
   * проходит по коллекции опции гостей и переключает атрибуты disable
   */
  var selectGuestsChangeValidator = function () {
    switch (+inpRooms.value) {
      case 1:
        removeSelectedAttribute(capacityOptions);
        capacityOptions.forEach(function (elem) {
          elem.toggleAttribute('disabled', elem.value === '2' || elem.value === '3' || elem.value === '0');
        });
        inpCapacity[2].setAttribute('selected', true);
        // for (var i = 0; i < capacityOptions.length; i++) {
        //   capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '2' || capacityOptions[i].value === '3' || capacityOptions[i].value === '0');
        // }
        break;
      case 2:
        removeSelectedAttribute(capacityOptions);
        capacityOptions.forEach(function (elem) {
          elem.toggleAttribute('disabled', elem.value === '3' || elem.value === '0');
        });
        inpCapacity[2].setAttribute('selected', true);
        // for (i = 0; i < capacityOptions.length; i++) {
        //   capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '3' || capacityOptions[i].value === '0');
        // }
        break;
      case 3:
        removeSelectedAttribute(capacityOptions);
        capacityOptions.forEach(function (elem) {
          elem.toggleAttribute('disabled', elem.value === '0');
        });
        inpCapacity[2].setAttribute('selected', true);
        // for (i = 0; i < capacityOptions.length; i++) {
        //   capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '0');
        // }
        break;
      case 100:
        removeSelectedAttribute(capacityOptions);
        capacityOptions.forEach(function (elem) {
          elem.toggleAttribute('disabled', elem.value === '1' || elem.value === '2' || elem.value === '3');
        });
        inpCapacity[3].setAttribute('selected', true);
        // for (i = 0; i < capacityOptions.length; i++) {
        //   capacityOptions[i].toggleAttribute('disabled', capacityOptions[i].value === '1' || capacityOptions[i].value === '2' || capacityOptions[i].value === '3');
        // }
        break;
    }
  };

  /**
   *событие на селекте поля комнат
  */
  inpRooms.addEventListener('change', function () {
    selectGuestsChangeValidator();
  });

  /**
   * проверка валидности поля типа жилья и минимальной цены
   * @description доступные поля:
   *«Бунгало» — минимальная цена за ночь 0;
  *«Квартира» — минимальная цена за ночь 1000;
  *«Дом» — минимальная цена 5000;
  *«Дворец» — минимальная цена 10000.
  */
  var selectTypeOfHousesChangeValidator = function () {
    switch (inpTypeOfHouses.value) {
      case 'bungalo':
        inpPrice.setAttribute('min', 0);
        inpPrice.setAttribute('placeholder', '0');
        break;
      case 'flat':
        inpPrice.setAttribute('min', 1000);
        inpPrice.setAttribute('placeholder', '1000');
        break;
      case 'house':
        inpPrice.setAttribute('min', 5000);
        inpPrice.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        inpPrice.setAttribute('min', 10000);
        inpPrice.setAttribute('placeholder', '10000');
        break;
    }
  };

  /**
   * событие на селекте типа жилья
   */
  inpTypeOfHouses.addEventListener('change', function () {
    selectTypeOfHousesChangeValidator();
  });

  /**
   * обработчик валидации
   * @param {Object} timeX - проверяемое время
   * @param {Object} timeY - время которое синхронизируется с проверяемым
   */
  var selectChangeTimeValidation = function (timeX, timeY) {
    switch (timeX.value) {
      case '12:00':
        timeY.value = '12:00';
        break;
      case '13:00':
        timeY.value = '13:00';
        break;
      case '14:00':
        timeY.value = '14:00';
        break;
    }
  };

  timeIn.addEventListener('change', function () {
    selectChangeTimeValidation(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    selectChangeTimeValidation(timeOut, timeIn);
  });

  /**
   * @param {Event} evt - параметр event
   * событие успеха на отправке формы
   * очистка полей
   * удаление метки похожих объявлений и карточки активного объявления
   * метка адреса возвращается в исходное положение, корректируются координаты, отображаемые в поле «Адрес»
   * Показ сообщения об успешной отправке формы
   */
  var successUploadHandler = function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      adForm.reset();
      inpPrice.placeholder = 0;
      window.map.closeModalAd();
      window.map.mainPin.style.top = MAIN_PIN_START_Y + 'px';
      window.map.mainPin.style.left = MAIN_PIN_START_X + 'px';
      setCoordinatePin();
      window.util.successHandler();
    }, window.util.errorHandler);
    evt.preventDefault();
  };

  /**
   * обработчик отправки формы
   */
  adForm.addEventListener('submit', successUploadHandler, window.util.errorHandler);

  /**
   * обработчик добавления аватара
   */
  avatarChooser.addEventListener('change', function () {
    window.inputFiles.inpImgHandler(avatarChooser, avatarPreview);
  });

  /**
   * обработчик добавления фотографии жилья
   */
  picChooser.addEventListener('change', function () {
    window.inputFiles.inpImgHandler(picChooser, picPreview);
  });

  window.form = {
    activeState: activeState,
    setCoordinatePin: setCoordinatePin,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT
  };
})();
