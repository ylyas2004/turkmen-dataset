import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import TextCollection from '../tabs/TextCollection';
import TranslationCollection from '../tabs/TranslationCollection';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('text');

  const addNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    // Use toast to display notifications
    toast[type](message, { autoClose: 3000 }); // Automatically closes after 3 seconds
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} limit={3} />
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text Collection
        </button>
        <button
          className={`tab ${activeTab === 'translation' ? 'active' : ''}`}
          onClick={() => setActiveTab('translation')}
        >
          Translation Collection
        </button>
        <button
          className="tab disabled"
          disabled
        >
          Other Collection (Coming Soon)
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'text' && <TextCollection addNotification={addNotification} />}
        {activeTab === 'translation' && <TranslationCollection addNotification={addNotification} />}
      </div>
    </div>
  );
};

export default Home;
