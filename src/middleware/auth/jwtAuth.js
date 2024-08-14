// import { SemesterSchema } from '../../models/index.js';
import { BadRequestError } from '../../utils/errors.js';
import { verifyAccessToken } from '../../utils/jwt.js';

const jwtAuth = (...role) => {
return async (req, res, next) => {

  // console.log(req.headers);
  
  try {
    const bearer = req.headers.authorization || req.headers.Authorization;
    // console.log(req.headers);
    if (!bearer || !bearer.startsWith('Bearer ')) {
      throw new BadRequestError('token not found');
    }
    const token = bearer.split('Bearer ')[1].trim();
    const payload = await verifyAccessToken(token);
    // console.log("payload: ", payload)
    // console.log("payload.userInfo.role: ", payload.userInfo.user_info_encrypted.role)
    // console.log("role: ", role)
    if (!payload) throw new BadRequestError('unauthorized');
          if (!role.includes(payload.userInfo.user_info_encrypted.role)) {
        throw new BadRequestError('unauthorized');
      }
    req.user = { ...payload.userInfo.user_info_encrypted };

    next();
  } catch (err) {
    next(err);
  }
}
};
export default jwtAuth;


// import { BadRequestError } from '../../utils/errors.js';
// import { verifyAccessToken } from '../../utils/jwt.js';

// const jwtAuth = (...role) => { // rider branch admin  merchant
//   return async (req, res, next) => {
//     try {
//       const bearer = req.headers.authorization || req.headers.Authorization;
//       console.log(bearer);
//       if (!bearer || !bearer.startsWith('Bearer ')) {
//         throw new BadRequestError('token not found');
//       }
//       const token = bearer.split('Bearer ')[1].trim();
//       const payload = await verifyAccessToken(token);
//       if (!payload) throw new BadRequestError('unauthorized');
//       console.log(payload)
//       console.log(payload.userInfo.user_type)
//       console.log(role)
//       if (!role.includes(payload.userInfo.user_type)) {
//         throw new BadRequestError('unauthorized');
//       }
//       req.user = { ...payload.userInfo };
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
// };

// export default jwtAuth;
