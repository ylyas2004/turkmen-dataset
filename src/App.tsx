import React, { useState } from 'react';
import './tdc.css';
import Navbar from './views/Navbar';
import Home from './views/Home';
import Portfolio from './views/Portfolio';
import About from './views/About';
import Footer from './views/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main">
        {activeTab === 'home' && <Portfolio />}
        {activeTab === 'about' && <About />}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
