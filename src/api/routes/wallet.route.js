import { Router } from 'express';
import controller from '../../modules/wallet/wallet.controller.js';
import jwtAuth from '../../middleware/auth/jwtAuth.js';

const WalletRouter = Router();
WalletRouter.use(jwtAuth('user'));

WalletRouter
  .post('/cradit', controller.crditWallet)
  .get('/transactions/:id', controller.getUserAllTransactions)

export default WalletRouter;
