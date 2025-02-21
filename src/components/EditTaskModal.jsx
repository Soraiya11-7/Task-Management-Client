import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const EditTaskModal = ({ isOpen, task, onClose, refetch }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();

  // Reset form with task data when the modal opens or task changes
  useEffect(() => {
    if (task) {
      reset({
        _id: task._id, // Include task ID in the form data
        title: task.title,
        description: task.description,
        category: task.category,
      });
    }
  }, [task, reset]);

  // Handle task update
  const onSubmit = async (data) => {
    try {
      const dbResponse = await axiosPublic.put(`/tasks/${data._id}`, data); // Use data._id to identify the task
      if (dbResponse.data.modifiedCount > 0) {
        refetch(); // Refetch tasks to update the UI
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Task updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        onClose(); // Close the modal
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  // console.log("Refetch Type:", typeof refetch); 

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-black">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-xl font-bold text-purple-800-800 mb-4 text-center">Update Task</h3>

              {/* Hidden Input for Task ID */}
              <input type="hidden" {...register('_id')} />

              {/* Title Field */}
              <div className="form-control text-left">
                <label className="label">
                  <span className="label-text text-sm sm:text-base text-black">Task Title*</span>
                </label>
                <input
                  type="text"
                  {...register('title', {
                    required: true,
                    maxLength: { value: 50, message: 'Max 50 characters allowed' }
                  })}
                  className="input input-bordered w-full text-sm sm:text-base text-gray-700"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">
                    {errors.title.type === "required" ? "Task Title is required" : errors.title.message}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div className="form-control mt-1 text-left">
                <label className="label">
                  <span className="label-text text-sm sm:text-base text-black">Category*</span>
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="select select-bordered w-full text-sm sm:text-base text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="form-control mt-1 text-left">
                <label className="label">
                  <span className="label-text text-sm sm:text-base text-black">Description</span>
                </label>
                <textarea
                  {...register('description', {
                    maxLength: { value: 200, message: 'Max 200 characters allowed' }
                  })}
                  className="textarea textarea-bordered w-full text-sm sm:text-base text-gray-700"
                  rows="4"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-5">
                <button
                  type="button" // Ensure this is a button, not a submit
                  onClick={onClose}
                  className="btn btn-outline btn-sm sm:btn-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit" // Ensure this is a submit button
                  className="btn btn-sm sm:btn-md bg-purple-800 text-white hover:bg-purple-900"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

EditTaskModal.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default EditTaskModal;