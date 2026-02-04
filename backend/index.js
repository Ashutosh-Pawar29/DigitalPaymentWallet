require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("./validators"); // Import validation schemas
const z = require("zod");
const mainUserData = require("./mainschema");

const app = express();
app.use(express.json());
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://digital-payment-wallet-349kwmigo.vercel.app" // vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// IMPORTANT: handle preflight requests
app.options("*", cors());



const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = String(process.env.SECRET_KEY);

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Middleware: Authenticate User with JWT
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Get Funds Management Details
app.get("/fundsmanagement", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({
      balance: existingUser.balance,
      transactions: existingUser.transactions,
      linkedAccounts: ["Bank Account", "UPI", "Credit Card"],
    });
  } catch (error) {
    console.error("Error fetching funds management details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/wallet/add-money", authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await mainUserData.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update balance
    user.balance += amount;

    // Add transaction history
    const transaction = {
      amount,
      type: "credit",
      description: "Money added to wallet",
      date: new Date(),
    };
    user.transactions.push(transaction);

    // Add notification
    const notification = {
      message: `₹${amount} credited to your wallet.`,
      date: new Date(),
      isRead: false,
    };
    user.notifications.push(notification);

    await user.save();

    res.json({
      message: "Money added successfully",
      updatedBalance: user.balance,
      transaction,
    });
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/split", authenticateUser, async (req, res) => {
  try {
    const { users, totalAmount } = req.body;
    console.log(users, totalAmount);
    if (!Array.isArray(users) || users.length === 0 || !totalAmount) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const splitAmount = Number((totalAmount / (users.length + 1)).toFixed(2));
    const senderId = req.user.id;

    for (const identifier of users) {
      // You could match by mobile, email, or walletId based on your user schema
      const recipient = await  mainUserData.findOne({
        username: identifier
      });

      if (!recipient) {
        return res.status(404).json({ error: `User ${identifier} not found` });
      }   

      // Create a "request" in DB or trigger a notification
      recipient.notifications.push({
        type: "split_request",
        from: senderId,
        amount: splitAmount,
        message: `You owe ₹${splitAmount} to ${req.user.name}`,
        timestamp: new Date(),
      });

      await recipient.save();
    }

    return res.json({ message: "Split request sent successfully" });
  } catch (err) {
    console.error("Split Error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ Request Money Route
app.post("/api/request", authenticateUser, async (req, res) => {
  try {
    const { toUsername, amount, description } = req.body;

    if (!toUsername || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const sender = await mainUserData.findOne({ username: req.user.username });
    const receiver = await mainUserData.findOne({ username: toUsername });

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    const request = {
      requester: req.user.username,
      amount,
      description,
      date: new Date(),
      status: "pending",
    };

    // Push request to receiver's splitRequests and add a notification
    if (!receiver.splitRequests) receiver.splitRequests = [];
    receiver.splitRequests.push(request);

    receiver.notifications.push({
      message: `Payment request of ₹${amount} from ${req.user.username} for "${description}"`,
      date: new Date(),
      isRead: false,
    });

    await receiver.save();

    res.json({ message: "Request sent successfully", request });
  } catch (error) {
    console.error("Error in /api/request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/wallet/withdraw", authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await mainUserData.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct amount and update transaction history
    user.balance -= amount;
    const transaction = {
      amount,
      type: "debit",
      description: "Money withdrawn from wallet",
      date: new Date(),
    };
    user.transactions.push(transaction);

    // Add notification
    const notification = {
      message: `₹${amount} debited from your wallet.`,
      date: new Date(),
      isRead: false,
    };
    user.notifications.push(notification);

    await user.save();

    res.json({
      message: "Withdrawal successful",
      updatedBalance: user.balance,
      transaction,
    });
  } catch (error) {
    console.error("Error withdrawing money:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Request Split Payment Route
app.get("/requestsplit", authenticateUser, async (req, res) => {
  try {
    const { participants, amount, description } = req.body;

    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length === 0 ||
      !amount ||
      amount <= 0
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const requester = await mainUserData.findOne({
      username: req.user.username,
    });

    if (!requester)
      return res.status(404).json({ message: "Requester not found" });

    const splitAmount = amount / (participants.length + 1); // Including the requester
    const requestDetails = {
      requester: req.user.username,
      amount: splitAmount,
      description,
      status: "pending",
      date: new Date(),
    };

    // Notify each participant
    for (const participant of participants) {
      const user = await mainUserData.findOne({ username: participant });

      if (user) {
        user.notifications.push({
          message: `Payment request of ₹${splitAmount} from ${req.user.username} for "${description}".`,
          date: new Date(),
          isRead: false,
        });

        if (!user.splitRequests) {
          user.splitRequests = [];
        }
        user.splitRequests.push(requestDetails);

        await user.save();
      }
    }

    res.json({
      message: "Split payment request sent successfully",
      splitAmount,
      participants,
    });
  } catch (error) {
    console.error("Error processing split request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Scan & Pay Route
app.get("/scanpay", authenticateUser, async (req, res) => {
  try {
    const { receiverUsername, amount } = req.body;
    if (!receiverUsername || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const sender = await mainUserData.findOne({ username: req.user.username });
    const receiver = await mainUserData.findOne({ username: receiverUsername });

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Perform balance transfer
    sender.balance -= amount;
    receiver.balance += amount;

    // Log transactions
    const senderTransaction = {
      amount,
      type: "debit",
      description: `Scan & Pay to ${receiverUsername}`,
      date: new Date(),
    };

    const receiverTransaction = {
      amount,
      type: "credit",
      description: `Received via Scan & Pay from ${req.user.username}`,
      date: new Date(),
    };

    sender.transactions.push(senderTransaction);
    receiver.transactions.push(receiverTransaction);

    // Add notifications
    sender.notifications.push({
      message: `You sent ₹${amount} via Scan & Pay to ${receiverUsername}.`,
      date: new Date(),
      isRead: false,
    });

    receiver.notifications.push({
      message: `You received ₹${amount} via Scan & Pay from ${req.user.username}.`,
      date: new Date(),
      isRead: false,
    });

    await sender.save();
    await receiver.save();

    res.json({
      message: "Scan & Pay successful",
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
      senderTransaction,
      receiverTransaction,
    });
  } catch (error) {
    console.error("Error processing Scan & Pay:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Dashboard & Analysis Route
app.get("/analysis", authenticateUser, async (req, res) => {
  try {
    const user = await mainUserData.findOne({ username: req.user.username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const totalSpent = user.transactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalReceived = user.transactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const lastTransactions = user.transactions.slice(-5).reverse();

    res.json({
      balance: user.balance,
      totalSpent,
      totalReceived,
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Error fetching analysis data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/wallet/transfer", authenticateUser, async (req, res) => {
  try {
    const { receiverUsername, amount } = req.body;
    if (!receiverUsername || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const sender = await mainUserData.findOne({ username: req.user.username });
    const receiver = await mainUserData.findOne({ username: receiverUsername });

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Perform balance transfer
    sender.balance -= amount;
    receiver.balance += amount;

    // Log transactions
    const senderTransaction = {
      amount,
      type: "debit",
      description: `Money sent to ${receiverUsername}`,
      date: new Date(),
    };

    const receiverTransaction = {
      amount,
      type: "credit",
      description: `Money received from ${req.user.username}`,
      date: new Date(),
    };

    sender.transactions.push(senderTransaction);
    receiver.transactions.push(receiverTransaction);

    // Add notifications
    sender.notifications.push({
      message: `You sent ₹${amount} to ${receiverUsername}.`,
      date: new Date(),
      isRead: false,
    });

    receiver.notifications.push({
      message: `You received ₹${amount} from ${req.user.username}.`,
      date: new Date(),
      isRead: false,
    });

    await sender.save();
    await receiver.save();

    res.json({
      message: "Transfer successful",
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
      senderTransaction,
      receiverTransaction,
    });
  } catch (error) {
    console.error("Error transferring money:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get Recharge & Bill Payment Details
app.get("/recharge", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({
      balance: existingUser.balance,
      availableBills: [
        "Electricity",
        "Water",
        "Gas",
        "Mobile Recharge",
        "DTH",
        "Broadband",
      ],
    });
  } catch (error) {
    console.error("Error fetching recharge details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Recharge & Bill Payment Route
app.post("/transaction", authenticateUser, async (req, res) => {
  try {
    const { type, accountNumber, amount, paymentMethod, billType } = req.body;

    if (!accountNumber || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    if (existingUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct Balance
    existingUser.balance -= amount;

    // Create Transaction Entry
    const transaction = {
      amount,
      type: "debit",
      description:
        type === "recharge"
          ? `Mobile Recharge (${accountNumber})`
          : `${billType} Bill Payment`,
      date: new Date(),
    };

    existingUser.transactions.push(transaction);

    // Add notification
    const notification = {
      message: `₹${amount} debited for ${
        type === "recharge"
          ? `Mobile Recharge (${accountNumber})`
          : `${billType} Bill Payment`
      }.`,
      date: new Date(),
      isRead: false,
    };
    existingUser.notifications.push(notification);

    await existingUser.save();

    res.status(201).json({
      message: "Transaction successful",
      newBalance: existingUser.balance,
      transaction,
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get Wallet Balance
app.get("/balance", authenticateUser, async (req, res) => {
  try {
    // Find user based on the username extracted from JWT
    const user = await mainUserData.findOne({ username: req.user.username });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// GET /history - Get user's transaction history
app.get("/history", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.username;
    const userdata = await mainUserData.findOne({ username:userId })
    
    const history = userdata.transactions 
    res.json({ history });
  } catch (err) {
    console.error("Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch transaction history" });
  }
});


// ✅ Notifications API
app.get("/notifications", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ notifications: existingUser.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Wallet API (Balance & Transaction History)
app.get("/wallet", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({
      balance: existingUser.balance,
      history: existingUser.transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Cashback & Offers API
app.get("/cashback", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ cashback: existingUser.cashbackEarned });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/offers", authenticateUser, async (req, res) => {
  try {
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ offers: existingUser.offers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Redeem Cashback
app.post("/cashback/redeem", authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    const existingUser = await mainUserData.findOne({
      username: req.user.username,
    });

    if (!existingUser || existingUser.cashbackEarned < amount) {
      return res.status(400).json({ message: "Insufficient Cashback Balance" });
    }

    existingUser.cashbackEarned -= amount;
    await existingUser.save();

    res.json({
      message: `₹${amount} Cashback Redeemed`,
      cashback: existingUser.cashbackEarned,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ User Signin
app.post("/signin", async (req, res) => {
  try {
    // Validate request body
    const validatedData = signinSchema.parse(req.body);
    const { username, password } = validatedData;

    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: existingUser.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({
        message: "User signed in successfully",
        token,
        route: "/homepage",
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/wallet/transactions", authenticateUser, async (req, res) => {
  try {
    const user = await mainUserData.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ transactions: user.transactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ User Signup
app.post("/signup", async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { firstName, lastName, username, password } = validatedData;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    const mainUser = new mainUserData({
      username,
      balance: 0,
      transactions: [],
      cashbackEarned: 0,
      offers: [],
      notifications: [],
    });

    await newUser.save();
    await mainUser.save();

    const token = jwt.sign({ username: newUser.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({
        message: "User created successfully",
        token,
        route: "/homepage",
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

