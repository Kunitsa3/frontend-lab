document.querySelector('.search-button').addEventListener('click', function () {
  document.querySelector('.overlay').classList.toggle('opened');
});

document.querySelector('.close-button').addEventListener('click', function () {
  document.querySelector('.overlay').classList.toggle('opened');
});

document.querySelector('.menu').addEventListener('click', function () {
  document.querySelector('.navigation-menu').classList.toggle('opened');
});
