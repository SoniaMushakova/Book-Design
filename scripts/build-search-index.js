// Парсит src/pages/Article_*.html и собирает индекс для поиска по учебнику.
// Результат пишет в src/data/searchIndex.js (экспорт по умолчанию).

const fs = require('fs')
const path = require('path')

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages')
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'searchIndex.js')

// Главы привязаны к разделам по тому, какой sidebar использует страница.
function detectChapter(html) {
  if (/sidebar-practice/.test(html)) return 'Практика'
  if (/sidebar-theory/.test(html)) return 'Теория'
  return null
}

// Тащим маппинг "Article_N.html" -> обложка карточки из Theory.html и Practice.html.
function loadCoverMap() {
  const map = {}
  for (const file of ['Theory.html', 'Practice.html']) {
    const full = path.join(PAGES_DIR, file)
    if (!fs.existsSync(full)) continue
    const html = fs.readFileSync(full, 'utf8')
    const cardRe =
      /<a[^>]+class="[^"]*M_Card[^"]*"[^>]+href="([^"]+)"[\s\S]*?<img[^>]+src="([^"]+)"/gi
    let m
    while ((m = cardRe.exec(html))) {
      const href = m[1]
      const src = m[2]
      const base = path.basename(href)
      const img = src.replace(/^\.\.\//, '/').replace(/^(?!\/)/, '/')
      map[base] = img
    }
  }
  return map
}

function stripTags(s) {
  return s
    .replace(/<sup[^>]*>.*?<\/sup>/gis, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

// Достаём заголовок статьи (h2.A_Header_2) и набор секций (h3.A_Header_3 c id),
// а к каждой секции — её абзацы (p.body) до следующего h3.
function parseArticle(html) {
  const titleMatch = html.match(
    /<h2[^>]*class="[^"]*A_Header_2[^"]*"[^>]*>([\s\S]*?)<\/h2>/i
  )
  const title = titleMatch ? stripTags(titleMatch[1]) : null

  // Берём только содержимое <main class="article-content">, чтобы не цеплять футер/сайдбар.
  const mainMatch = html.match(
    /<main[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/main>/i
  )
  const body = mainMatch ? mainMatch[1] : html

  // Сначала вытащим h3 c id, разобьём контент по ним.
  const headingRe =
    /<h3[^>]*class="[^"]*A_Header_3[^"]*"[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h3>/gi
  const sections = []
  const headings = []
  let m
  while ((m = headingRe.exec(body))) {
    headings.push({
      id: m[1],
      title: stripTags(m[2]),
      start: m.index,
      end: m.index + m[0].length
    })
  }

  // Псевдо-секция «начало статьи» — для абзацев до первого h3.
  const blocks = []
  if (headings.length === 0) {
    blocks.push({ id: null, title: null, html: body })
  } else {
    if (headings[0].start > 0) {
      blocks.push({
        id: null,
        title: null,
        html: body.slice(0, headings[0].start)
      })
    }
    for (let i = 0; i < headings.length; i++) {
      const h = headings[i]
      const next = headings[i + 1]
      const sliceEnd = next ? next.start : body.length
      blocks.push({
        id: h.id,
        title: h.title,
        html: body.slice(h.end, sliceEnd)
      })
    }
  }

  for (const block of blocks) {
    const paragraphRe =
      /<p[^>]*class="[^"]*\bbody\b[^"]*"[^>]*>([\s\S]*?)<\/p>/gi
    let pm
    while ((pm = paragraphRe.exec(block.html))) {
      const text = stripTags(pm[1])
      if (text.length < 20) continue
      sections.push({
        sectionId: block.id,
        sectionTitle: block.title,
        text
      })
    }
  }

  return { title, sections }
}

function build() {
  const files = fs
    .readdirSync(PAGES_DIR)
    .filter((f) => /^Article_\d+\.html$/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)[0], 10)
      const nb = parseInt(b.match(/\d+/)[0], 10)
      return na - nb
    })

  const coverMap = loadCoverMap()
  const index = []
  for (const file of files) {
    const full = path.join(PAGES_DIR, file)
    const html = fs.readFileSync(full, 'utf8')
    const chapter = detectChapter(html)
    if (!chapter) continue

    const { title, sections } = parseArticle(html)
    if (!title) continue

    const href = `/pages/${file}`
    const image = coverMap[file] || null
    // Один индекс-элемент = один абзац. Поиск по text/title/sectionTitle.
    for (const s of sections) {
      index.push({
        chapter,
        article: title,
        section: s.sectionTitle,
        text: s.text,
        image,
        href: s.sectionId ? `${href}#${s.sectionId}` : href
      })
    }
  }

  const out =
    '// Сгенерирован автоматически: scripts/build-search-index.js. Не редактируй вручную.\n' +
    'const searchIndex = ' +
    JSON.stringify(index, null, 2) +
    '\n\nexport default searchIndex\n'

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, out, 'utf8')
  console.log(
    `searchIndex: ${index.length} абзацев из ${files.length} статей → ${path.relative(process.cwd(), OUT_FILE)}`
  )
}

build()
