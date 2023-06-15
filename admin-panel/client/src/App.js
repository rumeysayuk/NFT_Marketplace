import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer } from "react-toastify";
import { Navbar, Footer, Sidebar, ThemeSettings, Auth } from "./components";
import { Ecommerce, Employees, ProfileDetail, Users } from "./pages";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import { useSelector } from "react-redux";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode, authData]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg app">
          <div className="fixed right-4 bottom-4" style={{ zIndex: 999 }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div className="content">
              {themeSettings && <ThemeSettings />}
              <ToastContainer newestOnTop />
              <Routes>
                {/*auth*/}
                <Route
                  path="/auth"
                  element={!authData ? <Auth /> : <Navigate to={"/"} />}
                />
                {/* dashboard  */}
                {/*<ProtectedRoute component={<Ecommerce />} path="/" />*/}
                <Route path="/profile-detail" element={<ProfileDetail />} />

                <Route path="/" element={<Employees />} />
                <Route path="/homepage" element={<Ecommerce />} />

                {/* pages  */}
                <Route path="/users" element={<Employees />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
