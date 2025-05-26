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

  // Enhanced mock data with rankings
  const mockPlayers = [
    { name: 'Novak Djokovic', ranking: 1, country: '🇷🇸' },
    { name: 'Carlos Alcaraz', ranking: 2, country: '🇪🇸' },
    { name: 'Jannik Sinner', ranking: 3, country: '🇮🇹' },
    { name: 'Daniil Medvedev', ranking: 4, country: '🇷🇺' },
    { name: 'Rafael Nadal', ranking: 5, country: '🇪🇸' },
    { name: 'Alexander Zverev', ranking: 6, country: '🇩🇪' },
    { name: 'Stefanos Tsitsipas', ranking: 7, country: '🇬🇷' },
    { name: 'Casper Ruud', ranking: 8, country: '🇳🇴' },
    { name: 'Andrey Rublev', ranking: 9, country: '🇷🇺' },
    { name: 'Taylor Fritz', ranking: 10, country: '🇺🇸' }
  ];

  useEffect(() => {
    const fetchSuggestions = async (query, setSuggestions, setShowSuggestions) => {
      if (!query) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const results = mockPlayers.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(results);
      setShowSuggestions(true);
    };

    const timeoutId1 = setTimeout(() => fetchSuggestions(player1, setSuggestions1, setShowSuggestions1), 300);
    const timeoutId2 = setTimeout(() => fetchSuggestions(player2, setSuggestions2, setShowSuggestions2), 300);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
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
    
    // Simulate API call
    setTimeout(() => {
      console.log({ player1, player2, surface });
      setIsLoading(false);
      // Here you would make your actual prediction request
    }, 1500);
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
        {/* Header */}
        <div className="predict-header">
          <div className="header-icon">
            <span className="icon-tennis">🎾</span>
          </div>
          <h1 className="predict-title">Tennis Match Predictor</h1>
          <p className="predict-subtitle">Predict the outcome of tennis matches using AI analysis</p>
        </div>

        {/* Main Card */}
        <div className="predict-card">
          <div className="card-header">
            <div className="header-content">
              <span className="users-icon">👥</span>
              <h2 className="card-title">Match Setup</h2>
            </div>
          </div>

          <form className="predict-form" onSubmit={handleSubmit}>
            {/* Player 1 Input */}
            <div className="form-group">
              <label className="form-label">
                <div className="player-badge player-1-badge">
                  <span>1</span>
                </div>
                Player 1
              </label>
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
                        onClick={() => handlePlayerSelect(player.name, 1)}
                        className="suggestion-item"
                      >
                        <div className="player-info">
                          <span className="player-flag">{player.country}</span>
                          <div className="player-details">
                            <div className="player-name">{player.name}</div>
                            <div className="player-ranking">ATP Ranking #{player.ranking}</div>
                          </div>
                        </div>
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
              <label className="form-label">
                <div className="player-badge player-2-badge">
                  <span>2</span>
                </div>
                Player 2
              </label>
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
                        onClick={() => handlePlayerSelect(player.name, 2)}
                        className="suggestion-item"
                      >
                        <div className="player-info">
                          <span className="player-flag">{player.country}</span>
                          <div className="player-details">
                            <div className="player-name">{player.name}</div>
                            <div className="player-ranking">ATP Ranking #{player.ranking}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Surface Selection */}
            <div className="form-group">
              <label className="form-label">
                <span className="calendar-icon">📅</span>
                Court Surface
              </label>
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
                  <div className="loading-spinner"></div>
                  Analyzing Match...
                </div>
              ) : (
                <div className="btn-content">
                  <span className="trending-icon">📈</span>
                  Predict Match Outcome
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="predict-footer">
          <p>Powered by advanced tennis analytics and machine learning</p>
        </div>
      </div>
    </div>
  );
};

export default Predict;