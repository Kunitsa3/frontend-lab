const url = 'https://api.thecatapi.com/v1/images/search';
const imagesWrapper = document.querySelector('.images-wrapper');

let startId = 0;
let responses = [];
let requests = [];
const urls = Array(5).fill(url);

const createNewId = () => (startId += 1);

const handleErrors = error => {
  alert(error);
};

const createAndAppendSpinnerDiv = id => {
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
};

const createAndAppendImage = (src, id) => {
  let img = document.createElement('img');

  img.onload = () => {
    document.querySelector(`#spinner-${id}`).remove();
    document.querySelector(`#image-${id}`).append(img);
  };
  img.src = src;
};
