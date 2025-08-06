import { createClient } from "@supabase/supabase-js"


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure environment variables are defined
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.")
}
if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

// Function to submit contact form
export async function submitContactForm(formData: ContactFormData) {
  try {
    const { data, error } = await supabase.from("form_submissions").insert([
      {
        ...formData,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) throw error

    // Trigger email notification via Supabase function (for contact forms)
    // This function needs to be deployed on Supabase
    await supabase.functions.invoke("send-email-notification", {
      body: {
        type: "contact",
        data: formData,
        to: "cybexonicsitconsultants@gmail.com",
      },
    })

    return { success: true, data }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, error }
  }
}
