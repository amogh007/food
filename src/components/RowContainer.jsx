import React from "react";
import {MdShoppingBasket} from "react-icons/md"
import { motion } from "framer-motion";

const RowContainer = ({ flag }) => {
  return (
    <div
      className={`w-full my-12  ${
        flag ? "overflow-x-scroll" : "overflow-x-hidden"
      }`}
    >
      <div className="w-300 md:w-225 h-auto  bg-cardOverlay shadow-md backdrop-blur-lg my-12">
        <div className="w-full flex items-centre justify-between">
          <motion.img
          whileHover={{scale:1.2}}
            src="https://firebasestorage.googleapis.com/v0/b/restaurantapp-ae337.appspot.com/o/images%2F1666344941370-i2.png?alt=media&token=24c4e741-368d-439e-a045-265d3aab6166"
            alt=""
            className="w-40 -mt-8"/>
            <motion.div whileTap={{scale:0.75}}className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md">
                <MdShoppingBasket className="text-white"/>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RowContainer;
