import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const LandingPage = () => {
  const [sampleProducts, setSampleProducts] = useState([]);
  const navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQ1Njc0OGJhNDM4Y2U5MDY2YjkxZCIsInVzZXJFbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzExNDM0NDI2LCJleHAiOjE3MTE1MjA4MjZ9.4QagHI8sjpzt5G0NcDr2RXHWew-ms3ELQWm9EoJMEts";

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
      setSampleProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 h-screen">
        <Navbar />
        <div className="grid grid-cols-2 gap-6 mx-12 justify-start items-start mt-12">
          <div className="flex flex-col justify-start gap-4 mt-16">
            <h2 className="text-4xl capitalize p-2 font-bold tracking-wide">
              Design Your Comfort Zone
            </h2>
            <div className="tracking-wider text-xl text-medium p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              at sed omnis corporis doloremque possimus velit! Repudiandae nisi
              odit, aperiam odio ducimus, obcaecati libero et quia tempora
              excepturi quis alias?
            </div>
            <button className="btn btn-primary max-w-xs w-max uppercase my-2 mx-2">
              Shop Now
            </button>
          </div>
          <div className=" mt-4 w-full h-full">
            <img
              //src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
              //className="w-22 h-32 object-cover"
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start place-items-center gap-4 bg-neutral text-white p-4 py-12">
        <h2 className="text-center text-3xl font-semibold capitalize tracking-wider py-6">
          Featured Products
        </h2>
        <div className="py-4 grid grid-cols-3 gap-6">
          {sampleProducts?.products?.slice(0, 3)?.map((product) => {
            return (
              <div className="bg-slate-950 rounded-md p-0 max-w-sm max-h-sm h-max">
                <div className="">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-md"
                    // width={360}
                    // height={130}
                  />
                </div>

                <div className="flex justify-between capitalize p-2">
                  <h2 className="tracking-wider">{product.title}</h2>
                  <p>$ {product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary max-w-xs w-max uppercase my-2 mx-2"
          onClick={() => {
            navigate("/home");
          }}
        >
          All Products
        </button>
      </div>
    </>
  );
};

export default LandingPage;
