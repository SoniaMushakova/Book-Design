import React from 'react'
import { createRoot } from 'react-dom/client'

import Chips from './javascript/A_Chips.jsx'
import AChips from './javascript/A_Chips.jsx'
import M_Card from './javascript/M_Card.jsx'

const labels = [
  'Препресс', 'Композиция', 'Шрифтовая пара', 'Анатомия книги', 'Макет',
  'Формат', 'Поля', 'Классификация шрифтов', 'План работы над книгой', 'Печать',
  'Картинки', 'Заголовки', 'Структура книги'
]

document.addEventListener('DOMContentLoaded', () => {
  const container2 = document.getElementById('chips2-root')
  if (container2) {
    const root2 = createRoot(container2)
    root2.render(
      <div className="ChipsList">
        {labels.map((t, i) => (
          <AChips key={i} text={t} href={`pages/Main.html#chip-${i}`} />
        ))}
      </div>
    )
  }

  const container3 = document.getElementById('cards-theory-root')
  if (container3) {
    const root3 = createRoot(container3)
    // render cards 1..6 (variants 0..5) inside a grid container
    root3.render(
      <div className="C_Card">
        {[0,1,2,3,4,5,6,7].map(i => (
          <M_Card key={i} variant={i} />
        ))}
      </div>
    )
  }

  const container4 = document.getElementById('cards-practice-root')
  if (container4) {
    const root4 = createRoot(container4)
    root4.render(
      <div className="C_Card">
        {[8,9,10,11,12,13].map(i => (
          <M_Card key={i} variant={i} />
        ))}
      </div>
    )
  }

})
