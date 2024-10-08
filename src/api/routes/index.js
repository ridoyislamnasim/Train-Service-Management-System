import UserRouter from './user.route.js';
import StationRouter from './station.route.js';
import TrainRouter from './train.route.js';
import TicketRouter from './ticket.route.js';
import WalletRouter from './wallet.route.js';

import { Router } from 'express';
const rootRouter = Router();

rootRouter.use('/user', UserRouter);
rootRouter.use('/station', StationRouter);
rootRouter.use('/train', TrainRouter);
rootRouter.use('/ticket', TicketRouter);
rootRouter.use('/wallet', WalletRouter);


export default rootRouter;
