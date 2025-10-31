"use client";
import React, { useEffect, useRef, useState } from "react";

const MarqueeText = ({ text }) => {
  const marqueeRef = useRef(null);
  const [duration, setDuration] = useState(30); // fallback duration
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Measure full scroll width
    const width = el.scrollWidth / 2; // only one span's width
    setScrollWidth(width);

    // Set a base scroll speed (pixels per second)
    const speed = 100; // increase this for faster scroll
    const calculatedDuration = width / speed;

    setDuration(calculatedDuration);
  }, [text]);

  return (
    <div className="w-full overflow-hidden mt-[-15] bg-amber-100 rounded p-3 relative">
      {/* Marquee Wrapper */}
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap text-md text-gray-800 font-semibold"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        <span className="pr-10 ps-6">{text}</span>
        <span className="pr-10">{text}</span>
      </div>

      {/* Gradient edges for smooth fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-100 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-100 to-transparent" />

      {/* Inline CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
