export const DefaultMainValues = {
  picturesToLoad: 25,
};

export const DefaultGalleryValues = {
  maxCommentsPerLoad: 5,
};

export const DefaultUploadFormValues = {
  Scale: {
    step: 0.25,
    minValue: 0.25,
    maxValue: 1,
    defaultValue: 1,
  },
  Effects: {
    'effect-chrome': {filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1,},
    'effect-sepia': {filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1,},
    'effect-marvin': {filter: 'invert', unit: '%', min: 0, max: 100, step: 1,},
    'effect-phobos': {filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1,},
    'effect-heat': {filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1,},
  },
  Hashtags: {
    maxLength: 19,
    restrictionExpression: /^(#)[a-zа-я0-9ёЁ]{1,19}$/gi,
    maxAmount: 5,
  },
  Comments: {
    maxLength: 140,
  }
};

export const ValidationErrorMessages = {
  HashtagRestrictionError:
    `Ограничения на каждый хэштег:
      <ul style="text-align: left">
        <li>должен состоять не более чем из ${DefaultUploadFormValues.Hashtags.maxLength} символов;</li>
        <li>не может включать в себя ничего кроме букв и цифр;</li>
        <li>должен начитаться с символа '#';</li>
        <li>должен быть отделён от предыдущего хэштега пробелом.</li>
      </ul>`,
  HashtagAmountError: `Можно указать не больше ${DefaultUploadFormValues.Hashtags.maxAmount} хэштегов.`,
  HashtagDuplicateError: 'Хэштеги не могут повторяться.',
  CommentLengthError: `Комментарии должны быть не длиннее ${DefaultUploadFormValues.Comments.maxLength} символов.`,
};

export const ValidationConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help',
};
