import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CYBEXONICS - Custom IT Solutions. Real Impact.",
  description:
    "Transforming businesses through innovative technology solutions, custom development, and strategic IT consulting. Specializing in website development, mobile apps, SaaS platforms, and AI solutions.",
  keywords: [
    "IT consulting",
    "web development",
    "mobile apps",
    "SaaS",
    "AI solutions",
    "custom software",
    "Baramati",
    "Maharashtra",
  ],
  authors: [{ name: "CYBEXONICS IT Consultants" }],
  creator: "CYBEXONICS IT Consultants",
  publisher: "CYBEXONICS IT Consultants",
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
    other: [
      {
        rel: "icon",
        url: "/cybexonics-favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/cybexonics-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cybexonics.com",
    siteName: "CYBEXONICS",
    title: "CYBEXONICS - Custom IT Solutions. Real Impact.",
    description:
      "Transforming businesses through innovative technology solutions, custom development, and strategic IT consulting.",
    images: [
      {
        url: "/cybexonics-favicon.png",
        width: 1200,
        height: 630,
        alt: "CYBEXONICS IT Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBEXONICS - Custom IT Solutions. Real Impact.",
    description:
      "Transforming businesses through innovative technology solutions, custom development, and strategic IT consulting.",
    images: ["/cybexonics-favicon.png"],
    creator: "@cybexonics",
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  other: {
    "msapplication-TileColor": "#dc2626",
    "msapplication-TileImage": "/cybexonics-favicon.png",
    "theme-color": "#ffffff",
    "color-scheme": "light dark",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
