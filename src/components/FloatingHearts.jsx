
import React, { useEffect } from 'react';
import './FloatingHearts.css';

const FloatingHearts = () => {
  useEffect(() => {
    const container = document.querySelector('.heart-container');
    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 2 + 3 + 's';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div className="heart-container"></div>;
};

export default FloatingHearts;
