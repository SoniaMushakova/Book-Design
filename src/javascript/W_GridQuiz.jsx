import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { QUIZ_TASK, QUIZ_QUESTIONS } from '../data/quizData.js'

function W_GridQuiz() {
  const total = QUIZ_QUESTIONS.length
  const [current, setCurrent] = useState(0)
  // answers[i]: undefined | 'correct' | 'error'  (что выбрал пользователь)
  const [answers, setAnswers] = useState(() => Array(total).fill(undefined))

  const q = QUIZ_QUESTIONS[current]
  const userAnswer = answers[current]
  const answered = userAnswer !== undefined
  const isCorrect = answered && userAnswer === q.correctAnswer

  const answer = (choice) => {
    if (answered) return
    setAnswers((prev) => {
      const next = prev.slice()
      next[current] = choice
      return next
    })
  }

  const reset = () => {
    setAnswers(Array(total).fill(undefined))
    setCurrent(0)
  }

  const goPrev = () => setCurrent((i) => Math.max(0, i - 1))
  const goNext = () => setCurrent((i) => Math.min(total - 1, i + 1))

  const stateClass = answered
    ? isCorrect
      ? ' W_GridQuiz--success'
      : ' W_GridQuiz--error'
    : ''

  const feedback = answered
    ? isCorrect
      ? q.correctMessage
      : q.wrongMessage
    : null

  return (
    <div className={'W_GridQuiz' + stateClass}>
      <div className="M_GridQuizHeader">
        <span className="A_GridQuizLabel">Задача</span>
        <p className="A_GridQuizTitle">{QUIZ_TASK}</p>
        <button type="button" className="A_GridQuizReset" onClick={reset}>
          <span className="A_GridQuizResetIcon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9a6 6 0 1 0 1.76-4.24"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M2.4 2.6v3.2h3.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Пройти тест заново</span>
        </button>
      </div>

      <div className="M_GridQuizImage">
        <img
          src={q.image}
          alt={`Вопрос ${current + 1}`}
          className="A_GridQuizImage"
        />
      </div>

      <div className="M_GridQuizControls">
        <div className="M_GridQuizPager">
          <button
            type="button"
            className="A_GridQuizArrow"
            onClick={goPrev}
            disabled={current === 0}
            aria-label="Предыдущий вопрос"
          >
            ←
          </button>
          <div className="M_GridQuizDots">
            {QUIZ_QUESTIONS.map((quiz, i) => {
              const a = answers[i]
              let dotMod = ''
              if (a !== undefined) {
                dotMod =
                  a === quiz.correctAnswer
                    ? ' A_GridQuizDot--correct'
                    : ' A_GridQuizDot--wrong'
              } else if (i === current) {
                dotMod = ' A_GridQuizDot--active'
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={'A_GridQuizDot' + dotMod}
                  onClick={() => setCurrent(i)}
                  aria-label={`Вопрос ${i + 1}`}
                />
              )
            })}
          </div>
          <button
            type="button"
            className="A_GridQuizArrow"
            onClick={goNext}
            disabled={current === total - 1}
            aria-label="Следующий вопрос"
          >
            →
          </button>
        </div>
        <div className="M_GridQuizAnswers">
          <button
            type="button"
            className={
              'A_GridQuizBtn A_GridQuizBtn--error' +
              (answered && userAnswer === 'error'
                ? ' A_GridQuizBtn--selected'
                : '')
            }
            onClick={() => answer('error')}
            disabled={answered}
          >
            Тут ошибка
          </button>
          <button
            type="button"
            className={
              'A_GridQuizBtn A_GridQuizBtn--correct' +
              (answered && userAnswer === 'correct'
                ? ' A_GridQuizBtn--selected'
                : '')
            }
            onClick={() => answer('correct')}
            disabled={answered}
          >
            Все верно
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={
            'A_GridQuizFeedback' +
            (isCorrect
              ? ' A_GridQuizFeedback--success'
              : ' A_GridQuizFeedback--error')
          }
        >
          {feedback}
        </div>
      )}
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('grid-quiz-root')
  if (container) {
    createRoot(container).render(<W_GridQuiz />)
  }
})

export default W_GridQuiz
