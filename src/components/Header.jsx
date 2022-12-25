import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
   const logOut=()=>{
    setIsMenu(false);
    localStorage.clear()
    dispatch({ type: actionType.SET_USER,user:null})
   }
  return (
    <header className="fixed w-screen z-50 p-3 px-4 md:p-6 md:px-16 bg-primary ">
      {/*dektop  */}
      <div className="hidden md:flex w-full h-full justify-between ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=>setIsMenu(false)}>
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=>setIsMenu(false)}>
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=>setIsMenu(false)}>
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=>setIsMenu(false)}>
              Services
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{  scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{  scale: 0.6 }}
                className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute  top-12 right-0"
              >
                {user && user.email === "sudhanmaga@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={()=>setIsMenu(false)}>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logOut}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile version  */}
      <div className="flex item-center justify-between md:hidden w-full h-full p-4">
        
        <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute  top-12 right-0"
            >
              {user && user.email === "sudhanmaga@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex item-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex   flex-col "
              >
                <li className="px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                  Home
                </li>
                <li className="px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                  Menu
                </li>
                <li className="px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                  About Us
                </li>
                <li className="px-4 py-2 gap-3 text-base text-textColor hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                  Services
                </li>
              </ul>
              <p className="rounded-md shadow-md m-2 p-2 px-4 py-2 flex item-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logOut}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
