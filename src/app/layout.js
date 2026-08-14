import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sagar Bhola",
  description:
    "Sagar Bhola's portfolio, project work, and professional contact information.",
  openGraph: {
    title: "Sagar Bhola",
    description:
      "Portfolio, project work, and professional contact information for Sagar Bhola.",
    url: "https://sagbho.github.io",
    siteName: "Sagar Bhola",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
