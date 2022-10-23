import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { addNote as addNoteFirebase } from "../firebase";

function Form() {
  const [color, setColor] = useState("bg-transparent");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleAddNotes = (e) => {
    e.preventDefault();

    if (text !== "" && user) {
      addNoteFirebase({
        uid: user.uid,
        title: title,
        text: text,
        color: color,
        date:
          new Date().toLocaleTimeString() +
          " " +
          new Date().toLocaleDateString("tr-TR"),
      });
      toast.success("Yeni Görev Eklendi");
      console.log(text);

      setText("");
      setTitle("");
    } else {
      toast.error("Lütfen boş alan bırakmayınız !");
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className=" shadow-2xl rounded-lg p-3  md:w-12/12">
          <input
            placeholder="Başlık"
            className="text-left border-l-4 placeholder:italic placeholder:text-slate-400 border-l-yellow-300 outline-none p-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            id="a"
            placeholder="Notunuzu giriniz"
            className={`outline-none p-3   resize-none placeholder:italic placeholder:text-slate-400`}
            onChange={(e) => setText(e.target.value)}
            value={text}
            cols="80"
            rows="4"
          ></textarea>
          <br />
          <div className="flex justify-between ">
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

            <div className="">
              {!user ? (
                <NavLink to="/login" className="mr-5 font-bold text-red-500">
                  Lütfen Giriş Yapınız !
                </NavLink>
              ) : (
                <button
                  onClick={handleAddNotes}
                  className="border border-gray-600 px-5 py-2 lg:px-10 rounded-lg  hover:bg-gray-800"
                >
                  Ekle
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
