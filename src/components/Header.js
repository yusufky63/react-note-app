import React from "react";
import { filterNote } from "../redux/notes/notesSlice";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className=" flex justify-center text-5xl text-gray-500 font-bold text-center">
        Note App
      </h1>

      <br />
      <form className="text-center">
        <input
          onChange={(e) => dispatch(filterNote(e.target.value))}
          type="text"
          placeholder="Arama"
          className="border border-gray-700 rounded-lg px-10 py-2 outline-none text-center placeholder:italic placeholder:text-slate-400"
        />
      </form>
      <br />
    </div>
  );
}

export default Header;
