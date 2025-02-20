
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";


const Login = () => {
    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    // console.log(from);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {

                        toast.success( "User Login Successful.", {
                            position: "top-center",
                            autoClose: 2000,
                        });

                        // Swal.fire({
                        //     title: 'User Login Successful.',
                        //     showClass: {
                        //         popup: 'animate__animated animate__fadeInDown'
                        //     },
                        //     hideClass: {
                        //         popup: 'animate__animated animate__fadeOutUp'
                        //     }
                        // });
                        // // console.log(res.data);
                        navigate(from, { replace: true });
                    })
            })
            .catch((err) => {
                // setError({ ...error, login: err.code })
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                // setError(errorCode );
                toast.error(errorCode || "An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 2000,
                });

            });
    }

    return (

        <div className='dark:bg-gray-700 '>
            <div className="hero  w-[90%] mx-auto flex justify-center py-10 items-center">
                <div className="card bg-base-100  w-64 mx-auto shadow-2xl p-1 sm:p-2 h-72 border border-purple-800 mt-12">
                    <h1 className="text-xl sm:text-3xl font-bold text-center mt-3 mb-10">Login now!</h1>

                    <div className="">
                        <div className="flex justify-center items-center ">
                            <button onClick={handleGoogleSignIn} className='p-1 sm:p-2 flex items-center gap-1 rounded-xl border text-base sm:text-lg hover:border-green-700'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;