import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tuzla Supply | Ship Supply Tuzla & Marine Spare Parts Istanbul",
    template: "%s | Tuzla Supply"
  },
  description: "Tuzla Supply is your premier partner for Ship Supply in Tuzla & Istanbul. We provide MAN B&W, Wärtsilä spare parts, maritime provisions, and technical ship stores with global delivery.",
  keywords: [
    "Tuzla Supply", "Ship Supply Tuzla", "Marine Spare Parts Istanbul", "Ship Chandler Turkey", 
    "MAN B&W spare parts", "Wartsila parts Turkey", "Maritime Procurement Istanbul", "Technical Ship Stores",
    "Gemi İkmal Tuzla", "Yedek Parça Tedarik", "Port of Tuzla supply", "Ship Provisions Turkey"
  ],
  authors: [{ name: "Tuzla Supply Team" }],
  creator: "Tuzla Supply",
  publisher: "Tuzla Supply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Tuzla Supply | Premium Ship Supply & Marine Spare Parts",
    description: "Reliable maritime procurement and technical ship stores in Tuzla & Istanbul. Global logistics for engine parts and provisions.",
    url: "https://tuzlasupply.com",
    siteName: "Tuzla Supply",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuzla Supply | Maritime Supply Excellence",
    description: "Your technical partner for ship supply and spare parts in Turkey.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WholesaleStore",
              "name": "Tuzla Supply",
              "url": "https://tuzlasupply.com",
              "logo": "https://tuzlasupply.com/logo.png",
              "image": "https://tuzlasupply.com/og-image.jpg",
              "description": "Premium Ship Supply and Marine Spare Parts provider in Tuzla, Istanbul. Specializing in MAN B&W, Wärtsilä engine parts and technical maritime stores.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tuzla Shipyards Area",
                "addressLocality": "Tuzla",
                "addressRegion": "Istanbul",
                "postalCode": "34944",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.8436,
                "longitude": 29.3086
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "email": "info@tuzlasupply.com",
                "availableLanguage": ["English", "Turkish"]
              }
            })
          }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
