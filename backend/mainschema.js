const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  discount: { type: Number, required: true },
});

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const splitRequestSchema = new mongoose.Schema({
  requester: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
  cashbackEarned: { type: Number, default: 0 },
  offers: [offerSchema],
  notifications: [notificationSchema],
  splitRequests: [splitRequestSchema],
});

const mainUserData = mongoose.model("mainUserData", userSchema);

module.exports = mainUserData;
