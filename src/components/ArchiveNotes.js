import { valueArchive, filterNoteArchive } from "../redux/notes/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteArchiveNotes, restoreToNotes } from "../firebase";

function ArchiveNotes() {
  const dispatch = useDispatch();
  const data = useSelector(valueArchive);
  console.log(data);
  const activeFilterArchive = useSelector(
    (state) => state.notes.activeFilterArchive
  );
  const filteredItems = data.filter((item) =>
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
    <div>
     <h1 className="my-10 flex justify-center text-5xl text-gray-500 font-bold text-center">
       Arşiv
      </h1>
     
      <form className="text-center">
        <input
          onChange={(e) => dispatch(filterNoteArchive(e.target.value))}
          type="text"
          placeholder="Arama"
          className="border border-gray-700 rounded-lg px-10 py-2 outline-none text-center placeholder:italic placeholder:text-slate-400"
        />
      </form>
      <br />
      <div className="flex justify-start">
        <span className=" bg-yellow-400 text-black p-1 rounded-lg">
          Kayıt Bulundu : {filteredItems.length}
        </span>
      </div>
      <ul className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 mt-3 ">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className={`  h-fit m-3 p-5 ${item.color} rounded-lg shadow-2xl `}
          >
            <div>
              {" "}
              <div className=" ">
                <h1 className="lg:text-xl text-base font-bold text-gray-100 break-words w-64">
                  {item.title}
                </h1>
                <br />
                <p className=" lg:text-sm text-xs text-gray-100 text-justify font-sans break-words">
                  {item.text}
                </p>
              </div>
              <br />
              <div className="flex justify-end items-center -mb-5 mt-5">
                <button
                  onClick={() => handleRestore(item)}
                  className="py-2 px-2 hover:bg-green-700 bg-transparent rounded-lg ml-2 mb-2"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteArchive(item.id)}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArchiveNotes;
