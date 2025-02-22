
import { useNavigate } from 'react-router-dom'

import Lottie from "lottie-react";
import lottie from '../assets/login.json'
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';



const Login = () => {
 
    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user?.uid);
                const userInfo = {
                    userId: result.user?.uid,
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {

                        Swal.fire({
                            title: "Login Successful!",
                            text: `Welcome, ${result?.user?.displayName}!`,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        navigate('/home');
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
        <div className=" container my-10 md:my-2 min-h-screen flex flex-col items-center justify-center mx-auto w-[90%]">
            <h1 className="text-center  pb-4 text-xl font-bold md:text-4xl text-purple-800">Welcome to TaskFlow!</h1>
            <p className="text-center text-sm sm:text-base md:text-xl w-[80%] mx-auto">Enhance your productivity with seamless task management. Please sign in to get started.</p>
            <div className="flex flex-col-reverse gap-4 md:gap-10 mt-8  md:flex-row items-center justify-center   ">

                <div className="bg-purple-800 p-8 rounded-lg shadow-lg text-center max-w-[330px] md:w-[400px]">
                    <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">Welcome to TaskFlow</h2>
                    <p className="text-gray-300 mb-6">Streamline your tasks with ease</p>
                      <button onClick={handleGoogleSignIn} className='p-1 sm:p-2 flex items-center justify-center gap-2 rounded-lg border text-base sm:text-lg bg-white text-purple-800 w-full hover:bg-gray-200'><FcGoogle className='text-base sm:text-xl'></FcGoogle> Login with Google</button>
                </div>

                
                <div className="max-w-[300px] md:w-[450px]" >
                    <Lottie animationData={lottie}></Lottie>

                </div>


            </div>
        </div>


    );
};

export default Login;