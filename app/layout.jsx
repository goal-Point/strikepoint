import Header from "./components/Header";
import SpinModal from "./components/SpinModal";

export const metadata = {
  title: "KNGO",
  description: "Skill-based football competitions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, Arial, sans-serif",
          backgroundColor: "#0b0b0b",
          color: "#ffffff",
        }}
      >
        <Header />
        <SpinModal />
        {children}
      </body>
    </html>
  );
}
