/******/ (() => { // webpackBootstrap
// Run when DOM is ready. Use document.readyState to support scripts placed at bottom.
function initSidebar() {
  try {
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
  } catch (err) {
    // defensive logging
    console.error('sidebar init error', err);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}
/******/ })()
;