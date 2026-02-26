import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const { firstName, lastName, email, phone, position, linkedin, portfolio, github, resume, hearAbout, message } =
      formData

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)

      await supabase.from("career_submissions").insert([
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          position: position,
          linkedin: linkedin || null,
          portfolio: portfolio || null,
          github: github || null,
          resume: resume || null,
          hearabout: hearAbout,
          message: message || null,
          form_type: "career",
          created_at: new Date().toISOString(),
          processed: false,
        },
      ])
    }

    const { data, error } = await resend.emails.send({
      from: "CYBEXONICS Careers <onboarding@resend.dev>",
      to: ["cybexonicsitconsultants@gmail.com"],
      subject: `New Career Application: ${firstName} ${lastName} - ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Career Application</h2>
          <hr style="border: 1px solid #e5e7eb;" />
          
          <h3 style="color: #374151;">Applicant Details</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Position:</strong> ${position}</p>
          
          <h3 style="color: #374151;">Profile Links</h3>
          ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : "<p><strong>LinkedIn:</strong> Not provided</p>"}
          ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : "<p><strong>Portfolio:</strong> Not provided</p>"}
          ${github ? `<p><strong>GitHub:</strong> <a href="${github}">${github}</a></p>` : "<p><strong>GitHub:</strong> Not provided</p>"}
          ${resume ? `<p><strong>Resume:</strong> ${resume}</p>` : "<p><strong>Resume:</strong> Not provided</p>"}
          
          <h3 style="color: #374151;">Additional Information</h3>
          <p><strong>How they heard about us:</strong> ${hearAbout}</p>
          ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : "<p><strong>Message:</strong> Not provided</p>"}
          
          <hr style="border: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 12px;">This application was submitted via the CYBEXONICS website.</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ message: "Failed to send email notification." }, { status: 500 })
    }

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing career application:", error)
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 })
  }
}
