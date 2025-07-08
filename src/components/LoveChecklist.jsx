// LoveChecklist.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const checklistItems = [
  "รอยยิ้มที่ทำให้ใจละลาย",
  "ขี้อ้อนเวลาง่วงนอน",
  "ใส่ใจในเรื่องเล็ก ๆ เสมอ",
  "เสียงหัวเราะน่ารักมาก",
  "ชอบจับมือเวลาเดินด้วยกัน",
];

const LoveChecklist = () => {
  const [checked, setChecked] = useState([]);

  const toggleItem = (index) => {
    setChecked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-xl mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 font-dancing"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        💖 Love Checklist 💖
      </motion.h2>

      <ul className="space-y-4 text-left">
        {checklistItems.map((item, index) => (
          <motion.li
            key={index}
            onClick={() => toggleItem(index)}
            className={`p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200 flex items-center gap-3 bg-white/70 backdrop-blur-sm hover:bg-rose-100 ${
              checked.includes(index) ? "border-2 border-pink-500" : ""
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span
              className={`text-lg font-kanit flex-1 ${
                checked.includes(index) ? "line-through text-gray-400" : ""
              }`}
            >
              {item}
            </span>
            <span className="text-2xl">
              {checked.includes(index) ? "✅" : "⬜"}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default LoveChecklist;
