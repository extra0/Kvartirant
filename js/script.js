$(document).ready(function() {

  //  сопряжение слов
  function getNumEnding(iNumber, aEndings) {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
      sEnding = aEndings[2];
    } else {
      i = iNumber % 10;
      switch (i) {
        case (1):
          sEnding = aEndings[0];
          break;
        case (2):
        case (3):
        case (4):
          sEnding = aEndings[1];
          break;
        default:
          sEnding = aEndings[2];
      }
    }
    return sEnding;
  }

  // сопрягаем слова
  $('#room').html(getNumEnding($(".number__num-aparts").html(), ['квартира', 'квартиры', 'квартир']));

  // выбор даты в инпуте вверху
  $(".search-main__date").datepicker({
    closeText: 'Закрыть',
    prevText: '&#x3c;Пред',
    nextText: 'След&#x3e;',
    currentText: 'Сегодня',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
    ],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dateFormat: 'd M',
    showAnim: "slideDown",
    firstDay: 1,
    isRTL: false,
    numberOfMonths: 1,
    minDate: "0",
  });


  var dates = [""];

  function addZero(date){
      return date >9 ? date : '0'+date;
  }

  // дата на странице комнаты
  $(".calendar__slider").datepicker({
    closeText: 'Закрыть',
    prevText: '&#x3c;Пред',
    nextText: 'След&#x3e;',
    currentText: 'Сегодня',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
    ],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    numberOfMonths: 2,
    minDate: "0",
    firstDay: 1,
        beforeShowDay: function (date){ 
            var day = addZero(date.getDate());
            var month = addZero(date.getMonth());            
            var d = date.getFullYear()+"-"+month+"-"+day ;
            if ( dates.indexOf(d) >= 0 ){ 
                return [true,"ui-state-busy"];         
            }    
            return [true,""]; 
        },
        onSelect:function(date, init){
            var td = init.dpDiv.find('a.ui-state-hover').parent('td');
            var d = new Date(date);
            var day = addZero(d.getDate());
            var month = addZero(d.getMonth());
            var a = d.getFullYear()+"-"+month+"-"+day;
            var index = dates.indexOf(a);
            if ( index >= 0 ){            
                dates.splice(index, 1);
                td.removeClass('ui-state-busy');
            } else {
               dates.push(a);
               td.addClass('ui-state-busy');
            }
        }
  });

  // кастомизация селекта
  $('.select, .modal__checkbox, .settings__input, ._file, ._radio').styler();

  // только цифры в инпуте даты
  $('.search-main__price, .price').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g, '')) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
  });

  // Виджет ВК
  VK.Widgets.Group("vk_groups", {
    mode: 0,
    width: "276",
    height: "271",
    color1: 'FFFFFF',
    color2: '2B587A',
    color3: '5B7FA6'
  }, 20003922);

  // модальные окна
  $('.modal').fancybox();
  $('.modal__close').click(function() {
    $.fancybox.close();
    return false;
  });

  // открытие-закртыие детального поиска
  $('.search-main__detail-search').click(function() {
    $(this).hide(400);
    $('.settings__block').slideDown(400);
    $('._main-search').hide(400);
    $('.search-main__show-wrap').show(400);
    return false;
  });

  $('.search-main__show').click(function() {
    $('.search-main__detail-search').show(400);
    $('.search-main__show-wrap').hide(400);
    $('.settings__block').slideUp(400);
    $('._main-search').show(400);
    return false;
  });

  // открытие закрытие карты
  $('.map__button').click(function() {
    $(this).toggleClass('_hidden');
    if ($(this).hasClass('_hidden')) {
      $(this).html('Показать карту');
    } else {
      $(this).html('Скрыть карту');
      $('.map__block').slideDown(400);
    }

    $('.map__block').toggleClass('_hidden');
    return false;
  });

  // карта
  


  // вызов слайдера на старнице апартаментов
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerPadding: '100px',
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    variableWidth: true,
    centerMode: false,
    focusOnSelect: true
  });

  // открываем часть закрытого текста в описании
  $('._more-text').click(function() {
    $('.room__description-block').toggleClass('show');
    $(this).toggleClass('show');
    if ($(this).hasClass('show')) {
      $(this).html('Меньше');
    } else {
      $(this).html('Больше');
    }
  });

  //появление преимуществ в начале
  setTimeout(function() {
    $('.advantages__item:nth-child(1)').css('opacity', '1');
  }, 1000);
  setTimeout(function() {
    $('.advantages__item:nth-child(2)').css('opacity', '1');
  }, 1500);
  setTimeout(function() {
    $('.advantages__item:nth-child(3)').css('opacity', '1');
  }, 2000);

  // табы 
  $('#tabs').tabs();

  // маски на телефон
  $('.mask_first').mask('+38 999');
  $('.mask_last').mask('999 99 99');

  // проставление рейтинга для комнаты в отзыве 
  $('div.rating').rating({
    fx: 'full',
    image: 'img/rating_stars.png',
    loader: 'img/ajax-loader.gif',
    width: 20,
  });

  // расчет рейтинга 
  $('.vote-active').click(function() {
    var sum = 0;
    $('.vote-success').each(function() {
      sum += parseInt($(this).text())
    });

    average = sum / 5; //расчет среденего рейтинга
    $('#summ').html(average); // выводи средний ретинг

    width = average / 5 * 100; // расчитываем процент закраски звезд
    $('#summ_rating').css('width', width + '%'); // закрашиваем звезды в зависимости от рейтинга
  });

  //вопрос ответ
  $(document).on('click', '.question__link', function(e) {
    e.preventDefault();
    var $self = $(this),
        $li = $self.closest('div');
    $li.find('.question__answer').stop(true, false).slideToggle(); //запрет на очередь повторений
    return false;
  });

  //  добавляем номер телефона в профиле
  var i = 1;
  $('.tab__add-number').click(function(){
    $(this).before('<div class="tab__input-wrap" style="display: block;"><input id="feed_phone" type="tel" placeholder="+38 " name="phone-'+ i + '" required="" class="tab__input mask_first"><span class="tab__line"></span><input type="tel" name="subphone-'+ i +'" required="" class="tab__input mask_last " style="  margin-left: 5px;"><span class="close"></span></div>');
    ++ i;
    $('.mask_first').mask('+38 999');
    $('.mask_last').mask('999 99 99');

    // удаляем не нужный телефон в профиле
    $('.close').click(function(){
      $(this).parent().remove();
      return false;
    });
    return false;
  });

  // удаляем не нужную фото в профиле и теги в добавлении комнаты
  $('.close, .tag__delete').click(function(){$(this).parent().remove();});

  // удаляем ненужные объявления в личном кабинете
  $('._del').click(function(){$(this).parent().parent().parent().remove();return false;});
 
  //подсчет символов в input
  $(function () {
    var target = $('[data-field="target"]');
    $(document).on('input', '[data-field="item"]', function () {
      var item = $(this);
      target.html(70-item.val().length);
    });
  });

  //подсчет символов в текстареи
  $(function () {
    var target = $('[data-field="target_2"]');
    $(document).on('input', '[data-field="item_2"]', function () {
      var item = $(this);
      target.html(545-item.val().length);
    });
  });


  // яндекс карта с драгером
  jQuery(function () {
      ymaps.ready(init);
  });

  function init () {
      var map = new ymaps.Map('dragger_map', {
              center: [55.819543, 37.611619],
              zoom: 10,
              controls: ['zoomControl']
          }, {
              searchControlProvider: 'yandex#search'
          }),
          markerElement = jQuery('#marker'),
          dragger = new ymaps.util.Dragger({
              // Драггер будет автоматически запускаться при нажатии на элемент 'marker'.
              autoStartElement: markerElement[0]
          }),
          // Смещение маркера относительно курсора.
          markerOffset,
          markerPosition;

      dragger.events
          .add('start', onDraggerStart)
          .add('move', onDraggerMove)
          .add('stop', onDraggerEnd);

      function onDraggerStart(event) {   
          var offset = markerElement.offset(),
              position = event.get('position');
          // Сохраняем смещение маркера относительно точки начала драга.  
          markerOffset = [
              position[0] - offset.left,
              position[1] - offset.top
          ];
          markerPosition = [
              position[0] - markerOffset[0],
              position[1] - markerOffset[1]
          ];

          applyMarkerPosition();
      }

      function onDraggerMove(event) {
          applyDelta(event);
      }

      function onDraggerEnd(event) {
          applyDelta(event);
          markerPosition[0] += markerOffset[0];
          markerPosition[1] += markerOffset[1];
          // Переводим координаты страницы в глобальные пиксельные координаты.
          var markerGlobalPosition = map.converter.pageToGlobal(markerPosition),
              // Получаем центр карты в глобальных пиксельных координатах.
              mapGlobalPixelCenter = map.getGlobalPixelCenter(),
              // Получением размер контейнера карты на странице.
              mapContainerSize = map.container.getSize(),
              mapContainerHalfSize = [mapContainerSize[0] / 2, mapContainerSize[1] / 2],
              // Вычисляем границы карты в глобальных пиксельных координатах.
              mapGlobalPixelBounds = [
                  [mapGlobalPixelCenter[0] - mapContainerHalfSize[0], mapGlobalPixelCenter[1] - mapContainerHalfSize[1]],
                  [mapGlobalPixelCenter[0] + mapContainerHalfSize[0], mapGlobalPixelCenter[1] + mapContainerHalfSize[1]]
              ];
          // Проверяем, что завершение работы драггера произошло в видимой области карты.
          if (containsPoint(mapGlobalPixelBounds, markerGlobalPosition)) {
              // Теперь переводим глобальные пиксельные координаты в геокоординаты с учетом текущего уровня масштабирования карты.
              var geoPosition = map.options.get('projection').fromGlobalPixels(markerGlobalPosition, map.getZoom());
              // alert(geoPosition.join(' '));
          }
      }

      function applyDelta (event) {
          // Поле 'delta' содержит разницу между положениями текущего и предыдущего события драггера.
          var delta = event.get('delta');
          markerPosition[0] += delta[0];
          markerPosition[1] += delta[1];
          applyMarkerPosition();
      }

      function applyMarkerPosition () {
          markerElement.css({
              left: markerPosition[0],
              top: markerPosition[1]
          });
      }

      function containsPoint (bounds, point) {
          return point[0] >= bounds[0][0] && point[0] <= bounds[1][0] &&
                 point[1] >= bounds[0][1] && point[1] <= bounds[1][1];
      }
      myMap.behaviors.disable('scrollZoom');
  }

});