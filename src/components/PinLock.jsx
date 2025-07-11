import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CORRECT_PIN = "040425";

const PinLock = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 6) {
        if (newPin === CORRECT_PIN) {
          setSuccess(true);
          setTimeout(() => {
            onUnlock();
          }, 1500);
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col justify-center items-center font-cute px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          🔐 Anniversary’s Lock
        </h1>
        <p className="font-kanit text-center text-gray-600 mb-6 text-sm">
          “วันครบรอบที่ทำให้เรารู้ว่า...”
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border ${
                pin[i] ? "bg-pink-500" : "bg-white"
              } border-pink-300`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 text-lg">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "✓"].map((key, i) => (
            <button
              key={i}
              onClick={() =>
                key === "←"
                  ? handleDelete()
                  : typeof key === "number"
                  ? handleClick(key.toString())
                  : null
              }
              className="bg-pink-50 text-pink-500 font-bold rounded-lg py-3 shadow hover:bg-pink-100 transition-all duration-150"
            >
              {key}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-500 mt-4 text-center text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ❌ รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง 💔
            </motion.p>
          )}

          {success && (
            <motion.div
              className="text-green-500 mt-4 text-center text-lg font-kanit font-semibold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              🎉 140425 💖
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PinLock;
