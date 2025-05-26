import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">🎾 About AcePredictor</h1>
      <p className="about-tagline">
        Your smart tennis companion – Predicting match outcomes with data-driven intelligence.
      </p>

      <div className="about-section">
        <h2>What is AcePredictor?</h2>
        <p>
          AcePredictor is a machine learning-powered web app designed to predict the outcome of professional tennis matches.
          By analyzing historical match data, player performance, surface preferences, and more, it gives users probabilistic insights into likely match winners.
        </p>
      </div>

      <div className="about-section">
        <h2>How does it work?</h2>
        <ul>
          <li>🧠 Trained on ATP-level match data from the Open Era using a balanced dataset.</li>
          <li>📊 Inputs: Player names, surface type (Hard, Clay, Grass), and match format (Bo3 or Bo5).</li>
          <li>🔍 Outputs: Predicted winner, winning probability, and soon — projected aces, double faults, and scorelines!</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why AcePredictor?</h2>
        <p>
          Whether you're a tennis fan, data geek, or sports analyst — AcePredictor brings a fun and insightful layer to the game by combining sports and machine learning.
        </p>
      </div>

      <div className="about-footer">
        <p>💡 Built with ❤️ using Python, React, and ML.</p>
        <p>© {new Date().getFullYear()} AcePredictor</p>
      </div>
    </div>
  );
};

export default About;
