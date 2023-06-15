import React, {useEffect, useState} from 'react';
import {useStateContext} from "../../contexts/ContextProvider";
import apiAxios from "../../api";
import {Chatroom, CreateChatroomModal} from "../index";
import {useSelector} from "react-redux";
import avatar from "../../data/avatar.jpg";
import {toast} from "react-toastify";

const ChatPage = () => {
   const [data, setData] = useState([{chatroomName: ""}])
   const {currentColor} = useStateContext();
   const [showModal, setShowModal] = useState(false);
   const {authData} = useSelector(state => state.auth)
   const [openPage, setOpenPage] = useState({chatroomName: "", _id: ""})

   useEffect(() => {
      apiAxios.get("/chatroom/get-all-chatrooms").then(({data}) => {
         setData(data.data)
      }).catch(err => {
         console.log(err)
      })
   }, [data])

   const capitalize = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
   }

   const deleteChatroom =async (e) => {
      await apiAxios.delete(`/chatroom/delete-chatroom/${e}`).then(({data}) => {
         toast.success(data.message)
      }).catch(err => {
         toast.error(err.response.data.message)
      })
   }

   return (
      <div className={" md:m-3 p-2 md:p-3  bg-white rounded-3xl flex-root justify-between"}>
     <div className={"flex justify-between align-middle"}>
        <div className={"flex justify-between"}>
           <img className="w-10 h-10 rounded-full ml-1 "  src={authData && authData.imageUrl ? authData.imageUrl : avatar} alt="Rounded avatar"/>
           <span className={"mt-3 ml-2"}>{capitalize(authData?.name)+ " "+ capitalize(authData?.lastname)}</span>
        </div>
        <button
           className="text-white active:bg-pink-400 font-semibold p-2 text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
           type="button" style={{"backgroundColor": currentColor}}
           onClick={() => setShowModal(true)}>
           Create new Chatroom
        </button>
     </div>
         <div className="xl:lg:md:grid grid-cols-12 gap-8 md:gap-4 block">
            {showModal && <CreateChatroomModal showModal={showModal} setShowModal={setShowModal}/>}
            <div className="col-start-1 col-end-4 from-gray-100 to-gray-100 bg-gradient-to-b w-full block">
              <div className={"flex justify-between "}>
                 <input type="search" className="bg-purple-white shadow rounded border-0 p-2 w-full mt-1 "
                        placeholder="Search by chatroom name or user..."/>
              </div>
               <h4 className={"text-center text-lg"} style={{color: currentColor}}>Created chat rooms</h4>
               <ul className="list-reset">
                  {data.map(({name, _id,creator}) => (
                     <li className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-2 border border-purple-200 hover:border-transparent rounded" key={String(_id)}
                      onClick={() => setOpenPage({chatroomName: name, _id: _id})}>{name}
                        {authData?._id === creator &&
                           <button
                              className="pb-1 ml-auto bg-transparent border-0 text-white opacity-4 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={()=>deleteChatroom(_id)}>
                        <span
                           className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                           </button>
                        }
                     </li>
                  ))}
               </ul>
            </div>
            <div className="col-span-9 w-full">
               {openPage && (<Chatroom chatroomName={openPage}/>)}
            </div>
         </div>
      </div>
   );
};

export default ChatPage;