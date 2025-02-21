import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="fixed top-4 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
