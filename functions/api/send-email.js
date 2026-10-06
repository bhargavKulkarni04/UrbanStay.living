/**
 * Cloudflare Pages Serverless Function: POST /api/send-email
 * Sends transactional email via official Google Gmail API v1 using OAuth2 Refresh Token.
 */

const GOOGLE_CLIENT_ID = '205019851021-nk1c0me4oo9h64e2khhhh1qnhll0crml.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REFRESH_TOKEN = '1//04SqzjvoBBWYLCgYIARAAGAQSNwF-L9IrkBuy7UM-MjsFNifn1tzPFrsP2JwzIKgcR5ttv7qnLqsjpO3yPIxflBP5lSAJ_hchsO4';

/**
 * Exchanges the permanent refresh token for a fresh short-lived access token
 */
async function getAccessToken() {
  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: GOOGLE_REFRESH_TOKEN,
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

export async function onRequestPost({ request }) {
  try {
    const { to, pgName, phone, city, beds } = await request.json();

    if (!to) {
      return new Response(JSON.stringify({ error: 'Recipient email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const accessToken = await getAccessToken();

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

    // Construct MIME message
    const emailLines = [
      `To: ${to}`,
      `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
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
      throw new Error(sendData.error ? sendData.error.message : 'Gmail API send error');
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
