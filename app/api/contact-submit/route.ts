import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const { name, email, phone, subject, message, form_type } = formData

    // Save to Supabase database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)

      await supabase.from("form_submissions").insert([
        {
          name: name,
          email: email,
          phone: phone || null,
          subject: subject,
          message: message,
          form_type: form_type || "contact",
          created_at: new Date().toISOString(),
          processed: false,
        },
      ])
    }

    // Send email using Resend API
    const { data, error } = await resend.emails.send({
      from: "CYBEXONICS Contact <onboarding@resend.dev>",
      to: ["cybexonicsitconsultants@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #e5e7eb;" />
          
          <h3 style="color: #374151;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          
          <h3 style="color: #374151;">Message</h3>
          <p>${message}</p>
          
          <hr style="border: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 12px;">This message was submitted via the CYBEXONICS website contact form.</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ message: "Failed to send email notification." }, { status: 500 })
    }

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ message: "Failed to submit message." }, { status: 500 })
  }
}
