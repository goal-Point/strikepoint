"use client";
import { useState, useRef } from "react";
import { checkGuess, saveUserEntry } from "./useSpotTheBall";
import SpotTheBallResult from "./SpotTheBallResult";

export default function SpotTheBallGame({ competition }) {
  const [clickPosition, setClickPosition] = useState(null);
  const [result, setResult] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  const handleImageLoad = (e) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
  };

  const handleImageClick = (e) => {
    if (result) return; // Already submitted

    const rect = e.target.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;

    // CRITICAL: Get natural image dimensions
    const naturalWidth = e.target.naturalWidth;
    const naturalHeight = e.target.naturalHeight;

    // Calculate scale factors
    const scaleX = naturalWidth / rect.width;
    const scaleY = naturalHeight / rect.height;

    // Convert to actual coordinates
    const actualX = Math.round(displayX * scaleX);
    const actualY = Math.round(displayY * scaleY);

    setClickPosition({
      x: actualX,
      y: actualY,
      displayX: displayX,
      displayY: displayY
    });
  };

  const handleSubmit = () => {
    if (!clickPosition) return;

    const isCorrect = checkGuess(
      clickPosition.x,
      clickPosition.y,
      competition.centerX,
      competition.centerY,
      competition.tolerance
    );

    saveUserEntry(
      competition.competitionId,
      clickPosition.x,
      clickPosition.y,
      isCorrect
    );

    setResult(isCorrect ? "success" : "incorrect");
  };

  if (result) {
    return <SpotTheBallResult result={result} />;
  }

  return (
    <div>
      <div style={{
        position: "relative",
        display: "inline-block",
        maxWidth: "100%",
        margin: "0 auto"
      }}>
        <img
          ref={imageRef}
          src={competition.imageUrl}
          alt="Spot the Ball"
          onClick={handleImageClick}
          onLoad={handleImageLoad}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "3px solid #22c55e",
            cursor: "crosshair",
            display: "block",
            borderRadius: "8px"
          }}
        />

        {clickPosition && imageSize.width > 0 && (
          <div
            style={{
              position: "absolute",
              left: `${(clickPosition.x / imageSize.width) * 100}%`,
              top: `${(clickPosition.y / imageSize.height) * 100}%`,
              transform: "translate(-50%, -50%)",
              color: "#22c55e",
              fontSize: "36px",
              fontWeight: "bold",
              pointerEvents: "none",
              textShadow: "0 0 8px #000, 0 0 12px #000",
              lineHeight: 1
            }}
          >
            ✕
          </div>
        )}
      </div>

      <div style={{
        marginTop: "40px",
        textAlign: "center"
      }}>
        {clickPosition && (
          <div style={{
            marginBottom: "25px",
            padding: "15px",
            backgroundColor: "#1a1a1a",
            borderRadius: "10px",
            display: "inline-block"
          }}>
            <p style={{
              color: "#b5b5b5",
              margin: 0,
              fontSize: "14px",
              marginBottom: "5px"
            }}>
              Your guess:
            </p>
            <p style={{
              color: "#22c55e",
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              X: {clickPosition.x}, Y: {clickPosition.y}
            </p>
          </div>
        )}

        <div>
          <button
            onClick={handleSubmit}
            disabled={!clickPosition}
            style={{
              backgroundColor: clickPosition ? "#22c55e" : "#333",
              color: clickPosition ? "#000" : "#666",
              padding: "16px 48px",
              fontSize: "18px",
              fontWeight: "700",
              borderRadius: "12px",
              border: "none",
              cursor: clickPosition ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
          >
            Submit Guess
          </button>
        </div>

        {!clickPosition && (
          <p style={{
            marginTop: "20px",
            color: "#666",
            fontSize: "14px"
          }}>
            Click on the image where you think the center of the ball was
          </p>
        )}
      </div>
    </div>
  );
}
