require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const mainRoutes = require("./routes/main.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.use("/api", mainRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
