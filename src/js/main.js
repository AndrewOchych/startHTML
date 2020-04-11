function headerMenuActive() {
  this.classList.toggle("active");
}
document
  .querySelector("#header-menu__icon")
  .addEventListener("click", headerMenuActive);
