import { workerData, parentPort } from 'worker_threads';
import { uploadSingleImg, uploadSinglePdf } from './index.js';
import isArrayElementExist from '../../utils/isArrayElementExist.js';
const { file } = workerData;

(async () => {
  if (isArrayElementExist(file)) {
    // console.log('is file array', file);
    file.forEach(async (element) => {
      console.log('is pdf', element.mimetype);
      console.log('is pdf', element.mimetype == 'application/pdf');
      element.mimetype == 'application/pdf'
        ? await uploadSinglePdf(element)
        : await uploadSingleImg(element);
    });
    parentPort.postMessage({ success: true });
  } else {
    file.mimetype == 'application/pdf'
      ? await uploadSinglePdf(file)
      : await uploadSingleImg(file);

    parentPort.postMessage({ success: true });
  }
})();
