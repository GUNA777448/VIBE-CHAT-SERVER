// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./utils/db.config");


// // Load environment variables
// dotenv.config();
// const app = express();
// // Middleware
// app.use(express.json());
// // Connect Database
// connectDB();
// app.use("/api/auth", require("./routes/auth_route"));
// app.get("/", (req, res) => {
//   res.send("🚀 Server running & DB connected");
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🌐 Server started on port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db.config");

dotenv.config();

const app = express();

/* ✅ CORS — THIS WAS MISSING */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* middleware */
app.use(express.json());

/* DB */
connectDB();

/* routes */
app.use("/api/auth", require("./routes/auth_route"));

app.get("/", (req, res) => {
  res.send("🚀 Server running & DB connected");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server started on port ${PORT}`);
});
