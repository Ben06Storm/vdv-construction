import nodemailer from 'nodemailer';

export type ContactEmailData = {
  name: string;
  email: string;
  phone: string;
  project?: string;
  service?: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const sendContactEmail = async (
  data: ContactEmailData,
): Promise<void> => {
  const recipientEmail =
    process.env.RECIPIENT_EMAIL || 'llcvdvconstruction@gmail.com';
  const project = data.project || data.service || 'General inquiry';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Georgia, 'Times New Roman', serif; background: #0c0b0a; margin: 0; padding: 24px; color: #f3efe6; }
        .container { max-width: 640px; margin: 0 auto; background: #161412; border: 1px solid #2c2822; border-radius: 16px; overflow: hidden; }
        .header { padding: 28px 32px; background: #141210; border-bottom: 1px solid #2c2822; }
        .header p { margin: 0; letter-spacing: 0.22em; text-transform: uppercase; color: #c4a574; font-size: 12px; font-family: 'Segoe UI', sans-serif; }
        .header h1 { margin: 8px 0 0; font-size: 28px; font-weight: 600; }
        .content { padding: 28px 32px; font-family: 'Segoe UI', sans-serif; }
        .field { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #2c2822; }
        .label { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #a39b8f; margin-bottom: 6px; }
        .value { font-size: 16px; color: #f3efe6; }
        .message { background: #1b1814; border-left: 3px solid #c4a574; padding: 16px; border-radius: 8px; line-height: 1.6; }
        .footer { padding: 18px 32px; font-size: 12px; color: #6f685e; font-family: 'Segoe UI', sans-serif; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p>VDV Construction</p>
          <h1>New website inquiry</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Full name</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#c4a574;text-decoration:none;">${escapeHtml(data.email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${escapeHtml(data.phone)}</div>
          </div>
          <div class="field">
            <div class="label">Project / service</div>
            <div class="value">${escapeHtml(project)}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message">${escapeHtml(data.message).replace(/\n/g, '<br/>')}</div>
          </div>
        </div>
        <div class="footer">
          Sent from the VDV Construction website to ${escapeHtml(recipientEmail)}.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"VDV Construction Website" <${process.env.SMTP_USER || recipientEmail}>`,
    to: recipientEmail,
    replyTo: data.email,
    subject: `[Quote request] ${data.name} — ${project}`,
    html: htmlContent,
    text: [
      `New website inquiry`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Project: ${project}`,
      '',
      data.message,
    ].join('\n'),
  });
};