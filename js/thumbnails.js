const fillThumbnail = (pictureContent, thumbnail) => {
  thumbnail.querySelector('.picture__img').src = pictureContent.url;
  thumbnail.querySelector('.picture__img').alt = pictureContent.description;
  thumbnail.querySelector('.picture__comments').textContent = pictureContent.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = pictureContent.likes;
  thumbnail.querySelector('.picture').setAttribute('data-id', pictureContent.id);
  return thumbnail;
};

export const showThumbnails = (picturesContent) => {
  const thumbnailTemplate = document.querySelector('#picture').content;
  const picturesBlock = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();
  for (let currentThumbnail = 0; currentThumbnail < picturesContent.length; currentThumbnail++) {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnailsFragment.appendChild(fillThumbnail(picturesContent[currentThumbnail], thumbnail));
  }
  picturesBlock.appendChild(thumbnailsFragment);
};

export const deleteThumbnails = () => {
  const thumbnails = document.querySelectorAll('a.picture');
  thumbnails.forEach((picture) => picture.remove());
};

