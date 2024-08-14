import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/Tricket/Tricket.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const TricketRouter = Router();
TricketRouter.use(jwtAuth('administrator', 'co-administrator'));

TricketRouter
  .post('/', controller.createTricket)
  .get('/', controller.getAllTricket)
  .get('/active', controller.getAllActiveTricket)
  .get('/routine', controller.getNotUseActiveTricket);

TricketRouter
  .route('/:id')
  .get(controller.getSingleTricket)
  .put(upload.any(), controller.updateTricket) //not implemented yet
  .delete(controller.deleteTricket);

//   TricketRouter
//   .put('/:id/status', controller.updateTricketStatus)

export default TricketRouter;
