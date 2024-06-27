//make bigPicture
//show bigPicture

const makeAndFillComment = (commentContent) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.width = 35;
  avatar.height = 35;
  avatar.src = commentContent.avatar;
  avatar.alt = commentContent.name;
  comment.appendChild(avatar);
  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentContent.message;
  comment.appendChild(text);
  return comment;
};

const fillComments = (commentsContent, commentsBlock) => {
  commentsBlock.innerHTML = '';
  for (let currentComment = 0; currentComment < commentsContent.length; currentComment++) {
    commentsBlock.appendChild(makeAndFillComment(commentsContent[currentComment]));
  }
};

export const fillBigPicture = (pictureContent, bigPictureModal) => {
  bigPictureModal.querySelector('.big-picture__img img').src = pictureContent.url;
  bigPictureModal.querySelector('.likes-count').textContent = pictureContent.likes;
  bigPictureModal.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureModal.querySelector('.comments-loader').classList.add('hidden');
  bigPictureModal.querySelector('.social__caption').textContent = pictureContent.description;
  fillComments(pictureContent.comments, document.querySelector('.social__comments'));
};
