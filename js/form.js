import { isEscapeKey, toggleModal } from './functions.js';
import { onScaleControlClick, listenScaleControls } from './scale.js';
import { onEffectsControlClick } from './effects.js';
import { pristine } from './validation.js';

const resetUploadForm = (uploadFormModal) => {
  document.getElementById('upload-select-image').reset();
  const image = uploadFormModal.querySelector('.img-upload__preview img');
  // image.remove();
  image.style.filter = '';
  image.style.transform = '';
  document.querySelector('.img-upload__input').value = '';
  uploadFormModal.querySelector('.img-upload__effect-level').classList.add('hidden');
  uploadFormModal.querySelector('.effect-level__value').value = '';
};

const deleteUploadFormEventListeners = (uploadFormModal) => {
  document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  uploadFormModal.removeEventListener('click', onUploadFormCloseOrOutClick);
  uploadFormModal.querySelector('.img-upload__scale').removeEventListener('click', onScaleControlClick);
  uploadFormModal.querySelector('.effects__list').removeEventListener('click', onEffectsControlClick);
  document.getElementById('upload-select-image').removeEventListener('submut', onUploadFormSubmit);
};

function onUploadFormEscapeKeydown(evt) {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
  const commentTextarea = uploadFormModal.querySelector('.text__description');
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
    toggleModal(uploadFormModal);
    resetUploadForm(uploadFormModal);
    deleteUploadFormEventListeners(uploadFormModal);
    pristine.reset();
  }
}

function onUploadFormCloseOrOutClick(evt) {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  if (evt.target.classList.contains('cancel') || (evt.target.classList.contains('img-upload__overlay'))) {
    toggleModal(uploadFormModal);
    resetUploadForm(uploadFormModal);
    deleteUploadFormEventListeners(uploadFormModal);
    pristine.reset();
  }
}

function onUploadFormSubmit(evt) {
  evt.preventDefault();
  console.log(pristine.validate());
}

export const listenUploadForm = () => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const uploadForm = document.getElementById('upload-select-image');
  const uploadInputElement = document.getElementById('upload-file');
  const effectsList = uploadFormModal.querySelector('.effects__list');
  resetUploadForm(uploadFormModal);
  uploadInputElement.addEventListener('change', () => {
    pristine.reset();
    toggleModal(uploadFormModal);
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    uploadFormModal.addEventListener('click', onUploadFormCloseOrOutClick);
    listenScaleControls(uploadFormModal);
    effectsList.addEventListener('click', onEffectsControlClick);
    uploadForm.addEventListener('submit', onUploadFormSubmit);
  });
};
