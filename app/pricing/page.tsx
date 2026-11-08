import type { Metadata } from "next"
import PricingClient from "@/components/pages/pricing-client"

export const metadata: Metadata = {
  title: "Web Development Pricing Plans | Cybexonics — Baramati, Pune",
  description:
    "Transparent web development pricing starting from £399. Basic, Professional & Enterprise plans with SEO, custom design & maintenance. Get started today.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Web Development Pricing Plans | Cybexonics — Baramati, Pune",
    description:
      "Transparent web development pricing starting from £399. Basic, Professional & Enterprise plans with SEO, custom design & maintenance. Get started today.",
    url: "/pricing",
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
    title: "Web Development Pricing Plans | Cybexonics — Baramati, Pune",
    description:
      "Transparent web development pricing starting from £399. Basic, Professional & Enterprise plans with SEO, custom design & maintenance. Get started today.",
    images: ["/og-image.jpg"],
  },
}

export default function PricingPage() {
  return <PricingClient />
}
