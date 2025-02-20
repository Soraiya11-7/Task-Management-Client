import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-950 to-purple-900 text-white">
        <div className="container  w-[85%] mx-auto  py-6">
        <div className=" mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
        
        {/* Logo / Brand */}
        <div className="text-lg font-bold">Task Manager</div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full  bg-opacity-20 hover:bg-opacity-40 transition"
          >
            <FaFacebookF className="text-white" size={18} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full  bg-opacity-20 hover:bg-opacity-40 transition"
          >
            <FaTwitter className="text-white" size={18} />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full  bg-opacity-20 hover:bg-opacity-40 transition"
          >
            <FaGithub className="text-white" size={18} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full  bg-opacity-20 hover:bg-opacity-40 transition"
          >
            <FaLinkedinIn className="text-white" size={18} />
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-5 text-sm">
          <a href="#" className="hover:text-indigo-300 transition">About</a>
          <a href="#" className="hover:text-indigo-300 transition">Privacy</a>
          <a href="#" className="hover:text-indigo-300 transition">Contact</a>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-white border-opacity-20 mt-3 py-3 text-center text-sm opacity-80 ">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
        </div>
      
    </footer>
  );
}
