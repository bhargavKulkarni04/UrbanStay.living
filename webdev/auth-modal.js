/**
 * URBANSTAY — MASTER FRONT-END AUTH MODAL CONTROLLER
 * 1-to-1 visual fidelity with Flutter role_selector_screen.dart & phone_verify_screen.dart.
 * Strictly adheres to AGENTS.md design tokens and standards.
 */

(function () {
  'use strict';

  // Inject Modal Markup into DOM
  function createModal() {
    if (document.getElementById('ubAuthModal')) return;

    const modalHtml = `
    <div class="ub-modal-backdrop" id="ubAuthModal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="ub-modal-card">
        <!-- Head Bar -->
        <div class="ub-modal-head">
          <div class="ub-modal-brand">
            <span class="logo-u">Urban</span><span class="logo-s">Stay</span>
          </div>
          <button type="button" class="ub-modal-close" id="ubModalClose" aria-label="Close modal">&times;</button>
        </div>

        <!-- Body -->
        <div class="ub-modal-body">
          <!-- STEP 1: FORM -->
          <div id="ubStepForm">
            <!-- 1. Organic Role Switcher Header (Exact to Flutter S-Curve header) -->
            <div class="ub-scurve-header" role="tablist">
              <button type="button" class="ub-role-tab active" id="ubRoleOwner" role="tab" aria-selected="true">
                <span class="ub-role-tab-sub">LOGIN AS</span>
                <span class="ub-role-tab-title">Owner</span>
              </button>
              <button type="button" class="ub-role-tab" id="ubRoleTenant" role="tab" aria-selected="false">
                <span class="ub-role-tab-sub">LOGIN AS</span>
                <span class="ub-role-tab-title">Tenant</span>
              </button>
            </div>

            <!-- 2. Dynamic Hero Greeting (Exact to Flutter _buildHeroGreeting) -->
            <div class="ub-hero-greeting">
              <h2 class="ub-hero-title" id="ubHeroTitle">Start your 3-minute setup</h2>
              <p class="ub-hero-sub" id="ubHeroSub">Manage rooms, collect rent & view property profit</p>
            </div>

            <!-- 3. Segmented Auth Mode Pill (Exact to Flutter _buildAuthModePill) -->
            <div class="ub-mode-pill" role="tablist">
              <button type="button" class="ub-mode-pill-btn active" id="ubModeRegister" role="tab">Register Property</button>
              <button type="button" class="ub-mode-pill-btn" id="ubModeSignIn" role="tab">Sign In</button>
            </div>

            <!-- 4. Dynamic Form Fields -->
            <form id="ubAuthForm" onsubmit="return false;">
              <!-- Owner Register Fields -->
              <div id="ubOwnerRegisterFields">
                <div class="ub-form-group">
                  <label class="ub-label" for="ubPgName">PG / Hostel Name</label>
                  <input type="text" class="ub-input" id="ubPgName" placeholder="e.g. Greenview Luxury PG" autocomplete="organization">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div class="ub-form-group">
                    <label class="ub-label" for="ubCity">City</label>
                    <input type="text" class="ub-input" id="ubCity" placeholder="e.g. Bengaluru" autocomplete="address-level2">
                  </div>
                  <div class="ub-form-group">
                    <label class="ub-label" for="ubBeds">Total Beds</label>
                    <input type="number" class="ub-input" id="ubBeds" placeholder="e.g. 45" min="1" max="5000">
                  </div>
                </div>

                <div class="ub-form-group">
                  <label class="ub-label" for="ubEmail">Email Address</label>
                  <input type="email" class="ub-input" id="ubEmail" placeholder="owner@urbanstay.living" autocomplete="email">
                </div>
              </div>

              <!-- Tenant Register Fields -->
              <div id="ubTenantRegisterFields" style="display:none;">
                <div class="ub-form-group">
                  <label class="ub-label" for="ubTenantName">Full Legal Name</label>
                  <input type="text" class="ub-input" id="ubTenantName" placeholder="e.g. Rahul Sharma" autocomplete="name">
                </div>
                <div class="ub-form-group">
                  <label class="ub-label" for="ubTenantPgCode">PG / Hostel Code (Optional)</label>
                  <input type="text" class="ub-input" id="ubTenantPgCode" placeholder="e.g. AR-101" style="text-transform:uppercase;">
                </div>
              </div>

              <!-- Mobile Number (Always Visible) -->
              <div class="ub-form-group">
                <label class="ub-label" for="ubPhone">Mobile Number</label>
                <div class="ub-phone-row">
                  <div class="ub-flag-pill">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input type="tel" class="ub-input" id="ubPhone" placeholder="Enter 10-digit number" maxlength="10" inputmode="numeric" pattern="[0-9]*" autocomplete="tel-national" required>
                </div>
              </div>

              <!-- Terms microcopy -->
              <div class="ub-terms-text">
                By continuing, you agree to our <a href="#" onclick="return false;">Terms</a> & <a href="#" onclick="return false;">Privacy Policy</a>.
              </div>

              <!-- Error Banner -->
              <div id="ubFormError" class="ub-error-banner" style="display:none;"></div>

              <!-- Primary Action CTA -->
              <button type="button" class="ub-btn-submit" id="ubBtnSendOtp">
                <span id="ubBtnSubmitText">Continue</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            <!-- Trust Footnote -->
            <div class="ub-trust-footnote">
              <span>🔒 0% UPI Fee</span>
              <span>•</span>
              <span>⚡ Instant Access</span>
              <span>•</span>
              <span>🛡️ Bank-Grade Security</span>
            </div>
          </div>

          <!-- STEP 2: 6-DIGIT OTP VERIFICATION -->
          <div id="ubStepOtp" style="display:none;">
            <div class="ub-otp-meta">
              <div class="ub-otp-meta-title">We sent a 6-digit verification code to</div>
              <div class="ub-otp-phone-row">
                <span class="ub-otp-phone-bold" id="ubOtpTargetPhone">+91 98765 43210</span>
                <button type="button" class="ub-otp-edit-btn" id="ubBtnEditPhone">Edit</button>
              </div>
            </div>

            <!-- 6 Auto-Advancing Digit Input Boxes -->
            <div class="ub-otp-grid">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="0" autofocus>
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="1">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="2">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="3">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="4">
              <input type="text" class="ub-otp-digit" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="5">
            </div>

            <!-- Resend Timer Row -->
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
              <p class="ub-success-desc" id="ubSuccessDesc">
                Phone number verified successfully.<br>Welcome to UrbanStay.
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

  // State Management
  let currentRole = 'owner'; // 'owner' | 'tenant'
  let currentMode = 'register'; // 'register' | 'signin'
  let countdownSeconds = 28;
  let countdownTimer = null;

  function initModalEvents() {
    const backdrop = document.getElementById('ubAuthModal');
    const closeBtn = document.getElementById('ubModalClose');

    const roleOwner = document.getElementById('ubRoleOwner');
    const roleTenant = document.getElementById('ubRoleTenant');
    const modeRegister = document.getElementById('ubModeRegister');
    const modeSignIn = document.getElementById('ubModeSignIn');

    const heroTitle = document.getElementById('ubHeroTitle');
    const heroSub = document.getElementById('ubHeroSub');

    const ownerFields = document.getElementById('ubOwnerRegisterFields');
    const tenantFields = document.getElementById('ubTenantRegisterFields');

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

    // Close logic
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

    // Update Headings and Fields based on Role & Mode
    function updateUIState() {
      // Role Tabs
      if (currentRole === 'owner') {
        roleOwner.classList.add('active');
        roleOwner.setAttribute('aria-selected', 'true');
        roleTenant.classList.remove('active');
        roleTenant.setAttribute('aria-selected', 'false');

        modeRegister.textContent = 'Register Property';
      } else {
        roleTenant.classList.add('active');
        roleTenant.setAttribute('aria-selected', 'true');
        roleOwner.classList.remove('active');
        roleOwner.setAttribute('aria-selected', 'false');

        modeRegister.textContent = 'Register Stay';
      }

      // Mode Tabs
      if (currentMode === 'register') {
        modeRegister.classList.add('active');
        modeSignIn.classList.remove('active');

        if (currentRole === 'owner') {
          heroTitle.textContent = 'Start your 3-minute setup';
          heroSub.textContent = 'Manage rooms, collect rent & view property profit';
          ownerFields.style.display = 'block';
          tenantFields.style.display = 'none';
        } else {
          heroTitle.textContent = 'Register your stay';
          heroSub.textContent = 'Access your room passes, rent invoices & services';
          ownerFields.style.display = 'none';
          tenantFields.style.display = 'block';
        }
      } else {
        modeSignIn.classList.add('active');
        modeRegister.classList.remove('active');

        if (currentRole === 'owner') {
          heroTitle.textContent = 'Welcome back, Owner';
          heroSub.textContent = 'Sign in to manage your property and collections';
        } else {
          heroTitle.textContent = 'Welcome back';
          heroSub.textContent = 'Sign in to manage your stay and room services';
        }

        ownerFields.style.display = 'none';
        tenantFields.style.display = 'none';
      }

      formError.style.display = 'none';
    }

    // Role switcher events
    roleOwner.addEventListener('click', () => {
      currentRole = 'owner';
      updateUIState();
    });

    roleTenant.addEventListener('click', () => {
      currentRole = 'tenant';
      updateUIState();
    });

    // Mode switcher events
    modeRegister.addEventListener('click', () => {
      currentMode = 'register';
      updateUIState();
    });

    modeSignIn.addEventListener('click', () => {
      currentMode = 'signin';
      updateUIState();
    });

    // Countdown Timer logic
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

    // Send OTP (Front-End Validation)
    btnSendOtp.addEventListener('click', () => {
      formError.style.display = 'none';
      const phone = (phoneInput.value || '').trim().replace(/\D/g, '');

      if (phone.length !== 10) {
        formError.textContent = 'Please enter a valid 10-digit mobile number.';
        formError.style.display = 'block';
        phoneInput.focus();
        return;
      }

      if (currentMode === 'register' && currentRole === 'owner') {
        const pgName = (document.getElementById('ubPgName').value || '').trim();
        if (!pgName) {
          formError.textContent = 'Please enter your PG / Hostel name.';
          formError.style.display = 'block';
          document.getElementById('ubPgName').focus();
          return;
        }
      }

      // Format phone for OTP step
      const formatted = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
      otpTargetPhone.textContent = formatted;

      // Switch to Step 2 (OTP)
      stepForm.style.display = 'none';
      stepOtp.style.display = 'block';
      startTimer();

      // Focus first digit box
      setTimeout(() => {
        otpDigits[0].focus();
      }, 50);
    });

    // Edit Phone number back button
    btnEditPhone.addEventListener('click', () => {
      if (countdownTimer) clearInterval(countdownTimer);
      stepOtp.style.display = 'none';
      stepForm.style.display = 'block';
      otpError.style.display = 'none';
      otpDigits.forEach((d) => (d.value = ''));
      phoneInput.focus();
    });

    // OTP Inputs handling: Auto-advance, backspace, clipboard paste
    otpDigits.forEach((digitInput, idx) => {
      digitInput.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val[val.length - 1] : '';

        if (e.target.value && idx < 5) {
          otpDigits[idx + 1].focus();
        }

        // Auto verify if 6 digits filled
        const fullOtp = otpDigits.map((d) => d.value).join('');
        if (fullOtp.length === 6) {
          verifyOtpCode(fullOtp);
        }
      });

      digitInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !digitInput.value && idx > 0) {
          otpDigits[idx - 1].focus();
        }
      });

      // Handle paste
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

    // Verify OTP logic
    function verifyOtpCode(otp) {
      otpError.style.display = 'none';
      if (otp.length < 6) {
        otpError.textContent = 'Please enter all 6 digits of the OTP.';
        otpError.style.display = 'block';
        return;
      }

      // Success State Presentation
      stepOtp.style.display = 'none';
      stepSuccess.style.display = 'block';

      const successDesc = document.getElementById('ubSuccessDesc');
      if (currentRole === 'owner') {
        successDesc.innerHTML = 'Phone number verified successfully.<br>Your property record is registered.';
      } else {
        successDesc.innerHTML = 'Phone number verified successfully.<br>Welcome to your resident dashboard.';
      }
    }

    btnVerifyOtp.addEventListener('click', () => {
      const fullOtp = otpDigits.map((d) => d.value).join('');
      verifyOtpCode(fullOtp);
    });

    btnDone.addEventListener('click', () => {
      closeModal();
    });

    // Initialize UI
    updateUIState();
  }

  // Global Trigger Hook for all pages
  window.openUrbanStayAuth = function (role = 'owner', mode = 'register') {
    createModal();
    const backdrop = document.getElementById('ubAuthModal');
    if (backdrop) {
      currentRole = role;
      currentMode = mode;
      const roleOwner = document.getElementById('ubRoleOwner');
      const roleTenant = document.getElementById('ubRoleTenant');
      if (role === 'owner' && roleOwner) roleOwner.click();
      if (role === 'tenant' && roleTenant) roleTenant.click();

      const stepForm = document.getElementById('ubStepForm');
      const stepOtp = document.getElementById('ubStepOtp');
      const stepSuccess = document.getElementById('ubStepSuccess');
      if (stepForm) stepForm.style.display = 'block';
      if (stepOtp) stepOtp.style.display = 'none';
      if (stepSuccess) stepSuccess.style.display = 'none';

      backdrop.classList.add('is-active');
      backdrop.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        const phone = document.getElementById('ubPhone');
        if (phone) phone.focus();
      }, 100);
    }
  };

  // Wire up all buttons automatically on page load
  document.addEventListener('DOMContentLoaded', () => {
    createModal();

    // Hook buttons by text or class
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach((el) => {
      const text = (el.textContent || '').trim().toLowerCase();
      const href = el.getAttribute('href') || '';

      // Match Login, Get Started, Book Demo, Start Free Trial, Setup
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
          // If it's not linking to another html page
          if (!href.endsWith('.html') && !href.startsWith('http')) {
            e.preventDefault();
            const role = window.location.pathname.includes('tenant') ? 'tenant' : 'owner';
            const mode = text.includes('login') || text.includes('sign in') ? 'signin' : 'register';
            window.openUrbanStayAuth(role, mode);
          }
        });
      }
    });
  });
})();
