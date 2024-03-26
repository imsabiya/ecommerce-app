import React, { useState } from "react";
import Navbar from "./Navbar";

const LandingPage = () => {
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
              {" "}
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
        <h2 className="text-center text-3xl font-semibold capitalize tracking-wider pt-4">
          Featured Products
        </h2>
        <div className=""></div>
        <button className="btn btn-primary max-w-xs w-max uppercase my-2 mx-2">
          All Products
        </button>
      </div>
    </>
  );
};

export default LandingPage;
