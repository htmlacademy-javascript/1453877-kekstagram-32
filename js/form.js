import { isEscapeKey, compareArrayElementsWithRegEx, findDuplicatesElementsInArray, toggleModal } from './functions.js';
import { Hashtags, Comments, ErrorMessages, Scale, Effects, DefaultUploadFormValues } from './const.js';

// Валидация хэштегов и комментариев
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= Hashtags.amount);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), Hashtags.restrictionExpression);
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= Comments.stringLength);

const validationConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
};

const listenInputs = (uploadFormModal) => {
  const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
  const commentTextarea = uploadFormModal.querySelector('.text__description');
  const pristine = new Pristine(uploadFormModal, validationConfig);
  pristine.reset();
  pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ErrorMessages.HashtagAmountError);
  pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ErrorMessages.HashtagRestrictionError);
  pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ErrorMessages.HashtagDuplicateError);
  pristine.addValidator(commentTextarea, validateCommentByLength, ErrorMessages.CommentLengthError);
  uploadFormModal.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

// Масштабирование изображения
const countScaleValue = (currentValue, scaleStep) => {
  if ((currentValue + scaleStep) > 100) {
    return 100;
  } else if ((currentValue + scaleStep) < 0) {
    return 0;
  }
  return currentValue + scaleStep;
};

const setScaleValue = (scaleValueElement, image, scaleValue) => {
  scaleValueElement.value = `${scaleValue}%`;
  image.style.transform = `scale(${scaleValue / 100}`;
};

const onScaleControlClick = (evt) => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const scaleBlock = uploadFormModal.querySelector('.img-upload__scale');
  const scaleValueElement = scaleBlock.querySelector('.scale__control--value');
  const scaleValueLess = scaleBlock.querySelector('.scale__control--smaller');
  const scaleValueMore = scaleBlock.querySelector('.scale__control--bigger');
  if (evt.target === scaleValueLess || evt.target === scaleValueMore) {
    const image = uploadFormModal.querySelector('.img-upload__preview img');
    let newScaleValue;
    if (evt.target === scaleValueLess) {
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10), -Scale.step * 100);
    } else if (evt.target === scaleValueMore) {
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10), Scale.step * 100);
    }
    setScaleValue(scaleValueElement, image, newScaleValue);
  }
};

const listenScaleControls = (uploadFormModal) => {
  const scaleBlock = uploadFormModal.querySelector('.img-upload__scale');
  const scaleValue = scaleBlock.querySelector('.scale__control--value');
  scaleValue.value = DefaultUploadFormValues.scale;
  uploadFormModal.querySelector('.img-upload__preview img').style.transform = `scale(${Scale.defaultValue}`;
  scaleBlock.addEventListener('click', onScaleControlClick);
};

// Работа с эффектами
const createSlider = (effectParameters, sliderBlock) => {
  noUiSlider.create(sliderBlock, {
    start: effectParameters.min,
    range: {
      'min': effectParameters.min,
      'max': effectParameters.max,
    },
    step: effectParameters.step,
  });
};

const setEffect = (effectParameters, currentValue, image, effectLevelElement) => {
  image.style.filter = `${effectParameters.filter}(${currentValue}${effectParameters.unit})`;
  effectLevelElement.setAttribute('value', currentValue);
};

const clearEffect = (image, effectLevelElement) => {
  image.style.filter = '';
  effectLevelElement.setAttribute('value', '');
};

const onEffectsControlClick = (evt) => {
  if (evt.target.closest('input.effects__radio')) {
    const uploadFormModal = document.querySelector('.img-upload__overlay');
    const effectName = evt.target.closest('input.effects__radio').id;
    const effectsBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const image = uploadFormModal.querySelector('.img-upload__preview img');
    const effectsSliderBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const effectsLevelValue = effectsSliderBlock.querySelector('.effect-level__value');
    const effectsSlider = effectsSliderBlock.querySelector('.effect-level__slider');
    effectsSlider.noUiSlider?.destroy();
    if (effectName !== 'effect-none') {
      effectsBlock.classList.remove('hidden');
      createSlider(Effects[effectName], effectsSlider);
      effectsSlider.noUiSlider.on('update', () => {
        setEffect(Effects[effectName], effectsSlider.noUiSlider.get(), image, effectsLevelValue);
      });
    } else {
      clearEffect(image, effectsLevelValue);
      effectsBlock.classList.add('hidden');
    }
  }
};

const resetUploadForm = (uploadFormModal) => {
  const image = uploadFormModal.querySelector('.img-upload__preview img');
  // image.remove();
  image.style.filter = '';
  image.style.transform = '';
  document.querySelector('.img-upload__input').value = '';
  uploadFormModal.querySelector('.img-upload__effect-level').classList.add('hidden');
  uploadFormModal.querySelector('.effect-level__value').value = '';
  uploadFormModal.querySelector('.text__hashtags').textContent = '';
  uploadFormModal.querySelector('.text__description').value = '';
};

const deleteUploadFormEventListeners = (uploadFormModal) => {
  document.removeEventListener('keydown', onUploadFormEscapeKeydown);
  uploadFormModal.removeEventListener('click', onUploadFormCloseOrOutClick);
  uploadFormModal.querySelector('.img-upload__scale').removeEventListener('click', onScaleControlClick);
  uploadFormModal.querySelector('.effects__list').removeEventListener('click', onEffectsControlClick);
};

function onUploadFormEscapeKeydown(evt) {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
  const commentTextarea = uploadFormModal.querySelector('.text__description');
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
    toggleModal(uploadFormModal);
    resetUploadForm(uploadFormModal);
    deleteUploadFormEventListeners(uploadFormModal);
  }
}

function onUploadFormCloseOrOutClick(evt) {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  if (evt.target.classList.contains('cancel') || (evt.target.classList.contains('img-upload__overlay'))) {
    toggleModal(uploadFormModal);
    resetUploadForm(uploadFormModal);
    deleteUploadFormEventListeners(uploadFormModal);
  }
}

export const listenUploadForm = () => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const uploadInputElement = document.getElementById('upload-file');
  const effectsList = uploadFormModal.querySelector('.effects__list');
  uploadInputElement.addEventListener('change', () => {
    resetUploadForm(uploadFormModal);
    toggleModal(uploadFormModal);
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    uploadFormModal.addEventListener('click', onUploadFormCloseOrOutClick);
    listenInputs(uploadFormModal);
    listenScaleControls(uploadFormModal);
    effectsList.addEventListener('click', onEffectsControlClick);
  });
};
