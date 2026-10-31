/**
 * LearnSphere E-Learning Platform - Core Application Router, State & UI Controller
 * Manages routing, theme toggling, auth modal, 2FA OTP verification, syllabus viewer, and course catalog.
 */

const App = (function () {
  let currentView = "home-view";
  let activeCourseCategory = "All";
  let courseSearchQuery = "";

  function init() {
    // Initialize submodules
    AuthModule.init();
    AIScannerModule.init();

    // Theme initialization
    initTheme();

    // Setup Auth Event Listener
    window.addEventListener("learnsphere:auth-change", () => {
      updateNavAuthUI();
      if (typeof NotificationModule !== "undefined") {
        NotificationModule.updateBellUI();
      }
      if (currentView === "dashboard-view") {
        DashboardModule.renderDashboardUI();
      }
    });

    window.addEventListener("learnsphere:progress-updated", () => {
      if (typeof NotificationModule !== "undefined") {
        NotificationModule.updateBellUI();
      }
      if (currentView === "dashboard-view") {
        DashboardModule.renderDashboardUI();
      }
    });

    // Close notification panel if clicked outside
    document.addEventListener("click", (e) => {
      const panel = document.getElementById("notification-dropdown-panel");
      const bell = document.getElementById("notification-bell-btn");
      if (panel && bell && !panel.classList.contains("hidden")) {
        if (!panel.contains(e.target) && !bell.contains(e.target)) {
          panel.classList.add("hidden");
        }
      }
    });

    // Initial Nav UI
    updateNavAuthUI();
    if (typeof NotificationModule !== "undefined") {
      NotificationModule.updateBellUI();
    }

    // Render Home Landing Page components
    renderFeaturedCourses();
    renderAllCoursesCatalog();

    // Check URL hash if any
    handleHashRouting();
    window.addEventListener("hashchange", handleHashRouting);

    // Requirement: Show Login and Sign Up pages when the website opens
    if (!AuthModule.getCurrentUser()) {
      openAuthModal("login");
    } else {
      // If already logged in and at root or #home, navigate to dashboard
      const hash = window.location.hash.replace("#", "");
      if (!hash || hash === "home") {
        navigateTo("dashboard");
      }
    }
  }

  // --- Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem("learnsphere_theme") || "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateThemeToggleIcons();
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("learnsphere_theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("learnsphere_theme", "dark");
    }
    updateThemeToggleIcons();
    showToast(`Switched to ${isDark ? 'Light' : 'Dark'} mode`, "info");
  }

  function updateThemeToggleIcons() {
    const isDark = document.documentElement.classList.contains("dark");
    const icons = document.querySelectorAll(".theme-toggle-icon");
    icons.forEach(icon => {
      icon.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // --- Routing & View Management ---
  function handleHashRouting() {
    const hash = window.location.hash.replace("#", "") || "home";
    const routeMap = {
      home: "home-view",
      courses: "courses-view",
      scanner: "ai-scanner-view",
      dashboard: "dashboard-view",
      about: "about-view"
    };

    const targetView = routeMap[hash] || "home-view";
    switchMainView(targetView, false);
  }

  function navigateTo(route) {
    window.location.hash = route;
    const routeMap = {
      home: "home-view",
      courses: "courses-view",
      scanner: "ai-scanner-view",
      dashboard: "dashboard-view",
      about: "about-view"
    };
    switchMainView(routeMap[route] || "home-view", true);
  }

  function switchMainView(viewId, updateHash = true) {
    currentView = viewId;

    // List of all main view containers
    const views = [
      "home-view",
      "courses-view",
      "ai-scanner-view",
      "dashboard-view",
      "classroom-view",
      "about-view"
    ];

    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) {
        if (v === viewId) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });

    // Update active nav links
    updateNavActiveLinks(viewId);

    // Close mobile menu if open
    closeMobileMenu();

    // Trigger view-specific renderers
    if (viewId === "ai-scanner-view") {
      AIScannerModule.renderScannerView();
    } else if (viewId === "dashboard-view") {
      DashboardModule.renderDashboardUI();
    } else if (viewId === "courses-view") {
      renderAllCoursesCatalog();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateNavActiveLinks(viewId) {
    const navLinks = document.querySelectorAll(".nav-link-btn");
    navLinks.forEach(btn => {
      const target = btn.getAttribute("data-target");
      if (target === viewId) {
        btn.classList.add("text-indigo-600", "dark:text-indigo-400", "font-bold");
        btn.classList.remove("text-slate-600", "dark:text-slate-300");
      } else {
        btn.classList.remove("text-indigo-600", "dark:text-indigo-400", "font-bold");
        btn.classList.add("text-slate-600", "dark:text-slate-300");
      }
    });
  }

  // --- Auth UI Controls ---
  function updateNavAuthUI() {
    const user = AuthModule.getCurrentUser();
    const guestActions = document.getElementById("nav-guest-actions");
    const userActions = document.getElementById("nav-user-actions");
    const mobileGuestActions = document.getElementById("mobile-guest-actions");
    const mobileUserActions = document.getElementById("mobile-user-actions");
    const navDashboardLink = document.getElementById("nav-link-dashboard");
    const mobileDashboardLink = document.getElementById("mobile-nav-link-dashboard");

    if (user) {
      if (guestActions) guestActions.classList.add("hidden");
      if (userActions) {
        userActions.classList.remove("hidden");
        userActions.classList.add("flex");
      }
      if (mobileGuestActions) mobileGuestActions.classList.add("hidden");
      if (mobileUserActions) mobileUserActions.classList.remove("hidden");
      if (navDashboardLink) navDashboardLink.classList.remove("hidden");
      if (mobileDashboardLink) mobileDashboardLink.classList.remove("hidden");
    } else {
      if (guestActions) guestActions.classList.remove("hidden");
      if (userActions) {
        userActions.classList.add("hidden");
        userActions.classList.remove("flex");
      }
      if (mobileGuestActions) mobileGuestActions.classList.remove("hidden");
      if (mobileUserActions) mobileUserActions.classList.add("hidden");
      if (navDashboardLink) navDashboardLink.classList.add("hidden");
      if (mobileDashboardLink) mobileDashboardLink.classList.add("hidden");
    }
  }

  function openAuthModal(mode = "login") {
    const modalWrapper = document.getElementById("auth-modal-wrapper");
    if (!modalWrapper) return;

    const isLogin = mode === "login";

    modalWrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          
          <button onclick="App.closeAuthModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold">✕</button>

          <!-- Brand Logo and Header -->
          <div class="text-center space-y-1">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-600/30 mb-2">
              LS
            </div>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white">
              ${isLogin ? "Welcome Back" : "Create Student Account"}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              ${isLogin ? "Sign in with Two-Step Verification to track your learning" : "Join LearnSphere to access real tutorials & earn verified certificates"}
            </p>
          </div>

          <!-- Dual Tab Switcher -->
          <div class="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-xs font-bold text-center">
            <button onclick="App.openAuthModal('login')" class="py-2.5 rounded-xl transition-all ${isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              Sign In
            </button>
            <button onclick="App.openAuthModal('register')" class="py-2.5 rounded-xl transition-all ${!isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
              Create Account
            </button>
          </div>

          ${isLogin ? `
            <!-- Demo Student Auto-Fill Pill -->
            <div onclick="App.fillDemoLoginCredentials()" class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors text-center">
              <span class="text-xs font-semibold text-indigo-700 dark:text-indigo-300">💡 Click here to Auto-Fill Demo Credentials</span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">student@learnsphere.edu • password123</span>
            </div>

            <form onsubmit="App.handleLoginSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input type="email" id="login-email" required placeholder="student@learnsphere.edu" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <a href="javascript:void(0)" onclick="App.showToast('Demo hint: password is password123', 'info')" class="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">Forgot?</a>
                </div>
                <input type="password" id="login-password" required placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>

              <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-indigo-600 focus:ring-indigo-500">
                  <span>Remember session</span>
                </label>
                <span class="text-xs text-indigo-500 font-medium">🛡️ 2-Step OTP Active</span>
              </div>

              <button type="submit" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs md:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2">
                <span>Continue to Two-Step Verification</span>
                <span>➔</span>
              </button>
            </form>
          ` : `
            <form onsubmit="App.handleRegisterSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name (For Personalized Certificates)</label>
                <input type="text" id="reg-name" required placeholder="e.g. Jordan Miller" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input type="email" id="reg-email" required placeholder="jordan@domain.com" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Choose Password (min 6 chars)</label>
                <input type="password" id="reg-password" required minlength="6" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>

              <div class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                By registering, a 6-digit OTP verification code will be simulated for your session. Certificates are unlocked strictly after 100% course completion.
              </div>

              <button type="submit" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs md:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2">
                <span>Register & Send 2FA Code</span>
                <span>➔</span>
              </button>
            </form>
          `}

        </div>
      </div>
    `;
  }

  function fillDemoLoginCredentials() {
    const emailInput = document.getElementById("login-email");
    const passInput = document.getElementById("login-password");
    if (emailInput && passInput) {
      emailInput.value = "student@learnsphere.edu";
      passInput.value = "password123";
      showToast("Demo credentials filled!", "info");
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const res = AuthModule.initiateLogin(email, password);
    if (!res.success) {
      showToast(res.message, "error");
      return;
    }

    // Launch 2FA OTP modal!
    open2FAModal(res.email, res.otp);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const res = AuthModule.initiateRegister(name, email, password);
    if (!res.success) {
      showToast(res.message, "error");
      return;
    }

    // Launch 2FA OTP modal!
    open2FAModal(res.email, res.otp);
  }

  /**
   * Two-Step Verification (2FA) Modal Screen
   */
  function open2FAModal(email, generatedOtp) {
    const modalWrapper = document.getElementById("auth-modal-wrapper");
    if (!modalWrapper) return;

    modalWrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div id="otp-card-container" class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <button onclick="App.closeAuthModal()" class="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold">✕</button>

          <div class="text-center space-y-2">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-bold border border-indigo-400/30">
              🛡️
            </div>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white">Two-Step Verification</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              We've dispatched a secure 6-digit OTP code to:
              <strong class="text-slate-800 dark:text-slate-200 block mt-0.5">${AuthModule.getPendingEmailMasked()}</strong>
            </p>
          </div>

          <!-- Quick Auto-Fill Demo OTP Pill -->
          <div onclick="App.quickFillOtp('${generatedOtp}')" class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors text-center">
            <span class="text-xs font-bold text-amber-800 dark:text-amber-300">⚡ Demo Simulation Code: <span class="tracking-widest font-mono font-black underline text-sm">${generatedOtp}</span></span>
            <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Click here to automatically populate the 6 digits</span>
          </div>

          <!-- 6-digit OTP Inputs -->
          <form onsubmit="App.handle2FASubmit(event)" class="space-y-6">
            <div class="flex justify-center items-center gap-2" id="otp-inputs-row">
              <input type="text" maxlength="1" class="otp-input-box" id="otp-1" oninput="App.onOtpInput(this, 1)" onkeydown="App.onOtpKeyDown(event, 1)" autofocus>
              <input type="text" maxlength="1" class="otp-input-box" id="otp-2" oninput="App.onOtpInput(this, 2)" onkeydown="App.onOtpKeyDown(event, 2)">
              <input type="text" maxlength="1" class="otp-input-box" id="otp-3" oninput="App.onOtpInput(this, 3)" onkeydown="App.onOtpKeyDown(event, 3)">
              <input type="text" maxlength="1" class="otp-input-box" id="otp-4" oninput="App.onOtpInput(this, 4)" onkeydown="App.onOtpKeyDown(event, 4)">
              <input type="text" maxlength="1" class="otp-input-box" id="otp-5" oninput="App.onOtpInput(this, 5)" onkeydown="App.onOtpKeyDown(event, 5)">
              <input type="text" maxlength="1" class="otp-input-box" id="otp-6" oninput="App.onOtpInput(this, 6)" onkeydown="App.onOtpKeyDown(event, 6)">
            </div>

            <!-- Countdown and Resend -->
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span id="otp-countdown-text">Expires in 60s</span>
              <button type="button" id="otp-resend-btn" onclick="App.handleResendOtp()" disabled class="opacity-50 cursor-not-allowed text-xs font-semibold transition-colors">
                Resend Code
              </button>
            </div>

            <button type="submit" id="btn-verify-otp" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2">
              <span>Verify & Access Account</span>
              <span>✓</span>
            </button>
          </form>

        </div>
      </div>
    `;

    // Announce toast with code for realistic simulation
    showToast(`2FA Simulation: Verification code is ${generatedOtp}`, "info");

    // Focus on first OTP input
    setTimeout(() => {
      const first = document.getElementById("otp-1");
      if (first) first.focus();
    }, 150);
  }

  function onOtpInput(input, index) {
    if (input.value.length > 1) {
      const full = input.value.replace(/[^0-9]/g, "");
      for (let i = 0; i < 6; i++) {
        const box = document.getElementById(`otp-${i + 1}`);
        if (box && full[i]) box.value = full[i];
      }
      const last = document.getElementById("otp-6");
      if (last) last.focus();
      return;
    }

    input.value = input.value.replace(/[^0-9]/g, "");

    if (input.value && index < 6) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  }

  function onOtpKeyDown(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 1) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) {
        prev.focus();
        prev.value = "";
      }
    }
  }

  function quickFillOtp(code) {
    for (let i = 0; i < 6; i++) {
      const box = document.getElementById(`otp-${i + 1}`);
      if (box && code[i]) box.value = code[i];
    }
    const btn = document.getElementById("btn-verify-otp");
    if (btn) btn.focus();
  }

  function handle2FASubmit(e) {
    e.preventDefault();
    let code = "";
    for (let i = 1; i <= 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      if (box) code += box.value;
    }

    if (code.length < 6) {
      showToast("Please enter all 6 digits of your OTP.", "error");
      return;
    }

    const res = AuthModule.verify2FA(code);
    if (!res.success) {
      showToast(res.message, "error");
      const card = document.getElementById("otp-card-container");
      if (card) {
        card.classList.add("animate-shake");
        setTimeout(() => card.classList.remove("animate-shake"), 500);
      }
      return;
    }

    // Success!
    closeAuthModal();
    showToast(res.message, "success");
    if (typeof confetti === "function") {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }

    // Trigger genuine welcome milestone notification
    if (typeof NotificationModule !== "undefined") {
      NotificationModule.triggerWelcome();
    }

    // Navigate to courses dashboard
    navigateTo("dashboard");
  }

  function handleResendOtp() {
    const newOtp = AuthModule.resendOtp();
    showToast(`New 2FA Code Dispatched: ${newOtp}`, "info");
    open2FAModal(AuthModule.getPendingEmailMasked(), newOtp);
  }

  function closeAuthModal() {
    const modalWrapper = document.getElementById("auth-modal-wrapper");
    if (modalWrapper) modalWrapper.innerHTML = "";
  }

  function handleLogout() {
    AuthModule.logout();
    showToast("Signed out successfully.", "info");
    navigateTo("home");
  }

  // --- Featured Courses & Catalog Rendering ---
  function renderFeaturedCourses() {
    const container = document.getElementById("featured-courses-grid");
    if (!container) return;

    // Show top 3 featured curriculums
    const featured = COURSES_DATA.slice(0, 3);

    container.innerHTML = featured.map(course => {
      const isUserEnrolled = DashboardModule.isEnrolled(course.id);
      const tutorialChannels = course.tutorialOptions 
        ? course.tutorialOptions.map(t => t.channel).slice(0, 3).join(", ") 
        : "freeCodeCamp, Telusko, Mosh";

      return `
        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <!-- Thumbnail Gradient Banner -->
          <div class="h-44 bg-gradient-to-r ${course.bannerGradient} p-6 flex flex-col justify-between relative overflow-hidden">
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>
            
            <div class="flex items-center justify-between z-10">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                ${course.category}
              </span>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/30 backdrop-blur-md text-amber-300">
                ${course.badge || "Verified Curriculum"}
              </span>
            </div>

            <div class="z-10">
              <span class="text-xs text-white/80 font-medium block">⏱️ ${course.duration} • ${course.totalModules} Modules</span>
              <h3 class="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-sm mt-0.5 line-clamp-1">${course.title}</h3>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <p class="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
              ${course.description}
            </p>

            <!-- YouTube Tutorials Badge -->
            <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs">
              <div class="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-bold mb-1">
                <span class="text-rose-500">▶</span>
                <span>${course.tutorialOptions ? course.tutorialOptions.length : 4} Real YouTube Tutorials:</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">${tutorialChannels}</p>
            </div>

            <!-- Curriculum Highlights -->
            <ul class="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li class="flex items-center space-x-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span class="truncate">Hands-on coding challenges & in-browser validation</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span class="truncate">Smart timed module quizzes & final assessment</span>
              </li>
            </ul>

            <!-- Instructor and Rating -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-300/40">
                  LS
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">${course.instructor?.name || 'LearnSphere Faculty'}</h4>
                  <span class="text-[10px] text-slate-400">${course.level}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-1 text-xs font-bold text-amber-500">
                  <span>★</span>
                  <span>${course.rating}</span>
                </div>
                <span class="text-[10px] text-slate-400">${course.reviewsCount} reviews</span>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="grid grid-cols-2 gap-2 pt-2">
              <button onclick="App.openSyllabusModal('${course.id}')" class="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all">
                Syllabus
              </button>
              ${isUserEnrolled ? `
                <button onclick="ClassroomModule.launchCourse('${course.id}')" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1">
                  <span>Resume</span>
                  <span>▶</span>
                </button>
              ` : `
                <button onclick="App.handleEnrollClick('${course.id}')" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1">
                  <span>Enroll Free</span>
                  <span>➔</span>
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderAllCoursesCatalog() {
    const container = document.getElementById("all-courses-catalog-grid");
    const categoryBar = document.getElementById("courses-category-filter-bar");
    if (!container) return;

    if (categoryBar) {
      const categories = getAllCategories();
      categoryBar.innerHTML = categories.map(cat => {
        const isActive = cat === activeCourseCategory;
        return `
          <button onclick="App.setCourseCategoryFilter('${cat}')" class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}">
            ${cat}
          </button>
        `;
      }).join("");
    }

    const filtered = COURSES_DATA.filter(c => {
      const matchCat = activeCourseCategory === "All" || c.category === activeCourseCategory;
      const matchQ = !courseSearchQuery || 
        c.title.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(courseSearchQuery.toLowerCase());
      return matchCat && matchQ;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <p class="text-slate-500 text-sm">No courses found matching "${courseSearchQuery}".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(course => {
      const isUserEnrolled = DashboardModule.isEnrolled(course.id);
      const tutCount = course.tutorialOptions ? course.tutorialOptions.length : 4;

      return `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <div class="h-36 bg-gradient-to-r ${course.bannerGradient} p-5 flex flex-col justify-between relative overflow-hidden">
            <div class="flex items-center justify-between z-10">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                ${course.category}
              </span>
              <span class="text-xs text-white/90 font-medium bg-black/25 px-2.5 py-0.5 rounded-full">
                ${course.level}
              </span>
            </div>
            <h3 class="text-white font-bold text-base leading-tight drop-shadow-sm z-10 line-clamp-1">${course.title}</h3>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">${course.description}</p>
            
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>⏱️ ${course.duration}</span>
              <span>📺 ${tutCount} Tutorials</span>
              <span class="font-bold text-amber-500">★ ${course.rating}</span>
            </div>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
              <button onclick="App.openSyllabusModal('${course.id}')" class="py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Syllabus
              </button>
              ${isUserEnrolled ? `
                <button onclick="ClassroomModule.launchCourse('${course.id}')" class="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-1">
                  <span>Resume</span>
                  <span>▶</span>
                </button>
              ` : `
                <button onclick="App.handleEnrollClick('${course.id}')" class="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-1">
                  <span>Enroll</span>
                  <span>➔</span>
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function setCourseCategoryFilter(cat) {
    activeCourseCategory = cat;
    renderAllCoursesCatalog();
  }

  function handleCourseSearchInput(query) {
    courseSearchQuery = query;
    renderAllCoursesCatalog();
  }

  function handleEnrollClick(courseId) {
    const user = AuthModule.getCurrentUser();
    if (!user) {
      showToast("Please sign in with 2FA to enroll in this course.", "info");
      openAuthModal("login");
      return;
    }

    const res = DashboardModule.enrollInCourse(courseId);
    showToast(res.message, res.success ? "success" : "info");
    
    // Jump straight to the interactive classroom!
    ClassroomModule.launchCourse(courseId);
  }

  function openSyllabusModal(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;

    const modalWrapper = document.getElementById("syllabus-modal-wrapper");
    if (!modalWrapper) return;

    modalWrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
          
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${course.category} • ${course.duration}</span>
              <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">${course.title}</h2>
            </div>
            <button onclick="App.closeSyllabusModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold">✕</button>
          </div>

          <p class="text-xs md:text-sm text-slate-600 dark:text-slate-300">${course.description}</p>

          <!-- 4 Real YouTube Tutorial Options Preview -->
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1.5">
              <span>📺</span>
              <span>Available YouTube Tutorial Streams (${course.tutorialOptions ? course.tutorialOptions.length : 4} Options)</span>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              ${(course.tutorialOptions || []).map((t, idx) => `
                <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <span class="font-bold text-slate-800 dark:text-slate-200 block truncate">${idx + 1}. ${t.title}</span>
                  <span class="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">${t.channel} • ${t.level}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Modules list -->
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Curriculum Modules (${course.totalModules} Levels)</h3>
            ${course.modules.map((m, idx) => `
              <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div class="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  <span>${m.title}</span>
                  <span class="text-slate-500">${m.duration}</span>
                </div>
                <div class="space-y-1">
                  ${m.lessons.map(l => `
                    <div class="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pl-2">
                      <span class="truncate">• ${l.title}</span>
                      <span class="text-[10px] text-slate-500">${l.duration}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Free Reading Resources -->
          ${course.readingResources && course.readingResources.length > 0 ? `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span class="font-bold text-slate-700 dark:text-slate-300 block">📚 Verified Free Learning Resources:</span>
              <div class="flex flex-wrap gap-2 pt-1">
                ${course.readingResources.map(r => `
                  <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center space-x-1">
                    <span>${r.title}</span>
                    <span class="text-[10px]">↗</span>
                  </a>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                LS
              </div>
              <span class="text-xs font-medium text-slate-700 dark:text-slate-300">Curated by ${course.instructor?.name || 'LearnSphere Faculty'}</span>
            </div>
            <button onclick="App.closeSyllabusModal(); App.handleEnrollClick('${course.id}');" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all">
              Enroll in this Course
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function closeSyllabusModal() {
    const modalWrapper = document.getElementById("syllabus-modal-wrapper");
    if (modalWrapper) modalWrapper.innerHTML = "";
  }

  // --- Mobile Drawer Controls ---
  function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu-drawer");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobile-menu-drawer");
    if (menu) {
      menu.classList.add("hidden");
    }
  }

  // --- Global Toast Notifications ---
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-item p-4 rounded-2xl flex items-center space-x-3 text-xs md:text-sm font-semibold transition-all border ${
      type === "success" ? "bg-emerald-900/90 text-white border-emerald-500/40" :
      type === "error" ? "bg-rose-900/90 text-white border-rose-500/40" :
      "bg-slate-900/90 text-white border-indigo-500/40"
    } backdrop-blur-md`;

    const icon = type === "success" ? "✅" : type === "error" ? "⚠️" : "ℹ️";
    toast.innerHTML = `
      <span class="text-lg">${icon}</span>
      <span class="flex-1">${message}</span>
      <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white text-xs">✕</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  return {
    init,
    toggleTheme,
    navigateTo,
    switchMainView,
    openAuthModal,
    fillDemoLoginCredentials,
    handleLoginSubmit,
    handleRegisterSubmit,
    open2FAModal,
    onOtpInput,
    onOtpKeyDown,
    quickFillOtp,
    handle2FASubmit,
    handleResendOtp,
    closeAuthModal,
    handleLogout,
    setCourseCategoryFilter,
    handleCourseSearchInput,
    handleEnrollClick,
    openSyllabusModal,
    closeSyllabusModal,
    toggleMobileMenu,
    closeMobileMenu,
    showToast,
    copyToClipboard
  };
})();

// Bootstrap on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
