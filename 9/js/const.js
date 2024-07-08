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
  HashtagRestrictionError: `Каждый хэштег должен быть не длиннее ${Hashtags.stringLength} символов и не может включать в себя ничего кроме букв и цифр`,
  HashtagAmountError: `Можно указать не больше ${Hashtags.amount} хэштегов`,
  HashtagDuplicateError: 'Хэштеги не могут повторяться',
  CommentLengthError: `Комментарии должны быть не длиннее ${Comments.stringLength} символов`,
};

