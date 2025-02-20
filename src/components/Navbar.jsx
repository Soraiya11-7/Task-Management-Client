import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 
import useAuth from "../hooks/useAuth";

export default function Navbar() {
 
    const { user, signOutUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                const error = err.message;
                console.log(error);
            })

    }

    return (
        <nav className="bg-purple-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center w-[90%]">
                <Link to="/" className="text-white text-xl font-bold">Task Manager</Link>

                <div className="flex items-center space-x-3 ml-auto">
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to='/' className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>Home</NavLink>

                        {user && (
                            <>
                                <NavLink to='/add-task' className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>Add Task</NavLink>
                                <NavLink to='/all-tasks' className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>All Tasks</NavLink>
                            </>
                        )}
                    </div>

                    <div className="flex items-center">
                        {/* Login/Logout Button */}
                        {user ? (
                            <button onClick={handleLogOut} className="bg-white text-indigo-700 px-4 py-2 rounded">Logout</button>
                        ) : (
                            <Link to="/login">
                                <button className="bg-white text-indigo-700 px-4 py-2 rounded">Login</button>
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
                    <NavLink to='/' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>Home</NavLink>

                    {user && (
                        <>
                            <NavLink to='/add-task' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>Add Task</NavLink>
                            <NavLink to='/all-tasks' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex items-center gap-x-1 ${isActive ? 'text-lime-400 font-bold' : 'text-white'}`}>All Tasks</NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
