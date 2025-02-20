import { FaRegClock } from "react-icons/fa";
import PropTypes from 'prop-types';

  const Task = ({ task, handleEdit, handleDelete }) => {
      // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };
    return (
        <div>
                <div className="">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      
      {/* Timestamp with Icon */}
      <div className="flex items-center text-sm text-gray-500 mt-2">
        <FaRegClock className="mr-2" />
        <span>{formatTimestamp(task.timestamp)}</span>
      </div>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => handleEdit(task)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
            
        </div>
    );
  };
  Task.propTypes = {
    task: PropTypes.object,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
  };
  
  export default Task;