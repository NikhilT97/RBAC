const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectToDatabase = require("./config/connectDB");
const logger = require("./Middleware/logger.middleware");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);

// ---------------------Routes -------------------

const authRoutes = require("./Routes/auth.routes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./Routes/task.routes");
app.use("/api/tasks", taskRoutes);

const adminRoutes = require("./Routes/admin.routes");
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// bad req path
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`server failed to start: ${error.message} `);
    process.exit(1);
  }
};

startServer();
