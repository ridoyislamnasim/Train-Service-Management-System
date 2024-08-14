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

  async bulkCreate(item) {
    const data = await this.#repository.bulkCreate(item);
    return data;
  }

  async findAll(query) {
    const data = await this.#repository.findAll(query);
    return data;
  }

  async findById(id, query) {
    const data = await this.#repository.findById(id, query);
    if (!data) throw new NotFoundError(`${this.serviceName} not found by id`);
    return data;
  }

  async findByPagination(query) {
    const data = await pagination(query, async (limit, offset, order) => {
      const query = {
        offset: offset,
        limit: limit,
        order: [['created_at', `${order}`]],
      };
      const { count: totalDoc, rows } =
        await this.#repository.findByPagination(query);
      const doc = rows.map(({ dataValues }) => dataValues);

      return { doc, totalDoc };
    });
    return data;
  }

  async findOne(query) {
    const data = await this.#repository.findOne(query);
    if (!data) throw new NotFoundError(`${this.serviceName} not found`);
    return data;
  }

  async updateById(id, item) {
    const data = await this.#repository.updateById(id, item);
    if (!data[0])
      throw new NotFoundError(`${this.serviceName} not found by id`);
    return data;
  }

  async updateOne(query, item) {
    const data = await this.#repository.updateOne(query, item);
    if (!data) throw new NotFoundError(`${this.serviceName} not found`);
  }

  async deleteById(id) {
    const data = await this.#repository.deleteById(id);
    if (!data) throw new NotFoundError(`${this.serviceName} not found by id`);
    return data;
  }

  async deleteOne(query) {
    const data = await this.#repository.deleteOne(query);
    if (!data) throw new NotFoundError(`${this.serviceName} not found by id`);
    return data;
  }
}

export default BaseService;
