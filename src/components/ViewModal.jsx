import React from "react";
import PropTypes from "prop-types";
const ViewModal = ({ onViewOpen, viewTask }) => {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => onViewOpen(false)}
      >
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#ffff]">
            Task Details
          </h2>
          <p className="text-gray-900 dark:text-gray-100">
            <strong>Title:</strong> {viewTask.title}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Description:</strong> {viewTask.description}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Status:</strong>{" "}
            {viewTask.completed ? "Completed ✅" : "Pending ⏳"}
          </p>

          <button
            className="mt-4 w-full bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => onViewOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
ViewModal.propTypes = {
  onViewOpen: PropTypes.func.isRequired,
  viewTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
};
export default ViewModal;
