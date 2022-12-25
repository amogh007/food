import React from "react";
import Delivery from "../img/delivery.png";
import Hero from "../img/heroBg.png";
import { heroData } from "../utils/data";

function HomeContainer() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col  items-center md:items-start justify-center gap-6 ">
        <div className="flex justify-center items-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike delivery
          </p>
          <div className="w-8 h-8 overflow-hidden rounded-full bg-white drop-shadow-xl">
            <img
              src={Delivery}
              alt="Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            your city
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat,
          doloribus perspiciatis accusamus nulla officiis in illo magni
          accusantium ad? Voluptates ullam tempora nostrum eos, asperiores sunt
          quos nihil rem dolorum!
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto p-4 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img src={Hero} className="h-420 lg:w-auto w-full md:h-650 ml-auto" />
        <div className="flex justify-center items-center absolute w-full h-full top-0 left-0 lg:px-36 py-4 gap-4 flex-wrap">
          {heroData && heroData.map(n=>(
            <div key={n.id} className="lg:w-190  p-2 bg-cardOverlay backdrop-blur-md rounded-3xl p-2 flex flex-col items-center justify-center drop-shadow-lg">
            <img src={n.imageSrc} alt="i1" className=" w-20 lg:w-40 -mt-10 lg:-mt-20 " />
            <p className="text-base lg:text-xl text-textColor font-semibold mt-2 lg:mt-4">
              {n.name}
            </p>
            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
              {n.decp}
            </p>
            <p className="text-sm font-semibold text-headingColor">
              <span className="text-xs text-red-600">$</span>{n.price}
            </p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
