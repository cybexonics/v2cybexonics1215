"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ServicesGrid from "@/components/services-grid"
import TrustedBySection from "@/components/trusted-by-section"
import PricingSection from "@/components/pricing-section"
import SchemaMarkup from "@/components/SchemaMarkup"
import Hero3DBackground from "@/components/hero-3d-background"
import WhyChooseBento from "@/components/why-choose-bento"
import StatCounter from "@/components/stat-counter"

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Cybexonics IT Consultants Pvt. Ltd.",
  telephone: "+919604902393",
  email: "info@cybexonics.com",
  url: "https://www.cybexonics.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Baramati",
    addressRegion: "Maharashtra",
    postalCode: "413102",
    addressCountry: "IN",
  },
  areaServed: ["Baramati", "Pune", "Maharashtra", "United Kingdom"],
  serviceType: [
    "Web Development",
    "Mobile App Development",
    "SaaS Development",
    "SEO Services",
    "UI/UX Design",
    "AI & Machine Learning",
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost in Pune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website development in Pune starts from ₹25,000. Contact Cybexonics for a free custom quote tailored to your exact requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build websites in Baramati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Cybexonics is based in Baramati and serves clients across Pune, Maharashtra, all of India and the UK.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard business website takes 2–4 weeks. Complex web applications and SaaS platforms take 6–12 weeks depending on features.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO services in Pune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Cybexonics offers full SEO services including technical SEO, on-page optimization, schema markup and local SEO for businesses in Pune, Baramati and across Maharashtra.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.cybexonics.com",
    },
  ],
}

export default function HomeClient() {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [isBtnHovered, setIsBtnHovered] = useState(false)
  const btnRef = useRef<HTMLAnchorElement>(null)

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Staggered reveal configuration:
  // 80ms stagger between lines, cubic-bezier ease [0.16, 1, 0.3, 1], opacity 0->1 + translateY 20px->0
  const lineReveal = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  })

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-[var(--section-white)] transition-colors duration-300">
      <Navigation />
      <SchemaMarkup schema={[localBusinessSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-[var(--section-white)] relative overflow-hidden transition-colors duration-300">
        {/* Abstract 3D Depth Layer (Three.js Particle/Node Network & Low-Poly Wireframe) */}
        <Hero3DBackground />

        {/* Floating Subtle Ambient Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-2xl opacity-50"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-40 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-35"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-100 rounded-lg opacity-40"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div>
            {/* Logo and Headline - Staggered Line 0 & 1 */}
            <div className="mb-8">
              <motion.h1
                {...lineReveal(0)}
                className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-red-600 bg-clip-text text-transparent tracking-tight"
              >
                CYBEXONICS
              </motion.h1>
              <motion.p
                {...lineReveal(1)}
                className="text-xl md:text-2xl text-gray-600 font-light"
              >
                IT Consultants Pvt. Ltd.
              </motion.p>
            </div>

            {/* Main Heading - Staggered Line 2 with 8s Animated Gradient Text */}
            <motion.h2
              {...lineReveal(2)}
              className="text-3xl md:text-5xl font-semibold mb-6 leading-tight text-neutral-900"
            >
              Custom IT Solutions.{" "}
              <span className="animate-gradient-text font-bold">
                Real Impact.
              </span>
            </motion.h2>

            {/* Subheading - Staggered Line 3 */}
            <motion.p
              {...lineReveal(3)}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Transforming businesses through innovative technology solutions, custom development, and strategic IT
              consulting.
            </motion.p>

            {/* CTA Buttons - Staggered Line 4 with Radial Spotlight Micro-interaction */}
            <motion.div
              {...lineReveal(4)}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/services"
                ref={btnRef}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                onMouseMove={handleBtnMouseMove}
                className="relative inline-flex items-center justify-center overflow-hidden bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-medium group"
              >
                {/* Radial Spotlight Glow Effect Following Cursor */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: isBtnHovered ? 1 : 0,
                    background: `radial-gradient(130px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.42), transparent 70%)`,
                  }}
                />
                <span className="relative z-10 flex items-center">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg bg-transparent group"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdM-f8Y0U6v4o_QlRAKmDYnrKIiMweOG28KwgbOhxdSwppX6Q/viewform?usp=header",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Join Our Internship
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Count-Up Animations */}
      <section className="relative py-16 px-4 bg-[var(--section-grey)] transition-colors duration-300">
        {/* Soft 96px vertical gradient at the top from white to grey */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, var(--section-white), var(--section-grey))",
          }}
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                number={stat.number}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Services Section */}
      <ServicesGrid />

      {/* Why Choose CYBEXONICS Bento Grid Section */}
      <WhyChooseBento />

      {/* Pricing Section */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--section-grey)] transition-colors duration-300">
        {/* Soft 96px vertical gradient at the top from white to grey */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, var(--section-white), var(--section-grey))",
          }}
          aria-hidden="true"
        />
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">Let's discuss your project and create something amazing together.</p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg font-semibold"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
