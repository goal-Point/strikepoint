"use client";
import { useState } from "react";
import { saveSpinReward } from "./useSpinReward";

const prizes = [
  { label: "5% OFF", code: "KNGO5" },
  { label: "10% OFF", code: "KNGO10" },
  { label: "15% OFF", code: "KNGO15" },
  { label: "FREE ENTRY", code: "FREE1" },
  { label: "+2 ENTRIES", code: "BONUS2" },
  { label: "TRY AGAIN", code: null },
];

export default function SpinWheel({ onFinish }) {
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    setTimeout(() => {
      if (prize.code) {
        saveSpinReward(prize.code);
      }
      onFinish(prize);
    }, 2500);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "8px solid #00ff88",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        🎡
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          padding: "12px 24px",
          fontWeight: "bold",
          background: "#00ff88",
          border: "none",
          cursor: "pointer",
        }}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
