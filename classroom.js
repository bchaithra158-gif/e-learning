/**
 * LearnSphere E-Learning Platform - Interactive Classroom, Tutorial Player & Smart Quiz Engine
 * Integrates real YouTube tutorial options, in-browser code editor, smart timed quizzes, and dynamic curriculum.
 */

const ClassroomModule = (function () {
  let activeCourse = null;
  let activeModuleIndex = 0;
  let activeLessonIndex = 0;
  let activeTab = "tutorials"; // 'tutorials', 'tasks', 'quiz', 'resources'
  let selectedTutorialId = null;

  // Smart Quiz Countdown Timer
  let quizTimerInterval = null;
  let quizSecondsRemaining = 60;
  let activeQuizAnswers = {};

  function launchCourse(courseId, initialLessonId = null) {
    const course = getCourseById(courseId);
    if (!course) {
      App.showToast("Course not found.", "error");
      return;
    }

    if (!DashboardModule.isEnrolled(courseId)) {
      DashboardModule.enrollInCourse(courseId);
    }

    activeCourse = course;

    // Default tutorial selection
    if (course.tutorialOptions && course.tutorialOptions.length > 0) {
      selectedTutorialId = course.tutorialOptions[0].id;
    }

    // Determine starting lesson
    if (initialLessonId) {
      findLessonIndices(initialLessonId);
    } else {
      const userProg = DashboardModule.getUserCourseProgress(courseId);
      if (userProg && userProg.lastAccessedLesson) {
        findLessonIndices(userProg.lastAccessedLesson);
      } else {
        activeModuleIndex = 0;
        activeLessonIndex = 0;
      }
    }

    App.switchMainView("classroom-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderClassroom();
  }

  function findLessonIndices(lessonId) {
    if (!activeCourse) return;
    for (let m = 0; m < activeCourse.modules.length; m++) {
      for (let l = 0; l < activeCourse.modules[m].lessons.length; l++) {
        if (activeCourse.modules[m].lessons[l].id === lessonId) {
          activeModuleIndex = m;
          activeLessonIndex = l;
          return;
        }
      }
    }
    activeModuleIndex = 0;
    activeLessonIndex = 0;
  }

  function getCurrentLesson() {
    if (!activeCourse) return null;
    const mod = activeCourse.modules[activeModuleIndex];
    if (!mod) return null;
    return mod.lessons[activeLessonIndex] || null;
  }

  function switchLesson(mIndex, lIndex) {
    if (!activeCourse) return;
    activeModuleIndex = mIndex;
    activeLessonIndex = lIndex;

    const lesson = getCurrentLesson();
    if (!lesson) return;

    // Update user's last accessed lesson
    const all = DashboardModule.getAllUserProgress();
    if (all[activeCourse.id]) {
      all[activeCourse.id].lastAccessedLesson = lesson.id;
      localStorage.setItem("learnsphere_progress_" + (AuthModule.getCurrentUser()?.id || "guest"), JSON.stringify(all));
    }

    renderClassroom();
  }

  function renderClassroom() {
    const container = document.getElementById("classroom-view-content");
    if (!container || !activeCourse) return;

    const currentMod = activeCourse.modules[activeModuleIndex];
    const currentLesson = currentMod ? currentMod.lessons[activeLessonIndex] : null;
    const userProg = DashboardModule.getUserCourseProgress(activeCourse.id) || { completedLessons: [], completedTasks: [], quizScores: {} };
    const progress = calculateCourseProgress(activeCourse.id, userProg);

    if (!currentLesson) return;

    // Pick active tutorial option
    const activeTutorial = (activeCourse.tutorialOptions || []).find(t => t.id === selectedTutorialId) || (activeCourse.tutorialOptions && activeCourse.tutorialOptions[0]);

    container.innerHTML = `
      <!-- Top Sticky Progress Tracker Bar -->
      <div class="bg-slate-900/95 border-b border-slate-800 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30 shadow-lg backdrop-blur-md text-white">
        
        <div class="flex items-center space-x-3.5">
          <button onclick="App.navigateTo('dashboard')" class="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer">
            <span>â†</span>
            <span>Dashboard</span>
          </button>
          <button onclick="App.navigateTo('courses')" class="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer">
            <span>📚</span>
            <span class="hidden sm:inline">Courses</span>
          </button>
          
          <div class="h-4 w-px bg-slate-700 hidden sm:block"></div>
          
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-xs font-medium text-indigo-400 block">${activeCourse.shortTitle}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-400/30">${currentMod.level}</span>
            </div>
            <h1 class="text-sm md:text-base font-bold text-white leading-tight truncate max-w-xs md:max-w-md">${currentLesson.title}</h1>
          </div>
        </div>

        <!-- Overall Progress Tracker & Certificate Unlock Button -->
        <div class="flex items-center space-x-4">
          <div class="flex flex-col items-end">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-bold text-slate-200">${progress.percent}% Complete</span>
              <span class="text-[10px] text-slate-400">(${progress.completedCount}/${progress.totalCount} Requirements)</span>
            </div>
            <div class="w-28 md:w-44 bg-slate-800 h-2 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500" style="width: ${progress.percent}%"></div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            ${progress.atLeastOneLesson ? `
              <button onclick="FinalTestModule.openFinalTest('${activeCourse.id}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 text-white font-bold text-xs shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer">
                <span>🎯</span>
                <span>Final Test</span>
              </button>
            ` : ``}
            ${progress.isFinished ? `
              <button onclick="CertificateModule.openCertificateModal('${activeCourse.id}')" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all flex items-center space-x-1.5 animate-pulse cursor-pointer">
                <span>ðŸ†</span>
                <span>Claim Certificate</span>
              </button>
            ` : `
              <button onclick="CertificateModule.showLockedHint('${activeCourse.title}', ${progress.percent}, false, ${progress.lessonsDone || 0})" class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 font-medium text-xs flex items-center space-x-1 hover:bg-slate-700/60 transition-colors cursor-pointer">
                <span>ðŸ”’</span>
                <span class="hidden sm:inline">Certificate Locked</span>
              </button>
            `}
          </div>
        </div>

      </div>

      <!-- Main Classroom Layout Grid -->
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Left Main Stage: Video / Tutorial Player & Tabs (8 Cols) -->
          <div class="lg:col-span-8 space-y-5">
            
            <!-- Video Player Viewport Container -->
            <div class="custom-player-wrapper shadow-2xl" id="player-container">
              ${renderTutorialPlayerStage(activeTutorial, currentLesson)}
            </div>

            <!-- Tutorial Selector Toolbar -->
            <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 shadow-md">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">Real YouTube Tutorial Options</span>
                  <p class="text-xs text-slate-300">Choose your preferred educator/channel for this curriculum:</p>
                </div>
                <span class="text-[11px] text-slate-400 font-medium">4 Verified Tutorial Options</span>
              </div>

              <!-- Tutorial Option Chips -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                ${(activeCourse.tutorialOptions || []).map(tut => {
                  const isSelected = tut.id === (activeTutorial ? activeTutorial.id : "");
                  return `
                    <div onclick="ClassroomModule.selectTutorial('${tut.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isSelected ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-md' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'}">
                      <div class="truncate pr-2">
                        <span class="text-xs font-bold block truncate">${tut.channel}</span>
                        <span class="text-[10px] text-slate-400 truncate block">${tut.title}</span>
                      </div>
                      <span class="text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}">${tut.level}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Action Bar (Prev / Next & Mark Lesson Complete) -->
            <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div class="flex items-center space-x-2.5">
                <button onclick="ClassroomModule.navigatePrevLesson()" class="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer">
                  â† Previous Lesson
                </button>
                <button onclick="ClassroomModule.navigateNextLesson()" class="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer">
                  Next Lesson â†’
                </button>
              </div>

              <div>
                ${(userProg.completedLessons || []).includes(currentLesson.id) ? `
                  <button onclick="ClassroomModule.toggleLessonCheckmark('${currentLesson.id}')" class="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-950/60 text-emerald-400 font-bold text-xs border border-emerald-800/80 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/80 transition-all cursor-pointer">
                    <span>âœ“ Lesson Completed</span>
                    <span class="text-[10px] text-slate-400">(Click to undo)</span>
                  </button>
                ` : `
                  <button onclick="ClassroomModule.handleCompleteLesson('${currentLesson.id}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 cursor-pointer">
                    <span>âœ“</span>
                    <span>Mark Lesson Complete & Next â†’</span>
                  </button>
                `}
              </div>
            </div>

            <!-- Content Tabs Bar -->
            <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
              <div class="flex border-b border-slate-800 px-4 pt-2 overflow-x-auto">
                <button onclick="ClassroomModule.setTab('tutorials')" class="px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${activeTab === 'tutorials' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}">
                  ðŸ“º Video & Reading Overview
                </button>
                <button onclick="ClassroomModule.setTab('tasks')" class="px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${activeTab === 'tasks' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}">
                  ðŸ’» Practical Coding Task (${(currentMod.tasks || []).length} Exercises)
                </button>
                <button onclick="ClassroomModule.setTab('quiz')" class="px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${activeTab === 'quiz' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}">
                  ðŸ§  Smart Module Quiz (Timed)
                </button>
                <button onclick="ClassroomModule.setTab('resources')" class="px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all ${activeTab === 'resources' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}">
                  ðŸ“š Free Docs & Reading
                </button>
              </div>

              <!-- Tab Body -->
              <div class="p-6">
                ${renderActiveTabContent(currentMod, currentLesson, userProg)}
              </div>
            </div>

          </div>

          <!-- Right Sidebar: Course Curriculum with Interactive Checkmarks (4 Cols) -->
          <div class="lg:col-span-4 space-y-4">
            <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg sticky top-36">
              
              <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <h3 class="font-bold text-white text-base">Course Curriculum</h3>
                  <span class="text-xs text-slate-400">${activeCourse.totalModules} Modules â€¢ ${activeCourse.totalLessons} Lessons</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/80">
                  ${progress.completedCount}/${progress.totalCount} Done
                </span>
              </div>

              <!-- Module List Accordion -->
              <div class="space-y-3 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
                ${renderModulesCurriculum(userProg)}
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }

  function renderTutorialPlayerStage(tutorial, lesson) {
    if (!tutorial) {
      return `<div class="p-8 text-center text-slate-400 text-sm">Tutorial source loading...</div>`;
    }

    const videoId = tutorial.youtubeId || "eWRfhZUzrAc";
    const watchUrl = tutorial.watchUrl || `https://www.youtube.com/watch?v=${videoId}`;

    return `
      <!-- Embedded Real YouTube Video Player -->
      <iframe 
        id="classroom-youtube-iframe"
        class="custom-video-iframe"
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        title="${tutorial.title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>

      <!-- Top Overlay Bar with Channel and External Watch Link -->
      <div class="player-controls-bar !p-3 flex !flex-row items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">YouTube</span>
          <span class="text-xs font-bold text-white truncate max-w-xs">${tutorial.channel} â€” ${tutorial.title}</span>
        </div>
        <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center space-x-1">
          <span>Watch on YouTube</span>
          <span>â†—</span>
        </a>
      </div>
    `;
  }

  function selectTutorial(tutId) {
    selectedTutorialId = tutId;
    renderClassroom();
  }

  function renderModulesCurriculum(userProg) {
    if (!activeCourse) return "";
    const completedList = userProg.completedLessons || [];

    return activeCourse.modules.map((mod, mIndex) => {
      const isCurrentMod = mIndex === activeModuleIndex;
      const modLessonsDone = mod.lessons.filter(l => completedList.includes(l.id)).length;
      const isModComplete = modLessonsDone === mod.lessons.length && mod.lessons.length > 0;

      return `
        <div class="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <div onclick="ClassroomModule.toggleModuleAccordion(${mIndex})" class="w-full p-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left transition-colors cursor-pointer">
            <div class="flex items-center space-x-2.5">
              <span class="text-xs font-bold text-indigo-400">${mIndex + 1}</span>
              <div>
                <h4 class="text-xs font-bold text-slate-100 leading-snug">${mod.title}</h4>
                <span class="text-[10px] text-slate-400">${mod.duration} â€¢ ${modLessonsDone}/${mod.lessons.length} done</span>
              </div>
            </div>
            <span class="text-xs font-bold ${isModComplete ? 'text-emerald-400' : 'text-slate-400'}">
              ${isModComplete ? 'âœ“' : 'â–¾'}
            </span>
          </div>

          <!-- Module Lessons List -->
          <div id="module-accordion-${mIndex}" class="divide-y divide-slate-800/60 ${isCurrentMod ? 'block' : 'hidden'}">
            ${mod.lessons.map((lesson, lIndex) => {
              const isActive = mIndex === activeModuleIndex && lIndex === activeLessonIndex;
              const isDone = completedList.includes(lesson.id);

              return `
                <div 
                  onclick="ClassroomModule.switchLesson(${mIndex}, ${lIndex})" 
                  class="p-3 flex items-center justify-between cursor-pointer transition-all hover:bg-slate-800/50 ${isActive ? 'lesson-item-active' : ''}">
                  
                  <div class="flex items-center space-x-2.5 flex-1 pr-2">
                    ${isActive ? `<div class="active-pulse-dot"></div>` : `<span class="text-xs text-slate-500">â–¶</span>`}
                    <div class="flex-1">
                      <p class="text-xs font-medium ${isActive ? 'text-indigo-300 font-bold' : 'text-slate-200'} leading-snug line-clamp-1">${lesson.title}</p>
                      <span class="text-[10px] text-slate-500">â±ï¸ ${lesson.duration}</span>
                    </div>
                  </div>

                  <!-- Clickable Checkmark Button -->
                  <div>
                    <button 
                      type="button"
                      onclick="event.stopPropagation(); ClassroomModule.toggleLessonCheckmark('${lesson.id}')"
                      class="lesson-check-btn ${isDone ? 'checked' : ''}"
                      title="${isDone ? 'Mark Incomplete' : 'Click to Mark Complete'}">
                      âœ“
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  function toggleModuleAccordion(mIndex) {
    const el = document.getElementById(`module-accordion-${mIndex}`);
    if (el) el.classList.toggle("hidden");
  }

  function setTab(tabName) {
    activeTab = tabName;
    renderClassroom();
  }

  function renderActiveTabContent(mod, lesson, userProg) {
    if (activeTab === "tutorials") {
      return `
        <div class="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">${mod.title}</span>
              <h3 class="text-base md:text-lg font-bold text-white mt-1">${lesson.title}</h3>
            </div>
            <span class="text-xs text-slate-400">Duration: ${lesson.duration}</span>
          </div>

          <p class="text-slate-200">${lesson.summary}</p>

          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 class="font-bold text-white text-xs uppercase tracking-wider text-indigo-400">Curated Learning Path</h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              Students learn best by watching top educators. Use the YouTube options above to stream your favorite creator, then proceed to the <strong>Practical Coding Tasks</strong> tab to write code and test your skills.
            </p>
          </div>
        </div>
      `;
    }

    if (activeTab === "tasks") {
      const tasks = mod.tasks || [];
      if (tasks.length === 0) {
        return `
          <div class="text-center py-8 text-slate-400 text-xs md:text-sm">
            <p>No coding tasks assigned to this module. Proceed with lessons and the smart quiz!</p>
          </div>
        `;
      }

      const completedTasks = userProg.completedTasks || [];

      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Practical Hands-on Exercises</span>
              <h3 class="text-base font-bold text-white mt-0.5">Interactive Coding Tasks</h3>
            </div>
            <span class="text-xs text-slate-400">${tasks.filter(t => completedTasks.includes(t.id)).length} of ${tasks.length} Completed</span>
          </div>

          <!-- Tasks List with Interactive In-Browser Code Runner -->
          <div class="space-y-5">
            ${tasks.map((task, tIdx) => {
              const isTaskDone = completedTasks.includes(task.id);
              return `
                <div class="p-5 rounded-2xl border ${isTaskDone ? 'border-emerald-800/80 bg-emerald-950/15' : 'border-slate-800 bg-slate-950/60'} space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-bold px-2 py-0.5 rounded-md ${isTaskDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-300'}">Exercise ${tIdx + 1}</span>
                      <h4 class="font-bold text-white text-sm">${task.title}</h4>
                    </div>
                    ${isTaskDone ? `<span class="text-xs text-emerald-400 font-bold flex items-center space-x-1"><span>âœ“</span><span>Completed</span></span>` : `<span class="text-xs text-amber-400 font-semibold">Pending</span>`}
                  </div>

                  <p class="text-xs text-slate-300 leading-relaxed">${task.instructions}</p>
                  
                  <div class="text-[11px] text-slate-400 bg-black/40 p-2.5 rounded-xl border border-slate-800/80 font-mono">
                    <span class="text-slate-500 block">Expected Result:</span>
                    <span class="text-emerald-300">${task.expectedOutput}</span>
                  </div>

                  <!-- In-Browser Code Editor -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Code Editor</span>
                      <button onclick="document.getElementById('code-input-${task.id}').value = '${task.starterCode.replace(/\n/g, '\\n').replace(/'/g, "\\'")}'" class="text-indigo-400 hover:underline">Reset Code</button>
                    </div>
                    <textarea id="code-input-${task.id}" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">${task.starterCode}</textarea>
                  </div>

                  <!-- Feedback box -->
                  <div id="task-feedback-${task.id}" class="hidden p-3 rounded-xl text-xs font-mono"></div>

                  <!-- Actions -->
                  <div class="flex items-center justify-between pt-1">
                    <span class="text-[11px] text-slate-500">Auto-validated with test assertions</span>
                    <button onclick="ClassroomModule.submitCodingTask('${task.id}')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer">
                      Run & Submit Answer âž”
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    if (activeTab === "quiz") {
      const quiz = mod.quiz;
      if (!quiz) {
        return `
          <div class="text-center py-8 text-slate-400 text-xs md:text-sm">
            <p>No quiz configured for this module.</p>
          </div>
        `;
      }

      const existingScore = (userProg.quizScores || {})[quiz.id];

      return `
        <div class="space-y-5" id="smart-quiz-wrapper">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <span class="text-xs font-semibold text-purple-400 uppercase tracking-wider">${quiz.isFinalAssessment ? 'Final Course Assessment' : 'Smart Module Evaluation'}</span>
              <h3 class="text-base font-bold text-white mt-0.5">${quiz.title}</h3>
              <p class="text-xs text-slate-400">Passing score required: <strong>${quiz.passingScore || 70}%</strong></p>
            </div>

            <!-- Quiz Status / Countdown Timer -->
            <div class="flex items-center space-x-3">
              ${existingScore !== undefined ? `
                <div class="px-3 py-1.5 rounded-xl ${existingScore >= 70 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'} text-xs font-bold text-center">
                  Score: ${existingScore}% ${existingScore >= 70 ? 'âœ“ Passed' : 'âŒ Needs 70%'}
                </div>
              ` : ''}
              
              <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs">
                <span class="text-slate-400 text-[10px] block">Time Left</span>
                <span id="quiz-countdown-display" class="font-bold text-amber-400">${quizSecondsRemaining}s</span>
              </div>
            </div>
          </div>

          <!-- Questions Container -->
          <div class="space-y-6 pt-2" id="quiz-questions-list">
            ${quiz.questions.map((q, qIdx) => `
              <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <p class="text-xs md:text-sm font-semibold text-slate-100">
                  <span class="text-indigo-400 font-bold mr-1">${qIdx + 1}.</span> ${q.question}
                </p>

                <div class="space-y-2">
                  ${q.options.map((opt, optIdx) => `
                    <label class="flex items-center space-x-3 p-3 rounded-xl border border-slate-800 hover:border-indigo-500 cursor-pointer transition-all bg-slate-900/60 text-xs text-slate-200">
                      <input type="radio" name="quiz_q_${qIdx}" value="${optIdx}" onchange="ClassroomModule.onQuizOptionSelected(${qIdx}, ${optIdx})" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                      <span>${opt}</span>
                    </label>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <div id="quiz-results-banner" class="hidden p-4 rounded-xl text-xs space-y-2"></div>

          <!-- Submit / Retry -->
          <div class="flex items-center justify-between pt-2">
            <button onclick="ClassroomModule.startQuizTimer(${quiz.timeLimitSeconds || 60})" class="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300">
              â†º Reset Timer
            </button>

            <button onclick="ClassroomModule.submitSmartQuiz('${quiz.id}')" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer">
              Submit Quiz for Grading âž”
            </button>
          </div>
        </div>
      `;
    }

    if (activeTab === "resources") {
      const resources = activeCourse.readingResources || [];
      return `
        <div class="space-y-4">
          <div class="pb-2 border-b border-slate-800">
            <h3 class="text-base font-bold text-white">Recommended Free Reading & Documentation</h3>
            <p class="text-xs text-slate-400">Official, trusted documentation and interactive tutorials.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            ${resources.map(res => `
              <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 transition-all flex items-center justify-between group">
                <div>
                  <h4 class="text-xs font-bold text-white group-hover:text-indigo-400">${res.title}</h4>
                  <span class="text-[10px] text-slate-400 block mt-0.5">${res.url}</span>
                </div>
                <span class="text-indigo-400 text-sm">â†—</span>
              </a>
            `).join("")}
          </div>
        </div>
      `;
    }

    return "";
  }

  function submitCodingTask(taskId) {
    if (!activeCourse) return;
    const currentMod = activeCourse.modules[activeModuleIndex];
    const task = (currentMod.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    const inputEl = document.getElementById(`code-input-${taskId}`);
    const feedbackEl = document.getElementById(`task-feedback-${taskId}`);
    if (!inputEl || !feedbackEl) return;

    const result = CodeRunner.evaluateTask(task, inputEl.value);
    feedbackEl.classList.remove("hidden");

    if (result.success) {
      feedbackEl.className = "p-3 rounded-xl text-xs font-mono bg-emerald-950/60 border border-emerald-800 text-emerald-300";
      feedbackEl.innerHTML = `<strong>${result.message}</strong><br><span class="text-[10px] text-emerald-400">Output: ${result.output}</span>`;
      
      DashboardModule.markTaskComplete(activeCourse.id, taskId);
      App.showToast("âœ“ Coding task passed! (+30 XP)", "success");
      
      // Re-render curriculum to show progress update
      renderClassroom();
    } else {
      feedbackEl.className = "p-3 rounded-xl text-xs font-mono bg-rose-950/60 border border-rose-800 text-rose-300";
      feedbackEl.innerHTML = `<strong>${result.message}</strong><br><span class="text-[10px] text-rose-400">Output: ${result.output || 'Test failed'}</span>`;
    }
  }

  function startQuizTimer(seconds = 60) {
    clearInterval(quizTimerInterval);
    quizSecondsRemaining = seconds;
    const display = document.getElementById("quiz-countdown-display");
    if (display) display.textContent = `${quizSecondsRemaining}s`;

    quizTimerInterval = setInterval(() => {
      quizSecondsRemaining--;
      const disp = document.getElementById("quiz-countdown-display");
      if (disp) disp.textContent = `${quizSecondsRemaining}s`;

      if (quizSecondsRemaining <= 0) {
        clearInterval(quizTimerInterval);
        App.showToast("â° Time is up! Submitting quiz for grading...", "info");
        const currentMod = activeCourse.modules[activeModuleIndex];
        if (currentMod && currentMod.quiz) {
          submitSmartQuiz(currentMod.quiz.id);
        }
      }
    }, 1000);
  }

  function onQuizOptionSelected(qIdx, optIdx) {
    activeQuizAnswers[qIdx] = optIdx;
  }

  function submitSmartQuiz(quizId) {
    clearInterval(quizTimerInterval);
    if (!activeCourse) return;
    const currentMod = activeCourse.modules[activeModuleIndex];
    const quiz = currentMod.quiz;
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q, qIdx) => {
      if (activeQuizAnswers[qIdx] === q.answerIndex) {
        correctCount++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= (quiz.passingScore || 70);

    const banner = document.getElementById("quiz-results-banner");
    if (banner) {
      banner.classList.remove("hidden");
      if (passed) {
        banner.className = "p-4 rounded-xl text-xs space-y-2 bg-emerald-950/70 border border-emerald-800 text-emerald-300";
        banner.innerHTML = `
          <strong>ðŸŽ‰ Congratulations! You Passed!</strong><br>
          Score: ${scorePercent}% (${correctCount}/${totalQuestions} correct). Required: 70%.<br>
          <span class="text-[11px] text-emerald-400">Great mastery of the module concepts!</span>
        `;
        if (typeof confetti === "function") {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
        }
      } else {
        banner.className = "p-4 rounded-xl text-xs space-y-2 bg-rose-950/70 border border-rose-800 text-rose-300";
        banner.innerHTML = `
          <strong>âŒ Score: ${scorePercent}% (${correctCount}/${totalQuestions} correct)</strong><br>
          Passing threshold is 70%. Review the module tutorials and click 'Reset Timer' to retry.
        `;
      }
    }

    DashboardModule.saveQuizScore(activeCourse.id, quiz.id, scorePercent);
  }

  function toggleLessonCheckmark(lessonId) {
    if (!activeCourse) return;
    DashboardModule.toggleLessonCompletion(activeCourse.id, lessonId);
    renderClassroom();
  }

  function handleCompleteLesson(lessonId) {
    if (!activeCourse) return;
    DashboardModule.markLessonComplete(activeCourse.id, lessonId);
    navigateNextLesson();
  }

  function navigateNextLesson() {
    if (!activeCourse) return;
    const currentMod = activeCourse.modules[activeModuleIndex];
    if (activeLessonIndex < currentMod.lessons.length - 1) {
      switchLesson(activeModuleIndex, activeLessonIndex + 1);
    } else if (activeModuleIndex < activeCourse.modules.length - 1) {
      switchLesson(activeModuleIndex + 1, 0);
    } else {
      App.showToast("You've reached the final lesson of this course!", "info");
      renderClassroom();
    }
  }

  function navigatePrevLesson() {
    if (!activeCourse) return;
    if (activeLessonIndex > 0) {
      switchLesson(activeModuleIndex, activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      const prevMod = activeCourse.modules[activeModuleIndex - 1];
      switchLesson(activeModuleIndex - 1, prevMod.lessons.length - 1);
    } else {
      App.showToast("You are on the first lesson.", "info");
    }
  }

  return {
    launchCourse,
    switchLesson,
    selectTutorial,
    toggleModuleAccordion,
    setTab,
    submitCodingTask,
    startQuizTimer,
    onQuizOptionSelected,
    submitSmartQuiz,
    toggleLessonCheckmark,
    handleCompleteLesson,
    navigateNextLesson,
    navigatePrevLesson
  };
})();
