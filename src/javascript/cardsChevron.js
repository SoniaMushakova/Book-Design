document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.W_Cards')
  if (!sections || sections.length === 0) return

  sections.forEach((section) => {
    const grid = section.querySelector('.C_Card')
    const btn = section.querySelector('.M_CardsChevron')
    if (!grid || !btn) return

    btn.addEventListener('click', () => {
      grid.classList.remove('is-collapsed')
      section.classList.add('is-expanded')
      btn.setAttribute('aria-expanded', 'true')
      // ensure the chevron button is removed from view
      btn.style.display = 'none'
      btn.setAttribute('aria-hidden', 'true')
    })
  })
})
