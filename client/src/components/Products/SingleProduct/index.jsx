import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../LandingPage/Navbar";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ1Njc0OGJhNDM4Y2U5MDY2YjkxZCIsInVzZXJFbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzExNTIyMjE2LCJleHAiOjE3MTE2MDg2MTZ9.QwQxgCGl8sTRR3tiPVuW5yxDt1r7lPvD5GDERPkjR88";

  const [product, setProduct] = useState({});

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
      console.log(data);
      setProduct(data.product);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 h-screen">
        <Navbar />
        {/* <h2> SingleProduct {id}</h2> */}
        <button
          className="btn btn-neutral max-w-xs w-max uppercase my-2 mx-12"
          onClick={() => {
            navigate("/products");
          }}
        >
          back to products
        </button>
        <div className="grid grid-cols-2 gap-8 mx-12 justify-start items-start mt-4">
          <div className="mt-2 w-full h-full">
            <img src={product.image} className="rounded-md" alt="img" />
          </div>
          <div className="flex flex-col justify-start gap-4 mt-4">
            <h2 className="text-4xl capitalize p-2 font-bold tracking-wide">
              {product.title}
            </h2>
            <div className="p-2">
              <p className="text-2xl font-semibold">$ {product.price}/- </p>
            </div>
            <div className="tracking-wider text-md text-medium p-2 leading-loose">
              {product.description}
            </div>
            <hr />
            <button className="btn btn-primary max-w-xs w-max uppercase my-2 mx-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
