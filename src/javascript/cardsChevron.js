document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".W_Cards");
  if (!section) return;

  const grid = section.querySelector("#cardsGrid");
  const btn  = section.querySelector("#cardsChevron");
  if (!grid || !btn) return;

  btn.addEventListener("click", () => {
    grid.classList.remove("is-collapsed");
    section.classList.add("is-expanded");
    btn.setAttribute("aria-expanded", "true");
  });
});