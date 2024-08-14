import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/Train/Train.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const TrainRouter = Router();
TrainRouter.use(jwtAuth('user'));

TrainRouter
  .post('/', upload.any(), controller.createTrain)
  .get('/', controller.getAllTrainPagination)
  .get('/all', controller.getAllTrain)

TrainRouter
  .route('/:id')
  .get(controller.getSingleTrain)
  .put(upload.any(), controller.updateTrain) //not implemented yet
  .delete(controller.deleteTrain);

//   TrainRouter
//   .put('/:id/status', controller.updateTrainStatus)

export default TrainRouter;
