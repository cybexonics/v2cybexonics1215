import type { Metadata } from "next"
import CareersClient from "@/components/pages/careers-client"

export const metadata: Metadata = {
  title: "Careers at Cybexonics — Join Our IT Team in Baramati, Pune",
  description:
    "Looking for web development, design or marketing internships & jobs? Join Cybexonics — a fast-growing IT company in Baramati, Pune. Apply now.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Cybexonics — Join Our IT Team in Baramati, Pune",
    description:
      "Looking for web development, design or marketing internships & jobs? Join Cybexonics — a fast-growing IT company in Baramati, Pune. Apply now.",
    url: "/careers",
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
    title: "Careers at Cybexonics — Join Our IT Team in Baramati, Pune",
    description:
      "Looking for web development, design or marketing internships & jobs? Join Cybexonics — a fast-growing IT company in Baramati, Pune. Apply now.",
    images: ["/og-image.jpg"],
  },
}

export default function CareersPage() {
  return <CareersClient />
}
