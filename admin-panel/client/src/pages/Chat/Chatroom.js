import React from 'react';
import {useStateContext} from "../../contexts/ContextProvider";

const Chatroom = ({chatroomName}) => {
   const {currentColor} = useStateContext();
   const capitalize = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
   }
   return (
      <div className={"from-gray-100 to-gray-100 bg-gradient-to-b w-full min-h-screen bg-cover opacity-4"}
           style={{backgroundImage: "url('https://imgs.search.brave.com/4Xcm-mHyeVR_X7WT6QKmbYQ2LNfp3CRQ1GMFQevqEVw/rs:fit:800:596:1/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMjgw/NTAvc2NyZWVuc2hv/dHMvOTgwMzIzNi9z/a3lsaW5lbG93Lmpw/Zw')"}}>
         <h1 className={"text-center bg-gray-200 h-10 justify-center align-middle"}
             style={{color: currentColor}}>{chatroomName.chatroomName ? capitalize(chatroomName.chatroomName) :
            "Let's start talking"}</h1>
         {chatroomName &&
         <div>
            <input type="text"/>
         </div>}
      </div>
   );
};

export default Chatroom;
