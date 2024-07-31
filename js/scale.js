import { DefaultUploadFormValues } from './const.js';

const countScaleValue = (currentValue, scaleStep) => {
  if ((currentValue + scaleStep) > DefaultUploadFormValues.Scale.MAX_VALUE) {
    return DefaultUploadFormValues.Scale.MAX_VALUE;
  } else if ((currentValue + scaleStep) < DefaultUploadFormValues.Scale.MIN_VALUE) {
    return DefaultUploadFormValues.Scale.MIN_VALUE;
  }
  return currentValue + scaleStep;
};

const setScaleValue = (scaleValueElement, image, scaleValue) => {
  scaleValueElement.value = `${scaleValue * 100}%`;
  image.style.transform = `scale(${scaleValue}`;
};

export const onScaleControlClick = (evt) => {
  const uploadFormModal = document.querySelector('.img-upload__overlay');
  const scaleBlock = uploadFormModal.querySelector('.img-upload__scale');
  const scaleValueElement = scaleBlock.querySelector('.scale__control--value');
  const scaleValueLess = scaleBlock.querySelector('.scale__control--smaller');
  const scaleValueMore = scaleBlock.querySelector('.scale__control--bigger');
  if (evt.target === scaleValueLess || evt.target === scaleValueMore) {
    const image = uploadFormModal.querySelector('.img-upload__preview img');
    let newScaleValue;
    if (evt.target === scaleValueLess) {
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10) / 100, -DefaultUploadFormValues.Scale.STEP);
    } else if (evt.target === scaleValueMore) {
      newScaleValue = countScaleValue(parseInt(scaleValueElement.value, 10) / 100, DefaultUploadFormValues.Scale.STEP);
    }
    setScaleValue(scaleValueElement, image, newScaleValue);
  }
};

export const listenScaleControls = (uploadFormModal) => {
  const scaleBlock = uploadFormModal.querySelector('.img-upload__scale');
  const scaleValueElement = scaleBlock.querySelector('.scale__control--value');
  const image = uploadFormModal.querySelector('.img-upload__preview img');
  setScaleValue(scaleValueElement, image, DefaultUploadFormValues.Scale.DEFAULT_VALUE);
  scaleBlock.addEventListener('click', onScaleControlClick);
};
