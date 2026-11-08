"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ExternalLink, Clock, Phone, PhoneCall, Heart, Sparkles } from "lucide-react"
import SchemaMarkup from "@/components/SchemaMarkup"

interface Project {
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  demoUrl?: string
  phone?: string
  status: "Live" | "Coming Soon"
  initialLikes?: number
}

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cybexonics_portfolio_likes")
      if (saved) {
        setLikedProjects(JSON.parse(saved))
      }
    } catch {
      // Safe fallback if localStorage is disabled
    }
  }, [])

  const toggleLike = (title: string) => {
    setLikedProjects((prev) => {
      const updated = { ...prev, [title]: !prev[title] }
      try {
        localStorage.setItem("cybexonics_portfolio_likes", JSON.stringify(updated))
      } catch {
        // Safe fallback
      }
      return updated
    })
  }

  const projects: Project[] = [
    {
      title: "Ayuvora — Spa Management System",
      category: "SaaS Solution",
      description:
        "Comprehensive luxury wellness ERP & reception management software featuring instant check-in, real-time therapy room scheduling, therapist allocation, treatment tracking, and point-of-sale billing.",
      image: "/images/ayuvora-spa.svg",
      technologies: ["React", "Tailwind CSS", "Reception ERP", "Room Scheduling", "POS & Billing", "Analytics"],
      liveUrl: "https://ayuvora.vercel.app/",
      demoUrl: "https://ayuvora.vercel.app/",
      phone: "9604902393",
      status: "Live",
      initialLikes: 68,
    },
    {
      title: "Worldbox Shipping Pvt. Ltd.",
      category: "Logistics / SEO",
      description:
        "Ongoing SEO retainer and digital logistics growth strategy for international container shipping and freight forwarding, enhancing organic search reach and global shipment leads.",
      image: "/images/worldbox-hero.png",
      technologies: ["Logistics SEO", "Keyword Strategy", "Technical SEO", "Performance", "Analytics"],
      liveUrl: "https://www.worldboxshipping.com/",
      status: "Live",
      initialLikes: 54,
    },
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Modern e-commerce solution with payment integration and inventory management.",
      image: "/images/ecommerce-platform.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://www.riteshprintstudio.com",
      status: "Live",
      initialLikes: 42,
    },
    {
      title: "Hotel Management SaaS",
      category: "SaaS Solution",
      description: "Complete hotel management system with booking, guest services, and analytics.",
      image: "/images/hotel-management.png",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      liveUrl: "#",
      status: "Live",
      initialLikes: 37,
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication.",
      image: "/images/mobile-banking.png",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      liveUrl: "https://learn-x-website.vercel.app",
      status: "Live",
      initialLikes: 45,
    },
    {
      title: "AI-Powered Analytics Dashboard",
      category: "AI & ML",
      description: "Business intelligence dashboard with machine learning insights.",
      image: "/images/ai-analytics.png",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      liveUrl: "#",
      status: "Live",
      initialLikes: 59,
    },
    {
      title: "Restaurant POS System",
      category: "SaaS Solution",
      description: "Point-of-sale system with inventory management and reporting.",
      image: "/images/restaurant-pos.png",
      technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
      liveUrl: "#",
      status: "Live",
      initialLikes: 31,
    },
    {
      title: "Learning Management System",
      category: "Web Development",
      description: "Educational platform with course creation and student tracking.",
      image: "/images/learning-management.png",
      technologies: ["Angular", "Express.js", "MongoDB", "WebRTC"],
      liveUrl: "#",
      status: "Live",
      initialLikes: 29,
    },
    {
      title: "Event Management App",
      category: "SaaS Solution",
      description: "A platform to manage weddings and events with vendor booking and customer-side planning.",
      image: "/images/event-management.png",
      technologies: ["React", "Firebase", "Tailwind"],
      liveUrl: "#",
      status: "Coming Soon",
      initialLikes: 24,
    },
    {
      title: "Star Tailor Software",
      category: "Custom Software",
      description:
        "Tailoring software for tracking stitching, finishing, and delivery — custom-built for boutique operations.",
      image: "/images/star-tailor.png",
      technologies: ["Next.js", "Resend API"],
      liveUrl: "#",
      status: "Coming Soon",
      initialLikes: 19,
    },
  ]

  const categories = [
    "All",
    "SaaS Solution",
    "Logistics / SEO",
    "Web Development",
    "Mobile Development",
    "AI & ML",
    "Custom Software",
  ]

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === selectedCategory ||
            project.category.startsWith(selectedCategory) ||
            (selectedCategory === "Logistics / SEO" && project.category.includes("Logistics"))
        )

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cybexonics.com" },
              { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://www.cybexonics.com/portfolio" },
            ],
          },
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Case Studies &amp; Demos
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our latest projects and see how we've helped businesses transform through innovative technology
              solutions, custom SaaS ERPs, and performance engineering.
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
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={category === selectedCategory ? "default" : "outline"}
                className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  category === selectedCategory
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20"
                    : "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500"
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isLiked = !!likedProjects[project.title]
              const totalLikes = (project.initialLikes || 30) + (isLiked ? 1 : 0)

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col rounded-2xl bg-white">
                    {/* Media Thumbnail Container */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-950">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(project.title)
                          }}
                          aria-label={`Like ${project.title}`}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-200 shadow-sm ${
                            isLiked
                              ? "bg-rose-500/90 text-white shadow-rose-500/30"
                              : "bg-black/60 hover:bg-black/80 text-white/90"
                          }`}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              isLiked ? "fill-white scale-110" : ""
                            }`}
                          />
                          <span>{totalLikes}</span>
                        </button>
                      </div>

                      <div className="absolute top-3 right-3 z-20">
                        {project.status === "Live" ? (
                          <span className="bg-emerald-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            Live
                          </span>
                        ) : (
                          <span className="bg-orange-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10 p-4">
                        {project.status === "Live" && project.liveUrl !== "#" ? (
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-4 shadow-lg text-xs"
                              onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              View Live Demo
                            </Button>
                            {project.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-emerald-600 text-white hover:bg-emerald-700 border-0 font-semibold rounded-full px-4 shadow-lg text-xs"
                                onClick={() => {
                                  window.location.href = `tel:${project.phone}`
                                }}
                              >
                                <Phone className="h-3.5 w-3.5 mr-1.5" />
                                Call {project.phone}
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full flex items-center shadow-lg">
                            <Clock className="h-4 w-4 mr-2 text-orange-500" />
                            <span className="text-xs font-semibold">Coming Soon</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Dedicated Phone Contact Callout for Spa / Client cards */}
                        {project.phone && (
                          <a
                            href={`tel:${project.phone}`}
                            className="mb-4 flex items-center justify-between p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors group/call cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <PhoneCall className="h-4 w-4 text-amber-600" />
                              <span className="text-xs font-semibold">For more details call:</span>
                            </div>
                            <span className="text-xs font-bold tracking-wide text-amber-800 group-hover/call:underline">
                              {project.phone}
                            </span>
                          </a>
                        )}

                        {/* Technologies Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-100 gap-2">
                        {project.status === "Live" && project.liveUrl !== "#" ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">In Development</span>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleLike(project.title)}
                          aria-label={`Like ${project.title}`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            isLiked
                              ? "bg-rose-50 text-rose-600 border border-rose-200"
                              : "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
                            }`}
                          />
                          <span>{totalLikes}</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
