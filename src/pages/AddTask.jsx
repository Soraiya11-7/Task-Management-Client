import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const AddTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const {user} = useAuth();

    const onSubmit = async (data) => {
        try {
            const taskDetails = {
                title: data.name,
                category: data.category,
                description: data.description,
                timestamp: new Date().toISOString(),
                userEmail:user?.email,
            };

            // Save camp details to the database
            const dbResponse = await axiosPublic.post("/tasks", taskDetails);
            if (dbResponse.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `task has been added successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/all-tasks');
            };
        }
        catch (error) {
            console.error("Error adding camp:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };
    return (
        <div className="container w-[80%] mx-auto">
            <div className="my-8 overflow-hidden">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-8">
                    Add a New Task
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-gray-100 rounded-lg shadow-lg px-6 md:px-10 py-8 dark:text-black"
                >
                   
                        {/* Task Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Task Title*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Task Name"
                                {...register("name", { required: true, maxLength: 50 })}
                                className="input input-bordered w-full text-sm sm:text-base"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name?.type === "required" ? "Task Name is required" : "Max 50 characters allowed"} </p>}
                        </div>

                        {/* Location */}
                        {/* Category */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-sm sm:text-base">Category*</span>
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered w-full text-sm sm:text-base"
                            >
                                <option value="">Select Category</option>
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                        </div>


                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm sm:text-base">Description</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register("description",{ maxLength: 200 })}
                            className="textarea textarea-bordered h-24 w-full"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm"> Max 200 characters allowed</p>}
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-purple-900 hover:bg-purple-800 text-white w-full mb-5">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;



