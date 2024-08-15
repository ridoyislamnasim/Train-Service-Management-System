import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/ticket/ticket.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const TicketRouter = Router();
TicketRouter.use(jwtAuth('admin'));

TicketRouter
  .post('/', controller.createTicket)
  .get('/', controller.getAllTicket)

TicketRouter
  .route('/:id')
  .get(controller.getSingleTicket)
  .put( controller.updateTicket) 
  .delete(controller.cancleTicket);
TicketRouter
  .route('/user/:id')
  .get(controller.getSingleUserAllTicket)

export default TicketRouter;
