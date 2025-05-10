const express = require("express");
//const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const app = express();
app.use(cors({}));
app.use(express.json({ limit: "20mb" }));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
const port = process.env.PORT || 5000;
require("dotenv").config();


app.use("/api/posts", postRoutes);


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const uri =
  "mongodb+srv://Rahman:omotayo112@cluster0.uccinz3.mongodb.net/blog?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
