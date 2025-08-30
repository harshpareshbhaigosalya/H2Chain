import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function CoinGraph({ transactions }) {
  // Prepare data for the graph
  const dataPoints = [];
  let balance = 0;
  transactions?.slice().reverse().forEach((tx) => {
    if (tx.type === "buy") balance += tx.coins;
    if (tx.type === "sell") balance -= tx.coins;
    dataPoints.push({
      date: new Date(tx.createdAt).toLocaleDateString(),
      balance,
    });
  });
  const chartData = {
    labels: dataPoints.map((d) => d.date),
    datasets: [
      {
        label: "Coin Balance",
        data: dataPoints.map((d) => d.balance),
        fill: false,
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: true, title: { display: true, text: "Date" } },
      y: { display: true, title: { display: true, text: "Coins" } },
    },
  };
  return (
    <div className="bg-green-900/20 rounded-xl p-4">
      <Line data={chartData} options={options} />
    </div>
  );
}
