const express = require("express");
const mongoose = require("mongoose");

const clothingItemsRouter = require("./routes/clothingItems");
const usersRouter = require("./routes/users");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: "6a6e5a311e31d80889689ae1",
  };

  next();
});

app.use("/items", clothingItemsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
