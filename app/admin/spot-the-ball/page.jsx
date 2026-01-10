"use client";
import { useState, useEffect } from "react";
import CoordinatePicker from "../../components/CoordinatePicker";
import { getActiveCompetition, saveCompetition, deleteActiveCompetition } from "../../components/useSpotTheBall";

const ADMIN_PASSWORD = "kngo2026";

export default function AdminSpotTheBall() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [imageFilename, setImageFilename] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [centerX, setCenterX] = useState(null);
  const [centerY, setCenterY] = useState(null);
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && authenticated) {
      const comp = getActiveCompetition();
      setCurrentCompetition(comp);
    }
  }, [mounted, authenticated]);

  if (!mounted) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setSaveMessage("");
    } else {
      setSaveMessage("Incorrect password");
    }
  };

  const handleImageFilenameChange = (e) => {
    const filename = e.target.value;
    setImageFilename(filename);
    if (filename) {
      setImageUrl(`/spot-the-ball/${filename}`);
    } else {
      setImageUrl("");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setSaveMessage("");
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      setSaveMessage("Please select a file first");
      return;
    }

    setUploading(true);
    setSaveMessage("Uploading...");

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setImageUrl(data.imageUrl);
        setImageFilename(data.filename);
        setSaveMessage("Image uploaded successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage(data.error || "Upload failed");
      }
    } catch (error) {
      console.error('Upload error:', error);
      setSaveMessage("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleCoordinatesSet = (x, y) => {
    setCenterX(x);
    setCenterY(y);
  };

  const handleSaveCompetition = () => {
    if (!imageFilename) {
      setSaveMessage("Please enter an image filename");
      return;
    }
    if (centerX === null || centerY === null) {
      setSaveMessage("Please click on the image to set coordinates");
      return;
    }

    const competition = saveCompetition(imageUrl, centerX, centerY);
    if (competition) {
      setCurrentCompetition(competition);
      setSaveMessage("Competition saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } else {
      setSaveMessage("Error saving competition");
    }
  };

  const handleDeleteCompetition = () => {
    if (confirm("Are you sure you want to delete the current competition?")) {
      const success = deleteActiveCompetition();
      if (success) {
        setCurrentCompetition(null);
        setImageFilename("");
        setImageUrl("");
        setCenterX(null);
        setCenterY(null);
        setUploadedFile(null);
        setSaveMessage("Competition deleted successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("Error deleting competition");
      }
    }
  };

  if (!authenticated) {
    return (
      <main style={{
        padding: "60px 40px",
        maxWidth: "500px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%" }}>
          <h1 style={{ marginBottom: "30px", textAlign: "center" }}>
            Admin Access
          </h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxSizing: "border-box"
                }}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#22c55e",
                color: "#000",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Login
            </button>
            {saveMessage && (
              <p style={{
                marginTop: "15px",
                color: "#d32f2f",
                textAlign: "center"
              }}>
                {saveMessage}
              </p>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      padding: "60px 40px",
      maxWidth: "1000px",
      margin: "0 auto",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: "10px" }}>Spot the Ball - Admin</h1>
      <p style={{ color: "#666", marginBottom: "40px" }}>
        Configure competition image and ball center coordinates
      </p>

      {currentCompetition && (
        <div style={{
          marginBottom: "40px",
          padding: "20px",
          backgroundColor: "#f7f7f7",
          borderRadius: "10px",
          border: "2px solid #22c55e"
        }}>
          <h2 style={{ marginTop: 0, marginBottom: "15px" }}>
            Current Active Competition
          </h2>
          <p><strong>Image:</strong> {currentCompetition.imageUrl}</p>
          <p><strong>Center Coordinates:</strong> X: {currentCompetition.centerX}, Y: {currentCompetition.centerY}</p>
          <p><strong>Competition ID:</strong> {currentCompetition.competitionId}</p>
          <p><strong>Created:</strong> {new Date(currentCompetition.createdAt).toLocaleString()}</p>
          <button
            onClick={handleDeleteCompetition}
            style={{
              marginTop: "15px",
              backgroundColor: "#d32f2f",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Delete Competition
          </button>
        </div>
      )}

      <section style={{
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "1px solid #ddd"
      }}>
        <h2 style={{ marginTop: 0, marginBottom: "25px" }}>
          {currentCompetition ? "Create New Competition (will replace current)" : "Create New Competition"}
        </h2>

        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600"
          }}>
            Upload Competition Image
          </label>
          <p style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "15px"
          }}>
            Upload an image with the ball removed (JPEG, PNG, GIF, or WebP, max 10MB)
          </p>

          <div style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px"
          }}>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              style={{
                flex: 1,
                padding: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            />
            <button
              onClick={handleUpload}
              disabled={!uploadedFile || uploading}
              style={{
                backgroundColor: (uploadedFile && !uploading) ? "#22c55e" : "#999",
                color: (uploadedFile && !uploading) ? "#000" : "#666",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                border: "none",
                cursor: (uploadedFile && !uploading) ? "pointer" : "not-allowed",
                whiteSpace: "nowrap"
              }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {uploadedFile && !imageUrl && (
            <p style={{
              fontSize: "14px",
              color: "#666",
              marginTop: "10px"
            }}>
              Selected: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}

          {imageFilename && (
            <p style={{
              fontSize: "14px",
              color: "#22c55e",
              marginTop: "10px",
              fontWeight: "600"
            }}>
              ✓ Image ready: {imageFilename}
            </p>
          )}

          <details style={{ marginTop: "15px" }}>
            <summary style={{
              cursor: "pointer",
              fontSize: "14px",
              color: "#666",
              userSelect: "none"
            }}>
              Or enter filename manually
            </summary>
            <div style={{ marginTop: "10px" }}>
              <p style={{
                fontSize: "13px",
                color: "#999",
                marginBottom: "8px"
              }}>
                If you've already placed an image in <code>/public/spot-the-ball/</code>
              </p>
              <input
                type="text"
                value={imageFilename}
                onChange={handleImageFilenameChange}
                placeholder="e.g., competition-1.jpg"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </details>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "15px",
            fontWeight: "600"
          }}>
            Set Ball Center Coordinates
          </label>
          <CoordinatePicker
            imageUrl={imageUrl}
            onCoordinatesSet={handleCoordinatesSet}
          />
        </div>

        <button
          onClick={handleSaveCompetition}
          disabled={!imageFilename || centerX === null || centerY === null}
          style={{
            backgroundColor: (imageFilename && centerX !== null && centerY !== null) ? "#22c55e" : "#999",
            color: (imageFilename && centerX !== null && centerY !== null) ? "#000" : "#666",
            padding: "14px 32px",
            fontSize: "16px",
            fontWeight: "700",
            borderRadius: "10px",
            border: "none",
            cursor: (imageFilename && centerX !== null && centerY !== null) ? "pointer" : "not-allowed",
            width: "100%"
          }}
        >
          Save Competition
        </button>

        {saveMessage && (
          <p style={{
            marginTop: "15px",
            padding: "12px",
            backgroundColor: saveMessage.includes("Error") || saveMessage.includes("Incorrect") ? "#ffebee" : "#e8f5e9",
            color: saveMessage.includes("Error") || saveMessage.includes("Incorrect") ? "#d32f2f" : "#2e7d32",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "600"
          }}>
            {saveMessage}
          </p>
        )}
      </section>
    </main>
  );
}
