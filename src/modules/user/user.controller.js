import catchError from '../../middleware/errors/catchError.js';
import responseHandler from '../../utils/responseHandler.js';
import withTransaction from '../../middleware/transactions/withTransaction.js';
import UserService from './user.service.js';

class UserController {
  registrationUser = withTransaction(async (req, res, next, session) => {
    const { email, password, name } = req.body;
    const payload = {
      email,
      password,
      name,
    };

    const auth = await UserService.registrationUser(payload, session);
    const resDoc = responseHandler(201, 'registration successfully', auth);
    res.status(resDoc.statusCode).json(resDoc);
  });
  loginUser = withTransaction(async (req, res, next, session) => {
    const { email, password } = req.body;
    const payload = {
      email,
      password,
    };

    const auth = await UserService.loginUser(payload, session);
    const resDoc = responseHandler(201, 'login successfully', auth);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllUserPagination = withTransaction(async (req, res, next, session) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order
    }
    const batch = await UserService.getAllUserPagination(payload, session);
    const resDoc = responseHandler(200, 'User get successfully', batch);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleUser = catchError(async (req, res, next) => {
    const { id } = req.params;
    const batch = await UserService.getSingleUser(id);
    const resDoc = responseHandler(200, 'User get successfully', batch);
    res.status(resDoc.statusCode).json(resDoc);
  });


}

export default new UserController();
