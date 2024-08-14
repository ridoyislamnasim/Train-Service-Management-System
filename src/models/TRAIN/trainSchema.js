import mongoose from "mongoose";
const trainSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    number: {
      type: String,
      required: true,
    },
    stops: [
      {
        station: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Station',
          required: true
        },
        order: {
          type: Number,
          required: true
        }
      }
    ],
    fareRatePerStop: {
      type: Number,
      required: true
    },
    daysOfOperation: {
      type: [String], 
      required: true
    },
  }, { timestamps: true });
  
  export const TrainSchema = mongoose.model('Train', trainSchema);
  