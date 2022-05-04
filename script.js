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
let dots = document.querySelector('.dots');
for (let i = 0; i < 8; i++) {
  let div = document.createElement('div');
div.className = 'dot';
dots.appendChild(div);
}
dots.firstElementChild.classList.add('dot_active');

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
