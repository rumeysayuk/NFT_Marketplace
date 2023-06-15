import React, {useState} from 'react';
import apiAxios from "../../api";
import {useStateContext} from "../../contexts/ContextProvider";
import Input from "../../components/Auth/Input";

const CreateChatroom = ({showModal, setShowModal}) => {
   const {currentColor} = useStateContext();
   const [data, setData] = useState([{chatroomName: ""}])


   const handleSubmit = (e) => {
      e.preventDefault()
      apiAxios.post("/chatroom/create-chatroom", data).then(() => {
         setShowModal(false)
      })
   }
   const handleChange = (e) => {
      e.preventDefault()
      setData({...data, [e.target.name]: e.target.value})
   }
   return (
      <>
         <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-50 my-6 mx-auto max-w-8xl">
               <div
                  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div
                     className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                     <h3 className="text-xl  font-semibold text-center">Create New Chatroom</h3>
                     <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}>
                        <span
                           className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                     </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                     <div>
                        <form onSubmit={handleSubmit}>
                           <label className={"text-gray-600 text-md"}>Enter chatroom name :</label>
                           <Input name="chatroomName" label={"Chatroom name"} handleChange={handleChange}/>
                        </form>
                     </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                     <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" onClick={() => setShowModal(false)}>Close
                     </button>
                     <button
                        className="bg-gray-100 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" style={{color: currentColor}} onClick={handleSubmit}
                     >
                        Create Chatroom
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateChatroom;
