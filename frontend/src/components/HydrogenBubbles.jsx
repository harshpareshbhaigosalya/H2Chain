import React from 'react';

export default function HydrogenBubbles() {
  const bubbleCount = 100;

  return (
    <div className="hydrogen-bubbles-container" aria-hidden="true">
      {[...Array(bubbleCount)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}
