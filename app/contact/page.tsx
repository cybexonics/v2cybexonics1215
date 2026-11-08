import type { Metadata } from "next"
import ContactClient from "@/components/pages/contact-client"

export const metadata: Metadata = {
  title: "Contact Cybexonics — Web Development Company Pune, Baramati",
  description:
    "Get in touch with Cybexonics IT Consultants. Office in Baramati, Pune. Call +91 9604902393 or email us for a free project consultation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Cybexonics — Web Development Company Pune, Baramati",
    description:
      "Get in touch with Cybexonics IT Consultants. Office in Baramati, Pune. Call +91 9604902393 or email us for a free project consultation.",
    url: "/contact",
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
    title: "Contact Cybexonics — Web Development Company Pune, Baramati",
    description:
      "Get in touch with Cybexonics IT Consultants. Office in Baramati, Pune. Call +91 9604902393 or email us for a free project consultation.",
    images: ["/og-image.jpg"],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
