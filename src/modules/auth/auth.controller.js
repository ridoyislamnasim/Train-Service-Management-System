import catchError from '../../middleware/errors/catchError.js';
import responseHandler from '../../utils/responseHandler.js';
import withTransaction from '../../middleware/transactions/withTransaction.js';
import AuthService from './auth.service.js';

class AuthController {
  createAuth = withTransaction(async (req, res, next, session) => {
    const {  email, password, teacher_id,} = req.body;
    const payload = {
      email,
      password,
      teacher_id,
    };

    const auth = await AuthService.createAuth(payload, session);
    const resDoc = responseHandler(201, 'login successfully', auth);
    res.status(resDoc.statusCode).json(resDoc);
  });

 
}

export default new AuthController();
