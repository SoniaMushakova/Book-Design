document.querySelectorAll('.W_Sidebar_Item').forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    const dropDownElement = dropdown.closest('.W_Sidebar_Dropdown')
    const arrow = dropdown.querySelector('.I_Sidebar_Chevron')
    if (dropDownElement) {
      dropDownElement.classList.toggle('open')
      if (arrow) arrow.classList.toggle('open')
    }
  })
})
