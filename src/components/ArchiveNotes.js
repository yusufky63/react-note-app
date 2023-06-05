import { archive } from "../redux/notes/notesSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteArchiveNotes, restoreToNotes } from "../firebase";

import NotesCard from "./NotesCard";
function ArchiveNotes() {
  const getData = useSelector(archive);

  const activeFilterArchive = useSelector(
    (state) => state.notes.activeFilterArchive
  );
  const filteredItems = getData.filter((item) =>
    item.text.toLowerCase().includes(activeFilterArchive.toLowerCase())
  );
  //ARCHIVE NOTE DELETE
  const handleDeleteArchive = (id) => {
    deleteArchiveNotes(id);
    toast.success("Arşivden Silindi ");
  };
  //NOTE RESTORE
  const handleRestore = (item) => {
    restoreToNotes(item);
  };

  return (
    <>
      <NotesCard
        data={filteredItems}
        handleDelete={handleDeleteArchive}
        handleRestore={handleRestore}
      />
    </>
  );
}

export default ArchiveNotes;
