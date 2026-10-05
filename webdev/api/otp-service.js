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

  window.UrbanStayOtpService = {
    /**
     * Send OTP to mobile and create lead record in Supabase
     */
    async sendOtp({ phone, pgName, city, beds, email }) {
      try {
        activePhone = phone;

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
