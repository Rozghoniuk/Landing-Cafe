function toggleTabs(tabTag, navTag, activeClass) {
let tab = document.querySelectorAll(tabTag);
let arrP = document.querySelectorAll(navTag);

removeTab();
tab[0].style.display = "block";
function removeTab() {
  tab.forEach((div) => {div.style.display = "none" })
}

arrP.forEach((p, i) => {
  p.addEventListener("click", () => {
    removeActiveClass();
    p.classList.add(activeClass);
    removeTab();
    tab[i].style.display = "block";
  })
})


function removeActiveClass() { 
  arrP.forEach((p) => { p.classList.remove(activeClass)})
}
}
toggleTabs('.tabcontent', '.tabheader__item', 'tabheader__item_active');

console.log('hello');



