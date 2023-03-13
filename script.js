'use strict';
window.addEventListener('DOMContentLoaded', () => {
  // переменные из верстки

  const player0El = document.querySelector('.player--0'); // экран первого игрока
  const player1El = document.querySelector('.player--1'); // экран второго игрока

  const score0El = document.querySelector('#score--0'); //счет первого игрока
  const score1El = document.getElementById('score--1'); // счет второго игрока

  const current0El = document.getElementById('current--0'); // текущий счет первого игрока
  const current1El = document.getElementById('current--1'); // текущий счет второго игрока

  const diceEl = document.querySelector('.dice'); // кубик

  const btnNew = document.querySelector('.btn--new'); // кнопка новая игра
  const btnRoll = document.querySelector('.btn--roll'); // кнопка бросить кубик
  const btnHold = document.querySelector('.btn--hold'); // кнопка сохранить текущий счет

  // переменные для логики игры
  let scores, currentScore, activePlayer, playing;

  // функция устанавливающая начальные условия игры
  const init = function () {
    scores = [0, 0]; // общий счет игроков
    currentScore = 0; // значение текущего счета активного игрока
    activePlayer = 0; // активный игрок (будет либо значение 0 в старте игры, либо 1 при смене игрока - меняется в функции смены игрока)
    playing = true; // идет ли игра

    // все результаты обоих игроков на экране
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.remove('show'); // убрать с экрана изначальное изображение кубика
    player0El.classList.remove('player--winner'); // убрать оповещение о победителе для первого игрока
    player1El.classList.remove('player--winner'); // убрать оповещение о победителе для второго игрока
    player0El.classList.add('player--active'); // показать аквтиность первого игрока в стилях
    player1El.classList.remove('player--active'); // удалить активность второго игрока
  };

  init(); // установливаем стартовые значения

  // функция смены игрока
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // установить счет для текущего игрока в 0
    currentScore = 0; // обгулить переменную текущего счета
    activePlayer = activePlayer === 0 ? 1 : 0; // сменить активного игрока (сравниваем 0 и 1 и от этого меняем у игроков класс активности)
    player0El.classList.toggle('player--active'); // сменить класс активности отталкиваясь от предыдущего значения
    player1El.classList.toggle('player--active'); // сменить класс активности отталкиваясь от предыдущего значения
  };

  // логика броска кубика
  btnRoll.addEventListener('click', function () {
    if (playing) {
      // если игра идет
      const dice = Math.trunc(Math.random() * 6) + 1; // выбор рандомного числа от 1 до 6

      diceEl.src = `dice-${dice}.png`; // указываем кубик с каким количеством единиц показать на экране
      diceEl.classList.add('show'); // показываем кубик на экране

      if (dice !== 1) {
        // условие смены активного игрока - если выпала не единица
        currentScore += dice; // увеличиваем текущий счет на значение кубика
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore; // показываем этот счет на экране
      } else {
        // если выпала единица
        switchPlayer(); // меняем игрока
      }
    }
  });

  // функция сохранения общего счета игрока
  btnHold.addEventListener('click', function () {
    if (playing) {
      // если игра идет
      scores[activePlayer] += currentScore; // изменяем значения общего счета прибавляя текущий счет исходя из индекса активного игрока
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer]; // показываем общий счет на экране активного игрока
      if (scores[activePlayer] >= 100) {
        // если общий счет болше либо равен 100
        playing = false; // останавливаем игру
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner'); // показываем победителя
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active'); // удаляем класс активности
        diceEl.classList.remove('show'); // убираем с экрана кубик
      } else {
        switchPlayer(); // если меньше 100 продолжаем менять игроков
      }
    }
  });

  btnNew.addEventListener('click', init); // по клику на кнопку новая игра - обнуляем все результаты
});
