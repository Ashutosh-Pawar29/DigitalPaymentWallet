const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true }, // Credit or Debit
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  discount: { type: Number, required: true }, // Discount percentage or amount
});

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 }, // Wallet balance
  transactions: [transactionSchema], // Array of transactions
  cashbackEarned: { type: Number, default: 0 },
  offers: [offerSchema], // Array of offers
  notifications: [notificationSchema], // Array of notifications
});

const mainUserData = mongoose.model("mainUserData", userSchema);

module.exports = mainUserData;
