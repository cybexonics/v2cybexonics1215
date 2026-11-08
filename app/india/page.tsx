import type { Metadata } from "next"
import IndiaClient from "@/components/pages/india-client"

export const metadata: Metadata = {
  title: "IT Solutions & Web Development for Indian Businesses | Cybexonics India",
  description:
    "Premium websites, mobile apps & SaaS platforms built for Indian businesses. Cybexonics — based in Baramati, Pune. Get your custom quote in 24 hours.",
  alternates: {
    canonical: "/india",
  },
  openGraph: {
    title: "IT Solutions & Web Development for Indian Businesses | Cybexonics India",
    description:
      "Premium websites, mobile apps & SaaS platforms built for Indian businesses. Cybexonics — based in Baramati, Pune. Get your custom quote in 24 hours.",
    url: "/india",
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
    title: "IT Solutions & Web Development for Indian Businesses | Cybexonics India",
    description:
      "Premium websites, mobile apps & SaaS platforms built for Indian businesses. Cybexonics — based in Baramati, Pune. Get your custom quote in 24 hours.",
    images: ["/og-image.jpg"],
  },
}

export default function IndiaPage() {
  return <IndiaClient />
}
