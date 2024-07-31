import { isEscapeKey, toggleModal } from './functions.js';
import { onScaleControlClick, listenScaleControls } from './scale.js';
import { onEffectsControlClick } from './effects.js';
import { pristine, showFormSubmitSuccess, showFormSubmitFailure } from './validation.js';
import { SubmitButtonText } from './const.js';
import { sendData } from './api.js';

const toggleSubmitButton = () => {
  const uploadForm = document.getElementById('upload-select-image');
  const submitButton = uploadForm.querySelector('.img-upload__submit');
  submitButton.toggleAttribute('disabled');
  submitButton.textContent = submitButton.textContent === SubmitButtonText.IDLE ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

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
};

const closeUploadForm = () => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  toggleModal(uploadFormModal);
  resetUploadForm(uploadFormModal);
  deleteUploadFormEventListeners(uploadFormModal);
  pristine.reset();
};

const closeUploadFormAndShowSuccessMessage = () => {
  closeUploadForm();
  showFormSubmitSuccess();
};

function onUploadFormEscapeKeydown(evt) {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
  const commentTextarea = uploadFormModal.querySelector('.text__description');
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
    closeUploadForm();
  }
}

function onUploadFormCloseOrOutClick(evt) {
  if (evt.target.classList.contains('cancel') || (evt.target.classList.contains('img-upload__overlay'))) {
    closeUploadForm();
  }
}

const setUserFormSubmit = (onSuccess) => {
  const uploadForm = document.getElementById('upload-select-image');
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showFormSubmitFailure(err.message);
          }
        )
        .finally(toggleSubmitButton);
    }
  });
};

export const listenUploadForm = () => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const uploadInputElement = document.getElementById('upload-file');
  const effectsList = uploadFormModal.querySelector('.effects__list');
  resetUploadForm(uploadFormModal);
  setUserFormSubmit(closeUploadFormAndShowSuccessMessage);
  uploadInputElement.addEventListener('change', () => {
    pristine.reset();
    toggleModal(uploadFormModal);
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    uploadFormModal.addEventListener('click', onUploadFormCloseOrOutClick);
    listenScaleControls(uploadFormModal);
    effectsList.addEventListener('click', onEffectsControlClick);
  });
};
