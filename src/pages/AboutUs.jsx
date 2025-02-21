import { FaUsers, FaTasks, FaClock, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-white py-16">
      <div className="w-[90%] mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">About Us</h1>
        <p className="mb-10 text-sm md:text-base w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto">
          We are a dedicated team passionate about creating solutions that simplify task management and enhance productivity. 
          Our mission is to provide an intuitive platform to help individuals and teams stay organized and efficient.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Our Mission */}
          <div className="bg-purple-800 text-white px-2 rounded-lg shadow-xl py-4">
            <FaTasks className="text-5xl mb-6 mx-auto" />
            <h3 className="font-semibold text-xl mb-4">Our Mission</h3>
            <p className="text-sm text-center mb-3 ">
              To deliver cutting-edge tools for managing tasks efficiently while ensuring a seamless and productive user experience.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-purple-800 text-white px-2 rounded-lg shadow-xl py-4">
            <FaClock className="text-5xl mb-6 mx-auto" />
            <h3 className="font-semibold text-xl mb-4">Our Vision</h3>
            <p className="text-sm text-center mb-3">
              To empower individuals and organizations to better manage time and increase productivity with our innovative task management platform.
            </p>
          </div>

          {/* Our Team */}
          <div className="bg-purple-800 text-white px-2 rounded-lg shadow-xl py-4">
            <FaUsers className="text-5xl mb-6 mx-auto" />
            <h3 className="font-semibold text-xl mb-4">Our Team</h3>
            <p className="text-sm text-center mb-3">
              A diverse group of passionate professionals dedicated to solving task management challenges and building a strong platform.
            </p>
          </div>

          {/* Security */}
          <div className="bg-purple-800 text-white px-2 rounded-lg shadow-xl py-4">
            <FaShieldAlt className="text-5xl mb-6 mx-auto" />
            <h3 className="font-semibold text-xl mb-4">Security</h3>
            <p className="text-sm text-center mb-3">
              We prioritize your data security and privacy. Our platform ensures that your tasks and sensitive information remain safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
