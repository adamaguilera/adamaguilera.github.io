import React from 'react';
import './App.css';
import { aboutMe } from './text';

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <ul>
          <li><button onClick={() => scrollToSection('about')}>About Me</button></li>
          <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
        </ul>
        <div className="nav-bar">
          <div className="nav-logo">
            <img src="/images/logo.png" alt="Logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </nav>
      <header className="App-header">
        <div className="header-text">
          <h1>Adam Aguilera</h1>
          <p>welcome to my personal webpage</p>
          <div className="icon-row">
            <a href="https://github.com/adamaguilera" target="_blank" rel="noopener noreferrer">
              <img src="/images/github.svg" alt="github" className="icon" />
            </a>
            <a href="mailto:contact@adamaguilera.com">
              <img src="/images/gmail.svg" alt="email" className="icon" />
            </a>
            <a href="https://www.linkedin.com/in/adamkaguilera" target="_blank" rel="noopener noreferrer">
              <img src="/images/linkedin.png" alt="linkedin" className="icon" />
            </a>
          </div>
        </div>
        <img src="/images/adam.JPG" alt="Adam" className="header-image" />
      </header>
      <section id="about" className="about-me">
        <h2>About Me</h2>
        <p>{aboutMe}</p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <p>Section is still WIP!</p>
      </section>
    </div>
  );
}

export default App;