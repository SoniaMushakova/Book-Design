/******/ (() => { // webpackBootstrap
document.addEventListener("DOMContentLoaded", function () {
  var section = document.querySelector(".W_Cards");
  if (!section) return;
  var grid = section.querySelector("#cardsGrid");
  var btn = section.querySelector("#cardsChevron");
  if (!grid || !btn) return;
  btn.addEventListener("click", function () {
    grid.classList.remove("is-collapsed");
    section.classList.add("is-expanded");
    btn.setAttribute("aria-expanded", "true");
  });
});
/******/ })()
;