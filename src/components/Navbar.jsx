import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

export default function Navbar() {

    const { user, signOutUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: "Logout Successful!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate('/')
            })
            .catch(() => {
                // const error = err.message;
                // console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "There was an error in logout. Please try again.",
                    icon: "error",
                })

            })

    }

    return (
        <nav className="bg-purple-800 py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center w-[90%]">
                <h1 className="text-white text-xl md:text-2xl font-bold">TaskFlow</h1>

                {/* Large device */}
                <div className="flex items-center space-x-3 ml-auto">
                    <div className="hidden md:flex items-center space-x-5">


                        {user && (
                            <>
                                <NavLink to='/home'
                                    className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                    Home
                                </NavLink>
                                <NavLink to='/about'
                                    className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                    About Us
                                </NavLink>
                                <NavLink to='/contact'
                                    className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                    Contact
                                </NavLink>

                                <NavLink to='/addTask'
                                    className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                    Add Task
                                </NavLink>
                                <NavLink to='/allTask'
                                    className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                    All Tasks
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div className="flex items-center">
                        {/* Login/Logout Button */}
                        {user ? (
                            <button onClick={handleLogOut} className="bg-white text-purple-700 px-4 py-2 rounded-lg">
                                Logout
                                </button>
                        ) : (
                            <Link to="/">
                                <button className="bg-white text-purple-700 px-4 py-2 rounded-lg">
                                    Login
                                    </button>
                            </Link>
                        )}

                        {/* Hamburger Menu */}
                        <button className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-purple-700 p-4 flex flex-col space-y-3 items-center">


                    {user && (
                        <>
                            <NavLink to='/home'
                                onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                Home
                            </NavLink>
                            <NavLink to='/about'
                                onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                About Us
                            </NavLink>
                            <NavLink to='/contact'
                                onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                Contact
                            </NavLink>
                            <NavLink to='/addTask'
                                onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                Add Task
                            </NavLink>
                            <NavLink to='/allTask'
                                onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>
                                All Tasks
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
