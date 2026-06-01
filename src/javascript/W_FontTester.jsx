import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

const TABS = ['Заголовок', 'Текст']

const HEADING_DEFAULTS = { lineHeight: 1, fontSize: 28, marginBottom: 12 }
const TEXT_DEFAULTS = { lineHeight: 1, fontSize: 20 }

const SLIDERS = {
  Заголовок: [
    { key: 'lineHeight', label: 'Интерлиньяж', min: 0.8, max: 1.8, step: 0.01 },
    { key: 'fontSize', label: 'Кегль', min: 28, max: 44, step: 1 },
    {
      key: 'marginBottom',
      label: 'Отступ после заголовка',
      min: 0,
      max: 50,
      step: 1
    }
  ],
  Текст: [
    { key: 'lineHeight', label: 'Интерлиньяж', min: 0.8, max: 1.8, step: 0.01 },
    { key: 'fontSize', label: 'Кегль', min: 18, max: 30, step: 1 }
  ]
}

const MOBILE_SLIDERS = {
  Заголовок: [
    { key: 'lineHeight', label: 'Интерлиньяж', min: 0.8, max: 1.8, step: 0.01 },
    { key: 'fontSize', label: 'Кегль', min: 18, max: 28, step: 1 },
    {
      key: 'marginBottom',
      label: 'Отступ после заголовка',
      min: 0,
      max: 50,
      step: 1
    }
  ],
  Текст: [
    { key: 'lineHeight', label: 'Интерлиньяж', min: 0.8, max: 1.8, step: 0.01 },
    { key: 'fontSize', label: 'Кегль', min: 14, max: 22, step: 1 }
  ]
}

function getError(tab, { fontSize, lineHeight, marginBottom }, isMobile) {
  const lh = Math.round(lineHeight * 100)

  if (tab === 'Заголовок') {
    if (marginBottom < 10 * lineHeight + 2) return 'Отступ меньше интерлиньяжа'

    const lhOk = isMobile
      ? (fontSize >= 14 && fontSize <= 18 && lh >= 110 && lh <= 130) ||
        (fontSize >= 19 && fontSize <= 28 && lh >= 110 && lh <= 120)
      : (fontSize >= 28 && fontSize <= 30 && lh >= 110 && lh <= 120) ||
        (fontSize >= 31 && fontSize <= 44 && lh >= 112 && lh <= 116)
    if (lhOk) return null
    return 'Ошибка в интерлиньяже'
  }

  if (tab === 'Текст') {
    const sizeOk = isMobile
      ? fontSize >= 14 && fontSize <= 22
      : fontSize >= 18 && fontSize <= 28
    const lhOk = isMobile
      ? (fontSize >= 14 && fontSize <= 18 && lh >= 130 && lh <= 144) ||
        (fontSize >= 19 && fontSize <= 22 && lh >= 130 && lh <= 142)
      : (fontSize >= 18 && fontSize <= 24 && lh >= 134 && lh <= 144) ||
        (fontSize >= 25 && fontSize <= 28 && lh >= 140 && lh <= 150)
    if (lhOk) return null
    if (!sizeOk && !lhOk) return 'Ошибка в кегле и интерлиньяже'
    if (!sizeOk) return 'Ошибка в кегле'
    return 'Ошибка в интерлиньяже'
  }

  return null
}

function M_FontTesterSlider({ label, value, min, max, step, onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="M_FontTesterSlider">
      <span className="A_FontTesterSliderLabel">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="A_FontTesterRange"
        style={{ '--pct': `${pct}%` }}
      />
    </div>
  )
}

function W_FontTester() {
  const [tab, setTab] = useState('Заголовок')
  const [heading, setHeading] = useState(HEADING_DEFAULTS)
  const [text, setText] = useState(TEXT_DEFAULTS)

  const updateHeading = (key, val) => {
    setTouched(true)
    setHeading((prev) => ({ ...prev, [key]: val }))
  }
  const updateText = (key, val) => {
    setTouched(true)
    setText((prev) => ({ ...prev, [key]: val }))
  }

  const current = tab === 'Заголовок' ? heading : text
  const updateCurrent = tab === 'Заголовок' ? updateHeading : updateText

  const headingStyle = {
    fontSize: heading.fontSize + 'px',
    lineHeight: heading.lineHeight,
    marginBottom: heading.marginBottom + 'px'
  }
  const textStyle = {
    fontSize: text.fontSize + 'px',
    lineHeight: text.lineHeight
  }

  const [touched, setTouched] = useState(false)
  const [sheetVisible, setSheetVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 743)
  const wrapperRef = useRef(null)
  const sliders = isMobile ? MOBILE_SLIDERS : SLIDERS

  useEffect(() => {
    const handleScroll = () => {
      const mobile = window.innerWidth <= 743
      setIsMobile(mobile)
      if (!wrapperRef.current || !mobile) {
        setSheetVisible(false)
        return
      }
      const rect = wrapperRef.current.getBoundingClientRect()
      setSheetVisible(rect.top < window.innerHeight - 60 && rect.bottom > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const headingError = touched ? getError('Заголовок', heading, isMobile) : null
  const textError = touched ? getError('Текст', text, isMobile) : null

  let error = null
  if (touched) {
    if (tab === 'Заголовок') {
      error = headingError || (textError ? 'Настройте блок «Текст»' : null)
    } else {
      error = textError || (headingError ? 'Настройте блок «Заголовок»' : null)
    }
  }

  const success = touched && !headingError && !textError
  return (
    <div
      ref={wrapperRef}
      className={
        'W_FontTester' +
        (error
          ? ' W_FontTester--error'
          : success
            ? ' W_FontTester--success'
            : '')
      }
    >
      <div className="M_FontTesterContent">
        <span className="A_FontTesterTaskLabel">Задача</span>
        <p className="A_FontTesterTaskTitle">
          Подберите подходящее оформление для блока текста и заголовка
        </p>
        <div className="M_FontTesterCard">
          <p className="A_FontTesterCardHeading" style={headingStyle}>
            Догнали и перегнали Америку в дизайне книжек
          </p>
          <p className="A_FontTesterCardBody" style={textStyle}>
            Было ли дело в том, что Америка перестала производить книги совсем?
            Наши источники гласят, что нет. Дело в исключительном интересе
            дизайнеров к книжному искусству в странах СНГ. Все более интересные
            исследования выпускают студенты и начинающие дизайнеры.
          </p>
        </div>
        {error && <p className="A_FontTesterError">{error}</p>}
        {success && (
          <p className="A_FontTesterError" style={{ color: 'var(--green)' }}>
            Ответ верный
          </p>
        )}
      </div>

      {isMobile ? (
        createPortal(
          <div
            className={
              'M_FontTesterControls M_FontTesterControls--sheet-active' +
              (sheetVisible ? '' : ' M_FontTesterControls--sheet-hidden')
            }
          >
            <div className="M_FontTesterTabs">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={
                    'A_FontTesterTab' +
                    (tab === t ? ' A_FontTesterTab--active' : '')
                  }
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="M_FontTesterSliders">
              {sliders[tab].map((s) => (
                <M_FontTesterSlider
                  key={s.key}
                  label={s.label}
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={current[s.key]}
                  onChange={(val) => updateCurrent(s.key, val)}
                />
              ))}
            </div>
          </div>,
          document.body
        )
      ) : (
        <div className="M_FontTesterControls">
          <div className="M_FontTesterTabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={
                  'A_FontTesterTab' +
                  (tab === t ? ' A_FontTesterTab--active' : '')
                }
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="M_FontTesterSliders">
            {sliders[tab].map((s) => (
              <M_FontTesterSlider
                key={s.key}
                label={s.label}
                min={s.min}
                max={s.max}
                step={s.step}
                value={current[s.key]}
                onChange={(val) => updateCurrent(s.key, val)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('font-tester-root')
  if (container) {
    createRoot(container).render(<W_FontTester />)
  }
})

export default W_FontTester
