const HeartFrame = ({ imageUrl }) => (
  <div className="relative w-96 sm:w-[28rem] md:w-[34rem] lg:w-[40rem] aspect-square">
    <svg
      viewBox="0 0 200 200"
      className="absolute w-full h-full z-10 pointer-events-none"
    >
      {/* กรอบเรืองแสง */}
      <path
        d="M100 180s-70-40-70-90c0-30 30-40 50-20 20-20 50-10 50 20 0 50-70 90-70 90z"
        fill="none"
        stroke="#ec4899"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse drop-shadow-[0_0_30px_rgba(236,72,153,0.9)]"
      />

      {/* clipPath กำหนดพื้นที่ตัด */}
      <defs>
        <clipPath id="heartClip">
          <path d="M100 180s-70-40-70-90c0-30 30-40 50-20 20-20 50-10 50 20 0 50-70 90-70 90z" />
        </clipPath>
      </defs>
    </svg>

    {/* รูปภาพในกรอบหัวใจ */}
    <img
      src={imageUrl}
      alt="Love"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ clipPath: "url(#heartClip)" }}
    />
  </div>
);
