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
let regNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
let regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
let form = document.querySelector('.form');
let inputs=document.querySelectorAll('.block5_input input');

function clearWarning(input, flag){
  let inputContainer = input.parentElement;
  inputContainer.classList.remove('invalid');
  flag=='valid'?
  inputContainer.children[1].src='images/check.svg':
  inputContainer.children[1].src='images/arrow.svg';
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
      inputContainer.children[1].src='images/red-cross.svg';
      let p = document.createElement('p');
      p.className='error';
      p.innerText='Попробуйте еще раз';
      inputContainer.appendChild(p);
    };
  }else{
      clearWarning(str, 'valid');
  };
};
form.addEventListener('submit',onSubmit);
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

let slideIndex = 0;
let slider_content = document.querySelector('.slider__content');

let dot_container = document.querySelector('.dots');
let dots = document.getElementsByClassName("dot");
console.log(dots);

function addDots() {
  dot_container.innerHTML = '';
  for (let i = 0; i < slider_content.children.length; i++) {
    // console.log(slider_content.children);
    let div = document.createElement('div');
    div.className = 'dot';
    dot_container.appendChild(div);
  };
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', 
    ()=>showSlides(i)
    )
  }
};
addDots();

let slides = document.getElementsByClassName("slide");

function showSlides(n){
  if (n > slides.length-1) {n = 0}    
  if (n < 0) {
    n = slides.length-1;
  }
  for (i = 0; i < slides.length; i++) {
    // slides[i].style.display = "none";
  slides[i].classList.remove('shown');
  slides[i].classList.add('hidden')
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot_active", "");
  }
  // slides[n].style.display = "block";

  slides[n].classList.remove('hidden');
  slides[n].classList.add('shown');
  dots[n].className += " dot_active";
}

let chevron_left = document.querySelector('#chevron_left')
let chevron_right = document.querySelector('#chevron_right')
console.log(chevron_left)

function findSlide() {
  let shown = slider_content.querySelector('.shown');
  slidesArr = Array.from(slides);
  console.log(slidesArr.indexOf(shown));
  return(slidesArr.indexOf(shown));
}
/////
chevron_left.addEventListener('click', ()=>showSlides(findSlide()-1));
chevron_right.addEventListener('click', ()=>showSlides(findSlide()+1));

// 900px

let floor19 = document.querySelector('.floor19');
console.log(floor19)
let floor20 = document.querySelector('.floor20');

function getWidth(){
  let width = document.documentElement.clientWidth;
  if(width<=900){
    showSlides(slideIndex);


    let floor19 = document.querySelector('.floor19_mobile');
    let floor20 = document.querySelector('.floor20_mobile');
    floor19.addEventListener('click', function() {
      addASlide(slider_content, arr19);
    });
    floor20.addEventListener('click', function() {
      addASlide(slider_content, arr20);
    });
  } else {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "block";
    }
  }
};
getWidth();
window.addEventListener('resize', getWidth);

let arr19 = ['images/slider_1.jpg', 'images/slider_2.jpg', 'images/slider_3.jpg'];
let arr20 = ['images/1132 (61).JPG', 'images/1132 (45).JPG', 'images/1132 (37).JPG', 'images/1132 (25).JPG', 'images/1132 (18).JPG', 'images/1132 (13).JPG', 'images/1132 (12).JPG'];


function addASlide(place, arr) {
  place.innerHTML='';
  for (let i = 0; i < arr.length; i++) {
    place.innerHTML+=`
    <div class="slide">
      <img class="img" src="${arr[i]}">
    </div>`
  };
  addDots();
}
floor19.addEventListener('click', function() {
  addASlide(slider_content, arr19);
});
floor20.addEventListener('click', function() {
  addASlide(slider_content, arr20);
});

let arrow_right = document.getElementById('arrow_right');
let arrow_left = document.getElementById('arrow_left');
function scrollSlides(n) {
  n>0?
  slider_content.scrollLeft+=300:
  slider_content.scrollLeft-=300;
}

arrow_right.addEventListener('click', ()=>scrollSlides(1));
arrow_left.addEventListener('click', ()=>scrollSlides(-1));