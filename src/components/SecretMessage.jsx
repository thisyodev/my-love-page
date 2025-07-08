import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Heart Image Clip Component
const HeartImageClip = ({ imageUrl }) => {
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
      <div
        className="w-full h-full rounded-full bg-cover bg-center shadow-2xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          clipPath:
            "path('M12,21.35L10.55,20.03C5.4,15.36 2,12.28 2,8.5 2,5.42 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.42 22,8.5C22,12.28 18.6,15.36 13.45,20.04L12,21.35Z')",
        }}
      />
    </div>
  );
};

// Heart Particle
const HeartParticle = (x, y) => ({
  x,
  y,
  size: Math.random() * 6 + 3,
  angle: Math.random() * 2 * Math.PI,
  speed: Math.random() * 3 + 1.5,
  alpha: 1,
  decay: 0.025,
});

function drawHeart(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(236, 72, 153, 0.8)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -2, -6, -6, -6);
  ctx.bezierCurveTo(-10, -6, -10, -1, -10, 0);
  ctx.bezierCurveTo(-10, 5, -5, 9, 0, 12);
  ctx.bezierCurveTo(5, 9, 10, 5, 10, 0);
  ctx.bezierCurveTo(10, -1, 10, -6, 6, -6);
  ctx.bezierCurveTo(2, -6, 0, -3, 0, 0);
  ctx.fill();
  ctx.restore();
}

const SecretMessage = () => {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("/your-image.jpg"); // ← เปลี่ยน URL ตามต้องการ
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const startDate = new Date(2025, 3, 14); // April 14, 2025

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTimePassed({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.current.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        particles.current.splice(i, 1);
      } else {
        drawHeart(ctx, p.x, p.y, p.size, p.alpha);
      }
    });

    if (particles.current.length > 0) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (particles.current.length > 0) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [show]);

  const triggerFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    particles.current = Array.from({ length: 60 }, () =>
      HeartParticle(centerX, centerY)
    );
    animate();
  };

  const handleClick = () => {
    setShow(true);
    triggerFireworks();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 px-6 sm:px-8 py-6 sm:py-10 text-center overflow-hidden">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-pink-600 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        💕 Secret Message 💕
      </motion.h1>

      {/* เอา flex row กับรูปภาพออก ให้ข้อความเต็มบล็อกเดียว */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {show ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg sm:text-xl text-rose-600 font-semibold mb-3">
              I just want to say...
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-pink-600 mb-5 leading-snug sm:leading-relaxed">
              You mean the world to me. 💖
            </p>
          </motion.div>
        ) : (
          <button
            onClick={handleClick}
            className="w-full px-8 py-4 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-lg mb-5"
          >
            Click to reveal 💖
          </button>
        )}

        <div className="mt-4 border-t border-pink-300 pt-4">
          <p className="text-sm sm:text-base text-pink-700 font-semibold mb-2">
            เวลาที่ผ่านมาตั้งแต่ 14 เมษายน 2568:
          </p>
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-extrabold text-pink-500 select-none leading-tight"
            key={`${timePassed.days}-${timePassed.hours}-${timePassed.minutes}-${timePassed.seconds}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-1 sm:space-y-1">
              <div>
                {timePassed.days} วัน {timePassed.hours} ชั่วโมง
              </div>
              <div>
                {timePassed.minutes} นาที {timePassed.seconds} วินาที
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-pink-300 text-2xl sm:text-3xl opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        💕
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-pink-300 text-2xl sm:text-3xl opacity-50"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        💖
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-10 text-pink-300 text-xl sm:text-2xl opacity-30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        💝
      </motion.div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1000 }}
      />
    </div>
  );

};

export default SecretMessage;
