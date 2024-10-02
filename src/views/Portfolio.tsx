import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <div className="profile">
      <div className="profileContent">
        <div className="leftColumn">
          <header className="profileHeader">
            <img src="https://avatars.githubusercontent.com/u/62172641?v=4" alt="Profile" className="profilePicture" />
          </header>
          <div className="profileInfo">
            <h1 className="name">Ylyas</h1>
            <p className="username">ylyas2004</p>
          </div>
          <div className="infoSection">
            <h2 className="sectionTitle">About Me</h2>
            <ul className="infoList">
              <li className="infoItem">
                <span className="icon">
                  <img src="/sdu-logo.png" alt="Suleyman Demirel University Logo" className="logo" />
                </span> 
                Suleyman Demirel University
              </li>
              <li className="infoItem">
                <span className="icon">
                  <img src="/gmail-logo.svg" alt="Gmail Logo" className="logo" />
                </span> 
                itisylyas2004@gmail.com
              </li>
              <li className="infoItem">
                <span className="icon">
                  <img src="/github-logo.svg" alt="Github Logo" className="logo" />
                </span>
                github.com/ylyas2004
              </li>
              <li className="infoItem">
                <span className="icon">
                  <img src="/phone-logo.svg" alt="Phone Logo" className="logo" />
                </span>
                +90 555 123 4567
              </li>
            </ul>
          </div>
          
          <div className="infoSection">
            <h2 className="sectionTitle">Skills</h2>
            <ul className="infoList">
              <li className="infoItem">Java Mobile and Desktop App Development, Flutter, Unity, Blender</li>
              <li className="infoItem">MySQL Database Management</li>
              <li className="infoItem">Raspberry Pi and Arduino</li>
              <li className="infoItem">Problem-Solving</li>
            </ul>
          </div>

          <div className="infoSection">
            <h2 className="sectionTitle">Education</h2>
            <p className="infoItem">
              Computer Engineering<br />
              Suleyman Demirel University<br />
              3rd Year
            </p>
          </div>
        </div>

        <div className="rightColumn">
          <h2 className="sectionTitle">Projects</h2>
          
          <div className="projectCard">
            <h3 className="projectTitle">Unity Games</h3>
            <p className="projectDescription">Developed interactive games focusing on user experience.</p>
            <span className="projectLang">● C#</span>
            <div className="videoWrapper">
              <iframe 
                className='video'
                src="https://www.youtube.com/embed/o1JIK5W3DRU"
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              ></iframe>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Teknofest - Autonomous Taxi Project</h3>
            <p className="projectDescription">
              Contributed to the development of a self-driving autonomous taxi. 
              Applied knowledge in a collaborative setting, gaining hands-on experience 
              in autonomous vehicle technology.
            </p>
            <div className="videoWrapper">
              <video className="video" controls>
                <source src="/autonomous_car_project.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="projectCard">
            <h3 className="projectTitle">Java Mobile Applications</h3>
            <p className="projectDescription">Created mobile applications enhancing usability.</p>
            <span className="projectLang">● Java</span>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Flutter Applications</h3>
            <p className="projectDescription">Built cross-platform applications with a focus on design.</p>
            <span className="projectLang">● Dart</span>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Raspberry Pi IoT Projects</h3>
            <p className="projectDescription">Developed automation and IoT projects using Raspberry Pi.</p>
            <span className="projectLang">● Python</span>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Arduino Prototypes</h3>
            <p className="projectDescription">Engaged in hardware projects utilizing Arduino for prototyping.</p>
            <span className="projectLang">● C++</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;