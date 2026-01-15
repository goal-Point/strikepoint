import "./globals.css";

export const metadata = {
  title: "KNGO",
  description: "KNGO Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
