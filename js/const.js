export const UrlRoutes = {
  BASE: 'https://32.javascript.htmlacademy.pro/kekstagram',
  GET_DATA: '/data',
  SEND_DATA: '',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const DefaultMainValues = {
  PICTURES_TO_LOAD: 25,
  ALERT_SHOW_TIME: 5000,
  MAX_COMMENTS_PER_LOAD: 5,
  RANDOM_PICTURES: 10,
  DEBOUNCE_TIMEOUT: 500,
};

export const DefaultUploadFormValues = {
  Scale: {
    STEP: 0.25,
    MIN_VALUE: 0.25,
    MAX_VALUE: 1,
    DEFAULT_VALUE: 1,
  },
  Effects: {
    'effect-chrome': {filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1,},
    'effect-sepia': {filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1,},
    'effect-marvin': {filter: 'invert', unit: '%', min: 0, max: 100, step: 1,},
    'effect-phobos': {filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1,},
    'effect-heat': {filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1,},
  },
  Hashtags: {
    MAX_LENGTH: 19,
    RESTRICTION_EXPRESSION: /^(#)[a-zа-я0-9ёЁ]{1,19}$/gi,
    MAX_AMOUNT: 5,
  },
  Comments: {
    MAX_LENGTH: 140,
  },
  FileTypes: ['jpg', 'jpeg', 'png'],
};

export const ErrorMessages = {
  HASHTAG_RESTRICTION_ERROR:
    `Ограничения на каждый хэштег:
      <ul style="text-align: left">
        <li>должен состоять не более чем из ${DefaultUploadFormValues.Hashtags.MAX_LENGTH} символов;</li>
        <li>не может включать в себя ничего кроме букв и цифр;</li>
        <li>должен начитаться с символа '#';</li>
        <li>должен быть отделён от предыдущего хэштега пробелом.</li>
      </ul>`,
  HASHTAG_AMOUNT_ERROR: `Можно указать не больше ${DefaultUploadFormValues.Hashtags.MAX_AMOUNT} хэштегов.`,
  HASHTAG_DUPLICATE_ERROR: 'Хэштеги не могут повторяться.',
  COMMENT_LENGTH_ERROR: `Комментарии должны быть не длиннее ${DefaultUploadFormValues.Comments.MAX_LENGTH} символов.`,
  GET_DATA_ERROR: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA_ERROR: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const ValidationConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help',
};

export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};
