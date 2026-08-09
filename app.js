const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

const clothingItemsRouter = require("./routes/clothingItems");
const usersRouter = require("./routes/users");

const { createUser, login } = require("./controllers/users");

const { getClothingItems } = require("./controllers/clothingItems");

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

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getClothingItems);

app.use(auth);

app.use("/users", usersRouter);
app.use("/items", clothingItemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
