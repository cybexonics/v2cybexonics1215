import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
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

    // Create a Nodemailer transporter using your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Construct the email content
    const mailOptions = {
      from: process.env.GMAIL_EMAIL_ADDRESS,
      to: "cybexonicsitconsultants@gmail.com", // Your target email
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
        ${message ? `<p><strong>Message:</strong><br/> ${message}</p>` : ""}
        <br/>
        <p>This application was submitted via the Cybexonics website.</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending career application email:", error)
    return NextResponse.json({ message: "Failed to submit application." }, { status: 500 })
  }
}
