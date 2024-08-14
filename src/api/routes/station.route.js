import { Router } from 'express';
import controller from '../../modules/Station/Station.controller.js';
import { upload } from '../../middleware/upload/upload.js';

const StationRouter = Router();
StationRouter
  .post('/',  upload.any(), controller.createStation)
  .get('/', controller.getAllStationPagination)
  .get('/all', controller.getAllStation);

StationRouter
  .route('/:id')
  .get(controller.getSingleStation)
  .put(upload.any(),controller.updateStation)
  .delete(controller.deleteStation);

  StationRouter
  .put('/status/:id', controller.updateStationStatus)


export default StationRouter;
