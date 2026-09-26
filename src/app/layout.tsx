import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const title = "Khalid Siyanbola, Full Stack Engineer";
const shareDescription =
  "I build reliable full stack products end to end, marketplaces, real time systems, and fintech tools.";

export const metadata: Metadata = {
  metadataBase: new URL("https://khalid-portfolio.onrender.com"),
  title,
  description:
    "Full stack engineer building marketplaces, real time systems, and fintech products end to end.",
  openGraph: {
    type: "website",
    title,
    description: shareDescription,
    url: "/",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: shareDescription,
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
