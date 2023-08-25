import React from "react";
import { useDispatch } from "react-redux";
import { filterNote, filterNoteArchive } from "../redux/notes/notesSlice";
import { useLocation } from "react-router-dom";

import ToggleIcon from "../assets/ToggleIcon";
import { UserInfo } from "./User/UserInfo";
import { asideToggle } from "../redux/aside";
import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPage = location.pathname.slice(1);
  const handleToggle = () => {
    dispatch(asideToggle());
  };

  useEffect(() => {
    if (locationPage === "") {
      dispatch(filterNote(""));
    } else if (locationPage === "archive") {
      dispatch(filterNoteArchive(""));
    }
  }, [locationPage, dispatch]);

  return (
    <>
      <div className="flex justify-between p-3 items-center  border-b-2 border-gray-700 px-2">
        <div className="flex items-center space-x-4 ">
          <button
            onClick={handleToggle}
            className="text-gray-700 border border-gray-700 hover:bg-[#24292F]/90 hover:text-white   font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
          >
            <ToggleIcon />
          </button>
          <h1 className="text-2xl text-gray-500 font-bold mx-5 text-center">
            NApp
          </h1>
        </div>
        <div className="flex-grow">
          <input
            onChange={(e) => {
              const searchValue = e.target.value;
              if (locationPage === "") {
                dispatch(filterNote(searchValue));
              } else if (locationPage === "archive") {
                dispatch(filterNoteArchive(searchValue));
              }
            }}
            type="text"
            placeholder="Arama"
            className="md:w-1/2 w-5/6  ml-8 border border-gray-900  rounded-lg p-2 outline-none text-center bg-gray-600 placeholder:text-slate-200"
          />
        </div>

        <div className="hidden md:block">
          <UserInfo />
        </div>
      </div>
    </>
  );
}

export default Header;
