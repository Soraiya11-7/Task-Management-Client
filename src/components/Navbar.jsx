import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for hamburger menu

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        <nav className="bg-purple-800 p-4">
            <div className="container mx-auto flex justify-between items-center w-[90%]">
                {/* Logo */}
                <Link to="/" className="text-white text-xl font-bold">Task Manager</Link>

                {/* Navigation (Right-Aligned) */}
                <div className="flex items-center space-x-3 ml-auto">
                    {/* Desktop Links (Hidden on Small Screens) */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to='/'
                            className={({ isActive }) =>
                                `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                            }>Home</NavLink>

                        {isAuthenticated && (
                            <>
                                <NavLink to='/add-task'
                                    className={({ isActive }) =>
                                        `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                                    }>Add Task</NavLink>
                                <NavLink to='/all-tasks'
                                    className={({ isActive }) =>
                                        `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                                    }>All Tasks</NavLink>


                            </>
                        )}
                    </div>

                   <div className="flex item-center">
                     {/* Login/Logout Button (Always Visible) */}
                     <button
                        onClick={handleAuth}
                        className="bg-white text-indigo-700 px-4 py-2 rounded"
                    >
                        {isAuthenticated ? "Logout" : "Login"}
                    </button>

                    {/* Hamburger Menu (Only Shows in Small Devices) */}
                    <button className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                   </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown (Only Home, Add Task, All Tasks) */}
            {isMenuOpen && (
                <div className="md:hidden bg-purple-700 p-4 flex flex-col space-y-3 items-center">
                    <NavLink to='/'
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                        }>Home</NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink to='/add-task'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                                }>Add Task</NavLink>
                            <NavLink to='/all-tasks'
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-x-1  ${isActive ? 'text-lime-400 font-bold' : 'text-white '}`
                                }>All Tasks</NavLink>

                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
