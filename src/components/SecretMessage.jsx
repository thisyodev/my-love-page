import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeartImageClip from "./HeartImageClip";

// 🔸 Particle หัวใจ
const HeartParticle = (x, y) => ({
  x,
  y,
  size: Math.random() * 8 + 4,
  angle: Math.random() * 2 * Math.PI,
  speed: Math.random() * 4 + 2,
  alpha: 1,
  decay: 0.02,
});

function drawHeart(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "pink";
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
  const [imageUrl, setImageUrl] = useState("");
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const startDate = new Date(2025, 3, 14); // 14 เม.ย. 2568

  // โหลดรูปภาพ
  useEffect(() => {
    const img = new Image();
    img.src = "https://picsum.photos/id/1025/400/300";
    img.onload = () => setImageUrl(img.src);
  }, []);

  // ⏳ เวลาที่ผ่านไป
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
    particles.current = Array.from({ length: 100 }, () =>
      HeartParticle(centerX, centerY)
    );
    animate();
  };

  const handleClick = () => {
    setShow(true);
    triggerFireworks();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-rose-50 px-6 text-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <h2 className="text-4xl font-bold mb-8 text-pink-600 font-cute tracking-wide">
        💕 Secret Message 💕
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full justify-center">
        {imageUrl && <HeartImageClip imageUrl={imageUrl} />}

        <div className="bg-white rounded-3xl shadow-xl p-8 flex-1 max-w-xl text-left">
          {show ? (
            <>
              <p className="text-2xl text-rose-600 font-cute mb-4">
                I just want to say...
              </p>
              <p className="text-3xl font-extrabold text-pink-600 mb-6">
                You mean the world to me. 💖
              </p>
            </>
          ) : (
            <button
              onClick={handleClick}
              className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition"
            >
              Click to reveal 💖
            </button>
          )}

          <div className="mt-6 border-t border-pink-300 pt-6">
            <p className="text-lg text-pink-700 font-semibold mb-2">
              เวลาที่ผ่านมาตั้งแต่ 14 เมษายน 2568:
            </p>
            <motion.div
              className="text-4xl font-extrabold text-pink-500 select-none"
              key={`${timePassed.days}-${timePassed.hours}-${timePassed.minutes}-${timePassed.seconds}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {timePassed.days} วัน {timePassed.hours} ชั่วโมง{" "}
              {timePassed.minutes} นาที {timePassed.seconds} วินาที
            </motion.div>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
};

export default SecretMessage;
