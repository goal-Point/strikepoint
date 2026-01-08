import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 40px",
      borderBottom: "1px solid #eee"
    }}>
      <Link href="/" style={{ textDecoration: "none", color: "black" }}>
        <strong style={{ fontSize: "24px", letterSpacing: "2px" }}>
          KNGO
        </strong>
      </Link>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link href="/competitions">Competitions</Link>
        <Link href="/winners">Winners</Link>
      </nav>
    </header>
  );
}
