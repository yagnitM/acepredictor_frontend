import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    
      <>
        <Navbar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Add other routes here if needed */}
            </Routes>
          </div>
        </div>
        <Footer />
      </>
  );
}

export default App;
