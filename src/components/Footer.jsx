import { FaChartLine, FaFacebookF, FaGithub, FaLinkedinIn, FaSync, FaTasks } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8 pb-4">
      <div className="container mx-auto w-[90%] flex flex-col md:flex-row justify-between text-center md:text-left">

        {/* Site Name */}
        <div className="md:w-[35%]">
          <h2 className="text-2xl font-bold mb-3 ">TaskFlow</h2>
          <p className="text-xs md:text-sm opacity-80 mt-2 w-[90%] sm:w-[80%] md:w-[70%] mx-auto md:mx-0">
            Enhance productivity with a structured task flow, enabling efficient planning, real-time progress tracking, and streamlined collaboration from start to finish.
          </p>

        </div>

        {/* Services Section */}
        <div className="mt-6 md:mt-0 md:w-[35%] mx-auto md:mx-0">
          <h3 className="text-xl md:text-2xl font-bold mb-3">Our Services</h3>
          <ul className="space-y-1">
            <li className="flex items-center text-xs sm:text-sm md:text-base space-x-3">
              <FaTasks className="text-white text-xs sm:text-sm md:text-base" />
              <span>Create, Modify, and Remove Tasks</span>
            </li>
            <li className="flex items-center text-xs sm:text-sm md:text-base space-x-3">
              <FaSync className="text-white text-xs sm:text-sm md:text-base" />
              <span>Seamless Drag-and-Drop Task Management</span>
            </li>
            <li className="flex items-center text-xs sm:text-sm md:text-base space-x-3">
              <FaChartLine className="text-white text-xs sm:text-sm md:text-base" />
              <span>Comprehensive Progress Monitoring</span>
            </li>
          </ul>
        </div>

           {/* Social Icons */}
           <div className="mt-6 md:mt-0">
          <h3 className="font-bold text-white mb-3 text-xl md:text-2xl">Join Us</h3>
          <div className="flex justify-center md:justify-start space-x-2 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border bg-opacity-20 hover:text-purple-800 transition"
            >
              <FaFacebookF className="text-white" size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border bg-opacity-20 hover:text-purple-800 transition"
            >
              <FaGithub className="text-white" size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border bg-opacity-20 hover:text-purple-800 transition"
            >
              <FaLinkedinIn className="text-white" size={18} />
            </a>
          </div>
        </div>

     

      </div>

      {/* Divider */}
      <div className="border-t border-white w-[90%] mx-auto my-6"></div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm opacity-80">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
