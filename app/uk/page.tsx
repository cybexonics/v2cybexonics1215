import type { Metadata } from "next"
import UKClient from "@/components/pages/uk-client"

export const metadata: Metadata = {
  title: "Affordable Web Development for UK Businesses | Cybexonics India",
  description:
    "UK businesses — get enterprise-grade websites, apps & SaaS platforms from Cybexonics India. Affordable UK pricing, IST + GMT support. Free consultation.",
  alternates: {
    canonical: "/uk",
  },
  openGraph: {
    title: "Affordable Web Development for UK Businesses | Cybexonics India",
    description:
      "UK businesses — get enterprise-grade websites, apps & SaaS platforms from Cybexonics India. Affordable UK pricing, IST + GMT support. Free consultation.",
    url: "/uk",
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
    title: "Affordable Web Development for UK Businesses | Cybexonics India",
    description:
      "UK businesses — get enterprise-grade websites, apps & SaaS platforms from Cybexonics India. Affordable UK pricing, IST + GMT support. Free consultation.",
    images: ["/og-image.jpg"],
  },
}

export default function UKPage() {
  return <UKClient />
}
