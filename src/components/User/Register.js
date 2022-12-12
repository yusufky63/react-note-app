import { useState } from "react";
import { register } from "../../firebase";

import GoogleAndGithub from "./GoogleAndGithub";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password.length > 5) { register(email, password); }
    else { toast.warning("Lütfen gerekli alanları doğru şekilde doldurunuz! (Şifre en az 6 karakterli şifre giriniz !)") }
  };

  return (
    <div className="flex justify-center  items-center mt-20 rounded-lg">
      <div className="shadow-2xl px-5 py-3  rounded-lg w-72">
        <NavLink to="/">
          {" "}
          <button
            type="button"
            className=" text-gray-700 border rotate-180 border-gray-700 hover:bg-[#24292F]/90 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </NavLink>
        <br />
        <br />
       <GoogleAndGithub />

        <br />
        <hr className="border border-gray-700" />
        <br />
        <h1 className="text-center font-bold text-2xl">Kayıt Ol</h1>
        <br />
        <form onSubmit={handleRegister}>
          <input
            className="border border-gray-700 rounded-lg p-2 outline-none w-full mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <br />
          <br />
          <input
            className="border border-gray-700  rounded-lg p-2 outline-none w-full mb-2"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />{" "}
          <br />
          <br />
          <div className="flex m">
            {" "}
            <button className="w-full hover:bg-gray-800 bg-indigo-600 text-white px-5 py-2 rounded-lg ">
              Kayıt Ol
            </button>
          </div>
          <NavLink
            className="mt-3 hover:underline hover:underline-offset-4 text-indigo-400 text-sm flex justify-end"
            to="/login"
          >
            Mevcut hesabın varsa giriş yap
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Register;
