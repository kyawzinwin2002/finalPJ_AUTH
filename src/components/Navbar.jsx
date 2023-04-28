import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";

export const Navbar = () => {
  //   const { user,token } = useSelector((state) => state.authSlice);

  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  //   console.log(token);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const nav = useNavigate();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    if (data?.success) {
      nav("/login");
    }
    dispatch(removeUser());
    // console.log(data);
  };

  return (
    <div>
      <div className=" flex justify-around items-center">
        <h1 className=" text-3xl font-bold text-gray-700">MMS</h1>
        <div className=" flex gap-7 justify-between items-center">
          <div className=" flex flex-col gap-3">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
          <button
            onClick={logoutHandler}
            className=" bg-red-600 text-white rounded-md px-5 py-1"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};
