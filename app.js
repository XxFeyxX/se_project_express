const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.user = {
    _id: "6a6e5a311e31d80889689ae1",
  };

  next();
});

app.use("/", router);

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
