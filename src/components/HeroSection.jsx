
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="py-24 bg-gradient-to-r from-pink-300 to-pink-500 text-white" data-aos="fade-down">
      <h1 className="text-5xl font-extrabold mb-4">🌸 To My Dearest Love 🌸</h1>
      <p className="text-xl">You are my sunshine, my only sunshine 💕</p>
    </div>
  );
};

export default HeroSection;
