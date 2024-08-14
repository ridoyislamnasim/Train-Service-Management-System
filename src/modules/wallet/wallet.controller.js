import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import walletService from "./wallet.service.js";

class WalletController {
    crditWallet = withTransaction(async(req,res,next, session)=>{
        const userID = req?.user?.id
        const payload = {
            user:userID,
            amount:req.body?.amount,
        }

        const wallet = await walletService.crditWallet(payload, session);
        const resDoc = responseHandler(201, 'Wallet Create Successfully', wallet);
        res.status(resDoc.statusCode).json(resDoc);
    })
    getUserAllTransactions = catchError(async(req,res,next)=>{
        const userID = req?.user?.id
        const { page, limit, order} = req.query;
        let query={
            page: page,
            limit: limit,
            order: order,
            user: userID,
        }
        const transactions = await walletService.getUserAllTransactions(query);
        const resDoc = responseHandler(200, 'User All Transactions get Successfully', transactions);
        res.status(resDoc.statusCode).json(resDoc);
    });

}

export default new WalletController();