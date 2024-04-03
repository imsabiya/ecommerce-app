const Order = require("../models/order-model");

const addOrder = async (req, res) => {
  const { products, bill, name, address, city, country, zipCode } = req.body;

  const userId = req?.user?.id;
  if (userId) {
    try {
      console.log("try");
      const findOrderByUserId = await Order.find({ userId });
      //console.log(findOrderByUserId, "check");
      if (findOrderByUserId.length != 0) {
        console.log("some data is there", findOrderByUserId);
        const id = findOrderByUserId[0]._id.toString();
        console.log("id", id, [...findOrderByUserId[0].products, ...products]);
        //const mergeProducts = [...findOrderByUserId[0].products, ...products];
        const findDups = findOrderByUserId[0].products.filter((obj1) =>
          products.some((obj2) => obj1.productId === obj2.productId)
        );
        const findDuplicateProduct = products.filter((p1) =>
          findOrderByUserId[0].products.some(
            (p2) => p1.productId === p2.productId
          )
        );
        console.log(findDups, findDuplicateProduct, "dups");
        const order = await Order.findByIdAndUpdate(
          id,
          {
            products: [...findOrderByUserId[0].products, ...products],
            bill: bill,
            name,
            address,
            city,
            country,
            zipCode,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ message: `Order created successfully`, data: order });
      } else {
        console.log("catch");

        const newOrder = new Order({
          userId: userId,
          products,
          bill: bill,
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
      }
    } catch (err) {
      console.log(err, "err");
      res.status(400).json({ error: err });
    }
  } else {
    res.status(400).json({ error: "Login Required!" });
  }
};

const getOrderById = async (req, res) => {
  const userId = req?.user?.id;
  console.log(userId);
  if (userId) {
    const ordersList = await Order.find({ userId: userId });
    //console.log(ordersList, "ordersList");
    res.status(200).json({
      orders: ordersList.length > 0 ? ordersList : {},
      totalOrders: ordersList.length,
    });
  } else {
    res.status(400).json({ error: "Login Required!" });
  }
};

const deleteCompleteOrder = async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(401).json({ message: `Order doesn't exist` });
    }
    return res
      .status(200)
      .json({ message: "Order deleted successfully", data: order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProductFromOrder = async (req, res) => {
  const { id } = req.query;
  const userId = req?.user?.id;
  if (userId) {
    const ordersList = await Order.find({ userId: userId });
    console.log(ordersList, "ordersList");
  } else {
    res.status(400).json({ error: "Login Required!" });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  deleteCompleteOrder,
  deleteProductFromOrder,
};
