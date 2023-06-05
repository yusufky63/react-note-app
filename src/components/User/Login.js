import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { login, resetPasword } from "../../firebase";
import GoogleAndGithub from "./GoogleAndGithub";
import { toast } from "react-toastify";
import CloseModalIcon from "../../assets/CloseModalIcon";
import Register from "./Register";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password.length > 5) {
      login(email, password);
    } else {
      toast.warning(
        "Lütfen gerekli alanları doğru şekilde doldurunuz! (Şifre en az 6 karakterli olmalıdır.)"
      );
    }
  };

  const handleResetMail = (e) => {
    e.preventDefault();
    resetPasword(email);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white rounded-lg shadow-md bg-gradient-to-r  from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none"
      >
        Giriş Yap
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
          onClose={() => setIsOpen(false)}
        >
          <div className="bg-[#2f2f2f] rounded-lg shadow-lg p-5 w-72">
            <div className="flex justify-start ">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-red-500 p-1 mb-1 rounded-full"
              >
                <CloseModalIcon />
              </button>
            </div>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 my-4 text-white text-center"
            >
              Giriş Yap
            </Dialog.Title>

            <GoogleAndGithub />

            <form onSubmit={handleLogin} className="mt-6">
              <input
                className="border border-gray-700 rounded-lg py-2 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />

              <input
                className="border border-gray-700 rounded-lg py-2 px-4 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />

              <div className="flex justify-between">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-5 rounded-lg focus:outline-none text-sm">
                  Giriş Yap
                </button>
                <button
                  onClick={handleResetMail}
                  className="text-indigo-500 hover:text-indigo-600 focus:outline-none text-sm"
                >
                  Şifremi Sıfırla
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm flex justify-between items-center">
                Hesabın yok mu?
                <button className="text-indigo-500 hover:text-indigo-600 focus:outline-none">
                  <Register />
                </button>
              </p>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Login;
