import React from "react";
import Header from "./Header";
import Form from "./Form";
import Notes from "./Notes";
import Footer from "./Footer";
import { UserInfo } from "./UserInfo";

import "../App.css";
function Home() {
  return (
    <div className="">
      <UserInfo />
      <Header></Header>
      <Form></Form>
      <Notes></Notes>
      <Footer></Footer>
    </div>
  );
}

export default Home;
