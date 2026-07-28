import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://scrapco.in"; // placeholder — update before go-live

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ScrapCo — Office Scrap Buyers in Bengaluru | IT Equipment, Furniture & AC",
    template: "%s | ScrapCo",
  },
  description:
    "ScrapCo buys and clears your entire office space — ACs, IT equipment (laptops, workstations), and furniture. We come to you, assess for free, and pay you on the spot. Serving Bengaluru and surrounding areas.",
  keywords: [
    "office scrap buyers Bengaluru",
    "office clearance services Bangalore",
    "IT equipment buyers Bangalore",
    "laptop buyers Bangalore",
    "office furniture disposal Bangalore",
    "AC scrap buyers Bengaluru",
    "workstation buyers Bangalore",
    "office space clearance",
    "sell office furniture Bangalore",
    "e-waste buyers Bangalore",
  ],
  authors: [{ name: "ScrapCo" }],
  creator: "ScrapCo",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ScrapCo",
    title: "ScrapCo — Office Scrap Buyers in Bengaluru",
    description:
      "We buy ACs, IT equipment, laptops, workstations, and office furniture. Free assessment. Pay on the spot. Call us today.",
    images: [
      {
        url: "/og-image.jpg", // placeholder — add real image before go-live
        width: 1200,
        height: 630,
        alt: "ScrapCo — Office Scrap Buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapCo — Office Scrap Buyers in Bengaluru",
    description:
      "We buy ACs, IT equipment, laptops, workstations, and office furniture. Free assessment. Pay on the spot.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
