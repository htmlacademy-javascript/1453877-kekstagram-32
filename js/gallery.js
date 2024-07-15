import { isEscapeKey, returnArrayElementByDataId, toggleModal } from './functions.js';
import { fillBigPicture, toggleBigPicture, recreateLoaderButton } from './big-picture.js';
import { MAX_COMMENTS_PER_LOAD } from './const.js';

function onBigPictureEscapeKeydown(evt) {
  const bigPictureModal = document.querySelector('.big-picture');
  if (isEscapeKey(evt)) {
    toggleModal(bigPictureModal);
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
    bigPictureModal.removeEventListener('click', onBigPictureCloseOrOutClick);
    recreateLoaderButton(bigPictureModal.querySelector('.comments-loader'));
  }
}

function onBigPictureCloseOrOutClick(evt) {
  const bigPictureModal = document.querySelector('.big-picture');
  if (evt.target.classList.contains('cancel') || (!evt.target.closest('.big-picture__preview'))) {
    toggleModal(bigPictureModal);
    bigPictureModal.removeEventListener('click', onBigPictureCloseOrOutClick);
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
    recreateLoaderButton(bigPictureModal.querySelector('.comments-loader'));
  }
}

export const listenThumbnails = (picturesContent) => {
  const picturesBlock = document.querySelector('.pictures');
  const bigPictureModal = document.querySelector('.big-picture');
  picturesBlock.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const chosenPicture = evt.target.closest('a.picture');
      const pictureContent = returnArrayElementByDataId(picturesContent, chosenPicture.dataset.id);
      fillBigPicture(pictureContent, MAX_COMMENTS_PER_LOAD, bigPictureModal);
      toggleBigPicture();
      document.addEventListener('keydown', onBigPictureEscapeKeydown);
      bigPictureModal.addEventListener('click', onBigPictureCloseOrOutClick);
    }
  });
};
