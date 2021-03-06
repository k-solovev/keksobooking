'use strict';

(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 5000;

  /**
   * загрузка данных с сервера
   * @param {cb} loadSucces - при успешном обращении к серверу
   * @param {cb} loadError - при ошибочном обращении
   */
  var load = function (loadSucces, loadError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        loadSucces(xhr.response);
      } else {
        loadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      loadError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      loadError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, loadSucces, loadError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        loadSucces(xhr.response);
      } else {
        loadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
