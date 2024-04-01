import React from "react";
import Navbar from "../LandingPage/Navbar";

const About = () => {
  return (
    <>
      <div className="flex flex-col gap-4 h-screen ">
        <Navbar />
        {/* <h2> About</h2> */}
        <div className="grid grid-cols-2 gap-2 mx-12 my-4 justify-start items-start mt-6">
          <div className="mt-4 w-full">
            <img
              src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
              alt="img"
              //width={420}
              className="w-4/6"
              //height={360}
            />
          </div>
          <div className="flex flex-col justify-start gap-4 mt-16">
            <h2 className="text-4xl capitalize p-2 font-bold tracking-wide">
              Our Story
            </h2>
            <div className="tracking-wider text-xl text-md p-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
              accusantium sapiente tempora sed dolore esse deserunt eaque
              excepturi, delectus error accusamus vel eligendi, omnis beatae.
              Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
              dolore, obcaecati incidunt sequi blanditiis est exercitationem
              molestiae delectus saepe odio eligendi modi porro eaque in libero
              minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
              ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
              similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
              iste.
            </div>
            {/* <button className="btn btn-primary max-w-xs w-max uppercase my-2 mx-2">
              Shop Now
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
