import React from "react";

const CircleImageClip = ({ imageUrl }) => (
  <div
    className="relative w-[90vw] max-w-[300px] aspect-square mx-auto overflow-hidden"
    style={{ transform: "scale(0.95)" }}
  >
    <svg
      viewBox="0 0 512 512"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <mask id="circleMask">
          {/* ดำทั้งหมดก่อน */}
          <rect width="100%" height="100%" fill="black" />
          {/* เติมขาวเป็นวงกลม เพื่อให้แสดงภาพส่วนนี้ */}
          <circle cx="256" cy="256" r="200" fill="white" />
        </mask>
      </defs>

      {/* รูปภาพแสดงเฉพาะในวงกลม */}
      <image
        href={imageUrl}
        x="0"
        y="0"
        width="512"
        height="512"
        mask="url(#circleMask)"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* กรอบวงกลม */}
      <circle
        cx="256"
        cy="256"
        r="200"
        fill="none"
        stroke="#ec4899"
        strokeWidth="8"
        className="animate-pulse drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
      />
    </svg>
  </div>
);

export default CircleImageClip;
