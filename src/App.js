import React from 'react';
import './App.css';
import { aboutMe } from './text';

function App() {
  return (
    <div className="App">
      <div className="image-row">
        <img src="/images/adam.JPG" alt="Adam" className="header-image" />
      </div>
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
            <a href="https://docs.google.com/document/d/1Y1Ii8vxVhZ7NGS7a5_tuyk75FwqJJiijHPICfByY558/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <img src="/images/resume.png" alt="resume" className="icon" />
            </a>
          </div>
        </div>
      </header>
      <section id="about" className="about-me">
        <h2>About Me</h2>
        <p>{aboutMe}</p>
      </section>
    </div>
  );
}

export default App;