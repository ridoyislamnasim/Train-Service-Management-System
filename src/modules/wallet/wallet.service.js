import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import WalletRepository from './wallet.repository.js';


class WalletService extends BaseService {
	#repository;
	constructor(repository, serviceName) {
		super(repository, serviceName);
		this.#repository = repository;
	}
	async crditWallet(payload, session) {
		const wallet = await this.#repository.crditWallet(payload, session);
		return wallet;
	}
  async getUserAllTransactions(query) {
    const wallet = await this.#repository.getUserAllTransactions(query);
    return wallet;
  }
	
}

export default new WalletService(WalletRepository, 'wallet');
