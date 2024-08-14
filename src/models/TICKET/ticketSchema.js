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
    seatNumber: {
      type: String,
      required: true
    },
    journeyDate: {
      type: Date,
      required: true
    },
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
  