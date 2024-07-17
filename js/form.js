import { isEscapeKey, toggleModal } from './functions.js';
import { DefaultUploadFormValues } from './const.js';
import { pristine } from './validation.js';

// Масштабирование изображения
const countScaleValue = (currentValue, scaleStep) => {
  if ((currentValue + scaleStep) > DefaultUploadFormValues.Scale.maxValue) {
    return DefaultUploadFormValues.Scale.maxValue;
  } else if ((currentValue + scaleStep) < DefaultUploadFormValues.Scale.minValue) {
    return DefaultUploadFormValues.Scale.minValue;
  }
  return currentValue + scaleStep;
};

const setScaleValue = (scaleValueElement, image, scaleValue) => {
  scaleValueElement.value = `${scaleValue * 100}%`;
  image.style.transform = `scale(${scaleValue}`;
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
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10) / 100, -DefaultUploadFormValues.Scale.step);
    } else if (evt.target === scaleValueMore) {
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10) / 100, DefaultUploadFormValues.Scale.step);
    }
    setScaleValue(scaleValueElement, image, newScaleValue);
  }
};

const listenScaleControls = (uploadFormModal) => {
  const scaleBlock = uploadFormModal.querySelector('.img-upload__scale');
  const scaleValueElement = scaleBlock.querySelector('.scale__control--value');
  const image = uploadFormModal.querySelector('.img-upload__preview img')
  setScaleValue(scaleValueElement, image, DefaultUploadFormValues.Scale.defaultValue);
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
    const chosenEffectName = evt.target.closest('input.effects__radio').id;
    const effectsBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const image = uploadFormModal.querySelector('.img-upload__preview img');
    const effectsSliderBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const effectsLevelElement = effectsSliderBlock.querySelector('.effect-level__value');
    const effectsSlider = effectsSliderBlock.querySelector('.effect-level__slider');
    effectsSlider.noUiSlider?.destroy();
    if (chosenEffectName !== 'effect-none') {
      effectsBlock.classList.remove('hidden');
      const chosenEffectParameters = DefaultUploadFormValues.Effects[chosenEffectName];
      createSlider(chosenEffectParameters, effectsSlider);
      effectsSlider.noUiSlider.set(chosenEffectParameters.max);
      effectsSlider.noUiSlider.on('update', () => {
        setEffect(chosenEffectParameters, effectsSlider.noUiSlider.get(), image, effectsLevelElement);
      });
    } else {
      clearEffect(image, effectsLevelElement);
      effectsBlock.classList.add('hidden');
    }
  }
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

export const listenUploadForm = () => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const uploadInputElement = document.getElementById('upload-file');
  const effectsList = uploadFormModal.querySelector('.effects__list');
  uploadInputElement.addEventListener('change', () => {
    resetUploadForm(uploadFormModal);
    toggleModal(uploadFormModal);
    document.addEventListener('keydown', onUploadFormEscapeKeydown);
    uploadFormModal.addEventListener('click', onUploadFormCloseOrOutClick);
    listenScaleControls(uploadFormModal);
    effectsList.addEventListener('click', onEffectsControlClick);
  });
};
