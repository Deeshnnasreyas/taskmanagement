import { Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold p-4">
        Task management App
      </h1>
      <Outlet />
    </>
  );
}
