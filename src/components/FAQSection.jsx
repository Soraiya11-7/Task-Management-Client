import  { useState } from 'react';
// import { FiChevronDown } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa'; // Using the question mark icon

const FAQSection = () => {
  const [expanded, setExpanded] = useState({});

  const toggleFAQ = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      question: 'How do I sign in to the Task Management App?',
      answer:
        'You can sign in using your Google account via Firebase Authentication. Once logged in, your details will be stored for future access.',
    },
    {
      question: 'Can I add, edit, or delete tasks?',
      answer:
        'Yes, you can add new tasks, edit existing ones, and delete tasks. Changes will be instantly reflected in the database to ensure persistence.',
    },
    {
      question: 'How do I reorder tasks within categories?',
      answer:
        'You can drag and drop tasks within a category or move them to different categories (To-Do, In Progress, Done) by simply dragging them to the desired section.',
    },
    {
      question: 'What happens when I delete a task?',
      answer:
        'When you delete a task, it will be permanently removed from the database. There is no way to recover deleted tasks.',
    },
    {
      question: 'Is my data saved if I refresh the page?',
      answer:
        'Yes! All your changes are saved instantly in the database, so even if you refresh or reopen the app, your tasks will remain in the correct order.',
    },
  ];

  return (
    <div className="py-10 w-[90%] mx-auto flex flex-col gap-12 bg-white rounded-lg mt-5">
      <div className="flex flex-col text-left">
        <p className="text-xl sm:text-2xl text-center md:text-3xl font-bold mb-2 text-purple-800">
          <FaQuestionCircle className="inline-block mr-1 text-purple-800" /> Task Management FAQs
        </p>
      </div>
      <ul className="w-full xl:w-[80%] mx-auto px-2 md:px-8">
        {faqs.map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={expanded[index] ? 'true' : 'false'}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className="flex-shrink-0 w-5 h-5 ml-auto fill-current rounded-full p-1 bg-purple-800 text-white"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center transition duration-200 ease-out ${expanded[index] ? 'rotate-90' : ''}`}
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded[index] ? 'rotate-90' : ''}`}
                ></rect>
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded[index] ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="pb-5 text-gray-700 text-base text-left">{faq.answer}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
