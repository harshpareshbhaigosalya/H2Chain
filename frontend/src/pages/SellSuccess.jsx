import React from "react";
import AnimatedCard from "../components/AnimatedCard";

export default function SellSuccess() {
  return (
    <div className="max-w-lg mx-auto mt-12">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-4 text-green-700">Sell Successful!</h2>
        <p className="mb-4">Your coins have been sold and the transaction is complete.</p>
        <a href="/profile" className="btn-primary w-full">Go to Profile</a>
      </AnimatedCard>
    </div>
  );
}
