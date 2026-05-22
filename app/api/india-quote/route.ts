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
      whatsapp,
      business,
      cityState,
      service,
      projectDescription,
      budget,
      timeline,
      gst,
    } = body

    const notificationHtml = `
      <html>
        <body style="margin:0;padding:0;background:#0f172a;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:32px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;background:#111827;border:1px solid rgba(255,255,255,0.06);border-radius:24px;overflow:hidden;">
                  <tr>
                    <td style="padding:28px 32px;background:#111827;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.1;">CybeXonics India Quote Request</h1>
                      <p style="margin:12px 0 0;color:#cbd5e1;font-size:15px;line-height:1.7;">A new inquiry was submitted for the India services page.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 32px;background:#0f172a;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                        ${[
                          ["Full Name", name],
                          ["Email Address", email],
                          ["WhatsApp", whatsapp],
                          ["Business Name", business || "N/A"],
                          ["City / State", cityState || "N/A"],
                          ["Service Needed", service],
                          ["Project Description", projectDescription],
                          ["Estimated Budget Range", budget],
                          ["Timeline", timeline],
                          ["GST Number", gst || "N/A"],
                        ]
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
                      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.7;">CybeXonics India • Fast, GST-ready quotes for Indian businesses.</p>
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
        <body style="margin:0;padding:0;background:#0f172a;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:32px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;background:#111827;border:1px solid rgba(255,255,255,0.06);border-radius:24px;overflow:hidden;">
                  <tr>
                    <td style="padding:28px 32px;background:#111827;">
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.1;">Thanks for reaching out 🇮🇳</h1>
                      <p style="margin:12px 0 0;color:#cbd5e1;font-size:15px;line-height:1.7;">We’ve received your request and our India team will contact you within 4 business hours.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 32px;background:#0f172a;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:12px 0;font-size:14px;font-weight:700;color:#f8fafc;width:180px;vertical-align:top;">Service</td>
                          <td style="padding:12px 0;font-size:14px;color:#e2e8f0;">${service}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;font-size:14px;font-weight:700;color:#f8fafc;">Budget Range</td>
                          <td style="padding:12px 0;font-size:14px;color:#e2e8f0;">${budget}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;font-size:14px;font-weight:700;color:#f8fafc;">Expected Callback</td>
                          <td style="padding:12px 0;font-size:14px;color:#e2e8f0;">Within 4 business hours</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;font-size:14px;font-weight:700;color:#f8fafc;">WhatsApp</td>
                          <td style="padding:12px 0;font-size:14px;color:#e2e8f0;">+91 9604902393</td>
                        </tr>
                      </table>
                      <div style="margin-top:24px;padding:20px;border-radius:18px;background:#111827;">
                        <p style="margin:0 0 12px;color:#cbd5e1;font-size:15px;line-height:1.7;">If you would like faster updates, connect with us on WhatsApp:</p>
                        <a href="https://wa.me/919604902393" style="display:inline-block;padding:12px 20px;border-radius:999px;background:#ef4444;color:#ffffff;font-weight:700;text-decoration:none;">Chat on WhatsApp</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 32px;background:#111827;text-align:center;">
                      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.7;">CybeXonics India • Custom IT solutions for Indian businesses.</p>
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
        from: "CybeXonics India <onboarding@resend.dev>",
        to: ["cybexonicsitconsultants@gmail.com"],
        replyTo: email,
        subject: `New India Quote Request: ${service}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: "CybeXonics India <onboarding@resend.dev>",
        to: [email],
        subject: "Cybexonics India — We've received your request 🇮🇳",
        html: confirmationHtml,
      }),
    ])

    return NextResponse.json({ message: "Request submitted successfully." }, { status: 200 })
  } catch (error: unknown) {
    console.error("Error sending India quote request:", error)
    return NextResponse.json(
      { error: "Unable to send your request at this time. Please try again later." },
      { status: 500 }
    )
  }
}
