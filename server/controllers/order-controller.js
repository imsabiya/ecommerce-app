const Order = require("../models/order-model");

const addOrder = async (req, res) => {
  const { products, bill, name, address, city, country, zipCode } = req.body;
  const userId = req.user.id;
  try {
    const newOrder = new Order({
      userId: userId,
      products,
      bill,
      name,
      address,
      city,
      country,
      zipCode,
    });
    await newOrder.save();
    res
      .status(200)
      .json({ message: `Order created successfully`, data: newOrder });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getOrderById = async (req, res) => {
  const userId = req.user.id;
  const ordersList = await Order.find({ userId: userId });
  res.status(200).json({ orders: ordersList, totalOrders: ordersList.length });
};

module.exports = { addOrder, getOrderById };
