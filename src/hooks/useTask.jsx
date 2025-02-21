import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useTask = () => {
    const axiosPublic = useAxiosPublic();
  

   const {user} = useAuth()
   const { data: tasks = [], isPending: loading, refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
        const res = await axiosPublic.get(`/tasks/${user?.email}`);
        return res.data;
    },
});

    return [tasks,loading, refetch]

};

export default useTask;




