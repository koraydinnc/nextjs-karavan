import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/OpenSansVariable.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/OpenSansItalic.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "KaravanGo - Anasayfa",
  description: "KaravanGo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
