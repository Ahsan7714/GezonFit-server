const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB } = require("./database/database");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileupload = require('express-fileupload'); 
const http = require("http");
const app = express();
const socketHandler = require("./socketio");

const PORT = 3000;

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173","https://gezondfit50plus.nl","https://gezonfit50plus.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(fileupload({
  useTempFiles: true,
  limits: { fileSize: 150 * 1024 * 1024 }, // Set file size limit to 150MB
}));

// Set JSON payload size limit
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));

app.use(cookieParser());

// Defining routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes  = require("./routes/MessageRoute")
const conversationRoutes = require("./routes/conversationRoute");

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/messages",messageRoutes);
app.use("/api/v1/conversation", conversationRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


const server = http.createServer(app);

// Set up WebSocket handling
socketHandler(server);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port " + PORT);
});

