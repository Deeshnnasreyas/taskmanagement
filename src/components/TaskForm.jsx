import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const taskSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  dueDate: yup
    .date()
    .nullable() // Allows null values
    // .required("Due date is required")
    .typeError("Invalid date"),
  status: yup.string().oneOf(["true", "false"]).required("Status is required"),
});

const TaskForm = ({ onSaveTask, task, onClose }) => {
  const [formError, setFormError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        dueDate: task.dueDate?.split("T")[0],
        status: task.completed ? "true" : "false",
      });
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    try {
      if (typeof onSaveTask !== "function") {
        throw new Error("onSaveTask is not a function");
      }
      onSaveTask({
        id: task?.id || Date.now(),
        title: data.title,
        dueDate: data.dueDate,
        completed: data.status === "true", 
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setFormError("An error occurred while saving the task.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-[#ffff]">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold text-[#ffff]">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>

          <div>
            <label className="block font-semibold text-[#ffff]">Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full p-2 border rounded text-black"
            />
            <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>
          </div>

          <div>
            <label className="block font-semibold text-[#ffff]">Status</label>
            <select
              {...register("status")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
            <p className="text-red-500 text-sm">{errors.status?.message}</p>
          </div>

          {formError && <p className="text-red-500 text-sm">{formError}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
TaskForm.propTypes = {
  onSaveTask: PropTypes.func.isRequired,
  task: PropTypes.object, // Optional when adding
  onClose: PropTypes.func.isRequired,
};

export default TaskForm;
