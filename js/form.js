import { isEscapeKey, compareArrayElementsWithRegEx, findDuplicatesElementsInArray } from './functions.js';
import { Hashtags, Comments, ErrorMessages } from './const.js';

const toggleUploadForm = () => {
  document.querySelector('.img-upload__overlay').classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

function onUploadFormEscapeKeydown(evt) {
  const uploadForm = document.getElementById('upload-select-image');
  const hashtagsInput = uploadForm.querySelector('.text__hashtags');
  const commentTextarea = uploadForm.querySelector('.text__description');
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
    toggleUploadForm();
    document.querySelector('.img-upload__overlay').removeEventListener('click', onUploadFormCloseOrOutClick);
    document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  }
}

function onUploadFormCloseOrOutClick(evt) {
  const uploadForm = document.querySelector('.img-upload__overlay');
  if (evt.target.classList.contains('cancel') || (evt.target.classList.contains('img-upload__overlay'))) {
    toggleUploadForm();
    uploadForm.removeEventListener('click', onUploadFormCloseOrOutClick);
    document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  }
}

// Валидация хэштегов
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= Hashtags.amount);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), Hashtags.restrictionExpression);
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= Comments.stringLength);

const listenInputs = () => {
  const uploadForm = document.getElementById('upload-select-image');
  const hashtagsInput = uploadForm.querySelector('.text__hashtags');
  const commentTextarea = uploadForm.querySelector('.text__description');
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  });

  pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ErrorMessages.HashtagAmountError);
  pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ErrorMessages.HashtagRestrictionError);
  pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ErrorMessages.HashtagDuplicateError);
  pristine.addValidator(commentTextarea, validateCommentByLength, ErrorMessages.CommentLengthError);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export const listenUploadForm = () => {
  const formBlock = document.querySelector('.img-upload__overlay');
  const uploadInput = document.getElementById('upload-file');
  uploadInput.addEventListener('change', () => {
    toggleUploadForm();
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    formBlock.addEventListener('click', onUploadFormCloseOrOutClick);
    listenInputs();
  });
};
