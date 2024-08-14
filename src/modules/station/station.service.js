import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import StationRepository from './station.repository.js';
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

class StationService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}
	async createStation(payload, session) {
    const {semester_ref} = payload;
    if (!semester_ref) throw new NotFoundError('semester must be defined');
		const course = await this.#repository.createStation(payload, session);
		return course;
	}
	async getAllStation(query) {
		const course = await this.#repository.getAllStation(query);
		return course;
	}
  async getAllActiveStation(payload) {
		const course = await this.#repository.getAllActiveStation(payload);
		return course;
	}
  async getNotUseActiveStation(payload) {
		const course = await this.#repository.getNotUseActiveStation(payload);
		return course;
	}
	async getSingleStation(id) {
        const course = await this.#repository.getSingleStation(id);
        if (!course) throw new NotFoundError(`Station not found by id`);
        return course;
    }
	
	async updateStation(payload , id) {
		const merchant = await this.#repository.updateStation(payload,id);
		return merchant;
	}

    async deleteStation(id) {
        const course = await this.#repository.deleteStation(id);
        if (!course) throw new NotFoundError(`Station not found by id`);
        return course;
    }

    async updateStationStatus(riderId, query) {
        let riderObj = {};
        if (query?.status) {
          riderObj.status = parseInt(query?.status);
        }
        const riderUpdate = await this.#repository.updateById(riderId, riderObj);
        if (riderUpdate[0] <= 0) throw new NotFoundError('Station Id not found');
        return riderUpdate;
    }

}

export default new StationService(StationRepository, 'course');
