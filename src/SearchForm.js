import React, { useEffect } from "react";
import { useState, useContext, useReducer } from "react";
import { useGlobalContext } from "./context";

const Form = () => {
  const { dispatch } = useGlobalContext();
  const [type, setType] = useState("");
  const handleChange = (value) => {
    setType(value);
  };
  const handleSubmit = () => {
    setType("");
    dispatch({ type: "HANDLE_SUBMIT", payload: type });
  };

  return (
    <form
      className="search-form"
      onSubmit={(e) => handleSubmit(e.preventDefault())}
    >
      <h2>search tech news</h2>
      <input
        className="form-input"
        type="text"
        value={type}
        placeholder="Type Eg- ANGULAR , JAVASCRIPT etc"
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
};

export default Form;
