import { NotFoundError } from '../../utils/errors.js';
import pagination from '../../utils/pagination.js';

class BaseService {
  #repository;
  constructor(repository, serviceName) {
    this.#repository = repository;
    this.serviceName = serviceName;
  }
  async create(item) {
    const data = await this.#repository.create(item);
    return data;
  }
}

export default BaseService;
