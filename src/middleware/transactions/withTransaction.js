import mongoose from 'mongoose';
import catchError from '../errors/catchError.js';

const withTransaction = (handler) => {
    return catchError(async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await handler(req, res, next, session);
            await session.commitTransaction();
            session.endSession();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    });
};

export default withTransaction;
