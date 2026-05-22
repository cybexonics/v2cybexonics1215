"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Check, Loader2, X } from "lucide-react"

const planOptions = ["Basic", "Professional", "Enterprise"] as const
const budgetOptions = [
  "Under £500",
  "£500–£1000",
  "£1000–£2000",
  "£2000+",
] as const
const sourceOptions = ["Google", "Social Media", "Referral", "Other"] as const
const countryCodes = [
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+1", label: "United States (+1)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+91", label: "India (+91)" },
]

type PlanName = (typeof planOptions)[number]
type BudgetValue = (typeof budgetOptions)[number]
type SourceValue = (typeof sourceOptions)[number]

type PricingFormValues = {
  name: string
  email: string
  countryCode: string
  phone: string
  business: string
  selectedPlan: PlanName
  projectBrief: string
  budget: BudgetValue
  source: SourceValue
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  countryCode: z.string().trim().min(1, "Country code is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  business: z.string().optional(),
  selectedPlan: z.enum(planOptions, {
    errorMap: () => ({ message: "Select a plan" }),
  }),
  projectBrief: z
    .string()
    .trim()
    .min(20, "Tell us about your project in at least 20 characters"),
  budget: z.enum(budgetOptions, {
    errorMap: () => ({ message: "Select a budget range" }),
  }),
  source: z.enum(sourceOptions, {
    errorMap: () => ({ message: "Select how you heard about us" }),
  }),
})

interface PricingModalProps {
  isOpen: boolean
  plan: PlanName
  onClose: () => void
}

export default function PricingModal({ isOpen, plan, onClose }: PricingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PricingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+44",
      phone: "",
      business: "",
      selectedPlan: plan,
      projectBrief: "",
      budget: budgetOptions[0],
      source: sourceOptions[0],
    },
  })

  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle")
  const [submissionError, setSubmissionError] = useState("")

  useEffect(() => {
    if (!isOpen) {
      return
    }

    reset({
      name: "",
      email: "",
      countryCode: "+44",
      phone: "",
      business: "",
      selectedPlan: plan,
      projectBrief: "",
      budget: budgetOptions[0],
      source: sourceOptions[0],
    })
    setSubmissionError("")
    setSubmitState("idle")
    setValue("selectedPlan", plan)
  }, [isOpen, plan, reset, setValue])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  const onSubmit = async (data: PricingFormValues) => {
    setSubmissionError("")
    setSubmitState("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: `${data.countryCode} ${data.phone}`,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit the form. Please try again.")
      }

      setSubmitState("success")
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit the form. Please try again."
      setSubmissionError(message)
      setSubmitState("idle")
    }
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm px-4 py-6 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-[0_30px_110px_-40px_rgba(15,23,42,0.9)]"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 36, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-red-400">CybeXonics</p>
                <h2 id="pricing-modal-title" className="mt-2 text-2xl font-semibold text-white">
                  Get started with the {plan} plan
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-8">
              {submitState === "success" ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Thanks for reaching out!</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    Your request for the <span className="font-semibold text-white">{plan}</span> plan has been received.
                    We'll contact you within 24 hours with the next steps.
                  </p>
                  <Button
                    className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submissionError ? (
                    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                      {submissionError}
                    </div>
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Full Name</span>
                      <Input
                        placeholder="Jane Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                        {...register("name")}
                      />
                      {errors.name ? (
                        <p className="text-xs text-red-400">{errors.name.message}</p>
                      ) : null}
                    </label>

                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Email Address</span>
                      <Input
                        type="email"
                        placeholder="jane@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register("email")}
                      />
                      {errors.email ? (
                        <p className="text-xs text-red-400">{errors.email.message}</p>
                      ) : null}
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Country Code</span>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...register("countryCode")}
                      >
                        {countryCodes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.countryCode ? (
                        <p className="text-xs text-red-400">{errors.countryCode.message}</p>
                      ) : null}
                    </label>

                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Phone Number</span>
                      <Input
                        type="tel"
                        placeholder="7123 456 789"
                        aria-invalid={errors.phone ? "true" : "false"}
                        {...register("phone")}
                      />
                      {errors.phone ? (
                        <p className="text-xs text-red-400">{errors.phone.message}</p>
                      ) : null}
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Company / Business Name</span>
                    <Input placeholder="Acme Co." {...register("business")} />
                  </label>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Selected Plan</span>
                    <input type="hidden" value={plan} {...register("selectedPlan")} />
                    <select
                      disabled
                      className="flex h-10 w-full cursor-not-allowed rounded-md border border-input bg-slate-900 px-3 py-2 text-sm text-slate-400"
                      value={plan}
                      aria-readonly="true"
                    >
                      {planOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    {errors.selectedPlan ? (
                      <p className="text-xs text-red-400">{errors.selectedPlan.message}</p>
                    ) : null}
                  </label>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Project Brief</span>
                    <Textarea
                      placeholder="Tell us about your project"
                      rows={5}
                      aria-invalid={errors.projectBrief ? "true" : "false"}
                      {...register("projectBrief")}
                    />
                    {errors.projectBrief ? (
                      <p className="text-xs text-red-400">{errors.projectBrief.message}</p>
                    ) : null}
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-200">
                      <span>Budget Range</span>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...register("budget")}
                      >
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.budget ? (
                        <p className="text-xs text-red-400">{errors.budget.message}</p>
                      ) : null}
                    </label>

                    <label className="space-y-2 text-sm text-slate-200">
                      <span>How did you hear about us?</span>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...register("source")}
                      >
                        {sourceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.source ? (
                        <p className="text-xs text-red-400">{errors.source.message}</p>
                      ) : null}
                    </label>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <p className="text-sm leading-6 text-slate-400">
                      We’ll send a confirmation email and a summary of your request.
                    </p>
                    <Button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-700"
                      disabled={submitState === "submitting"}
                    >
                      {submitState === "submitting" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
