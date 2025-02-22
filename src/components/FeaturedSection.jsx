import { FaTasks, FaRegCalendarCheck, FaArrowsAlt, FaTrashAlt } from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <div className=" text-gray-800 my-14 ">
      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-purple-800">Featured Tasks</h2>
        <p className="text-base mb:text-lg mb-12 text-gray-600">Efficiently manage your tasks with ease</p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1: Task Management */}
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
            <FaTasks className="text-purple-800 text-4xl mb-4 mx-auto" />
            <h3 className="font-bold text-lg md:text-xl mb-8 text-center">Task Creation</h3>
            <p className="text-sm lg:text-base text-center text-gray-700">
              Easily create tasks with title, description, and deadlines. Keep track of your to-do list
              in a clean, intuitive interface.
            </p>
          </div>

          {/* Feature 2: Real-Time Updates */}
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
            <FaRegCalendarCheck className="text-purple-800 text-4xl mb-4 mx-auto" />
            <h3 className="font-bold text-lg md:text-xl mb-8 text-center">Real-Time Sync</h3>
            <p className="text-sm lg:text-base text-center text-gray-700">
              Stay up-to-date with real-time synchronization. Changes are reflected instantly, no matter
              where you are or which device you use.
            </p>
          </div>

          {/* Feature 3: Task Progress */}
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
            <FaArrowsAlt className="text-purple-800 text-4xl mb-4 mx-auto" />
            <h3 className="font-bold text-lg md:text-xl mb-8 text-center">Drag & Drop Organization</h3>
            <p className="text-sm lg:text-base text-center text-gray-700">
            Effortlessly organize your tasks with drag-and-drop functionality, allowing you to reorder and categorize tasks with ease.
            </p>
          </div>

          {/* Feature 4: Task Deletion */}
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
            <FaTrashAlt className="text-purple-800 text-4xl mb-4 mx-auto" />
            <h3 className="font-bold text-lg md:text-xl mb-8 text-center">Task Deletion</h3>
            <p className="text-sm lg:text-base text-center text-gray-700">
              Delete tasks that are no longer needed. Our app ensures that tasks are permanently removed
              from your list and the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
