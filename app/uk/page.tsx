"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle, Clock, Shield, Users, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UKPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneNumber: "+44 ",
    serviceNeeded: "",
    projectBudget: "",
    projectDescription: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const serviceOptions = [
    "Website Development",
    "Mobile App",
    "SaaS Platform",
    "AI/ML Solution",
    "UI/UX Design",
    "Other",
  ]

  const budgetOptions = [
    "£399–£799",
    "£800–£1,999",
    "£2,000–£5,000",
    "£5,000+",
  ]

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          fullName: "",
          businessEmail: "",
          companyName: "",
          phoneNumber: "+44 ",
          serviceNeeded: "",
          projectBudget: "",
          projectDescription: "",
        })
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block mb-6 px-4 py-2 bg-red-600/20 border border-red-600/40 rounded-full">
              <p className="text-red-400 text-sm font-semibold">🇬🇧 UK Dedicated Services</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Custom IT Solutions for{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                UK Businesses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Websites, SaaS & Mobile Apps built for UK startups and SMEs. GDPR Compliant. UK Timezone Support.
            </p>
            <Button
              onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg inline-flex items-center gap-2"
            >
              Get a Quote Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Get Your Free Quote</h2>
                <p className="text-gray-600 mb-8">Tell us about your project and we'll provide a custom estimate within 4 hours.</p>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex items-start gap-4"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-900 font-semibold mb-1">Thanks! We&apos;ve received your request.</p>
                      <p className="text-green-700">We&apos;ll get back to you within 4 hours during UK business hours (9am–6pm GMT)</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-red-800 font-semibold">There was an error sending your message.</p>
                    <p className="text-red-700 text-sm mt-1">Please try again or contact us directly at cybexonicsitconsultants@gmail.com</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="John Smith"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Business Email and Company Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.businessEmail}
                        onChange={(e) => handleChange("businessEmail", e.target.value)}
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                        placeholder="john@company.co.uk"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                      <Input
                        required
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                        placeholder="Your Company Ltd"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="+44 20 7946 0958"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed *</label>
                    <Select value={formData.serviceNeeded} onValueChange={(value) => handleChange("serviceNeeded", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-red-500 focus:ring-red-500" disabled={isSubmitting}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Budget *</label>
                    <Select value={formData.projectBudget} onValueChange={(value) => handleChange("projectBudget", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-red-500 focus:ring-red-500" disabled={isSubmitting}>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description *</label>
                    <Textarea
                      required
                      value={formData.projectDescription}
                      onChange={(e) => handleChange("projectDescription", e.target.value)}
                      rows={5}
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Tell us about your project, requirements, timeline, and any specific features you need..."
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 font-semibold text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      "Get My Free Quote"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Cybexonics UK?</h2>
            <p className="text-gray-600 text-lg">We understand the unique needs of UK businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🇬🇧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">UK Timezone Support</h3>
                    <p className="text-gray-600">Real-time support during UK business hours. No waiting for responses across time zones.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">GDPR Compliant</h3>
                    <p className="text-gray-600">Full compliance with GDPR regulations. Your data privacy is our priority.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Response within 4 Hours</h3>
                    <p className="text-gray-600">Fast quote turnaround. We respond to all UK inquiries within 4 hours during business hours.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">25+ Happy Clients</h3>
                    <p className="text-gray-600">Trusted by UK startups and SMEs. Our track record speaks for itself.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
