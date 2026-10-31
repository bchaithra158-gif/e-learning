/**
 * LearnSphere E-Learning Platform - Final Test Engine
 * Handles per-course final assessments, countdown timer, scoring, retry logic, and certificate unlock.
 * Certificate eligibility: student must complete at least 1 lesson AND score >= 70% on the final test.
 */

const FinalTestModule = (function () {
  let activeTest = null;       // { courseId, questions, timeLimit }
  let activeAnswers = {};      // { questionId: selectedIndex }
  let timerInterval = null;
  let secondsLeft = 900;

  // ─── Public: Launch Final Test Modal ────────────────────────────────────────
  function openFinalTest(courseId) {
    const user = AuthModule.getCurrentUser();
    if (!user) {
      App.showToast("Please sign in to take the final test.", "info");
      App.openAuthModal("login");
      return;
    }

    const course = getCourseById(courseId);
    if (!course) return;

    const userProg = DashboardModule.getUserCourseProgress(courseId);
    const completedLessons = (userProg && userProg.completedLessons) ? userProg.completedLessons : [];

    // Require at least 1 lesson completed
    if (completedLessons.length === 0) {
      App.showToast("Please complete at least one lesson before taking the final test.", "error");
      return;
    }

    // If already passed, show certificate directly
    if (userProg && userProg.finalTestScore >= 70) {
      App.showToast("You already passed the final test! Opening your certificate...", "success");
      CertificateModule.openCertificateModal(courseId);
      return;
    }

    // Pull questions from finalTest or fallback to last module quiz
    const testData = course.finalTest || (course.modules && course.modules[course.modules.length - 1] && course.modules[course.modules.length - 1].quiz);
    if (!testData || !testData.questions || testData.questions.length === 0) {
      App.showToast("No final test available for this course yet.", "info");
      return;
    }

    // Shuffle and pick up to 10 questions
    const shuffled = shuffleArray([...testData.questions]).slice(0, 10);

    activeTest = {
      courseId,
      courseName: course.title,
      questions: shuffled,
      timeLimit: testData.timeLimit || 900,
      passingScore: testData.passingScore || 70
    };
    activeAnswers = {};
    secondsLeft = activeTest.timeLimit;

    renderTestModal();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ─── Render Test Modal ───────────────────────────────────────────────────────
  function renderTestModal() {
    if (!activeTest) return;

    const wrapper = document.getElementById("certificate-modal-wrapper");
    if (!wrapper) return;

    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;

    wrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-4">
        <div class="relative w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-8">
          
          <!-- Test Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider">📝 Final Assessment</span>
              <h2 class="text-base font-bold text-white mt-0.5 truncate max-w-xs md:max-w-md">${activeTest.courseName}</h2>
              <p class="text-[11px] text-slate-400 mt-0.5">Answer all questions • Minimum 70% to earn your certificate</p>
            </div>
            <div class="flex items-center space-x-3">
              <div id="test-timer" class="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm font-bold text-white text-center min-w-[80px]">
                ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}
              </div>
              <button onclick="FinalTestModule.confirmClose()" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold">✕</button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="px-6 pt-4">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span id="test-answered-count">0 of ${activeTest.questions.length} answered</span>
              <span class="text-indigo-400 font-semibold">Pass: ${activeTest.passingScore}%</span>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div id="test-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
          </div>

          <!-- Questions -->
          <div class="px-6 py-5 space-y-6 max-h-[55vh] overflow-y-auto" id="test-questions-container">
            ${activeTest.questions.map((q, idx) => renderQuestion(q, idx)).join("")}
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
            <p class="text-xs text-slate-500">⚠️ Demo: Scores saved in browser localStorage. Not server-verified.</p>
            <button onclick="FinalTestModule.submitTest()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-bold text-sm shadow-lg transition-all">
              Submit Test →
            </button>
          </div>

        </div>
      </div>
    `;

    startTimer();
  }

  function renderQuestion(q, idx) {
    return `
      <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
        <div class="flex items-start space-x-2">
          <span class="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
          <p class="text-sm font-semibold text-white leading-snug">${q.text}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8" id="opts-${q.id}">
          ${q.options.map((opt, i) => `
            <button
              onclick="FinalTestModule.selectAnswer('${q.id}', ${i}, this)"
              id="opt-${q.id}-${i}"
              class="p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white option-btn"
              data-qid="${q.id}" data-idx="${i}">
              <span class="font-bold text-slate-500 mr-1.5">${String.fromCharCode(65 + i)}.</span>
              ${opt}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  // ─── Timer ───────────────────────────────────────────────────────────────────
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsLeft--;
      const el = document.getElementById("test-timer");
      if (el) {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if (secondsLeft <= 60) el.classList.add("text-rose-400");
        if (secondsLeft <= 10) el.classList.add("animate-pulse");
      }
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        App.showToast("Time's up! Submitting your answers.", "info");
        submitTest();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  // ─── Answer Selection ────────────────────────────────────────────────────────
  function selectAnswer(questionId, optionIndex, clickedBtn) {
    activeAnswers[questionId] = optionIndex;

    // Update button styles
    const container = document.getElementById(`opts-${questionId}`);
    if (container) {
      container.querySelectorAll(".option-btn").forEach(btn => {
        btn.className = "p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer option-btn";
        const i = parseInt(btn.getAttribute("data-idx"));
        if (i === optionIndex) {
          btn.className += " bg-indigo-900/70 border-indigo-500 text-white font-bold shadow-md";
        } else {
          btn.className += " bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white";
        }
      });
    }

    // Update answered count & progress bar
    const answered = Object.keys(activeAnswers).length;
    const total = activeTest ? activeTest.questions.length : 1;
    const countEl = document.getElementById("test-answered-count");
    const barEl = document.getElementById("test-progress-bar");
    if (countEl) countEl.textContent = `${answered} of ${total} answered`;
    if (barEl) barEl.style.width = `${Math.round(answered / total * 100)}%`;
  }

  // ─── Submit Test ─────────────────────────────────────────────────────────────
  function submitTest() {
    stopTimer();
    if (!activeTest) return;

    // Calculate score
    let correct = 0;
    activeTest.questions.forEach(q => {
      if (activeAnswers[q.id] === q.correct) correct++;
    });

    const total = activeTest.questions.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= activeTest.passingScore;

    // Save result
    const allProg = DashboardModule.getAllUserProgress();
    if (!allProg[activeTest.courseId]) {
      DashboardModule.enrollInCourse(activeTest.courseId);
    }
    if (allProg[activeTest.courseId]) {
      allProg[activeTest.courseId].finalTestScore = score;
      allProg[activeTest.courseId].finalTestPassed = passed;
      allProg[activeTest.courseId].finalTestDate = new Date().toISOString();
      localStorage.setItem(
        `learnsphere_progress_${AuthModule.getCurrentUser()?.id || "guest"}`,
        JSON.stringify(allProg)
      );
    }

    // Trigger notifications
    if (typeof NotificationModule !== "undefined") {
      NotificationModule.triggerQuizScore(score);
      if (passed) {
        NotificationModule.triggerAllRequirementsDone(activeTest.courseName);
        NotificationModule.triggerCertificateUnlocked(activeTest.courseName);
      }
    }

    renderResults(score, correct, total, passed);
  }

  // ─── Results Screen ──────────────────────────────────────────────────────────
  function renderResults(score, correct, total, passed) {
    const wrapper = document.getElementById("certificate-modal-wrapper");
    if (!wrapper) return;

    const questions = activeTest ? activeTest.questions : [];

    wrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-4">
        <div class="relative w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-8">

          <!-- Result Header -->
          <div class="px-6 py-5 text-center ${passed ? 'bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/40' : 'bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/30'} border-b border-slate-800">
            <div class="text-4xl mb-2">${passed ? "🎉" : "📖"}</div>
            <h2 class="text-2xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}">${passed ? "Test Passed!" : "Not Quite Yet"}</h2>
            <p class="text-slate-400 text-sm mt-1">${passed ? "Congratulations! Your certificate is now unlocked." : `You scored ${score}%. You need ${activeTest.passingScore}% to pass.`}</p>

            <!-- Score Display -->
            <div class="mt-4 inline-flex items-center space-x-6 px-8 py-4 rounded-2xl bg-slate-900/80 border border-slate-700">
              <div class="text-center">
                <span class="block text-3xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}">${score}%</span>
                <span class="text-[11px] text-slate-400">Score</span>
              </div>
              <div class="w-px h-10 bg-slate-700"></div>
              <div class="text-center">
                <span class="block text-3xl font-black text-white">${correct}/${total}</span>
                <span class="text-[11px] text-slate-400">Correct</span>
              </div>
              <div class="w-px h-10 bg-slate-700"></div>
              <div class="text-center">
                <span class="block text-3xl font-black ${passed ? 'text-emerald-400' : 'text-slate-400'}">${activeTest.passingScore}%</span>
                <span class="text-[11px] text-slate-400">Required</span>
              </div>
            </div>
          </div>

          <!-- Answer Review -->
          <div class="px-6 py-4 max-h-[45vh] overflow-y-auto space-y-4">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Answer Review & Explanations</h3>
            ${questions.map((q, idx) => {
              const userAns = activeAnswers[q.id];
              const wasCorrect = userAns === q.correct;
              return `
                <div class="p-3.5 rounded-xl border ${wasCorrect ? 'border-emerald-700/60 bg-emerald-950/30' : 'border-rose-700/60 bg-rose-950/20'} space-y-2">
                  <div class="flex items-start space-x-2">
                    <span class="${wasCorrect ? 'text-emerald-400' : 'text-rose-400'} font-bold text-sm mt-0.5">${wasCorrect ? '✓' : '✗'}</span>
                    <p class="text-xs font-semibold text-white leading-snug">${idx + 1}. ${q.text}</p>
                  </div>
                  <div class="pl-5 space-y-1 text-[11px]">
                    ${userAns !== undefined && userAns !== q.correct ? `<p class="text-rose-400">Your answer: <span class="font-bold">${q.options[userAns]}</span></p>` : ''}
                    <p class="text-emerald-400">Correct: <span class="font-bold">${q.options[q.correct]}</span></p>
                    <p class="text-slate-400 italic mt-1">${q.explanation || ''}</p>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button onclick="FinalTestModule.closeResults()" class="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all">
              ← Back to Course
            </button>
            <div class="flex items-center space-x-3">
              ${!passed ? `
                <button onclick="FinalTestModule.retryTest()" class="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all">
                  🔄 Retry Test
                </button>
              ` : `
                <button onclick="FinalTestModule.closeResults(); CertificateModule.openCertificateModal('${activeTest.courseId}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 text-xs font-black shadow-md transition-all flex items-center space-x-1.5">
                  <span>🏆</span>
                  <span>View My Certificate</span>
                </button>
              `}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function retryTest() {
    if (!activeTest) return;
    activeAnswers = {};
    secondsLeft = activeTest.timeLimit;
    // Re-shuffle questions
    activeTest.questions = shuffleArray([...activeTest.questions]);
    renderTestModal();
  }

  function closeResults() {
    const wrapper = document.getElementById("certificate-modal-wrapper");
    if (wrapper) wrapper.innerHTML = "";
    activeTest = null;
    activeAnswers = {};
    stopTimer();
  }

  function confirmClose() {
    if (confirm("Are you sure you want to exit the test? Your progress will be lost.")) {
      stopTimer();
      const wrapper = document.getElementById("certificate-modal-wrapper");
      if (wrapper) wrapper.innerHTML = "";
      activeTest = null;
      activeAnswers = {};
    }
  }

  return {
    openFinalTest,
    selectAnswer,
    submitTest,
    retryTest,
    closeResults,
    confirmClose
  };
})();

