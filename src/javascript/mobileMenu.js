const burgerBtn = document.getElementById('burgerBtn')
const mobileMenu = document.getElementById('mobileMenu')
// console.log('yes')
// console.log(burgerBtn)
// console.log(mobileMenu)
if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('O_mobileMenuOpen')
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  document.addEventListener('click', function (e) {
    if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('O_mobileMenuOpen')
      document.body.style.overflow = ''
    }
  })
}
