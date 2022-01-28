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

const nextGif = document.querySelector('#next-page');
const previousGif = document.querySelector('#previous-page');
const imageBlockWrapper = document.getElementsByClassName('image-block-wrapper');

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

const fetchImages = async () => {
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&offset=${currentOffset}&limit=8&q=pigeon`;

  const response = await fetch(url);
  content = await response.json();

  imageBlockWrapper[0].innerHTML = '';

  content.data.map(element => {
    imageBlockWrapper[0].appendChild(
      generateImageBlock({
        link: element.url,
        date: element.import_datetime,
        img: element.images.downsized.url,
        name: element.title,
      }),
    );
  });
};

const checkPreviousGifDisabled = () => {
  if (!currentOffset) {
    previousGif.classList.add('disabled');
  } else {
    previousGif.classList.remove('disabled');
  }
};

const checkNextGifDisabled = () => {
  if (currentOffset + 8 >= content.pagination.total_count) {
    nextGif.classList.add('disabled');
  } else {
    nextGif.classList.remove('disabled');
  }
};

nextGif.addEventListener('click', () => {
  if (currentOffset + 8 <= content.pagination.total_count) {
    currentOffset += 8;
    fetchImages();
  }
  checkNextGifDisabled();
  checkPreviousGifDisabled();
});

previousGif.addEventListener('click', () => {
  if (currentOffset) {
    currentOffset -= 8;
    fetchImages();
  }
  checkNextGifDisabled();
  checkPreviousGifDisabled();
});

checkPreviousGifDisabled();
checkNextGifDisabled();
fetchImages();
