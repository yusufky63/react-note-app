import React from "react";
import NoteIcon from "../assets/NoteIcon";
import { NavLink } from "react-router-dom";
import ArchiveIcon from "../assets/ArchiveIcon";
import { useSelector } from "react-redux";
import { UserInfo } from "./User/UserInfo";

function Aside() {
  const aside = useSelector((state) => state.aside.aside);

  return (
    <div
      className={`absolute z-40 h-full  flex flex-col bg-[#202124] rounded-lg shadow-sm -left-2 w-${
        aside ? "" : "14"
      } text-white p-2  items-center transition-width duration-300 ease-in-out`}
    >
      <div className="flex flex-col text-left justify-start  lg:mr-0">
        <NavLink
          end
          style={({ isActive }) => ({
            borderLeft: isActive ? "4px" : "0px",
            borderLeftColor: isActive ? "#fff" : "transparent",
            borderLeftStyle: isActive ? "solid" : "none",
          })}
          to="/"
          className="flex items-center mb-5  hover:bg-gray-800 p-2 rounded lg:ml-2"
        >
          <NoteIcon />
          {!aside && (
            <span className="text-gray-300 font-medium ml-2">Notlar</span>
          )}
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            borderLeft: isActive ? "4px" : "0px",
            borderLeftColor: isActive ? "#fff" : "transparent",
            borderLeftStyle: isActive ? "solid" : "none",
          })}
          to="/archive"
          className="flex items-center mb-5 hover:bg-gray-800 p-2 rounded lg:ml-2"
        >
          <ArchiveIcon />
          {!aside && (
            <span className="text-gray-300 font-medium ml-2">Arşivler</span>
          )}
        </NavLink>
      </div>
      <div className="flex  items-center md:hidden">
        <UserInfo />
      </div>
    </div>
  );
}

export default Aside;
