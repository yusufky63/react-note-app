import React from "react";

function ColorPalette({ color, setColor }) {
  return (
    <div className="flex items-center justify-between ml-2 lg:text-xs">
      <button
        onClick={() => {
          setColor("bg-transparent");
        }}
        className="bg-transparent mx-1 border border-gray-600 rounded-full  md:h-8  md:w-8 h-7 w-7"
      >
        {color === "bg-transparent" && <span>&#10003;</span>}
      </button>
      <button
        onClick={() => {
          setColor("bg-purple-800");
        }}
        className="bg-purple-800 mx-1 rounded-full  md:h-8  md:w-8 h-7 w-7"
      >
        {color === "bg-purple-800" && <span>&#10003;</span>}
      </button>
      <button
        onClick={() => {
          setColor("bg-emerald-700");
        }}
        className="bg-emerald-700 mx-1 rounded-full  md:h-8  md:w-8 h-7 w-7"
      >
        {color === "bg-emerald-700" && <span>&#10003;</span>}
      </button>
      <button
        onClick={() => setColor("bg-rose-800")}
        className="bg-rose-800 mx-1 rounded-full md:h-8  md:w-8 h-7 w-7"
      >
        {color === "bg-rose-800" && <span>&#10003;</span>}
      </button>
      <button
        onClick={() => setColor("bg-gray-500")}
        className="bg-gray-500 mx-1 rounded-full  md:h-8  md:w-8 h-7 w-7"
      >
        {color === "bg-gray-500" && <span>&#10003;</span>}
      </button>
    </div>
  );
}

export default ColorPalette;
