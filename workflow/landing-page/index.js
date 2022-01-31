document.querySelector('.search-button').addEventListener('click', function () {
  document.querySelector('.overlay').classList.toggle('opened');
});

document.querySelector('.close-button').addEventListener('click', function () {
  document.querySelector('.overlay').classList.toggle('opened');
});

document.querySelector('.menu').addEventListener('click', function () {
  document.querySelector('.navigation-menu').classList.toggle('opened');
});

const APIKEY = '4qYrEoyFHTFZXZNSPArlJHKDjcaSUbD2';

let currentOffset = 0;
let content;

const nextPageBtn = document.querySelector('#next-page');
const previousPageBtn = document.querySelector('#previous-page');
const imagesBlocksWrapper = document.getElementsByClassName('images-blocks-wrapper')[0];

const generateImageBlock = ({ link, date, img, name }) => {
  const imageBlock = document.createElement('div');
  imageBlock.className = 'white-background-color image-block';

  const imageBlockPhotoWrapper = document.createElement('div');
  imageBlockPhotoWrapper.className = 'image-block-photo-wrapper';

  const imageBlockPhoto = document.createElement('img');
  imageBlockPhoto.src = img;
  imageBlockPhoto.className = 'image-block-photo';

  const overlayImage = document.createElement('div');
  overlayImage.className = 'overlay-image';

  const buttonImage = document.createElement('a');
  buttonImage.className = 'button button-image';
  buttonImage.href = link;
  buttonImage.target = '_blank';

  const pictureLink = document.createElement('i');
  pictureLink.className = 'fas fa-link';

  const imageBlockInformation = document.createElement('div');
  imageBlockInformation.className = 'image-block-information';

  const imageBlockPhotoName = document.createElement('h3');
  imageBlockPhotoName.className = 'image-block-photo-name';
  imageBlockPhotoName.textContent = name;

  const imageBlockDate = document.createElement('p');
  imageBlockDate.className = 'image-block-date roboto-font';
  imageBlockDate.textContent = date;

  const primaryText = document.createElement('p');
  primaryText.className = 'primary-text roboto-font';
  primaryText.textContent = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero perferendis tenetur nesciunt numquam.
Excepturi aperiam eligendi maiores.`;

  imageBlock.appendChild(imageBlockPhotoWrapper);
  imageBlockPhotoWrapper.appendChild(imageBlockPhoto);
  imageBlockPhotoWrapper.appendChild(overlayImage);
  overlayImage.appendChild(buttonImage);
  buttonImage.appendChild(pictureLink);
  imageBlock.appendChild(imageBlockInformation);
  imageBlockInformation.appendChild(imageBlockPhotoName);
  imageBlockInformation.appendChild(imageBlockDate);
  imageBlockInformation.appendChild(primaryText);

  return imageBlock;
};

const checkPreviousPageBtnDisabled = () => {
  if (!currentOffset) {
    previousPageBtn.classList.add('disabled');
  } else {
    previousPageBtn.classList.remove('disabled');
  }
};

const checkNextPageBtnDisabled = () => {
  if (currentOffset + 8 >= content.pagination.total_count) {
    nextPageBtn.classList.add('disabled');
  } else {
    nextPageBtn.classList.remove('disabled');
  }
};

const fetchImages = async () => {
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&offset=${currentOffset}&limit=8&q=penguin`;

  const response = await fetch(url);
  content = await response.json();

  imagesBlocksWrapper.innerHTML = '';

  content.data.map(element => {
    imagesBlocksWrapper.appendChild(
      generateImageBlock({
        link: element.url,
        date: element.import_datetime,
        img: element.images.downsized.url,
        name: element.title,
      }),
    );
  });
  checkPreviousPageBtnDisabled();
  checkNextPageBtnDisabled();
};

nextPageBtn.addEventListener('click', () => {
  currentOffset += 8;
  fetchImages();
});

previousPageBtn.addEventListener('click', () => {
  currentOffset -= 8;
  fetchImages();
});

fetchImages();
