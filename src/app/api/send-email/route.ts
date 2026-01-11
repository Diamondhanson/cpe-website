import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phoneNumber, projectType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get company email from environment or use default
    const companyEmail = process.env.COMPANY_EMAIL || 'fanartscompanylimited@gmail.com';

    const submittedAt = new Date();
    const submittedAtDisplay = submittedAt.toLocaleString();

    // Prepare email content
    const emailSubject = `New Contact Form Submission${projectType ? ` - ${projectType}` : ''}`;

    const emailHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New message from ${escapeHtml(name)}${projectType ? ` (${escapeHtml(projectType)})` : ''}.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f5f7fb;">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px;width:100%;border-collapse:separate;">
            <tr>
              <td style="padding:0;">
                <!-- Header -->
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-radius:16px 16px 0 0;overflow:hidden;background:#0b1b4a;">
                  <tr>
                    <td style="padding:22px 24px;background:linear-gradient(135deg,#0b1b4a 0%,#1e40af 60%,#2563eb 100%);">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#ffffff;">
                        <div style="letter-spacing:0.14em;font-size:11px;font-weight:700;text-transform:uppercase;opacity:0.9;">
                          Website Contact
                        </div>
                        <div style="margin-top:8px;font-size:24px;line-height:1.2;font-weight:700;">
                          New contact form submission
                        </div>
                        <div style="margin-top:10px;font-size:13px;opacity:0.9;">
                          Submitted: ${escapeHtml(submittedAtDisplay)}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Body -->
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">
                  <tr>
                    <td style="padding:24px;">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827;">
                        <!-- Summary pill -->
                        <div style="display:inline-block;padding:10px 12px;border-radius:999px;background:#eff6ff;border:1px solid #dbeafe;">
                          <span style="color:#1e40af;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">From</span>
                          <span style="margin-left:8px;color:#111827;font-size:13px;font-weight:600;">${escapeHtml(name)}</span>
                          <span style="margin:0 8px;color:#93a3b8;">•</span>
                          <a href="mailto:${escapeHtml(email)}" style="color:#1d4ed8;text-decoration:none;font-size:13px;font-weight:600;">${escapeHtml(email)}</a>
                        </div>

                        <div style="height:18px;line-height:18px;">&nbsp;</div>

                        <!-- Two-column info -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;">
                          <tr>
                            <td valign="top" style="padding:0 12px 0 0;width:50%;">
                              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;font-weight:800;">
                                Contact details
                              </div>
                              <div style="margin-top:10px;padding:14px 14px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb;">
                                ${renderRow('Name', escapeHtml(name))}
                                ${renderRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#1d4ed8;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>`)}
                                ${company ? renderRow('Company', escapeHtml(company)) : ''}
                                ${phoneNumber ? renderRow('Phone', `<a href="tel:${escapeHtml(phoneNumber)}" style="color:#1d4ed8;text-decoration:none;font-weight:600;">${escapeHtml(phoneNumber)}</a>`) : ''}
                              </div>
                            </td>
                            <td valign="top" style="padding:0 0 0 12px;width:50%;">
                              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;font-weight:800;">
                                Project
                              </div>
                              <div style="margin-top:10px;padding:14px 14px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb;">
                                ${projectType ? renderRow('Type', escapeHtml(projectType)) : renderRow('Type', '<span style="color:#94a3b8;">Not provided</span>')}
                                ${renderRow('Source', 'Website contact form')}
                                ${renderRow('Submitted', escapeHtml(submittedAtDisplay))}
                              </div>
                            </td>
                          </tr>
                        </table>

                        <div style="height:18px;line-height:18px;">&nbsp;</div>

                        <!-- Message -->
                        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;font-weight:800;">
                          Message
                        </div>
                        <div style="margin-top:10px;padding:16px 16px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">
                          <div style="white-space:pre-wrap;font-size:14px;line-height:1.7;color:#0f172a;">
${escapeHtml(message)}
                          </div>
                        </div>

                        <div style="height:18px;line-height:18px;">&nbsp;</div>

                        <!-- Footer -->
                        <div style="font-size:12px;line-height:1.6;color:#64748b;">
                          Reply directly to this email to respond to <strong style="color:#0f172a;">${escapeHtml(name)}</strong>.
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div style="height:14px;line-height:14px;">&nbsp;</div>

                <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:11px;color:#94a3b8;text-align:center;">
                  You received this because someone submitted your website contact form.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim();

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}${phoneNumber ? `Phone: ${phoneNumber}\n` : ''}${projectType ? `Project Type: ${projectType}\n` : ''}
Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [companyEmail],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function renderRow(label: string, valueHtml: string): string {
  return `
    <div style="padding:10px 0;border-top:1px solid #e5e7eb;">
      <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:800;">
        ${escapeHtml(label)}
      </div>
      <div style="margin-top:6px;font-size:13px;line-height:1.5;color:#0f172a;">
        ${valueHtml}
      </div>
    </div>
  `.trim();
}

