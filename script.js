'use strict';
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('show');
    }
  });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let blocks = document.querySelectorAll('.block');
for (let block of blocks) {
  observer.observe(block);
}

let mobile_menu = document.querySelector('.nav_mobile');
let close_menu = document.querySelector('.burger-close');
let hamburger=document.querySelector('.menu');

hamburger.addEventListener('click', function(){
  mobile_menu.classList.remove('hidden');
});
close_menu.addEventListener('click', function(){
  mobile_menu.classList.add('hidden');
});

let regName = /[a-b]|[а-я]/;
let regNumber = /^(?=.{1,60}$)\S+@(?:[\w-]+\.)+[\w-]{2,5}$/;
let regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
let form = document.querySelector('.form');
let inputs=document.querySelectorAll('.block5_input input');

function clearWarning(input, flag){
  let inputContainer = input.parentElement;
  inputContainer.classList.remove('invalid');
  flag == "valid"
    ? (inputContainer.children[1].src = "./assets/icons/check.svg")
    : (inputContainer.children[1].src = "./assets/icons/arrow.svg");
  Array.from(inputContainer.children).map((el)=>{
    if(el.classList.contains('error')){
      el.remove();
    };
  });
};
function validate(regex, str){
  return regex.test(str);
};
function handleValidation(regEx, str){
  let inputContainer = str.parentElement;
  if(!validate(regEx, str.value)){
    if(!inputContainer.classList.contains('invalid')){
      inputContainer.classList.add('invalid');
      inputContainer.children[1].src = "./assets/icons/red-cross.svg";
      let p = document.createElement('p');
      p.className='error';
      p.innerText='Попробуйте еще раз';
      inputContainer.appendChild(p);
    };
  }else{
      clearWarning(str, 'valid');
  };
};
if(form){
  form.addEventListener('submit',onSubmit);
}

function onSubmit(e){
  e.preventDefault();
  for (let i = 0; i < inputs.length; i++) {
    let regEx;
    switch (inputs[i].name) {
      case 'name':
        regEx=regName;
        break;
      case 'number':
        regEx=regNumber;
        break;
      case 'email':
        if(inputs[i].value){
          regEx=regEmail;
        }else{
          clearWarning(inputs[i],'empty');
        }
        break;
    };
    if(regEx){
      handleValidation(regEx, inputs[i]);
    };
  };
};


if(document.querySelector('.slider__content')){
  let slider_content = document.querySelector(".slider__content");
  let dot_container = document.querySelector(".dots");
  let dots = document.getElementsByClassName("dot");

  function addDots() {
    dot_container.innerHTML = "";
    for (let i = 0; i < slider_content.children.length; i++) {
      let div = document.createElement("div");
      div.className = "dot";
      dot_container.appendChild(div);
    }
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => showSlides(i));
    }
  }

  addDots(slider_content.children, showSlides);
  let slides = document.getElementsByClassName("slide");

  function showSlides(n) {
    if (n > slides.length - 1) {
      n = 0;
    }
    if (n < 0) {
      n = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("shown");
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("dot_active");
    }
    slides[n].style.display = "block";
    slides[n].classList.add("shown");
    dots[n].classList.add("dot_active");
  }

  let chevron_left = document.querySelector(".direction_left");
  let chevron_right = document.querySelector(".direction_right");

  function findSlide() {
    let shown = slider_content.querySelector(".shown");
    let slidesArr = Array.from(slides);
    return slidesArr.indexOf(shown);
  }

  chevron_left.addEventListener("click", () => showSlides(findSlide() - 1));
  chevron_right.addEventListener("click", () => showSlides(findSlide() + 1));

  let floor19 = document.querySelector(".floor19");
  let floor20 = document.querySelector(".floor20");

  function getWidth() {
    let width = document.documentElement.clientWidth;
    if (width <= 900) {
      showSlides(0);

      let floor19 = document.querySelector(".floor19_mobile");
      let floor20 = document.querySelector(".floor20_mobile");
      floor19.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlidesSet(slider_content, arr19);
      });
      floor20.addEventListener("click", (e) => {
        e.preventDefault();
        changeSlidesSet(slider_content, arr20);
      });
      return "mobile";
    } else {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "block";
      }
      return "desktop";
    }
  }
  getWidth();
  window.addEventListener("resize", getWidth);

  let arr19 = [
    "./assets/images/slider_1.jpg",
    "./assets/images/slider_2.jpg",
    "./assets/images/slider_3.jpg",
  ];
  let arr20 = [
    "./assets/images/1132 (69).JPG",
    "./assets/images/1132 (45).JPG",
    "./assets/images/1132 (37).JPG",
    "./assets/images/1132 (25).JPG",
    "./assets/images/1132 (18).JPG",
  ];

  function changeSlidesSet(place, arr) {
    place.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      place.innerHTML += `
    <div class="slide">
      <img class="img" src="${arr[i]}">
    </div>`;
    }
    addDots();
    if (getWidth() == "mobile") {
      showSlides(0);
    }
  }
  floor19.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlidesSet(slider_content, arr19);
  });
  floor20.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlidesSet(slider_content, arr20);
  });

  let arrow_right = document.getElementById("arrow_right");
  let arrow_left = document.getElementById("arrow_left");
  function scrollSlides(n) {
    n > 0
      ? (slider_content.scrollLeft += 300)
      : (slider_content.scrollLeft -= 300);
  }

  arrow_right.addEventListener("click", (e) => {
    e.preventDefault();
    scrollSlides(1);
  });
  arrow_left.addEventListener("click", (e) => {
    e.preventDefault();
    scrollSlides(-1);
  });

  
  let frames = document.querySelector('.frames');
  let goUp = document.querySelector('.up');
  let goDown = document.querySelector('.down');
  let framesNodes = frames.children;
  let framesContent = [];

  for (let i = 0; i < framesNodes.length; i++) {
    const node = framesNodes[i];
    framesContent.push(node.innerHTML)
  }

  function renderFrames(arr){
    frames.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
      let frame = document.createElement('div');
      frame.innerHTML = arr[i];
      if(i==1){
        frame.className = 'frame underline';
      } else {
        frame.className = 'frame';
      }
      frames.appendChild(frame);
    }
  };

  function scrollFrames(direction, arr){
    if(direction=='up'){
      arr.unshift(arr[arr.length-1]);
      arr.pop();
      
    } else {
      arr.push(arr[0]);
      arr.shift();
    }
    return arr;
  };

  renderFrames(framesContent);

  goUp.addEventListener('click',(e)=>{
    e.preventDefault();
    renderFrames(scrollFrames('up', framesContent))
  });
  goDown.addEventListener('click',(e)=>{
    e.preventDefault();
    renderFrames(scrollFrames('down', framesContent))
  });
}

if(document.querySelector('.tariffs_slider')){
let coworking19 = [
  {
    heading: `Разовое посещение`,
    text: `
  <li>Незакрепленное рабочее место;</li>
  <li>Скоростной безлимитный интернет;</li>
  <li>Монохромный принтер формата А4, сканер, копир;</li>
  <li>Чай, кофе, вода;</li>
  <li>Клиентское сопровождение.</li>
`,
    price: "2500 ₽",
    img: "./assets/images/tariffs_slider1.jpg",
  },

  {
    heading: `10 посещений / мес`,
    text: `
  <li>Незакрепленное рабочее место;</li>
  <li>Скоростной безлимитный интернет;</li>
  <li>Монохромный принтер формата А4, сканер, копир;</li>
  <li>Чай, кофе, вода;</li>
  <li>Клиентское сопровождение.</li>
  <li>1 гостевой визит в неделю</li>
`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: "15 000 ₽",
  },

  {
    heading: `Профессиональный (24 / 7)`,
    text: `<li>Рабочее место</li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider1.jpg",
    price: `<p>25 000 рублей / месяц <span class="little">незакрепленное</span></p>
  <p>30 000 рублей / месяц <span class="little">закрепленное</span></p>
  
  <p>35 000 рублей / месяц <span class="little">закрепленное в зоне улучшенной планировки</span></p>`,
  },

  {
    heading: `Корпоративный (24 / 7)
  для двух человек`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>8 гостевых визитов в месяц</li>
  <li>4 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `50 000 рублей / месяц
  60 000 рублей / месяц в зоне улучшенной планировки`,
  },

  {
    heading: `3х месячный (24 / 7)`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `27 000 рублей / месяц`,
  },

  {
    heading: `Полугодовой (24 / 7)`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `26 000 рублей / месяц`,
  },

  {
    heading: `Годовой (24 / 7)`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>3 часа бесплатной аренды переговорной комнаты</li>
  <li>локер для использования</li>
  <li>скидка 30% на аренду переговорных комнат и зала для переговоров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `290 000 рублей / год
  390 000 рублей / год в зоне улучшенной планировки`,
  },

  {
    heading: `Смарт - офис 9`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>локер для использования</li>
  <li>скидка 30% на аренду переговорных комнат и зала для переговоров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `210 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 10`,
    text: `<li>Закрепленное рабочее место</li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `245 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 11`,
    text: `<li>Закрепленное рабочее место (9 рабочих мест)
  </li>
  <li>Скоростной интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>локер для использования</li>
  <li>скидка 30% на аренду переговорных комнат и зала для переговоров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `315 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 12`,
    text: `<li>Закрепленное рабочее место (3 рабочих места)
  </li>
  <li>Скоростной интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>локер для использования</li>
  <li>скидка 30% на аренду переговорных комнат и зала для переговоров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `105 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 13`,
    text: `<li>Закрепленное рабочее место (3 рабочих места)
  </li>
  <li>Скоростной интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `99 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 14`,
    text: `<li>Закрепленное рабочее место (4 рабочих места)
  </li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `132 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 15`,
    text: `<li>Закрепленное рабочее место (2 рабочих места)
  </li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/tariffs_slider2.jpg",
    price: `66 000 рублей / месяц`,
  },

  {
    heading: `Смарт - офис 16`,
    text: `<li>Закрепленное рабочее место (5 рабочих мест)
  </li>
  <li>Скоростной безлимитный интернет</li>
  <li>Монохромный принтер формата А4, сканер, копир</li>
  <li>Чай, кофе, вода</li>
  <li>Клиентское сопровождение</li>
  <li>5 гостевых визитов в месяц</li>
  <li>2 часа бесплатной аренды переговорной комнаты</li>
  <li>скидка 30% на аренду переговорных комнат, зала для переговоров и локеров</li>`,
    img: "./assets/images/slider_2.jpg",
    price: `150 000 рублей / месяц`,
  },
];
let tariffs_slides = coworking19;
let slider_content = document.querySelector('.tariffs_slider_content');
  var dot_container = document.querySelector('.tariffs_slider_dots');
  let dots = document.getElementsByClassName('tariffs_slider_dot');
  

  function scrollTariffs(direction) {
    for (let i = 0; i < tariffs_slides.length; i++) {
      let item = tariffs_slides[i];
      if(item.heading === document.querySelector('.tariffs_slide_heading').innerText)
      {
        let index;
        if(direction==='+'){
          index=tariffs_slides.indexOf(item)+2;
        }else{
          index=tariffs_slides.indexOf(item)-2;
        }
        showTariffsSlides(index, getTariffsWidth());
        // dots[i].classList.add('tariffs_slider_dot_active');
        break;
      }
    }
  }

  let toTheRight = document.querySelector('.tariffs_slider_toTheRight');
  let toTheLeft = document.querySelector('.tariffs_slider_toTheLeft');

  if(toTheRight){
    toTheRight.addEventListener('click', ()=>scrollTariffs('+'));
    toTheLeft.addEventListener('click', ()=>scrollTariffs('-'));
  }

  function getTariffsWidth(){
    let width = document.documentElement.clientWidth;
    if(width>900){
      showTariffsSlides(0,'desktop')
      return 'desktop';
    } else{
      showTariffsSlides(0);
    }
  };
  function showTariffsSlides (index, version){
    if (index<0){
      index=tariffs_slides.length;
    } else if (index>tariffs_slides.length){
      index=0;
    }
    slider_content.innerHTML = ``;
    for (let i = 0; i <= index; i++) {
      slider_content.innerHTML = `<div class="tariffs_slide">
      <img src="${tariffs_slides[i].img}">
      <p class="tariffs_slide_heading">
          ${tariffs_slides[i].heading}
      </p>
      <div class="tariffs_slide_text">
        <ul class="tariffs_slide_ul">
          ${tariffs_slides[i].text}
        </ul>
        <p class="price">${tariffs_slides[i].price}</p>
      </div>
      <a href="#booking">
          <div class="book_btn">
              Забронировать
              <div class="arrow"></div>
          </div>
      </a>
      </div>`
      if(version=='desktop'){
        if(tariffs_slides[i+1]){
          slider_content.innerHTML += `<div class="tariffs_slide">
        <img src="${tariffs_slides[i+1].img}">
        <p class="tariffs_slide_heading">
            ${tariffs_slides[i+1].heading}
        </p>
        <div class="tariffs_slide_text">
        <ul class="tariffs_slide_ul">
        ${tariffs_slides[i+1].text}
        </ul>
            <p class="price">${tariffs_slides[i+1].price}</p>
        </div>
        <a href="#booking">
            <div class="book_btn">
                Забронировать
                <div class="arrow"></div>
            </div>
        </a>
        </div>`
        }
      }
    }
  }

  function addTariffsDots(length) {
    dot_container.innerHTML = '';
    let newLength;
    if (getTariffsWidth()) {
      newLength = +length / 2;
    } else {
      newLength = length;
    }
    for (let i = 0; i < newLength; i++) {
      let div = document.createElement('div');
      div.className = 'tariffs_slider_dot';
      dot_container.appendChild(div);
    };
    let dots = document.getElementsByClassName('tariffs_slider_dot');
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener('click', 
      ()=>showTariffsSlides(i, getTariffsWidth())
      )
    }
  };

  window.addEventListener('resize', getTariffsWidth);
  getTariffsWidth();
  addTariffsDots(tariffs_slides.length);
}


















//   <div class="slider">
//   <div class="slider__head">
//       <div class="floors">
//           <a href="#19">
//               <div class="floor floor19">
//                   19 этаж
//                       <div class="chevron"></div>
//               </div>
//           </a>
//           <div class="floor floor20" id="20">
//               <a href="#20">
//                   20 этаж
//               </a>
//           </div>
//       </div>
//       <div class="floors_mobile">
//           <details class="accordeon__item">
//               <summary class="accordeon__title">
//                   <a href="#19">
//                       <div class="floor floor19_mobile" id="19">
//                           19 этаж
//                       </div>
//                   </a>
                  
//                   <div class="chevron"></div>
//               </summary>
//               <div class="collapse-content">
//                   <a href="#20">
//                   <div class="floor floor20_mobile" id="20">
//                           20 этаж
//                   </div>
//                   </a>
//               </div>
//           </details>
//       </div>
//       <div class="arrows">
//           <a href="#19" class="arrow" id="arrow_left">
//           </a>
//           <a href="#20" class="arrow" id="arrow_right">
//           </a>
//       </div>
//   </div>
//   <div class="slider__content">
//    [[getImageList? &tvname= `slider` &tpl= `slider.main.tpl`]]
     
//   </div>
//   <div class="chevrons">
//       <div class="direction direction_left">
//           <div class="chevron" id="chevron_left"></div>
//       </div>
//       <div class="direction direction_right">
//           <div class="chevron" id="chevron_right"></div>
//       </div>
//   </div>
//   <div class="indicator">
//       <div class="dots">
//           [[getImageList? &tvname= `slider` &tpl= `slider-indicator.main.tpl`]]
//       </div>
//   </div>
// </div>