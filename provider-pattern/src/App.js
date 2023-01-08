import React, { useState } from "react";
import "./App.css";
import Toggle from "./components/toggle";
import List from "./components/list";

export const ThemeContext = React.createContext();

function App() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const themes = {
    light: {
      background: "#fff",
      color: "#000",
    },
    dark: {
      background: "#171717",
      color: "#fff",
    },
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };
  const providerValue = {
    theme: themes[currentTheme],
    toggleTheme,
  };
  return (
    <div className={`App theme-${currentTheme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
