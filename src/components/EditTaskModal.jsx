import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const EditTaskModal = ({ isOpen, task, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Reset form with task data when the modal opens or task changes
  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task, reset]);

  // Handle save
  const onSubmit = (data) => {
    onSave(data); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/30 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Edit Task</h3>

          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              {...register('title', { 
                required: 'Title is required',
                maxLength: { value: 50, message: 'Title must be at most 50 characters long' }
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description Field */}
          <div className="mt-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              {...register('description', { 
                maxLength: { value: 200, message: 'Description must be at most 200 characters long' }
              })}
              className="w-full p-2 border rounded-md"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Category .........................*/}
          <div className="mt-4">
            <label htmlFor="category" className="block mb-2">Category</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Action Buttons........................ */}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-purple-800 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

EditTaskModal.propTypes = {
  task: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default EditTaskModal;
