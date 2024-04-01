import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../LandingPage/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  const [previousOrdersData, setPreviousOrdersData] = useState({});

  const fetchProductDetails = async () => {
    const paramsData = {
      id: id,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { ...paramsData },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/product`,
        config
      );
      const data = res.data;
      //console.log(data);
      setProduct(data.product);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    getOrdersByUserId();
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    count > 1 && setCount(count - 1);
  };

  const getOrdersByUserId = async () => {
    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/order`,
        config
      );
      const data = res.data;
      console.log(data, "orderByUserId data");
      setPreviousOrdersData(data);
    } catch (err) {
      console.error(err);
    }
  };

  //console.log(previousOrdersData, "prev");

  const cartHandler = async () => {
    // const cartRequestData =
    //   previousOrdersData.orders.length > 0
    //     ? {
    //         ...previousOrdersData.orders,
    //         products: [
    //           ...previousOrdersData.orders?.products,
    //           {
    //             productId: id,
    //             title: product.title,
    //             quantity: count,
    //             price: product.price,
    //           },
    //         ],
    //         bill:
    //           Number(previousOrdersData.orders.bill) +
    //           Number(count * product.price),
    //         name: "test",
    //         address: "",
    //         city: "test",
    //         country: "test",
    //         zipCode: "test",
    //       }
    //     : {
    //         ...previousOrdersData.orders,
    //         products: [
    //           {
    //             productId: id,
    //             title: product.title,
    //             quantity: count,
    //             price: product.price,
    //           },
    //         ],
    //         bill: Number(count * product.price),
    //         name: "test",
    //         address: "test",
    //         city: "test",
    //         country: "test",
    //         zipCode: "test",
    //       };

    const cartRequestData = {
      ...previousOrdersData.orders,
      products: [
        {
          productId: id,
          title: product.title,
          quantity: count,
          price: product.price,
        },
      ],
      bill:
        previousOrdersData.orders?.length > 0
          ? Number(previousOrdersData.orders[0].bill) +
            Number(count * product.price)
          : Number(count * product.price),
      name: "test",
      address: "test",
      city: "test",
      country: "test",
      zipCode: "test",
    };

    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { ...cartRequestData },
    };

    try {
      const res = await axios(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/addOrder`,
        config
      );
      const data = res.data;
      //console.log(data, "orderByUserId data");
      setPreviousOrdersData(data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col gap-4 h-screen">
        <Navbar />
        <button
          className="btn btn-neutral max-w-xs w-max uppercase my-4 mx-12"
          onClick={() => {
            navigate("/products");
          }}
        >
          back to products
        </button>
        <div className="grid grid-cols-2 gap-8 mx-24 justify-start items-start mt-4">
          <div className="mt-2 w-full h-full">
            <img src={product.image} className="rounded-md" alt="img" />
          </div>
          <div className="flex flex-col justify-start gap-4 mt-4">
            <h2 className="text-4xl capitalize p-2 font-bold tracking-wide">
              {product.title}
            </h2>
            <div className="p-2">
              <p className="text-2xl font-bold text-orange-600">
                $ {product.price}/-
              </p>
            </div>
            <div className="tracking-wider text-md text-medium p-2 leading-loose">
              {product.description}
            </div>
            {/* <hr /> */}
            <div className="flex items-center justify-start px-2 gap-2">
              <button
                className="font-bold rounded-l text-3xl"
                onClick={decrement}
              >
                -
              </button>
              <input
                type="number"
                value={count}
                className="w-12 text-right py-2 bg-slate-200 font-bold text-2xl rounded-md"
                readOnly
              />
              <button
                className="font-bold rounded-r text-3xl ml-2"
                onClick={increment}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-primary max-w-xs w-max uppercase mb-2 mx-2"
              onClick={cartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
