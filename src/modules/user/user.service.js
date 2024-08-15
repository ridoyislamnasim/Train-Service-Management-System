import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import bcrypt from "bcryptjs";
import {
  convertFileNameWithPdfExt,
  convertFileNameWithWebpExt,
  convertImgArrayToObject,
  convertObjOriginalImgNameWithWebpExt,
  uploadWorker,
} from '../../middleware/upload/index.js';
import isArrayElementExist from '../../utils/isArrayElementExist.js';
import userRepository from './user.repository.js';
import { isMainThread } from 'worker_threads';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

class UserService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}
    async registrationUser(payload, files, session) {
        const { email, password, name } = payload;
        const authAuth = await this.#repository.getAuthByEmail(email);
        if (authAuth) throw new NotFoundError("this email already exist");
        const user = await this.#repository.registrationUser(payload, files, session);
        return user;
    }
    async loginUser(payload, files, session) {
        const { email, password } = payload;
        const authAuth = await this.#repository.getUserByEmail(email);
        console.log("-----", authAuth)
        if (!authAuth) throw new NotFoundError('unauthorized access');
        console.log(password)
        console.log(authAuth?.password)
        // check authAuth password to match hash current password
        const isPasswordMatch = await bcrypt.compare(password, authAuth?.password);
        if (!isPasswordMatch) throw new NotFoundError('unauthorized access');
        const user_info_encrypted = {
            id: authAuth._id || null,
            name: authAuth.user_name || null,
            email: authAuth.email || null,
            role: authAuth.role || null,
        };

        const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
        const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });

        return {
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
            user: user_info_encrypted,
        };
    }

	async getAllUserPagination(payload,session) {
		const user = await this.#repository.getAllUserPagination(payload, session);
		return user;
	}

    async getAllUser(session) {
		const user = await this.#repository.getAllUser( session);
		return user;
	}

	async getSingleUser(id) {
        const user = await this.#repository.getSingleUser(id);
        if (!user) throw new NotFoundError(` user not found by id`);
        return user;
    }

	async deleteUser(id) {
        const user = await this.#repository.deleteUser(id);
        if (!user) throw new NotFoundError(` user not found by id`);
        return user;
    }

	async updateUser(payload,id , session) {
        const { user } = payload;
		
		console.log(payload)// botn are required
		if (!user) {
            throw new NotFoundError('fill up required fields');
        }

        // check if user_id is already exist without this user
        const isUserIdExist = await this.#repository.isUserExistWithoutThisId(user, id);
        if (isUserIdExist) {
            throw new NotFoundError('user already exist');
        }


		const userResult = await this.#repository.updateUser(payload,id , session);
    if (!userResult) throw new NotFoundError(` user not found by id`);
		return userResult;
	}

	async updateUserStatus( payload, id ) {
        const userStatusUpdate = await this.#repository.updateUserStatus(payload,id);
        if (!userStatusUpdate) throw new NotFoundError(` user not found by id`);
        return userStatusUpdate;
      }
}

export default new UserService(userRepository, 'user');
