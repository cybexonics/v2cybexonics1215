"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Globe, Smartphone, Code2, LayoutGrid, ShieldCheck, Sparkles, Users, CheckCircle2, MessageSquare, CalendarDays } from "lucide-react"

const whyCards = [
  {
    title: "Custom Quote Every Time",
    description: "No fixed packages. Pricing built around your exact requirements.",
    icon: Sparkles,
  },
  {
    title: "India-Based Support Team",
    description: "IST timezone support with Hindi + English communication and fast response.",
    icon: ShieldCheck,
  },
  {
    title: "GST Invoice Provided",
    description: "Proper tax documentation for Indian businesses and compliance-ready billing.",
    icon: Globe,
  },
  {
    title: "Trusted by Indian Brands",
    description: "Sumant Industries, Lifelongwellness, Darshan Uniforms and more rely on us.",
    icon: Users,
  },
]

const serviceCards = [
  {
    title: "Website Development",
    features: ["Responsive design", "Performance-first", "SEO-ready", "CMS integration"],
  },
  {
    title: "Mobile Apps",
    features: ["Android & iOS", "Cross-platform options", "Push notifications", "Offline support"],
  },
  {
    title: "SaaS Platforms",
    features: ["Scalable architecture", "Secure user flows", "Custom dashboards", "API-first"],
  },
  {
    title: "UI/UX Design",
    features: ["User research", "Wireframes", "Interactive prototypes", "Brand-aligned interfaces"],
  },
  {
    title: "SEO Services",
    features: ["Technical SEO", "Local search", "Content optimization", "Analytics setup"],
  },
  {
    title: "AI & ML",
    features: ["Intelligent automation", "Predictive models", "Data insights", "Workflow optimization"],
  },
]

const testimonials = [
  {
    company: "Sumant Industries",
    quote:
      "CybeXonics delivered a modern digital platform that transformed our customer engagement. Their India team is responsive and reliable.",
  },
  {
    company: "Lifelongwellness",
    quote:
      "Our mobile app launch was smooth and on schedule. The attention to detail and local support made all the difference.",
  },
  {
    company: "Darshan Uniforms",
    quote:
      "They understood our Indian market requirements and helped us build a website that converts.",
  },
]

const serviceOptions = [
  "Website Development",
  "Mobile App",
  "SaaS Platform",
  "UI/UX Design",
  "SEO Services",
  "AI & ML",
  "Other",
] as const

const budgetOptions = [
  "Under ₹25,000",
  "₹25,000–₹75,000",
  "₹75,000–₹2,00,000",
  "₹2,00,000+",
  "Prefer not to say",
] as const

const timelineOptions = ["ASAP", "1 Month", "2–3 Months", "Flexible"] as const

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  whatsapp: z.string().trim().min(1, "WhatsApp number is required"),
  business: z.string().optional(),
  cityState: z.string().optional(),
  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: "Choose a service" }),
  }),
  projectDescription: z.string().trim().min(30, "Please describe your project in at least 30 characters"),
  budget: z.enum(budgetOptions, {
    errorMap: () => ({ message: "Choose a budget range" }),
  }),
  timeline: z.enum(timelineOptions, {
    errorMap: () => ({ message: "Choose a timeline" }),
  }),
  gst: z.string().optional(),
})

type QuoteFormValues = z.infer<typeof quoteSchema>

export default function IndiaPage() {
  const formRef = useRef<HTMLDivElement | null>(null)
  const [selectedService, setSelectedService] = useState<(typeof serviceOptions)[number]>(serviceOptions[0])
  const [submissionState, setSubmissionState] = useState("idle")
  const [submissionError, setSubmissionError] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "+91 ",
      business: "",
      cityState: "",
      service: selectedService,
      projectDescription: "",
      budget: budgetOptions[0],
      timeline: timelineOptions[0],
      gst: "",
    },
  })

  useEffect(() => {
    setValue("service", selectedService)
  }, [selectedService, setValue])

  const scrollToForm = (service?: (typeof serviceOptions)[number]) => {
    if (service) {
      setSelectedService(service)
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onSubmit = async (values: QuoteFormValues) => {
    setSubmissionError("")
    setSubmissionState("submitting")

    try {
      const response = await fetch("/api/india-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit your request. Please try again.")
      }

      setIsSuccessful(true)
      setSubmissionState("success")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to submit your request. Please try again."
      setSubmissionError(message)
      setSubmissionState("idle")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.16),_transparent_42%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                <span className="text-base">🇮🇳</span>
                India Services
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium IT Solutions Built for Indian Businesses
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Enterprise-grade websites, apps & SaaS platforms — crafted for the Indian market. Get a custom quote tailored to your exact needs.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700"
                  onClick={() => scrollToForm()}
                >
                  Get Best Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3 text-base font-semibold text-slate-100 shadow-sm transition hover:border-red-500 hover:text-red-200"
                  onClick={() => document.getElementById("india-services")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  Our Services
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/40">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-red-400">Why choose us</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Local delivery, global quality.</h2>
                    <p className="mt-4 text-slate-300">Expert engineering built for India, from GST-ready invoices to trusted IST support.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-red-400">Fast response</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">4 business hours</h2>
                    <p className="mt-4 text-slate-300">We’ll respond quickly and align your quote with Indian market needs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Why Cybexonics India</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Built for Indian businesses, designed for real growth.</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {whyCards.map((card, index) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-slate-300 leading-7">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="india-services" className="bg-slate-950/95 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Services we offer in India</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Solutions for every digital ambition</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-400">
              From enterprise websites and mobile apps to SaaS platforms, UI/UX design and AI-powered growth engines.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
            {serviceCards.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-slate-400">Tailored delivery for Indian businesses.</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-slate-300">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700"
                  onClick={() => scrollToForm(service.title as (typeof serviceOptions)[number])}
                >
                  Get Quote
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/90 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Our process</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A clear path from inquiry to kickoff</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "Step 1", title: "Submit Your Requirements" },
              { step: "Step 2", title: "Free Consultation Call" },
              { step: "Step 3", title: "Custom Quote in 24 Hours" },
              { step: "Step 4", title: "Project Kickoff" },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center shadow-lg shadow-black/20">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-300">
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.24em] text-red-400">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/95 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">What Indian customers say</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.company} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
                <p className="text-lg leading-8 text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-6 font-semibold text-white">{testimonial.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="border-t border-white/10 bg-slate-900/90 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Get Best Quote</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Share your requirements and we’ll respond fast</h2>
            <p className="mt-4 text-slate-400">
              Submit your details and our India team will get back to you with a tailored quote and next steps.
            </p>
          </div>

          <div className="mt-12 rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-black/30">
            {isSuccessful ? (
              <div className="rounded-3xl border border-red-500/20 bg-slate-900 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-300">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-white">🎉 Thank you!</h3>
                <p className="mt-4 text-slate-300 leading-7">
                  Our India team will contact you within 4 business hours.
                </p>
                <Button
                  asChild
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/20 hover:bg-green-700"
                >
                  <a href="https://wa.me/919604902393" target="_blank" rel="noreferrer">
                    Message us on WhatsApp
                  </a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submissionError && (
                  <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                    {submissionError}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Full Name</span>
                    <Input placeholder="Amit Sharma" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
                    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Email Address</span>
                    <Input type="email" placeholder="amit@example.com" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>WhatsApp Number</span>
                    <Input placeholder="96049 02393" {...register("whatsapp")} aria-invalid={errors.whatsapp ? "true" : "false"} />
                    {errors.whatsapp && <p className="text-xs text-red-400">{errors.whatsapp.message}</p>}
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Business Name</span>
                    <Input placeholder="Darshan Uniforms" {...register("business")} />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>City / State</span>
                    <Input placeholder="Pune, Maharashtra" {...register("cityState")} />
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Service Needed</span>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" {...register("service")}> 
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-xs text-red-400">{errors.service.message}</p>}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-200">
                  <span>Project Description</span>
                  <Textarea rows={5} placeholder="Tell us about your project and goals" {...register("projectDescription")} aria-invalid={errors.projectDescription ? "true" : "false"} />
                  {errors.projectDescription && <p className="text-xs text-red-400">{errors.projectDescription.message}</p>}
                </label>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Estimated Budget Range</span>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" {...register("budget")}> 
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.budget && <p className="text-xs text-red-400">{errors.budget.message}</p>}
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Timeline</span>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" {...register("timeline")}> 
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.timeline && <p className="text-xs text-red-400">{errors.timeline.message}</p>}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-200">
                  <span>GST Number</span>
                  <Input placeholder="27AABCU9603R1ZM" {...register("gst")} />
                </label>

                <div className="mt-2">
                  <Button type="submit" className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-700" disabled={submissionState === "submitting"}>
                    {submissionState === "submitting" ? (
                      <>
                        <svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
