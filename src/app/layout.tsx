import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tuzla Supply | Global Corporate Supply & Industrial Excellence",
    template: "%s | Tuzla Supply"
  },
  description: "Global Kurumsal Tedarik ve Endüstriyel Mükemmellik. Denizcilik, Teknik, Elektronik ve IT altyapı çözümlerinde güvenilir partneriniz.",
  keywords: [
    "Tuzla Supply", "Global Corporate Supply", "Industrial Excellence", "Marine Supply Turkey", 
    "Endüstriyel Tedarik Çözümleri", "Gemi İkmal", "IT Altyapı Tedarik", "Teknik Malzeme İkmal",
    "Global Procurement", "Tuzla Shipyard Supply"
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
    title: "Tuzla Supply | Global Corporate Supply & Industrial Excellence",
    description: "Kurumsal ve endüstriyel ihtiyaçlarınız için dünya standartlarında tedarik ağı.",
    url: "https://tuzlasupply.com",
    siteName: "Tuzla Supply",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuzla Supply | Global Corporate Supply",
    description: "Endüstriyel ve Kurumsal Tedarik Çözümleri",
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
    <html lang="tr" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Tuzla Supply",
              "url": "https://tuzlasupply.com",
              "logo": "https://tuzlasupply.com/logo.png",
              "slogan": "Global Corporate Supply & Industrial Excellence",
              "description": "Global Kurumsal Tedarik ve Endüstriyel Mükemmellik alanında uzmanlaşmış, denizcilik ve sanayi odaklı tedarik platformu.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Aydınlı",
                "addressLocality": "Tuzla",
                "addressRegion": "İstanbul",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-216-123-45-67",
                "contactType": "customer service",
                "email": "info@tuzlasupply.com",
                "availableLanguage": ["Turkish", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/tuzlasupply",
                "https://twitter.com/tuzlasupply"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
