import { isEscapeKey } from './functions.js';
import { fillBigPicture, toggleBigPicture } from './big-picture.js';

export function onBigPictureEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    toggleBigPicture();
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
    document.querySelector('.big-picture').removeEventListener('click', onBigPictureCloseOrOutClick);
  }
}

export function onBigPictureCloseOrOutClick(evt) {
  const bigPicture = document.querySelector('.big-picture');
  if (evt.target.classList.contains('cancel')) {
    toggleBigPicture();
    bigPicture.removeEventListener('click', onBigPictureCloseOrOutClick);
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
  }
}

export const listenThumbnails = (array) => {
  const picturesBlock = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  picturesBlock.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const pictureBlock = evt.target.closest('a');
      fillBigPicture(array[pictureBlock.dataset.id - 1], bigPicture);
      toggleBigPicture();
      document.addEventListener('keydown', onBigPictureEscapeKeydown);
      bigPicture.addEventListener('click', onBigPictureCloseOrOutClick);
    }
  });
};
