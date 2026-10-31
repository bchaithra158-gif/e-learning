/**
 * LearnSphere E-Learning Platform - User Dashboard & Progress Management Module
 * Manages separate per-user progress, pending assignments, quiz scores, certificates, and metrics.
 */

const DashboardModule = (function () {

  function getProgressStorageKey() {
    const user = AuthModule.getCurrentUser();
    return user ? `learnsphere_progress_${user.id}` : "learnsphere_progress_guest";
  }

  function getAllUserProgress() {
    try {
      const data = localStorage.getItem(getProgressStorageKey());
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveAllUserProgress(progressMap) {
    localStorage.setItem(getProgressStorageKey(), JSON.stringify(progressMap));
    window.dispatchEvent(new CustomEvent("learnsphere:progress-updated"));
  }

  function getUserCourseProgress(courseId) {
    const all = getAllUserProgress();
    return all[courseId] || null;
  }

  function isEnrolled(courseId) {
    const all = getAllUserProgress();
    return Boolean(all[courseId]);
  }

  function enrollInCourse(courseId) {
    const all = getAllUserProgress();
    if (all[courseId]) {
      return { success: false, message: "You are already enrolled in this course." };
    }

    const course = getCourseById(courseId);
    all[courseId] = {
      courseId: courseId,
      enrolledAt: new Date().toISOString().split("T")[0],
      completedLessons: [],
      completedTasks: [],
      quizScores: {},
      lastAccessedLesson: (course && course.modules[0] && course.modules[0].lessons[0]) ? course.modules[0].lessons[0].id : null
    };

    saveAllUserProgress(all);
    return { success: true, message: `Successfully enrolled in ${course ? course.shortTitle : 'Course'}!` };
  }

  function markLessonComplete(courseId, lessonId) {
    const all = getAllUserProgress();
    if (!all[courseId]) {
      enrollInCourse(courseId);
    }
    const userProg = all[courseId] || { completedLessons: [], completedTasks: [], quizScores: {} };

    if (!userProg.completedLessons) userProg.completedLessons = [];
    if (!userProg.completedLessons.includes(lessonId)) {
      userProg.completedLessons.push(lessonId);
    }
    userProg.lastAccessedLesson = lessonId;

    saveAllUserProgress(all);

    const calculated = calculateCourseProgress(courseId, userProg);

    // Trigger milestone notifications
    const course = getCourseById(courseId);
    if (userProg.completedLessons.length === 1 && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerFirstLesson(course ? course.shortTitle : "Course");
    }
    if (calculated.percent >= 50 && calculated.percent < 60 && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerCourseHalfway(course ? course.shortTitle : "Course");
    }
    if (calculated.isFinished && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerAllRequirementsDone(course ? course.shortTitle : "Course");
      NotificationModule.triggerCertificateUnlocked(course ? course.shortTitle : "Course");
    }

    return {
      success: true,
      progress: calculated,
      isFinished: calculated.isFinished
    };
  }

  function toggleLessonCompletion(courseId, lessonId) {
    const all = getAllUserProgress();
    if (!all[courseId]) {
      enrollInCourse(courseId);
    }
    const userProg = all[courseId];
    if (!userProg.completedLessons) userProg.completedLessons = [];

    let isCompleted = false;
    const idx = userProg.completedLessons.indexOf(lessonId);
    if (idx > -1) {
      userProg.completedLessons.splice(idx, 1);
      isCompleted = false;
    } else {
      userProg.completedLessons.push(lessonId);
      isCompleted = true;
    }
    userProg.lastAccessedLesson = lessonId;

    saveAllUserProgress(all);

    const calculated = calculateCourseProgress(courseId, userProg);

    const course = getCourseById(courseId);
    if (isCompleted && userProg.completedLessons.length === 1 && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerFirstLesson(course ? course.shortTitle : "Course");
    }
    if (isCompleted && calculated.isFinished && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerAllRequirementsDone(course ? course.shortTitle : "Course");
      NotificationModule.triggerCertificateUnlocked(course ? course.shortTitle : "Course");
    }

    return {
      success: true,
      isCompleted,
      progress: calculated,
      isFinished: calculated.isFinished
    };
  }

  function markTaskComplete(courseId, taskId) {
    const all = getAllUserProgress();
    if (!all[courseId]) enrollInCourse(courseId);
    const userProg = all[courseId];
    if (!userProg.completedTasks) userProg.completedTasks = [];

    if (!userProg.completedTasks.includes(taskId)) {
      userProg.completedTasks.push(taskId);
    }

    saveAllUserProgress(all);
    const calculated = calculateCourseProgress(courseId, userProg);

    if (calculated.isFinished && typeof NotificationModule !== "undefined") {
      const course = getCourseById(courseId);
      NotificationModule.triggerAllRequirementsDone(course ? course.shortTitle : "Course");
      NotificationModule.triggerCertificateUnlocked(course ? course.shortTitle : "Course");
    }

    return {
      success: true,
      progress: calculated,
      isFinished: calculated.isFinished
    };
  }

  function saveQuizScore(courseId, quizId, scorePercent) {
    const all = getAllUserProgress();
    if (!all[courseId]) enrollInCourse(courseId);
    const userProg = all[courseId];
    if (!userProg.quizScores) userProg.quizScores = {};

    userProg.quizScores[quizId] = scorePercent;

    saveAllUserProgress(all);
    const calculated = calculateCourseProgress(courseId, userProg);

    // Trigger quiz notification
    if (scorePercent >= 70 && typeof NotificationModule !== "undefined") {
      NotificationModule.triggerQuizScore(scorePercent);
    }
    if (calculated.isFinished && typeof NotificationModule !== "undefined") {
      const course = getCourseById(courseId);
      NotificationModule.triggerAllRequirementsDone(course ? course.shortTitle : "Course");
      NotificationModule.triggerCertificateUnlocked(course ? course.shortTitle : "Course");
    }

    return {
      success: true,
      progress: calculated,
      isFinished: calculated.isFinished
    };
  }

  function getOverallDashboardStats() {
    const all = getAllUserProgress();
    const enrolledCourseIds = Object.keys(all);

    let totalCompletedCourses = 0;
    let totalLessonsDone = 0;
    let totalTasksDone = 0;
    let totalPendingTasks = 0;
    let totalQuizScoresCount = 0;
    let sumQuizScores = 0;
    let overallProgressSum = 0;

    enrolledCourseIds.forEach(cId => {
      const course = getCourseById(cId);
      if (course) {
        const prog = calculateCourseProgress(cId, all[cId]);
        overallProgressSum += prog.percent;
        if (prog.isFinished) totalCompletedCourses++;
        totalLessonsDone += prog.lessonsDone;
        totalTasksDone += prog.tasksDone;
        totalPendingTasks += Math.max(0, prog.totalTasks - prog.tasksDone);

        const qScores = all[cId].quizScores || {};
        Object.values(qScores).forEach(score => {
          sumQuizScores += score;
          totalQuizScoresCount++;
        });
      }
    });

    const avgProgress = enrolledCourseIds.length > 0 ? Math.round(overallProgressSum / enrolledCourseIds.length) : 0;
    const avgQuizScore = totalQuizScoresCount > 0 ? Math.round(sumQuizScores / totalQuizScoresCount) : 0;

    return {
      enrolledCount: enrolledCourseIds.length,
      completedCoursesCount: totalCompletedCourses,
      inProgressCount: Math.max(0, enrolledCourseIds.length - totalCompletedCourses),
      avgProgress: avgProgress,
      totalLessonsDone: totalLessonsDone,
      totalTasksDone: totalTasksDone,
      pendingTasksCount: totalPendingTasks,
      avgQuizScore: avgQuizScore,
      certificatesEarned: totalCompletedCourses,
      learningHours: (totalLessonsDone * 0.75 + totalTasksDone * 0.5).toFixed(1)
    };
  }

  /**
   * Renders the complete, modern, attractive blue-purple student dashboard
   */
  function renderDashboardUI(filter = "all") {
    const container = document.getElementById("dashboard-content-area");
    if (!container) return;

    const user = AuthModule.getCurrentUser();
    if (!user) {
      container.innerHTML = `
        <div class="text-center py-20 bg-slate-900/80 rounded-3xl border border-indigo-500/20 p-8 shadow-2xl max-w-xl mx-auto space-y-4">
          <div class="w-16 h-16 mx-auto bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl border border-indigo-400/30">
            <svg class="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-black text-white">Student Dashboard Access</h2>
          <p class="text-slate-400 text-xs md:text-sm leading-relaxed">
            Please log in or register with Two-Step Verification to track your YouTube tutorials, coding tasks, quiz scores, and verified certificates.
          </p>
          <div class="pt-2">
            <button onclick="App.openAuthModal('login')" class="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs md:text-sm shadow-xl shadow-indigo-600/30 hover:opacity-95 transition-all">
              Sign In / Sign Up (2FA)
            </button>
          </div>
        </div>
      `;
      return;
    }

    const stats = getOverallDashboardStats();
    const allProgress = getAllUserProgress();
    const enrolledCourseIds = Object.keys(allProgress);

    // Filter enrolled courses
    const filteredCourseIds = enrolledCourseIds.filter(cId => {
      const prog = calculateCourseProgress(cId, allProgress[cId]);
      if (filter === "completed") return prog.isFinished;
      if (filter === "inprogress") return !prog.isFinished;
      return true;
    });

    // Recent notifications from module
    const recentNotifications = typeof NotificationModule !== "undefined" ? NotificationModule.getNotifications().slice(0, 3) : [];

    // Recommended free learning resources
    const freeResources = [
      { title: "Official Python 3 Documentation", url: "https://docs.python.org/3/tutorial/", tag: "Python" },
      { title: "Oracle Java dev.java Hub", url: "https://dev.java/learn/", tag: "Java" },
      { title: "MDN Web Docs (HTML/CSS & JS)", url: "https://developer.mozilla.org/en-US/", tag: "Web" },
      { title: "W3Schools Interactive Reference", url: "https://www.w3schools.com/", tag: "All Stacks" },
      { title: "SQLBolt Interactive SQL Lessons", url: "https://sqlbolt.com/", tag: "SQL" }
    ];

    let myCoursesHtml = "";
    if (filteredCourseIds.length === 0) {
      myCoursesHtml = `
        <div class="col-span-full text-center py-12 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 p-8">
          <p class="text-slate-400 text-sm mb-3">You are not currently enrolled in any courses in this filter.</p>
          <button onclick="App.navigateTo('courses')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition-all shadow-md">
            Explore Course Catalog
          </button>
        </div>
      `;
    } else {
      myCoursesHtml = filteredCourseIds.map(cId => {
        const course = getCourseById(cId);
        if (!course) return "";
        const prog = calculateCourseProgress(cId, allProgress[cId]);

        return `
          <div class="bg-slate-900 rounded-2xl border border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            
            <!-- Banner -->
            <div class="h-32 bg-gradient-to-r ${course.bannerGradient} p-5 flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between z-10">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  ${course.category}
                </span>
                <span class="text-xs text-white/90 font-medium bg-black/30 px-2 py-0.5 rounded-full">
                  ${course.level}
                </span>
              </div>
              <h3 class="text-white font-bold text-base leading-tight drop-shadow-sm z-10 line-clamp-1">${course.title}</h3>
            </div>

            <!-- Body -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              
              <!-- Progress Tracker -->
              <div>
                <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Progress (${prog.completedCount}/${prog.totalCount} milestones)</span>
                  <span class="font-bold ${prog.isFinished ? 'text-emerald-400' : 'text-indigo-400'}">${prog.percent}%</span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500 ${prog.isFinished ? 'bg-emerald-400' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}" style="width: ${prog.percent}%"></div>
                </div>
              </div>

              <!-- Metrics Mini Grid -->
              <div class="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center text-[11px]">
                <div>
                  <span class="text-slate-400 block text-[10px]">Lessons</span>
                  <span class="font-bold text-slate-200">${prog.lessonsDone}/${prog.totalLessons}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[10px]">Tasks</span>
                  <span class="font-bold text-slate-200">${prog.tasksDone}/${prog.totalTasks}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[10px]">Quizzes</span>
                  <span class="font-bold ${prog.quizzesPassed === prog.totalQuizzes ? 'text-emerald-400' : 'text-amber-400'}">${prog.quizzesPassed}/${prog.totalQuizzes}</span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="pt-1 grid grid-cols-2 gap-2">
                <button onclick="ClassroomModule.launchCourse('${course.id}')" class="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center space-x-1 cursor-pointer">
                  <span>${prog.percent === 0 ? 'Start Course' : 'Continue Learning'}</span>
                  <span>▶</span>
                </button>

                ${prog.isFinished ? `
                  <button onclick="CertificateModule.openCertificateModal('${course.id}')" class="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center space-x-1 animate-pulse cursor-pointer">
                    <span>🏆</span>
                    <span>View Certificate</span>
                  </button>
                ` : `
                  <button onclick="CertificateModule.showLockedHint('${course.title}', ${prog.percent})" class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-400 font-medium text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer" title="Complete all lessons, tasks, and pass final assessment to unlock">
                    <span>🔒</span>
                    <span>Certificate Locked</span>
                  </button>
                `}
              </div>

            </div>

          </div>
        `;
      }).join("");
    }

    container.innerHTML = `
      <!-- 1. Welcome Back Banner (Generic User-Circle Icon - No hardcoded Alex) -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-6 md:p-8 text-white shadow-2xl mb-8 border border-indigo-500/20">
        <div class="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center space-x-4">
            <!-- Simple generic user-circle icon -->
            <div class="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-lg">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h1 class="text-xl md:text-2xl font-black tracking-tight">Welcome back!</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">Student Dashboard</span>
              </div>
              <p class="text-slate-400 text-xs md:text-sm mt-0.5">Track your real YouTube tutorial progress, coding assignments, quiz scores, and verified credentials.</p>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center space-x-3">
            <button onclick="App.navigateTo('courses')" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-all">
              Explore Courses
            </button>
            <button onclick="DashboardModule.resumeMostRecentCourse()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-md transition-all">
              Continue Learning →
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Core Metrics Summary Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        
        <!-- Overall Progress -->
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-1">
          <span class="text-xs text-slate-400 font-medium">Overall Progress</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-indigo-400">${stats.avgProgress}%</span>
            <span class="text-[10px] text-slate-500">avg across courses</span>
          </div>
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div class="h-full bg-indigo-500 rounded-full" style="width: ${stats.avgProgress}%"></div>
          </div>
        </div>

        <!-- Enrolled Courses -->
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-1">
          <span class="text-xs text-slate-400 font-medium">My Courses</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-white">${stats.enrolledCount}</span>
            <span class="text-[10px] text-slate-500">enrolled</span>
          </div>
          <span class="text-[10px] text-slate-400 block">${stats.inProgressCount} in progress</span>
        </div>

        <!-- Completed Courses -->
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-1">
          <span class="text-xs text-slate-400 font-medium">Completed Courses</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-emerald-400">${stats.completedCoursesCount}</span>
            <span class="text-[10px] text-slate-500">100% finished</span>
          </div>
          <span class="text-[10px] text-slate-400 block">All criteria satisfied</span>
        </div>

        <!-- Pending Assignments -->
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-1">
          <span class="text-xs text-slate-400 font-medium">Pending Tasks</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-amber-400">${stats.pendingTasksCount}</span>
            <span class="text-[10px] text-slate-500">coding drills</span>
          </div>
          <span class="text-[10px] text-slate-400 block">${stats.totalTasksDone} submitted</span>
        </div>

        <!-- Quiz Scores -->
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-1">
          <span class="text-xs text-slate-400 font-medium">Average Quiz Score</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-purple-400">${stats.avgQuizScore}%</span>
            <span class="text-[10px] text-slate-500">min 70% passing</span>
          </div>
          <span class="text-[10px] text-slate-400 block">Smart timed evaluations</span>
        </div>

      </div>

      <!-- 3. Main Dashboard 2-Column Content (Left: Courses, Right: Notifications & Resources) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: My Courses & Filter (8 Cols) -->
        <div class="lg:col-span-8 space-y-6">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-white">My Courses & Learning Tracks</h2>
              <p class="text-xs text-slate-400">Select any program to continue your lessons, coding tasks, or assessments.</p>
            </div>

            <!-- Filter tabs -->
            <div class="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
              <button onclick="DashboardModule.renderDashboardUI('all')" class="px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}">All (${enrolledCourseIds.length})</button>
              <button onclick="DashboardModule.renderDashboardUI('inprogress')" class="px-3 py-1.5 rounded-lg transition-all ${filter === 'inprogress' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}">In Progress (${stats.inProgressCount})</button>
              <button onclick="DashboardModule.renderDashboardUI('completed')" class="px-3 py-1.5 rounded-lg transition-all ${filter === 'completed' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}">Completed (${stats.completedCoursesCount})</button>
            </div>
          </div>

          <!-- Courses Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${myCoursesHtml}
          </div>

        </div>

        <!-- Right Column: Notifications & Free Learning Resources (4 Cols) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Recent Notifications Card -->
          <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 class="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <span>🔔</span>
                <span>Recent Milestone Notifications</span>
              </h3>
              <button onclick="NotificationModule.toggleNotificationPanel()" class="text-[11px] text-indigo-400 hover:underline">View All</button>
            </div>

            <div class="space-y-2">
              ${recentNotifications.length === 0 ? `
                <p class="text-xs text-slate-500 py-3 text-center">Complete lessons to trigger genuine milestone alerts.</p>
              ` : recentNotifications.map(n => `
                <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <p class="leading-snug">${n.text}</p>
                  <span class="text-[10px] text-slate-500 block mt-1">${n.time}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Earned Certificates Card -->
          <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 class="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <span>🏆</span>
                <span>Earned Certificates</span>
              </h3>
              <span class="text-xs font-bold text-emerald-400">${stats.certificatesEarned} Unlocked</span>
            </div>

            ${stats.certificatesEarned === 0 ? `
              <div class="p-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-400 space-y-1">
                <span class="text-xl block">🔒</span>
                <p class="font-semibold text-slate-300">No certificates unlocked yet</p>
                <p class="text-[11px] text-slate-500 leading-relaxed">Certificates unlock strictly after completing all tutorials, passing coding tasks, and scoring ≥70% on the final assessment.</p>
              </div>
            ` : `
              <div class="space-y-2">
                ${enrolledCourseIds.filter(cId => {
                  const prog = calculateCourseProgress(cId, allProgress[cId]);
                  return prog.isFinished;
                }).map(cId => {
                  const course = getCourseById(cId);
                  return `
                    <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <h4 class="text-xs font-bold text-white">${course ? course.shortTitle : 'Course'}</h4>
                        <span class="text-[10px] text-amber-300 font-semibold">Verified Credential</span>
                      </div>
                      <button onclick="CertificateModule.openCertificateModal('${cId}')" class="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] shadow-sm">
                        View
                      </button>
                    </div>
                  `;
                }).join("")}
              </div>
            `}
          </div>

          <!-- Recommended Free Learning Resources -->
          <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm space-y-3">
            <h3 class="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-800">
              <span>📚</span>
              <span>Recommended Free Learning Resources</span>
            </h3>

            <div class="space-y-2">
              ${freeResources.map(res => `
                <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300 transition-colors group">
                  <span class="truncate pr-2">${res.title}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/50">${res.tag} ↗</span>
                </a>
              `).join("")}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  function resumeMostRecentCourse() {
    const all = getAllUserProgress();
    const enrolledIds = Object.keys(all);
    if (enrolledIds.length > 0) {
      ClassroomModule.launchCourse(enrolledIds[0]);
    } else {
      App.navigateTo("courses");
    }
  }

  return {
    getAllUserProgress,
    getUserCourseProgress,
    isEnrolled,
    enrollInCourse,
    markLessonComplete,
    toggleLessonCompletion,
    markTaskComplete,
    saveQuizScore,
    getOverallDashboardStats,
    renderDashboardUI,
    resumeMostRecentCourse
  };
})();
