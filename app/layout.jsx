import "./globals.css";

export const metadata = {
  title: "KNGO",
  description: "Win big with skill-based football competitions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
