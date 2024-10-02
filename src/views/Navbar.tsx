import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeLink = document.querySelector(`.nav-link.${activeTab}`);
      if (activeLink && underlineRef.current) {
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = linksRef.current?.getBoundingClientRect();

        if (containerRect && underlineRef.current) {
          const left = linkRect.left - containerRect.left;
          const width = linkRect.width;

          underlineRef.current.style.transform = `translateX(${left}px)`;
          underlineRef.current.style.width = `${width}px`;
        }
      }
    };

    updateUnderlinePosition();
    window.addEventListener('resize', updateUnderlinePosition);

    return () => window.removeEventListener('resize', updateUnderlinePosition);
  }, [activeTab]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          Turkmen Dataset
        </div>
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul ref={linksRef} className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { onTabChange('home'); toggleMenu(); }}>Home</li>
          <li className={`nav-link ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => { onTabChange('portfolio'); toggleMenu(); }}>Portfolio</li>
          <li className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => { onTabChange('about'); toggleMenu(); }}>About</li>
          <li>
            <button className="signin-btn">Sign in</button>
          </li>
        </ul>
        <div ref={underlineRef} className="underline"></div>
      </div>
    </nav>
  );
};

export default Navbar;
