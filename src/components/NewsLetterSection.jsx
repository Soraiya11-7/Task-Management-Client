import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

      // Simulate email submission here
      toast.success('Subscription Successful! Thank you for subscribing to our newsletter.');
      setEmail(''); // Clear the email input field
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-900 py-16 mt-10">
      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 text-white">Subscribe to Our Newsletter</h2>
        <p className="text-base mb-12 text-white">
          Stay updated with the latest news and updates on task management. 
          Subscribe to our newsletter for insights, tips, and more!
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 w-60 md:w-72 text-base text-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-800 shadow-lg"
          />
          <button
            type="submit"
            className="p-2 bg-white text-base text-purple-800 rounded-r-lg hover:bg-gray-300 focus:outline-none shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
