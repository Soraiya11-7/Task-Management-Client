import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      toast.success('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <div className="py-12">
      {/* Contact Title and Info */}
      <div className="w-[90%] mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-4">Contact Us</h1>
        <p className="text-black text-base mb-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
          We are here to help! If you have any questions or need assistance, feel free to reach out to us.
        </p>

        {/* Contact Info & Form */}
        <div className="flex flex-col-reverse md:flex-row gap-16 lg:w-[80%] mx-auto">
          {/* Contact Form on the Left */}
          <div className="w-[90%] sm:w-[80%] mx-auto md:w-[50%] text-center bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-left text-purple-800 mb-4">Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3 md:mb-6 text-left">
                <label className="text-sm text-purple-800 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-800"
                  required
                />
              </div>

              <div className="flex flex-col mb-3 md:mb-6 text-left">
                <label className="text-sm text-purple-800 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="p-3 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-800"
                  required
                />
              </div>

              <div className="flex flex-col mb-3 md:mb-6 text-left">
                <label className="text-sm text-purple-800 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  className="p-2 border-2 border-gray-300 rounded-lg text-sm h-32 focus:ring-2 focus:ring-purple-800"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-purple-800 text-white py-2 flex items-start px-3 rounded-lg hover:bg-purple-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information on the Right */}
          <div className="flex flex-col md:mt-10  md:items-start text-black w-[90%] mx-auto md:mx-0  md:w-[40%]">
          <h2 className="text-xl md:text-2xl font-bold text-left w-[60%] md:w-full text-purple-800 mb-8 border-b-2  border-purple-700">Contact Details</h2>
            {/* Phone */}
            <div className="flex items-start mb-3 md:mb-6">
              <FaPhoneAlt className="text-xl text-purple-700 mt-1 " />
              <div>
                <div className="text-lg font-medium text-left ml-2">Mobile:</div>
                <span>+1 (123) 456-7890</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-3 md:mb-6">
              <FaEnvelope className="text-xl text-purple-700 mt-1 " />
              <div>
                <div className="text-lg font-medium text-left ml-2">Email:</div>
                <span>support@taskmanager.com</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-xl text-purple-700 mt-1 " />
              <div>
                <div className="text-lg font-medium text-left ml-2">Address:</div>
                <span>123 Task City, TX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
