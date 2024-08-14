import { Router } from 'express';
import controller from '../../modules/auth/auth.controller.js';
import { upload } from '../../middleware/upload/upload.js';

const AuthRouter = Router();
AuthRouter
  .post('/teacher', controller.createAuth)

export default AuthRouter;
