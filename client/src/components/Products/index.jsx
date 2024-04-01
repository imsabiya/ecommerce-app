import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  const [paramFilters, setParamFilters] = useState({
    search: "",
    category: "All",
    company: "All",
    price: 0,
    freeShipping: false,
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // const fetchProducts = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     //params: { ...paramsData },
  //   };
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_ECOMMERCE_APP_URL}/getAllProducts`,
  //       config
  //     );
  //     const data = res.data;
  //     //console.log(data);
  //     setProductsData(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getFilteredProducts = async () => {
    const paramsData = {
      ...paramFilters,
      category: paramFilters.category === "All" ? "" : paramFilters.category,
      company: paramFilters.company === "All" ? "" : paramFilters.company,
    };
    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: { ...paramsData },
    };

    try {
      const res = await axios(
        `${process.env.REACT_APP_ECOMMERCE_APP_URL}/getAllProductsByFilters`,
        config
      );
      const data = res.data;
      setProductsData(data);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, "checked");
    const newValue = type === "checkbox" ? checked : value;
    setParamFilters((prev) => ({ ...prev, [name]: newValue }));
  };

  const changeCategory = (e) => {
    console.log(e.target.dataset.value, e.target);
    setParamFilters((prev) => ({
      ...prev,
      ["category"]: e.target.dataset.value,
    }));
  };

  const handleReset = (e) => {
    //e.preventDefault();
    e.stopPropagation();
    setParamFilters({
      search: "",
      category: "All",
      company: "All",
      price: 0,
      freeShipping: false,
    });
  };

  useEffect(() => {
    //fetchProducts();
    getFilteredProducts();
  }, [paramFilters]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col gap-4">
        <Navbar />
        {/* <h2 className="p-4 text-2xl font-semibold"> Products </h2> */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[25%_75%] lg:grid-cols-[18%_82%] gap-2 p-4">
          <div className="bg-slate-200 flex gap-2 justify-center place-items-start">
            <form className="card-body">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  name="search"
                  className="input input-bordered border-1 border-neutral-400"
                  //required
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text tracking-wider font-bold text-lg">
                    Category
                  </span>
                </label>
                <ul
                  className="flex flex-col justify-center place-items-start gap-2 capitalize"
                  name="category"
                  // onClick={(e) => changeCategory(e.target.value)}
                >
                  <li
                    data-value="All"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "All"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    all
                  </li>
                  <li
                    data-value="office"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "office"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    office
                  </li>
                  <li
                    data-value="living room"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "living room"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    living Room
                  </li>
                  <li
                    data-value="kitchen"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "kitchen"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    kitchen
                  </li>
                  <li
                    data-value="bedroom"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "bedroom"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    bedroom
                  </li>
                  <li
                    data-value="dining"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "dining"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    dining
                  </li>
                  <li
                    data-value="kids"
                    onClick={(e) => changeCategory(e)}
                    className={
                      paramFilters.category === "kids"
                        ? "underline tracking-wider underline-offset-8 hover:cursor-pointer"
                        : "hover:cursor-pointer"
                    }
                  >
                    kids
                  </li>
                </ul>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text tracking-wider font-bold text-lg">
                    Company
                  </span>
                </label>
                <select
                  className="select select-bordered border-1 border-indigo-400 capitalize"
                  name="company"
                  onChange={(e) => changeHandler(e)}
                >
                  <option value="All" selected>
                    All
                  </option>
                  <option value="marcos">marcos</option>
                  <option value="liddy">liddy</option>
                  <option value="ikea">ikea</option>
                  <option value="caressa">caressa</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text tracking-wider font-bold text-lg">
                    Price
                  </span>
                  <span>$ {paramFilters.price}</span>
                </label>
                <input
                  type="range"
                  name="price"
                  max={3099.99}
                  min={0}
                  step={0.99}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="flex gap-4 justify-start place-items-center">
                <label className="label">
                  <span className="label-text">Free Shipping</span>
                </label>
                <input
                  type="checkbox"
                  name="freeShipping"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="flex gap-2 justify-start place-items-end">
                <button
                  className="btn btn-error text-white w-full tracking-widest"
                  onClick={(e) => handleReset(e)}
                >
                  Clear Filters
                </button>
              </div>
            </form>
          </div>
          {productsData?.products?.length > 0 ? (
            <div className="bg-slate-300 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 p-8 pt-6 justify-center place-items-start rounded-md">
              {productsData?.products?.map((product) => {
                return (
                  <>
                    <div className="w-80 h-72 flex flex-col justify-between  rounded-md bg-slate-800">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-80 h-56 rounded-t-md"
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
          ) : (
            <div className="text-lg tracking-wider font-bold mt-12 pt-8 p-2 flex justify-center bg-slate-300  p-2">
              Sorry, no products matched your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
