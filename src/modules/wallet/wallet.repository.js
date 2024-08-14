
import BaseRepository from "../base/base.repository.js";
import { UserSchema, } from "../../models/index.js";
import { NotFoundError } from "../../utils/errors.js";


class WalletRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async crditWallet(payload, session) {
        const { user,amount } = payload;
        // ceck USER EXIT OR NOT
        if (!amount ) throw new NotFoundError("Amount is required");
        const userExists = await this.#model.exists({ _id: user });
        if (!userExists) throw new NotFoundError("User does not exist");
        const wallet = await this.#model.findByIdAndUpdate(user, {
            $inc: { 'wallet.balance': amount },
            $push: {
                'wallet.transactions': {
                    amount: amount,
                    type: 'credit',
                    date: new Date(),
                }
            }
        }, { new: true, session });
        return wallet;
       
    }

    async getUserAllTransactions(query) {
        const { user } = query;
        if (!user) throw new NotFoundError("User id is required");
        const userExists = await this.#model.exists({ _id: user });
        if (!userExists) throw new NotFoundError("User does not exist");
        const userTransactions = await this.#model.findById(user, { 'wallet.transactions': 1 });
        return userTransactions.wallet.transactions;
    }
    

}

export default new WalletRepository(UserSchema);