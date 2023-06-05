import React from "react";
import Form from "../components/Form";
import Notes from "../components/Notes";

import "../App.css";

function Home() {
  return (
    <div className="ml-10">
      <Form />
      <Notes />
    </div>
  );
}

export default Home;
