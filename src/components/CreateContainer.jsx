import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Md,
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdMoney,
  MdAttachMoney,
} from "react-icons/md";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config"
import { getAllFoodItems, saveItem } from "../utils/firebaseFunction";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

function CreateContainer() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState("");
  const [price, setPrice] = useState("");
  const [category,setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alerStatus, setAlerstatus] = useState("dangerous");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [{foodItem},dispatch]=useStateValue()
  

  const uploadImage = (e) => {
      setIsLoading(true)
      const imageFile=e.target.files[0]
      console.log(imageFile)
      const storageRef=ref(storage,`images/${Date.now()}-${imageFile.name}`)
      const uploadTak=uploadBytesResumable(storageRef,imageFile)
      uploadTak.on('state_changed',(snapshot) =>{
        const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
      },(error)=>{
        console.log(error)
        setFields(true)
        setMsg('error while uploading TRY AGAIN')
        setAlerstatus('danger')
        setTimeout(()=>{
          setFields(false)
          setIsLoading(false)
        },4000)
      },()=>{
        getDownloadURL(uploadTak.snapshot.ref).then((downloadURL)=>{
          setImageAsset(downloadURL)
          setFields(true)
          setIsLoading(false)
          setMsg('the image uploaded sucessfully')
          setAlerstatus('success')
          setTimeout(()=>{
            setFields(false)
          },4000)
        })
      })

  };
  const deleteImage = () => {
    setIsLoading(true)
    const delteRef=ref(storage,imageAsset)
    deleteObject(delteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
          setIsLoading(false)
          setMsg('the image deleted sucessfully')
          setAlerstatus('success')
          setTimeout(()=>{
            setFields(false)
          },4000)
      
    })
  };
  const saveDetails=()=>{
    setIsLoading(true)
    console.log(title,price,calorie,category,imageAsset)
    try{
      if((!title||!category||!price||!calorie||!imageAsset)){
        setFields(true)
      setMsg('required field cannot be empty')
      setAlerstatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
      }else{
        
        const data={id:`${Date.now()}`,title:title, category:category, price:price,imageUrl:imageAsset,qty:1}
        saveItem(data)
        setFields(true)
      setMsg('data updated sucesfully')
      setAlerstatus('sucess')
      clearData()
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
        
      },4000)
      fetchData()
      }


    }catch(erroe){
      setFields(true)
      setMsg('error while loading the data')
      setAlerstatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
    }
  };
  const clearData=()=>{
    setTitle("")
    setCalorie("")
    setPrice("")
    setImageAsset(null)
    setCategory("Select Category");

  }
  const fetchData=async () =>{
    await getAllFoodItems().then(data =>{
     dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItem:data
     })
    })
  }
  return (
    <div className="w-full h-auto flex min-h-screen items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full rounded-lg p-2 text-center text-lg font-semibold ${
              alerStatus === "dangerous"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="give me a title"
            className="w-full h-full text-lg font-semibold bg-transparent outline-none borde-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full text-base outline-none borde-b-2 border-gray-200 p-2 rounded-md cursor-pointer"  >
            <option
              value="other"
              className="bg-white"
             >
              Select category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-textColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center border-2 border-doted border-gray-300 w-full h-225 md:h-420 rounded-lg cursor-pointer ">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500  hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadingimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadedimage"
                      className="w-full h-full object-cover"
                    ></img>
                    <button
                      className="absolute right-3 p-3  bottom-3 rounded-full bg-red-500 text-xl cursor-pointer outline-null hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              onChange={(e) => setCalorie(e.target.value)}
              value={calorie}
              placeholder="Calories"
              className="w-full h-full text-lg font-semibold bg-transparent outline-none borde-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
              className="w-full h-full text-lg font-semibold bg-transparent outline-none borde-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className=" flex items-center w-full ">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
           Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
