const TOURNAMENT_VIEW_STORAGE_KEY = "tbr-warfare-tournament-view-v1";
const TOURNAMENT_VIEW_COMMAND_KEY = "tbr-warfare-tournament-command-v1";
const VIEW_POLL_INTERVAL_MS = 500;
const NODE_WIDTH = 560;
const ROUND_HEADER_HEIGHT = 52;
const HEADER_HEIGHT = 88;
const NODE_PADDING = 18;
const CHIP_HEIGHT = 92;
const CHIP_GAP = 10;
const NODE_GAP = 56;
const COLUMN_GAP = 196;
const ROUND_LANE_GAP = 52;
const BRACKET_PADDING_X = 72;
const BRACKET_PADDING_Y = 54;
const MINOR_WORDS = new Set(["a", "an", "and", "at", "for", "from", "in", "of", "on", "or", "the", "to"]);

const els = {
  canvas: document.getElementById("tournamentCanvas"),
  status: document.getElementById("tournamentStatus"),
  updatedAt: document.getElementById("tournamentUpdatedAt"),
  fastForwardStatus: document.getElementById("tournamentFastForwardStatus"),
  fastForwardLabel: document.getElementById("tournamentFastForwardLabel"),
  fastForwardMeta: document.getElementById("tournamentFastForwardMeta"),
  fastForwardFill: document.getElementById("tournamentFastForwardFill"),
  returnToBattleBtn: document.getElementById("returnToBattleBtn"),
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
  pointer: {
    downX: 0,
    downY: 0,
    moved: false,
  },
  buttonTargets: [],
  hoveredButtonId: null,
  needsFit: true,
};

bootstrapTournamentView();

function bootstrapTournamentView() {
  window.addEventListener("resize", sizeCanvas);
  window.addEventListener("storage", onStorageUpdate);
  els.canvas.addEventListener("pointerdown", onPointerDown);
  els.canvas.addEventListener("pointerup", onPointerUpCanvas);
  els.canvas.addEventListener("pointerleave", onPointerLeaveCanvas);
  els.returnToBattleBtn?.addEventListener("click", returnToBattle);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  els.canvas.addEventListener("wheel", onWheel, { passive: false });
  sizeCanvas();
  refreshSnapshot();
  window.setInterval(refreshSnapshot, VIEW_POLL_INTERVAL_MS);
  requestAnimationFrame(loop);
}

function returnToBattle() {
  if (window.opener && !window.opener.closed) {
    window.opener.focus();
    window.close();
    return;
  }
  window.location.href = "index.html";
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
  updateFastForwardStatus();
  state.needsFit = shouldFit;
}

function updateHeader() {
  if (!state.snapshot?.tournament && !state.snapshot?.completedTournament) {
    els.status.textContent = "Waiting for an active tournament from the battle page.";
    els.updatedAt.textContent = "No tournament synced";
    return;
  }
  const tournament = state.snapshot.tournament;
  const completedTournament = state.snapshot.completedTournament;
  const completed = tournament.rounds.reduce((sum, round) => sum + round.matches.filter((match) => match.status === "complete").length, 0);
  if (completedTournament) {
    const stats = completedTournament.stats || {};
    els.status.textContent = completedTournament.championId
      ? `${completedTournament.championTitle} won the tournament. ${stats.armiesOutlasted || 0} armies fell across ${stats.completedHeats || completed} heats.`
      : `The tournament ended without a champion after ${stats.completedHeats || completed} heats.`;
  } else {
    const activeRoundLabel = tournament.rounds?.[tournament.currentRoundIndex]?.label || "Current round";
    els.status.textContent = state.snapshot.battleStateLabel
      ? `${state.snapshot.battleStateLabel}. ${completed} heats resolved so far. ${activeRoundLabel} is active.`
      : `${completed} heats resolved so far. ${activeRoundLabel} is active.`;
  }
  els.updatedAt.textContent = `Updated ${new Date(state.snapshot.updatedAt || Date.now()).toLocaleTimeString()}`;
}

function updateFastForwardStatus() {
  const fastForward = state.snapshot?.fastForward;
  if (!fastForward) {
    els.fastForwardStatus?.classList.add("hidden");
    return;
  }
  const targetResolvedHeats = Math.max(0, fastForward.targetResolvedHeats || 0);
  const completedHeats = Math.max(0, fastForward.completedHeats || 0);
  const pct = targetResolvedHeats > 0 ? Math.min(100, (completedHeats / targetResolvedHeats) * 100) : 100;
  els.fastForwardStatus?.classList.remove("hidden");
  if (els.fastForwardLabel) {
    els.fastForwardLabel.textContent = fastForward.active
      ? `Fast forwarding to ${fastForward.targetLabel || "selected heat"}`
      : `${fastForward.targetLabel || "Selected heat"} ready`;
  }
  if (els.fastForwardMeta) {
    els.fastForwardMeta.textContent = fastForward.active
      ? `${completedHeats} of ${targetResolvedHeats} heats cleared${fastForward.currentLabel ? ` | ${fastForward.currentLabel}` : ""}`
      : `${completedHeats} heats cleared${fastForward.currentLabel ? ` | ${fastForward.currentLabel}` : ""}`;
  }
  if (els.fastForwardFill) {
    els.fastForwardFill.style.width = `${pct}%`;
  }
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
  state.pointer.downX = event.clientX;
  state.pointer.downY = event.clientY;
  state.pointer.moved = false;
  els.canvas.classList.add("is-dragging");
}

function onPointerMove(event) {
  updateHoveredButton(event);
  if (state.camera.dragging && (Math.abs(event.clientX - state.pointer.downX) > 4 || Math.abs(event.clientY - state.pointer.downY) > 4)) {
    state.pointer.moved = true;
  }
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

function onPointerUpCanvas(event) {
  const buttonTarget = findButtonTargetAt(event);
  if (!state.pointer.moved && buttonTarget?.enabled) {
    requestTournamentFastForward(buttonTarget.node);
  }
}

function onPointerLeaveCanvas() {
  state.hoveredButtonId = null;
  els.canvas.style.cursor = state.camera.dragging ? "grabbing" : "grab";
}

function updateHoveredButton(event) {
  const buttonTarget = findButtonTargetAt(event);
  state.hoveredButtonId = buttonTarget?.id || null;
  els.canvas.style.cursor = buttonTarget?.enabled
    ? "pointer"
    : state.camera.dragging
      ? "grabbing"
      : "grab";
}

function findButtonTargetAt(event) {
  const rect = els.canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (window.devicePixelRatio || 1);
  const y = (event.clientY - rect.top) * (window.devicePixelRatio || 1);
  return state.buttonTargets.find((target) => x >= target.x && x <= (target.x + target.width) && y >= target.y && y <= (target.y + target.height)) || null;
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
  state.buttonTargets = [];
  drawGrid(viewport);
  drawRoundHeaders(viewport, state.layout.roundHeaders || []);
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
    const points = (connector.points || []).map((point) => worldToScreen(point.x, point.y, viewport));
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index].x, points[index].y);
    }
    ctx.stroke();
  });
}

function drawRoundHeaders(viewport, headers) {
  headers.forEach((header) => {
    const topLeft = worldToScreen(header.x, header.y, viewport);
    const width = header.width * state.camera.zoom * viewport.dpr;
    const height = header.height * state.camera.zoom * viewport.dpr;
    fillRoundedRect(topLeft.x, topLeft.y, width, height, 22 * state.camera.zoom * viewport.dpr, header.active ? "rgba(100, 67, 34, 0.9)" : "rgba(39, 24, 16, 0.88)");
    strokeRoundedRect(topLeft.x, topLeft.y, width, height, 22 * state.camera.zoom * viewport.dpr, header.active ? "rgba(255, 222, 127, 0.92)" : "rgba(255, 229, 188, 0.18)", Math.max(1.2, 1.8 * state.camera.zoom * viewport.dpr));
    drawText(header.label.toUpperCase(), topLeft.x + 18 * state.camera.zoom * viewport.dpr, topLeft.y + 25 * state.camera.zoom * viewport.dpr, 12, header.active ? "#ffe4a1" : "rgba(243,230,210,0.8)", "800");
    if (header.active) {
      const pillWidth = 116 * state.camera.zoom * viewport.dpr;
      const pillHeight = 28 * state.camera.zoom * viewport.dpr;
      drawPill("Current Round", topLeft.x + width - pillWidth - 14 * state.camera.zoom * viewport.dpr, topLeft.y + 12 * state.camera.zoom * viewport.dpr, pillWidth, pillHeight, "#f2d172", "#3a250f");
    }
  });
}

function drawNode(viewport, node) {
  const topLeft = worldToScreen(node.x, node.y, viewport);
  const width = node.width * state.camera.zoom * viewport.dpr;
  const height = node.height * state.camera.zoom * viewport.dpr;
  const radius = 24 * state.camera.zoom * viewport.dpr;
  const active = node.match.status === "active";
  const complete = node.match.status === "complete";
  const baseFill = node.isChampionNode ? "#4b3218" : active ? "#4a3528" : "#3a271c";
  const border = node.isChampionNode
    ? "rgba(255, 223, 118, 0.94)"
    : active ? "rgba(167, 216, 154, 0.95)" : complete ? "rgba(255, 210, 136, 0.72)" : "rgba(255, 229, 188, 0.18)";
  fillRoundedRect(topLeft.x, topLeft.y, width, height, radius, baseFill);
  strokeRoundedRect(topLeft.x, topLeft.y, width, height, radius, border, Math.max(1.4, 2 * state.camera.zoom * viewport.dpr));

  const pad = 18 * state.camera.zoom * viewport.dpr;
  let cursorY = topLeft.y + pad;
  drawText(node.roundLabel.toUpperCase(), topLeft.x + pad, cursorY, 10, "#d7b788", "700");
  cursorY += 18 * state.camera.zoom * viewport.dpr;
  drawText(node.match.label, topLeft.x + pad, cursorY, 18, "#f7ead6", "800");
  drawPill(node.isChampionNode ? "Champion" : getMatchBadgeLabel(node.match), topLeft.x + width - pad - (90 * state.camera.zoom * viewport.dpr), topLeft.y + pad - 2, 90 * state.camera.zoom * viewport.dpr, 30 * state.camera.zoom * viewport.dpr, node.isChampionNode ? "#f3c956" : active ? "#e8dcc4" : "rgba(255,242,220,0.84)", "#443024");
  cursorY += 28 * state.camera.zoom * viewport.dpr;
  drawText(node.match.projected ? "Waiting on earlier heats" : `${node.match.arena.name} under ${node.match.arena.weather}`, topLeft.x + pad, cursorY, 11, "rgba(247,234,214,0.76)", "500");
  cursorY += 22 * state.camera.zoom * viewport.dpr;

  const chipWidth = ((node.width - (NODE_PADDING * 2)) - ((node.columns - 1) * CHIP_GAP)) / node.columns;
  node.entries.forEach((entry, index) => {
    const column = index % node.columns;
    const row = Math.floor(index / node.columns);
    const chipX = node.x + NODE_PADDING + column * (chipWidth + CHIP_GAP);
    const chipY = node.y + HEADER_HEIGHT + NODE_PADDING + row * (CHIP_HEIGHT + CHIP_GAP);
    drawBannerChip(viewport, chipX, chipY, chipWidth, CHIP_HEIGHT, entry);
  });

  drawFastForwardButton(viewport, node, topLeft, width, height, pad);
}

function drawBannerChip(viewport, x, y, width, height, entry) {
  const topLeft = worldToScreen(x, y, viewport);
  const screenW = width * state.camera.zoom * viewport.dpr;
  const screenH = height * state.camera.zoom * viewport.dpr;
  const radius = 16 * state.camera.zoom * viewport.dpr;
  const border = entry.state === "champion"
    ? "rgba(255, 220, 122, 0.96)"
    : entry.state === "advanced" ? "rgba(168, 223, 156, 0.84)" : entry.state === "defeated" ? "rgba(191, 121, 95, 0.46)" : entry.color;
  const fill = "rgba(71, 46, 31, 0.96)";
  fillRoundedRect(topLeft.x, topLeft.y, screenW, screenH, radius, fill);
  strokeRoundedRect(topLeft.x, topLeft.y, screenW, screenH, radius, border, Math.max(1, 1.5 * state.camera.zoom * viewport.dpr));
  if (entry.state === "champion") {
    strokeRoundedRect(topLeft.x - 3, topLeft.y - 3, screenW + 6, screenH + 6, radius + 2, "rgba(255, 238, 182, 0.36)", Math.max(1, 2 * state.camera.zoom * viewport.dpr));
  }

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

function drawFastForwardButton(viewport, node, topLeft, width, height, pad) {
  const button = node.fastForward;
  if (!button) return;
  const buttonWidth = 116 * state.camera.zoom * viewport.dpr;
  const buttonHeight = 28 * state.camera.zoom * viewport.dpr;
  const x = topLeft.x + width - pad - buttonWidth;
  const y = topLeft.y + height - pad - buttonHeight;
  const hovered = state.hoveredButtonId === button.id;
  const fill = button.enabled
    ? (hovered ? "rgba(255, 215, 133, 0.96)" : "rgba(255, 239, 211, 0.9)")
    : "rgba(255, 242, 220, 0.12)";
  const textColor = button.enabled ? "#342113" : "rgba(243,230,210,0.72)";
  const border = button.enabled ? "rgba(97, 60, 27, 0.42)" : "rgba(255,229,188,0.16)";
  fillRoundedRect(x, y, buttonWidth, buttonHeight, buttonHeight / 2, fill);
  strokeRoundedRect(x, y, buttonWidth, buttonHeight, buttonHeight / 2, border, Math.max(1, 1.4 * state.camera.zoom * viewport.dpr));
  ctx.fillStyle = textColor;
  ctx.font = `700 ${Math.round(11 * (window.devicePixelRatio || 1) * state.camera.zoom)}px Manrope`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(button.label, x + buttonWidth / 2, y + buttonHeight / 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  state.buttonTargets.push({
    id: button.id,
    x,
    y,
    width: buttonWidth,
    height: buttonHeight,
    enabled: button.enabled,
    node,
  });
}

function requestTournamentFastForward(node) {
  if (!node?.fastForward?.enabled) return;
  const command = {
    id: `ff-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: "fastForwardTournament",
    targetRoundIndex: node.roundIndex,
    targetMatchIndex: node.matchIndex,
    targetResolvedHeats: Math.max(0, node.matchOrdinal - 1),
    totalHeats: state.layout?.totalHeats || node.matchOrdinal,
    targetLabel: `${node.roundLabel} - ${node.match.label}`,
  };
  localStorage.setItem(TOURNAMENT_VIEW_COMMAND_KEY, JSON.stringify(command));
}

function buildBracketLayout(snapshot) {
  const tournament = snapshot.tournament;
  const factionMap = new Map((snapshot.factions || []).map((faction) => [faction.id, faction]));
  const rounds = projectTournamentRounds(snapshot);
  const roundMetrics = getRoundLayoutMetrics(rounds);
  const nodes = [];
  const byMatchId = new Map();
  const roundHeaders = [];
  let matchOrdinal = 0;
  const startY = BRACKET_PADDING_Y + ROUND_HEADER_HEIGHT + 18;

  rounds.forEach((round, roundIndex) => {
    const metric = roundMetrics[roundIndex];
    const x = metric.x;
    roundHeaders.push({
      x,
      y: BRACKET_PADDING_Y,
      width: metric.width,
      height: ROUND_HEADER_HEIGHT,
      label: round.label,
      active: !snapshot.completedTournament && roundIndex === tournament.currentRoundIndex,
    });
    if (roundIndex === 0) {
      const feederGroups = rounds[1]?.matches?.length
        ? chunkEvenly(round.matches.map((match) => match.id), rounds[1].matches.length)
        : [round.matches.map((match) => match.id)];
      const placementByMatchId = getGroupedRoundPlacements(feederGroups, metric.laneCount);
      round.matches.forEach((match, matchIndex) => {
        const placement = placementByMatchId.get(match.id) || {
          laneIndex: getRoundLaneIndex(matchIndex, metric.laneCount),
          rowIndex: Math.floor(matchIndex / metric.laneCount),
        };
        const laneIndex = placement.laneIndex;
        const rowIndex = placement.rowIndex;
        const nodeX = x + laneIndex * (NODE_WIDTH + ROUND_LANE_GAP);
        const y = startY + rowIndex * (getNodeHeight(match) + NODE_GAP);
        matchOrdinal += 1;
        const node = makeNode(match, round, roundIndex, matchIndex, matchOrdinal, nodeX, y, factionMap, snapshot);
        node.laneIndex = laneIndex;
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
      const laneIndex = getRoundLaneIndex(matchIndex, metric.laneCount);
      const nodeX = x + laneIndex * (NODE_WIDTH + ROUND_LANE_GAP);
      const centerY = sourceNodes.length
        ? sourceNodes.reduce((sum, node) => sum + (node.y + node.height / 2), 0) / sourceNodes.length
        : startY + matchIndex * (height + NODE_GAP) + height / 2;
      matchOrdinal += 1;
      const node = makeNode(match, round, roundIndex, matchIndex, matchOrdinal, nodeX, centerY - height / 2, factionMap, snapshot);
      node.laneIndex = laneIndex;
      node.sourceIds = sourceNodes.map((entry) => entry.id);
      nodes.push(node);
      byMatchId.set(match.id, node);
    });
  });

  rounds.forEach((round, roundIndex) => {
    const metric = roundMetrics[roundIndex];
    for (let laneIndex = 0; laneIndex < metric.laneCount; laneIndex += 1) {
      const laneNodes = nodes
        .filter((node) => node.roundIndex === roundIndex && (node.laneIndex || 0) === laneIndex)
        .sort((a, b) => a.y - b.y);
      let cursor = startY;
      laneNodes.forEach((node) => {
        node.y = Math.max(node.y, cursor);
        cursor = node.y + node.height + NODE_GAP;
      });
    }
  });

  const connectors = nodes.flatMap((node) => (node.sourceIds || []).map((sourceId) => {
    const source = byMatchId.get(sourceId);
    const sourceMetric = roundMetrics[source.roundIndex];
    const sourceExitX = source.x + source.width;
    const targetEntryX = node.x;
    const columnChannelX = sourceMetric.x + sourceMetric.width + Math.max(44, COLUMN_GAP * 0.34);
    const targetApproachX = Math.max(sourceExitX + 28, targetEntryX - 34);
    const routeX = Math.min(columnChannelX, targetApproachX);
    return {
      points: [
        { x: sourceExitX, y: source.y + source.height / 2 },
        { x: sourceExitX + 18, y: source.y + source.height / 2 },
        { x: routeX, y: source.y + source.height / 2 },
        { x: routeX, y: node.y + node.height / 2 },
        { x: targetEntryX - 18, y: node.y + node.height / 2 },
        { x: targetEntryX, y: node.y + node.height / 2 },
      ],
    };
  }));

  const width = Math.max(
    BRACKET_PADDING_X * 2 + NODE_WIDTH,
    ...roundMetrics.map((metric) => metric.x + metric.width + BRACKET_PADDING_X),
  );
  const height = Math.max(BRACKET_PADDING_Y * 2 + 200, ...nodes.map((node) => node.y + node.height + BRACKET_PADDING_Y));
  return { nodes, connectors, roundHeaders, width, height, totalHeats: matchOrdinal };
}

function getRoundLayoutMetrics(rounds) {
  const metrics = [];
  let cursorX = BRACKET_PADDING_X;
  rounds.forEach((round, roundIndex) => {
    const laneCount = getRoundLaneCount(roundIndex, round.matches?.length || 0);
    const width = (laneCount * NODE_WIDTH) + Math.max(0, laneCount - 1) * ROUND_LANE_GAP;
    metrics.push({ x: cursorX, width, laneCount });
    cursorX += width + COLUMN_GAP;
  });
  return metrics;
}

function getRoundLaneCount(roundIndex, matchCount) {
  if (matchCount <= 1) return 1;
  if (roundIndex === 0) return Math.min(3, Math.max(1, Math.ceil(matchCount / 4)));
  if (roundIndex === 1) return Math.min(2, Math.max(1, Math.ceil(matchCount / 4)));
  return 1;
}

function getRoundLaneIndex(matchIndex, laneCount) {
  if (laneCount <= 1) return 0;
  return matchIndex % laneCount;
}

function getGroupedRoundPlacements(groups, laneCount) {
  const placements = new Map();
  let laneIndex = 0;
  let rowIndex = 0;
  groups.forEach((group) => {
    group.forEach((matchId) => {
      placements.set(matchId, { laneIndex, rowIndex });
      laneIndex += 1;
      if (laneIndex >= laneCount) {
        laneIndex = 0;
        rowIndex += 1;
      }
    });
    if (laneIndex !== 0) {
      laneIndex = 0;
      rowIndex += 1;
    }
  });
  return placements;
}

function makeNode(match, round, roundIndex, matchIndex, matchOrdinal, x, y, factionMap, snapshot) {
  const championId = snapshot.completedTournament?.championId || null;
  const entries = match.factionIds.map((factionId) => {
    const faction = factionMap.get(factionId);
    const placeholder = isProjectedPlaceholderId(factionId) || !faction;
    const stateName = getEntryState(snapshot, roundIndex, matchIndex, match, factionId, placeholder);
    return {
      id: factionId,
      title: placeholder ? "(?)" : faction.title,
      color: getFactionColor(snapshot, factionId),
      meta: placeholder ? "Undecided slot" : `${faction.armySize} troops`,
      statusLabel: getEntryLabel(stateName),
      state: stateName,
      mark: placeholder ? "?" : getFallbackMark(faction.title),
    };
  });
  const fastForward = getFastForwardButtonState(snapshot, roundIndex, matchIndex, matchOrdinal, match);
  return {
    id: match.id,
    match,
    roundLabel: round.label,
    roundIndex,
    matchIndex,
    matchOrdinal,
    isChampionNode: Boolean(championId && match.winnerId === championId),
    x,
    y,
    width: NODE_WIDTH,
    height: getNodeHeight(match),
    columns: getNodeColumns(match),
    entries,
    fastForward,
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

function getEntryState(snapshot, roundIndex, matchIndex, match, factionId, placeholder = false) {
  const championId = snapshot.completedTournament?.championId || null;
  if (championId && match.winnerId === championId && factionId === championId) return "champion";
  if (match.winnerId === factionId) return "advanced";
  if (placeholder) {
    const currentRound = snapshot.tournament?.currentRoundIndex;
    const currentMatch = snapshot.tournament?.currentMatchIndex;
    if (roundIndex === currentRound && matchIndex === currentMatch) return "active";
    return "undecided";
  }
  if (match.status === "complete") return "defeated";
  const currentRound = snapshot.tournament?.currentRoundIndex;
  const currentMatch = snapshot.tournament?.currentMatchIndex;
  if (roundIndex === currentRound && matchIndex === currentMatch) return "active";
  return "queued";
}

function getEntryLabel(stateName) {
  if (stateName === "champion") return "Champion";
  if (stateName === "advanced") return "Advances";
  if (stateName === "defeated") return "Defeated";
  if (stateName === "active") return "Fighting";
  if (stateName === "undecided") return "Undecided";
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

function getFastForwardButtonState(snapshot, roundIndex, matchIndex, matchOrdinal, match) {
  const completedHeats = snapshot.tournament?.stats?.completedHeats || 0;
  const activeFastForward = snapshot.fastForward?.active === true;
  const isTarget = snapshot.fastForward
    && snapshot.fastForward.targetRoundIndex === roundIndex
    && snapshot.fastForward.targetMatchIndex === matchIndex;
  if (snapshot.completedTournament) {
    return { id: `ff-${roundIndex}-${matchIndex}`, label: "Done", enabled: false };
  }
  if (activeFastForward) {
    return { id: `ff-${roundIndex}-${matchIndex}`, label: isTarget ? "Target" : "Locked", enabled: false };
  }
  if ((matchOrdinal - 1) <= completedHeats) {
    return { id: `ff-${roundIndex}-${matchIndex}`, label: match.status === "complete" ? "Done" : "Ready", enabled: false };
  }
  return { id: `ff-${roundIndex}-${matchIndex}`, label: "Fast Forward", enabled: true };
}

function projectTournamentRounds(snapshot) {
  const tournament = snapshot.tournament;
  const existingRounds = tournament?.rounds || [];
  const config = normalizeTournamentConfigView(snapshot.tournamentConfig || tournament?.config || {});
  const projectedRounds = [];
  let currentRoundMatches = null;
  let roundIndex = 0;
  while (true) {
    const existingRound = existingRounds[roundIndex];
    let roundRecord;
    if (existingRound?.matches?.length) {
      roundRecord = {
        index: roundIndex,
        label: existingRound.label,
        matches: existingRound.matches.map((match) => ({ ...match, factionIds: match.factionIds.slice() })),
      };
    } else if (currentRoundMatches?.length) {
      const projectedMatches = createProjectedRoundFromPreviousRound(currentRoundMatches, roundIndex, config);
      if (!projectedMatches.length) break;
      roundRecord = {
        index: roundIndex,
        label: getRoundLabelView(roundIndex, projectedMatches.length, currentRoundMatches.length),
        matches: projectedMatches,
      };
    } else {
      const openingFactionIds = (tournament?.originalFactionIds || []).slice();
      if (!openingFactionIds.length) break;
      const openingGroups = createProjectedHeatGroups(openingFactionIds, config);
      roundRecord = {
        index: roundIndex,
        label: getRoundLabelView(roundIndex, openingGroups.length, openingFactionIds.length),
        matches: openingGroups.map((group, matchIndex) => ({
          id: `projected-round-${roundIndex}-match-${matchIndex}`,
          label: getMatchLabelView(roundIndex, matchIndex),
          factionIds: group,
          winnerId: null,
          status: "pending",
          arena: { name: "Undecided Arena", weather: "(?)" },
          projected: true,
        })),
      };
    }
    if (!roundRecord.matches.length) break;
    projectedRounds.push({
      index: roundRecord.index,
      label: roundRecord.label,
      matches: roundRecord.matches,
    });
    if (roundRecord.matches.length <= 1) break;
    currentRoundMatches = roundRecord.matches;
    roundIndex += 1;
  }
  return projectedRounds;
}

function createProjectedRoundFromPreviousRound(previousRoundMatches, roundIndex, config) {
  const previousMatchIds = previousRoundMatches.map((match) => match.id);
  const groupedSourceIds = createProjectedHeatGroups(previousMatchIds, config);
  return groupedSourceIds.map((sourceIds, matchIndex) => {
    const factionIds = sourceIds.map((sourceId, sourceIndex) => {
      const sourceMatch = previousRoundMatches.find((match) => match.id === sourceId);
      return sourceMatch?.winnerId || `projected-round-${roundIndex}-slot-${matchIndex}-${sourceIndex}`;
    });
    return {
      id: `projected-round-${roundIndex}-match-${matchIndex}`,
      label: getMatchLabelView(roundIndex, matchIndex),
      factionIds,
      winnerId: null,
      status: "pending",
      arena: { name: "Undecided Arena", weather: "(?)" },
      projected: true,
    };
  });
}

function createProjectedHeatGroups(factionIds, config) {
  const factionCount = factionIds.length;
  if (factionCount <= 0) return [];
  if (factionCount <= config.maxFactionsPerHeat && !config.maxUnitsOnBattlefield) return [factionIds.slice()];
  const groupCount = Math.ceil(factionCount / config.maxFactionsPerHeat);
  return chunkEvenly(factionIds, groupCount);
}

function normalizeTournamentConfigView(config = {}) {
  const maxFactionsPerHeat = clampInt(config.maxFactionsPerHeat ?? 10, 2, 32);
  return {
    minFactionsPerHeat: clampInt(config.minFactionsPerHeat ?? 2, 2, maxFactionsPerHeat),
    maxFactionsPerHeat,
    maxUnitsOnBattlefield: clampInt(config.maxUnitsOnBattlefield ?? 0, 0, 5000),
  };
}

function isProjectedPlaceholderId(factionId) {
  return `${factionId || ""}`.startsWith("projected-round-");
}

function getRoundLabelView(roundIndex, matchCount, entrantCount) {
  if (roundIndex === 0 && matchCount === 1) return "Grand Melee";
  if (matchCount === 1) return roundIndex === 1 ? "Final Round" : `Final Round ${roundIndex}`;
  return `Round ${roundIndex + 1}`;
}

function getMatchLabelView(roundIndex, matchIndex) {
  return `Heat ${matchIndex + 1}`;
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

function clampInt(value, min, max) {
  return Math.round(clamp(Number.isFinite(Number(value)) ? Number(value) : min, min, max));
}
