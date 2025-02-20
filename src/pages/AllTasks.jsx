import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import EditTaskModal from "../components/EditTaskModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const AllTasks = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);

    console.log(user.email);

    const { data: tasks = [], isPending: loading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${user?.email}`);
            return res.data;
        }
    });

    // console.log(tasks);
    // console.log(user);

      // Handle task deletion
    const handleDelete = (task) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(camp.CampName);
            const res = await axiosPublic.delete(`/tasks/${task._id}`);
            // console.log(res);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Task has been deleted`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        }).catch((err) => {
          // console.error("Error updating profile:", error);
          const errorMessage = err.message;
          toast.error(errorMessage || "An unexpected error occurred", {
            position: "top-center",
            autoClose: 2000,
        });
        })
      };

    // Handle task deletion
    // const handleDelete = async (id) => {
    //     try {
    //         await axiosPublic.delete(`/tasks/${id}`);
    //         alert("Task deleted successfully");
    //     } catch (error) {
    //         console.error("Error deleting task:", error);
    //         alert("Error deleting task");
    //     }
    // };

    // Handle task edit
    const handleEdit = (task) => {
        setEditTask(task);
        setShowModal(true);
    };


    const handleUpdateTask = async (updatedTask) => {
        try {
            const dbResponse = await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
            if (dbResponse.data.modifiedCount > 0) {
                refetch();
                setShowModal(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Task updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            // console.error("Error updating camp:", error);
            const errorMessage = err.message;
            // setError(errorCode );
            toast.error(errorMessage || "An unexpected error occurred", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

 

    return (
        <div className="container w-[80%] mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center my-8 dark:text-white">All Tasks</h2>
            {
                loading ? (
                    <div className="flex items-center justify-center">
                        <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-purple-800"></span>
                    </div>
                ) :
                    tasks && tasks.length > 0 ? (
                        <div className="container mx-auto p-5 grid md:grid-cols-3 gap-6">
                            {["To-Do", "In Progress", "Done"].map((category) => (
                                <div key={category} className="bg-white p-4 shadow-md rounded-lg">
                                    <h2 className="text-xl font-semibold text-purple-800 mb-4">{category}</h2>
                                    <div className="space-y-4">
                                        {tasks.filter((task) => task.category === category).map((task) => (
                                            <div key={task._id} className="p-4 border rounded-md shadow-sm">
                                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                                <p className="text-gray-600">{task.description}</p>
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
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-800 dark:text-white text-lg font-medium mt-8">
                            No Tasks found.
                        </div>
                    )
            }

            {/* Modal for Editing Task */}
            <EditTaskModal
                isOpen={showModal}
                task={editTask}
                onClose={() => setShowModal(false)}
                onSave={handleUpdateTask}
            />
        </div>
    );
};

export default AllTasks;
