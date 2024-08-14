import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    transactions: [
      {
        amount: Number,
        date: {
          type: Date,
          default: Date.now
        },
        type: {
          type: String,
          enum: ['credit', 'debit'],
          required: true
        }
      }
    ]
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }
  ],
}, { timestamps: true });

export const UserSchema = mongoose.model('User', userSchema);
