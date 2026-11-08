import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SchemaMarkup from "@/components/SchemaMarkup"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const SITE = "https://www.cybexonics.com"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Cybexonics IT Consultants Pvt. Ltd.",
  alternateName: "Cybexonics",
  url: SITE,
  logo: `${SITE}/images/logo_1080.png`,
  email: "aayush@cybexonics.com",
  telephone: "+919604902393",
  foundingDate: "2024-09-02",
  areaServed: ["IN", "GB"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 4, 1st Floor, The Vidya Tower, Pencil Chowk",
    addressLocality: "Baramati",
    addressRegion: "Maharashtra",
    postalCode: "413102",
    addressCountry: "IN",
  },
  // Only list profiles that really exist. Add the LinkedIn company page,
  // Clutch and GoodFirms here once they are live.
  sameAs: ["https://www.instagram.com/cybexonics.it_consultants"],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Cybexonics",
  url: SITE,
  publisher: { "@id": `${SITE}/#organization` },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Cybexonics — IT Consultants Baramati, Pune",
    template: "%s | Cybexonics", // page titles must NOT add "| Cybexonics" themselves
  },
  description:
    "Custom websites, mobile apps & SaaS platforms for Indian & UK businesses. Trusted IT consultants in Baramati, Pune.",
  authors: [{ name: "Cybexonics IT Consultants" }],
  creator: "Cybexonics IT Consultants",
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
  icons: {
    icon: "/cybexonics-favicon.png",
    apple: "/cybexonics-favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Cybexonics",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cybexonics — IT Consultants Baramati Pune" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cybexonics",
    creator: "@cybexonics",
    images: ["/og-image.jpg"],
  },
  // NO global canonical here. Every page sets its own.
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <html lang="en-IN" suppressHydrationWarning>
      <body className={inter.className}>
=======
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
>>>>>>> b7f0771af9be3af057e7b0d37aa6ed00b1f7df78
        <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}