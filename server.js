const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db.config");


// Load environment variables
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
// Connect Database
connectDB();
app.use("/api/auth", require("./routes/auth_route"));
app.get("/", (req, res) => {
  res.send("🚀 Server running & DB connected");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server started on port ${PORT}`);
});