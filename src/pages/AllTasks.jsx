import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth"

const AllTasks = () => {


    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    console.log(user.email);
    const { data: tasks = [], isPending: loading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${user?.email}`);
            return res.data;
        }
    })

    console.log( tasks);
    console.log(user);

    // Handle task deletion
    const handleDelete = async (id) => {
        console.log(id)
      
    };
    return (
        <div className="container w-[80%] mx-auto">
            All Tasks
            {
                  loading ? (<div className="flex items-center justify-center">
                    <span className="loading loading-bars loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
                   
                </div>) : 
                tasks && tasks.length > 0 ?
                <div className="container mx-auto p-5 grid md:grid-cols-3 gap-6">
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <div key={category} className="bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold text-green-800 mb-4">{category}</h2>
                        <div className="space-y-4">
                            {tasks.filter((task) => task.category === category).map((task) => (
                                <div key={task._id} className="p-4 border rounded-md shadow-sm">
                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                    <p className="text-gray-600">{task.description}</p>
                                    <div className="flex justify-between mt-3">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
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
            </div> : (
                  <div className="text-center text-gray-800 dark:text-white text-lg font-medium mt-8">
                  No Tasks found.
              </div>
            )
            }
           
        </div>
    );
};
export default AllTasks;




