const addSliderButtons = (count) => {
  const sliderButtonsWrap = document.createElement('div');
  sliderButtonsWrap.classList.add('slider-buttons-wrap');
  
  for (let i = 0; i < count; i++) {
    const buttonItem = document.createElement('div');
    buttonItem.classList.add('slider-button-item');
    //buttonItem.classList.add(`slider-button-item-${i+1}`);
    buttonItem.id = `slider-button-item-${i+1}`;
    
    if (i === 0) buttonItem.classList.add('slider-button-item-selected');
    
    sliderButtonsWrap.appendChild(buttonItem);
  }
  
  return sliderButtonsWrap;
};

const addImg = () => {
  const container = document.querySelector('.main-slider');
  const countImg = 7;
  for (let i = 0; i < countImg; i++) {
    const img = document.createElement('img');
    img.src = `assets/${i+1}.jpg`;
    img.alt = `${i+1}`;
    
    img.classList.add('slider-item');
    img.classList.add(`slider-item-${i+1}`);
    
    container.appendChild(img);
  }
  container.appendChild(addSliderButtons(countImg));
};


const animate = (numb = 0) => {
  /*const imges = document.querySelectorAll('.slider-item');
  const buttons = document.querySelectorAll('.slider-button-item');*/
  imges.forEach((item, i) => {
    item.classList.remove('opacity-img');
    buttons[i].classList.remove('slider-button-item-selected');
  });
  
  imges[numb].classList.add('opacity-img');
  buttons[numb].classList.add('slider-button-item-selected');
  
  let count = numb;
  timerId = setInterval(() => {
    if (count === 0) {
      imges[imges.length - 1].classList.remove('opacity-img');
      buttons[buttons.length - 1].classList.remove('slider-button-item-selected');
    } else {
      imges[count - 1].classList.remove('opacity-img');
      buttons[count - 1].classList.remove('slider-button-item-selected');
    }
    
    if (count > imges.length - 1) count = 0;
    
    imges[count].classList.add('opacity-img');
    buttons[count].classList.add('slider-button-item-selected');
    count++;
  }, 3000);
};

const selectImg = (elem) => {
  clearInterval(timerId);
  
  const numImg = +elem.id.substr(-1, 1);
  /*imges.forEach((item, i) => {
    item.classList.remove('opacity-img');
    buttons[i].classList.remove('slider-button-item-selected');
    
    if (i === numImg - 1) {
      item.classList.add('opacity-img');
      buttons[i].classList.add('slider-button-item-selected');
    }
  });*/
  
  
  animate(numImg - 1);
};

addImg();

const imges = document.querySelectorAll('.slider-item');
const buttons = document.querySelectorAll('.slider-button-item');

let timerId;

animate();


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('up') || event.target.classList.contains('fa-arrow-up')) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  if (event.target.classList.contains('nav-about')) scrollToElem(document.querySelector('.about'));
  if (event.target.classList.contains('nav-payment')) scrollToElem(document.querySelector('.payment'));
  if (event.target.classList.contains('nav-contacts')) scrollToElem(document.querySelector('.address'));
  
  if (event.target.classList.contains('slider-button-item')) selectImg(event.target);
});

const scrollToElem = (elem) => {
  const pageY = elem.pageY;
  window.scrollTo({
      top: getCoords(elem).top,
      behavior: "smooth",
    });
};

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};