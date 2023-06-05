import Home from "./pages/Home";
import "./App.css";
import Register from "./components/User/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import ArchiveNotes from "./components/ArchiveNotes";
import Header from "./components/Header";
import Aside from "./components/Aside";

function App() {
  return (
    <div className="App ">
    <ToastContainer
      position="top-right"
      autoClose={700}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
    />
    <Header />
    <div className="flex ">
      <Aside />
      <div className="flex w-full justify-center items-center">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/archive" element={<ArchiveNotes />} />
        </Routes>
      </div>
    </div>
  </div>
  );
}

export default App;
