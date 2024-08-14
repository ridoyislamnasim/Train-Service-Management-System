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
import batchRepository from './user.repository.js';
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
		const batch = await this.#repository.getAllUserPagination(payload, session);
		return batch;
	}

    async getAllUser(session) {
		const batch = await this.#repository.getAllUser( session);
		return batch;
	}

	async getSingleUser(id) {
        const batch = await this.#repository.getSingleUser(id);
        if (!batch) throw new NotFoundError(` batch not found by id`);
        return batch;
    }

	async deleteUser(id) {
        const batch = await this.#repository.deleteUser(id);
        if (!batch) throw new NotFoundError(` batch not found by id`);
        return batch;
    }

	async updateUser(payload,id , session) {
        const { batch } = payload;
		
		console.log(payload)// botn are required
		if (!batch) {
            throw new NotFoundError('fill up required fields');
        }

        // check if batch_id is already exist without this user
        const isUserIdExist = await this.#repository.isUserExistWithoutThisId(batch, id);
        if (isUserIdExist) {
            throw new NotFoundError('batch already exist');
        }


		const batchResult = await this.#repository.updateUser(payload,id , session);
    if (!batchResult) throw new NotFoundError(` batch not found by id`);
		return batchResult;
	}

	async updateUserStatus( payload, id ) {
        const batchStatusUpdate = await this.#repository.updateUserStatus(payload,id);
        if (!batchStatusUpdate) throw new NotFoundError(` batch not found by id`);
        return batchStatusUpdate;
      }
}

export default new UserService(batchRepository, 'batch');
