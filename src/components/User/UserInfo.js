import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../firebase";
import { Dialog } from "@headlessui/react";
import CloseModalIcon from "../../assets/CloseModalIcon";

import DefaultProfileIcon from "../../assets/DefaultProfileIcon";
export function UserInfo() {
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleToggleM = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <div className="z-50">
      {user && (
        <div className="flex items-center  border-gray-800  p-1">
          {
            <span className="hidden md:block text-gray-400 text-sm mr-2">
              {user.email || user.displayName}
            </span>
          }
          {user.photoURL ? (
            <img
              src={user.photoURL}
              className="rounded-full border border-gray-800 cursor-pointer"
              width={40}
              alt=""
              onClick={handleToggleM}
            />
          ) : (
            <DefaultProfileIcon
              className="rounded-full  cursor-pointer"
              width={40}
              onClick={handleToggleM}
            />
          )}
          <Dialog
            open={showModal}
            onClose={() => setShowModal(false)}
            className="flex fixed z-10 inset-0 overflow-y-auto justify-center h-full items-center justify-items-center"
          >
            <Dialog.Panel
              className={
                "border p-5 rounded-lg border-gray-500 md:w-96 w-2/3 bg-[#202124]"
              }
            >
              <button
                className="hover:text-red-500 p-1 mb-1 rounded-full"
                onClick={() => setShowModal(false)}
              >
                <CloseModalIcon />
              </button>
              <Dialog.Title className={"text-xl text-center mb-5"}>
                Hesap Bilgileri
              </Dialog.Title>

              <div className="flex flex-col text-center items-center text-sm">
                <Dialog.Description className="my-2 text-white ">
                  Kullanıcı Adı :
                  <span className="text-sm text-gray-400 block">
                    {user.email || user.displayName}
                  </span>
                </Dialog.Description>

                <Dialog.Description className="my-2  text-white">
                  {" "}
                  Kullanıcı ID :
                  <span className=" block text-gray-400"> {user.uid}</span>
                </Dialog.Description>

                <Dialog.Description className=" my-2 text-center text-white">
                  Son Giriş :{" "}
                  <span className="text-xs block text-gray-400">
                    {new Date(user.metadata.lastSignInTime).toLocaleString()}
                  </span>
                </Dialog.Description>
              </div>

              <button
                onClick={handleLogout}
                className="block mx-auto px-4 py-2 mt-5 bg-red-600 hover:bg-red-400 text-white rounded-lg"
              >
                Çıkış Yap
              </button>
            </Dialog.Panel>
          </Dialog>
        </div>
      )}
    </div>
  );
}
