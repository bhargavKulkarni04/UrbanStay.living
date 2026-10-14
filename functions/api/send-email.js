/**
 * Cloudflare Pages Serverless Function: POST /api/send-email
 * Sends transactional email via official Google Gmail API v1 using OAuth2 Refresh Token.
 */

async function getAccessToken(clientId, clientSecret, refreshToken) {
  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to refresh Google access token');
  }

  return data.access_token;
}

/**
 * Encodes a string to RFC 4648 Base64URL
 */
function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Encodes an email header (e.g. Subject) according to RFC 2047
 */
function encodeRfc2047(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `=?utf-8?B?${btoa(binary)}?=`;
}

/**
 * Admin emails that receive instant failure alerts
 */
const ALERT_RECIPIENTS = ['info@urbanstay.living', 'bhargavkulkarni04@gmail.com'];

/**
 * Sends an automated failure alert email to UrbanStay administrators
 */
async function sendErrorAlert({ errorMsg, to, phone, pgName, city, env, accessToken, clientId, clientSecret, refreshToken }) {
  try {
    let token = accessToken;
    if (!token && clientId && clientSecret && refreshToken) {
      try {
        token = await getAccessToken(clientId, clientSecret, refreshToken);
      } catch (tokenErr) {
        console.error('Could not obtain token for alert email:', tokenErr);
      }
    }

    if (!token) {
      console.error('No Google access token available to dispatch alert email.');
      return;
    }

    const senderEmail = (env?.SENDER_EMAIL || env?.GOOGLE_EMAIL || 'info@urbanstay.living').trim();
    const alertSubject = `[URGENT] UrbanStay Email Failure: ${phone || to || 'Lead'}`;
    const alertHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F4F6F9; padding: 24px; margin: 0;">
  <div style="max-width: 520px; margin: 0 auto; background: #FFFFFF; border-radius: 14px; border: 1px solid #E5E7EB; padding: 24px 28px; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
    <div style="display: inline-block; background-color: #FEE2E2; color: #991B1B; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px;">
      System Alert
    </div>
    <h3 style="color: #DC2626; margin: 0 0 10px; font-size: 19px; font-weight: 800; letter-spacing: -0.01em;">
      ⚠️ Email Dispatch Failure
    </h3>
    <p style="font-size: 14px; color: #4B5563; line-height: 1.5; margin: 0 0 16px;">
      An error occurred while dispatching a transactional email on <strong>urbanstay.living</strong>.
    </p>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0; background-color: #F9FAFB; border-radius: 10px; border: 1px solid #E5E7EB;">
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">Error Message:</td><td style="padding: 9px 14px; color: #DC2626; font-weight: 700; text-align: right;">${errorMsg || 'Unknown error'}</td></tr>
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">Target Lead Email:</td><td style="padding: 9px 14px; color: #111; font-weight: 600; text-align: right;">${to || 'N/A'}</td></tr>
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">Lead Phone:</td><td style="padding: 9px 14px; color: #111; font-weight: 600; text-align: right;">+91 ${phone || 'N/A'}</td></tr>
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">PG Name:</td><td style="padding: 9px 14px; color: #111; font-weight: 600; text-align: right;">${pgName || 'N/A'}</td></tr>
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">City:</td><td style="padding: 9px 14px; color: #111; font-weight: 600; text-align: right;">${city || 'N/A'}</td></tr>
      <tr><td style="padding: 9px 14px; color: #6B7280; font-weight: 600;">Timestamp:</td><td style="padding: 9px 14px; color: #6B7280; text-align: right;">${new Date().toISOString()}</td></tr>
    </table>
    <p style="font-size: 11px; color: #9CA3AF; margin: 0; text-align: center;">
      UrbanStay Technologies Pvt. Ltd. &bull; Automated Health Monitor
    </p>
  </div>
</body>
</html>
    `;

    for (const adminEmail of ALERT_RECIPIENTS) {
      const emailLines = [
        `From: "UrbanStay Monitor" <${senderEmail}>`,
        `To: ${adminEmail}`,
        `Subject: ${encodeRfc2047(alertSubject)}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        alertHtml
      ];
      const rawEmail = emailLines.join('\r\n');
      await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: toBase64Url(rawEmail) })
      }).catch(err => console.error(`Failed to send alert to ${adminEmail}:`, err));
    }
  } catch (err) {
    console.error('sendErrorAlert execution failed:', err);
  }
}

export async function onRequestPost(context) {
  let to, pgName, phone, city, beds, clientId, clientSecret, refreshToken, accessToken;
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => ({}));
    to = body.to;
    pgName = body.pgName;
    phone = body.phone;
    city = body.city;
    beds = body.beds;

    if (!to) {
      return new Response(JSON.stringify({ error: 'Recipient email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const clean = (s) => (s ? String(s).trim().replace(/^["']|["']$/g, '') : '');

    clientId = clean(env?.GOOGLE_CLIENT_ID || env?.GMAIL_CLIENT_ID || env?.CLIENT_ID);
    clientSecret = clean(env?.GOOGLE_CLIENT_SECRET || env?.GMAIL_CLIENT_SECRET || env?.CLIENT_SECRET);
    refreshToken = clean(env?.GOOGLE_REFRESH_TOKEN || env?.GMAIL_REFRESH_TOKEN || env?.REFRESH_TOKEN);

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing Gmail credentials in Cloudflare environment variables (checked GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN).');
    }

    accessToken = await getAccessToken(clientId, clientSecret, refreshToken);

    const subject = 'Welcome to Urban Stay — Your Account Has Been Created';
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Urban Stay</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F6F9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E5E7EB; box-shadow: 0 10px 30px rgba(0,0,0,0.06); overflow: hidden;">
          
          <!-- Header Bar with Stacked UrbanStay Logo -->
          <tr>
            <td style="padding: 28px 36px 20px; border-bottom: 1px solid #F3F4F6; text-align: left;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family: 'Ubuntu', sans-serif, -apple-system; line-height: 0.95;">
                      <div style="color: #08A63F; font-size: 22px; font-weight: 500; letter-spacing: -0.015em;">Urban</div>
                      <div style="color: #111111; font-size: 22px; font-weight: 500; letter-spacing: -0.015em;">Stay</div>
                    </div>
                  </td>
                  <td style="padding-left: 14px; vertical-align: middle;">
                    <span style="display: inline-block; background-color: #EBF8EE; color: #068237; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase;">
                      Verified Partner
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Green Confirmation Badge -->
          <tr>
            <td style="padding: 36px 36px 12px; text-align: center;">
              <div style="display: inline-block; width: 68px; height: 68px; background-color: #08A63F; border-radius: 50%; text-align: center; line-height: 68px; box-shadow: 0 8px 24px rgba(8, 166, 63, 0.28);">
                <span style="color: #FFFFFF; font-size: 32px; font-weight: 900; line-height: 68px;">&#10003;</span>
              </div>
            </td>
          </tr>

          <!-- Confirmation Headlines -->
          <tr>
            <td style="padding: 0 36px; text-align: center;">
              <h1 style="margin: 12px 0 6px; font-size: 26px; font-weight: 800; color: #111111; letter-spacing: -0.02em;">
                Welcome to Urban Stay
              </h1>
              <p style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #08A63F;">
                Your account has been successfully created.
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4B5563;">
                Thank you for registering with Urban Stay. We’ve received your details, and our representative will get in touch with you shortly to help you get started.
              </p>
            </td>
          </tr>

          <!-- Lead Details Box -->
          <tr>
            <td style="padding: 24px 36px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 14px; padding: 18px 20px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6B7280; font-weight: 600;">Property Name</td>
                  <td style="padding: 6px 0; font-size: 13.5px; color: #111111; font-weight: 700; text-align: right;">${pgName || 'UrbanStay Partner'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6B7280; font-weight: 600;">Location</td>
                  <td style="padding: 6px 0; font-size: 13.5px; color: #111111; font-weight: 700; text-align: right;">${city || 'Bengaluru'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6B7280; font-weight: 600;">Total Bed Capacity</td>
                  <td style="padding: 6px 0; font-size: 13.5px; color: #111111; font-weight: 700; text-align: right;">${beds || '35'} Beds</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6B7280; font-weight: 600;">Registered Phone</td>
                  <td style="padding: 6px 0; font-size: 13.5px; color: #111111; font-weight: 700; text-align: right;">+91 ${phone || ''}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 36px 32px; text-align: center;">
              <a href="https://urbanstay.living" target="_blank" style="display: inline-block; background-color: #111111; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);">
                Go to Urban Stay &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 20px 36px; border-top: 1px solid #F3F4F6; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #6B7280;">
                UrbanStay Technologies Pvt. Ltd. &bull; Class 9 Trademark #7920292
              </p>
              <p style="margin: 0; font-size: 11px; color: #9CA3AF;">
                Bengaluru, Karnataka &bull; Support: support@urbanstay.living
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Construct MIME message with RFC 5322 From header
    const senderEmail = clean(env?.SENDER_EMAIL || env?.GOOGLE_EMAIL) || 'info@urbanstay.living';
    const emailLines = [
      `From: "UrbanStay" <${senderEmail}>`,
      `To: ${to}`,
      `Subject: ${encodeRfc2047(subject)}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      htmlBody
    ];

    const rawEmail = emailLines.join('\r\n');
    const base64UrlEmail = toBase64Url(rawEmail);

    // Dispatch via Gmail API
    const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw: base64UrlEmail })
    });

    const sendData = await sendRes.json();

    if (!sendRes.ok) {
      const errMsg = sendData.error?.message || (typeof sendData.error === 'string' ? sendData.error : JSON.stringify(sendData.error || 'Gmail API send error'));
      console.error('Gmail API send error:', errMsg);
      throw new Error(errMsg);
    }

    return new Response(JSON.stringify({ success: true, messageId: sendData.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err) {
    console.error('Send email error:', err);

    // Trigger instant error alert email to info@urbanstay.living and bhargavkulkarni04@gmail.com
    await sendErrorAlert({
      errorMsg: err.message,
      to,
      phone,
      pgName,
      city,
      env,
      accessToken,
      clientId,
      clientSecret,
      refreshToken
    });

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  if (context.request.method === 'OPTIONS') {
    return onRequestOptions();
  }
  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
