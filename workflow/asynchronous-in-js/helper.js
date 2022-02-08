const url = 'https://api.thecatapi.com/v1/images/search';
const imagesWrapper = document.querySelector('.images-wrapper');

let startId = 0;
let requests = [];

function createNewId() {
  return (startId += 1);
}

function createAndAppendSpinnerDiv(id) {
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'image-wrapper';
  imageWrapper.id = `image-${id}`;
  imagesWrapper.append(imageWrapper);

  const spinnerWrapper = document.createElement('div');
  imageWrapper.append(spinnerWrapper);
  spinnerWrapper.className = 'spinner-wrapper';
  spinnerWrapper.id = `spinner-${id}`;

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinnerWrapper.append(spinner);
}

function createAndAppendImage(src, id) {
  let img = document.createElement('img');

  img.onload = function () {
    document.querySelector(`#spinner-${id}`).remove();
    document.querySelector(`#image-${id}`).append(img);
  };
  img.src = src;
}
