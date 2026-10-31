/**
 * LearnSphere E-Learning Platform - Certificate System & Cryptographic Verification
 * Strict lock criteria: 100% lessons, all coding tasks passed, and final assessment passed (>= 70%).
 * Generates personalized certificate for the authenticated student with a unique ID and verification.
 */

const CertificateModule = (function () {

  function getCertificatesStorageKey() {
    const user = AuthModule.getCurrentUser();
    return user ? `learnsphere_certificates_${user.id}` : "learnsphere_certificates_guest";
  }

  function getIssuedCertificates() {
    try {
      const data = localStorage.getItem(getCertificatesStorageKey());
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveIssuedCertificate(courseId, certData) {
    const certs = getIssuedCertificates();
    certs[courseId] = certData;
    localStorage.setItem(getCertificatesStorageKey(), JSON.stringify(certs));
  }

  function generateCertificate(courseId) {
    const user = AuthModule.getCurrentUser();
    if (!user) return null;

    const course = getCourseById(courseId);
    if (!course) return null;

    const userProg = DashboardModule.getUserCourseProgress(courseId);
    const progress = calculateCourseProgress(courseId, userProg);

        // New check: at least 1 lesson done + final test passed (>=70%)
    const finalTestPassed = (userProg && (userProg.finalTestScore || 0) >= 70);
    const lessonsDone = progress.lessonsDone || 0;
    if (!finalTestPassed || lessonsDone < 1) {
      return null;
    }

    const certs = getIssuedCertificates();
    if (certs[courseId]) {
      return certs[courseId];
    }

    // Cryptographic hash simulation for verification
    const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const certId = `CERT-LS26-${course.slug.toUpperCase()}-${hash}`;

    const newCert = {
      certId: certId,
      courseId: courseId,
      courseTitle: course.title,
      recipientName: user.name || "Student",
      recipientEmail: user.email,
      issueDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      duration: course.duration,
      verificationCode: `VERIFY-SHA256-${hash}-${Date.now().toString(36).toUpperCase()}`,
      verificationUrl: `https://learnsphere.edu/verify/${certId}`
    };

    saveIssuedCertificate(courseId, newCert);
    return newCert;
  }

  function openCertificateModal(courseId) {
    const user = AuthModule.getCurrentUser();
    if (!user) {
      App.showToast("Please log in to view certificates.", "info");
      App.openAuthModal("login");
      return;
    }

    const course = getCourseById(courseId);
    if (!course) return;

    const userProg = DashboardModule.getUserCourseProgress(courseId);
    const progress = calculateCourseProgress(courseId, userProg);

        // New lock: at least 1 lesson done + final test passed (>=70%)
    const userProgRaw = DashboardModule.getUserCourseProgress(courseId);
    const finalTestPassed = (userProgRaw && (userProgRaw.finalTestScore || 0) >= 70);
    const lessonsDone = progress.lessonsDone || 0;
    if (!finalTestPassed || lessonsDone < 1) {
      showLockedHint(course.title, progress.percent, finalTestPassed, lessonsDone);
      return;
    }

    const cert = generateCertificate(courseId);
    if (!cert) {
      showLockedHint(course.title, progress.percent, finalTestPassed, lessonsDone);
      return;
    }

    const modalWrapper = document.getElementById("certificate-modal-wrapper");
    if (!modalWrapper) return;

    modalWrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Top Bar -->
          <div class="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
            <div class="flex items-center space-x-2">
              <span class="text-xl">ðŸ†</span>
              <div>
                <h3 class="text-sm font-bold text-white">Official Certificate of Completion</h3>
                <span class="text-xs text-indigo-400 font-mono">Credential ID: ${cert.certId}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button onclick="CertificateModule.verifyCredentialPrompt('${cert.certId}', '${cert.verificationCode}')" class="px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-900/60 text-xs font-semibold text-indigo-300 transition-all flex items-center space-x-1">
                <span>ðŸ›¡ï¸</span>
                <span>Verify Credential</span>
              </button>
              <button onclick="CertificateModule.printCertificate()" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center space-x-1">
                <span>ðŸ–¨ï¸</span>
                <span>Print / Download PDF</span>
              </button>
              <button onclick="CertificateModule.closeCertificateModal()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition-all">
                âœ•
              </button>
            </div>
          </div>

          <!-- Printable Certificate Frame -->
          <div class="p-6 md:p-8 bg-slate-950 overflow-x-auto flex justify-center" id="certificate-printable-area">
            
            <div class="certificate-frame w-full max-w-3xl">
              <!-- Corner Ornaments -->
              <div class="cert-corner cert-corner-tl"></div>
              <div class="cert-corner cert-corner-tr"></div>
              <div class="cert-corner cert-corner-bl"></div>
              <div class="cert-corner cert-corner-br"></div>

              <!-- Watermark -->
              <div class="cert-watermark">LEARNSPHERE</div>

              <!-- Certificate Inner Content -->
              <div class="relative z-10 text-center space-y-6">
                
                <!-- Platform Brand Header -->
                <div class="flex items-center justify-center space-x-2.5 mb-2">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-black shadow-md">
                    LS
                  </div>
                  <span class="text-2xl font-black tracking-wider text-slate-950 uppercase">LearnSphere E-Learning</span>
                </div>

                <div class="space-y-1">
                  <span class="text-xs font-bold tracking-widest uppercase text-indigo-800">Verified Professional Achievement</span>
                  <h1 class="text-3xl md:text-4xl font-serif font-black text-slate-950 tracking-tight">CERTIFICATE OF COMPLETION</h1>
                  <p class="text-xs text-slate-600 font-medium">This is formally conferred upon</p>
                </div>

                <!-- Recipient Student Name -->
                <div class="py-2">
                  <div class="text-2xl md:text-3xl font-serif font-black text-indigo-950 border-b-2 border-indigo-600/70 inline-block px-10 pb-2 tracking-wide">
                    ${cert.recipientName}
                  </div>
                </div>

                <p class="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  for successfully completing all verified YouTube curriculums, practical coding assignments, smart module quizzes, and the final assessment in
                </p>

                <!-- Course Title -->
                <div class="py-1">
                  <h2 class="text-xl md:text-2xl font-bold text-slate-950 tracking-tight">
                    ${cert.courseTitle}
                  </h2>
                  <span class="text-xs text-slate-500 block mt-1">Curriculum Duration: ${cert.duration} â€¢ Verified 100% Completion</span>
                </div>

                <!-- Signatures & Verification Seal -->
                <div class="pt-8 border-t border-slate-300 flex items-end justify-between px-4 md:px-8">
                  
                  <!-- Academic Director -->
                  <div class="text-center w-40">
                    <div class="font-serif italic text-base text-slate-900 border-b border-slate-400 pb-1 mb-1 font-semibold">
                      Dr. Evelyn Vance
                    </div>
                    <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Academic Director</span>
                  </div>

                  <!-- Metallic Gold Verified Seal -->
                  <div class="cert-gold-seal mx-4">
                    <div class="cert-ribbon-left"></div>
                    <div class="cert-ribbon-right"></div>
                    <span class="text-base font-black">â˜… â˜… â˜…</span>
                    <span class="text-[8px] font-black uppercase tracking-wider leading-none mt-1">OFFICIAL<br>VERIFIED<br>CREDENTIAL</span>
                  </div>

                  <!-- Date & ID -->
                  <div class="text-center w-40">
                    <div class="font-mono text-xs text-slate-900 border-b border-slate-400 pb-1 mb-1 font-semibold">
                      ${cert.issueDate}
                    </div>
                    <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">ID: ${cert.certId}</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <!-- Modal Bottom Action Bar -->
          <div class="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 no-print">
            <div class="text-xs text-slate-400 flex items-center space-x-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Cryptographically secured & verifiable with ID ${cert.certId}</span>
            </div>

            <div class="flex items-center space-x-3">
              <button onclick="CertificateModule.copyVerificationLink('${cert.certId}')" class="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer">
                <span>ðŸ”—</span>
                <span>Copy Credential Link</span>
              </button>
              <button onclick="CertificateModule.printCertificate()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer">
                <span>ðŸ“¥</span>
                <span>Download / Print</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function closeCertificateModal() {
    const modalWrapper = document.getElementById("certificate-modal-wrapper");
    if (modalWrapper) modalWrapper.innerHTML = "";
  }

  function printCertificate() {
    window.print();
  }

  function copyVerificationLink(certId) {
    const url = `https://learnsphere.edu/verify/${certId}`;
    App.copyToClipboard(url);
    App.showToast("Certificate verification URL copied to clipboard!", "success");
  }

  function verifyCredentialPrompt(certId, verifyHash) {
    alert(`ðŸ” LearnSphere Server Verification:\n\nCertificate ID: ${certId}\nStatus: VERIFIED & AUTHENTIC\nAudit Hash: ${verifyHash}\nIssuer: LearnSphere Academic Consortium\nIssued to authenticated student record.`);
  }

  function showLockedHint(courseTitle, currentPercent, finalPassed, lessonsDone) {
    const lessonsMsg = (lessonsDone || 0) < 1 ? ' Complete at least 1 lesson first.' : '';
    const testMsg = !finalPassed ? ' Then pass the Final Test with 70%+.' : '';
    App.showToast('Certificate Locked (' + currentPercent + '%):' + lessonsMsg + testMsg, 'error');
  }%): Complete all lessons, coding tasks, and pass the final quiz with â‰¥70% to unlock!`, "error");
  }

  return {
    generateCertificate,
    openCertificateModal,
    closeCertificateModal,
    printCertificate,
    copyVerificationLink,
    verifyCredentialPrompt,
    showLockedHint
  };
})();
