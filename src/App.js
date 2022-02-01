import React, { useEffect } from "react";
import { useState, useContext, useReducer } from "react";
import { useGlobalContext } from "./context";
import Form from "./SearchForm";
import News from "./News";
import Buttons from "./buttons";

function App() {
  return (
    <div className="App">
      <Form />
      <Buttons />
      <News />
    </div>
  );
}

export default App;
