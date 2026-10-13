import React, { useState } from 'react';
import './App.css';
import AboutUs from './components/AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app">
      {!showProducts ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>
              Welcome to Paradise Nursery!
              Discover beautiful houseplants
              for your home.
            </p>

            <button
              className="get-started"
              onClick={() => setShowProducts(true)}
            >
              Get Started
            </button>
          </div>

          <AboutUs />
        </div>
      ) : (
        <div className="products-page">
          <h1>Our Houseplants</h1>
          <p>Explore our collection of beautiful plants.</p>
        </div>
      )}
    </div>
  );
}

export default App;
