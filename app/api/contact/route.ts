import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables first
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    const notifyEmails =
      process.env.CONTACT_EMAILS?.split(",").map(email => email.trim()) || [];

    if (!notifyEmails.length) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Adventure Therapy <no-reply@adventuretherapy.co>",
      to: notifyEmails,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}

