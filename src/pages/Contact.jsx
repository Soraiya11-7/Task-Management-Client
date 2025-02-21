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
    <div className="py-16">
      {/* Contact Title and Info */}
      <div className="w-[90%] mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-black mb-6">Contact Us</h1>
        <p className="text-black text-base mb-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
          We are here to help! If you have any questions or need assistance, feel free to reach out to us.
        </p>

        {/* Contact Information */}
        <div className="lg:flex lg:justify-between lg:w-[80%] mx-auto lg:gap-16">
          <div className="flex items-center text-black mb-8 lg:mb-0">
            <FaPhoneAlt className="text-3xl mr-4 text-purple-300" />
            <span className="text-lg">+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center text-black mb-8 lg:mb-0">
            <FaEnvelope className="text-3xl mr-4 text-purple-300" />
            <span className="text-lg">support@taskmanager.com</span>
          </div>
          <div className="flex items-center text-black">
            <FaMapMarkerAlt className="text-3xl mr-4 text-purple-300" />
            <span className="text-lg">123 Task St., Task City, TX</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-[90%] mx-auto text-center bg-white p-8 rounded-xl shadow-xl lg:w-[50%] xl:w-[40%]">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6 text-left">
            <label className="text-lg text-purple-800 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="p-3 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
          <div className="flex flex-col mb-6 text-left">
            <label className="text-lg text-purple-800 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="p-3 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
          <div className="flex flex-col mb-6 text-left">
            <label className="text-lg text-purple-800 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="p-3 border-2 border-gray-300 rounded-lg text-lg h-32 focus:ring-2 focus:ring-purple-800"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-800 text-white py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
