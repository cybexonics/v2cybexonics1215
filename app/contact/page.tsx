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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          form_type: "contact",
        }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        console.error("API Error:", result)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }

    return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get In{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your business with innovative technology solutions? Let's discuss your project and
                bring your ideas to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                      <Send className="h-6 w-6 text-red-500 mr-3" />
                      Send us a message
                    </h3>

                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">There was an error sending your message. Please try again.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                          placeholder="Your full name"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            placeholder="your.email@example.com"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            placeholder="+91 9876543210"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                          placeholder="What's this about?"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          rows={5}
                          className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                          placeholder="Tell us about your project or inquiry..."
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Office Address</h4>
                            <p className="text-gray-600">
                              Office No. 4, 1st Floor, The Vidya Tower,
                              <br />
                              Pencil Chowk, Baramati
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                            <Phone className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Phone</h4>
                            <p className="text-gray-600">+91 9604902393</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                            <Mail className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Email</h4>
                            <p className="text-gray-600">cybexonicsitconsultants@gmail.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Business Hours</h4>
                            <p className="text-gray-600">
                              Monday - Friday: 9:00 AM - 6:00 PM
                              <br />
                              Saturday: 10:00 AM - 4:00 PM
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open("https://wa.me/919604902393", "_blank")}
                    >
                      WhatsApp Us
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-full transition-all duration-300 bg-transparent"
                      onClick={() => window.open("tel:+919604902393", "_blank")}
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
