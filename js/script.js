// -------------TABS----------------

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

// ------------MODAL-----------------

let modal = document.querySelector('.modal');
let btnsOpenModal = document.querySelectorAll('[data-modal]');
let btnCloseModal = document.querySelector('[data-close]');
let body = document.body;
let timerForModal;

function openModal() {
  modal.style.display = "block";
  body.style.cssText = 'overflow:hidden; padding-right:18px';
  clearTimeout(timerForModal);
}

function closeModal() {
  modal.style.display = "none";
  body.style.cssText = 'overflow:visible; padding-right:0';
}

function openModalByScroll() {
  if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModal();
    window.removeEventListener('scroll', openModalByScroll);
  }
}

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => { 
  if (event.target === modal) closeModal();
})

document.addEventListener('keydown', (event) => { 
  if(event.code==='Escape') closeModal();
})

timerForModal = setTimeout(openModal, 5000);

window.addEventListener('scroll', openModalByScroll)

// ----------------Slider-------------------------

let btnLeft = document.querySelector(".offer__slider-prev")
let btnRight = document.querySelector(".offer__slider-next")
let slides = document.querySelectorAll(".offer__slide")
let current = document.querySelector("#current")
let total = document.querySelector("#total")
let count = 0;
// let track = document.querySelector(".offer__slider-track")

// track.style.cssText = `display:flex;`

current.innerHTML = count+1;

function disableSlides() {
  slides.forEach(el => {
    el.style.display = "none"
  })
}
disableSlides();

slides[count].style.display = "block";

btnRight.addEventListener('click', () => {
  if (count == slides.length-1) {
    count = 0;
  } else {
    count++;
  }
  disableSlides();
  slides[count].style.display = "block";
  current.innerHTML = count+1;
})

btnLeft.addEventListener('click', () => {
  if (count == 0) {
    count = slides.length - 1
  } else {
    count--;
  }
  disableSlides();
  slides[count].style.display = "block";
  current.innerHTML = count+1;
})

