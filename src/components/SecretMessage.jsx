import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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

// ❤️ กรอบหัวใจแท้จริงด้วย SVG clipPath และรูปภาพใน SVG image
const HeartFrame = ({ imageUrl }) => (
  <div className="relative w-96 sm:w-[28rem] md:w-[34rem] lg:w-[40rem] aspect-square">
    <svg
      viewBox="0 0 200 200"
      className="absolute w-full h-full z-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="heartClip" clipPathUnits="userSpaceOnUse">
          <path d="M100 180s-70-40-70-90c0-30 30-40 50-20 20-20 50-10 50 20 0 50-70 90-70 90z" />
        </clipPath>
      </defs>

      {/* กรอบหัวใจเรืองแสง */}
      <path
        d="M100 180s-70-40-70-90c0-30 30-40 50-20 20-20 50-10 50 20 0 50-70 90-70 90z"
        fill="none"
        stroke="#ec4899"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse drop-shadow-[0_0_30px_rgba(236,72,153,0.9)]"
      />

      {/* รูปภาพในกรอบหัวใจ */}
      {imageUrl && (
        <image
          href={imageUrl}
          width="200"
          height="200"
          clipPath="url(#heartClip)"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
    </svg>
  </div>
);

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

  // โหลดรูปภาพจาก URL จริง (ไม่ใช้ redirect) ทดสอบก่อน
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // ป้องกัน CORS error
    img.src =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
    img.onload = () => setImageUrl(img.src);
  }, []);

  // ⏳ อัปเดตเวลาที่ผ่านไปทุกวินาที
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

  // ฟังก์ชัน animate พลุหัวใจ
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

  // สั่งเริ่ม animation เมื่อ particles มีค่า
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
    <div className="relative min-h-screen bg-rose-50 py-20 text-center overflow-hidden px-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-pink-600 font-cute tracking-wide">
        💕 Secret Message 💕
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">
        {imageUrl && <HeartFrame imageUrl={imageUrl} />}

        {/* 💌 กล่องข้อความ */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex-1 text-left max-w-xl">
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

          {/* ⏳ เวลา */}
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

      {/* 🎆 พลุหัวใจ */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
};

export default SecretMessage;
