import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Toggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input type="checkbox" onClick={toggleTheme} />
      <span className="slider round" />
    </label>
  );
};

export default Toggle;
