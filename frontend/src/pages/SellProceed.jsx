import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";

export default function SellProceed({ request }) {
  const navigate = useNavigate();

  function handleProceed() {
    // TODO: API call to proceed with selling
    setTimeout(() => {
      navigate("/sell/success");
    }, 1500);
  }

  return (
    <div className="max-w-lg mx-auto mt-12">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-4">Proceed to Sell Coins</h2>
        <div className="mb-4">
          <div><span className="font-semibold">Buyer:</span> {request?.user?.name || request?.user?.email}</div>
          <div><span className="font-semibold">Coins:</span> {request?.coins}</div>
          <div><span className="font-semibold">Price/Coin:</span> ₹{request?.pricePerCoin}</div>
          <div><span className="font-semibold">Total:</span> ₹{request?.coins * request?.pricePerCoin}</div>
        </div>
        <button className="btn-primary w-full" onClick={handleProceed}>Proceed</button>
      </AnimatedCard>
    </div>
  );
}
