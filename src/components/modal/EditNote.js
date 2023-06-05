import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { updateNote, deleteNote } from "../../firebase";
import { notes } from "../../redux/notes/notesSlice";
import ColorPalette from "../ColorPalette";
import EditIcon from "../../assets/EditIcon";
import DeleteIcon from "../../assets/DeleteIcon";
import AcceptIcon from "../../assets/AcceptIcon";
import PaletteIcon from "../../assets/PaletteIcon";

export default function EditNote({ selectedNote }) {
  const getNotes = useSelector(notes);

  const [color, setColor] = useState(selectedNote.color);
  const [title, setTitle] = useState(selectedNote.title);
  const [text, setText] = useState(selectedNote.text);

  const [open, setOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    getNotes.forEach((item) => {
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
    getNotes.forEach((item) => {
      if (item.id === selectedNote.id) {
        deleteNote(item.id);
      }
    });
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    setIsOpen(false);
  };

  const handlePaletteToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="" onClick={handleOpen}>
        <EditIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box  className="flex flex-col z-10 inset-0 overflow-y-auto h-3/4 w-3/4 md:w-2/3 lg:w-2/4 xl:w-1/4 bg-[#202124] text-gray-200 rounded-lg p-5 outline-none border border-gray-500">
          <div className="flex justify-between items-center mb-3">
            <input
              placeholder="Başlık"
              className=" text-lg font-semibold outline-none"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <button
              onClick={handleDelete}
              className="ml-3 text-red-500 hover:text-red-700"
            >
              <DeleteIcon />
            </button>
          </div>

          <textarea
            style={{ backgroundColor: color }}
            className={`text-sm text-[#e8eaed] resize-none rounded-lg p-3 outline-none flex-grow  ${color} shadow-2xl bg-opacity-50 ${
              color === "bg-transparent" ? "border border-gray-600" : ""
            }`}
            placeholder="Not Giriniz..."
            rows="5"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="relative top-2 my-3 items-center">
            <button
              onClick={handlePaletteToggle}
              className={` p-2 rounded-lg border border-gray-600`}
            >
              <PaletteIcon />
            </button>
            {isOpen && (
              <div className="absolute top-1 left-10 z-10">
                <div className="flex flex-row">
                  <ColorPalette setColor={handleColorChange} color={color} />
                </div>
              </div>
            )}
            <button
              onClick={handleEdit}
              className="absolute right-0 bottom-0 p-2 rounded-lg border border-gray-600"
            >
              <AcceptIcon />
            </button>
          </div>
          <div className="text-xs flex mt-1 justify-between text-gray-500 flex-col lg:flex-row">
            <span>Oluşturma : {selectedNote.date}</span>
            {selectedNote.update && (
              <span>Düzenleme : {selectedNote.update}</span>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
