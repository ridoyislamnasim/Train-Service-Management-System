import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import TrainRepository from './train.repository.js';
import { isMainThread } from 'worker_threads';
import {
  convertFileNameWithPdfExt,
  convertFileNameWithWebpExt,
  convertImgArrayToObject,
  convertObjOriginalImgNameWithWebpExt,
  uploadWorker,
} from '../../middleware/upload/index.js';
import isArrayElementExist from '../../utils/isArrayElementExist.js';
import bcrypt from 'bcryptjs';

class TrainService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}
	async createTrain(payload, session) {
    const {semester_ref} = payload;
    if (!semester_ref) throw new NotFoundError('semester must be defined');
		const course = await this.#repository.createTrain(payload, session);
		return course;
	}
	async getAllTrain(query) {
		const course = await this.#repository.getAllTrain(query);
		return course;
	}
  async getAllActiveTrain(payload) {
		const course = await this.#repository.getAllActiveTrain(payload);
		return course;
	}
  async getNotUseActiveTrain(payload) {
		const course = await this.#repository.getNotUseActiveTrain(payload);
		return course;
	}
	async getSingleTrain(id) {
        const course = await this.#repository.getSingleTrain(id);
        if (!course) throw new NotFoundError(`Train not found by id`);
        return course;
    }
	
	async updateTrain(payload , id) {
		const merchant = await this.#repository.updateTrain(payload,id);
		return merchant;
	}

    async deleteTrain(id) {
        const course = await this.#repository.deleteTrain(id);
        if (!course) throw new NotFoundError(`Train not found by id`);
        return course;
    }

    async updateTrainStatus(riderId, query) {
        let riderObj = {};
        if (query?.status) {
          riderObj.status = parseInt(query?.status);
        }
        const riderUpdate = await this.#repository.updateById(riderId, riderObj);
        if (riderUpdate[0] <= 0) throw new NotFoundError('Train Id not found');
        return riderUpdate;
    }

}

export default new TrainService(TrainRepository, 'course');
