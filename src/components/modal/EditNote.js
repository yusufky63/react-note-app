import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { updateNote, deleteNote } from "../../firebase";
import { value } from "../../redux/notes/notesSlice";

export default function BasicModal({ selectedNote }) {
  const data = useSelector(value);

  const [color, setColor] = useState(selectedNote.color);
  const [title, setTitle] = useState(selectedNote.title);
  const [text, setText] = useState(selectedNote.text);

  //MODALs
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      if (item.id === selectedNote.id) {
        updateNote(item.id, {
          title,
          text,
          color,
          date: item.date,
          update:
            new Date().toLocaleTimeString() +
            " " +
            new Date().toLocaleDateString("tr-TR"),
        });

        handleClose();
      }
    });
  };

  const handleDelete = () => {
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      if (item.id === selectedNote.id) {
        deleteNote(item.id);
      }
    });
  };
  return (
    <div>
      <button className="px-1 mb-3" onClick={handleOpen}>
        {" "}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-full md:w-3/5">
          <h1 className="text-center text-3xl text-gray-500 font-medium">
            Düzenle
          </h1>
          <br />
          <input
            placeholder="Başlık"
            className="border-l-4 border-l-yellow-300 outline-none p-2"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            style={{ backgroundColor: color }}
            className={`${color} outline-none p-3 resize-none rounded-lg mt-5 border border-gray-500`}
            placeholder="Notunuzu giriniz"
            cols="50"
            rows="8"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <div className=" text-sm">
            <div>Eklenme Tarihi : {selectedNote.date}</div>
            <div>Son Güncelleme Tarihi : {selectedNote.update}</div>
          </div>
          <br />
          <div className="flex justify-between px-3">
            <div>
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
          </div>
          <br />

          <div className="flex justify-between ">
            <button
              onClick={handleEdit}
              className="py-2 px-2 hover:bg-green-700 bg-transparent rounded-lg ml-2 mb-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-2 hover:bg-red-700 bg-transparent rounded-lg ml-2 mb-2"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "black",

  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};
