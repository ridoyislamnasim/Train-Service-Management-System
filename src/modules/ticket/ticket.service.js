import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import TicketRepository from './ticket.repository.js';
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

class TicketService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}
	async createTicket(payload, session) {
		const course = await this.#repository.createTicket(payload, session);
		return course;
	}
	async getAllTicket(query) {
		const course = await this.#repository.getAllTicket(query);
		return course;
	}
  async getAllActiveTicket(payload) {
		const course = await this.#repository.getAllActiveTicket(payload);
		return course;
	}
  async getNotUseActiveTicket(payload) {
		const course = await this.#repository.getNotUseActiveTicket(payload);
		return course;
	}
	async getSingleTicket(id) {
        const course = await this.#repository.getSingleTicket(id);
        if (!course) throw new NotFoundError(`Ticket not found by id`);
        return course;
    }
	
	async updateTicket(payload , id) {
		const merchant = await this.#repository.updateTicket(payload,id);
		return merchant;
	}

    async deleteTicket(id) {
        const course = await this.#repository.deleteTicket(id);
        if (!course) throw new NotFoundError(`Ticket not found by id`);
        return course;
    }

    async updateTicketStatus(riderId, query) {
        let riderObj = {};
        if (query?.status) {
          riderObj.status = parseInt(query?.status);
        }
        const riderUpdate = await this.#repository.updateById(riderId, riderObj);
        if (riderUpdate[0] <= 0) throw new NotFoundError('Ticket Id not found');
        return riderUpdate;
    }

}

export default new TicketService(TicketRepository, 'course');
