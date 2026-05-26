import searchIndex from '../data/searchIndex.js'

const mobileMenu = document.getElementById('mobileMenu')
const burgerBtn = document.getElementById('burgerBtn')
const searchButtons = Array.from(
  document.querySelectorAll(
    '[data-search-toggle], #searchBtn, #searchBtnDesktop'
  )
)
const searchInput = document.getElementById('mobileSearchInput')
const searchResults = document.getElementById('mobileSearchResults')

if (mobileMenu && searchButtons.length && searchInput && searchResults) {
  // ── Состояние оверлея ────────────────────────────────────────────────
  // 'closed' | 'menu' | 'search'
  function setState(next) {
    mobileMenu.dataset.state = next
    // дублируем на body — селекторам CSS из других веток DOM так проще
    document.body.dataset.overlayState = next
    document.body.style.overflow = next === 'closed' ? '' : 'hidden'
    if (next === 'search') {
      requestAnimationFrame(() => searchInput.focus())
      renderResults(searchInput.value)
    }
  }

  function currentState() {
    return mobileMenu.dataset.state || 'closed'
  }

  // ── Иконки в шапке ───────────────────────────────────────────────────
  // burgerBtn: в menu → закрыть всё, иначе → открыть меню
  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const s = currentState()
      if (s === 'menu') setState('closed')
      else setState('menu')
    })
  }

  // Любая кнопка поиска: в search → закрыть всё, иначе → перейти в поиск
  searchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = currentState()
      if (s === 'search') setState('closed')
      else setState('search')
    })
  })

  // Клик вне оверлея — закрыть
  document.addEventListener('click', (e) => {
    if (currentState() === 'closed') return
    if (mobileMenu.contains(e.target)) return
    if (burgerBtn && burgerBtn.contains(e.target)) return
    if (searchButtons.some((b) => b.contains(e.target))) return
    setState('closed')
  })

  // Esc закрывает
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentState() !== 'closed') setState('closed')
  })

  // ── Поиск ────────────────────────────────────────────────────────────
  const RESULT_LIMIT = 50

  function normalize(s) {
    return (s || '').toLowerCase().replace(/ё/g, 'е').trim()
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  // Подсветка совпадений + обрезка вокруг первого совпадения.
  function buildSnippet(text, q) {
    const nText = normalize(text)
    const nQ = normalize(q)
    const idx = nText.indexOf(nQ)
    const radius = 70
    let start = 0
    let end = text.length
    if (idx >= 0) {
      start = Math.max(0, idx - radius)
      end = Math.min(text.length, idx + nQ.length + radius)
    }
    let snippet = text.slice(start, end)
    if (start > 0) snippet = '…' + snippet
    if (end < text.length) snippet = snippet + '…'

    const safe = escapeHtml(snippet)
    if (!q) return safe
    const re = new RegExp(escapeRegExp(escapeHtml(q)), 'gi')
    return safe.replace(re, (m) => `<mark class="search-mark">${m}</mark>`)
  }
  function search(q) {
    const nQ = normalize(q)
    if (!nQ) return []
    // Один результат на статью — выбираем лучшее совпадение.
    // Скоринг: совпадение в тексте > в заголовке статьи/секции.
    const byArticle = new Map()
    for (const item of searchIndex) {
      const textMatch = normalize(item.text).includes(nQ)
      const titleMatch = normalize(item.article).includes(nQ)
      const sectionMatch = normalize(item.section || '').includes(nQ)
      if (!textMatch && !titleMatch && !sectionMatch) continue
      const score =
        (textMatch ? 2 : 0) + (titleMatch ? 1 : 0) + (sectionMatch ? 1 : 0)
      const prev = byArticle.get(item.article)
      if (!prev || score > prev.score) {
        byArticle.set(item.article, { item, score })
      }
    }
    return Array.from(byArticle.values())
      .slice(0, RESULT_LIMIT)
      .map((x) => x.item)
  }

  function renderResults(q) {
    const query = (q || '').trim()
    if (!query) {
      searchResults.innerHTML = ''
      return
    }
    const results = search(query)
    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="O_mobileSearch__empty">' +
        '<p class="search-empty-title">Упс! Ничего не найдено</p>' +
        '<p class="search-empty-hint">Попробуйте другими словами</p>' +
        '</div>'
      return
    }

    const cards = results
      .map((r) => {
        const title = escapeHtml(r.article)
        const chapter = escapeHtml(r.chapter)
        const snippet = buildSnippet(r.text, query)
        const cover = r.image
          ? '<img class="search-result-cover" src="' +
            r.image +
            '" alt="" loading="lazy" />'
          : ''
        const href = (r.href || '').split('#')[0]
        return (
          '<a class="M_SearchResult" href="' +
          href +
          '">' +
          cover +
          '<div class="search-result-body">' +
          '<p class="search-result-chapter">' +
          chapter +
          '</p>' +
          '<p class="search-result-title">' +
          title +
          '</p>' +
          '<p class="search-result-snippet">' +
          snippet +
          '</p>' +
          '</div>' +
          '</a>'
        )
      })
      .join('')

    searchResults.innerHTML =
      '<p class="search-results-count">Найдено совпадений: ' +
      results.length +
      '</p>' +
      '<div class="O_mobileSearch__list">' +
      cards +
      '</div>'
  }

  let inputTimer = null
  searchInput.addEventListener('input', (e) => {
    clearTimeout(inputTimer)
    const v = e.target.value
    inputTimer = setTimeout(() => renderResults(v), 80)
  })

  // Старт в закрытом состоянии
  setState('closed')
}
