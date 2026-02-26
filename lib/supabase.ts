import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Types for form submissions
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  form_type: "contact" | "quote"
  created_at?: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const response = await fetch("/api/contact-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit form")
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, error }
  }
}
