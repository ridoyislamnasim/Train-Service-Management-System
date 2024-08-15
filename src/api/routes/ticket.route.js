import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/ticket/ticket.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const TricketRouter = Router();
TricketRouter.use(jwtAuth('user'));

TricketRouter
  .post('/', controller.createTicket)
  .get('/', controller.getAllTicket)

TricketRouter
  .route('/:id')
  .get(controller.getSingleTicket)
  .put( controller.updateTicket) 
  .delete(controller.cancleTicket);


export default TricketRouter;
