const svg = document.querySelector("#signal-grid");
const axesLayer = document.querySelector("#axes");
const ticksLayer = document.querySelector("#ticks");
const origin = document.querySelector("#signal-origin");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let drawingVersion = 0;
let resizeFrame;

function svgLine(className) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("class", className);
  return line;
}

function setLine(line, x1, y1, x2, y2) {
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}

function easeOutQuart(value) {
  return 1 - Math.pow(1 - value, 4);
}

function animateLine(line, start, end, duration, delay, version) {
  if (reducedMotion.matches) {
    setLine(line, start.x, start.y, end.x, end.y);
    return;
  }

  setLine(line, start.x, start.y, start.x, start.y);
  const startedAt = performance.now() + delay;

  function draw(now) {
    if (version !== drawingVersion) return;

    const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
    const eased = easeOutQuart(progress);
    const x = start.x + (end.x - start.x) * eased;
    const y = start.y + (end.y - start.y) * eased;
    setLine(line, start.x, start.y, x, y);

    if (progress < 1) requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function drawSignalGrid(animate = false) {
  drawingVersion += 1;
  const version = drawingVersion;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const originRect = origin.getBoundingClientRect();
  const point = {
    x: Math.round(originRect.left),
    y: Math.round(originRect.top),
  };

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  axesLayer.replaceChildren();
  ticksLayer.replaceChildren();

  const endpoints = [
    { x: 0, y: point.y },
    { x: width, y: point.y },
    { x: point.x, y: 0 },
    { x: point.x, y: height },
  ];

  endpoints.forEach((endpoint, index) => {
    const line = svgLine("axis-line");
    axesLayer.append(line);

    if (animate) {
      animateLine(line, point, endpoint, 760, index * 85, version);
    } else {
      setLine(line, point.x, point.y, endpoint.x, endpoint.y);
    }
  });

  const westSpan = Math.max(point.x, 0);
  const tickCount = Math.max(3, Math.min(7, Math.floor(westSpan / 170)));
  for (let index = 1; index < tickCount; index += 1) {
    const x = Math.round((westSpan / tickCount) * index);
    const line = svgLine("tick-line");
    setLine(line, x, point.y, x, point.y - 42);
    ticksLayer.append(line);

    if (animate && !reducedMotion.matches) {
      line.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 0.6, transform: "translateY(0)" },
        ],
        { duration: 300, delay: 560 + index * 75, fill: "backwards", easing: "ease-out" },
      );
    }
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function typeText(element, speed, cursor = false) {
  const text = element.dataset.text || element.textContent.trim();
  element.setAttribute("aria-label", text);

  if (reducedMotion.matches) {
    element.textContent = text;
    element.classList.add("is-typed");
    if (cursor) element.classList.add("type-cursor");
    return;
  }

  element.textContent = "";
  element.classList.add("is-typing");
  await wait(180);

  for (let index = 1; index <= text.length; index += 1) {
    element.textContent = text.slice(0, index);
    await wait(speed + Math.random() * speed * 0.45);
  }

  element.classList.remove("is-typing");
  element.classList.add("is-typed");
  if (cursor) element.classList.add("type-cursor");
}

async function runIntro() {
  const [eyebrow, title, contactCopy] = document.querySelectorAll("[data-type]");
  const contact = document.querySelector("[data-reveal]");

  if (reducedMotion.matches) {
    await Promise.all([
      typeText(eyebrow, 0),
      typeText(title, 0, true),
      typeText(contactCopy, 0),
    ]);
    contact.classList.add("is-revealed");
    return;
  }

  await typeText(eyebrow, 22);
  await typeText(title, 34, true);
  contact.classList.add("is-revealed");
  await typeText(contactCopy, 21);
}

function updatePointerGlow(event) {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  document.documentElement.style.setProperty("--mx", `${x}%`);
  document.documentElement.style.setProperty("--my", `${y}%`);
}

window.addEventListener("pointermove", updatePointerGlow, { passive: true });
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => drawSignalGrid(false));
});

document.fonts.ready.then(() => {
  drawSignalGrid(true);
  runIntro();
});
