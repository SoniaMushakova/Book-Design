document.querySelectorAll('.W_Sidebar_Item').forEach(function (dropdown) {
  dropdown.addEventListener('click', function (e) {
    var dropDownElement = dropdown.closest('.W_Sidebar_Dropdown');
    var arrow = dropdown.querySelector('.I_Sidebar_Chevron');
    if (dropDownElement) {
      dropDownElement.classList.toggle('open');
      if (arrow) arrow.classList.toggle('open');
    }
  });
});