import type { Metadata } from "next"
import HomeClient from "@/components/pages/home-client"

export const metadata: Metadata = {
  title: {
    absolute: "Cybexonics — IT Consultants Baramati, Pune",
  },
  description:
    "Custom websites, mobile apps & SaaS platforms for Indian & UK businesses. Trusted IT consultants in Baramati, Pune.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cybexonics — IT Consultants Baramati, Pune",
    description:
      "Custom websites, mobile apps & SaaS platforms for Indian & UK businesses. Trusted IT consultants in Baramati, Pune.",
    url: "/",
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
    title: "Cybexonics — IT Consultants Baramati, Pune",
    description:
      "Custom websites, mobile apps & SaaS platforms for Indian & UK businesses. Trusted IT consultants in Baramati, Pune.",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return <HomeClient />
}
