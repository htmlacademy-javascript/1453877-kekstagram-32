
import { NAMES, DESCRIPTIONS, MESSAGES } from './mocks.js';
import { createArrayOfPhotoCards } from './data.js';
import { makeThumbnails } from './gallery.js';

makeThumbnails(createArrayOfPhotoCards(25, MESSAGES, NAMES, DESCRIPTIONS));
