import type { Metadata } from "next"
import AboutClient from "@/components/pages/about-client"

export const metadata: Metadata = {
  title: "About Us — IT Consultants in Baramati, Pune",
  description:
    "Meet the Cybexonics team — passionate IT consultants from Baramati delivering world-class web development, AI & SaaS solutions across India and the UK.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us — IT Consultants in Baramati, Pune",
    description:
      "Meet the Cybexonics team — passionate IT consultants from Baramati delivering world-class web development, AI & SaaS solutions across India and the UK.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cybexonics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — IT Consultants in Baramati, Pune",
    description:
      "Meet the Cybexonics team — passionate IT consultants from Baramati delivering world-class web development, AI & SaaS solutions across India and the UK.",
    images: ["/og-image.jpg"],
  },
}

export default function AboutPage() {
  return <AboutClient />
}
