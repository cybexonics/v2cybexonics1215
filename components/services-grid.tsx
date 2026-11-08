"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Code, Cloud, Smartphone, Palette, Settings, TrendingUp } from "lucide-react"

export default function ServicesGrid() {
  const shouldReduceMotion = useReducedMotion()

  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Custom, responsive websites built with modern technologies and best practices",
      color: "from-red-500 to-red-600",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
    },
    {
      icon: Cloud,
      title: "Custom SaaS Platforms",
      description: "Scalable software-as-a-service solutions tailored to your business needs",
      color: "from-blue-500 to-blue-600",
      features: ["Cloud Architecture", "Multi-tenant", "API Integration", "Analytics"],
    },
    {
      icon: TrendingUp,
      title: "SEO & Search Visibility",
      description: "Data-driven SEO strategies that rank your business higher and drive qualified organic traffic",
      color: "from-green-500 to-green-600",
      features: ["Technical SEO Audit", "On-Page Optimization", "Schema Markup", "Content Strategy"],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      color: "from-green-500 to-green-600",
      features: ["Cross-platform", "Native Performance", "Push Notifications", "Offline Support"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience and engagement",
      color: "from-pink-500 to-pink-600",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: Settings,
      title: "Automation/Integration",
      description: "Streamline workflows with custom automation and third-party integrations",
      color: "from-gray-600 to-gray-700",
      features: ["Workflow Automation", "API Development", "System Integration", "Process Optimization"],
    },
  ]

  const headerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  return (
    <section
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--section-grey)] transition-colors duration-300"
      aria-labelledby="services-section-heading"
    >
      {/* Soft 96px vertical gradient at the top from white to grey */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--section-white), var(--section-grey))",
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Subheading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-14 md:mb-20"
        >
          <h2
            id="services-section-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white mb-4"
          >
            Our Services
          </h2>
          <p className="text-[17px] md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed">
            We offer comprehensive IT solutions designed to transform your business and drive growth through technology.
          </p>
        </motion.div>

        {/* 6 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="h-full"
            >
              <article
                className="group relative h-full flex flex-col items-start text-left rounded-[28px] md:rounded-[32px] bg-[#FFFFFF] dark:bg-[#1D1D1F] p-7 sm:p-8 md:p-9 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)] md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] dark:md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              >
                {/* Soft Rounded Squircle Icon Tile with Gradient and Inner Highlight */}
                <div
                  className={`w-[56px] h-[56px] rounded-[18px] bg-gradient-to-b ${service.color} flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] md:group-hover:scale-105 shrink-0`}
                >
                  <service.icon
                    className="w-6 h-6 text-white"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-[22px] font-semibold tracking-tight text-[#1D1D1F] dark:text-white mt-6 mb-3">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-[16px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6] max-w-[34ch]">
                  {service.description}
                </p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
