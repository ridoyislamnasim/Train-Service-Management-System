import mongoose from "mongoose";
// import { TicketSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import { TicketSchema, TrainSchema, UserSchema } from "../../models/index.js";
import { NotFoundError } from "../../utils/errors.js";


class TicketRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createTicket(payload, session) {
        const { user, train,
            startStation, endStation,
            seatNumber, journeyDate } = payload;
        if (!user ||!train ||!startStation ||!endStation ||!seatNumber ||!journeyDate) throw new NotFoundError('User, train, startStation, endStation, seatNumber, journeyDate are required');


        const trainExists = await TrainSchema.findById(train);
        if (!trainExists) throw new NotFoundError('Train not found');

        const startStationId = new mongoose.Types.ObjectId(startStation);
        const endStationId = new mongoose.Types.ObjectId(endStation);
        const startStop = trainExists.stops.find(stop => stop.station.equals(startStationId));
        const endStop = trainExists.stops.find(stop => stop.station.equals(endStationId) );
        if (!startStop || !endStop) throw new NotFoundError("StartStop and EndStop not found");


        const startIndex = startStop.order;
        const endIndex = endStop.order;
        const numberOfStops = Math.abs(endIndex - startIndex);
        const fare = numberOfStops * trainExists.fareRatePerStop;

        const userInfo = await UserSchema.findOne({ _id:user });
        const wallet = userInfo.wallet
        if (wallet.balance < fare) throw new NotFoundError('Insufficient balance');

        await UserSchema.findByIdAndUpdate(user, {
            $inc: { 'wallet.balance': -fare },
            $push: {
                'wallet.transactions': {
                    amount: fare,
                    type: 'debit',
                    date: new Date()
                }
            }
        }, { session });

        const ticket = new this.#model({
            user: user,
            train: train,
            startStation: startStation,
            endStation: endStation,
            seatNumber: seatNumber,
            journeyDate: new Date(journeyDate),
            fare: fare,
        });
        const savedTicket = await ticket.save({ session });

        await UserSchema.findByIdAndUpdate(user, {
            $push: {
                'tickets': savedTicket._id
            }
        }, { session });

        return savedTicket;

    }

    async updateTicket(payload,id, session) {
        const {user, train, startStation, endStation, seatNumber, journeyDate } = payload;
        if (!user ||!train ||!startStation ||!endStation ||!seatNumber ||!journeyDate) throw new NotFoundError('User, train, startStation, endStation, seatNumber, journeyDate are required');

        const ticket = await this.#model.findOne({ _id: id, user: user });
        if (!ticket) throw new NotFoundError('Ticket not found');

        const trainINFO = await TrainSchema.findById(ticket.train);
        if (!trainINFO) throw new NotFoundError('Train not found');

        const startStationId = new mongoose.Types.ObjectId(startStation);
        const endStationId = new mongoose.Types.ObjectId(endStation);
        const startStop = trainINFO.stops.find(stop => stop.station.equals(startStationId));
        const endStop = trainINFO.stops.find(stop => stop.station.equals(endStationId));
        if (!startStop || !endStop) throw new NotFoundError("StartStop and EndStop not found");

        const startIndex = startStop.order;
        const endIndex = endStop.order;
        const numberOfStops = Math.abs(endIndex - startIndex);
        const newFare = numberOfStops * trainINFO.fareRatePerStop;

        const fareDifference = newFare - ticket.fare;

        if (fareDifference !== 0) {
            const transactionType = fareDifference > 0 ? 'debit' : 'credit';
            const transactionAmount = Math.abs(fareDifference);
        
            if (transactionType === 'debit') {
                const userInfo = await UserSchema.findById(user);
                if (userInfo.wallet.balance < transactionAmount) {
                    throw new Error('Insufficient balance');
                }
            }
        
            await UserSchema.findByIdAndUpdate(user, {
                $inc: { 'wallet.balance': transactionType === 'debit' ? -transactionAmount : transactionAmount },
                $push: {
                    'wallet.transactions': {
                        amount: transactionAmount,
                        type: transactionType,
                        date: new Date()
                    }
                }
            }, { session });
        }

        const updatedTicket = await this.#model.findByIdAndUpdate(id, {
            startStation: startStationId,
            endStation: endStationId,
            seatNumber: seatNumber,
            journeyDate: new Date(journeyDate),
            fare: newFare,
        }, { new: true, session });

        return updatedTicket;
    }

    async cancleTicket(session, id) {
         const ticket = await this.#model.findOne({ _id: id });
         if (!ticket) throw new NotFoundError('Ticket not found');
 
         const train = await TrainSchema.findById(ticket.train);
         if (!train) throw new NotFoundError('Train not found');
 
         const refundAmount = ticket.fare;

         await UserSchema.findByIdAndUpdate(ticket.user, {
             $inc: { 'wallet.balance': refundAmount },
             $push: {
                 'wallet.transactions': {
                     amount: refundAmount,
                     type: 'refund',
                     date: new Date()
                 }
             }
         }, { session });
 
         await UserSchema.findByIdAndUpdate(ticket.user, {
             $pull: { tickets: id }
         }, { session });
 
        const data = await this.#model.deleteOne({ _id: id }, { session });
        return data ;
 
    }

    async getSingleTicket(id) {
        try {
            const foundTicket = await this.#model.findById(id)
            .populate('user')
            .populate('train')
            .populate({
                path: 'startStation endStation', 
                select: 'name'
            });
            if (!foundTicket) {
                throw new Error('Ticket not found');
            }
            return foundTicket;
        } catch (error) {
            console.error('Error finding ticket:', error);
            throw error;
        }
    }

    async getAllTicket(query) {
        try {
            const ticket = await pagination(query, async (limit, offset, sortOrder) => {
                const ticketsPromise = this.#model.find({})
                    .sort({  }) 
                    .skip(offset)
                    .limit(limit)
                    .populate('user')
                    .populate('train')
                    .populate({
                        path: 'startStation endStation', 
                        select: 'name'
                    })
                    .exec();
                const totalTicketsPromise = this.#model.estimatedDocumentCount().exec();

                const [tickets, totalTickets] = await Promise.all([ticketsPromise, totalTicketsPromise]);

                return { doc: tickets, totalDoc: totalTickets };
            });
            return ticket;
        } catch (error) {
            console.error('Error finding all tickets:', error);
            throw error;
        }

    }

    async getSingleUserAllTicket(session, id){
        console.log('id',id);
        const tickets = await this.#model.find({ user: id })
        .populate({
            path: 'train', 
            select: 'name number stops fareRatePerStop'
        }).populate({
            path: 'startStation endStation', 
            select: 'name'
        });
        return tickets;
    }



}

export default new TicketRepository(TicketSchema);