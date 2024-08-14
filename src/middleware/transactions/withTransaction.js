import mongoose from 'mongoose';
import catchError from '../errors/catchError.js';

const withTransaction = (handler) => {
    return catchError(async (req, res, next) => {
        // const transaction = await sequelize.transaction();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await handler(req, res, next, session);
            // await transaction.commit();
            await session.commitTransaction();
            session.endSession();
        } catch (error) {
            // await transaction.rollback();
            // next(err);
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    });
};

export default withTransaction;
