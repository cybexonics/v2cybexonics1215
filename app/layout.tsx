import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SchemaMarkup from "@/components/SchemaMarkup"

const inter = Inter({ subsets: ["latin"] })

// ── Schemas — declared ONCE ───────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cybexonics",
  url: "https://www.cybexonics.com",
  logo: "https://www.cybexonics.com/logo.png",
  email: "info@cybexonics.com",
  telephone: "+919604902393",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baramati",
    addressLocality: "Baramati",
    addressRegion: "Maharashtra",
    postalCode: "413102",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/cybexonics",
    "https://twitter.com/cybexonics",
    "https://github.com/cybexonics",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cybexonics",
  url: "https://www.cybexonics.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.cybexonics.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

// ── Metadata — ONE export only ────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cybexonics.com"),
  title: {
    default: "Cybexonics — IT Consultants Baramati, Pune",
    template: "%s | Cybexonics",
  },
  description: "Custom websites, mobile apps & SaaS platforms for Indian & UK businesses. Trusted IT consultants in Baramati, Pune.",
  keywords: [
    "web development Baramati",
    "IT company Pune",
    "web development Pune",
    "IT consultants Maharashtra",
    "mobile app development Pune",
    "SaaS development India",
    "SEO services Pune",
  ],
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
    icon: [
      { url: "/cybexonics-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/cybexonics-favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/cybexonics-favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.cybexonics.com",
    siteName: "Cybexonics",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cybexonics — IT Consultants Baramati Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cybexonics",
    creator: "@cybexonics",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  alternates: {
    canonical: "https://www.cybexonics.com",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

// ── Layout ────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}