import { notes } from "../redux/notes/notesSlice";
import { useSelector } from "react-redux";
import { deleteNote, addArchiveNotes } from "../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import NotesCard from "./NotesCard";

import Login from "./User/Login";
import Register from "./User/Register";

function Notes() {
  const { user } = useSelector((state) => state.auth);

  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleM = () => {
    setShowModal(!showModal);
  };

  const getNotes = useSelector(notes);
  const activeFilter = useSelector((state) => state.notes.activeFilter);

  const filteredItems = getNotes.filter((item) =>
    item.title.toLowerCase().includes(activeFilter.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    return new Date(b.update || b.date) - new Date(a.update || a.date);
  });

  const handleDelete = (id, item) => {
    deleteNote(id, item);
    toast.success("Görev Silindi");
  };

  const handleArchive = (item) => {
    console.log(item);
    addArchiveNotes(item);
  };

  const handleItemHover = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleItemLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div>
      <NotesCard
        data={sortedItems}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
        handleItemHover={handleItemHover}
        handleItemLeave={handleItemLeave}
        hoveredItemId={hoveredItemId}
      />
      {!user && (
        <div className="flex  justify-center border-gray-800 rounded-lg p-1">
          <button
            onClick={handleToggleM}
            className="hover:text-red-500 p-1 mb-1 rounded-full"
          >
            <Login />
          </button>
          <button
            onClick={handleToggleM}
            className="hover:text-red-500 p-1 mb-1 rounded-full"
          >
            <Register />
          </button>
        </div>
      )}
    </div>
  );
}

export default Notes;
