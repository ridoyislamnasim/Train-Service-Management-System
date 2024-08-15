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
		const ticket = await this.#repository.createTicket(payload, session);
		return ticket;
	}
	async getAllTicket(query) {
		const ticket = await this.#repository.getAllTicket(query);
		return ticket;
	}


	async getSingleTicket(id) {
        const ticket = await this.#repository.getSingleTicket(id);
        if (!ticket) throw new NotFoundError(`Ticket not found by id`);
        return ticket;
    }
	
	async updateTicket(payload , id) {
		const ticket = await this.#repository.updateTicket(payload,id);
		return ticket;
	}

    async cancleTicket(session,id) {
        const ticket = await this.#repository.cancleTicket(session,id);
        if (!ticket) throw new NotFoundError(`Ticket not found by id`);
        return ticket;
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

export default new TicketService(TicketRepository, 'ticket');
