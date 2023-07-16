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

let wrapper = document.querySelector(".offer__slider-wrapper")
let btnLeft = document.querySelector(".offer__slider-prev")
let btnRight = document.querySelector(".offer__slider-next")
let slides = document.querySelectorAll(".offer__slide")
let current = document.querySelector("#current")
let total = document.querySelector("#total")
let count = 1;
let track = document.querySelector(".offer__slider-track")
let width = window.getComputedStyle(wrapper).width
let widthSlide = +width.slice(0, width.length - 2)
let offSet = 0;

track.style.cssText = `display:flex; width:${100 * slides.length}%; transition:all 0.5s;`;
wrapper.style.overflow = "hidden";
current.innerText = changeNum(count);
total.innerText = changeNum(slides.length);


function pressRight() {
  if (offSet >= widthSlide*(slides.length-1)) {
    offSet = 0;
    count = 1;
  } else {
    offSet += widthSlide
    count++;
  }
  current.innerText = changeNum(count);
  track.style.transform = `translateX(-${offSet}px)`

}

function pressLeft() {
  if (offSet <= 0) {
    offSet = widthSlide * (slides.length - 1);
    count=slides.length
  } else {
    offSet -= widthSlide;
    count--;
  }
  current.innerText = changeNum(count);
  track.style.transform = `translateX(-${offSet}px)`
}

function changeNum(num) {
  if (num < 10) {
    return `0${num}`
  } else { 
    return num
  }
}

btnRight.addEventListener("click", pressRight)
btnLeft.addEventListener("click", pressLeft)






// current.innerHTML = count+1;

// function disableSlides() {
//   slides.forEach(el => {
//     el.style.display = "none"
//   })
// }
// disableSlides();

// slides[count].style.display = "block";

// btnRight.addEventListener('click', () => {
//   if (count == slides.length-1) {
//     count = 0;
//   } else {
//     count++;
//   }
//   disableSlides();
//   slides[count].style.display = "block";
//   current.innerHTML = count+1;
// })

// btnLeft.addEventListener('click', () => {
//   if (count == 0) {
//     count = slides.length - 1
//   } else {
//     count--;
//   }
//   disableSlides();
//   slides[count].style.display = "block";
//   current.innerHTML = count+1;
// })

// ----------------calculating--------------------

let genders = document.querySelectorAll('#gender .calculating__choose-item');
let height = document.querySelector('#height');
let weight = document.querySelector('#weight');
let age = document.querySelector('#age');
let activities = document.querySelectorAll(".calculating__choose_big .calculating__choose-item");
let calculatingResult = document.querySelector(".calculating__result span");
let genderActive = 'woman';
let result;
let activitiesActive = 1.375;

function calculate() {
  if (height.value && weight.value && age.value) {
    switch (genderActive) {
      case "woman":
        result = 447.6 + (9.2 * weight.value) + (3.1 * height.value) - (4.3 * age.value);
        break;
      case "man":
        result = 88.36 + (13.4 * weight.value) + (4.8 * height.value) - (5.7 * age.value);
        break;
    }
    if (!isNaN(result)) {
      calculatingResult.innerText = Math.floor(result * activitiesActive);
    } else {
      calculatingResult.innerText = "___";
    }
    
  } else {
    calculatingResult.innerText = "___";
   }

  }

function addActiveClass(selector) {
    selector.classList.add("calculating__choose-item_active");
}
  
function removeActiveClass(selectors) {
  selectors.forEach((el) => {el.classList.remove("calculating__choose-item_active")})
}

function validate(input) {
  if (input.value.match(/\D/g)) {
    input.style.border = "1px solid red";
  } else { 
    input.style.border = "none";
  }
  calculate();
}

genders.forEach((el) => { 
  el.addEventListener("click", (event) => {
    removeActiveClass(genders);
    addActiveClass(el);
    switch (event.target.id) {
      case "woman":
        genderActive = 'woman'
        break;
      
      case "man":
        genderActive = 'man'
        break;
    
    }
    calculate();
   })
})

activities.forEach((el) => { 
  el.addEventListener('click', (event) => { 
    removeActiveClass(activities);
    addActiveClass(el);
    switch (event.target.id) {
      case "low":
        activitiesActive = 1.2
        break;
      case "small":
        activitiesActive = 1.375
        break;
      case "medium":
        activitiesActive = 1.55
        break;
      case "high":
        activitiesActive = 1.725
        break;
      
    }
    calculate();
  })
})
height.addEventListener('input', () => { 
validate(height)
});
weight.addEventListener('input', () => { 
validate(weight)
});
age.addEventListener('input', () => { 
validate(age)
});


// -------------Timer--------------------

let days = document.querySelector("#days")
let hours = document.querySelector("#hours")
let minutes = document.querySelector("#minutes")
let seconds = document.querySelector("#seconds")
let currentDate;
let deadLine=new Date("2023/09/16");
let difference;
let day, hour, minute, second;
let timer;

if (deadLine > new Date()) {

  function calcDifDates() {
    currentDate = new Date();
    difference = deadLine - currentDate;
    day = difference / 1000 / 60 / 60 / 24;
    hour = (difference / 1000 / 60 / 60) % 24;
    minute = (difference / 1000 / 60) % 60;
    second = (difference / 1000) % 60;
    return {
      day: Math.floor(day),
      hour: Math.floor(hour),
      minute: Math.floor(minute),
      second: Math.floor(second),
    }
  }

  function renderTimer() {
    let object = calcDifDates();
    if (object.second < 0) {
      clearInterval(timer)
    } else {
      days.innerText = changeNum(object.day);
      hours.innerText = changeNum(object.hour);
      minutes.innerText = changeNum(object.minute);
      seconds.innerText = changeNum(object.second);
    }
  }
  timer = setInterval(renderTimer, 1000)
} else { 
  days.innerText = "00";
    hours.innerText = "00";
    minutes.innerText = "00";
    seconds.innerText = "00";
}