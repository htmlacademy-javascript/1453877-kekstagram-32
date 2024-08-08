export const isEscapeKey = (evt) => evt.key === 'Escape';

export const returnArrayElementByDataId = (arrayOfPictures, dataId) => {
  for (let currentElement = 0; currentElement < arrayOfPictures.length; currentElement++) {
    if (arrayOfPictures[currentElement].id === +dataId) {
      return arrayOfPictures[currentElement];
    }
  }
};

export const getRandomNumber = (rangeStart, rangeEnd) => {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

export const compareArrayElementsWithRegEx = (arrayOfHashtags, regexp) => {
  for (let currentElement = 0; currentElement < arrayOfHashtags.length; currentElement++) {
    if (!arrayOfHashtags[currentElement].match(regexp)) {
      return false;
    }
  }
  return true;
};

export const findDuplicatesElementsInArray = (arrayOfHashtags) => {
  const set = new Set();
  for (let currentElement = 0; currentElement < arrayOfHashtags.length; currentElement++) {
    set.add(arrayOfHashtags[currentElement].toLowerCase());
  }
  return set.size !== arrayOfHashtags.length;
};

export const returnUniqueRandomNumber = (rangeStart, rangeEnd, usedNumbers) => {
  let randomNumber;
  do {
    randomNumber = getRandomNumber(rangeStart, rangeEnd);
  } while (usedNumbers.has(randomNumber));
  return randomNumber;
};

export const toggleModal = (modal) => {
  modal.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
