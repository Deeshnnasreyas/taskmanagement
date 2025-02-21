import PropTypes from "prop-types";
import { createContext, useState, useEffect, useContext } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white"); // Apply dark mode styles
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.add("bg-white", "text-black"); // Apply light mode styles
      document.body.classList.remove("bg-gray-900", "text-white");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// Custom hook for easy access
export const useDarkMode = () => useContext(DarkModeContext);
