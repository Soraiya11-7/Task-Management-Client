
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaRegClock, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useTask from "../hooks/useTask";
import EditTaskModal from "../components/EditTaskModal";


const categories = ["To-Do", "In Progress", "Done"];

const TaskManagement = () => {
    const axiosPublic = useAxiosPublic();
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
   

    const [tasks, loading, refetch] = useTask();
    const [localTasks, setLocalTasks] = useState(tasks);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    // setLocalTasks(tasks);
    // console.log(tasks);
    // console.log(localTasks);

    const openModal = (task) => {
        setEditTask(task);
        setShowModal(true);
    
    };

    // const closeModal = () => setShowModal(false);

    // const { data: tasks = [], isPending: loading, refetch } = useQuery({
    //     queryKey: ["tasks", user?.email],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/tasks/${user?.email}`);
            
    //         return res.data;
    //     },
    // });

    // Handle drag-and-drop
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const updatedTasks = Array.from(localTasks);
        const taskIndex = updatedTasks.findIndex((task) => task._id === draggableId);
        if (taskIndex === -1) return;

        const task = updatedTasks[taskIndex];
        updatedTasks.splice(taskIndex, 1);
        updatedTasks.splice(destination.index, 0, {
            ...task,
            category: destination.droppableId,
        });

        setLocalTasks(updatedTasks);

        const reorderData = {
            sourceCategory: source.droppableId,
            destinationCategory: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            taskId: draggableId,
        };

        try {
            await axiosPublic.post("/tasks/reorder", reorderData);
            refetch();
        } catch (error) {
            setLocalTasks(tasks);
            toast.error(error.message || "Failed to reorder task");
        }
    };

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
                const res = await axiosPublic.delete(`/tasks/${task._id}`);
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
            toast.error(err.message || "An unexpected error occurred", {
                position: "top-center",
                autoClose: 2000,
            });
        });
    };

 
    // // Handle task update
    // const handleUpdateTask = async (updatedTask) => {
    //     try {
    //         const dbResponse = await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
    //         if (dbResponse.data.modifiedCount > 0) {
    //             refetch();
    //             setShowModal(false);
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: `Task updated successfully.`,
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //         }
    //     } catch (err) {
    //         toast.error(err.message || "An unexpected error occurred", {
    //             position: "top-center",
    //             autoClose: 2000,
    //         });
    //     }
    // };

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
        });
    };

    return (
        <div className="container w-[90%] mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center my-8 dark:text-white">All Tasks</h2>

            {loading ? (
                <div className="flex items-center justify-center">
                    <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-purple-800"></span>
                </div>
            ) : (
            <>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid md:grid-cols-3 gap-6 relative overflow-hidden border border-red-500">
                        {categories.map((category) => (
                            <Droppable key={category} droppableId={category}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="bg-white p-3 shadow-lg rounded-lg min-h-[300px] border border-gray-200"
                                    >
                                        <h2 className="text-xl font-bold text-purple-800 mb-4">{category}</h2>
                                        <div className="space-y-4">
                                            {localTasks
                                                .filter((task) => task.category === category)
                                                .map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="p-2 border border-purple-800 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 touch-none"
                                                            >
                                                                <h3 className="text-lg font-semibold text-black text-center sm:text-left"><strong>Title: </strong>{task.title}</h3>
                                                                <p className="text-gray-600 text-sm text-left">{task.description}</p>
                                                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                                                    <FaRegClock className="mr-2" />
                                                                    <span>{formatTimestamp(task.timestamp)}</span>
                                                                </div>
                                                                <div className="flex justify-end mt-3 space-x-3">
                                                                    <button
                                                                        onClick={() => openModal(task)}
                                                                        className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                                                                    >
                                                                        <FaEdit className="w-5 h-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(task)}
                                                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                                    >
                                                                        <FaTrash className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>

                
            <EditTaskModal
            isOpen={showModal}
            task={editTask}
            onClose={() => setShowModal(false)}
            // onSave={handleUpdateTask}
            refetch={refetch}
        />
         
                        
                           
            </>
            )}

           
        </div>
    );
};

export default TaskManagement;