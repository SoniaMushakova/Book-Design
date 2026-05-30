// Данные для интерактивного теста (W_GridQuiz).
// Поля:
//   image           — путь к картинке (svg/webp), относительно docs/pages/
//   imageMobile     — (необязательно) картинка для <= 743px
//   correctAnswer   — 'correct' если по сетке всё верно, 'error' если ошибка
//   correctMessage  — текст под блоком при правильном ответе
//   wrongMessage    — текст под блоком при неправильном ответе

const QUIZ_TASK =
  'Выбери все верные варианты расположения картинки и подписи по сетке'

const QUIZ_QUESTIONS = [
  {
    image: '../images/06-03.1.svg',
    correctAnswer: 'correct',
    correctMessage: 'Молодец, твой ответ правильный!',
    wrongMessage:
      'Тут на самом деле всё по сетке — и картинка, и подпись стоят на модулях.'
  },
  {
    image: '../images/06-03.2.svg',
    correctAnswer: 'error',
    correctMessage: 'Верно — подпись съехала с модульной сетки.',
    wrongMessage: 'Присмотрись: подпись не выровнена по модулю сетки.'
  },
  {
    image: '../images/06-04.1.svg',
    correctAnswer: 'correct',
    correctMessage: 'Точно! Картинка и подпись лежат на своих модулях.',
    wrongMessage:
      'На самом деле тут всё по сетке: и картинка, и подпись на модулях.'
  },
  {
    image: '../images/06-04.2.svg',
    correctAnswer: 'error',
    correctMessage: 'Верно, картинка выходит за границы модулей сетки.',
    wrongMessage:
      'Посмотри ещё раз: картинка нарушает границы сеточных модулей.'
  }
]

export { QUIZ_TASK, QUIZ_QUESTIONS }
