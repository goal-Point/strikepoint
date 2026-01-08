import Header from "./components/Header";

export const metadata = {
  title: "KNGO",
  description: "Skill-based football competitions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
