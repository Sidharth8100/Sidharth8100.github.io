/* Progressive interaction layer. No animation library, remote assets, or scroll hijacking.
   Orbital physics, a finite particle-flight lifecycle, and lightweight tactile surfaces. */
(() => {
  "use strict";
  const scene = document.querySelector(".orbital-scene");
  const canvas = document.querySelector("#system-canvas");
  const ctx = canvas.getContext("2d");
  const launch = document.querySelector("#launch-journey");
  const toggle = document.querySelector("#motion-toggle");
  const overlay = document.querySelector("#flight-overlay");
  const flightCanvas = document.querySelector("#flight-canvas");
  const flightCtx = flightCanvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const TAU = Math.PI * 2;
  const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
  const mix = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  let width = 0,
    height = 0,
    angle = 0.6,
    frame = 0,
    lastTime = 0,
    onScreen = true;
  let paused = reduced.matches,
    destination = "journey",
    flight = null;
  let hovered = false,
    hoverEnergy = 0;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, tiltX: 0, tiltY: 0 };
  const particles = [];
  const rows = 24,
    columns = 64;
  for (let row = 0; row < rows; row++)
    for (let col = 0; col < columns; col++) {
      const u = (col * TAU) / columns,
        v = (row * TAU) / rows;
      particles.push({
        u,
        v,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
        z: 0,
        glow: 0,
      });
    }

  function project(p) {
    const ring = 1 + 0.37 * Math.cos(p.v);
    const x = ring * Math.cos(p.u),
      y = ring * Math.sin(p.u),
      z = 0.37 * Math.sin(p.v);
    const rx = 0.7 + pointer.tiltY * 0.5,
      ry = angle + pointer.tiltX * 0.7;
    const y1 = y * Math.cos(rx) - z * Math.sin(rx),
      z1 = y * Math.sin(rx) + z * Math.cos(rx);
    const x1 = x * Math.cos(ry) + z1 * Math.sin(ry),
      z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    const scale = Math.min(width, height) * 0.285,
      perspective = 3.8 / (3.8 + z2);
    return {
      x:
        width * 0.5 +
        (x1 * Math.cos(0.34) - y1 * Math.sin(0.34)) * scale * perspective,
      y:
        height * 0.46 +
        (x1 * Math.sin(0.34) + y1 * Math.cos(0.34)) * scale * perspective,
      z: z2,
    };
  }
  function draw(dt = paused ? 0 : 1) {
    if (!ctx || !width) return;
    ctx.clearRect(0, 0, width, height);
    const response = 1 - Math.pow(0.88, dt);
    pointer.x = mix(pointer.x, pointer.targetX, response);
    pointer.y = mix(pointer.y, pointer.targetY, response);
    pointer.tiltX = mix(
      pointer.tiltX,
      hovered ? pointer.targetX / width - 0.5 : 0,
      response * 0.55,
    );
    pointer.tiltY = mix(
      pointer.tiltY,
      hovered ? pointer.targetY / height - 0.5 : 0,
      response * 0.55,
    );
    hoverEnergy = mix(hoverEnergy, hovered && !paused ? 1 : 0, response);
    const radius = Math.min(width, height) * 0.25;
    // Etched orbit guides stay still while the point cloud flexes.
    ctx.strokeStyle = "rgba(157,183,111,.13)";
    ctx.lineWidth = 0.65;
    for (const factor of [1.5, 1.72]) {
      ctx.beginPath();
      ctx.ellipse(
        width / 2,
        height * 0.46,
        radius * factor,
        radius * factor * 0.88,
        -0.25,
        0,
        TAU,
      );
      ctx.stroke();
    }
    if (hoverEnergy > 0.02) {
      const halo = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        105,
      );
      halo.addColorStop(0, `rgba(218,239,143,${hoverEnergy * 0.065})`);
      halo.addColorStop(1, "rgba(218,239,143,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);
    }
    for (const p of particles) {
      const home = project(p),
        ox = home.x - pointer.x,
        oy = home.y - pointer.y;
      const distance = Math.hypot(ox, oy),
        reach = Math.min(120, width * 0.28);
      const proximity = Math.max(0, 1 - distance / reach) * hoverEnergy;
      const force = proximity * proximity * 48;
      // A damped spring returns displaced dots to the moving surface. Clamped dt
      // prevents large impulses after throttling, and avoids pointer-entry jumps.
      const tx = distance > 0.1 ? (ox / distance) * force : 0,
        ty = distance > 0.1 ? (oy / distance) * force : 0;
      p.vx = (p.vx + (tx - p.dx) * 0.075 * dt) * Math.pow(0.77, dt);
      p.vy = (p.vy + (ty - p.dy) * 0.075 * dt) * Math.pow(0.77, dt);
      p.dx += p.vx * dt;
      p.dy += p.vy * dt;
      p.x = home.x + p.dx;
      p.y = home.y + p.dy;
      p.z = home.z;
      p.glow = proximity;
    }
    // Lines use the same displaced coordinates as dots: the mesh bends as a whole.
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < columns; col++) {
        const p = particles[row * columns + col],
          q = particles[row * columns + ((col + 1) % columns)];
        ctx.strokeStyle = `rgba(204,230,143,${clamp(0.29 - p.z * 0.19 + p.glow * 0.22, 0.06, 0.72)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    for (const p of particles) {
      ctx.fillStyle = `rgba(226,244,166,${clamp(0.53 - p.z * 0.29 + p.glow * 0.4, 0.12, 1)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, (p.z < 0 ? 1.1 : 0.65) + p.glow * 1.4, 0, TAU);
      ctx.fill();
    }
    if (hoverEnergy > 0.08) {
      ctx.strokeStyle = `rgba(219,241,164,${hoverEnergy * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 9 + hoverEnergy * 5, 0, TAU);
      ctx.stroke();
      for (const sign of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(pointer.x + sign * 20, pointer.y);
        ctx.lineTo(pointer.x + sign * 25, pointer.y);
        ctx.stroke();
      }
    }
  }
  function tick(time) {
    frame = 0;
    if (paused || !onScreen || document.hidden || flight) return;
    const dt = lastTime ? clamp((time - lastTime) / 16.667, 0.2, 2) : 1;
    lastTime = time;
    angle += 0.0018 * dt * (1 - hoverEnergy * 0.65);
    draw(dt);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    document.body.dataset.motion = paused ? "paused" : "running";
    toggle.textContent = paused ? "Resume motion ▷" : "Pause motion Ⅱ";
    toggle.setAttribute("aria-pressed", String(paused));
    if (!flight) draw();
    if (!paused && onScreen && !document.hidden && !flight)
      frame = requestAnimationFrame(tick);
  }
  function resize() {
    if (flight) {
      finishFlight(true);
    }
    const r = canvas.getBoundingClientRect();
    width = r.width;
    height = r.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  launch.addEventListener("pointerenter", (event) => {
    if (!finePointer.matches || paused) return;
    const r = canvas.getBoundingClientRect();
    pointer.x = pointer.targetX = event.clientX - r.left;
    pointer.y = pointer.targetY = event.clientY - r.top;
    hovered = true;
    scene.classList.add("is-engaged");
  });
  launch.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || paused) return;
    const r = canvas.getBoundingClientRect();
    pointer.targetX = clamp(event.clientX - r.left, 0, width);
    pointer.targetY = clamp(event.clientY - r.top, 0, height);
  });
  launch.addEventListener("pointerleave", () => {
    hovered = false;
    scene.classList.remove("is-engaged");
  });
  toggle.addEventListener("click", () => {
    paused = !paused;
    hovered = false;
    if (paused) hoverEnergy = 0;
    scene.classList.remove("is-engaged");
    sync();
  });
  reduced.addEventListener("change", () => {
    paused = reduced.matches;
    if (flight) finishFlight(true);
    sync();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && flight) finishFlight(true);
    sync();
  });
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0.05 },
  ).observe(canvas);

  // The launch follows three deterministic phases: implode, scatter, reassemble.
  // The overlay never captures input; Escape, scrolling, or a tab switch can end it.
  function navigate() {
    const section = document.getElementById(destination),
      heading = section.querySelector("h2");
    history.pushState(null, "", `#${destination}`);
    section.scrollIntoView({ behavior: "instant", block: "start" });
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    section.classList.remove("signal-arrival");
    if (!paused && !reduced.matches) {
      void section.offsetWidth;
      section.classList.add("signal-arrival");
    }
    document.querySelector("#flight-status").textContent =
      `Now exploring ${destination}.`;
  }
  function finishFlight(arrive) {
    if (!flight) return;
    cancelAnimationFrame(flight.frame);
    if (arrive && !flight.navigated) navigate();
    flight = null;
    overlay.hidden = true;
    scene.classList.remove("is-launching");
    launch.disabled = false;
    flightCtx?.clearRect(0, 0, flightCanvas.width, flightCanvas.height);
    sync();
  }
  function startFlight() {
    if (flight) return;
    if (reduced.matches || paused || !ctx || !flightCtx) {
      navigate();
      return;
    }
    hovered = false;
    cancelAnimationFrame(frame);
    scene.classList.remove("is-engaged");
    scene.classList.add("is-launching");
    launch.disabled = true;
    const bounds = canvas.getBoundingClientRect(),
      w = innerWidth,
      h = innerHeight,
      dpr = Math.min(devicePixelRatio || 1, 2);
    flightCanvas.width = Math.round(w * dpr);
    flightCanvas.height = Math.round(h * dpr);
    flightCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const origin = {
      x: bounds.left + width * 0.5,
      y: bounds.top + height * 0.46,
    };
    const sparks = particles
      .filter((_, i) => i % 2 === 0)
      .map((p, i) => {
        const theta = i * 2.399963;
        const distance = 110 + ((i * 79) % 460);
        return {
          x: bounds.left + p.x,
          y: bounds.top + p.y,
          bx: origin.x + Math.cos(theta) * distance * 1.7,
          by: origin.y + Math.sin(theta) * distance,
          size: 0.7 + (i % 4) * 0.35,
          seed: i,
        };
      });
    document.querySelector("#flight-destination").textContent =
      `THE ${destination.toUpperCase()}`;
    document.querySelector("#flight-phase").textContent =
      "RELEASING THE SIGNAL";
    document.querySelector("#flight-status").textContent =
      `Opening ${destination}.`;
    overlay.hidden = false;
    flight = {
      started: performance.now(),
      sparks,
      origin,
      w,
      h,
      frame: 0,
      navigated: false,
    };
    flight.frame = requestAnimationFrame(drawFlight);
  }
  function drawFlight(now) {
    if (!flight) return;
    const f = flight,
      t = (now - f.started) / 1000;
    if (t >= 1.85) {
      finishFlight(true);
      return;
    }
    if (t > 0.86 && !f.navigated) {
      navigate();
      f.navigated = true;
      document.querySelector("#flight-phase").textContent = "FOLLOW THE SIGNAL";
    }
    flightCtx.clearRect(0, 0, f.w, f.h);
    // No full-screen flash: a dark scrim bridges the jump between sections.
    const shade =
      t < 0.28
        ? mix(0, 0.8, t / 0.28)
        : t < 1.05
          ? 0.8
          : 0.8 * (1 - ease((t - 1.05) / 0.7));
    flightCtx.fillStyle = `rgba(12,16,9,${shade})`;
    flightCtx.fillRect(0, 0, f.w, f.h);
    let target = { x: f.w * 0.22, y: 200 };
    if (f.navigated) {
      const r = document
        .querySelector(`#${destination} h2`)
        .getBoundingClientRect();
      target = {
        x: r.left + Math.min(r.width * 0.4, 170),
        y: r.top + r.height * 0.5,
      };
    }
    for (const p of f.sparks) {
      const sx = mix(p.x, f.origin.x, 0.18),
        sy = mix(p.y, f.origin.y, 0.18);
      let x,
        y,
        alpha = 1;
      if (t < 0.25) {
        const q = ease(t / 0.25);
        x = mix(p.x, sx, q);
        y = mix(p.y, sy, q);
      } else if (t < 0.88) {
        const q = ease((t - 0.25) / 0.63);
        x = mix(sx, p.bx, q);
        y = mix(sy, p.by, q);
      } else {
        const q = ease((t - 0.88) / 0.91),
          theta = p.seed * 2.399963;
        const orbit = 14 + (p.seed % 37) * 1.8;
        x = mix(p.bx, target.x + Math.cos(theta) * orbit, q);
        y = mix(p.by, target.y + Math.sin(theta) * orbit * 0.5, q);
        alpha = 1 - ease((t - 1.38) / 0.42);
        if (q < 0.97) {
          flightCtx.strokeStyle = `rgba(216,239,150,${alpha * 0.23})`;
          flightCtx.lineWidth = 0.75;
          flightCtx.beginPath();
          flightCtx.moveTo(x, y);
          flightCtx.lineTo(x + (p.bx - x) * 0.045, y + (p.by - y) * 0.045);
          flightCtx.stroke();
        }
      }
      flightCtx.fillStyle = `rgba(225,246,161,${alpha})`;
      flightCtx.beginPath();
      flightCtx.arc(x, y, p.size, 0, TAU);
      flightCtx.fill();
    }
    if (t > 0.25 && t < 0.95) {
      const q = (t - 0.25) / 0.7;
      flightCtx.strokeStyle = `rgba(222,244,159,${(1 - q) * 0.55})`;
      flightCtx.lineWidth = 1;
      flightCtx.beginPath();
      flightCtx.arc(
        f.origin.x,
        f.origin.y,
        25 + ease(q) * Math.max(f.w, f.h) * 0.6,
        0,
        TAU,
      );
      flightCtx.stroke();
    }
    overlay.style.setProperty(
      "--caption-opacity",
      String(t < 1.35 ? 1 : 1 - ease((t - 1.35) / 0.4)),
    );
    f.frame = requestAnimationFrame(drawFlight);
  }
  launch.addEventListener("click", startFlight);
  document.querySelectorAll("[data-destination]").forEach((button) =>
    button.addEventListener("click", () => {
      if (flight) return;
      destination = button.dataset.destination;
      document
        .querySelectorAll("[data-destination]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      document.querySelector("#launch-label").textContent =
        `CLICK TO ENTER MY ${destination.toUpperCase()}`;
      launch.setAttribute(
        "aria-label",
        `Burst the sculpture and explore my ${destination}`,
      );
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && flight) {
      event.preventDefault();
      finishFlight(true);
    }
  });
  window.addEventListener(
    "wheel",
    () => {
      if (flight) finishFlight(true);
    },
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    () => {
      if (flight) finishFlight(true);
    },
    { passive: true },
  );
  window.addEventListener("popstate", () => finishFlight(false));
  resize();
  sync();

  // Tactile project windows: bounded tilt, a cursor-following light, and a
  // spring return. Only visible, hovered surfaces get animation frames.
  document
    .querySelectorAll(".project-art, .pipeline-node")
    .forEach((surface) => {
      let active = false,
        id = 0,
        last = 0,
        x = 0,
        y = 0,
        tx = 0,
        ty = 0;
      function settle(time) {
        const dt = last ? clamp((time - last) / 16.667, 0.2, 2) : 1;
        last = time;
        const response = 1 - Math.pow(0.8, dt);
        x = mix(x, tx, response);
        y = mix(y, ty, response);
        surface.style.setProperty("--tilt-x", `${-y * 6}deg`);
        surface.style.setProperty("--tilt-y", `${x * 7}deg`);
        if (Math.abs(x - tx) + Math.abs(y - ty) > 0.002)
          id = requestAnimationFrame(settle);
        else {
          if (!active) {
            surface.style.removeProperty("--tilt-x");
            surface.style.removeProperty("--tilt-y");
          }
          id = 0;
        }
      }
      function reset() {
        active = false;
        tx = ty = 0;
        surface.classList.remove("is-reactive");
        if (paused || reduced.matches) {
          cancelAnimationFrame(id);
          id = 0;
          x = y = 0;
          surface.style.removeProperty("--tilt-x");
          surface.style.removeProperty("--tilt-y");
        } else if (!id) {
          last = 0;
          id = requestAnimationFrame(settle);
        }
      }
      surface.addEventListener("pointerenter", () => {
        if (!finePointer.matches || paused || reduced.matches) return;
        active = true;
        surface.classList.add("is-reactive");
        if (!id) {
          last = 0;
          id = requestAnimationFrame(settle);
        }
      });
      surface.addEventListener("pointermove", (event) => {
        if (!active) return;
        const r = surface.getBoundingClientRect();
        tx = (event.clientX - r.left) / r.width - 0.5;
        ty = (event.clientY - r.top) / r.height - 0.5;
        surface.style.setProperty("--light-x", `${(tx + 0.5) * 100}%`);
        surface.style.setProperty("--light-y", `${(ty + 0.5) * 100}%`);
        if (!id) {
          last = 0;
          id = requestAnimationFrame(settle);
        }
      });
      surface.addEventListener("pointerleave", reset);
      surface.addEventListener("blur", reset);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          reset();
          cancelAnimationFrame(id);
          id = 0;
          x = y = 0;
          surface.style.removeProperty("--tilt-x");
          surface.style.removeProperty("--tilt-y");
        }
      });
      reduced.addEventListener("change", reset);
      toggle.addEventListener("click", reset);
    });

  // A click emits a short local ripple. Event tracing lights the active stage and
  // sends a visible packet down its connector; no fabricated live status.
  document.querySelectorAll(".pipeline-node").forEach((node) =>
    node.addEventListener("click", () => {
      if (paused || reduced.matches) return;
      node.classList.remove("node-pulse");
      void node.offsetWidth;
      node.classList.add("node-pulse");
    }),
  );
  const pipeline = document.querySelector(".pipeline-demo");
  new MutationObserver(() => {
    pipeline.classList.toggle(
      "is-tracing",
      document.querySelector("#trace-button").disabled,
    );
  }).observe(document.querySelector("#trace-button"), {
    attributes: true,
    attributeFilter: ["disabled"],
  });
  // Brief, interruptible reveals provide feedback for a filter or disclosure.
  // Content is never hidden in CSS: a script failure leaves everything readable.
  const reveals = new Map();
  function reveal(element, delay = 0) {
    reveals.get(element)?.cancel();
    if (paused || reduced.matches) return;
    const animation = element.animate(
      [
        { opacity: 0.35, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 330, delay, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
    reveals.set(element, animation);
    animation.onfinish = () => reveals.delete(element);
  }
  document.querySelectorAll(".filter").forEach((button) =>
    button.addEventListener("click", () => {
      document.querySelectorAll(".project-card").forEach((card, index) => {
        reveals.get(card)?.cancel();
        if (!card.hidden) reveal(card, index * 24);
      });
    }),
  );
  document
    .querySelectorAll(".timeline details, .skill-groups details")
    .forEach((detail) =>
      detail.addEventListener("toggle", () => {
        if (detail.open) {
          const content = detail.querySelector(".timeline-detail, p");
          if (content) reveal(content);
        }
      }),
    );
  function cancelReveals() {
    for (const animation of reveals.values()) animation.cancel();
    reveals.clear();
  }
  reduced.addEventListener("change", cancelReveals);
  toggle.addEventListener("click", cancelReveals);
})();
