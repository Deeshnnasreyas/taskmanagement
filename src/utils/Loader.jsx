import { ClipLoader } from "react-spinners";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <ClipLoader color="#ffffff" size={50} />
  </div>
);

export default Loader;
