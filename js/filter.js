import { returnUniqueRandomNumber, debounce } from './functions.js';
import { showThumbnails, deleteThumbnails } from './thumbnails.js';
import { DefaultMainValues } from './const.js';

const clearFilterButtonsStatus = (filterButtons) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
};

const setFilterButtonActive = (filterButton) => {
  filterButton.classList.add('img-filters__button--active');
};

const filterPicturesRandom = (picturesContent) => {
  const usedNumbers = new Set();
  const picturesContentRandom = [];
  for (let currentPicture = 0; currentPicture < DefaultMainValues.RANDOM_PICTURES; currentPicture++) {
    const randomPictureId = returnUniqueRandomNumber(0, picturesContent.length - 1, usedNumbers);
    usedNumbers.add(randomPictureId);
    picturesContentRandom.push(picturesContent.find((picture) => picture.id === randomPictureId));
  }
  return picturesContentRandom;
};

const filterPicturesDiscussed = (picturesContent) => {
  const picturesContentSortedDiscussed = Array.from(picturesContent);
  picturesContentSortedDiscussed.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
  return picturesContentSortedDiscussed;
};

const showThumbnailsWithDelay = debounce((picturesContent) => {
  showThumbnails(picturesContent);
});

export const listenFiltersBlock = (picturesContent) => {
  const filtersBlock = document.querySelector('.img-filters');
  const filterButtons = filtersBlock.querySelectorAll('.img-filters__button');
  filtersBlock.classList.remove('img-filters--inactive');
  filtersBlock.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button--active') || evt.target.id === 'filter-random') {
      clearFilterButtonsStatus(filterButtons);
      setFilterButtonActive(evt.target);
      deleteThumbnails();
      if (evt.target.id === 'filter-default') {
        showThumbnailsWithDelay(picturesContent);
      } else if (evt.target.id === 'filter-random') {
        showThumbnailsWithDelay(filterPicturesRandom(picturesContent));
      } else if (evt.target.id === 'filter-discussed') {
        showThumbnailsWithDelay(filterPicturesDiscussed(picturesContent));
      }
    }
  });
};
