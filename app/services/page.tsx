"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ServicesGrid from "@/components/services-grid"
import { motion } from "framer-motion"
import SchemaMarkup from "@/components/SchemaMarkup"

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cybexonics IT Services",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Website Development", provider: { "@type": "Organization", name: "Cybexonics" } },
    { "@type": "Service", position: 2, name: "Mobile App Development", provider: { "@type": "Organization", name: "Cybexonics" } },
    { "@type": "Service", position: 3, name: "SEO Services", provider: { "@type": "Organization", name: "Cybexonics" } },
    { "@type": "Service", position: 4, name: "SaaS Development", provider: { "@type": "Organization", name: "Cybexonics" } },
    { "@type": "Service", position: 5, name: "UI/UX Design", provider: { "@type": "Organization", name: "Cybexonics" } },
    { "@type": "Service", position: 6, name: "AI & Machine Learning", provider: { "@type": "Organization", name: "Cybexonics" } },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cybexonics.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cybexonics.com/services" },
  ],
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ✅ Schema inside return, as first child */}
      <SchemaMarkup schema={[servicesSchema, breadcrumbSchema]} />

      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IT Services in{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Pune & Baramati
              </span>
            </h1>
            {/* ☝️ was "Our Services" — now has keywords Google can rank */}

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Web development, mobile apps, SaaS platforms, SEO & AI solutions
              for businesses in Pune, Baramati, Maharashtra and the UK.
            </p>
            {/* ☝️ keywords in visible description */}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <ServicesGrid />
      </section>

      <Footer />
    </div>
  )
}