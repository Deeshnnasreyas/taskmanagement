import { useState } from "react";
import PropTypes from "prop-types";
import TaskForm from "./TaskForm"; // Import updated TaskForm
import {
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const TaskList = ({
  tasks,
  onDeleteTask,
  onSaveTask,
  onToggleStatus,
  onViewTask,
}) => {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editTask, setEditTask] = useState(null);

  const tasksPerPage = 5;
  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.completed
      : filter === "pending"
      ? !task.completed
      : true
  );
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.dueDate) - new Date(b.dueDate)
      : new Date(b.dueDate) - new Date(a.dueDate)
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold text-[#ffff]">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold text-[#ffff]">
            Sort by Due Date:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-600 dark:bg-gray-900 text-white">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-[#ffff]"
              >
                <td className="p-3">{task.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.completed
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="p-3">{task.dueDate || "N/A"}</td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => onViewTask(task)}
                    className="p-2  text-yellow-500 rounded cursor-pointer"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditTask(task)}
                    className=" cursor-pointer text-green-600 px-3 py-1 rounded text-sm"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task)}
                    className="cursor-pointer text-red-700 px-3 py-1 rounded text-sm"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={task.completed}
                      onChange={() => onToggleStatus(task.id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {Math.ceil(sortedTasks.length / tasksPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastTask < sortedTasks.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastTask >= sortedTasks.length}
          className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/*  */}
      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-[#fff]">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 my-3">
              Are you sure you want to delete {taskToDelete.title}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTaskToDelete(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteTask(taskToDelete.id);
                  setTaskToDelete(null);
                }}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {editTask && (
        <TaskForm
          task={editTask}
          onClose={() => setEditTask(null)}
          onSaveTask={onSaveTask}
        />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onViewTask: PropTypes.func.isRequired,
};

export default TaskList;
