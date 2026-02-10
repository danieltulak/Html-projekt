const slides = document.querySelectorAll('.slider img');
let current = 0;

const intervalTime = 5500; // jak dlouho je obrázek vidět (ms)
const fadeTime = 2000;    // musí odpovídat CSS transition

setInterval(() => {
  slides[current].classList.remove('active');

  current = (current + 1) % slides.length;

  slides[current].classList.add('active');
}, intervalTime);
