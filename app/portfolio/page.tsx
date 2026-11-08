import type { Metadata } from "next"
import PortfolioClient from "@/components/pages/portfolio-client"

export const metadata: Metadata = {
  title: "Our Work & Projects | Web Development Portfolio — Cybexonics",
  description:
    "Explore Cybexonics projects — responsive websites, SaaS platforms & mobile apps built for real businesses across India and the UK. See our results.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Our Work & Projects | Web Development Portfolio — Cybexonics",
    description:
      "Explore Cybexonics projects — responsive websites, SaaS platforms & mobile apps built for real businesses across India and the UK. See our results.",
    url: "/portfolio",
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
    title: "Our Work & Projects | Web Development Portfolio — Cybexonics",
    description:
      "Explore Cybexonics projects — responsive websites, SaaS platforms & mobile apps built for real businesses across India and the UK. See our results.",
    images: ["/og-image.jpg"],
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
