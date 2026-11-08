import type { Metadata } from "next"
import ServicesClient from "@/components/pages/services-client"

export const metadata: Metadata = {
  title: "IT Services — Web Dev, Mobile Apps, SEO, AI & SaaS | Cybexonics Pune",
  description:
    "Cybexonics offers custom website development, mobile apps, SaaS platforms, UI/UX design, SEO & AI solutions. Serving businesses across Pune, Maharashtra & the UK.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "IT Services — Web Dev, Mobile Apps, SEO, AI & SaaS | Cybexonics Pune",
    description:
      "Cybexonics offers custom website development, mobile apps, SaaS platforms, UI/UX design, SEO & AI solutions. Serving businesses across Pune, Maharashtra & the UK.",
    url: "/services",
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
    title: "IT Services — Web Dev, Mobile Apps, SEO, AI & SaaS | Cybexonics Pune",
    description:
      "Cybexonics offers custom website development, mobile apps, SaaS platforms, UI/UX design, SEO & AI solutions. Serving businesses across Pune, Maharashtra & the UK.",
    images: ["/og-image.jpg"],
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}