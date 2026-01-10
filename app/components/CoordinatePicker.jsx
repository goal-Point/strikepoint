"use client";
import { useState, useRef } from "react";

export default function CoordinatePicker({ imageUrl, onCoordinatesSet }) {
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  const handleImageLoad = (e) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;

    // CRITICAL: Get natural image dimensions
    const naturalWidth = e.target.naturalWidth;
    const naturalHeight = e.target.naturalHeight;

    // Calculate scale and convert to actual coordinates
    const scaleX = naturalWidth / rect.width;
    const scaleY = naturalHeight / rect.height;
    const actualX = Math.round(displayX * scaleX);
    const actualY = Math.round(displayY * scaleY);

    setCoordinates({ x: actualX, y: actualY });
    onCoordinatesSet(actualX, actualY);
  };

  if (!imageUrl) {
    return (
      <div style={{
        padding: "40px",
        textAlign: "center",
        border: "2px dashed #555",
        borderRadius: "10px",
        color: "#999"
      }}>
        Enter an image filename to preview and set coordinates
      </div>
    );
  }

  return (
    <div>
      <div style={{
        position: "relative",
        display: "inline-block",
        maxWidth: "100%"
      }}>
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Competition image"
          onClick={handleImageClick}
          onLoad={handleImageLoad}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "2px solid #22c55e",
            cursor: "crosshair",
            display: "block"
          }}
        />

        {coordinates.x !== null && imageSize.width > 0 && (
          <div
            style={{
              position: "absolute",
              left: `${(coordinates.x / imageSize.width) * 100}%`,
              top: `${(coordinates.y / imageSize.height) * 100}%`,
              transform: "translate(-50%, -50%)",
              color: "#22c55e",
              fontSize: "32px",
              fontWeight: "bold",
              pointerEvents: "none",
              textShadow: "0 0 6px #000, 0 0 10px #000",
              lineHeight: 1
            }}
          >
            ✕
          </div>
        )}
      </div>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px"
      }}>
        {coordinates.x !== null ? (
          <div>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              Selected Coordinates:
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "18px", color: "#22c55e" }}>
              X: {coordinates.x}, Y: {coordinates.y}
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#666" }}>
              Image size: {imageSize.width} × {imageSize.height} pixels
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, color: "#666" }}>
            Click on the image to set the ball center coordinates
          </p>
        )}
      </div>
    </div>
  );
}
