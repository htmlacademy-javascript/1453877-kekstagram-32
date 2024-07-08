export const toggleBigPicture = () => {
  document.querySelector('.big-picture').classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

export const recreateLoaderButton = (loaderButton) => {
  const newLoaderButton = document.createElement('button');
  newLoaderButton.classList.add('social__comments-loader');
  newLoaderButton.classList.add('comments-loader');
  newLoaderButton.textContent = loaderButton.textContent;
  loaderButton.replaceWith(newLoaderButton);
};

const fillImage = (pictureContent, bigPictureModal) => {
  bigPictureModal.querySelector('.big-picture__img').querySelector('img').src = pictureContent.url;
};

const fillSocial = (pictureContent, bigPictureModal) => {
  const socialBlock = bigPictureModal.querySelector('.social__header');
  socialBlock.querySelector('.likes-count').textContent = pictureContent.likes;
  socialBlock.querySelector('.social__caption').textContent = pictureContent.description;
};

const fillCommentsCounter = (pictureContent, commentsCounterBlock, commentsBlock) => {
  commentsCounterBlock.querySelector('.social__comment-shown-count').textContent = commentsBlock.querySelectorAll('.social__comment').length;
  commentsCounterBlock.querySelector('.social__comment-total-count').textContent = pictureContent.comments.length;
};

const makeCommentTemplate = () => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.width = 35;
  avatar.height = 35;
  comment.appendChild(avatar);
  const text = document.createElement('p');
  text.classList.add('social__text');
  comment.appendChild(text);
  return comment;
};

const fillComment = (commentContent, commentTemplate) => {
  commentTemplate.querySelector('.social__picture').src = commentContent.avatar;
  commentTemplate.querySelector('.social__picture').alt = commentContent.name;
  commentTemplate.querySelector('.social__text').textContent = commentContent.message;
};

const fillComments = (pictureContent, commentsToLoad, commentsBlock) => {
  const commentsAlreadyLoaded = commentsBlock.querySelectorAll('.social__comment').length;
  const endCommentNumber = commentsAlreadyLoaded + commentsToLoad < pictureContent.comments.length ? commentsAlreadyLoaded + commentsToLoad : pictureContent.comments.length;
  const commentsFragment = document.createDocumentFragment();
  for (let currentComment = commentsAlreadyLoaded; currentComment < endCommentNumber; currentComment++) {
    const comment = makeCommentTemplate();
    fillComment(pictureContent.comments[currentComment], comment);
    commentsFragment.appendChild(comment);
  }
  commentsBlock.appendChild(commentsFragment);
};

const workWithComments = (pictureContent, commentsToLoad, bigPictureModal) => {
  const commentsCounterBlock = bigPictureModal.querySelector('.social__comment-count');
  const commentsBlock = bigPictureModal.querySelector('.social__comments');
  const commentsLoader = bigPictureModal.querySelector('.comments-loader');
  commentsBlock.innerHTML = '';
  fillCommentsCounter(pictureContent, commentsCounterBlock, commentsBlock);
  if (pictureContent.comments.length === 0) {
    commentsLoader.classList.add('hidden');
  } else if ((pictureContent.comments.length > 0) && (pictureContent.comments.length <= commentsToLoad)) {
    fillComments(pictureContent, commentsToLoad, commentsBlock);
    fillCommentsCounter(pictureContent, commentsCounterBlock, commentsBlock);
    commentsLoader.classList.add('hidden');
  } else if (pictureContent.comments.length > commentsToLoad) {
    fillComments(pictureContent, commentsToLoad, commentsBlock);
    fillCommentsCounter(pictureContent, commentsCounterBlock, commentsBlock);
    commentsLoader.addEventListener('click', (evt) => {
      evt.preventDefault();
      fillComments(pictureContent, commentsToLoad, commentsBlock);
      fillCommentsCounter(pictureContent, commentsCounterBlock, commentsBlock);
      if (commentsBlock.querySelectorAll('.social__comment').length === pictureContent.comments.length) {
        bigPictureModal.querySelector('.comments-loader').classList.add('hidden');
      }
    });
  }
};

export const fillBigPicture = (pictureContent, commentsToLoad, bigPictureModal) => {
  fillImage(pictureContent, bigPictureModal);
  fillSocial(pictureContent, bigPictureModal);
  workWithComments(pictureContent, commentsToLoad, bigPictureModal);
};
