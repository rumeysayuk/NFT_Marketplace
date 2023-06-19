import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
   return (
      <div className="flex items-center justify-center w-full min-height-vhfull">
         <HashLoader color="#ED9424" loading={true} size={150}/>
      </div>
   )
}

export default Loading;