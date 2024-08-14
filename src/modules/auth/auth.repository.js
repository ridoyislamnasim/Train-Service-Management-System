
import BaseRepository from '../base/base.repository.js';


class AuthRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
   

}

export default new AuthRepository();
