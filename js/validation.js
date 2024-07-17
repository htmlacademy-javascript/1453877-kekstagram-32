import { compareArrayElementsWithRegEx, findDuplicatesElementsInArray } from './functions.js';
import { DefaultUploadFormValues, ValidationErrorMessages, ValidationConfig } from './const.js';

// Валидация хэштегов и комментариев
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= DefaultUploadFormValues.Hashtags.maxAmount);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), DefaultUploadFormValues.Hashtags.restrictionExpression);
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= DefaultUploadFormValues.Comments.maxLength);

const uploadFormModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.getElementById('upload-select-image');
const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
const commentTextarea = uploadFormModal.querySelector('.text__description');

export const pristine = new Pristine(uploadForm, ValidationConfig);

pristine.reset();
pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ValidationErrorMessages.HashtagAmountError);
pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ValidationErrorMessages.HashtagRestrictionError);
pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ValidationErrorMessages.HashtagDuplicateError);
pristine.addValidator(commentTextarea, validateCommentByLength, ValidationErrorMessages.CommentLengthError);
uploadFormModal.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
