import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import {
  DarkModeContext,
  DarkModeProvider,
} from "../../context/DarkModeContext";
import Loader from "../../utils/Loader";
import ErrorPage from "../ErrorPage";

const { VITE_APP_URL } = import.meta.env;

// Fetch tasks
const fetchTasks = async () => {
  const { data } = await axios.get(`${VITE_APP_URL}?_limit=1000`);
  return data;
};

const DashboardHome = () => {
  document.title = "Task Management | Dashboard";
  const queryClient = useQueryClient();
  const { darkMode } = useContext(DarkModeContext);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch tasks
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (newTask) => axios.post(VITE_APP_URL, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
      toast.success("Task added successfully!"); //  Success message
    },
    onError: (error) => {
      console.error("Error adding task:", error);
      toast.error("Failed to add task."); //  Error message
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId) => axios.delete(`${VITE_APP_URL}/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted!");
    },
    onError: () => {
      toast.error("Failed to delete task.");
    },
  });
  const updateMutation = useMutation({
    mutationFn: (updatedTask) =>
      axios.put(`${VITE_APP_URL}/${updatedTask.id}`, updatedTask),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update task.");
    },
  });

  const handleDeleteTask = (id) => {
    deleteMutation.mutate(id);
  };

  const handleToggleComplete = (task) => {
    updateMutation.mutate({ ...task, completed: !task.completed });
  };

  const handleSaveTask = async (task) => {
    console.log("editTask", editTask);
    try {
      if (editTask) {
        await updateMutation.mutateAsync(task);
      } else {
        await addMutation.mutateAsync(task);
      }
      setEditTask(null); //  Reset edit task
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  const handleSaveUpdate = async (task) => {
    try {
      await updateMutation.mutateAsync(task);

      setEditTask(null); // Reset edit task
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  const handleEditTask = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };
  const handleCancelEdit = () => {
    setEditTask(null);
  };

  return (
    <DarkModeProvider>
      <div
        className={`min-h-screen bg-white dark:bg-gray-900 ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Add Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Task
          </button>

          {isLoading && <Loader />}
          {isError && (
            <ErrorPage message="Failed to load tasks. Please try again later." />
          )}
          {tasks && (
            <TaskList
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onSaveTask={handleSaveUpdate}
            />
          )}
        </div>

        {/* Task Form Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Add Task</h2>

              <TaskForm
                onSaveTask={handleSaveTask} // Make sure this function is passed
                task={editTask}
                onClose={() => setIsModalOpen(false)}
              />

              <button
                className="mt-2 w-full bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </DarkModeProvider>
  );
};

export default DashboardHome;
