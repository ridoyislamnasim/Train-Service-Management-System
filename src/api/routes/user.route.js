import { Router } from 'express';
import { upload } from '../../middleware/upload/index.js';
import controller from '../../modules/user/user.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const UserRouter = Router();
// UserRouter.use(jwtAuth('administrator', 'co-administrator'));

UserRouter
  .post('/registration',upload.any(), controller.registrationUser)
  .post('/login', controller.loginUser)
  .get('/', controller.getAllUserPagination)
//   .get('/active', controller.getAllActiveUser)
//   .get('/routine', controller.getNotUseActiveUser);

UserRouter
  .route('/:id')
  .get(controller.getSingleUser)
//   .put(upload.any(), controller.updateUser) //not implemented yet
//   .delete(controller.deleteUser);

//   UserRouter
//   .put('/:id/status', controller.updateUserStatus)

export default UserRouter;
