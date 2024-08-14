import mongoose from "mongoose";
const stationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    
  }, { timestamps: true });
  
  export const StationSchema = mongoose.model('Station', stationSchema);

  