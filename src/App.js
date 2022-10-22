import Home from "./components/Home";
import "./App.css";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ArchiveNotes from "./components/ArchiveNotes";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/archive" element={<ArchiveNotes />} />
      </Routes>
    </div>
  );
}

export default App;
