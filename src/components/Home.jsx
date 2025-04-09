import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">Welcome to AcePredictor</h1>
        <p className="home-description">
          Advanced analytics and predictions for sports enthusiasts. 
          Get accurate forecasts based on comprehensive data analysis and machine learning.
        </p>
        
        <div className="home-btn-container">
          <Link to="/predict" className="home-btn">Get Started</Link>
          <Link to="/about" className="home-btn secondary">Learn More</Link>
        </div>
        
        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Data-Driven</h3>
            <p className="feature-description">Predictions based on extensive statistical analysis</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔮</div>
            <h3 className="feature-title">AI Powered</h3>
            <p className="feature-description">Machine learning algorithms for accurate forecasts</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Accessible</h3>
            <p className="feature-description">Use on any device, anywhere, anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;