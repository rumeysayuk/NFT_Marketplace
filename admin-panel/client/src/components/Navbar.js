import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from "./index";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const { authData } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [authData]);

  useEffect(() => {
    if (screenSize <= 900) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {authData && (
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
      )}
      <div className="flex">
        {/*<NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor}*/}
        {/*           icon={<FiShoppingCart/>}/>*/}
        {/*<NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor}*/}
        {/*           icon={<BsChatLeft/>}/>*/}
        {/*<NavButton title="Notification" dotColor="rgb(254, 201, 15)"*/}
        {/*           customFunc={() => handleClick('notification')}*/}
        {/*           color={currentColor} icon={<RiNotification3Line/>}/>*/}
        {authData ? (
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">
                  {authData ? "Hi," : ""}
                </span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {authData ? authData?.name : "Guest"}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
        ) : (
          <button
            style={{
              color: "white",
              backgroundColor: currentColor,
              borderRadius: "10px",
            }}
            onClick={() => navigate("/auth")}
            className={`text-17 p-3 w-full hover:drop-shadow-xl hover:bg-${currentColor}`}
          >
            Sign in /Sign up
          </button>
        )}

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
