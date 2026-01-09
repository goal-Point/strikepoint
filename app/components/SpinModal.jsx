"use client";
import { useState, useEffect } from "react";
import SpinWheel from "./SpinWheel";
import { getSpinStatus } from "./useSpinReward";

export default function SpinModal() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(getSpinStatus());
  }, []);

  if (!status) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#00ff88",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        🎁
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 40,
              maxWidth: 360,
              width: "100%",
              textAlign: "center",
            }}
          >
            {!status.canSpin && (
              <>
                <h3>Come back later</h3>
                <p>
                  Next spin in{" "}
                  {Math.ceil(status.timeLeft / 3600000)}h
                </p>
              </>
            )}

            {status.canSpin && !result && (
              <SpinWheel
                onFinish={(prize) => {
                  setResult(prize);
                }}
              />
            )}

            {result && (
              <>
                <h3>You won!</h3>
                <p>{result.label}</p>
                {result.code && <strong>Code: {result.code}</strong>}
              </>
            )}

            <button
              onClick={() => setOpen(false)}
              style={{ marginTop: 20 }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
