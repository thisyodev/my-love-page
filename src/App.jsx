import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import Gallery from "./components/Gallery";
import LoveNotes from "./components/LoveNotes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import FloatingHearts from "./components/FloatingHearts";
import SecretMessage from "./components/SecretMessage";
import PinLock from "./components/PinLock"; // ✅ เพิ่มเข้ามา

const App = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {!unlocked ? (
        <PinLock onUnlock={() => setUnlocked(true)} />
      ) : (
        <div className="text-center">
          <MusicPlayer />
          <FloatingHearts />
          <HeroSection />
          <Gallery />
          <LoveNotes />
          <SecretMessage />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
