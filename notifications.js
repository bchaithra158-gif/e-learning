/**
 * LearnSphere E-Learning Platform - Learning Milestones & Notification System
 * Tracks genuine milestone events, updates the notification bell, and displays unread history.
 */

const NotificationModule = (function () {

  function getStorageKey() {
    const user = AuthModule.getCurrentUser();
    return user ? `learnsphere_notifications_${user.id}` : "learnsphere_notifications_guest";
  }

  function getNotifications() {
    try {
      const data = localStorage.getItem(getStorageKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveNotifications(notifications) {
    localStorage.setItem(getStorageKey(), JSON.stringify(notifications));
    updateBellUI();
  }

  function addNotification(text, type = "info") {
    const notifications = getNotifications();
    
    // Prevent duplicate adjacent notification text within same minute
    if (notifications.length > 0 && notifications[0].text === text) {
      return;
    }

    const item = {
      id: "notif-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      text: text,
      type: type, // 'success', 'info', 'milestone', 'certificate'
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    notifications.unshift(item);
    // Keep last 30
    if (notifications.length > 30) notifications.length = 30;

    saveNotifications(notifications);
    App.showToast(text, type === "certificate" ? "success" : type);
  }

  function markAllAsRead() {
    const notifications = getNotifications();
    notifications.forEach(n => n.read = true);
    saveNotifications(notifications);
    renderNotificationPanel();
  }

  function getUnreadCount() {
    return getNotifications().filter(n => !n.read).length;
  }

  function updateBellUI() {
    const badge = document.getElementById("notification-unread-badge");
    const count = getUnreadCount();
    if (badge) {
      if (count > 0) {
        badge.textContent = count > 9 ? "9+" : count;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  }

  function toggleNotificationPanel() {
    const panel = document.getElementById("notification-dropdown-panel");
    if (!panel) return;

    if (panel.classList.contains("hidden")) {
      renderNotificationPanel();
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  }

  function renderNotificationPanel() {
    const container = document.getElementById("notification-list-container");
    const countEl = document.getElementById("notification-panel-unread-count");
    if (!container) return;

    const notifications = getNotifications();
    const unread = getUnreadCount();

    if (countEl) countEl.textContent = `${unread} new`;

    if (notifications.length === 0) {
      container.innerHTML = `
        <div class="py-8 text-center text-slate-400 text-xs">
          <span class="text-2xl block mb-1">🔔</span>
          No notifications yet. Complete lessons and quizzes to earn milestones!
        </div>
      `;
      return;
    }

    container.innerHTML = notifications.map(n => `
      <div class="p-3 rounded-xl transition-colors ${n.read ? 'bg-transparent text-slate-400' : 'bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-800 dark:text-slate-100 border border-indigo-200/50 dark:border-indigo-800/40'} space-y-1">
        <div class="flex items-start justify-between gap-2">
          <p class="text-xs font-semibold leading-snug">${n.text}</p>
          <span class="text-[10px] text-slate-400 whitespace-nowrap">${n.time}</span>
        </div>
      </div>
    `).join("");
  }

  // --- Specific Genuine Learning Milestone Triggers ---
  function triggerWelcome() {
    addNotification("Welcome to LearnSphere! Your learning journey starts today.", "info");
  }

  function triggerFirstLesson(courseTitle) {
    addNotification(`Great job! You have completed your first lesson in ${courseTitle}.`, "success");
  }

  function triggerStageReached(moduleTitle) {
    addNotification(`Yes! You have successfully reached this stage: ${moduleTitle}.`, "success");
  }

  function triggerQuizScore(score) {
    addNotification(`Excellent! Your quiz score is ${score}%.`, "success");
  }

  function triggerCourseHalfway(courseTitle) {
    addNotification(`Amazing progress! You have completed 50% of ${courseTitle}.`, "milestone");
  }

  function triggerAllRequirementsDone(courseTitle) {
    addNotification(`Congratulations! You have completed all course requirements for ${courseTitle}.`, "certificate");
  }

  function triggerCertificateUnlocked(courseTitle) {
    addNotification(`Your verified course certificate for ${courseTitle} is now unlocked!`, "certificate");
  }

  return {
    getNotifications,
    addNotification,
    markAllAsRead,
    getUnreadCount,
    updateBellUI,
    toggleNotificationPanel,
    renderNotificationPanel,
    // Milestones
    triggerWelcome,
    triggerFirstLesson,
    triggerStageReached,
    triggerQuizScore,
    triggerCourseHalfway,
    triggerAllRequirementsDone,
    triggerCertificateUnlocked
  };
})();

