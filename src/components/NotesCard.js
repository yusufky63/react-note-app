import EditNote from "./modal/EditNote";
import DeleteIcon from "../assets/DeleteIcon";
import ArchiveIcon from "../assets/ArchiveIcon";
import { useState } from "react";
import RestoreIcon from "../assets/RestoreIcon";
import { useLocation } from "react-router-dom";

function NotesCard({ data, handleDelete, handleArchive, handleRestore }) {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleItemHover = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleItemLeave = () => {
    setHoveredItemId(null);
  };

  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Anasayfa";
      case "/archive":
        return "Arşivler";
      // Diğer sayfa başlıklarını burada tanımlayabilirsiniz
      default:
        return "";
    }
  };
  

  return (
    <div className="ml-6 ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-5">
        {data.map((item) => (
          <li
            key={item.id}
            className={`m-5 p-4 ${
              item.color
            } rounded-lg shadow-2xl bg-opacity-50 relative ${
              item.color === "bg-transparent" ? "border border-gray-600" : ""
            }`}
            onMouseEnter={() => handleItemHover(item.id)}
            onMouseLeave={handleItemLeave}
            style={{ height: "190px",width:"320px" }}
          >
            <div>
              <div>
                {item.title && (
                  <h1 className="lg:text-base font-bold text-gray-100 break-words">
                    {item.title.length > 20 ? `${item.title.substring(0, 50)}...` : item.title}
                    
                  </h1>
                )}
                <br />
                <p className="text-sm text-gray-100 text-justify font-sans break-words">
                  {item.text.length > 100
                    ? `${item.text.substring(0, 80)}...`
                    : item.text}
                </p>
              </div>

              <div className="flex justify-end items-center -mb-5 mt-1 absolute bottom-6 right-2">
                {getPageTitle() === "Arşivler" && hoveredItemId === item.id && (
                  <button
                    onClick={() => handleRestore(item)}
                    className={`pt-2 px-1 hover:text-green-500 bg-transparent rounded-lg mb-1 ${
                      hoveredItemId === item.id ? "" : ""
                    }`}
                  >
                    <RestoreIcon />
                  </button>
                )}

                {getPageTitle() === "Anasayfa" && hoveredItemId === item.id && (
                  <button className="pt-2 px-1 hover:text-green-500 bg-transparent rounded-lg ">
                    <EditNote selectedNote={item}></EditNote>
                  </button>
                )}

                {getPageTitle() === "Anasayfa" && hoveredItemId === item.id && (
                  <button
                    onClick={() => handleArchive(item)}
                    className={`py-2 px-1 hover:text-yellow-500 bg-transparent rounded-lg  ${
                      hoveredItemId === item.id ? "ml-2" : ""
                    }`}
                  >
                    <ArchiveIcon />
                  </button>
                )}
                {hoveredItemId === item.id && (
                  <button
                    onClick={() => handleDelete(item.id, item)}
                    className={`py-2 px-1 hover:text-red-700 bg-transparent rounded-lg  ${
                      hoveredItemId === item.id ? "ml-2" : ""
                    }`}
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesCard;
