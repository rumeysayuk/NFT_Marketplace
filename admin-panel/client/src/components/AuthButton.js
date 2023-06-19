import React  from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { handleLogout } from "../redux/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthButton = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    setIsClicked(initialState);
    dispatch(handleLogout());
    navigate("/auth");
  };

  return (
    <button
      type="button"
      onClick={logout}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default AuthButton;
