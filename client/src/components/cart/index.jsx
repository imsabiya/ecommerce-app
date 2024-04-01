import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userObj = JSON.parse(sessionStorage.getItem("user"));

  const [ordersData, setOrdersData] = useState({});

  const fetchOrdersDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //params: { ...paramsData },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/order`,
        config
      );
      const data = res.data;
      console.log(data);
      setOrdersData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  const deleteCartHandler = async () => {
    const getOrder = ordersData?.orders?.find(
      (order) => order.userId === userObj._id
    );

    const paramsData = {
      id: getOrder._id,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { ...paramsData },
    };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/order`,
        config
      );
      const data = res.data;
      console.log(data);
      fetchOrdersDetails();
    } catch (error) {
      //toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-screen">
        <Navbar />
        <div className="grid grid-cols-2 gap-14 justify-between place-items-start mx-8 mt-4 ">
          <div className="flex flex-col w-full ">
            <table className="table mx-2 mt-8 w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ordersData.orders?.length > 0 ? (
                  ordersData?.orders
                    ?.find((order) => order.userId === userObj._id)
                    ?.products?.map((product) => {
                      return (
                        <>
                          <tr>
                            <th className="capitalize">{product.title}</th>
                            <td>$ {product.price}</td>
                            <td>
                              <div className="flex items-center justify-start px-2 gap-2">
                                <button
                                  className="font-bold rounded-l text-xl"
                                  //onClick={decrement}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={product.quantity}
                                  className="w-12 text-right py-2 bg-slate-200 font-bold text-xl rounded-md"
                                  readOnly
                                />
                                <button
                                  className="font-bold rounded-r text-xl ml-2"
                                  //onClick={increment}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-red-600 hover:cursor-pointer"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </td>
                          </tr>
                        </>
                      );
                    })
                ) : (
                  <div className="text-lg tracking-wider font-bold mt-4 p-2 flex justify-center p-2">
                    No products in your cart.
                  </div>
                )}
              </tbody>
            </table>
            <div className="mx-6 mt-8 flex flex-wrap justify-between place-items-center">
              <button
                className="btn btn-neutral capitalize"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
              <button
                className="btn bg-red-400 capitalize"
                onClick={deleteCartHandler}
              >
                Clear Shopping Cart
              </button>
            </div>
          </div>
          <div className="border-2 flex flex-col justify-center place-items-center mx-2 mt-4 w-4/6 rounded-md">
            <table className="table mx-4 mt-8 bg-neutral-100 w-full">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Subtotal : </th>
                  <td>$ </td>
                </tr>
                <tr>
                  <th>Shipping Fee : </th>
                  <td>$ </td>
                </tr>
                <hr className="w-full" />
                <tr>
                  <th>Order Total : </th>
                  <td>$ </td>
                </tr>
              </tbody>
            </table>
            <button className="mt-8 btn btn-neutral w-full uppercase text-md">
              {token ? "Make Payment" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
