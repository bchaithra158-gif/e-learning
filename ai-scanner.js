/**
 * SkillForge AI - AI Tools Scanner & Analyzer Module
 */

const AIScannerModule = (function () {
  let selectedCategory = "All";
  let selectedPricing = "All";
  let searchQuery = "";
  let bookmarkedTools = [];

  const STORAGE_KEY_BOOKMARKS = "skillforge_bookmarked_tools";

  function init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      bookmarkedTools = stored ? JSON.parse(stored) : ["tool-cursor", "tool-v0"];
    } catch (e) {
      bookmarkedTools = [];
    }
  }

  function toggleBookmark(toolId) {
    if (bookmarkedTools.includes(toolId)) {
      bookmarkedTools = bookmarkedTools.filter(id => id !== toolId);
      App.showToast("Removed from your saved tools", "info");
    } else {
      bookmarkedTools.push(toolId);
      App.showToast("Tool saved to your bookmarks!", "success");
    }
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedTools));
    renderToolsGrid();
  }

  function setCategory(cat) {
    selectedCategory = cat;
    renderCategoriesBar();
    renderToolsGrid();
  }

  function setPricing(pricing) {
    selectedPricing = pricing;
    renderToolsGrid();
  }

  function handleSearchInput(val) {
    searchQuery = val;
    renderToolsGrid();
  }

  function renderScannerView() {
    const container = document.getElementById("ai-scanner-view-content");
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-12">
        
        <!-- Scanner Hero Banner -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-12 text-white border border-indigo-500/20 shadow-2xl">
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 max-w-3xl space-y-4">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <span class="animate-pulse">⚡</span>
              <span>Autonomous AI Capability Scanner</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Scan & Discover the Next-Gen AI Ecosystem
            </h1>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Explore curated AI models, coding copilots, design engines, and research tools categorized by utility. Run intelligent workflow scans to pinpoint the highest-impact stack for your needs.
            </p>

            <!-- Scanner Search Form -->
            <div class="pt-4">
              <div class="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/10 dark:bg-slate-950/70 p-2 rounded-2xl border border-white/20 backdrop-blur-xl gap-2 shadow-inner">
                <div class="flex-1 flex items-center px-3 space-x-3">
                  <span class="text-indigo-400 text-lg">🔍</span>
                  <input type="text" id="workflow-scan-input" placeholder="e.g. 'I need to generate full-stack React UI from designs' or 'transcribe podcasts'..." class="w-full bg-transparent border-none text-white placeholder-slate-400 text-xs md:text-sm focus:outline-none">
                </div>
                <button onclick="AIScannerModule.runWorkflowScan()" class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-xs md:text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2">
                  <span>⚡ Scan & Match AI</span>
                </button>
              </div>

              <!-- Quick prompt suggestion tags -->
              <div class="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-300">
                <span class="text-slate-400">Try scanning:</span>
                <button onclick="AIScannerModule.fillPrompt('Full-stack React & Next.js UI generator')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all">"Full-stack React UI generator"</button>
                <button onclick="AIScannerModule.fillPrompt('Autonomous codebase refactoring with VS Code')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all">"Autonomous codebase refactoring"</button>
                <button onclick="AIScannerModule.fillPrompt('Photorealistic digital concept art & illustrations')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all">"Photorealistic art"</button>
                <button onclick="AIScannerModule.fillPrompt('Transcribe Zoom meetings and remove filler words')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all">"Transcribe meetings"</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Scan Diagnostics Result Box (Hidden by default, populated dynamically) -->
        <div id="scanner-result-area" class="hidden"></div>

        <!-- Filter & Search Toolbar -->
        <div class="space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Curated AI Tools Directory</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Discover verified AI tools categorized by utility and production readiness.</p>
            </div>

            <!-- Instant Search Input & Pricing Filter -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="relative">
                <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                <input type="text" oninput="AIScannerModule.handleSearchInput(this.value)" placeholder="Search by name, tag, or feature..." class="pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 md:w-64">
              </div>

              <!-- Pricing selector -->
              <select onchange="AIScannerModule.setPricing(this.value)" class="py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer font-medium">
                <option value="All">All Pricing</option>
                <option value="Freemium">Freemium</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          <!-- Utility Category Filter Pills -->
          <div id="ai-category-bar" class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <!-- Rendered by renderCategoriesBar -->
          </div>
        </div>

        <!-- Tools Cards Grid -->
        <div id="ai-tools-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Rendered by renderToolsGrid -->
        </div>

      </div>

      <!-- Tool Detail Modal Wrapper -->
      <div id="tool-detail-modal-wrapper"></div>
    `;

    renderCategoriesBar();
    renderToolsGrid();
  }

  function renderCategoriesBar() {
    const container = document.getElementById("ai-category-bar");
    if (!container) return;

    const categories = getAllToolCategories();

    container.innerHTML = categories.map(cat => {
      const isActive = cat === selectedCategory;
      return `
        <button onclick="AIScannerModule.setCategory('${cat}')" class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}">
          ${cat}
        </button>
      `;
    }).join("");
  }

  function renderToolsGrid() {
    const container = document.getElementById("ai-tools-grid");
    if (!container) return;

    const filtered = filterAITools({
      category: selectedCategory,
      pricing: selectedPricing,
      query: searchQuery
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <p class="text-3xl mb-2">🔍</p>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No AI tools found</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Try clearing your filters or searching for terms like "code", "design", or "transcribe".</p>
          <button onclick="AIScannerModule.resetFilters()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(tool => {
      const isBookmarked = bookmarkedTools.includes(tool.id);

      return `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
          
          <!-- Top Row -->
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.accentColor} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  ${tool.icon}
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white text-base">${tool.name}</h3>
                  <div class="flex items-center space-x-1.5 mt-0.5">
                    <span class="text-xs text-amber-500">★</span>
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-300">${tool.rating}</span>
                    <span class="text-[10px] text-slate-400">(${tool.reviews})</span>
                  </div>
                </div>
              </div>

              <!-- Bookmark & Pricing -->
              <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${tool.pricing === 'Free' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : tool.pricing === 'Freemium' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400'}">
                  ${tool.pricing}
                </span>
                <button onclick="AIScannerModule.toggleBookmark('${tool.id}')" class="text-lg p-1 transition-transform active:scale-125" title="Bookmark Tool">
                  ${isBookmarked ? '⭐' : '☆'}
                </button>
              </div>
            </div>

            <!-- Tagline -->
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-3">
              ${tool.tagline}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${tool.tags.map(t => `
                <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                  #${t}
                </span>
              `).join("")}
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <button onclick="AIScannerModule.openToolModal('${tool.id}')" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              AI Analysis & Specs →
            </button>
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs shadow-sm transition-all flex items-center space-x-1">
              <span>Launch</span>
              <span>↗</span>
            </a>
          </div>

        </div>
      `;
    }).join("");
  }

  function fillPrompt(text) {
    const input = document.getElementById("workflow-scan-input");
    if (input) {
      input.value = text;
      runWorkflowScan();
    }
  }

  function runWorkflowScan() {
    const input = document.getElementById("workflow-scan-input");
    const resultArea = document.getElementById("scanner-result-area");
    if (!input || !resultArea) return;

    const query = input.value.trim();
    if (!query) {
      App.showToast("Please enter a workflow need or tool query to scan.", "info");
      return;
    }

    // Show simulated radar animation
    resultArea.classList.remove("hidden");
    resultArea.innerHTML = `
      <div class="p-8 rounded-3xl bg-slate-900 text-white border border-indigo-500/30 text-center space-y-4">
        <div class="w-12 h-12 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <h3 class="text-lg font-bold">Scanning Global AI Knowledge Graph...</h3>
        <p class="text-xs text-indigo-300 font-mono">Synthesizing prompt intent: "${query}"</p>
      </div>
    `;

    setTimeout(() => {
      const report = scanAIToolsForWorkflow(query);
      if (!report) return;

      const course = getCourseById(report.recommendedCourseId);

      resultArea.innerHTML = `
        <div class="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-2 border-indigo-500/50 shadow-2xl space-y-6 animate-in fade-in duration-300">
          
          <!-- Report Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span class="text-xs font-mono uppercase tracking-wider text-indigo-400">⚡ AI Scanner Diagnostic Match</span>
              <h2 class="text-xl md:text-2xl font-black mt-1">Optimal AI Stack Identified: ${report.topMatch.name}</h2>
              <p class="text-xs text-slate-300 mt-0.5">Scanned against 250+ capability parameters at ${report.timestamp}</p>
            </div>

            <div class="flex items-center space-x-3">
              <div class="px-4 py-2 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-center">
                <span class="text-[10px] text-indigo-300 uppercase block font-mono">Compatibility Score</span>
                <span class="text-2xl font-black text-emerald-400">${report.topScore}% MATCH</span>
              </div>
            </div>
          </div>

          <!-- Top Match Detail Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Left: Top Tool Card -->
            <div class="md:col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${report.topMatch.accentColor} text-white flex items-center justify-center text-2xl shadow-lg">
                  ${report.topMatch.icon}
                </div>
                <div>
                  <h3 class="text-lg font-bold">${report.topMatch.name}</h3>
                  <span class="text-xs text-indigo-300">${report.topMatch.category} • ${report.topMatch.pricing}</span>
                </div>
              </div>

              <p class="text-xs text-slate-200 leading-relaxed">${report.topMatch.tagline}</p>

              <!-- Diagnostic Pills -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div class="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span class="text-[10px] text-slate-400 block">Performance</span>
                  <span class="font-bold text-indigo-300">${report.diagnostics.speedScore}</span>
                </div>
                <div class="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span class="text-[10px] text-slate-400 block">Ease of Setup</span>
                  <span class="font-bold text-emerald-400">${report.diagnostics.easeOfUse}</span>
                </div>
                <div class="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span class="text-[10px] text-slate-400 block">API Support</span>
                  <span class="font-bold text-cyan-300">${report.diagnostics.apiReadiness}</span>
                </div>
                <div class="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span class="text-[10px] text-slate-400 block">Security Grade</span>
                  <span class="font-bold text-amber-400">A+ SOC2</span>
                </div>
              </div>

              <div class="flex items-center space-x-3 pt-2">
                <a href="${report.topMatch.url}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-1">
                  <span>Launch Official Tool</span>
                  <span>↗</span>
                </a>
                <button onclick="AIScannerModule.openToolModal('${report.topMatch.id}')" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
                  Deep Dive Analysis
                </button>
              </div>
            </div>

            <!-- Right: Recommended Course Pairing -->
            <div class="bg-indigo-900/40 rounded-2xl p-5 border border-indigo-400/30 flex flex-col justify-between space-y-4">
              <div>
                <span class="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">Recommended Learning Path</span>
                <h4 class="font-bold text-sm text-white">${course ? course.title : 'AI Systems Masterclass'}</h4>
                <p class="text-xs text-slate-300 mt-1 line-clamp-3">${course ? course.description : 'Master modern autonomous systems.'}</p>
              </div>

              <button onclick="ClassroomModule.launchCourse('${course.id}')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all">
                Learn this Stack in Lab →
              </button>
            </div>
          </div>

        </div>
      `;
    }, 700);
  }

  function openToolModal(toolId) {
    const tool = AI_TOOLS_DATA.find(t => t.id === toolId);
    if (!tool) return;

    const wrapper = document.getElementById("tool-detail-modal-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${tool.accentColor} text-white flex items-center justify-center text-3xl shadow-lg">
                ${tool.icon}
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">${tool.name}</h3>
                <span class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">${tool.category} • ${tool.pricing}</span>
              </div>
            </div>

            <button onclick="AIScannerModule.closeToolModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold">✕</button>
          </div>

          <!-- Description & Best For -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Overview</h4>
            <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${tool.tagline}</p>
            <p class="text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 p-3 rounded-xl mt-2 font-medium">🎯 Best For: ${tool.bestFor}</p>
          </div>

          <!-- Key Features -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Capabilities</h4>
            <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              ${tool.features.map(f => `<li class="flex items-start space-x-2"><span class="text-emerald-500 font-bold">✓</span><span>${f}</span></li>`).join("")}
            </ul>
          </div>

          <!-- Pros and Cons -->
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Advantages</span>
              <ul class="text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                ${tool.pros.map(p => `<li>• ${p}</li>`).join("")}
              </ul>
            </div>

            <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
              <span class="text-xs font-bold text-rose-800 dark:text-rose-300 block mb-1">Considerations</span>
              <ul class="text-[11px] text-rose-900 dark:text-rose-200 space-y-1">
                ${tool.cons.map(c => `<li>• ${c}</li>`).join("")}
              </ul>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span class="text-xs text-slate-500">Official Release Verified</span>
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5">
              <span>Open ${tool.name}</span>
              <span>↗</span>
            </a>
          </div>

        </div>
      </div>
    `;
  }

  function closeToolModal() {
    const wrapper = document.getElementById("tool-detail-modal-wrapper");
    if (wrapper) wrapper.innerHTML = "";
  }

  function resetFilters() {
    selectedCategory = "All";
    selectedPricing = "All";
    searchQuery = "";
    renderCategoriesBar();
    renderToolsGrid();
  }

  return {
    init,
    renderScannerView,
    setCategory,
    setPricing,
    handleSearchInput,
    toggleBookmark,
    fillPrompt,
    runWorkflowScan,
    openToolModal,
    closeToolModal,
    resetFilters
  };
})();

