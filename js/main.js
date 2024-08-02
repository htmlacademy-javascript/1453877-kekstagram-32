import { showThumbnails } from './thumbnails.js';
import { listenThumbnails } from './gallery.js';
import { listenUploadForm } from './form.js';
import { DefaultMainValues } from './const.js';
import { showDataErrorAlert } from './validation.js';
import { getData } from './api.js';
import { listenFiltersBlock } from './filter.js';

getData()
  .then((picturesContent) => {
    showThumbnails(picturesContent.slice(0, DefaultMainValues.PICTURES_TO_LOAD));
    listenThumbnails(picturesContent);
    listenFiltersBlock(picturesContent);
  })
  .catch(
    (err) => {
      showDataErrorAlert(err.message);
    }
  );

listenUploadForm();
