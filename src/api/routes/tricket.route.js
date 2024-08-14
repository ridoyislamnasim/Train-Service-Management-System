import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/ticket/ticket.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const TricketRouter = Router();
TricketRouter.use(jwtAuth('user'));

TricketRouter
  .post('/', controller.createTicket)
//   .get('/', controller.getAllTicket)
//   .get('/active', controller.getAllActiveTicket)
//   .get('/routine', controller.getNotUseActiveTicket);

// TricketRouter
//   .route('/:id')
//   .get(controller.getSingleTicket)
//   .put(upload.any(), controller.updateTicket) //not implemented yet
//   .delete(controller.deleteTicket);

//   TricketRouter
//   .put('/:id/status', controller.updateTricketStatus)

export default TricketRouter;
