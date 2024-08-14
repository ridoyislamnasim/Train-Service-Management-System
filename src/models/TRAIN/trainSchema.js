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
      unique: true
    },
    stops: [
      {
        station: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Station',
          required: true
        },
        arrivalTime: {
          type: Date,
          required: true
        },
        departureTime: {
          type: Date,
          required: true
        },
        // order
      }
    ],
    // fareRatePerStop
    daysOfOperation: {
      type: [String], 
      required: true
    },
  }, { timestamps: true });
  
  export const TrainSchema = mongoose.model('Train', trainSchema);
  