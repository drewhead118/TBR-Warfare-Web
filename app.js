
const STORAGE_KEY = "tbr-warfare-state-v1";
const FIELD = { width: 1180, height: 760 };
const SPEED_OPTIONS = [0.35, 0.65, 1, 1.4, 1.85];
const DEFAULT_COMPOSITION = { archer: 1, mage: 1, knight: 1 };
const UNIT_LIBRARY = [
  { id: "archer", name: "Archer", keywords: ["bow", "ranged", "arrow"] },
  { id: "mage", name: "Mage", keywords: ["magic", "orb", "beam", "wizard"] },
  { id: "knight", name: "Knight", keywords: ["melee", "sword", "tank"] },
];
const UNIT_STATS = {
  archer: { maxHealth: 58, speed: 48, range: 210, damage: 14, cooldown: 1.65 },
  mage: { maxHealth: 52, speed: 44, range: 180, abductRange: 310, damage: 16, cooldown: 2.05 },
  knight: { maxHealth: 210, speed: 28, range: 26, damage: 38, cooldown: 1.05 },
};
const SAMPLE_BOOKS = [
  {
    title: "The Spear of Starlight",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80",
    armySize: 22,
    submissionType: "paperback",
    composition: { archer: 3, mage: 2, knight: 5 },
    fledReserve: 0,
  },
  {
    title: "Salt of the Citadel",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80",
    armySize: 19,
    submissionType: "digital",
    composition: { archer: 5, mage: 2, knight: 3 },
    fledReserve: 0,
  },
  {
    title: "Moonlit Cartographer",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80",
    armySize: 16,
    submissionType: "digital",
    composition: { archer: 2, mage: 4, knight: 3 },
    fledReserve: 0,
  },
];

const state = {
  factions: [],
  battle: null,
  images: new Map(),
  running: false,
  roundsApplied: 0,
  speedIndex: 2,
  camera: {
    x: FIELD.width / 2,
    y: FIELD.height / 2,
    zoom: 1,
    targetX: FIELD.width / 2,
    targetY: FIELD.height / 2,
    targetZoom: 1,
    manualUntil: 0,
    isDragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
  },
  compositionModal: {
    factionId: null,
    draft: null,
    search: "",
  },
};

const els = {
  canvas: document.getElementById("battleCanvas"),
  runBattleBtn: document.getElementById("runBattleBtn"),
  resetBattleBtn: document.getElementById("resetBattleBtn"),
  advanceQueueBtn: document.getElementById("advanceQueueBtn"),
  seedSampleBtn: document.getElementById("seedSampleBtn"),
  csvInput: document.getElementById("csvInput"),
  csvFileInput: document.getElementById("csvFileInput"),
  importCsvBtn: document.getElementById("importCsvBtn"),
  downloadCsvBtn: document.getElementById("downloadCsvBtn"),
  armyList: document.getElementById("armyList"),
  battleState: document.getElementById("battleState"),
  winnerLabel: document.getElementById("winnerLabel"),
  roundCounter: document.getElementById("roundCounter"),
  battleTicker: document.getElementById("battleTicker"),
  winnerCard: document.getElementById("winnerCard"),
  speedControls: document.getElementById("speedControls"),
  template: document.getElementById("armyEditorTemplate"),
  compositionModal: document.getElementById("compositionModal"),
  closeCompositionModalBtn: document.getElementById("closeCompositionModalBtn"),
  cancelCompositionBtn: document.getElementById("cancelCompositionBtn"),
  saveCompositionBtn: document.getElementById("saveCompositionBtn"),
  compositionSearch: document.getElementById("compositionSearch"),
  compositionResults: document.getElementById("compositionResults"),
  compositionSelected: document.getElementById("compositionSelected"),
};

const ctx = els.canvas.getContext("2d");
let lastFrame = performance.now();

bootstrap();

function bootstrap() {
  loadState();
  if (!state.factions.length) {
    state.factions = cloneData(SAMPLE_BOOKS).map(withFactionDefaults);
    saveState();
  }
  bindUi();
  renderSpeedControls();
  syncCsvInput();
  renderArmyEditors();
  resetBattle();
  requestAnimationFrame(loop);
}

function bindUi() {
  els.runBattleBtn.addEventListener("click", startBattle);
  els.resetBattleBtn.addEventListener("click", resetBattle);
  els.advanceQueueBtn.addEventListener("click", applyWinnerToQueue);
  els.seedSampleBtn.addEventListener("click", () => {
    state.factions = cloneData(SAMPLE_BOOKS).map(withFactionDefaults);
    state.roundsApplied = 0;
    syncCsvInput();
    renderArmyEditors();
    saveState();
    resetBattle();
  });
  els.importCsvBtn.addEventListener("click", importCsv);
  els.csvFileInput.addEventListener("change", importCsvFile);
  els.downloadCsvBtn.addEventListener("click", exportCsv);
  els.closeCompositionModalBtn.addEventListener("click", closeCompositionModal);
  els.cancelCompositionBtn.addEventListener("click", closeCompositionModal);
  els.saveCompositionBtn.addEventListener("click", saveCompositionModal);
  els.compositionSearch.addEventListener("input", () => {
    state.compositionModal.search = els.compositionSearch.value;
    renderCompositionModal();
  });
  els.compositionModal.addEventListener("click", (event) => {
    if (event.target.dataset.close) closeCompositionModal();
  });
  window.addEventListener("resize", sizeCanvas);
  els.canvas.addEventListener("pointerdown", onCanvasPointerDown);
  window.addEventListener("pointermove", onCanvasPointerMove);
  window.addEventListener("pointerup", onCanvasPointerUp);
  els.canvas.addEventListener("wheel", onCanvasWheel, { passive: false });
  sizeCanvas();
}

function renderSpeedControls() {
  els.speedControls.innerHTML = "";
  SPEED_OPTIONS.forEach((speed, index) => {
    const button = document.createElement("button");
    button.className = `speed-btn${index === state.speedIndex ? " active" : ""}`;
    button.textContent = `${index + 1}`;
    button.title = `${speed.toFixed(2)}x simulation speed`;
    button.addEventListener("click", () => {
      state.speedIndex = index;
      renderSpeedControls();
    });
    els.speedControls.appendChild(button);
  });
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function withFactionDefaults(faction, index = 0) {
  return {
    id: faction.id || `faction-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    title: faction.title || `Untitled Army ${index + 1}`,
    coverUrl: faction.coverUrl || "",
    armySize: clampInt(faction.armySize ?? 12, 1, 250),
    submissionType: faction.submissionType === "paperback" ? "paperback" : "digital",
    composition: normalizeComposition(faction.composition || DEFAULT_COMPOSITION),
    fledReserve: clampInt(faction.fledReserve ?? 0, 0, 250),
  };
}

function normalizeComposition(mix) {
  const result = {};
  UNIT_LIBRARY.forEach((unit) => {
    const raw = mix[unit.id] ?? mix[`${unit.id}s`] ?? 0;
    result[unit.id] = clampInt(raw, 0, 999);
  });
  if (Object.values(result).every((value) => value <= 0)) {
    return { ...DEFAULT_COMPOSITION };
  }
  return result;
}

function compositionSummary(composition) {
  return UNIT_LIBRARY
    .filter((unit) => composition[unit.id] > 0)
    .map((unit) => `${unit.name} ${composition[unit.id]}`)
    .join(" : ") || "No units selected";
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, Math.round(Number(value) || 0)));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    state.factions = (saved.factions || []).map(withFactionDefaults);
    state.roundsApplied = saved.roundsApplied || 0;
  } catch {
    state.factions = [];
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ factions: state.factions, roundsApplied: state.roundsApplied }));
}
function syncCsvInput() {
  const rows = [
    ["title", "coverUrl", "armySize", "submissionType", "archer", "mage", "knight", "fledReserve"].join(","),
    ...state.factions.map((faction) => [
      csvEscape(faction.title),
      csvEscape(faction.coverUrl),
      faction.armySize,
      faction.submissionType,
      faction.composition.archer,
      faction.composition.mage,
      faction.composition.knight,
      faction.fledReserve,
    ].join(",")),
  ];
  els.csvInput.value = rows.join("\n");
}

function csvEscape(value) {
  const text = `${value ?? ""}`;
  if (text.includes(",") || text.includes('"') || text.includes("\n")) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ""]));
    return withFactionDefaults({
      title: row.title,
      coverUrl: row.coverUrl,
      armySize: row.armySize,
      submissionType: row.submissionType,
      composition: { archer: row.archer ?? row.archers, mage: row.mage ?? row.mages, knight: row.knight ?? row.knights },
      fledReserve: row.fledReserve,
    }, index);
  });
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (quoted && char === '"' && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current);
  return values;
}

function importCsvFile(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    els.csvInput.value = `${reader.result || ""}`;
    importCsv();
  };
  reader.readAsText(file);
}

function importCsv() {
  const parsed = parseCsv(els.csvInput.value);
  if (!parsed.length) {
    setTicker("CSV import needs at least one army row.");
    return;
  }
  state.factions = parsed;
  saveState();
  renderArmyEditors();
  resetBattle();
}

function exportCsv() {
  syncCsvInput();
  const blob = new Blob([els.csvInput.value], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tbr-warfare-armies.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function renderArmyEditors() {
  els.armyList.innerHTML = "";
  state.factions.forEach((faction) => {
    const fragment = els.template.content.cloneNode(true);
    fragment.querySelector(".army-title").textContent = faction.title;
    fragment.querySelector(".army-meta").textContent = `${faction.armySize} troops • ${faction.submissionType}`;
    const thumb = fragment.querySelector(".cover-thumb");
    thumb.src = faction.coverUrl;
    thumb.alt = `${faction.title} cover`;
    bindArmyEditor(fragment, faction);
    els.armyList.appendChild(fragment);
  });

  const addBtn = document.createElement("button");
  addBtn.className = "ghost";
  addBtn.textContent = "Add Book Army";
  addBtn.addEventListener("click", () => {
    state.factions.push(withFactionDefaults({ title: "New Challenger", coverUrl: "", armySize: 12, submissionType: "digital", composition: DEFAULT_COMPOSITION, fledReserve: 0 }, state.factions.length));
    saveState();
    syncCsvInput();
    renderArmyEditors();
    resetBattle();
  });
  els.armyList.appendChild(addBtn);
  els.roundCounter.textContent = `${state.roundsApplied}`;
}

function bindArmyEditor(fragment, faction) {
  const titleInput = fragment.querySelector(".title-input");
  const coverInput = fragment.querySelector(".cover-input");
  const sizeInput = fragment.querySelector(".size-input");
  const submissionInput = fragment.querySelector(".submission-input");
  const reserveInput = fragment.querySelector(".reserve-input");
  const summary = fragment.querySelector(".composition-summary");
  const editBtn = fragment.querySelector(".edit-composition");

  titleInput.value = faction.title;
  coverInput.value = faction.coverUrl;
  sizeInput.value = faction.armySize;
  submissionInput.value = faction.submissionType;
  reserveInput.value = faction.fledReserve;
  summary.textContent = compositionSummary(faction.composition);

  const commit = () => {
    faction.title = titleInput.value.trim() || faction.title;
    faction.coverUrl = coverInput.value.trim();
    faction.armySize = clampInt(sizeInput.value, 1, 250);
    faction.submissionType = submissionInput.value === "paperback" ? "paperback" : "digital";
    faction.fledReserve = clampInt(reserveInput.value, 0, 250);
    syncCsvInput();
    saveState();
    resetBattle();
    renderArmyEditors();
  };

  [titleInput, coverInput, sizeInput, submissionInput, reserveInput].forEach((input) => input.addEventListener("change", commit));
  editBtn.addEventListener("click", () => openCompositionModal(faction.id));
  fragment.querySelector(".remove-army").addEventListener("click", () => {
    state.factions = state.factions.filter((entry) => entry.id !== faction.id);
    saveState();
    syncCsvInput();
    renderArmyEditors();
    resetBattle();
  });
}

function openCompositionModal(factionId) {
  const faction = state.factions.find((entry) => entry.id === factionId);
  if (!faction) return;
  state.compositionModal.factionId = factionId;
  state.compositionModal.draft = { ...faction.composition };
  state.compositionModal.search = "";
  els.compositionSearch.value = "";
  renderCompositionModal();
  els.compositionModal.classList.remove("hidden");
}

function closeCompositionModal() {
  els.compositionModal.classList.add("hidden");
  state.compositionModal.factionId = null;
  state.compositionModal.draft = null;
}

function renderCompositionModal() {
  const draft = state.compositionModal.draft;
  if (!draft) return;
  const term = state.compositionModal.search.trim().toLowerCase();
  const available = UNIT_LIBRARY.filter((unit) => {
    if (draft[unit.id] > 0) return false;
    if (!term) return true;
    return unit.name.toLowerCase().includes(term) || unit.keywords.some((word) => word.includes(term));
  });

  els.compositionResults.innerHTML = available.map((unit) => `
    <div class="unit-result">
      <div class="unit-chip">
        <div class="unit-icon">${unit.name[0]}</div>
        <div>
          <strong>${unit.name}</strong>
          <p>${unit.keywords.join(", ")}</p>
        </div>
      </div>
      <button class="ghost small" data-add-unit="${unit.id}">Select</button>
    </div>
  `).join("") || '<p class="hint">No matching units.</p>';

  els.compositionSelected.innerHTML = UNIT_LIBRARY.filter((unit) => draft[unit.id] > 0).map((unit) => `
    <div class="selected-unit">
      <div class="unit-chip">
        <div class="unit-icon">${unit.name[0]}</div>
        <strong>${unit.name}</strong>
      </div>
      <div class="button-row">
        <input type="number" min="1" max="999" value="${draft[unit.id]}" data-unit-weight="${unit.id}">
        <button class="ghost small" data-remove-unit="${unit.id}">Remove</button>
      </div>
    </div>
  `).join("") || '<p class="hint">Select one or more units to define the faction mix.</p>';

  els.compositionResults.querySelectorAll("[data-add-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      draft[button.dataset.addUnit] = draft[button.dataset.addUnit] || 1;
      renderCompositionModal();
    });
  });
  els.compositionSelected.querySelectorAll("[data-unit-weight]").forEach((input) => {
    input.addEventListener("change", () => {
      draft[input.dataset.unitWeight] = clampInt(input.value, 1, 999);
      renderCompositionModal();
    });
  });
  els.compositionSelected.querySelectorAll("[data-remove-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      draft[button.dataset.removeUnit] = 0;
      renderCompositionModal();
    });
  });
}

function saveCompositionModal() {
  const faction = state.factions.find((entry) => entry.id === state.compositionModal.factionId);
  if (!faction || !state.compositionModal.draft) return;
  faction.composition = normalizeComposition(state.compositionModal.draft);
  saveState();
  syncCsvInput();
  renderArmyEditors();
  resetBattle();
  closeCompositionModal();
}
function sizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.canvas.width = Math.round(rect.width * dpr);
  els.canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function resetBattle() {
  state.running = false;
  state.battle = buildBattle();
  resetCamera();
  els.battleState.textContent = "Ready";
  els.winnerLabel.textContent = "None yet";
  els.winnerCard.classList.add("hidden");
  setTicker(state.factions.length ? "Armies are awaiting the signal." : "Add at least one army to begin.");
}

function resetCamera() {
  state.camera.x = FIELD.width / 2;
  state.camera.y = FIELD.height / 2;
  state.camera.targetX = FIELD.width / 2;
  state.camera.targetY = FIELD.height / 2;
  state.camera.zoom = 1;
  state.camera.targetZoom = 1;
  state.camera.manualUntil = 0;
  state.camera.isDragging = false;
  els.canvas.classList.remove("is-dragging");
}

function startBattle() {
  if (state.factions.length < 2) {
    setTicker("At least two armies are required.");
    return;
  }
  state.running = true;
  els.battleState.textContent = "Battling";
  setTicker("The war for the next read has begun.");
}

function buildBattle() {
  const field = { ...FIELD, centerX: FIELD.width / 2, centerY: FIELD.height / 2, radius: 320 };
  const factions = state.factions.map((faction, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(1, state.factions.length);
    const baseX = field.centerX + Math.cos(angle) * field.radius;
    const baseY = field.centerY + Math.sin(angle) * field.radius * 0.62;
    return {
      ...faction,
      color: factionColor(index),
      units: spawnUnitsForFaction(faction, baseX, baseY),
      bannerPos: { x: baseX, y: baseY - 44 },
      alive: true,
      image: getFactionImage(faction.coverUrl),
    };
  });
  return { field, factions, projectiles: [], particles: [], spells: [], swipes: [], stuckArrows: [], pendingWinner: null, time: 0 };
}

function factionColor(index) {
  const palette = ["#db7d4a", "#5ca5cf", "#d2bf62", "#b375d7", "#c45c68", "#53b88a", "#d6809b", "#7498e5"];
  return palette[index % palette.length];
}

function spawnUnitsForFaction(faction, baseX, baseY) {
  const total = faction.armySize + faction.fledReserve;
  const counts = compositionCounts(total, faction.composition);
  const units = [];
  UNIT_LIBRARY.forEach((unitDef) => {
    for (let i = 0; i < (counts[unitDef.id] || 0); i += 1) {
      const spread = 54 + Math.random() * 28;
      const orbit = Math.random() * Math.PI * 2;
      units.push(makeUnit(
        faction.id,
        unitDef.id,
        baseX + Math.cos(orbit) * spread,
        baseY + Math.sin(orbit) * spread * 0.62,
      ));
    }
  });
  return units;
}

function compositionCounts(total, composition) {
  const weights = UNIT_LIBRARY.map((unit) => Math.max(0, composition[unit.id] || 0));
  const weightTotal = Math.max(1, weights.reduce((sum, value) => sum + value, 0));
  let remaining = total;
  const counts = {};
  UNIT_LIBRARY.forEach((unit, index) => {
    if (index === UNIT_LIBRARY.length - 1) {
      counts[unit.id] = remaining;
    } else {
      counts[unit.id] = Math.min(remaining, Math.round((total * weights[index]) / weightTotal));
      remaining -= counts[unit.id];
    }
  });
  return counts;
}

function makeUnit(factionId, type, x, y) {
  const stats = UNIT_STATS[type];
  return {
    id: `${factionId}-${type}-${Math.random().toString(36).slice(2, 8)}`,
    factionId,
    type,
    x,
    y,
    z: 0,
    facing: 0,
    displayFacingX: 1,
    headingCandidate: 1,
    headingTimer: 0,
    vx: 0,
    vy: 0,
    health: stats.maxHealth,
    maxHealth: stats.maxHealth,
    cooldown: Math.random() * stats.cooldown,
    bravery: 0.28 + Math.random() * 0.65,
    dead: false,
    fled: false,
    fleeing: false,
    liftedBySpellId: null,
    activeSpellId: null,
  };
}

function getFactionImage(url) {
  if (!url) return null;
  if (!state.images.has(url)) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    state.images.set(url, image);
  }
  return state.images.get(url);
}

function loop(timestamp) {
  const dt = Math.min(0.033, (timestamp - lastFrame) / 1000);
  lastFrame = timestamp;
  const simDt = dt * SPEED_OPTIONS[state.speedIndex];
  if (state.running && state.battle) stepBattle(state.battle, simDt);
  updateCamera(dt);
  render();
  requestAnimationFrame(loop);
}

function stepBattle(battle, dt) {
  battle.time += dt;
  battle.factions.forEach((faction) => {
    updateFactionBanner(faction);
    faction.alive = faction.units.some((unit) => !unit.dead && !unit.fled);
    faction.units.forEach((unit) => updateUnit(unit, faction, battle, dt));
  });
  updateProjectiles(battle, dt);
  updateParticles(battle, dt);
  updateSpells(battle, dt);
  updateSwipes(battle, dt);
  updateStuckArrows(battle, dt);

  const contenders = battle.factions.filter((faction) => faction.units.some((unit) => !unit.dead && !unit.fled));
  if (contenders.length <= 1 && !battle.pendingWinner) {
    const winner = contenders[0];
    battle.pendingWinner = winner ? winner.id : null;
    state.running = false;
    els.battleState.textContent = "Complete";
    if (winner) {
      els.winnerLabel.textContent = winner.title;
      setTicker(`${winner.title} survives the melee.`);
      showWinnerCard(winner, battle);
    } else {
      els.winnerLabel.textContent = "Mutual destruction";
      setTicker("No army survived the field.");
    }
  }
}

function updateFactionBanner(faction) {
  const active = faction.units.filter((unit) => !unit.dead && !unit.fled);
  if (!active.length) return;
  const sum = active.reduce((acc, unit) => ({ x: acc.x + unit.x, y: acc.y + unit.y }), { x: 0, y: 0 });
  faction.bannerPos.x += ((sum.x / active.length) - faction.bannerPos.x) * 0.08;
  faction.bannerPos.y += (((sum.y / active.length) - 44) - faction.bannerPos.y) * 0.08;
}
function updateUnit(unit, faction, battle, dt) {
  if (unit.dead || unit.fled) return;
  if (unit.liftedBySpellId) {
    unit.vx = 0;
    unit.vy = 0;
    return;
  }

  unit.z += (0 - unit.z) * 0.18;
  const enemies = battle.factions.filter((entry) => entry.id !== faction.id).flatMap((entry) => entry.units.filter((enemy) => !enemy.dead && !enemy.fled));
  if (!enemies.length) return;
  const target = findTarget(unit, enemies);
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  const panicThreshold = unit.maxHealth * (0.28 + (1 - unit.bravery) * 0.3);
  unit.fleeing = unit.health < panicThreshold && Math.random() > unit.bravery * 0.86;

  let desiredX = target.x;
  let desiredY = target.y;
  if (unit.fleeing) {
    const awayX = unit.x - battle.field.centerX;
    const awayY = unit.y - battle.field.centerY;
    const awayLength = Math.max(0.001, Math.hypot(awayX, awayY));
    desiredX = unit.x + (awayX / awayLength) * 120;
    desiredY = unit.y + (awayY / awayLength) * 120;
  } else if (unit.type === "archer" && distance < 120) {
    desiredX = unit.x - (target.x - unit.x);
    desiredY = unit.y - (target.y - unit.y);
  } else if (unit.type === "mage" && distance < 110) {
    desiredX = unit.x - (target.x - unit.x) * 0.85;
    desiredY = unit.y - (target.y - unit.y) * 0.85;
  }

  const dx = desiredX - unit.x;
  const dy = desiredY - unit.y;
  const length = Math.max(0.001, Math.hypot(dx, dy));
  unit.facing = Math.atan2(dy, dx);

  const moveSpeed = unit.type === "knight"
    ? UNIT_STATS.knight.speed
    : UNIT_STATS[unit.type].speed * (0.42 + 0.58 * (unit.health / unit.maxHealth));
  const moveScale = unit.fleeing ? 1.15 : 1;
  unit.vx += (((dx / length) * moveSpeed * moveScale) - unit.vx) * 0.12;
  unit.vy += (((dy / length) * moveSpeed * moveScale * 0.75) - unit.vy) * 0.12;
  updateStableFacing(unit, dt);

  const attackRange = unit.type === "mage" ? Math.max(UNIT_STATS.mage.range, UNIT_STATS.mage.abductRange) : UNIT_STATS[unit.type].range;
  if (!unit.fleeing && distance <= attackRange) {
    unit.vx *= 0.84;
    unit.vy *= 0.84;
    unit.cooldown -= dt;
    if (unit.cooldown <= 0) {
      fireAttack(unit, target, battle);
      unit.cooldown = UNIT_STATS[unit.type].cooldown * (0.8 + Math.random() * 0.5);
    }
  }

  unit.x += unit.vx * dt;
  unit.y += unit.vy * dt;
  keepOnField(unit, battle.field);

  const distFromCenter = Math.hypot(unit.x - battle.field.centerX, unit.y - battle.field.centerY);
  if (unit.fleeing && distFromCenter > battle.field.radius + 150) {
    unit.fled = true;
    setTicker(`${faction.title} has a routed survivor who may return next round.`);
  }
}

function updateStableFacing(unit, dt) {
  const desired = Math.abs(unit.vx) < 4 ? unit.displayFacingX : (unit.vx >= 0 ? 1 : -1);
  if (desired === unit.displayFacingX) {
    unit.headingCandidate = desired;
    unit.headingTimer = 0;
    return;
  }
  if (unit.headingCandidate !== desired) {
    unit.headingCandidate = desired;
    unit.headingTimer = 0;
    return;
  }
  unit.headingTimer += dt;
  if (unit.headingTimer >= 0.5) {
    unit.displayFacingX = desired;
    unit.headingTimer = 0;
  }
}

function keepOnField(unit, field) {
  unit.x = clamp(unit.x, 20, field.width - 20);
  unit.y = clamp(unit.y, 20, field.height - 20);
}

function findTarget(unit, enemies) {
  let best = enemies[0];
  let bestScore = Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const woundedBias = enemy.health / enemy.maxHealth;
    const score = distance * woundedBias * (0.9 + Math.random() * 0.35);
    if (score < bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  return best;
}

function fireAttack(unit, target, battle) {
  if (unit.type === "archer") {
    const endX = target.x + (Math.random() - 0.5) * 30;
    const endY = target.y + (Math.random() - 0.5) * 26;
    const distance = Math.hypot(endX - unit.x, endY - unit.y);
    battle.projectiles.push({ kind: "arrow", progress: 0, duration: clamp(0.35 + distance / 230 + Math.random() * 0.15, 0.38, 1.3), startX: unit.x, startY: unit.y - 18, endX, endY, impactAngle: Math.atan2(endY - unit.y, endX - unit.x), targetId: target.id, damage: UNIT_STATS.archer.damage * (0.85 + Math.random() * 0.5) });
    return;
  }
  if (unit.type === "mage") {
    const spellExists = battle.spells.some((spell) => spell.sourceId === unit.id || spell.targetId === target.id);
    const abductEligible = Math.hypot(target.x - unit.x, target.y - unit.y) <= UNIT_STATS.mage.abductRange && !target.liftedBySpellId && !unit.activeSpellId;
    if (abductEligible && !spellExists && Math.random() < 0.45) {
      const pullAngle = Math.atan2(unit.y - target.y, unit.x - target.x);
      const endX = unit.x - Math.cos(pullAngle) * 58;
      const endY = unit.y - Math.sin(pullAngle) * 58;
      const spellId = `spell-${Math.random().toString(36).slice(2, 8)}`;
      battle.spells.push({ id: spellId, kind: "levitate", sourceId: unit.id, targetId: target.id, time: 0, duration: 1.15, startX: target.x, startY: target.y, endX, endY });
      unit.activeSpellId = spellId;
      target.liftedBySpellId = spellId;
      return;
    }
    if (Math.hypot(target.x - unit.x, target.y - unit.y) <= UNIT_STATS.mage.range) {
      battle.projectiles.push({ kind: "orb", progress: 0, duration: 0.44 + Math.random() * 0.24, startX: unit.x, startY: unit.y - 24, endX: target.x, endY: target.y, targetId: target.id, damage: UNIT_STATS.mage.damage * (1.05 + Math.random() * 0.65), radius: 44 });
    }
    return;
  }
  if (Math.hypot(target.x - unit.x, target.y - unit.y) <= UNIT_STATS.knight.range + 4) {
    applyDamage(target, UNIT_STATS.knight.damage * (0.92 + Math.random() * 0.46), battle);
    battle.swipes.push({ x: target.x, y: target.y - 12, angle: unit.facing, life: 0.22, maxLife: 0.22, color: shadeColor(findFaction(battle, unit.factionId).color, 0.35) });
    spawnBurst(battle, target.x, target.y, "#ffd59b", 10);
  }
}

function findFaction(battle, factionId) {
  return battle.factions.find((entry) => entry.id === factionId);
}

function updateProjectiles(battle, dt) {
  battle.projectiles = battle.projectiles.filter((projectile) => {
    projectile.progress += dt / projectile.duration;
    if (projectile.progress >= 1) {
      resolveProjectile(projectile, battle);
      return false;
    }
    return true;
  });
}

function resolveProjectile(projectile, battle) {
  if (projectile.kind === "arrow") {
    const target = findUnitById(battle, projectile.targetId);
    if (target && !target.dead && Math.random() > 0.18) {
      applyDamage(target, projectile.damage, battle);
      spawnBurst(battle, projectile.endX, projectile.endY, "#f5d087", 8);
    } else {
      spawnBurst(battle, projectile.endX, projectile.endY, "#7d5f35", 5);
    }
    battle.stuckArrows.push({ x: projectile.endX, y: projectile.endY, angle: projectile.impactAngle, life: 1.2, maxLife: 1.2 });
    return;
  }
  battle.factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled) return;
      const dist = Math.hypot(unit.x - projectile.endX, unit.y - projectile.endY);
      if (dist <= projectile.radius) applyDamage(unit, projectile.damage * Math.max(0.3, 1 - dist / projectile.radius), battle);
    });
  });
  spawnBurst(battle, projectile.endX, projectile.endY, "#7ce7ff", 18);
}
function updateSpells(battle, dt) {
  battle.spells = battle.spells.filter((spell) => {
    spell.time += dt;
    const source = findUnitById(battle, spell.sourceId);
    const target = findUnitById(battle, spell.targetId);
    if (!source || !target || source.dead || target.dead || target.fled) {
      if (source) source.activeSpellId = null;
      if (target) target.liftedBySpellId = null;
      return false;
    }
    const progress = clamp(spell.time / spell.duration, 0, 1);
    target.x = lerp(spell.startX, spell.endX, progress);
    target.y = lerp(spell.startY, spell.endY, progress);
    target.z = 10 + Math.sin(progress * Math.PI) * 34;
    target.vx = 0;
    target.vy = 0;
    if (progress >= 1) {
      target.liftedBySpellId = null;
      target.z = 0;
      source.activeSpellId = null;
      return false;
    }
    return true;
  });
}

function updateParticles(battle, dt) {
  battle.particles = battle.particles.filter((particle) => {
    particle.age += dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += 40 * dt;
    return particle.age < particle.life;
  });
}

function updateSwipes(battle, dt) {
  battle.swipes = battle.swipes.filter((swipe) => {
    swipe.life -= dt;
    return swipe.life > 0;
  });
}

function updateStuckArrows(battle, dt) {
  battle.stuckArrows = battle.stuckArrows.filter((arrow) => {
    arrow.life -= dt;
    return arrow.life > 0;
  });
}

function findUnitById(battle, id) {
  for (const faction of battle.factions) {
    const found = faction.units.find((unit) => unit.id === id);
    if (found) return found;
  }
  return null;
}

function applyDamage(unit, amount, battle) {
  unit.health -= amount;
  if (unit.health <= 0) {
    unit.dead = true;
    unit.health = 0;
    unit.liftedBySpellId = null;
    spawnBurst(battle, unit.x, unit.y, "#f3c58a", 16);
  }
}

function spawnBurst(battle, x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    battle.particles.push({ x, y, vx: (Math.random() - 0.5) * 90, vy: (Math.random() - 0.5) * 90, life: 0.35 + Math.random() * 0.5, age: 0, color, size: 2 + Math.random() * 5 });
  }
}

function showWinnerCard(winner, battle) {
  const alive = winner.units.filter((unit) => !unit.dead && !unit.fled).length;
  const routed = winner.units.filter((unit) => unit.fled).length;
  const others = battle.factions
    .filter((faction) => faction.id !== winner.id)
    .map((faction) => {
      const growth = faction.submissionType === "paperback" ? 4 : 2;
      const fled = faction.units.filter((unit) => unit.fled).length;
      return { title: faction.title, current: faction.armySize, next: faction.armySize + growth + fled, growth, fled };
    })
    .sort((a, b) => b.next - a.next);

  els.winnerCard.innerHTML = `
    <div class="winner-header">
      <h3>${winner.title}</h3>
      <p>${alive} soldiers held the field. ${routed} routed survivors were carried off.</p>
    </div>
    <div class="victory-list">
      ${others.map((entry) => `
        <div class="victory-entry">
          <div>
            <strong>${entry.title}</strong>
            <p>${entry.current} -> ${entry.next} next round</p>
          </div>
          <div class="victory-badges">
            <span class="victory-badge">${entry.growth > 0 ? `+${entry.growth} base` : "+0 base"}</span>
            <span class="victory-badge">${entry.fled > 0 ? `+${entry.fled} fled` : "+0 fled"}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  els.winnerCard.classList.remove("hidden");
}

function applyWinnerToQueue() {
  if (!state.battle?.pendingWinner) {
    setTicker("Finish a battle before applying results.");
    return;
  }
  state.factions = state.battle.factions.flatMap((faction) => {
    if (faction.id === state.battle.pendingWinner) return [];
    const growth = faction.submissionType === "paperback" ? 4 : 2;
    const fled = faction.units.filter((unit) => unit.fled).length;
    return [withFactionDefaults({ ...faction, armySize: faction.armySize + growth + fled, fledReserve: 0 })];
  });
  state.roundsApplied += 1;
  saveState();
  syncCsvInput();
  renderArmyEditors();
  resetBattle();
  setTicker("Winner removed. Remaining armies have been reinforced.");
}

function setTicker(text) {
  els.battleTicker.textContent = text;
}

function onCanvasPointerDown(event) {
  markCameraManual();
  state.camera.isDragging = true;
  state.camera.lastPointerX = event.clientX;
  state.camera.lastPointerY = event.clientY;
  els.canvas.classList.add("is-dragging");
}

function onCanvasPointerMove(event) {
  if (!state.camera.isDragging || !state.battle) return;
  const viewport = getViewport();
  const scale = getBaseScale(viewport) * state.camera.zoom;
  const dx = (event.clientX - state.camera.lastPointerX) * (window.devicePixelRatio || 1);
  const dy = (event.clientY - state.camera.lastPointerY) * (window.devicePixelRatio || 1);
  state.camera.x -= dx / scale;
  state.camera.y -= dy / scale;
  state.camera.lastPointerX = event.clientX;
  state.camera.lastPointerY = event.clientY;
  clampCameraToField();
  markCameraManual();
}

function onCanvasPointerUp() {
  state.camera.isDragging = false;
  els.canvas.classList.remove("is-dragging");
}

function onCanvasWheel(event) {
  event.preventDefault();
  markCameraManual();
  state.camera.zoom = clamp(state.camera.zoom * (Math.sign(event.deltaY) > 0 ? 0.9 : 1.1), 0.7, 2.4);
  state.camera.targetZoom = state.camera.zoom;
  clampCameraToField();
}

function markCameraManual() {
  state.camera.manualUntil = performance.now() + 4000;
}

function updateCamera(dt) {
  if (!state.battle) return;
  const auto = getAutoCameraTarget(state.battle);
  state.camera.targetX = auto.x;
  state.camera.targetY = auto.y;
  state.camera.targetZoom = auto.zoom;
  const manualActive = performance.now() < state.camera.manualUntil || state.camera.isDragging;
  if (!manualActive) {
    state.camera.x += (state.camera.targetX - state.camera.x) * Math.min(1, dt * 3.6);
    state.camera.y += (state.camera.targetY - state.camera.y) * Math.min(1, dt * 3.6);
    state.camera.zoom += (state.camera.targetZoom - state.camera.zoom) * Math.min(1, dt * 2.8);
  }
  clampCameraToField();
}
function getAutoCameraTarget(battle) {
  const activeUnits = battle.factions.flatMap((faction) => faction.units.filter((unit) => !unit.dead && !unit.fled));
  if (!activeUnits.length) return { x: FIELD.width / 2, y: FIELD.height / 2, zoom: 1 };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  activeUnits.forEach((unit) => {
    minX = Math.min(minX, unit.x);
    minY = Math.min(minY, unit.y);
    maxX = Math.max(maxX, unit.x);
    maxY = Math.max(maxY, unit.y);
  });
  const buffer = 110;
  const viewport = getViewport();
  const baseScale = getBaseScale(viewport);
  const fitZoom = Math.min(viewport.width / Math.max(260, maxX - minX + buffer * 2), viewport.height / Math.max(220, maxY - minY + buffer * 2)) / baseScale;
  return { x: clamp((minX + maxX) / 2, 0, FIELD.width), y: clamp((minY + maxY) / 2, 0, FIELD.height), zoom: clamp(fitZoom, 0.72, 1.8) };
}

function clampCameraToField() {
  const viewport = getViewport();
  const scale = getBaseScale(viewport) * state.camera.zoom;
  const halfWorldWidth = viewport.width / scale / 2;
  const halfWorldHeight = viewport.height / scale / 2;
  state.camera.x = clamp(state.camera.x, halfWorldWidth, FIELD.width - halfWorldWidth);
  state.camera.y = clamp(state.camera.y, halfWorldHeight, FIELD.height - halfWorldHeight);
}

function getViewport() {
  return { width: els.canvas.width, height: els.canvas.height };
}

function getBaseScale(viewport) {
  return Math.min(viewport.width / FIELD.width, viewport.height / FIELD.height);
}

function worldToScreen(x, y, viewport) {
  const scale = getBaseScale(viewport) * state.camera.zoom;
  return { x: viewport.width / 2 - state.camera.x * scale + x * scale, y: viewport.height / 2 - state.camera.y * scale + y * scale, scale };
}

function render() {
  if (!state.battle) return;
  const viewport = getViewport();
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  drawField(viewport);
  drawGroundDecor(viewport);
  drawStuckArrows(viewport, state.battle.stuckArrows);
  drawBanners(viewport, state.battle.factions);
  drawProjectiles(viewport, state.battle.projectiles);
  drawUnits(viewport, state.battle.factions);
  drawSwipes(viewport, state.battle.swipes);
  drawSpells(viewport, state.battle);
  drawParticles(viewport, state.battle.particles);
}

function drawField(viewport) {
  ctx.fillStyle = "#213018";
  ctx.fillRect(0, 0, viewport.width, viewport.height);
  const top = worldToScreen(0, 0, viewport);
  const bottom = worldToScreen(FIELD.width, FIELD.height, viewport);
  const gradient = ctx.createLinearGradient(0, top.y, 0, bottom.y);
  gradient.addColorStop(0, "#8fa27f");
  gradient.addColorStop(0.5, "#5f744d");
  gradient.addColorStop(1, "#475b39");
  ctx.fillStyle = gradient;
  ctx.fillRect(top.x, top.y, bottom.x - top.x, bottom.y - top.y);
}

function drawGroundDecor(viewport) {
  for (let i = 0; i < 28; i += 1) {
    const point = worldToScreen((i * 63) % FIELD.width, 90 + ((i * 97) % (FIELD.height - 180)), viewport);
    ctx.fillStyle = i % 2 ? "rgba(255,235,180,0.05)" : "rgba(75,95,50,0.08)";
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, 38 * point.scale / 2.2, 16 * point.scale / 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBanners(viewport, factions) {
  factions.forEach((faction) => {
    if (!faction.alive) return;
    const point = worldToScreen(faction.bannerPos.x, faction.bannerPos.y, viewport);
    const scale = point.scale;
    ctx.strokeStyle = "rgba(50, 28, 16, 0.8)";
    ctx.lineWidth = Math.max(2, 4 * scale / 2.1);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x, point.y + 50 * scale / 2.1);
    ctx.stroke();
    ctx.fillStyle = faction.color;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x + 34 * scale / 2.1, point.y + 12 * scale / 2.1);
    ctx.lineTo(point.x, point.y + 24 * scale / 2.1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,248,232,0.95)";
    ctx.fillRect(point.x + 2 * scale / 2.1, point.y + 3 * scale / 2.1, 19 * scale / 2.1, 18 * scale / 2.1);
    if (faction.image && faction.image.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(point.x + 2 * scale / 2.1, point.y + 3 * scale / 2.1, 19 * scale / 2.1, 18 * scale / 2.1);
      ctx.clip();
      ctx.drawImage(faction.image, point.x + 2 * scale / 2.1, point.y + 3 * scale / 2.1, 19 * scale / 2.1, 18 * scale / 2.1);
      ctx.restore();
    }
  });
}

function drawProjectiles(viewport, projectiles) {
  projectiles.forEach((projectile) => {
    const current = getProjectilePoint(projectile, projectile.progress);
    const point = worldToScreen(current.x, current.y, viewport);
    if (projectile.kind === "arrow") {
      const next = getProjectilePoint(projectile, Math.min(1, projectile.progress + 0.02));
      const nextPoint = worldToScreen(next.x, next.y, viewport);
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#513018";
      ctx.lineWidth = Math.max(1.5, 2.4 * point.scale / 2.1);
      ctx.beginPath();
      ctx.moveTo(-8 * point.scale / 2.1, 0);
      ctx.lineTo(9 * point.scale / 2.1, 0);
      ctx.stroke();
      ctx.fillStyle = "#e8d4ad";
      ctx.beginPath();
      ctx.moveTo(9 * point.scale / 2.1, 0);
      ctx.lineTo(3 * point.scale / 2.1, -3 * point.scale / 2.1);
      ctx.lineTo(3 * point.scale / 2.1, 3 * point.scale / 2.1);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else {
      const gradient = ctx.createRadialGradient(point.x, point.y, 1, point.x, point.y, 10 * point.scale / 2.1);
      gradient.addColorStop(0, "#e0ffff");
      gradient.addColorStop(1, "#49bedd");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8 * point.scale / 2.1, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function getProjectilePoint(projectile, progress) {
  const x = lerp(projectile.startX, projectile.endX, progress);
  const yBase = lerp(projectile.startY, projectile.endY, progress);
  return { x, y: yBase - Math.sin(progress * Math.PI) * (projectile.kind === "arrow" ? 70 : 26) };
}
function drawStuckArrows(viewport, arrows) {
  arrows.forEach((arrow) => {
    const point = worldToScreen(arrow.x, arrow.y, viewport);
    ctx.save();
    ctx.globalAlpha = arrow.life / arrow.maxLife;
    ctx.translate(point.x, point.y + 2 * point.scale / 2.1);
    ctx.rotate(arrow.angle + 0.15);
    ctx.strokeStyle = "#4b2c17";
    ctx.lineWidth = Math.max(1.3, 2.2 * point.scale / 2.1);
    ctx.beginPath();
    ctx.moveTo(-7 * point.scale / 2.1, 0);
    ctx.lineTo(6 * point.scale / 2.1, 0);
    ctx.stroke();
    ctx.restore();
  });
}

function drawUnits(viewport, factions) {
  const units = factions.flatMap((faction) => faction.units.filter((unit) => !unit.dead && !unit.fled).map((unit) => ({ ...unit, factionColor: faction.color }))).sort((a, b) => a.y - b.y);
  units.forEach((unit) => {
    const point = worldToScreen(unit.x, unit.y, viewport);
    const scale = point.scale;
    const bodyY = point.y - unit.z * scale / 2.1;
    const main = unit.factionColor;
    const dark = shadeColor(main, -0.28);
    const light = shadeColor(main, 0.26);
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(point.x, point.y + 10 * scale / 2.1, 10 * scale / 2.1, 5 * scale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(point.x, bodyY);
    ctx.rotate(unit.facing * 0.15);
    ctx.scale(unit.displayFacingX, 1);
    if (unit.type === "archer") drawArcher(main, dark, light, scale);
    if (unit.type === "mage") drawMage(main, dark, light, scale);
    if (unit.type === "knight") drawKnight(main, dark, light, scale);
    ctx.restore();
    const hpWidth = unit.type === "knight" ? 30 : 20;
    ctx.fillStyle = "rgba(37,24,16,0.5)";
    ctx.fillRect(point.x - hpWidth * scale / 4.2, bodyY - 24 * scale / 2.1, hpWidth * scale / 2.1, 4 * scale / 2.1);
    ctx.fillStyle = unit.health / unit.maxHealth > 0.4 ? "#9ae085" : "#e7915d";
    ctx.fillRect(point.x - hpWidth * scale / 4.2, bodyY - 24 * scale / 2.1, hpWidth * scale / 2.1 * (unit.health / unit.maxHealth), 4 * scale / 2.1);
  });
}

function drawArcher(main, dark, light, scale) {
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -12 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -2 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 5.5 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.arc(10 * scale / 2.1, -1 * scale / 2.1, 8 * scale / 2.1, -1.2, 1.2);
  ctx.stroke();
}

function drawMage(main, dark, light, scale) {
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -14 * scale / 2.1);
  ctx.lineTo(11 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-11 * scale / 2.1, 10 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -15 * scale / 2.1, 5.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(15 * scale / 2.1, -16 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#c4f2ff";
  ctx.beginPath();
  ctx.arc(16 * scale / 2.1, -18 * scale / 2.1, 3.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
}

function drawKnight(main, dark, light, scale) {
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.ellipse(0, 1 * scale / 2.1, 11 * scale / 2.1, 14 * scale / 2.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -13 * scale / 2.1, 5.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2.4 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(9 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, -17 * scale / 2.1);
  ctx.stroke();
}

function drawSwipes(viewport, swipes) {
  swipes.forEach((swipe) => {
    const point = worldToScreen(swipe.x, swipe.y, viewport);
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(swipe.angle);
    ctx.globalAlpha = swipe.life / swipe.maxLife;
    ctx.strokeStyle = swipe.color;
    ctx.lineWidth = 7 * point.scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, 0, 18 * point.scale / 2.1, -0.8, 0.6);
    ctx.stroke();
    ctx.restore();
  });
}

function drawSpells(viewport, battle) {
  battle.spells.forEach((spell) => {
    const source = findUnitById(battle, spell.sourceId);
    const target = findUnitById(battle, spell.targetId);
    if (!source || !target) return;
    const start = worldToScreen(source.x, source.y - 18, viewport);
    const end = worldToScreen(target.x, target.y - target.z - 10, viewport);
    ctx.strokeStyle = "rgba(137, 225, 255, 0.8)";
    ctx.lineWidth = 3 * start.scale / 2.1;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });
}

function drawParticles(viewport, particles) {
  particles.forEach((particle) => {
    const point = worldToScreen(particle.x, particle.y, viewport);
    const alpha = 1 - particle.age / particle.life;
    ctx.fillStyle = hexToRgba(particle.color, alpha);
    ctx.beginPath();
    ctx.arc(point.x, point.y, particle.size * point.scale / 2.1 * alpha, 0, Math.PI * 2);
    ctx.fill();
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }
function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const num = Number.parseInt(value, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}
function shadeColor(hex, amount) {
  const value = hex.replace("#", "");
  const num = Number.parseInt(value, 16);
  const r = clamp(Math.round(((num >> 16) & 255) * (1 + amount)), 0, 255);
  const g = clamp(Math.round(((num >> 8) & 255) * (1 + amount)), 0, 255);
  const b = clamp(Math.round((num & 255) * (1 + amount)), 0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}
