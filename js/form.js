import { isEscapeKey, compareArrayElementsWithRegEx, findDuplicatesElementsInArray } from './functions.js';
import { Hashtags, Comments, ErrorMessages, Scale } from './const.js';

const toggleUploadForm = () => {
  document.querySelector('.img-upload__overlay').classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

function onUploadFormEscapeKeydown(evt) {
  const uploadFormBlock = document.getElementById('upload-select-image');
  const hashtagsInput = uploadFormBlock.querySelector('.text__hashtags');
  const commentTextarea = uploadFormBlock.querySelector('.text__description');
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
    toggleUploadForm();
    document.querySelector('.img-upload__overlay').removeEventListener('click', onUploadFormCloseOrOutClick);
    document.removeEventListener('keydown', onUploadFormEscapeKeydown);
    document.querySelector('.img-upload__input').value = '';
    uploadFormBlock.querySelector('.img-upload__scale').removeEventListener('click', onScaleControlClick);
  }
}

function onUploadFormCloseOrOutClick(evt) {
  const uploadFormBlock = document.querySelector('.img-upload__overlay');
  if (evt.target.classList.contains('cancel') || (evt.target.classList.contains('img-upload__overlay'))) {
    toggleUploadForm();
    uploadFormBlock.removeEventListener('click', onUploadFormCloseOrOutClick);
    document.removeEventListener('keydown', onUploadFormEscapeKeydown);
    document.querySelector('.img-upload__input').value = '';
    uploadFormBlock.querySelector('.img-upload__scale').removeEventListener('click', onScaleControlClick);
  }
}

// Валидация хэштегов и комментариев
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= Hashtags.amount);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), Hashtags.restrictionExpression);
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= Comments.stringLength);

const listenInputs = (uploadFormBlock) => {
  const hashtagsInput = uploadFormBlock.querySelector('.text__hashtags');
  const commentTextarea = uploadFormBlock.querySelector('.text__description');
  const pristine = new Pristine(uploadFormBlock, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  });
  pristine.reset();
  pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ErrorMessages.HashtagAmountError);
  pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ErrorMessages.HashtagRestrictionError);
  pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ErrorMessages.HashtagDuplicateError);
  pristine.addValidator(commentTextarea, validateCommentByLength, ErrorMessages.CommentLengthError);
  uploadFormBlock.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

// const setScaleValueToImageAndScaleBlock = (uploadFormBlock, value, scaleRestrictions) => {
//   const scaleBlock = uploadFormBlock.querySelector('.img-upload__scale');
//   const scaleValue = scaleBlock.querySelector('.scale__control--value');
//   const image = uploadFormBlock.querySelector('.img-upload__preview img');
//   scaleValue.value = value + '%';

// }

const countScaleValue = (currentValue, scaleStep) => {
  if ((currentValue + scaleStep) > 100) {
    return 100;
  } else if ((currentValue + scaleStep) < 0) {
    return 0;
  }
  return currentValue + scaleStep;
};

function onScaleControlClick(evt) {
  const uploadFormBlock = document.getElementById('upload-select-image');
  const scaleBlock = uploadFormBlock.querySelector('.img-upload__scale');
  const scaleValue = scaleBlock.querySelector('.scale__control--value');
  const scaleValueLess = scaleBlock.querySelector('.scale__control--smaller');
  const scaleValueMore = scaleBlock.querySelector('.scale__control--bigger');
  const image = uploadFormBlock.querySelector('.img-upload__preview img');
  let newScaleValue;
  if (evt.target === scaleValueLess) {
    newScaleValue = countScaleValue(parseInt(scaleValue.value, 10), -Scale.step * 100);
  } else if (evt.target === scaleValueMore) {
    newScaleValue = countScaleValue(parseInt(scaleValue.value, 10), Scale.step * 100);
  }
  scaleValue.value = `${newScaleValue}%`;
  image.style.transform = `scale(${newScaleValue / 100}`;
};

const listenScaleControls = (uploadFormBlock) => {
  const scaleBlock = uploadFormBlock.querySelector('.img-upload__scale');
  const scaleValue = scaleBlock.querySelector('.scale__control--value');
  scaleValue.value = Scale.defaultValue;
  uploadFormBlock.querySelector('.img-upload__preview img').style.transform = `scale(${Scale.defaultValue}`;
  scaleBlock.addEventListener('click', onScaleControlClick);
};


export const listenUploadForm = () => {
  const uploadFormBlock = document.querySelector('.img-upload__overlay');
  const uploadInput = document.getElementById('upload-file');
  uploadInput.addEventListener('change', () => {
    toggleUploadForm();
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    uploadFormBlock.addEventListener('click', onUploadFormCloseOrOutClick);
    listenInputs(uploadFormBlock);
    listenScaleControls(uploadFormBlock);
  });
};
