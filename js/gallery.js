import { isEscapeKey, returnArrayElementByDataId } from './functions.js';
import { fillBigPicture, toggleBigPicture, recreateLoaderButton } from './big-picture.js';
import { MAX_COMMENTS_PER_LOAD } from './const.js';

function onBigPictureEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    toggleBigPicture();
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
    document.querySelector('.big-picture').removeEventListener('click', onBigPictureCloseOrOutClick);
    recreateLoaderButton(document.querySelector('.comments-loader'));
  }
}

function onBigPictureCloseOrOutClick(evt) {
  const bigPicture = document.querySelector('.big-picture');
  if (evt.target.classList.contains('cancel')) { // || (!evt.target.closest('.big-picture__preview'))
    toggleBigPicture();
    bigPicture.removeEventListener('click', onBigPictureCloseOrOutClick);
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
    recreateLoaderButton(document.querySelector('.comments-loader'));
  }
}

export const listenThumbnails = (picturesContent) => {
  const picturesBlock = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  picturesBlock.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const chosenPicture = evt.target.closest('a');
      const pictureContent = returnArrayElementByDataId(picturesContent, chosenPicture.dataset.id);
      fillBigPicture(pictureContent, MAX_COMMENTS_PER_LOAD, bigPicture);
      toggleBigPicture();
      document.addEventListener('keydown', onBigPictureEscapeKeydown);
      bigPicture.addEventListener('click', onBigPictureCloseOrOutClick);
    }
  });
};
