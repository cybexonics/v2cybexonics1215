'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Smartphone, Wrench, Check, MessageCircle } from 'lucide-react'

export default function HomePage() {
  const whyChooseUs = [
    { icon: Code, title: 'Custom Built Solutions', description: 'No templates, tailored to your needs' },
    { icon: Zap, title: 'Scalable Architecture', description: 'Built to grow with your business' },
    { icon: Check, title: 'Clean & Secure Code', description: 'Industry best practices and standards' },
    { icon: ArrowRight, title: 'Fast Delivery', description: 'Efficient development without compromises' },
    { icon: Smartphone, title: 'Business-Oriented', description: 'Focus on your business outcomes' },
  ]

  const services = [
    { title: 'Custom Website Development', desc: 'Professional sites that convert visitors to clients' },
    { title: 'Web Applications & SaaS', desc: 'Scalable systems for your business growth' },
    { title: 'Mobile App Development', desc: 'Native & cross-platform solutions' },
    { title: 'Maintenance & Optimization', desc: 'Ongoing support and performance improvements' },
  ]

  const markets = [
    {
      name: 'UK Market',
      pricing: '£500 – £8000',
      showPricing: true,
      description: 'Professional services for UK businesses seeking scalable solutions',
    },
    {
      name: 'Dubai Market',
      showPricing: false,
      description: 'Premium solutions for UAE enterprises',
    },
    {
      name: 'India Market',
      showPricing: false,
      description: 'Cost-effective development with global quality',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-black">
              We Build Scalable Websites & Digital Systems for Global Businesses
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl leading-relaxed">
              Helping businesses across the UK, Dubai, and India with high-performance custom development. We deliver
              solutions that drive real results.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg transition-all duration-300 font-semibold"
              >
                View Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Minimal background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* MARKET FOCUS SECTION */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-black"
          >
            Global Markets, Local Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {markets.map((market, idx) => (
              <motion.div
                key={market.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-black">{market.name}</h3>
                    {market.showPricing && (
                      <div className="text-3xl font-bold text-red-600 mb-4">{market.pricing}</div>
                    )}
                    <p className="text-gray-600 mb-6">{market.description}</p>
                    {!market.showPricing && (
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                        Get Best Price
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-black"
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border-l-4 border-red-600 pl-6 py-4">
                  <h3 className="text-xl font-bold text-black mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
          >
            Trusted by Growing Businesses
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm font-medium">Brand {i}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-black"
          >
            Why Choose CYBEXONICS
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">About CYBEXONICS</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We specialize in building scalable digital systems for growing businesses. From custom websites to
              enterprise SaaS platforms and mobile applications, we deliver solutions that drive measurable business
              outcomes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our focus is on creating technology that solves real problems, scales efficiently, and delivers lasting
              value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-10">
              Let's discuss your project requirements and create a scalable solution.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href="https://wa.me/919604902393"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold w-full"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
