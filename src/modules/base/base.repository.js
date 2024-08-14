class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item) {
    const data = await this.#model.create(item);

    return data;
  }

}

export default BaseRepository;
