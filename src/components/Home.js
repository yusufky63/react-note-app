import React from "react";
import Header from "./Header";
import Form from "./Form";
import Notes from "./Notes";
import Footer from "./Footer";
import { UserInfo } from "./User/UserInfo";

import "../App.css";
function Home() {
  return (
    <div>
      <UserInfo />
      <Header />
      <Form />
      <Notes />
      <Footer />
    </div>
  );
}

export default Home;
