export const isEscapeKey = (evt) => evt.key === 'Escape';

export const returnArrayElementByDataId = (array, dataId) => {
  for (let currentElement = 0; currentElement < array.length; currentElement++) {
    if (array[currentElement].id === +dataId) {
      return array[currentElement];
    }
  }
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

export const toggleModal = (modal) => {
  modal.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};
