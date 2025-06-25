import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const imageUrls = [
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1021/400/300",
  "https://picsum.photos/id/1035/400/300",
  "https://picsum.photos/id/1041/400/300",
  "https://picsum.photos/id/1052/400/300",
  "https://picsum.photos/id/1062/400/300",
];

const Gallery = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const intervalTime = 20;

    const interval = setInterval(() => {
      scrollAmount += scrollStep;
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-3xl font-bold text-pink-500 text-center mb-6">
        📸 Our Memories
      </h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 scrollbar-hide px-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {imageUrls.map((url, i) => (
          <motion.div
            key={i}
            className="
              flex-shrink-0
              rounded-xl
              overflow-hidden
              shadow-md
              bg-white
              h-[200px]

              min-w-[70vw]      /* มือถือ กว้าง 70% ของ viewport */
              sm:min-w-[45vw]   /* แท็บเล็ต กว้าง 45% */
              md:min-w-[280px]  /* เดสก์ท็อป กว้างขั้นต่ำ 280px */
              max-w-[300px]     /* สูงสุด 300px */

            "
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={url}
              alt={`memory-${i}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
