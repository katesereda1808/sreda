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
