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
    const {name, city, state} = payload;
    if (!name) throw new NotFoundError('station name must be defined');
		const station = await this.#repository.createStation(payload, session);
		return station;
	}
	async getAllStationPagination(query) {
		const station = await this.#repository.getAllStationPagination(query);
		return station;
	}

  async getSingleStation(id) {
    const station = await this.#repository.getSingleStation(id);
    if (!station) throw new NotFoundError(`Station not found by id`);
    return station;
}
async updateStation(payload , id) {
  const merchant = await this.#repository.updateStation(payload,id);
  return merchant;
}
    async deleteStation(id) {
        const station = await this.#repository.deleteStation(id);
        if (!station) throw new NotFoundError(`Station not found by id`);
        return station;
    }



}

export default new StationService(StationRepository, 'station');
