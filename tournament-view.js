const TOURNAMENT_VIEW_STORAGE_KEY = "tbr-warfare-tournament-view-v1";
const VIEW_POLL_INTERVAL_MS = 500;
const NODE_WIDTH = 560;
const HEADER_HEIGHT = 88;
const NODE_PADDING = 18;
const CHIP_HEIGHT = 92;
const CHIP_GAP = 10;
const NODE_GAP = 56;
const COLUMN_GAP = 196;
const BRACKET_PADDING_X = 72;
const BRACKET_PADDING_Y = 54;
const MINOR_WORDS = new Set(["a", "an", "and", "at", "for", "from", "in", "of", "on", "or", "the", "to"]);

const els = {
  canvas: document.getElementById("tournamentCanvas"),
  status: document.getElementById("tournamentStatus"),
  updatedAt: document.getElementById("tournamentUpdatedAt"),
};

const ctx = els.canvas.getContext("2d");
const state = {
  snapshot: null,
  layout: null,
  lastSerialized: "",
  camera: {
    x: 0,
    y: 0,
    zoom: 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
  },
  needsFit: true,
};

bootstrapTournamentView();

function bootstrapTournamentView() {
  window.addEventListener("resize", sizeCanvas);
  window.addEventListener("storage", onStorageUpdate);
  els.canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  els.canvas.addEventListener("wheel", onWheel, { passive: false });
  sizeCanvas();
  refreshSnapshot();
  window.setInterval(refreshSnapshot, VIEW_POLL_INTERVAL_MS);
  requestAnimationFrame(loop);
}

function sizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.canvas.width = Math.max(1, Math.round(rect.width * dpr));
  els.canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function onStorageUpdate(event) {
  if (event.key !== TOURNAMENT_VIEW_STORAGE_KEY) return;
  refreshSnapshot();
}

function refreshSnapshot() {
  const raw = localStorage.getItem(TOURNAMENT_VIEW_STORAGE_KEY) || "";
  if (raw === state.lastSerialized) return;
  state.lastSerialized = raw;
  const shouldFit = !state.layout;
  try {
    state.snapshot = raw ? JSON.parse(raw) : null;
  } catch {
    state.snapshot = null;
  }
  state.layout = state.snapshot?.tournament ? buildBracketLayout(state.snapshot) : null;
  updateHeader();
  state.needsFit = shouldFit;
}

function updateHeader() {
  if (!state.snapshot?.tournament) {
    els.status.textContent = "Waiting for an active tournament from the battle page.";
    els.updatedAt.textContent = "No tournament synced";
    return;
  }
  const tournament = state.snapshot.tournament;
  const completed = tournament.rounds.reduce((sum, round) => sum + round.matches.filter((match) => match.status === "complete").length, 0);
  els.status.textContent = state.snapshot.battleStateLabel
    ? `${state.snapshot.battleStateLabel}. ${completed} heats resolved so far.`
    : `${completed} heats resolved so far.`;
  els.updatedAt.textContent = `Updated ${new Date(state.snapshot.updatedAt || Date.now()).toLocaleTimeString()}`;
}

function loop() {
  if (state.needsFit) fitCamera();
  render();
  requestAnimationFrame(loop);
}

function fitCamera() {
  state.needsFit = false;
  if (!state.layout) return;
  const rect = els.canvas.getBoundingClientRect();
  const fitX = rect.width / Math.max(state.layout.width, 1);
  const fitY = rect.height / Math.max(state.layout.height, 1);
  state.camera.zoom = Math.min(1, Math.max(0.28, Math.min(fitX, fitY) * 0.92));
  state.camera.x = state.layout.width / 2;
  state.camera.y = state.layout.height / 2;
}

function onPointerDown(event) {
  state.camera.dragging = true;
  state.camera.lastX = event.clientX;
  state.camera.lastY = event.clientY;
  els.canvas.classList.add("is-dragging");
}

function onPointerMove(event) {
  if (!state.camera.dragging) return;
  const dx = event.clientX - state.camera.lastX;
  const dy = event.clientY - state.camera.lastY;
  state.camera.lastX = event.clientX;
  state.camera.lastY = event.clientY;
  state.camera.x -= dx / Math.max(state.camera.zoom, 0.01);
  state.camera.y -= dy / Math.max(state.camera.zoom, 0.01);
}

function onPointerUp() {
  state.camera.dragging = false;
  els.canvas.classList.remove("is-dragging");
}

function onWheel(event) {
  event.preventDefault();
  const rect = els.canvas.getBoundingClientRect();
  const mouseX = (event.clientX - rect.left) * (window.devicePixelRatio || 1);
  const mouseY = (event.clientY - rect.top) * (window.devicePixelRatio || 1);
  const worldBefore = screenToWorld(mouseX, mouseY);
  state.camera.zoom = clamp(state.camera.zoom * (Math.sign(event.deltaY) > 0 ? 0.9 : 1.1), 0.22, 2.2);
  const worldAfter = screenToWorld(mouseX, mouseY);
  state.camera.x += worldBefore.x - worldAfter.x;
  state.camera.y += worldBefore.y - worldAfter.y;
}

function render() {
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  drawBackdrop();

  if (!state.layout) {
    drawEmptyState();
    return;
  }

  const viewport = { width: els.canvas.width, height: els.canvas.height, dpr };
  drawGrid(viewport);
  drawConnectors(viewport, state.layout.connectors);
  state.layout.nodes.forEach((node) => drawNode(viewport, node));
}

function drawBackdrop() {
  const gradient = ctx.createLinearGradient(0, 0, 0, els.canvas.height);
  gradient.addColorStop(0, "#4a2b18");
  gradient.addColorStop(1, "#24160f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, els.canvas.width, els.canvas.height);
}

function drawEmptyState() {
  ctx.fillStyle = "rgba(255, 240, 216, 0.9)";
  ctx.font = `${Math.round(30 * (window.devicePixelRatio || 1))}px Manrope`;
  ctx.textAlign = "center";
  ctx.fillText("No Active Tournament", els.canvas.width / 2, els.canvas.height / 2 - 12);
  ctx.fillStyle = "rgba(255, 240, 216, 0.62)";
  ctx.font = `${Math.round(17 * (window.devicePixelRatio || 1))}px Manrope`;
  ctx.fillText("Run a bracketed battle on the main page, then open this view again.", els.canvas.width / 2, els.canvas.height / 2 + 24);
}

function drawGrid(viewport) {
  const spacing = 120 * state.camera.zoom * viewport.dpr;
  if (spacing < 28) return;
  ctx.strokeStyle = "rgba(255, 229, 188, 0.05)";
  ctx.lineWidth = 1;
  const origin = worldToScreen(0, 0, viewport);
  for (let x = origin.x % spacing; x < viewport.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, viewport.height);
    ctx.stroke();
  }
  for (let y = origin.y % spacing; y < viewport.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(viewport.width, y);
    ctx.stroke();
  }
}

function drawConnectors(viewport, connectors) {
  ctx.strokeStyle = "rgba(255, 223, 179, 0.28)";
  ctx.lineWidth = Math.max(2, 3 * state.camera.zoom * viewport.dpr * 0.5);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  connectors.forEach((connector) => {
    const start = worldToScreen(connector.startX, connector.startY, viewport);
    const mid = worldToScreen(connector.midX, connector.startY, viewport);
    const bend = worldToScreen(connector.midX, connector.endY, viewport);
    const end = worldToScreen(connector.endX, connector.endY, viewport);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(mid.x, mid.y);
    ctx.lineTo(bend.x, bend.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });
}

function drawNode(viewport, node) {
  const topLeft = worldToScreen(node.x, node.y, viewport);
  const width = node.width * state.camera.zoom * viewport.dpr;
  const height = node.height * state.camera.zoom * viewport.dpr;
  const radius = 24 * state.camera.zoom * viewport.dpr;
  const active = node.match.status === "active";
  const complete = node.match.status === "complete";
  const baseFill = active ? "#4a3528" : "#3a271c";
  const border = active ? "rgba(167, 216, 154, 0.95)" : complete ? "rgba(255, 210, 136, 0.72)" : "rgba(255, 229, 188, 0.18)";
  fillRoundedRect(topLeft.x, topLeft.y, width, height, radius, baseFill);
  strokeRoundedRect(topLeft.x, topLeft.y, width, height, radius, border, Math.max(1.4, 2 * state.camera.zoom * viewport.dpr));

  const pad = 18 * state.camera.zoom * viewport.dpr;
  let cursorY = topLeft.y + pad;
  drawText(node.roundLabel.toUpperCase(), topLeft.x + pad, cursorY, 10, "#d7b788", "700");
  cursorY += 18 * state.camera.zoom * viewport.dpr;
  drawText(node.match.label, topLeft.x + pad, cursorY, 18, "#f7ead6", "800");
  drawPill(getMatchBadgeLabel(node.match), topLeft.x + width - pad - (90 * state.camera.zoom * viewport.dpr), topLeft.y + pad - 2, 90 * state.camera.zoom * viewport.dpr, 30 * state.camera.zoom * viewport.dpr, active ? "#e8dcc4" : "rgba(255,242,220,0.84)", "#443024");
  cursorY += 28 * state.camera.zoom * viewport.dpr;
  drawText(`${node.match.arena.name} under ${node.match.arena.weather}`, topLeft.x + pad, cursorY, 11, "rgba(247,234,214,0.76)", "500");
  cursorY += 22 * state.camera.zoom * viewport.dpr;

  const chipWidth = ((node.width - (NODE_PADDING * 2)) - ((node.columns - 1) * CHIP_GAP)) / node.columns;
  node.entries.forEach((entry, index) => {
    const column = index % node.columns;
    const row = Math.floor(index / node.columns);
    const chipX = node.x + NODE_PADDING + column * (chipWidth + CHIP_GAP);
    const chipY = node.y + HEADER_HEIGHT + NODE_PADDING + row * (CHIP_HEIGHT + CHIP_GAP);
    drawBannerChip(viewport, chipX, chipY, chipWidth, CHIP_HEIGHT, entry);
  });
}

function drawBannerChip(viewport, x, y, width, height, entry) {
  const topLeft = worldToScreen(x, y, viewport);
  const screenW = width * state.camera.zoom * viewport.dpr;
  const screenH = height * state.camera.zoom * viewport.dpr;
  const radius = 16 * state.camera.zoom * viewport.dpr;
  const border = entry.state === "advanced" ? "rgba(168, 223, 156, 0.84)" : entry.state === "defeated" ? "rgba(191, 121, 95, 0.46)" : entry.color;
  const fill = "rgba(71, 46, 31, 0.96)";
  fillRoundedRect(topLeft.x, topLeft.y, screenW, screenH, radius, fill);
  strokeRoundedRect(topLeft.x, topLeft.y, screenW, screenH, radius, border, Math.max(1, 1.5 * state.camera.zoom * viewport.dpr));

  const pad = 10 * state.camera.zoom * viewport.dpr;
  const flagW = 44 * state.camera.zoom * viewport.dpr;
  drawFlag(topLeft.x + pad, topLeft.y + 12 * state.camera.zoom * viewport.dpr, flagW, 34 * state.camera.zoom * viewport.dpr, entry.color, entry.mark);

  const textX = topLeft.x + pad + flagW + 10 * state.camera.zoom * viewport.dpr;
  const titleWidth = screenW - (textX - topLeft.x) - pad - 4 * state.camera.zoom * viewport.dpr;
  const titleBoxHeight = 42 * state.camera.zoom * viewport.dpr;
  const fittedTitle = fitWrappedText(entry.title, Math.max(80, titleWidth), titleBoxHeight, {
    maxFont: 19 * state.camera.zoom * viewport.dpr,
    minFont: 10 * state.camera.zoom * viewport.dpr,
    maxLines: 3,
    weight: "800",
  });
  let cursorY = topLeft.y + 15 * state.camera.zoom * viewport.dpr;
  fittedTitle.lines.forEach((line, index) => {
    drawText(line, textX, cursorY + index * fittedTitle.lineHeight, fittedTitle.fontSize / (window.devicePixelRatio || 1), "#f7ead6", "800");
  });
  const metaY = topLeft.y + screenH - 34 * state.camera.zoom * viewport.dpr;
  drawText(entry.meta, textX, metaY, 11, "rgba(247,234,214,0.72)", "600");
  drawPill(entry.statusLabel, topLeft.x + screenW - pad - 96 * state.camera.zoom * viewport.dpr, topLeft.y + screenH - 34 * state.camera.zoom * viewport.dpr, 96 * state.camera.zoom * viewport.dpr, 24 * state.camera.zoom * viewport.dpr, "rgba(17, 12, 9, 0.54)", "#f9ecd8");
}

function buildBracketLayout(snapshot) {
  const tournament = snapshot.tournament;
  const factionMap = new Map((snapshot.factions || []).map((faction) => [faction.id, faction]));
  const rounds = tournament.rounds || [];
  const nodes = [];
  const byMatchId = new Map();

  rounds.forEach((round, roundIndex) => {
    const x = BRACKET_PADDING_X + roundIndex * (NODE_WIDTH + COLUMN_GAP);
    if (roundIndex === 0) {
      round.matches.forEach((match, matchIndex) => {
        const y = BRACKET_PADDING_Y + matchIndex * (getNodeHeight(match) + NODE_GAP);
        const node = makeNode(match, round, roundIndex, matchIndex, x, y, factionMap, snapshot);
        nodes.push(node);
        byMatchId.set(match.id, node);
      });
      return;
    }

    const previousRound = rounds[roundIndex - 1];
    const groups = chunkEvenly(previousRound.matches.map((match) => match.id), round.matches.length);
    round.matches.forEach((match, matchIndex) => {
      const sourceNodes = (groups[matchIndex] || []).map((id) => byMatchId.get(id)).filter(Boolean);
      const height = getNodeHeight(match);
      const centerY = sourceNodes.length
        ? sourceNodes.reduce((sum, node) => sum + (node.y + node.height / 2), 0) / sourceNodes.length
        : BRACKET_PADDING_Y + matchIndex * (height + NODE_GAP) + height / 2;
      const node = makeNode(match, round, roundIndex, matchIndex, x, centerY - height / 2, factionMap, snapshot);
      node.sourceIds = sourceNodes.map((entry) => entry.id);
      nodes.push(node);
      byMatchId.set(match.id, node);
    });
  });

  rounds.forEach((round, roundIndex) => {
    const roundNodes = nodes.filter((node) => node.roundIndex === roundIndex).sort((a, b) => a.y - b.y);
    let cursor = BRACKET_PADDING_Y;
    roundNodes.forEach((node) => {
      node.y = Math.max(node.y, cursor);
      cursor = node.y + node.height + NODE_GAP;
    });
  });

  const connectors = nodes.flatMap((node) => (node.sourceIds || []).map((sourceId) => {
    const source = byMatchId.get(sourceId);
    return {
      startX: source.x + source.width,
      startY: source.y + source.height / 2,
      midX: source.x + source.width + COLUMN_GAP / 2,
      endX: node.x,
      endY: node.y + node.height / 2,
    };
  }));

  const width = BRACKET_PADDING_X * 2 + rounds.length * NODE_WIDTH + Math.max(0, rounds.length - 1) * COLUMN_GAP;
  const height = Math.max(BRACKET_PADDING_Y * 2 + 200, ...nodes.map((node) => node.y + node.height + BRACKET_PADDING_Y));
  return { nodes, connectors, width, height };
}

function makeNode(match, round, roundIndex, matchIndex, x, y, factionMap, snapshot) {
  const entries = match.factionIds.map((factionId) => {
    const faction = factionMap.get(factionId);
    const stateName = getEntryState(snapshot, roundIndex, matchIndex, match, factionId);
    return {
      id: factionId,
      title: faction?.title || "TBD",
      color: getFactionColor(snapshot, factionId),
      meta: faction ? `${faction.armySize} troops` : "Unknown",
      statusLabel: getEntryLabel(stateName),
      state: stateName,
      mark: getFallbackMark(faction?.title || "TBD"),
    };
  });
  return {
    id: match.id,
    match,
    roundLabel: round.label,
    roundIndex,
    matchIndex,
    x,
    y,
    width: NODE_WIDTH,
    height: getNodeHeight(match),
    columns: getNodeColumns(match),
    entries,
    sourceIds: [],
  };
}

function getNodeColumns(match) {
  return Math.min(2, Math.max(1, Math.ceil((match.factionIds?.length || 1) / 4)));
}

function getNodeHeight(match) {
  const rows = Math.ceil(Math.max(1, match.factionIds?.length || 0) / getNodeColumns(match));
  return HEADER_HEIGHT + NODE_PADDING * 2 + rows * CHIP_HEIGHT + Math.max(0, rows - 1) * CHIP_GAP;
}

function getEntryState(snapshot, roundIndex, matchIndex, match, factionId) {
  if (match.winnerId === factionId) return "advanced";
  if (match.status === "complete") return "defeated";
  const currentRound = snapshot.tournament?.currentRoundIndex;
  const currentMatch = snapshot.tournament?.currentMatchIndex;
  if (roundIndex === currentRound && matchIndex === currentMatch) return "active";
  return "queued";
}

function getEntryLabel(stateName) {
  if (stateName === "advanced") return "Advances";
  if (stateName === "defeated") return "Defeated";
  if (stateName === "active") return "Fighting";
  return "Queued";
}

function getMatchBadgeLabel(match) {
  if (match.status === "complete") return match.winnerId ? "Finished" : "No Winner";
  if (match.status === "active") return "Live Heat";
  return "Awaiting Call";
}

function getFactionColor(snapshot, factionId) {
  const palette = ["#db7d4a", "#5ca5cf", "#d2bf62", "#b375d7", "#c45c68", "#53b88a", "#d6809b", "#7498e5"];
  const index = (snapshot.tournament?.originalFactionIds || []).indexOf(factionId);
  return palette[(index >= 0 ? index : 0) % palette.length];
}

function getFallbackMark(title) {
  const words = `${title || ""}`
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9']/gi, ""))
    .filter(Boolean);
  if (!words.length) return "KO";
  return words.map((word) => {
    const initial = word[0] || "";
    return MINOR_WORDS.has(word.toLowerCase()) ? initial.toLowerCase() : initial.toUpperCase();
  }).join("").slice(0, 8);
}

function chunkEvenly(items, groupCount) {
  const count = Math.max(1, Math.min(groupCount, items.length));
  const baseSize = Math.floor(items.length / count);
  const extra = items.length % count;
  const groups = [];
  let cursor = 0;
  for (let index = 0; index < count; index += 1) {
    const size = baseSize + (index < extra ? 1 : 0);
    groups.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return groups.filter((group) => group.length);
}

function worldToScreen(x, y, viewport) {
  const scale = state.camera.zoom * viewport.dpr;
  return {
    x: viewport.width / 2 - state.camera.x * scale + x * scale,
    y: viewport.height / 2 - state.camera.y * scale + y * scale,
  };
}

function screenToWorld(x, y) {
  const dpr = window.devicePixelRatio || 1;
  const scale = state.camera.zoom * dpr;
  return {
    x: state.camera.x + (x - els.canvas.width / 2) / scale,
    y: state.camera.y + (y - els.canvas.height / 2) / scale,
  };
}

function fillRoundedRect(x, y, width, height, radius, fillStyle) {
  ctx.fillStyle = fillStyle;
  roundedRectPath(x, y, width, height, radius);
  ctx.fill();
}

function strokeRoundedRect(x, y, width, height, radius, strokeStyle, lineWidth) {
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  roundedRectPath(x, y, width, height, radius);
  ctx.stroke();
}

function roundedRectPath(x, y, width, height, radius) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawFlag(x, y, width, height, color, text) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height * 0.78);
  ctx.lineTo(x + width / 2, y + height);
  ctx.lineTo(x, y + height * 0.78);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#1d130d";
  ctx.font = `${Math.round(12 * (window.devicePixelRatio || 1))}px Cinzel`;
  ctx.textAlign = "center";
  ctx.fillText(text, x + width / 2, y + height * 0.56);
  ctx.textAlign = "left";
}

function drawPill(text, x, y, width, height, fillStyle, textColor) {
  fillRoundedRect(x, y, width, height, Math.min(width, height) / 2, fillStyle);
  ctx.fillStyle = textColor;
  ctx.font = `${Math.round(Math.max(10, height * 0.42))}px Manrope`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + width / 2, y + height / 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawText(text, x, y, size, color, weight = "500") {
  const scale = window.devicePixelRatio || 1;
  ctx.fillStyle = color;
  ctx.font = `${weight} ${Math.round(size * scale)}px Manrope`;
  ctx.fillText(text, x, y);
}

function wrapText(text, maxWidth, fontSize, maxLines, weight = "800") {
  ctx.font = `${weight} ${Math.round(fontSize)}px Manrope`;
  const words = `${text || ""}`.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines = [];
  let current = words[0];
  for (let index = 1; index < words.length; index += 1) {
    const next = `${current} ${words[index]}`;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
      continue;
    }
    lines.push(current);
    current = words[index];
    if (lines.length === maxLines - 1) break;
  }
  if (lines.length < maxLines) lines.push(current);
  const consumedWords = lines.join(" ").split(/\s+/).filter(Boolean).length;
  if (consumedWords < words.length) {
    let last = lines[lines.length - 1];
    while (ctx.measureText(`${last}...`).width > maxWidth && last.length > 1) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}...`;
  }
  return lines.slice(0, maxLines);
}

function fitWrappedText(text, maxWidth, maxHeight, options = {}) {
  const maxFont = options.maxFont || 18;
  const minFont = options.minFont || 10;
  const maxLines = options.maxLines || 3;
  const weight = options.weight || "800";
  for (let fontSize = maxFont; fontSize >= minFont; fontSize -= 1) {
    const lines = wrapText(text, maxWidth, fontSize, maxLines, weight);
    const lineHeight = Math.round(fontSize * 1.06);
    if ((lines.length * lineHeight) <= maxHeight) {
      return { lines, fontSize, lineHeight };
    }
  }
  const lines = wrapText(text, maxWidth, minFont, maxLines, weight);
  return { lines, fontSize: minFont, lineHeight: Math.round(minFont * 1.08) };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
