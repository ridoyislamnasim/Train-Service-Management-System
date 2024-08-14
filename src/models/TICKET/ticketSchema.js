import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train',
      required: true
    },
    startStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true
    },
    endStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true
    },
    seatNumber: {
      type: String,
      required: true
    },
    journeyDate: {
      type: Date,
      required: true
    },
    // price: 

    fare: {
      type: Number,
      required: true
    },
    purchasedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  export const TicketSchema = mongoose.model('Ticket', ticketSchema);
  