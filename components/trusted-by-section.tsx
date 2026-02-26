'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

const TrustedBySection = () => {
  const [isHovered, setIsHovered] = useState(false)

  const clients = [
    {
      id: 1,
      name: 'Tech Innovations',
      logo: '/logos/client-1-color.png',
      website: 'https://www.techinnovations.com',
      description: 'Leading technology innovation company',
    },
    {
      id: 2,
      name: 'Digital Solutions',
      logo: '/logos/client-2-color.png',
      website: 'https://www.digitalsolutions.io',
      description: 'Enterprise digital transformation',
    },
    {
      id: 3,
      name: 'Future Systems',
      logo: '/logos/client-3-color.png',
      website: 'https://www.futuresystems.dev',
      description: 'AI and ML solutions provider',
    },
    {
      id: 4,
      name: 'Cloud Enterprises',
      logo: '/logos/client-4-color.png',
      website: 'https://www.cloudenterprises.io',
      description: 'Cloud infrastructure services',
    },
    {
      id: 5,
      name: 'Data Analytics Pro',
      logo: '/logos/client-5-color.png',
      website: 'https://www.dataanalyticspro.com',
      description: 'Advanced data insights platform',
    },
    {
      id: 6,
      name: 'Smart Business',
      logo: '/logos/client-6-color.png',
      website: 'https://www.smartbusiness.ai',
      description: 'Business intelligence solutions',
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
                  className="flex-shrink-0 h-24 w-48 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden relative hover:border-red-200"
                  whileHover={{ scale: 1.05 }}
                  title={`Visit ${client.name} - ${client.description}`}
                >
                  {/* Logo Image with grayscale default */}
                  <div className="relative w-40 h-20 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                      priority={false}
                    />
                  </div>

                  {/* External link icon - appears on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 rounded-full p-1.5">
                    <ExternalLink size={14} className="text-white" />
                  </div>

                  {/* Tooltip text */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-2 px-2 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white text-center">
                      Visit Website
                    </span>
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
