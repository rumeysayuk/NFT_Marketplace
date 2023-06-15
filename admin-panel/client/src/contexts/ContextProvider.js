import React, {createContext, useContext, useState, useEffect} from "react";
import apiAxios from "../api";
import {handleAuth, handleLogout} from "../redux/auth";
import {useDispatch, useSelector} from "react-redux";

const StateContext = createContext()
const initialState = {chat: false, cart: false, userProfile: false, notification: false}

export const ContextProvider = ({children}) => {
   const [screenSize, setScreenSize] = useState(undefined);
   const [currentColor, setCurrentColor] = useState('#8a2be2');
   const [currentMode, setCurrentMode] = useState('Light');
   const [themeSettings, setThemeSettings] = useState(false);
   const [activeMenu, setActiveMenu] = useState(true);
   const [isClicked, setIsClicked] = useState(initialState);
   const dispatch = useDispatch()
   const {token} = useSelector((state) => state.auth)

   const setMode = (e) => {
      setCurrentMode(e.target.value);
      localStorage.setItem('themeMode', e.target.value);
   };

   useEffect(() => {
      apiAxios.get("/auth/getHomePage").then(({data}) => {
         if (data?.user && Object.keys(data.user).length > 0)
            dispatch(handleAuth({authData: data.user, token}))
         else dispatch(handleLogout())
      })
   }, [token])

   const setColor = (color) => {
      setCurrentColor(color);
      localStorage.setItem('colorMode', color);
   };

   const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

   return (
      <StateContext.Provider value={{
         currentColor, currentMode, activeMenu, screenSize, setScreenSize,
         handleClick, isClicked, initialState, setIsClicked,
         setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings
      }}>
         {children}
      </StateContext.Provider>
   );
};

export const useStateContext = () => useContext(StateContext);