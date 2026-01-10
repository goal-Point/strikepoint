"use client";

export default function SpotTheBallResult({ result }) {
  const isSuccess = result === "success";

  return (
    <div style={{
      padding: "60px 40px",
      textAlign: "center",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: "40px",
        borderRadius: "20px",
        backgroundColor: isSuccess ? "#22c55e" : "#1a1a1a",
        maxWidth: "500px",
        width: "100%"
      }}>
        <div style={{
          fontSize: "80px",
          marginBottom: "20px"
        }}>
          {isSuccess ? "🎉" : "❌"}
        </div>

        <h2 style={{
          fontSize: "36px",
          fontWeight: "800",
          color: isSuccess ? "#000" : "#fff",
          marginBottom: "15px",
          marginTop: 0
        }}>
          {isSuccess ? "SUCCESS!" : "INCORRECT"}
        </h2>

        <p style={{
          fontSize: "18px",
          color: isSuccess ? "#000" : "#b5b5b5",
          lineHeight: "1.6",
          margin: 0
        }}>
          {isSuccess
            ? "You found the exact center of the ball! You're a winner!"
            : "That wasn't quite right. Better luck next time!"}
        </p>

        {isSuccess && (
          <p style={{
            fontSize: "16px",
            color: "#000",
            marginTop: "20px",
            fontWeight: "600"
          }}>
            Your entry has been recorded. Winners will be announced soon.
          </p>
        )}
      </div>

      <p style={{
        marginTop: "30px",
        color: "#666",
        fontSize: "14px"
      }}>
        You've already submitted your entry for this competition.
      </p>
    </div>
  );
}
