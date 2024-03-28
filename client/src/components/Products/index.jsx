import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ1Njc0OGJhNDM4Y2U5MDY2YjkxZCIsInVzZXJFbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzExNTIyMjE2LCJleHAiOjE3MTE2MDg2MTZ9.QwQxgCGl8sTRR3tiPVuW5yxDt1r7lPvD5GDERPkjR88";

  const fetchProducts = async () => {
    // const paramsData = {
    //   userId: user._id,
    // };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //params: { ...paramsData },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/getAllProducts`,
        config
      );
      const data = res.data;
      console.log(data);
      setProductsData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Navbar />
        <h2 className="p-4 text-2xl font-semibold"> Products </h2>
        <div className="container mx-2 grid grid-cols-[20%_80%] gap-2 w-full p-2">
          <div className="bg-slate-400">sidebar</div>
          <div className="bg-slate-300 w-full grid grid-cols-3 gap-12 p-8 pt-6">
            {productsData?.products?.map((product) => {
              return (
                <>
                  <div className="w-full flex flex-col justify-between  rounded-md bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-96 h-56 rounded-t-md"
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                    />
                    <div className="flex text-white justify-between place-items-center p-4">
                      <h2 className="capitalize tracking-widest">
                        {product.title}
                      </h2>
                      <h2 className="text-lg text-red-300">
                        $ {product.price}
                      </h2>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
