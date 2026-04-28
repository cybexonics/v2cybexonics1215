import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const { name, email, phone, subject, message } = formData;

    await resend.emails.send({
      from: "CYBEXONICS Contact <onboarding@resend.dev>", 
      to: ["cybexonicsitconsultants@gmail.com"],
      replyTo: email,
      subject: `New Contact Form: ${subject || "Website Inquiry"}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>

        <p><strong>Message:</strong><br/>${message}</p>

        <br/>
        <p>This message was sent from the Cybexonics website contact form.</p>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending contact email:", error);

    return NextResponse.json({
  success: true,
  message: "Message sent successfully!",
});
  }
}