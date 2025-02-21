// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAuth from "../hooks/useAuth";
// import EditTaskModal from "../components/EditTaskModal";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { FaRegClock } from "react-icons/fa";
// import io from "socket.io-client";

// const categories = ["To-Do", "In Progress", "Done"];

// const socket = io("http://localhost:5000"); // Replace with your server URL

// const AllTasks = () => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const [showModal, setShowModal] = useState(false);
//     const [editTask, setEditTask] = useState(null);
//     const [tasksData, setTasksData] = useState([]);

//     const { data: tasks = [], isPending: loading, refetch } = useQuery({
//         queryKey: ["tasks", user?.email],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/tasks/${user?.email}`);
//             setTasksData(res.data); // Set local state
//             return res.data;
//         },
//     });
//     // console.log(tasks);

//     useEffect(() => {
//         socket.on("taskUpdated", (updatedTask) => {
//             const updatedTasks = tasksData.map((task) =>
//                 task._id === updatedTask._id ? updatedTask : task
//             );
//             setTasksData(updatedTasks);
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.off("taskUpdated");
//         };
//     }, [tasksData]);

//     // Sync tasks with WebSocket on update


//     // Handle task deletion
//     const handleDelete = (task) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await axiosPublic.delete(`/tasks/${task._id}`);
//                 if (res.data.deletedCount > 0) {
//                     refetch();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `Task has been deleted`,
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                 }
//             }
//         }).catch((err) => {
//             toast.error(err.message || "An unexpected error occurred", {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         });
//     };

//     // Handle task edit
//     const handleEdit = (task) => {
//         setEditTask(task);
//         setShowModal(true);
//     };

//     const handleUpdateTask = async (updatedTask) => {
//         try {
//             const dbResponse = await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
//             if (dbResponse.data.modifiedCount > 0) {
//                 refetch();
//                 setShowModal(false);
//                 socket.emit("taskUpdated", updatedTask); // Emit update to WebSocket
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `Task updated successfully.`,
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//             }
//         } catch (err) {
//             toast.error(err.message || "An unexpected error occurred", {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         }
//     };

//     // Handle Drag-and-Drop

//     // const onDragEnd = async (result) => {
//     //     const { source, destination } = result;

//     //     // If dropped outside of a valid droppable area
//     //     if (!destination) return;

//     //     // If dropped in the same position (no actual change)
//     //     if (source.droppableId === destination.droppableId && source.index === destination.index) {
//     //         return;
//     //     }

//     //     // Find the dragged task
//     //     const updatedTasks = [...tasksData];
//     //     const draggedTaskIndex = updatedTasks.findIndex(task => task._id === result.draggableId);
//     //     const draggedTask = updatedTasks[draggedTaskIndex];

//     //     if (!draggedTask) return;

//     //     // Update category if moved to a different column
//     //     if (source.droppableId !== destination.droppableId) {
//     //         draggedTask.category = destination.droppableId; // Update task category
//     //     }

//     //     // Remove from old position and insert into new position
//     //     updatedTasks.splice(source.index, 1); // Remove from original position
//     //     updatedTasks.splice(destination.index, 0, draggedTask); // Insert into new position

//     //     // Update state optimistically
//     //     setTasksData(updatedTasks);

//     //     // Send the updated task to the backend
//     //     try {
//     //         const dbResponse = await axiosPublic.put(`/tasks/${draggedTask._id}`, draggedTask);
//     //         if (dbResponse.data.modifiedCount > 0) {
//     //             // Emit the update to the WebSocket
//     //             socket.emit("taskUpdated", draggedTask);
//     //             // Refresh data after the update is successful
//     //             refetch(); 
//     //         }
//     //     } catch (err) {
//     //         toast.error(err.message || "Error updating task", { position: "top-center", autoClose: 2000 });
//     //     }
//     // };
//     const onDragEnd = async (result) => {
//         const { source, destination } = result;

//         // If dropped outside of a valid droppable area
//         if (!destination) return;

//         // If dropped in the same position (no actual change)
//         if (source.droppableId === destination.droppableId && source.index === destination.index) {
//             return;
//         }

//         // Find the dragged task
//         const updatedTasks = [...tasksData];
//         const draggedTaskIndex = updatedTasks.findIndex((task) => task._id === result.draggableId);
//         const draggedTask = updatedTasks[draggedTaskIndex];

//         if (!draggedTask) return;

//         // Update category if moved to a different column
//         if (source.droppableId !== destination.droppableId) {
//             draggedTask.category = destination.droppableId; // Update task category
//         }

//         // Remove from old position and insert into new position
//         updatedTasks.splice(source.index, 1); // Remove from original position
//         updatedTasks.splice(destination.index, 0, draggedTask); // Insert into new position


//         // Update state optimistically
//         setTasksData(updatedTasks);

//         // Send the updated task to the backend immediately
//         try {
//             const dbResponse = await axiosPublic.put(`/tasks/${draggedTask._id}`, draggedTask);
//             if (dbResponse.data.modifiedCount > 0) {
//                 // Emit the update to the WebSocket
//                 socket.emit("taskUpdated", draggedTask);

//                 // Refresh data after the update is successful (no need for page refresh)
//                 refetch();
//             }
//         } catch (err) {
//             toast.error(err.message || "Error updating task", { position: "top-center", autoClose: 2000 });
//         }
//     };




//     // Format timestamp
//     const formatTimestamp = (timestamp) => {
//         const date = new Date(timestamp);
//         return date.toLocaleString("en-US", {
//             weekday: "short",
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//             hour: "numeric",
//             minute: "numeric",
//         });
//     };

//     return (
//         <div className="container w-[80%] mx-auto">
//             <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center my-8 dark:text-white">All Tasks</h2>

//             {loading ? (
//                 <div className="flex items-center justify-center">
//                     <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-purple-800"></span>
//                 </div>
//             ) : (
//                 <DragDropContext onDragEnd={onDragEnd}>
//                     <div className="grid md:grid-cols-3 gap-6">
//                         {categories.map((category) => (
//                             <Droppable key={category} droppableId={category}>
//                                 {(provided) => (
//                                     <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white p-4 shadow-md rounded-lg min-h-[300px]">
//                                         <h2 className="text-xl font-semibold text-purple-800 mb-4">{category}</h2>
//                                         <div className="space-y-4">
//                                             {tasksData
//                                                 .filter((task) => task.category === category)
//                                                 .map((task, index) => (
//                                                     <Draggable key={task._id + "-" + index} draggableId={task._id.toString()} index={index}>
//                                                         {(provided) => (
//                                                             <div
//                                                                 ref={provided.innerRef}
//                                                                 {...provided.draggableProps}
//                                                                 {...provided.dragHandleProps}
//                                                                 className="p-4 border rounded-md shadow-sm bg-gray-100"
//                                                             >
//                                                                 <h3 className="text-lg font-semibold">{task.title}</h3>
//                                                                 <p className="text-gray-600">{task.description}</p>
//                                                                 <div className="flex items-center text-sm text-gray-500 mt-2">
//                                                                     <FaRegClock className="mr-2" />
//                                                                     <span>{formatTimestamp(task.timestamp)}</span>
//                                                                 </div>
//                                                                 <div className="flex justify-between mt-3">
//                                                                     <button onClick={() => handleEdit(task)} className="text-blue-500 hover:underline">
//                                                                         Edit
//                                                                     </button>
//                                                                     <button onClick={() => handleDelete(task)} className="text-red-500 hover:underline">
//                                                                         Delete
//                                                                     </button>
//                                                                 </div>
//                                                             </div>
//                                                         )}
//                                                     </Draggable>

//                                                 ))}
//                                             {provided.placeholder}
//                                         </div>
//                                     </div>
//                                 )}
//                             </Droppable>
//                         ))}
//                     </div>
//                 </DragDropContext>
//             )}

//             {/* Modal for Editing Task */}
//             <EditTaskModal
//                 isOpen={showModal}
//                 task={editTask}
//                 onClose={() => setShowModal(false)}
//                 onSave={handleUpdateTask}
//             />
//         </div>
//     );
// };

// export default AllTasks;