/******/ (() => { // webpackBootstrap
document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.W_Cards');
  if (!sections || sections.length === 0) return;
  sections.forEach(function (section) {
    var grid = section.querySelector('.C_Card');
    var btn = section.querySelector('.M_CardsChevron');
    if (!grid || !btn) return;
    btn.addEventListener('click', function () {
      grid.classList.remove('is-collapsed');
      section.classList.add('is-expanded');
      btn.setAttribute('aria-expanded', 'true');
      // ensure the chevron button is removed from view
      btn.style.display = 'none';
      btn.setAttribute('aria-hidden', 'true');
    });
  });
});
/******/ })()
;