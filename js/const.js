export const MAX_COMMENTS_PER_LOAD = 5;
export const Hashtags = {
  stringLength: 19,
  restrictionExpression: /^(#)[a-zа-я0-9]{1,19}$/gi,
  amount: 5,
};

export const Comments = {
  stringLength: 140,
};

export const ErrorMessages = {
  HashtagRestrictionError:
    `Ограничения на каждый хэштег:
      <ul style="text-align: left"><li>должен состоять не более чем из ${Hashtags.stringLength} символов;</li>
      <li>не может включать в себя ничего кроме букв и цифр</li>
      <li>должен начитаться с символа '#'</li>
      <li>должен быть отделён от предыдущего хэштега пробелом</li></ul>`,
  HashtagAmountError: `Можно указать не больше ${Hashtags.amount} хэштегов`,
  HashtagDuplicateError: 'Хэштеги не могут повторяться',
  CommentLengthError: `Комментарии должны быть не длиннее ${Comments.stringLength} символов`,
};

export const Scale = {
  step: 0.25,
  defaultValue: '100%'
};
