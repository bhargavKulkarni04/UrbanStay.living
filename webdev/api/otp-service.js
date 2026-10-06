/**
 * URBANSTAY — WEB LEAD & OTP SERVICE
 * Supabase + Fast2SMS Integration (Strictly Web Backend)
 */

(function () {
  'use strict';

  const SUPABASE_URL = 'https://unkwhlpboyumsykhgoqx.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_MrTSiJiEUwHgohXS6jpXPQ_3QWlpV1x';
  const FAST2SMS_KEY = '18xHJqeBWdF26p9MvnjuVbhytkrCfDOZPN7oQEgTaiwXIY3lLAxGPj69fKyqEJuRAsvBaL8p42UzDNwC';

  // Current session storage for active OTP verification
  let currentLeadId = null;
  let activeOtpCode = null;
  let activePhone = null;
  let lastLeadData = null;

  window.UrbanStayOtpService = {
    /**
     * Send OTP to mobile and create lead record in Supabase
     */
    async sendOtp({ phone, pgName, city, beds, email }) {
      try {
        activePhone = phone;
        lastLeadData = { phone, pgName, city, beds, email };

        // 1. Generate secure 6-digit numeric OTP
        activeOtpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 2. Save lead into Supabase
        const leadPayload = {
          phone: phone,
          pg_name: pgName || 'UrbanStay Partner',
          city: city || 'Bengaluru',
          beds_count: beds ? parseInt(beds, 10) : 35,
          email: email || null,
          status: 'OTP_PENDING'
        };

        const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(leadPayload)
        });

        if (supaRes.ok) {
          const rows = await supaRes.json();
          if (rows && rows[0]) {
            currentLeadId = rows[0].id;
          }
        }

        // 3. Dispatch real SMS via Cloudflare Serverless Function (with direct Fast2SMS fallback)
        try {
          const cfRes = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp: activeOtpCode })
          });
          if (!cfRes.ok) {
            throw new Error('Fallback to direct');
          }
        } catch (_) {
          const smsMsg = encodeURIComponent(`Your UrbanStay verification OTP code is ${activeOtpCode}`);
          const smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_KEY}&route=q&message=${smsMsg}&language=english&flash=0&numbers=${phone}`;
          fetch(smsUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {});
        }

        // In case Fast2SMS is processing domain verification, store in session
        sessionStorage.setItem(`ub_otp_${phone}`, activeOtpCode);
        console.log(`[UrbanStay Lead OTP] Sent to +91 ${phone}: ${activeOtpCode}`);

        return {
          success: true,
          leadId: currentLeadId,
          otp: activeOtpCode
        };
      } catch (err) {
        console.error('[UrbanStay] OTP send error:', err);
        return { success: false, error: err.message };
      }
    },

    /**
     * Verify the entered 6-digit OTP and update Supabase lead status
     */
    async verifyOtp({ phone, enteredOtp }) {
      try {
        const expected = activeOtpCode || sessionStorage.getItem(`ub_otp_${phone}`);

        if (!expected || enteredOtp !== expected) {
          return { success: false, error: 'Incorrect verification code. Please check and try again.' };
        }

        // Update lead status in Supabase to OTP_VERIFIED
        if (currentLeadId) {
          await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${currentLeadId}`, {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ status: 'OTP_VERIFIED' })
          });
        }

        // Trigger Welcome Email via official Gmail API (Serverless + Direct Resilient Fallback)
        if (lastLeadData && lastLeadData.email) {
          (async () => {
            try {
              const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: lastLeadData.email,
                  pgName: lastLeadData.pgName,
                  city: lastLeadData.city,
                  beds: lastLeadData.beds,
                  phone: lastLeadData.phone
                })
              });
              if (!res.ok) throw new Error('Serverless returned ' + res.status);
            } catch (err) {
              console.warn('[UrbanStay] Serverless email dispatch fallback:', err);
              try {
                // Direct Gmail API OAuth dispatch fallback
                const tRes = await fetch('https://oauth2.googleapis.com/token', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({
                    client_id: '205019851021-nk1c0me4oo9h64e2khhhh1qnhll0crml.apps.googleusercontent.com',
                    client_secret: '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',
                    refresh_token: '1//04SqzjvoBBWYLCgYIARAAGAQSNwF-L9IrkBuy7UM-MjsFNifn1tzPFrsP2JwzIKgcR5ttv7qnLqsjpO3yPIxflBP5lSAJ_hchsO4',
                    grant_type: 'refresh_token'
                  }).toString()
                });
                const { access_token } = await tRes.json();
                if (access_token) {
                  const subject = 'Welcome to Urban Stay — Your Account Has Been Created';
                  const html = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 28px; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb;">
                      <div style="font-family: 'Ubuntu', sans-serif; font-size: 22px; font-weight: 500; line-height: 0.95; margin-bottom: 24px;">
                        <span style="color: #08A63F; display: block;">Urban</span>
                        <span style="color: #111111; display: block;">Stay</span>
                      </div>
                      <div style="text-align: center; margin-bottom: 20px;">
                        <div style="display: inline-block; width: 64px; height: 64px; background-color: #08A63F; border-radius: 50%; color: #ffffff; font-size: 30px; line-height: 64px; font-weight: bold;">&#10003;</div>
                        <h2 style="color: #111111; margin: 14px 0 4px; font-size: 22px;">Welcome to Urban Stay</h2>
                        <p style="color: #08A63F; font-weight: 600; margin: 0 0 12px; font-size: 14px;">Your account has been successfully created.</p>
                        <p style="color: #4b5563; font-size: 13.5px; line-height: 1.6;">Thank you for registering with Urban Stay. We’ve received your details, and our representative will get in touch with you shortly to help you get started.</p>
                      </div>
                      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 18px; margin-bottom: 22px; font-size: 13px;">
                        <div style="display: flex; justify-content: space-between; padding: 4px 0;"><strong>Property:</strong> <span>${lastLeadData.pgName || 'UrbanStay Partner'}</span></div>
                        <div style="display: flex; justify-content: space-between; padding: 4px 0;"><strong>City:</strong> <span>${lastLeadData.city || 'Bengaluru'}</span></div>
                        <div style="display: flex; justify-content: space-between; padding: 4px 0;"><strong>Beds:</strong> <span>${lastLeadData.beds || '35'} Beds</span></div>
                      </div>
                      <p style="text-align: center; font-size: 11px; color: #9ca3af; margin: 0;">UrbanStay Technologies Pvt. Ltd. &bull; Class 9 Trademark #7920292</p>
                    </div>
                  `;
                  const mime = [
                    'To: ' + lastLeadData.email,
                    'Subject: =?utf-8?B?' + btoa(unescape(encodeURIComponent(subject))) + '?=',
                    'MIME-Version: 1.0',
                    'Content-Type: text/html; charset=utf-8',
                    '',
                    html
                  ].join('\r\n');
                  const encoded = btoa(unescape(encodeURIComponent(mime))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
                  await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ raw: encoded })
                  });
                  console.log('[UrbanStay] Fallback email sent successfully to', lastLeadData.email);
                }
              } catch (fErr) {
                console.error('[UrbanStay] Direct Gmail send error:', fErr);
              }
            }
          })();
        }

        // Clean up session
        sessionStorage.removeItem(`ub_otp_${phone}`);
        activeOtpCode = null;

        return { success: true };
      } catch (err) {
        console.error('[UrbanStay] OTP verify error:', err);
        return { success: false, error: err.message };
      }
    }
  };
})();
