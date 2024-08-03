// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const app = express();
// const socket = require("socket.io");
// require("dotenv").config();
// app.use(cors());
// app.use(express.json());

// const MONGO_URL="mongodb+srv://bhavyaeprasadpokhrel:chatapp123@cluster0.ceuczvt.mongodb.net/chat"
// const port=8000
// const ORIGIN="https://chat-hj2nasbkq-bhavyae-pokhrels-projects.vercel.app/"
// mongoose
//   .connect(
//     MONGO_URL
//     , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connetion Successfull");
//   })
//   .catch((err) => {
//     console.log("error 39",err.message);
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// const server = app.listen(port, () =>
//   console.log(`Server started on ${port}`)
// );
// const io = socket(server, {
//   cors: {
//     origin:ORIGIN ,
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

const allowedOrigins = [
  "https://chat-hj2nasbkq-bhavyae-pokhrels-projects.vercel.app",
  // Add other allowed origins here if needed
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

const MONGO_URL = "mongodb+srv://bhavyaeprasadpokhrel:chatapp123@cluster0.ceuczvt.mongodb.net/chat";
const port = 8000;
const ORIGIN = "https://chat-hj2nasbkq-bhavyae-pokhrels-projects.vercel.app/";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("error 39", err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(port, () =>
  console.log(`Server started on ${port}`)
);

const io = socket(server, {
  cors: {
    origin: ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
