'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const TrustedBySection = () => {
  const [isHovered, setIsHovered] = useState(false)

  const clients = [
    {
      id: 1,
      name: 'Sumant Industries',
      website: "https://sumant-indu-git-55fa98-cybexonics-it-consultants-pvt-s-projects.vercel.app/",
      logo: '/logos/sumant-industries.png',
    },
    {
      id: 2,
      name: 'Lifelongwellness',
      website: "https://www.lifelongwellness.co.in/",
      logo: '/logos/lifelongwellness.png',
    },
    {
      id: 3,
      name: 'Darshan-uniforms',
      website: "https://www.darshan-uniform.com/",
      logo: '/logos/darshan-uniforms.png',
    },
    {
      id: 4,
      name: 'Cloud Enterprises',
      website: "https://sumant-indu-git-55fa98-cybexonics-it-consultants-pvt-s-projects.vercel.app/",
      logo: '/logos/cloud-enterprises.png',
      
    },
    {
      id: 5,
      name: 'Data Analytics Pro',
      website: "-",
      logo: '/logos/data-analytics-pro.png',
      
    },
    {
      id: 6,
      name: 'Smart Business',
      website: "-",
      logo: '/logos/smart-business.png',      
    },
  ]

  // Duplicate clients for seamless infinite scroll

    const duplicatedClients = [...clients, ...clients]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted By Leading{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Companies
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We partner with innovative companies of all sizes to deliver transformative IT solutions and drive business growth.
          </p>
        </motion.div>

        {/* Logo Slider */}
        <div
          className="relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl p-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-12 items-center">
            <motion.div
              animate={{
                x: isHovered ? 0 : -2000,
              }}
              transition={{
                duration: isHovered ? 0 : 30,
                ease: isHovered ? 'easeInOut' : 'linear',
                repeat: isHovered ? 0 : Infinity,
              }}
              className="flex gap-12 whitespace-nowrap"
            >
               {duplicatedClients.map((client, index) => (
            <motion.a
                key={`${client.id}-${index}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 h-20 w-40 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.05 }}
  >
    <div className="w-32 h-16 relative">
      <Image
        src={client.logo}
        alt={client.name}
        fill
        className="object-contain grayscale group-hover:grayscale-0 transition duration-300"
      />
    </div>
  </motion.a>
))}
  </motion.div>
    </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

          {/* Hover indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
            {isHovered ? 'Scrolling paused' : 'Hover to pause'}
          </div>
        </div>

        {/* Stats underneath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-3 gap-6 text-center"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-red-600">100+</div>
            <div className="text-gray-600 text-sm md:text-base">Happy Clients</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-red-600">500+</div>
            <div className="text-gray-600 text-sm md:text-base">Projects Delivered</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-red-600">10+</div>
            <div className="text-gray-600 text-sm md:text-base">Industries Served</div>
          </div>
        </motion.div>
      </div>
    </section>
    )
}

export default TrustedBySection
