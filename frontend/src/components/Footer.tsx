import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-300 transition-theme">
      <div className="max-w-6xl mx-auto px-6">&copy; {new Date().getFullYear()} ZomatoClone — Built with Anubhav❤️</div>
    </footer>
  );
};

export default Footer;
