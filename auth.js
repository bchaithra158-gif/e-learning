/**
 * LearnSphere E-Learning Platform - Authentication & Two-Step Verification (2FA / OTP)
 * Supports email/password validation, Firebase Auth configuration hook, and 2FA OTP flow.
 * Generic user-circle presentation without hardcoded names or pre-existing certificates.
 */

const AuthModule = (function () {
  const STORAGE_KEY_CURRENT_USER = "learnsphere_active_user";
  const STORAGE_KEY_REGISTERED_USERS = "learnsphere_registered_accounts";

  let pendingAuthData = null;
  let currentOtp = null;
  let otpCountdown = 60;
  let otpTimerId = null;

  function init() {
    // Check if any default demo student exists for test convenience
    const accounts = getStoredAccounts();
    if (accounts.length === 0) {
      accounts.push({
        id: "student-demo-01",
        name: "Student",
        email: "student@learnsphere.edu",
        password: "password123",
        role: "Student Member",
        joinedDate: "October 2026"
      });
      saveAccounts(accounts);
    }
  }

  function getStoredAccounts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(accounts) {
    localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(accounts));
  }

  function getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
    window.dispatchEvent(new CustomEvent("learnsphere:auth-change", { detail: { user } }));
  }

  function isAuthenticated() {
    return getCurrentUser() !== null;
  }

  function generate6DigitOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Validate Email Format
   */
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Step 1: Initiate Login credentials validation
   */
  function initiateLogin(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    if (!cleanEmail) {
      return { success: false, message: "Please enter your email address." };
    }
    if (!isValidEmail(cleanEmail)) {
      return { success: false, message: "Please enter a valid email format (e.g., student@domain.com)." };
    }
    if (!cleanPass) {
      return { success: false, message: "Please enter your password." };
    }

    const accounts = getStoredAccounts();
    const user = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: "No account found with this email. Please check or sign up." };
    }

    if (user.password !== cleanPass) {
      return { success: false, message: "Incorrect password. Please verify and try again." };
    }

    // Credentials verified -> Stage account for Two-Step OTP Verification
    pendingAuthData = {
      type: "login",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "Student Member",
        joinedDate: user.joinedDate || "Recent"
      }
    };

    currentOtp = generate6DigitOtp();
    startOtpCountdown();

    return {
      success: true,
      requires2FA: true,
      email: user.email,
      otp: currentOtp
    };
  }

  /**
   * Step 1b: Initiate Registration validation
   */
  function initiateRegister(name, email, password) {
    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: "Please enter your full legal name for your verified certificate." };
    }
    if (!isValidEmail(cleanEmail)) {
      return { success: false, message: "Please provide a valid email address (e.g. name@domain.com)." };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const accounts = getStoredAccounts();
    if (accounts.some(a => a.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "An account with this email already exists. Please log in." };
    }

    // Create user object without any pre-completed certificates!
    const newUser = {
      id: "student-" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      role: "Student Member",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    };

    pendingAuthData = {
      type: "register",
      user: newUser
    };

    currentOtp = generate6DigitOtp();
    startOtpCountdown();

    return {
      success: true,
      requires2FA: true,
      email: cleanEmail,
      otp: currentOtp
    };
  }

  function startOtpCountdown() {
    clearInterval(otpTimerId);
    otpCountdown = 60;
    otpTimerId = setInterval(() => {
      otpCountdown--;
      const timerDisplay = document.getElementById("otp-countdown-text");
      const resendBtn = document.getElementById("otp-resend-btn");
      if (timerDisplay) {
        timerDisplay.textContent = `Expires in ${otpCountdown}s`;
      }
      if (otpCountdown <= 0) {
        clearInterval(otpTimerId);
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.classList.remove("opacity-50", "cursor-not-allowed");
          resendBtn.classList.add("text-indigo-600", "dark:text-indigo-400", "cursor-pointer");
        }
      }
    }, 1000);
  }

  function resendOtp() {
    currentOtp = generate6DigitOtp();
    startOtpCountdown();
    return currentOtp;
  }

  /**
   * Step 2: Verify the 6-digit OTP
   */
  function verify2FA(inputCode) {
    if (!pendingAuthData || !currentOtp) {
      return { success: false, message: "Verification session expired. Please sign in again." };
    }

    if (inputCode.trim() !== currentOtp) {
      return { success: false, message: "Invalid OTP code. Please check and try again." };
    }

    // If registration, persist account credentials
    if (pendingAuthData.type === "register") {
      const accounts = getStoredAccounts();
      accounts.push(pendingAuthData.user);
      saveAccounts(accounts);
    }

    const authenticatedUser = { ...pendingAuthData.user };
    delete authenticatedUser.password;

    setCurrentUser(authenticatedUser);

    clearInterval(otpTimerId);
    pendingAuthData = null;
    currentOtp = null;

    // Trigger learning milestone notification
    if (typeof NotificationModule !== "undefined") {
      NotificationModule.triggerWelcome();
    }

    return {
      success: true,
      user: authenticatedUser,
      message: "Two-Step Verification successful! Welcome to LearnSphere."
    };
  }

  function logout() {
    setCurrentUser(null);
  }

  function getPendingEmailMasked() {
    if (!pendingAuthData || !pendingAuthData.user) return "student@domain.com";
    const email = pendingAuthData.user.email;
    const parts = email.split("@");
    if (parts[0].length <= 2) return `${parts[0]}***@${parts[1]}`;
    return `${parts[0].substring(0, 2)}***${parts[0].slice(-1)}@${parts[1]}`;
  }

  function getCurrentOtpForDemo() {
    return currentOtp;
  }

  return {
    init,
    getCurrentUser,
    setCurrentUser,
    isAuthenticated,
    initiateLogin,
    initiateRegister,
    verify2FA,
    resendOtp,
    logout,
    getPendingEmailMasked,
    getCurrentOtpForDemo
  };
})();
