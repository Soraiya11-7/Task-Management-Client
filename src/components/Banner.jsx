import { Link } from 'react-router-dom';
import img3 from '../assets/tasks_banner.jpg';

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[230px] sm:h-[320px] md:h-[460px] rounded-b-lg overflow-hidden">
        {/* Background Image */}
        <img
          src={img3}
          alt="Task Management Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay with Text (Left-Aligned) */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start text-left pl-6 sm:pl-10 md:pl-16 lg:pl-20 p-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white ">
            Efficient Task Management
          </h1>
          <p className="mt-3 text-gray-200 text-sm md:text-lg w-[90%] md:w-[60%]">
            Organize, prioritize, and track tasks effortlessly to boost productivity and achieve your goals.
          </p>
          <Link to="/addTask">
            <button className="mt-6 px-4 py-2 text-lg font-semibold bg-white rounded-lg hover:bg-gray-400 transition text-purple-800">
              Get Started
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
