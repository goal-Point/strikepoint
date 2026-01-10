import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "56px", marginBottom: "20px" }}>
        KNGO
      </h1>

      <p style={{ fontSize: "20px", maxWidth: "600px" }}>
        Skill-based football competitions.
        <br />
        Predict the moment. Closest wins.
      </p>

      <Link href="/competitions">
        <button
          style={{
            marginTop: "30px",
            padding: "14px 28px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          View Competitions
        </button>
      </Link>
    </main>
  );
}
