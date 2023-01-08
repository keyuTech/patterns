import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";

const ListItem = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <li style={theme}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </li>
  );
};

export default ListItem;
