import React from "react";




import { useSelector } from "react-redux";
import {logout} from "../firebase";
import { NavLink } from "react-router-dom";


export function UserInfo() {
    
    const { user } = useSelector((state) => state.auth);
  
    const handleLogout = () => {
      logout();
    };
  return (
    <div className="flex justify-end mt-1 mb-5 right-0 ">
      {!user && (
        <NavLink
          className="border border-gray-600 hover:bg-gray-800 p-2 px-5 bg-transparent text-white rounded-lg mx-1"
          to="/register"
        >
          Kayıt Ol
        </NavLink>
      )}
      {!user && (
        <NavLink
          className=" border border-gray-600 hover:bg-gray-800  p-2 px-4 bg-transparent text-white rounded-lg mx-1 "
          to="/login"
        >
          Giriş Yap
        </NavLink>
      )}

      {user && (
        <div className="flex items-center border border-gray-800 rounded-lg p-1">
          {" "}
          {user.photoURL && (
            <img
              src={user.photoURL}
              className=" rounded-full"
              width={35}
              alt=""
            />
          )}
          <h1 className="mx-3">{user.email || user.displayName}</h1>
          <NavLink
            className="bg-indigo-700 border border-gray-600 hover:bg-gray-800  p-2 px-4 bg-transparent text-white rounded-lg mx-1 "
            to="/archive"
          >
            Arşive Git
          </NavLink>
          <button
            onClick={handleLogout}
            className=" p-2 bg-red-400 text-white rounded-lg"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
