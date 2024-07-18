// import { NAMES, DESCRIPTIONS, MESSAGES } from './mocks.js';
// import { createArrayOfPhotoCards } from './data.js';
import { showThumbnails } from './thumbnails.js';
import { listenThumbnails } from './gallery.js';
import { listenUploadForm } from './form.js';
import { DefaultMainValues } from './const.js';


// const picturesContent = createArrayOfPhotoCards(DefaultMainValues.picturesToLoad, MESSAGES, NAMES, DESCRIPTIONS);

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((picturesContent) => {
    showThumbnails(picturesContent.slice(0, DefaultMainValues.picturesToLoad));
    listenThumbnails(picturesContent);
  });

// showThumbnails(picturesContent);
// listenThumbnails(picturesContent);
listenUploadForm();
