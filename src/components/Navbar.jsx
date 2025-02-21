import { logout } from "../redux/userSlice";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm font-semibold">
              Welcome, {user?.Email || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm">Not logged in</span>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
