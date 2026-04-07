import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const {
      fullName,
      businessEmail,
      companyName,
      phoneNumber,
      serviceNeeded,
      projectBudget,
      projectDescription,
    } = formData

    // Validate required fields
    if (!fullName || !businessEmail || !companyName || !serviceNeeded || !projectBudget || !projectDescription) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Send email to company
    await resend.emails.send({
      from: "CYBEXONICS UK <onboarding@resend.dev>",
      to: ["cybexonicsitconsultants@gmail.com"],
      replyTo: businessEmail,
      subject: `New UK Quote Request - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🇬🇧 New UK Quote Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Request Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; font-weight: bold; color: #666; width: 40%;">Full Name:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Company Name:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">${companyName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Business Email:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">
                  <a href="mailto:${businessEmail}" style="color: #dc2626; text-decoration: none;">${businessEmail}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Phone Number:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">
                  <a href="tel:${phoneNumber}" style="color: #dc2626; text-decoration: none;">${phoneNumber}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Service Needed:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">${serviceNeeded}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #666;">Project Budget:</td>
                <td style="padding: 12px 0; color: #1a1a1a;">${projectBudget}</td>
              </tr>
            </table>

            <h3 style="color: #1a1a1a; margin-top: 24px; margin-bottom: 12px;">Project Description:</h3>
            <div style="background: white; padding: 16px; border-radius: 4px; border-left: 4px solid #dc2626; line-height: 1.6; color: #1a1a1a; white-space: pre-wrap; word-wrap: break-word;">
              ${projectDescription}
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; background: #fff3cd; padding: 16px; border-radius: 4px; margin-bottom: 0;">
              <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>⏱️ Response Commitment:</strong> Respond to this inquiry within 4 hours during UK business hours (9am–6pm GMT).
              </p>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">This quote request was submitted via the CYBEXONICS UK Services page.</p>
            <p style="margin: 8px 0 0 0;">CYBEXONICS IT Consultants | UK Timezone Support | GDPR Compliant</p>
          </div>
        </div>
      `,
    })

    // Optional: Send confirmation email to the user
    await resend.emails.send({
      from: "CYBEXONICS UK <onboarding@resend.dev>",
      to: [businessEmail],
      subject: "We've Received Your Quote Request - CYBEXONICS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✓ Quote Request Received</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #1a1a1a; line-height: 1.6;">
              Hi ${fullName},
            </p>
            
            <p style="font-size: 16px; color: #1a1a1a; line-height: 1.6;">
              Thank you for getting in touch with CYBEXONICS! We've received your quote request and our team is already reviewing your project details.
            </p>

            <div style="background: white; padding: 20px; border-radius: 4px; border-left: 4px solid #dc2626; margin: 24px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">What happens next?</h3>
              <ul style="color: #1a1a1a; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>We'll review your project requirements</li>
                <li>Our team will prepare a custom quote for you</li>
                <li>You'll receive a detailed response within <strong>4 hours during UK business hours (9am–6pm GMT)</strong></li>
              </ul>
            </div>

            <p style="font-size: 16px; color: #1a1a1a; line-height: 1.6;">
              If you have any urgent questions in the meantime, feel free to contact us directly at:
            </p>

            <p style="text-align: center; margin: 24px 0;">
              <a href="mailto:cybexonicsitconsultants@gmail.com" style="color: #dc2626; text-decoration: none; font-weight: bold; font-size: 16px;">cybexonicsitconsultants@gmail.com</a>
            </p>

            <p style="font-size: 16px; color: #1a1a1a; line-height: 1.6;">
              We look forward to working with you!
            </p>

            <p style="margin-top: 30px; color: #666;">
              Best regards,<br/>
              <strong>The CYBEXONICS Team</strong><br/>
              🇬🇧 UK Timezone Support • GDPR Compliant
            </p>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">CYBEXONICS IT Consultants</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: "Quote request submitted successfully!" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error sending quote email:", error)

    return NextResponse.json(
      { message: "Failed to submit quote request." },
      { status: 500 }
    )
  }
}
