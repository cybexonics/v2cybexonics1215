"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
  ]

  const services = [
    { name: "Website Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "SaaS Solutions", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-red-600 bg-clip-text text-transparent">
              CYBEXONICS IT CONSULTANTS
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming businesses through innovative technology solutions and strategic IT consulting.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/cybexonics"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-3 bg-transparent transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/cybexonics"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-3 bg-transparent transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-red-500 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-red-500 transition-colors duration-200">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Office No. 4, 1st Floor, The
                    <br />
                    Vidya Tower,
                    <br />
                    Pencil Chowk, Baramati
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <a
                  href="tel:+919604902393"
                  className="text-gray-300 text-sm hover:text-red-500 transition-colors duration-200"
                >
                  +91 9604902393
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <a
                  href="mailto:cybexonicsitconsultants@gmail.com"
                  className="text-gray-300 text-sm hover:text-red-500 transition-colors duration-200 break-all"
                >
                  cybexonicsitconsultants@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">© 2024 CYBEXONICS IT Consultants. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
