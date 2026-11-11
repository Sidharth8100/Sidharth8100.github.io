"use strict";

// Content is intentionally local: no API keys, build service, or live metrics dependency.
const projects = [
  {
    id: "comics",
    name: "Panel — stories, spoken.",
    category: "ai",
    categoryLabel: "Accessible AI",
    year: "2026",
    art: "comic",
    status: "LATEST EVOLUTION",
    tags: ["React / TypeScript", "FastAPI", "OpenCLIP", "Kokoro ONNX"],
    description:
      "An accessible comic library that turns PDF dialogue into editable, character-aware narration.",
    lede: "A full-stack comic reader, evolved from the Comic Studies fellowship into a human-editable vision and voice pipeline.",
    problem:
      "Comics communicate through page layout, dialogue, recurring characters, and emotion. Making them accessible means preserving those connections while giving readers control over automated guesses.",
    approach: [
      "Built a React/TypeScript library and reader with a Three.js discovery book, page turning, transcripts, accessibility preferences, and saved reading progress.",
      "Connected FastAPI and SQLite to a bounded PDF-processing queue. PyMuPDF extracts native text; OpenCV and EasyOCR handle scanned pages, with an optional external-vision path.",
      "Used local OpenCLIP image/text embeddings and balloon-region proposals to maintain a per-comic CharacterRegistry. Readers can edit dialogue, recast voices, and merge character identities across pages.",
      "Combined VADER and textual affect cues with 28 English voice definitions and 13 prosody styles. Kokoro/ONNX generates cached speech, with an eSpeak fallback.",
      "Added upload validation and library/job quotas; the repository includes API, casting, vision-contract, and Playwright reader/accessibility test definitions.",
    ],
    stats: [
      ["28", "English voice definitions"],
      ["13", "Prosody styles"],
      ["100 pages", "Configured PDF page limit"],
    ],
    note: "Counts and limits are from the audited source, not quality or throughput benchmarks. The earlier fellowship result of 4 pages/min belongs to the historical pipeline; it is not a measured speed for this application. Model and voice availability depend on deployment assets.",
    link: "ComicStudiesLabApp",
    flow: [
      [
        "Import a PDF",
        "FastAPI validates the file and quotas, stores the book under a library namespace in SQLite, and queues analysis. The configured upload cap is 40 MiB.",
      ],
      [
        "Find the dialogue",
        "PyMuPDF renders pages and extracts text. Scanned pages use local OCR; balloon and nearby image crops propose visual context for the dialogue.",
      ],
      [
        "Build the cast",
        "OpenCLIP encodes character appearance and text. A per-comic registry matches recurring identities; uncertain assignments remain editable by the reader.",
      ],
      [
        "Give it a voice",
        "Character voices, emotion cues, and prosody feed cached Kokoro narration with an eSpeak fallback. Readers can correct lines and merge cast identities.",
      ],
      [
        "Read your way",
        "The browser combines page turning, a transcript, narration controls, accessibility preferences, and persisted reading progress.",
      ],
    ],
  },
  {
    id: "dataverse",
    name: "AIU DataVerse",
    category: "systems",
    categoryLabel: "Data engineering",
    year: "2026",
    art: "data",
    tags: ["Polars", "Python", "Parquet"],
    description:
      "Turning heterogeneous financial files into structured, analysis-ready data.",
    lede: "A data platform built for the Audit Intelligence Unit at ICICI Bank.",
    problem:
      "Financial datasets arrive with inconsistent delimiters, types, and schemas. Reliable analysis starts with recovering their structure.",
    approach: [
      "Designed a 9-phase Bayesian delimiter detection pipeline and a 23-stage type-recovery engine (14 numeric and 9 datetime stages).",
      "Migrated the backend from Pandas to Polars LazyFrame, with SHA-256 content-addressed Parquet caching.",
      "Added regression modeling, MinHash + LSH deduplication, and PSI schema-drift detection. Independently audited and remediated six defects.",
    ],
    stats: [
      ["1,673×", "Column-profiling speedup"],
      ["12.91×", "CSV-parsing speedup"],
    ],
    note: "Reported internship benchmarks from the supplied resume. Results are workload-specific, not general performance guarantees. Employer source code is not published.",
    link: null,
  },
  {
    id: "encrypt",
    name: "EncryptiView",
    category: "apps",
    categoryLabel: "Document workflows",
    year: "2025",
    art: "lock",
    status: "FULL-STACK APPLICATION",
    tags: ["Flutter / Dart", "Django REST", "JWT", "PyMuPDF"],
    description:
      "Role-based document sharing with access requests, watermarked PDF pages, and spoken text.",
    lede: "A Flutter client and Django REST API for controlled document discovery, sharing, and reading.",
    problem:
      "Document owners need to review access requests and manage readers without making the reading experience cumbersome. Permissions, rendering, and client state need to work together.",
    approach: [
      "Modeled users, administrator approval, document categories, owners, allowed viewers, and pending/approved/denied access requests in Django and SQLite.",
      "Implemented REST endpoints and permission classes for owners, approved administrators, viewers, and superusers. Simple JWT handles tokens; the Flutter client stores them with secure storage.",
      "Rendered permitted PDF pages with PyMuPDF and optional identifying watermarks. Added extracted-text and gTTS endpoints for narration.",
      "Built marketplace, upload, request-management, and local/remote viewer screens in Flutter, with reading and audio controls.",
    ],
    stats: [],
    note: "The audited implementation uses Django permissions and JWT. Requested access duration is stored, but expiry enforcement is not established. Watermarking is a visible accountability mechanism; the source does not establish AES-256 encryption or Firebase access control.",
    link: "EncryptiView",
    flow: [
      [
        "Identify the reader",
        "Registration and JWT login establish the user and role. A superuser can approve or revoke administrative access.",
      ],
      [
        "Request access",
        "Viewers discover documents and submit requests. Approved owners/admins review them; approval adds a reader to the allowed-viewer relation.",
      ],
      [
        "Authorize the document",
        "Backend permission classes check ownership, approved administrator status, and allowed-viewer membership before document operations.",
      ],
      [
        "Render and listen",
        "The API renders watermarked PDF page images, exposes extracted text, and can generate speech. Flutter provides the reading and playback interface.",
      ],
    ],
  },
  {
    id: "cifar",
    name: "Learning to see.",
    category: "ai",
    categoryLabel: "Computer vision",
    year: "2025",
    art: "vision",
    status: "EXPERIMENTS + WEB DEMO",
    tags: ["TensorFlow / Keras", "Scikit-learn", "Flask", "CIFAR-10"],
    description:
      "CIFAR-10 classification experiments spanning classical models, clustering, and a convolutional network.",
    lede: "From notebook experiments to a Flask image-classification demonstration.",
    problem:
      "Small images offer a useful test of learned features. Comparing approaches requires tracking preprocessing, model configuration, and the exact output being reported.",
    approach: [
      "Explored normalization and PCA alongside linear/logistic regression, KNN, SVM, decision trees, Gaussian naive Bayes, mixture models, DBSCAN, k-means, ANN, and CNN experiments.",
      "Built a Keras CNN using convolution, pooling, dropout, flatten, and dense layers, compiled with Adam. Saved model artifacts support the web demonstration.",
      "Added Flask routes to show CIFAR-10 examples, train/save a model, and return a prediction for a selected test image.",
      "Preserved notebook outputs and a README comparison table, keeping differing experiment results distinguishable.",
    ],
    stats: [
      ["80.40%", "Saved CNN notebook test output"],
      ["13", "Tracked experiment notebooks"],
    ],
    note: "Recorded historical output, not a fresh training run. The README separately reports 80.50%, and some other baseline figures differ between runs. This is image classification, despite the repository’s historical object-detection name.",
    link: "Object_detection_PRML",
    flow: [
      [
        "Prepare the images",
        "Notebook experiments normalize CIFAR-10 data and explore preprocessing such as PCA. Each experiment has its own configuration.",
      ],
      [
        "Compare approaches",
        "Classical supervised models, clustering approaches, and neural models are explored in separate notebooks; their settings matter when comparing outputs.",
      ],
      [
        "Train the CNN",
        "Keras combines convolution, pooling, dropout, and dense prediction layers. A saved notebook explicitly records 80.40% test accuracy.",
      ],
      [
        "Make a prediction",
        "The Flask demonstration loads a saved model and predicts the category of a selected CIFAR-10 test image.",
      ],
    ],
  },
  {
    id: "portfolio",
    name: "The Systems Observatory",
    category: "apps",
    categoryLabel: "Creative engineering",
    year: "2026",
    art: "orbit",
    status: "YOU ARE HERE",
    tags: ["JavaScript", "Canvas 2D", "CSS", "Accessibility"],
    description:
      "A buildless engineering portfolio with a spring-driven sculpture, particle navigation, and a real pathfinding lab.",
    lede: "A static website that lets visitors explore the work through small, working systems.",
    problem:
      "A portfolio should make technical work understandable and enjoyable to explore while remaining fast, accessible, and simple to host.",
    approach: [
      "Created a projected torus from 1,536 particles, with damped springs, local pointer repulsion, and a full-viewport particle transition.",
      "Built project search and category filters, native case-study dialogs, interactive architecture walkthroughs, and a keyboard command palette.",
      "Implemented a real breadth-first search over an editable grid, with shortest-path playback and cancellation on reset.",
      "Kept the site buildless and compatible with GitHub Pages. Motion can pause, reduced-motion navigation is immediate, and essential profile content has a no-JavaScript fallback.",
    ],
    stats: [
      ["1,536", "Sculpture particles"],
      ["0", "Production package dependencies"],
    ],
    note: "This case study describes the current redesign. The earlier repository audit captured the previous published React build; Git history preserves that version. The architecture diagrams here are illustrative, while the grid runs an actual shortest-path search.",
    link: "Sidharth8100.github.io",
    flow: [
      [
        "Project the sculpture",
        "Parametric points form a torus. Rotation and perspective map the 3D coordinates to the canvas; springs return displaced dots to the surface.",
      ],
      [
        "Release the signal",
        "A viewport-sized overlay starts from the actual on-screen particle positions and sends them beyond the screen before revealing the destination.",
      ],
      [
        "Explore the work",
        "Search, category filters, case studies, and architecture steps expose project details without a backend or API keys.",
      ],
      [
        "Try an algorithm",
        "Breadth-first search visits a four-neighbor grid layer by layer and reconstructs the shortest route through parent pointers.",
      ],
    ],
  },
  {
    id: "tree",
    name: "Decisions, from scratch.",
    category: "ai",
    categoryLabel: "Algorithms & ML",
    year: "FOUNDATIONS",
    art: "tree",
    status: "C++ IMPLEMENTATION",
    tags: ["C++", "Entropy", "Information gain", "C4.5"],
    description:
      "Recursive decision-tree construction, CSV inputs, prediction, and console tree inspection.",
    lede: "Machine-learning fundamentals made explicit in C++.",
    problem:
      "Building the splitting criterion and tree structure directly makes it possible to trace why a classifier takes a particular branch.",
    approach: [
      "Calculated entropy and information gain for candidate features, split input rows, and recursively constructed internal nodes and leaves.",
      "Added CSV/table input helpers, prediction traversal, verification helpers, and depth-first and level-order console tree output.",
      "Explored alternative C4.5/gain-ratio and matrix/tree implementations alongside the primary path.",
      "Experimented with an Express upload/predict wrapper; the web component remains work in progress.",
    ],
    stats: [],
    note: "The repository contains multiple variants and Windows-specific console code. No comparable accuracy benchmark is established by the audit; the web wrapper is not presented as a completed deployment.",
    link: "Decision_Tree_Classifier",
  },
  {
    id: "bank",
    name: "A bank in C.",
    category: "systems",
    categoryLabel: "Systems foundations",
    year: "FOUNDATIONS",
    art: "bank",
    status: "CONSOLE SIMULATION",
    tags: ["C", "File I/O", "State management"],
    description:
      "A banking simulation connecting persistent account records with transactions, interest, and stock trading.",
    lede: "A menu-driven C project for understanding how application state survives individual operations.",
    problem:
      "Accounts and transactions turn abstract programming fundamentals into concrete state changes: read a balance, validate an operation, update it, and preserve the result.",
    approach: [
      "Implemented account operations, balance reads/writes, transfers, deposits, withdrawals, interest, and monthly statements using file persistence.",
      "Built simulated stock initialization, price changes, buying/selling, currency exchange, and insurance menu flows across prototype variants.",
      "Connected console navigation and rendering to account/history state, with separate stock and smaller banking experiments.",
    ],
    stats: [["2nd place", "Reported among 80+ introductory CS projects"]],
    note: "Placement comes from the earlier public profile/portfolio. This is an educational simulation with platform-specific console code; its home-grown encrypt/decrypt routines are not modern cryptographic protection.",
    link: "IC-MAJOR-PROJECT",
  },
  {
    id: "jarvis",
    name: "Hey, Jarvis.",
    category: "apps",
    categoryLabel: "Voice interfaces",
    year: "2024",
    art: "voice",
    status: "LEARNING PROJECT",
    tags: ["Python", "SpeechRecognition", "pyttsx3", "OpenAI API"],
    description:
      "A wake-word assistant routing spoken commands to browser, music, news, and conversational responses.",
    lede: "An exploratory desktop voice interface built around command dispatch and external APIs.",
    problem:
      "Turning speech into an action requires separating recognition, intent routing, external service calls, and spoken output.",
    approach: [
      "Listened for a wake word through SpeechRecognition, then dispatched a recognized command through processCommand.",
      "Connected browser destinations, named music links, and news fetching to explicit command paths.",
      "Used an OpenAI chat-completion fallback for other requests and pyttsx3 to speak responses, with separate client and music-library modules.",
    ],
    stats: [],
    note: "A microphone- and network-dependent learning prototype. No production reliability, autonomous planning, or measured latency is claimed.",
    link: "Jarvis-AI-Virtual-Desktop-Personal-Assistant",
  },
  {
    id: "codsoft",
    name: "Small programs. Real foundations.",
    category: "systems",
    categoryLabel: "Programming foundations",
    year: "FOUNDATIONS",
    art: "terminal",
    status: "EARLY EXPERIMENTS",
    tags: ["C++", "OpenCV", "Tesseract", "EasyOCR"],
    description:
      "Console games and a calculator, alongside an early image-to-text notebook that preceded the comic work.",
    lede: "A collection of small experiments in control flow, state, and optical character recognition.",
    problem:
      "Useful systems begin with small pieces that are easy to reason about: a turn, a guess, an operator, or a sequence of image transformations.",
    approach: [
      "Built a random-number guessing loop with feedback and a conditional arithmetic calculator.",
      "Separated tic-tac-toe board display, win/draw checks, player switching, and the game loop into distinct functions.",
      "Explored image upload, grayscale/blur/threshold preprocessing, Tesseract, and EasyOCR in a Colab notebook.",
    ],
    stats: [
      ["3", "C++ console programs"],
      ["1", "Historical OCR notebook"],
    ],
    note: "Foundational exercises and an early OCR experiment, preserved as part of the learning journey. Stored notebook output does not establish OCR accuracy.",
    link: "CodSoft",
  },
];
const warden = {
  id: "warden",
  name: "WARDEN",
  categoryLabel: "Distributed systems",
  year: "2026 — PRESENT",
  tags: ["FastAPI", "PostgreSQL", "Redis Streams", "Docker", "OpenTelemetry"],
  lede: "Track meaningful changes. Control when to crawl. Make alerts recoverable.",
  problem:
    "Monitoring the web is easy until pages are noisy, workers crash, alerts repeat, and a fixed crawl budget becomes a constraint. WARDEN treats those as core design problems.",
  approach: [
    "FastAPI accepts authenticated monitor requests. PostgreSQL persists accepted work and outbox records; Redis Streams deliver jobs to isolated fetchers. Large payloads live in S3-compatible storage.",
    "Myers diff, Merkle DOM hashing, SimHash, TF-IDF, and SSIM detect changes. A handwritten Pratt parser and RE2 power the typed rule language.",
    "Transactional outboxes, HMAC-SHA256 webhooks, retries, cooldowns, circuit breakers, and dead-letter queues support recoverable delivery. WebSocket replay preserves event history.",
    "Adaptive scheduling uses Poisson MAP estimation and Lagrangian optimization. Tenant-specific online logistic regression supports shadow scoring and gated model promotion.",
    "Local implementation now includes a frontend, Django/DRF analytics, verified PostgreSQL standby behavior, PgBouncer transaction pooling, and Prometheus/Grafana/Jaeger observability.",
  ],
  stats: [
    ["500 / 500", "Jobs recovered across 12 worker kills"],
    ["37.7%", "Less stale time in fixed-budget simulation"],
    ["60,000", "Rule programs tested through fuzzing"],
    ["Up to 99.6%", "Lower query time on 150,002 fixture rows"],
  ],
  note: "Active development with a Docker-hosted local UI; no public hosted demo. These are scoped experiments. F1 improved from 0.671 to 1.000 on 600 synthetic held-out examples, not a production dataset. Kubernetes remains roadmap work. Local README reviewed November 2026. The audited public GitHub snapshot is an earlier scaffold; the features and experiments above refer to the local implementation.",
  link: "WARDEN",
};
const allProjects = [warden, ...projects];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function art(kind) {
  const start =
    '<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  const end = "</svg>";
  const drawings = {
    orbit:
      '<g stroke="#a8be7b"><ellipse cx="150" cy="75" rx="90" ry="36" transform="rotate(-28 150 75)"/><ellipse cx="150" cy="75" rx="90" ry="36" transform="rotate(28 150 75)"/><ellipse cx="150" cy="75" rx="36" ry="60"/></g><g fill="#daeea5"><circle cx="150" cy="75" r="8"/><circle cx="72" cy="102" r="4"/><circle cx="225" cy="48" r="4"/><circle cx="150" cy="15" r="4"/></g>',
    terminal:
      '<rect x="45" y="24" width="210" height="108" rx="6" fill="#24301e" stroke="#8ca870"/><path d="M45 45H255" stroke="#8ca870"/><g fill="#a8be7b"><circle cx="58" cy="35" r="2"/><circle cx="68" cy="35" r="2"/><circle cx="78" cy="35" r="2"/></g><path d="m67 64 12 10-12 10M89 84h26M67 101h85M67 113h57" stroke="#c5df9c" stroke-width="3"/><path d="M187 64v48M210 64v48M170 80h58M170 98h58" stroke="#6f8855"/><path d="m175 67 8 8m0-8-8 8" stroke="#c5df9c" stroke-width="2"/>',
    data: '<path d="M35 38H100M35 75H100M35 112H100M200 75H265" stroke="#a2bf77" stroke-dasharray="3 4"/><rect x="100" y="30" width="100" height="90" rx="5" fill="#303d24" stroke="#8ba568"/><path d="M120 53H177M120 68H160M120 83H180M120 98H150" stroke="#c5e097" stroke-width="3"/><g fill="#c5df9c"><circle cx="35" cy="38" r="8"/><circle cx="35" cy="75" r="8"/><circle cx="35" cy="112" r="8"/></g><rect x="245" y="59" width="30" height="32" rx="3" fill="#91b367"/><path d="m253 75 6 6 9-13" stroke="#243118" stroke-width="2"/>',
    comic:
      '<g transform="rotate(-8 130 75)"><rect x="53" y="17" width="114" height="120" rx="3" fill="#383647" stroke="#9b94b9"/><path d="M63 27H103V77H63zM112 27H157V77H112zM63 86H157V127H63z" stroke="#9b94b9"/><path d="M72 39H95V52H81L77 57V52H72zM120 39H149V53H135L129 59V53H120z" fill="#c2bbd6"/><circle cx="85" cy="68" r="5" fill="#7a7395"/><circle cx="134" cy="68" r="5" fill="#7a7395"/><path d="M75 100H144M75 111H128" stroke="#958cae" stroke-width="3"/></g><path d="M185 65V85M198 48V102M211 36V114M224 56V94M237 67V83" stroke="#c7bce9" stroke-width="5" stroke-linecap="round"/>',
    vision:
      '<g stroke="#7c779a"><path d="m35 45 57 12v58l-57-12zM92 57l22-17v58l-22 17M35 45l22-17 57 12"/><path d="m133 43 32 7v59l-32-7zM165 50l15-12v59l-15 12M193 49l21 4v44l-21-4zM214 53l11-9v44l-11 9"/></g><path d="M115 72H132M181 72H192M226 72H244" stroke="#c2b4e6" stroke-dasharray="3 3"/><g fill="#c2b4e6"><circle cx="255" cy="48" r="6"/><circle cx="255" cy="73" r="6"/><circle cx="255" cy="98" r="6"/></g><g stroke="#a89bc9" opacity=".5"><path d="M46 48V105M59 51V108M72 54V111M83 56V113M35 61l57 12M35 78l57 12M35 93l57 12"/></g>',
    lock: '<rect x="110" y="12" width="82" height="132" rx="10" fill="#343026" stroke="#b2a382"/><path d="M135 21H167" stroke="#98866a" stroke-width="3" stroke-linecap="round"/><rect x="127" y="63" width="48" height="40" rx="4" fill="#bdaa7d"/><path d="M136 63V52a15 15 0 0 1 30 0v11" stroke="#d6c79f" stroke-width="4"/><circle cx="151" cy="79" r="4" fill="#3f382a"/><path d="M151 79V88" stroke="#3f382a" stroke-width="3"/><path d="M62 48h24M52 68h34M68 88h18M216 65h29M216 85h39M216 105h20" stroke="#8e7c59" stroke-dasharray="3 3"/>',
    tree: '<path d="M150 35 85 80M150 35 215 80M85 80 45 125M85 80 125 125M215 80 185 125M215 80 265 125" stroke="#8e84b3" stroke-width="1.5"/><rect x="130" y="12" width="40" height="32" rx="4" fill="#b6a8d7"/><rect x="65" y="64" width="40" height="32" rx="4" fill="#79708f"/><rect x="195" y="64" width="40" height="32" rx="4" fill="#79708f"/><g fill="#b6a8d7"><circle cx="45" cy="125" r="10"/><circle cx="125" cy="125" r="10"/><circle cx="185" cy="125" r="10"/><circle cx="265" cy="125" r="10"/></g><path d="M142 28h16M77 80h16M207 80h16" stroke="#352e46" stroke-width="2"/>',
    bank: '<path d="m80 50 70-35 70 35H80z" stroke="#bad294" fill="#344327"/><path d="M88 126h124M82 135h136" stroke="#b2c98b" stroke-width="4"/><path d="M99 61v53M132 61v53M166 61v53M201 61v53" stroke="#9cb87b" stroke-width="10"/><path d="M32 75h26M32 88h18M244 75h26M244 88h18" stroke="#728d53"/><circle cx="150" cy="37" r="6" fill="#c2dfa0"/>',
    voice:
      '<circle cx="150" cy="76" r="57" stroke="#897854" stroke-dasharray="2 6"/><circle cx="150" cy="76" r="43" stroke="#79694a"/><path d="M73 66V86M86 48V104M99 60V92M112 38V114M125 52V100M138 26V126M151 46V106M164 35V117M177 59V93M190 47V105M203 66V86M216 58V94M229 69V83" stroke="#cab182" stroke-width="4" stroke-linecap="round"/>',
  };
  return start + drawings[kind] + end;
}

$("#project-grid").innerHTML = projects
  .map(
    (p, i) =>
      `<article class="project-card${i === 0 ? " project-latest" : ""}" data-category="${p.category}" data-id="${p.id}"><button class="project-art art-${p.category}" data-project="${p.id}" aria-label="Explore ${p.name}"><span class="art-topline"><span>EXPERIMENT / ${String(i + 2).padStart(3, "0")}</span><span>${p.categoryLabel.toUpperCase()}</span></span>${art(p.art)}<span class="art-open">LOOK INSIDE ↗</span></button><div class="card-meta"><span>${p.categoryLabel}</span><span>${p.year}</span></div><h3><button data-project="${p.id}">${p.name}</button></h3><p>${p.description}</p><div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div><span class="project-state">${p.status || "INTERNSHIP / EMPLOYER SOURCE"}</span></article>`,
  )
  .join("");

// Search and category filtering compose without rebuilding cards or losing focus.
let activeFilter = "all";
function filterProjects() {
  const query = $("#project-search").value.toLowerCase().trim();
  let count = 0;
  $$(".project-card").forEach((card, i) => {
    const p = projects[i];
    const terms = [p.name, p.description, p.categoryLabel, ...p.tags]
      .join(" ")
      .toLowerCase();
    card.hidden =
      (activeFilter !== "all" && p.category !== activeFilter) ||
      !terms.includes(query);
    if (!card.hidden) count++;
  });
  $("#project-count").textContent =
    `${String(count).padStart(2, "0")} PROJECT${count === 1 ? "" : "S"}`;
  $("#project-empty").hidden = count !== 0;
  updateProgress();
}
$$(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    $$(".filter").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    activeFilter = button.dataset.filter;
    filterProjects();
  }),
);
$("#project-search").addEventListener("input", filterProjects);
$("#clear-project-search").addEventListener("click", () => {
  $("#project-search").value = "";
  $('[data-filter="all"]').click();
  $("#project-search").focus();
});
const projectTotal = String(projects.length).padStart(2, "0");
$('[data-filter="all"] span').textContent = projectTotal;
$("#project-count").textContent = `${projectTotal} PROJECTS`;

const projectDialog = $("#project-dialog");
function openProject(id) {
  const p = allProjects.find((p) => p.id === id);
  if (!p) return;
  $("#project-detail").innerHTML =
    `<p class="eyebrow">${p.categoryLabel.toUpperCase()} / ${p.year}</p><h2 id="dialog-title">${p.name}</h2><p class="detail-lede">${p.lede}</p><div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div><h3>The problem</h3><p>${p.problem}</p>${p.stats.length ? `<div class="detail-stats">${p.stats.map((s) => `<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join("")}</div>` : ""}${p.flow ? `<section class="flow-explorer" aria-labelledby="flow-heading"><h3 id="flow-heading">Follow the data</h3><div class="flow-steps" role="group" aria-label="Architecture steps">${p.flow.map((step, i) => `<button data-flow-step="${i}" aria-pressed="${i === 0}" aria-controls="flow-detail"><span>${String(i + 1).padStart(2, "0")}</span>${step[0]}</button>`).join("")}</div><div id="flow-detail" aria-live="polite"><strong>${p.flow[0][0]}</strong><p>${p.flow[0][1]}</p></div></section>` : ""}<h3>Inside the engineering</h3><ul>${p.approach.map((a) => `<li>${a}</li>`).join("")}</ul><p class="note">${p.note}</p><div class="detail-links">${p.link ? `<a class="button primary" href="https://github.com/Sidharth8100/${p.link}" target="_blank" rel="noopener">Explore source ↗</a>` : ""}<a class="text-link" href="assets/SidharthBhagat.pdf" target="_blank" rel="noopener">Read the resume ↗</a></div>`;
  $$("[data-flow-step]", projectDialog).forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-flow-step]", projectDialog).forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
      const step = p.flow[Number(button.dataset.flowStep)];
      $("#flow-detail strong").textContent = step[0];
      $("#flow-detail p").textContent = step[1];
    });
  });
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-project]");
  if (trigger) openProject(trigger.dataset.project);
});
$$("dialog").forEach((dialog) => {
  $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
});

const stages = [
  [
    "01 / INGEST",
    "Authenticated APIs accept a monitor. The scheduler allocates crawl capacity; Redis Streams hand work to isolated fetchers.",
  ],
  [
    "02 / PROCESS",
    "Snapshots are compared with text, DOM, and visual signals. The typed rule engine decides whether a change deserves attention.",
  ],
  [
    "03 / DELIVER",
    "A transactional outbox persists the alert. Signed webhooks and email use retries, cooldowns, and dead-letter queues; WebSockets support replay.",
  ],
];
let traceTimers = [];
function selectStage(index) {
  $$(".pipeline-node").forEach((node, i) => {
    node.classList.toggle("active", i === index);
    node.setAttribute("aria-pressed", String(i === index));
  });
  $("#stage-code").textContent = stages[index][0];
  $("#stage-description").textContent = stages[index][1];
}
function stopTrace() {
  traceTimers.forEach(clearTimeout);
  traceTimers = [];
  $("#trace-button").disabled = false;
  $("#trace-button").innerHTML = "Trace an event <span>→</span>";
}
$$(".pipeline-node").forEach((node) =>
  node.addEventListener("click", () => {
    stopTrace();
    selectStage(Number(node.dataset.stage));
  }),
);
selectStage(0);
$("#trace-button").addEventListener("click", () => {
  stopTrace();
  selectStage(0);
  $("#trace-button").disabled = true;
  $("#trace-button").textContent = "Tracing…";
  [1, 2].forEach((i) =>
    traceTimers.push(
      setTimeout(
        () => selectStage(i),
        i * (reducedMotion.matches ? 150 : 1100),
      ),
    ),
  );
  traceTimers.push(
    setTimeout(
      () => {
        stopTrace();
        $("#trace-button").textContent = "Trace again ↻";
      },
      reducedMotion.matches ? 500 : 3500,
    ),
  );
});

// A real BFS over a four-neighbor, unweighted grid. Rendering is separate from search.
const ROWS = 8,
  COLS = 14,
  START = 2 * COLS + 1,
  END = 5 * COLS + 12;
const initialWalls = [
  17, 18, 19, 33, 47, 61, 75, 89, 48, 49, 50, 65, 79, 93, 102, 103,
];
let walls = new Set(initialWalls),
  searchVersion = 0,
  searchRunning = false;
const grid = $("#path-grid");
for (let i = 0; i < ROWS * COLS; i++) {
  const cell = document.createElement("button");
  cell.type = "button";
  cell.className = "grid-cell";
  cell.dataset.cell = i;
  cell.addEventListener("click", () => {
    if (i === START || i === END || searchRunning) return;
    walls.has(i) ? walls.delete(i) : walls.add(i);
    renderGrid();
    $("#path-status").textContent =
      "Map updated. Run BFS to find the shortest route.";
  });
  cell.addEventListener("keydown", (event) => {
    const moves = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: COLS,
      ArrowUp: -COLS,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = i + moves[event.key];
    if (
      next >= 0 &&
      next < ROWS * COLS &&
      (!(event.key === "ArrowRight" || event.key === "ArrowLeft") ||
        Math.floor(next / COLS) === Math.floor(i / COLS))
    )
      grid.children[next].focus();
  });
  grid.appendChild(cell);
}
function renderGrid() {
  [...grid.children].forEach((cell, i) => {
    const state =
      i === START ? "start" : i === END ? "end" : walls.has(i) ? "wall" : "";
    cell.className = `grid-cell ${state}`;
    cell.textContent = i === START ? "S" : i === END ? "F" : "";
    cell.setAttribute(
      "aria-label",
      `Row ${Math.floor(i / COLS) + 1}, column ${(i % COLS) + 1}: ${state || "open"}`,
    );
    cell.setAttribute("aria-pressed", String(walls.has(i)));
    cell.disabled = searchRunning || i === START || i === END;
  });
}
function breadthFirstSearch(blocked) {
  const queue = [START],
    parents = new Map([[START, null]]),
    visited = [];
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    visited.push(current);
    if (current === END) break;
    const row = Math.floor(current / COLS),
      col = current % COLS;
    const neighbors = [];
    if (col < COLS - 1) neighbors.push(current + 1);
    if (row < ROWS - 1) neighbors.push(current + COLS);
    if (col > 0) neighbors.push(current - 1);
    if (row > 0) neighbors.push(current - COLS);
    for (const next of neighbors)
      if (!blocked.has(next) && !parents.has(next)) {
        parents.set(next, current);
        queue.push(next);
      }
  }
  const path = [];
  if (parents.has(END)) {
    let at = END;
    while (at !== null) {
      path.unshift(at);
      at = parents.get(at);
    }
  }
  return { visited, path };
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
$("#solve-path").addEventListener("click", async () => {
  const version = ++searchVersion;
  searchRunning = true;
  renderGrid();
  $("#solve-path").disabled = true;
  $("#path-status").textContent = "Exploring the grid, one layer at a time…";
  const { visited, path } = breadthFirstSearch(walls);
  for (const index of visited) {
    if (version !== searchVersion) return;
    if (index !== START && index !== END)
      grid.children[index].classList.add("visited");
    if (!reducedMotion.matches) await delay(13);
  }
  for (const index of path) {
    if (version !== searchVersion) return;
    if (index !== START && index !== END)
      grid.children[index].classList.add("path");
    if (!reducedMotion.matches) await delay(30);
  }
  if (version !== searchVersion) return;
  searchRunning = false;
  [...grid.children].forEach((cell, i) => {
    cell.disabled = i === START || i === END;
  });
  $("#solve-path").disabled = false;
  $("#path-status").textContent = path.length
    ? `Shortest path: ${path.length - 1} steps. ${visited.length} cells explored. BFS guarantees a shortest path on this unweighted grid.`
    : `No path found after exploring ${visited.length} cells. Remove a wall or reset the map and try again.`;
});
$("#reset-path").addEventListener("click", () => {
  searchVersion++;
  searchRunning = false;
  walls = new Set(initialWalls);
  renderGrid();
  $("#solve-path").disabled = false;
  $("#path-status").textContent =
    "Map reset. Draw walls, then find a shortest path.";
});
renderGrid();

const menu = $(".menu-toggle"),
  nav = $(".site-header nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open menu");
  menu.textContent = "☰";
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.textContent = open ? "×" : "☰";
});
$$('a[href^="#"]').forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    const openDialog = $("dialog[open]");
    if (openDialog) {
      event.preventDefault();
      openDialog.close();
    }
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});
const progress = $(".reading-progress");
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? (100 * window.scrollY) / total : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $$(".site-header nav a").forEach((a) => {
          const active = a.hash === `#${entry.target.id}`;
          a.classList.toggle("current", active);
          if (active) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      }
    });
  },
  { rootMargin: "-20% 0px -65% 0px" },
).observe($("#work"));
// Observe the remaining navigation sections with the same activation band.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries)
      if (entry.isIntersecting)
        $$(".site-header nav a").forEach((a) => {
          const active = a.hash === `#${entry.target.id}`;
          a.classList.toggle("current", active);
          if (active) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
  },
  { rootMargin: "-20% 0px -65% 0px" },
);
["home", "journey", "arena", "about", "contact"].forEach((id) =>
  sectionObserver.observe(document.getElementById(id)),
);
function updateTime() {
  const now = new Date();
  $("#local-time").textContent =
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now) + " IST";
  $("#local-time").dateTime = now.toISOString();
  $("#year").textContent = now.getFullYear();
}
updateTime();
setInterval(updateTime, 60000);
$("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("sidharthbhagat2005@gmail.com");
    $("#copy-status").textContent = "Email copied. Say hello!";
  } catch {
    $("#copy-status").textContent =
      "Copy unavailable here. Select the address above, or click it to email.";
  }
});

// A small, keyboard-accessible command palette. Search never inserts user HTML.
const commandDialog = $("#command-dialog");
const commands = [
  { label: "Selected work", href: "#work", kind: "SECTION" },
  { label: "Experience & journey", href: "#journey", kind: "SECTION" },
  { label: "Coding arena & LeetCode", href: "#arena", kind: "SECTION" },
  { label: "About & toolkit", href: "#about", kind: "SECTION" },
  { label: "Contact Sidharth", href: "#contact", kind: "SECTION" },
  { label: "Read resume", href: "assets/SidharthBhagat.pdf", kind: "PDF" },
  ...allProjects.map((p) => ({
    label: p.name,
    project: p.id,
    kind: "PROJECT",
  })),
];
function renderCommands() {
  const query = $("#command-search").value.toLowerCase().trim();
  const matches = commands.filter((c) => c.label.toLowerCase().includes(query));
  const list = $("#command-results");
  list.replaceChildren();
  for (const c of matches) {
    const el = document.createElement(c.project ? "button" : "a");
    el.append(document.createTextNode(c.label));
    const tag = document.createElement("span");
    tag.textContent = c.kind + " ↗";
    el.append(tag);
    if (c.href) {
      el.href = c.href;
      if (!c.href.startsWith("#")) {
        el.target = "_blank";
        el.rel = "noopener";
      }
    }
    el.addEventListener("click", () => {
      commandDialog.close();
      if (c.project) openProject(c.project);
    });
    list.append(el);
  }
  if (!matches.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "No matches. Try “work”, “resume”, or “WARDEN”.";
    list.append(p);
  }
}
function openCommands() {
  $("#command-search").value = "";
  renderCommands();
  commandDialog.showModal();
  $("#command-search").focus();
}
$(".command-trigger").addEventListener("click", openCommands);
$("#command-search").addEventListener("input", renderCommands);
$("#command-search").addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    $("#command-results a, #command-results button")?.focus();
  }
  if (event.key === "Enter") {
    event.preventDefault();
    $("#command-results a, #command-results button")?.click();
  }
});
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (commandDialog.open) commandDialog.close();
    else if (!projectDialog.open) openCommands();
  }
});

// Preserve bookmarked routes from the previous HashRouter portfolio.
const legacyRoutes = {
  "#/work": "#work",
  "#/about": "#about",
  "#/skills": "#about",
  "#/": "#home",
};
function normalizeLegacyRoute() {
  if (!legacyRoutes[location.hash]) return;
  const target = legacyRoutes[location.hash];
  history.replaceState(null, "", target);
  requestAnimationFrame(() =>
    $(target)?.scrollIntoView({ behavior: "instant" }),
  );
}

window.addEventListener("hashchange", normalizeLegacyRoute);
normalizeLegacyRoute();
