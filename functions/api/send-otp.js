/**
 * Cloudflare Pages Serverless Function: POST /api/send-otp
 */
export async function onRequestPost({ request }) {
  try {
    const { phone, otp } = await request.json();
    if (!phone || !otp) {
      return new Response(JSON.stringify({ error: 'Missing phone or otp' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const FAST2SMS_KEY = '18xHJqeBWdF26p9MvnjuVbhytkrCfDOZPN7oQEgTaiwXIY3lLAxGPj69fKyqEJuRAsvBaL8p42UzDNwC';
    const msg = encodeURIComponent(`Your UrbanStay verification OTP code is ${otp}`);
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_KEY}&route=q&message=${msg}&language=english&flash=0&numbers=${phone}`;

    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
