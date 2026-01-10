"use client";
import { useState, useEffect } from "react";
import SpotTheBallGame from "../../components/SpotTheBallGame";
import { getActiveCompetition, getUserEntry } from "../../components/useSpotTheBall";

export default function SpotTheBallPage() {
  const [mounted, setMounted] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [userEntry, setUserEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const comp = getActiveCompetition();
    setCompetition(comp);

    if (comp) {
      const entry = getUserEntry(comp.competitionId);
      setUserEntry(entry);
    }

    setLoading(false);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <main style={{
        padding: "60px 40px",
        textAlign: "center",
        backgroundColor: "#0b0b0b",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p style={{ color: "#fff", fontSize: "18px" }}>Loading...</p>
      </main>
    );
  }

  if (!competition) {
    return (
      <main style={{
        padding: "60px 40px",
        textAlign: "center",
        backgroundColor: "#0b0b0b",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "600px"
        }}>
          <div style={{
            fontSize: "80px",
            marginBottom: "20px"
          }}>
            ⚽
          </div>
          <h1 style={{
            color: "#fff",
            fontSize: "36px",
            marginBottom: "15px"
          }}>
            No Active Competition
          </h1>
          <p style={{
            color: "#b5b5b5",
            fontSize: "18px",
            lineHeight: "1.6"
          }}>
            Check back soon for the next Spot the Ball challenge!
          </p>
        </div>
      </main>
    );
  }

  if (userEntry?.submitted) {
    return (
      <main style={{
        padding: "60px 40px",
        textAlign: "center",
        backgroundColor: "#0b0b0b",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "600px",
          padding: "40px",
          backgroundColor: "#1a1a1a",
          borderRadius: "20px"
        }}>
          <div style={{
            fontSize: "60px",
            marginBottom: "20px"
          }}>
            {userEntry.correct ? "🎉" : "⚽"}
          </div>
          <h1 style={{
            color: "#fff",
            fontSize: "32px",
            marginBottom: "15px"
          }}>
            Entry Already Submitted
          </h1>
          <p style={{
            color: "#b5b5b5",
            fontSize: "18px",
            marginBottom: "25px",
            lineHeight: "1.6"
          }}>
            You've already entered this competition!
          </p>
          <div style={{
            padding: "20px",
            backgroundColor: userEntry.correct ? "#1a4d2e" : "#2a1a1a",
            borderRadius: "12px",
            marginTop: "20px"
          }}>
            <p style={{
              fontSize: "14px",
              color: "#b5b5b5",
              marginBottom: "8px",
              margin: 0
            }}>
              Your Result:
            </p>
            <p style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: userEntry.correct ? "#22c55e" : "#ff6b6b",
              margin: "8px 0 0 0"
            }}>
              {userEntry.correct ? "✓ CORRECT!" : "✗ INCORRECT"}
            </p>
          </div>
          <p style={{
            color: "#666",
            fontSize: "14px",
            marginTop: "25px",
            margin: "25px 0 0 0"
          }}>
            Submitted: {new Date(userEntry.timestamp).toLocaleString()}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      padding: "60px 40px",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#0b0b0b",
      minHeight: "100vh"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          color: "#fff",
          marginBottom: "10px",
          fontSize: "42px",
          fontWeight: "800"
        }}>
          Spot the Ball
        </h1>
        <p style={{
          color: "#b5b5b5",
          fontSize: "18px",
          lineHeight: "1.6",
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          Click where you think the center of the ball was. You have one chance to guess the exact pixel-perfect location. Closest entry wins!
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <SpotTheBallGame competition={competition} />
      </div>
    </main>
  );
}
