const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clothingItemsRouter = require("./routes/clothingItems");
const usersRouter = require("./routes/users");

const auth = require("./middlewares/auth");

const { createUser, login } = require("./controllers/users");

const { getClothingItems } = require("./controllers/clothingItems");

const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

// Public routes
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getClothingItems);

// Everything below this line requires authorization
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
