/**
 * SkillForge AI - AI Tools Catalog & Scanner Engine Data
 * Curated database of premier AI tools across multiple industry domains.
 */

const AI_TOOLS_DATA = [
  {
    id: "tool-cursor",
    name: "Cursor",
    category: "Coding & Dev",
    pricing: "Freemium",
    rating: 4.9,
    reviews: 1420,
    icon: "💻",
    accentColor: "from-blue-500 to-indigo-600",
    url: "https://cursor.com",
    tagline: "The AI-first Code Editor built on VS Code with deep codebase reasoning",
    tags: ["IDE", "Multi-file Edit", "Copilot", "Codebase RAG"],
    bestFor: "Software developers wanting context-aware multi-file generation & fast terminal AI.",
    features: [
      "Full codebase semantic indexing & repository-wide RAG",
      "Multi-file automated diff edits with instant inline preview",
      "Integrated AI terminal commands with auto-error debugging",
      "Model switching between Claude 3.5 Sonnet, GPT-4o, and custom endpoints"
    ],
    pros: ["Native VS Code extensions compatibility", "Fast multi-file refactoring", "Superior context accuracy"],
    cons: ["Subscription required for unlimited high-tier queries"],
    scanKeywords: ["code", "coding", "ide", "vscode", "editor", "developer", "terminal", "refactor", "bug", "python", "typescript", "react"]
  },
  {
    id: "tool-v0",
    name: "v0 by Vercel",
    category: "Coding & Dev",
    pricing: "Freemium",
    rating: 4.8,
    reviews: 980,
    icon: "⚡",
    accentColor: "from-zinc-800 to-zinc-950",
    url: "https://v0.dev",
    tagline: "Generative UI system crafting production-ready React & Tailwind components",
    tags: ["Generative UI", "Tailwind CSS", "React", "Next.js"],
    bestFor: "Frontend developers and designers needing quick, production-grade UI mockups & code.",
    features: [
      "Generates modern Tailwind CSS, Lucide Icons, and React components",
      "Interactive component preview directly in the browser canvas",
      "Direct CLI export via `npx v0 add` command",
      "Iteration slider allowing step-by-step UI refinements"
    ],
    pros: ["Clean, idiomatic React code", "Zero setup required", "Shadcn/ui design patterns"],
    cons: ["Focused on frontend only, backend logic must be hand-crafted"],
    scanKeywords: ["frontend", "ui", "tailwind", "react", "nextjs", "css", "component", "mockup", "landing page", "prototype"]
  },
  {
    id: "tool-github-copilot",
    name: "GitHub Copilot Workspace",
    category: "Coding & Dev",
    pricing: "Paid",
    rating: 4.7,
    reviews: 3200,
    icon: "🐙",
    accentColor: "from-purple-600 to-indigo-800",
    url: "https://github.com/features/copilot",
    tagline: "AI pair programmer and task-oriented issue-to-pull-request orchestrator",
    tags: ["Pair Programming", "GitHub Integration", "Autocompletion", "CI/CD"],
    bestFor: "Teams integrated deeply into GitHub ecosystem wanting PR explanations and ghost text.",
    features: [
      "Whole-line and whole-function completions while typing",
      "Copilot Chat in editor, CLI, and mobile",
      "Natural language to shell commands conversion",
      "Enterprise security filter to block matching public code"
    ],
    pros: ["Unobtrusive autocomplete", "Deep GitHub enterprise integrations"],
    cons: ["Slower on repository-wide complex multi-repo refactoring compared to Cursor"],
    scanKeywords: ["github", "autocomplete", "pair programmer", "copilot", "git", "pull request", "enterprise"]
  },
  {
    id: "tool-midjourney",
    name: "Midjourney v6.1",
    category: "Design & 3D",
    pricing: "Paid",
    rating: 4.95,
    reviews: 5100,
    icon: "🎨",
    accentColor: "from-pink-500 to-purple-600",
    url: "https://midjourney.com",
    tagline: "Industry-standard photorealistic image synthesis & concept art generator",
    tags: ["Image Gen", "Photorealism", "Concept Art", "VFX"],
    bestFor: "Digital artists, creative directors, and UI designers crafting realistic hero art.",
    features: [
      "Ultra-fine photorealistic textures, human anatomy, and lighting precision",
      "Parameter controls: --ar aspect ratio, --stylize, --chaos, and --seed",
      "Inpainting (Vary Region) and outpainting (Pan/Zoom) controls",
      "Web interface editor alongside Discord bot workflows"
    ],
    pros: ["Unmatched artistic aesthetic and lighting", "Massive creative community"],
    cons: ["No free tier; requires subscription"],
    scanKeywords: ["image", "art", "render", "design", "photo", "creative", "poster", "wallpaper", "visual", "midjourney"]
  },
  {
    id: "tool-figma-ai",
    name: "Figma AI",
    category: "Design & 3D",
    pricing: "Freemium",
    rating: 4.75,
    reviews: 1890,
    icon: "📐",
    accentColor: "from-violet-600 to-fuchsia-600",
    url: "https://figma.com",
    tagline: "First-party AI design tools integrated seamlessly into the Figma canvas",
    tags: ["UI/UX", "Auto-Layout", "Design Systems", "Prototyping"],
    bestFor: "Product designers looking to rapidly generate mobile/web screens and rename layers.",
    features: [
      "First-draft screen generation from simple text descriptions",
      "Contextual visual search to locate matching components across team libraries",
      "Automated realistic placeholder text and image population",
      "One-click auto-naming of chaotic layer trees"
    ],
    pros: ["Seamless canvas integration", "Team component library awareness"],
    cons: ["Generated screens often require fine-tuning for complex design systems"],
    scanKeywords: ["figma", "ui design", "ux", "wireframe", "prototype", "design system", "layer", "screen"]
  },
  {
    id: "tool-recraft",
    name: "Recraft.ai",
    category: "Design & 3D",
    pricing: "Freemium",
    rating: 4.88,
    reviews: 840,
    icon: "🖌️",
    accentColor: "from-amber-500 to-orange-600",
    url: "https://recraft.ai",
    tagline: "Vector & 3D graphics generation platform with strict brand palette control",
    tags: ["Vector SVG", "Iconography", "3D Art", "Brand Consistency"],
    bestFor: "Brand designers needing infinitely scalable SVGs, brand iconography, and 3D icons.",
    features: [
      "Generates clean, editable vector paths (.SVG) and 3D illustrations",
      "Strict hex-color palette enforcement matching corporate branding guidelines",
      "Style consistency across entire icon sets and illustrations",
      "Integrated vector canvas editor with background removal and vector tracing"
    ],
    pros: ["Direct SVG vector export", "Guaranteed brand color conformity"],
    cons: ["Less photorealistic than Midjourney for human faces"],
    scanKeywords: ["vector", "svg", "icon", "brand", "illustrations", "graphics", "logo", "palette"]
  },
  {
    id: "tool-notion-ai",
    name: "Notion AI",
    category: "Productivity",
    pricing: "Paid",
    rating: 4.82,
    reviews: 4300,
    icon: "📝",
    accentColor: "from-stone-700 to-stone-900",
    url: "https://notion.so",
    tagline: "Connected workspace intelligence: summarize, search, and synthesize workspace knowledge",
    tags: ["Knowledge Base", "Notes", "Project Management", "Q&A"],
    bestFor: "Teams and students managing knowledge bases, wikis, project documentation, and notes.",
    features: [
      "Q&A over all workspace pages, databases, and connected Slack/Google Drive files",
      "Automated meeting note action items and key takeaway extraction",
      "Tone adjustments, translation, and grammar rewriting directly in pages",
      "Autofill database columns based on page contents"
    ],
    pros: ["Unified search across all docs", "Saves hours in meeting documentation"],
    cons: ["Requires add-on subscription to base Notion plans"],
    scanKeywords: ["notes", "productivity", "notion", "docs", "wiki", "workspace", "organize", "tasks", "summary"]
  },
  {
    id: "tool-raycast",
    name: "Raycast AI",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.96,
    reviews: 2150,
    icon: "🚀",
    accentColor: "from-red-500 to-rose-600",
    url: "https://raycast.com",
    tagline: "Blazing fast desktop spotlight replacement with instant AI commands & snippets",
    tags: ["Launcher", "Keyboard First", "Mac/Windows", "Shortcuts"],
    bestFor: "Power users wanting global keyboard shortcuts to summon AI anywhere in any app.",
    features: [
      "Global hotkey to ask questions, explain selected text, or format JSON",
      "Custom AI prompt commands with parameter variables",
      "Floating AI chat window accessible from anywhere on the desktop",
      "Local model extensions & integration with clipboard history"
    ],
    pros: ["Zero latency keyboard flow", "Extensible community extensions"],
    cons: ["Pro AI tier requires monthly subscription"],
    scanKeywords: ["keyboard", "launcher", "spotlight", "shortcut", "quick", "mac", "productivity", "hotkey"]
  },
  {
    id: "tool-otter-ai",
    name: "Otter.ai",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.65,
    reviews: 3100,
    icon: "🎙️",
    accentColor: "from-blue-600 to-cyan-500",
    url: "https://otter.ai",
    tagline: "Automated meeting transcription, speaker separation, and summary pilot",
    tags: ["Meeting Notes", "Audio Transcription", "Zoom/Teams", "Action Items"],
    bestFor: "Remote workers and students recording lectures, Zoom meetings, and interview calls.",
    features: [
      "Live real-time transcription with automated speaker diarization",
      "OtterPilot auto-joins Zoom, Google Meet, and Microsoft Teams calls",
      "Automated executive summaries and highlighted action items",
      "Searchable timestamped audio recordings synchronized to text"
    ],
    pros: ["Accurate speaker identification", "Auto-joins calendars"],
    cons: ["Struggles with heavy technical accents or cross-talk occasionally"],
    scanKeywords: ["meeting", "transcribe", "audio", "zoom", "record", "voice", "speech to text", "lecture", "interview"]
  },
  {
    id: "tool-claude",
    name: "Claude 3.5 Sonnet",
    category: "Writing & Content",
    pricing: "Freemium",
    rating: 4.97,
    reviews: 6200,
    icon: "🧠",
    accentColor: "from-amber-600 to-orange-700",
    url: "https://claude.ai",
    tagline: "State-of-the-art reasoning, nuanced long-form writing, and interactive Artifacts",
    tags: ["Reasoning", "Artifacts", "Long Context", "Coding"],
    bestFor: "Complex technical writing, nuanced essay synthesis, code debugging, and visual artifacts.",
    features: [
      "Interactive 'Artifacts' side-panel rendering React, HTML, SVG, and markdown live",
      "200,000-token context window capable of analyzing full books or codebases",
      "Human-like, natural tone without robotic cliches",
      "Vision capability to analyze system diagrams, PDFs, and screenshots"
    ],
    pros: ["Unmatched reasoning and code generation quality", "Exceptional writing elegance"],
    cons: ["Usage caps on free tier during peak hours"],
    scanKeywords: ["claude", "anthropic", "writing", "essay", "reasoning", "artifacts", "chat", "summary", "analysis"]
  },
  {
    id: "tool-chatgpt",
    name: "ChatGPT (GPT-4o & o1)",
    category: "Writing & Content",
    pricing: "Freemium",
    rating: 4.91,
    reviews: 12500,
    icon: "🤖",
    accentColor: "from-emerald-600 to-teal-700",
    url: "https://chatgpt.com",
    tagline: "Omni-modal intelligence with web browsing, code execution, voice, and reasoning",
    tags: ["Multimodal", "Voice Mode", "Code Interpreter", "Custom GPTs"],
    bestFor: "General intelligence, math problem solving, live web research, and voice conversations.",
    features: [
      "GPT-4o real-time voice mode with human-like intonation and interruptions",
      "Built-in Python code execution environment for data analysis and charts",
      "Custom GPT store with specialized domain bots",
      "o1 model for deep STEM, physics, and competitive programming reasoning"
    ],
    pros: ["Versatile ecosystem", "Advanced data analysis with Python sandbox"],
    cons: ["o1 reasoning mode lacks browsing and file upload capabilities in early releases"],
    scanKeywords: ["chatgpt", "gpt", "openai", "voice", "python", "general", "multimodal", "tutor", "math"]
  },
  {
    id: "tool-elevenlabs",
    name: "ElevenLabs",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.93,
    reviews: 3800,
    icon: "🎧",
    accentColor: "from-violet-600 to-indigo-800",
    url: "https://elevenlabs.io",
    tagline: "Lifelike text-to-speech, emotional voice cloning, and multilingual dubbing",
    tags: ["Voice AI", "TTS", "Dubbing", "Sound Effects"],
    bestFor: "Content creators, e-learning course instructors, game devs, and audiobook narrators.",
    features: [
      "Indistinguishable human-like emotional inflection, pauses, and breaths",
      "Voice cloning with as little as 1 minute of sample audio",
      "Video Dubbing studio preserving original speaker's vocal tone in 29+ languages",
      "AI Sound Effects generator from descriptive text prompts"
    ],
    pros: ["Highest vocal realism in industry", "Great multilingual support"],
    cons: ["Character counts deplete quickly on long audiobooks"],
    scanKeywords: ["voice", "audio", "speech", "tts", "clone", "podcast", "narration", "sound", "dubbing", "speech to speech"]
  },
  {
    id: "tool-descript",
    name: "Descript",
    category: "Video & Audio",
    pricing: "Freemium",
    rating: 4.78,
    reviews: 2900,
    icon: "🎬",
    accentColor: "from-sky-500 to-blue-700",
    url: "https://descript.com",
    tagline: "Edit video and podcasts as easily as editing a Google Doc text transcript",
    tags: ["Video Editor", "Podcast", "Filler Word Removal", "Overdub"],
    bestFor: "YouTubers, course creators, and podcasters wanting transcript-based video editing.",
    features: [
      "Delete words in the transcript to automatically cut the corresponding video footage",
      "One-click 'Remove Filler Words' (ums, uhs, repeated words)",
      "Studio Sound: converts bedroom laptop audio into studio condenser microphone quality",
      "Eye Contact correction to redirect gaze towards camera"
    ],
    pros: ["Revolutionary transcript-based cutting", "Spectacular audio clean-up"],
    cons: ["Timeline interface can feel limited compared to Adobe Premiere for complex VFX"],
    scanKeywords: ["video", "video editor", "descript", "podcast", "transcript", "filler words", "cut", "youtube", "studio sound"]
  },
  {
    id: "tool-runway",
    name: "Runway Gen-3 Alpha",
    category: "Video & Audio",
    pricing: "Paid",
    rating: 4.85,
    reviews: 2100,
    icon: "🎥",
    accentColor: "from-purple-700 to-pink-600",
    url: "https://runwayml.com",
    tagline: "High-fidelity cinematic text-to-video and image-to-video generation",
    tags: ["Text to Video", "Cinematography", "Motion Brush", "VFX"],
    bestFor: "Filmmakers, motion designers, and advertisers producing cinematic b-roll.",
    features: [
      "Gen-3 Alpha realistic physics, lighting, and human motion",
      "Motion Brush: selectively animate specific regions of static imagery",
      "Camera motion controls: Pan, Zoom, Orbit, and Roll with precision curves",
      "Text-to-Video and Image-to-Video HD rendering"
    ],
    pros: ["Cinematic quality b-roll", "High temporal consistency"],
    cons: ["Requires high compute credits for 10-second clips"],
    scanKeywords: ["video generation", "text to video", "cinematic", "film", "vfx", "motion", "runway", "gen3"]
  },
  {
    id: "tool-perplexity",
    name: "Perplexity AI",
    category: "Research & Data",
    pricing: "Freemium",
    rating: 4.94,
    reviews: 5800,
    icon: "🔍",
    accentColor: "from-teal-600 to-cyan-700",
    url: "https://perplexity.ai",
    tagline: "The conversational AI search engine with live citations and deep research mode",
    tags: ["Search Engine", "Citations", "Research", "Academic"],
    bestFor: "Students, researchers, and engineers seeking fact-checked answers with verified sources.",
    features: [
      "Pro Search: multi-step iterative queries exploring multiple source angles",
      "Direct numerical citations linking to original web pages and papers",
      "Focus modes: Academic, YouTube, Reddit, Writing, Computational (Wolfram)",
      "Collections to organize research threads and share curated briefs"
    ],
    pros: ["Transparent source citations", "Eliminates SEO spam garbage"],
    cons: ["Occasional citation hallucination on obscure niche queries"],
    scanKeywords: ["search", "research", "citations", "google alternative", "fact check", "sources", "academic", "study"]
  },
  {
    id: "tool-consensus",
    name: "Consensus",
    category: "Research & Data",
    pricing: "Freemium",
    rating: 4.89,
    reviews: 1450,
    icon: "📊",
    accentColor: "from-blue-700 to-indigo-900",
    url: "https://consensus.app",
    tagline: "AI search engine for science: extracting peer-reviewed evidence from 200M+ papers",
    tags: ["Scientific Papers", "Evidence", "Peer-Reviewed", "Literature Review"],
    bestFor: "Academics, healthcare professionals, and students conducting scientific literature reviews.",
    features: [
      "Consensus Meter: synthesizes whether scientific papers agree, disagree, or are neutral",
      "Searches exclusively across peer-reviewed PubMed and Semantic Scholar journals",
      "Extracts sample sizes, methodology quality, and study findings automatically",
      "Synthesizes formal literature reviews with APA citations"
    ],
    pros: ["Eliminates pseudoscientific blog noise", "Instant consensus summaries"],
    cons: ["Limited for non-academic casual queries"],
    scanKeywords: ["science", "papers", "academic", "peer review", "medical", "journal", "study", "evidence", "literature review"]
  }
];

// Helper functions for AI Tools Scanner
function getAllToolCategories() {
  const cats = new Set(AI_TOOLS_DATA.map(t => t.category));
  return ["All", ...Array.from(cats)];
}

function filterAITools({ category = "All", pricing = "All", query = "" } = {}) {
  const cleanQ = query.trim().toLowerCase();
  return AI_TOOLS_DATA.filter(tool => {
    const matchCategory = category === "All" || tool.category === category;
    const matchPricing = pricing === "All" || tool.pricing.toLowerCase() === pricing.toLowerCase();
    const matchQuery = !cleanQ || 
      tool.name.toLowerCase().includes(cleanQ) ||
      tool.tagline.toLowerCase().includes(cleanQ) ||
      tool.category.toLowerCase().includes(cleanQ) ||
      tool.tags.some(t => t.toLowerCase().includes(cleanQ)) ||
      tool.scanKeywords.some(k => k.toLowerCase().includes(cleanQ));
    
    return matchCategory && matchPricing && matchQuery;
  });
}

/**
 * Intelligent AI Scanner matching engine:
 * Evaluates user input prompt/query, scores each tool against intent keywords,
 * and produces a structured diagnostics report.
 */
function scanAIToolsForWorkflow(workflowPrompt) {
  if (!workflowPrompt || workflowPrompt.trim().length === 0) {
    return null;
  }

  const promptWords = workflowPrompt.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2);
  
  const scoredTools = AI_TOOLS_DATA.map(tool => {
    let score = 0;
    const matchedKeywords = [];

    // Check keywords
    tool.scanKeywords.forEach(kw => {
      if (promptWords.some(pw => pw.includes(kw) || kw.includes(pw))) {
        score += 25;
        matchedKeywords.push(kw);
      }
    });

    // Check tags
    tool.tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (promptWords.some(pw => lowerTag.includes(pw))) {
        score += 20;
        if (!matchedKeywords.includes(lowerTag)) matchedKeywords.push(lowerTag);
      }
    });

    // Check name & category
    if (promptWords.some(pw => tool.name.toLowerCase().includes(pw))) {
      score += 40;
    }
    if (promptWords.some(pw => tool.category.toLowerCase().includes(pw))) {
      score += 15;
    }

    // Default baseline if generic query
    const calculatedMatch = Math.min(99, Math.max(45, score));

    return {
      tool,
      score: calculatedMatch,
      matchedKeywords
    };
  });

  // Sort descending by score
  scoredTools.sort((a, b) => b.score - a.score);

  const topMatch = scoredTools[0];
  const runnersUp = scoredTools.slice(1, 4);

  // Determine paired recommendation
  const complementaryCategory = topMatch.tool.category === "Coding & Dev" ? "Productivity" : "Coding & Dev";
  const pairedTool = AI_TOOLS_DATA.find(t => t.category === complementaryCategory && t.id !== topMatch.tool.id) || scoredTools[1].tool;

  // Find relevant platform course
  let recommendedCourseId = "course-ai-eng";
  if (topMatch.tool.category === "Design & 3D") recommendedCourseId = "course-uiux";
  else if (topMatch.tool.category === "Coding & Dev") recommendedCourseId = "course-nextjs";
  else if (topMatch.tool.category === "Research & Data") recommendedCourseId = "course-ml-scratch";

  return {
    query: workflowPrompt,
    topMatch: topMatch.tool,
    topScore: topMatch.score,
    matchedKeywords: topMatch.matchedKeywords,
    runnersUp: runnersUp.map(r => ({ tool: r.tool, score: r.score })),
    pairedTool,
    recommendedCourseId,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    diagnostics: {
      speedScore: "98/100",
      easeOfUse: "Very High",
      apiReadiness: "Enterprise Grade",
      securityGrade: "SOC2 / GDPR Compliant",
      learningCurve: "Low (< 1 hour setup)"
    }
  };
}

