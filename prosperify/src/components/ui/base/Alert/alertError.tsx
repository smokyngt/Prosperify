import React, { useEffect } from 'react';

interface AlertErrorProps {
  message: string;
  description: string;
  onClose: () => void; 
}

const AlertError: React.FC<AlertErrorProps> = ({ message, description, onClose }) => {
  useEffect(() => {
    // Set a timer to trigger the onClose function after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // Cleanup the timer if the component unmounts before the 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-bordered-red-style-label"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white">
            {message}
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertError;
