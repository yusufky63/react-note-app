import React from 'react'

function ColorPalette({ color, setColor }) {
    return (
        <div>
        {" "}
        <button
          onClick={() => {
            setColor("bg-transparent");
          }}
          className="border border-gray-700 bg-transparent mx-1 rounded-full h-10 w-10"
        >
          {color === "bg-transparent" && <span>&#10003;</span>}
        </button>
        <button
          onClick={() => {
            setColor("bg-purple-800");
          }}
          className="bg-purple-800 mx-1 rounded-full h-10 w-10"
        >
          {color === "bg-purple-800" && <span>&#10003;</span>}
        </button>
        <button
          onClick={() => {
            setColor("bg-emerald-700");
          }}
          className=" bg-emerald-700 mx-1 rounded-full h-10 w-10  "
        >
          {color === "bg-emerald-700" && <span>&#10003;</span>}
        </button>
        <button
          onClick={() => setColor("bg-rose-800")}
          className="bg-rose-800    mx-1 rounded-full h-10 w-10 "
        >
          {color === "bg-rose-800" && <span>&#10003;</span>}
        </button>
        <button
          onClick={() => setColor("bg-gray-500")}
          className="bg-gray-500 mx-1 rounded-full h-10 w-10 "
        >
          {color === "bg-gray-500" && <span>&#10003;</span>}
        </button>
      </div>

    )
}

export default ColorPalette