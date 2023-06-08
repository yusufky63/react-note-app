import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNote } from "../firebase";
import ColorPalette from "./ColorPalette";
import Login from "./User/Login";

function Form() {
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState("bg-transparent");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const formRef = useRef(null);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleAddNotes = (e) => {
    e.preventDefault();

    if (text !== "" && user) {
      addNote({
        uid: user.uid,
        title,
        text,
        color,
        date: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString(
          "tr-TR"
        )}`,
      });
      toast.success("Yeni Görev Eklendi");
      setText("");
      setTitle("");
      setExpanded(false);
    } else {
      toast.error("Lütfen boş alan bırakmayınız!");
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setExpanded(false);
      setText("");
      setTitle("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <>
  {user &&  <div className="flex justify-center items-center  ">
      <div
        ref={formRef}
        className={`shadow-2xl rounded-lg p-2 border mt-10 border-gray-700 ${
          expanded ? "h-auto" : "h-10"
        } w-full max-w-sm lg:max-w-xl ml-5`}
      >
        {!expanded ? (
          <div className="flex justify-center ">
            <input
              placeholder="Notunuzu giriniz"
              className=" placeholder:text-slate-50 px-20 shadow-xl outline-none text-center"
              type="text"
              value={text}
              onClick={handleExpand}
            />
          </div>
        ) : (
          <div className="">
            <input
              placeholder="Başlık"
              className="text-left border-l-4 w-full placeholder:text-slate-400 border-l-yellow-300 outline-none p-2 mb-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              multiple={true}
            />

            <textarea
              id="textArea"
              placeholder="Notunuzu giriniz"
              className="outline-none p-1 resize-none  placeholder:text-slate-400 mb-2"
              onChange={(e) => setText(e.target.value)}
              value={text}
              cols="100"
              rows="2"
            ></textarea>
          </div>
        )}

        {expanded && (
          <div className="flex justify-between">
            <ColorPalette setColor={setColor} color={color} />
            <div className="">
              {!user ? (
                <Login />
              ) : (
                <button
                  onClick={handleAddNotes}
                  className="border border-gray-600 px-5 py-2 lg:px-10 rounded-lg hover:bg-gray-800"
                >
                  Ekle
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>}
   </>
  );
}

export default Form;
