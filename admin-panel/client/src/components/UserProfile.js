import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AuthButton } from "./index";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor, setIsClicked, initialState } = useStateContext();
  const { authData } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const userProfileMenu = [
    {
      color: "#03C9D7",
      bgColor: "#E5FAFB",
      title: " My Profile ",
      desc: " Account Settings",
      icon: <BsCurrencyDollar />,
      path: "/profile-detail",
    },
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          type="button"
          style={{ color: "rgb(153, 171, 180)" }}
          onClick={() => setIsClicked(initialState)}
          className={` text-2xl p-3  hover:drop-shadow-xl hover:bg-light-gray`}
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={authData?.profile_img}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {authData?.name + " " + authData?.lastname}{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {authData?.role.charAt(0).toUpperCase() +
              authData?.role.slice(1)}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {authData?.email}{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileMenu.map((item, i) => (
          <div
            key={i}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.color, backgroundColor: item.bgColor }}
              onClick={() => {
                setIsClicked(initialState);
                navigate(item.path);
              }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div>
              <p className="font-semibold dark:text-gray-200 ">
                {" "}
                {item.title}{" "}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <AuthButton
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
