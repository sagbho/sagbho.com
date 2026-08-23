import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Sagar Bhola",
  description:
    "Sagar Bhola's portfolio, project work, and professional contact information.",
  openGraph: {
    title: "Sagar Bhola",
    description:
      "Portfolio, project work, and professional contact information for Sagar Bhola.",
    url: "https://sagbho.com",
    siteName: "Sagar Bhola",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
