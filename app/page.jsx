import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "KNGO",
  description: "Win big with skill-based football competitions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-y-auto">

        {/* HEADER */}
        <header className="w-full bg-white text-black px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">
            KNGO
          </div>

          <nav className="space-x-6">
            <Link href="/competitions" className="hover:underline">
              Competitions
            </Link>
            <Link href="/winners" className="hover:underline">
              Winners
            </Link>
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <div className="min-h-screen overflow-y-auto">
          {children}
        </div>

      </body>
    </html>
  );
}
