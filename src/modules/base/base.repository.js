class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item) {
    // console.log('base repository item', item);
    const data = await this.#model.create(item);

    return data;
  }

  async bulkCreate(products) {
    const data = await this.#model.bulkCreate(products);
    return data;
  }

  async findAll(query = {}, transaction = {}) {
    const data = await this.#model.findAll(query, transaction);
    return data;
  }

  async count(query) {
    const count = await this.#model.count(query);
    return count;
  }

  async findByPagination(query) {
    console.log(query);
    const data = await this.#model.findAndCountAll({ ...query });
    return data;
  }

  async findById(id, query = {}) {
    const data = await this.#model.findByPk(id, query);
    return data;
  }

  async findOne(query, transaction = {}) {
    const data = await this.#model.findOne({
      where: { ...query },
    }, transaction);
    return data;
  }

  async updateById(id, item, transaction = {}) {
    const data = await this.#model.update(
      { ...item },
      {
        where: {
          id: id,
        },
      }, transaction);

    return data;
  }

  async updateOne(query, item) {
    const data = await this.#model.update(
      { ...item },
      {
        where: { ...query },
      }
    );
    return data;
  }

  async deleteById(id) {
    return await this.#model.destroy({
      where: {
        id: id,
      },
    });
  }

  async deleteOne(query) {
    return await this.#model.destroy({
      where: { ...query },
    });
  }
}

export default BaseRepository;
