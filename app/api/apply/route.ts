import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log the full application payload
    console.log("=== Adventure Therapy Application Submission ===")
    console.log(JSON.stringify(body, null, 2))
    console.log("=== End of Application Submission ===")

    // Get Resend configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY
    const notifyEmails = process.env.NOTIFY_EMAILS
    const fromEmail = process.env.FROM_EMAIL

    if (!resendApiKey || !notifyEmails || !fromEmail) {
      console.error("Missing required environment variables for email sending:")
      console.error("RESEND_API_KEY:", !resendApiKey ? "MISSING" : "SET")
      console.error("NOTIFY_EMAILS:", !notifyEmails ? "MISSING" : "SET")
      console.error("FROM_EMAIL:", !fromEmail ? "MISSING" : "SET")
      return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 })
    }

    const resend = new Resend(resendApiKey)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notifyEmails,
      subject: "New Adventure Therapy Application",
      text: JSON.stringify(body, null, 2),
    })

    if (error) {
      console.error("Resend error:", error)
    } else {
      console.log("Resend email ID:", data?.id)
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 })
  }
}

