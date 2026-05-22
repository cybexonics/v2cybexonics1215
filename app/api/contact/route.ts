import { NextResponse } from "next/server"
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY in environment." },
      { status: 500 }
    )
  }

  const resend = new Resend(RESEND_API_KEY)

  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      business,
      selectedPlan,
      projectBrief,
      budget,
      source,
    } = body

    const tableRows = [
      ["Full Name", name],
      ["Email Address", email],
      ["Phone", phone],
      ["Company / Business", business || "N/A"],
      ["Selected Plan", selectedPlan],
      ["Budget Range", budget],
      ["Heard About Us", source],
      ["Project Brief", projectBrief],
    ]

    const notificationHtml = `
      <html>
        <body style="margin:0;padding:0;font-family:Inter,system-ui,sans-serif;background:#0f172a;color:#e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:32px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;border-radius:24px;overflow:hidden;background:#0f172a;border:1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding:28px 32px;background:#111827;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.1;">New CybeXonics Pricing Inquiry</h1>
                      <p style="margin:8px 0 0;color:#cbd5e1;font-size:15px;line-height:1.6;">A new pricing form was submitted for the ${selectedPlan} plan.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 32px;background:#0f172a;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                        ${tableRows
                          .map(
                            ([label, value]) => `
                              <tr>
                                <td style="padding:12px 0;font-size:14px;font-weight:700;color:#f8fafc;width:180px;vertical-align:top;">${label}</td>
                                <td style="padding:12px 0;font-size:14px;color:#e2e8f0;">${value}</td>
                              </tr>`
                          )
                          .join("")}
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 32px;background:#111827;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.7;">Sent with CybeXonics branding and a dark theme layout.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    const confirmationHtml = `
      <html>
        <body style="margin:0;padding:0;font-family:Inter,system-ui,sans-serif;background:#0f172a;color:#e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:32px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;border-radius:24px;overflow:hidden;background:#0f172a;border:1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding:28px 32px;background:#111827;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.1;">Thanks for reaching out</h1>
                      <p style="margin:8px 0 0;color:#cbd5e1;font-size:15px;line-height:1.6;">We’ve received your request and will contact you shortly.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 32px;background:#0f172a;">
                      <p style="margin:0 0 16px;color:#e2e8f0;font-size:15px;line-height:1.8;">Here’s a summary of your submission:</p>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px 0;font-size:14px;font-weight:700;color:#f8fafc;">Selected Plan</td>
                          <td style="padding:10px 0;font-size:14px;color:#e2e8f0;">${selectedPlan}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;font-size:14px;font-weight:700;color:#f8fafc;">Budget Range</td>
                          <td style="padding:10px 0;font-size:14px;color:#e2e8f0;">${budget}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;font-size:14px;font-weight:700;color:#f8fafc;">Project Brief</td>
                          <td style="padding:10px 0;font-size:14px;color:#e2e8f0;">${projectBrief}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 32px;background:#111827;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.7;">We’ll contact you within 24 hours with the next steps.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    await Promise.all([
      resend.emails.send({
        from: "CybeXonics <onboarding@resend.dev>",
        to: ["info@cybexonics.com"],
        replyTo: email,
        subject: `New pricing inquiry: ${selectedPlan}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: "CybeXonics <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out — Cybexonics will contact you shortly",
        html: confirmationHtml,
      }),
    ])

    return NextResponse.json({ message: "Inquiry submitted successfully." }, { status: 200 })
  } catch (error: unknown) {
    console.error("Error sending contact email:", error)
    return NextResponse.json(
      { error: "Unable to send your request right now. Please try again later." },
      { status: 500 }
    )
  }
}
