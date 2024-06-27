import { NAMES, DESCRIPTIONS, MESSAGES } from './mocks.js';
import { createArrayOfPhotoCards } from './data.js';
import { showThumbnails } from './thumbnails.js';
import { fillBigPicture } from './big-picture.js';
import { toggleModal, isEscapeKey } from './functions.js';

const picturesContent = createArrayOfPhotoCards(25, MESSAGES, NAMES, DESCRIPTIONS);
showThumbnails(picturesContent);

const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    toggleModal(bigPicture);
    document.removeEventListener('keydown', onEscapeKeydown);
    picturesBlock.addEventListener('click', onThumbnailClick);
  }
};

const onThumbnailClick = (evt) => {
  if (evt.target.closest('a')) {
    const pictureBlock = evt.target.closest('a');
    const closeBigPicture = bigPicture.querySelector('.cancel');
    fillBigPicture(picturesContent[pictureBlock.dataset.id - 1], bigPicture);
    toggleModal(bigPicture);
    closeBigPicture.addEventListener('click', onBigPictureCloseClick);
    picturesBlock.removeEventListener('click', onThumbnailClick);
    document.addEventListener('keydown', onEscapeKeydown);
  }
};

const onBigPictureCloseClick = () => {
  toggleModal(bigPicture);
  picturesBlock.addEventListener('click', onThumbnailClick);
  document.removeEventListener('keydown', onEscapeKeydown);
};

picturesBlock.addEventListener('click', onThumbnailClick);
