import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import apiAxios from "../api";
import {toast} from "react-toastify";
import moment from "moment";
import {handleAuth} from "../redux/auth";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {Button, Popconfirm} from 'antd';
import {EditOutlined} from "@material-ui/icons";
import {updateAdminInfo} from "../services/userService";

const ProfileDetail = () => {
   const {authData} = useSelector(state => state.auth)
   const {token} = useSelector(state => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {currentColor} = useStateContext();
   let userId = authData?._id
   const [visible, setVisible] = useState(false);
   const [profile, setProfile] = useState({...authData, profile_img: authData?.profile_img || ""});

   const showPopConfirm = () => {
      setVisible(true);
   };

   const deleteAccount = (e) => {
      e.preventDefault()
      apiAxios.put(`/base/User/${profile._id}`, {data: {isBlocked: !profile.isBlocked}}).then(() => {
         toast.success("Deleted Account Is Successfully")
         setTimeout(() => {
            localStorage.removeItem("token")
            window.location.href = "/auth"
         }, 1000)
      }).catch(err => {
         console.log(err)
      })
   }

   const save = (e) => {
      e.preventDefault()
      updateAdminInfo(userId, profile).then(() => {
         dispatch(handleAuth({authData: profile, token: token}))
      }).catch(e => {
         toast.error(e.response.data.message)
      })
   }

   useEffect(() => {
      setTimeout(() => {
         if (!token) {
            toast.info("Please First Login")
            navigate("/auth")
         }
      }, 1000)
   }, [navigate, token])

   const updateProfileImage = (e) => {
      if (e.target.files?.length > 0) {
         const formData = new FormData();
         formData.append("image", e.target.files[0]);
         apiAxios
            .post("/upload", formData)
            .then(({data}) => {
               setProfile({...profile, profile_img: data?.url});
            })
            .catch((err) => console.log("err", err));
      } else {
         toast.error("Image not selected");
      }
   };

   if (!profile || !authData) return <div
      className="flex w-full justify-center align-middle h-full">Loading...</div>;
   return (
      <div className="container mx-auto">
         <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
               <div className="text-start mt-20 mb-4 ml-5 dark:text-gray-300"
                    style={{color: currentColor}}>Welcome
                  Profile {`${(authData.name || "")} ${(authData.lastname || "")}`}
               </div>
               <div className="w-full lg:w-1/5 p-2 relative flex items-center justify-center bg-white shadow-md">
                  <label htmlFor="file" className="w-full flex items-center justify-center">
                     <img id="showImage" className="w-full items-center justify-center border mt-6"
                          style={{maxWidth: 400, maxHeight: 400}}
                          src={authData.profile_img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"}
                          alt=""/>
                     <EditOutlined className="absolute top-0 right-0 m-2 text-green-600" style={{fontSize: 20}}/>
                     <input type="file" id="file" className="hidden" accept=".jpeg, .jpg, .png"
                            onChange={updateProfileImage}/>
                  </label>
               </div>
               <div>
                  <label htmlFor="name"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                     name</label>
                  <input type="text" id="name" defaultValue={authData?.name}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="John" required
                         onChange={(e) => setProfile({...profile, name: e.target.value})}/>
               </div>
               <div>
                  <label htmlFor="lastname"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                     name</label>
                  <input type="text" id="lastname" defaultValue={authData?.lastname}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Doe" required=""
                         onChange={(e) => setProfile({...profile, lastname: e.target.value})}/>
               </div>
               <div>
                  <label htmlFor="email"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                     address</label>
                  <input type="email" id="email " defaultValue={authData?.email}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="ohn.doe@company.com"
                         onChange={(e) => setProfile({...profile, email: e.target.value})}/>
               </div>
               <div>
                  <label htmlFor="phone"
                         className="block mb-2 text-sm font-medium text-  gray-900 dark:text-gray-300">Phone
                     number</label>
                  <input type="tel" id="phone" defaultValue={authData?.phone}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="123-45-678"
                         onChange={(e) => setProfile({...profile, phone: e.target.value})}/>
               </div>
               <div className="mb-4">
                  <label htmlFor="password" defaultValue={authData?.password}
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                  <input type="password" id="password"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="•••••••••" required=""
                         onChange={(e) => setProfile({...profile, password: e.target.value})}/>
               </div>
               <div className="mb-4">
                  <label htmlFor="confirm_password"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                     password</label>
                  <input type="password" id="confirm_password"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="•••••••••" required=""
                         onChange={(e) => setProfile({...profile, confirmPassword: e.target.value})}/>
               </div>
               <div className="mb-6">
                  <label htmlFor="join_date"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Joined
                     Date</label>
                  <input type="text" id="join_date" defaultValue={moment(authData?.createdAt).format("LLLL")}
                         disabled
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
               </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
               <Button
                  type="submit"
                  style={{ backgroundColor: currentColor, color: "white", borderRadius: "5px", width: "150px" }}
                  onClick={save}
                  className="text-md align-middle justify-center flex rounded-lg text-center hover:bg-light-gray"
               >
                  Save
               </Button>
               <Popconfirm
                  title="Are you sure delete this account?"
                  visible={visible}
                  onConfirm={deleteAccount}
                  onCancel={() => setVisible(false)}
               >
                  <Button
                     type="danger"
                     onClick={showPopConfirm}
                     className="ml-3 text-md align-middle justify-center flex rounded-lg hover:bg-light-gray"
                     style={{ width: "200px" }}
                  >
                     Delete my account
                  </Button>
               </Popconfirm>
            </div>
         </form>
      </div>
   )
}

export default ProfileDetail;