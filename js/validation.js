import { compareArrayElementsWithRegEx, findDuplicatesElementsInArray } from './functions.js';
import { DefaultUploadFormValues, ErrorMessages, ValidationConfig, DefaultMainValues } from './const.js';

// Валидация хэштегов и комментариев
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= DefaultUploadFormValues.Hashtags.MAX_AMOUNT);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), DefaultUploadFormValues.Hashtags.RESTRICTION_EXPRESSION) || hashtagsString === '';
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= DefaultUploadFormValues.Comments.MAX_LENGTH);

const uploadFormModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.getElementById('upload-select-image');
const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
const commentTextarea = uploadFormModal.querySelector('.text__description');

export const pristine = new Pristine(uploadForm, ValidationConfig);

pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ErrorMessages.HASHTAG_AMOUNT_ERROR);
pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ErrorMessages.HASHTAG_RESTRICTION_ERROR);
pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ErrorMessages.HASHTAG_DUPLICATE_ERROR);
pristine.addValidator(commentTextarea, validateCommentByLength, ErrorMessages.COMMENT_LENGTH_ERROR);

const showAlertModal = (alertTemplateContent) => {
  const alertModal = alertTemplateContent.cloneNode(true);
  document.body.append(alertModal);
};

const removeAlertModalAfterTime = (alertModal, time) => {
  setTimeout(() => {
    alertModal.remove();
  }, time);
};

export const showDataErrorAlert = () => {
  showAlertModal(document.getElementById('data-error').content);
  const alertModal = document.body.querySelector('.data-error');
  alertModal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.data-error__title')) {
      alertModal.remove();
    }
  });
  removeAlertModalAfterTime(alertModal, DefaultMainValues.ALERT_SHOW_TIME);
};

export const showFormSubmitSuccess = () => {
  showAlertModal(document.getElementById('success').content);
  const alertModal = document.body.querySelector('.success');
  const alertModalButton = alertModal.querySelector('.success__button');
  alertModal.addEventListener('click', (evt) => {
    if ((evt.target === alertModalButton) || (!evt.target.closest('.success__inner'))) {
      alertModal.remove();
    }
  });
  removeAlertModalAfterTime(alertModal, DefaultMainValues.ALERT_SHOW_TIME);
};

export const showFormSubmitFailure = () => {
  showAlertModal(document.getElementById('error').content);
  const alertModal = document.body.querySelector('.error');
  const alertModalButton = alertModal.querySelector('.error__button');
  alertModal.addEventListener('click', (evt) => {
    if ((evt.target === alertModalButton) || (!evt.target.closest('.error__inner'))) {
      alertModal.remove();
    }
  });
  removeAlertModalAfterTime(alertModal, DefaultMainValues.ALERT_SHOW_TIME);
};
