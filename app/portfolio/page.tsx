"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ExternalLink, Clock } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Modern e-commerce solution with payment integration and inventory management.",
      image: "/images/ecommerce-platform.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://www.riteshprintstudio.com",
      status: "Live",
    },
    {
      title: "Hotel Management SaaS",
      category: "SaaS Solution",
      description: "Complete hotel management system with booking, guest services, and analytics.",
      image: "/images/hotel-management.png",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      liveUrl: "#",
      status: "Live",
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication.",
      image: "/images/mobile-banking.png",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      liveUrl: "https://learn-x-website.vercel.app",
      status: "Live",
    },
    {
      title: "AI-Powered Analytics Dashboard",
      category: "AI & ML",
      description: "Business intelligence dashboard with machine learning insights.",
      image: "/images/ai-analytics.png",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      liveUrl: "#",
      status: "Live",
    },
    {
      title: "Restaurant POS System",
      category: "SaaS Solution",
      description: "Point-of-sale system with inventory management and reporting.",
      image: "/images/restaurant-pos.png",
      technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
      liveUrl: "#",
      status: "Live",
    },
    {
      title: "Learning Management System",
      category: "Web Development",
      description: "Educational platform with course creation and student tracking.",
      image: "/images/learning-management.png",
      technologies: ["Angular", "Express.js", "MongoDB", "WebRTC"],
      liveUrl: "#",
      status: "Live",
    },
    {
      title: "Event Management App",
      category: "SaaS Solution",
      description: "A platform to manage weddings and events with vendor booking and customer-side planning.",
      image: "/images/event-management.png",
      technologies: ["React", "Firebase", "Tailwind"],
      liveUrl: "#",
      status: "Coming Soon",
    },
    {
      title: "Star Tailor Software",
      category: "Custom Software",
      description:
        "Tailoring software for tracking stitching, finishing, and delivery — custom-built for boutique operations.",
      image: "/images/star-tailor.png",
      technologies: ["Next.js", "Supabase"],
      liveUrl: "#",
      status: "Coming Soon",
    },
  ]

  const categories = ["All", "Web Development", "SaaS Solution", "Mobile Development", "AI & ML", "Custom Software"]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our latest projects and see how we've helped businesses transform through innovative technology
              solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  category === "All"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500"
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      {project.status === "Live" && project.liveUrl !== "#" ? (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            className="bg-white text-black hover:bg-gray-100 rounded-full"
                            onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white text-black px-4 py-2 rounded-full flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Coming Soon</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {project.status === "Coming Soon" && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-red-500 font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
