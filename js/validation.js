import { compareArrayElementsWithRegEx, findDuplicatesElementsInArray } from './functions.js';
import { DefaultUploadFormValues, ValidationErrorMessages, ValidationConfig } from './const.js';

// Валидация хэштегов и комментариев
const validateHashtagsByAmount = (hashtagsString) => (hashtagsString.trim().split(' ').length <= DefaultUploadFormValues.Hashtags.maxAmount);
const validateHashtagsByRestrictions = (hashtagsString) => compareArrayElementsWithRegEx(hashtagsString.trim().split(' '), DefaultUploadFormValues.Hashtags.restrictionExpression) || hashtagsString === '';
const validateHashtagsByDuplication = (hashtagsString) => !findDuplicatesElementsInArray(hashtagsString.trim().split(' '));
const validateCommentByLength = (commentString) => (commentString.length <= DefaultUploadFormValues.Comments.maxLength);

const uploadFormModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.getElementById('upload-select-image');
const hashtagsInput = uploadFormModal.querySelector('.text__hashtags');
const commentTextarea = uploadFormModal.querySelector('.text__description');

export const pristine = new Pristine(uploadForm, ValidationConfig);

pristine.addValidator(hashtagsInput, validateHashtagsByAmount, ValidationErrorMessages.HashtagAmountError);
pristine.addValidator(hashtagsInput, validateHashtagsByRestrictions, ValidationErrorMessages.HashtagRestrictionError);
pristine.addValidator(hashtagsInput, validateHashtagsByDuplication, ValidationErrorMessages.HashtagDuplicateError);
pristine.addValidator(commentTextarea, validateCommentByLength, ValidationErrorMessages.CommentLengthError);

