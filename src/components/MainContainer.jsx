import React from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import {MdChevronLeft,MdChevronRight} from "react-icons/md"
import RowContainer from "./RowContainer";
function MainContainer() {
  return (
    <div className="flex flex-col w-full h-auto justify-center items-center ">
      <HomeContainer />
      <section className="w-full ">
        <div className="w-full flex items-centre justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-10">
            our fresh & healthy fruits
          </p>
          <div className="hidden md:flex items-centre gap-3 ">
            <motion.div whileTap={{scale:0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor:pointer transition:all duration-100 ease-in-out flex items-center justify-center">
              <MdChevronLeft className="text-lg text-white"/>
            </motion.div>
            <motion.div whileTap={{scale:0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor:pointer transition:all duration-100 ease-in-out flex items-center justify-center">
            <MdChevronRight className="text-lg text-white"/>
            </motion.div>
          </div>
        </div>
        <RowContainer flag={true}/>
      </section>
    </div>
  );
}

export default MainContainer;
