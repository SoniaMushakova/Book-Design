// 1) Импорты (если нужны)
// import './A_CardText.css' //нет такого файла тк я стиль храню в atoms.css

import React from 'react'
// 2) Данные / массивы (импорт из внешнего файла)
import cards from '../data/cardsData'

// 3) Компонент = функция
function A_CardText({ variant = 0 }) {
  // 4) Берём данные из внешнего массива
  const item = cards[variant] || cards[0]
  // number может храниться в данных, иначе вычислим
  const number = item.number || String(variant + 1).padStart(2, '0')

  return (
    <div className="A_CardText">
      <h3 className="card-heading">
        <span className="card-heading-number">{number}</span>
        {item.title}
      </h3>
      <p className="card-body">{item.text}</p>
    </div>
  )
}

// 6) Экспорт
export default A_CardText