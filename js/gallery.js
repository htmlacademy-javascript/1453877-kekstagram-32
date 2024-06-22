// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// // Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

/* <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
</a> */

const makeThumbnail = (pictureContent, pictureTemplate) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = pictureContent.url;
  picture.querySelector('.picture__img').alt = pictureContent.description;
  picture.querySelector('.picture__comments').textContent = pictureContent.comments.length;
  picture.querySelector('.picture__likes').textContent = pictureContent.likes;
  return picture;
};

const makeThumbnails = (arrayOfPhotoCards) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesBlock = document.querySelector('.pictures');
  for (let currentThumbnail = 0; currentThumbnail < arrayOfPhotoCards.length; currentThumbnail++) {
    picturesBlock.appendChild(makeThumbnail(arrayOfPhotoCards[currentThumbnail], pictureTemplate));
  }
};

export { makeThumbnails };
