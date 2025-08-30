import React from "react";

export default function HydrogenBubbles() {
  const bubbleCount = 80;
  const labels = ["H₂"];

  return (
    <div className="hydrogen-bubbles-container absolute inset-0 pointer-events-none">
      {[...Array(bubbleCount)].map((_, i) => {
        const label = labels[Math.floor(Math.random() * labels.length)];
        return (
          <div
            key={i}
            className="bubble flex items-center justify-center text-[10px] md:text-xs font-bold text-teal-300"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${18 + Math.random() * 22}px`,
              height: `${18 + Math.random() * 22}px`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
