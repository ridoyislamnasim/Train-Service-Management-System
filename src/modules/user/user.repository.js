import BaseRepository from '../base/base.repository.js';
import pagination from '../../utils/pagination.js';
import bcrypt from "bcryptjs";
import { UserSchema } from '../../models/index.js';

class UserRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
  async getAuthByEmail(email) {
    const isUserExist = await this.#model.exists({ email });
    return isUserExist;
  }
  async getUserByEmail(email) {
    const user = await this.#model.findOne({ email });
    return user;
  }

  async registrationUser(payload, files, session) {
    const { email, password, name } = payload;
    console.log('payload',payload);
    if (!email ||!password ) throw new Error('Missing required fields');
    const isUserExist = await this.getAuthByEmail(email);
    if (isUserExist) throw new Error('email already exist');
     const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new this.#model({ email, password: hashedPassword, name });
    const userObj = await user.save({
      session
    });
    return userObj;
  }

  async createUser(payload, session) {
    const { batch } = payload;

    let batchObj = new UserSchema({
      batch: batch,
    });
    const createUser = await batchObj.save({
      //  session 
    });
    return createUser;
  }

  async getSingleUser(id) {
    const user = await this.#model.findById(id)
    return user;
  }


  async getAllUserPagination(payload, session) {
    try {
      const user = await pagination(payload, async (limit, offset, sortOrder) => {
        const user = await UserSchema.find()
          .sort({ createdAt: sortOrder })
          .skip(offset)
          .limit(limit)
        // Count total documents
        const totalUsers = await UserSchema.countDocuments();

        return { doc: user, totalDoc: totalUsers };
      });

      return user;
    } catch (error) {
      console.error("Error getting user with pagination:", error);
      throw error;
    }
  }

  async getAllUser(session) {
    const user = await UserSchema.find({ status: true })
    return user;
  }


  async updateUser(payload, id, session) {
    const { batch } = payload;
    let updateObj = {
      batch: batch,
    };

    const updatedUser = await this.#model.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateObj,
        }
      },
      {
        // session, 
        new: true
      }
    );

    return updatedUser;

  }

  async updateUserStatus(payload, id) {

    const { status } = payload;
    console.log("status", status);
    console.log("status", typeof status);
    const updateUserStatus = await this.#model.findByIdAndUpdate(
      id,
      {
        $set: {
          status: status,
        }
      },
    );

    return updateUserStatus;

  }

  async deleteUser(id) {
    const batch = await this.#model.findByIdAndDelete(id);;

    if (!batch) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return { message: `User with ID ${id} successfully deleted.` };

  }

}

export default new UserRepository(UserSchema);
