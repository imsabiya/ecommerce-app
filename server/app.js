console.log("can do it");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product-model");
const productsData = require("./mockData/products.json");
const app = express();

app.use(cors());
app.use(express.json());

//connect to DB

mongoose.connect("mongodb://localhost:27017/ecommerce-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const populateDB = async () => {
  await Product.deleteMany();
  await Product.create(productsData)
    .then(() => {
      console.log(`Data inserted successfully`);
    })
    .catch((err) => {
      console.error(`Error inserting data into MongoDB`, err);
    });
};

populateDB();

// Routes

const userRoutes = require("./routes/user-routes");
const productRoutes = require("./routes/product-routes");
const orderRoutes = require("./routes/order-routes");
const authMiddleware = require("./middlewares/authMiddleware");

app.use(userRoutes);
app.use(productRoutes);
app.use(authMiddleware, orderRoutes);

// Listen to server

const port = 5000;
app.listen(port, () => {
  console.log(`server listening to ${port}`);
});
