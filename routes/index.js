const router = require("express").Router();

const auth = require("../middlewares/auth");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getClothingItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
