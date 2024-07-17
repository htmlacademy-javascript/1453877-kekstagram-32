import { NAMES, DESCRIPTIONS, MESSAGES } from './mocks.js';
import { createArrayOfPhotoCards } from './data.js';
import { showThumbnails } from './thumbnails.js';
import { listenThumbnails } from './gallery.js';
import { listenUploadForm } from './form.js';
import { DefaultMainValues } from './const.js';


const picturesContent = createArrayOfPhotoCards(DefaultMainValues.picturesToLoad, MESSAGES, NAMES, DESCRIPTIONS);
showThumbnails(picturesContent);
listenThumbnails(picturesContent);
listenUploadForm();
