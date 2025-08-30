import React, { useState } from 'react';

export default function Ticker({ messages }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden whitespace-nowrap bg-gradient-to-r from-green-900 via-green-700 to-green-900 py-3 cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="News ticker"
      role="region"
    >
      {/* Gradient fade on left and right edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-green-900 to-transparent z-20" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-green-900 to-transparent z-20" />

      <div
        className={`inline-block text-green-200 text-lg font-semibold tracking-wide`}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          animation: 'marquee 20s linear infinite',
        }}
      >
        {messages.map((msg, idx) => (
          <span key={idx} className="mx-10 select-none">
            {msg}
          </span>
        ))}
      </div>

    <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
