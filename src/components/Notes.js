import { value } from "../redux/notes/notesSlice";
import { useSelector } from "react-redux";

import EditNote from "./modal/EditNote";
import { deleteNote, addArchiveNotes } from "../firebase";
import { toast } from "react-toastify";

function Notes() {
  const data = useSelector(value);

  const activeFilter = useSelector((state) => state.notes.activeFilter); // NoteSlice'da tanımladığımız activeFilter'ı aldık.
  const filteredItems = data.filter(
    (item) => item.text.toLowerCase().includes(activeFilter.toLowerCase()) // Search'e girilen değerler activeFilter'e kaydediliyordu. Burda search'e girilen değerler ile title'daki değerler bir birini kapsıyorsa filteredItems'a kaydet diyerek. Filtreleme yaptırdık.
  );

  const handleDelete = (id, item) => {
    deleteNote(id, item);
    toast.success("Görev Silindi");
  };
  const handleArchive = (item) => {
    console.log(item);
    addArchiveNotes(item);
  };

  return (
    <>
      <br />
      <span className=" bg-yellow-400 text-black p-1 rounded-lg">
        Kayıt Bulundu : {filteredItems.length}
      </span>

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
                  <span className="border-l-4  border-l-white px-2">
                    {item.title}
                  </span>
                </h1>
                <br />
                <p className=" lg:text-sm text-xs text-gray-100 text-justify font-sans break-words">
                  {item.text}
                </p>
              </div>
              <br />
              <div className="flex justify-end items-center -mb-5 mt-5">
                <span className=" rounded-lg hover:bg-green-500">
                  {" "}
                  <EditNote selectedNote={item}></EditNote>
                </span>

                <button
                  onClick={() => handleArchive(item)}
                  className="py-2 px-2 hover:bg-yellow-500 bg-transparent rounded-lg ml-2 mb-2"
                >
                  <svg
                    class="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(item.id, item)}
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
              {/* <br />
              <div className=" flex justify-between pt-5 p-2 ">
                <button className="border border-gray-700 bg-transparent rounded-lg px-3 py-1.5 hover:bg-gray-900">
                  <EditNote selectedNote={item}></EditNote>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="border border-gray-700 bg-transparen rounded-lg  px-8 py-1.5 hover:bg-gray-900"
                >
                  Sil
                </button>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Notes;
