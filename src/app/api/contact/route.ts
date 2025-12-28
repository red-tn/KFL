import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, interest, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Send an email notification (using Resend, SendGrid, etc.)
    // 2. Store the inquiry in your database
    // 3. Send a confirmation email to the user

    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      interest,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Implement email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@kingsfamilylakes.com',
    //   to: 'papakingj@gmail.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
