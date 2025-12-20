// api/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MODELE I ROUTES
const Cat = require("./models/Cat");
const catsRouter = require("./routes/cats");

app.use("/api/cats", catsRouter);

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "CAT PURRE API" });
});

// Mongo + start serwera
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cat_purre";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
