let navMain = document.querySelector('.main-header__nav');
let navToggle = document.querySelector('.main-header__toggle');

navMain.classList.remove('main-header__nav--nojs');
navToggle.classList.remove('main-header__toggle--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-header__nav--closed')) {
    navMain.classList.remove('main-header__nav--closed');
    navMain.classList.add('main-header__nav--opened');
    navToggle.classList.remove('main-header__toggle--opened');
    navToggle.classList.add('main-header__toggle--closed');
  } else {
    navMain.classList.add('main-header__nav--closed');
    navMain.classList.remove('main-header__nav--opened');
    navToggle.classList.remove('main-header__toggle--closed');
    navToggle.classList.add('main-header__toggle--opened');
  }
});
