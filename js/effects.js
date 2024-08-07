import { DefaultUploadFormValues } from './const.js';

const createSlider = (effectParameters, sliderBlock) => {
  noUiSlider.create(sliderBlock, {
    start: effectParameters.max,
    range: {
      'min': effectParameters.min,
      'max': effectParameters.max,
    },
    step: effectParameters.step,
    format: {
      to: function (value) {
        return Number(value);
      },
      from: function (value) {
        return value;
      }
    }
  });
};

const setEffect = (effectParameters, currentValue, image, effectLevelElement) => {
  image.style.filter = `${effectParameters.filter}(${currentValue}${effectParameters.unit})`;
  effectLevelElement.setAttribute('value', currentValue);
  effectLevelElement.value = currentValue;
};

const clearEffect = (image, effectLevelElement) => {
  image.style.filter = '';
  effectLevelElement.setAttribute('value', '');
  effectLevelElement.value = '';
};

export const onEffectsControlClick = (evt) => {
  if (evt.target.closest('input.effects__radio')) {
    const uploadFormModal = document.querySelector('.img-upload__overlay');
    const chosenEffectName = evt.target.closest('input.effects__radio').id;
    const effectsBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const image = uploadFormModal.querySelector('.img-upload__preview img');
    const effectsSliderBlock = uploadFormModal.querySelector('.img-upload__effect-level');
    const effectLevelElement = effectsSliderBlock.querySelector('.effect-level__value');
    const effectsSlider = effectsSliderBlock.querySelector('.effect-level__slider');
    effectsSlider.noUiSlider?.destroy();
    if (chosenEffectName !== 'effect-none') {
      effectsBlock.classList.remove('hidden');
      const chosenEffectParameters = DefaultUploadFormValues.Effects[chosenEffectName];
      createSlider(chosenEffectParameters, effectsSlider);
      effectsSlider.noUiSlider.on('update', () => {
        setEffect(chosenEffectParameters, effectsSlider.noUiSlider.get(), image, effectLevelElement);
      });
    } else {
      clearEffect(image, effectLevelElement);
      effectsBlock.classList.add('hidden');
    }
  }
};
