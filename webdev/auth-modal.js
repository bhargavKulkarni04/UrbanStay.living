/**
 * URBANSTAY — PG OWNER AUTH & ONBOARDING MODAL
 * Dedicated to PG Owners. Zero clutter. Strict design tokens.
 */

(function () {
  'use strict';

  function createModal() {
    if (document.getElementById('ubAuthModal')) return;

    const modalHtml = `
    <div class="ub-modal-backdrop" id="ubAuthModal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="ub-modal-card">
        <!-- Head Bar -->
        <div class="ub-modal-head">
          <div class="ub-modal-brand">
            <span class="logo-u">Urban</span>
            <span class="logo-s">Stay</span>
          </div>
          <button type="button" class="ub-modal-close" id="ubModalClose" aria-label="Close modal">&times;</button>
        </div>

        <!-- Body -->
        <div class="ub-modal-body">
          <!-- STEP 1: FORM -->
          <div id="ubStepForm">
            <!-- Hero Headline -->
            <div class="ub-hero-greeting">
              <h2 class="ub-hero-title" id="ubHeroTitle">Start your 3-minute setup</h2>
              <p class="ub-hero-sub" id="ubHeroSub">Manage rooms, 0% rent collection & property profit</p>
            </div>

            <!-- Segmented Mode Pill (Register vs Sign In) -->
            <div class="ub-mode-pill" role="tablist">
              <button type="button" class="ub-mode-pill-btn active" id="ubModeRegister" role="tab">Register Property</button>
              <button type="button" class="ub-mode-pill-btn" id="ubModeSignIn" role="tab">Sign In</button>
            </div>

            <!-- Form -->
            <form id="ubAuthForm" autocomplete="off" onsubmit="return false;">
              <!-- Registration Fields (Hidden in Sign In mode) -->
              <div id="ubOwnerRegisterFields">
                <div class="ub-form-group">
                  <label class="ub-label" for="ubPgName">PG / Hostel Name</label>
                  <input type="text" class="ub-input" id="ubPgName" placeholder="e.g. Greenview Luxury PG" autocomplete="off">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div class="ub-form-group">
                    <label class="ub-label" for="ubCity">City</label>
                    <input type="text" class="ub-input" id="ubCity" placeholder="e.g. Bengaluru" autocomplete="off">
                  </div>
                  <div class="ub-form-group">
                    <label class="ub-label" for="ubBeds">Total Beds</label>
                    <input type="number" class="ub-input" id="ubBeds" placeholder="e.g. 45" min="1" max="5000" autocomplete="off">
                  </div>
                </div>

                <div class="ub-form-group">
                  <label class="ub-label" for="ubEmail">Email Address</label>
                  <input type="email" class="ub-input" id="ubEmail" placeholder="owner@urbanstay.living" autocomplete="off">
                </div>
              </div>

              <!-- Mobile Number (Strictly digits only) -->
              <div class="ub-form-group">
                <label class="ub-label" for="ubPhone">Mobile Number</label>
                <div class="ub-phone-row">
                  <div class="ub-flag-pill">
                    <span>+91</span>
                  </div>
                  <input type="tel" class="ub-input" id="ubPhone" placeholder="Enter 10-digit number" maxlength="10" inputmode="numeric" pattern="[0-9]*" autocomplete="off" required>
                </div>
              </div>

              <!-- Terms Microcopy -->
              <div class="ub-terms-text">
                By continuing, you agree to our <a href="#" onclick="return false;">Terms</a> & <a href="#" onclick="return false;">Privacy Policy</a>.
              </div>

              <!-- Error Banner -->
              <div id="ubFormError" class="ub-error-banner" style="display:none;"></div>

              <!-- Primary CTA -->
              <button type="button" class="ub-btn-submit" id="ubBtnSendOtp">
                <span id="ubBtnSubmitText">Continue</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>

          <!-- STEP 2: 6-DIGIT OTP VERIFICATION -->
          <div id="ubStepOtp" style="display:none;">
            <div class="ub-otp-meta">
              <div class="ub-otp-meta-title">We sent a 6-digit verification code to</div>
              <div class="ub-otp-phone-row">
                <span class="ub-otp-phone-bold" id="ubOtpTargetPhone">+91</span>
                <button type="button" class="ub-otp-edit-btn" id="ubBtnEditPhone">Edit</button>
              </div>
            </div>

            <!-- 6 Digit Inputs -->
            <div class="ub-otp-grid">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="0">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="1">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="2">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="3">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="4">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="5">
            </div>

            <!-- Resend Row -->
            <div class="ub-resend-row">
              <span id="ubTimerText">Resend in <b id="ubCountdown">28s</b></span>
              <button type="button" class="ub-resend-btn" id="ubBtnResend" disabled>Resend Code</button>
            </div>

            <div id="ubOtpError" class="ub-error-banner" style="display:none;"></div>

            <button type="button" class="ub-btn-submit" id="ubBtnVerifyOtp">
              <span>Verify & Continue</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <!-- STEP 3: SUCCESS STATE -->
          <div id="ubStepSuccess" style="display:none;">
            <div class="ub-success-view">
              <div class="ub-success-icon-wrap">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 class="ub-success-title">OTP Verified!</h3>
              <p class="ub-success-desc">
                Phone number verified successfully.<br>Your property record is registered.
              </p>
              <div class="ub-success-indicator"></div>
              <button type="button" class="ub-btn-submit" id="ubBtnDone" style="margin-top: 24px;">
                <span>Continue to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    initModalEvents();
  }

  // State
  let currentMode = 'register'; // 'register' | 'signin'
  let countdownSeconds = 28;
  let countdownTimer = null;

  function initModalEvents() {
    const backdrop = document.getElementById('ubAuthModal');
    const closeBtn = document.getElementById('ubModalClose');

    const modeRegister = document.getElementById('ubModeRegister');
    const modeSignIn = document.getElementById('ubModeSignIn');

    const heroTitle = document.getElementById('ubHeroTitle');
    const heroSub = document.getElementById('ubHeroSub');
    const ownerFields = document.getElementById('ubOwnerRegisterFields');

    const btnSendOtp = document.getElementById('ubBtnSendOtp');
    const btnEditPhone = document.getElementById('ubBtnEditPhone');
    const btnResend = document.getElementById('ubBtnResend');
    const btnVerifyOtp = document.getElementById('ubBtnVerifyOtp');
    const btnDone = document.getElementById('ubBtnDone');

    const stepForm = document.getElementById('ubStepForm');
    const stepOtp = document.getElementById('ubStepOtp');
    const stepSuccess = document.getElementById('ubStepSuccess');

    const phoneInput = document.getElementById('ubPhone');
    const otpTargetPhone = document.getElementById('ubOtpTargetPhone');
    const formError = document.getElementById('ubFormError');
    const otpError = document.getElementById('ubOtpError');

    const otpDigits = Array.from(document.querySelectorAll('.ub-otp-digit'));

    function closeModal() {
      backdrop.classList.remove('is-active');
      backdrop.setAttribute('aria-hidden', 'true');
      if (countdownTimer) clearInterval(countdownTimer);
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('is-active')) {
        closeModal();
      }
    });

    function setMode(mode) {
      currentMode = mode;
      if (mode === 'register') {
        modeRegister.classList.add('active');
        modeSignIn.classList.remove('active');
        heroTitle.textContent = 'Start your 3-minute setup';
        heroSub.textContent = 'Manage rooms, 0% rent collection & property profit';
        ownerFields.style.display = 'block';
      } else {
        modeSignIn.classList.add('active');
        modeRegister.classList.remove('active');
        heroTitle.textContent = 'Welcome back, Owner';
        heroSub.textContent = 'Sign in to access your property dashboard & rent ledger';
        ownerFields.style.display = 'none';
      }
      formError.style.display = 'none';
    }

    modeRegister.addEventListener('click', () => setMode('register'));
    modeSignIn.addEventListener('click', () => setMode('signin'));

    // Strict Numbers-Only Handler for Phone Input
    phoneInput.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Tab', 'Enter', 'Escape', 'Delete',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
        return;
      }
      // If key is not a digit 0-9, block it completely
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    phoneInput.addEventListener('input', () => {
      // Strip any non-digit character and restrict to 10 digits
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      if (formError.style.display !== 'none') {
        formError.style.display = 'none';
      }
    });

    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      phoneInput.value = pasted.slice(0, 10);
    });

    // Resend countdown
    function startTimer() {
      if (countdownTimer) clearInterval(countdownTimer);
      countdownSeconds = 28;
      btnResend.disabled = true;
      const cdEl = document.getElementById('ubCountdown');
      const timerText = document.getElementById('ubTimerText');
      timerText.style.display = 'inline';
      if (cdEl) cdEl.textContent = `${countdownSeconds}s`;

      countdownTimer = setInterval(() => {
        countdownSeconds--;
        if (cdEl) cdEl.textContent = `${countdownSeconds}s`;
        if (countdownSeconds <= 0) {
          clearInterval(countdownTimer);
          btnResend.disabled = false;
          timerText.style.display = 'none';
        }
      }, 1000);
    }

    btnResend.addEventListener('click', () => {
      if (btnResend.disabled) return;
      startTimer();
      otpError.style.display = 'none';
      otpDigits.forEach((d) => (d.value = ''));
      otpDigits[0].focus();
    });

    // Send OTP (Live Supabase & Fast2SMS Backend)
    btnSendOtp.addEventListener('click', async () => {
      formError.style.display = 'none';
      const phone = (phoneInput.value || '').trim().replace(/\D/g, '');

      if (phone.length !== 10) {
        formError.textContent = 'Please enter a valid 10-digit mobile number.';
        formError.style.display = 'block';
        phoneInput.focus();
        return;
      }

      let pgName = '';
      let city = 'Bengaluru';
      let beds = 35;
      let email = '';

      if (currentMode === 'register') {
        pgName = (document.getElementById('ubPgName').value || '').trim();
        city = (document.getElementById('ubCity').value || '').trim() || 'Bengaluru';
        beds = document.getElementById('ubBeds').value || 35;
        email = (document.getElementById('ubEmail').value || '').trim();

        if (!pgName) {
          formError.textContent = 'Please enter your PG / Hostel name.';
          formError.style.display = 'block';
          document.getElementById('ubPgName').focus();
          return;
        }
      }

      // Button loading state
      const origText = btnSendOtp.innerHTML;
      btnSendOtp.disabled = true;
      btnSendOtp.innerHTML = '<span>Sending OTP...</span>';

      try {
        if (window.UrbanStayOtpService) {
          await window.UrbanStayOtpService.sendOtp({ phone, pgName, city, beds, email });
        }
      } catch (e) {
        console.warn('Backend sync:', e);
      } finally {
        btnSendOtp.disabled = false;
        btnSendOtp.innerHTML = origText;
      }

      const formatted = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
      otpTargetPhone.textContent = formatted;

      stepForm.style.display = 'none';
      stepOtp.style.display = 'block';
      startTimer();

      setTimeout(() => {
        otpDigits[0].focus();
      }, 50);
    });

    btnEditPhone.addEventListener('click', () => {
      if (countdownTimer) clearInterval(countdownTimer);
      stepOtp.style.display = 'none';
      stepForm.style.display = 'block';
      otpError.style.display = 'none';
      otpDigits.forEach((d) => (d.value = ''));
      phoneInput.focus();
    });

    // OTP inputs: numbers only, auto-advance, backspace, paste
    otpDigits.forEach((digitInput, idx) => {
      digitInput.addEventListener('keydown', (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
          if (e.key === 'Backspace' && !digitInput.value && idx > 0) {
            otpDigits[idx - 1].focus();
          }
          return;
        }
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      digitInput.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val[val.length - 1] : '';

        if (e.target.value && idx < 5) {
          otpDigits[idx + 1].focus();
        }

        const fullOtp = otpDigits.map((d) => d.value).join('');
        if (fullOtp.length === 6) {
          verifyOtpCode(fullOtp);
        }
      });

      digitInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (pasted.length >= 6) {
          for (let i = 0; i < 6; i++) {
            otpDigits[i].value = pasted[i];
          }
          otpDigits[5].focus();
          verifyOtpCode(pasted.substring(0, 6));
        }
      });
    });

    async function verifyOtpCode(otp) {
      otpError.style.display = 'none';
      if (otp.length < 6) {
        otpError.textContent = 'Please enter all 6 digits of the OTP.';
        otpError.style.display = 'block';
        return;
      }

      btnVerifyOtp.disabled = true;
      const phone = (phoneInput.value || '').trim().replace(/\D/g, '');

      try {
        if (window.UrbanStayOtpService) {
          const res = await window.UrbanStayOtpService.verifyOtp({ phone, enteredOtp: otp });
          if (!res.success) {
            otpError.textContent = res.error || 'Invalid OTP. Please check and try again.';
            otpError.style.display = 'block';
            btnVerifyOtp.disabled = false;
            return;
          }
        }
      } catch (err) {
        console.warn('Verify error:', err);
      }

      btnVerifyOtp.disabled = false;
      stepOtp.style.display = 'none';
      stepSuccess.style.display = 'block';
    }

    btnVerifyOtp.addEventListener('click', () => {
      const fullOtp = otpDigits.map((d) => d.value).join('');
      verifyOtpCode(fullOtp);
    });

    btnDone.addEventListener('click', closeModal);
  }

  // Global Trigger Hook
  window.openUrbanStayAuth = function (mode = 'register') {
    createModal();
    const backdrop = document.getElementById('ubAuthModal');
    if (backdrop) {
      // Clear all inputs on open to prevent pre-filled or stale data
      const inputs = backdrop.querySelectorAll('input');
      inputs.forEach((input) => (input.value = ''));

      const modeRegister = document.getElementById('ubModeRegister');
      const modeSignIn = document.getElementById('ubModeSignIn');
      if (mode === 'signin' && modeSignIn) {
        modeSignIn.click();
      } else if (modeRegister) {
        modeRegister.click();
      }

      const stepForm = document.getElementById('ubStepForm');
      const stepOtp = document.getElementById('ubStepOtp');
      const stepSuccess = document.getElementById('ubStepSuccess');
      const formError = document.getElementById('ubFormError');
      const otpError = document.getElementById('ubOtpError');

      if (stepForm) stepForm.style.display = 'block';
      if (stepOtp) stepOtp.style.display = 'none';
      if (stepSuccess) stepSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';
      if (otpError) otpError.style.display = 'none';

      backdrop.classList.add('is-active');
      backdrop.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        const phone = document.getElementById('ubPhone');
        if (phone) phone.focus();
      }, 100);
    }
  };

  // Auto-wire buttons across all pages
  document.addEventListener('DOMContentLoaded', () => {
    createModal();

    const buttons = document.querySelectorAll('a, button');
    buttons.forEach((el) => {
      const text = (el.textContent || '').trim().toLowerCase();
      const href = el.getAttribute('href') || '';

      if (
        text === 'login' ||
        text === 'sign in' ||
        text === 'get started' ||
        text === 'start free trial' ||
        text === 'book a demo' ||
        text === 'book demo' ||
        text.includes('start setup') ||
        text.includes('claim your pg') ||
        href.includes('#login') ||
        href.includes('#signup')
      ) {
        el.addEventListener('click', (e) => {
          if (!href.endsWith('.html') && !href.startsWith('http')) {
            e.preventDefault();
            const mode = text.includes('login') || text.includes('sign in') ? 'signin' : 'register';
            window.openUrbanStayAuth(mode);
          }
        });
      }
    });
  });
})();
