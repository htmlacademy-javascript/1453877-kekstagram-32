export const isEscapeKey = (evt) => evt.key === 'Escape';

export const returnArrayElementByDataId = (array, dataId) => {
  for (let currentElement = 0; currentElement < array.length; currentElement++) {
    if (array[currentElement].id === +dataId) {
      return array[currentElement];
    }
  }
};

export const getRandomNumber = (rangeStart, rangeEnd) => {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

export const compareArrayElementsWithRegEx = (array, regexp) => {
  for (let currentElement = 0; currentElement < array.length; currentElement++) {
    if (!array[currentElement].match(regexp)) {
      return false;
    }
  }
  return true;
};

export const findDuplicatesElementsInArray = (array) => {
  const set = new Set();
  for (let currentElement = 0; currentElement < array.length; currentElement++) {
    set.add(array[currentElement].toLowerCase());
  }
  return set.size !== array.length;
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
