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
		const train = await this.#repository.createTrain(payload, session);
		return train;
	}
	async getAllTrainPagination(query) {
		const train = await this.#repository.getAllTrainPagination(query);
		return train;

	}
  async getAllTrain() {
		const train = await this.#repository.getAllTrain();
		return train;
	}

	async getSingleTrain(id) {
        const train = await this.#repository.getSingleTrain(id);
        if (!train) throw new NotFoundError(`Train not found by id`);
        return train;
    }
	
	async updateTrain(payload , id) {
		const merchant = await this.#repository.updateTrain(payload,id);
		return merchant;
	}

    async deleteTrain(id) {
        const train = await this.#repository.deleteTrain(id);
        if (!train) throw new NotFoundError(`Train not found by id`);
        return train;
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

export default new TrainService(TrainRepository, 'train');
