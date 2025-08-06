"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cloud, Brain, Smartphone, Palette, Settings } from "lucide-react"

export default function ServicesGrid() {
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
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning",
      color: "from-purple-500 to-purple-600",
      features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Automation"],
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

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We offer comprehensive IT solutions designed to transform your business and drive growth through technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              scale: 1.02,
              rotateX: 5,
              rotateY: 5,
            }}
            className="group perspective-1000"
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm transform-gpu">
              <CardContent className="p-8">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotateY: 180,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform-gpu preserve-3d`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-center mb-6 leading-relaxed">{service.description}</p>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.1 }}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
