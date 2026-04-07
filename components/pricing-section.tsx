"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "£399",
      color: "from-green-500 to-green-600",
      badge: null,
      features: [
        "3-page Responsive Website",
        "Portfolio Website",
        "25 Days Maintenance",
        "Simple Design",
        "Basic SEO Setup",
      ],
    },
    {
      name: "Professional",
      price: " £799",
      color: "from-red-500 to-red-600",
      badge: "Most Popular",
      features: ["Up to 6 Pages", "Pro Design", "Fully SEO Setup", "Free Domain up to ₹1000", "45 Days Maintenance"],
    },
    {
      name: "Enterprise",
      price: "£1,999+",
      color: "from-gray-800 to-black",
      badge: null,
      features: [
        "E-Commerce Website",
        "30+ Pages",
        "Advanced SEO",
        "Custom Design",
        "Free Domain",
        "Social Media Integration",
        "90 Days Maintenance",
      ],
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Pricing Plans</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your business needs. All plans include our premium support and maintenance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative ${plan.badge ? "md:-mt-4" : ""}`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {plan.badge}
                </div>
              </div>
            )}

            <Card
              className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                plan.badge ? "ring-2 ring-red-500 ring-opacity-50" : ""
              }`}
            >
              <CardHeader className="text-center pb-8 pt-8">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold text-white">
                    {plan.name === "Basic" ? "🟢" : plan.name === "Professional" ? "🔴" : "⚫"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                {plan.name === "Enterprise" && <p className="text-sm text-gray-500">Starting price</p>}
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.badge
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
