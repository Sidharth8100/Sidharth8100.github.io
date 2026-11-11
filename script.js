'use strict';

// Content is intentionally local: no API keys, build service, or live metrics dependency.
const projects = [
  {id:'dataverse', name:'AIU DataVerse', category:'systems', categoryLabel:'Data engineering', year:'2026', art:'data', tags:['Polars','Python','Parquet'], description:'Turning heterogeneous financial files into structured, analysis-ready data.', lede:'A data platform built for the Audit Intelligence Unit at ICICI Bank.', problem:'Financial datasets arrive with inconsistent delimiters, types, and schemas. Reliable analysis starts with recovering their structure.', approach:['Designed a 9-phase Bayesian delimiter detection pipeline and a 23-stage type-recovery engine (14 numeric and 9 datetime stages).','Migrated the backend from Pandas to Polars LazyFrame, with SHA-256 content-addressed Parquet caching.','Added regression modeling, MinHash + LSH deduplication, and PSI schema-drift detection. Independently audited and remediated six defects.'], stats:[['1,673×','Column-profiling speedup'],['12.91×','CSV-parsing speedup']], note:'Reported internship benchmarks from the supplied resume. Results are workload-specific, not general performance guarantees. Employer source code is not published.', link:null},
  {id:'comics', name:'Comics, with a voice.', category:'ai', categoryLabel:'Accessible AI', year:'2025', art:'comic', tags:['Computer vision','OCR','NLP','TTS'], description:'From panels and speech bubbles to a character-aware, narrated reading experience.', lede:'An end-to-end comic-to-audio pipeline developed during the SoLA software fellowship.', problem:'Visual stories contain panel order, dialogue, speaker identity, and emotion. A useful audio experience needs to preserve more than just the words.', approach:['Combined panel segmentation and OCR with dialogue extraction and speaker attribution.','Integrated emotion-conditioned multi-voice speech synthesis, attributing dialogue to up to five characters.','Standardized the inference workflow from digital comic pages through character-specific narration.'], stats:[['4 pages/min','End-to-end processing throughput'],['Up to 5','Characters in speaker attribution']], note:'Throughput and character attribution scope are reported in the resume; they are not live measurements.', link:'ComicStudiesLabApp'},
  {id:'cifar', name:'Learning to see.', category:'ai', categoryLabel:'Computer vision', year:'2025', art:'vision', tags:['TensorFlow','CUDA','CNN'], description:'A custom 8-layer CNN, benchmarked against classical and ensemble learning baselines.', lede:'CIFAR-10 image classification, from preprocessing to repeatable model evaluation.', problem:'Classifying small images requires learning useful visual features without overfitting. The goal was to compare a custom neural network with meaningful baselines.', approach:['Built an 8-layer CNN using TensorFlow and Keras, with CUDA acceleration, Batch Normalization, Dropout, and adaptive learning-rate scheduling.','Applied data augmentation and ZCA whitening; compared against SVM, AdaBoost, XGBoost, and ANN approaches.','Used Grid Search and Early Stopping for repeatable hyperparameter tuning.'], stats:[['80.5%','Test accuracy reported in resume'],['8 layers','Custom CNN architecture']], note:'PRML course project, February–April 2025. This is image classification, despite the historical repository name.', link:'Object_detection_PRML'},
  {id:'encrypt', name:'EncryptiView', category:'apps', categoryLabel:'Secure applications', year:'2025', art:'lock', tags:['Flutter','Firebase','AES-256'], description:'A document viewer combining encrypted files, access control, and dynamic watermarking.', lede:'A Flutter-based DRM document viewer.', problem:'Document sharing needs access control and visible accountability while maintaining a usable reading experience.', approach:['Integrated AES-256 encryption and secure PDF rendering in a Flutter application.','Used Firebase-driven access control and dynamic watermarking.','Built around controlled document viewing rather than unrestricted file distribution.'], stats:[], note:'Project description recovered from the previous portfolio. Access controls and watermarking do not guarantee prevention of all copying or capture.', link:'EncryptiView'},
  {id:'tree', name:'Decisions, from scratch.', category:'ai', categoryLabel:'Algorithms & ML', year:'FOUNDATIONS', art:'tree', tags:['C++','Decision trees','Entropy'], description:'A decision tree classifier that makes information gain and branching logic tangible.', lede:'Machine learning fundamentals implemented in C++.', problem:'A classifier becomes easier to understand when the splitting criterion and tree structure are built explicitly.', approach:['Implemented decision-tree classification in C++.','Explored entropy and information gain as splitting criteria, with dynamic tree visualization.'], stats:[], note:'Description combines the existing portfolio and public GitHub profile. Historical accuracy is omitted because its evaluation setup is not documented here.', link:'Decision_Tree_Classifier'},
  {id:'bank', name:'A bank in C.', category:'systems', categoryLabel:'Systems foundations', year:'FOUNDATIONS', art:'bank', tags:['C','Data structures','File I/O'], description:'A banking simulation built around transactions, persistent records, and authentication.', lede:'A foundational systems project, built from scratch in C.', problem:'A banking simulation connects data structures and persistence to familiar operations: accounts, transactions, interest, and authentication.', approach:['Built a banking management system with file handling and encrypted data storage.','Implemented multi-currency transactions, automatic interest calculations, and a stock-market simulation.','Created an interactive command-line interface.'], stats:[['2nd place','Among 80+ Introduction to CS projects']], note:'Placement is reported in the public GitHub profile and previous portfolio; this is an educational simulation.', link:'IC-MAJOR-PROJECT'},
  {id:'jarvis', name:'Hey, Jarvis.', category:'apps', categoryLabel:'Voice interfaces', year:'2024', art:'voice', tags:['Python','Speech recognition','TTS'], description:'A voice-driven desktop assistant connecting natural language with everyday actions.', lede:'An exploratory Python project in voice interfaces and API orchestration.', problem:'Voice commands provide a practical way to explore speech recognition, intent handling, and desktop automation.', approach:['Connected voice input, text-to-speech, and the OpenAI API.','Integrated browser automation, news fetching, and music controls.','Organized functionality into modular Python components using SpeechRecognition and pyttsx3.'], stats:[], note:'A learning project, preserved from the original portfolio.', link:'Jarvis-AI-Virtual-Desktop-Personal-Assistant'}
];
const warden = {id:'warden',name:'WARDEN',categoryLabel:'Distributed systems',year:'2026 — PRESENT',tags:['FastAPI','PostgreSQL','Redis Streams','Docker','OpenTelemetry'],lede:'Track meaningful changes. Control when to crawl. Make alerts recoverable.',problem:'Monitoring the web is easy until pages are noisy, workers crash, alerts repeat, and a fixed crawl budget becomes a constraint. WARDEN treats those as core design problems.',approach:['FastAPI accepts authenticated monitor requests. PostgreSQL persists accepted work and outbox records; Redis Streams deliver jobs to isolated fetchers. Large payloads live in S3-compatible storage.','Myers diff, Merkle DOM hashing, SimHash, TF-IDF, and SSIM detect changes. A handwritten Pratt parser and RE2 power the typed rule language.','Transactional outboxes, HMAC-SHA256 webhooks, retries, cooldowns, circuit breakers, and dead-letter queues support recoverable delivery. WebSocket replay preserves event history.','Adaptive scheduling uses Poisson MAP estimation and Lagrangian optimization. Tenant-specific online logistic regression supports shadow scoring and gated model promotion.','Local implementation now includes a frontend, Django/DRF analytics, verified PostgreSQL standby behavior, PgBouncer transaction pooling, and Prometheus/Grafana/Jaeger observability.'],stats:[['500 / 500','Jobs recovered across 12 worker kills'],['37.7%','Less stale time in fixed-budget simulation'],['60,000','Rule programs tested through fuzzing'],['Up to 99.6%','Lower query time on 150,002 fixture rows']],note:'Active development with a Docker-hosted local UI; no public hosted demo. These are scoped experiments. F1 improved from 0.671 to 1.000 on 600 synthetic held-out examples, not a production dataset. Kubernetes remains roadmap work. Local README reviewed November 2026.',link:'WARDEN'};
const allProjects = [warden,...projects];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function art(kind) {
  const start = '<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  const end = '</svg>';
  const drawings = {
    data:'<path d="M35 38H100M35 75H100M35 112H100M200 75H265" stroke="#a2bf77" stroke-dasharray="3 4"/><rect x="100" y="30" width="100" height="90" rx="5" fill="#303d24" stroke="#8ba568"/><path d="M120 53H177M120 68H160M120 83H180M120 98H150" stroke="#c5e097" stroke-width="3"/><g fill="#c5df9c"><circle cx="35" cy="38" r="8"/><circle cx="35" cy="75" r="8"/><circle cx="35" cy="112" r="8"/></g><rect x="245" y="59" width="30" height="32" rx="3" fill="#91b367"/><path d="m253 75 6 6 9-13" stroke="#243118" stroke-width="2"/>',
    comic:'<g transform="rotate(-8 130 75)"><rect x="53" y="17" width="114" height="120" rx="3" fill="#383647" stroke="#9b94b9"/><path d="M63 27H103V77H63zM112 27H157V77H112zM63 86H157V127H63z" stroke="#9b94b9"/><path d="M72 39H95V52H81L77 57V52H72zM120 39H149V53H135L129 59V53H120z" fill="#c2bbd6"/><circle cx="85" cy="68" r="5" fill="#7a7395"/><circle cx="134" cy="68" r="5" fill="#7a7395"/><path d="M75 100H144M75 111H128" stroke="#958cae" stroke-width="3"/></g><path d="M185 65V85M198 48V102M211 36V114M224 56V94M237 67V83" stroke="#c7bce9" stroke-width="5" stroke-linecap="round"/>',
    vision:'<g stroke="#7c779a"><path d="m35 45 57 12v58l-57-12zM92 57l22-17v58l-22 17M35 45l22-17 57 12"/><path d="m133 43 32 7v59l-32-7zM165 50l15-12v59l-15 12M193 49l21 4v44l-21-4zM214 53l11-9v44l-11 9"/></g><path d="M115 72H132M181 72H192M226 72H244" stroke="#c2b4e6" stroke-dasharray="3 3"/><g fill="#c2b4e6"><circle cx="255" cy="48" r="6"/><circle cx="255" cy="73" r="6"/><circle cx="255" cy="98" r="6"/></g><g stroke="#a89bc9" opacity=".5"><path d="M46 48V105M59 51V108M72 54V111M83 56V113M35 61l57 12M35 78l57 12M35 93l57 12"/></g>',
    lock:'<rect x="110" y="12" width="82" height="132" rx="10" fill="#343026" stroke="#b2a382"/><path d="M135 21H167" stroke="#98866a" stroke-width="3" stroke-linecap="round"/><rect x="127" y="63" width="48" height="40" rx="4" fill="#bdaa7d"/><path d="M136 63V52a15 15 0 0 1 30 0v11" stroke="#d6c79f" stroke-width="4"/><circle cx="151" cy="79" r="4" fill="#3f382a"/><path d="M151 79V88" stroke="#3f382a" stroke-width="3"/><path d="M62 48h24M52 68h34M68 88h18M216 65h29M216 85h39M216 105h20" stroke="#8e7c59" stroke-dasharray="3 3"/>',
    tree:'<path d="M150 35 85 80M150 35 215 80M85 80 45 125M85 80 125 125M215 80 185 125M215 80 265 125" stroke="#8e84b3" stroke-width="1.5"/><rect x="130" y="12" width="40" height="32" rx="4" fill="#b6a8d7"/><rect x="65" y="64" width="40" height="32" rx="4" fill="#79708f"/><rect x="195" y="64" width="40" height="32" rx="4" fill="#79708f"/><g fill="#b6a8d7"><circle cx="45" cy="125" r="10"/><circle cx="125" cy="125" r="10"/><circle cx="185" cy="125" r="10"/><circle cx="265" cy="125" r="10"/></g><path d="M142 28h16M77 80h16M207 80h16" stroke="#352e46" stroke-width="2"/>',
    bank:'<path d="m80 50 70-35 70 35H80z" stroke="#bad294" fill="#344327"/><path d="M88 126h124M82 135h136" stroke="#b2c98b" stroke-width="4"/><path d="M99 61v53M132 61v53M166 61v53M201 61v53" stroke="#9cb87b" stroke-width="10"/><path d="M32 75h26M32 88h18M244 75h26M244 88h18" stroke="#728d53"/><circle cx="150" cy="37" r="6" fill="#c2dfa0"/>',
    voice:'<circle cx="150" cy="76" r="57" stroke="#897854" stroke-dasharray="2 6"/><circle cx="150" cy="76" r="43" stroke="#79694a"/><path d="M73 66V86M86 48V104M99 60V92M112 38V114M125 52V100M138 26V126M151 46V106M164 35V117M177 59V93M190 47V105M203 66V86M216 58V94M229 69V83" stroke="#cab182" stroke-width="4" stroke-linecap="round"/>'
  };
  return start + drawings[kind] + end;
}

$('#project-grid').innerHTML = projects.map((p,i)=>`<article class="project-card" data-category="${p.category}"><div class="project-art art-${p.category}"><div class="art-topline"><span>EXPERIMENT / ${String(i+2).padStart(3,'0')}</span><span>${p.categoryLabel.toUpperCase()}</span></div>${art(p.art)}</div><div class="card-meta"><span>${p.categoryLabel}</span><span>${p.year}</span></div><h3><button data-project="${p.id}">${p.name}</button></h3><p>${p.description}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('');

// Filtering retains DOM identity and uses the hidden attribute for assistive technology.
$$('.filter').forEach(button => button.addEventListener('click',()=>{
  $$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  let count=0;
  $$('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
  $('#project-count').textContent=`${String(count).padStart(2,'0')} PROJECT${count===1?'':'S'}`;
}));

const projectDialog=$('#project-dialog');
function openProject(id){
  const p=allProjects.find(p=>p.id===id);
  if(!p)return;
  $('#project-detail').innerHTML=`<p class="eyebrow">${p.categoryLabel.toUpperCase()} / ${p.year}</p><h2 id="dialog-title">${p.name}</h2><p class="detail-lede">${p.lede}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><h3>The problem</h3><p>${p.problem}</p>${p.stats.length?`<div class="detail-stats">${p.stats.map(s=>`<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}</div>`:''}<h3>Inside the engineering</h3><ul>${p.approach.map(a=>`<li>${a}</li>`).join('')}</ul><p class="note">${p.note}</p><div class="detail-links">${p.link?`<a class="button primary" href="https://github.com/Sidharth8100/${p.link}" target="_blank" rel="noopener">Explore source ↗</a>`:''}<a class="text-link" href="assets/SidharthBhagat.pdf" target="_blank" rel="noopener">Read the resume ↗</a></div>`;
  projectDialog.showModal();projectDialog.scrollTop=0;
}
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-project]');if(trigger)openProject(trigger.dataset.project);});
$$('dialog').forEach(dialog=>{
  $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
});

const stages=[
 ['01 / INGEST','Authenticated APIs accept a monitor. The scheduler allocates crawl capacity; Redis Streams hand work to isolated fetchers.'],
 ['02 / PROCESS','Snapshots are compared with text, DOM, and visual signals. The typed rule engine decides whether a change deserves attention.'],
 ['03 / DELIVER','A transactional outbox persists the alert. Signed webhooks and email use retries, cooldowns, and dead-letter queues; WebSockets support replay.']
];
let traceTimers=[];
function selectStage(index){
  $$('.pipeline-node').forEach((node,i)=>{node.classList.toggle('active',i===index);node.setAttribute('aria-pressed',String(i===index));});
  $('#stage-code').textContent=stages[index][0];$('#stage-description').textContent=stages[index][1];
}
function stopTrace(){traceTimers.forEach(clearTimeout);traceTimers=[];$('#trace-button').disabled=false;$('#trace-button').innerHTML='Trace an event <span>→</span>';}
$$('.pipeline-node').forEach(node=>node.addEventListener('click',()=>{stopTrace();selectStage(Number(node.dataset.stage));}));
selectStage(0);
$('#trace-button').addEventListener('click',()=>{
  stopTrace();selectStage(0);$('#trace-button').disabled=true;$('#trace-button').textContent='Tracing…';
  [1,2].forEach(i=>traceTimers.push(setTimeout(()=>selectStage(i),i*(reducedMotion.matches?150:1100))));
  traceTimers.push(setTimeout(()=>{stopTrace();$('#trace-button').textContent='Trace again ↻';},reducedMotion.matches?500:3500));
});

// A real BFS over a four-neighbor, unweighted grid. Rendering is separate from search.
const ROWS=8,COLS=14,START=2*COLS+1,END=5*COLS+12;
const initialWalls=[17,18,19,33,47,61,75,89,48,49,50,65,79,93,102,103];
let walls=new Set(initialWalls),searchVersion=0,searchRunning=false;
const grid=$('#path-grid');
for(let i=0;i<ROWS*COLS;i++){
 const cell=document.createElement('button');cell.type='button';cell.className='grid-cell';cell.dataset.cell=i;
 cell.addEventListener('click',()=>{if(i===START||i===END||searchRunning)return;walls.has(i)?walls.delete(i):walls.add(i);renderGrid();$('#path-status').textContent='Map updated. Run BFS to find the shortest route.';});
 cell.addEventListener('keydown',event=>{
  const moves={ArrowRight:1,ArrowLeft:-1,ArrowDown:COLS,ArrowUp:-COLS};if(!(event.key in moves))return;event.preventDefault();const next=i+moves[event.key];if(next>=0&&next<ROWS*COLS&&(!(event.key==='ArrowRight'||event.key==='ArrowLeft')||Math.floor(next/COLS)===Math.floor(i/COLS)))grid.children[next].focus();
 });
 grid.appendChild(cell);
}
function renderGrid(){
 [...grid.children].forEach((cell,i)=>{const state=i===START?'start':i===END?'end':walls.has(i)?'wall':'';cell.className=`grid-cell ${state}`;cell.textContent=i===START?'S':i===END?'F':'';cell.setAttribute('aria-label',`Row ${Math.floor(i/COLS)+1}, column ${i%COLS+1}: ${state||'open'}`);cell.setAttribute('aria-pressed',String(walls.has(i)));cell.disabled=searchRunning||i===START||i===END;});
}
function breadthFirstSearch(blocked){
 const queue=[START],parents=new Map([[START,null]]),visited=[];
 for(let head=0;head<queue.length;head++){
  const current=queue[head];visited.push(current);if(current===END)break;
  const row=Math.floor(current/COLS),col=current%COLS;
  const neighbors=[];if(col<COLS-1)neighbors.push(current+1);if(row<ROWS-1)neighbors.push(current+COLS);if(col>0)neighbors.push(current-1);if(row>0)neighbors.push(current-COLS);
  for(const next of neighbors)if(!blocked.has(next)&&!parents.has(next)){parents.set(next,current);queue.push(next);}
 }
 const path=[];if(parents.has(END)){let at=END;while(at!==null){path.unshift(at);at=parents.get(at);}}
 return {visited,path};
}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
$('#solve-path').addEventListener('click',async()=>{
 const version=++searchVersion;searchRunning=true;renderGrid();$('#solve-path').disabled=true;$('#path-status').textContent='Exploring the grid, one layer at a time…';
 const {visited,path}=breadthFirstSearch(walls);
 for(const index of visited){if(version!==searchVersion)return;if(index!==START&&index!==END)grid.children[index].classList.add('visited');if(!reducedMotion.matches)await delay(13);}
 for(const index of path){if(version!==searchVersion)return;if(index!==START&&index!==END)grid.children[index].classList.add('path');if(!reducedMotion.matches)await delay(30);}
 if(version!==searchVersion)return;
 searchRunning=false;[...grid.children].forEach((cell,i)=>{cell.disabled=i===START||i===END;});$('#solve-path').disabled=false;
 $('#path-status').textContent=path.length?`Shortest path: ${path.length-1} steps. ${visited.length} cells explored. BFS guarantees a shortest path on this unweighted grid.`:`No path found after exploring ${visited.length} cells. Remove a wall or reset the map and try again.`;
});
$('#reset-path').addEventListener('click',()=>{searchVersion++;searchRunning=false;walls=new Set(initialWalls);renderGrid();$('#solve-path').disabled=false;$('#path-status').textContent='Map reset. Draw walls, then find a shortest path.';});
renderGrid();

// Generative torus: draw a depth-sorted point cloud and latitude strands on Canvas 2D.
// Animation stops off screen, in background tabs, and under reduced-motion preferences.
const canvas=$('#system-canvas'),ctx=canvas.getContext('2d');
let width=0,height=0,angle=0,frame=0,lastTime=0,visible=true,paused=reducedMotion.matches,pointer={x:0,y:0};
function drawSculpture(){
 if(!ctx||!width)return;
 ctx.clearRect(0,0,width,height);
 const scale=Math.min(width,height)*.30;
 const rx=.66+pointer.y*.25,ry=angle+pointer.x*.25;
 const project=(u,v)=>{
  const ring=1+.37*Math.cos(v);let x=ring*Math.cos(u),y=ring*Math.sin(u),z=.37*Math.sin(v);
  const y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);
  const x1=x*Math.cos(ry)+z1*Math.sin(ry),z2=-x*Math.sin(ry)+z1*Math.cos(ry);
  const twist=.34;const px=x1*Math.cos(twist)-y1*Math.sin(twist),py=x1*Math.sin(twist)+y1*Math.cos(twist);
  const perspective=3.8/(3.8+z2);return {x:width*.5+px*scale*perspective,y:height*.51+py*scale*perspective,z:z2};
 };
 // Measurement rings are stable, like the etched marks on a scientific instrument.
 ctx.strokeStyle='#63774724';ctx.lineWidth=.7;
 for(const factor of [1.24,1.52]){ctx.beginPath();ctx.ellipse(width/2,height*.51,scale*factor,scale*factor*.94,-.3,0,Math.PI*2);ctx.stroke();}
 for(let i=0;i<80;i++){const t=i*Math.PI/40;const r=scale*1.52;ctx.beginPath();ctx.moveTo(width/2+Math.cos(t)*r,height*.51+Math.sin(t)*r*.94);ctx.lineTo(width/2+Math.cos(t)*(r+((i%5)?3:7)),height*.51+Math.sin(t)*(r+((i%5)?3:7))*.94);ctx.stroke();}
 const strands=[];
 for(let j=0;j<28;j++){const v=j*Math.PI*2/28;const points=[];for(let i=0;i<=100;i++)points.push(project(i*Math.PI*2/100,v));strands.push({points,z:points.reduce((sum,p)=>sum+p.z,0)/points.length});}
 strands.sort((a,b)=>b.z-a.z);
 for(const strand of strands){for(let i=1;i<strand.points.length;i++){const a=strand.points[i-1],b=strand.points[i];const light=Math.max(.08,Math.min(.8,.38-b.z*.27));ctx.strokeStyle=`rgba(197,226,142,${light})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
 for(let i=0;i<52;i++){const u=i*Math.PI*2/52;for(let j=0;j<28;j++){const p=project(u,j*Math.PI*2/28);ctx.fillStyle=`rgba(216,241,168,${Math.max(.13,.6-p.z*.3)})`;ctx.beginPath();ctx.arc(p.x,p.y,p.z<0?1.05:.65,0,Math.PI*2);ctx.fill();}}
}
function animate(time){frame=0;if(paused||!visible||document.hidden)return;if(!lastTime)lastTime=time;angle+=Math.min(time-lastTime,50)*.00012;lastTime=time;drawSculpture();frame=requestAnimationFrame(animate);}
function syncAnimation(){cancelAnimationFrame(frame);frame=0;lastTime=0;drawSculpture();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(animate);$('#motion-toggle').textContent=paused?'Resume motion ▷':'Pause motion Ⅱ';$('#motion-toggle').setAttribute('aria-pressed',String(paused));}
function resizeCanvas(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);drawSculpture();}
canvas.addEventListener('pointermove',event=>{if(paused||reducedMotion.matches)return;const r=canvas.getBoundingClientRect();pointer={x:(event.clientX-r.left)/r.width-.5,y:(event.clientY-r.top)/r.height-.5};});
canvas.addEventListener('pointerleave',()=>{pointer={x:0,y:0};});
$('#motion-toggle').addEventListener('click',()=>{paused=!paused;syncAnimation();});
reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;syncAnimation();});
document.addEventListener('visibilitychange',syncAnimation);
new ResizeObserver(resizeCanvas).observe(canvas);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncAnimation();},{threshold:.05}).observe(canvas);
resizeCanvas();syncAnimation();

const menu=$('.menu-toggle'),nav=$('.site-header nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰';}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰';});
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
const progress=$('.reading-progress');
function updateProgress(){const total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${total>0?100*window.scrollY/total:0}%`;}
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.site-header nav a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -65% 0px'}).observe($('#work'));
// Observe the remaining navigation sections with the same activation band.
const sectionObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)$$('.site-header nav a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-20% 0px -65% 0px'});
['home','journey','arena','about','contact'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
function updateTime(){const now=new Date();$('#local-time').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}).format(now)+' IST';$('#local-time').dateTime=now.toISOString();$('#year').textContent=now.getFullYear();}
updateTime();setInterval(updateTime,60000);
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('sidharthbhagat2005@gmail.com');$('#copy-status').textContent='Email copied. Say hello!';}catch{$('#copy-status').textContent='Copy unavailable here. Select the address above, or click it to email.';}});

// A small, keyboard-accessible command palette. Search never inserts user HTML.
const commandDialog=$('#command-dialog');
const commands=[{label:'Selected work',href:'#work',kind:'SECTION'},{label:'Experience & journey',href:'#journey',kind:'SECTION'},{label:'Coding arena & LeetCode',href:'#arena',kind:'SECTION'},{label:'About & toolkit',href:'#about',kind:'SECTION'},{label:'Contact Sidharth',href:'#contact',kind:'SECTION'},{label:'Read resume',href:'assets/SidharthBhagat.pdf',kind:'PDF'},...allProjects.map(p=>({label:p.name,project:p.id,kind:'PROJECT'}))];
function renderCommands(){const query=$('#command-search').value.toLowerCase().trim();const matches=commands.filter(c=>c.label.toLowerCase().includes(query));const list=$('#command-results');list.replaceChildren();for(const c of matches){const el=document.createElement(c.project?'button':'a');el.append(document.createTextNode(c.label));const tag=document.createElement('span');tag.textContent=c.kind+' ↗';el.append(tag);if(c.href){el.href=c.href;if(!c.href.startsWith('#')){el.target='_blank';el.rel='noopener';}}el.addEventListener('click',()=>{commandDialog.close();if(c.project)openProject(c.project);});list.append(el);}if(!matches.length){const p=document.createElement('p');p.className='empty';p.textContent='No matches. Try “work”, “resume”, or “WARDEN”.';list.append(p);}}
function openCommands(){$('#command-search').value='';renderCommands();commandDialog.showModal();$('#command-search').focus();}
$('.command-trigger').addEventListener('click',openCommands);
$('#command-search').addEventListener('input',renderCommands);
$('#command-search').addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();$('#command-results a, #command-results button')?.focus();}if(event.key==='Enter'){$('#command-results a, #command-results button')?.click();}});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(commandDialog.open)commandDialog.close();else if(!projectDialog.open)openCommands();}});

// Preserve bookmarked routes from the previous HashRouter portfolio.
const legacyRoutes={'#/work':'#work','#/about':'#about','#/skills':'#about','#/':'#home'};
if(legacyRoutes[location.hash]){const target=legacyRoutes[location.hash];history.replaceState(null,'',target);requestAnimationFrame(()=>$(target)?.scrollIntoView({behavior:'instant'}));}
