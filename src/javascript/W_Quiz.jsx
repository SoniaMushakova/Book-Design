import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { QUIZ_SETS } from '../data/quizData.js'

// Сравнение двух наборов индексов без учёта порядка
function sameSet(a, b) {
  if (a.length !== b.length) return false
  const setB = new Set(b)
  return a.every((x) => setB.has(x))
}

function QuizQuestion({ data, index }) {
  const { question, options, correct, correctMessage, wrongMessage } = data
  const [selected, setSelected] = useState([]) // массив индексов
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = submitted && sameSet(selected, correct)

  const toggle = (i) => {
    if (submitted) return
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    )
  }

  const submit = () => {
    if (submitted || selected.length === 0) return
    setSubmitted(true)
  }

  return (
    <div
      className={
        'W_Quiz' +
        (submitted ? (isCorrect ? ' W_Quiz--success' : ' W_Quiz--error') : '')
      }
    >
      <span className="A_QuizLabel">Вопрос</span>
      <p className="A_QuizTitle">{question}</p>

      <ul className="M_QuizOptions">
        {options.map((opt, i) => {
          const checked = selected.includes(i)
          let mod = ''
          if (submitted) {
            if (correct.includes(i)) mod = ' A_QuizOption--correct'
            else if (checked) mod = ' A_QuizOption--wrong'
          }
          return (
            <li key={i} className={'A_QuizOption' + mod}>
              <label className="A_QuizOptionLabel">
                <input
                  type="checkbox"
                  className="A_QuizCheckbox"
                  checked={checked}
                  disabled={submitted}
                  onChange={() => toggle(i)}
                />
                <span className="A_QuizBox" aria-hidden="true">
                  <svg
                    className="A_QuizCheck"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="A_QuizOptionText">{opt}</span>
              </label>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="A_QuizSubmit"
        onClick={submit}
        disabled={submitted || selected.length === 0}
      >
        Ответить
      </button>

      {submitted && (
        <div
          className={
            'A_QuizFeedback' +
            (isCorrect ? ' A_QuizFeedback--success' : ' A_QuizFeedback--error')
          }
        >
          {isCorrect ? correctMessage : wrongMessage}
        </div>
      )}
    </div>
  )
}

function W_Quiz({ questions }) {
  return (
    <div className="W_QuizList">
      {questions.map((q, i) => (
        <QuizQuestion key={i} data={q} index={i} />
      ))}
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('quiz-root')
  if (!container) return
  const setName = container.dataset.quizSet
  const questions = QUIZ_SETS[setName]
  if (!questions) {
    console.warn(`W_Quiz: набор "${setName}" не найден в QUIZ_SETS`)
    return
  }
  createRoot(container).render(<W_Quiz questions={questions} />)
})

export default W_Quiz
