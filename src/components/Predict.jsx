import React, { useState, useEffect } from 'react';
import './Predict.css';

const Predict = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [surface, setSurface] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Debounced fetch for player suggestions
  useEffect(() => {
    const fetchSuggestions = async (query, setSuggestions, setShowSuggestions) => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await fetch(`https://predict-backend-ews4.onrender.com/players?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch player suggestions');
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeout1 = setTimeout(() => fetchSuggestions(player1, setSuggestions1, setShowSuggestions1), 300);
    const timeout2 = setTimeout(() => fetchSuggestions(player2, setSuggestions2, setShowSuggestions2), 300);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [player1, player2]);

  const handlePlayerSelect = (playerName, playerNumber) => {
    if (playerNumber === 1) {
      setPlayer1(playerName);
      setShowSuggestions1(false);
    } else {
      setPlayer2(playerName);
      setShowSuggestions2(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch("https://predict-backend-ews4.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player1, player2, surface })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Something went wrong with the prediction.");
      }
    } catch (err) {
      setError("Failed to connect to prediction server.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSurfaceEmoji = (surfaceType) => {
    switch (surfaceType) {
      case 'Hard': return '🏟️';
      case 'Clay': return '🟤';
      case 'Grass': return '🌱';
      default: return '🎾';
    }
  };

  return (
    <div className="predict-container">
      <div className="predict-wrapper">
        <div className="predict-header">
          <div className="header-icon"><span className="icon-tennis">🎾</span></div>
          <h1 className="predict-title">Tennis Match Predictor</h1>
          <p className="predict-subtitle">Predict the outcome of tennis matches using AI analysis</p>
        </div>

        <div className="predict-card">
          <div className="card-header">
            <div className="header-content"><span className="users-icon">👥</span><h2 className="card-title">Match Setup</h2></div>
          </div>

          <form className="predict-form" onSubmit={handleSubmit}>
            {/* Player 1 Input */}
            <div className="form-group">
              <label className="form-label"><div className="player-badge player-1-badge"><span>1</span></div>Player 1</label>
              <div className="input-container">
                <div className="input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    onFocus={() => player1 && setShowSuggestions1(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions1(false), 200)}
                    placeholder="Search for player..."
                    className="player-input player-1-input"
                    autoComplete="off"
                  />
                </div>
                {showSuggestions1 && suggestions1.length > 0 && (
                  <div className="suggestions player-1-suggestions">
                    {suggestions1.map((player, index) => (
                      <div
                        key={index}
                        onClick={() => handlePlayerSelect(player, 1)}
                        className="suggestion-item"
                      >
                        {player}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* VS Divider */}
            <div className="vs-divider">
              <div className="divider-line divider-left"></div>
              <div className="vs-badge">VS</div>
              <div className="divider-line divider-right"></div>
            </div>

            {/* Player 2 Input */}
            <div className="form-group">
              <label className="form-label"><div className="player-badge player-2-badge"><span>2</span></div>Player 2</label>
              <div className="input-container">
                <div className="input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    onFocus={() => player2 && setShowSuggestions2(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions2(false), 200)}
                    placeholder="Search for player..."
                    className="player-input player-2-input"
                    autoComplete="off"
                  />
                </div>
                {showSuggestions2 && suggestions2.length > 0 && (
                  <div className="suggestions player-2-suggestions">
                    {suggestions2.map((player, index) => (
                      <div
                        key={index}
                        onClick={() => handlePlayerSelect(player, 2)}
                        className="suggestion-item"
                      >
                        {player}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Surface Selection */}
            <div className="form-group">
              <label className="form-label"><span className="calendar-icon">📅</span> Court Surface</label>
              <div className="surface-grid">
                {['Hard', 'Clay', 'Grass'].map((surfaceType) => (
                  <div
                    key={surfaceType}
                    onClick={() => setSurface(surfaceType)}
                    className={`surface-option ${surface === surfaceType ? 'surface-selected' : ''}`}
                  >
                    <div className="surface-emoji">{getSurfaceEmoji(surfaceType)}</div>
                    <div className="surface-name">{surfaceType}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!player1 || !player2 || !surface || isLoading}
              className="predict-btn"
            >
              {isLoading ? (
                <div className="btn-content">
                  <div className="loading-spinner"></div> Analyzing Match...
                </div>
              ) : (
                <div className="btn-content">
                  <span className="trending-icon">📈</span> Predict Match Outcome
                </div>
              )}
            </button>
          </form>

          {/* Display Prediction Result */}
          {result && (
            <div className="result-box">
              <h3>Prediction Result</h3>
              <p><strong>Predicted Winner:</strong> {result.winner}</p>
              <p><strong>Confidence:</strong> {result.confidence}%</p>
            </div>
          )}

          {/* Error Display */}
          {error && <p className="error-msg">{error}</p>}
        </div>

        <div className="predict-footer">
          <p>Powered by advanced tennis analytics and machine learning</p>
        </div>
      </div>
    </div>
  );
};

export default Predict;

