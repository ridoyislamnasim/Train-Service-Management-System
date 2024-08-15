import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/user/user.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const UserRouter = Router();

UserRouter
  .post('/registration',upload.any(), controller.registrationUser)
  .post('/login', controller.loginUser)
  .get('/', controller.getAllUserPagination)

UserRouter
  .route('/:id')
  .get(controller.getSingleUser)


export default UserRouter;
