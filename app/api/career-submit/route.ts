import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY in environment." },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)

  try {
    const formData = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      linkedin,
      portfolio,
      github,
      resume,
      hearAbout,
      message,
    } = formData

    await resend.emails.send({
      from: "CYBEXONICS Careers <onboarding@resend.dev>", 
      // ⚠️ replace with your verified domain/email later
      to: ["cybexonicsitconsultants@gmail.com"],
      replyTo: email,
      subject: `New Career Application: ${firstName} ${lastName} - ${position}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Applying For:</strong> ${position}</p>

        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ""}
        ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ""}
        ${github ? `<p><strong>GitHub:</strong> <a href="${github}">${github}</a></p>` : ""}
        ${resume ? `<p><strong>Resume:</strong> ${resume}</p>` : ""}

        <p><strong>How they heard about us:</strong> ${hearAbout}</p>

        ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ""}

        <br/>
        <p>This application was submitted via the Cybexonics website.</p>
      `,
    })

    return NextResponse.json(
      { message: "Application submitted successfully!" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error sending career application email:", error)

    return NextResponse.json(
      { message: "Failed to submit application." },
      { status: 500 }
    )
  }
}
