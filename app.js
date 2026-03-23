
const STORAGE_KEY = "tbr-warfare-state-v1";
const TOURNAMENT_VIEW_STORAGE_KEY = "tbr-warfare-tournament-view-v1";
const FIELD = { width: 1180, height: 760 };
const SPEED_OPTIONS = [0.35, 0.65, 1, 1.4, 1.85];
const SHIFT_INSPECT_SPEED = 0.12;
const POST_BATTLE_REVIEW_SPEED = 0.5;
const AUDIO_DEFAULT_FADE_SECONDS = 1.8;
const AUDIO_END_FADE_SECONDS = 0.4;
const AUDIO_PAUSE_DUCK_FACTOR = 0.24;
const AUDIO_TRACKS = {
  main: {
    src: "assets/music/main_battle_music_loop.mp3",
    loop: true,
    volume: 0.42,
  },
  ambience: {
    src: "assets/music/combat_sound_ambience_loop.mp3",
    loop: true,
    volume: 0.26,
  },
  inklord: {
    src: "assets/music/inklord_cometh.mp3",
    loop: true,
    volume: 0.5,
  },
  deathBell: {
    src: "assets/music/death_bell.wav",
    loop: false,
    volume: 0.72,
  },
};
const BANNER_FLOAT_OFFSET = 76;
const MAX_BATTLE_FACTIONS = 10;
const MAX_TOURNAMENT_HEAT_FACTIONS = 32;
const MAX_BATTLEFIELD_UNIT_CAP = 5000;
const ROUTING_ESCAPE_DISTANCE = 150;
const WEATHER_RAIN_LIGHT_ASSET = "assets/WeatherFX/rain light.png";
const WEATHER_RAIN_HEAVY_ASSET = "assets/WeatherFX/rain heavy.png";
const INKLORD_DEBUG_DELAY = 60;
const HEALTH_CHART_SAMPLE_INTERVAL = 0.16;
const HEALTH_CHART_VISIBLE_SECONDS = 30;
const TOURNAMENT_VIEW_SYNC_INTERVAL_MS = 500;
const INKLORD_FACTION_ID = "neutral-inklord";
const INKLORD_FACTION_TITLE = "InkLord";
const INKLORD_COLOR = "#161418";
const INKLORD_TAUNTS = [
  "Perish, Inklings!",
  "I give you a 0/10 on my INDIE scale!",
  "Your ratings plummet with you!",
  "Back to the slush pile with you!",
  "I banish you from KDP!",
  "Be gone from my ink-stained realm!",
  "To the end of the TBR with ye!",
  "Your next publication shall be posthumous!",
  "Your words are as weak as your sales!",
  "You are but a footnote in my shadow!",
  "You're on my T.B.R.: To Be Removed!",
];
const DEFAULT_TOURNAMENT_CONFIG = Object.freeze({
  collapsed: true,
  minFactionsPerHeat: 2,
  maxFactionsPerHeat: MAX_BATTLE_FACTIONS,
  maxUnitsOnBattlefield: 0,
  paperbackOnly: false,
});
const DEFAULT_COMPOSITION = { archer: 1, mage: 1, knight: 1, paladin: 0, bodyguard: 0, medic: 0, bard: 0, bomber: 0, assassin: 0, mountainman: 0, catapult: 0, poisoner: 0, firebreather: 0, necromancer: 0, graverobber: 0, arachnomist: 0, krieger: 0, huntsman: 0, phantom: 0 };
const MAX_COMPOSITION_UNIT_TYPES = 5;
const UNIT_SPRITE_CANDIDATE_PATHS = [
  (unitId) => `assets/unit-sprites/${unitId}.png`,
  (unitId) => `assets/units/${unitId}.png`,
  (unitId) => `assets/${unitId}.png`,
  (unitId) => `output/unit-sprites/${unitId}.png`,
  (unitId) => `output/units/${unitId}.png`,
  (unitId) => `sprites/${unitId}.png`,
  (unitId) => `art/${unitId}.png`,
  (unitId) => `${unitId}.png`,
];
const STATUS_BADGE_CANDIDATE_PATHS = [
  (statusId) => `assets/status-badges/${statusId}.png`,
  (statusId) => `assets/status-icons/${statusId}.png`,
  (statusId) => `output/status-badges/${statusId}.png`,
  (statusId) => `output/status-icons/${statusId}.png`,
  (statusId) => `status-badges/${statusId}.png`,
  (statusId) => `status-icons/${statusId}.png`,
  (statusId) => `${statusId}-status.png`,
  (statusId) => `${statusId}.png`,
];
const GROUND_PROP_ASSET_BASE_URL = "assets/Props/";
const GRAVE_ASSET_BASE_URL = "assets/Props/graves/";
const GROUND_PROP_SCALE_OVERRIDES_FILE = "prop-scales.json";
const GROUND_PROP_FILENAME_DIGITS = 4;
const GROUND_PROP_MAX_SCAN_INDEX = 9999;
const GROUND_PROP_SCAN_MISS_LIMIT = 60;
const GROUND_PROP_IMAGE_SCALE = 0.12;
const GROUND_PROP_RANDOM_SCALE_MIN = 0.95;
const GROUND_PROP_RANDOM_SCALE_MAX = 1.05;
const GRAVE_RENDER_SCALE = 0.6;
const GROUND_PROP_PADDING_X = 70;
const GROUND_PROP_PADDING_Y = 82;
const GROUND_PROP_JITTER_MIN = 0.18;
const GROUND_PROP_JITTER_MAX = 0.82;
const GROUND_PROP_TINT_ALPHA = 0.36;
const UNIT_OVERLAP_SHADOW_TINT = "#020101";
const UNIT_OVERLAP_SHADOW_BASE_ALPHA = 0.22;
const UNIT_OVERLAP_SHADOW_ALPHA_STEP = 0.16;
const UNIT_OVERLAP_SHADOW_MAX_ALPHA = 0.62;
const UNIT_OVERLAP_SHADOW_RADIUS_X = 15;
const UNIT_OVERLAP_SHADOW_RADIUS_Y = 22;
const UNIT_OVERLAP_SHADOW_NEIGHBOR_LIMIT = 8;
const GROUND_TEXTURE_SOURCES = {
  dirt: "assets/textures/dirt.png",
  grass: "assets/textures/grass.png",
  sand: "assets/textures/sand.png",
  stone: "assets/textures/stone.png",
};
const TERRAIN_TEXTURE_RESOLUTION_SCALE = 3;
const GROUND_TEXTURE_PROFILE_PRESETS = {
  meadow: {
    weights: { grass: 6, dirt: 3, stone: 1, sand: 1 },
    patchLayers: [
      { count: [3, 5], radiusX: [180, 340], radiusY: [120, 240], harmonics: [[240, 340, 0.14], [120, 210, 0.1], [56, 110, 0.06]] },
      { count: [6, 10], radiusX: [90, 190], radiusY: [55, 125], harmonics: [[100, 170, 0.11], [42, 88, 0.07]] },
      { count: [16, 28], radiusX: [24, 62], radiusY: [14, 34], harmonics: [[26, 48, 0.06], [14, 24, 0.04]] },
    ],
    feather: [0.26, 0.4],
    baseLayer: { tileSize: [125, 190], alpha: [0.11, 0.17], jitter: [0.08, 0.18], contrast: [0.9, 1.2], brightness: [0.84, 1.08], rotation: [-0.08, 0.08] },
    softLightAlpha: 0.5,
    multiplyAlpha: 0.18,
  },
  wetland: {
    weights: { grass: 4, dirt: 4, stone: 2, sand: 1 },
    patchLayers: [
      { count: [4, 7], radiusX: [170, 320], radiusY: [130, 230], harmonics: [[220, 330, 0.15], [110, 190, 0.11], [48, 92, 0.06]] },
      { count: [10, 15], radiusX: [70, 160], radiusY: [45, 110], harmonics: [[86, 150, 0.12], [32, 64, 0.08]] },
      { count: [18, 34], radiusX: [16, 48], radiusY: [12, 28], harmonics: [[18, 34, 0.06], [10, 18, 0.04]] },
    ],
    feather: [0.3, 0.45],
    baseLayer: { tileSize: [118, 176], alpha: [0.12, 0.18], jitter: [0.1, 0.22], contrast: [0.88, 1.18], brightness: [0.8, 1.04], rotation: [-0.1, 0.1] },
    softLightAlpha: 0.46,
    multiplyAlpha: 0.22,
  },
  dunes: {
    weights: { sand: 7, stone: 2, dirt: 2, grass: 1 },
    patchLayers: [
      { count: [3, 6], radiusX: [220, 380], radiusY: [110, 210], harmonics: [[250, 360, 0.16], [130, 220, 0.12], [70, 120, 0.07]] },
      { count: [7, 11], radiusX: [100, 220], radiusY: [48, 102], harmonics: [[115, 180, 0.12], [46, 86, 0.07]] },
      { count: [18, 28], radiusX: [20, 58], radiusY: [10, 28], harmonics: [[24, 42, 0.05], [12, 20, 0.035]] },
    ],
    feather: [0.24, 0.36],
    baseLayer: { tileSize: [132, 208], alpha: [0.1, 0.15], jitter: [0.06, 0.15], contrast: [0.94, 1.14], brightness: [0.9, 1.12], rotation: [-0.06, 0.06] },
    softLightAlpha: 0.42,
    multiplyAlpha: 0.14,
  },
  rocky: {
    weights: { stone: 6, dirt: 3, sand: 2, grass: 1 },
    patchLayers: [
      { count: [4, 6], radiusX: [160, 300], radiusY: [100, 190], harmonics: [[210, 300, 0.15], [92, 150, 0.11], [38, 74, 0.07]] },
      { count: [10, 16], radiusX: [60, 130], radiusY: [36, 88], harmonics: [[70, 120, 0.12], [24, 50, 0.09]] },
      { count: [24, 40], radiusX: [12, 34], radiusY: [10, 24], harmonics: [[12, 24, 0.08], [7, 14, 0.05]] },
    ],
    feather: [0.28, 0.44],
    baseLayer: { tileSize: [120, 174], alpha: [0.12, 0.2], jitter: [0.08, 0.16], contrast: [0.96, 1.28], brightness: [0.76, 1], rotation: [-0.12, 0.12] },
    softLightAlpha: 0.38,
    multiplyAlpha: 0.26,
  },
  moor: {
    weights: { grass: 3, stone: 3, dirt: 4, sand: 1 },
    patchLayers: [
      { count: [4, 7], radiusX: [170, 310], radiusY: [110, 220], harmonics: [[200, 310, 0.14], [96, 170, 0.1], [42, 82, 0.06]] },
      { count: [8, 14], radiusX: [76, 170], radiusY: [42, 110], harmonics: [[82, 146, 0.11], [28, 60, 0.075]] },
      { count: [20, 34], radiusX: [18, 46], radiusY: [12, 28], harmonics: [[18, 34, 0.06], [9, 18, 0.04]] },
    ],
    feather: [0.32, 0.48],
    baseLayer: { tileSize: [112, 168], alpha: [0.12, 0.19], jitter: [0.1, 0.24], contrast: [0.9, 1.16], brightness: [0.76, 0.98], rotation: [-0.1, 0.1] },
    softLightAlpha: 0.44,
    multiplyAlpha: 0.2,
  },
};
const ARENA_TEXTURE_PROFILE_OVERRIDES = {
  "Sunlit Vale": { feather: [0.24, 0.36], baseLayer: { tileSize: [132, 186], alpha: [0.1, 0.15], jitter: [0.08, 0.16] } },
  "Moss March": { feather: [0.34, 0.5], baseLayer: { tileSize: [104, 150], alpha: [0.14, 0.2], jitter: [0.14, 0.26], brightness: [0.76, 1] } },
  "Copper Plain": { feather: [0.26, 0.4], baseLayer: { tileSize: [118, 166], alpha: [0.12, 0.18], contrast: [0.98, 1.3], brightness: [0.8, 1.02] } },
  "Blue Fen": { feather: [0.32, 0.48], baseLayer: { tileSize: [110, 158], alpha: [0.13, 0.19], jitter: [0.12, 0.24], brightness: [0.78, 1.02] } },
  "Rose Dunes": { feather: [0.22, 0.32], baseLayer: { tileSize: [146, 218], alpha: [0.09, 0.13], rotation: [-0.04, 0.04] } },
  "Jade Steppe": { feather: [0.24, 0.38], baseLayer: { tileSize: [136, 194], alpha: [0.1, 0.16], jitter: [0.06, 0.14] } },
  "Violet Moor": { feather: [0.34, 0.52], baseLayer: { tileSize: [104, 154], alpha: [0.14, 0.22], contrast: [0.88, 1.12], brightness: [0.72, 0.94] } },
  "Ashen Reach": { feather: [0.3, 0.46], baseLayer: { tileSize: [112, 160], alpha: [0.14, 0.22], contrast: [1, 1.32], brightness: [0.74, 0.96] } },
  "Auric Flats": { feather: [0.2, 0.3], baseLayer: { tileSize: [150, 224], alpha: [0.08, 0.12], brightness: [0.94, 1.14] } },
  "Nightglass Basin": { feather: [0.32, 0.5], baseLayer: { tileSize: [100, 148], alpha: [0.16, 0.24], contrast: [1.04, 1.36], brightness: [0.68, 0.9] } },
  "Cinder Scar": { feather: [0.3, 0.46], baseLayer: { tileSize: [108, 152], alpha: [0.15, 0.23], contrast: [1.02, 1.34], brightness: [0.72, 0.94] } },
  "Thornwild Verge": { feather: [0.28, 0.42], baseLayer: { tileSize: [124, 176], alpha: [0.12, 0.18], jitter: [0.1, 0.2], brightness: [0.8, 1.04] } },
  "Ivory Saltpan": { feather: [0.18, 0.28], baseLayer: { tileSize: [154, 232], alpha: [0.07, 0.11], contrast: [0.96, 1.1], brightness: [0.98, 1.18] } },
  "Saffron Breakers": { feather: [0.22, 0.34], baseLayer: { tileSize: [142, 210], alpha: [0.09, 0.14], jitter: [0.08, 0.16], brightness: [0.92, 1.12] } },
  "Moonroot Hollow": { feather: [0.36, 0.52], baseLayer: { tileSize: [102, 146], alpha: [0.15, 0.22], jitter: [0.14, 0.28], brightness: [0.74, 0.98] } },
  "Stormglass Shelf": { feather: [0.36, 0.56], baseLayer: { tileSize: [96, 136], alpha: [0.16, 0.25], jitter: [0.12, 0.22], contrast: [1.04, 1.4], brightness: [0.7, 0.92], rotation: [-0.14, 0.14] } },
};
const ARENA_TEXTURE_PROFILE_BY_NAME = {
  "Sunlit Vale": "meadow",
  "Moss March": "wetland",
  "Copper Plain": "rocky",
  "Blue Fen": "wetland",
  "Rose Dunes": "dunes",
  "Jade Steppe": "meadow",
  "Violet Moor": "moor",
  "Ashen Reach": "rocky",
  "Auric Flats": "dunes",
  "Nightglass Basin": "rocky",
  "Cinder Scar": "rocky",
  "Thornwild Verge": "meadow",
  "Ivory Saltpan": "dunes",
  "Saffron Breakers": "dunes",
  "Moonroot Hollow": "wetland",
  "Stormglass Shelf": "rocky",
};
const UNIT_RIG_CANDIDATE_PATHS = [
  (unitId) => `assets/unit-rigs/${unitId}.json`,
  (unitId) => `output/unit-rigs/${unitId}.json`,
  (unitId) => `assets/unit-sprites/${unitId}.json`,
  (unitId) => `output/unit-sprites/${unitId}.json`,
  (unitId) => `sprites/${unitId}.json`,
  (unitId) => `art/${unitId}.json`,
  (unitId) => `${unitId}.json`,
];
const RIG_PART_ORDER = ["legBackThigh", "legBackShin", "armBack", "body", "head", "legFrontThigh", "legFrontShin", "armFront", "weapon"];
const RIG_PART_DEFINITIONS = [
  { id: "body", label: "Body", optional: false, color: "#ffd483", parentId: null },
  { id: "head", label: "Head", optional: false, color: "#f7cdb0", parentId: "body" },
  { id: "armFront", label: "Front Arm", optional: false, color: "#9fe1a7", parentId: "body" },
  { id: "armBack", label: "Back Arm", optional: true, color: "#7cc6db", parentId: "body" },
  { id: "legFrontThigh", label: "Front Thigh", optional: false, color: "#e7915d", parentId: "body", legacyId: "legFront" },
  { id: "legFrontShin", label: "Front Shin / Foot", optional: false, color: "#f0b084", parentId: "legFrontThigh" },
  { id: "legBackThigh", label: "Back Thigh", optional: true, color: "#d98cff", parentId: "body", legacyId: "legBack" },
  { id: "legBackShin", label: "Back Shin / Foot", optional: true, color: "#c7a2ff", parentId: "legBackThigh" },
  { id: "weapon", label: "Weapon", optional: true, color: "#f1efb0", parentId: "body" },
];
const RIG_PART_IDS = RIG_PART_DEFINITIONS.map((part) => part.id);
const RIG_PART_DEFINITION_BY_ID = Object.fromEntries(RIG_PART_DEFINITIONS.map((part) => [part.id, part]));
const DEFAULT_RIG_LAYOUT = { height: 60, anchorX: 0.5, anchorY: 0.88, healthBarOffsetX: 0, healthBarOffsetY: 0 };
const RIG_EDITOR_CANVAS_SIZE = 640;
const RIG_WORKSHOP_FILE_EXTENSION = ".tbr-sprite-rig.json";
const RIG_WORKSHOP_SOURCE_DIR = ".sprite-rig-sources";
const RIG_ANIMATION_CLIP_DEFINITIONS = [
  { id: "idle", label: "Idle", loop: true, speed: 1 },
  { id: "walk", label: "Walk", loop: true, speed: 1 },
  { id: "attack", label: "Attack", loop: false, speed: 1 },
];
const RIG_ANIMATION_FIELD_DEFINITIONS = {
  idle: [
    { path: "rotation.idle", label: "Idle Rotation", step: 0.1 },
    { path: "x.idle", label: "Idle X", step: 0.01 },
    { path: "y.idle", label: "Idle Y", step: 0.01 },
    { path: "scaleX.idle", label: "Idle Scale X", step: 0.01 },
    { path: "scaleY.idle", label: "Idle Scale Y", step: 0.01 },
  ],
  walk: [
    { path: "rotation.stride", label: "Stride Rotation", step: 0.1 },
    { path: "rotation.bob", label: "Bob Rotation", step: 0.1 },
    { path: "x.stride", label: "Stride X", step: 0.01 },
    { path: "x.bob", label: "Bob X", step: 0.01 },
    { path: "y.stride", label: "Stride Y", step: 0.01 },
    { path: "y.bob", label: "Bob Y", step: 0.01 },
    { path: "scaleX.stride", label: "Stride Scale X", step: 0.01 },
    { path: "scaleY.stride", label: "Stride Scale Y", step: 0.01 },
  ],
  attack: [
    { path: "rotation.attack", label: "Attack Rotation", step: 0.1 },
    { path: "x.attack", label: "Attack X", step: 0.01 },
    { path: "y.attack", label: "Attack Y", step: 0.01 },
    { path: "scaleX.attack", label: "Attack Scale X", step: 0.01 },
    { path: "scaleY.attack", label: "Attack Scale Y", step: 0.01 },
  ],
};
const UNIT_SPRITE_LAYOUTS = {
  archer: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  mage: { height: 39, anchorX: 0.5, anchorY: 0.88 },
  knight: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  paladin: { height: 43, anchorX: 0.5, anchorY: 0.88 },
  bodyguard: { height: 43, anchorX: 0.5, anchorY: 0.88 },
  medic: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  bard: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  bomber: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  assassin: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  mountainman: { height: 41, anchorX: 0.5, anchorY: 0.88 },
  catapult: { height: 48, anchorX: 0.5, anchorY: 0.9 },
  poisoner: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  firebreather: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  necromancer: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  graverobber: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  arachnomist: { height: 41, anchorX: 0.5, anchorY: 0.88 },
  krieger: { height: 60, anchorX: 0.5, anchorY: 0.92 },
  huntsman: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  phantom: { height: 44, anchorX: 0.5, anchorY: 0.88 },
  spiderswarm: { height: 26, anchorX: 0.5, anchorY: 0.92 },
};
const UNIT_SPRITE_TINT_ALPHA = 0.28;
const VETERAN_BONUSES = {
  spriteScale: 1.2,
  maxHealth: 1.2,
  power: 1.2,
  radius: 1.1,
  speed: 1.1,
  cooldown: 0.9,
  duration: 1.1,
};
const ZOMBIE_PENALTIES = {
  maxHealth: 0.72,
  power: 0.76,
  radius: 0.9,
  speed: 0.78,
  cooldown: 1.24,
  duration: 0.9,
};
const THRALL_LEASH_DISTANCE = 94;
const THRALL_TUG_START_DISTANCE = 56;
const THRALL_TUG_FACTOR = 0.14;
const GRAVE_VARIANTS = [
  { id: "headstone-round", kind: "grave", bodyPath: "M -8 10 L -8 -2 C -8 -10 8 -10 8 -2 L 8 10 Z", accentPath: "M -5 -1 L 5 -1 L 5 2 L -5 2 Z" },
  { id: "headstone-slab", kind: "grave", bodyPath: "M -7 10 L -7 -7 L 7 -7 L 7 10 Z", accentPath: "M -4 -3 L 4 -3 L 4 0 L -4 0 Z" },
  { id: "cross-stone", kind: "grave", bodyPath: "M -3 10 L -3 1 L -8 1 L -8 -3 L -3 -3 L -3 -10 L 3 -10 L 3 -3 L 8 -3 L 8 1 L 3 1 L 3 10 Z", accentPath: "M -2 4 L 2 4 L 2 8 L -2 8 Z" },
  { id: "grave-marker", kind: "grave", bodyPath: "M -6 10 L -8 -4 L 0 -10 L 8 -4 L 6 10 Z", accentPath: "M -3 -1 L 3 -1 L 3 2 L -3 2 Z" },
  { id: "bones", kind: "remains", bodyPath: "M -10 2 C -8 -1 -5 -1 -3 2 C -1 5 1 5 3 2 C 5 -1 8 -1 10 2 L 8 4 C 6 2 4 2 2 5 C 0 8 -2 8 -4 5 C -6 2 -8 2 -10 4 Z", accentPath: "M -2 -5 C -2 -8 2 -8 2 -5 C 2 -2 -2 -2 -2 -5 Z" },
  { id: "skull-bones", kind: "remains", bodyPath: "M -9 7 L -4 2 L -7 -1 L -4 -4 L 0 0 L 4 -4 L 7 -1 L 4 2 L 9 7 L 6 10 L 0 4 L -6 10 Z", accentPath: "M -5 -7 C -5 -11 5 -11 5 -7 L 5 -2 C 5 1 -5 1 -5 -2 Z" },
];
const STATUS_DEFINITIONS = {
  poison: {
    kind: "poison",
    name: "Poisoned",
    negative: true,
    stackable: true,
    defaultDuration: 9,
    tickInterval: 0.5,
    dps: 3.2,
    badgeColor: "#64d477",
    accentColor: "#d8ffd8",
  },
  ignite: {
    kind: "ignite",
    name: "Ignited",
    negative: true,
    stackable: false,
    defaultDuration: 3.6,
    tickInterval: 0.4,
    dps: 8.5,
    contagionRadius: 42,
    contagionInterval: 0.55,
    badgeColor: "#ff9b54",
    accentColor: "#ffe0a8",
  },
  zombie: {
    kind: "zombie",
    name: "Zombie",
    negative: true,
    cleansable: false,
    stackable: false,
    defaultDuration: Infinity,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#7a8f5e",
    accentColor: "#dce8c5",
  },
  shielded: {
    kind: "shielded",
    name: "Shielded",
    negative: false,
    stackable: false,
    defaultDuration: 0.3,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#78bfd6",
    accentColor: "#def7ff",
  },
  bardichaste: {
    kind: "bardichaste",
    name: "Marching Song",
    negative: false,
    stackable: false,
    defaultDuration: 0.35,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#6ec8ff",
    accentColor: "#e2f5ff",
  },
  bardicvalor: {
    kind: "bardicvalor",
    name: "War Anthem",
    negative: false,
    stackable: false,
    defaultDuration: 0.35,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#ffb35b",
    accentColor: "#ffe5bd",
  },
  bardicguard: {
    kind: "bardicguard",
    name: "Ballad of Guarding",
    negative: false,
    stackable: false,
    defaultDuration: 0.35,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#d98cff",
    accentColor: "#f3ddff",
  },
  bloodfrenzy: {
    kind: "bloodfrenzy",
    name: "Blood Frenzy",
    negative: true,
    stackable: false,
    defaultDuration: 10,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#d76767",
    accentColor: "#ffe0db",
  },
  immobilized: {
    kind: "immobilized",
    name: "Immobilized",
    negative: true,
    stackable: false,
    defaultDuration: 6,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#85bed7",
    accentColor: "#e4f8ff",
  },
  bleed: {
    kind: "bleed",
    name: "Bleeding",
    negative: true,
    stackable: true,
    defaultDuration: Infinity,
    tickInterval: 1,
    dps: 1,
    badgeColor: "#b95a63",
    accentColor: "#ffd7dc",
  },
  possessed: {
    kind: "possessed",
    name: "Possessed",
    negative: true,
    cleansable: false,
    stackable: false,
    defaultDuration: Infinity,
    tickInterval: 1,
    dps: 0,
    badgeColor: "#9f87ff",
    accentColor: "#efe8ff",
  },
};
const DEFAULT_PROP_WEIGHTS = {
  stones: 5,
  crate: 4,
  stakes: 3,
  cart: 2,
  ruin: 2,
  camp: 2,
  obelisk: 1,
  brazier: 1,
  reeds: 2,
  bones: 1,
  mushrooms: 1,
  signpost: 1,
};
const ARENA_THEMES = [
  createArenaTheme("Sunlit Vale", "#90b370", "#45643a", "rgba(255,225,163,0.45)", "#213018", { camp: 5, cart: 4, stakes: 4, stones: 3, reeds: 1, obelisk: 1 }, { signpost: 3, brazier: 1 }),
  createArenaTheme("Moss March", "#7ea07c", "#395d45", "rgba(179,226,205,0.32)", "#1b3428", { reeds: 6, stones: 4, mushrooms: 4, bones: 2, camp: 2 }, { obelisk: 2, brazier: 1 }),
  createArenaTheme("Copper Plain", "#a08d68", "#6b5a3e", "rgba(255,212,163,0.32)", "#31271c", { cart: 5, crate: 5, stakes: 3, bones: 2, signpost: 2 }, { obelisk: 2, mushrooms: 1 }),
  createArenaTheme("Blue Fen", "#7ba1a8", "#3b5661", "rgba(175,223,255,0.28)", "#1b2830", { reeds: 6, stones: 4, bones: 2, brazier: 1, mushrooms: 2 }, { obelisk: 2, cart: 1 }),
  createArenaTheme("Rose Dunes", "#c39886", "#8f5e50", "rgba(255, 206, 182, 0.32)", "#4b2d27", { bones: 4, signpost: 4, crate: 3, obelisk: 3, stones: 2 }, { reeds: 1, mushrooms: 1 }),
  createArenaTheme("Jade Steppe", "#7fb89a", "#2f6a59", "rgba(184, 255, 217, 0.28)", "#17392f", { camp: 5, stakes: 4, reeds: 4, signpost: 2, stones: 2 }, { obelisk: 2, bones: 1 }),
  createArenaTheme("Violet Moor", "#84739f", "#44395e", "rgba(210, 194, 255, 0.24)", "#241c36", { mushrooms: 6, obelisk: 4, stones: 3, bones: 2, brazier: 1 }, { cart: 1, signpost: 1 }),
  createArenaTheme("Ashen Reach", "#98948b", "#575349", "rgba(255, 222, 188, 0.18)", "#2e2a24", { bones: 5, brazier: 4, ruin: 4, obelisk: 2, stones: 2 }, { reeds: 1, mushrooms: 1 }),
  createArenaTheme("Auric Flats", "#cab16b", "#8b6f32", "rgba(255, 238, 172, 0.36)", "#463816", { crate: 5, cart: 4, signpost: 3, brazier: 2, stakes: 2 }, { reeds: 1, mushrooms: 1 }),
  createArenaTheme("Nightglass Basin", "#4f6b82", "#223645", "rgba(164, 229, 255, 0.2)", "#12202a", { obelisk: 5, stones: 4, reeds: 3, bones: 2, brazier: 1 }, { cart: 1, camp: 1 }),
  createArenaTheme("Cinder Scar", "#b08a77", "#673f2d", "rgba(255, 184, 132, 0.28)", "#351d14", { brazier: 6, bones: 4, ruin: 3, obelisk: 3, stones: 2 }, { reeds: 1, mushrooms: 1 }),
  createArenaTheme("Thornwild Verge", "#85a65f", "#3f4f22", "rgba(221, 255, 165, 0.22)", "#202a10", { stakes: 5, mushrooms: 5, camp: 3, signpost: 2, bones: 2 }, { cart: 1, brazier: 1 }),
  createArenaTheme("Ivory Saltpan", "#d0c9bb", "#8a8372", "rgba(255, 247, 225, 0.24)", "#514c42", { bones: 5, obelisk: 4, stones: 4, signpost: 2 }, { reeds: 1, mushrooms: 1, camp: 1 }),
  createArenaTheme("Saffron Breakers", "#d8aa5d", "#8c5b24", "rgba(255, 224, 137, 0.3)", "#4c2e12", { crate: 4, cart: 4, signpost: 3, camp: 2, brazier: 2 }, { obelisk: 1, reeds: 1 }),
  createArenaTheme("Moonroot Hollow", "#718b6f", "#2f4130", "rgba(205, 239, 205, 0.2)", "#182219", { mushrooms: 6, reeds: 4, stones: 3, bones: 2, camp: 2 }, { brazier: 1, cart: 1 }),
  createArenaTheme("Stormglass Shelf", "#69889c", "#32495c", "rgba(180, 224, 255, 0.24)", "#162634", { obelisk: 4, signpost: 3, stones: 3, bones: 2, brazier: 2 }, { mushrooms: 1, reeds: 1 }),
];
const WEATHER_OPTIONS = ["clear", "mist", "drizzle", "embers", "downpour", "ashfall", "fireflies", "snowfall"];
const UNIT_DEFINITIONS = {
  archer: {
    id: "archer",
    name: "Archer",
    keywords: ["bow", "ranged", "arrow"],
    description: "Archers are the army's patient skirmishers, trading durability for reach and steady damage. They stay behind the line, loose arrows from a safe distance, and excel when tougher allies buy them time to keep firing.",
    stats: { maxHealth: 58, speed: 48, range: 210, damage: 14, cooldown: 1.65 },
    healthBarWidth: 20,
    iconPaths: getArcherIconSvgPaths,
    getDesiredDestination: getRetreatingDestination(120, 1),
    performAttack: performArcherAttack,
    render: drawArcher,
    veteran: { metric: "damage", threshold: 180, label: "Deal 180 damage" },
  },
  mage: {
    id: "mage",
    name: "Mage",
    keywords: ["magic", "orb", "beam", "wizard"],
    description: "Mages fight like battlefield controllers rather than simple artillery. Their attacks can reach beyond normal spell range to abduct targets, letting them disrupt enemy positioning and punish units that thought they were safe.",
    stats: { maxHealth: 52, speed: 44, range: 180, abductRange: 310, damage: 16, cooldown: 2.05 },
    healthBarWidth: 20,
    iconPaths: getMageIconSvgPaths,
    getAttackRange: (unitDef, unit) => {
      const stats = getUnitStats(unit, unitDef);
      return Math.max(stats.range, stats.abductRange);
    },
    getDesiredDestination: getRetreatingDestination(110, 0.85),
    performAttack: performMageAttack,
    render: drawMage,
    veteran: { metric: "damage", threshold: 150, label: "Deal 150 damage" },
  },
  knight: {
    id: "knight",
    name: "Knight",
    keywords: ["melee", "sword", "tank"],
    description: "Knights are the anvil of most formations: slow, durable, and brutally efficient once they make contact. Their high health and heavy melee hits let them absorb pressure while opening space for fragile ranged units behind them.",
    routingImmune: true,
    stats: { maxHealth: 210, speed: 28, range: 26, damage: 38, cooldown: 1.05 },
    healthBarWidth: 30,
    iconPaths: getKnightIconSvgPaths,
    getMoveSpeed: (unit, unitDef) => getUnitStats(unit, unitDef).speed,
    performAttack: performKnightAttack,
    render: drawKnight,
    veteran: { metric: "kills", threshold: 4, label: "Score 4 kills" },
  },
  paladin: {
    id: "paladin",
    name: "Paladin",
    keywords: ["holy", "melee", "undead", "thrall", "cleanse", "heal", "templar"],
    description: "Paladins are steadfast holy warriors who excel at purging corrupted foes. Their melee strikes punish undead and thralls especially hard, and every kill releases a sanctifying burst that cleanses poison and restores a little health to nearby allies.",
    stats: { maxHealth: 172, speed: 30, range: 24, damage: 31, cooldown: 1.12, undeadBonus: 1.75, consecrationRadius: 30, consecrationHeal: 10 },
    healthBarWidth: 28,
    iconPaths: getPaladinIconSvgPaths,
    getMoveSpeed: (unit, unitDef) => getUnitStats(unit, unitDef).speed,
    performAttack: performPaladinAttack,
    render: drawPaladin,
    veteran: { metric: "kills", threshold: 4, label: "Score 4 kills" },
  },
  bodyguard: {
    id: "bodyguard",
    name: "Bodyguard",
    keywords: ["tank", "shield", "guard", "protector", "melee", "aura"],
    description: "Bodyguards are slow defensive anchors who hold the army together. They project a shielding aura around themselves, drift toward the banner-centroid when idle, and only peel off to brawl with enemies that stray into their aggro circle.",
    stats: { maxHealth: 188, speed: 24, range: 24, damage: 24, cooldown: 1.28, auraRadius: 96, aggroRadius: 132, shieldReduction: 0.25 },
    healthBarWidth: 28,
    iconPaths: getBodyguardIconSvgPaths,
    getMoveSpeed: (unit, unitDef) => getUnitStats(unit, unitDef).speed,
    selectTarget: selectBodyguardTarget,
    getDesiredDestination: getBodyguardDestination,
    performAttack: performBodyguardAttack,
    render: drawBodyguard,
    veteran: { metric: "kills", threshold: 3, label: "Score 3 kills" },
  },
  medic: {
    id: "medic",
    name: "Medic",
    keywords: ["heal", "support", "frail"],
    description: "Medics contribute no direct offense, but they can swing long fights by repeatedly restoring allies on the front line. They are fragile and need protection, yet a well-screened medic can make an entire formation much harder to grind down.",
    stats: { maxHealth: 36, speed: 56, range: 16, heal: 18, cooldown: 1.9 },
    healthBarWidth: 20,
    iconPaths: getMedicIconSvgPaths,
    canActWithoutEnemies: true,
    selectTarget: selectMedicTarget,
    getDesiredDestination: getHoldPositionDestination(12),
    performAttack: performMedicHeal,
    render: drawMedic,
    veteran: { metric: "healing", threshold: 180, label: "Heal 180 health" },
  },
  bard: {
    id: "bard",
    name: "Bard",
    keywords: ["music", "song", "support", "aura", "minstrel", "buff"],
    description: "Bards are battlefield conductors. They drift behind the line and keep nearby allies under one of several songs, swapping between pace, valor, and guarding refrains depending on how the fight is unfolding.",
    stats: { maxHealth: 58, speed: 34, range: 0, auraRadius: 108, marchSpeedBonus: 1.24, marchCooldownBonus: 0.82, valorPowerBonus: 1.18, valorRangeBonus: 1.05, guardReduction: 0.18, songDuration: 4.8 },
    healthBarWidth: 20,
    iconPaths: getBardIconSvgPaths,
    canActWithoutEnemies: true,
    beforeStep: updateBardState,
    selectTarget: selectBardTarget,
    getDesiredDestination: getBardDestination,
    render: drawBard,
    veteran: null,
  },
  bomber: {
    id: "bomber",
    name: "Bomber",
    keywords: ["explosive", "grenade", "suicide"],
    description: "Bombers are volatile area-denial specialists built around explosive splash damage. They threaten clustered enemies from range, and even their deaths are dangerous thanks to a larger final blast that punishes anyone crowding them.",
    stats: { maxHealth: 62, speed: 40, range: 255, damage: 50, splash: 62, deathSplash: 86, cooldown: 2.3, fuse: 1.6 },
    healthBarWidth: 20,
    iconPaths: getBomberIconSvgPaths,
    selectTarget: selectBomberTarget,
    getDesiredDestination: getRetreatingDestination(150, 1.15),
    performAttack: performBomberAttack,
    onDeath: handleBomberDeath,
    render: drawBomber,
    veteran: { metric: "damage", threshold: 140, label: "Deal 140 damage" },
  },
  assassin: {
    id: "assassin",
    name: "Assassin",
    keywords: ["stealth", "rogue", "backstab", "dagger"],
    description: "Assassins are burst killers that rely on stealth, speed, and precision instead of endurance. They slip through openings, vanish from enemy targeting, and can erase vulnerable backliners with devastating backstab damage before resetting for another strike.",
    stats: { maxHealth: 44, speed: 66, range: 18, backstabDamage: 126, slashDamage: 21, cooldown: 1.2, resetRadius: 34 },
    healthBarWidth: 18,
    iconPaths: getAssassinIconSvgPaths,
    canActWithoutEnemies: true,
    beforeStep: updateAssassinState,
    selectTarget: selectAssassinTarget,
    getDesiredDestination: getAssassinDestination,
    getAttackRange: getAssassinAttackRange,
    performAttack: performAssassinAttack,
    afterMove: handleAssassinAfterMove,
    isTargetable: ({ unit, attacker }) => !(unit.invisible && attacker && areUnitsHostile(attacker, unit, state.battle)),
    getRenderAlpha: (unit) => (unit.invisible ? 0.42 : 0.92),
    render: drawAssassin,
    veteran: { metric: "kills", threshold: 3, label: "Score 3 kills" },
  },
  mountainman: {
    id: "mountainman",
    name: "Men of the Mountain",
    keywords: ["wizard", "mountain", "mountainmen", "men of the mountain", "impulse", "restrain", "green robe"],
    description: "The Men of the Mountain mix spell damage with positional control. Their impulse can shove enemies out of formation, while their holding magic restrains targets in place and slowly wears them down for the rest of the army to finish.",
    stats: { maxHealth: 94, speed: 34, range: 105, impulseRange: 105, impulseDamage: 24, impulseDistance: 124, holdRange: 94, holdDuration: 2.9, holdTick: 0.45, holdDamage: 3.2, cooldown: 2.7 },
    healthBarWidth: 22,
    iconPaths: getMountainManIconSvgPaths,
    selectTarget: selectMountainTarget,
    getAttackRange: getMountainAttackRange,
    getMoveSpeed: (unit, unitDef) => (unit.activeSpellId ? 0 : getUnitStats(unit, unitDef).speed),
    getDesiredDestination: getRetreatingDestination(72, 0.88),
    performAttack: performMountainAttack,
    render: drawMountainMan,
    veteran: { metric: "damage", threshold: 125, label: "Deal 125 damage" },
  },
  catapult: {
    id: "catapult",
    name: "Catapult",
    keywords: ["siege", "stone", "artillery", "boulder"],
    description: "Catapults are siege engines with the longest reach in the roster. They fire slowly and are vulnerable if pressured, but their arcing stones can hammer enemy groups from extreme range and force the battle to revolve around protecting or diving them.",
    stats: { maxHealth: 35, speed: 10, range: 370, damage: 34, splash: 20, cooldown: 6, variance: 60 },
    healthBarWidth: 26,
    iconPaths: getCatapultIconSvgPaths,
    selectTarget: selectCatapultTarget,
    getAttackRange: getCatapultAttackRange,
    getDesiredDestination: getRetreatingDestination(238, 1.18),
    shouldSlowForAttack: () => false,
    performAttack: performCatapultAttack,
    render: drawCatapult,
    veteran: { metric: "damage", threshold: 160, label: "Deal 160 damage" },
  },
  poisoner: {
    id: "poisoner",
    name: "Poisoner",
    keywords: ["venom", "poison", "potion", "toxin", "alchemist"],
    description: "Poisoners specialize in attrition. Their bottles do modest immediate damage, but the real threat is stacking poison over an area, causing enemies to keep losing health after the initial impact and making sustained engagements increasingly costly.",
    stats: { maxHealth: 50, speed: 42, range: 225, damage: 8, splash: 46, poisonStacks: 1, poisonDuration: 9, poisonDamage: 3.2, cooldown: 2.4 },
    healthBarWidth: 20,
    iconPaths: getPoisonerIconSvgPaths,
    getDesiredDestination: getRetreatingDestination(132, 1.05),
    performAttack: performPoisonerAttack,
    render: drawPoisoner,
    veteran: { metric: "damage", threshold: 125, label: "Deal 125 damage" },
  },
  firebreather: {
    id: "firebreather",
    name: "Firebreather",
    keywords: ["fire", "flame", "breath", "burn", "dragonfire"],
    description: "Firebreathers excel at close-range area pressure. Their flame cone can catch multiple enemies at once, ignite survivors for follow-up burn damage, and even spread fire through packed formations if opponents let the blaze jump between targets.",
    stats: { maxHealth: 76, speed: 46, range: 118, damage: 22, coneAngle: 0.85, breathDuration: 1.05, ignitionExposure: 0.95, exposureGrace: 0.18, igniteStacks: 1, igniteDuration: 3.6, igniteDamage: 8.5, contagionRadius: 42, cooldown: 1.85 },
    healthBarWidth: 22,
    iconPaths: getFirebreatherIconSvgPaths,
    getDesiredDestination: getFirebreatherDestination,
    getMoveSpeed: (unit, unitDef) => (unit.activeSpellId ? getUnitStats(unit, unitDef).speed * 0.35 : getUnitStats(unit, unitDef).speed),
    performAttack: performFirebreatherAttack,
    render: drawFirebreather,
    veteran: { metric: "damage", threshold: 150, label: "Deal 150 damage" },
  },
  necromancer: {
    id: "necromancer",
    name: "Necromancer",
    keywords: ["undead", "corpse", "raise dead", "thrall", "bite"],
    description: "Necromancers are durable dark casters who turn casualties into momentum. They can raise fallen bodies as thralls, heal themselves with life-draining bites, and slowly overwhelm opponents by converting the battlefield itself into extra bodies.",
    stats: { maxHealth: 235, speed: 30, range: 26, raiseRange: 30, biteDamage: 16, biteHeal: 15, cooldown: 3.5, maxThralls: 3 },
    healthBarWidth: 30,
    iconPaths: getNecromancerIconSvgPaths,
    canActWithoutEnemies: true,
    beforeStep: updateNecromancerState,
    selectTarget: selectNecromancerTarget,
    getAttackRange: getNecromancerAttackRange,
    getDesiredDestination: getNecromancerDestination,
    performAttack: performNecromancerAttack,
    onDeath: handleNecromancerDeath,
    render: drawNecromancer,
    veteran: { metric: "damage", threshold: 160, label: "Deal 160 damage" },
  },
  graverobber: {
    id: "graverobber",
    name: "Graverobber",
    keywords: ["grave", "corpse", "raider", "shovel", "melee"],
    description: "Graverobbers thrive where others have already died. They prowl near corpses and graves, turning battlefield remains into a resource that improves their effectiveness, which makes them especially dangerous in messy, prolonged fights.",
    stats: { maxHealth: 78, speed: 34, range: 18, graveRange: 24, damage: 10, cooldown: 1.25 },
    healthBarWidth: 22,
    iconPaths: getGraverobberIconSvgPaths,
    canActWithoutEnemies: true,
    selectTarget: selectGraverobberTarget,
    getAttackRange: getGraverobberAttackRange,
    getDesiredDestination: getGraverobberDestination,
    performAttack: performGraverobberAttack,
    modifyStats: modifyGraverobberStats,
    render: drawGraverobber,
    veteran: { metric: "damage", threshold: 135, label: "Deal 135 damage" },
  },
  arachnomist: {
    id: "arachnomist",
    name: "Arachnomist",
    keywords: ["spider", "grave", "swarm", "web", "poison", "caster"],
    description: "Arachnomists weave grave-magic into living infestations. They prefer distant graves that sit in the outer ring of their casting band, then crack them open into fast spider swarms that menace every nearby army, including their own.",
    stats: { maxHealth: 72, speed: 38, range: 0, graveRange: 224, graveDeadZone: 86, cooldown: 4.4, swarmCount: 5, swarmSpread: 20 },
    healthBarWidth: 22,
    iconPaths: getArachnomistIconSvgPaths,
    selectTarget: selectArachnomistTarget,
    getAttackRange: getArachnomistAttackRange,
    getDesiredDestination: getArachnomistDestination,
    performAttack: performArachnomistAttack,
    render: drawArachnomist,
    veteran: { metric: "damage", threshold: 150, label: "Deal 150 damage" },
  },
  krieger: {
    id: "krieger",
    name: "Krieger",
    keywords: ["titan", "hulk", "brute", "regeneration", "blood frenzy", "melee"],
    description: "Kriegers are towering lurching hulks that crush whatever they reach. They regenerate steadily, hit like siege beasts in melee, and can lose all sense of allegiance in a blood frenzy after a kill, turning on the nearest body no matter whose banner it serves.",
    stats: { maxHealth: 384, speed: 22, range: 32, damage: 58, cooldown: 1.55, regenPerSecond: 4.2, frenzyChance: 0.32 },
    healthBarWidth: 36,
    iconPaths: getKriegerIconSvgPaths,
    canActWithoutEnemies: true,
    beforeStep: updateKriegerState,
    selectTarget: selectKriegerTarget,
    getMoveSpeed: (unit, unitDef) => {
      const stats = getUnitStats(unit, unitDef);
      return getUnitStatus(unit, "bloodfrenzy") ? stats.speed * 1.12 : stats.speed;
    },
    performAttack: performKriegerAttack,
    render: drawKrieger,
    veteran: { metric: "kills", threshold: 3, label: "Score 3 kills" },
  },
  huntsman: {
    id: "huntsman",
    name: "Huntsman",
    keywords: ["net", "crossbow", "knife", "bleed", "hunter", "snare"],
    description: "Huntsmen are patient controllers. They pin targets down with a thrown net, then try to finish the setup with a thrown hunting knife that is hard to land on moving prey but reliable against enemies already trapped in place. Each knife hit is light, yet it leaves a lasting bleed until a support unit cleanses it.",
    stats: { maxHealth: 68, speed: 36, range: 150, netRange: 150, netDuration: 6, damage: 1, cooldown: 3.2 },
    healthBarWidth: 22,
    iconPaths: getHuntsmanIconSvgPaths,
    beforeStep: updateHuntsmanState,
    managesOwnCooldown: true,
    getAttackRange: getHuntsmanAttackRange,
    selectTarget: selectHuntsmanTarget,
    getDesiredDestination: getRetreatingDestination(112, 0.96),
    performAttack: performHuntsmanAttack,
    render: drawHuntsman,
    veteran: { metric: "damage", threshold: 150, label: "Deal 150 damage" },
  },
  artificer: {
    id: "artificer",
    name: "Artificer",
    keywords: ["engineer", "builder", "turret", "construct", "anti-swarm"],
    description: "Artificers are battlefield engineers who deploy compact sentry turrets. They reposition cautiously behind the line, rebuild when the fight shifts, and are best at shredding clustered light units rather than winning straight duels.",
    stats: { maxHealth: 64, speed: 40, range: 138, buildOffset: 28, cooldown: 3.9, rebuildThreshold: 110 },
    healthBarWidth: 20,
    iconPaths: getArtificerIconSvgPaths,
    beforeStep: updateArtificerState,
    selectTarget: selectArtificerTarget,
    getAttackRange: getArtificerAttackRange,
    getDesiredDestination: getArtificerDestination,
    performAttack: performArtificerAttack,
    render: drawArtificer,
    veteran: { metric: "damage", threshold: 140, label: "Deal 140 damage" },
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    keywords: ["ghost", "possession", "haunt", "grave", "spirit"],
    description: "Phantoms drift through the field in a cold arc, hijack enemy bodies, and turn them on their own line. When struck loose they become impotent wraiths, forced to tear through graves before they can possess again.",
    stats: { maxHealth: 38, speed: 60, range: 18, hauntRange: 260, graveRange: 24, cooldown: 1.2, diveSpeedMultiplier: 2 },
    healthBarWidth: 18,
    iconPaths: getPhantomIconSvgPaths,
    leavesGrave: false,
    canActWithoutEnemies: true,
    isTargetable: ({ unit }) => !unit.possessedUnitId && !unit.spawnInvulnerable,
    getRenderAlpha: (unit) => (unit.possessedUnitId ? 0 : 0.88),
    beforeStep: updatePhantomState,
    selectTarget: selectPhantomTarget,
    getAttackRange: getPhantomAttackRange,
    managesOwnCooldown: true,
    getMoveSpeed: (unit, unitDef) => {
      const stats = getUnitStats(unit, unitDef);
      if (unit.currentTargetKind === "enemy" && !unit.possessedUnitId && (unit.gravesToConsume || 0) <= 0) {
        return stats.speed * (stats.diveSpeedMultiplier || 1);
      }
      return stats.speed;
    },
    getDesiredDestination: getPhantomDestination,
    performAttack: performPhantomAttack,
    render: drawPhantom,
    veteran: null,
  },
  turret: {
    id: "turret",
    name: "Turret",
    draftable: false,
    keywords: ["construct", "stationary", "rapid fire", "anti-swarm"],
    description: "A compact deployable turret that cannot move, ignores damage from poison and other status effects, and sprays weak shots into a tight area.",
    stats: { maxHealth: 56, speed: 0, range: 120, damage: 3, splash: 5, cooldown: 0.5 },
    healthBarWidth: 16,
    iconPaths: getTurretIconSvgPaths,
    leavesGrave: false,
    immuneToStatusDamage: true,
    beforeStep: updateTurretState,
    selectTarget: selectTurretTarget,
    getDesiredDestination: getTurretDestination,
    getMoveSpeed: () => 0,
    performAttack: performTurretAttack,
    renderScale: 0.92,
    render: drawTurret,
    veteran: null,
  },
  spiderswarm: {
    id: "spiderswarm",
    name: "Spider Swarm",
    draftable: false,
    keywords: ["spider", "swarm", "poison", "bite", "neutral"],
    description: "Spider swarms are spawned hazards rather than recruitable troops. They skitter quickly, bite lightly, and spread poison with every strike while turning on whatever living target is closest.",
    stats: { maxHealth: 14, speed: 78, range: 13, biteDamage: 3.2, cooldown: 1.08, poisonStacks: 1, poisonDuration: 5.5, poisonDamage: 2.1, lifetime: 20 },
    healthBarWidth: 12,
    iconPaths: getSpiderSwarmIconSvgPaths,
    leavesGrave: false,
    canActWithoutEnemies: true,
    hostileToAll: true,
    beforeStep: updateSpiderSwarmState,
    selectTarget: selectSpiderSwarmTarget,
    getDesiredDestination: getSpiderSwarmDestination,
    performAttack: performSpiderSwarmAttack,
    onDeath: handleSpiderSwarmDeath,
    render: drawSpiderSwarm,
    veteran: null,
  },
  inklord: {
    id: "inklord",
    name: "InkLord",
    keywords: ["boss", "neutral", "sword", "void", "cataclysm"],
    description: "InkLord is a neutral endgame executioner. He falls into stalled battles, sweeps whole packs away with impossible strength, and exists only to end the field in terror.",
    stats: {
      maxHealth: 7200,
      speed: 58,
      range: 42,
      cooldown: 2.25,
      sweepRange: 136,
      sweepArc: 1.45,
      sweepDamage: 120,
      throwDamage: 82,
      throwDistance: 178,
      landingRadius: 68,
      landingDamage: 78,
      novaRange: 214,
      novaDamage: 44,
      skyfallRange: 270,
      skyfallRadius: 126,
      skyfallDamage: 172,
      crashDamage: 128,
    },
    healthBarWidth: 46,
    iconPaths: getInkLordIconSvgPaths,
    draftable: false,
    hostileToAll: true,
    canActWithoutEnemies: true,
    isTargetable: ({ unit }) => !unit.spawnInvulnerable,
    beforeStep: updateInkLordPresence,
    selectTarget: selectInkLordTarget,
    getAttackRange: getInkLordAttackRange,
    getMoveSpeed: (unit, unitDef) => (unit.activeSpellId ? 0 : getUnitStats(unit, unitDef).speed),
    performAttack: performInkLordAttack,
    render: drawInkLord,
    veteran: null,
  },
};
const UNIT_LIBRARY = Object.values(UNIT_DEFINITIONS)
  .filter((unit) => unit.draftable !== false)
  .map(({ id, name, keywords, description }) => ({ id, name, keywords, description }));
const UNIT_STATS = Object.fromEntries(Object.values(UNIT_DEFINITIONS).map((unit) => [unit.id, unit.stats]));
const PROJECTILE_DEFINITIONS = {
  arrow: {
    arcHeight: 70,
    update: updateStandardProjectile,
    resolve: resolveArrowProjectile,
    render: drawArrowProjectile,
  },
  orb: {
    arcHeight: 26,
    update: updateStandardProjectile,
    resolve: resolveOrbProjectile,
    render: drawOrbProjectile,
  },
  bomb: {
    arcHeight: 44,
    update: updateBombProjectile,
    resolve: resolveBombProjectile,
    render: drawBombProjectile,
  },
  poisonBottle: {
    arcHeight: 52,
    update: updateStandardProjectile,
    resolve: resolvePoisonBottleProjectile,
    render: drawPoisonBottleProjectile,
  },
  net: {
    arcHeight: 38,
    update: updateStandardProjectile,
    resolve: resolveNetProjectile,
    render: drawNetProjectile,
  },
  huntingKnife: {
    arcHeight: 18,
    update: updateStandardProjectile,
    resolve: resolveHuntingKnifeProjectile,
    render: drawHuntingKnifeProjectile,
  },
  catapultStone: {
    arcHeight: 120,
    update: updateStandardProjectile,
    resolve: resolveCatapultProjectile,
    render: drawCatapultProjectile,
  },
};
const PROP_RENDERERS = {
  cart: drawPropCart,
  ruin: drawPropRuin,
  camp: drawPropCamp,
  stakes: drawPropStakes,
  crate: drawPropCrate,
  stones: drawPropStones,
  obelisk: drawPropObelisk,
  brazier: drawPropBrazier,
  reeds: drawPropReeds,
  bones: drawPropBones,
  mushrooms: drawPropMushrooms,
  signpost: drawPropSignpost,
};
const EXPLOSION_READABILITY_INSET = 5;
const BATTLE_HIGHLIGHT_COOLDOWN_MS = 1000;
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

function createArenaTheme(name, top, bottom, glow, ground, commonProps = {}, rareProps = {}) {
  return {
    name,
    top,
    bottom,
    glow,
    ground,
    textureProfile: createArenaTextureProfile(name),
    propWeights: {
      common: { ...DEFAULT_PROP_WEIGHTS, ...commonProps },
      rare: { ...rareProps },
    },
  };
}

function createArenaTextureProfile(name) {
  const presetKey = ARENA_TEXTURE_PROFILE_BY_NAME[name] || "meadow";
  const preset = GROUND_TEXTURE_PROFILE_PRESETS[presetKey] || GROUND_TEXTURE_PROFILE_PRESETS.meadow;
  const override = ARENA_TEXTURE_PROFILE_OVERRIDES[name] || {};
  const weights = { ...preset.weights, ...(override.weights || {}) };
  const baseTexture = override.baseTexture || getDominantWeightedTextureId(weights, "grass");
  const replacementWeights = Object.keys(override.replacementWeights || {}).length
    ? { ...override.replacementWeights }
    : removeTextureFromWeights(weights, baseTexture);
  const tileSize = cloneNumberRange(override.tileSize || override.baseLayer?.tileSize || preset.tileSize || preset.baseLayer?.tileSize, [96, 132]);
  return {
    key: presetKey,
    weights,
    baseTexture,
    replacementWeights,
    tileSize,
    materialMasks: createTerrainMaterialMaskConfigs(name, tileSize, replacementWeights, override.materialMasks),
    softLightAlpha: override.softLightAlpha ?? preset.softLightAlpha,
    multiplyAlpha: override.multiplyAlpha ?? preset.multiplyAlpha,
  };
}

function createAudioState() {
  return {
    initialized: false,
    muted: false,
    activeMusicKey: null,
    tracks: {},
    fades: [],
  };
}

function createEmptyRigPart(id) {
  return {
    id,
    rect: null,
    pivot: null,
    mountOffset: { x: 0, y: 0 },
    scaleX: 1,
    scaleY: 1,
    rotationOffsetDeg: 0,
    drawOrder: RIG_PART_ORDER.indexOf(id),
    flipX: false,
    flipY: false,
  };
}

function createEmptyRigWeaponAttachment() {
  return {
    enabled: false,
    sourceX: null,
    sourceY: null,
    angleDeg: 0,
  };
}

function radToDeg(value) {
  return value * (180 / Math.PI);
}

function degToRad(value) {
  return value * (Math.PI / 180);
}

function createEmptyRigAnimationChannelSet() {
  return { stride: 0, bob: 0, attack: 0, idle: 0 };
}

function createEmptyRigAnimationTuningPart() {
  return {
    rotation: createEmptyRigAnimationChannelSet(),
    x: createEmptyRigAnimationChannelSet(),
    y: createEmptyRigAnimationChannelSet(),
    scaleX: createEmptyRigAnimationChannelSet(),
    scaleY: createEmptyRigAnimationChannelSet(),
  };
}

function createEmptyRigKeyframePose() {
  return {
    x: 0,
    y: 0,
    rotationDeg: 0,
    scaleX: 0,
    scaleY: 0,
  };
}

function getRigPartDefinition(partId) {
  return RIG_PART_DEFINITION_BY_ID[partId] || null;
}

function getRigPartLegacyId(partId) {
  return getRigPartDefinition(partId)?.legacyId || null;
}

function normalizeSpriteRigParts(rawParts = {}) {
  return Object.fromEntries(RIG_PART_IDS.map((partId) => {
    const sourcePart = rawParts?.[partId] || rawParts?.[getRigPartLegacyId(partId)] || null;
    return [partId, {
      ...createEmptyRigPart(partId),
      ...sourcePart,
      rect: sourcePart?.rect ? {
        x: Math.round(Number(sourcePart.rect.x) || 0),
        y: Math.round(Number(sourcePart.rect.y) || 0),
        w: Math.max(1, Math.round(Number(sourcePart.rect.w) || 1)),
        h: Math.max(1, Math.round(Number(sourcePart.rect.h) || 1)),
      } : null,
      pivot: sourcePart?.pivot ? {
        x: Math.round(Number(sourcePart.pivot.x) || 0),
        y: Math.round(Number(sourcePart.pivot.y) || 0),
      } : null,
      mountOffset: {
        x: Math.round(Number(sourcePart?.mountOffset?.x) || 0),
        y: Math.round(Number(sourcePart?.mountOffset?.y) || 0),
      },
      scaleX: clamp(Number(sourcePart?.scaleX) || 1, 0.05, 8),
      scaleY: clamp(Number(sourcePart?.scaleY) || 1, 0.05, 8),
      rotationOffsetDeg: Number(sourcePart?.rotationOffsetDeg) || 0,
      drawOrder: Number.isFinite(Number(sourcePart?.drawOrder)) ? Math.round(Number(sourcePart.drawOrder)) : RIG_PART_ORDER.indexOf(partId),
      flipX: Boolean(sourcePart?.flipX),
      flipY: Boolean(sourcePart?.flipY),
    }];
  }));
}

function normalizeRigManifestPartHierarchy(manifest) {
  if (!manifest?.parts) return manifest;
  const parts = { ...manifest.parts };
  if (!parts.legFrontThigh && parts.legFront) {
    parts.legFrontThigh = {
      ...parts.legFront,
      parentId: "body",
    };
  }
  if (!parts.legBackThigh && parts.legBack) {
    parts.legBackThigh = {
      ...parts.legBack,
      parentId: "body",
    };
  }
  RIG_PART_IDS.forEach((partId) => {
    if (!parts[partId]) return;
    parts[partId] = {
      ...parts[partId],
      parentId: parts[partId].parentId ?? getRigPartDefinition(partId)?.parentId ?? null,
      scaleX: clamp(Number(parts[partId].scaleX) || 1, 0.05, 8),
      scaleY: clamp(Number(parts[partId].scaleY) || 1, 0.05, 8),
      rotationOffsetDeg: Number(parts[partId].rotationOffsetDeg) || 0,
      drawOrder: Number.isFinite(Number(parts[partId].drawOrder)) ? Math.round(Number(parts[partId].drawOrder)) : RIG_PART_ORDER.indexOf(partId),
    };
  });
  manifest.parts = parts;
  return manifest;
}

function getRigPartBaseDrawOrder(partId) {
  const index = RIG_PART_ORDER.indexOf(partId);
  return index >= 0 ? index : RIG_PART_IDS.indexOf(partId);
}

function getRigPartResolvedDrawOrder(part) {
  return Number.isFinite(Number(part?.drawOrder))
    ? Math.round(Number(part.drawOrder))
    : getRigPartBaseDrawOrder(part?.id);
}

function getRigRenderOrder(manifest) {
  return Object.entries(manifest?.parts || {})
    .map(([id, part]) => ({ id, part: { id, ...part } }))
    .sort((left, right) => {
      const orderDelta = getRigPartResolvedDrawOrder(left.part) - getRigPartResolvedDrawOrder(right.part);
      if (orderDelta !== 0) return orderDelta;
      return getRigPartBaseDrawOrder(left.id) - getRigPartBaseDrawOrder(right.id);
    })
    .map((entry) => entry.id);
}

function createDefaultRigAnimationTuning() {
  const tuning = Object.fromEntries(RIG_PART_IDS.map((id) => [id, createEmptyRigAnimationTuningPart()]));
  tuning.body.rotation.attack = radToDeg(-0.05);
  tuning.body.rotation.idle = radToDeg(0.7);
  tuning.body.y.bob = -0.06;

  tuning.head.rotation.attack = radToDeg(-0.08);
  tuning.head.rotation.idle = radToDeg(1);
  tuning.head.y.bob = -0.08;
  tuning.head.y.attack = -0.02;

  tuning.armFront.rotation.stride = radToDeg(-0.38);
  tuning.armFront.rotation.attack = radToDeg(1.28);
  tuning.armFront.rotation.idle = radToDeg(0.4);
  tuning.armFront.y.bob = -0.035;

  tuning.armBack.rotation.stride = radToDeg(0.28);
  tuning.armBack.rotation.attack = radToDeg(-0.18);
  tuning.armBack.rotation.idle = radToDeg(-0.22);
  tuning.armBack.y.bob = -0.025;

  tuning.legFrontThigh.rotation.stride = -30;
  tuning.legFrontThigh.rotation.attack = 0;
  tuning.legFrontThigh.y.bob = -0.025;
  tuning.legFrontShin.rotation.stride = 30;
  tuning.legFrontShin.x.stride = -0.09;
  tuning.legFrontShin.y.bob = 0;

  tuning.legBackThigh.rotation.stride = -30;
  tuning.legBackThigh.rotation.attack = 0;
  tuning.legBackThigh.y.bob = -0.012;
  tuning.legBackShin.rotation.stride = 30;
  tuning.legBackShin.x.stride = -0.09;
  tuning.legBackShin.y.bob = 0;

  tuning.weapon.rotation.stride = radToDeg(-0.16);
  tuning.weapon.rotation.attack = radToDeg(1.12);
  tuning.weapon.rotation.idle = radToDeg(0.35);
  tuning.weapon.y.attack = -0.04;
  return tuning;
}

function createEmptyRigAnimationClips() {
  return Object.fromEntries(RIG_ANIMATION_CLIP_DEFINITIONS.map((clip) => [clip.id, {
    id: clip.id,
    speed: clip.speed,
    loop: clip.loop,
    keyframes: Object.fromEntries(RIG_PART_IDS.map((partId) => [partId, []])),
  }]));
}

function createDefaultRigAnimationConfig() {
  return {
    tuning: createDefaultRigAnimationTuning(),
    clips: createEmptyRigAnimationClips(),
  };
}

function createDefaultSpriteRigKeyframePoseState() {
  return createEmptyRigKeyframePose();
}

function createSpriteRigEditorState() {
  return {
    sourceImage: null,
    sourceName: "",
    sourceFileName: "",
    sourceMimeType: "image/png",
    sourceImageDataUrl: "",
    sourceWidth: 0,
    sourceHeight: 0,
    zoom: 1,
    fitZoom: 1,
    offsetX: 0,
    offsetY: 0,
    activePartId: "body",
    dragStart: null,
    dragCurrent: null,
    previewDrag: null,
    previewScene: null,
    previewReferenceImage: null,
    previewBlend: 0.55,
    previewMode: "composite",
    previewAutoplay: true,
    previewTime: 0,
    previewMotionX: 1,
    previewMotionY: 0,
    selectedAnimationId: "walk",
    keyframePose: createDefaultSpriteRigKeyframePoseState(),
    exportDirectoryHandle: null,
    exportDirectoryName: "",
    unitId: Object.keys(UNIT_DEFINITIONS)[0] || "",
    renderHeight: DEFAULT_RIG_LAYOUT.height,
    anchorY: DEFAULT_RIG_LAYOUT.anchorY,
    healthBarOffsetX: DEFAULT_RIG_LAYOUT.healthBarOffsetX,
    healthBarOffsetY: DEFAULT_RIG_LAYOUT.healthBarOffsetY,
    weaponAttachment: createEmptyRigWeaponAttachment(),
    animationConfig: createDefaultRigAnimationConfig(),
    packedArtifact: null,
    statusText: "Load a sprite to begin defining the rig.",
    parts: normalizeSpriteRigParts(),
  };
}

const state = {
  factions: [],
  battle: null,
  tournament: null,
  tournamentResult: null,
  tournamentTerrainTextureCache: null,
  terrainTextureCache: new Map(),
  sessionTerrainTexture: null,
  terrainReflectionIndex: 0,
  images: new Map(),
  unitSpriteSources: new Map(),
  riggedUnitSpriteSources: new Map(),
  statusBadgeSources: new Map(),
  groundPropCatalog: {
    status: "idle",
    items: [],
    promise: null,
  },
  graveCatalog: {
    status: "idle",
    items: [],
    promise: null,
  },
  groundPropScaleFile: {
    loaded: false,
    directoryHandle: null,
    promptAttempted: false,
  },
  terrainBuildUi: {
    visible: false,
    label: "Building terrain texture...",
    progress: 0,
  },
  tintedUnitSprites: new Map(),
  tintedGroundProps: new Map(),
  running: false,
  roundsApplied: 0,
  tournamentConfig: normalizeTournamentConfig(),
  speedIndex: 2,
  useRiggedSprites: true,
  useTerrainTexturing: true,
  useUnitOverlapShadows: true,
  alwaysShowHealthbars: false,
  showRenderDebug: false,
  propResizeMode: false,
  selectedPropId: null,
  propScaleOverrides: {},
  devPanelVisible: false,
  audio: createAudioState(),
  camera: {
    x: FIELD.width / 2,
    y: FIELD.height / 2,
    zoom: 1,
    targetX: FIELD.width / 2,
    targetY: FIELD.height / 2,
    targetZoom: 1,
    mode: "fit",
    manualUntil: 0,
    isDragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
    cinematic: {
      poiId: null,
      focusX: FIELD.width / 2,
      focusY: FIELD.height / 2,
      focusZoom: 1,
      nextRetargetAt: 0,
    },
  },
  hover: {
    focusedUnitId: null,
    canvasX: 0,
    canvasY: 0,
    cssX: 0,
    cssY: 0,
    insideCanvas: false,
    shiftHeld: false,
    inspectSlowActive: false,
  },
  compositionModal: {
    factionId: null,
    draft: null,
    search: "",
    pendingTransfer: null,
    visualRetryQueued: false,
  },
  renderDebug: {
    visibleUnits: 0,
    culledUnits: 0,
    totalUnits: 0,
    overlapShadowCasters: 0,
    fps: 0,
  },
  lastBattleHighlightAt: -Infinity,
  lastTournamentViewSyncAt: -Infinity,
  spriteRigEditor: createSpriteRigEditorState(),
};

const els = {
  canvas: document.getElementById("battleCanvas"),
  runBattleBtn: document.getElementById("runBattleBtn"),
  resetBattleBtn: document.getElementById("resetBattleBtn"),
  advanceQueueBtn: document.getElementById("advanceQueueBtn"),
  randomizeArenaBtn: document.getElementById("randomizeArenaBtn"),
  seedSampleBtn: document.getElementById("seedSampleBtn"),
  viewTournamentStoryBtn: document.getElementById("viewTournamentStoryBtn"),
  csvInput: document.getElementById("csvInput"),
  csvFileInput: document.getElementById("csvFileInput"),
  importCsvBtn: document.getElementById("importCsvBtn"),
  downloadCsvBtn: document.getElementById("downloadCsvBtn"),
  armyList: document.getElementById("armyList"),
  battleState: document.getElementById("battleState"),
  winnerLabel: document.getElementById("winnerLabel"),
  roundCounter: document.getElementById("roundCounter"),
  arenaLabel: document.getElementById("arenaLabel"),
  bracketSummary: document.getElementById("bracketSummary"),
  bracketTracker: document.getElementById("bracketTracker"),
  toggleTournamentConfigBtn: document.getElementById("toggleTournamentConfigBtn"),
  tournamentConfigBody: document.getElementById("tournamentConfigBody"),
  tournamentMinFactionsInput: document.getElementById("tournamentMinFactionsInput"),
  tournamentMaxFactionsInput: document.getElementById("tournamentMaxFactionsInput"),
  tournamentMaxUnitsInput: document.getElementById("tournamentMaxUnitsInput"),
  tournamentPaperbackOnlyInput: document.getElementById("tournamentPaperbackOnlyInput"),
  tournamentConfigSummary: document.getElementById("tournamentConfigSummary"),
  battleTicker: document.getElementById("battleTicker"),
  battleHealthChart: document.getElementById("battleHealthChart"),
  battleHealthChartCanvas: document.getElementById("battleHealthChartCanvas"),
  terrainBuildStatus: document.getElementById("terrainBuildStatus"),
  terrainBuildLabel: document.getElementById("terrainBuildLabel"),
  terrainBuildFill: document.getElementById("terrainBuildFill"),
  terrainBuildPercent: document.getElementById("terrainBuildPercent"),
  devPanel: document.getElementById("devPanel"),
  useRiggedSpritesToggle: document.getElementById("useRiggedSpritesToggle"),
  useTerrainTexturingToggle: document.getElementById("useTerrainTexturingToggle"),
  useUnitOverlapShadowsToggle: document.getElementById("useUnitOverlapShadowsToggle"),
  alwaysShowHealthbarsToggle: document.getElementById("alwaysShowHealthbarsToggle"),
  showRenderDebugToggle: document.getElementById("showRenderDebugToggle"),
  propResizeToggle: document.getElementById("propResizeToggle"),
  knockoutAnnouncement: document.getElementById("knockoutAnnouncement"),
  bossAnnouncement: document.getElementById("bossAnnouncement"),
  winnerCard: document.getElementById("winnerCard"),
  winnerModal: document.getElementById("winnerModal"),
  closeWinnerModalBtn: document.getElementById("closeWinnerModalBtn"),
  resetTournamentModal: document.getElementById("resetTournamentModal"),
  closeResetTournamentModalBtn: document.getElementById("closeResetTournamentModalBtn"),
  cancelResetTournamentBtn: document.getElementById("cancelResetTournamentBtn"),
  confirmResetTournamentBtn: document.getElementById("confirmResetTournamentBtn"),
  tournamentStoryModal: document.getElementById("tournamentStoryModal"),
  closeTournamentStoryBtn: document.getElementById("closeTournamentStoryBtn"),
  tournamentStorySummary: document.getElementById("tournamentStorySummary"),
  tournamentStoryGraph: document.getElementById("tournamentStoryGraph"),
  speedControls: document.getElementById("speedControls"),
  template: document.getElementById("armyEditorTemplate"),
  compositionModal: document.getElementById("compositionModal"),
  closeCompositionModalBtn: document.getElementById("closeCompositionModalBtn"),
  cancelCompositionBtn: document.getElementById("cancelCompositionBtn"),
  compositionSearch: document.getElementById("compositionSearch"),
  compositionResults: document.getElementById("compositionResults"),
  compositionSelected: document.getElementById("compositionSelected"),
  compositionResultsCount: document.getElementById("compositionResultsCount"),
  compositionSelectedCount: document.getElementById("compositionSelectedCount"),
  battleUnitTooltip: document.getElementById("battleUnitTooltip"),
  spriteRigFileInput: document.getElementById("spriteRigFileInput"),
  spriteRigProjectInput: document.getElementById("spriteRigProjectInput"),
  spriteRigSaveProjectBtn: document.getElementById("spriteRigSaveProjectBtn"),
  spriteRigChooseExportDirBtn: document.getElementById("spriteRigChooseExportDirBtn"),
  spriteRigUnitSelect: document.getElementById("spriteRigUnitSelect"),
  spriteRigRenderHeight: document.getElementById("spriteRigRenderHeight"),
  spriteRigAnchorY: document.getElementById("spriteRigAnchorY"),
  spriteRigHealthBarOffsetX: document.getElementById("spriteRigHealthBarOffsetX"),
  spriteRigHealthBarOffsetY: document.getElementById("spriteRigHealthBarOffsetY"),
  spriteRigZoomOutBtn: document.getElementById("spriteRigZoomOutBtn"),
  spriteRigZoomResetBtn: document.getElementById("spriteRigZoomResetBtn"),
  spriteRigZoomInBtn: document.getElementById("spriteRigZoomInBtn"),
  spriteRigZoomLabel: document.getElementById("spriteRigZoomLabel"),
  spriteRigSourceCanvas: document.getElementById("spriteRigSourceCanvas"),
  spriteRigPartPicker: document.getElementById("spriteRigPartPicker"),
  spriteRigRegionX: document.getElementById("spriteRigRegionX"),
  spriteRigRegionY: document.getElementById("spriteRigRegionY"),
  spriteRigRegionW: document.getElementById("spriteRigRegionW"),
  spriteRigRegionH: document.getElementById("spriteRigRegionH"),
  spriteRigPivotX: document.getElementById("spriteRigPivotX"),
  spriteRigPivotY: document.getElementById("spriteRigPivotY"),
  spriteRigMountOffsetX: document.getElementById("spriteRigMountOffsetX"),
  spriteRigMountOffsetY: document.getElementById("spriteRigMountOffsetY"),
  spriteRigBaseScaleX: document.getElementById("spriteRigBaseScaleX"),
  spriteRigBaseScaleY: document.getElementById("spriteRigBaseScaleY"),
  spriteRigRotationOffset: document.getElementById("spriteRigRotationOffset"),
  spriteRigDrawOrder: document.getElementById("spriteRigDrawOrder"),
  spriteRigWeaponAttachEnabled: document.getElementById("spriteRigWeaponAttachEnabled"),
  spriteRigWeaponAttachX: document.getElementById("spriteRigWeaponAttachX"),
  spriteRigWeaponAttachY: document.getElementById("spriteRigWeaponAttachY"),
  spriteRigWeaponAttachAngle: document.getElementById("spriteRigWeaponAttachAngle"),
  spriteRigWeaponUseArmPivotBtn: document.getElementById("spriteRigWeaponUseArmPivotBtn"),
  spriteRigWeaponClearAttachBtn: document.getElementById("spriteRigWeaponClearAttachBtn"),
  spriteRigCopyFromBodyBtn: document.getElementById("spriteRigCopyFromBodyBtn"),
  spriteRigResetMountOffsetBtn: document.getElementById("spriteRigResetMountOffsetBtn"),
  spriteRigResetBaseScaleBtn: document.getElementById("spriteRigResetBaseScaleBtn"),
  spriteRigFlipXBtn: document.getElementById("spriteRigFlipXBtn"),
  spriteRigFlipYBtn: document.getElementById("spriteRigFlipYBtn"),
  spriteRigClearPartBtn: document.getElementById("spriteRigClearPartBtn"),
  spriteRigPreviewCanvas: document.getElementById("spriteRigPreviewCanvas"),
  spriteRigPreviewMode: document.getElementById("spriteRigPreviewMode"),
  spriteRigPreviewAutoplay: document.getElementById("spriteRigPreviewAutoplay"),
  spriteRigPreviewTime: document.getElementById("spriteRigPreviewTime"),
  spriteRigPreviewBlend: document.getElementById("spriteRigPreviewBlend"),
  spriteRigWalkVectorControls: document.getElementById("spriteRigWalkVectorControls"),
  spriteRigPreviewMotionX: document.getElementById("spriteRigPreviewMotionX"),
  spriteRigPreviewMotionY: document.getElementById("spriteRigPreviewMotionY"),
  spriteRigPreviewLabel: document.getElementById("spriteRigPreviewLabel"),
  spriteRigAnimationSelect: document.getElementById("spriteRigAnimationSelect"),
  spriteRigAnimationSummary: document.getElementById("spriteRigAnimationSummary"),
  spriteRigAnimationClipFields: document.getElementById("spriteRigAnimationClipFields"),
  spriteRigAnimationFields: document.getElementById("spriteRigAnimationFields"),
  spriteRigKeyframeSummary: document.getElementById("spriteRigKeyframeSummary"),
  spriteRigKeyframeX: document.getElementById("spriteRigKeyframeX"),
  spriteRigKeyframeY: document.getElementById("spriteRigKeyframeY"),
  spriteRigKeyframeRotation: document.getElementById("spriteRigKeyframeRotation"),
  spriteRigKeyframeScaleX: document.getElementById("spriteRigKeyframeScaleX"),
  spriteRigKeyframeScaleY: document.getElementById("spriteRigKeyframeScaleY"),
  spriteRigSetKeyframeBtn: document.getElementById("spriteRigSetKeyframeBtn"),
  spriteRigDeleteKeyframeBtn: document.getElementById("spriteRigDeleteKeyframeBtn"),
  spriteRigResetKeyframePoseBtn: document.getElementById("spriteRigResetKeyframePoseBtn"),
  spriteRigKeyframeList: document.getElementById("spriteRigKeyframeList"),
  spriteRigDownloadSheetBtn: document.getElementById("spriteRigDownloadSheetBtn"),
  spriteRigDownloadManifestBtn: document.getElementById("spriteRigDownloadManifestBtn"),
  spriteRigExportDirBtn: document.getElementById("spriteRigExportDirBtn"),
  spriteRigStatus: document.getElementById("spriteRigStatus"),
};

const HAS_BATTLE_PAGE = Boolean(
  els.canvas
  && els.battleHealthChartCanvas
  && els.runBattleBtn
  && els.armyList
);
const HAS_SPRITE_RIG_PAGE = Boolean(
  els.spriteRigSourceCanvas
  && els.spriteRigPreviewCanvas
  && els.spriteRigFileInput
);
const ctx = els.canvas ? els.canvas.getContext("2d") : null;
const chartCtx = els.battleHealthChartCanvas ? els.battleHealthChartCanvas.getContext("2d") : null;
let lastFrame = performance.now();

bootstrap();

async function bootstrap() {
  if (HAS_BATTLE_PAGE) {
    loadState();
    getFactionImage(WEATHER_RAIN_LIGHT_ASSET);
    getFactionImage(WEATHER_RAIN_HEAVY_ASSET);
    await loadGroundPropScaleOverrides();
    if (!state.factions.length) {
      state.factions = cloneData(SAMPLE_BOOKS).map(withFactionDefaults);
      saveState();
    }
    await preloadGroundPropAssets();
    await preloadGraveAssets();
    bindUi();
    setUseRiggedSprites(state.useRiggedSprites);
    setUseTerrainTexturing(state.useTerrainTexturing);
    setUseUnitOverlapShadows(state.useUnitOverlapShadows);
    setAlwaysShowHealthbars(state.alwaysShowHealthbars);
    setShowRenderDebug(state.showRenderDebug);
    setPropResizeMode(state.propResizeMode);
    setDevPanelVisible(false);
    initializeBattleAudio();
    renderSpeedControls();
    syncCsvInput();
    renderArmyEditors();
    renderTournamentConfigPanel();
    resetBattle();
  }
  if (HAS_SPRITE_RIG_PAGE) {
    initializeSpriteRigEditor();
    bindSpriteRigEditorUi();
  }
  if (HAS_BATTLE_PAGE || HAS_SPRITE_RIG_PAGE) requestAnimationFrame(loop);
}

function bindUi() {
  els.runBattleBtn.addEventListener("click", startBattle);
  els.resetBattleBtn.addEventListener("click", handleResetBattleClick);
  els.advanceQueueBtn.addEventListener("click", applyWinnerToQueue);
  els.randomizeArenaBtn.addEventListener("click", randomizeArenaAndWeather);
  els.viewTournamentStoryBtn.addEventListener("click", openTournamentPage);
  els.toggleTournamentConfigBtn?.addEventListener("click", toggleTournamentConfigPanel);
  [els.tournamentMinFactionsInput, els.tournamentMaxFactionsInput, els.tournamentMaxUnitsInput, els.tournamentPaperbackOnlyInput]
    .filter(Boolean)
    .forEach((input) => input.addEventListener("change", commitTournamentConfigFromInputs));
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
  els.closeWinnerModalBtn.addEventListener("click", closeWinnerModal);
  els.closeResetTournamentModalBtn.addEventListener("click", closeResetTournamentModal);
  els.cancelResetTournamentBtn.addEventListener("click", closeResetTournamentModal);
  els.confirmResetTournamentBtn.addEventListener("click", confirmResetTournament);
  els.closeTournamentStoryBtn.addEventListener("click", closeTournamentStoryModal);
  els.closeCompositionModalBtn.addEventListener("click", closeCompositionModal);
  els.cancelCompositionBtn.addEventListener("click", closeCompositionModal);
  els.useRiggedSpritesToggle?.addEventListener("change", () => {
    setUseRiggedSprites(Boolean(els.useRiggedSpritesToggle.checked));
  });
  els.useTerrainTexturingToggle?.addEventListener("change", () => {
    setUseTerrainTexturing(Boolean(els.useTerrainTexturingToggle.checked));
  });
  els.useUnitOverlapShadowsToggle?.addEventListener("change", () => {
    setUseUnitOverlapShadows(Boolean(els.useUnitOverlapShadowsToggle.checked));
  });
  els.alwaysShowHealthbarsToggle?.addEventListener("change", () => {
    setAlwaysShowHealthbars(Boolean(els.alwaysShowHealthbarsToggle.checked));
  });
  els.showRenderDebugToggle?.addEventListener("change", () => {
    setShowRenderDebug(Boolean(els.showRenderDebugToggle.checked));
  });
  els.propResizeToggle?.addEventListener("change", () => {
    setPropResizeMode(Boolean(els.propResizeToggle.checked));
  });
  els.compositionSearch.addEventListener("input", () => {
    state.compositionModal.search = els.compositionSearch.value;
    renderCompositionModal();
  });
  els.compositionModal.addEventListener("click", (event) => {
    if (event.target.dataset.close) closeCompositionModal();
  });
  els.resetTournamentModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeReset) closeResetTournamentModal();
  });
  els.tournamentStoryModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeStory) closeTournamentStoryModal();
  });
  els.winnerModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeWinner) closeWinnerModal();
  });
  window.addEventListener("resize", sizeCanvas);
  els.canvas.addEventListener("pointerdown", onCanvasPointerDown);
  els.canvas.addEventListener("pointerleave", clearBattleHover);
  window.addEventListener("pointermove", onCanvasPointerMove);
  window.addEventListener("pointerup", onCanvasPointerUp);
  window.addEventListener("keydown", onWindowKeyDown);
  window.addEventListener("keyup", onWindowKeyUp);
  window.addEventListener("blur", onWindowBlur);
  els.canvas.addEventListener("wheel", onCanvasWheel, { passive: false });
  sizeCanvas();
}

function initializeSpriteRigEditor() {
  if (!els.spriteRigSourceCanvas || !els.spriteRigPreviewCanvas) return;
  populateSpriteRigUnitSelect();
  populateSpriteRigAnimationSelect();
  els.spriteRigUnitSelect.value = state.spriteRigEditor.unitId;
  els.spriteRigRenderHeight.value = `${state.spriteRigEditor.renderHeight}`;
  els.spriteRigAnchorY.value = `${state.spriteRigEditor.anchorY}`;
  els.spriteRigHealthBarOffsetX.value = `${state.spriteRigEditor.healthBarOffsetX}`;
  els.spriteRigHealthBarOffsetY.value = `${state.spriteRigEditor.healthBarOffsetY}`;
  els.spriteRigPreviewBlend.value = `${Math.round(state.spriteRigEditor.previewBlend * 100)}`;
  if (els.spriteRigPreviewMotionX) els.spriteRigPreviewMotionX.value = `${state.spriteRigEditor.previewMotionX}`;
  if (els.spriteRigPreviewMotionY) els.spriteRigPreviewMotionY.value = `${state.spriteRigEditor.previewMotionY}`;
  renderSpriteRigPartPicker();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  syncSpriteRigAnimationControls();
  updateSpriteRigZoomLabel();
  updateSpriteRigStatus();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  ensureSpriteRigPreviewReferenceImage();
}

function bindSpriteRigEditorUi() {
  if (!els.spriteRigFileInput) return;
  els.spriteRigFileInput.addEventListener("change", onSpriteRigFileChange);
  els.spriteRigProjectInput?.addEventListener("change", onSpriteRigProjectFileChange);
  els.spriteRigSaveProjectBtn?.addEventListener("click", saveSpriteRigWorkshopAsset);
  els.spriteRigChooseExportDirBtn?.addEventListener("click", chooseSpriteRigExportDirectory);
  els.spriteRigUnitSelect.addEventListener("change", () => {
    state.spriteRigEditor.unitId = els.spriteRigUnitSelect.value;
    invalidateSpriteRigPackedArtifact();
    updateSpriteRigStatus();
  });
  els.spriteRigRenderHeight.addEventListener("input", () => {
    state.spriteRigEditor.renderHeight = clamp(Number(els.spriteRigRenderHeight.value) || DEFAULT_RIG_LAYOUT.height, 16, 256);
    invalidateSpriteRigPackedArtifact();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
  });
  els.spriteRigAnchorY.addEventListener("input", () => {
    state.spriteRigEditor.anchorY = clamp(Number(els.spriteRigAnchorY.value) || DEFAULT_RIG_LAYOUT.anchorY, 0.5, 1.2);
    invalidateSpriteRigPackedArtifact();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
  });
  [
    els.spriteRigHealthBarOffsetX,
    els.spriteRigHealthBarOffsetY,
  ].forEach((input) => input.addEventListener("input", onSpriteRigHealthBarFieldInput));
  els.spriteRigPreviewBlend.addEventListener("input", () => {
    state.spriteRigEditor.previewBlend = clamp((Number(els.spriteRigPreviewBlend.value) || 0) / 100, 0, 1);
    renderSpriteRigPreview();
  });
  els.spriteRigPreviewMode?.addEventListener("change", () => {
    state.spriteRigEditor.previewMode = els.spriteRigPreviewMode.value;
    renderSpriteRigPreview();
    updateSpriteRigStatus();
  });
  els.spriteRigPreviewAutoplay?.addEventListener("change", () => {
    state.spriteRigEditor.previewAutoplay = Boolean(els.spriteRigPreviewAutoplay.checked);
    renderSpriteRigPreview();
  });
  els.spriteRigPreviewTime?.addEventListener("input", () => {
    state.spriteRigEditor.previewTime = clamp((Number(els.spriteRigPreviewTime.value) || 0) / 100, 0, 1);
    state.spriteRigEditor.previewAutoplay = false;
    syncSpriteRigAnimationControls();
    renderSpriteRigPreview();
  });
  [els.spriteRigPreviewMotionX, els.spriteRigPreviewMotionY]
    .filter(Boolean)
    .forEach((input) => input.addEventListener("input", () => {
      state.spriteRigEditor.previewMotionX = clamp(Number(els.spriteRigPreviewMotionX?.value) || 0, -1, 1);
      state.spriteRigEditor.previewMotionY = clamp(Number(els.spriteRigPreviewMotionY?.value) || 0, -1, 1);
      renderSpriteRigPreview();
    }));
  els.spriteRigAnimationSelect?.addEventListener("change", () => {
    state.spriteRigEditor.selectedAnimationId = els.spriteRigAnimationSelect.value;
    syncSpriteRigAnimationControls();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
  });
  [
    els.spriteRigRegionX,
    els.spriteRigRegionY,
    els.spriteRigRegionW,
    els.spriteRigRegionH,
    els.spriteRigPivotX,
    els.spriteRigPivotY,
    els.spriteRigMountOffsetX,
    els.spriteRigMountOffsetY,
    els.spriteRigBaseScaleX,
    els.spriteRigBaseScaleY,
    els.spriteRigRotationOffset,
    els.spriteRigDrawOrder,
  ].forEach((input) => input.addEventListener("input", onSpriteRigFieldInput));
  els.spriteRigWeaponAttachEnabled.addEventListener("change", onSpriteRigWeaponFieldInput);
  [
    els.spriteRigWeaponAttachX,
    els.spriteRigWeaponAttachY,
    els.spriteRigWeaponAttachAngle,
  ].forEach((input) => input.addEventListener("input", onSpriteRigWeaponFieldInput));
  els.spriteRigWeaponUseArmPivotBtn.addEventListener("click", useFrontArmPivotForWeaponAttachment);
  els.spriteRigWeaponClearAttachBtn.addEventListener("click", resetSpriteRigWeaponAttachment);
  els.spriteRigCopyFromBodyBtn.addEventListener("click", centerSpriteRigPivotInRegion);
  els.spriteRigResetMountOffsetBtn.addEventListener("click", resetActiveSpriteRigMountOffset);
  els.spriteRigResetBaseScaleBtn.addEventListener("click", resetActiveSpriteRigBaseScale);
  els.spriteRigFlipXBtn.addEventListener("click", () => toggleActiveSpriteRigReflection("x"));
  els.spriteRigFlipYBtn.addEventListener("click", () => toggleActiveSpriteRigReflection("y"));
  els.spriteRigClearPartBtn.addEventListener("click", clearActiveSpriteRigPart);
  [
    els.spriteRigKeyframeX,
    els.spriteRigKeyframeY,
    els.spriteRigKeyframeRotation,
    els.spriteRigKeyframeScaleX,
    els.spriteRigKeyframeScaleY,
  ].forEach((input) => input?.addEventListener("input", () => {
    state.spriteRigEditor.keyframePose = readSpriteRigKeyframePoseFields();
    renderSpriteRigPreview();
  }));
  els.spriteRigSetKeyframeBtn?.addEventListener("click", upsertSpriteRigKeyframe);
  els.spriteRigDeleteKeyframeBtn?.addEventListener("click", deleteSpriteRigKeyframe);
  els.spriteRigResetKeyframePoseBtn?.addEventListener("click", () => {
    resetSpriteRigKeyframePoseFields();
    renderSpriteRigPreview();
  });
  els.spriteRigDownloadSheetBtn.addEventListener("click", () => downloadSpriteRigArtifact("sheet"));
  els.spriteRigDownloadManifestBtn.addEventListener("click", () => downloadSpriteRigArtifact("manifest"));
  els.spriteRigExportDirBtn.addEventListener("click", exportSpriteRigToDirectory);
  els.spriteRigZoomOutBtn.addEventListener("click", () => changeSpriteRigZoom(1 / 1.2));
  els.spriteRigZoomResetBtn.addEventListener("click", resetSpriteRigZoom);
  els.spriteRigZoomInBtn.addEventListener("click", () => changeSpriteRigZoom(1.2));
  els.spriteRigSourceCanvas.addEventListener("pointerdown", onSpriteRigCanvasPointerDown);
  els.spriteRigSourceCanvas.addEventListener("pointermove", onSpriteRigCanvasPointerMove);
  els.spriteRigSourceCanvas.addEventListener("wheel", onSpriteRigCanvasWheel, { passive: false });
  els.spriteRigPreviewCanvas.addEventListener("pointerdown", onSpriteRigPreviewPointerDown);
  window.addEventListener("pointermove", onSpriteRigPreviewPointerMove);
  window.addEventListener("pointerup", onSpriteRigCanvasPointerUp);
  window.addEventListener("pointerup", onSpriteRigPreviewPointerUp);
}

function populateSpriteRigUnitSelect() {
  if (!els.spriteRigUnitSelect) return;
  els.spriteRigUnitSelect.innerHTML = "";
  Object.values(UNIT_DEFINITIONS)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = `${unit.name} (${unit.id})`;
      els.spriteRigUnitSelect.appendChild(option);
    });
}

function sanitizeRigAssetName(value) {
  return `${value || ""}`.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
}

function ensureSpriteRigPreviewReferenceImage() {
  if (state.spriteRigEditor.previewReferenceImage) return;
  const image = new Image();
  image.onload = () => {
    state.spriteRigEditor.previewReferenceImage = image;
    renderSpriteRigPreview();
  };
  image.src = "assets/unit-archer.svg";
}

function populateSpriteRigAnimationSelect() {
  if (!els.spriteRigAnimationSelect) return;
  els.spriteRigAnimationSelect.innerHTML = "";
  RIG_ANIMATION_CLIP_DEFINITIONS.forEach((clip) => {
    const option = document.createElement("option");
    option.value = clip.id;
    option.textContent = clip.label;
    els.spriteRigAnimationSelect.appendChild(option);
  });
}

function getRigAnimationClipDefinition(clipId) {
  return RIG_ANIMATION_CLIP_DEFINITIONS.find((clip) => clip.id === clipId) || RIG_ANIMATION_CLIP_DEFINITIONS[0];
}

function normalizeRigKeyframePose(rawPose) {
  return {
    x: Number(rawPose?.x) || 0,
    y: Number(rawPose?.y) || 0,
    rotationDeg: Number(rawPose?.rotationDeg) || 0,
    scaleX: Number(rawPose?.scaleX) || 0,
    scaleY: Number(rawPose?.scaleY) || 0,
  };
}

function normalizeRigAnimationConfig(rawConfig) {
  const fallback = createDefaultRigAnimationConfig();
  const normalized = {
    tuning: Object.fromEntries(RIG_PART_IDS.map((partId) => [partId, createEmptyRigAnimationTuningPart()])),
    clips: createEmptyRigAnimationClips(),
  };
  RIG_PART_IDS.forEach((partId) => {
    const rawPartTuning = rawConfig?.tuning?.[partId] || rawConfig?.tuning?.[getRigPartLegacyId(partId)] || null;
    ["rotation", "x", "y", "scaleX", "scaleY"].forEach((groupKey) => {
      ["stride", "bob", "attack", "idle"].forEach((channelKey) => {
        normalized.tuning[partId][groupKey][channelKey] = Number(
          rawPartTuning?.[groupKey]?.[channelKey]
          ?? fallback.tuning[partId]?.[groupKey]?.[channelKey]
        ) || 0;
      });
    });
  });
  RIG_ANIMATION_CLIP_DEFINITIONS.forEach((clipDef) => {
    const sourceClip = rawConfig?.clips?.[clipDef.id] || {};
    normalized.clips[clipDef.id].speed = clamp(Number(sourceClip.speed) || clipDef.speed, 0.1, 4);
    normalized.clips[clipDef.id].loop = clipDef.loop;
    RIG_PART_IDS.forEach((partId) => {
      const rawFrames = Array.isArray(sourceClip.keyframes?.[partId])
        ? sourceClip.keyframes[partId]
        : Array.isArray(sourceClip.keyframes?.[getRigPartLegacyId(partId)])
          ? sourceClip.keyframes[getRigPartLegacyId(partId)]
          : [];
      normalized.clips[clipDef.id].keyframes[partId] = rawFrames
        .map((frame) => ({
          time: clamp(Number(frame?.time) || 0, 0, 1),
          pose: normalizeRigKeyframePose(frame?.pose),
        }))
        .sort((a, b) => a.time - b.time);
    });
  });
  return normalized;
}

function getSelectedSpriteRigAnimationClip() {
  const clipId = state.spriteRigEditor.selectedAnimationId || RIG_ANIMATION_CLIP_DEFINITIONS[0].id;
  return state.spriteRigEditor.animationConfig?.clips?.[clipId] || createEmptyRigAnimationClips()[clipId];
}

function getActiveSpriteRigAnimationTuningPart() {
  const partId = state.spriteRigEditor.activePartId;
  return state.spriteRigEditor.animationConfig?.tuning?.[partId] || createEmptyRigAnimationTuningPart();
}

function getSpriteRigTuningValue(partTuning, path) {
  return path.split(".").reduce((value, key) => value?.[key], partTuning) ?? 0;
}

function setSpriteRigTuningValue(partTuning, path, nextValue) {
  const keys = path.split(".");
  let cursor = partTuning;
  for (let i = 0; i < keys.length - 1; i += 1) cursor = cursor[keys[i]];
  cursor[keys[keys.length - 1]] = nextValue;
}

function getSpriteRigCurrentKeyframeTime() {
  return clamp(Number(state.spriteRigEditor.previewTime) || 0, 0, 1);
}

function getSpriteRigKeyframesForSelection() {
  const clip = getSelectedSpriteRigAnimationClip();
  return clip?.keyframes?.[state.spriteRigEditor.activePartId] || [];
}

function findSpriteRigExactKeyframe(frames, time) {
  return (frames || []).find((frame) => Math.abs(frame.time - time) <= 0.0001) || null;
}

function sampleSpriteRigKeyframePose(frames, time, loop) {
  const list = (frames || []).slice().sort((a, b) => a.time - b.time);
  if (!list.length) return createEmptyRigKeyframePose();
  const targetTime = loop ? ((time % 1) + 1) % 1 : clamp(time, 0, 1);
  const exact = findSpriteRigExactKeyframe(list, targetTime);
  if (exact) return normalizeRigKeyframePose(exact.pose);
  if (list.length === 1) return normalizeRigKeyframePose(list[0].pose);
  if (!loop) {
    let previous = list[0];
    let next = list[list.length - 1];
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].time <= targetTime) previous = list[i];
      if (list[i].time >= targetTime) {
        next = list[i];
        break;
      }
    }
    if (targetTime <= list[0].time) return normalizeRigKeyframePose(list[0].pose);
    if (targetTime >= list[list.length - 1].time) return normalizeRigKeyframePose(list[list.length - 1].pose);
    const amount = clamp((targetTime - previous.time) / Math.max(next.time - previous.time, 0.0001), 0, 1);
    const prevPose = normalizeRigKeyframePose(previous.pose);
    const nextPose = normalizeRigKeyframePose(next.pose);
    return {
      x: lerp(prevPose.x, nextPose.x, amount),
      y: lerp(prevPose.y, nextPose.y, amount),
      rotationDeg: lerp(prevPose.rotationDeg, nextPose.rotationDeg, amount),
      scaleX: lerp(prevPose.scaleX, nextPose.scaleX, amount),
      scaleY: lerp(prevPose.scaleY, nextPose.scaleY, amount),
    };
  }
  let previous = list[list.length - 1];
  let next = list[0];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].time >= targetTime) {
      next = list[i];
      break;
    }
    previous = list[i];
  }
  const adjustedTargetTime = targetTime < previous.time ? targetTime + 1 : targetTime;
  const nextTime = next.time <= previous.time ? next.time + 1 : next.time;
  const amount = clamp((adjustedTargetTime - previous.time) / Math.max(nextTime - previous.time, 0.0001), 0, 1);
  const prevPose = normalizeRigKeyframePose(previous.pose);
  const nextPose = normalizeRigKeyframePose(next.pose);
  return {
    x: lerp(prevPose.x, nextPose.x, amount),
    y: lerp(prevPose.y, nextPose.y, amount),
    rotationDeg: lerp(prevPose.rotationDeg, nextPose.rotationDeg, amount),
    scaleX: lerp(prevPose.scaleX, nextPose.scaleX, amount),
    scaleY: lerp(prevPose.scaleY, nextPose.scaleY, amount),
  };
}

function syncSpriteRigAnimationControls() {
  if (!els.spriteRigAnimationSelect) return;
  els.spriteRigAnimationSelect.value = state.spriteRigEditor.selectedAnimationId;
  if (els.spriteRigPreviewMode) els.spriteRigPreviewMode.value = state.spriteRigEditor.previewMode;
  if (els.spriteRigPreviewAutoplay) els.spriteRigPreviewAutoplay.checked = Boolean(state.spriteRigEditor.previewAutoplay);
  if (els.spriteRigPreviewTime) els.spriteRigPreviewTime.value = `${Math.round(getSpriteRigCurrentKeyframeTime() * 100)}`;
  if (els.spriteRigPreviewMotionX) els.spriteRigPreviewMotionX.value = `${state.spriteRigEditor.previewMotionX}`;
  if (els.spriteRigPreviewMotionY) els.spriteRigPreviewMotionY.value = `${state.spriteRigEditor.previewMotionY}`;
  const showWalkVectorControls = state.spriteRigEditor.selectedAnimationId === "walk"
    || state.spriteRigEditor.previewMode === "composite";
  els.spriteRigWalkVectorControls?.classList.toggle("hidden", !showWalkVectorControls);
  renderSpriteRigAnimationFieldEditors();
  syncSpriteRigKeyframePoseFields();
  renderSpriteRigKeyframeList();
}

function renderSpriteRigAnimationFieldEditors() {
  if (!els.spriteRigAnimationFields || !els.spriteRigAnimationClipFields) return;
  const clipId = state.spriteRigEditor.selectedAnimationId;
  const clipDef = getRigAnimationClipDefinition(clipId);
  const partTuning = getActiveSpriteRigAnimationTuningPart();
  const clip = getSelectedSpriteRigAnimationClip();
  els.spriteRigAnimationSummary.textContent = `${clipDef.label} / ${RIG_PART_DEFINITIONS.find((part) => part.id === state.spriteRigEditor.activePartId)?.label || "Part"}`;
  els.spriteRigAnimationClipFields.innerHTML = "";
  const speedLabel = document.createElement("label");
  speedLabel.innerHTML = `<span>${clipDef.label} Speed</span><input type="number" step="0.05" min="0.1" max="4" value="${clip?.speed ?? clipDef.speed}">`;
  const speedInput = speedLabel.querySelector("input");
  speedInput.addEventListener("input", () => {
    clip.speed = clamp(Number(speedInput.value) || clipDef.speed, 0.1, 4);
    invalidateSpriteRigPackedArtifact();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
  });
  els.spriteRigAnimationClipFields.appendChild(speedLabel);

  els.spriteRigAnimationFields.innerHTML = "";
  (RIG_ANIMATION_FIELD_DEFINITIONS[clipId] || []).forEach((fieldDef) => {
    const label = document.createElement("label");
    label.innerHTML = `<span>${fieldDef.label}</span><input type="number" step="${fieldDef.step}" value="${getSpriteRigTuningValue(partTuning, fieldDef.path)}">`;
    const input = label.querySelector("input");
    input.addEventListener("input", () => {
      setSpriteRigTuningValue(partTuning, fieldDef.path, Number(input.value) || 0);
      invalidateSpriteRigPackedArtifact();
      renderSpriteRigPreview();
      updateSpriteRigStatus();
    });
    els.spriteRigAnimationFields.appendChild(label);
  });
}

function syncSpriteRigKeyframePoseFields() {
  const clip = getSelectedSpriteRigAnimationClip();
  const frames = getSpriteRigKeyframesForSelection();
  const time = getSpriteRigCurrentKeyframeTime();
  const exact = findSpriteRigExactKeyframe(frames, time);
  const pose = exact
    ? normalizeRigKeyframePose(exact.pose)
    : sampleSpriteRigKeyframePose(frames, time, clip?.loop);
  state.spriteRigEditor.keyframePose = pose;
  els.spriteRigKeyframeX.value = `${pose.x}`;
  els.spriteRigKeyframeY.value = `${pose.y}`;
  els.spriteRigKeyframeRotation.value = `${pose.rotationDeg}`;
  els.spriteRigKeyframeScaleX.value = `${pose.scaleX}`;
  els.spriteRigKeyframeScaleY.value = `${pose.scaleY}`;
  els.spriteRigKeyframeSummary.textContent = exact
    ? `${getRigAnimationClipDefinition(state.spriteRigEditor.selectedAnimationId).label} @ ${Math.round(time * 100)}%`
    : `Interpolated @ ${Math.round(time * 100)}%`;
}

function readSpriteRigKeyframePoseFields() {
  return {
    x: Number(els.spriteRigKeyframeX?.value) || 0,
    y: Number(els.spriteRigKeyframeY?.value) || 0,
    rotationDeg: Number(els.spriteRigKeyframeRotation?.value) || 0,
    scaleX: Number(els.spriteRigKeyframeScaleX?.value) || 0,
    scaleY: Number(els.spriteRigKeyframeScaleY?.value) || 0,
  };
}

function upsertSpriteRigKeyframe() {
  const clip = getSelectedSpriteRigAnimationClip();
  const frames = clip.keyframes[state.spriteRigEditor.activePartId];
  const time = getSpriteRigCurrentKeyframeTime();
  const pose = readSpriteRigKeyframePoseFields();
  const existing = findSpriteRigExactKeyframe(frames, time);
  if (existing) {
    existing.pose = pose;
  } else {
    frames.push({ time, pose });
    frames.sort((a, b) => a.time - b.time);
  }
  state.spriteRigEditor.keyframePose = pose;
  invalidateSpriteRigPackedArtifact();
  renderSpriteRigPreview();
  renderSpriteRigKeyframeList();
  syncSpriteRigKeyframePoseFields();
  updateSpriteRigStatus();
}

function deleteSpriteRigKeyframe() {
  const clip = getSelectedSpriteRigAnimationClip();
  const frames = clip.keyframes[state.spriteRigEditor.activePartId];
  const time = getSpriteRigCurrentKeyframeTime();
  const index = frames.findIndex((frame) => Math.abs(frame.time - time) <= 0.0001);
  if (index >= 0) frames.splice(index, 1);
  state.spriteRigEditor.keyframePose = createEmptyRigKeyframePose();
  syncSpriteRigKeyframePoseFields();
  renderSpriteRigKeyframeList();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function resetSpriteRigKeyframePoseFields() {
  state.spriteRigEditor.keyframePose = createEmptyRigKeyframePose();
  els.spriteRigKeyframeX.value = "0";
  els.spriteRigKeyframeY.value = "0";
  els.spriteRigKeyframeRotation.value = "0";
  els.spriteRigKeyframeScaleX.value = "0";
  els.spriteRigKeyframeScaleY.value = "0";
}

function renderSpriteRigKeyframeList() {
  if (!els.spriteRigKeyframeList) return;
  const frames = getSpriteRigKeyframesForSelection();
  els.spriteRigKeyframeList.innerHTML = "";
  if (!frames.length) {
    const empty = document.createElement("span");
    empty.className = "hint";
    empty.textContent = "No keyframes set for this part in the selected clip yet.";
    els.spriteRigKeyframeList.appendChild(empty);
    return;
  }
  frames.forEach((frame) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `sprite-rig-keyframe-chip${Math.abs(frame.time - getSpriteRigCurrentKeyframeTime()) <= 0.0001 ? " active" : ""}`;
    button.textContent = `${Math.round(frame.time * 100)}%`;
    button.addEventListener("click", () => {
      state.spriteRigEditor.previewAutoplay = false;
      state.spriteRigEditor.previewTime = frame.time;
      syncSpriteRigAnimationControls();
      renderSpriteRigPreview();
    });
    els.spriteRigKeyframeList.appendChild(button);
  });
}

function renderSpriteRigPartPicker() {
  if (!els.spriteRigPartPicker) return;
  els.spriteRigPartPicker.innerHTML = "";
  RIG_PART_DEFINITIONS.forEach((partDef) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sprite-rig-part-btn";
    if (state.spriteRigEditor.activePartId === partDef.id) button.classList.add("active");
    if (state.spriteRigEditor.parts[partDef.id]?.rect) button.classList.add("is-defined");
    button.innerHTML = `<strong>${partDef.label}</strong><span>${partDef.optional ? "Optional" : "Required"}</span>`;
    button.style.borderColor = state.spriteRigEditor.activePartId === partDef.id ? hexToRgba(partDef.color, 0.48) : "";
    button.addEventListener("click", () => {
      state.spriteRigEditor.activePartId = partDef.id;
      renderSpriteRigPartPicker();
      syncSpriteRigFields();
      syncSpriteRigAnimationControls();
      renderSpriteRigSourceCanvas();
    });
    els.spriteRigPartPicker.appendChild(button);
  });
}

function getActiveSpriteRigPart() {
  return state.spriteRigEditor.parts[state.spriteRigEditor.activePartId];
}

function syncSpriteRigFields() {
  const part = getActiveSpriteRigPart();
  const rect = part?.rect || { x: "", y: "", w: "", h: "" };
  const pivot = part?.pivot || { x: "", y: "" };
  const mountOffset = part?.mountOffset || { x: "", y: "" };
  const scaleX = part?.scaleX ?? 1;
  const scaleY = part?.scaleY ?? 1;
  const rotationOffsetDeg = part?.rotationOffsetDeg ?? 0;
  const drawOrder = part?.drawOrder ?? getRigPartBaseDrawOrder(state.spriteRigEditor.activePartId);
  els.spriteRigRegionX.value = rect.x;
  els.spriteRigRegionY.value = rect.y;
  els.spriteRigRegionW.value = rect.w;
  els.spriteRigRegionH.value = rect.h;
  els.spriteRigPivotX.value = pivot.x;
  els.spriteRigPivotY.value = pivot.y;
  els.spriteRigMountOffsetX.value = mountOffset.x;
  els.spriteRigMountOffsetY.value = mountOffset.y;
  els.spriteRigBaseScaleX.value = `${scaleX}`;
  els.spriteRigBaseScaleY.value = `${scaleY}`;
  els.spriteRigRotationOffset.value = `${rotationOffsetDeg}`;
  els.spriteRigDrawOrder.value = `${drawOrder}`;
}

function syncSpriteRigWeaponFields() {
  const attachment = state.spriteRigEditor.weaponAttachment || createEmptyRigWeaponAttachment();
  const armFront = state.spriteRigEditor.parts.armFront;
  const fallbackX = armFront?.pivot?.x ?? "";
  const fallbackY = armFront?.pivot?.y ?? "";
  els.spriteRigWeaponAttachEnabled.checked = Boolean(attachment.enabled);
  els.spriteRigWeaponAttachX.value = attachment.sourceX ?? fallbackX;
  els.spriteRigWeaponAttachY.value = attachment.sourceY ?? fallbackY;
  els.spriteRigWeaponAttachAngle.value = attachment.angleDeg ?? 0;
  const disabled = !attachment.enabled;
  els.spriteRigWeaponAttachX.disabled = disabled;
  els.spriteRigWeaponAttachY.disabled = disabled;
  els.spriteRigWeaponAttachAngle.disabled = disabled;
  els.spriteRigWeaponUseArmPivotBtn.disabled = !armFront?.pivot;
  els.spriteRigWeaponClearAttachBtn.disabled = !attachment.enabled && attachment.sourceX == null && attachment.sourceY == null && !attachment.angleDeg;
}

function onSpriteRigFieldInput() {
  const part = getActiveSpriteRigPart();
  const values = {
    x: Math.round(Number(els.spriteRigRegionX.value) || 0),
    y: Math.round(Number(els.spriteRigRegionY.value) || 0),
    w: Math.max(1, Math.round(Number(els.spriteRigRegionW.value) || 1)),
    h: Math.max(1, Math.round(Number(els.spriteRigRegionH.value) || 1)),
    pivotX: Math.round(Number(els.spriteRigPivotX.value) || 0),
    pivotY: Math.round(Number(els.spriteRigPivotY.value) || 0),
    mountOffsetX: Math.round(Number(els.spriteRigMountOffsetX.value) || 0),
    mountOffsetY: Math.round(Number(els.spriteRigMountOffsetY.value) || 0),
    baseScaleX: clamp(Number(els.spriteRigBaseScaleX.value) || 1, 0.05, 8),
    baseScaleY: clamp(Number(els.spriteRigBaseScaleY.value) || 1, 0.05, 8),
    rotationOffsetDeg: Number(els.spriteRigRotationOffset.value) || 0,
    drawOrder: Math.round(Number(els.spriteRigDrawOrder.value) || 0),
  };
  part.rect = { x: values.x, y: values.y, w: values.w, h: values.h };
  part.pivot = { x: values.pivotX, y: values.pivotY };
  part.mountOffset = { x: values.mountOffsetX, y: values.mountOffsetY };
  part.scaleX = values.baseScaleX;
  part.scaleY = values.baseScaleY;
  part.rotationOffsetDeg = values.rotationOffsetDeg;
  part.drawOrder = values.drawOrder;
  clampSpriteRigPartToImage(part);
  clampSpriteRigWeaponAttachmentToImage();
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  renderSpriteRigPartPicker();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function onSpriteRigWeaponFieldInput() {
  const attachment = state.spriteRigEditor.weaponAttachment;
  attachment.enabled = els.spriteRigWeaponAttachEnabled.checked;
  attachment.sourceX = els.spriteRigWeaponAttachX.value === "" ? null : Math.round(Number(els.spriteRigWeaponAttachX.value) || 0);
  attachment.sourceY = els.spriteRigWeaponAttachY.value === "" ? null : Math.round(Number(els.spriteRigWeaponAttachY.value) || 0);
  attachment.angleDeg = Math.round(Number(els.spriteRigWeaponAttachAngle.value) || 0);
  clampSpriteRigWeaponAttachmentToImage();
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function onSpriteRigHealthBarFieldInput() {
  state.spriteRigEditor.healthBarOffsetX = Math.round(Number(els.spriteRigHealthBarOffsetX.value) || 0);
  state.spriteRigEditor.healthBarOffsetY = Math.round(Number(els.spriteRigHealthBarOffsetY.value) || 0);
  invalidateSpriteRigPackedArtifact();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function useFrontArmPivotForWeaponAttachment() {
  const armFront = state.spriteRigEditor.parts.armFront;
  if (!armFront?.pivot) return;
  state.spriteRigEditor.weaponAttachment.enabled = true;
  state.spriteRigEditor.weaponAttachment.sourceX = armFront.pivot.x;
  state.spriteRigEditor.weaponAttachment.sourceY = armFront.pivot.y;
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function resetSpriteRigWeaponAttachment() {
  state.spriteRigEditor.weaponAttachment = createEmptyRigWeaponAttachment();
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function resetActiveSpriteRigMountOffset() {
  const part = getActiveSpriteRigPart();
  if (!part) return;
  part.mountOffset = { x: 0, y: 0 };
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigFields();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function resetActiveSpriteRigBaseScale() {
  const part = getActiveSpriteRigPart();
  if (!part) return;
  part.scaleX = 1;
  part.scaleY = 1;
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigFields();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function toggleActiveSpriteRigReflection(axis) {
  const part = getActiveSpriteRigPart();
  if (!part) return;
  if (axis === "x") part.flipX = !part.flipX;
  if (axis === "y") part.flipY = !part.flipY;
  invalidateSpriteRigPackedArtifact();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function centerSpriteRigPivotInRegion() {
  const part = getActiveSpriteRigPart();
  if (!part?.rect) return;
  part.pivot = {
    x: Math.round(part.rect.x + part.rect.w / 2),
    y: Math.round(part.rect.y + part.rect.h / 2),
  };
  invalidateSpriteRigPackedArtifact();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function clearActiveSpriteRigPart() {
  state.spriteRigEditor.parts[state.spriteRigEditor.activePartId] = createEmptyRigPart(state.spriteRigEditor.activePartId);
  clampSpriteRigWeaponAttachmentToImage();
  invalidateSpriteRigPackedArtifact();
  renderSpriteRigPartPicker();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function applySpriteRigSourceImage(image, options = {}) {
  const editor = state.spriteRigEditor;
  editor.sourceImage = image;
  editor.sourceName = options.sourceName || editor.sourceName || "sprite-rig";
  editor.sourceFileName = options.fileName || editor.sourceFileName || `${editor.sourceName}.png`;
  editor.sourceMimeType = options.mimeType || editor.sourceMimeType || "image/png";
  editor.sourceImageDataUrl = options.dataUrl || editor.sourceImageDataUrl || "";
  editor.sourceWidth = image.naturalWidth || image.width;
  editor.sourceHeight = image.naturalHeight || image.height;
  editor.fitZoom = Math.min(
    RIG_EDITOR_CANVAS_SIZE / Math.max(1, editor.sourceWidth),
    RIG_EDITOR_CANVAS_SIZE / Math.max(1, editor.sourceHeight),
  );
  editor.zoom = editor.fitZoom * 0.8;
  updateSpriteRigViewportOffsets();
}

function resetSpriteRigEditorForNewSource() {
  const editor = state.spriteRigEditor;
  editor.parts = normalizeSpriteRigParts();
  editor.healthBarOffsetX = DEFAULT_RIG_LAYOUT.healthBarOffsetX;
  editor.healthBarOffsetY = DEFAULT_RIG_LAYOUT.healthBarOffsetY;
  editor.weaponAttachment = createEmptyRigWeaponAttachment();
  editor.activePartId = "body";
  editor.animationConfig = createDefaultRigAnimationConfig();
  editor.selectedAnimationId = "walk";
  editor.previewMode = "composite";
  editor.previewAutoplay = true;
  editor.previewTime = 0;
  editor.keyframePose = createDefaultSpriteRigKeyframePoseState();
  invalidateSpriteRigPackedArtifact();
}

function finalizeSpriteRigSourceLoad() {
  if (els.spriteRigUnitSelect && !els.spriteRigUnitSelect.value) {
    els.spriteRigUnitSelect.value = state.spriteRigEditor.unitId;
  }
  els.spriteRigHealthBarOffsetX.value = `${state.spriteRigEditor.healthBarOffsetX}`;
  els.spriteRigHealthBarOffsetY.value = `${state.spriteRigEditor.healthBarOffsetY}`;
  renderSpriteRigPartPicker();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  syncSpriteRigAnimationControls();
  updateSpriteRigZoomLabel();
  updateSpriteRigStatus();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function onSpriteRigFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const dataUrl = await fileToDataUrl(file);
    const image = await loadImageAsset(dataUrl);
    resetSpriteRigEditorForNewSource();
    applySpriteRigSourceImage(image, {
      sourceName: file.name.replace(/\.[^.]+$/, ""),
      fileName: file.name,
      mimeType: file.type || "image/png",
      dataUrl,
    });
    finalizeSpriteRigSourceLoad();
  } catch (error) {
    els.spriteRigStatus.textContent = `Could not load source sprite: ${error.message || error}`;
  } finally {
    if (event.target) event.target.value = "";
  }
}

async function onSpriteRigProjectFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const project = JSON.parse(text);
    await loadSpriteRigWorkshopProject(project);
    els.spriteRigStatus.textContent = `Opened workshop asset ${file.name}.`;
  } catch (error) {
    els.spriteRigStatus.textContent = `Could not open workshop asset: ${error.message || error}`;
  } finally {
    if (event.target) event.target.value = "";
  }
}

function updateSpriteRigViewportOffsets() {
  const editor = state.spriteRigEditor;
  editor.offsetX = Math.round((RIG_EDITOR_CANVAS_SIZE - editor.sourceWidth * editor.zoom) / 2);
  editor.offsetY = Math.round((RIG_EDITOR_CANVAS_SIZE - editor.sourceHeight * editor.zoom) / 2);
}

function updateSpriteRigZoomLabel() {
  if (!els.spriteRigZoomLabel) return;
  const fitZoom = Math.max(state.spriteRigEditor.fitZoom || 1, 0.0001);
  const percent = Math.round((state.spriteRigEditor.zoom / fitZoom) * 100);
  els.spriteRigZoomLabel.textContent = `${percent}%`;
}

function changeSpriteRigZoom(multiplier) {
  if (!state.spriteRigEditor.sourceImage) return;
  state.spriteRigEditor.zoom = clamp(state.spriteRigEditor.zoom * multiplier, state.spriteRigEditor.fitZoom * 0.2, state.spriteRigEditor.fitZoom * 8);
  updateSpriteRigViewportOffsets();
  updateSpriteRigZoomLabel();
  renderSpriteRigSourceCanvas();
}

function resetSpriteRigZoom() {
  if (!state.spriteRigEditor.sourceImage) return;
  state.spriteRigEditor.zoom = state.spriteRigEditor.fitZoom;
  updateSpriteRigViewportOffsets();
  updateSpriteRigZoomLabel();
  renderSpriteRigSourceCanvas();
}

function onSpriteRigCanvasWheel(event) {
  if (!state.spriteRigEditor.sourceImage) return;
  event.preventDefault();
  changeSpriteRigZoom(event.deltaY > 0 ? 1 / 1.1 : 1.1);
}

function getSpriteRigPreviewCanvasPoint(event) {
  const rect = els.spriteRigPreviewCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * ((els.spriteRigPreviewCanvas.width || 1) / Math.max(rect.width, 1)),
    y: (event.clientY - rect.top) * ((els.spriteRigPreviewCanvas.height || 1) / Math.max(rect.height, 1)),
  };
}

function getSpriteRigCanvasPoint(event) {
  const rect = els.spriteRigSourceCanvas.getBoundingClientRect();
  const editor = state.spriteRigEditor;
  const canvasX = (event.clientX - rect.left) * ((els.spriteRigSourceCanvas.width || 1) / Math.max(rect.width, 1));
  const canvasY = (event.clientY - rect.top) * ((els.spriteRigSourceCanvas.height || 1) / Math.max(rect.height, 1));
  return {
    x: clamp(Math.round((canvasX - editor.offsetX) / Math.max(editor.zoom, 0.0001)), 0, editor.sourceWidth),
    y: clamp(Math.round((canvasY - editor.offsetY) / Math.max(editor.zoom, 0.0001)), 0, editor.sourceHeight),
  };
}

function onSpriteRigCanvasPointerDown(event) {
  if (!state.spriteRigEditor.sourceImage) return;
  const point = getSpriteRigCanvasPoint(event);
  if (event.altKey) {
    state.spriteRigEditor.weaponAttachment.enabled = true;
    state.spriteRigEditor.weaponAttachment.sourceX = point.x;
    state.spriteRigEditor.weaponAttachment.sourceY = point.y;
    clampSpriteRigWeaponAttachmentToImage();
    invalidateSpriteRigPackedArtifact();
    syncSpriteRigWeaponFields();
    renderSpriteRigSourceCanvas();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
    return;
  }
  if (event.shiftKey) {
    const part = getActiveSpriteRigPart();
    part.pivot = point;
    clampSpriteRigWeaponAttachmentToImage();
    invalidateSpriteRigPackedArtifact();
    syncSpriteRigFields();
    syncSpriteRigWeaponFields();
    renderSpriteRigSourceCanvas();
    renderSpriteRigPreview();
    updateSpriteRigStatus();
    return;
  }
  state.spriteRigEditor.dragStart = point;
  state.spriteRigEditor.dragCurrent = point;
  renderSpriteRigSourceCanvas();
}

function onSpriteRigCanvasPointerMove(event) {
  if (!state.spriteRigEditor.dragStart) return;
  state.spriteRigEditor.dragCurrent = getSpriteRigCanvasPoint(event);
  renderSpriteRigSourceCanvas();
}

function onSpriteRigCanvasPointerUp() {
  const editor = state.spriteRigEditor;
  if (!editor.dragStart || !editor.dragCurrent) return;
  const x = Math.min(editor.dragStart.x, editor.dragCurrent.x);
  const y = Math.min(editor.dragStart.y, editor.dragCurrent.y);
  const w = Math.max(1, Math.abs(editor.dragCurrent.x - editor.dragStart.x));
  const h = Math.max(1, Math.abs(editor.dragCurrent.y - editor.dragStart.y));
  const part = getActiveSpriteRigPart();
  part.rect = { x, y, w, h };
  if (!part.pivot) {
    part.pivot = { x: Math.round(x + w / 2), y: Math.round(y + h / 2) };
  } else {
    clampSpriteRigPartToImage(part);
  }
  clampSpriteRigWeaponAttachmentToImage();
  invalidateSpriteRigPackedArtifact();
  editor.dragStart = null;
  editor.dragCurrent = null;
  renderSpriteRigPartPicker();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function onSpriteRigPreviewPointerDown(event) {
  const editor = state.spriteRigEditor;
  const activePartId = editor.activePartId;
  const metrics = editor.previewScene?.partMetrics?.[activePartId];
  if (!metrics) return;
  const point = getSpriteRigPreviewCanvasPoint(event);
  if (!isPointInsideBounds(point, metrics.bounds)) return;
  const part = getActiveSpriteRigPart();
  if (!part) return;
  editor.previewDrag = {
    pointerId: event.pointerId,
    startPoint: point,
    mode: editor.previewAutoplay ? "mount" : "keyframe",
    startMountOffset: {
      x: part.mountOffset?.x || 0,
      y: part.mountOffset?.y || 0,
    },
    startKeyframePose: {
      ...readSpriteRigKeyframePoseFields(),
    },
    sourceScale: editor.previewScene?.sourceScale || 1,
  };
  els.spriteRigPreviewCanvas.setPointerCapture?.(event.pointerId);
  renderSpriteRigPreview();
}

function onSpriteRigPreviewPointerMove(event) {
  const drag = state.spriteRigEditor.previewDrag;
  if (!drag) return;
  const point = getSpriteRigPreviewCanvasPoint(event);
  const part = getActiveSpriteRigPart();
  if (!part) return;
  const dx = (point.x - drag.startPoint.x) / Math.max(drag.sourceScale || 1, 0.0001);
  const dy = (point.y - drag.startPoint.y) / Math.max(drag.sourceScale || 1, 0.0001);
  if (drag.mode === "keyframe") {
    const nextPose = {
      ...drag.startKeyframePose,
      x: Math.round((drag.startKeyframePose.x + dx) * 100) / 100,
      y: Math.round((drag.startKeyframePose.y + dy) * 100) / 100,
    };
    state.spriteRigEditor.keyframePose = nextPose;
    els.spriteRigKeyframeX.value = `${nextPose.x}`;
    els.spriteRigKeyframeY.value = `${nextPose.y}`;
  } else {
    part.mountOffset = {
      x: Math.round(drag.startMountOffset.x + dx),
      y: Math.round(drag.startMountOffset.y + dy),
    };
    invalidateSpriteRigPackedArtifact();
    syncSpriteRigFields();
  }
  renderSpriteRigPreview();
  updateSpriteRigStatus();
}

function onSpriteRigPreviewPointerUp(event) {
  const drag = state.spriteRigEditor.previewDrag;
  if (!drag) return;
  if (typeof drag.pointerId === "number" && typeof event.pointerId === "number" && drag.pointerId !== event.pointerId) return;
  if (drag.mode === "keyframe") upsertSpriteRigKeyframe();
  state.spriteRigEditor.previewDrag = null;
  renderSpriteRigPreview();
}

function isPointInsideBounds(point, bounds) {
  if (!bounds) return false;
  return point.x >= bounds.minX
    && point.x <= bounds.maxX
    && point.y >= bounds.minY
    && point.y <= bounds.maxY;
}

function clampSpriteRigPartToImage(part) {
  const editor = state.spriteRigEditor;
  if (!part?.rect || !editor.sourceImage) return;
  part.rect.x = clamp(Math.round(part.rect.x), 0, Math.max(0, editor.sourceWidth - 1));
  part.rect.y = clamp(Math.round(part.rect.y), 0, Math.max(0, editor.sourceHeight - 1));
  part.rect.w = clamp(Math.round(part.rect.w), 1, Math.max(1, editor.sourceWidth - part.rect.x));
  part.rect.h = clamp(Math.round(part.rect.h), 1, Math.max(1, editor.sourceHeight - part.rect.y));
  if (part.pivot) {
    part.pivot.x = clamp(Math.round(part.pivot.x), part.rect.x, part.rect.x + part.rect.w);
    part.pivot.y = clamp(Math.round(part.pivot.y), part.rect.y, part.rect.y + part.rect.h);
  }
  part.rotationOffsetDeg = Number(part.rotationOffsetDeg) || 0;
  part.drawOrder = Number.isFinite(Number(part.drawOrder))
    ? Math.round(Number(part.drawOrder))
    : getRigPartBaseDrawOrder(part.id);
}

function clampSpriteRigWeaponAttachmentToImage() {
  const editor = state.spriteRigEditor;
  const attachment = editor.weaponAttachment;
  if (!editor.sourceImage || !attachment) return;
  if (attachment.sourceX == null || attachment.sourceY == null) return;
  const armFront = editor.parts.armFront;
  if (armFront?.rect) {
    attachment.sourceX = clamp(Math.round(attachment.sourceX), armFront.rect.x, armFront.rect.x + armFront.rect.w);
    attachment.sourceY = clamp(Math.round(attachment.sourceY), armFront.rect.y, armFront.rect.y + armFront.rect.h);
    return;
  }
  attachment.sourceX = clamp(Math.round(attachment.sourceX), 0, editor.sourceWidth);
  attachment.sourceY = clamp(Math.round(attachment.sourceY), 0, editor.sourceHeight);
}

function renderSpriteRigSourceCanvas() {
  if (!els.spriteRigSourceCanvas) return;
  const ctx2d = els.spriteRigSourceCanvas.getContext("2d");
  const editor = state.spriteRigEditor;
  ctx2d.clearRect(0, 0, els.spriteRigSourceCanvas.width, els.spriteRigSourceCanvas.height);
  ctx2d.fillStyle = "#16100c";
  ctx2d.fillRect(0, 0, els.spriteRigSourceCanvas.width, els.spriteRigSourceCanvas.height);
  if (!editor.sourceImage) return;
  ctx2d.drawImage(
    editor.sourceImage,
    editor.offsetX,
    editor.offsetY,
    editor.sourceWidth * editor.zoom,
    editor.sourceHeight * editor.zoom,
  );
  RIG_PART_DEFINITIONS.forEach((partDef) => {
    const part = editor.parts[partDef.id];
    if (!part?.rect) return;
    const x = editor.offsetX + part.rect.x * editor.zoom;
    const y = editor.offsetY + part.rect.y * editor.zoom;
    const w = part.rect.w * editor.zoom;
    const h = part.rect.h * editor.zoom;
    ctx2d.save();
    ctx2d.fillStyle = hexToRgba(partDef.color, partDef.id === editor.activePartId ? 0.18 : 0.1);
    ctx2d.strokeStyle = hexToRgba(partDef.color, partDef.id === editor.activePartId ? 0.95 : 0.6);
    ctx2d.lineWidth = partDef.id === editor.activePartId ? 2.5 : 1.5;
    ctx2d.fillRect(x, y, w, h);
    ctx2d.strokeRect(x, y, w, h);
    if (part.pivot) {
      const px = editor.offsetX + part.pivot.x * editor.zoom;
      const py = editor.offsetY + part.pivot.y * editor.zoom;
      ctx2d.beginPath();
      ctx2d.arc(px, py, 5, 0, Math.PI * 2);
      ctx2d.fillStyle = partDef.color;
      ctx2d.fill();
      ctx2d.strokeStyle = "#110d0a";
      ctx2d.lineWidth = 2;
      ctx2d.stroke();
    }
    ctx2d.restore();
  });
  renderSpriteRigWeaponAttachmentOverlay(ctx2d, editor);
  if (editor.dragStart && editor.dragCurrent) {
    const x = Math.min(editor.dragStart.x, editor.dragCurrent.x) * editor.zoom + editor.offsetX;
    const y = Math.min(editor.dragStart.y, editor.dragCurrent.y) * editor.zoom + editor.offsetY;
    const w = Math.abs(editor.dragCurrent.x - editor.dragStart.x) * editor.zoom;
    const h = Math.abs(editor.dragCurrent.y - editor.dragStart.y) * editor.zoom;
    ctx2d.save();
    ctx2d.strokeStyle = "#fff6d2";
    ctx2d.setLineDash([7, 5]);
    ctx2d.strokeRect(x, y, w, h);
    ctx2d.restore();
  }
}

function renderSpriteRigWeaponAttachmentOverlay(ctx2d, editor) {
  const attachment = editor.weaponAttachment;
  if (!attachment?.enabled || attachment.sourceX == null || attachment.sourceY == null) return;
  const armFront = editor.parts.armFront;
  const x = editor.offsetX + attachment.sourceX * editor.zoom;
  const y = editor.offsetY + attachment.sourceY * editor.zoom;
  const angle = (attachment.angleDeg || 0) * (Math.PI / 180);
  const radius = 6;
  const length = 26;
  ctx2d.save();
  if (armFront?.rect) {
    const rx = editor.offsetX + armFront.rect.x * editor.zoom;
    const ry = editor.offsetY + armFront.rect.y * editor.zoom;
    ctx2d.strokeStyle = "rgba(241, 239, 176, 0.42)";
    ctx2d.lineWidth = 2;
    ctx2d.setLineDash([5, 4]);
    ctx2d.strokeRect(rx, ry, armFront.rect.w * editor.zoom, armFront.rect.h * editor.zoom);
  }
  ctx2d.setLineDash([]);
  ctx2d.strokeStyle = "#f1efb0";
  ctx2d.lineWidth = 2;
  ctx2d.beginPath();
  ctx2d.arc(x, y, radius, 0, Math.PI * 2);
  ctx2d.stroke();
  ctx2d.beginPath();
  ctx2d.moveTo(x - radius - 4, y);
  ctx2d.lineTo(x + radius + 4, y);
  ctx2d.moveTo(x, y - radius - 4);
  ctx2d.lineTo(x, y + radius + 4);
  ctx2d.stroke();
  ctx2d.strokeStyle = "#ffe7a3";
  ctx2d.lineWidth = 3;
  ctx2d.beginPath();
  ctx2d.moveTo(x, y);
  ctx2d.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
  ctx2d.stroke();
  ctx2d.restore();
}

function renderSpriteRigPreview() {
  if (!els.spriteRigPreviewCanvas) return;
  const previewCtx = els.spriteRigPreviewCanvas.getContext("2d");
  const canvas = els.spriteRigPreviewCanvas;
  previewCtx.clearRect(0, 0, canvas.width, canvas.height);
  previewCtx.fillStyle = "#140d08";
  previewCtx.fillRect(0, 0, canvas.width, canvas.height);
  if (!state.spriteRigEditor.sourceImage) {
    els.spriteRigPreviewLabel.textContent = "Idle";
    return;
  }
  const artifact = buildSpriteRigSheetCanvas();
  if (!artifact) return;
  const now = performance.now() / 1000;
  const previewState = buildSpriteRigPreviewState(artifact.manifest, now);
  els.spriteRigPreviewLabel.textContent = previewState.label;
  const scene = renderBattleAccurateSpriteRigPreview(previewCtx, canvas, artifact, previewState.previewUnit, previewState.animationState);
  state.spriteRigEditor.previewScene = scene
    ? { ...scene }
    : null;
}

function buildSpriteRigPreviewState(manifest, now) {
  const editor = state.spriteRigEditor;
  const config = getRigAnimationConfigFromManifest(manifest);
  const selectedClipId = editor.selectedAnimationId || "walk";
  const selectedClip = config.clips[selectedClipId] || getSelectedSpriteRigAnimationClip();
  const previewMotionX = clamp(Number(editor.previewMotionX) || 0, -1, 1);
  const previewMotionY = clamp(Number(editor.previewMotionY) || 0, -1, 1);
  const previewMotionLength = Math.hypot(previewMotionX, previewMotionY);
  const normalizedMotionX = previewMotionLength > 0.001 ? previewMotionX / previewMotionLength : 1;
  const normalizedMotionY = previewMotionLength > 0.001 ? previewMotionY / previewMotionLength : 0;
  const previewFacingX = Math.abs(normalizedMotionX) > 0.001 ? Math.sign(normalizedMotionX) : 1;
  const scrubTime = editor.previewAutoplay
    ? null
    : getSpriteRigCurrentKeyframeTime();
  const walkTime = scrubTime != null
    ? scrubTime
    : wrap01(now * 0.72 * (config.clips.walk?.speed || 1));
  const attackTime = scrubTime != null
    ? scrubTime
    : wrap01(now * 0.55 * (config.clips.attack?.speed || 1));
  const idleTime = scrubTime != null
    ? scrubTime
    : wrap01(now * 0.35 * (config.clips.idle?.speed || 1));
  let previewUnit = {
    type: editor.unitId || "archer",
    stride: 0,
    bob: 0,
    attackSwing: 0,
    displayFacingX: previewFacingX,
    walkTilt: 0,
    rotation: 0,
    vx: 0,
    vy: 0,
    locomotionVectorX: normalizedMotionX,
    locomotionVectorY: normalizedMotionY,
    locomotionSpeed: 0,
    gaitAngularVelocity: Math.PI * 2 * (config.clips.walk?.speed || 1) * 0.72,
  };
  let animationState = {
    stride: 0,
    bob: 0,
    attack: 0,
    idle: 0,
    clipTimes: { idle: idleTime, walk: walkTime, attack: attackTime },
    clipWeights: { idle: 0, walk: 0, attack: 0 },
  };
  let label = getRigAnimationClipDefinition(selectedClipId).label;
  if (editor.previewMode === "composite") {
    const blend = clamp(editor.previewBlend, 0, 1);
    const walkSpeed = config.clips.walk?.speed || 1;
    const attackSpeed = config.clips.attack?.speed || 1;
    previewUnit = {
      ...previewUnit,
      stride: Math.sin(now * 4.2 * walkSpeed) * blend,
      bob: (0.5 - Math.cos(now * 8.4 * walkSpeed) * 0.5) * blend,
      attackSwing: Math.max(0, Math.sin(now * 2.8 * attackSpeed)) * (0.35 + blend * 0.65),
      walkTilt: Math.sin(now * 1.5 * walkSpeed) * 0.035 * blend * Math.abs(normalizedMotionX),
      vx: normalizedMotionX * (24 + blend * 18),
      vy: normalizedMotionY * (24 + blend * 18),
      locomotionSpeed: 24 + blend * 18,
      gaitAngularVelocity: Math.PI * 2 * walkSpeed * 0.72,
    };
    animationState = {
      stride: previewUnit.stride,
      bob: previewUnit.bob,
      attack: previewUnit.attackSwing,
      idle: Math.sin((idleTime * Math.PI * 2) + 0.2) * 0.02,
      clipTimes: { idle: idleTime, walk: walkTime, attack: attackTime },
      clipWeights: {
        idle: 1 - blend,
        walk: blend,
        attack: previewUnit.attackSwing > 0.001 ? 1 : 0,
      },
    };
    label = blend < 0.2 ? "Mostly Idle" : blend < 0.65 ? "Walk Blend" : "Attack Blend";
  } else if (selectedClipId === "idle") {
    animationState = {
      ...animationState,
      idle: Math.sin((idleTime * Math.PI * 2) + 0.2) * 0.02,
      clipWeights: { idle: 1, walk: 0, attack: 0 },
    };
    label = "Idle";
  } else if (selectedClipId === "attack") {
    const attackSwing = Math.sin(attackTime * Math.PI);
    previewUnit.attackSwing = attackSwing;
    animationState = {
      ...animationState,
      attack: attackSwing,
      clipWeights: { idle: 0, walk: 0, attack: 1 },
    };
    label = "Attack";
  } else {
    previewUnit = {
      ...previewUnit,
      stride: Math.sin(walkTime * Math.PI * 2),
      bob: 0.5 - Math.cos(walkTime * Math.PI * 4) * 0.5,
      walkTilt: Math.sin(walkTime * Math.PI * 2) * 0.035 * Math.abs(normalizedMotionX),
      vx: normalizedMotionX * 40,
      vy: normalizedMotionY * 40,
      locomotionSpeed: 40,
      gaitAngularVelocity: Math.PI * 2 * (config.clips.walk?.speed || 1) * 0.72,
    };
    animationState = {
      ...animationState,
      stride: previewUnit.stride,
      bob: previewUnit.bob,
      clipWeights: { idle: 0, walk: 1, attack: 0 },
    };
    label = "Walk";
  }
  if (!editor.previewAutoplay) {
    animationState.clipTimes[selectedClipId] = scrubTime ?? 0;
    const frames = selectedClip?.keyframes?.[editor.activePartId] || [];
    const exact = findSpriteRigExactKeyframe(frames, scrubTime ?? 0);
    if (exact) {
      state.spriteRigEditor.keyframePose = normalizeRigKeyframePose(exact.pose);
    }
    animationState.previewKeyframeOverride = {
      clipId: selectedClipId,
      partId: editor.activePartId,
      pose: state.spriteRigEditor.keyframePose,
    };
  }
  return { previewUnit, animationState, label };
}

function renderBattleAccurateSpriteRigPreview(previewCtx, canvas, artifact, previewUnit, animationState) {
  const pointScale = 5.3;
  const renderScale = pointScale * getUnitRenderScale(previewUnit);
  const groundX = canvas.width / 2;
  const groundY = canvas.height * 0.7;
  const gaitBob = previewUnit.bob * 5.5 * pointScale / 2.1;
  const bodyY = groundY - gaitBob;
  const strideMotion = getUnitStrideMotionOffset(previewUnit, pointScale);

  drawBattleAccuratePreviewShadow(previewCtx, groundX, groundY, pointScale, renderScale, previewUnit);
  drawBattleAccuratePreviewReference(previewCtx, bodyY, pointScale);

  previewCtx.save();
  previewCtx.translate(groundX + strideMotion.x, bodyY + strideMotion.y);
  previewCtx.rotate((previewUnit.walkTilt || 0) + (previewUnit.rotation || 0));
  previewCtx.scale(previewUnit.displayFacingX || 1, 1);
  const scene = drawRiggedSpriteFromManifest(previewCtx, artifact.manifest, artifact.canvas, previewUnit, pointScale * getUnitRenderScale(previewUnit), {
    animationState,
    collectPartMetrics: true,
    highlightPartId: state.spriteRigEditor.activePartId,
    dragPartId: state.spriteRigEditor.previewDrag ? state.spriteRigEditor.activePartId : null,
  });
  previewCtx.restore();
  drawSpriteRigPreviewHealthBar(previewCtx, previewUnit, artifact.manifest, groundX, bodyY, pointScale, renderScale);

  return scene
    ? {
      ...scene,
      groundX,
      groundY,
      bodyY,
      pointScale,
      renderScale,
    }
    : null;
}

function drawSpriteRigPreviewHealthBar(previewCtx, previewUnit, manifest, pointX, bodyY, pointScale, renderScale) {
  const unitDef = getUnitDefinition(previewUnit);
  const hpWidth = (unitDef.healthBarWidth || 20) * renderScale / 2.1;
  const base = getHealthBarMetricsForPose(previewUnit, { point: { x: pointX }, bodyY, scale: pointScale }, renderScale, manifest?.layout);
  previewCtx.save();
  previewCtx.fillStyle = "rgba(37,24,16,0.62)";
  previewCtx.fillRect(base.x - hpWidth / 2, base.y, hpWidth, 4 * pointScale / 2.1);
  previewCtx.fillStyle = "#9ae085";
  previewCtx.fillRect(base.x - hpWidth / 2, base.y, hpWidth * 0.82, 4 * pointScale / 2.1);
  previewCtx.restore();
}

function drawBattleAccuratePreviewShadow(previewCtx, groundX, groundY, pointScale, renderScale, previewUnit) {
  previewCtx.save();
  previewCtx.fillStyle = "rgba(0,0,0,0.22)";
  previewCtx.beginPath();
  previewCtx.ellipse(
    groundX,
    groundY + 10 * pointScale / 2.1,
    (10 + Math.abs(previewUnit.stride) * 1.6) * renderScale / 2.1,
    (5 - previewUnit.bob * 0.9) * renderScale / 2.1,
    0,
    0,
    Math.PI * 2,
  );
  previewCtx.fill();
  previewCtx.strokeStyle = "rgba(255, 212, 131, 0.24)";
  previewCtx.lineWidth = 1.5;
  previewCtx.setLineDash([5, 4]);
  previewCtx.stroke();
  previewCtx.restore();
}

function drawBattleAccuratePreviewReference(previewCtx, bodyY, pointScale) {
  const image = state.spriteRigEditor.previewReferenceImage;
  if (!image?.complete) return;
  const layout = UNIT_SPRITE_LAYOUTS.archer || DEFAULT_RIG_LAYOUT;
  const targetHeight = layout.height * pointScale / 2.1;
  const aspectRatio = (image.width || 1) / Math.max(image.height || 1, 1);
  const targetWidth = targetHeight * aspectRatio;
  previewCtx.save();
  previewCtx.globalAlpha = 0.22;
  previewCtx.drawImage(
    image,
    (previewCtx.canvas.width / 2) - targetWidth * layout.anchorX,
    bodyY - targetHeight * layout.anchorY,
    targetWidth,
    targetHeight,
  );
  previewCtx.restore();
}

function updateSpriteRigStatus() {
  if (!els.spriteRigStatus) return;
  const definedParts = RIG_PART_DEFINITIONS.filter((partDef) => state.spriteRigEditor.parts[partDef.id]?.rect);
  const missingRequired = RIG_PART_DEFINITIONS
    .filter((partDef) => !partDef.optional && !state.spriteRigEditor.parts[partDef.id]?.rect)
    .map((partDef) => partDef.label);
  const lines = [
    `Source: ${state.spriteRigEditor.sourceName || "none loaded"}`,
    `Unit: ${getUnitDefinition(state.spriteRigEditor.unitId)?.name || "unset"} (${state.spriteRigEditor.unitId || "unset"})`,
    `Defined parts: ${definedParts.length}/${RIG_PART_DEFINITIONS.length}`,
    missingRequired.length ? `Missing required: ${missingRequired.join(", ")}` : "All required parts are defined.",
    `Health bar offset: (${state.spriteRigEditor.healthBarOffsetX}, ${state.spriteRigEditor.healthBarOffsetY})`,
    `Editing clip: ${getRigAnimationClipDefinition(state.spriteRigEditor.selectedAnimationId).label} | Preview: ${state.spriteRigEditor.previewMode === "composite" ? "runtime blend" : "selected clip"}`,
    `Export directory: ${state.spriteRigEditor.exportDirectoryName || "not chosen yet"}`,
  ];
  const weaponAttachment = state.spriteRigEditor.weaponAttachment;
  if (weaponAttachment?.enabled && weaponAttachment.sourceX != null && weaponAttachment.sourceY != null) {
    lines.push(`Weapon pin: front arm @ (${weaponAttachment.sourceX}, ${weaponAttachment.sourceY}) angle ${weaponAttachment.angleDeg || 0}deg`);
  } else {
    lines.push("Weapon pin: disabled.");
  }
  const keyframeCount = getSpriteRigKeyframesForSelection().length;
  lines.push(`Selected part keyframes: ${keyframeCount}`);
  state.spriteRigEditor.statusText = lines.join("\n");
  els.spriteRigStatus.textContent = state.spriteRigEditor.statusText;
}

function invalidateSpriteRigPackedArtifact() {
  state.spriteRigEditor.packedArtifact = null;
}

function serializeRigAnimationConfig(animationConfig) {
  const normalized = normalizeRigAnimationConfig(animationConfig);
  return {
    tuning: cloneData(normalized.tuning),
    clips: Object.fromEntries(RIG_ANIMATION_CLIP_DEFINITIONS.map((clipDef) => [clipDef.id, {
      speed: normalized.clips[clipDef.id].speed,
      loop: clipDef.loop,
      keyframes: Object.fromEntries(RIG_PART_IDS.map((partId) => [partId, normalized.clips[clipDef.id].keyframes[partId].map((frame) => ({
        time: frame.time,
        pose: normalizeRigKeyframePose(frame.pose),
      }))])),
    }])),
  };
}

function buildSpriteRigWorkshopProject() {
  const editor = state.spriteRigEditor;
  if (!editor.sourceImage || !editor.sourceImageDataUrl) return null;
  return {
    kind: "tbr-sprite-rig-workshop",
    version: 1,
    unitId: editor.unitId || sanitizeRigAssetName(editor.sourceName) || "unit-rig",
    source: {
      name: editor.sourceName,
      fileName: editor.sourceFileName || `${editor.sourceName || "sprite-rig"}.png`,
      mimeType: editor.sourceMimeType || "image/png",
      dataUrl: editor.sourceImageDataUrl,
      width: editor.sourceWidth,
      height: editor.sourceHeight,
    },
    layout: {
      renderHeight: editor.renderHeight,
      anchorY: editor.anchorY,
      healthBarOffsetX: editor.healthBarOffsetX,
      healthBarOffsetY: editor.healthBarOffsetY,
    },
    preview: {
      selectedAnimationId: editor.selectedAnimationId,
      previewMode: editor.previewMode,
      previewBlend: editor.previewBlend,
      previewMotionX: editor.previewMotionX,
      previewMotionY: editor.previewMotionY,
    },
    weaponAttachment: cloneData(editor.weaponAttachment),
    parts: cloneData(editor.parts),
    animations: serializeRigAnimationConfig(editor.animationConfig),
  };
}

async function loadSpriteRigWorkshopProject(project) {
  if (!project || project.kind !== "tbr-sprite-rig-workshop") {
    throw new Error("This file is not a TBR sprite workshop asset.");
  }
  if (!project.source?.dataUrl) {
    throw new Error("Workshop asset is missing its embedded source image.");
  }
  const image = await loadImageAsset(project.source.dataUrl);
  const editor = state.spriteRigEditor;
  applySpriteRigSourceImage(image, {
    sourceName: project.source.name || project.unitId || "sprite-rig",
    fileName: project.source.fileName || `${project.unitId || "sprite-rig"}.png`,
    mimeType: project.source.mimeType || "image/png",
    dataUrl: project.source.dataUrl,
  });
  editor.unitId = project.unitId || editor.unitId;
  editor.renderHeight = clamp(Number(project.layout?.renderHeight) || DEFAULT_RIG_LAYOUT.height, 16, 256);
  editor.anchorY = clamp(Number(project.layout?.anchorY) || DEFAULT_RIG_LAYOUT.anchorY, 0.5, 1.2);
  editor.healthBarOffsetX = Math.round(Number(project.layout?.healthBarOffsetX) || 0);
  editor.healthBarOffsetY = Math.round(Number(project.layout?.healthBarOffsetY) || 0);
  editor.weaponAttachment = {
    ...createEmptyRigWeaponAttachment(),
    ...(project.weaponAttachment || {}),
  };
  editor.parts = normalizeSpriteRigParts(project.parts);
  RIG_PART_IDS.forEach((id) => clampSpriteRigPartToImage(editor.parts[id]));
  editor.animationConfig = normalizeRigAnimationConfig(project.animations);
  editor.selectedAnimationId = project.preview?.selectedAnimationId || "walk";
  editor.previewMode = project.preview?.previewMode || "composite";
  editor.previewBlend = clamp(Number(project.preview?.previewBlend) || 0.55, 0, 1);
  editor.previewMotionX = Number.isFinite(Number(project.preview?.previewMotionX))
    ? clamp(Number(project.preview.previewMotionX), -1, 1)
    : 1;
  editor.previewMotionY = Number.isFinite(Number(project.preview?.previewMotionY))
    ? clamp(Number(project.preview.previewMotionY), -1, 1)
    : 0;
  editor.previewAutoplay = true;
  editor.previewTime = 0;
  editor.activePartId = "body";
  editor.keyframePose = createDefaultSpriteRigKeyframePoseState();
  clampSpriteRigWeaponAttachmentToImage();
  invalidateSpriteRigPackedArtifact();
  els.spriteRigUnitSelect.value = editor.unitId;
  els.spriteRigRenderHeight.value = `${editor.renderHeight}`;
  els.spriteRigAnchorY.value = `${editor.anchorY}`;
  els.spriteRigHealthBarOffsetX.value = `${editor.healthBarOffsetX}`;
  els.spriteRigHealthBarOffsetY.value = `${editor.healthBarOffsetY}`;
  els.spriteRigPreviewBlend.value = `${Math.round(editor.previewBlend * 100)}`;
  if (els.spriteRigPreviewMotionX) els.spriteRigPreviewMotionX.value = `${editor.previewMotionX}`;
  if (els.spriteRigPreviewMotionY) els.spriteRigPreviewMotionY.value = `${editor.previewMotionY}`;
  renderSpriteRigPartPicker();
  syncSpriteRigFields();
  syncSpriteRigWeaponFields();
  syncSpriteRigAnimationControls();
  updateSpriteRigZoomLabel();
  updateSpriteRigStatus();
  renderSpriteRigSourceCanvas();
  renderSpriteRigPreview();
}

function buildSpriteRigManifestFromEditor() {
  const editor = state.spriteRigEditor;
  const body = editor.parts.body;
  if (!body?.rect || !body?.pivot) return null;
  const armFront = editor.parts.armFront;
  const bodyPivot = body?.pivot || { x: 0, y: 0 };
  const partRects = RIG_PART_IDS
    .map((id) => editor.parts[id]?.rect)
    .filter(Boolean);
  const maxDimension = partRects.reduce((max, rect) => Math.max(max, rect.w, rect.h), 0);
  const cellSize = Math.max(48, Math.ceil((maxDimension + 16) / 16) * 16 || 64);
  const parts = {};
  RIG_PART_IDS.forEach((id, index) => {
    const part = editor.parts[id];
    if (!part?.rect || !part.pivot) return;
    const parentId = getRigPartDefinition(id)?.parentId || null;
    const parentPivot = parentId
      ? (editor.parts[parentId]?.pivot || bodyPivot)
      : bodyPivot;
    const frameX = Math.round((cellSize - part.rect.w) / 2);
    const frameY = Math.round((cellSize - part.rect.h) / 2);
    parts[id] = {
      cell: index,
      parentId,
      frame: { x: frameX, y: frameY, w: part.rect.w, h: part.rect.h },
      pivot: {
        x: part.pivot.x - part.rect.x,
        y: part.pivot.y - part.rect.y,
      },
      mount: {
        x: part.pivot.x - parentPivot.x + (part.mountOffset?.x || 0),
        y: part.pivot.y - parentPivot.y + (part.mountOffset?.y || 0),
      },
      mountOffset: {
        x: part.mountOffset?.x || 0,
        y: part.mountOffset?.y || 0,
      },
      scaleX: clamp(Number(part.scaleX) || 1, 0.05, 8),
      scaleY: clamp(Number(part.scaleY) || 1, 0.05, 8),
      rotationOffsetDeg: Number(part.rotationOffsetDeg) || 0,
      drawOrder: Number.isFinite(Number(part.drawOrder)) ? Math.round(Number(part.drawOrder)) : getRigPartBaseDrawOrder(id),
      flipX: Boolean(part.flipX),
      flipY: Boolean(part.flipY),
      sourceRect: { ...part.rect },
      sourcePivot: { ...part.pivot },
    };
  });
  const manifest = {
    version: 2,
    unitId: editor.unitId || sanitizeRigAssetName(editor.sourceName) || "unit-rig",
    layout: {
      height: editor.renderHeight,
      anchorX: DEFAULT_RIG_LAYOUT.anchorX,
      anchorY: editor.anchorY,
      healthBarOffsetX: editor.healthBarOffsetX,
      healthBarOffsetY: editor.healthBarOffsetY,
    },
    sourceSize: {
      width: editor.sourceWidth,
      height: editor.sourceHeight,
    },
    sheet: {
      image: `${editor.unitId || sanitizeRigAssetName(editor.sourceName) || "unit-rig"}.png`,
      cellSize,
      columns: 4,
      rows: Math.ceil(RIG_PART_IDS.length / 4),
      order: [...RIG_PART_IDS],
    },
    animations: serializeRigAnimationConfig(editor.animationConfig),
    parts,
  };
  if (
    editor.weaponAttachment?.enabled
    && armFront?.rect
    && typeof editor.weaponAttachment.sourceX === "number"
    && typeof editor.weaponAttachment.sourceY === "number"
  ) {
    manifest.weaponAttachment = {
      partId: "armFront",
      x: Math.round(editor.weaponAttachment.sourceX - armFront.rect.x),
      y: Math.round(editor.weaponAttachment.sourceY - armFront.rect.y),
      angleDeg: Math.round(editor.weaponAttachment.angleDeg || 0),
    };
  }
  return manifest;
}

function buildSpriteRigSheetCanvas() {
  const editor = state.spriteRigEditor;
  if (!editor.sourceImage) return null;
  if (editor.packedArtifact) return editor.packedArtifact;
  const manifest = buildSpriteRigManifestFromEditor();
  if (!manifest) return null;
  const sheetCanvas = document.createElement("canvas");
  sheetCanvas.width = manifest.sheet.columns * manifest.sheet.cellSize;
  sheetCanvas.height = manifest.sheet.rows * manifest.sheet.cellSize;
  const sheetCtx = sheetCanvas.getContext("2d");
  manifest.sheet.order.forEach((id) => {
    const part = manifest.parts[id];
    if (!part) return;
    const cellX = (part.cell % manifest.sheet.columns) * manifest.sheet.cellSize;
    const cellY = Math.floor(part.cell / manifest.sheet.columns) * manifest.sheet.cellSize;
    sheetCtx.drawImage(
      editor.sourceImage,
      part.sourceRect.x,
      part.sourceRect.y,
      part.sourceRect.w,
      part.sourceRect.h,
      cellX + part.frame.x,
      cellY + part.frame.y,
      part.frame.w,
      part.frame.h,
    );
  });
  editor.packedArtifact = { canvas: sheetCanvas, manifest };
  return editor.packedArtifact;
}

async function downloadSpriteRigArtifact(kind) {
  const artifact = buildSpriteRigSheetCanvas();
  if (!artifact) {
    els.spriteRigStatus.textContent = "Define at least the body region and pivot before exporting.";
    return;
  }
  const fileStem = artifact.manifest.unitId || "unit-rig";
  if (kind === "sheet") {
    const blob = await new Promise((resolve) => artifact.canvas.toBlob(resolve, "image/png"));
    triggerBlobDownload(blob, `${fileStem}.png`);
    return;
  }
  const jsonBlob = new Blob([JSON.stringify(stripEditorFieldsFromManifest(artifact.manifest), null, 2)], { type: "application/json" });
  triggerBlobDownload(jsonBlob, `${fileStem}.json`);
}

async function chooseSpriteRigExportDirectory() {
  if (!window.showDirectoryPicker) {
    els.spriteRigStatus.textContent = "Choosing an export directory needs a Chromium browser with the File System Access API.";
    return null;
  }
  try {
    const directoryHandle = await window.showDirectoryPicker();
    state.spriteRigEditor.exportDirectoryHandle = directoryHandle;
    state.spriteRigEditor.exportDirectoryName = directoryHandle.name || "";
    updateSpriteRigStatus();
    return directoryHandle;
  } catch (error) {
    if (error?.name !== "AbortError") {
      els.spriteRigStatus.textContent = `Could not choose export directory: ${error.message || error}`;
    }
    return null;
  }
}

async function ensureSpriteRigSubdirectory(directoryHandle, name) {
  return directoryHandle.getDirectoryHandle(name, { create: true });
}

async function writeBlobToDirectory(directoryHandle, filename, blob) {
  const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();
}

async function writeTextToDirectory(directoryHandle, filename, text) {
  const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
}

function getSpriteRigProjectStem() {
  return state.spriteRigEditor.unitId || sanitizeRigAssetName(state.spriteRigEditor.sourceName) || "unit-rig";
}

async function writeSpriteRigWorkshopSourceCopy(directoryHandle) {
  const editor = state.spriteRigEditor;
  if (!editor.sourceImageDataUrl) return null;
  const sourceDir = await ensureSpriteRigSubdirectory(directoryHandle, RIG_WORKSHOP_SOURCE_DIR);
  const sourceFileName = `${getSpriteRigProjectStem()}-source${(editor.sourceFileName.match(/\.[^.]+$/) || [".png"])[0]}`;
  const response = await fetch(editor.sourceImageDataUrl);
  const blob = await response.blob();
  await writeBlobToDirectory(sourceDir, sourceFileName, blob);
  return `${RIG_WORKSHOP_SOURCE_DIR}/${sourceFileName}`;
}

async function saveSpriteRigWorkshopAsset() {
  const project = buildSpriteRigWorkshopProject();
  if (!project) {
    els.spriteRigStatus.textContent = "Load a source sprite before saving a workshop asset.";
    return;
  }
  const directoryHandle = state.spriteRigEditor.exportDirectoryHandle;
  const filename = `${project.unitId}${RIG_WORKSHOP_FILE_EXTENSION}`;
  if (directoryHandle) {
    try {
      const sourcePath = await writeSpriteRigWorkshopSourceCopy(directoryHandle);
      const projectWithSourceCopy = {
        ...project,
        source: {
          ...project.source,
          localCopy: sourcePath,
        },
      };
      await writeTextToDirectory(directoryHandle, filename, JSON.stringify(projectWithSourceCopy, null, 2));
      els.spriteRigStatus.textContent = `Saved workshop asset ${filename} to ${state.spriteRigEditor.exportDirectoryName || "the selected directory"}.`;
      return;
    } catch (error) {
      els.spriteRigStatus.textContent = `Could not save workshop asset: ${error.message || error}`;
      return;
    }
  }
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  triggerBlobDownload(blob, filename);
  els.spriteRigStatus.textContent = `Downloaded workshop asset ${filename}.`;
}

async function exportSpriteRigToDirectory() {
  const artifact = buildSpriteRigSheetCanvas();
  if (!artifact) {
    els.spriteRigStatus.textContent = "Define at least the body region and pivot before exporting.";
    return;
  }
  try {
    const directoryHandle = state.spriteRigEditor.exportDirectoryHandle || await chooseSpriteRigExportDirectory();
    if (!directoryHandle) return;
    const pngBlob = await new Promise((resolve) => artifact.canvas.toBlob(resolve, "image/png"));
    await writeBlobToDirectory(directoryHandle, `${artifact.manifest.unitId}.png`, pngBlob);
    await writeTextToDirectory(directoryHandle, `${artifact.manifest.unitId}.json`, JSON.stringify(stripEditorFieldsFromManifest(artifact.manifest), null, 2));
    await saveSpriteRigWorkshopAsset();
    els.spriteRigStatus.textContent = `Exported ${artifact.manifest.unitId}.png, ${artifact.manifest.unitId}.json, and the workshop asset to ${state.spriteRigEditor.exportDirectoryName || "the selected directory"}.`;
  } catch (error) {
    if (error?.name !== "AbortError") {
      els.spriteRigStatus.textContent = `Directory export failed: ${error.message || error}`;
    }
  }
}

function triggerBlobDownload(blob, filename) {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function stripEditorFieldsFromManifest(manifest) {
  return {
    ...manifest,
    animations: serializeRigAnimationConfig(manifest.animations),
    parts: Object.fromEntries(Object.entries(manifest.parts).map(([id, part]) => [id, {
      cell: part.cell,
      parentId: part.parentId,
      frame: part.frame,
      pivot: part.pivot,
      mount: part.mount,
      mountOffset: part.mountOffset,
      scaleX: part.scaleX,
      scaleY: part.scaleY,
      rotationOffsetDeg: part.rotationOffsetDeg,
      drawOrder: part.drawOrder,
      flipX: part.flipX,
      flipY: part.flipY,
      sourceRect: part.sourceRect,
      sourcePivot: part.sourcePivot,
    }])),
  };
}

function renderSpeedControls() {
  els.speedControls.innerHTML = "";
  const pauseButton = document.createElement("button");
  const canResume = state.battle && state.battle.time > 0;
  pauseButton.className = `speed-btn${!state.running && canResume ? " active" : ""}`;
  pauseButton.textContent = "Pause";
  pauseButton.title = state.running
    ? (state.battle?.completed ? "Pause the battlefield aftermath review" : "Pause the current battle")
    : (state.battle?.completed ? "Resume the battlefield aftermath review" : "Resume the current battle");
  pauseButton.disabled = !state.battle || (!state.running && !canResume);
  pauseButton.addEventListener("click", togglePauseBattle);
  els.speedControls.appendChild(pauseButton);
  SPEED_OPTIONS.forEach((speed, index) => {
    const button = document.createElement("button");
    button.className = `speed-btn${index === state.speedIndex && !state.hover.inspectSlowActive && !state.battle?.completed ? " active" : ""}`;
    button.textContent = `${index + 1}`;
    button.title = state.battle?.completed
      ? `${POST_BATTLE_REVIEW_SPEED.toFixed(2)}x aftermath review speed is locked while the battle result is on screen`
      : `${speed.toFixed(2)}x simulation speed`;
    button.disabled = Boolean(state.battle?.completed);
    button.addEventListener("click", () => {
      state.speedIndex = index;
      renderSpeedControls();
    });
    els.speedControls.appendChild(button);
  });

  const cameraModeButton = document.createElement("button");
  cameraModeButton.className = "speed-btn active";
  cameraModeButton.innerHTML = `Camera Mode:<br>${getCameraModeLabel(state.camera.mode)}`;
  cameraModeButton.title = getCameraModeTitle(state.camera.mode);
  cameraModeButton.addEventListener("click", () => {
    cycleCameraMode();
    renderSpeedControls();
  });
  els.speedControls.appendChild(cameraModeButton);
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

const CAMERA_MODE_ORDER = ["fit", "cinematic", "manual"];

function getCameraModeLabel(mode) {
  if (mode === "cinematic") return "Cinematic";
  if (mode === "manual") return "Manual";
  return "Frame All";
}

function getCameraModeTitle(mode) {
  if (mode === "cinematic") return "Slowly fly between battlefield points of interest";
  if (mode === "manual") return "Never recenter automatically; keep camera control in the player's hands";
  return "Keep the full battle framed";
}

function getBattleSpeedMultiplier() {
  if (state.battle?.completed) return POST_BATTLE_REVIEW_SPEED;
  if (state.hover.inspectSlowActive) return SHIFT_INSPECT_SPEED;
  return SPEED_OPTIONS[state.speedIndex];
}

function cycleCameraMode() {
  const currentIndex = CAMERA_MODE_ORDER.indexOf(state.camera.mode);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % CAMERA_MODE_ORDER.length : 0;
  state.camera.mode = CAMERA_MODE_ORDER[nextIndex];
  state.camera.manualUntil = 0;
  state.camera.targetX = state.camera.x;
  state.camera.targetY = state.camera.y;
  state.camera.targetZoom = state.camera.zoom;
  resetCinematicCameraState();
}

function createEmptyComposition() {
  return Object.fromEntries(UNIT_LIBRARY.map((unit) => [unit.id, 0]));
}

function createRandomComposition(draws = 8) {
  const composition = createEmptyComposition();
  if (!UNIT_LIBRARY.length || draws <= 0) return composition;
  for (let index = 0; index < draws; index += 1) {
    const selectedUnits = UNIT_LIBRARY.filter((unit) => composition[unit.id] > 0);
    const canAddNewUnitType = selectedUnits.length < MAX_COMPOSITION_UNIT_TYPES;
    const unselectedUnits = canAddNewUnitType
      ? UNIT_LIBRARY.filter((unit) => composition[unit.id] <= 0)
      : [];
    const rollSlots = selectedUnits.length + (unselectedUnits.length ? 1 : 0);
    if (!rollSlots) break;
    const roll = Math.floor(Math.random() * rollSlots);
    if (roll < selectedUnits.length) {
      composition[selectedUnits[roll].id] += 1;
      continue;
    }
    const nextUnit = unselectedUnits[Math.floor(Math.random() * unselectedUnits.length)];
    if (nextUnit) composition[nextUnit.id] += 1;
  }
  return composition;
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
  const result = createEmptyComposition();
  const selectedUnitIds = [];

  Object.entries(mix || {}).forEach(([rawKey, rawValue]) => {
    const unitId = resolveUnitId(rawKey);
    if (!unitId) return;
    const value = clampInt(rawValue, 0, 999);
    if (value <= 0) return;
    if (!selectedUnitIds.includes(unitId)) {
      if (selectedUnitIds.length >= MAX_COMPOSITION_UNIT_TYPES) return;
      selectedUnitIds.push(unitId);
    }
    result[unitId] = value;
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


function getUnitIconMarkup(unitId) {
  return `
    <svg class="unit-icon-svg unit-${unitId}" viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">
      ${getUnitIconSvgPaths(unitId)}
    </svg>
  `;
}

function getUnitVisualMarkup(unitId) {
  return `
    <div class="unit-icon-visual" data-unit-visual="${unitId}">
      ${getUnitIconMarkup(unitId)}
    </div>
  `;
}

function getUnitIconSvgPaths(unitId) {
  return getUnitDefinition(unitId)?.iconPaths?.() || getKnightIconSvgPaths();
}

function getArcherIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -13 L10 -3 L8 12 L-8 12 L-10 -3 Z"></path>
    <circle cx="0" cy="-15" r="5.2" fill="rgba(255,255,255,0.58)"></circle>
    <path d="M10 -1 A8 8 0 0 1 10 11" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.2" stroke-linecap="round"></path>
  `;
}

function getMageIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -15 L11 10 L-11 10 Z"></path>
    <circle cx="0" cy="-15" r="5" fill="rgba(255,255,255,0.58)"></circle>
    <path d="M8 -4 L15 -16" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.2" stroke-linecap="round"></path>
    <circle cx="16" cy="-18" r="3" fill="#c4f2ff"></circle>
  `;
}

function getMedicIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -12 L9 -2 L6 11 L-6 11 L-9 -2 Z"></path>
    <circle cx="0" cy="-13" r="4.7" fill="rgba(255,255,255,0.58)"></circle>
    <path d="M0 -2 L0 6 M-4 2 L4 2" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.2" stroke-linecap="round"></path>
  `;
}

function getBardIconSvgPaths() {
  return `
    <path fill="rgba(69, 48, 34, 0.94)" d="M0 -15 L10 -5 L8 12 L-8 12 L-10 -5 Z"></path>
    <path fill="currentColor" d="M0 -12 L7 -4 L6 10 L-6 10 L-7 -4 Z"></path>
    <circle cx="0" cy="-13.5" r="4.8" fill="rgba(255,248,233,0.72)"></circle>
    <path d="M8 -7 L8 2" fill="none" stroke="rgba(88,61,38,0.95)" stroke-width="2" stroke-linecap="round"></path>
    <path d="M8 -7 Q13 -9 16 -4 Q13 0 8 -1" fill="none" stroke="rgba(236, 196, 120, 0.95)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="13.5" cy="-14.5" r="1.8" fill="#8fd8ff"></circle>
    <circle cx="16.5" cy="-11.2" r="1.6" fill="#ffcf8b"></circle>
  `;
}

function getBomberIconSvgPaths() {
  return `
    <ellipse cx="0" cy="1" rx="10" ry="12" fill="currentColor"></ellipse>
    <circle cx="0" cy="-12" r="5" fill="rgba(255,255,255,0.58)"></circle>
    <circle cx="11" cy="2" r="5" fill="#2c2217"></circle>
    <path d="M12 -2 L16 -8" fill="none" stroke="#f0ad62" stroke-width="2.2" stroke-linecap="round"></path>
  `;
}

function getAssassinIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -15 L10 -6 L7 12 L-7 12 L-10 -6 Z"></path>
    <path fill="rgba(0,0,0,0.26)" d="M-8 -4 L0 -12 L8 -4 L8 1 L-8 1 Z"></path>
    <circle cx="0" cy="-14" r="5.1" fill="rgba(255,255,255,0.42)"></circle>
    <path d="M-12 4 L-18 12 M12 4 L18 12" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.1" stroke-linecap="round"></path>
  `;
}

function getKnightIconSvgPaths() {
  return `
    <ellipse cx="0" cy="1" rx="11" ry="14" fill="currentColor"></ellipse>
    <circle cx="0" cy="-13" r="5.6" fill="rgba(255,255,255,0.58)"></circle>
    <path d="M9 -3 L16 -17" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.4" stroke-linecap="round"></path>
  `;
}

function getPaladinIconSvgPaths() {
  return `
    <path fill="rgba(111, 79, 36, 0.98)" d="M0 -16 L10 -6 L8 12 L-8 12 L-10 -6 Z"></path>
    <path fill="currentColor" d="M0 -13 L7 -5 L6 11 L-6 11 L-7 -5 Z"></path>
    <circle cx="0" cy="-14" r="5.2" fill="rgba(255,246,224,0.76)"></circle>
    <path d="M0 -3 L0 8 M-4 2.5 L4 2.5" fill="none" stroke="rgba(255, 238, 190, 0.94)" stroke-width="2" stroke-linecap="round"></path>
    <path d="M10 -3 L16 -17" fill="none" stroke="rgba(85,58,27,0.95)" stroke-width="2.2" stroke-linecap="round"></path>
    <path d="M13 -15 L18 -11 L14 -5 L9 -8 Z" fill="#d8d8db"></path>
  `;
}

function getBodyguardIconSvgPaths() {
  return `
    <path fill="rgba(0,0,0,0.22)" d="M0 -2 L12 4 L10 12 L-10 12 L-12 4 Z"></path>
    <path fill="currentColor" d="M0 -12 L9 -4 L8 12 L-8 12 L-9 -4 Z"></path>
    <circle cx="0" cy="-14" r="5.2" fill="rgba(255,255,255,0.6)"></circle>
    <path d="M0 -2 L0 8 M-4 2 L4 2" fill="none" stroke="rgba(226,247,255,0.9)" stroke-width="1.8" stroke-linecap="round"></path>
    <path d="M10 -1 L16 -14" fill="none" stroke="rgba(72,48,25,0.94)" stroke-width="2.2" stroke-linecap="round"></path>
  `;
}

function getMountainManIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -16 L12 -4 L9 12 L-9 12 L-12 -4 Z"></path>
    <path fill="rgba(40,84,45,0.4)" d="M-8 -3 L0 -10 L8 -3 L7 8 L-7 8 Z"></path>
    <circle cx="0" cy="-15" r="5" fill="rgba(229,255,231,0.72)"></circle>
    <path d="M10 -4 L16 -16" fill="none" stroke="rgba(44,34,20,0.92)" stroke-width="2.2" stroke-linecap="round"></path>
    <circle cx="17" cy="-18" r="3" fill="#9ff2a4"></circle>
  `;
}

function getCatapultIconSvgPaths() {
  return `
    <path d="M-13 10 L13 10" fill="none" stroke="rgba(82,54,28,0.95)" stroke-width="4" stroke-linecap="round"></path>
    <path d="M-7 10 L2 -8 L11 10" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="-8" cy="10" r="5.3" fill="rgba(108,76,42,0.95)"></circle>
    <circle cx="10" cy="10" r="5.3" fill="rgba(108,76,42,0.95)"></circle>
    <circle cx="5" cy="-12" r="4" fill="#8a8477"></circle>
  `;
}

function getPoisonerIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -16 L8 -7 L6 10 L-6 10 L-8 -7 Z"></path>
    <rect x="-4" y="-20" width="8" height="5" rx="2" fill="rgba(232,255,233,0.78)"></rect>
    <path d="M-7 2 Q0 12 7 2" fill="rgba(52, 121, 55, 0.36)"></path>
    <circle cx="0" cy="-11" r="4.2" fill="rgba(255,255,255,0.38)"></circle>
  `;
}

function getFirebreatherIconSvgPaths() {
  return `
    <path fill="currentColor" d="M-8 10 L-6 -6 L2 -12 L10 -6 L8 10 Z"></path>
    <circle cx="-1" cy="-12" r="5.1" fill="rgba(255,240,222,0.72)"></circle>
    <path d="M6 -6 Q15 -6 18 0 Q12 2 8 6" fill="#ffb055"></path>
    <path d="M8 -4 Q13 -3 15 0 Q11 1 8 4" fill="#fff0b3"></path>
  `;
}

function getNecromancerIconSvgPaths() {
  return `
    <path fill="rgba(24, 15, 33, 0.98)" d="M0 -20 L8 -12 L12 -2 L10 12 L4 10 L1 14 L-2 10 L-9 12 L-11 -2 L-8 -12 Z"></path>
    <path fill="currentColor" d="M0 -16 L7 -10 L9 -2 L7 10 L2 8 L0 12 L-2 8 L-7 10 L-9 -2 L-7 -10 Z"></path>
    <path fill="rgba(9, 6, 14, 0.72)" d="M-8 -2 L-14 4 L-12 8 L-7 7 Z"></path>
    <path fill="rgba(9, 6, 14, 0.72)" d="M8 -2 L14 4 L12 8 L7 7 Z"></path>
    <path fill="rgba(235, 229, 220, 0.92)" d="M0 -17 L4 -13 L4 -8 L1 -4 L-1 -4 L-4 -8 L-4 -13 Z"></path>
    <path fill="rgba(60, 255, 172, 0.9)" d="M-3 -11 L-1 -10 L-2 -8.2 L-4.2 -9 Z"></path>
    <path fill="rgba(60, 255, 172, 0.9)" d="M3 -11 L1 -10 L2 -8.2 L4.2 -9 Z"></path>
    <path fill="rgba(88, 40, 124, 0.8)" d="M-1 -4 L1 -4 L1 -1 L3 2 L0 5 L-3 2 L-1 -1 Z"></path>
    <path d="M9 -3 L18 -17" fill="none" stroke="rgba(32,20,44,0.95)" stroke-width="2.4" stroke-linecap="round"></path>
    <path d="M16 -18 L19 -13 L17 -6 L12 -9 L12 -15 Z" fill="#a47ae0"></path>
  `;
}

function getGraverobberIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -14 L9 -5 L8 11 L-7 12 L-10 -4 Z"></path>
    <circle cx="-1" cy="-14" r="4.7" fill="rgba(255,243,223,0.68)"></circle>
    <path d="M8 -4 L16 -14" fill="none" stroke="rgba(84,58,32,0.94)" stroke-width="2.2" stroke-linecap="round"></path>
    <path d="M14 -16 Q18 -12 16 -7 L11 -9 Q12 -14 14 -16 Z" fill="#b8b4ac"></path>
  `;
}

function getArachnomistIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -16 L10 -7 L8 12 L-8 12 L-10 -7 Z"></path>
    <circle cx="0" cy="-15" r="4.8" fill="rgba(245, 244, 255, 0.72)"></circle>
    <path d="M-12 -4 L-18 -9 M12 -4 L18 -9 M-13 6 L-19 10 M13 6 L19 10" fill="none" stroke="rgba(56,32,24,0.9)" stroke-width="1.9" stroke-linecap="round"></path>
    <circle cx="13" cy="-10" r="4.2" fill="#26181a"></circle>
    <circle cx="11.5" cy="-11" r="1.1" fill="#b8ff72"></circle>
  `;
}

function getKriegerIconSvgPaths() {
  return `
    <ellipse cx="0" cy="2" rx="13" ry="15" fill="currentColor"></ellipse>
    <path fill="rgba(70, 41, 27, 0.38)" d="M-12 -1 Q0 10 12 -1 L9 10 L-9 10 Z"></path>
    <circle cx="0" cy="-14" r="6.2" fill="rgba(255, 238, 220, 0.58)"></circle>
    <path d="M-12 2 L-18 12 M12 2 L18 12" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.5" stroke-linecap="round"></path>
    <path d="M-4 -15 L-8 -20 M4 -15 L8 -20" fill="none" stroke="rgba(78,40,18,0.92)" stroke-width="2.4" stroke-linecap="round"></path>
  `;
}

function getHuntsmanIconSvgPaths() {
  return `
    <path fill="rgba(52, 41, 28, 0.96)" d="M0 -16 L10 -6 L8 12 L-8 12 L-10 -6 Z"></path>
    <path fill="currentColor" d="M0 -13 L7 -5 L6 11 L-6 11 L-7 -5 Z"></path>
    <circle cx="0" cy="-14" r="4.8" fill="rgba(255,248,235,0.72)"></circle>
    <path d="M8 -3 L17 -8" fill="none" stroke="rgba(77,54,31,0.95)" stroke-width="2.2" stroke-linecap="round"></path>
    <path d="M16 -9 L20 -5 L12 -1 Z" fill="#cfc7bb"></path>
    <path d="M-9 -1 L-15 -7 L-14 6 L-8 10 L-4 3 Z" fill="none" stroke="rgba(185, 224, 236, 0.92)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M-11 -4 L-6 1 M-13 0 L-5 5 M-12 7 L-7 2" fill="none" stroke="rgba(185, 224, 236, 0.82)" stroke-width="1.1" stroke-linecap="round"></path>
  `;
}

function getArtificerIconSvgPaths() {
  return `
    <path fill="rgba(79, 63, 38, 0.96)" d="M0 -16 L10 -6 L8 12 L-8 12 L-10 -6 Z"></path>
    <path fill="currentColor" d="M0 -13 L7 -5 L6 10 L-6 10 L-7 -5 Z"></path>
    <path fill="#f3c44f" d="M-6 -17 Q0 -22 6 -17 L5 -12 L-5 -12 Z"></path>
    <rect x="-6.5" y="-13.2" width="13" height="2.6" rx="1.3" fill="#d49b2d"></rect>
    <circle cx="0" cy="-11" r="4.6" fill="rgba(255,244,222,0.72)"></circle>
    <path d="M8 -4 L15 -11" fill="none" stroke="rgba(88,70,46,0.95)" stroke-width="2.1" stroke-linecap="round"></path>
    <path d="M14 -12 Q18 -13 18 -9 Q16 -7 13 -8" fill="none" stroke="rgba(202, 214, 220, 0.95)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
  `;
}

function getPhantomIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -17 Q10 -16 11 -5 L11 8 Q8 5 5 8 Q2 11 0 8 Q-2 11 -5 8 Q-8 5 -11 8 L-11 -5 Q-10 -16 0 -17 Z"></path>
    <path fill="rgba(255,255,255,0.32)" d="M0 -21 Q7 -19 8 -11 Q3 -13 0 -13 Q-3 -13 -8 -11 Q-7 -19 0 -21 Z"></path>
    <circle cx="-4.5" cy="-6.5" r="1.6" fill="#eff8ff"></circle>
    <circle cx="4.5" cy="-6.5" r="1.6" fill="#eff8ff"></circle>
    <path d="M-4 -1 Q0 2 4 -1" fill="none" stroke="rgba(239, 248, 255, 0.92)" stroke-width="1.6" stroke-linecap="round"></path>
  `;
}

function getTurretIconSvgPaths() {
  return `
    <rect x="-9" y="-1" width="18" height="10" rx="3" fill="currentColor"></rect>
    <rect x="-4" y="-11" width="8" height="10" rx="2" fill="rgba(119, 101, 67, 0.95)"></rect>
    <path d="M4 -7 L16 -11" fill="none" stroke="rgba(255, 232, 192, 0.92)" stroke-width="2.3" stroke-linecap="round"></path>
    <path d="M-6 9 L0 15 L6 9" fill="none" stroke="rgba(78,40,18,0.9)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></path>
  `;
}

function getSpiderSwarmIconSvgPaths() {
  return `
    <ellipse cx="0" cy="2" rx="7.5" ry="5.5" fill="currentColor"></ellipse>
    <circle cx="-4" cy="-2" r="3.2" fill="currentColor"></circle>
    <circle cx="4.5" cy="-1.5" r="3.1" fill="currentColor"></circle>
    <path d="M-6 -1 L-15 -6 M6 -1 L15 -6 M-7 4 L-16 8 M7 4 L16 8" fill="none" stroke="rgba(43,26,16,0.92)" stroke-width="1.9" stroke-linecap="round"></path>
  `;
}

function getInkLordIconSvgPaths() {
  return `
    <path fill="currentColor" d="M0 -18 L13 -7 L11 14 L-11 14 L-13 -7 Z"></path>
    <path fill="rgba(255,255,255,0.14)" d="M0 -24 L5 -17 L0 -10 L-5 -17 Z"></path>
    <path d="M11 -4 L19 -20" fill="none" stroke="rgba(236,226,255,0.92)" stroke-width="2.4" stroke-linecap="round"></path>
    <path d="M-6 4 L6 4" fill="none" stroke="rgba(236,226,255,0.76)" stroke-width="2" stroke-linecap="round"></path>
  `;
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, Math.round(Number(value) || 0)));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeTournamentConfig(config = {}) {
  const maxFactionsPerHeat = clampInt(
    config.maxFactionsPerHeat ?? DEFAULT_TOURNAMENT_CONFIG.maxFactionsPerHeat,
    2,
    MAX_TOURNAMENT_HEAT_FACTIONS,
  );
  return {
    collapsed: config.collapsed !== false,
    minFactionsPerHeat: clampInt(
      config.minFactionsPerHeat ?? DEFAULT_TOURNAMENT_CONFIG.minFactionsPerHeat,
      2,
      maxFactionsPerHeat,
    ),
    maxFactionsPerHeat,
    maxUnitsOnBattlefield: clampInt(
      config.maxUnitsOnBattlefield ?? DEFAULT_TOURNAMENT_CONFIG.maxUnitsOnBattlefield,
      0,
      MAX_BATTLEFIELD_UNIT_CAP,
    ),
    paperbackOnly: config.paperbackOnly === true,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    state.factions = (saved.factions || []).map(withFactionDefaults);
    state.roundsApplied = saved.roundsApplied || 0;
    state.tournamentConfig = normalizeTournamentConfig(saved.tournamentConfig);
    state.useRiggedSprites = saved.useRiggedSprites !== false;
    state.useTerrainTexturing = saved.useTerrainTexturing !== false;
    state.useUnitOverlapShadows = saved.useUnitOverlapShadows !== false;
    state.alwaysShowHealthbars = saved.alwaysShowHealthbars === true;
    state.showRenderDebug = saved.showRenderDebug === true;
    state.propResizeMode = saved.propResizeMode === true;
    state.propScaleOverrides = typeof saved.propScaleOverrides === "object" && saved.propScaleOverrides
      ? saved.propScaleOverrides
      : {};
  } catch {
    state.factions = [];
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    factions: state.factions,
    roundsApplied: state.roundsApplied,
    tournamentConfig: state.tournamentConfig,
    useRiggedSprites: state.useRiggedSprites,
    useTerrainTexturing: state.useTerrainTexturing,
    useUnitOverlapShadows: state.useUnitOverlapShadows,
    alwaysShowHealthbars: state.alwaysShowHealthbars,
    showRenderDebug: state.showRenderDebug,
    propResizeMode: state.propResizeMode,
    propScaleOverrides: state.propScaleOverrides,
  }));
  syncTournamentViewState(true);
}

function toggleTournamentConfigPanel() {
  state.tournamentConfig = normalizeTournamentConfig({
    ...state.tournamentConfig,
    collapsed: !state.tournamentConfig.collapsed,
  });
  renderTournamentConfigPanel();
  saveState();
}

function commitTournamentConfigFromInputs() {
  const nextConfig = normalizeTournamentConfig({
    ...state.tournamentConfig,
    minFactionsPerHeat: els.tournamentMinFactionsInput?.value,
    maxFactionsPerHeat: els.tournamentMaxFactionsInput?.value,
    maxUnitsOnBattlefield: els.tournamentMaxUnitsInput?.value,
    paperbackOnly: Boolean(els.tournamentPaperbackOnlyInput?.checked),
  });
  const changed = JSON.stringify(nextConfig) !== JSON.stringify(state.tournamentConfig);
  state.tournamentConfig = nextConfig;
  renderTournamentConfigPanel();
  saveState();
  if (changed) resetBattle({ regenerateTerrain: false });
}

function renderTournamentConfigPanel() {
  if (!els.toggleTournamentConfigBtn) return;
  const config = normalizeTournamentConfig(state.tournamentConfig);
  state.tournamentConfig = config;
  els.toggleTournamentConfigBtn.textContent = config.collapsed ? "Expand" : "Collapse";
  els.toggleTournamentConfigBtn.setAttribute("aria-expanded", String(!config.collapsed));
  els.tournamentConfigBody?.classList.toggle("hidden", config.collapsed);
  if (els.tournamentMinFactionsInput) {
    els.tournamentMinFactionsInput.value = String(config.minFactionsPerHeat);
    els.tournamentMinFactionsInput.max = String(config.maxFactionsPerHeat);
  }
  if (els.tournamentMaxFactionsInput) {
    els.tournamentMaxFactionsInput.value = String(config.maxFactionsPerHeat);
  }
  if (els.tournamentMaxUnitsInput) {
    els.tournamentMaxUnitsInput.value = String(config.maxUnitsOnBattlefield);
  }
  if (els.tournamentPaperbackOnlyInput) {
    els.tournamentPaperbackOnlyInput.checked = config.paperbackOnly === true;
  }
  if (els.tournamentConfigSummary) {
    const heatText = config.minFactionsPerHeat === config.maxFactionsPerHeat
      ? `${config.maxFactionsPerHeat} factions per heat`
      : `${config.minFactionsPerHeat}-${config.maxFactionsPerHeat} factions per heat`;
    const unitText = config.maxUnitsOnBattlefield > 0
      ? `Battlefields are capped at ${config.maxUnitsOnBattlefield} total units.`
      : "Battlefields use full army sizes with no unit cap.";
    const paperbackText = config.paperbackOnly
      ? "Tournament heats only include paperback submissions."
      : "Tournament heats include all submissions.";
    els.tournamentConfigSummary.textContent = `${heatText}. ${unitText} ${paperbackText}`;
  }
}

function clearRiggedUnitCaches() {
  state.riggedUnitSpriteSources.clear();
  Array.from(state.tintedUnitSprites.keys()).forEach((cacheKey) => {
    if (cacheKey.includes("|rig|")) state.tintedUnitSprites.delete(cacheKey);
  });
}

function setUseRiggedSprites(enabled) {
  state.useRiggedSprites = Boolean(enabled);
  if (els.useRiggedSpritesToggle) {
    els.useRiggedSpritesToggle.checked = state.useRiggedSprites;
  }
  if (!state.useRiggedSprites) {
    clearRiggedUnitCaches();
  }
  saveState();
}

function invalidateBattleTerrainTexture() {
  if (!state.battle?.terrainTexture) return;
  state.battle.terrainTexture.canvas = null;
  state.battle.terrainTexture.pending = false;
  state.battle.terrainTexture.ready = false;
  hideTerrainBuildStatus();
}

function setUseTerrainTexturing(enabled) {
  state.useTerrainTexturing = Boolean(enabled);
  if (els.useTerrainTexturingToggle) {
    els.useTerrainTexturingToggle.checked = state.useTerrainTexturing;
  }
  if (!state.useTerrainTexturing) {
    clearBattleTerrainTextureQueue(state.battle?.terrainTexture);
    invalidateBattleTerrainTexture();
  } else if (state.battle) {
    state.battle.terrainTexture = createBattleTerrainTextureState(state.battle.field, state.battle.arena);
    queueBattleTerrainTextureGeneration(state.battle, 40);
  }
  saveState();
}

function setUseUnitOverlapShadows(enabled) {
  state.useUnitOverlapShadows = Boolean(enabled);
  if (els.useUnitOverlapShadowsToggle) {
    els.useUnitOverlapShadowsToggle.checked = state.useUnitOverlapShadows;
  }
  saveState();
}

function setAlwaysShowHealthbars(enabled) {
  state.alwaysShowHealthbars = Boolean(enabled);
  if (els.alwaysShowHealthbarsToggle) {
    els.alwaysShowHealthbarsToggle.checked = state.alwaysShowHealthbars;
  }
  saveState();
}

function setShowRenderDebug(enabled) {
  state.showRenderDebug = Boolean(enabled);
  if (els.showRenderDebugToggle) {
    els.showRenderDebugToggle.checked = state.showRenderDebug;
  }
  saveState();
}

function setPropResizeMode(enabled) {
  state.propResizeMode = Boolean(enabled);
  if (els.propResizeToggle) {
    els.propResizeToggle.checked = state.propResizeMode;
  }
  state.selectedPropId = null;
  if (state.propResizeMode) {
    maybeEnableGroundPropScalePersistencePrompt();
    if (state.battle) {
      state.battle.props = buildPropScaleWorkshopProps(state.battle.field, state.battle.arena);
    }
  } else {
    if (state.battle) {
      state.battle.props = buildFieldProps(state.battle.field, state.battle.arena);
    }
  }
  saveState();
}

function setDevPanelVisible(visible) {
  state.devPanelVisible = Boolean(visible);
  if (els.devPanel) {
    els.devPanel.hidden = !state.devPanelVisible;
  }
}

function getPropScaleKey(prop) {
  if (!prop) return "";
  if (prop.renderMode === "image") {
    return `image:${prop.asset?.file || prop.asset?.url || "unknown"}`;
  }
  return `svg:${prop.type || "unknown"}`;
}

function getPropScalePreference(scaleKey) {
  const value = Number(state.propScaleOverrides?.[scaleKey]);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function getPropBaseSpawnScale() {
  return GROUND_PROP_RANDOM_SCALE_MIN
    + (GROUND_PROP_RANDOM_SCALE_MAX - GROUND_PROP_RANDOM_SCALE_MIN) * Math.random();
}

function buildGroundProp(point, index, arena, themeWeights, count, availableGroundProps, options = {}) {
  const asset = options.asset || (availableGroundProps.length
    ? availableGroundProps[Math.floor(Math.random() * availableGroundProps.length)]
    : null);
  const renderMode = asset ? "image" : "svg";
  const type = options.type || (asset ? null : chooseArenaPropType(themeWeights, index, count));
  const scaleKey = asset ? `image:${asset.file || asset.url || "unknown"}` : `svg:${type || "unknown"}`;
  const spawnScaleVariance = getPropBaseSpawnScale();
  return {
    id: `prop-${index}-${Math.random().toString(36).slice(2, 7)}`,
    ...(asset
      ? {
          renderMode,
          asset,
          imageScale: GROUND_PROP_IMAGE_SCALE,
        }
      : {
          renderMode,
          type,
          tint: Math.random(),
          imageScale: 1,
        }),
    x: point.x,
    y: point.y,
    scaleKey,
    spawnScaleVariance,
    scale: spawnScaleVariance * getPropScalePreference(scaleKey),
    rotation: (Math.random() - 0.5) * 0.35,
    tintColor: arena?.ground || arena?.top || "#8fa27f",
    tintAlpha: GROUND_PROP_TINT_ALPHA,
  };
}

function getSelectedBattleProp() {
  const props = state.battle?.props || [];
  if (!state.selectedPropId) return null;
  return props.find((prop) => prop.id === state.selectedPropId) || null;
}

function setSelectedBattleProp(prop) {
  state.selectedPropId = prop?.id || null;
}

function clearSelectedBattleProp() {
  state.selectedPropId = null;
}

function getGroundPropScreenMetrics(prop, viewport) {
  const point = worldToScreen(prop.x, prop.y, viewport);
  if (prop.renderMode === "image" && prop.asset) {
    const imageWidth = Math.max(1, prop.asset.width || 1);
    const imageHeight = Math.max(1, prop.asset.height || 1);
    const renderScale = Math.min(1, prop.imageScale || GROUND_PROP_IMAGE_SCALE) * point.scale * prop.scale;
    const width = imageWidth * renderScale;
    const height = imageHeight * renderScale;
    return {
      point,
      left: point.x - width / 2,
      right: point.x + width / 2,
      top: point.y - height,
      bottom: point.y,
      width,
      height,
    };
  }
  const renderScale = point.scale * prop.scale;
  const width = 34 * renderScale / 2.1;
  const height = 30 * renderScale / 2.1;
  return {
    point,
    left: point.x - width / 2,
    right: point.x + width / 2,
    top: point.y - height,
    bottom: point.y + 8 * renderScale / 2.1,
    width,
    height,
  };
}

function findHoveredBattleProp(battle, viewport, canvasX, canvasY) {
  if (!battle?.props?.length) return null;
  const props = battle.props.slice().sort((a, b) => a.y - b.y);
  for (let index = props.length - 1; index >= 0; index -= 1) {
    const prop = props[index];
    const metrics = getGroundPropScreenMetrics(prop, viewport);
    if (
      canvasX >= metrics.left
      && canvasX <= metrics.right
      && canvasY >= metrics.top
      && canvasY <= metrics.bottom
    ) {
      return prop;
    }
  }
  return null;
}

function resizeSelectedBattleProp(direction) {
  const prop = getSelectedBattleProp();
  if (!prop) return false;
  const scaleKey = prop.scaleKey || getPropScaleKey(prop);
  prop.scaleKey = scaleKey;
  prop.spawnScaleVariance = Math.max(0.01, Number(prop.spawnScaleVariance) || 1);
  const currentPreference = clamp(prop.scale / prop.spawnScaleVariance, 0.18, 6);
  const nextPreference = clamp(currentPreference * (direction > 0 ? 1.08 : 1 / 1.08), 0.18, 6);
  state.propScaleOverrides[scaleKey] = nextPreference;
  (state.battle?.props || []).forEach((battleProp) => {
    const battlePropScaleKey = battleProp.scaleKey || getPropScaleKey(battleProp);
    if (battlePropScaleKey !== scaleKey) return;
    battleProp.scaleKey = battlePropScaleKey;
    battleProp.spawnScaleVariance = Math.max(0.01, Number(battleProp.spawnScaleVariance) || 1);
    battleProp.scale = clamp(battleProp.spawnScaleVariance * nextPreference, 0.18, 6);
  });
  saveState();
  void persistGroundPropScaleOverrides();
  return true;
}

function buildSerializablePropScaleOverrides() {
  return Object.fromEntries(Object.entries(state.propScaleOverrides || {})
    .filter(([, value]) => Number.isFinite(Number(value)) && Number(value) > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => [key, Number(Number(value).toFixed(4))]));
}

async function loadGroundPropScaleOverrides() {
  if (state.groundPropScaleFile.loaded) return state.propScaleOverrides;
  try {
    const response = await fetch(resolveGroundPropAssetUrl(GROUND_PROP_SCALE_OVERRIDES_FILE), { cache: "no-store" });
    if (response.ok) {
      const saved = await response.json();
      if (saved && typeof saved === "object") {
        state.propScaleOverrides = {
          ...state.propScaleOverrides,
          ...saved,
        };
      }
    }
  } catch {}
  state.groundPropScaleFile.loaded = true;
  return state.propScaleOverrides;
}

async function ensureGroundPropScaleDirectoryHandle({ prompt = false } = {}) {
  if (state.groundPropScaleFile.directoryHandle) return state.groundPropScaleFile.directoryHandle;
  if (!prompt || !window.showDirectoryPicker) return null;
  state.groundPropScaleFile.promptAttempted = true;
  try {
    const directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    state.groundPropScaleFile.directoryHandle = directoryHandle;
    return directoryHandle;
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.warn("Could not choose the prop scale directory.", error);
    }
    return null;
  }
}

async function persistGroundPropScaleOverrides() {
  const directoryHandle = await ensureGroundPropScaleDirectoryHandle();
  if (!directoryHandle) return false;
  try {
    const fileHandle = await directoryHandle.getFileHandle(GROUND_PROP_SCALE_OVERRIDES_FILE, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(`${JSON.stringify(buildSerializablePropScaleOverrides(), null, 2)}\n`);
    await writable.close();
    return true;
  } catch (error) {
    console.warn("Could not persist prop scale overrides.", error);
    return false;
  }
}

function maybeEnableGroundPropScalePersistencePrompt() {
  if (state.groundPropScaleFile.directoryHandle || state.groundPropScaleFile.promptAttempted) return;
  void ensureGroundPropScaleDirectoryHandle({ prompt: true });
}

function shuffleArray(values) {
  const result = values.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function buildPropScaleWorkshopProps(field, arena) {
  const availableGroundProps = getAvailableGroundPropAssets();
  if (!availableGroundProps.length) return buildFieldProps(field, arena);
  const points = sampleBlueNoisePropPoints(field, availableGroundProps.length);
  const orderedAssets = shuffleArray(availableGroundProps);
  return points
    .map((point, index) => buildGroundProp(
      point,
      index,
      arena,
      { common: DEFAULT_PROP_WEIGHTS, rare: {} },
      orderedAssets.length,
      [],
      { asset: orderedAssets[index] },
    ))
    .sort((a, b) => a.y - b.y);
}

function syncCsvInput() {
  const rows = [
    ["title", "coverUrl", "armySize", "submissionType", "composition", "fledReserve"].join(","),
    ...state.factions.map((faction) => [
      csvEscape(faction.title),
      csvEscape(faction.coverUrl),
      faction.armySize,
      faction.submissionType,
      csvEscape(compositionToCsvString(faction.composition)),
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

function compositionToCsvString(composition) {
  return UNIT_LIBRARY
    .filter((unit) => (composition?.[unit.id] || 0) > 0)
    .map((unit) => `${unit.id}:${composition[unit.id]}`)
    .join(", ");
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((header) => `${header || ""}`.trim().toLowerCase());
  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ""]));
    return withFactionDefaults({
      title: row.title,
      coverUrl: row.coverurl,
      armySize: row.armysize,
      submissionType: row.submissiontype,
      composition: parseRowComposition(row),
      fledReserve: row.fledreserve,
    }, index);
  });
}

function parseRowComposition(row) {
  const compositionText = row.composition || row.compositions || row.loadout || row.unitmix || row.units;
  if (compositionText?.trim()) {
    return parseCompositionString(compositionText);
  }
  return {
    archer: row.archer ?? row.archers,
    mage: row.mage ?? row.mages,
    knight: row.knight ?? row.knights,
    paladin: row.paladin ?? row.paladins,
    bodyguard: row.bodyguard ?? row.bodyguards,
    medic: row.medic ?? row.medics,
    bard: row.bard ?? row.bards,
    bomber: row.bomber ?? row.bombers,
    assassin: row.assassin ?? row.assassins,
    mountainman: row.mountainman ?? row.mountainmen ?? row.menofthemountain,
    catapult: row.catapult ?? row.catapults,
    poisoner: row.poisoner ?? row.poisoners,
    firebreather: row.firebreather ?? row.firebreathers,
    arachnomist: row.arachnomist ?? row.arachnomists,
    krieger: row.krieger ?? row.kriegers,
    huntsman: row.huntsman ?? row.huntsmen,
    phantom: row.phantom ?? row.phantoms,
  };
}

function parseCompositionString(text) {
  if (!text?.trim()) return { ...DEFAULT_COMPOSITION };
  const normalizedText = text.trim().toLowerCase();
  if (normalizedText === "default") return { ...DEFAULT_COMPOSITION };
  if (normalizedText === "random") return createRandomComposition();
  const parsed = {};
  const tokens = text
    .split(/[,\n;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  tokens.forEach((token) => {
    const match = token.match(/^(.+?)(?:\s*[:=x-]\s*|\s+)?(\d+)$/i);
    if (!match) return;
    const [, rawName, rawWeight] = match;
    const unitId = resolveUnitId(rawName);
    if (!unitId) return;
    parsed[unitId] = clampInt(rawWeight, 0, 999);
  });

  return Object.keys(parsed).length ? parsed : { ...DEFAULT_COMPOSITION };
}

function resolveUnitId(rawName) {
  const normalized = `${rawName || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (!normalized) return null;

  const compact = normalized.replace(/\s+/g, "");
  const singular = compact.endsWith("s") ? compact.slice(0, -1) : compact;
  const candidates = [compact, singular];

  for (const unit of UNIT_LIBRARY) {
    const unitCandidates = [
      unit.id,
      `${unit.id}s`,
      unit.name.toLowerCase(),
      unit.name.toLowerCase().replace(/\s+/g, ""),
      ...unit.keywords.map((word) => word.toLowerCase().replace(/\s+/g, "")),
    ];
    if (candidates.some((candidate) => unitCandidates.includes(candidate))) return unit.id;
  }

  for (const unit of UNIT_LIBRARY) {
    const searchable = [
      unit.id,
      unit.name.toLowerCase().replace(/\s+/g, ""),
      ...unit.keywords.map((word) => word.toLowerCase().replace(/\s+/g, "")),
    ];
    if (candidates.some((candidate) => searchable.some((value) => value.startsWith(candidate) || candidate.startsWith(value)))) {
      return unit.id;
    }
  }

  return null;
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
  resetBattlePreservingArenaVisuals();
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
    const card = fragment.querySelector(".army-card");
    const isWinner = state.battle?.pendingWinner === faction.id;
    if (isWinner) card.classList.add("winner-highlight");
    fragment.querySelector(".army-title").textContent = faction.title;
    fragment.querySelector(".army-meta").textContent = `${faction.armySize} troops - ${faction.submissionType}`;
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
    resetBattlePreservingArenaVisuals();
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
    resetBattlePreservingArenaVisuals();
    renderArmyEditors();
  };

  [titleInput, coverInput, sizeInput, submissionInput, reserveInput].forEach((input) => input.addEventListener("change", commit));
  editBtn.addEventListener("click", () => openCompositionModal(faction.id));
  fragment.querySelector(".remove-army").addEventListener("click", () => {
    state.factions = state.factions.filter((entry) => entry.id !== faction.id);
    saveState();
    syncCsvInput();
    renderArmyEditors();
    resetBattlePreservingArenaVisuals();
  });
}

function openCompositionModal(factionId) {
  const faction = state.factions.find((entry) => entry.id === factionId);
  if (!faction) return;
  state.compositionModal.factionId = factionId;
  state.compositionModal.draft = { ...faction.composition };
  state.compositionModal.search = "";
  state.compositionModal.pendingTransfer = null;
  state.compositionModal.visualRetryQueued = false;
  els.compositionSearch.value = "";
  renderCompositionModal();
  els.compositionModal.classList.remove("hidden");
}

function closeCompositionModal() {
  els.compositionModal.classList.add("hidden");
  state.compositionModal.factionId = null;
  state.compositionModal.draft = null;
  state.compositionModal.pendingTransfer = null;
  state.compositionModal.visualRetryQueued = false;
}

function persistCompositionDraft() {
  const faction = state.factions.find((entry) => entry.id === state.compositionModal.factionId);
  if (!faction || !state.compositionModal.draft) return;
  const composition = normalizeComposition(state.compositionModal.draft);
  faction.composition = composition;
  state.compositionModal.draft = { ...composition };
  saveState();
  syncCsvInput();
  renderArmyEditors();
  resetBattlePreservingArenaVisuals();
}

function renderCompositionModal() {
  const draft = state.compositionModal.draft;
  if (!draft) return;
  const term = state.compositionModal.search.trim().toLowerCase();
  const activeUnits = UNIT_LIBRARY.filter((unit) => draft[unit.id] > 0);
  const canAddMoreUnits = activeUnits.length < MAX_COMPOSITION_UNIT_TYPES;
  const available = UNIT_LIBRARY.filter((unit) => {
    if (draft[unit.id] > 0) return false;
    if (!term) return true;
    return unit.name.toLowerCase().includes(term)
      || unit.keywords.some((word) => word.includes(term))
      || unit.description.toLowerCase().includes(term);
  });

  els.compositionResultsCount.textContent = `${available.length} available`;
  els.compositionSelectedCount.textContent = `${activeUnits.length} of ${MAX_COMPOSITION_UNIT_TYPES} selected`;

  els.compositionResults.innerHTML = available.map((unit) => buildCompositionUnitCard(unit, "available", null, state.compositionModal.pendingTransfer, canAddMoreUnits)).join("")
    || `<p class="hint">${canAddMoreUnits ? "No matching units." : `Unit type limit reached. Remove a unit type to add a different one.`}</p>`;

  els.compositionSelected.innerHTML = activeUnits.map((unit) => buildCompositionUnitCard(unit, "active", draft[unit.id], state.compositionModal.pendingTransfer)).join("")
    || '<p class="hint">Select one or more units to define the faction mix.</p>';

  const randomizeButton = document.getElementById("compositionRandomizeBtn");
  if (randomizeButton) {
    randomizeButton.onclick = () => {
      const randomComposition = createRandomComposition();
      Object.keys(draft).forEach((unitId) => {
        draft[unitId] = 0;
      });
      Object.assign(draft, randomComposition);
      persistCompositionDraft();
      renderCompositionModal();
    };
  }

  els.compositionResults.querySelectorAll("[data-add-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      const sourceCard = button.closest("[data-unit-card]");
      draft[button.dataset.addUnit] = draft[button.dataset.addUnit] || 1;
      persistCompositionDraft();
      animateCompositionTransfer(button.dataset.addUnit, sourceCard);
      renderCompositionModal();
    });
  });
  els.compositionSelected.querySelectorAll("[data-unit-weight]").forEach((input) => {
    input.addEventListener("change", () => {
      draft[input.dataset.unitWeight] = clampInt(input.value, 1, 999);
      persistCompositionDraft();
      renderCompositionModal();
    });
  });
  els.compositionSelected.querySelectorAll("[data-remove-unit]").forEach((button) => {
    button.addEventListener("click", () => {
      draft[button.dataset.removeUnit] = 0;
      persistCompositionDraft();
      renderCompositionModal();
    });
  });

  if (state.compositionModal.pendingTransfer?.direction === "add") {
    const targetCard = els.compositionSelected.querySelector(`[data-unit-card="${state.compositionModal.pendingTransfer.unitId}"]`);
    if (targetCard) {
      targetCard.classList.add("unit-card-settled");
      window.setTimeout(() => targetCard.classList.remove("unit-card-settled"), 420);
    }
    state.compositionModal.pendingTransfer = null;
  }

  renderCompositionUnitVisuals();
}

function buildCompositionUnitCard(unit, mode, weight = null, pendingTransfer = null, canAddUnit = true) {
  const isActive = mode === "active";
  const isPendingTarget = pendingTransfer?.direction === "add" && pendingTransfer.unitId === unit.id && isActive;
  const cardClass = isActive ? "selected-unit unit-card" : "unit-result unit-card";
  const actionMarkup = isActive
    ? `
      <div class="unit-actions unit-actions-active">
        <label class="unit-quantity-field">
          <span>Qty</span>
          <input type="number" min="1" max="999" value="${weight}" data-unit-weight="${unit.id}">
        </label>
        <button class="ghost small" data-remove-unit="${unit.id}">Remove</button>
      </div>
    `
    : `
      <div class="unit-actions">
        <button class="ghost small" data-add-unit="${unit.id}"${canAddUnit ? "" : ' disabled aria-disabled="true" title="You can only select up to 5 unit types."'}>${canAddUnit ? "Add Unit" : "Too Many Unit Types"}</button>
      </div>
    `;
  const veteranMarkup = isActive ? "" : `<p class="unit-veteran-copy">Veteran: ${getVeteranGoalLabel(unit.id)}</p>`;
  return `
    <div class="${cardClass}${isPendingTarget ? " unit-card-entering" : ""}" data-unit-card="${unit.id}">
      <div class="unit-panel-main">
        <div class="unit-icon unit-icon-${unit.id}">${getUnitVisualMarkup(unit.id)}</div>
        <div class="unit-copy">
          <div class="unit-header">
            <strong>${unit.name}</strong>
            <p class="unit-keywords">${unit.keywords.join(", ")}</p>
          </div>
          <p class="unit-description">${unit.description}</p>
          ${veteranMarkup}
        </div>
      </div>
      ${actionMarkup}
    </div>
  `;
}

function animateCompositionTransfer(unitId, sourceCard) {
  if (!sourceCard) {
    state.compositionModal.pendingTransfer = { unitId, direction: "add" };
    return;
  }
  const sourceRect = sourceCard.getBoundingClientRect();
  const clone = sourceCard.cloneNode(true);
  clone.classList.add("composition-transfer-clone");
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.querySelectorAll("button, input").forEach((element) => element.remove());
  document.body.appendChild(clone);
  state.compositionModal.pendingTransfer = { unitId, direction: "add" };

  requestAnimationFrame(() => {
    const targetCard = els.compositionSelected.querySelector(`[data-unit-card="${unitId}"]`);
    if (!targetCard) {
      clone.remove();
      return;
    }
    const targetRect = targetCard.getBoundingClientRect();
    const translateX = targetRect.left - sourceRect.left;
    const translateY = targetRect.top - sourceRect.top;
    const scaleX = targetRect.width / Math.max(sourceRect.width, 1);
    const scaleY = targetRect.height / Math.max(sourceRect.height, 1);
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
      clone.style.opacity = "0.24";
    });
    window.setTimeout(() => clone.remove(), 340);
  });
}

function sizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.canvas.width = Math.round(rect.width * dpr);
  els.canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const chartRect = els.battleHealthChartCanvas.getBoundingClientRect();
  els.battleHealthChartCanvas.width = Math.max(1, Math.round(chartRect.width * dpr));
  els.battleHealthChartCanvas.height = Math.max(1, Math.round(chartRect.height * dpr));
  chartCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function resetBattle(options = {}) {
  const preserveArenaVisuals = Boolean(options.preserveArenaVisuals);
  const regenerateTerrain = options.regenerateTerrain !== false;
  const terrainMirrorKey = options.terrainMirrorKey || "";
  state.running = false;
  state.lastBattleHighlightAt = -Infinity;
  state.tournamentResult = null;
  if (regenerateTerrain) state.sessionTerrainTexture = null;
  endBattleAudio();
  clearBattleHover();
  closeResetTournamentModal();
  closeTournamentStoryModal();
  clearSelectedBattleProp();
  const tournamentEntrants = getTournamentEligibleFactions(state.factions);
  state.tournament = shouldUseTournament(tournamentEntrants) ? createTournament(tournamentEntrants) : null;
  state.battle = buildActiveBattle({ preserveArenaVisuals, regenerateTerrain, terrainMirrorKey });
  queueBattleTerrainTextureGeneration(state.battle);
  clearKnockoutAnnouncement();
  clearBossAnnouncement();
  resetCamera();
  renderTournamentConfigPanel();
  els.battleState.textContent = state.tournament ? getCurrentMatchLabel(state.tournament) : "Ready";
  els.winnerLabel.textContent = "None yet";
  closeWinnerModal();
  renderArmyEditors();
  renderBracketTracker();
  updateAdvanceButtonLabel();
  renderSpeedControls();
  setTicker(state.factions.length ? getReadyMessage() : "Add at least one army to begin.");
  syncTournamentViewState(true);
}

function resetBattlePreservingArenaVisuals() {
  resetBattle({ preserveArenaVisuals: true, regenerateTerrain: false });
}

function nextTerrainReflectionKey(prefix = "reset") {
  state.terrainReflectionIndex += 1;
  return `${prefix}|${state.terrainReflectionIndex}`;
}

function isTournamentActive() {
  return Boolean(state.tournament && !state.tournament.complete);
}

function isTournamentViewAvailable() {
  return Boolean(state.tournament || state.tournamentResult);
}

function handleResetBattleClick() {
  if (isTournamentActive()) {
    openResetTournamentModal();
    return;
  }
  resetBattle({ regenerateTerrain: false, terrainMirrorKey: nextTerrainReflectionKey("battle-reset") });
}

function openResetTournamentModal() {
  els.resetTournamentModal.classList.remove("hidden");
}

function closeResetTournamentModal() {
  els.resetTournamentModal.classList.add("hidden");
}

function confirmResetTournament() {
  closeResetTournamentModal();
  resetBattle({ regenerateTerrain: false, terrainMirrorKey: nextTerrainReflectionKey("tournament-reset") });
  setTicker("The bracket has been reset back to the opening heats.");
}

function openTournamentPage() {
  if (!isTournamentViewAvailable()) return;
  syncTournamentViewState(true);
  window.open("tournament.html", "_blank", "noopener");
}

function buildTournamentViewSnapshot() {
  const tournamentSource = state.tournament || state.tournamentResult?.tournament || null;
  const factionMap = new Map();
  (tournamentSource?.entrantData || []).forEach((faction) => {
    factionMap.set(faction.id, {
      id: faction.id,
      title: faction.title,
      coverUrl: faction.coverUrl,
      armySize: faction.armySize,
      submissionType: faction.submissionType,
    });
  });
  state.factions.forEach((faction) => {
    factionMap.set(faction.id, {
      id: faction.id,
      title: faction.title,
      coverUrl: faction.coverUrl,
      armySize: faction.armySize,
      submissionType: faction.submissionType,
    });
  });
  return {
    updatedAt: Date.now(),
    factions: Array.from(factionMap.values()),
    tournamentConfig: cloneData(state.tournamentConfig),
    tournament: tournamentSource ? cloneData(tournamentSource) : null,
    completedTournament: state.tournamentResult ? cloneData(state.tournamentResult) : null,
    battle: state.battle ? {
      completed: Boolean(state.battle.completed),
      pendingWinner: state.battle.pendingWinner || null,
      meta: state.battle.meta ? { ...state.battle.meta } : null,
      activeFactionIds: getResultFactions(state.battle).map((faction) => faction.id),
      livingFactionIds: getLivingResultFactions(state.battle).map((faction) => faction.id),
    } : null,
    running: Boolean(state.running),
    battleStateLabel: els.battleState?.textContent || "",
  };
}

function syncTournamentViewState(force = false) {
  const now = performance.now();
  if (!force && (now - state.lastTournamentViewSyncAt) < TOURNAMENT_VIEW_SYNC_INTERVAL_MS) return;
  state.lastTournamentViewSyncAt = now;
  localStorage.setItem(TOURNAMENT_VIEW_STORAGE_KEY, JSON.stringify(buildTournamentViewSnapshot()));
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
  resetCinematicCameraState();
  els.canvas.classList.remove("is-dragging");
}

function startBattle() {
  if (state.tournamentResult) {
    showTournamentVictoryCard(state.tournamentResult);
    setTicker("The bracket is complete. Start the next tournament when you're ready.");
    return;
  }
  if (state.battle?.completed) {
    setTicker("Apply the current result before starting another battle.");
    return;
  }
  const activeCombatants = getActiveBattleFactions();
  if (activeCombatants.length < 2) {
    setTicker("At least two armies are required.");
    return;
  }
  closeWinnerModal();
  clearKnockoutAnnouncement();
  clearBossAnnouncement();
  state.running = true;
  startBattleAudio();
  els.battleState.textContent = state.tournament ? `${getCurrentMatchLabel(state.tournament)} in progress` : "Battling";
  setTicker(state.tournament ? `${getCurrentMatchLabel(state.tournament)} begins in ${state.battle.arena.name}.` : "The war for the next read has begun.");
  setHighlight("Scouts report movement across the field");
  renderBracketTracker();
  renderSpeedControls();
  syncTournamentViewState(true);
}

function getTournamentEligibleFactions(factions = state.factions, config = state.tournamentConfig) {
  const normalized = normalizeTournamentConfig(config);
  if (!normalized.paperbackOnly) return factions.slice();
  return factions.filter((faction) => faction.submissionType === "paperback");
}

function shouldUseTournament(factions) {
  return factions.length > normalizeTournamentConfig(state.tournamentConfig).maxFactionsPerHeat;
}

function getReadyMessage() {
  if (!state.tournament) return "Armies are awaiting the signal.";
  const match = getCurrentTournamentMatch(state.tournament);
  return match ? `${getCurrentMatchLabel(state.tournament)} awaits in ${match.arena.name}.` : "Bracket stands ready.";
}

function buildActiveBattle(options = {}) {
  const preserveArenaVisuals = Boolean(options.preserveArenaVisuals);
  const regenerateTerrain = Boolean(options.regenerateTerrain);
  const terrainMirrorKey = options.terrainMirrorKey || "";
  if (state.tournament) {
    const match = getCurrentTournamentMatch(state.tournament);
    if (match) {
      return buildBattle(match.factionIds.map((id) => findSourceFaction(id)).filter(Boolean).map((faction) => cloneData(faction)), match.arena, {
        tournamentRound: state.tournament.currentRoundIndex,
        tournamentMatch: state.tournament.currentMatchIndex,
      }, {
        preserveArenaVisuals,
        regenerateTerrain,
        terrainMirrorKey,
        sceneSnapshot: preserveArenaVisuals ? state.battle : null,
      });
    }
  }
  const arena = preserveArenaVisuals && state.battle?.arena
    ? state.battle.arena
    : createRandomArenaVariant(0, 0, state.factions.length);
  return buildBattle(state.factions, arena, null, {
    preserveArenaVisuals,
    regenerateTerrain,
    terrainMirrorKey,
    sceneSnapshot: preserveArenaVisuals ? state.battle : null,
  });
}

function buildBattle(factionPool = state.factions, arena = createArenaVariant(0, 0, factionPool.length), meta = null, options = {}) {
  const preserveArenaVisuals = Boolean(options.preserveArenaVisuals);
  const sceneSnapshot = options.sceneSnapshot || null;
  const canReuseScene = preserveArenaVisuals && sceneSnapshot?.arena === arena;
  const field = { ...FIELD, centerX: FIELD.width / 2, centerY: FIELD.height / 2, radius: 320 };
  const factions = factionPool.map((faction, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(1, factionPool.length);
    const baseX = field.centerX + Math.cos(angle) * field.radius;
    const baseY = field.centerY + Math.sin(angle) * field.radius * 0.62;
    return {
      ...faction,
      color: factionColor(index),
      units: spawnUnitsForFaction(faction, baseX, baseY),
      bannerPos: { x: baseX, y: baseY - BANNER_FLOAT_OFFSET },
      homeBase: { x: baseX, y: baseY },
      alive: true,
      image: getFactionImage(faction.coverUrl),
    };
  });
  const unitCapSummary = applyBattlefieldUnitCap(factions, state.tournamentConfig.maxUnitsOnBattlefield);
  const terrainTexture = getSharedBattleTerrainTexture(field, arena, {
    regenerate: options.regenerateTerrain,
    preserveCurrentMirror: canReuseScene,
    mirrorKey: options.terrainMirrorKey || (meta ? `${meta.tournamentRound || 0}|${meta.tournamentMatch || 0}` : ""),
  });
  const battle = {
    field,
    factions,
    graves: [],
    projectiles: [],
    particles: [],
    spells: [],
    swipes: [],
    traces: [],
    bossBubbles: [],
    stuckArrows: [],
    bombs: [],
    arena,
    weatherField: canReuseScene && sceneSnapshot?.weatherField
      ? sceneSnapshot.weatherField
      : createWeatherField(arena.weather),
    terrainTexture,
    props: canReuseScene && Array.isArray(sceneSnapshot?.props)
      ? sceneSnapshot.props
      : buildFieldProps(field, arena),
    pendingWinner: null,
    completed: false,
    meta: unitCapSummary.totalRemoved > 0
      ? { ...(meta || {}), unitCapSummary }
      : meta,
    time: 0,
    notes: { dwindled: {}, slaughter: {}, killstreaks: {}, extinguished: {} },
    knockoutQueue: [],
    activeKnockout: null,
    inklordEvent: {
      scheduledAt: INKLORD_DEBUG_DELAY,
      phase: "waiting",
      bannerShown: false,
      unitId: null,
      impactAt: null,
      landingX: field.centerX,
      landingY: field.centerY,
    },
  };
  initializeBattleHealthTimeline(battle);
  return battle;
}

function applyBattlefieldUnitCap(factions, maxUnitsOnBattlefield) {
  const cap = clampInt(maxUnitsOnBattlefield, 0, MAX_BATTLEFIELD_UNIT_CAP);
  const entries = factions
    .map((faction) => ({ faction, count: faction.units.length }))
    .filter((entry) => entry.count > 0);
  const totalUnits = entries.reduce((sum, entry) => sum + entry.count, 0);
  if (!cap || totalUnits <= cap) {
    factions.forEach((faction) => {
      faction.alive = faction.units.length > 0;
    });
    return { cap, totalBefore: totalUnits, totalAfter: totalUnits, totalRemoved: 0, removedByFaction: {} };
  }

  const guaranteedUnits = cap >= entries.length ? 1 : 0;
  const availableWeightedUnits = entries.map((entry) => Math.max(0, entry.count - guaranteedUnits));
  const proportionalTargets = allocateProportionalIntegers(availableWeightedUnits, Math.max(0, cap - (guaranteedUnits * entries.length)));
  const removedByFaction = {};
  let totalAfter = 0;
  entries.forEach((entry, index) => {
    const target = Math.min(entry.count, guaranteedUnits + proportionalTargets[index]);
    shuffleInPlace(entry.faction.units);
    const removed = Math.max(0, entry.count - target);
    entry.faction.units = entry.faction.units.slice(0, target);
    entry.faction.alive = target > 0;
    removedByFaction[entry.faction.id] = removed;
    totalAfter += target;
  });
  factions.forEach((faction) => {
    if (!entries.some((entry) => entry.faction.id === faction.id)) {
      faction.alive = faction.units.length > 0;
      removedByFaction[faction.id] = 0;
    }
  });
  return {
    cap,
    totalBefore: totalUnits,
    totalAfter,
    totalRemoved: Math.max(0, totalUnits - totalAfter),
    removedByFaction,
  };
}

function allocateProportionalIntegers(weights, targetTotal) {
  if (!Array.isArray(weights) || !weights.length || targetTotal <= 0) {
    return (weights || []).map(() => 0);
  }
  const cappedTarget = Math.min(
    targetTotal,
    weights.reduce((sum, weight) => sum + Math.max(0, weight), 0),
  );
  const safeWeights = weights.map((weight) => Math.max(0, weight));
  const weightTotal = safeWeights.reduce((sum, weight) => sum + weight, 0);
  if (weightTotal <= 0 || cappedTarget <= 0) return safeWeights.map(() => 0);

  const allocations = safeWeights.map((weight) => Math.floor((cappedTarget * weight) / weightTotal));
  let allocated = allocations.reduce((sum, value) => sum + value, 0);
  const remainders = safeWeights.map((weight, index) => ({
    index,
    remainder: ((cappedTarget * weight) / weightTotal) - allocations[index],
  }));
  remainders.sort((a, b) => {
    if (b.remainder !== a.remainder) return b.remainder - a.remainder;
    return Math.random() - 0.5;
  });
  for (let i = 0; i < remainders.length && allocated < cappedTarget; i += 1) {
    allocations[remainders[i].index] += 1;
    allocated += 1;
  }
  return allocations;
}

function shuffleInPlace(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [items[i], items[swapIndex]] = [items[swapIndex], items[i]];
  }
  return items;
}

function createInkLordFaction() {
  return {
    id: INKLORD_FACTION_ID,
    title: INKLORD_FACTION_TITLE,
    coverUrl: "",
    armySize: 0,
    fledReserve: 0,
    submissionType: "digital",
    composition: {},
    color: INKLORD_COLOR,
    units: [],
    bannerPos: { x: FIELD.width / 2, y: FIELD.height / 2 - BANNER_FLOAT_OFFSET },
    homeBase: { x: FIELD.width / 2, y: FIELD.height / 2 },
    alive: false,
    neutral: true,
    excludeFromResults: true,
    image: null,
  };
}

function getResultFactions(battle) {
  return (battle?.factions || []).filter((faction) => !faction.excludeFromResults);
}

function getLivingResultFactions(battle) {
  return getResultFactions(battle).filter((faction) => faction.units.some((unit) => !unit.dead && !unit.fled));
}

function hasLivingNeutralThreat(battle) {
  return (battle?.factions || []).some((faction) => faction.excludeFromResults && faction.units.some((unit) => !unit.dead && !unit.fled));
}

function createGrave(unit, battle) {
  const variant = GRAVE_VARIANTS[Math.floor(Math.random() * GRAVE_VARIANTS.length)];
  const graveAsset = getRandomGraveAsset();
  return {
    id: `grave-${unit.id}-${Math.random().toString(36).slice(2, 7)}`,
    x: unit.x,
    y: unit.y,
    factionId: unit.factionId,
    unitType: unit.type,
    variantId: variant.id,
    variantKind: variant.kind,
    renderMode: graveAsset ? "image" : "svg",
    asset: graveAsset,
    raisedById: null,
  };
}

function spawnGrave(unit, battle) {
  if (!battle || !unit) return null;
  const grave = createGrave(unit, battle);
  battle.graves.push(grave);
  return grave;
}

function findGraveById(battle, graveId) {
  return battle?.graves?.find((grave) => grave.id === graveId) || null;
}

function removeGrave(battle, graveId) {
  if (!battle?.graves?.length) return null;
  const index = battle.graves.findIndex((grave) => grave.id === graveId);
  if (index < 0) return null;
  const [grave] = battle.graves.splice(index, 1);
  return grave || null;
}

function getGraveVariant(grave) {
  const variant = GRAVE_VARIANTS.find((entry) => entry.id === grave?.variantId) || GRAVE_VARIANTS[0];
  if (!variant.__bodyPath) variant.__bodyPath = new Path2D(variant.bodyPath);
  if (variant.accentPath && !variant.__accentPath) variant.__accentPath = new Path2D(variant.accentPath);
  return variant;
}

function findSourceFaction(factionId) {
  return state.factions.find((entry) => entry.id === factionId);
}

function getActiveBattleFactions() {
  return state.battle?.factions || state.factions;
}

function createTournament(factions) {
  const entrantData = factions.map((faction) => ({
    id: faction.id,
    title: faction.title,
    coverUrl: faction.coverUrl,
    armySize: faction.armySize,
    submissionType: faction.submissionType,
  }));
  const factionIds = entrantData.map((faction) => faction.id);
  return {
    originalFactionIds: factionIds,
    entrantData,
    config: normalizeTournamentConfig(state.tournamentConfig),
    currentRoundIndex: 0,
    currentMatchIndex: 0,
    rounds: [createTournamentRound(factionIds, 0, state.tournamentConfig)],
    eliminated: Object.fromEntries(factionIds.map((id) => [id, { fled: 0, growth: 0, eliminated: false }])),
    stats: createTournamentStats(entrantData),
    championId: null,
    complete: false,
  };
}

function createTournamentStats(entrantData) {
  const factionIds = entrantData.map((faction) => faction.id);
  return {
    totalEntrants: entrantData.length,
    startingTroops: entrantData.reduce((sum, faction) => sum + faction.armySize, 0),
    completedHeats: 0,
    totalPerished: 0,
    totalRouted: 0,
    eliminatedArmies: 0,
    winsByFaction: Object.fromEntries(factionIds.map((id) => [id, 0])),
    survivingTroopsByFaction: Object.fromEntries(factionIds.map((id) => [id, 0])),
  };
}

function getTournamentFactionRecord(tournament, factionId) {
  return tournament?.entrantData?.find((entry) => entry.id === factionId) || findSourceFaction(factionId) || null;
}

function recordTournamentHeatStats(tournament, battle, winnerId) {
  const stats = tournament?.stats;
  if (!stats || !battle) return;
  stats.completedHeats += 1;
  const resultFactions = getResultFactions(battle);
  resultFactions.forEach((faction) => {
    const perished = faction.units.filter((unit) => unit.dead).length;
    const routed = faction.units.filter((unit) => unit.fled).length;
    const survivors = faction.units.filter((unit) => !unit.dead && !unit.fled).length;
    stats.totalPerished += perished;
    stats.totalRouted += routed;
    stats.survivingTroopsByFaction[faction.id] = survivors;
    if (faction.id === winnerId) {
      stats.winsByFaction[faction.id] = (stats.winsByFaction[faction.id] || 0) + 1;
    }
  });
  stats.eliminatedArmies += resultFactions.filter((faction) => faction.id !== winnerId).length;
}

function buildTournamentResult(tournament, championId) {
  const champion = championId ? getTournamentFactionRecord(tournament, championId) : null;
  const stats = tournament?.stats || createTournamentStats(tournament?.entrantData || []);
  const completedHeats = stats.completedHeats || tournament.rounds.reduce((sum, round) => sum + round.matches.filter((match) => match.status === "complete").length, 0);
  return {
    finishedAt: Date.now(),
    championId: championId || null,
    championTitle: champion?.title || null,
    championCoverUrl: champion?.coverUrl || "",
    tournament: cloneData(tournament),
    stats: {
      totalEntrants: tournament?.originalFactionIds?.length || stats.totalEntrants || 0,
      startingTroops: stats.startingTroops || 0,
      completedHeats,
      totalPerished: stats.totalPerished || 0,
      totalRouted: stats.totalRouted || 0,
      eliminatedArmies: stats.eliminatedArmies || 0,
      championWins: championId ? (stats.winsByFaction?.[championId] || 0) : 0,
      championSurvivors: championId ? (stats.survivingTroopsByFaction?.[championId] || 0) : 0,
      armiesOutlasted: championId ? Math.max(0, (tournament?.originalFactionIds?.length || 0) - 1) : 0,
    },
  };
}

function createTournamentRound(factionIds, roundIndex, config = state.tournamentConfig) {
  const groups = createTournamentHeatGroups(factionIds, config);
  return {
    index: roundIndex,
    label: getRoundLabel(roundIndex, groups.length, factionIds.length),
    matches: groups.map((group, matchIndex) => ({
      id: `round-${roundIndex}-match-${matchIndex}`,
      label: getMatchLabel(roundIndex, matchIndex),
      factionIds: group,
      winnerId: null,
      status: matchIndex === 0 ? "active" : "pending",
      arena: createRandomArenaVariant(roundIndex, matchIndex, group.length),
    })),
  };
}

function chunkEvenly(items, groupCount) {
  const count = Math.max(1, Math.min(groupCount, items.length));
  const baseSize = Math.floor(items.length / count);
  const extra = items.length % count;
  const groups = [];
  let cursor = 0;
  for (let i = 0; i < count; i += 1) {
    const size = baseSize + (i < extra ? 1 : 0);
    groups.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return groups.filter((group) => group.length);
}

function getRoundLabel(roundIndex, matchCount, entrantCount) {
  if (roundIndex === 0 && matchCount === 1) return "Grand Melee";
  if (matchCount === 1) return roundIndex === 1 ? "Final Round" : `Final Round ${roundIndex}`;
  return `Round ${roundIndex + 1}`;
}

function getMatchLabel(roundIndex, matchIndex) {
  return `Heat ${matchIndex + 1}`;
}

function getCurrentTournamentMatch(tournament) {
  return tournament?.rounds[tournament.currentRoundIndex]?.matches[tournament.currentMatchIndex] || null;
}

function getCurrentMatchLabel(tournament) {
  const round = tournament?.rounds[tournament.currentRoundIndex];
  const match = getCurrentTournamentMatch(tournament);
  if (!round || !match) return "Ready";
  return `${round.label} - ${match.label}`;
}

function getTournamentFactionColor(tournament, factionId) {
  const index = tournament?.originalFactionIds?.indexOf(factionId) ?? -1;
  return factionColor(index >= 0 ? index : 0);
}

function getTournamentEntryState(tournament, roundIndex, matchIndex, match, factionId) {
  if (match.winnerId === factionId) return "advanced";
  if (match.status === "complete") return "eliminated";
  if (roundIndex === tournament.currentRoundIndex && matchIndex === tournament.currentMatchIndex) return "active";
  return "pending";
}

function getTournamentEntryLabel(stateName) {
  if (stateName === "advanced") return "Advances";
  if (stateName === "eliminated") return "Defeated";
  if (stateName === "active") return "Fighting";
  return "Queued";
}

function getTournamentMatchBadgeLabel(match) {
  if (match.status === "complete") return match.winnerId ? "Finished" : "No Winner";
  if (match.status === "active") return "Live Heat";
  return "Awaiting Call";
}

function createArenaVariant(roundIndex, matchIndex, factionCount) {
  const theme = ARENA_THEMES[(roundIndex + matchIndex) % ARENA_THEMES.length];
  const weather = WEATHER_OPTIONS[(roundIndex * 2 + matchIndex + factionCount) % WEATHER_OPTIONS.length];
  return { ...theme, weather };
}

function createRandomArenaVariant(roundIndex = 0, matchIndex = 0, factionCount = 2) {
  const fallbackTheme = createArenaVariant(roundIndex, matchIndex, factionCount);
  const theme = ARENA_THEMES[Math.floor(Math.random() * ARENA_THEMES.length)] || fallbackTheme;
  const weather = WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)] || fallbackTheme.weather;
  return { ...theme, weather };
}

function createWeatherField(weather) {
  const createRainSplashes = (count, options = {}) => Array.from({ length: count }, () => ({
    cycle: (options.minCycle ?? 0.45) + Math.random() * ((options.maxCycle ?? 1) - (options.minCycle ?? 0.45)),
    phase: Math.random() * 2,
    radius: (options.minRadius ?? 5) + Math.random() * ((options.maxRadius ?? 9) - (options.minRadius ?? 5)),
    alpha: (options.minAlpha ?? 0.14) + Math.random() * ((options.maxAlpha ?? 0.28) - (options.minAlpha ?? 0.14)),
    lift: Math.random() < (options.objectChance ?? 0.18) ? 3 + Math.random() * 10 : 0,
    slant: (Math.random() - 0.5) * 3.2,
    seed: Math.random().toString(36).slice(2, 10),
  }));
  const createRainWind = (options = {}) => ({
    amplitude: (options.minAmplitude ?? 0.03) + Math.random() * ((options.maxAmplitude ?? 0.08) - (options.minAmplitude ?? 0.03)),
    swayFrequency: (options.minSwayFrequency ?? 0.2) + Math.random() * ((options.maxSwayFrequency ?? 0.45) - (options.minSwayFrequency ?? 0.2)),
    burstFrequency: (options.minBurstFrequency ?? 0.08) + Math.random() * ((options.maxBurstFrequency ?? 0.16) - (options.minBurstFrequency ?? 0.08)),
    burstSharpness: options.burstSharpness ?? 3,
    swayPhase: Math.random() * Math.PI * 2,
    burstPhase: Math.random() * Math.PI * 2,
  });
  if (weather === "mist") {
    return Array.from({ length: 8 }, () => ({
      x: Math.random(),
      y: 0.12 + Math.random() * 0.42,
      width: 110 + Math.random() * 150,
      height: 22 + Math.random() * 28,
      speed: 10 + Math.random() * 22,
      alpha: 0.04 + Math.random() * 0.06,
    }));
  }
  if (weather === "drizzle") {
    const slantSign = Math.random() > 0.5 ? 1 : -1;
    return {
      layers: Array.from({ length: 2 }, () => ({
        scale: 0.42 + Math.random() * 0.14,
        speed: 360 + Math.random() * 120,
        alpha: 0.16 + Math.random() * 0.12,
        angle: (-0.12 - Math.random() * 0.08) * slantSign,
        offsetX: Math.random() * 1024,
        offsetY: Math.random() * 1024,
        wind: createRainWind({
          minAmplitude: 0.018,
          maxAmplitude: 0.05,
          minSwayFrequency: 0.16,
          maxSwayFrequency: 0.28,
          minBurstFrequency: 0.045,
          maxBurstFrequency: 0.09,
          burstSharpness: 4.4,
        }),
      })),
      splashes: createRainSplashes(26, { minCycle: 0.55, maxCycle: 1.25, minRadius: 4, maxRadius: 7.5, minAlpha: 0.12, maxAlpha: 0.22, objectChance: 0.12 }),
    };
  }
  if (weather === "embers") {
    return Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1.5 + Math.random() * 2.8,
      speed: 18 + Math.random() * 28,
      sway: 10 + Math.random() * 24,
      glow: 150 + Math.floor(Math.random() * 80),
      alpha: 0.16 + Math.random() * 0.22,
    }));
  }
  if (weather === "downpour") {
    const slantSign = Math.random() > 0.5 ? 1 : -1;
    return {
      layers: Array.from({ length: 3 }, () => ({
        scale: 0.58 + Math.random() * 0.18,
        speed: 520 + Math.random() * 180,
        alpha: 0.2 + Math.random() * 0.16,
        angle: (-0.16 - Math.random() * 0.09) * slantSign,
        offsetX: Math.random() * 1024,
        offsetY: Math.random() * 1024,
        wind: createRainWind({
          minAmplitude: 0.05,
          maxAmplitude: 0.14,
          minSwayFrequency: 0.28,
          maxSwayFrequency: 0.55,
          minBurstFrequency: 0.1,
          maxBurstFrequency: 0.2,
          burstSharpness: 2.6,
        }),
      })),
      splashes: createRainSplashes(68, { minCycle: 0.32, maxCycle: 0.72, minRadius: 5.5, maxRadius: 10, minAlpha: 0.16, maxAlpha: 0.32, objectChance: 0.2 }),
    };
  }
  if (weather === "ashfall") {
    return Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1.2 + Math.random() * 2.1,
      speed: 26 + Math.random() * 36,
      sway: 8 + Math.random() * 18,
      alpha: 0.12 + Math.random() * 0.16,
      shade: 155 + Math.floor(Math.random() * 50),
    }));
  }
  if (weather === "fireflies") {
    return Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: 0.22 + Math.random() * 0.6,
      radius: 1.8 + Math.random() * 2.8,
      sway: 10 + Math.random() * 26,
      drift: 8 + Math.random() * 22,
      pulse: 1 + Math.random() * 2,
      alpha: 0.16 + Math.random() * 0.28,
    }));
  }
  if (weather === "snowfall") {
    return Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1.4 + Math.random() * 3.4,
      speed: 24 + Math.random() * 42,
      sway: 8 + Math.random() * 20,
      alpha: 0.2 + Math.random() * 0.28,
    }));
  }
  return [];
}

function applyArenaToBattle(battle, arena) {
  if (!battle) return;
  battle.arena = arena;
  battle.weatherField = createWeatherField(arena.weather);
  battle.terrainTexture = getSharedBattleTerrainTexture(battle.field, arena, {
    regenerate: false,
    preserveCurrentMirror: true,
  });
  if (!battle.terrainTexture.ready) queueBattleTerrainTextureGeneration(battle);
  battle.props = buildFieldProps(battle.field, arena);
  clearSelectedBattleProp();
}

function randomizeArenaAndWeather() {
  if (!state.battle) return;
  const activeCount = state.battle.factions?.length || state.factions.length || 2;
  const roundIndex = state.battle.meta?.tournamentRound || 0;
  const matchIndex = state.battle.meta?.tournamentMatch || 0;
  const arena = createRandomArenaVariant(roundIndex, matchIndex, activeCount);
  if (state.tournament) {
    const match = getCurrentTournamentMatch(state.tournament);
    if (match) match.arena = arena;
  }
  applyArenaToBattle(state.battle, arena);
  renderBracketTracker();
  const label = state.tournament ? getCurrentMatchLabel(state.tournament) : "Arena reset";
  setTicker(`${label} now unfolds in ${arena.name} under ${arena.weather}.`);
}

function factionColor(index) {
  const palette = ["#db7d4a", "#5ca5cf", "#d2bf62", "#b375d7", "#c45c68", "#53b88a", "#d6809b", "#7498e5"];
  return palette[index % palette.length];
}

function openTournamentStoryModal() {
  if (!isTournamentActive()) return;
  renderTournamentStoryModal();
  els.tournamentStoryModal.classList.remove("hidden");
}

function closeTournamentStoryModal() {
  els.tournamentStoryModal.classList.add("hidden");
}

function renderTournamentStoryModal() {
  const tournament = state.tournament;
  if (!tournament) {
    els.tournamentStorySummary.textContent = "The full bracket will appear here once a tournament begins.";
    els.tournamentStoryGraph.innerHTML = "";
    return;
  }

  const completedMatches = tournament.rounds.reduce((total, round) => total + round.matches.filter((match) => match.status === "complete").length, 0);
  els.tournamentStorySummary.textContent = tournament.complete
    ? (tournament.championId
      ? `${findSourceFaction(tournament.championId)?.title || "A champion"} completed the run after ${completedMatches} finished heats.`
      : `The bracket ended without a surviving champion after ${completedMatches} finished heats.`)
    : `${completedMatches} heats have concluded so far. The tree below traces every surviving route through the bracket.`;

  const layout = buildTournamentStoryLayout(tournament);
  const connectors = layout.connectors.map((connector) => `
    <path d="M ${connector.startX} ${connector.startY} H ${connector.midX} V ${connector.endY} H ${connector.endX}" />
  `).join("");
  const nodes = layout.nodes.map((node) => `
    <article class="story-node ${node.match.status}" style="left:${node.x}px; top:${node.y}px; width:${layout.nodeWidth}px; min-height:${node.height}px;">
      <div class="story-node-header">
        <div>
          <p class="story-node-round">${escapeHtml(node.roundLabel)}</p>
          <h3 class="story-node-title">${escapeHtml(node.match.label)}</h3>
        </div>
        <span class="bracket-badge">${escapeHtml(getTournamentMatchBadgeLabel(node.match))}</span>
      </div>
      <p class="story-node-arena">${escapeHtml(node.match.arena.name)} under ${escapeHtml(node.match.arena.weather)}</p>
      <div class="story-node-banners" style="grid-template-columns: repeat(${node.columns}, minmax(0, 1fr));">
        ${node.match.factionIds.map((factionId) => buildTournamentStoryBanner(tournament, node.roundIndex, node.matchIndex, node.match, factionId)).join("")}
      </div>
    </article>
  `).join("");

  els.tournamentStoryGraph.innerHTML = `
    <div class="story-bracket-shell">
      <div class="story-bracket-stage" style="width:${layout.width}px; height:${layout.height}px;">
        <svg class="story-bracket-lines" viewBox="0 0 ${layout.width} ${layout.height}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          ${connectors}
        </svg>
        ${nodes}
      </div>
    </div>
  `;
}

function buildTournamentStoryLayout(tournament) {
  const nodeWidth = 368;
  const columnGap = 108;
  const rowGap = 32;
  const paddingX = 28;
  const paddingY = 32;
  const nodes = [];
  const byMatchId = new Map();

  tournament.rounds.forEach((round, roundIndex) => {
    if (roundIndex === 0) {
      round.matches.forEach((match, matchIndex) => {
        const x = paddingX + (roundIndex * (nodeWidth + columnGap));
        const height = getTournamentStoryNodeHeight(match);
        const y = matchIndex === 0
          ? paddingY
          : nodes[nodes.length - 1].y + nodes[nodes.length - 1].height + rowGap;
        const node = { match, roundIndex, matchIndex, roundLabel: round.label, x, y, height, columns: getTournamentStoryBannerColumns(match) };
        nodes.push(node);
        byMatchId.set(match.id, node);
      });
      return;
    }

    const previousRound = tournament.rounds[roundIndex - 1];
    const sourceGroups = chunkEvenly(previousRound.matches.map((match) => match.id), round.matches.length);
    round.matches.forEach((match, matchIndex) => {
      const height = getTournamentStoryNodeHeight(match);
      const sourceNodes = (sourceGroups[matchIndex] || []).map((matchId) => byMatchId.get(matchId)).filter(Boolean);
      const averageCenterY = sourceNodes.length
        ? sourceNodes.reduce((sum, entry) => sum + getTournamentStoryNodeCenter(entry), 0) / sourceNodes.length
        : paddingY + (matchIndex * (height + rowGap)) + (height / 2);
      const x = paddingX + (roundIndex * (nodeWidth + columnGap));
      const y = averageCenterY - (height / 2);
      const node = { match, roundIndex, matchIndex, roundLabel: round.label, x, y, height, columns: getTournamentStoryBannerColumns(match), sourceIds: sourceNodes.map((entry) => entry.match.id) };
      nodes.push(node);
      byMatchId.set(match.id, node);
    });
  });

  tournament.rounds.forEach((round, roundIndex) => {
    const roundNodes = nodes
      .filter((node) => node.roundIndex === roundIndex)
      .sort((a, b) => a.y - b.y);
    let cursor = paddingY;
    roundNodes.forEach((node) => {
      node.y = Math.max(node.y, cursor);
      cursor = node.y + node.height + rowGap;
    });
  });

  const minY = Math.min(...nodes.map((node) => node.y), paddingY);
  if (minY < paddingY) {
    const shift = paddingY - minY;
    nodes.forEach((node) => {
      node.y += shift;
    });
  }

  const connectors = nodes.flatMap((node) => {
    if (!node.sourceIds?.length) return [];
    return node.sourceIds
      .map((matchId) => byMatchId.get(matchId))
      .filter(Boolean)
      .map((sourceNode) => ({
        startX: sourceNode.x + nodeWidth,
        startY: getTournamentStoryNodeCenter(sourceNode),
        midX: sourceNode.x + nodeWidth + (columnGap / 2),
        endX: node.x,
        endY: getTournamentStoryNodeCenter(node),
      }));
  });

  const width = paddingX * 2 + (tournament.rounds.length * nodeWidth) + (Math.max(0, tournament.rounds.length - 1) * columnGap);
  const height = Math.max(
    paddingY * 2 + 180,
    ...nodes.map((node) => node.y + node.height + paddingY),
  );

  return { nodes, connectors, width, height, nodeWidth };
}

function getTournamentStoryNodeCenter(node) {
  return node.y + (node.height / 2);
}

function getTournamentStoryBannerColumns(match) {
  return Math.min(2, Math.max(1, Math.ceil((match?.factionIds?.length || 1) / 4)));
}

function getTournamentStoryNodeHeight(match) {
  const bannerCount = Math.max(1, match?.factionIds?.length || 0);
  const columns = getTournamentStoryBannerColumns(match);
  const rows = Math.ceil(bannerCount / columns);
  const headerHeight = 76;
  const bannerRowHeight = 108;
  const bannerGap = 8;
  const bodyPadding = 24;
  return headerHeight + bodyPadding + (rows * bannerRowHeight) + (Math.max(0, rows - 1) * bannerGap);
}

function estimateWrappedLineCount(text, charsPerLine = 18) {
  const words = `${text || ""}`.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  let lines = 1;
  let current = 0;
  words.forEach((word) => {
    const length = word.length;
    if (!current) {
      current = length;
      return;
    }
    if ((current + 1 + length) <= charsPerLine) {
      current += 1 + length;
      return;
    }
    lines += 1;
    current = length;
  });
  return Math.min(lines, 4);
}

function buildTournamentStoryBanner(tournament, roundIndex, matchIndex, match, factionId) {
  const faction = findSourceFaction(factionId);
  const stateName = getTournamentEntryState(tournament, roundIndex, matchIndex, match, factionId);
  const statusLabel = getTournamentEntryLabel(stateName);
  const title = faction?.title || "TBD";
  const meta = faction ? `${faction.armySize} troops` : "Unknown size";
  const className = stateName === "eliminated" ? "defeated" : stateName;
  const titleClass = getTournamentStoryBannerTitleClass(title, getTournamentStoryBannerColumns(match));
  return `
    <div class="story-banner-chip ${className}" style="--banner-color: ${escapeHtml(getTournamentFactionColor(tournament, factionId))}">
      <span class="story-banner-flag">${escapeHtml(getFallbackCoverMark(title))}</span>
      <div class="story-banner-chip-copy">
        <span class="story-banner-chip-name ${titleClass}">${escapeHtml(title)}</span>
        <span class="story-banner-chip-size">${escapeHtml(meta)}</span>
      </div>
      <span class="story-banner-chip-status">${escapeHtml(statusLabel)}</span>
    </div>
  `;
}

function getTournamentStoryBannerTitleClass(title, columns) {
  const lineCount = estimateWrappedLineCount(title, columns > 1 ? 15 : 28);
  if (lineCount >= 5) return "story-banner-chip-name-xxsmall";
  if (lineCount >= 4) return "story-banner-chip-name-xsmall";
  if (lineCount >= 3) return "story-banner-chip-name-small";
  return "";
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
  const weightTotal = weights.reduce((sum, value) => sum + value, 0);
  const counts = Object.fromEntries(UNIT_LIBRARY.map((unit) => [unit.id, 0]));
  if (weightTotal <= 0 || total <= 0) return counts;

  const entries = UNIT_LIBRARY.map((unit, index) => ({
    id: unit.id,
    weight: weights[index],
    exact: (total * weights[index]) / weightTotal,
  })).filter((entry) => entry.weight > 0);

  let allocated = 0;
  entries.forEach((entry) => {
    const base = Math.floor(entry.exact);
    counts[entry.id] = base;
    entry.remainder = entry.exact - base;
    allocated += base;
  });

  let remaining = total - allocated;
  while (remaining > 0 && entries.length) {
    const pool = entries
      .slice()
      .sort((a, b) => {
        if (b.remainder !== a.remainder) return b.remainder - a.remainder;
        return Math.random() - 0.5;
      });
    for (const entry of pool) {
      if (remaining <= 0) break;
      counts[entry.id] += 1;
      remaining -= 1;
    }
  }

  return counts;
}

function getUnitDefinition(unitOrType) {
  const unitType = typeof unitOrType === "string" ? unitOrType : unitOrType?.type;
  return UNIT_DEFINITIONS[unitType] || UNIT_DEFINITIONS.knight;
}

function getVeteranGoal(unitOrType) {
  return getUnitDefinition(unitOrType).veteran || null;
}

function scaleVeteranStat(stat, value) {
  if (typeof value !== "number") return value;
  if (stat === "maxHealth") return value * VETERAN_BONUSES.maxHealth;
  if (["damage", "heal", "backstabDamage", "slashDamage", "impulseDamage", "holdDamage", "poisonDamage", "igniteDamage", "biteDamage", "biteHeal", "regenPerSecond"].includes(stat)) return value * VETERAN_BONUSES.power;
  if (["range", "abductRange", "splash", "deathSplash", "impulseRange", "impulseDistance", "holdRange", "resetRadius", "contagionRadius", "raiseRange", "graveRange", "graveDeadZone", "auraRadius", "aggroRadius", "netRange", "pierceWidth"].includes(stat)) return value * VETERAN_BONUSES.radius;
  if (stat === "speed") return value * VETERAN_BONUSES.speed;
  if (stat === "cooldown") return value * VETERAN_BONUSES.cooldown;
  if (["holdDuration", "poisonDuration", "igniteDuration", "breathDuration", "netDuration"].includes(stat)) return value * VETERAN_BONUSES.duration;
  return value;
}

function scaleZombieStat(stat, value) {
  if (typeof value !== "number") return value;
  if (stat === "maxHealth") return value * ZOMBIE_PENALTIES.maxHealth;
  if (["damage", "heal", "backstabDamage", "slashDamage", "impulseDamage", "holdDamage", "poisonDamage", "igniteDamage", "biteDamage", "biteHeal", "regenPerSecond"].includes(stat)) return value * ZOMBIE_PENALTIES.power;
  if (["range", "abductRange", "splash", "deathSplash", "impulseRange", "impulseDistance", "holdRange", "resetRadius", "contagionRadius", "raiseRange", "graveRange", "graveDeadZone", "auraRadius", "aggroRadius", "netRange", "pierceWidth"].includes(stat)) return value * ZOMBIE_PENALTIES.radius;
  if (stat === "speed") return value * ZOMBIE_PENALTIES.speed;
  if (stat === "cooldown") return value * ZOMBIE_PENALTIES.cooldown;
  if (["holdDuration", "poisonDuration", "igniteDuration", "breathDuration", "netDuration"].includes(stat)) return value * ZOMBIE_PENALTIES.duration;
  return value;
}

function getUnitStats(unitOrType, unitDef = getUnitDefinition(unitOrType)) {
  const unit = typeof unitOrType === "string" ? null : unitOrType;
  const zombie = Boolean(unit && getUnitStatus(unit, "zombie"));
  const hasSongBuff = Boolean(unit && (getUnitStatus(unit, "bardichaste") || getUnitStatus(unit, "bardicvalor")));
  if (!unit?.veteran && !zombie && !unitDef.modifyStats && !hasSongBuff) return unitDef.stats;
  const scaledStats = {};
  Object.entries(unitDef.stats).forEach(([stat, value]) => {
    let nextValue = value;
    if (unit?.veteran) nextValue = scaleVeteranStat(stat, nextValue);
    if (zombie) nextValue = scaleZombieStat(stat, nextValue);
    scaledStats[stat] = nextValue;
  });
  const modifiedStats = unitDef.modifyStats ? unitDef.modifyStats(unit, scaledStats) : scaledStats;
  return modifyStatsForStatuses(unit, modifiedStats);
}

function modifyStatsForStatuses(unit, stats) {
  if (!unit || !stats) return stats;
  let modified = stats;
  if (getUnitStatus(unit, "bardichaste")) {
    modified = {
      ...modified,
      speed: (modified.speed ?? 0) * 1.24,
      cooldown: (modified.cooldown ?? 1) * 0.82,
    };
  }
  if (getUnitStatus(unit, "bardicvalor")) {
    modified = {
      ...modified,
      damage: typeof modified.damage === "number" ? modified.damage * 1.18 : modified.damage,
      heal: typeof modified.heal === "number" ? modified.heal * 1.18 : modified.heal,
      backstabDamage: typeof modified.backstabDamage === "number" ? modified.backstabDamage * 1.18 : modified.backstabDamage,
      slashDamage: typeof modified.slashDamage === "number" ? modified.slashDamage * 1.18 : modified.slashDamage,
      impulseDamage: typeof modified.impulseDamage === "number" ? modified.impulseDamage * 1.18 : modified.impulseDamage,
      holdDamage: typeof modified.holdDamage === "number" ? modified.holdDamage * 1.18 : modified.holdDamage,
      poisonDamage: typeof modified.poisonDamage === "number" ? modified.poisonDamage * 1.18 : modified.poisonDamage,
      igniteDamage: typeof modified.igniteDamage === "number" ? modified.igniteDamage * 1.18 : modified.igniteDamage,
      biteDamage: typeof modified.biteDamage === "number" ? modified.biteDamage * 1.18 : modified.biteDamage,
      biteHeal: typeof modified.biteHeal === "number" ? modified.biteHeal * 1.18 : modified.biteHeal,
      range: typeof modified.range === "number" ? modified.range * 1.05 : modified.range,
    };
  }
  return modified;
}

function syncUnitMaxHealth(unit, preserveRatio = true) {
  if (!unit) return;
  const oldMaxHealth = Math.max(1, unit.maxHealth || getUnitDefinition(unit).stats.maxHealth || 1);
  const currentRatio = clamp(unit.health / oldMaxHealth, 0, 1);
  unit.maxHealth = getUnitStats(unit).maxHealth;
  unit.health = preserveRatio
    ? clamp(unit.maxHealth * currentRatio, 0, unit.maxHealth)
    : Math.min(unit.health, unit.maxHealth);
}

function getUnitRenderScale(unit) {
  if (unit?.type === "inklord") return 4;
  const baseScale = getUnitDefinition(unit).renderScale || (unit?.type === "krieger" ? 1.2 : 1);
  return baseScale * (unit?.veteran ? VETERAN_BONUSES.spriteScale : 1);
}

function getLayoutHeightScale(layout) {
  const layoutHeight = layout?.height || DEFAULT_RIG_LAYOUT.height;
  return layoutHeight / DEFAULT_RIG_LAYOUT.height;
}

function getVeteranProgressValue(unit, metric) {
  if (!unit || !metric) return 0;
  if (metric === "kills") return unit.totalKills || 0;
  if (metric === "healing") return unit.totalHealingDone || 0;
  return unit.totalDamageDealt || 0;
}

function tryPromoteUnit(unit, battle) {
  if (!unit || unit.veteran || getUnitStatus(unit, "zombie")) return false;
  const veteranGoal = getVeteranGoal(unit);
  if (!veteranGoal) return false;
  if (getVeteranProgressValue(unit, veteranGoal.metric) < veteranGoal.threshold) return false;
  const previousMaxHealth = unit.maxHealth;
  unit.veteran = true;
  unit.maxHealth = getUnitStats(unit).maxHealth;
  unit.health = Math.min(unit.maxHealth, unit.health + (unit.maxHealth - previousMaxHealth));
  spawnBurst(battle, unit.x, unit.y - 14, "#ffdc7d", 18);
  setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"} promotes a veteran ${getUnitDefinition(unit).name.toLowerCase()}`);
  return true;
}

function recordUnitContribution(unit, metric, amount, battle) {
  if (!unit || unit.dead || amount <= 0) return;
  if (metric === "damage") {
    unit.totalDamageDealt = (unit.totalDamageDealt || 0) + amount;
  } else if (metric === "healing") {
    unit.totalHealingDone = (unit.totalHealingDone || 0) + amount;
  } else if (metric === "kills") {
    unit.totalKills = (unit.totalKills || 0) + amount;
  }
  tryPromoteUnit(unit, battle);
}

function removeStatusKind(unit, kind) {
  if (!unit?.statuses?.length) return false;
  const before = unit.statuses.length;
  unit.statuses = unit.statuses.filter((status) => status.kind !== kind);
  if (kind === "zombie" && before !== unit.statuses.length) syncUnitMaxHealth(unit, false);
  return unit.statuses.length !== before;
}

function getContributionCreditOwner(unit, battle) {
  if (!unit?.summonOwnerId || !battle) return null;
  const owner = findUnitById(battle, unit.summonOwnerId);
  if (!owner || owner.dead || owner.fled) return null;
  return owner;
}

function getPossessionStatus(unit, battle = null) {
  const status = getUnitStatus(unit, "possessed");
  if (!status) return null;
  if (!battle) return status;
  const source = status.sourceId ? findUnitById(battle, status.sourceId) : null;
  if (!source || source.dead || source.fled || source.type !== "phantom") return null;
  return status;
}

function getPossessingPhantom(unit, battle) {
  const possession = getPossessionStatus(unit, battle);
  return possession?.sourceId ? findUnitById(battle, possession.sourceId) : null;
}

function getUnitControlFactionId(unit, battle = null) {
  if (!unit) return null;
  if (battle && unit.thrallOwnerId) {
    const owner = findUnitById(battle, unit.thrallOwnerId);
    if (owner && !owner.dead && !owner.fled) {
      return getUnitControlFactionId(owner, battle);
    }
  }
  const phantom = battle ? getPossessingPhantom(unit, battle) : null;
  return phantom?.factionId || unit.factionId;
}

function areUnitsAllied(unit, other, battle) {
  if (!unit || !other) return false;
  if (unit.id === other.id) return true;
  if (unit.hostileToAll || other.hostileToAll) return false;
  return getUnitControlFactionId(unit, battle) === getUnitControlFactionId(other, battle);
}

function areUnitsHostile(unit, other, battle) {
  if (!unit || !other || unit.id === other.id) return false;
  if (unit.hostileToAll || other.hostileToAll) return true;
  return getUnitControlFactionId(unit, battle) !== getUnitControlFactionId(other, battle);
}

function getUnitDisplayFactionColor(unit, battle) {
  if (!unit || !battle) return null;
  if (unit.thrallOwnerId) {
    const controlFactionId = getUnitControlFactionId(unit, battle);
    return findFaction(battle, controlFactionId)?.color || findFaction(battle, unit.factionId)?.color || null;
  }
  return findFaction(battle, unit.factionId)?.color || null;
}

function isFinalLivingUnitForFaction(unit, battle) {
  const faction = findFaction(battle, unit?.factionId);
  if (!faction) return false;
  return faction.units.filter((entry) => !entry.dead && !entry.fled).length <= 1;
}

function getPhantomGraveRequirement(phantom) {
  return Math.max(3, 2 + (phantom?.possessionCount || 0));
}

function ejectPhantomFromHost(phantom, host, battle, options = {}) {
  if (!phantom || phantom.type !== "phantom") return false;
  const activeHost = host || (phantom.possessedUnitId ? findUnitById(battle, phantom.possessedUnitId) : null);
  if (activeHost) {
    removeStatusKind(activeHost, "possessed");
    activeHost.fleeing = false;
    if (options.leaveHostAtOneHp && !activeHost.dead) {
      activeHost.health = Math.max(1, activeHost.health);
    }
  }
  phantom.possessedUnitId = null;
  phantom.gravesToConsume = Math.max(phantom.gravesToConsume || 0, options.gravesToConsume ?? getPhantomGraveRequirement(phantom));
  phantom.focusTargetId = null;
  phantom.currentTargetKind = null;
  phantom.cooldown = Math.max(phantom.cooldown || 0, 0.75);
  phantom.spawnInvulnerable = true;
  phantom.invulnerableUntil = Math.max(phantom.invulnerableUntil || 0, (battle?.time || 0) + 1.1);
  if (activeHost) {
    phantom.x = clamp(activeHost.x + (Math.random() - 0.5) * 22, 18, battle.field.width - 18);
    phantom.y = clamp(activeHost.y - 18 + (Math.random() - 0.5) * 12, 18, battle.field.height - 18);
    phantom.vx = 0;
    phantom.vy = 0;
    phantom.z = 14;
    spawnBurst(battle, activeHost.x, activeHost.y - 12, "#b9adff", 18);
    battle.particles.push({ kind: "ring", x: activeHost.x, y: activeHost.y - 3, vx: 0, vy: 0, life: 0.42, age: 0, color: "rgba(188, 168, 255, 0.92)", size: 18, lineWidth: 3 });
  }
  return true;
}

function possessUnit(phantom, target, battle) {
  if (!phantom || phantom.type !== "phantom" || !target || target.dead || target.fled) return false;
  if (target.type === "inklord" || target.type === "phantom" || getPossessionStatus(target, battle)) return false;
  phantom.possessionCount = (phantom.possessionCount || 0) + 1;
  phantom.possessedUnitId = target.id;
  phantom.focusTargetId = target.id;
  phantom.currentTargetKind = "enemy";
  phantom.cooldown = 0.95;
  applyStatus(target, "possessed", 1, Infinity, phantom, battle);
  target.fleeing = false;
  spawnBurst(battle, target.x, target.y - 10, "#c7bbff", 16);
  battle.particles.push({ kind: "shockwave", x: target.x, y: target.y - 4, vx: 0, vy: 0, life: 0.34, age: 0, color: "rgba(154, 128, 255, 0.78)", size: 14, startSize: 14, maxSize: 42, lineWidth: 5 });
  setHighlight(`${findFaction(battle, phantom.factionId)?.title || "A faction"}'s phantom possesses a ${getUnitDefinition(target).name.toLowerCase()}`);
  return true;
}

function getVeteranGoalLabel(unitOrType) {
  return getVeteranGoal(unitOrType)?.label || "No veteran promotion";
}

function getStatusDefinition(kind) {
  return STATUS_DEFINITIONS[kind] || null;
}

function getUnitStatus(unit, kind) {
  return unit?.statuses?.find((status) => status.kind === kind) || null;
}

function getStatusStacks(unit, kind) {
  return getUnitStatus(unit, kind)?.stacks || 0;
}

function hasNegativeStatuses(unit) {
  return (unit?.statuses || []).some((status) => getStatusDefinition(status.kind)?.negative);
}

function applyStatus(unit, kind, stacks = 1, duration = null, source = null, battle = null) {
  const statusDef = getStatusDefinition(kind);
  const unitDef = getUnitDefinition(unit);
  if (!unit || unit.dead || !statusDef || stacks <= 0) return null;
  if (unitDef.immuneToStatusDamage && (statusDef.dps || 0) > 0) return null;
  const sourceStats = source ? getUnitStats(source) : null;
  const statusDuration = duration
    ?? (kind === "poison" ? sourceStats?.poisonDuration : null)
    ?? (kind === "ignite" ? sourceStats?.igniteDuration : null)
    ?? statusDef.defaultDuration;
  const statusDps = (kind === "poison" ? sourceStats?.poisonDamage : null)
    ?? (kind === "ignite" ? sourceStats?.igniteDamage : null)
    ?? statusDef.dps;
  if (!unit.statuses) unit.statuses = [];
  let status = getUnitStatus(unit, kind);
  if (!status) {
    status = {
      kind,
      stacks: 0,
      duration: statusDuration,
      tickTimer: 0,
      contagionTimer: 0,
      sourceId: source?.id || null,
      sourceFactionId: source?.factionId || null,
      dps: statusDps,
    };
    unit.statuses.push(status);
  }
  status.duration = Math.max(status.duration, statusDuration);
  status.sourceId = source?.id || status.sourceId || null;
  status.sourceFactionId = source?.factionId || status.sourceFactionId || null;
  status.dps = Math.max(status.dps || 0, statusDps);
  status.stacks = statusDef.stackable ? status.stacks + stacks : Math.max(status.stacks, stacks);
  if (kind === "zombie") syncUnitMaxHealth(unit, false);
  return status;
}

function clearNegativeStatuses(unit) {
  if (!unit) return false;
  const beforeExposure = Object.keys(unit.flameExposure || {}).length;
  const hadStatuses = unit.statuses?.length || 0;
  const kept = (unit.statuses || []).filter((status) => {
    const definition = getStatusDefinition(status.kind);
    if (!definition?.negative) return true;
    return definition.cleansable === false;
  });
  const changed = kept.length !== hadStatuses || beforeExposure > 0;
  unit.statuses = kept;
  unit.flameExposure = {};
  if (changed) syncUnitMaxHealth(unit, true);
  return changed;
}

function clearPoisonStatuses(unit) {
  if (!unit) return false;
  const hadStatuses = unit.statuses?.length || 0;
  unit.statuses = (unit.statuses || []).filter((status) => status.kind !== "poison");
  return (unit.statuses?.length || 0) !== hadStatuses;
}

function isUndeadOrThrall(unit) {
  return Boolean(unit && (getUnitStatus(unit, "zombie") || unit.raisedThrall || unit.thrallOwnerId));
}

function createUnitNarration(initialText = "") {
  return {
    text: initialText,
    update(nextText) {
      if (typeof nextText === "string" && nextText.trim()) this.text = nextText.trim();
      return this.text;
    },
  };
}

function getDefaultUnitActivity(unitOrType) {
  const type = typeof unitOrType === "string" ? unitOrType : unitOrType?.type;
  if (type === "phantom") return "Seeking a host to possess.";
  if (type === "medic") return "Seeking a wounded ally to heal.";
  if (type === "bard") return "Seeking allies to support.";
  if (type === "artificer") return "Seeking a place to build a turret.";
  if (type === "turret") return "Scanning for targets.";
  if (type === "spiderswarm") return "Skittering in search of prey.";
  return getUnitStats(type).range > 40 ? "Seeking a target to shoot." : "Seeking an enemy to engage.";
}

function updateUnitActivity(unit, text) {
  if (!unit?.Status) return text;
  return unit.Status.update(text);
}

function makeUnit(factionId, type, x, y) {
  const stats = getUnitStats(type);
  const unitDef = getUnitDefinition(type);
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
    bravery: 0.05 + Math.random() * 0.4,
    dead: false,
    fled: false,
    fleeing: false,
    nextStatusFleeCheckAt: 0,
    liftedBySpellId: null,
    displacedBySpellId: null,
    activeSpellId: null,
    killStreak: 0,
    walkTilt: 0,
    rotation: 0,
    gaitPhase: Math.random() * Math.PI * 2,
    stride: 0,
    bob: 0,
    walkBlend: 0,
    attackSwing: 0,
    focusTargetId: null,
    guardTargetId: null,
    invisible: type === "assassin",
    behaviorState: type === "assassin" ? "stalking" : "default",
    slashCooldown: 0,
    veteran: false,
    totalDamageDealt: 0,
    totalHealingDone: 0,
    totalKills: 0,
    statuses: [],
    flameExposure: {},
    statusVisualSeed: Math.random() * Math.PI * 2,
    thrallOwnerId: null,
    thrallIds: [],
    raisedThrall: false,
    currentTargetKind: null,
    currentGraveId: null,
    gravesRobbed: 0,
    wanderTargetX: x,
    wanderTargetY: y,
    wanderTimer: 0,
    lifeTimer: typeof stats.lifetime === "number" ? stats.lifetime : null,
    expiredByTimer: false,
    hostileToAll: Boolean(unitDef.hostileToAll),
    spawnInvulnerable: false,
    tauntCooldown: 0,
    huntsmanKnifeCooldown: 0,
    huntsmanNetCooldown: 0,
    constructedTurretId: null,
    builderId: null,
    summonOwnerId: null,
    possessedUnitId: null,
    gravesToConsume: 0,
    possessionCount: 0,
    retargetTimer: 0,
    invulnerableUntil: 0,
    turretAimAngle: 0,
    activeSongKind: null,
    songTimer: 0,
    Status: createUnitNarration(getDefaultUnitActivity(type)),
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

function getGroundTextureImage(textureId) {
  const source = GROUND_TEXTURE_SOURCES[textureId];
  return source ? getFactionImage(source) : null;
}

function hashStringToSeed(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6D2B79F5) >>> 0;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function randomRange(rand, min, max) {
  return min + (max - min) * rand();
}

function randomIntRange(rand, min, max) {
  return Math.floor(randomRange(rand, min, max + 1));
}

function chooseWeightedTextureId(rand, weights) {
  const entries = Object.entries(weights || {}).filter(([, weight]) => weight > 0);
  if (!entries.length) return "grass";
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = rand() * total;
  for (const [textureId, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return textureId;
  }
  return entries[entries.length - 1][0];
}

function getDominantWeightedTextureId(weights, fallback = "grass") {
  let selectedId = fallback;
  let selectedWeight = -Infinity;
  Object.entries(weights || {}).forEach(([textureId, weight]) => {
    if (weight > selectedWeight) {
      selectedId = textureId;
      selectedWeight = weight;
    }
  });
  return selectedId;
}

function removeTextureFromWeights(weights, textureId) {
  return Object.fromEntries(
    Object.entries(weights || {}).filter(([candidateId, weight]) => candidateId !== textureId && weight > 0),
  );
}

function cloneNumberRange(range, fallback) {
  if (Array.isArray(range) && range.length >= 2) return [range[0], range[1]];
  return [fallback[0], fallback[1]];
}

function createTerrainMaterialMaskConfigs(name, tileSize, replacementWeights, overrides = {}) {
  const entries = Object.entries(replacementWeights || {}).filter(([, weight]) => weight > 0).sort((a, b) => b[1] - a[1]);
  return entries.map(([textureId, weight], index) => {
    const key = `${name}|${textureId}|${index}`;
    const seedRand = createSeededRandom(hashStringToSeed(key));
    const bandBase = 0.2 + index * 0.14 + seedRand() * 0.04;
    const bandWidth = 0.18 + seedRand() * 0.08;
    const defaultConfig = {
      textureId,
      scaleMultiplier: 7.5 + index * 2.1 + seedRand() * 2.4,
      thresholdLow: bandBase,
      thresholdHigh: Math.min(0.92, bandBase + bandWidth),
      feather: 0.035 + seedRand() * 0.04,
      octaves: 3 + Math.floor(seedRand() * 2),
      persistence: 0.48 + seedRand() * 0.18,
      lacunarity: 1.9 + seedRand() * 0.45,
      warp: 0.12 + seedRand() * 0.18,
      alpha: 0.72 + Math.min(0.16, weight * 0.025),
    };
    const override = overrides[textureId] || {};
    const thresholdLow = override.thresholdLow ?? defaultConfig.thresholdLow;
    const thresholdHigh = Math.max(thresholdLow + 0.04, override.thresholdHigh ?? defaultConfig.thresholdHigh);
    return {
      ...defaultConfig,
      ...override,
      thresholdLow,
      thresholdHigh,
    };
  });
}

function createBattleTerrainTextureState(field, arena) {
  const profile = arena?.textureProfile ? cloneData(arena.textureProfile) : createArenaTextureProfile(arena?.name || "");
  const cacheKey = buildTerrainTextureCacheKey(field, arena, profile);
  const seed = hashStringToSeed(cacheKey);
  const mirror = getTerrainMirrorFlags(seed);
  return {
    width: Math.max(1, Math.round(field.width * TERRAIN_TEXTURE_RESOLUTION_SCALE)),
    height: Math.max(1, Math.round(field.height * TERRAIN_TEXTURE_RESOLUTION_SCALE)),
    worldWidth: field.width,
    worldHeight: field.height,
    resolutionScale: TERRAIN_TEXTURE_RESOLUTION_SCALE,
    cacheKey,
    seed,
    profile,
    canvas: null,
    pending: false,
    ready: false,
    queued: false,
    queueHandle: null,
    progress: 0,
    statusLabel: "Preparing terrain texture...",
    mirrorX: mirror.x,
    mirrorY: mirror.y,
  };
}

function getSharedBattleTerrainTexture(field, arena, options = {}) {
  const regenerate = Boolean(options.regenerate);
  const preserveCurrentMirror = Boolean(options.preserveCurrentMirror);
  const mirrorKey = options.mirrorKey || "";
  const source = state.sessionTerrainTexture;
  const needsFreshTerrain = regenerate
    || !source
    || source.worldWidth !== field.width
    || source.worldHeight !== field.height;

  if (needsFreshTerrain) {
    state.sessionTerrainTexture = createBattleTerrainTextureState(field, arena);
  }

  const activeSource = state.sessionTerrainTexture;
  if (!activeSource) return createBattleTerrainTextureState(field, arena);
  if (!activeSource.ready || activeSource.pending || activeSource.queued) return activeSource;

  let mirrorX = activeSource.mirrorX;
  let mirrorY = activeSource.mirrorY;
  if (preserveCurrentMirror && state.battle?.terrainTexture) {
    mirrorX = state.battle.terrainTexture.mirrorX;
    mirrorY = state.battle.terrainTexture.mirrorY;
  } else if (mirrorKey) {
    const mirror = getTerrainMirrorFlags(hashStringToSeed(`terrain-mirror|${mirrorKey}`));
    mirrorX = mirror.x;
    mirrorY = mirror.y;
  }

  return {
    ...activeSource,
    mirrorX,
    mirrorY,
    pending: false,
    queued: false,
    queueHandle: null,
  };
}

function buildTerrainTextureCacheKey(field, arena, profile) {
  return JSON.stringify({
    worldWidth: field?.width || FIELD.width,
    worldHeight: field?.height || FIELD.height,
    arenaName: arena?.name || "arena",
    weather: arena?.weather || "clear",
    profile,
  });
}

function createTournamentHeatGroups(factionIds, config = state.tournamentConfig) {
  const normalized = normalizeTournamentConfig(config);
  const factionCount = factionIds.length;
  if (factionCount <= 0) return [];
  if (factionCount <= normalized.maxFactionsPerHeat) return [factionIds.slice()];
  const minGroupCount = Math.ceil(factionCount / normalized.maxFactionsPerHeat);
  const maxGroupCount = Math.max(1, Math.floor(factionCount / normalized.minFactionsPerHeat));
  const groupCount = minGroupCount <= maxGroupCount
    ? minGroupCount
    : minGroupCount;
  return chunkEvenly(factionIds, groupCount);
}

function getTerrainMirrorFlags(seed) {
  const options = [
    { x: false, y: false },
    { x: true, y: false },
    { x: false, y: true },
    { x: true, y: true },
  ];
  return options[Math.abs(Math.trunc(seed || 0)) % options.length] || options[0];
}

async function ensureBattleTerrainTexture(battle) {
  if (!state.useTerrainTexturing) return false;
  if (!battle?.terrainTexture || battle.terrainTexture.ready || battle.terrainTexture.pending) return Boolean(battle?.terrainTexture?.ready);
  updateTerrainBuildStatus(0.08, "Loading terrain source textures...");
  const requiredTextureIds = new Set(Object.keys(battle.terrainTexture.profile?.weights || {}));
  if (battle.terrainTexture.profile?.baseTexture) requiredTextureIds.add(battle.terrainTexture.profile.baseTexture);
  Object.keys(battle.terrainTexture.profile?.replacementWeights || {}).forEach((textureId) => requiredTextureIds.add(textureId));
  (battle.terrainTexture.profile?.materialMasks || []).forEach((material) => {
    if (material.textureId) requiredTextureIds.add(material.textureId);
  });
  const images = {};
  const unresolved = [...requiredTextureIds].some((textureId) => {
    const image = getGroundTextureImage(textureId);
    if (!image || !image.complete || image.naturalWidth <= 0) return true;
    images[textureId] = image;
    return false;
  });
  if (unresolved) return false;
  battle.terrainTexture.pending = true;
  battle.terrainTexture.canvas = await buildBattleTerrainTextureCanvas(battle.terrainTexture, battle.arena, images);
  battle.terrainTexture.ready = Boolean(battle.terrainTexture.canvas);
  battle.terrainTexture.pending = false;
  if (battle.terrainTexture.ready) {
    if (battle.terrainTexture.cacheKey) {
      state.terrainTextureCache.set(battle.terrainTexture.cacheKey, {
        canvas: battle.terrainTexture.canvas,
        profile: battle.terrainTexture.profile,
        seed: battle.terrainTexture.seed,
        mirrorX: battle.terrainTexture.mirrorX,
        mirrorY: battle.terrainTexture.mirrorY,
      });
    }
    if (state.tournament && !state.tournamentTerrainTextureCache?.canvas) {
      state.tournamentTerrainTextureCache = {
        canvas: battle.terrainTexture.canvas,
        cacheKey: battle.terrainTexture.cacheKey,
      };
    }
    updateTerrainBuildStatus(1, "Terrain texture ready.");
    window.setTimeout(() => {
      if (state.battle === battle && battle.terrainTexture?.ready) hideTerrainBuildStatus();
    }, 260);
  }
  return battle.terrainTexture.ready;
}

function clearBattleTerrainTextureQueue(terrainTexture) {
  if (!terrainTexture) return;
  const handles = Array.isArray(terrainTexture.queueHandle)
    ? terrainTexture.queueHandle
    : terrainTexture.queueHandle ? [terrainTexture.queueHandle] : [];
  handles.forEach((handle) => {
    if (handle.kind === "idle" && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(handle.id);
    } else {
      clearTimeout(handle.id);
    }
  });
  terrainTexture.queueHandle = null;
  terrainTexture.queued = false;
}

function queueBattleTerrainTextureGeneration(battle, delayMs = 90) {
  if (!state.useTerrainTexturing || !battle?.terrainTexture || battle.terrainTexture.ready || battle.terrainTexture.pending || battle.terrainTexture.queued) return;
  const terrainTexture = battle.terrainTexture;
  updateTerrainBuildStatus(0.04, "Queued terrain texture build...");
  let completed = false;
  const runGeneration = async () => {
    if (completed) return;
    completed = true;
    clearBattleTerrainTextureQueue(terrainTexture);
    terrainTexture.queueHandle = null;
    terrainTexture.queued = false;
    if (!state.useTerrainTexturing || state.battle !== battle || battle.terrainTexture !== terrainTexture) return;
    await waitForNextPaint();
    const ready = await ensureBattleTerrainTexture(battle);
    if (!ready) queueBattleTerrainTextureGeneration(battle, Math.max(180, delayMs * 2));
  };
  terrainTexture.queued = true;
  terrainTexture.queueHandle = [];
  if (typeof window.requestIdleCallback === "function") {
    terrainTexture.queueHandle.push({
      kind: "idle",
      id: window.requestIdleCallback(runGeneration, { timeout: Math.max(120, delayMs * 3) }),
    });
  }
  terrainTexture.queueHandle.push({
    kind: "timeout",
    id: window.setTimeout(runGeneration, delayMs),
  });
}

async function buildBattleTerrainTextureCanvas(terrainTexture, arena, images) {
  const canvas = document.createElement("canvas");
  canvas.width = terrainTexture.width;
  canvas.height = terrainTexture.height;
  const textureCtx = canvas.getContext("2d");
  const rand = createSeededRandom(terrainTexture.seed);
  const profile = terrainTexture.profile || createArenaTextureProfile(arena?.name || "");
  const resolutionScale = terrainTexture.resolutionScale || 1;
  textureCtx.clearRect(0, 0, canvas.width, canvas.height);
  updateTerrainBuildStatus(0.18, "Preparing terrain texture...");
  await waitForNextPaint();
  const sharedTileSize = randomRange(rand, profile.tileSize[0], profile.tileSize[1]) * 0.2 * resolutionScale;
  profile.renderedTileSize = sharedTileSize;
  updateTerrainBuildStatus(0.34, "Tiling ground textures...");
  await waitForNextPaint();
  const texturePlanes = buildTerrainTexturePlanes(images, profile, canvas.width, canvas.height, sharedTileSize);
  const basePlane = texturePlanes[profile.baseTexture];
  updateTerrainBuildStatus(0.52, "Laying base terrain...");
  await waitForNextPaint();
  if (basePlane) textureCtx.drawImage(basePlane, 0, 0);

  const materialMasks = profile.materialMasks || [];
  for (let materialIndex = 0; materialIndex < materialMasks.length; materialIndex += 1) {
    const material = materialMasks[materialIndex];
    const progress = 0.6 + (((materialIndex + 1) / Math.max(1, materialMasks.length)) * 0.34);
    updateTerrainBuildStatus(progress, `Blending terrain layer ${materialIndex + 1} of ${materialMasks.length}...`);
    await waitForNextPaint();
    drawTerrainTextureMaterialMask(textureCtx, texturePlanes, profile, material, materialIndex, canvas.width, canvas.height);
  }
  updateTerrainBuildStatus(0.97, "Finishing terrain texture...");
  await waitForNextPaint();
  return canvas;
}

function updateTerrainBuildStatus(progress, label) {
  state.terrainBuildUi.visible = state.useTerrainTexturing && HAS_BATTLE_PAGE;
  state.terrainBuildUi.progress = clamp(Number(progress) || 0, 0, 1);
  state.terrainBuildUi.label = label || "Building terrain texture...";
  renderTerrainBuildStatus();
}

function hideTerrainBuildStatus() {
  state.terrainBuildUi.visible = false;
  state.terrainBuildUi.progress = 0;
  state.terrainBuildUi.label = "Building terrain texture...";
  renderTerrainBuildStatus();
}

function renderTerrainBuildStatus() {
  if (!els.terrainBuildStatus || !els.terrainBuildLabel || !els.terrainBuildFill || !els.terrainBuildPercent) return;
  const progressPercent = Math.round(clamp(state.terrainBuildUi.progress || 0, 0, 1) * 100);
  els.terrainBuildStatus.classList.toggle("hidden", !state.terrainBuildUi.visible);
  els.terrainBuildLabel.textContent = state.terrainBuildUi.label || "Building terrain texture...";
  els.terrainBuildFill.style.width = `${progressPercent}%`;
  els.terrainBuildPercent.textContent = `${progressPercent}%`;
  els.terrainBuildStatus.querySelector(".terrain-build-bar")?.setAttribute("aria-valuenow", `${progressPercent}`);
}

function waitForNextPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      window.setTimeout(resolve, 0);
    });
  });
}

function buildTerrainTexturePlanes(images, profile, width, height, tileSize) {
  const textureIds = new Set([profile.baseTexture, ...Object.keys(profile.replacementWeights || {})]);
  (profile.materialMasks || []).forEach((material) => {
    if (material.textureId) textureIds.add(material.textureId);
  });
  const planes = {};
  textureIds.forEach((textureId) => {
    const image = images[textureId];
    if (!image) return;
    planes[textureId] = buildTiledTerrainPlane(image, width, height, tileSize);
  });
  return planes;
}

function buildTiledTerrainPlane(image, width, height, tileSize) {
  const plane = document.createElement("canvas");
  plane.width = width;
  plane.height = height;
  const planeCtx = plane.getContext("2d");
  const tileHeight = tileSize;
  const tileWidth = tileHeight * (image.naturalWidth / Math.max(1, image.naturalHeight));
  for (let y = 0; y < height + tileHeight; y += tileHeight) {
    for (let x = 0; x < width + tileWidth; x += tileWidth) {
      planeCtx.drawImage(image, x, y, tileWidth, tileHeight);
    }
  }
  return plane;
}

function smoothstep(min, max, value) {
  if (max <= min) return value >= max ? 1 : 0;
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hashGridNoise(seed, x, y) {
  let hash = seed ^ Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  hash = (hash ^ (hash >>> 13)) >>> 0;
  hash = Math.imul(hash, 1274126177) >>> 0;
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967295;
}

function sampleValueNoise(seed, x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const tx = x - x0;
  const ty = y - y0;
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  const n00 = hashGridNoise(seed, x0, y0);
  const n10 = hashGridNoise(seed, x1, y0);
  const n01 = hashGridNoise(seed, x0, y1);
  const n11 = hashGridNoise(seed, x1, y1);
  return lerp(lerp(n00, n10, sx), lerp(n01, n11, sx), sy);
}

function sampleFractalTerrainNoise(seed, x, y, config) {
  let amplitude = 1;
  let frequency = 1;
  let total = 0;
  let totalAmplitude = 0;
  const octaves = Math.max(1, Math.round(config.octaves || 4));
  const persistence = config.persistence || 0.5;
  const lacunarity = config.lacunarity || 2;
  for (let octave = 0; octave < octaves; octave += 1) {
    total += sampleValueNoise(seed + octave * 1013, x * frequency, y * frequency) * amplitude;
    totalAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return totalAmplitude > 0 ? total / totalAmplitude : 0;
}

function buildTerrainMaterialNoiseMask(width, height, material, seed, renderedTileSize) {
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext("2d");
  const imageData = maskCtx.createImageData(width, height);
  const data = imageData.data;
  const scale = Math.max(18, material.scale || ((material.scaleMultiplier || 9) * renderedTileSize));
  const warpAmount = material.warp || 0;
  const feather = Math.max(0.01, material.feather || 0.08);
  const low = material.thresholdLow ?? 0.56;
  const high = material.thresholdHigh ?? 0.68;
  const alphaScale = material.alpha ?? 1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = x / scale;
      const ny = y / scale;
      const warpX = (sampleFractalTerrainNoise(seed + 17, nx * 0.9, ny * 0.9, material) - 0.5) * warpAmount;
      const warpY = (sampleFractalTerrainNoise(seed + 29, nx * 0.9 + 11.3, ny * 0.9 + 7.1, material) - 0.5) * warpAmount;
      const value = sampleFractalTerrainNoise(seed, nx + warpX, ny + warpY, material);
      const lowerBlend = smoothstep(low - feather, low + feather, value);
      const upperBlend = 1 - smoothstep(high - feather, high + feather, value);
      const alpha = lowerBlend * upperBlend * alphaScale;
      const pixelIndex = (y * width + x) * 4;
      data[pixelIndex] = 0;
      data[pixelIndex + 1] = 0;
      data[pixelIndex + 2] = 0;
      data[pixelIndex + 3] = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
    }
  }
  maskCtx.putImageData(imageData, 0, 0);
  return maskCanvas;
}

function drawTerrainTextureMaterialMask(textureCtx, texturePlanes, profile, material, materialIndex, width, height) {
  const plane = texturePlanes[material.textureId];
  if (!plane) return;
  const patchCanvas = document.createElement("canvas");
  patchCanvas.width = width;
  patchCanvas.height = height;
  const patchCtx = patchCanvas.getContext("2d");
  patchCtx.drawImage(plane, 0, 0);
  patchCtx.globalCompositeOperation = "destination-in";
  const maskSeed = hashStringToSeed(`${profile.key}|${profile.baseTexture}|${material.textureId}|${materialIndex}`);
  patchCtx.drawImage(buildTerrainMaterialNoiseMask(width, height, material, maskSeed, profile.renderedTileSize || 24), 0, 0);
  textureCtx.drawImage(patchCanvas, 0, 0);
}

function getUnitSpriteSource(unitId) {
  if (!unitId) return null;
  if (!state.unitSpriteSources.has(unitId)) {
    const entry = {
      unitId,
      candidates: UNIT_SPRITE_CANDIDATE_PATHS.map((buildPath) => buildPath(unitId)),
      candidateIndex: 0,
      status: "pending",
      image: null,
      url: null,
    };
    state.unitSpriteSources.set(unitId, entry);
    loadNextUnitSpriteCandidate(entry);
  }
  return state.unitSpriteSources.get(unitId);
}

function getRiggedUnitSpriteSource(unitId, options = {}) {
  if (!unitId || (!state.useRiggedSprites && !options.forceLoad)) return null;
  if (!state.riggedUnitSpriteSources.has(unitId)) {
    const entry = {
      unitId,
      candidates: UNIT_RIG_CANDIDATE_PATHS.map((buildPath) => buildPath(unitId)),
      candidateIndex: 0,
      status: "pending",
      image: null,
      url: null,
      manifest: null,
    };
    state.riggedUnitSpriteSources.set(unitId, entry);
    loadNextUnitRigCandidate(entry);
  }
  return state.riggedUnitSpriteSources.get(unitId);
}

function getStatusBadgeSource(statusId) {
  if (!statusId) return null;
  if (!state.statusBadgeSources.has(statusId)) {
    const entry = {
      statusId,
      candidates: STATUS_BADGE_CANDIDATE_PATHS.map((buildPath) => buildPath(statusId)),
      candidateIndex: 0,
      status: "pending",
      image: null,
      url: null,
    };
    state.statusBadgeSources.set(statusId, entry);
    loadNextStatusBadgeCandidate(entry);
  }
  return state.statusBadgeSources.get(statusId);
}

function loadNextUnitSpriteCandidate(entry) {
  if (!entry || entry.status === "loaded") return;
  const nextUrl = entry.candidates[entry.candidateIndex];
  if (!nextUrl) {
    entry.status = "missing";
    return;
  }
  const image = new Image();
  image.onload = () => {
    entry.status = "loaded";
    entry.image = image;
    entry.url = nextUrl;
  };
  image.onerror = () => {
    entry.candidateIndex += 1;
    loadNextUnitSpriteCandidate(entry);
  };
  image.src = nextUrl;
}

async function loadNextUnitRigCandidate(entry) {
  if (!entry || entry.status === "loaded") return;
  const nextUrl = entry.candidates[entry.candidateIndex];
  if (!nextUrl) {
    entry.status = "missing";
    return;
  }
  try {
    const response = await fetch(nextUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const manifest = await response.json();
    normalizeRigManifestPartHierarchy(manifest);
    manifest.__normalizedAnimationConfig = normalizeRigAnimationConfig(manifest.animations);
    const imageUrl = resolveRigImageUrl(nextUrl, manifest?.sheet?.image || `${entry.unitId}.png`);
    const image = await loadImageAsset(imageUrl);
    entry.status = "loaded";
    entry.url = nextUrl;
    entry.manifest = manifest;
    entry.image = image;
  } catch (error) {
    entry.candidateIndex += 1;
    loadNextUnitRigCandidate(entry);
  }
}

function resolveRigImageUrl(manifestUrl, imageName) {
  try {
    return new URL(imageName, new URL(manifestUrl, window.location.href)).toString();
  } catch (error) {
    const base = manifestUrl.split("/").slice(0, -1).join("/");
    return `${base}/${imageName}`;
  }
}

function loadImageAsset(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function getCompositionRiggedUnitSpriteSource(unitId) {
  return getRiggedUnitSpriteSource(unitId, { forceLoad: true });
}

function buildCompositionPreviewAnimationState(unitId) {
  const seed = hashStringToSeed(`composition-preview|${unitId}`);
  return {
    stride: 0,
    bob: 0,
    attack: 0,
    idle: Math.sin(seed) * 0.01,
    clipTimes: {
      idle: (seed % 1000) / 1000,
      walk: 0.12,
      attack: 1,
    },
    clipWeights: {
      idle: 1,
      walk: 0,
      attack: 0,
    },
  };
}

function drawCompositionRigPreview(target, unitId, source) {
  if (!target || !unitId || source?.status !== "loaded" || !source.manifest || !source.image?.complete) return false;
  const width = Math.max(1, Math.round(target.clientWidth || 64));
  const height = Math.max(1, Math.round(target.clientHeight || 64));
  const dpr = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.className = "unit-icon-rig-canvas";
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const previewCtx = canvas.getContext("2d");
  if (!previewCtx) return false;
  previewCtx.scale(dpr, dpr);
  previewCtx.clearRect(0, 0, width, height);
  const layout = source.manifest.layout || UNIT_SPRITE_LAYOUTS[unitId] || DEFAULT_RIG_LAYOUT;
  const targetHeight = height * 0.74;
  const previewScale = (targetHeight * 2.1) / Math.max(1, layout.height || DEFAULT_RIG_LAYOUT.height);
  previewCtx.fillStyle = "rgba(0,0,0,0.14)";
  previewCtx.beginPath();
  previewCtx.ellipse(width * 0.5, height * 0.86, width * 0.18, height * 0.055, 0, 0, Math.PI * 2);
  previewCtx.fill();
  previewCtx.save();
  previewCtx.translate(width * 0.5, height * 0.84);
  drawRiggedSpriteFromManifest(
    previewCtx,
    source.manifest,
    source.image,
    { type: unitId, displayFacingX: 1, statusVisualSeed: (hashStringToSeed(unitId) % 1000) / 1000 },
    previewScale,
    { animationState: buildCompositionPreviewAnimationState(unitId) },
  );
  previewCtx.restore();
  target.replaceChildren(canvas);
  target.dataset.renderMode = "rig";
  return true;
}

function renderCompositionUnitVisuals() {
  const visuals = Array.from(document.querySelectorAll("[data-unit-visual]"));
  let hasPendingRigLoads = false;
  visuals.forEach((visual) => {
    const unitId = visual.dataset.unitVisual;
    if (!unitId) return;
    const source = getCompositionRiggedUnitSpriteSource(unitId);
    if (source?.status === "loaded") {
      drawCompositionRigPreview(visual, unitId, source);
      return;
    }
    if (source?.status === "pending") {
      hasPendingRigLoads = true;
    }
    if (visual.dataset.renderMode !== "svg") {
      visual.innerHTML = getUnitIconMarkup(unitId);
      visual.dataset.renderMode = "svg";
    }
  });
  if (hasPendingRigLoads && !state.compositionModal.visualRetryQueued) {
    state.compositionModal.visualRetryQueued = true;
    window.setTimeout(() => {
      state.compositionModal.visualRetryQueued = false;
      if (!els.compositionModal?.classList.contains("hidden")) renderCompositionUnitVisuals();
    }, 140);
  }
}

function getRigAnimationClipSpeedForUnit(unitOrType, clipId) {
  const unitId = typeof unitOrType === "string" ? unitOrType : unitOrType?.type;
  const source = getRiggedUnitSpriteSource(unitId);
  if (!source?.manifest) return 1;
  const config = getRigAnimationConfigFromManifest(source.manifest);
  return clamp(Number(config.clips?.[clipId]?.speed) || 1, 0.1, 4);
}

function loadNextStatusBadgeCandidate(entry) {
  if (!entry || entry.status === "loaded") return;
  const nextUrl = entry.candidates[entry.candidateIndex];
  if (!nextUrl) {
    entry.status = "missing";
    return;
  }
  const image = new Image();
  image.onload = () => {
    entry.status = "loaded";
    entry.image = image;
    entry.url = nextUrl;
  };
  image.onerror = () => {
    entry.candidateIndex += 1;
    loadNextStatusBadgeCandidate(entry);
  };
  image.src = nextUrl;
}

function getTintedUnitSprite(image, url, color) {
  if (!image || !image.complete) return null;
  const cacheKey = `${url}|${color}`;
  if (!state.tintedUnitSprites.has(cacheKey)) {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const tintCtx = canvas.getContext("2d");
    tintCtx.drawImage(image, 0, 0);
    tintCtx.globalCompositeOperation = "source-atop";
    tintCtx.fillStyle = hexToRgba(color, UNIT_SPRITE_TINT_ALPHA);
    tintCtx.fillRect(0, 0, canvas.width, canvas.height);
    tintCtx.globalCompositeOperation = "source-over";
    state.tintedUnitSprites.set(cacheKey, canvas);
  }
  return state.tintedUnitSprites.get(cacheKey);
}

function drawUnitSprite(unit, color, scale) {
  if (drawRiggedUnitSprite(unit, color, scale)) return true;
  const source = getUnitSpriteSource(unit.type);
  if (!source || source.status !== "loaded" || !source.image?.complete) return false;
  const layout = UNIT_SPRITE_LAYOUTS[unit.type] || { height: 39, anchorX: 0.5, anchorY: 0.88 };
  const image = getTintedUnitSprite(source.image, source.url, color) || source.image;
  const renderScale = scale * getUnitRenderScale(unit);
  const targetHeight = layout.height * renderScale / 2.1;
  const aspectRatio = (image.width || 1) / (image.height || 1);
  const targetWidth = targetHeight * aspectRatio;
  ctx.drawImage(
    image,
    -targetWidth * layout.anchorX,
    -targetHeight * layout.anchorY,
    targetWidth,
    targetHeight,
  );
  return true;
}

function drawRiggedUnitSprite(unit, color, scale) {
  if (!state.useRiggedSprites) return false;
  const source = getRiggedUnitSpriteSource(unit.type);
  if (!source || source.status !== "loaded" || !source.image?.complete || !source.manifest) return false;
  const image = getTintedUnitSprite(source.image, `${source.url}|rig`, color) || source.image;
  drawRiggedSpriteFromManifest(ctx, source.manifest, image, unit, scale * getUnitRenderScale(unit));
  return true;
}

function drawRiggedSpriteFromManifest(targetCtx, manifest, image, unit, scale, options = {}) {
  if (!manifest?.parts || !image) return false;
  const layout = manifest.layout || UNIT_SPRITE_LAYOUTS[manifest.unitId] || DEFAULT_RIG_LAYOUT;
  const targetHeight = (layout.height || DEFAULT_RIG_LAYOUT.height) * scale / 2.1;
  const body = manifest.parts.body;
  if (!body) return false;
  const animation = options.animationState || buildRigAnimationState(unit, manifest);
  const sourceHeight = Math.max(1, manifest.sourceSize?.height || layout.height || DEFAULT_RIG_LAYOUT.height);
  const sourceWidth = Math.max(1, manifest.sourceSize?.width || layout.height || DEFAULT_RIG_LAYOUT.height);
  const sourceScale = targetHeight / sourceHeight;
  const anchorPoint = {
    x: sourceWidth * (layout.anchorX ?? DEFAULT_RIG_LAYOUT.anchorX),
    y: sourceHeight * (layout.anchorY ?? DEFAULT_RIG_LAYOUT.anchorY),
  };
  const bodyPivotSource = body.sourcePivot || anchorPoint;
  const partMetrics = {};
  const partMatrices = {};
  const partTransforms = {};
  const renderOrder = getRigRenderOrder(manifest);
  targetCtx.save();
  targetCtx.translate(
    (bodyPivotSource.x - anchorPoint.x) * sourceScale,
    (bodyPivotSource.y - anchorPoint.y) * sourceScale,
  );
  const rootMatrix = targetCtx.getTransform();
  function ensurePartMatrix(id) {
    if (partMatrices[id]) return partMatrices[id];
    const part = manifest.parts[id];
    if (!part) return rootMatrix;
    const transform = partTransforms[id] || (partTransforms[id] = getRigPartTransform(id, animation, unit, manifest));
    const mountX = (part.mount?.x || 0) * sourceScale;
    const mountY = (part.mount?.y || 0) * sourceScale;
    const baseScaleX = clamp(Number(part.scaleX) || 1, 0.05, 8);
    const baseScaleY = clamp(Number(part.scaleY) || 1, 0.05, 8);
    const partScaleX = (part.flipX ? -1 : 1) * baseScaleX * (1 + (transform.scaleX || 0));
    const partScaleY = (part.flipY ? -1 : 1) * baseScaleY * (1 + (transform.scaleY || 0));
    const parentId = id === "weapon" && manifest.weaponAttachment?.partId
      ? manifest.weaponAttachment.partId
      : part.parentId;
    const parentMatrix = parentId && manifest.parts[parentId]
      ? ensurePartMatrix(parentId)
      : rootMatrix;
    targetCtx.save();
    targetCtx.setTransform(parentMatrix);
    if (id === "weapon" && manifest.weaponAttachment?.partId && manifest.parts[manifest.weaponAttachment.partId]) {
      const parentPart = manifest.parts[manifest.weaponAttachment.partId];
      const attachment = manifest.weaponAttachment;
      const attachmentAngle = degToRad(attachment.angleDeg || 0);
      const attachmentX = ((attachment.x || 0) - (parentPart?.pivot?.x || 0)) * sourceScale;
      const attachmentY = ((attachment.y || 0) - (parentPart?.pivot?.y || 0)) * sourceScale;
      targetCtx.translate(
        attachmentX + mountX + (transform.x || 0) * targetHeight,
        attachmentY + mountY + (transform.y || 0) * targetHeight,
      );
      targetCtx.rotate(attachmentAngle + (transform.rotation || 0));
    } else {
      targetCtx.translate(mountX + (transform.x || 0) * targetHeight, mountY + (transform.y || 0) * targetHeight);
      targetCtx.rotate(transform.rotation || 0);
    }
    targetCtx.scale(partScaleX, partScaleY);
    partMatrices[id] = targetCtx.getTransform();
    targetCtx.restore();
    return partMatrices[id];
  }
  renderOrder.forEach((id) => {
    const part = manifest.parts[id];
    if (!part) return;
    const cellSize = manifest.sheet?.cellSize || 64;
    const columns = manifest.sheet?.columns || 4;
    const cellX = (part.cell % columns) * cellSize;
    const cellY = Math.floor(part.cell / columns) * cellSize;
    const matrix = ensurePartMatrix(id);
    if (options.collectPartMetrics) {
      const bounds = getTransformedRectBounds(
        matrix,
        -part.pivot.x * sourceScale,
        -part.pivot.y * sourceScale,
        part.frame.w * sourceScale,
        part.frame.h * sourceScale,
      );
      partMetrics[id] = {
        bounds,
        matrix,
      };
    }
    targetCtx.save();
    targetCtx.setTransform(matrix);
    targetCtx.drawImage(
      image,
      cellX + part.frame.x,
      cellY + part.frame.y,
      part.frame.w,
      part.frame.h,
      -part.pivot.x * sourceScale,
      -part.pivot.y * sourceScale,
      part.frame.w * sourceScale,
      part.frame.h * sourceScale,
    );
    targetCtx.restore();
  });
  targetCtx.restore();
  if (options.highlightPartId && partMetrics[options.highlightPartId]) {
    const { bounds } = partMetrics[options.highlightPartId];
    targetCtx.save();
    targetCtx.strokeStyle = options.dragPartId === options.highlightPartId ? "#c5f0af" : "#ffd483";
    targetCtx.lineWidth = options.dragPartId === options.highlightPartId ? 3 : 2;
    targetCtx.setLineDash(options.dragPartId === options.highlightPartId ? [8, 4] : [6, 4]);
    targetCtx.strokeRect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
    targetCtx.restore();
  }
  return options.collectPartMetrics
    ? { partMetrics, sourceScale, targetHeight }
    : true;
}

function getTransformedRectBounds(matrix, x, y, width, height) {
  const points = [
    transformMatrixPoint(matrix, x, y),
    transformMatrixPoint(matrix, x + width, y),
    transformMatrixPoint(matrix, x + width, y + height),
    transformMatrixPoint(matrix, x, y + height),
  ];
  return {
    minX: Math.min(...points.map((point) => point.x)),
    maxX: Math.max(...points.map((point) => point.x)),
    minY: Math.min(...points.map((point) => point.y)),
    maxY: Math.max(...points.map((point) => point.y)),
  };
}

function transformMatrixPoint(matrix, x, y) {
  return {
    x: matrix.a * x + matrix.c * y + matrix.e,
    y: matrix.b * x + matrix.d * y + matrix.f,
  };
}

function wrap01(value) {
  return ((value % 1) + 1) % 1;
}

function getUnitLocomotionProfile(unit) {
  const fallbackFacingX = unit?.displayFacingX || (Math.cos(unit?.facing || 0) >= 0 ? 1 : -1) || 1;
  const rawX = Number.isFinite(unit?.locomotionVectorX) ? unit.locomotionVectorX : Number(unit?.vx) || 0;
  const rawY = Number.isFinite(unit?.locomotionVectorY) ? unit.locomotionVectorY : Number(unit?.vy) || 0;
  const speed = Math.hypot(rawX, rawY);
  if (speed <= 0.001) {
    return {
      dirX: fallbackFacingX,
      dirY: 0,
      speed: 0,
      horizontal: 1,
      vertical: 0,
      diagonal: 0,
    };
  }
  const dirX = rawX / speed;
  const dirY = rawY / speed;
  const horizontal = clamp(Math.abs(dirX), 0, 1);
  const vertical = clamp(Math.abs(dirY), 0, 1);
  return {
    dirX,
    dirY,
    speed,
    horizontal,
    vertical,
    diagonal: Math.min(horizontal, vertical),
  };
}

function getUnitStrideMotionOffset(unit, scale) {
  const proceduralStrideOffset = Number.isFinite(unit?.proceduralWalk?.bodyAdvance)
    ? unit.proceduralWalk.bodyAdvance * 9.5 * scale / 2.1
    : null;
  const strideOffset = (proceduralStrideOffset ?? ((unit?.stride || 0) * 2.8 * scale / 2.1));
  const locomotion = getUnitLocomotionProfile(unit);
  const travelScaleX = lerp(0.08, 0.35, locomotion.horizontal);
  const travelScaleY = lerp(0.12, 0.24, locomotion.vertical);
  return {
    x: strideOffset * locomotion.dirX * travelScaleX,
    y: strideOffset * locomotion.dirY * travelScaleY,
  };
}

function getRigAnimationConfigFromManifest(manifest) {
  if (!manifest) return createDefaultRigAnimationConfig();
  if (!manifest.__normalizedAnimationConfig) {
    manifest.__normalizedAnimationConfig = normalizeRigAnimationConfig(manifest.animations);
  }
  return manifest.__normalizedAnimationConfig;
}

function buildRigAnimationState(unit, manifest) {
  const config = getRigAnimationConfigFromManifest(manifest);
  const now = state.battle?.time || performance.now() / 1000;
  const stride = unit?.stride || 0;
  const bob = unit?.bob || 0;
  const attack = clamp(unit?.attackSwing || 0, 0, 1);
  const walkBlend = clamp(unit?.walkBlend ?? smoothStep(0.08, 0.92, Math.max(Math.abs(stride), bob)), 0, 1);
  const idle = Math.sin((now * 2.1 * (config.clips.idle?.speed || 1)) + (unit?.statusVisualSeed || 0)) * 0.02;
  const walkTime = wrap01(Number.isFinite(unit?.proceduralWalk?.phase)
    ? unit.proceduralWalk.phase
    : ((unit?.gaitPhase || now * 7) / (Math.PI * 2)));
  const attackTime = clamp(attack > 0 ? 1 - attack : 1, 0, 1);
  return {
    stride,
    bob,
    attack,
    idle,
    locomotion: getUnitLocomotionProfile(unit),
    clipTimes: {
      idle: wrap01(now * 0.35 * (config.clips.idle?.speed || 1)),
      walk: walkTime,
      attack: attackTime,
    },
    clipWeights: {
      idle: 1 - walkBlend,
      walk: walkBlend,
      attack: attack > 0.001 ? 1 : 0,
    },
  };
}

function sampleRigClipPose(manifest, clipId, partId, time, overridePose = null) {
  if (overridePose) return normalizeRigKeyframePose(overridePose);
  const config = getRigAnimationConfigFromManifest(manifest);
  const clip = config.clips?.[clipId];
  return sampleSpriteRigKeyframePose(clip?.keyframes?.[partId] || [], time, clip?.loop);
}

function getRigStrideDriverForPart(partId, stride) {
  if (partId === "legFrontThigh" || partId === "legFrontShin") return clamp(stride, 0, 1);
  if (partId === "legBackThigh" || partId === "legBackShin") return clamp(-stride, 0, 1);
  return stride;
}

function updateUnitWalkBlend(unit, targetBlend, dt) {
  const currentBlend = clamp(unit?.walkBlend || 0, 0, 1);
  const nextBlend = currentBlend + (clamp(targetBlend, 0, 1) - currentBlend) * Math.min(1, dt * 1.15);
  unit.walkBlend = clamp(nextBlend, 0, 1);
}

function createProceduralWalkFootState(initialX) {
  return {
    x: initialX,
    lift: 0,
    progress: 1,
    stepping: false,
    startX: initialX,
    targetX: initialX,
    duration: 0.2,
    elapsed: 0,
  };
}

const PROCEDURAL_WALK_PLANT_DISTANCE_SCALE = 1.3;
const PROCEDURAL_WALK_BOB_FOOT_LOCK = 5.5 / 2.1;
const PROCEDURAL_WALK_REPLANT_THRESHOLD = 0.52;
const PROCEDURAL_WALK_ACTIVE_SPEED = 2.75;
const PROCEDURAL_WALK_VISIBLE_SPEED = 4.5;

function ensureUnitProceduralWalkState(unit) {
  if (!unit) return null;
  if (!unit.proceduralWalk) {
    const phaseSeed = Math.random();
    unit.proceduralWalk = {
      headingX: unit.displayFacingX || 1,
      headingY: 0,
      phase: phaseSeed,
      lastStepLeg: phaseSeed > 0.5 ? "front" : "back",
      bodyAdvance: 0,
      bodyBob: 0,
      front: createProceduralWalkFootState(0.18),
      back: createProceduralWalkFootState(-0.18),
    };
  }
  return unit.proceduralWalk;
}

function startProceduralWalkStep(walkState, legKey, targetX, duration) {
  const foot = walkState?.[legKey];
  if (!foot) return;
  foot.stepping = true;
  foot.startX = foot.x;
  foot.targetX = targetX;
  foot.duration = Math.max(0.08, duration);
  foot.elapsed = 0;
  foot.progress = 0;
  foot.lift = 0;
  walkState.lastStepLeg = legKey;
}

function updateUnitProceduralWalk(unit, dt, locomotion, speed, gaitSpeed) {
  const walkState = ensureUnitProceduralWalkState(unit);
  if (!walkState) return null;
  const active = speed > PROCEDURAL_WALK_ACTIVE_SPEED;
  const desiredHeadingX = active ? locomotion.dirX : (walkState.headingX || unit.displayFacingX || 1);
  const desiredHeadingY = active ? locomotion.dirY : (walkState.headingY || 0);
  const headingBlend = Math.min(1, dt * (active ? 10 : 5));
  walkState.headingX += (desiredHeadingX - walkState.headingX) * headingBlend;
  walkState.headingY += (desiredHeadingY - walkState.headingY) * headingBlend;
  const headingLength = Math.hypot(walkState.headingX, walkState.headingY) || 1;
  walkState.headingX /= headingLength;
  walkState.headingY /= headingLength;

  const cadence = active ? Math.max(0, unit.gaitAngularVelocity || 0) / (Math.PI * 2) : 0;
  walkState.phase = wrap01((walkState.phase || 0) + dt * cadence);
  const baseStepHalf = clamp(0.12 + gaitSpeed * 0.07 + Math.min(speed / 120, 0.08), 0.12, 0.34);
  const stepHalf = baseStepHalf * PROCEDURAL_WALK_PLANT_DISTANCE_SCALE;
  const stanceTravel = active ? cadence * baseStepHalf * 4 * dt : 0;
  const stepDuration = clamp(0.3 - gaitSpeed * 0.05, 0.12, 0.28);
  const feet = [walkState.front, walkState.back];
  feet.forEach((foot) => {
    if (foot.stepping) {
      foot.elapsed += dt;
      foot.progress = clamp(foot.elapsed / Math.max(foot.duration, 0.001), 0, 1);
      const eased = smoothStep(0, 1, foot.progress);
      foot.x = lerp(foot.startX, foot.targetX, eased);
      foot.lift = Math.sin(foot.progress * Math.PI);
      if (foot.progress >= 1) {
        foot.stepping = false;
        foot.x = foot.targetX;
        foot.progress = 1;
        foot.lift = 0;
      }
      return;
    }
    foot.x = clamp(foot.x - stanceTravel, -stepHalf * 1.45, stepHalf * 1.1);
    foot.lift += (0 - foot.lift) * Math.min(1, dt * 14);
  });

  if (active && !walkState.front.stepping && !walkState.back.stepping) {
    const preferredLeg = walkState.lastStepLeg === "front" ? "back" : "front";
    const alternateLeg = preferredLeg === "front" ? "back" : "front";
    let legToStep = preferredLeg;
    if (walkState[legToStep].x > -stepHalf * 0.52 && walkState[alternateLeg].x < walkState[legToStep].x) {
      legToStep = alternateLeg;
    }
    if (walkState[legToStep].x < -stepHalf * PROCEDURAL_WALK_REPLANT_THRESHOLD) {
      startProceduralWalkStep(
        walkState,
        legToStep,
        stepHalf * (0.96 + Math.min(speed / 220, 0.14)),
        stepDuration,
      );
    }
  }

  if (!active) {
    walkState.front.x += (0.12 - walkState.front.x) * Math.min(1, dt * 5.5);
    walkState.back.x += (-0.12 - walkState.back.x) * Math.min(1, dt * 5.5);
  }

  const frontSupport = 1 - clamp(walkState.front.lift, 0, 1);
  const backSupport = 1 - clamp(walkState.back.lift, 0, 1);
  const supportWeight = Math.max(0.001, frontSupport + backSupport);
  const supportCenter = ((walkState.front.x * frontSupport) + (walkState.back.x * backSupport)) / supportWeight;
  const supportBias = (frontSupport - backSupport) / supportWeight;
  const averageLift = (walkState.front.lift + walkState.back.lift) * 0.5;
  const phaseAngle = walkState.phase * Math.PI * 2;
  const strideWave = Math.sin(phaseAngle);
  const bobWave = 0.5 - Math.cos(phaseAngle * 2) * 0.5;
  const swayWave = Math.sin(phaseAngle);
  const targetAdvance = active ? clamp(supportCenter * 0.5, -0.2, 0.2) : 0;
  const targetBodyBob = active
    ? clamp((averageLift * (0.48 + locomotion.vertical * 0.18)) + (Math.abs(walkState.front.x - walkState.back.x) * 0.12), 0, 1.15)
    : 0;
  const targetGaitStride = active
    ? clamp((strideWave * (0.46 + gaitSpeed * 0.18)) + (supportCenter * 2.35), -1.2, 1.2)
    : 0;
  const targetGaitBob = active
    ? clamp((bobWave * (0.44 + gaitSpeed * 0.14)) + (averageLift * 0.4) + (Math.abs(supportBias) * 0.06), 0, 1.2)
    : 0;
  const targetBodySway = active
    ? clamp(
      ((supportBias * 0.016) + (swayWave * 0.012 * locomotion.horizontal)) * (0.45 + gaitSpeed * 0.2),
      -0.05,
      0.05,
    )
    : 0;
  walkState.bodyAdvance += (targetAdvance - walkState.bodyAdvance) * Math.min(1, dt * (active ? 10 : 6));
  walkState.bodyBob += (targetBodyBob - walkState.bodyBob) * Math.min(1, dt * (active ? 12 : 7));
  walkState.gaitStride = (walkState.gaitStride || 0) + (targetGaitStride - (walkState.gaitStride || 0)) * Math.min(1, dt * (active ? 12 : 7));
  walkState.gaitBob = (walkState.gaitBob || 0) + (targetGaitBob - (walkState.gaitBob || 0)) * Math.min(1, dt * (active ? 12 : 7));
  walkState.bodySway = (walkState.bodySway || 0) + (targetBodySway - (walkState.bodySway || 0)) * Math.min(1, dt * (active ? 10 : 6));
  return walkState;
}

function getRigProceduralFootVector(shinPart, thighLength) {
  const frameWidth = shinPart?.frame?.w || 0;
  const frameHeight = shinPart?.frame?.h || 0;
  const pivotX = shinPart?.pivot?.x || 0;
  const pivotY = shinPart?.pivot?.y || 0;
  return {
    x: clamp((frameWidth * 0.5) - pivotX, -thighLength * 0.18, thighLength * 0.22),
    y: Math.max(frameHeight - pivotY, thighLength * 0.72, 1),
  };
}

function getRigProceduralLegMetrics(manifest) {
  if (!manifest?.parts) return null;
  if (!manifest.__proceduralLegMetrics) {
    const buildMetrics = (thighId, shinId) => {
      const thighPart = manifest.parts[thighId];
      const shinPart = manifest.parts[shinId];
      if (!thighPart || !shinPart?.mount) return null;
      const thighVector = {
        x: shinPart.mount.x || 0,
        y: shinPart.mount.y || Math.max(1, (thighPart.frame?.h || 1) * 0.6),
      };
      const thighLength = Math.max(1, Math.hypot(thighVector.x, thighVector.y));
      const footVector = getRigProceduralFootVector(shinPart, thighLength);
      return {
        thighId,
        shinId,
        thighLength,
        shinLength: Math.max(1, Math.hypot(footVector.x, footVector.y)),
        thighRestAngle: Math.atan2(thighVector.y, thighVector.x),
        shinRestAngle: Math.atan2(footVector.y, footVector.x),
      };
    };
    manifest.__proceduralLegMetrics = {
      legFront: buildMetrics("legFrontThigh", "legFrontShin"),
      legBack: buildMetrics("legBackThigh", "legBackShin"),
    };
  }
  return manifest.__proceduralLegMetrics;
}

function solveRigTwoBoneIK(thighLength, shinLength, targetX, targetY, kneeSide = -1) {
  const rawDistance = Math.hypot(targetX, targetY);
  const distance = clamp(rawDistance, Math.abs(thighLength - shinLength) + 0.001, thighLength + shinLength - 0.001);
  if (distance <= 0.001) return null;
  const dirX = targetX / distance;
  const dirY = targetY / distance;
  const along = clamp(((thighLength * thighLength) - (shinLength * shinLength) + (distance * distance)) / (2 * distance), 0, thighLength);
  const height = Math.sqrt(Math.max(0, (thighLength * thighLength) - (along * along)));
  const perpX = -dirY;
  const perpY = dirX;
  const kneeX = dirX * along + perpX * height * kneeSide;
  const kneeY = dirY * along + perpY * height * kneeSide;
  return {
    thighAngle: Math.atan2(kneeY, kneeX),
    shinAngle: Math.atan2(targetY - kneeY, targetX - kneeX),
  };
}

function getRigProceduralLegPoseForPart(partId, animation, manifest, unit = null) {
  const metrics = getRigProceduralLegMetrics(manifest);
  const isFrontLeg = partId === "legFrontThigh" || partId === "legFrontShin";
  const isBackLeg = partId === "legBackThigh" || partId === "legBackShin";
  const legMetrics = isFrontLeg ? metrics?.legFront : isBackLeg ? metrics?.legBack : null;
  if (!legMetrics) return null;
  const walkWeight = clamp(animation.clipWeights?.walk ?? 0, 0, 1);
  if (walkWeight <= 0.001) return null;
  const gaitAmount = clamp(
    Math.max(walkWeight * 0.95, Math.abs(animation.stride || 0), animation.bob || 0),
    0,
    1,
  );
  const walkTime = wrap01(animation.clipTimes?.walk ?? 0);
  const phase = wrap01(walkTime + (isBackLeg ? 0.5 : 0));
  const stanceRatio = 0.58;
  const totalLength = legMetrics.thighLength + legMetrics.shinLength;
  const locomotion = animation.locomotion || getUnitLocomotionProfile(unit);
  const verticalDirection = (locomotion.dirY || 0) >= 0 ? 1 : -1;
  const horizontalWeight = clamp(locomotion.horizontal ?? 1, 0, 1);
  const verticalWeight = clamp(locomotion.vertical ?? 0, 0, 1);
  const verticalLiftWeight = verticalWeight * Math.abs(locomotion.dirY || 0);
  const verticalPhase = verticalDirection > 0 ? wrap01(1 - phase) : phase;
  const directionalPhase = lerp(phase, verticalPhase, verticalLiftWeight);
  const locomotionSpeed = Math.hypot(unit?.vx || 0, unit?.vy || 0) || Math.max(0, Number(unit?.locomotionSpeed) || 0);
  const gaitAngularVelocity = Math.max(0.001, Number(unit?.gaitAngularVelocity) || 0);
  const distancePerCycle = gaitAngularVelocity > 0
    ? locomotionSpeed * ((Math.PI * 2) / gaitAngularVelocity)
    : locomotionSpeed * 0.42;
  const distanceScale = clamp(0.85 + distancePerCycle / 14, 0.85, 2.1);
  const sideSign = isFrontLeg ? 1 : -1;
  const horizontalStepHalf = totalLength * (0.12 + gaitAmount * 0.11) * distanceScale;
  const verticalStepHalf = totalLength * (0.004 + gaitAmount * 0.008) * distanceScale;
  const stepHalf = lerp(verticalStepHalf, horizontalStepHalf, horizontalWeight);
  const horizontalLiftHeight = totalLength * (0.055 + gaitAmount * 0.045);
  const verticalLiftHeight = totalLength * (0.475 + gaitAmount * 0.275);
  const liftHeight = lerp(horizontalLiftHeight, verticalLiftHeight, verticalLiftWeight);
  const verticalPlantLift = totalLength * (0.11 + gaitAmount * 0.065);
  const stanceSink = totalLength * lerp(0.038, 0.014, horizontalWeight);
  const plantedCompression = totalLength * verticalLiftWeight * 0.07;
  const verticalLaneX = totalLength * 0.05 * sideSign;
  const lanePulse = totalLength * 0.01 * sideSign;
  const verticalPlantX = verticalLaneX + lanePulse * 0.22;
  const verticalRecoverX = verticalLaneX - lanePulse * 0.14;
  const groundY = Math.min(totalLength * 0.94, totalLength - 1.5);
  const bodyBobCompensation = Math.max(0, Number(unit?.bob) || 0) * PROCEDURAL_WALK_BOB_FOOT_LOCK;
  const walkState = unit?.proceduralWalk || null;
  const footState = walkState ? (isFrontLeg ? walkState.front : walkState.back) : null;
  let footX;
  let footY;
  if (footState) {
    const normalizedFootX = clamp(footState.x, -0.42, 0.42);
    const plantedWeight = 1 - clamp(footState.lift, 0, 1);
    const forwardReach = totalLength * lerp(0.95, 0.36, verticalLiftWeight);
    const laneBias = totalLength * sideSign * lerp(0.01, 0.045, verticalLiftWeight);
    const footLiftHeight = lerp(horizontalLiftHeight, totalLength * (0.18 + gaitAmount * 0.08), verticalLiftWeight);
    const compression = stanceSink * plantedWeight * 0.7;
    footX = (normalizedFootX * forwardReach) + laneBias;
    footY = groundY + bodyBobCompensation - (clamp(footState.lift, 0, 1) * footLiftHeight) + compression;
  } else {
    if (directionalPhase < stanceRatio) {
      const stanceT = directionalPhase / stanceRatio;
      const stanceWave = Math.sin(stanceT * Math.PI);
      const horizontalStanceX = lerp(stepHalf, -stepHalf, stanceT);
      const verticalStanceX = lerp(verticalPlantX, verticalRecoverX, smoothStep(0, 1, stanceT));
      const horizontalStanceY = groundY + bodyBobCompensation + stanceWave * stanceSink + (1 - Math.cos(stanceT * Math.PI * 2)) * 0.5 * plantedCompression;
      const verticalLowerT = smoothStep(0, 1, Math.min(1, stanceT / 0.82));
      const verticalStanceY = lerp(groundY - verticalPlantLift, groundY, verticalLowerT) + bodyBobCompensation + stanceWave * stanceSink * 0.35;
      footX = lerp(horizontalStanceX, verticalStanceX, verticalLiftWeight);
      footY = lerp(horizontalStanceY, verticalStanceY, verticalLiftWeight);
    } else {
      const swingT = smoothStep(0, 1, (directionalPhase - stanceRatio) / Math.max(1 - stanceRatio, 0.001));
      const swingWave = Math.sin(swingT * Math.PI);
      const swingLift = Math.sin(swingT * Math.PI) ** 0.82;
      const horizontalSwingX = lerp(-stepHalf, stepHalf, swingT);
      const verticalSwingX = lerp(verticalRecoverX, verticalPlantX, swingT);
      const horizontalSwingY = groundY + bodyBobCompensation - swingLift * liftHeight + verticalLiftWeight * swingWave * totalLength * 0.016;
      const verticalApproach = Math.sin(swingT * Math.PI * 0.5);
      const extraArcLift = Math.max(0, liftHeight - verticalPlantLift);
      const verticalSwingY = groundY + bodyBobCompensation - (verticalPlantLift * verticalApproach) - (extraArcLift * swingWave);
      footX = lerp(horizontalSwingX, verticalSwingX, verticalLiftWeight);
      footY = lerp(horizontalSwingY, verticalSwingY, verticalLiftWeight);
    }
  }
  const solved = solveRigTwoBoneIK(legMetrics.thighLength, legMetrics.shinLength, footX, footY);
  if (!solved) return null;
  const liftAmount = clamp((groundY - footY) / Math.max(verticalLiftHeight, 0.001), 0, 1);
  const liftBlend = smoothStep(0.06, 0.94, liftAmount);
  const thighRotationBias = lerp(1, 0.24, verticalLiftWeight * liftBlend);
  const rawThighRotation = solved.thighAngle - legMetrics.thighRestAngle;
  const rawShinRotation = solved.shinAngle - legMetrics.shinRestAngle - (rawThighRotation * thighRotationBias);
  const thighRotation = rawThighRotation * thighRotationBias * walkWeight;
  const shinRotation = rawShinRotation * walkWeight;
  const foreshorten = verticalLiftWeight * liftBlend * walkWeight;
  if (partId === legMetrics.thighId) {
    return {
      rotationDeg: radToDeg(thighRotation),
      x: 0,
      y: -0.014 * foreshorten,
      scaleX: 0.06 * foreshorten,
      scaleY: -0.28 * foreshorten,
    };
  }
  return {
    rotationDeg: radToDeg(shinRotation),
    x: 0,
    y: -0.01 * foreshorten,
    scaleX: 0.025 * foreshorten,
    scaleY: -0.08 * foreshorten,
  };
}

function getRigPartTransform(partId, animation, unit, manifest) {
  const config = getRigAnimationConfigFromManifest(manifest);
  const tuning = config.tuning?.[partId] || createEmptyRigAnimationTuningPart();
  const basePart = manifest.parts?.[partId] || null;
  const idlePose = sampleRigClipPose(
    manifest,
    "idle",
    partId,
    animation.clipTimes?.idle ?? 0,
    animation.previewKeyframeOverride?.clipId === "idle" && animation.previewKeyframeOverride?.partId === partId
      ? animation.previewKeyframeOverride.pose
      : null,
  );
  const walkPose = sampleRigClipPose(
    manifest,
    "walk",
    partId,
    animation.clipTimes?.walk ?? 0,
    animation.previewKeyframeOverride?.clipId === "walk" && animation.previewKeyframeOverride?.partId === partId
      ? animation.previewKeyframeOverride.pose
      : null,
  );
  const attackPose = sampleRigClipPose(
    manifest,
    "attack",
    partId,
    animation.clipTimes?.attack ?? 0,
    animation.previewKeyframeOverride?.clipId === "attack" && animation.previewKeyframeOverride?.partId === partId
      ? animation.previewKeyframeOverride.pose
      : null,
  );
  const strideDriver = getRigStrideDriverForPart(partId, animation.stride || 0);
  const proceduralWalkPose = animation.previewKeyframeOverride?.clipId === "walk" && animation.previewKeyframeOverride?.partId === partId
    ? null
    : getRigProceduralLegPoseForPart(partId, animation, manifest, unit);
  const strideContributionDriver = proceduralWalkPose ? 0 : strideDriver;
  const walkPoseWeight = proceduralWalkPose ? 0 : (animation.clipWeights?.walk ?? 0);
  const bobDriver = proceduralWalkPose ? 0 : (animation.bob || 0);
  const rotationDeg = (
    (Number(basePart?.rotationOffsetDeg) || 0)
    + (tuning.rotation.stride || 0) * strideContributionDriver
    + (proceduralWalkPose?.rotationDeg || 0)
    + (tuning.rotation.bob || 0) * bobDriver
    + (tuning.rotation.attack || 0) * (animation.attack || 0)
    + (tuning.rotation.idle || 0) * (animation.idle || 0)
    + idlePose.rotationDeg * (animation.clipWeights?.idle ?? 0)
    + walkPose.rotationDeg * walkPoseWeight
    + attackPose.rotationDeg * (animation.clipWeights?.attack ?? 0)
  );
  const x = (
    (tuning.x.stride || 0) * strideContributionDriver
    + (proceduralWalkPose?.x || 0)
    + (tuning.x.bob || 0) * bobDriver
    + (tuning.x.attack || 0) * (animation.attack || 0)
    + (tuning.x.idle || 0) * (animation.idle || 0)
    + idlePose.x * (animation.clipWeights?.idle ?? 0)
    + walkPose.x * walkPoseWeight
    + attackPose.x * (animation.clipWeights?.attack ?? 0)
  );
  const y = (
    (tuning.y.stride || 0) * strideContributionDriver
    + (proceduralWalkPose?.y || 0)
    + (tuning.y.bob || 0) * bobDriver
    + (tuning.y.attack || 0) * (animation.attack || 0)
    + (tuning.y.idle || 0) * (animation.idle || 0)
    + idlePose.y * (animation.clipWeights?.idle ?? 0)
    + walkPose.y * walkPoseWeight
    + attackPose.y * (animation.clipWeights?.attack ?? 0)
  );
  const scaleX = (
    (tuning.scaleX.stride || 0) * strideContributionDriver
    + (proceduralWalkPose?.scaleX || 0)
    + (tuning.scaleX.bob || 0) * bobDriver
    + (tuning.scaleX.attack || 0) * (animation.attack || 0)
    + (tuning.scaleX.idle || 0) * (animation.idle || 0)
    + idlePose.scaleX * (animation.clipWeights?.idle ?? 0)
    + walkPose.scaleX * walkPoseWeight
    + attackPose.scaleX * (animation.clipWeights?.attack ?? 0)
  );
  const scaleY = (
    (tuning.scaleY.stride || 0) * strideContributionDriver
    + (proceduralWalkPose?.scaleY || 0)
    + (tuning.scaleY.bob || 0) * bobDriver
    + (tuning.scaleY.attack || 0) * (animation.attack || 0)
    + (tuning.scaleY.idle || 0) * (animation.idle || 0)
    + idlePose.scaleY * (animation.clipWeights?.idle ?? 0)
    + walkPose.scaleY * walkPoseWeight
    + attackPose.scaleY * (animation.clipWeights?.attack ?? 0)
  );
  return {
    x,
    y,
    rotation: degToRad(rotationDeg),
    scaleX,
    scaleY,
  };
}

function drawStatusBadgeSprite(statusId, scale) {
  const source = getStatusBadgeSource(statusId);
  if (!source || source.status !== "loaded" || !source.image?.complete) return false;
  const size = 11.5 * scale / 2.1;
  ctx.drawImage(source.image, -size / 2, -size / 2, size, size);
  return true;
}

const BATTLE_SPATIAL_HASH_CELL_SIZE = 96;

function getBattleSpatialHashCell(x, y, cellSize = BATTLE_SPATIAL_HASH_CELL_SIZE) {
  return {
    x: Math.floor(x / cellSize),
    y: Math.floor(y / cellSize),
  };
}

function getBattleSpatialHashKey(cellX, cellY) {
  return `${cellX},${cellY}`;
}

function rebuildBattleTransientCaches(battle) {
  if (!battle) return null;
  const livingUnits = [];
  const unitById = new Map();
  const factionById = new Map();
  const relations = new Map();
  const spatialHash = {
    cellSize: BATTLE_SPATIAL_HASH_CELL_SIZE,
    cells: new Map(),
  };

  battle.factions.forEach((faction) => {
    factionById.set(faction.id, faction);
    faction.units.forEach((unit) => {
      unitById.set(unit.id, unit);
      if (unit.dead || unit.fled) return;
      livingUnits.push(unit);
      relations.set(unit.id, { allies: [unit], enemies: [] });
      const cell = getBattleSpatialHashCell(unit.x, unit.y, spatialHash.cellSize);
      const key = getBattleSpatialHashKey(cell.x, cell.y);
      if (!spatialHash.cells.has(key)) spatialHash.cells.set(key, []);
      spatialHash.cells.get(key).push(unit);
    });
  });

  for (let i = 0; i < livingUnits.length; i += 1) {
    const left = livingUnits[i];
    const leftRelations = relations.get(left.id);
    for (let j = i + 1; j < livingUnits.length; j += 1) {
      const right = livingUnits[j];
      const rightRelations = relations.get(right.id);
      if (areUnitsHostile(left, right, battle)) {
        if (canUnitBeTargeted(right, left)) leftRelations.enemies.push(right);
        if (canUnitBeTargeted(left, right)) rightRelations.enemies.push(left);
      } else if (areUnitsAllied(left, right, battle)) {
        leftRelations.allies.push(right);
        rightRelations.allies.push(left);
      }
    }
  }

  battle.transientCache = {
    livingUnits,
    inspectableUnitsSorted: livingUnits
      .filter((unit) => !(unit.type === "phantom" && unit.possessedUnitId))
      .slice()
      .sort((a, b) => a.y - b.y),
    unitById,
    factionById,
    relations,
    spatialHash,
  };
  return battle.transientCache;
}

function ensureBattleTransientCaches(battle) {
  return battle?.transientCache || rebuildBattleTransientCaches(battle);
}

function getCachedBattleRelations(battle, unit) {
  return ensureBattleTransientCaches(battle)?.relations?.get(unit?.id) || null;
}

function getNearbyLivingUnits(battle, x, y, radius) {
  const cache = ensureBattleTransientCaches(battle);
  if (!cache?.spatialHash) return [];
  const { cellSize, cells } = cache.spatialHash;
  const minCell = getBattleSpatialHashCell(x - radius, y - radius, cellSize);
  const maxCell = getBattleSpatialHashCell(x + radius, y + radius, cellSize);
  const nearby = [];
  for (let cellY = minCell.y; cellY <= maxCell.y; cellY += 1) {
    for (let cellX = minCell.x; cellX <= maxCell.x; cellX += 1) {
      const bucket = cells.get(getBattleSpatialHashKey(cellX, cellY));
      if (bucket?.length) nearby.push(...bucket);
    }
  }
  return nearby;
}

function getLivingBattleUnits(battle) {
  return ensureBattleTransientCaches(battle)?.livingUnits || [];
}

function getInspectableBattleUnitsSorted(battle) {
  return ensureBattleTransientCaches(battle)?.inspectableUnitsSorted || [];
}

function loop(timestamp) {
  const dt = Math.min(0.033, (timestamp - lastFrame) / 1000);
  lastFrame = timestamp;
  const instantFps = dt > 0 ? 1 / dt : 0;
  state.renderDebug.fps = state.renderDebug.fps > 0
    ? lerp(state.renderDebug.fps, instantFps, 0.12)
    : instantFps;
  const simDt = dt * getBattleSpeedMultiplier();
  if (HAS_BATTLE_PAGE) {
    if (state.running && state.battle) stepBattle(state.battle, simDt);
    if (state.tournament || state.running || state.battle?.completed) syncTournamentViewState();
    updateAudioFades(dt);
    updateCamera(dt);
    render();
  }
  if (HAS_SPRITE_RIG_PAGE) renderSpriteRigPreview();
  if (HAS_BATTLE_PAGE || HAS_SPRITE_RIG_PAGE) requestAnimationFrame(loop);
}

function stepBattle(battle, dt) {
  battle.time += dt;
  rebuildBattleTransientCaches(battle);
  updateInkLordEvent(battle, dt);
  updateBodyguardAuras(battle);
  updateBardAuras(battle);
  updateStatuses(battle, dt);
  battle.factions.forEach((faction) => {
    updateFactionBanner(faction);
    faction.alive = faction.units.some((unit) => !unit.dead && !unit.fled);
    faction.units.forEach((unit) => updateUnit(unit, faction, battle, dt));
  });
  rebuildBattleTransientCaches(battle);
  updateBodyguardAuras(battle);
  updateBardAuras(battle);
  updateProjectiles(battle, dt);
  updateParticles(battle, dt);
  updateSpells(battle, dt);
  updateBossBubbles(battle, dt);
  updateSwipes(battle, dt);
  updateTraces(battle, dt);
  updateStuckArrows(battle, dt);
  updateFactionExtinctions(battle);
  updateBattleHighlights(battle);
  recordBattleHealthTimeline(battle);

  const contenders = getLivingResultFactions(battle);
  const neutralThreatActive = hasLivingNeutralThreat(battle);
  if (!battle.completed && contenders.length === 1) {
    if (neutralThreatActive) dismissNeutralThreats(battle, contenders[0]);
    const winner = contenders[0];
    battle.pendingWinner = winner ? winner.id : null;
    battle.completed = true;
    stopInkLordEvent(battle);
    endBattleAudio();
    els.battleState.textContent = state.tournament ? `${getCurrentMatchLabel(state.tournament)} complete` : "Complete";
    els.winnerLabel.textContent = winner.title;
    setTicker(`${winner.title} survives the melee.`);
    showWinnerCard(winner, battle);
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderSpeedControls();
    return;
  }
  if (!battle.completed && contenders.length === 0) {
    const winner = contenders[0];
    battle.pendingWinner = winner ? winner.id : null;
    battle.completed = true;
    stopInkLordEvent(battle);
    endBattleAudio();
    els.battleState.textContent = state.tournament ? `${getCurrentMatchLabel(state.tournament)} complete` : "Complete";
    if (winner) {
      els.winnerLabel.textContent = winner.title;
      setTicker(`${winner.title} survives the melee.`);
      showWinnerCard(winner, battle);
    } else {
      els.winnerLabel.textContent = "Mutual destruction";
      setTicker("No army survived the field.");
      showWinnerCard(null, battle);
    }
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderSpeedControls();
  }
}

function updateBossBubbles(battle, dt) {
  battle.bossBubbles = (battle.bossBubbles || []).filter((bubble) => {
    bubble.age += dt;
    bubble.rise = (bubble.rise || 0) + dt * 16;
    const source = findUnitById(battle, bubble.sourceId);
    return bubble.age < bubble.life && source && !source.dead && !source.fled;
  });
}

function dismissNeutralThreats(battle, winner = null) {
  battle.factions.forEach((faction) => {
    if (!faction.excludeFromResults) return;
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled) return;
      spawnBurst(battle, unit.x, unit.y - 10, "#8e7cff", 22);
      battle.particles.push({ kind: "shockwave", x: unit.x, y: unit.y, vx: 0, vy: 0, life: 0.45, age: 0, color: "#6f60ff", size: 26, startSize: 26, maxSize: 110, lineWidth: 10 });
      unit.dead = true;
      unit.health = 0;
      unit.fled = true;
    });
    faction.alive = false;
  });
  if (winner) {
    setHighlight(`InkLord withdraws as ${winner.title} claims the field`);
  }
}

function updateFactionExtinctions(battle) {
  battle.factions.forEach((faction) => {
    const active = faction.units.filter((unit) => !unit.dead && !unit.fled).length;
    faction.alive = active > 0;
    if (faction.excludeFromResults) return;
    if (active === 0 && !battle.notes.extinguished[faction.id]) {
      battle.notes.extinguished[faction.id] = true;
      queueKnockoutAnnouncement(battle, faction);
      setHighlight(`${faction.title} has been wiped from the field`);
    }
  });
}

function updateInkLordEvent(battle, dt) {
  const event = battle.inklordEvent;
  if (!event || event.phase === "complete") return;
  if (event.phase === "waiting" && battle.time >= event.scheduledAt) {
    spawnInkLord(battle);
    return;
  }
  if (event.phase !== "descending") return;
  const unit = findUnitById(battle, event.unitId);
  if (!unit || unit.dead) {
    event.phase = "complete";
    return;
  }
  unit.x = event.landingX;
  unit.y = event.landingY;
  unit.vx = 0;
  unit.vy = 0;
  unit.z = Math.max(0, unit.z - dt * 260);
  if (Math.random() > 0.14) {
    battle.particles.push({
      x: unit.x + (Math.random() - 0.5) * 34,
      y: unit.y - 26 + Math.random() * 18,
      vx: (Math.random() - 0.5) * 18,
      vy: -36 - Math.random() * 28,
      life: 0.4 + Math.random() * 0.24,
      age: 0,
      color: Math.random() > 0.45 ? "#1a1a22" : "#5a4a78",
      size: 5 + Math.random() * 8,
    });
  }
  if (unit.z > 0) return;
  event.phase = "complete";
  event.impactAt = battle.time;
  unit.z = 0;
  unit.liftedBySpellId = null;
  unit.spawnInvulnerable = false;
  resolveInkLordArrivalImpact(unit, battle);
}

function stopInkLordEvent(battle) {
  if (!battle?.inklordEvent) return;
  battle.inklordEvent.phase = "complete";
}

function spawnInkLord(battle) {
  let faction = findFaction(battle, INKLORD_FACTION_ID);
  if (!faction) {
    faction = createInkLordFaction();
    battle.factions.push(faction);
  }
  const unit = makeUnit(INKLORD_FACTION_ID, "inklord", battle.field.centerX, battle.field.centerY);
  unit.z = 320;
  unit.health = unit.maxHealth;
  unit.bravery = 2;
  unit.spawnInvulnerable = true;
  unit.liftedBySpellId = "inklord-arrival";
  unit.hostileToAll = true;
  faction.units.push(unit);
  battle.inklordEvent.unitId = unit.id;
  battle.inklordEvent.phase = "descending";
  faction.alive = true;
  switchMusicTrack("inklord");
  showBossAnnouncement("INKLORD COMETH");
  setTicker("INKLORD COMETH");
  setHighlight("The heavens split as InkLord descends");
}

function resolveInkLordArrivalImpact(unit, battle) {
  const stats = getUnitStats(unit);
  showBossAnnouncement("INKLORD COMETH");
  explodeAt(battle, unit.x, unit.y, stats.skyfallRadius, stats.skyfallDamage, unit, "#6b5cff", 56);
  launchUnitsAroundPoint(battle, unit, unit.x, unit.y, stats.skyfallRadius * 1.15, stats.crashDamage, stats.throwDistance * 0.9, 0.92);
  spawnInkLordRupture(battle, unit.x, unit.y, stats.skyfallRadius);
  setHighlight("InkLord lands like a falling citadel");
}

function updateFactionBanner(faction) {
  const active = faction.units.filter((unit) => !unit.dead && !unit.fled);
  if (!active.length) return;
  const sum = active.reduce((acc, unit) => ({ x: acc.x + unit.x, y: acc.y + unit.y }), { x: 0, y: 0 });
  faction.bannerPos.x += ((sum.x / active.length) - faction.bannerPos.x) * 0.08;
  faction.bannerPos.y += (((sum.y / active.length) - BANNER_FLOAT_OFFSET) - faction.bannerPos.y) * 0.08;
}

function updateStatuses(battle, dt) {
  battle.factions.forEach((faction) => {
    faction.units.forEach((unit) => updateUnitStatuses(unit, battle, dt));
  });
}

function updateBodyguardAuras(battle) {
  battle.factions.forEach((faction) => {
    const living = faction.units.filter((unit) => !unit.dead && !unit.fled);
    const bodyguards = living.filter((unit) => unit.type === "bodyguard");
    if (!bodyguards.length) return;
    bodyguards.forEach((bodyguard) => {
      const stats = getUnitStats(bodyguard);
      getNearbyLivingUnits(battle, bodyguard.x, bodyguard.y, stats.auraRadius).forEach((ally) => {
        if (!areUnitsAllied(bodyguard, ally, battle)) return;
        if (Math.hypot(ally.x - bodyguard.x, ally.y - bodyguard.y) <= stats.auraRadius) {
          applyStatus(ally, "shielded", 1, 0.3, bodyguard, battle);
        }
      });
    });
  });
}

function updateBardAuras(battle) {
  battle.factions.forEach((faction) => {
    const living = faction.units.filter((unit) => !unit.dead && !unit.fled);
    const bards = living.filter((unit) => unit.type === "bard");
    if (!bards.length) return;
    bards.forEach((bard) => {
      const stats = getUnitStats(bard);
      const songKind = bard.activeSongKind || "bardichaste";
      getNearbyLivingUnits(battle, bard.x, bard.y, stats.auraRadius).forEach((ally) => {
        if (!areUnitsAllied(bard, ally, battle)) return;
        if (Math.hypot(ally.x - bard.x, ally.y - bard.y) <= stats.auraRadius) {
          applyStatus(ally, songKind, 1, 0.35, bard, battle);
        }
      });
    });
  });
}

function updateUnitStatuses(unit, battle, dt) {
  updateFlameExposure(unit, dt);
  if (unit.dead || unit.fled || !unit.statuses?.length) return;
  unit.statuses = unit.statuses.filter((status) => {
    const statusDef = getStatusDefinition(status.kind);
    if (!statusDef) return false;
    const source = findUnitById(battle, status.sourceId);
    status.duration -= dt;
    if (status.kind === "bleed") {
      const bleedDamage = (status.dps ?? statusDef.dps) * status.stacks * dt;
      if (bleedDamage > 0) {
        applyDamage(unit, bleedDamage, battle, source, { damageKind: "status" });
        if (unit.dead) return false;
      }
    } else {
      status.tickTimer += dt;
      while (status.tickTimer >= statusDef.tickInterval) {
        status.tickTimer -= statusDef.tickInterval;
        const damagePerTick = (status.dps ?? statusDef.dps) * status.stacks * statusDef.tickInterval;
        applyDamage(unit, damagePerTick, battle, source, { damageKind: "status" });
        if (unit.dead) return false;
      }
    }
    if (status.kind === "ignite") spreadIgniteStatus(unit, status, battle, dt);
    if (status.kind === "poison" && Math.sin(battle.time * 7 + unit.statusVisualSeed) > 0.84) {
      battle.particles.push({ x: unit.x + (Math.random() - 0.5) * 10, y: unit.y - 10 + Math.random() * 8, vx: (Math.random() - 0.5) * 8, vy: -10 - Math.random() * 8, life: 0.24, age: 0, color: "#7de281", size: 3 + Math.random() * 2 });
    }
    if (status.kind === "ignite") {
      battle.particles.push({ x: unit.x + (Math.random() - 0.5) * 12, y: unit.y - 14 + Math.random() * 10, vx: (Math.random() - 0.5) * 12, vy: -20 - Math.random() * 10, life: 0.3 + Math.random() * 0.18, age: 0, color: Math.random() > 0.35 ? "#ff9f43" : "#ffe08a", size: 3 + Math.random() * 3 });
    }
    return status.duration > 0 && status.stacks > 0 && !unit.dead;
  });
}

function togglePauseBattle() {
  if (!state.battle || (!state.running && state.battle.time <= 0)) return;
  state.running = !state.running;
  if (state.running && !state.battle.completed) {
    resumeBattleAudio();
  } else {
    pauseBattleAudio();
  }
  els.battleState.textContent = state.running
    ? (state.battle.completed
      ? (state.tournament ? `${getCurrentMatchLabel(state.tournament)} complete` : "Complete")
      : (state.tournament ? `${getCurrentMatchLabel(state.tournament)} in progress` : "Battling"))
    : (state.battle.completed ? "Aftermath paused" : "Paused");
  renderSpeedControls();
}

function initializeBattleAudio() {
  if (state.audio.initialized) return;
  state.audio.initialized = true;
  Object.entries(AUDIO_TRACKS).forEach(([key, config]) => {
    const track = new Audio(config.src);
    track.loop = Boolean(config.loop);
    track.preload = "auto";
    track.volume = 0;
    state.audio.tracks[key] = {
      key,
      element: track,
      baseVolume: config.volume,
      targetVolume: 0,
    };
  });
}

function ensureTrackPlayback(trackKey) {
  const track = state.audio.tracks[trackKey];
  if (!track || state.audio.muted) return;
  const playAttempt = track.element.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() => {
      state.audio.muted = true;
    });
  }
}

function playOneShotAudio(trackKey) {
  const track = state.audio.tracks[trackKey];
  if (!track || state.audio.muted) return;
  track.element.pause();
  track.element.currentTime = 0;
  track.element.volume = track.baseVolume;
  track.targetVolume = track.baseVolume;
  const playAttempt = track.element.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() => {
      state.audio.muted = true;
    });
  }
}

function fadeTrackTo(trackKey, targetVolume, duration = AUDIO_DEFAULT_FADE_SECONDS) {
  const track = state.audio.tracks[trackKey];
  if (!track) return;
  const safeTarget = Math.max(0, Math.min(track.baseVolume, targetVolume));
  track.targetVolume = safeTarget;
  state.audio.fades = state.audio.fades.filter((fade) => fade.trackKey !== trackKey);
  if (safeTarget > 0) ensureTrackPlayback(trackKey);
  if (duration <= 0) {
    track.element.volume = safeTarget;
    if (safeTarget === 0) {
      track.element.pause();
      track.element.currentTime = 0;
    }
    return;
  }
  state.audio.fades.push({
    trackKey,
    startVolume: track.element.volume,
    targetVolume: safeTarget,
    duration,
    elapsed: 0,
  });
}

function updateAudioFades(dt) {
  if (!state.audio.fades.length) return;
  state.audio.fades = state.audio.fades.filter((fade) => {
    const track = state.audio.tracks[fade.trackKey];
    if (!track) return false;
    fade.elapsed += dt;
    const progress = Math.min(1, fade.elapsed / fade.duration);
    track.element.volume = lerp(fade.startVolume, fade.targetVolume, progress);
    if (progress < 1) return true;
    track.element.volume = fade.targetVolume;
    if (fade.targetVolume === 0) {
      track.element.pause();
      track.element.currentTime = 0;
    }
    return false;
  });
}

function switchMusicTrack(trackKey, duration = AUDIO_DEFAULT_FADE_SECONDS) {
  if (state.audio.activeMusicKey === trackKey) return;
  if (state.audio.activeMusicKey) fadeTrackTo(state.audio.activeMusicKey, 0, duration);
  state.audio.activeMusicKey = trackKey;
  fadeTrackTo(trackKey, state.audio.tracks[trackKey]?.baseVolume || 0, duration);
}

function startBattleAudio() {
  initializeBattleAudio();
  state.audio.muted = false;
  fadeTrackTo("ambience", state.audio.tracks.ambience.baseVolume, 0.9);
  switchMusicTrack("main", 0.9);
  fadeTrackTo("inklord", 0, 0);
}

function pauseBattleAudio() {
  const activeMusic = state.audio.activeMusicKey;
  if (activeMusic) {
    fadeTrackTo(activeMusic, state.audio.tracks[activeMusic].baseVolume * AUDIO_PAUSE_DUCK_FACTOR, 0.28);
  }
  fadeTrackTo("ambience", 0, 0.22);
  fadeTrackTo("deathBell", 0, 0);
  const inactiveMusicKeys = ["main", "inklord"].filter((key) => key !== activeMusic);
  inactiveMusicKeys.forEach((key) => fadeTrackTo(key, 0, 0.22));
}

function resumeBattleAudio() {
  if (state.audio.activeMusicKey) {
    fadeTrackTo(state.audio.activeMusicKey, state.audio.tracks[state.audio.activeMusicKey].baseVolume, 0.45);
  }
  fadeTrackTo("ambience", state.audio.tracks.ambience.baseVolume, 0.45);
}

function endBattleAudio() {
  fadeTrackTo("main", 0, AUDIO_END_FADE_SECONDS);
  fadeTrackTo("inklord", 0, AUDIO_END_FADE_SECONDS);
  fadeTrackTo("ambience", 0, AUDIO_END_FADE_SECONDS);
  state.audio.activeMusicKey = null;
}

function updateFlameExposure(unit, dt) {
  if (!unit?.flameExposure) return;
  Object.keys(unit.flameExposure).forEach((sourceId) => {
    const entry = unit.flameExposure[sourceId];
    entry.gap = (entry.gap || 0) + dt;
    if (entry.gap > entry.grace) {
      delete unit.flameExposure[sourceId];
    }
  });
}

function spreadIgniteStatus(unit, status, battle, dt) {
  status.contagionTimer += dt;
  const stats = status.sourceId ? getUnitStats(findUnitById(battle, status.sourceId)) : null;
  const contagionRadius = stats?.contagionRadius || STATUS_DEFINITIONS.ignite.contagionRadius;
  const contagionInterval = STATUS_DEFINITIONS.ignite.contagionInterval;
  if (status.contagionTimer < contagionInterval) return;
  status.contagionTimer = 0;
  battle.factions.forEach((faction) => {
    faction.units.forEach((other) => {
      if (other.id === unit.id || other.dead || other.fled) return;
      if (Math.hypot(other.x - unit.x, other.y - unit.y) > contagionRadius) return;
      applyStatus(other, "ignite", 1, stats?.igniteDuration || STATUS_DEFINITIONS.ignite.defaultDuration, unit, battle);
    });
  });
}
function updateUnit(unit, faction, battle, dt) {
  if (unit.dead || unit.fled) return;
  unit.attackSwing = Math.max(0, (unit.attackSwing || 0) - dt * 2.8 * getRigAnimationClipSpeedForUnit(unit, "attack"));
  const unitDef = getUnitDefinition(unit);
  const stats = getUnitStats(unit, unitDef);
  const graves = battle.graves || [];
  if (unit.liftedBySpellId) {
    updateUnitActivity(unit, "Suspended by hostile magic.");
    unit.vx = 0;
    unit.vy = 0;
    updateUnitProceduralWalk(unit, dt, getUnitLocomotionProfile(unit), 0, 0);
    updateUnitWalkBlend(unit, 0, dt);
    unit.walkTilt += (0 - unit.walkTilt) * 0.24;
    unit.stride += (0 - unit.stride) * 0.24;
    unit.bob += (0 - unit.bob) * 0.2;
    return;
  }
  if (unit.displacedBySpellId) {
    updateUnitActivity(unit, "Being hurled by hostile magic.");
    unit.vx = 0;
    unit.vy = 0;
    updateUnitProceduralWalk(unit, dt, getUnitLocomotionProfile(unit), 0, 0);
    updateUnitWalkBlend(unit, 0, dt);
    unit.walkTilt += (0 - unit.walkTilt) * 0.24;
    unit.stride += (0 - unit.stride) * 0.24;
    unit.bob += (0 - unit.bob) * 0.18;
    return;
  }

  unit.z += (0 - unit.z) * 0.18;
  const cachedRelations = getCachedBattleRelations(battle, unit);
  const allies = cachedRelations?.allies?.filter((ally) => !ally.dead && !ally.fled && areUnitsAllied(unit, ally, battle)) || [unit];
  const enemies = cachedRelations?.enemies?.filter((enemy) => !enemy.dead && !enemy.fled && canUnitBeTargeted(enemy, unit) && areUnitsHostile(unit, enemy, battle))
    || getTargetableEnemies(battle, faction.id, unit);
  const possessed = Boolean(getPossessionStatus(unit, battle));
  const forcedPossessedFlee = possessed && isFinalLivingUnitForFaction(unit, battle);
  unitDef.beforeStep?.({ unit, faction, battle, allies, enemies, graves, unitDef, dt });
  if (unit.dead || unit.fled) return;
  if (!enemies.length && !graves.length && !unitDef.canActWithoutEnemies && !forcedPossessedFlee) {
    updateUnitActivity(unit, battle.completed ? "Holding position in the aftermath." : "Holding position and awaiting a new opening.");
    return;
  }
  const target = selectUnitTarget(unit, unitDef, enemies, allies, graves, battle);
  const distance = target ? Math.hypot(target.x - unit.x, target.y - unit.y) : 9999;
  const routingImmune = isUnitRoutingImmune(unit, unitDef);
  unit.fleeing = (unit.type === "phantom" || routingImmune)
    ? false
    : (!possessed && (unit.fleeing || forcedPossessedFlee));
  if (unit.fleeing) {
    updateUnitActivity(unit, "Routing away from the battlefield.");
  }

  let destination = getDesiredDestination(unit, unitDef, target, distance, battle, allies, enemies, graves);
  if (unit.fleeing) {
    const awayX = unit.x - battle.field.centerX;
    const awayY = unit.y - battle.field.centerY;
    const awayLength = Math.max(0.001, Math.hypot(awayX, awayY));
    destination = {
      x: unit.x + (awayX / awayLength) * 120,
      y: unit.y + (awayY / awayLength) * 120,
    };
  }

  const dx = destination.x - unit.x;
  const dy = destination.y - unit.y;
  const length = Math.max(0.001, Math.hypot(dx, dy));
  unit.facing = Math.atan2(dy, dx);

  const moveSpeed = getUnitMoveSpeed(unit, unitDef);
  const moveScale = unit.fleeing ? 1.15 : 1;
  unit.vx += (((dx / length) * moveSpeed * moveScale) - unit.vx) * 0.12;
  unit.vy += (((dy / length) * moveSpeed * moveScale * 0.75) - unit.vy) * 0.12;
  updateStableFacing(unit, dt);
  updateWalkTilt(unit, dt);

  const attackRange = getAttackRange(unit, unitDef);
  if (!unit.fleeing && target && distance <= attackRange) {
    const shouldSlowForAttack = unitDef.shouldSlowForAttack ? unitDef.shouldSlowForAttack({ unit, faction, battle, target, unitDef }) : true;
    if (shouldSlowForAttack) {
      unit.vx *= 0.84;
      unit.vy *= 0.84;
    }
    if (!unitDef.managesOwnCooldown) {
      unit.cooldown -= dt;
    }
    if (unitDef.managesOwnCooldown || unit.cooldown <= 0) {
      const attackPerformed = unitDef.performAttack?.({ unit, target, battle, unitDef }) !== false;
      if (attackPerformed) {
        unit.attackSwing = 1;
      }
      if (!unitDef.managesOwnCooldown) {
        unit.cooldown = stats.cooldown * (0.8 + Math.random() * 0.5);
      }
    }
  }
  if (!unit.fleeing && !target && !battle.completed && !unit.Status?.text) {
    updateUnitActivity(unit, getDefaultUnitActivity(unit));
  }

  unit.x += unit.vx * dt;
  unit.y += unit.vy * dt;
  keepOnField(unit, battle.field);
  applyThrallLeash(unit, battle, dt);
  unitDef.afterMove?.({ unit, faction, battle, allies, enemies, graves, target, unitDef, dt });

  const distFromCenter = Math.hypot(unit.x - battle.field.centerX, unit.y - battle.field.centerY);
  if (unit.fleeing && distFromCenter > getRoutingEscapeRadius(battle)) {
    unit.fled = true;
    setTicker(`${faction.title} has a routed survivor who may return next round.`);
    setHighlight(`${faction.title} breaks and vanishes in dust`);
    spawnBurst(battle, unit.x, unit.y - 8, "#f6e4b7", 26);
  }
}

function getTargetableEnemies(battle, factionId, attacker) {
  const cachedEnemies = getCachedBattleRelations(battle, attacker)?.enemies;
  if (cachedEnemies) {
    return cachedEnemies.filter((enemy) => (
      !enemy.dead
      && !enemy.fled
      && enemy.id !== attacker?.id
      && canUnitBeTargeted(enemy, attacker)
      && areUnitsHostile(attacker, enemy, battle)
    ));
  }
  return battle.factions
    .flatMap((entry) => entry.units.filter((enemy) => (
      !enemy.dead
      && !enemy.fled
      && enemy.id !== attacker?.id
      && canUnitBeTargeted(enemy, attacker)
      && areUnitsHostile(attacker, enemy, battle)
    )));
}

function canUnitBeTargeted(unit, attacker = null) {
  const unitDef = getUnitDefinition(unit);
  return unitDef.isTargetable ? unitDef.isTargetable({ unit, attacker, unitDef }) : true;
}

function selectUnitTarget(unit, unitDef, enemies, allies, graves = [], battle = null) {
  return (unitDef.selectTarget || selectDefaultTarget)({ unit, unitDef, enemies, allies, graves, battle });
}

function getAttackRange(unit, unitDef = getUnitDefinition(unit)) {
  const stats = getUnitStats(unit, unitDef);
  return unitDef.getAttackRange ? unitDef.getAttackRange(unitDef, unit) : stats.range;
}

function getUnitMoveSpeed(unit, unitDef = getUnitDefinition(unit)) {
  const stats = getUnitStats(unit, unitDef);
  if (getUnitStatus(unit, "immobilized")) return 0;
  if (unitDef.getMoveSpeed) return unitDef.getMoveSpeed(unit, unitDef);
  return stats.speed * (0.42 + 0.58 * (unit.health / unit.maxHealth));
}

function isUnitRoutingImmune(unit, unitDef = getUnitDefinition(unit)) {
  return Boolean(unitDef.routingImmune);
}

function maybeTriggerFleeFromDamage(unit, battle, previousHealth, damageKind = "direct") {
  if (!unit || unit.dead || unit.fled) return false;
  const unitDef = getUnitDefinition(unit);
  if (unit.type === "phantom" || isUnitRoutingImmune(unit, unitDef)) return false;
  if (getPossessionStatus(unit, battle)) return false;
  const healthProportion = clamp(unit.health / Math.max(1, unit.maxHealth), 0, 1);
  const braveryLine = clamp(unit.bravery ?? 0, 0, 1);
  const wasBelowBravery = (previousHealth / Math.max(1, unit.maxHealth)) <= braveryLine;
  const isBelowBravery = healthProportion <= braveryLine;
  if (damageKind === "status") {
    const nextCheckAt = unit.nextStatusFleeCheckAt ?? 0;
    if (!isBelowBravery || (battle?.time || 0) < nextCheckAt) return false;
    unit.nextStatusFleeCheckAt = (battle?.time || 0) + 2;
  } else if (!isBelowBravery && !wasBelowBravery) {
    return false;
  }
  if (Math.random() < (1 - healthProportion)) {
    unit.fleeing = true;
    updateUnitActivity(unit, "Routing away from the battlefield.");
    return true;
  }
  return false;
}

function refreshUnitFleeingState(unit, battle, options = {}) {
  if (!unit || unit.dead || unit.fled) return;
  const unitDef = getUnitDefinition(unit);
  if (unit.type === "phantom" || isUnitRoutingImmune(unit, unitDef)) {
    unit.fleeing = false;
    updateUnitActivity(unit, getDefaultUnitActivity(unit));
    return;
  }
  const possessed = Boolean(getPossessionStatus(unit, battle));
  const forcedPossessedFlee = possessed && isFinalLivingUnitForFaction(unit, battle);
  if (forcedPossessedFlee) {
    unit.fleeing = true;
    updateUnitActivity(unit, "Routing away from the battlefield.");
    return;
  }
  if (possessed) {
    unit.fleeing = false;
    updateUnitActivity(unit, "Fighting under a phantom's control.");
    return;
  }
  const braveryLine = clamp(unit.bravery ?? 0, 0, 1);
  if ((unit.health / Math.max(1, unit.maxHealth)) > braveryLine) {
    unit.fleeing = false;
    updateUnitActivity(unit, "Recovered enough to rejoin the fight.");
  }
}

function getDesiredDestination(unit, unitDef, target, distance, battle, allies = [], enemies = [], graves = []) {
  const baseDestination = { x: target ? target.x : unit.x, y: target ? target.y : unit.y };
  if (!unitDef.getDesiredDestination) return baseDestination;
  return unitDef.getDesiredDestination({ unit, unitDef, target, distance, battle, allies, enemies, graves, destination: baseDestination });
}

function getRetreatingDestination(threshold, multiplier) {
  return ({ unit, target, distance, destination }) => {
    if (!target || distance >= threshold) return destination;
    return {
      x: unit.x - (target.x - unit.x) * multiplier,
      y: unit.y - (target.y - unit.y) * multiplier,
    };
  };
}

function getHoldPositionDestination(threshold) {
  return ({ unit, target, distance, destination }) => {
    if (!target || distance >= threshold) return destination;
    return { x: unit.x, y: unit.y };
  };
}

function selectMedicTarget({ unit, allies }) {
  const locked = allies.find((ally) => ally.id === unit.focusTargetId && (ally.health < ally.maxHealth || hasNegativeStatuses(ally)) && !ally.liftedBySpellId);
  if (locked) {
    updateUnitActivity(unit, `Moving to heal ${getUnitActivityTargetLabel(locked, state.battle)}.`);
    return locked;
  }
  const wounded = allies.filter((ally) => ally.id !== unit.id && (ally.health < ally.maxHealth || hasNegativeStatuses(ally)) && !ally.liftedBySpellId);
  if (wounded.length) {
    const target = wounded.sort((a, b) => {
      const aUrgency = (hasNegativeStatuses(a) ? 1 : 0) * 2 + (1 - a.health / a.maxHealth);
      const bUrgency = (hasNegativeStatuses(b) ? 1 : 0) * 2 + (1 - b.health / b.maxHealth);
      return bUrgency - aUrgency;
    })[0];
    unit.focusTargetId = target?.id || null;
    updateUnitActivity(unit, `Moving to heal ${getUnitActivityTargetLabel(target, state.battle)}.`);
    return target;
  }
  unit.focusTargetId = null;
  updateUnitActivity(unit, "Seeking a wounded ally to heal.");
  return allies.find((ally) => ally.id !== unit.id && !ally.liftedBySpellId) || null;
}

function updateBardState({ unit, faction, allies, enemies, battle, unitDef, dt }) {
  unit.songTimer = Math.max(0, (unit.songTimer || 0) - dt);
  const factionSongState = faction.bardSongState || null;
  if (factionSongState?.kind && battle.time < (factionSongState.endsAt || 0)) {
    unit.activeSongKind = factionSongState.kind;
    unit.songTimer = Math.max(0, factionSongState.endsAt - battle.time);
    updateUnitActivity(unit, `Playing ${getStatusDefinition(unit.activeSongKind)?.name.toLowerCase() || "a battle song"} for nearby allies.`);
    return;
  }

  const nextSong = chooseBardSong(unit, allies, enemies, unitDef);
  const duration = getUnitStats(unit, unitDef).songDuration * (0.9 + Math.random() * 0.25);
  faction.bardSongState = {
    kind: nextSong,
    endsAt: battle.time + duration,
    sourceId: unit.id,
  };
  unit.activeSongKind = nextSong;
  unit.songTimer = duration;
  updateUnitActivity(unit, `Playing ${getStatusDefinition(nextSong)?.name.toLowerCase() || "a battle song"} for nearby allies.`);
  if (battle && Math.random() > 0.45) {
    setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"}'s bards strike up ${getStatusDefinition(unit.activeSongKind)?.name.toLowerCase() || "a new song"}`);
  }
}

function chooseBardSong(unit, allies, enemies, unitDef = getUnitDefinition(unit)) {
  const stats = getUnitStats(unit, unitDef);
  const nearbyAllies = allies.filter((ally) => Math.hypot(ally.x - unit.x, ally.y - unit.y) <= stats.auraRadius);
  const woundedNearby = nearbyAllies.filter((ally) => ally.health / Math.max(1, ally.maxHealth) < 0.62).length;
  const nearbyEnemies = enemies.filter((enemy) => Math.hypot(enemy.x - unit.x, enemy.y - unit.y) <= stats.auraRadius * 1.2).length;
  const weightedSongs = [];
  const addSong = (kind, weight) => {
    for (let i = 0; i < weight; i += 1) weightedSongs.push(kind);
  };
  addSong("bardichaste", 2 + (nearbyEnemies <= 1 ? 2 : 0));
  addSong("bardicvalor", 2 + (nearbyEnemies >= 3 ? 2 : 0));
  addSong("bardicguard", 1 + (woundedNearby >= 2 ? 3 : 0) + (nearbyEnemies >= nearbyAllies.length ? 1 : 0));
  return weightedSongs[Math.floor(Math.random() * weightedSongs.length)] || "bardichaste";
}

function selectBardTarget({ unit, enemies, allies, battle }) {
  const nonBardAllies = allies.filter((ally) => ally.id !== unit.id && ally.type !== "bard");
  const escort = unit.focusTargetId ? findUnitById(battle, unit.focusTargetId) : null;
  if (escort && !escort.dead && !escort.fled && areUnitsAllied(unit, escort, battle) && escort.type !== "bard") {
    updateUnitActivity(unit, `Shadowing ${getUnitActivityTargetLabel(escort, battle)}.`);
    return escort;
  }
  if (!nonBardAllies.length) {
    unit.focusTargetId = null;
    updateUnitActivity(unit, "Seeking allies to support.");
    return enemies
      .slice()
      .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))[0] || null;
  }
  const selectedEscort = nonBardAllies[Math.floor(Math.random() * nonBardAllies.length)] || null;
  unit.focusTargetId = selectedEscort?.id || null;
  if (selectedEscort) updateUnitActivity(unit, `Shadowing ${getUnitActivityTargetLabel(selectedEscort, battle)}.`);
  return selectedEscort;
}

function getBardDestination({ unit, target, battle, allies, enemies }) {
  const nonBardAllies = allies.filter((ally) => ally.id !== unit.id && ally.type !== "bard");
  if (!nonBardAllies.length) {
    const faction = findFaction(battle, unit.factionId);
    const homeBase = faction?.homeBase || faction?.bannerPos || { x: unit.x, y: unit.y };
    const awayX = unit.x - battle.field.centerX;
    const awayY = unit.y - battle.field.centerY;
    const awayLength = Math.max(0.001, Math.hypot(awayX, awayY));
    return {
      x: clamp(lerp(unit.x + (awayX / awayLength) * 180, homeBase.x, 0.45), 24, battle.field.width - 24),
      y: clamp(lerp(unit.y + (awayY / awayLength) * 180, homeBase.y, 0.45), 28, battle.field.height - 28),
    };
  }

  const escort = target && areUnitsAllied(unit, target, battle) && target.type !== "bard" ? target : null;
  if (!escort) {
    const anchor = findFaction(battle, unit.factionId)?.bannerPos || { x: unit.x, y: unit.y };
    return { x: anchor.x, y: anchor.y };
  }

  const orbitSeed = unit.statusVisualSeed || ((unit.id.length % 10) / 10);
  const orbitAngle = orbitSeed * Math.PI * 2;
  const orbitRadius = 28 + Math.floor(orbitSeed * 16);
  const pressure = enemies
    .slice()
    .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))[0] || null;
  let offsetX = Math.cos(orbitAngle) * orbitRadius;
  let offsetY = Math.sin(orbitAngle) * orbitRadius * 0.72;
  if (pressure) {
    const pressureDx = unit.x - pressure.x;
    const pressureDy = unit.y - pressure.y;
    const pressureLength = Math.max(0.001, Math.hypot(pressureDx, pressureDy));
    const pressureScale = clamp(1 - (pressureLength / 132), 0, 1);
    offsetX += (pressureDx / pressureLength) * 34 * pressureScale;
    offsetY += (pressureDy / pressureLength) * 26 * pressureScale;
  }
  return {
    x: clamp(escort.x + offsetX, 20, battle.field.width - 20),
    y: clamp(escort.y + offsetY, 24, battle.field.height - 24),
  };
}

function getBodyguardFormationSlot(unit, bodyguards = []) {
  const formation = bodyguards
    .filter((ally) => ally && !ally.dead && !ally.fled)
    .slice()
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const index = Math.max(0, formation.findIndex((ally) => ally.id === unit.id));
  return {
    index,
    total: Math.max(1, formation.length || 1),
    centeredIndex: index - ((Math.max(1, formation.length || 1) - 1) / 2),
  };
}

function getBodyguardSupportAnchor(unit, allies = [], enemies = [], battle = null) {
  const faction = battle ? findFaction(battle, unit.factionId) : null;
  const livingAllies = allies.filter((ally) => ally.id !== unit.id && !ally.dead && !ally.fled);
  const escortPool = livingAllies.filter((ally) => ally.type !== "bodyguard");
  const anchorPool = escortPool.length ? escortPool : livingAllies;
  const fallback = faction?.bannerPos || faction?.homeBase || { x: unit.x, y: unit.y };
  if (!anchorPool.length) return fallback;
  const centroid = anchorPool.reduce((acc, ally) => ({ x: acc.x + ally.x, y: acc.y + ally.y }), { x: 0, y: 0 });
  centroid.x /= anchorPool.length;
  centroid.y /= anchorPool.length;

  const nearestEnemy = enemies.reduce((best, enemy) => {
    const distance = Math.hypot(enemy.x - centroid.x, enemy.y - centroid.y);
    if (!best || distance < best.distance) return { enemy, distance };
    return best;
  }, null);
  const bodyguards = allies.filter((ally) => ally.type === "bodyguard");
  const slot = getBodyguardFormationSlot(unit, bodyguards);
  const forwardDx = nearestEnemy ? (nearestEnemy.enemy.x - centroid.x) : (fallback.x - centroid.x);
  const forwardDy = nearestEnemy ? (nearestEnemy.enemy.y - centroid.y) : (fallback.y - centroid.y);
  const forwardLength = Math.max(0.001, Math.hypot(forwardDx, forwardDy));
  const forwardX = forwardDx / forwardLength;
  const forwardY = forwardDy / forwardLength;
  const normalX = -forwardY;
  const normalY = forwardX;
  const lateral = slot.centeredIndex * 26;
  const forwardStep = nearestEnemy ? Math.min(42, nearestEnemy.distance * 0.28) : 10;
  return {
    x: clamp(centroid.x + forwardX * forwardStep + normalX * lateral, 24, battle?.field.width ? battle.field.width - 24 : FIELD.width - 24),
    y: clamp(centroid.y + forwardY * forwardStep + normalY * lateral * 0.72, 24, battle?.field.height ? battle.field.height - 24 : FIELD.height - 24),
  };
}

function getBodyguardEngagementDestination(unit, target, allies = [], enemies = [], battle = null, unitDef = null) {
  const stats = getUnitStats(unit, unitDef);
  const nearbyAllies = allies.filter((ally) => (
    ally.id !== unit.id
    && !ally.dead
    && !ally.fled
    && Math.hypot(ally.x - target.x, ally.y - target.y) <= stats.auraRadius * 1.3
  ));
  const supportAnchor = nearbyAllies.length
    ? nearbyAllies.reduce((acc, ally) => ({ x: acc.x + ally.x, y: acc.y + ally.y }), { x: 0, y: 0 })
    : getBodyguardSupportAnchor(unit, allies, enemies, battle);
  if (nearbyAllies.length) {
    supportAnchor.x /= nearbyAllies.length;
    supportAnchor.y /= nearbyAllies.length;
  }
  const approachDx = supportAnchor.x - target.x;
  const approachDy = supportAnchor.y - target.y;
  const approachLength = Math.max(0.001, Math.hypot(approachDx, approachDy));
  const approachX = approachDx / approachLength;
  const approachY = approachDy / approachLength;
  const normalX = -approachY;
  const normalY = approachX;
  const guardPeers = allies.filter((ally) => (
    ally.type === "bodyguard"
    && !ally.dead
    && !ally.fled
    && ally.guardTargetId === target.id
  ));
  const slot = getBodyguardFormationSlot(unit, guardPeers.length ? guardPeers : allies.filter((ally) => ally.type === "bodyguard"));
  const standOff = Math.max(14, stats.range * 0.65);
  const lateral = slot.centeredIndex * 20;
  return {
    x: clamp(target.x + approachX * standOff + normalX * lateral, 24, battle?.field.width ? battle.field.width - 24 : FIELD.width - 24),
    y: clamp(target.y + approachY * standOff + normalY * lateral * 0.72, 24, battle?.field.height ? battle.field.height - 24 : FIELD.height - 24),
  };
}

function selectBodyguardTarget({ unit, enemies, allies, battle, unitDef }) {
  const locked = unit.guardTargetId ? findUnitById(battle, unit.guardTargetId) : null;
  if (locked && !locked.dead && !locked.fled && canUnitBeTargeted(locked, unit)) {
    unit.currentTargetKind = "enemy";
    unit.currentGraveId = null;
    updateUnitActivity(unit, `Guarding the line against ${getUnitActivityTargetLabel(locked, battle)}.`);
    return locked;
  }
  unit.guardTargetId = null;
  const stats = getUnitStats(unit, unitDef);
  let best = null;
  let bestScore = Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const alliedDistances = allies
      .filter((ally) => ally.id !== unit.id && !ally.dead && !ally.fled)
      .map((ally) => ({
        ally,
        distance: Math.hypot(enemy.x - ally.x, enemy.y - ally.y),
      }));
    const closestThreatenedAlly = alliedDistances.reduce((closest, entry) => {
      if (!closest || entry.distance < closest.distance) return entry;
      return closest;
    }, null);
    const allyDistance = closestThreatenedAlly?.distance ?? Infinity;
    const isThreateningAllies = allyDistance <= stats.auraRadius * 1.25;
    const canReachFight = distance <= stats.aggroRadius * 1.45;
    if (!isThreateningAllies && !canReachFight) return;
    const overlappingGuards = allies.reduce((count, ally) => {
      if (ally.id === unit.id || ally.dead || ally.fled || ally.type !== "bodyguard") return count;
      return count + (ally.guardTargetId === enemy.id ? 1 : 0);
    }, 0);
    const allyPriority = closestThreatenedAlly?.ally && ["medic", "bard", "archer", "mage", "poisoner", "catapult"].includes(closestThreatenedAlly.ally.type)
      ? -18
      : 0;
    const meleeThreatBonus = allyDistance <= 34 ? -22 : 0;
    const score = (distance * 0.72) + (allyDistance * 1.08) + (overlappingGuards * 34) + allyPriority + meleeThreatBonus;
    if (score >= bestScore) return;
    best = enemy;
    bestScore = score;
  });
  unit.guardTargetId = best?.id || null;
  unit.currentTargetKind = best ? "enemy" : null;
  unit.currentGraveId = null;
  updateUnitActivity(unit, best ? `Moving to intercept ${getUnitActivityTargetLabel(best, battle)}.` : "Holding near allies and watching for a melee to join.");
  return best;
}

function getBodyguardDestination({ unit, target, destination, battle, unitDef, allies, enemies }) {
  if (target && unit.currentTargetKind === "enemy") {
    return getBodyguardEngagementDestination(unit, target, allies, enemies, battle, unitDef);
  }
  const anchor = getBodyguardSupportAnchor(unit, allies, enemies, battle);
  const distance = Math.hypot(anchor.x - unit.x, anchor.y - unit.y);
  if (distance <= 14) return { x: unit.x, y: unit.y };
  unit.guardTargetId = null;
  return anchor;
}

function updateAssassinState({ unit, faction, battle, enemies }) {
  const stats = getUnitStats(unit);
  if (unit.behaviorState !== "retreat") {
    unit.invisible = true;
  }
  if (unit.behaviorState === "retreat") {
    unit.invisible = false;
    updateUnitActivity(unit, "Retreating to vanish and reset.");
    const homeBase = findFaction(battle, faction.id)?.homeBase || { x: unit.x, y: unit.y };
    if (Math.hypot(unit.x - homeBase.x, unit.y - homeBase.y) <= stats.resetRadius) {
      unit.behaviorState = "stalking";
      unit.invisible = true;
      unit.focusTargetId = null;
      unit.slashCooldown = 0;
      unit.cooldown = Math.max(unit.cooldown, 0.3);
      updateUnitActivity(unit, "Reset and stalking for another backstab.");
    }
  }
  if (unit.focusTargetId && !enemies.some((enemy) => enemy.id === unit.focusTargetId)) {
    unit.focusTargetId = null;
  }
}

function selectAssassinTarget({ unit, enemies }) {
  if (unit.behaviorState === "retreat") {
    updateUnitActivity(unit, "Retreating to vanish and reset.");
    return null;
  }
  const locked = enemies.find((enemy) => enemy.id === unit.focusTargetId);
  if (locked) {
    updateUnitActivity(unit, `Stalking ${getUnitActivityTargetLabel(locked, state.battle)}.`);
    return locked;
  }
  const target = enemies
    .slice()
    .sort((a, b) => {
      const scoreA = Math.hypot(a.x - unit.x, a.y - unit.y) * 0.7 + a.health * 0.3;
      const scoreB = Math.hypot(b.x - unit.x, b.y - unit.y) * 0.7 + b.health * 0.3;
      return scoreA - scoreB;
    })[0] || null;
  unit.focusTargetId = target?.id || null;
  updateUnitActivity(unit, target ? `Stalking ${getUnitActivityTargetLabel(target, state.battle)}.` : "Seeking an exposed target.");
  return target;
}

function getAssassinDestination({ unit, target, battle, destination }) {
  if (unit.behaviorState === "retreat") {
    const homeBase = findFaction(battle, unit.factionId)?.homeBase;
    return homeBase ? { x: homeBase.x, y: homeBase.y } : destination;
  }
  if (!target) return destination;
  const backstep = target.displayFacingX || (Math.cos(target.facing || 0) >= 0 ? 1 : -1);
  return {
    x: target.x - backstep * 10,
    y: target.y + Math.sin((target.facing || 0) + Math.PI / 2) * 4,
  };
}

function getAssassinAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return unit.behaviorState === "retreat" ? 0 : Math.max(stats.range, 24);
}

function performAssassinAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (unit.behaviorState === "retreat") return;
  applyDamage(target, stats.backstabDamage * (0.92 + Math.random() * 0.24), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 10, angle: unit.facing, life: 0.24, maxLife: 0.24, color: "rgba(240, 240, 255, 0.78)" });
  spawnBurst(battle, target.x, target.y - 4, "#d8d8ff", 14);
  unit.behaviorState = "retreat";
  unit.invisible = false;
  unit.focusTargetId = null;
  unit.slashCooldown = 0.2;
  setHighlight(`${findFaction(battle, unit.factionId).title}'s assassin lands a backstab`);
}

function handleAssassinAfterMove({ unit, battle, dt }) {
  const stats = getUnitStats(unit);
  if (unit.behaviorState !== "retreat") return;
  unit.slashCooldown = Math.max(0, (unit.slashCooldown || 0) - dt);
  if (unit.slashCooldown > 0) return;
  const nearbyEnemy = battle.factions
    .filter((faction) => faction.id !== unit.factionId)
    .flatMap((faction) => faction.units)
    .find((enemy) => !enemy.dead && !enemy.fled && Math.hypot(enemy.x - unit.x, enemy.y - unit.y) <= 18);
  if (!nearbyEnemy) return;
  applyDamage(nearbyEnemy, stats.slashDamage * (0.9 + Math.random() * 0.28), battle, unit);
  battle.swipes.push({ x: nearbyEnemy.x, y: nearbyEnemy.y - 10, angle: unit.facing, life: 0.18, maxLife: 0.18, color: "rgba(255, 214, 214, 0.75)" });
  spawnBurst(battle, nearbyEnemy.x, nearbyEnemy.y - 3, "#ffd3d3", 8);
  unit.slashCooldown = 0.42;
}

function updateWalkTilt(unit, dt) {
  const speed = Math.hypot(unit.vx, unit.vy);
  const locomotion = getUnitLocomotionProfile(unit);
  const targetTilt = speed > 10 ? clamp(unit.vx / 80, -1, 1) * 0.12 : 0;
  const gaitSpeed = clamp(speed / 38, 0, 2.4);
  unit.gaitAngularVelocity = (7 + gaitSpeed * 7.5) * getRigAnimationClipSpeedForUnit(unit, "walk");
  unit.gaitPhase += dt * unit.gaitAngularVelocity;
  updateUnitProceduralWalk(unit, dt, locomotion, speed, gaitSpeed);
  const targetStride = speed > PROCEDURAL_WALK_VISIBLE_SPEED ? Math.sin(unit.gaitPhase) * Math.min(1, gaitSpeed) : 0;
  const targetBob = speed > PROCEDURAL_WALK_VISIBLE_SPEED ? (0.5 - Math.cos(unit.gaitPhase * 2) * 0.5) * Math.min(1, gaitSpeed) : 0;
  const targetWalkBlend = speed > PROCEDURAL_WALK_VISIBLE_SPEED ? smoothStep(0.06, 0.55, Math.min(1, gaitSpeed)) : 0;
  unit.walkTilt += (targetTilt - unit.walkTilt) * Math.min(1, dt * 10);
  unit.stride += (targetStride - unit.stride) * Math.min(1, dt * 12);
  unit.bob += (targetBob - unit.bob) * Math.min(1, dt * 12);
  updateUnitWalkBlend(unit, targetWalkBlend, dt);
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

function findNearestGrave(unit, graves, predicate = null) {
  const pool = (graves || []).filter((grave) => !predicate || predicate(grave));
  if (!pool.length) return null;
  let best = pool[0];
  let bestDistance = Math.hypot(best.x - unit.x, best.y - unit.y);
  for (let i = 1; i < pool.length; i += 1) {
    const grave = pool[i];
    const distance = Math.hypot(grave.x - unit.x, grave.y - unit.y);
    if (distance < bestDistance) {
      best = grave;
      bestDistance = distance;
    }
  }
  return best;
}

function findFarthestGrave(unit, graves, predicate = null) {
  const pool = (graves || []).filter((grave) => !predicate || predicate(grave));
  if (!pool.length) return null;
  let best = pool[0];
  let bestDistance = Math.hypot(best.x - unit.x, best.y - unit.y);
  for (let i = 1; i < pool.length; i += 1) {
    const grave = pool[i];
    const distance = Math.hypot(grave.x - unit.x, grave.y - unit.y);
    if (distance > bestDistance) {
      best = grave;
      bestDistance = distance;
    }
  }
  return best;
}

function getTargetSelectionPreference(unit, enemy, flavor = "default") {
  const rand = createSeededRandom(hashStringToSeed(`${unit.id}|${enemy.id}|${flavor}`));
  return rand();
}

function countAlliedFocusers(allies, unit, enemyId, predicate = null) {
  if (!allies?.length || !enemyId) return 0;
  return allies.reduce((count, ally) => {
    if (ally.id === unit.id || ally.dead || ally.fled) return count;
    if (ally.focusTargetId !== enemyId) return count;
    if (predicate && !predicate(ally)) return count;
    return count + 1;
  }, 0);
}

function getLivingThrallIds(unit, battle) {
  if (!unit?.thrallIds?.length) return [];
  return unit.thrallIds.filter((thrallId) => {
    const thrall = findUnitById(battle, thrallId);
    return thrall && !thrall.dead && !thrall.fled && thrall.thrallOwnerId === unit.id;
  });
}

function getNecromancerParticipants(unit, battle) {
  if (!unit || !battle) return [];
  if (unit.type === "necromancer") {
    const thralls = getLivingThrallIds(unit, battle).map((thrallId) => findUnitById(battle, thrallId)).filter(Boolean);
    return [unit, ...thralls].filter((entry) => !entry.dead && !entry.fled);
  }
  if (unit.thrallOwnerId) {
    const owner = findUnitById(battle, unit.thrallOwnerId);
    if (!owner || owner.dead || owner.fled || owner.type !== "necromancer") return [];
    return getNecromancerParticipants(owner, battle);
  }
  return [];
}

function applyThrallLeash(unit, battle, dt) {
  if (!unit?.thrallOwnerId || unit.dead || unit.fled) return;
  const owner = findUnitById(battle, unit.thrallOwnerId);
  if (!owner || owner.dead || owner.fled) return;
  const dx = unit.x - owner.x;
  const dy = unit.y - owner.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 0.001) return;
  const dirX = dx / distance;
  const dirY = dy / distance;
  const outwardIntent = ((unit.vx || 0) * dirX) + ((unit.vy || 0) * dirY);

  if (distance > THRALL_TUG_START_DISTANCE && outwardIntent > 0) {
    const tugStrength = outwardIntent * dt * THRALL_TUG_FACTOR * clamp((distance - THRALL_TUG_START_DISTANCE) / (THRALL_LEASH_DISTANCE - THRALL_TUG_START_DISTANCE || 1), 0, 1);
    owner.x += dirX * tugStrength;
    owner.y += dirY * tugStrength;
    keepOnField(owner, battle.field);
  }

  if (distance > THRALL_LEASH_DISTANCE) {
    unit.x = owner.x + dirX * THRALL_LEASH_DISTANCE;
    unit.y = owner.y + dirY * THRALL_LEASH_DISTANCE;
    const inward = Math.max(0, outwardIntent);
    unit.vx = Math.min(unit.vx || 0, 0) - dirX * inward * 0.45;
    unit.vy = Math.min(unit.vy || 0, 0) - dirY * inward * 0.45;
    keepOnField(unit, battle.field);
  }
}

function modifyGraverobberStats(unit, stats) {
  if (!unit) return stats;
  const robbed = unit.gravesRobbed || 0;
  return {
    ...stats,
    damage: stats.damage * (1 + robbed * 0.32),
    speed: stats.speed * (1 + robbed * 0.08),
    range: stats.range + robbed * 3.5,
    graveRange: stats.graveRange + robbed * 2,
  };
}

function selectDefaultTarget({ unit, enemies, allies }) {
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
  let best = enemies[0] || null;
  let bestScore = Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const woundedBias = enemy.health / enemy.maxHealth;
    let score = distance * woundedBias * (0.9 + Math.random() * 0.35);
    const stablePreference = getTargetSelectionPreference(unit, enemy, "default-targeting");
    const sameTargetPressure = countAlliedFocusers(allies, unit, enemy.id);
    score *= 0.84 + stablePreference * 0.34;
    score *= 1 + sameTargetPressure * 0.16;
    if (unit.focusTargetId === enemy.id) score *= 0.9;
    if (score < bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  unit.focusTargetId = best?.id || null;
  updateUnitActivity(unit, best ? `Tracking ${getUnitActivityTargetLabel(best, state.battle)}.` : getDefaultUnitActivity(unit));
  return best;
}

function updateKriegerState({ unit, battle, dt }) {
  const stats = getUnitStats(unit);
  if (unit.dead || unit.fled) return;
  if (unit.health < unit.maxHealth) {
    unit.health = Math.min(unit.maxHealth, unit.health + stats.regenPerSecond * dt);
    refreshUnitFleeingState(unit, battle);
  }
  if (getUnitStatus(unit, "bloodfrenzy") && Math.random() > 0.992) {
    updateUnitActivity(unit, "In a blood frenzy and charging the nearest body.");
    setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"}'s krieger is in a blood frenzy`);
  }
}

function selectKriegerTarget({ unit, enemies, battle }) {
  const frenzy = getUnitStatus(unit, "bloodfrenzy");
  let candidates = enemies;
  if (frenzy && battle) {
    candidates = battle.factions
      .flatMap((faction) => faction.units)
      .filter((candidate) => (
        candidate.id !== unit.id
        && !candidate.dead
        && !candidate.fled
        && canUnitBeTargeted(candidate, unit)
      ));
  }
  unit.currentTargetKind = candidates.length ? "enemy" : null;
  unit.currentGraveId = null;
  let best = null;
  let bestDistance = Infinity;
  candidates.forEach((candidate) => {
    const distance = Math.hypot(candidate.x - unit.x, candidate.y - unit.y);
    const tieBreaker = distance + candidate.health * 0.02;
    if (tieBreaker < bestDistance) {
      best = candidate;
      bestDistance = tieBreaker;
    }
  });
  updateUnitActivity(unit, best
    ? `${frenzy ? "Rushing" : "Closing on"} ${getUnitActivityTargetLabel(best, battle)}.`
    : (frenzy ? "Searching wildly for anything to kill." : getDefaultUnitActivity(unit)));
  return best;
}

function getHuntsmanAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return Math.max(stats.range, stats.netRange);
}

function selectHuntsmanTarget({ unit, enemies, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const unpinned = enemies.filter((enemy) => !getUnitStatus(enemy, "immobilized"));
  const netCandidates = unpinned.filter((enemy) => Math.hypot(enemy.x - unit.x, enemy.y - unit.y) <= stats.netRange);
  const pool = netCandidates.length ? netCandidates : enemies;
  let best = pool[0] || null;
  let bestScore = Infinity;
  pool.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const healthBias = enemy.health / Math.max(1, enemy.maxHealth);
    const pinBias = getUnitStatus(enemy, "immobilized") ? 36 : 0;
    const score = distance + healthBias * 18 + pinBias;
    if (score < bestScore) {
      best = enemy;
      bestScore = score;
    }
  });
  unit.focusTargetId = best?.id || null;
  unit.currentTargetKind = best ? "enemy" : null;
  unit.currentGraveId = null;
  if (best) {
    const bestLabel = getUnitActivityTargetLabel(best, state.battle);
    updateUnitActivity(unit, !getUnitStatus(best, "immobilized") && Math.hypot(best.x - unit.x, best.y - unit.y) <= stats.netRange
      ? `Lining up a net throw on ${bestLabel}.`
      : `Tracking ${bestLabel}.`);
  } else {
    updateUnitActivity(unit, "Seeking a target to snare.");
  }
  return best;
}

function updateHuntsmanState({ unit, dt }) {
  unit.huntsmanKnifeCooldown = Math.max(0, (unit.huntsmanKnifeCooldown || 0) - dt);
  unit.huntsmanNetCooldown = Math.max(0, (unit.huntsmanNetCooldown || 0) - dt);
  if ((unit.huntsmanKnifeCooldown || 0) > 0 && (unit.huntsmanNetCooldown || 0) > 0 && !unit.focusTargetId) {
    updateUnitActivity(unit, "Resetting after a volley.");
  }
}

function updateArtificerState({ unit, battle }) {
  const turret = unit.constructedTurretId ? findUnitById(battle, unit.constructedTurretId) : null;
  if (!turret || turret.dead || turret.fled || turret.type !== "turret" || turret.builderId !== unit.id) {
    unit.constructedTurretId = null;
    updateUnitActivity(unit, "Seeking a place to build a turret.");
    return;
  }
  updateUnitActivity(unit, "Maintaining its deployed turret.");
}

function selectArtificerTarget({ unit, enemies }) {
  if (unit.constructedTurretId) {
    unit.focusTargetId = null;
    unit.currentTargetKind = null;
    unit.currentGraveId = null;
    updateUnitActivity(unit, "Maintaining its deployed turret.");
    return null;
  }
  unit.currentTargetKind = enemies.length ? "enemy" : null;
  unit.currentGraveId = null;
  let best = null;
  let bestScore = -Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    let localDensity = 0;
    enemies.forEach((other) => {
      const neighborDistance = Math.hypot(other.x - enemy.x, other.y - enemy.y);
      if (neighborDistance <= 42) localDensity += 1 - (neighborDistance / 42);
    });
    const score = localDensity * 18 - distance * 0.12 - enemy.health * 0.03 + (unit.focusTargetId === enemy.id ? 6 : 0);
    if (score > bestScore) {
      best = enemy;
      bestScore = score;
    }
  });
  unit.focusTargetId = best?.id || null;
  updateUnitActivity(unit, best ? `Searching for a strong turret position against ${getUnitActivityTargetLabel(best, state.battle)}.` : "Seeking a place to build a turret.");
  return best;
}

function getArtificerAttackRange(unitDef, unit) {
  if (unit?.constructedTurretId) return 0;
  return getUnitStats(unit, unitDef).range;
}

function getArtificerDestination({ unit, target, distance, battle, enemies, destination }) {
  if (!unit.constructedTurretId) {
    return getRetreatingDestination(94, 0.82)({ unit, target, distance, destination });
  }
  const pressure = enemies
    .slice()
    .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))[0];
  const anchor = findFaction(battle, unit.factionId)?.homeBase || { x: unit.x, y: unit.y };
  if (!pressure) return anchor;
  const awayX = unit.x - pressure.x;
  const awayY = unit.y - pressure.y;
  const awayLength = Math.max(0.001, Math.hypot(awayX, awayY));
  const retreatX = unit.x + (awayX / awayLength) * 118;
  const retreatY = unit.y + (awayY / awayLength) * 118;
  return {
    x: clamp(lerp(retreatX, anchor.x, 0.35), 24, battle.field.width - 24),
    y: clamp(lerp(retreatY, anchor.y, 0.35), 24, battle.field.height - 24),
  };
}

function destroyConstructedTurret(builder, battle, options = {}) {
  if (!builder?.constructedTurretId) return false;
  const turret = findUnitById(battle, builder.constructedTurretId);
  builder.constructedTurretId = null;
  if (!turret || turret.dead || turret.fled || turret.type !== "turret") return false;
  applyDamage(turret, turret.health + 999, battle, options.attacker || builder, {
    noAttackerCredit: true,
    skipDefaultDeathBurst: true,
  });
  spawnBurst(battle, turret.x, turret.y - 6, "#f0c98c", 10);
  return true;
}

function createArtificerTurret(builder, target, battle) {
  const faction = findFaction(battle, builder.factionId);
  if (!faction) return null;
  const stats = getUnitStats(builder);
  const angle = target ? Math.atan2(target.y - builder.y, target.x - builder.x) : builder.facing || 0;
  const radius = stats.buildOffset || 26;
  const turret = makeUnit(
    builder.factionId,
    "turret",
    clamp(builder.x + Math.cos(angle) * radius, 22, battle.field.width - 22),
    clamp(builder.y + Math.sin(angle) * radius * 0.72, 22, battle.field.height - 22),
  );
  turret.builderId = builder.id;
  turret.summonOwnerId = builder.id;
  turret.turretAimAngle = angle;
  turret.facing = angle;
  turret.displayFacingX = 1;
  turret.bravery = 2;
  turret.cooldown = 0.12;
  faction.units.push(turret);
  builder.constructedTurretId = turret.id;
  return turret;
}

function performArtificerAttack({ unit, target, battle, unitDef }) {
  if (!target) return;
  const stats = getUnitStats(unit, unitDef);
  const existingTurret = unit.constructedTurretId ? findUnitById(battle, unit.constructedTurretId) : null;
  const existingDistance = existingTurret ? Math.hypot(target.x - existingTurret.x, target.y - existingTurret.y) : Infinity;
  if (existingTurret && !existingTurret.dead && !existingTurret.fled && existingDistance <= stats.rebuildThreshold) return;
  destroyConstructedTurret(unit, battle);
  const turret = createArtificerTurret(unit, target, battle);
  if (!turret) return;
  updateUnitActivity(unit, `Deploying a turret to cover ${getUnitActivityTargetLabel(target, battle)}.`);
  spawnBurst(battle, turret.x, turret.y - 8, "#ffe0a1", 14);
  battle.particles.push({ kind: "ring", x: turret.x, y: turret.y + 2, vx: 0, vy: 0, life: 0.34, age: 0, color: "#e7c071", size: 24, lineWidth: 3 });
  setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"}'s artificer deploys a turret`);
}

function updateTurretState({ unit, battle, enemies, dt }) {
  unit.vx = 0;
  unit.vy = 0;
  updateUnitProceduralWalk(unit, dt, getUnitLocomotionProfile(unit), 0, 0);
  updateUnitWalkBlend(unit, 0, dt);
  unit.walkTilt += (0 - unit.walkTilt) * Math.min(1, dt * 12);
  unit.stride += (0 - unit.stride) * Math.min(1, dt * 12);
  unit.bob += (0 - unit.bob) * Math.min(1, dt * 10);
  unit.displayFacingX = 1;
  const target = enemies.find((enemy) => enemy.id === unit.focusTargetId && !enemy.dead && !enemy.fled) || null;
  if (target) {
    const desiredAngle = Math.atan2(target.y - unit.y, target.x - unit.x);
    unit.turretAimAngle = normalizeAngle(lerpAngle(unit.turretAimAngle || desiredAngle, desiredAngle, Math.min(1, dt * 8)));
  }
  const builder = unit.builderId ? findUnitById(battle, unit.builderId) : null;
  if (builder && builder.dead) {
    unit.builderId = null;
  }
  if (!target) updateUnitActivity(unit, "Scanning for targets.");
}

function getTurretDestination({ unit }) {
  return { x: unit.x, y: unit.y };
}

function selectTurretTarget({ unit, enemies, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const inRangeEnemies = enemies.filter((enemy) => Math.hypot(enemy.x - unit.x, enemy.y - unit.y) <= stats.range);
  const pool = inRangeEnemies.length ? inRangeEnemies : [];
  let best = null;
  let bestScore = -Infinity;
  pool.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    let swarmBias = 0;
    pool.forEach((other) => {
      const neighborDistance = Math.hypot(other.x - enemy.x, other.y - enemy.y);
      if (neighborDistance <= 28) swarmBias += 1 - (neighborDistance / 28);
    });
    const healthBias = Math.max(0, 1 - (enemy.health / Math.max(1, enemy.maxHealth)));
    const score = swarmBias * 28 - distance * 0.1 + healthBias * 6 + (enemy.type === "spiderswarm" ? 10 : 0);
    if (score > bestScore) {
      best = enemy;
      bestScore = score;
    }
  });
  unit.focusTargetId = best?.id || null;
  unit.currentTargetKind = best ? "enemy" : null;
  unit.currentGraveId = null;
  updateUnitActivity(unit, best ? `Tracking ${getUnitActivityTargetLabel(best, state.battle)}.` : "Scanning for targets.");
  return best;
}

function performTurretAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
  updateUnitActivity(unit, `Firing on ${getUnitActivityTargetLabel(target, battle)}.`);
  const angle = Math.atan2(target.y - unit.y, target.x - unit.x);
  unit.turretAimAngle = angle;
  const muzzleX = unit.x + Math.cos(angle) * 9;
  const muzzleY = unit.y - 5 + Math.sin(angle) * 6;
  battle.factions.forEach((faction) => {
    faction.units.forEach((enemy) => {
      if (enemy.dead || enemy.fled || enemy.id === unit.id) return;
      if (!areUnitsHostile(unit, enemy, battle)) return;
      const distance = Math.hypot(enemy.x - target.x, enemy.y - target.y);
      if (distance > stats.splash) return;
      applyDamage(enemy, stats.damage * Math.max(0.45, 1 - distance / stats.splash), battle, unit);
    });
  });
  battle.traces.push({
    startX: muzzleX,
    startY: muzzleY,
    endX: target.x,
    endY: target.y - 4,
    angle,
    age: 0,
    duration: 0.09,
    trailFraction: 0.24,
    color: "#ffe4a8",
    width: 1.4,
  });
  for (let i = 0; i < 3; i += 1) {
    battle.particles.push({
      x: muzzleX,
      y: muzzleY,
      vx: Math.cos(angle) * (28 + Math.random() * 26) + (Math.random() - 0.5) * 10,
      vy: Math.sin(angle) * (18 + Math.random() * 16) - 6 + (Math.random() - 0.5) * 8,
      life: 0.12 + Math.random() * 0.08,
      age: 0,
      color: i === 0 ? "#fff0ba" : "#d69d4e",
      size: 2 + Math.random() * 2,
    });
  }
  battle.particles.push({ kind: "ring", x: target.x, y: target.y, vx: 0, vy: 0, life: 0.18, age: 0, color: "rgba(255, 225, 160, 0.6)", size: stats.splash * 0.72, lineWidth: 2 });
}

function updateNecromancerState({ unit, battle }) {
  if (unit.thrallOwnerId) {
    unit.thrallIds = [];
    updateUnitActivity(unit, "Serving as a necromancer's thrall.");
    return;
  }
  unit.thrallIds = getLivingThrallIds(unit, battle);
}

function selectNecromancerTarget({ unit, enemies, graves, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (unit.thrallOwnerId) {
    unit.currentTargetKind = "enemy";
    unit.currentGraveId = null;
    updateUnitActivity(unit, "Fighting as a necromancer's thrall.");
    return selectDefaultTarget({ unit, enemies });
  }
  unit.thrallIds = unit.thrallIds || [];
  if (unit.thrallIds.length < stats.maxThralls) {
    const grave = findNearestGrave(unit, graves);
    if (grave) {
      unit.currentTargetKind = "grave";
      unit.currentGraveId = grave.id;
      updateUnitActivity(unit, "Seeking a gravestone to raise a thrall.");
      return grave;
    }
  }
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
  updateUnitActivity(unit, "Seeking a victim to drain.");
  return selectDefaultTarget({ unit, enemies });
}

function getNecromancerAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return Math.max(stats.range, stats.raiseRange);
}

function getNecromancerDestination({ unit, target, distance, destination, unitDef }) {
  if (!target) return destination;
  const stats = getUnitStats(unit, unitDef);
  if (unit.currentTargetKind === "grave" && distance <= stats.raiseRange * 0.9) return { x: unit.x, y: unit.y };
  return unit.currentTargetKind === "enemy"
    ? getRetreatingDestination(20, 0.15)({ unit, target, distance, destination })
    : destination;
}

function createThrallFromGrave(necromancer, grave, battle) {
  const faction = findFaction(battle, necromancer.factionId);
  if (!faction) return null;
  const angle = Math.random() * Math.PI * 2;
  const thrall = makeUnit(
    necromancer.factionId,
    grave.unitType,
    clamp(grave.x + Math.cos(angle) * 18, 24, battle.field.width - 24),
    clamp(grave.y + Math.sin(angle) * 14, 24, battle.field.height - 24),
  );
  thrall.raisedThrall = true;
  thrall.thrallOwnerId = necromancer.id;
  thrall.veteran = false;
  thrall.statuses = [];
  applyStatus(thrall, "zombie", 1, Infinity, necromancer, battle);
  thrall.health = thrall.maxHealth;
  faction.units.push(thrall);
  necromancer.thrallIds.push(thrall.id);
  return thrall;
}

function performNecromancerAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
  if (unit.currentTargetKind === "grave") {
    const grave = findGraveById(battle, target.id || unit.currentGraveId);
    if (!grave || unit.thrallIds.length >= stats.maxThralls || Math.hypot(grave.x - unit.x, grave.y - unit.y) > stats.raiseRange + 4) return;
    const thrall = createThrallFromGrave(unit, grave, battle);
    if (!thrall) return;
    updateUnitActivity(unit, "Raising a thrall from a fresh gravestone.");
    removeGrave(battle, grave.id);
    spawnBurst(battle, grave.x, grave.y - 4, "#7d5ab8", 20);
    battle.particles.push({ kind: "ring", x: grave.x, y: grave.y, vx: 0, vy: 0, life: 0.55, age: 0, color: "#5e3f82", size: 18, lineWidth: 4 });
    setHighlight(`${findFaction(battle, unit.factionId).title}'s necromancer raises a ${getUnitDefinition(thrall).name.toLowerCase()} thrall`);
    return;
  }
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 6) return;
  updateUnitActivity(unit, `Draining ${getUnitActivityTargetLabel(target, battle)}.`);
  applyDamage(target, stats.biteDamage * (0.9 + Math.random() * 0.3), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 10, angle: unit.facing, life: 0.24, maxLife: 0.24, color: "rgba(112, 72, 154, 0.86)" });
  spawnBurst(battle, target.x, target.y - 2, "#8f63c9", 9);
  distributeNecromancerHealing(unit, stats.biteHeal * (0.9 + Math.random() * 0.2), battle);
}

function handleNecromancerDeath({ unit, battle }) {
  const thrallIds = [...(unit.thrallIds || [])];
  thrallIds.forEach((thrallId) => {
    const thrall = findUnitById(battle, thrallId);
    if (!thrall || thrall.dead) return;
    applyDamage(thrall, thrall.health + 999, battle, unit, { bypassSharedDamage: true, skipGrave: false, noAttackerCredit: true });
  });
}

function selectGraverobberTarget({ unit, enemies, graves }) {
  const grave = findNearestGrave(unit, graves);
  if (grave) {
    unit.currentTargetKind = "grave";
    unit.currentGraveId = grave.id;
    updateUnitActivity(unit, "Seeking a gravestone to rob.");
    return grave;
  }
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
  updateUnitActivity(unit, "Seeking someone to shank with a shovel.");
  return selectDefaultTarget({ unit, enemies });
}

function getGraverobberAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return Math.max(stats.range, stats.graveRange);
}

function getGraverobberDestination({ target, destination, unit }) {
  if (!target) return destination;
  return unit.currentTargetKind === "grave" ? destination : getRetreatingDestination(16, 0.08)({ unit, target, distance: Math.hypot(target.x - unit.x, target.y - unit.y), destination });
}

function performGraverobberAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
  if (unit.currentTargetKind === "grave") {
    const grave = findGraveById(battle, target.id || unit.currentGraveId);
    if (!grave || Math.hypot(grave.x - unit.x, grave.y - unit.y) > stats.graveRange + 4) return;
    removeGrave(battle, grave.id);
    updateUnitActivity(unit, "Plundering a gravestone for strength.");
    unit.gravesRobbed = (unit.gravesRobbed || 0) + 1;
    syncUnitMaxHealth(unit, true);
    spawnBurst(battle, grave.x, grave.y - 3, "#b59363", 16);
    setHighlight(`${findFaction(battle, unit.factionId).title}'s graverobber plunders a grave and grows bolder`);
    return;
  }
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  updateUnitActivity(unit, `Slashing at ${getUnitActivityTargetLabel(target, battle)}.`);
  applyDamage(target, stats.damage * (0.92 + Math.random() * 0.36), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 11, angle: unit.facing, life: 0.2, maxLife: 0.2, color: "rgba(178, 146, 104, 0.86)" });
  spawnBurst(battle, target.x, target.y - 1, "#e0c089", 8);
}

function selectArachnomistTarget({ unit, graves, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const validGrave = findFarthestGrave(unit, graves, (grave) => {
    const distance = Math.hypot(grave.x - unit.x, grave.y - unit.y);
    return grave.factionId !== unit.factionId && distance >= stats.graveDeadZone && distance <= stats.graveRange;
  });
  const fallbackFar = findNearestGrave(unit, graves, (grave) => grave.factionId !== unit.factionId && Math.hypot(grave.x - unit.x, grave.y - unit.y) > stats.graveRange);
  const fallbackNear = findFarthestGrave(unit, graves, (grave) => grave.factionId !== unit.factionId && Math.hypot(grave.x - unit.x, grave.y - unit.y) < stats.graveDeadZone);
  const target = validGrave || fallbackFar || fallbackNear || null;
  unit.currentTargetKind = target ? "grave" : null;
  unit.currentGraveId = target?.id || null;
  updateUnitActivity(unit, target ? "Seeking a gravestone to hatch a spider swarm." : "Seeking graves to infest.");
  return target;
}

function getArachnomistAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return stats.graveRange;
}

function getArachnomistDestination({ unit, target, destination, unitDef, battle }) {
  if (!target || unit.currentTargetKind !== "grave") return destination;
  const stats = getUnitStats(unit, unitDef);
  const faction = battle ? findFaction(battle, unit.factionId) : null;
  const anchor = faction?.bannerPos || unit;
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  const distance = Math.max(0.001, Math.hypot(dx, dy));
  if (distance > stats.graveRange) return destination;
  if (distance < stats.graveDeadZone) {
    const retreat = stats.graveDeadZone - distance + 28;
    return {
      x: unit.x - (dx / distance) * retreat,
      y: unit.y - (dy / distance) * retreat,
    };
  }
  const anchorDx = anchor.x - target.x;
  const anchorDy = anchor.y - target.y;
  const anchorDistance = Math.hypot(anchorDx, anchorDy);
  if (anchorDistance <= 0.001) return { x: unit.x, y: unit.y };
  const desiredRadius = clamp(anchorDistance, stats.graveDeadZone + 6, stats.graveRange - 6);
  return {
    x: target.x + (anchorDx / anchorDistance) * desiredRadius,
    y: target.y + (anchorDy / anchorDistance) * desiredRadius,
  };
}

function createSpiderSwarm(arachnomist, grave, battle) {
  const faction = findFaction(battle, arachnomist.factionId);
  if (!faction) return [];
  const stats = getUnitStats(arachnomist);
  const spiders = [];
  for (let i = 0; i < stats.swarmCount; i += 1) {
    const angle = (Math.PI * 2 * i) / Math.max(1, stats.swarmCount) + Math.random() * 0.5;
    const radius = 8 + Math.random() * stats.swarmSpread;
    const spider = makeUnit(
      arachnomist.factionId,
      "spiderswarm",
      clamp(grave.x + Math.cos(angle) * radius, 18, battle.field.width - 18),
      clamp(grave.y + Math.sin(angle) * radius * 0.75, 18, battle.field.height - 18),
    );
    spider.veteran = false;
    spider.bravery = 2;
    spider.health = spider.maxHealth;
    spider.summonOwnerId = arachnomist.id;
    spiders.push(spider);
  }
  faction.units.push(...spiders);
  return spiders;
}

function performArachnomistAttack({ unit, target, battle, unitDef }) {
  if (!target || unit.currentTargetKind !== "grave") return;
  const stats = getUnitStats(unit, unitDef);
  const grave = findGraveById(battle, target.id || unit.currentGraveId);
  if (!grave || grave.factionId === unit.factionId) return;
  const distance = Math.hypot(grave.x - unit.x, grave.y - unit.y);
  if (distance > stats.graveRange + 4 || distance < Math.max(0, stats.graveDeadZone - 4)) return;
  removeGrave(battle, grave.id);
  const spiders = createSpiderSwarm(unit, grave, battle);
  if (!spiders.length) return;
  updateUnitActivity(unit, "Turning a gravestone into a spider swarm.");
  spawnBurst(battle, grave.x, grave.y - 4, "#96d55f", 18);
  battle.particles.push({ kind: "ring", x: grave.x, y: grave.y, vx: 0, vy: 0, life: 0.48, age: 0, color: "#7ab34b", size: 22, lineWidth: 4 });
  setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"}'s arachnomist turns a grave into a spider swarm`);
}

function updateSpiderSwarmState({ unit, battle, dt, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (typeof unit.lifeTimer === "number") {
    unit.lifeTimer -= dt;
    if (unit.lifeTimer <= 0) {
      unit.expiredByTimer = true;
      applyDamage(unit, unit.health + 999, battle, null, { noAttackerCredit: true, skipDefaultDeathBurst: true });
      return;
    }
  }
  unit.wanderTimer = Math.max(0, (unit.wanderTimer || 0) - dt);
  const dx = (unit.wanderTargetX ?? unit.x) - unit.x;
  const dy = (unit.wanderTargetY ?? unit.y) - unit.y;
  const distance = Math.hypot(dx, dy);
  if (unit.wanderTimer <= 0 || distance < 10) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 54;
    unit.wanderTargetX = clamp(unit.x + Math.cos(angle) * radius, 16, battle.field.width - 16);
    unit.wanderTargetY = clamp(unit.y + Math.sin(angle) * radius, 16, battle.field.height - 16);
    unit.wanderTimer = 0.2 + Math.random() * 0.45;
  }
  updateUnitActivity(unit, "Skittering in search of prey.");
  const encountered = [];
  battle.factions.forEach((faction) => {
    faction.units.forEach((candidate) => {
      if (candidate.id === unit.id || candidate.dead || candidate.fled || candidate.type === "spiderswarm") return;
      if (!canUnitBeTargeted(candidate, unit)) return;
      const encounterDistance = Math.hypot(candidate.x - unit.x, candidate.y - unit.y);
      if (encounterDistance <= stats.range + 10) {
        encountered.push(candidate.id);
      }
    });
  });
  unit.focusTargetId = encountered.length ? encountered[Math.floor(Math.random() * encountered.length)] : null;
}

function selectSpiderSwarmTarget({ unit, battle }) {
  if (!battle) return null;
  const target = battle.factions
    .flatMap((faction) => faction.units)
    .find((candidate) => candidate.id === unit.focusTargetId && !candidate.dead && !candidate.fled && candidate.type !== "spiderswarm");
  unit.currentTargetKind = target ? "enemy" : null;
  updateUnitActivity(unit, target ? `Swarming ${getUnitActivityTargetLabel(target, battle)}.` : "Skittering in search of prey.");
  return target;
}

function getSpiderSwarmDestination({ unit, target, destination }) {
  if (target && unit.currentTargetKind === "enemy") return destination;
  return {
    x: unit.wanderTargetX ?? unit.x,
    y: unit.wanderTargetY ?? unit.y,
  };
}

function performSpiderSwarmAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  updateUnitActivity(unit, `Biting ${getUnitActivityTargetLabel(target, battle)}.`);
  applyDamage(target, stats.biteDamage * (0.88 + Math.random() * 0.28), battle, unit);
  applyStatus(target, "poison", stats.poisonStacks, stats.poisonDuration, unit, battle);
  battle.swipes.push({ x: target.x, y: target.y - 4, angle: unit.facing, life: 0.14, maxLife: 0.14, color: "rgba(120, 173, 82, 0.9)" });
  spawnBurst(battle, target.x, target.y - 1, "#8bd266", 4);
}

function updatePhantomState({ unit, battle, dt }) {
  if (unit.spawnInvulnerable && (battle.time || 0) >= (unit.invulnerableUntil || 0)) {
    unit.spawnInvulnerable = false;
    unit.invulnerableUntil = 0;
  }
  unit.retargetTimer = Math.max(0, (unit.retargetTimer || 0) - dt);
  const host = unit.possessedUnitId ? findUnitById(battle, unit.possessedUnitId) : null;
  if (host && !host.dead && !host.fled && getPossessingPhantom(host, battle)?.id === unit.id) {
    updateUnitActivity(unit, `Possessing ${getUnitActivityTargetLabel(host, battle)}.`);
    unit.x = host.x;
    unit.y = host.y - 16;
    unit.vx = 0;
    unit.vy = 0;
    unit.z = 18 + Math.sin((battle.time || 0) * 5 + unit.statusVisualSeed) * 5;
    return;
  }
  if (unit.possessedUnitId) {
    ejectPhantomFromHost(unit, host, battle, { gravesToConsume: 3 });
  }
  unit.z = 12 + Math.sin((battle.time || 0) * 4.8 + unit.statusVisualSeed) * 6;
  unit.rotation = Math.sin((battle.time || 0) * 2.2 + unit.statusVisualSeed * 0.8) * 0.08;
  const canPossess = (unit.gravesToConsume || 0) <= 0 && !unit.spawnInvulnerable;
  updateUnitActivity(unit, canPossess ? "Seeking a host to possess." : "Seeking gravestones to recharge its haunt attack.");
  if (canPossess && Math.random() > 0.42) {
    battle.particles.push({
      x: unit.x + (Math.random() - 0.5) * 10,
      y: unit.y - 8 + Math.random() * 10,
      vx: (Math.random() - 0.5) * 10,
      vy: -14 - Math.random() * 10,
      life: 0.34 + Math.random() * 0.18,
      age: 0,
      color: Math.random() > 0.45 ? "#d7d0ff" : "#98f3ff",
      size: 2 + Math.random() * 3,
    });
  }
}

function selectPhantomTarget({ unit, enemies, graves, battle, unitDef }) {
  if (unit.possessedUnitId) {
    unit.currentTargetKind = null;
    updateUnitActivity(unit, "Possessing an enemy host.");
    return null;
  }
  if ((unit.gravesToConsume || 0) > 0) {
    const grave = findNearestGrave(unit, graves);
    unit.currentTargetKind = grave ? "grave" : null;
    unit.currentGraveId = grave?.id || null;
    updateUnitActivity(unit, grave ? "Seeking gravestones to recharge its haunt attack." : "Searching for gravestones to recharge its haunt attack.");
    return grave;
  }
  const stats = getUnitStats(unit, unitDef);
  const validTargets = enemies.filter((enemy) => (
    enemy.type !== "inklord"
    && enemy.type !== "phantom"
    && !getPossessionStatus(enemy, battle)
    && !enemy.spawnInvulnerable
    && Math.hypot(enemy.x - unit.x, enemy.y - unit.y) <= stats.hauntRange
  ));
  const pool = validTargets.length
    ? validTargets
    : enemies.filter((enemy) => enemy.type !== "inklord" && enemy.type !== "phantom" && !getPossessionStatus(enemy, battle) && !enemy.spawnInvulnerable);
  if (!pool.length) {
    unit.currentTargetKind = null;
    updateUnitActivity(unit, "Seeking a host to possess.");
    return null;
  }
  const locked = pool.find((enemy) => enemy.id === unit.focusTargetId);
  if (locked && unit.retargetTimer > 0) {
    unit.currentTargetKind = "enemy";
    updateUnitActivity(unit, `Haunting ${getUnitActivityTargetLabel(locked, battle)}.`);
    return locked;
  }
  let target = null;
  let bestScore = -Infinity;
  pool.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    let nearbyAllies = 0;
    pool.forEach((other) => {
      if (other.id === enemy.id) return;
      if (Math.hypot(other.x - enemy.x, other.y - enemy.y) <= 70) nearbyAllies += 1;
    });
    const woundedBias = 1 - (enemy.health / Math.max(1, enemy.maxHealth));
    const score = nearbyAllies * 18 + woundedBias * 12 - distance * 0.08;
    if (score > bestScore) {
      bestScore = score;
      target = enemy;
    }
  });
  unit.focusTargetId = target?.id || null;
  unit.retargetTimer = 2.8;
  unit.currentTargetKind = target ? "enemy" : null;
  updateUnitActivity(unit, target ? `Haunting ${getUnitActivityTargetLabel(target, battle)}.` : "Seeking a host to possess.");
  return target;
}

function getPhantomAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return (unit.gravesToConsume || 0) > 0 ? stats.graveRange : stats.range;
}

function getPhantomDestination({ unit, target, distance, battle, destination, unitDef }) {
  if (unit.possessedUnitId) return { x: unit.x, y: unit.y };
  if (!target) {
    return {
      x: unit.x + Math.cos((battle.time || 0) * 0.8 + unit.statusVisualSeed) * 18,
      y: unit.y + Math.sin((battle.time || 0) * 1.1 + unit.statusVisualSeed * 0.7) * 14,
    };
  }
  const stats = getUnitStats(unit, unitDef);
  if (unit.currentTargetKind === "enemy") {
    const dx = destination.x - unit.x;
    const dy = destination.y - unit.y;
    const length = Math.max(0.001, Math.hypot(dx, dy));
    const normalX = dx / length;
    const normalY = dy / length;
    const desiredStop = Math.max(0, stats.range - 0.1);
    const leadTime = Math.min(0.22, length / 520);
    const leadX = destination.x + (target.vx || 0) * leadTime;
    const leadY = destination.y + (target.vy || 0) * leadTime;
    const finalApproach = length <= 90;
    const lateral = finalApproach ? 0 : Math.sin((battle.time || 0) * 2.4 + unit.statusVisualSeed) * Math.min(14, 4 + length * 0.04);
    return {
      x: leadX - normalX * desiredStop - normalY * lateral,
      y: leadY - normalY * desiredStop + normalX * lateral * 0.45,
    };
  }
  const dx = destination.x - unit.x;
  const dy = destination.y - unit.y;
  const length = Math.max(0.001, Math.hypot(dx, dy));
  const normalX = dx / length;
  const normalY = dy / length;
  const arcX = -normalY;
  const arcY = normalX;
  const desiredStop = unit.currentTargetKind === "grave"
    ? Math.max(0, stats.graveRange - 4)
    : Math.max(0, stats.range - 2);
  const travel = Math.max(0, length - desiredStop);
  return {
    x: unit.x + normalX * travel + arcX * Math.sin((battle.time || 0) * 2.6 + unit.statusVisualSeed * 1.4) * Math.min(34, 8 + length * 0.18),
    y: unit.y + normalY * travel + arcY * Math.sin((battle.time || 0) * 2.6 + unit.statusVisualSeed * 1.4) * Math.min(34, 8 + length * 0.18) * 0.72,
  };
}

function performPhantomAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if ((unit.gravesToConsume || 0) > 0) {
    if (!target || unit.currentTargetKind !== "grave") return false;
    const grave = findGraveById(battle, target.id || unit.currentGraveId);
    if (!grave || Math.hypot(grave.x - unit.x, grave.y - unit.y) > stats.graveRange + 4) return false;
    updateUnitActivity(unit, "Feeding on a gravestone to restore its haunt.");
    removeGrave(battle, grave.id);
    unit.gravesToConsume = Math.max(0, (unit.gravesToConsume || 0) - 1);
    spawnBurst(battle, grave.x, grave.y - 6, "#d2c8ff", 14);
    battle.particles.push({ kind: "ring", x: grave.x, y: grave.y, vx: 0, vy: 0, life: 0.3, age: 0, color: "rgba(210, 200, 255, 0.92)", size: 16, lineWidth: 3 });
    if (unit.gravesToConsume <= 0) {
      spawnBurst(battle, unit.x, unit.y - 10, "#d7d0ff", 18);
      battle.particles.push({ kind: "shockwave", x: unit.x, y: unit.y - 4, vx: 0, vy: 0, life: 0.34, age: 0, color: "rgba(182, 165, 255, 0.82)", size: 14, startSize: 14, maxSize: 44, lineWidth: 4 });
      setHighlight(`${findFaction(battle, unit.factionId)?.title || "A faction"}'s phantom regains its strength`);
    }
    unit.cooldown = stats.cooldown * 0.5;
    return true;
  }
  if (!target || target.type === "inklord" || target.type === "phantom" || getPossessionStatus(target, battle)) return false;
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 12) return false;
  if (possessUnit(unit, target, battle)) {
    updateUnitActivity(unit, `Possessing ${getUnitActivityTargetLabel(target, battle)}.`);
    unit.cooldown = stats.cooldown;
    return true;
  }
  return false;
}

function updateInkLordPresence({ unit, battle, enemies, dt }) {
  if (unit.spawnInvulnerable) return;
  unit.auraPulse = (unit.auraPulse || 0) + dt;
  unit.tauntCooldown = Math.max(0, (unit.tauntCooldown || 0) - dt);
  if (Math.random() > 0.14) {
    battle.particles.push({
      x: unit.x + (Math.random() - 0.5) * 26,
      y: unit.y - 28 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 14,
      vy: -10 - Math.random() * 10,
      life: 0.32 + Math.random() * 0.18,
      age: 0,
      color: Math.random() > 0.4 ? "#13121a" : "#8e7cff",
      size: 3 + Math.random() * 5,
    });
  }
  if (Math.random() > 0.4) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 26;
    battle.particles.push({
      kind: "ink-spark",
      x: unit.x + Math.cos(angle) * radius,
      y: unit.y + 4 + Math.sin(angle) * radius * 0.46,
      vx: Math.cos(angle) * (4 + Math.random() * 10),
      vy: -12 - Math.random() * 10,
      life: 0.42 + Math.random() * 0.22,
      age: 0,
      color: Math.random() > 0.5 ? "#c7b8ff" : "#6f60ff",
      size: 5 + Math.random() * 4,
      rotation: angle,
    });
  }
  if (Math.random() > 0.58) {
    battle.particles.push({
      kind: "dust",
      x: unit.x + (Math.random() - 0.5) * 34,
      y: unit.y + 16 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 16,
      vy: -6 - Math.random() * 8,
      life: 0.36 + Math.random() * 0.22,
      age: 0,
      color: Math.random() > 0.5 ? "#0e0c13" : "#5e52a5",
      size: 8 + Math.random() * 6,
    });
  }
  if (enemies.length >= 5 && Math.random() > 0.975) {
    setHighlight("InkLord is herding the survivors toward annihilation");
  }
}

function selectInkLordTarget({ unit, enemies }) {
  let best = enemies[0] || null;
  let bestScore = -Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    let clusterScore = 0;
    enemies.forEach((other) => {
      const neighborDistance = Math.hypot(other.x - enemy.x, other.y - enemy.y);
      if (neighborDistance <= 92) clusterScore += 1 - neighborDistance / 92;
    });
    const score = clusterScore * 30 - distance * 0.22 - enemy.health * 0.04 + Math.random() * 2;
    if (score > bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  unit.currentTargetKind = best ? "enemy" : null;
  unit.currentGraveId = null;
  return best;
}

function getInkLordAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return Math.max(stats.range, stats.sweepRange, stats.novaRange, stats.skyfallRange);
}

function performInkLordAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || unit.spawnInvulnerable || unit.activeSpellId) return;
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  const nearby = getEnemiesWithinRadius(battle, unit, unit.x, unit.y, stats.sweepRange);
  if (nearby.length >= 2 && Math.random() < 0.54) {
    performInkLordSweep(unit, battle, nearby, stats);
    return;
  }
  if (distance <= stats.range + 10 && Math.random() < 0.48) {
    performInkLordThrow(unit, target, battle, stats);
    return;
  }
  if (distance <= stats.novaRange && Math.random() < 0.34) {
    performInkLordNova(unit, battle, stats);
    return;
  }
  if (distance <= stats.skyfallRange) {
    performInkLordSkyfall(unit, target, battle, stats);
    return;
  }
  performInkLordSweep(unit, battle, nearby, stats);
}

function getEnemiesWithinRadius(battle, attacker, x, y, radius) {
  return getNearbyLivingUnits(battle, x, y, radius).filter((unit) => (
    unit.id !== attacker.id
    && canUnitBeTargeted(unit, attacker)
    && areUnitsHostile(attacker, unit, battle)
    && Math.hypot(unit.x - x, unit.y - y) <= radius
  ));
}

function performInkLordSweep(unit, battle, nearby, stats) {
  const impacted = nearby.filter((enemy) => {
    const angle = Math.atan2(enemy.y - unit.y, enemy.x - unit.x);
    return Math.abs(normalizeAngle(angle - unit.facing)) <= stats.sweepArc * 0.5;
  });
  const victims = (impacted.length ? impacted : nearby)
    .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))
    .slice(0, 2);
  victims.forEach((enemy, index) => {
    applyDamage(enemy, stats.sweepDamage * (0.88 + Math.random() * 0.3), battle, unit);
    launchUnitByInkLord(unit, enemy, battle, {
      distance: stats.throwDistance * (0.72 + Math.random() * 0.26),
      duration: 1.05 + Math.random() * 0.24,
      impactDamage: stats.landingDamage * (0.84 + Math.random() * 0.18),
      landingRadius: stats.landingRadius,
      arcHeight: 86 + Math.random() * 26,
      angleOffset: ((index / Math.max(1, victims.length - 1)) - 0.5) * 0.7,
    });
  });
  battle.swipes.push({ x: unit.x + Math.cos(unit.facing) * 28, y: unit.y - 12 + Math.sin(unit.facing) * 18, angle: unit.facing, life: 0.34, maxLife: 0.34, color: "rgba(234, 226, 255, 0.86)", width: 94 });
  spawnInkLordRupture(battle, unit.x + Math.cos(unit.facing) * 44, unit.y + Math.sin(unit.facing) * 18, stats.sweepRange * 0.78);
  maybeTriggerInkLordTaunt(unit, battle, 0.38);
  setHighlight("InkLord sweeps his blade and bodies are hurled aside");
}

function performInkLordThrow(unit, target, battle, stats) {
  applyDamage(target, stats.throwDamage * (0.92 + Math.random() * 0.24), battle, unit);
  launchUnitByInkLord(unit, target, battle, {
    distance: stats.throwDistance * (0.94 + Math.random() * 0.18),
    duration: 1.28 + Math.random() * 0.22,
    impactDamage: stats.landingDamage * 1.15,
    landingRadius: stats.landingRadius * 1.08,
    arcHeight: 108 + Math.random() * 28,
  });
  battle.swipes.push({ x: target.x, y: target.y - 10, angle: unit.facing, life: 0.24, maxLife: 0.24, color: "rgba(255, 248, 232, 0.85)", width: 62 });
  spawnBurst(battle, target.x, target.y - 8, "#f4e8ff", 18);
  maybeTriggerInkLordTaunt(unit, battle, 0.62);
  setHighlight("InkLord catches a fighter and flings them through the melee");
}

function performInkLordNova(unit, battle, stats) {
  getEnemiesWithinRadius(battle, unit, unit.x, unit.y, stats.novaRange)
    .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))
    .slice(0, 4)
    .forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    applyDamage(enemy, stats.novaDamage * clamp(1 - distance / stats.novaRange, 0.45, 1), battle, unit);
    if (distance <= stats.novaRange * 0.8) {
      launchUnitByInkLord(unit, enemy, battle, {
        distance: stats.throwDistance * 0.52,
        duration: 0.92 + Math.random() * 0.2,
        impactDamage: stats.landingDamage * 0.42,
        landingRadius: stats.landingRadius * 0.68,
        arcHeight: 72 + Math.random() * 20,
      });
    }
  });
  spawnInkLordRupture(battle, unit.x, unit.y, stats.novaRange);
  battle.particles.push({ kind: "shockwave", x: unit.x, y: unit.y, vx: 0, vy: 0, life: 0.62, age: 0, color: "#b09cff", size: 28, startSize: 28, maxSize: stats.novaRange, lineWidth: 16 });
  maybeTriggerInkLordTaunt(unit, battle, 0.34);
  setHighlight("InkLord unleashes a void pulse that scatters the field");
}

function performInkLordSkyfall(unit, target, battle, stats) {
  const centerX = clamp(target.x + (Math.random() - 0.5) * 24, 40, battle.field.width - 40);
  const centerY = clamp(target.y + (Math.random() - 0.5) * 24, 40, battle.field.height - 40);
  getEnemiesWithinRadius(battle, unit, centerX, centerY, stats.skyfallRadius)
    .sort((a, b) => Math.hypot(a.x - centerX, a.y - centerY) - Math.hypot(b.x - centerX, b.y - centerY))
    .slice(0, 3)
    .forEach((enemy) => {
    const distance = Math.hypot(enemy.x - centerX, enemy.y - centerY);
    applyDamage(enemy, stats.skyfallDamage * clamp(1 - distance / stats.skyfallRadius, 0.35, 1), battle, unit);
    launchUnitByInkLord(unit, enemy, battle, {
      distance: stats.throwDistance * (0.66 + Math.random() * 0.22),
      duration: 1.12 + Math.random() * 0.22,
      impactDamage: stats.crashDamage,
      landingRadius: stats.landingRadius,
      arcHeight: 92 + Math.random() * 24,
    });
  });
  spawnInkLordRupture(battle, centerX, centerY, stats.skyfallRadius);
  for (let i = 0; i < 3; i += 1) {
    battle.particles.push({ kind: "shockwave", x: centerX, y: centerY, vx: 0, vy: 0, life: 0.44 + i * 0.08, age: 0, color: i === 0 ? "#f3ebff" : "#6c59ff", size: 24 + i * 12, startSize: 24 + i * 12, maxSize: stats.skyfallRadius * (0.65 + i * 0.18), lineWidth: 8 + i * 3 });
  }
  maybeTriggerInkLordTaunt(unit, battle, 0.44);
  setHighlight("InkLord calls down a ruinous impact into the survivors");
}

function maybeTriggerInkLordTaunt(unit, battle, chance = 0.4) {
  if (!unit || unit.type !== "inklord" || (unit.tauntCooldown || 0) > 0 || Math.random() > chance) return;
  const choices = INKLORD_TAUNTS.filter((line) => line !== unit.lastTaunt);
  const text = choices[Math.floor(Math.random() * choices.length)] || INKLORD_TAUNTS[0];
  unit.lastTaunt = text;
  unit.tauntCooldown = 3.8 + Math.random() * 2.4;
  battle.bossBubbles.push({
    sourceId: unit.id,
    text,
    age: 0,
    life: 2.2 + Math.random() * 0.5,
    rise: 0,
  });
}

function launchUnitByInkLord(source, target, battle, options = {}) {
  if (!target || target.dead || target.fled || target.displacedBySpellId || target.liftedBySpellId) return;
  const baseAngle = Math.atan2(target.y - source.y, target.x - source.x) + (options.angleOffset || 0);
  const distance = options.distance || 140;
  const endX = clamp(target.x + Math.cos(baseAngle) * distance, 24, battle.field.width - 24);
  const endY = clamp(target.y + Math.sin(baseAngle) * distance * 0.72, 24, battle.field.height - 24);
  const spellId = `${source.id}-throw-${Math.random().toString(36).slice(2, 8)}`;
  battle.spells.push({
    id: spellId,
    kind: "inklord-throw",
    sourceId: source.id,
    targetId: target.id,
    time: 0,
    duration: options.duration || 0.68,
    startX: target.x,
    startY: target.y,
    endX,
    endY,
    impactDamage: options.impactDamage || 58,
    landingRadius: options.landingRadius || 58,
    arcHeight: options.arcHeight || 88,
    color: "#e4d6ff",
    spinRate: (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 8),
  });
  target.displacedBySpellId = spellId;
  target.rotation = 0;
}

function launchUnitsAroundPoint(battle, source, x, y, radius, damage, throwDistance, falloff = 1) {
  getEnemiesWithinRadius(battle, source, x, y, radius).forEach((enemy) => {
    const distance = Math.hypot(enemy.x - x, enemy.y - y);
    applyDamage(enemy, damage * clamp(1 - distance / radius, 0.45, 1) * falloff, battle, source);
    launchUnitByInkLord(source, enemy, battle, {
      distance: throwDistance * clamp(1 - distance / radius, 0.55, 1),
      duration: 0.64 + Math.random() * 0.16,
      impactDamage: damage * 0.45,
      landingRadius: 54,
      angleOffset: (Math.random() - 0.5) * 0.45,
    });
  });
}

function spawnInkLordRupture(battle, x, y, radius) {
  spawnBurst(battle, x, y, "#1a1720", 22);
  spawnBurst(battle, x, y, "#8b78ff", 18);
  battle.particles.push({ kind: "blast-glow", x, y, vx: 0, vy: 0, life: 0.64, age: 0, color: "#231b36", size: radius * 1.08 });
  battle.particles.push({ kind: "ring", x, y, vx: 0, vy: 0, life: 0.7, age: 0, color: "#7f6cff", size: radius * 0.92, lineWidth: 6 });
  battle.particles.push({ kind: "ring", x, y, vx: 0, vy: 0, life: 0.9, age: 0, color: "#17131f", size: radius * 1.12, lineWidth: 10 });
  for (let i = 0; i < 18; i += 1) {
    const angle = (Math.PI * 2 * i) / 18;
    const drift = radius * (0.25 + Math.random() * 0.18);
    battle.particles.push({
      kind: "debris",
      x: x + Math.cos(angle) * 10,
      y: y + Math.sin(angle) * 8,
      vx: Math.cos(angle) * drift,
      vy: -25 - Math.random() * 60,
      life: 0.58 + Math.random() * 0.3,
      age: 0,
      color: Math.random() > 0.5 ? "#2b2237" : "#6e5eff",
      size: 4 + Math.random() * 7,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 10,
    });
  }
}

function selectBomberTarget({ unit, enemies, allies, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const nonSelfAllies = allies.filter((ally) => ally.id !== unit.id);
  let best = enemies[0] || null;
  let bestScore = -Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const inRangeBias = distance <= stats.range ? 44 : Math.max(-36, (stats.range - distance) * 0.24);
    let clusterScore = 0;
    enemies.forEach((other) => {
      const neighborDistance = Math.hypot(other.x - enemy.x, other.y - enemy.y);
      if (neighborDistance <= stats.splash * 1.9) {
        clusterScore += 1 - (neighborDistance / (stats.splash * 1.9));
      }
    });
    const nearestAlly = nonSelfAllies.length
      ? Math.min(...nonSelfAllies.map((ally) => Math.hypot(enemy.x - ally.x, enemy.y - ally.y)))
      : Infinity;
    const allyDangerPenalty = Number.isFinite(nearestAlly) && nearestAlly < stats.splash * 1.25
      ? (stats.splash * 1.25 - nearestAlly) * 0.9
      : 0;
    const woundedBias = (1 - (enemy.health / enemy.maxHealth)) * 8;
    const stickyBias = unit.focusTargetId === enemy.id ? 12 : 0;
    const score = (clusterScore * 34) + inRangeBias + woundedBias + stickyBias - (distance * 0.08) - allyDangerPenalty;
    if (score > bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  unit.focusTargetId = best?.id || null;
  return best;
}

function selectMountainTarget({ unit, enemies }) {
  const candidates = enemies.filter((enemy) => !enemy.liftedBySpellId && !enemy.displacedBySpellId);
  const pool = candidates.length ? candidates : enemies;
  let best = pool[0] || null;
  let bestScore = Infinity;
  pool.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    const score = distance * 0.82 + enemy.health * 0.18;
    if (score < bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  return best;
}

function selectCatapultTarget({ unit, enemies }) {
  const stats = getUnitStats(unit);
  let best = enemies[0] || null;
  let bestScore = -Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    if (distance > stats.range) return;
    let cluster = 0;
    enemies.forEach((other) => {
      const neighborDistance = Math.hypot(other.x - enemy.x, other.y - enemy.y);
      if (neighborDistance <= 78) cluster += 1 - (neighborDistance / 78) * 0.7;
    });
    const score = cluster * 30 - distance * 0.04 + Math.random() * 4;
    if (score > bestScore) {
      bestScore = score;
      best = enemy;
    }
  });
  return best;
}

function getFirebreatherDestination({ unit, target, allies, distance, destination }) {
  if (!target) return destination;
  const nearbyAllies = allies.filter((ally) => ally.id !== unit.id && Math.hypot(ally.x - unit.x, ally.y - unit.y) <= 84);
  if (nearbyAllies.length && distance <= getUnitStats(unit).range * 1.1) {
    const centroid = nearbyAllies.reduce((acc, ally) => ({ x: acc.x + ally.x, y: acc.y + ally.y }), { x: 0, y: 0 });
    centroid.x /= nearbyAllies.length;
    centroid.y /= nearbyAllies.length;
    const awayX = unit.x - centroid.x;
    const awayY = unit.y - centroid.y;
    const len = Math.max(0.001, Math.hypot(awayX, awayY));
    return {
      x: unit.x + (awayX / len) * 68,
      y: unit.y + (awayY / len) * 68,
    };
  }
  return getRetreatingDestination(86, 0.96)({ unit, target, distance, destination });
}

function performArcherAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const endX = target.x + (Math.random() - 0.5) * 30;
  const endY = target.y + (Math.random() - 0.5) * 26;
  const distance = Math.hypot(endX - unit.x, endY - unit.y);
  battle.projectiles.push({ kind: "arrow", sourceId: unit.id, progress: 0, duration: clamp(0.35 + distance / 230 + Math.random() * 0.15, 0.38, 1.3), startX: unit.x, startY: unit.y - 18, endX, endY, impactAngle: Math.atan2(endY - unit.y, endX - unit.x), targetId: target.id, damage: stats.damage * (0.85 + Math.random() * 0.5) });
}

function performPoisonerAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const endX = target.x + (Math.random() - 0.5) * 18;
  const endY = target.y + (Math.random() - 0.5) * 18;
  const throwDistance = Math.hypot(endX - unit.x, endY - unit.y);
  battle.projectiles.push({
    kind: "poisonBottle",
    sourceId: unit.id,
    progress: 0,
    duration: clamp(0.52 + throwDistance / 240 + Math.random() * 0.14, 0.6, 1.25),
    startX: unit.x,
    startY: unit.y - 18,
    endX,
    endY,
    targetId: target.id,
    damage: stats.damage,
    radius: stats.splash,
    poisonStacks: stats.poisonStacks,
    poisonDuration: stats.poisonDuration,
    poisonDamage: stats.poisonDamage,
  });
}

function performHuntsmanAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return false;
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  const targetImmobilized = getUnitStatus(target, "immobilized");
  const canThrowNet = (unit.huntsmanNetCooldown || 0) <= 0;
  const canThrowKnife = (unit.huntsmanKnifeCooldown || 0) <= 0;

  if (!targetImmobilized && canThrowNet && distance <= stats.netRange && Math.random() < 0.58) {
    updateUnitActivity(unit, `Throwing a net at ${getUnitActivityTargetLabel(target, battle)}.`);
    battle.projectiles.push({
      kind: "net",
      sourceId: unit.id,
      progress: 0,
      duration: clamp(0.42 + distance / 260 + Math.random() * 0.08, 0.45, 1.05),
      startX: unit.x,
      startY: unit.y - 18,
      endX: target.x,
      endY: target.y - 4,
      targetId: target.id,
      netDuration: stats.netDuration,
    });
    unit.huntsmanNetCooldown = 4;
    return true;
  }

  if (!canThrowKnife) return false;

  const aimX = target.x;
  const aimY = target.y;
  const lineAngle = Math.atan2(aimY - unit.y, aimX - unit.x);
  battle.projectiles.push({
    kind: "huntingKnife",
    sourceId: unit.id,
    progress: 0,
    duration: clamp(0.48 + distance / 185 + Math.random() * 0.12, 0.52, 1.45),
    startX: unit.x + (unit.displayFacingX || 1) * 10,
    startY: unit.y - 18,
    endX: aimX,
    endY: aimY,
    targetId: target.id,
    damage: stats.damage,
    impactAngle: lineAngle,
    targetStartX: target.x,
    targetStartY: target.y,
  });
  updateUnitActivity(unit, `Throwing a hunting knife at ${getUnitActivityTargetLabel(target, battle)}.`);
  unit.huntsmanKnifeCooldown = 1;
  return true;
}

function performMageAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  const spellExists = battle.spells.some((spell) => spell.sourceId === unit.id || spell.targetId === target.id);
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  const abductEligible = distance <= stats.abductRange && !target.liftedBySpellId && !unit.activeSpellId;
  if (abductEligible && !spellExists && Math.random() < 0.45) {
    const pullAngle = Math.atan2(unit.y - target.y, unit.x - target.x);
    const endX = unit.x - Math.cos(pullAngle) * 58;
    const endY = unit.y - Math.sin(pullAngle) * 58;
    const spellId = `spell-${Math.random().toString(36).slice(2, 8)}`;
    battle.spells.push({ id: spellId, kind: "levitate", sourceId: unit.id, targetId: target.id, time: 0, duration: 1.15, startX: target.x, startY: target.y, endX, endY, color: findFaction(battle, unit.factionId).color });
    unit.activeSpellId = spellId;
    target.liftedBySpellId = spellId;
    updateUnitActivity(unit, `Levitating ${getUnitActivityTargetLabel(target, battle)}.`);
    return;
  }
  if (distance <= stats.range) {
    updateUnitActivity(unit, `Firing an orb at ${getUnitActivityTargetLabel(target, battle)}.`);
    battle.projectiles.push({ kind: "orb", sourceId: unit.id, progress: 0, duration: 0.44 + Math.random() * 0.24, startX: unit.x, startY: unit.y - 24, endX: target.x, endY: target.y, targetId: target.id, damage: stats.damage * (1.05 + Math.random() * 0.65), radius: 44 * (unit.veteran ? VETERAN_BONUSES.radius : 1) });
  }
}

function performFirebreatherAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
  updateUnitActivity(unit, `Breathing fire at ${getUnitActivityTargetLabel(target, battle)}.`);
  const spellId = `${unit.id}-flame-${Math.random().toString(36).slice(2, 7)}`;
  battle.spells.push({
    id: spellId,
    kind: "flame-breath",
    sourceId: unit.id,
    targetId: target.id,
    time: 0,
    duration: stats.breathDuration,
    range: stats.range,
    coneAngle: stats.coneAngle,
    dps: stats.damage,
    ignitionExposure: stats.ignitionExposure,
    exposureGrace: stats.exposureGrace,
    igniteStacks: stats.igniteStacks,
    igniteDuration: stats.igniteDuration,
    color: "#ff9b48",
  });
  unit.activeSpellId = spellId;
  setHighlight(`${findFaction(battle, unit.factionId).title}'s firebreather washes the line in flame`);
}

function getMountainAttackRange(unitDef, unit) {
  const stats = getUnitStats(unit, unitDef);
  return Math.max(stats.range, stats.impulseRange, stats.holdRange);
}

function getCatapultAttackRange(unitDef, unit) {
  return getUnitStats(unit, unitDef).range;
}

function performMountainAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || unit.activeSpellId) return;
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  const abilities = [];
  if (!target.liftedBySpellId && !target.displacedBySpellId && distance <= stats.impulseRange) {
    abilities.push("impulse");
  }
  if (!target.liftedBySpellId && !target.displacedBySpellId && distance <= stats.holdRange) {
    abilities.push("hold");
  }
  if (!abilities.length) return;
  const selected = abilities[Math.floor(Math.random() * abilities.length)];
  if (selected === "hold") {
    updateUnitActivity(unit, `Seizing ${getUnitActivityTargetLabel(target, battle)} in mountain magic.`);
    castMountainHold(unit, target, battle, unitDef);
    return;
  }
  updateUnitActivity(unit, `Blasting ${getUnitActivityTargetLabel(target, battle)} backward.`);
  castMountainImpulse(unit, target, battle, unitDef);
}

function castMountainImpulse(unit, target, battle, unitDef) {
  const stats = getUnitStats(unit, unitDef);
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  const length = Math.hypot(dx, dy) || 1;
  const directionX = dx / length;
  const directionY = dy / length;
  const spellId = `${unit.id}-impulse-${Math.random().toString(36).slice(2, 7)}`;
  battle.spells.push({
    id: spellId,
    kind: "mountain-impulse",
    sourceId: unit.id,
    targetId: target.id,
    time: 0,
    duration: 0.42,
    startX: target.x,
    startY: target.y,
    endX: clamp(target.x + directionX * stats.impulseDistance, 24, battle.field.width - 24),
    endY: clamp(target.y + directionY * stats.impulseDistance * 0.72, 24, battle.field.height - 24),
    color: "#9fe1a7",
  });
  target.displacedBySpellId = spellId;
  unit.activeSpellId = spellId;
  applyDamage(target, stats.impulseDamage * (0.88 + Math.random() * 0.3), battle, unit);
  spawnBurst(battle, target.x, target.y - 6, "#bbf0b0", 18);
  setHighlight(`${findFaction(battle, unit.factionId).title}'s Men of the Mountain hurl an enemy backward`);
}

function castMountainHold(unit, target, battle, unitDef) {
  const stats = getUnitStats(unit, unitDef);
  const spellId = `${unit.id}-hold-${Math.random().toString(36).slice(2, 7)}`;
  const holdX = clamp(unit.x + (unit.displayFacingX || 1) * 30, 24, battle.field.width - 24);
  const holdY = clamp(unit.y - 6, 24, battle.field.height - 24);
  const pullDistance = Math.hypot(holdX - target.x, holdY - target.y);
  battle.spells.push({
    id: spellId,
    kind: "mountain-hold",
    sourceId: unit.id,
    targetId: target.id,
    time: 0,
    duration: stats.holdDuration,
    pullDuration: clamp(0.14 + pullDistance / 520, 0.14, 0.3),
    startX: target.x,
    startY: target.y,
    damageTickTimer: 0,
    damagePerTick: stats.holdDamage,
    tickInterval: stats.holdTick,
    holdOffsetX: (unit.displayFacingX || 1) * 30,
    holdOffsetY: 6,
    color: "#8fdb93",
  });
  target.liftedBySpellId = spellId;
  unit.activeSpellId = spellId;
  spawnBurst(battle, target.x, target.y - 10, "#d8ffd5", 14);
  setHighlight(`${findFaction(battle, unit.factionId).title}'s Men of the Mountain seize a foe in a magic hold`);
}

function performCatapultAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
  const distance = Math.hypot(target.x - unit.x, target.y - unit.y);
  if (distance > stats.range) return;
  updateUnitActivity(unit, `Launching a stone at ${getUnitActivityTargetLabel(target, battle)}.`);
  const scatterScale = stats.variance * (0.8 + Math.random() * 0.8);
  const endX = clamp(target.x + (Math.random() - 0.5) * scatterScale * 2.1, 28, battle.field.width - 28);
  const endY = clamp(target.y + (Math.random() - 0.5) * scatterScale * 1.7, 28, battle.field.height - 28);
  const flightDistance = Math.hypot(endX - unit.x, endY - unit.y);
  battle.projectiles.push({
    kind: "catapultStone",
    sourceId: unit.id,
    progress: 0,
    duration: clamp(0.9 + flightDistance / 240 + Math.random() * 0.22, 1.05, 2.1),
    startX: unit.x + (unit.displayFacingX || 1) * 16,
    startY: unit.y - 20,
    endX,
    endY,
    damage: stats.damage,
    radius: stats.splash,
    impactAngle: Math.atan2(endY - unit.y, endX - unit.x),
    spin: (Math.random() > 0.5 ? 1 : -1) * (4.5 + Math.random() * 2.5),
  });
}

function applyHealing(target, amount, battle, source = null, options = {}) {
  if (!target || target.dead || amount <= 0) return 0;
  if (getUnitStatus(target, "zombie") && !options.ignoreZombieInversion) {
    applyDamage(target, amount, battle, source, { damageKind: "healing" });
    return -amount;
  }
  const previousHealth = target.health;
  target.health = Math.min(target.maxHealth, target.health + amount);
  if (target.health > previousHealth) refreshUnitFleeingState(target, battle);
  return Math.max(0, target.health - previousHealth);
}

function distributeNecromancerHealing(unit, totalAmount, battle) {
  const members = getNecromancerParticipants(unit, battle);
  if (!members.length || totalAmount <= 0) return 0;
  const share = totalAmount / members.length;
  let totalApplied = 0;
  members.forEach((member) => {
    totalApplied += applyHealing(member, share, battle, unit, { ignoreZombieInversion: true });
    battle.particles.push({ x: member.x, y: member.y - 10, vx: 0, vy: -14, life: 0.42, age: 0, color: "#8d5bc8", size: 5 });
  });
  return totalApplied;
}

function performMedicHeal({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || target.id === unit.id || (target.health >= target.maxHealth && !hasNegativeStatuses(target))) return;
  const amount = stats.heal * (0.9 + Math.random() * 0.35);
  if (getUnitStatus(target, "zombie")) {
    updateUnitActivity(unit, `Burning ${getUnitActivityTargetLabel(target, battle)} with restorative energy.`);
    applyDamage(target, amount, battle, unit, { damageKind: "healing" });
    battle.particles.push({ x: target.x, y: target.y - 10, vx: 0, vy: -14, life: 0.5, age: 0, color: "#7f6a57", size: 6 });
    setHighlight(`${findFaction(battle, unit.factionId).title}'s medic burns a zombie thrall with restorative energy`);
    if (target.dead) unit.focusTargetId = null;
    return;
  }
  updateUnitActivity(unit, `Healing ${getUnitActivityTargetLabel(target, battle)}.`);
  const amountHealed = applyHealing(target, Math.min(Math.max(0, target.maxHealth - target.health), amount), battle, unit);
  recordUnitContribution(unit, "healing", amountHealed, battle);
  const cleansed = clearNegativeStatuses(target);
  battle.particles.push({ x: target.x, y: target.y - 10, vx: 0, vy: -20, life: 0.55, age: 0, color: "#b8ffbf", size: 7 });
  if (cleansed) spawnBurst(battle, target.x, target.y - 10, "#e8fff0", 10);
  setHighlight(`${findFaction(battle, unit.factionId).title}'s medic stabilizes a soldier`);
  if (target.health >= target.maxHealth && !hasNegativeStatuses(target)) {
    unit.focusTargetId = null;
  }
}

function performBomberAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  updateUnitActivity(unit, `Throwing a bomb at ${getUnitActivityTargetLabel(target, battle)}.`);
  const endX = target.x + (Math.random() - 0.5) * 14;
  const endY = target.y + (Math.random() - 0.5) * 14;
  const throwDistance = Math.hypot(endX - unit.x, endY - unit.y);
  battle.projectiles.push({ kind: "bomb", sourceId: unit.id, progress: 0, duration: clamp(0.48 + throwDistance / 250 + Math.random() * 0.12, 0.5, 1.15), startX: unit.x, startY: unit.y - 16, endX, endY, targetId: target.id, damage: stats.damage, radius: stats.splash, fuse: stats.fuse, landed: false, timer: 0 });
}

function performBodyguardAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  updateUnitActivity(unit, `Guarding the line against ${getUnitActivityTargetLabel(target, battle)}.`);
  applyDamage(target, stats.damage * (0.9 + Math.random() * 0.3), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 10, angle: unit.facing, life: 0.2, maxLife: 0.2, color: "rgba(188, 233, 247, 0.82)" });
  spawnBurst(battle, target.x, target.y - 2, "#cdefff", 8);
}

function performKnightAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  updateUnitActivity(unit, `Engaging ${getUnitActivityTargetLabel(target, battle)} in melee.`);
  applyDamage(target, stats.damage * (0.92 + Math.random() * 0.46), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 12, angle: unit.facing, life: 0.22, maxLife: 0.22, color: shadeColor(findFaction(battle, unit.factionId).color, 0.35) });
  spawnBurst(battle, target.x, target.y, "#ffd59b", 10);
}

function performPaladinAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  updateUnitActivity(unit, `Striking ${getUnitActivityTargetLabel(target, battle)} with a blessed blow.`);
  const baseDamage = stats.damage * (0.92 + Math.random() * 0.4);
  const damage = isUndeadOrThrall(target) ? baseDamage * (stats.undeadBonus ?? 1.75) : baseDamage;
  applyDamage(target, damage, battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 12, angle: unit.facing, life: 0.24, maxLife: 0.24, color: "rgba(255, 235, 164, 0.92)" });
  spawnBurst(battle, target.x, target.y - 1, isUndeadOrThrall(target) ? "#fff0a8" : "#f5d8a0", isUndeadOrThrall(target) ? 14 : 10);
  if (isUndeadOrThrall(target)) {
    battle.particles.push({ kind: "ring", x: target.x, y: target.y - 2, vx: 0, vy: 0, life: 0.24, age: 0, color: "rgba(255, 232, 157, 0.86)", size: 14, lineWidth: 3 });
  }
}

function performKriegerAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 5) return;
  updateUnitActivity(unit, `Savaging ${getUnitActivityTargetLabel(target, battle)}.`);
  applyDamage(target, stats.damage * (0.94 + Math.random() * 0.34), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 14, angle: unit.facing, life: 0.28, maxLife: 0.28, color: "rgba(255, 162, 120, 0.82)" });
  spawnBurst(battle, target.x, target.y + 2, "#d79b71", 18);
  battle.particles.push({ kind: "shockwave", x: target.x, y: target.y + 2, vx: 0, vy: 0, life: 0.22, age: 0, color: "rgba(197, 118, 84, 0.56)", size: 12, startSize: 12, maxSize: 38, lineWidth: 5 });
}

function maybeTriggerKriegerBloodFrenzy(attacker, battle) {
  if (!attacker || attacker.dead || attacker.type !== "krieger") return;
  const stats = getUnitStats(attacker);
  if (Math.random() > (stats.frenzyChance ?? 0.32)) return;
  applyStatus(attacker, "bloodfrenzy", 1, 10, attacker, battle);
  spawnBurst(battle, attacker.x, attacker.y - 12, "#d86f62", 20);
  setHighlight(`${findFaction(battle, attacker.factionId)?.title || "A faction"}'s krieger snaps into a blood frenzy`);
}

function maybeTriggerPaladinConsecration(attacker, battle) {
  if (!attacker || attacker.dead || attacker.fled || attacker.type !== "paladin") return;
  const stats = getUnitStats(attacker);
  let affectedAllies = 0;
  let cleansedAllies = 0;
  battle.factions.forEach((faction) => {
    faction.units.forEach((ally) => {
      if (ally.dead || ally.fled || !areUnitsAllied(attacker, ally, battle)) return;
      if (Math.hypot(ally.x - attacker.x, ally.y - attacker.y) > stats.consecrationRadius) return;
      const healed = applyHealing(ally, stats.consecrationHeal, battle, attacker, { ignoreZombieInversion: true });
      const cleansed = clearPoisonStatuses(ally);
      if (healed > 0 || cleansed) affectedAllies += 1;
      if (cleansed) cleansedAllies += 1;
      if (healed > 0) {
        battle.particles.push({ x: ally.x, y: ally.y - 12, vx: 0, vy: -18, life: 0.46, age: 0, color: "#9dffb1", size: 6.5 });
        recordUnitContribution(attacker, "healing", healed, battle);
      }
      if (cleansed) {
        spawnBurst(battle, ally.x, ally.y - 8, "#c8ffd4", 8);
      }
    });
  });
  spawnBurst(battle, attacker.x, attacker.y - 8, "#8effa7", 22);
  battle.particles.push({ kind: "shockwave", x: attacker.x, y: attacker.y, vx: 0, vy: 0, life: 0.4, age: 0, color: "rgba(137, 255, 170, 0.72)", size: 18, startSize: 18, maxSize: stats.consecrationRadius, lineWidth: 6 });
  battle.particles.push({ kind: "ring", x: attacker.x, y: attacker.y, vx: 0, vy: 0, life: 0.55, age: 0, color: "rgba(206, 255, 219, 0.94)", size: stats.consecrationRadius, lineWidth: 3 });
  if (affectedAllies > 0 && Math.random() > 0.45) {
    setHighlight(`${findFaction(battle, attacker.factionId)?.title || "A faction"}'s paladin releases a cleansing consecration${cleansedAllies > 0 ? " and purges poison" : ""}`);
  }
}

function findFaction(battle, factionId) {
  const cachedFaction = ensureBattleTransientCaches(battle)?.factionById?.get(factionId);
  if (cachedFaction) return cachedFaction;
  return battle.factions.find((entry) => entry.id === factionId);
}

function updateProjectiles(battle, dt) {
  battle.projectiles = battle.projectiles.filter((projectile) => (getProjectileDefinition(projectile)?.update || updateStandardProjectile)(projectile, battle, dt));
}

function getProjectileDefinition(projectileOrKind) {
  const projectileKind = typeof projectileOrKind === "string" ? projectileOrKind : projectileOrKind?.kind;
  return PROJECTILE_DEFINITIONS[projectileKind];
}

function updateStandardProjectile(projectile, battle, dt) {
  projectile.progress += dt / projectile.duration;
  if (projectile.progress < 1) return true;
  resolveProjectile(projectile, battle);
  return false;
}

function updateBombProjectile(projectile, battle, dt) {
  if (projectile.landed) {
    projectile.timer += dt;
    if (projectile.timer < projectile.fuse) return true;
    resolveProjectile(projectile, battle);
    return false;
  }
  projectile.progress += dt / projectile.duration;
  if (projectile.progress < 1) return true;
  projectile.landed = true;
  projectile.timer = 0;
  projectile.progress = 1;
  return true;
}

function resolveProjectile(projectile, battle) {
  const projectileDef = getProjectileDefinition(projectile);
  projectileDef?.resolve?.(projectile, battle);
}

function resolveArrowProjectile(projectile, battle) {
  const target = findUnitById(battle, projectile.targetId);
  if (target && !target.dead && Math.random() > 0.18) {
    applyDamage(target, projectile.damage, battle, findUnitById(battle, projectile.sourceId));
    spawnBurst(battle, projectile.endX, projectile.endY, "#f5d087", 8);
  } else {
    spawnBurst(battle, projectile.endX, projectile.endY, "#7d5f35", 5);
  }
  battle.stuckArrows.push({ x: projectile.endX, y: projectile.endY, angle: projectile.impactAngle, life: 1.2, maxLife: 1.2 });
}

function resolveBombProjectile(projectile, battle) {
  const source = findUnitById(battle, projectile.sourceId);
  explodeAt(battle, projectile.endX, projectile.endY, projectile.radius, projectile.damage, source, "#ffbb66", 32);
  setHighlight(`${findFaction(battle, source?.factionId || "")?.title || "A bomber"} detonates a charge`);
}

function resolvePoisonBottleProjectile(projectile, battle) {
  const source = findUnitById(battle, projectile.sourceId);
  battle.factions.forEach((faction) => {
    if (source && faction.id === source.factionId) return;
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled) return;
      const dist = Math.hypot(unit.x - projectile.endX, unit.y - projectile.endY);
      if (dist > projectile.radius) return;
      applyDamage(unit, projectile.damage * Math.max(0.25, 1 - dist / projectile.radius), battle, source);
      applyStatus(unit, "poison", projectile.poisonStacks, projectile.poisonDuration, source, battle);
    });
  });
  spawnBurst(battle, projectile.endX, projectile.endY, "#7be07e", 18);
  battle.particles.push({ kind: "ring", x: projectile.endX, y: projectile.endY, vx: 0, vy: 0, life: 0.42, age: 0, color: "#8af08d", size: projectile.radius * 0.95, lineWidth: 4 });
  setHighlight(`${findFaction(battle, source?.factionId || "")?.title || "A poisoner"} bursts a toxic vial`);
}

function resolveNetProjectile(projectile, battle) {
  const source = findUnitById(battle, projectile.sourceId);
  const target = findUnitById(battle, projectile.targetId);
  if (target && !target.dead && !target.fled) {
    applyStatus(target, "immobilized", 1, projectile.netDuration, source, battle);
    spawnBurst(battle, target.x, target.y - 4, "#d8f2ff", 12);
    battle.particles.push({ kind: "ring", x: target.x, y: target.y, vx: 0, vy: 0, life: 0.34, age: 0, color: "#a6daef", size: 28, lineWidth: 3 });
    setHighlight(`${findFaction(battle, source?.factionId || "")?.title || "A huntsman"} snares a target in a net`);
    return;
  }
  spawnBurst(battle, projectile.endX, projectile.endY, "#c8d8df", 6);
}

function resolveHuntingKnifeProjectile(projectile, battle) {
  const source = findUnitById(battle, projectile.sourceId);
  const target = findUnitById(battle, projectile.targetId);
  if (target && !target.dead && !target.fled && canUnitBeTargeted(target, source)) {
    const hitRadius = getUnitStatus(target, "immobilized") ? 22 : 7;
    const targetShift = Math.hypot(target.x - projectile.endX, target.y - projectile.endY);
    if (targetShift <= hitRadius) {
      applyDamage(target, projectile.damage, battle, source);
      applyStatus(target, "bleed", 1, Infinity, source, battle);
      spawnBurst(battle, target.x, target.y - 6, "#d89a8f", 6);
      battle.stuckArrows.push({ x: target.x, y: target.y - 1, angle: projectile.impactAngle, life: 0.95, maxLife: 0.95 });
      setHighlight(`${findFaction(battle, source?.factionId || "")?.title || "A huntsman"} lands a bleeding knife throw`);
      return;
    }
  }
  spawnBurst(battle, projectile.endX, projectile.endY, "#8c774f", 4);
  battle.stuckArrows.push({ x: projectile.endX, y: projectile.endY, angle: projectile.impactAngle, life: 1.35, maxLife: 1.35 });
}

function resolveCatapultProjectile(projectile, battle) {
  const source = findUnitById(battle, projectile.sourceId);
  explodeAt(battle, projectile.endX, projectile.endY, projectile.radius, projectile.damage, source, "#c69a62", 24);
  spawnCatapultImpactDebris(battle, projectile.endX, projectile.endY);
  battle.particles.push({ kind: "blast-glow", x: projectile.endX, y: projectile.endY, vx: 0, vy: 0, life: 0.34, age: 0, color: "#ffd2a1", size: projectile.radius * 1.06 });
  battle.particles.push({ kind: "shockwave", x: projectile.endX, y: projectile.endY, vx: 0, vy: 0, life: 0.48, age: 0, color: "#f1c07f", size: projectile.radius * 0.34, startSize: projectile.radius * 0.34, maxSize: projectile.radius * 1.18, lineWidth: clamp(projectile.radius * 0.08, 8, 18) });
  setHighlight(`${findFaction(battle, source?.factionId || "")?.title || "A catapult"} lands a crushing catapult strike`);
}

function resolveOrbProjectile(projectile, battle) {
  battle.factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled) return;
      const dist = Math.hypot(unit.x - projectile.endX, unit.y - projectile.endY);
      if (dist <= projectile.radius) applyDamage(unit, projectile.damage * Math.max(0.3, 1 - dist / projectile.radius), battle, findUnitById(battle, projectile.sourceId));
    });
  });
  spawnBurst(battle, projectile.endX, projectile.endY, "#7ce7ff", 18);
}

function spawnCatapultImpactDebris(battle, x, y) {
  for (let i = 0; i < 18; i += 1) {
    battle.particles.push({
      kind: "debris",
      x,
      y,
      vx: (Math.random() - 0.5) * 180,
      vy: -40 - Math.random() * 130,
      life: 0.55 + Math.random() * 0.45,
      age: 0,
      color: Math.random() > 0.45 ? "#8f8474" : "#6a5640",
      size: 3 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 12,
    });
  }
  for (let i = 0; i < 14; i += 1) {
    battle.particles.push({
      kind: "dust",
      x,
      y,
      vx: (Math.random() - 0.5) * 90,
      vy: -20 - Math.random() * 35,
      life: 0.4 + Math.random() * 0.35,
      age: 0,
      color: "#d0b08a",
      size: 6 + Math.random() * 10,
    });
  }
}
function updateSpells(battle, dt) {
  battle.spells = battle.spells.filter((spell) => {
    if (spell.kind === "inklord-throw") {
      spell.time += dt;
      const source = findUnitById(battle, spell.sourceId);
      const target = findUnitById(battle, spell.targetId);
      if (!target || target.dead || target.fled) {
        releaseSpellUnitState(spell, source, target);
        return false;
      }
      return updateInkLordThrowSpell(spell, battle, source, target);
    }
    if (spell.kind === "flame-breath") {
      spell.time += dt;
      const source = findUnitById(battle, spell.sourceId);
      const target = findUnitById(battle, spell.targetId);
      if (!source || !target || source.dead || source.fled || target.dead || target.fled) {
        releaseSpellUnitState(spell, source, target);
        return false;
      }
      return updateFireBreathSpell(spell, battle, source, target, dt);
    }
    spell.time += dt;
    const source = findUnitById(battle, spell.sourceId);
    const target = findUnitById(battle, spell.targetId);
    if (!source || !target || source.dead || target.dead || target.fled) {
      releaseSpellUnitState(spell, source, target);
      return false;
    }
    if (spell.kind === "mountain-impulse") return updateMountainImpulseSpell(spell, source, target);
    if (spell.kind === "mountain-hold") return updateMountainHoldSpell(spell, battle, source, target, dt);
    const progress = clamp(spell.time / spell.duration, 0, 1);
    target.x = lerp(spell.startX, spell.endX, progress);
    target.y = lerp(spell.startY, spell.endY, progress);
    target.z = 10 + Math.sin(progress * Math.PI) * 34;
    target.vx = 0;
    target.vy = 0;
    if (progress >= 1) {
      target.z = 0;
      releaseSpellUnitState(spell, source, target);
      return false;
    }
    return true;
  });
}

function updateInkLordThrowSpell(spell, battle, source, target) {
  const progress = clamp(spell.time / spell.duration, 0, 1);
  target.x = lerp(spell.startX, spell.endX, progress);
  target.y = lerp(spell.startY, spell.endY, progress);
  target.z = 18 + Math.sin(progress * Math.PI) * (spell.arcHeight || 88);
  target.rotation = (target.rotation || 0) + (spell.spinRate || 0) * 0.023;
  target.vx = 0;
  target.vy = 0;
  if (Math.random() > 0.58) {
    battle.particles.push({
      x: target.x + (Math.random() - 0.5) * 10,
      y: target.y - 8,
      vx: (Math.random() - 0.5) * 12,
      vy: -8 - Math.random() * 10,
      life: 0.24 + Math.random() * 0.14,
      age: 0,
      color: Math.random() > 0.5 ? "#eee4ff" : "#7e69ff",
      size: 3 + Math.random() * 3,
    });
  }
  if (progress < 1) return true;
  target.z = 0;
  target.rotation = 0;
  explodeAt(battle, target.x, target.y, spell.landingRadius, spell.impactDamage, source, "#d8ceff", 14);
  releaseSpellUnitState(spell, source, target);
  return false;
}

function updateFireBreathSpell(spell, battle, source, target, dt) {
  const breathAngle = Math.atan2(target.y - source.y, target.x - source.x);
  source.facing = breathAngle;
  getNearbyLivingUnits(battle, source.x, source.y, spell.range).forEach((other) => {
    if (other.id === source.id) return;
    const dx = other.x - source.x;
    const dy = other.y - source.y;
    const distance = Math.hypot(dx, dy);
    if (distance > spell.range) return;
    const angleDiff = Math.abs(normalizeAngle(Math.atan2(dy, dx) - breathAngle));
    if (angleDiff > spell.coneAngle * 0.5) return;
    const distanceScale = clamp(1 - distance / spell.range, 0.35, 1);
    applyDamage(other, spell.dps * distanceScale * dt, battle, source);
    if (areUnitsHostile(source, other, battle)) {
      trackFlameExposure(other, source, spell, dt, battle);
    }
  });
  spawnFireBreathParticles(battle, source, breathAngle, spell);
  if (spell.time >= spell.duration) {
    releaseSpellUnitState(spell, source, target);
    return false;
  }
  return true;
}

function trackFlameExposure(unit, source, spell, dt, battle) {
  if (!unit.flameExposure) unit.flameExposure = {};
  const entry = unit.flameExposure[source.id] || {
    time: 0,
    gap: 0,
    grace: spell.exposureGrace,
  };
  entry.time += dt;
  entry.gap = 0;
  entry.grace = spell.exposureGrace;
  unit.flameExposure[source.id] = entry;
  if (entry.time >= spell.ignitionExposure) {
    applyStatus(unit, "ignite", spell.igniteStacks, spell.igniteDuration, source, battle);
    entry.time = 0;
  }
}

function spawnFireBreathParticles(battle, source, breathAngle, spell) {
  for (let i = 0; i < 7; i += 1) {
    const travel = (0.18 + Math.random() * 0.82) * spell.range;
    const angle = breathAngle + (Math.random() - 0.5) * spell.coneAngle;
    battle.particles.push({
      x: source.x + Math.cos(angle) * travel * 0.48,
      y: source.y - 8 + Math.sin(angle) * travel * 0.48,
      vx: Math.cos(angle) * (35 + Math.random() * 55),
      vy: Math.sin(angle) * (16 + Math.random() * 34) - 10,
      life: 0.18 + Math.random() * 0.12,
      age: 0,
      color: Math.random() > 0.35 ? "#ff7a1f" : "#ffcf73",
      size: 4 + Math.random() * 4,
    });
  }
}

function updateMountainImpulseSpell(spell, source, target) {
  const progress = clamp(spell.time / spell.duration, 0, 1);
  target.x = lerp(spell.startX, spell.endX, progress);
  target.y = lerp(spell.startY, spell.endY, progress);
  target.z = 4 + Math.sin(progress * Math.PI) * 14;
  target.vx = 0;
  target.vy = 0;
  if (progress >= 1) {
    target.z = 0;
    releaseSpellUnitState(spell, source, target);
    return false;
  }
  return true;
}

function updateMountainHoldSpell(spell, battle, source, target, dt) {
  const holdX = clamp(source.x + spell.holdOffsetX, 24, battle.field.width - 24);
  const holdY = clamp(source.y - spell.holdOffsetY, 24, battle.field.height - 24);
  const pullProgress = clamp(spell.time / Math.max(spell.pullDuration || 0.001, 0.001), 0, 1);
  target.x = lerp(spell.startX ?? holdX, holdX, pullProgress);
  target.y = lerp(spell.startY ?? holdY, holdY, pullProgress);
  target.z = lerp(6, 24, pullProgress) + Math.sin(spell.time * 7) * 4;
  target.vx = 0;
  target.vy = 0;
  if (pullProgress >= 1) {
    spell.damageTickTimer += dt;
    while (spell.damageTickTimer >= spell.tickInterval) {
      spell.damageTickTimer -= spell.tickInterval;
      applyDamage(target, spell.damagePerTick * (0.94 + Math.random() * 0.16), battle, source);
      spawnBurst(battle, target.x, target.y - 12, "#c7ffc3", 4);
      if (target.dead) {
        releaseSpellUnitState(spell, source, target);
        return false;
      }
    }
  }
  if (spell.time >= spell.duration) {
    target.z = 0;
    releaseSpellUnitState(spell, source, target);
    return false;
  }
  return true;
}

function releaseSpellUnitState(spell, source, target) {
  if (source?.activeSpellId === spell.id) source.activeSpellId = null;
  if (target?.liftedBySpellId === spell.id) target.liftedBySpellId = null;
  if (target?.displacedBySpellId === spell.id) target.displacedBySpellId = null;
  if (target) {
    target.z = 0;
    target.rotation = 0;
    target.vx = 0;
    target.vy = 0;
  }
}

function updateParticles(battle, dt) {
  battle.particles = battle.particles.filter((particle) => {
    particle.age += dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += 40 * dt;
    if (particle.kind === "debris") {
      particle.rotation = (particle.rotation || 0) + (particle.spin || 0) * dt;
    }
    if (particle.kind === "shockwave") {
      particle.size = lerp(particle.startSize ?? particle.size, particle.maxSize ?? particle.size, clamp(particle.age / particle.life, 0, 1));
    }
    return particle.age < particle.life;
  });
}

function updateSwipes(battle, dt) {
  battle.swipes = battle.swipes.filter((swipe) => {
    swipe.life -= dt;
    return swipe.life > 0;
  });
}

function updateTraces(battle, dt) {
  battle.traces = (battle.traces || []).filter((trace) => {
    trace.age = (trace.age || 0) + dt;
    return trace.age < (trace.duration || 0.08);
  });
}

function updateStuckArrows(battle, dt) {
  battle.stuckArrows = battle.stuckArrows.filter((arrow) => {
    arrow.life -= dt;
    return arrow.life > 0;
  });
}

function findUnitById(battle, id) {
  const cached = ensureBattleTransientCaches(battle)?.unitById?.get(id);
  if (cached) return cached;
  for (const faction of battle.factions) {
    const found = faction.units.find((unit) => unit.id === id);
    if (found) {
      battle?.transientCache?.unitById?.set(id, found);
      return found;
    }
  }
  return null;
}

function getExplosionReadableRadius(radius) {
  return Math.max(0, radius - EXPLOSION_READABILITY_INSET);
}

function explodeAt(battle, x, y, radius, damage, attacker, color, burstCount, showDebugRings = false) {
  const readableRadius = getExplosionReadableRadius(radius);
  if (readableRadius > 0) {
    getNearbyLivingUnits(battle, x, y, readableRadius).forEach((unit) => {
      const dist = Math.hypot(unit.x - x, unit.y - y);
      if (dist <= readableRadius) {
        applyDamage(unit, damage * Math.max(0.70, 1 - dist / readableRadius), battle, attacker);
      }
    });
  }
  spawnBurst(battle, x, y, color, burstCount);
  battle.particles.push({ kind: "blast-glow", x, y, vx: 0, vy: 0, life: 0.28, age: 0, color, size: radius * 0.9 });
  battle.particles.push({ kind: "shockwave", x, y, vx: 0, vy: 0, life: 0.42, age: 0, color, size: radius * 0.4, startSize: radius * 0.4, maxSize: radius, lineWidth: clamp(radius * 0.09, 8, 20) });
  battle.particles.push({ kind: "ring", x, y, vx: 0, vy: 0, life: 0.55, age: 0, color, size: radius, lineWidth: clamp(radius * 0.025, 3, 8) });
  if (showDebugRings) {
    battle.particles.push({ kind: "debug-ring", x, y, vx: 0, vy: 0, life: 1.4, age: 0, color: "#ff3b30", size: radius, lineWidth: 6 });
    battle.particles.push({ kind: "debug-ring", x, y, vx: 0, vy: 0, life: 1.4, age: 0, color: "#34c759", size: readableRadius, lineWidth: 6 });
  }
}

function applyDamage(unit, amount, battle, attacker = null, options = {}) {
  if (!unit || unit.dead || unit.spawnInvulnerable || amount <= 0) return 0;
  const participants = !options.bypassSharedDamage ? getNecromancerParticipants(unit, battle) : [];
  if (participants.length > 1) {
    const share = amount / participants.length;
    let totalApplied = 0;
    participants.forEach((member) => {
      totalApplied += applyDamage(member, share, battle, attacker, { ...options, bypassSharedDamage: true });
    });
    return totalApplied;
  }
  return applyRawDamage(unit, amount, battle, attacker, options);
}

function applyRawDamage(unit, amount, battle, attacker = null, options = {}) {
  if (!unit || unit.dead || amount <= 0) return 0;
  const unitDef = getUnitDefinition(unit);
  const damageKind = options.damageKind || "direct";
  if (damageKind === "status" && unitDef.immuneToStatusDamage) return 0;
  if (unit.type === "phantom" && damageKind === "direct" && Math.random() < 0.5) {
    battle?.particles?.push({
      x: unit.x + (Math.random() - 0.5) * 8,
      y: unit.y - 10 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 10,
      vy: -12 - Math.random() * 8,
      life: 0.22 + Math.random() * 0.12,
      age: 0,
      color: Math.random() > 0.5 ? "#d6d0ff" : "#a3f0ff",
      size: 2 + Math.random() * 2,
    });
    return 0;
  }
  let resolvedAmount = amount;
  const shieldStatus = getUnitStatus(unit, "shielded");
  if (damageKind !== "healing" && damageKind !== "status" && shieldStatus) {
    const shieldSource = shieldStatus.sourceId ? findUnitById(battle, shieldStatus.sourceId) : null;
    const reduction = getUnitStats(shieldSource || "bodyguard").shieldReduction ?? 0.25;
    resolvedAmount *= Math.max(0, 1 - reduction);
  }
  const bardGuardStatus = getUnitStatus(unit, "bardicguard");
  if (damageKind !== "healing" && damageKind !== "status" && bardGuardStatus) {
    const guardSource = bardGuardStatus.sourceId ? findUnitById(battle, bardGuardStatus.sourceId) : null;
    const reduction = getUnitStats(guardSource || "bard").guardReduction ?? 0.18;
    resolvedAmount *= Math.max(0, 1 - reduction);
  }
  const previousHealth = unit.health;
  unit.health -= resolvedAmount;
  const actualDamage = Math.max(0, Math.min(previousHealth, resolvedAmount));
  if (actualDamage > 0 && unit.health > 0) {
    maybeTriggerFleeFromDamage(unit, battle, previousHealth, damageKind);
  }
  const possessingPhantom = getPossessingPhantom(unit, battle);
  if (!options.noAttackerCredit && attacker && attacker.factionId !== unit.factionId && actualDamage > 0) {
    recordUnitContribution(attacker, "damage", actualDamage, battle);
    const owner = getContributionCreditOwner(attacker, battle);
    if (owner && owner.id !== attacker.id) {
      recordUnitContribution(owner, "damage", actualDamage, battle);
    }
  }
  if (!options.noAttackerCredit && damageKind === "direct" && actualDamage > 0 && possessingPhantom) {
    const fatalBlow = unit.health <= 0;
    const formerAllyHit = Boolean(attacker && attacker.id !== unit.id && attacker.factionId === unit.factionId && !attacker.hostileToAll);
    if (fatalBlow && formerAllyHit) {
      unit.health = 1;
      unit.dead = false;
      ejectPhantomFromHost(possessingPhantom, unit, battle, { leaveHostAtOneHp: true, gravesToConsume: 3 });
      setHighlight(`${findFaction(battle, possessingPhantom.factionId)?.title || "A faction"}'s phantom is blasted out of its host`);
      return actualDamage;
    }
    if (!fatalBlow) {
      const remainingHealthRatio = clamp(unit.health / Math.max(1, unit.maxHealth), 0, 1);
      const ejectChance = clamp(0.05 + ((1 - remainingHealthRatio) ** 2) * 0.7, 0.05, 0.75);
      if (Math.random() < ejectChance) {
        ejectPhantomFromHost(possessingPhantom, unit, battle, { gravesToConsume: 3 });
      }
    }
  }
  if (unit.health <= 0) {
    if (possessingPhantom) {
      ejectPhantomFromHost(possessingPhantom, unit, battle, { gravesToConsume: 3 });
    }
    unit.dead = true;
    unit.health = 0;
    unit.liftedBySpellId = null;
    unit.displacedBySpellId = null;
    if (unitDef.leavesGrave !== false) spawnGrave(unit, battle);
    unitDef.onDeath?.({ unit, battle, attacker, unitDef });
    if (!options.noAttackerCredit && attacker && !attacker.dead) {
      attacker.killStreak = (attacker.killStreak || 0) + 1;
      recordUnitContribution(attacker, "kills", 1, battle);
      maybeTriggerKriegerBloodFrenzy(attacker, battle);
      maybeTriggerPaladinConsecration(attacker, battle);
    }
    if (!options.skipDefaultDeathBurst) spawnBurst(battle, unit.x, unit.y, "#f3c58a", 16);
  }
  return actualDamage;
}

function handleBomberDeath({ unit, battle, attacker, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  explodeAt(battle, unit.x, unit.y, stats.deathSplash, stats.damage * 1.2, unit, "#ff8b4a", 44);
  setHighlight(`${findFaction(battle, unit.factionId).title} loses a bomber in a huge blast`);
}

function handleSpiderSwarmDeath({ unit, battle }) {
  if (!unit.expiredByTimer) return;
  spawnBurst(battle, unit.x, unit.y + 1, "#7fb04f", 6);
  battle.particles.push({ kind: "blast-glow", x: unit.x, y: unit.y + 2, vx: 0, vy: 0, life: 0.18, age: 0, color: "#8fb85f", size: 9 });
  battle.particles.push({ kind: "ring", x: unit.x, y: unit.y + 2, vx: 0, vy: 0, life: 0.22, age: 0, color: "rgba(93, 56, 34, 0.78)", size: 8, lineWidth: 2 });
}

function spawnBurst(battle, x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    battle.particles.push({ x, y, vx: (Math.random() - 0.5) * 90, vy: (Math.random() - 0.5) * 90, life: 0.35 + Math.random() * 0.5, age: 0, color, size: 2 + Math.random() * 5 });
  }
}

function showWinnerCard(winner, battle) {
  const alive = winner?.units.filter((unit) => !unit.dead && !unit.fled).length ?? 0;
  const routed = winner?.units.filter((unit) => unit.fled).length ?? 0;
  const tournamentMode = Boolean(state.tournament);
  const others = getResultFactions(battle)
    .filter((faction) => faction.id !== winner?.id)
    .map((faction) => {
      const growth = faction.submissionType === "paperback" ? 4 : 2;
      const fled = faction.units.filter((unit) => unit.fled).length;
      return { title: faction.title, current: faction.armySize, next: faction.armySize + growth + fled, growth, fled };
    })
    .sort((a, b) => b.current - a.current);

  const winnerCover = winner?.coverUrl ? `<img class="winner-card-cover" src="${winner.coverUrl}" alt="${winner.title} cover">` : "";

  els.winnerCard.innerHTML = winner ? `
    <div class="winner-header">
      ${winnerCover}
      <div class="winner-header-copy">
        <span class="winner-kicker">${tournamentMode ? "Heat Won" : "Victory Confirmed"}</span>
        <h3>${winner.title}</h3>
        <p>${alive} soldiers held the field. ${routed} routed survivors were carried off.${tournamentMode ? " This army advances in the bracket." : ""}</p>
      </div>
    </div>
    <div class="victory-list">
      ${others.map((entry) => `
        <div class="victory-entry">
          <div>
            <strong>${entry.title}</strong>
            <p>${tournamentMode ? "Eliminated from the bracket" : `${entry.current} -> ${entry.next} next round`}</p>
          </div>
          <div class="victory-badges">
            <span class="victory-badge">${tournamentMode ? "Out" : entry.growth > 0 ? `+${entry.growth} base` : "+0 base"}</span>
            <span class="victory-badge">${tournamentMode ? `${entry.fled} fled` : entry.fled > 0 ? `+${entry.fled} fled` : "+0 fled"}</span>
          </div>
        </div>
      `).join("")}
    </div>
  ` : `
    <div class="winner-header">
      <div class="winner-header-copy">
        <span class="winner-kicker">Battle Complete</span>
        <h3>Mutual destruction</h3>
        <p>No title survived the field.</p>
      </div>
    </div>
  `;
  els.winnerModal.classList.remove("hidden");
  renderArmyEditors();
}

function showTournamentVictoryCard(result) {
  const champion = result?.championId ? getTournamentFactionRecord(result.tournament, result.championId) : null;
  const coverUrl = result?.championCoverUrl || champion?.coverUrl || "";
  const cover = coverUrl ? `<img class="winner-card-cover" src="${coverUrl}" alt="${escapeHtml(result?.championTitle || champion?.title || "Champion")} cover">` : "";
  const stats = result?.stats || {};
  const fallenArmies = result?.championId
    ? Math.max(0, (stats.totalEntrants || 0) - 1)
    : stats.totalEntrants || 0;

  els.winnerCard.innerHTML = result?.championId ? `
    <div class="winner-header winner-header-ultimate">
      ${cover}
      <div class="winner-header-copy">
        <span class="winner-kicker">Tournament Champion</span>
        <h3>${escapeHtml(result.championTitle || champion?.title || "Unknown Champion")}</h3>
        <p>One army endured while ${fallenArmies} others perished across ${stats.completedHeats || 0} heats.</p>
      </div>
    </div>
    <section class="tournament-victory-summary">
      <div class="tournament-victory-stat">
        <strong>${stats.championWins || 0}</strong>
        <span>heats won</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.championSurvivors || 0}</strong>
        <span>soldiers still standing</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.totalPerished || 0}</strong>
        <span>troops perished overall</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.totalRouted || 0}</strong>
        <span>troops routed overall</span>
      </div>
    </section>
    <div class="victory-list">
      <div class="victory-entry">
        <div>
          <strong>${escapeHtml(result.championTitle || champion?.title || "Champion")}</strong>
          <p>The last banner standing, outlasting ${stats.armiesOutlasted || 0} rival armies.</p>
        </div>
        <div class="victory-badges">
          <span class="victory-badge">${stats.startingTroops || 0} starting troops in bracket</span>
          <span class="victory-badge">${fallenArmies} armies lost</span>
        </div>
      </div>
    </div>
  ` : `
    <div class="winner-header winner-header-ultimate">
      <div class="winner-header-copy">
        <span class="winner-kicker">Tournament Complete</span>
        <h3>No champion emerged</h3>
        <p>${stats.totalEntrants || 0} armies entered and all were lost before a final survivor could be crowned.</p>
      </div>
    </div>
    <section class="tournament-victory-summary">
      <div class="tournament-victory-stat">
        <strong>${stats.completedHeats || 0}</strong>
        <span>heats resolved</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.totalPerished || 0}</strong>
        <span>troops perished overall</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.totalRouted || 0}</strong>
        <span>troops routed overall</span>
      </div>
      <div class="tournament-victory-stat">
        <strong>${stats.eliminatedArmies || 0}</strong>
        <span>armies erased</span>
      </div>
    </section>
  `;
  els.winnerModal.classList.remove("hidden");
}

function applyWinnerToQueue() {
  if (state.tournamentResult) {
    closeWinnerModal();
    resetBattle();
    setTicker(shouldUseTournament(state.factions) ? "A new tournament bracket is ready." : "The next battle is ready.");
    return;
  }
  if (!state.battle?.completed) {
    setTicker("Finish a battle before applying results.");
    return;
  }
  if (state.tournament) {
    advanceTournament();
    return;
  }
  finalizeSingleBattle();
}

function finalizeSingleBattle() {
  const hadWinner = Boolean(state.battle.pendingWinner);
  state.factions = getResultFactions(state.battle).flatMap((faction) => {
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
  setTicker(hadWinner ? "Winner removed. Remaining armies have been reinforced." : "No winner emerged. All surviving titles regroup with reinforcements.");
  syncTournamentViewState(true);
}

function advanceTournament() {
  const tournament = state.tournament;
  const round = tournament.rounds[tournament.currentRoundIndex];
  const match = round.matches[tournament.currentMatchIndex];
  const winnerId = state.battle.pendingWinner;

  match.winnerId = winnerId;
  match.status = "complete";
  recordTournamentHeatStats(tournament, state.battle, winnerId);
  getResultFactions(state.battle).forEach((faction) => {
    if (faction.id === winnerId) return;
    const record = tournament.eliminated[faction.id];
    if (!record.eliminated) {
      record.eliminated = true;
      record.fled = faction.units.filter((unit) => unit.fled).length;
      record.growth = faction.submissionType === "paperback" ? 4 : 2;
    }
  });

  const nextMatch = round.matches[tournament.currentMatchIndex + 1];
  if (nextMatch) {
    tournament.currentMatchIndex += 1;
    nextMatch.status = "active";
    nextMatch.arena = createRandomArenaVariant(tournament.currentRoundIndex, tournament.currentMatchIndex, nextMatch.factionIds.length);
    state.running = false;
    state.battle = buildActiveBattle({
      regenerateTerrain: false,
      terrainMirrorKey: `${tournament.currentRoundIndex}|${tournament.currentMatchIndex}`,
    });
    resetCamera();
    closeWinnerModal();
    clearBattleHover();
    clearKnockoutAnnouncement();
    clearBossAnnouncement();
    endBattleAudio();
    els.battleState.textContent = getCurrentMatchLabel(tournament);
    els.winnerLabel.textContent = winnerId ? findSourceFaction(winnerId)?.title || "Advancing" : "Mutual destruction";
    setTicker(`${getCurrentMatchLabel(tournament)} is ready in ${nextMatch.arena.name}.`);
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderArmyEditors();
    renderSpeedControls();
    syncTournamentViewState(true);
    return;
  }

  const advancingIds = round.matches.map((entry) => entry.winnerId).filter(Boolean);
  if (advancingIds.length > 1) {
    tournament.currentRoundIndex += 1;
    tournament.currentMatchIndex = 0;
    const upcomingRound = createTournamentRound(advancingIds, tournament.currentRoundIndex, tournament.config);
    tournament.rounds.push(upcomingRound);
    upcomingRound.matches[0].status = "active";
    upcomingRound.matches[0].arena = createRandomArenaVariant(tournament.currentRoundIndex, 0, upcomingRound.matches[0].factionIds.length);
    state.running = false;
    state.battle = buildActiveBattle({
      regenerateTerrain: false,
      terrainMirrorKey: `${tournament.currentRoundIndex}|0`,
    });
    resetCamera();
    closeWinnerModal();
    clearBattleHover();
    clearKnockoutAnnouncement();
    clearBossAnnouncement();
    endBattleAudio();
    els.battleState.textContent = getCurrentMatchLabel(tournament);
    els.winnerLabel.textContent = winnerId ? findSourceFaction(winnerId)?.title || "Advancing" : "Mutual destruction";
    setTicker(`${upcomingRound.label} begins in ${upcomingRound.matches[0].arena.name}.`);
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderArmyEditors();
    renderSpeedControls();
    syncTournamentViewState(true);
    return;
  }

  tournament.complete = true;
  tournament.championId = advancingIds[0] || null;
  const tournamentResult = buildTournamentResult(tournament, tournament.championId);
  state.factions = state.factions.flatMap((faction) => {
    if (faction.id === tournament.championId) return [];
    const record = tournament.eliminated[faction.id];
    const growth = record?.growth || 0;
    const fled = record?.fled || 0;
    return [withFactionDefaults({ ...faction, armySize: faction.armySize + growth + fled, fledReserve: 0 })];
  });
  state.roundsApplied += 1;
  state.tournamentResult = tournamentResult;
  state.tournament = null;
  saveState();
  syncCsvInput();
  renderArmyEditors();
  closeWinnerModal();
  clearBattleHover();
  clearKnockoutAnnouncement();
  clearBossAnnouncement();
  endBattleAudio();
  state.running = false;
  els.battleState.textContent = "Tournament Complete";
  els.winnerLabel.textContent = tournamentResult.championTitle || "No champion";
  setTicker(advancingIds[0]
    ? `${tournamentResult.championTitle} has conquered the bracket. Review the final tally, then start the next tournament when ready.`
    : "The tournament ended without a surviving champion. Review the final tally before starting again.");
  showTournamentVictoryCard(tournamentResult);
  renderBracketTracker();
  updateAdvanceButtonLabel();
  renderSpeedControls();
  syncTournamentViewState(true);
}

function setTicker(text) {
  els.battleTicker.textContent = text;
}

function setHighlight(text) {
  const now = performance.now();
  if ((now - state.lastBattleHighlightAt) < BATTLE_HIGHLIGHT_COOLDOWN_MS) return;
  state.lastBattleHighlightAt = now;
  setTicker(text);
}

function queueKnockoutAnnouncement(battle, faction) {
  battle.knockoutQueue.push({
    id: `${faction.id}-${Math.round(battle.time * 1000)}`,
    title: faction.title,
    coverUrl: faction.coverUrl,
  });
  if (!battle.activeKnockout) showNextKnockoutAnnouncement(battle);
}

function showNextKnockoutAnnouncement(battle) {
  const next = battle.knockoutQueue.shift();
  battle.activeKnockout = next || null;
  if (!next) {
    clearKnockoutAnnouncement();
    return;
  }

  playOneShotAudio("deathBell");
  els.knockoutAnnouncement.innerHTML = buildKnockoutAnnouncementMarkup(next);
  els.knockoutAnnouncement.classList.remove("exiting");
  requestAnimationFrame(() => {
    els.knockoutAnnouncement.classList.add("active");
  });

  window.clearTimeout(els.knockoutAnnouncement._exitTimer);
  window.clearTimeout(els.knockoutAnnouncement._clearTimer);
  els.knockoutAnnouncement._exitTimer = window.setTimeout(() => {
    els.knockoutAnnouncement.classList.add("exiting");
    els.knockoutAnnouncement.classList.remove("active");
  }, 2200);
  els.knockoutAnnouncement._clearTimer = window.setTimeout(() => {
    if (battle.activeKnockout?.id === next.id) battle.activeKnockout = null;
    els.knockoutAnnouncement.classList.remove("exiting");
    els.knockoutAnnouncement.innerHTML = "";
    showNextKnockoutAnnouncement(battle);
  }, 2580);
}

function clearKnockoutAnnouncement() {
  if (state.battle) {
    state.battle.knockoutQueue = [];
    state.battle.activeKnockout = null;
  }
  window.clearTimeout(els.knockoutAnnouncement._exitTimer);
  window.clearTimeout(els.knockoutAnnouncement._clearTimer);
  els.knockoutAnnouncement.classList.remove("active", "exiting");
  els.knockoutAnnouncement.innerHTML = "";
}

function showBossAnnouncement(text) {
  if (!els.bossAnnouncement) return;
  els.bossAnnouncement.textContent = text;
  els.bossAnnouncement.classList.remove("exiting");
  requestAnimationFrame(() => {
    els.bossAnnouncement.classList.add("active");
  });
  window.clearTimeout(els.bossAnnouncement._exitTimer);
  window.clearTimeout(els.bossAnnouncement._clearTimer);
  els.bossAnnouncement._exitTimer = window.setTimeout(() => {
    els.bossAnnouncement.classList.add("exiting");
    els.bossAnnouncement.classList.remove("active");
  }, 1800);
  els.bossAnnouncement._clearTimer = window.setTimeout(() => {
    els.bossAnnouncement.classList.remove("exiting");
    els.bossAnnouncement.textContent = "";
  }, 2320);
}

function clearBossAnnouncement() {
  if (!els.bossAnnouncement) return;
  window.clearTimeout(els.bossAnnouncement._exitTimer);
  window.clearTimeout(els.bossAnnouncement._clearTimer);
  els.bossAnnouncement.classList.remove("active", "exiting");
  els.bossAnnouncement.textContent = "";
}

function buildKnockoutAnnouncementMarkup(entry) {
  const safeTitle = escapeHtml(entry.title);
  const cover = entry.coverUrl
    ? `<img class="knockout-cover" src="${escapeHtml(entry.coverUrl)}" alt="${safeTitle} cover">`
    : `<div class="knockout-cover-fallback" aria-hidden="true">${escapeHtml(getFallbackCoverMark(entry.title))}</div>`;
  return `
    <article class="knockout-card">
      ${cover}
      <div class="knockout-copy">
        <span class="knockout-kicker">Army Extinguished</span>
        <h3 class="knockout-headline">Book Knocked Out</h3>
        <p class="knockout-title">${safeTitle}</p>
        <p class="knockout-subline">Its banner has fallen, its troops are spent, and its place in the melee is over.</p>
      </div>
    </article>
  `;
}

function getFallbackCoverMark(title = "") {
  const minorWords = new Set(["a", "an", "and", "at", "for", "from", "in", "of", "on", "or", "the", "to"]);
  const words = title
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9']/gi, ""))
    .filter(Boolean);
  if (!words.length) return "KO";
  return words
    .map((word) => {
      const initial = word[0] || "";
      return minorWords.has(word.toLowerCase()) ? initial.toLowerCase() : initial.toUpperCase();
    })
    .join("")
    .slice(0, 8);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function closeWinnerModal() {
  els.winnerModal.classList.add("hidden");
}

function updateBattleHighlights(battle) {
  const activeFactions = getResultFactions(battle).map((faction) => ({ faction, active: faction.units.filter((unit) => !unit.dead && !unit.fled).length }));
  const sorted = activeFactions.filter((entry) => entry.active > 0).sort((a, b) => b.active - a.active);
  if (sorted.length > 1 && sorted[0].active >= Math.max(6, sorted[1].active * 2) && !battle.notes.slaughter[sorted[0].faction.id]) {
    battle.notes.slaughter[sorted[0].faction.id] = true;
    setHighlight(`${sorted[0].faction.title} is carving through the field`);
  }
  activeFactions.forEach(({ faction, active }) => {
    const threshold = Math.max(2, Math.ceil(faction.armySize * 0.15));
    if (active > 0 && active <= threshold && !battle.notes.dwindled[faction.id]) {
      battle.notes.dwindled[faction.id] = true;
      setHighlight(`${faction.title} is down to ${active} remaining`);
    }
  });
  getResultFactions(battle).forEach((faction) => {
    faction.units.forEach((unit) => {
      if ((unit.killStreak || 0) >= 3 && !battle.notes.killstreaks[unit.id]) {
        battle.notes.killstreaks[unit.id] = true;
        setHighlight(`${faction.title} has a ${getUnitDefinition(unit).name.toLowerCase()} on a ${unit.killStreak}-unit streak`);
      }
    });
  });
}

function clearBattleHover() {
  state.hover.insideCanvas = false;
  if (!state.hover.shiftHeld) state.hover.focusedUnitId = null;
  if (els.battleUnitTooltip) {
    els.battleUnitTooltip.classList.add("hidden");
    els.battleUnitTooltip.innerHTML = "";
    els.battleUnitTooltip.dataset.tooltipKey = "";
  }
}

function updateBattleHoverPointer(event) {
  const rect = els.canvas.getBoundingClientRect();
  const isCanvasTarget = document.elementFromPoint(event.clientX, event.clientY) === els.canvas;
  const inside = isCanvasTarget
    && event.clientX >= rect.left
    && event.clientX <= rect.right
    && event.clientY >= rect.top
    && event.clientY <= rect.bottom;
  state.hover.insideCanvas = inside;
  if (!inside) {
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  state.hover.canvasX = (event.clientX - rect.left) * dpr;
  state.hover.canvasY = (event.clientY - rect.top) * dpr;
  state.hover.cssX = event.clientX - rect.left;
  state.hover.cssY = event.clientY - rect.top;
}

function getUnitHoverMetrics(unit, viewport) {
  const pose = getUnitRenderPose(unit, viewport);
  const unitDef = getUnitDefinition(unit);
  const renderScale = pose.scale * getUnitRenderScale(unit);
  const radiusX = Math.max(14, (unit.type === "inklord" ? 34 : 16) * renderScale / 2.1);
  const radiusY = Math.max(18, (unit.type === "inklord" ? 54 : 24) * renderScale / 2.1);
  const centerY = pose.bodyY - (unit.type === "inklord" ? 42 : 10) * renderScale / 2.1;
  const healthBarMetrics = getHealthBarMetricsForPose(unit, pose, renderScale);
  const hpWidth = (unitDef.healthBarWidth || 20) * renderScale / 2.1;
  return {
    pose,
    renderScale,
    hoverCenterX: pose.point.x,
    hoverCenterY: centerY,
    hoverRadiusX: radiusX,
    hoverRadiusY: radiusY,
    healthBarY: healthBarMetrics.y,
    healthBarX: healthBarMetrics.x,
    hpWidth,
  };
}

function getRigLayoutForUnit(unit) {
  const source = getRiggedUnitSpriteSource(unit?.type);
  return source?.status === "loaded" ? source.manifest?.layout : null;
}

function getHealthBarMetricsForPose(unit, pose, renderScale, layoutOverride = null) {
  const layout = layoutOverride || getRigLayoutForUnit(unit) || null;
  const defaultX = pose.point.x;
  const defaultY = unit.type === "inklord"
    ? pose.bodyY - 156 * pose.scale / 2.1
    : pose.bodyY - 24 * pose.scale / 2.1;
  const offsetX = (layout?.healthBarOffsetX || 0) * renderScale / 2.1;
  const offsetY = (layout?.healthBarOffsetY || 0) * renderScale / 2.1;
  return {
    x: defaultX + offsetX,
    y: defaultY + offsetY,
    defaultX,
    defaultY,
  };
}

function findHoveredBattleUnit(battle, viewport, canvasX, canvasY) {
  if (!battle) return null;
  const units = getInspectableBattleUnitsSorted(battle);
  for (let index = units.length - 1; index >= 0; index -= 1) {
    const unit = units[index];
    const metrics = getUnitHoverMetrics(unit, viewport);
    const dx = (canvasX - metrics.hoverCenterX) / Math.max(metrics.hoverRadiusX, 1);
    const dy = (canvasY - metrics.hoverCenterY) / Math.max(metrics.hoverRadiusY, 1);
    if ((dx * dx) + (dy * dy) <= 1.18) return unit;
    const withinBar = canvasX >= metrics.healthBarX - metrics.hpWidth / 2
      && canvasX <= metrics.healthBarX + metrics.hpWidth / 2
      && canvasY >= metrics.healthBarY - 12
      && canvasY <= metrics.healthBarY + 14;
    if (withinBar) return unit;
  }
  return null;
}

function refreshBattleHover(viewport) {
  if (!state.battle || !state.hover.shiftHeld) {
    state.hover.focusedUnitId = null;
    return null;
  }
  if (state.hover.insideCanvas && !state.camera.isDragging) {
    const hovered = findHoveredBattleUnit(state.battle, viewport, state.hover.canvasX, state.hover.canvasY);
    if (hovered) state.hover.focusedUnitId = hovered.id;
  }
  if (!state.hover.focusedUnitId) return null;
  const focused = findUnitById(state.battle, state.hover.focusedUnitId);
  if (!focused || focused.dead || focused.fled) {
    state.hover.focusedUnitId = null;
    return null;
  }
  return focused;
}

function formatHoverStatNumber(value) {
  if (!Number.isFinite(value)) return `${value}`;
  return Math.abs(value - Math.round(value)) < 0.05 ? `${Math.round(value)}` : value.toFixed(1);
}

function formatHoverDuration(duration) {
  if (!Number.isFinite(duration)) return "permanent";
  if (duration >= 10) return `${Math.round(duration)}s`;
  return `${duration.toFixed(1)}s`;
}

function getUnitActivityTargetLabel(target, battle) {
  if (!target) return "a target";
  const unitLabel = getUnitDefinition(target).name.toLowerCase();
  const faction = findFaction(battle, target.factionId);
  if (!faction || faction.excludeFromResults) return `${/^[aeiou]/i.test(unitLabel) ? "an" : "a"} ${unitLabel}`;
  return `${/^[aeiou]/i.test(unitLabel) ? "an" : "a"} ${unitLabel} belonging to ${faction.title}`;
}

function getUnitCurrentActivity(unit, battle) {
  if (!unit) return "";
  return unit.Status?.text || getDefaultUnitActivity(unit);
}

function getStatusTooltipCopy(unit, status, battle) {
  const definition = getStatusDefinition(status.kind);
  if (!definition) return "";
  if (status.kind === "poison") {
    const totalDps = (status.dps ?? definition.dps) * Math.max(1, status.stacks || 1);
    return `Deals ${formatHoverStatNumber(totalDps)} damage per second for ${formatHoverDuration(status.duration)}. ${Math.max(1, Math.round(status.stacks || 1))} stack${Math.round(status.stacks || 1) === 1 ? "" : "s"}.`;
  }
  if (status.kind === "ignite") {
    const totalDps = (status.dps ?? definition.dps) * Math.max(1, status.stacks || 1);
    return `Burns for ${formatHoverStatNumber(totalDps)} damage per second for ${formatHoverDuration(status.duration)} and can spread to nearby units.`;
  }
  if (status.kind === "zombie") {
    return "Reanimated thrall. Permanent until destroyed, with reduced max health, damage, speed, and duration-based stats.";
  }
  if (status.kind === "shielded") {
    const source = status.sourceId ? findUnitById(battle, status.sourceId) : null;
    const reduction = (getUnitStats(source || "bodyguard").shieldReduction ?? 0.25) * 100;
    return `Protected${source ? ` by ${getUnitDefinition(source).name}` : ""}. Reduces incoming direct damage by ${formatHoverStatNumber(reduction)}% for ${formatHoverDuration(status.duration)}.`;
  }
  if (status.kind === "bardichaste") {
    return `Inspired by a marching song. Movement speed is increased by 24% and attack cooldowns are reduced by 18% while the bard keeps playing nearby.`;
  }
  if (status.kind === "bardicvalor") {
    return `Emboldened by a war anthem. Damage and healing are increased by 18%, and basic attack reach is slightly extended while the song lasts.`;
  }
  if (status.kind === "bardicguard") {
    const source = status.sourceId ? findUnitById(battle, status.sourceId) : null;
    const reduction = (getUnitStats(source || "bard").guardReduction ?? 0.18) * 100;
    return `Protected by a guarding ballad. Incoming direct damage is reduced by ${formatHoverStatNumber(reduction)}% while the bard maintains the refrain nearby.`;
  }
  if (status.kind === "bloodfrenzy") {
    return `Berserk for ${formatHoverDuration(status.duration)}. Attacks the closest unit in reach, including allies.`;
  }
  if (status.kind === "immobilized") {
    return `Rooted in place for ${formatHoverDuration(status.duration)}. Movement speed is reduced to 0, but attacks can still be made if a target is already in range.`;
  }
  if (status.kind === "bleed") {
    const totalDps = (status.dps ?? definition.dps) * Math.max(1, status.stacks || 1);
    return `Loses ${formatHoverStatNumber(totalDps)} health per second until cleansed by support. ${Math.max(1, Math.round(status.stacks || 1))} stack${Math.round(status.stacks || 1) === 1 ? "" : "s"}.`;
  }
  if (status.kind === "possessed") {
    const source = status.sourceId ? findUnitById(battle, status.sourceId) : null;
    return `Body seized${source ? ` by ${getUnitDefinition(source).name}` : ""}. The host fights for the possessor's side until the spirit is knocked loose.`;
  }
  return definition.name;
}

function renderBattleUnitTooltip(unit, battle, viewport) {
  if (!els.battleUnitTooltip || !unit || !state.hover.shiftHeld) {
    if (els.battleUnitTooltip) {
      els.battleUnitTooltip.classList.add("hidden");
      els.battleUnitTooltip.innerHTML = "";
      els.battleUnitTooltip.dataset.tooltipKey = "";
    }
    return;
  }
  const faction = findFaction(battle, unit.factionId);
  const currentActivity = getUnitCurrentActivity(unit, battle);
  const statuses = (unit.statuses || [])
    .map((status) => {
      const definition = getStatusDefinition(status.kind);
      if (!definition) return "";
      return `
        <li>
          <span class="battle-unit-tooltip-status">${escapeHtml(definition.name)}</span>
          <span class="battle-unit-tooltip-copy">${escapeHtml(getStatusTooltipCopy(unit, status, battle))}</span>
        </li>
      `;
    })
    .filter(Boolean)
    .join("");
  const tooltipMarkup = `
    <div class="battle-unit-tooltip-header">
      <span class="battle-unit-tooltip-faction">${escapeHtml(faction?.title || "Neutral")}</span>
      <h3>${escapeHtml(`${getUnitDefinition(unit).name}${unit.veteran ? " Veteran" : ""}`)}</h3>
      <p class="battle-unit-tooltip-health">Health ${formatHoverStatNumber(unit.health)} / ${formatHoverStatNumber(unit.maxHealth)}</p>
      <p class="battle-unit-tooltip-copy">Currently ${escapeHtml(currentActivity)}.</p>
    </div>
    ${statuses ? `<ul>${statuses}</ul>` : '<p class="battle-unit-tooltip-empty">No active status effects.</p>'}
  `;
  const tooltipKey = JSON.stringify({
    unitId: unit.id,
    factionTitle: faction?.title || "Neutral",
    veteran: Boolean(unit.veteran),
    health: formatHoverStatNumber(unit.health),
    maxHealth: formatHoverStatNumber(unit.maxHealth),
    activity: currentActivity,
    statuses: (unit.statuses || []).map((status) => `${status.kind}:${formatHoverDuration(status.duration)}:${Math.round(status.stacks || 1)}`).join("|"),
  });
  if (els.battleUnitTooltip.dataset.tooltipKey !== tooltipKey) {
    els.battleUnitTooltip.innerHTML = tooltipMarkup;
    els.battleUnitTooltip.dataset.tooltipKey = tooltipKey;
  }
  const pose = getUnitRenderPose(unit, viewport);
  const tooltipWidth = Math.min(320, Math.max(220, els.battleUnitTooltip.offsetWidth || 220));
  const left = Math.max(12, Math.min(els.canvas.clientWidth - tooltipWidth - 12, (pose.point.x / (window.devicePixelRatio || 1)) + 22));
  const top = Math.max(18, Math.min(els.canvas.clientHeight - 18, (pose.bodyY / (window.devicePixelRatio || 1)) - 32));
  els.battleUnitTooltip.style.left = `${left}px`;
  els.battleUnitTooltip.style.top = `${top}px`;
  els.battleUnitTooltip.classList.remove("hidden");
}

function refreshFocusedBattleUnitFromPointer() {
  if (!state.hover.shiftHeld || !state.battle || !state.hover.insideCanvas) return;
  const viewport = getViewport();
  const hovered = findHoveredBattleUnit(state.battle, viewport, state.hover.canvasX, state.hover.canvasY);
  if (hovered) state.hover.focusedUnitId = hovered.id;
}

function onWindowKeyDown(event) {
  if (event.ctrlKey && !event.altKey && !event.metaKey && event.code === "Digit1") {
    event.preventDefault();
    setDevPanelVisible(!state.devPanelVisible);
    return;
  }
  if (event.key !== "Shift") return;
  if (!state.hover.inspectSlowActive) {
    state.hover.inspectSlowActive = true;
    renderSpeedControls();
  }
  state.hover.shiftHeld = true;
  refreshFocusedBattleUnitFromPointer();
}

function onWindowKeyUp(event) {
  if (event.key !== "Shift") return;
  if (state.hover.inspectSlowActive) {
    state.hover.inspectSlowActive = false;
    renderSpeedControls();
  }
  state.hover.shiftHeld = false;
  state.hover.focusedUnitId = null;
  clearBattleHover();
}

function onWindowBlur() {
  if (state.hover.inspectSlowActive) {
    state.hover.inspectSlowActive = false;
    renderSpeedControls();
  }
  state.hover.shiftHeld = false;
  state.hover.focusedUnitId = null;
  clearBattleHover();
}

function onCanvasPointerDown(event) {
  updateBattleHoverPointer(event);
  if (state.propResizeMode && state.battle && state.hover.insideCanvas) {
    const viewport = getViewport();
    const clickedProp = findHoveredBattleProp(state.battle, viewport, state.hover.canvasX, state.hover.canvasY);
    if (clickedProp?.id === state.selectedPropId) {
      clearSelectedBattleProp();
    } else if (clickedProp) {
      setSelectedBattleProp(clickedProp);
    } else {
      clearSelectedBattleProp();
    }
    return;
  }
  markCameraManual();
  state.camera.isDragging = true;
  state.camera.lastPointerX = event.clientX;
  state.camera.lastPointerY = event.clientY;
  els.canvas.classList.add("is-dragging");
}

function onCanvasPointerMove(event) {
  updateBattleHoverPointer(event);
  if (state.hover.insideCanvas) markCameraManual();
  refreshFocusedBattleUnitFromPointer();
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
  if (state.propResizeMode && getSelectedBattleProp() && resizeSelectedBattleProp(Math.sign(event.deltaY) < 0 ? 1 : -1)) {
    event.preventDefault();
    return;
  }
  event.preventDefault();
  markCameraManual();
  const viewport = getViewport();
  const rect = els.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const cursorCanvasX = (event.clientX - rect.left) * dpr;
  const cursorCanvasY = (event.clientY - rect.top) * dpr;
  const baseScale = getBaseScale(viewport);
  const currentScale = baseScale * state.camera.zoom;
  const cursorWorldX = state.camera.x + ((cursorCanvasX - viewport.width / 2) / Math.max(currentScale, 0.0001));
  const cursorWorldY = state.camera.y + ((cursorCanvasY - viewport.height / 2) / Math.max(currentScale, 0.0001));
  const nextZoom = clamp(state.camera.zoom * (Math.sign(event.deltaY) > 0 ? 0.9 : 1.1), 0.28, 6.5);
  const nextScale = baseScale * nextZoom;
  state.camera.zoom = nextZoom;
  state.camera.x = cursorWorldX - ((cursorCanvasX - viewport.width / 2) / Math.max(nextScale, 0.0001));
  state.camera.y = cursorWorldY - ((cursorCanvasY - viewport.height / 2) / Math.max(nextScale, 0.0001));
  state.camera.targetZoom = state.camera.zoom;
  clampCameraToField();
}

function markCameraManual() {
  state.camera.manualUntil = performance.now() + 6000;
}

function resetCinematicCameraState() {
  state.camera.cinematic = {
    poiId: null,
    focusX: state.camera.x,
    focusY: state.camera.y,
    focusZoom: state.camera.zoom,
    nextRetargetAt: 0,
    path: null,
  };
}

function updateCamera(dt) {
  if (!state.battle) return;
  if (state.camera.mode !== "manual") {
    const auto = getAutoCameraTarget(state.battle);
    state.camera.targetX = auto.x;
    state.camera.targetY = auto.y;
    state.camera.targetZoom = auto.zoom;
  }
  const manualActive = state.camera.mode === "manual"
    || performance.now() < state.camera.manualUntil
    || state.camera.isDragging;
  if (!manualActive) {
    const panSpeed = state.camera.mode === "cinematic" ? 1.35 : 3.6;
    const zoomSpeed = state.camera.mode === "cinematic" ? 1.1 : 2.8;
    state.camera.x += (state.camera.targetX - state.camera.x) * Math.min(1, dt * panSpeed);
    state.camera.y += (state.camera.targetY - state.camera.y) * Math.min(1, dt * panSpeed);
    state.camera.zoom += (state.camera.targetZoom - state.camera.zoom) * Math.min(1, dt * zoomSpeed);
  }
  clampCameraToField();
}
function getAutoCameraTarget(battle) {
  if (state.camera.mode === "cinematic") return getCinematicCameraTarget(battle);
  return getFitCameraTarget(battle);
}

function getFitCameraTarget(battle) {
  const activeUnits = getLivingBattleUnits(battle);
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
  return { x: clamp((minX + maxX) / 2, 0, FIELD.width), y: clamp((minY + maxY) / 2, 0, FIELD.height), zoom: clamp(fitZoom, 0.32, 2.25) };
}

function getCinematicCameraTarget(battle) {
  const activeUnits = getLivingBattleUnits(battle);
  if (!activeUnits.length) return { x: FIELD.width / 2, y: FIELD.height / 2, zoom: 1 };
  const fit = getFitCameraTarget(battle);
  const cinematic = state.camera.cinematic || (state.camera.cinematic = {
    poiId: null,
    focusX: fit.x,
    focusY: fit.y,
    focusZoom: fit.zoom,
    nextRetargetAt: 0,
    path: null,
  });
  const pois = buildCinematicCameraPois(battle, activeUnits, fit);
  const time = battle.time || 0;
  let activePoi = pois.find((poi) => poi.id === cinematic.poiId) || null;

  if (!activePoi || time >= cinematic.nextRetargetAt) {
    activePoi = pickCinematicCameraPoi(pois, cinematic, fit);
    cinematic.poiId = activePoi?.id || null;
    cinematic.nextRetargetAt = time + 3.4 + Math.random() * 2.4;
    cinematic.path = createCinematicCameraPath(cinematic, activePoi || fit, time);
  }

  const destination = activePoi || fit;
  if (!cinematic.path) {
    cinematic.path = createCinematicCameraPath(cinematic, destination, time);
  }

  const pathDuration = Math.max(0.001, cinematic.path.duration || 1);
  cinematic.path.t = Math.min(1, (time - cinematic.path.startedAt) / pathDuration);
  const easedT = smoothStep(0, 1, cinematic.path.t);
  const point = getCameraBezierPoint(cinematic.path.start, cinematic.path.control1, cinematic.path.control2, cinematic.path.end, easedT);
  cinematic.focusX = point.x;
  cinematic.focusY = point.y;
  cinematic.focusZoom = lerp(cinematic.path.startZoom, cinematic.path.endZoom, easedT);

  return {
    x: clamp(cinematic.focusX, 0, FIELD.width),
    y: clamp(cinematic.focusY, 0, FIELD.height),
    zoom: clamp(cinematic.focusZoom, 1.75, 3.65),
  };
}

function createCinematicCameraPath(cinematic, destination, time) {
  const start = { x: cinematic.focusX, y: cinematic.focusY };
  const end = { x: destination.x, y: destination.y };
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy);
  const dirX = distance > 0.001 ? dx / distance : 1;
  const dirY = distance > 0.001 ? dy / distance : 0;
  const normalX = -dirY;
  const normalY = dirX;
  const curveOffset = Math.min(120, Math.max(34, distance * 0.22)) * (Math.random() > 0.5 ? 1 : -1);
  const forwardBias = Math.min(92, Math.max(28, distance * 0.18));
  const control1 = {
    x: start.x + dx * 0.28 + normalX * curveOffset * 0.72 + dirX * forwardBias * 0.3,
    y: start.y + dy * 0.18 + normalY * curveOffset * 0.72 + dirY * forwardBias * 0.3,
  };
  const control2 = {
    x: start.x + dx * 0.72 + normalX * curveOffset - dirX * forwardBias * 0.18,
    y: start.y + dy * 0.82 + normalY * curveOffset - dirY * forwardBias * 0.18,
  };
  return {
    startedAt: time,
    duration: 2.8 + Math.random() * 1.8 + distance / 210,
    start,
    control1,
    control2,
    end,
    startZoom: cinematic.focusZoom,
    endZoom: destination.zoom,
    t: 0,
  };
}

function pickCinematicCameraPoi(pois, cinematic, fit) {
  if (!pois.length) return fit;
  const previousId = cinematic.poiId;
  return pois
    .slice()
    .sort((a, b) => {
      const repeatPenaltyA = a.id === previousId ? 28 : 0;
      const repeatPenaltyB = b.id === previousId ? 28 : 0;
      const motionBiasA = Math.hypot(a.x - cinematic.focusX, a.y - cinematic.focusY) * 0.02;
      const motionBiasB = Math.hypot(b.x - cinematic.focusX, b.y - cinematic.focusY) * 0.02;
      return (b.score + motionBiasB - repeatPenaltyB) - (a.score + motionBiasA - repeatPenaltyA);
    })[0];
}

function buildCinematicCameraPois(battle, activeUnits, fit) {
  const pois = [{
    id: "fit-overview",
    x: fit.x,
    y: fit.y,
    zoom: Math.max(1.8, fit.zoom * 1.45),
    score: 12,
  }];

  (battle.traces || []).forEach((trace, index) => {
    pois.push({
      id: `trace-${index}`,
      x: lerp(trace.startX, trace.endX, 0.72),
      y: lerp(trace.startY, trace.endY, 0.72),
      zoom: 3.4,
      score: 120,
    });
  });

  (battle.swipes || []).forEach((swipe, index) => {
    pois.push({
      id: `swipe-${index}-${Math.round(swipe.x)}-${Math.round(swipe.y)}`,
      x: swipe.x,
      y: swipe.y,
      zoom: 3.05,
      score: 82,
    });
  });

  (battle.spells || []).forEach((spell, index) => {
    const source = findUnitById(battle, spell.sourceId);
    const target = findUnitById(battle, spell.targetId);
    if (!source || !target) return;
    pois.push({
      id: `spell-${spell.id || index}`,
      x: lerp(source.x, target.x, 0.5),
      y: lerp(source.y, target.y, 0.5),
      zoom: spell.kind === "flame-breath" ? 2.55 : 2.95,
      score: spell.kind === "flame-breath" ? 90 : 106,
    });
  });

  const endangeredFactions = battle.factions
    .filter((faction) => !faction.excludeFromResults)
    .map((faction) => ({
      faction,
      survivors: faction.units.filter((unit) => !unit.dead && !unit.fled),
    }))
    .filter((entry) => entry.survivors.length > 0 && entry.survivors.length <= 2);

  const featuredEndangered = endangeredFactions.length
    ? endangeredFactions[Math.floor(Math.random() * endangeredFactions.length)]
    : null;

  if (featuredEndangered) {
    const survivors = featuredEndangered.survivors;
    const centroid = survivors.reduce((acc, unit) => ({ x: acc.x + unit.x, y: acc.y + unit.y }), { x: 0, y: 0 });
    centroid.x /= survivors.length;
    centroid.y /= survivors.length;
    pois.push({
      id: `endangered-${featuredEndangered.faction.id}`,
      x: centroid.x,
      y: centroid.y,
      zoom: survivors.length === 1 ? 3.4 : 3.2,
      score: 260,
    });
    survivors.forEach((unit) => {
      pois.push({
        id: `endangered-unit-${unit.id}`,
        x: unit.x,
        y: unit.y,
        zoom: unit.type === "inklord" ? 2.2 : 3.25,
        score: 240 + ((1 - (unit.health / Math.max(1, unit.maxHealth))) * 24),
      });
    });
  }

  activeUnits.forEach((unit, index) => {
    const nearbyEnemies = getNearbyLivingUnits(battle, unit.x, unit.y, 112)
      .filter((other) => other.id !== unit.id && areUnitsHostile(unit, other, battle));
    const score = 10
      + nearbyEnemies.length * 14
      + (unit.killStreak || 0) * 10
      + (unit.veteran ? 12 : 0)
      + (unit.activeSpellId ? 16 : 0)
      + (unit.type === "inklord" ? 44 : 0)
      + (unit.type === "krieger" ? 10 : 0)
      + ((unit.constructedTurretId || unit.type === "turret") ? 8 : 0)
      + ((1 - (unit.health / Math.max(1, unit.maxHealth))) * 18);
    if (score < 28) return;
    pois.push({
      id: `unit-${unit.id || index}`,
      x: unit.x,
      y: unit.y - (unit.type === "inklord" ? 20 : 0),
      zoom: unit.type === "inklord" ? 1.95 : 2.85,
      score,
    });
  });

  for (let i = 0; i < activeUnits.length; i += 1) {
    const a = activeUnits[i];
    for (let j = i + 1; j < activeUnits.length; j += 1) {
      const b = activeUnits[j];
      if (!areUnitsHostile(a, b, battle)) continue;
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 136) continue;
      pois.push({
        id: `duel-${a.id}-${b.id}`,
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        zoom: clamp(3.4 - distance / 150, 2.35, 3.55),
        score: 70 + (136 - distance) * 0.35 + ((1 - a.health / Math.max(1, a.maxHealth)) + (1 - b.health / Math.max(1, b.maxHealth))) * 16,
      });
    }
  }

  return pois;
}

function clampCameraToField() {
  const viewport = getViewport();
  const scale = getBaseScale(viewport) * state.camera.zoom;
  const halfWorldWidth = viewport.width / scale / 2;
  const halfWorldHeight = viewport.height / scale / 2;
  if (halfWorldWidth >= FIELD.width / 2) {
    state.camera.x = FIELD.width / 2;
  } else {
    state.camera.x = clamp(state.camera.x, halfWorldWidth, FIELD.width - halfWorldWidth);
  }
  if (halfWorldHeight >= FIELD.height / 2) {
    state.camera.y = FIELD.height / 2;
  } else {
    state.camera.y = clamp(state.camera.y, halfWorldHeight, FIELD.height - halfWorldHeight);
  }
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

function getViewportWorldBounds(viewport, paddingPx = 0) {
  const scale = getBaseScale(viewport) * state.camera.zoom;
  const paddingWorld = paddingPx / Math.max(scale, 0.0001);
  const halfWorldWidth = viewport.width / scale / 2;
  const halfWorldHeight = viewport.height / scale / 2;
  return {
    minX: state.camera.x - halfWorldWidth - paddingWorld,
    maxX: state.camera.x + halfWorldWidth + paddingWorld,
    minY: state.camera.y - halfWorldHeight - paddingWorld,
    maxY: state.camera.y + halfWorldHeight + paddingWorld,
  };
}

function getRoutingEscapeRadius(battle) {
  return (battle?.field?.radius || 0) + ROUTING_ESCAPE_DISTANCE;
}

function isUnitInViewport(unit, bounds) {
  return unit.x >= bounds.minX
    && unit.x <= bounds.maxX
    && unit.y >= bounds.minY
    && unit.y <= bounds.maxY;
}

function render() {
  if (!state.battle) return;
  const viewport = getViewport();
  const hoveredUnit = refreshBattleHover(viewport);
  if (state.selectedPropId && !getSelectedBattleProp()) {
    clearSelectedBattleProp();
  }
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  drawField(viewport, state.battle);
  drawGroundDecor(viewport, state.battle);
  drawStuckArrows(viewport, state.battle.stuckArrows);
  drawProjectiles(viewport, state.battle.projectiles);
  drawBodyguardAuras(viewport, state.battle.factions);
  drawBardAuras(viewport, state.battle.factions);
  drawDepthSortedGroundEntities(viewport, state.battle);
  drawBossBubbles(viewport, state.battle);
  drawNecromancerLinks(viewport, state.battle);
  drawSwipes(viewport, state.battle.swipes);
  drawTraces(viewport, state.battle.traces);
  drawSpells(viewport, state.battle);
  drawParticles(viewport, state.battle.particles);
  drawWeather(viewport, state.battle);
  drawSelectedGroundPropIndicator(viewport);
  drawBattleHealthChart(state.battle);
  renderBattleUnitTooltip(hoveredUnit, state.battle, viewport);
  if (state.showRenderDebug) drawRenderDebugOverlay();
}

function initializeBattleHealthTimeline(battle) {
  battle.healthTimeline = [captureBattleHealthSnapshot(battle, 0)];
  battle.nextHealthChartSampleAt = HEALTH_CHART_SAMPLE_INTERVAL;
}

function recordBattleHealthTimeline(battle) {
  if (!battle.healthTimeline) initializeBattleHealthTimeline(battle);
  if (battle.time + 1e-6 < (battle.nextHealthChartSampleAt || 0)) return;
  battle.healthTimeline.push(captureBattleHealthSnapshot(battle, battle.time));
  battle.nextHealthChartSampleAt = battle.time + HEALTH_CHART_SAMPLE_INTERVAL;
}

function captureBattleHealthSnapshot(battle, time) {
  const entries = getResultFactions(battle).map((faction) => ({
    id: faction.id,
    color: faction.color,
    health: faction.units.reduce((total, unit) => {
      if (unit.dead || unit.fled) return total;
      return total + Math.max(0, unit.health || 0);
    }, 0),
  }));
  const total = entries.reduce((sum, entry) => sum + entry.health, 0);
  let cumulative = 0;
  return {
    time,
    total,
    shares: entries.map((entry) => {
      const share = total > 0 ? entry.health / total : 0;
      const start = cumulative;
      cumulative += share;
      return {
        id: entry.id,
        color: entry.color,
        start,
        end: cumulative,
      };
    }),
  };
}

function drawBattleHealthChart(battle) {
  const width = els.battleHealthChartCanvas.width;
  const height = els.battleHealthChartCanvas.height;
  if (!width || !height) return;

  chartCtx.clearRect(0, 0, width, height);
  const dpr = window.devicePixelRatio || 1;
  const w = width / dpr;
  const h = height / dpr;
  chartCtx.save();
  chartCtx.scale(dpr, dpr);

  const storedTimeline = battle.healthTimeline || [];
  const resultFactions = getResultFactions(battle);
  if (!storedTimeline.length || !resultFactions.length) {
    chartCtx.restore();
    return;
  }
  const timeline = storedTimeline[storedTimeline.length - 1]?.time < battle.time
    ? [...storedTimeline, captureBattleHealthSnapshot(battle, battle.time)]
    : storedTimeline;

  const pad = { top: 6, right: 7, bottom: 8, left: 7 };
  const plotX = pad.left;
  const plotY = pad.top;
  const plotW = Math.max(1, w - pad.left - pad.right);
  const plotH = Math.max(1, h - pad.top - pad.bottom);
  const duration = Math.max(
    HEALTH_CHART_VISIBLE_SECONDS,
    battle.time,
    timeline[timeline.length - 1]?.time || 0,
    HEALTH_CHART_SAMPLE_INTERVAL,
  );
  const factionIds = resultFactions.map((faction) => faction.id);
  const findShare = (snapshot, factionId) => snapshot.shares.find((share) => share.id === factionId) || { start: 0, end: 0 };

  chartCtx.fillStyle = "rgba(255, 249, 237, 0.05)";
  chartCtx.fillRect(plotX, plotY, plotW, plotH);
  chartCtx.strokeStyle = "rgba(255, 247, 232, 0.18)";
  chartCtx.lineWidth = 1;
  chartCtx.strokeRect(plotX + 0.5, plotY + 0.5, plotW - 1, plotH - 1);

  [0.25, 0.5, 0.75].forEach((ratio) => {
    const y = plotY + plotH * (1 - ratio);
    chartCtx.strokeStyle = "rgba(255, 247, 232, 0.08)";
    chartCtx.beginPath();
    chartCtx.moveTo(plotX, y);
    chartCtx.lineTo(plotX + plotW, y);
    chartCtx.stroke();
  });

  factionIds.forEach((factionId, index) => {
    const firstShare = findShare(timeline[0], factionId);
    const faction = resultFactions[index];
    chartCtx.beginPath();
    chartCtx.moveTo(plotX, plotY + plotH * (1 - firstShare.end));
    timeline.forEach((snapshot) => {
      const share = findShare(snapshot, factionId);
      const x = plotX + plotW * (snapshot.time / duration);
      chartCtx.lineTo(x, plotY + plotH * (1 - share.end));
    });
    for (let snapshotIndex = timeline.length - 1; snapshotIndex >= 0; snapshotIndex -= 1) {
      const snapshot = timeline[snapshotIndex];
      const share = findShare(snapshot, factionId);
      const x = plotX + plotW * (snapshot.time / duration);
      chartCtx.lineTo(x, plotY + plotH * (1 - share.start));
    }
    chartCtx.closePath();
    chartCtx.fillStyle = hexToRgba(faction.color, 0.68);
    chartCtx.fill();

    chartCtx.strokeStyle = hexToRgba(shadeColor(faction.color, 0.45), 0.78);
    chartCtx.lineWidth = 1.2;
    chartCtx.beginPath();
    timeline.forEach((snapshot, snapshotIndex) => {
      const share = findShare(snapshot, factionId);
      const x = plotX + plotW * (snapshot.time / duration);
      const y = plotY + plotH * (1 - share.end);
      if (snapshotIndex === 0) {
        chartCtx.moveTo(x, y);
      } else {
        chartCtx.lineTo(x, y);
      }
    });
    chartCtx.stroke();
  });

  chartCtx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  chartCtx.lineWidth = 1;
  chartCtx.beginPath();
  chartCtx.moveTo(plotX + plotW, plotY);
  chartCtx.lineTo(plotX + plotW, plotY + plotH);
  chartCtx.stroke();
  chartCtx.restore();
}

function drawField(viewport, battle) {
  const arena = battle.arena || createArenaVariant(0, 0, battle.factions.length);
  ctx.fillStyle = arena.ground;
  ctx.fillRect(0, 0, viewport.width, viewport.height);
  const top = worldToScreen(0, 0, viewport);
  const bottom = worldToScreen(FIELD.width, FIELD.height, viewport);
  const gradient = ctx.createLinearGradient(0, top.y, 0, bottom.y);
  gradient.addColorStop(0, arena.top);
  gradient.addColorStop(0.5, shadeColor(arena.top, -0.18));
  gradient.addColorStop(1, arena.bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(top.x, top.y, bottom.x - top.x, bottom.y - top.y);
  const glow = ctx.createRadialGradient(viewport.width * 0.5, viewport.height * 0.2, 10, viewport.width * 0.5, viewport.height * 0.2, viewport.height * 0.55);
  glow.addColorStop(0, arena.glow);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, viewport.width, viewport.height);
  if (state.useTerrainTexturing && battle.terrainTexture?.canvas) {
    const profile = battle.terrainTexture.profile || arena.textureProfile || createArenaTextureProfile(arena.name);
    ctx.save();
    const terrainWidth = bottom.x - top.x;
    const terrainHeight = bottom.y - top.y;
    const centerX = top.x + terrainWidth / 2;
    const centerY = top.y + terrainHeight / 2;
    ctx.translate(centerX, centerY);
    ctx.scale(battle.terrainTexture.mirrorX ? -1 : 1, battle.terrainTexture.mirrorY ? -1 : 1);
    ctx.translate(-centerX, -centerY);
    ctx.globalCompositeOperation = "soft-light";
    ctx.globalAlpha = profile.softLightAlpha || 0.42;
    ctx.drawImage(battle.terrainTexture.canvas, top.x, top.y, terrainWidth, terrainHeight);
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = profile.multiplyAlpha || 0.18;
    ctx.drawImage(battle.terrainTexture.canvas, top.x, top.y, terrainWidth, terrainHeight);
    ctx.restore();
  }
  const fieldCenter = worldToScreen(battle.field.centerX, battle.field.centerY, viewport);
  const routingEscapeRadius = getRoutingEscapeRadius(battle) * fieldCenter.scale;
  ctx.save();
  ctx.fillStyle = "rgba(16, 10, 8, 0.28)";
  ctx.beginPath();
  ctx.rect(0, 0, viewport.width, viewport.height);
  ctx.arc(fieldCenter.x, fieldCenter.y, routingEscapeRadius, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
  ctx.setLineDash([10 * fieldCenter.scale, 8 * fieldCenter.scale]);
  ctx.lineDashOffset = (battle.time || 0) * 14;
  ctx.strokeStyle = "rgba(255, 236, 196, 0.62)";
  ctx.lineWidth = Math.max(1.5, 2.2 * fieldCenter.scale);
  ctx.beginPath();
  ctx.arc(fieldCenter.x, fieldCenter.y, routingEscapeRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawGroundDecor(viewport, battle) {
  for (let i = 0; i < 28; i += 1) {
    const point = worldToScreen((i * 63) % FIELD.width, 90 + ((i * 97) % (FIELD.height - 180)), viewport);
    ctx.fillStyle = i % 2 ? hexToRgba(battle.arena?.top || "#8fa27f", 0.12) : "rgba(75,95,50,0.08)";
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, 38 * point.scale / 2.2, 16 * point.scale / 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function buildFieldProps(field, arena) {
  const count = 34 + Math.floor(Math.random() * 15);
  const themeWeights = arena?.propWeights || { common: DEFAULT_PROP_WEIGHTS, rare: {} };
  const availableGroundProps = getAvailableGroundPropAssets();
  const points = sampleBlueNoisePropPoints(field, count);
  return points
    .map((point, index) => buildGroundProp(point, index, arena, themeWeights, count, availableGroundProps))
    .sort((a, b) => a.y - b.y);
}

function sampleBlueNoisePropPoints(field, targetCount) {
  const width = Math.max(1, field.width - GROUND_PROP_PADDING_X * 2);
  const height = Math.max(1, field.height - GROUND_PROP_PADDING_Y * 2);
  const aspect = width / Math.max(1, height);
  const columns = Math.max(1, Math.ceil(Math.sqrt(targetCount * aspect)));
  const rows = Math.max(1, Math.ceil(targetCount / columns));
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push({ row, column, weight: Math.random() });
    }
  }
  cells.sort((a, b) => a.weight - b.weight);
  return cells.slice(0, targetCount).map(({ row, column }) => {
    const jitterX = GROUND_PROP_JITTER_MIN + (GROUND_PROP_JITTER_MAX - GROUND_PROP_JITTER_MIN) * Math.random();
    const jitterY = GROUND_PROP_JITTER_MIN + (GROUND_PROP_JITTER_MAX - GROUND_PROP_JITTER_MIN) * Math.random();
    return {
      x: GROUND_PROP_PADDING_X + (column + jitterX) * cellWidth,
      y: GROUND_PROP_PADDING_Y + (row + jitterY) * cellHeight,
    };
  });
}

function chooseArenaPropType(themeWeights, index, count) {
  const rareChance = 0.08 + (index / Math.max(1, count - 1)) * 0.14;
  if (Math.random() < rareChance) {
    const rareType = chooseWeightedKey(themeWeights.rare);
    if (rareType) return rareType;
  }
  return chooseWeightedKey(themeWeights.common) || "stones";
}

function chooseWeightedKey(weights) {
  const entries = Object.entries(weights || {}).filter(([, weight]) => Number(weight) > 0);
  if (!entries.length) return null;
  const total = entries.reduce((sum, [, weight]) => sum + Number(weight), 0);
  let roll = Math.random() * total;
  for (const [key, weight] of entries) {
    roll -= Number(weight);
    if (roll <= 0) return key;
  }
  return entries[entries.length - 1][0];
}

function getRainLayerAngle(layer, time) {
  const neutralAngle = Number(layer?.angle) || 0;
  const wind = layer?.wind;
  if (!wind) return neutralAngle;
  const burst = Math.max(0, Math.sin(time * wind.burstFrequency + wind.burstPhase));
  const gustStrength = Math.pow(burst, wind.burstSharpness);
  const sway = Math.sin(time * wind.swayFrequency + wind.swayPhase);
  return neutralAngle + sway * wind.amplitude * gustStrength;
}

function drawWeatherRainLayers(viewport, battle, layers, assetUrl) {
  const image = getFactionImage(assetUrl);
  if (!image?.complete || !image.naturalWidth || !image.naturalHeight) return false;
  const baseScale = getBaseScale(viewport);
  const worldBounds = getViewportWorldBounds(viewport, Math.max(viewport.width, viewport.height));
  const rainOriginX = FIELD.width / 2;
  const rainOriginY = FIELD.height / 2;
  const rainTileScale = 0.33;
  layers.forEach((layer) => {
    const angle = getRainLayerAngle(layer, battle.time);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const tileWorldWidth = (image.naturalWidth * layer.scale * rainTileScale) / Math.max(baseScale, 0.0001);
    const tileWorldHeight = (image.naturalHeight * layer.scale * rainTileScale) / Math.max(baseScale, 0.0001);
    const offsetX = ((layer.offsetX / Math.max(baseScale, 0.0001)) % tileWorldWidth + tileWorldWidth) % tileWorldWidth;
    const offsetY = (((layer.offsetY + layer.speed * battle.time) / Math.max(baseScale, 0.0001)) % tileWorldHeight + tileWorldHeight) % tileWorldHeight;
    const corners = [
      { x: worldBounds.minX, y: worldBounds.minY },
      { x: worldBounds.maxX, y: worldBounds.minY },
      { x: worldBounds.minX, y: worldBounds.maxY },
      { x: worldBounds.maxX, y: worldBounds.maxY },
    ].map((corner) => {
      const dx = corner.x - rainOriginX;
      const dy = corner.y - rainOriginY;
      return {
        x: (dx * cosAngle) + (dy * sinAngle),
        y: (-dx * sinAngle) + (dy * cosAngle),
      };
    });
    const minLocalX = Math.min(...corners.map((corner) => corner.x)) - tileWorldWidth * 1.5;
    const maxLocalX = Math.max(...corners.map((corner) => corner.x)) + tileWorldWidth * 1.5;
    const minLocalY = Math.min(...corners.map((corner) => corner.y)) - tileWorldHeight * 1.5;
    const maxLocalY = Math.max(...corners.map((corner) => corner.y)) + tileWorldHeight * 1.5;
    const startLocalX = minLocalX - (((minLocalX - offsetX) % tileWorldWidth + tileWorldWidth) % tileWorldWidth);
    const startLocalY = minLocalY - (((minLocalY - offsetY) % tileWorldHeight + tileWorldHeight) % tileWorldHeight);
    for (let localX = startLocalX; localX <= maxLocalX; localX += tileWorldWidth) {
      for (let localY = startLocalY; localY <= maxLocalY; localY += tileWorldHeight) {
        const centerLocalX = localX + tileWorldWidth / 2;
        const centerLocalY = localY + tileWorldHeight / 2;
        const worldX = rainOriginX + (centerLocalX * cosAngle) - (centerLocalY * sinAngle);
        const worldY = rainOriginY + (centerLocalX * sinAngle) + (centerLocalY * cosAngle);
        const point = worldToScreen(worldX, worldY, viewport);
        const drawWidth = tileWorldWidth * point.scale;
        const drawHeight = tileWorldHeight * point.scale;
        ctx.save();
        ctx.globalAlpha = layer.alpha;
        ctx.translate(point.x, point.y);
        ctx.rotate(angle);
        ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
      }
    }
  });
  return true;
}

function drawRainSplashes(viewport, battle, splashes, baseScale, intensity = 1) {
  splashes.forEach((splash) => {
    const progress = ((battle.time + splash.phase) % splash.cycle) / splash.cycle;
    const fade = Math.max(0, 1 - progress);
    if (fade <= 0.02) return;
    const cycleIndex = Math.floor((battle.time + splash.phase) / splash.cycle);
    const rand = createSeededRandom(hashStringToSeed(`${splash.seed}|${cycleIndex}`));
    const worldX = rand() * FIELD.width;
    const worldY = (0.08 + rand() * 0.84) * FIELD.height;
    const point = worldToScreen(worldX, worldY - splash.lift, viewport);
    const scale = point.scale / baseScale;
    const rippleWidth = splash.radius * (0.3 + progress * 1.35) * scale;
    const rippleHeight = rippleWidth * 0.34;
    const crownHeight = splash.radius * (0.85 - progress * 0.65) * scale;
    const alpha = splash.alpha * fade * intensity;
    ctx.save();
    ctx.strokeStyle = `rgba(224, 236, 255, ${alpha})`;
    ctx.lineWidth = Math.max(0.8, 1.3 * scale);
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, rippleWidth, rippleHeight, 0, 0, Math.PI * 2);
    ctx.stroke();
    if (progress < 0.55) {
      ctx.beginPath();
      ctx.moveTo(point.x + splash.slant * scale, point.y);
      ctx.lineTo(point.x + splash.slant * scale, point.y - crownHeight);
      ctx.moveTo(point.x - rippleWidth * 0.45, point.y - rippleHeight * 0.15);
      ctx.lineTo(point.x - rippleWidth * 0.22, point.y - crownHeight * 0.6);
      ctx.moveTo(point.x + rippleWidth * 0.45, point.y - rippleHeight * 0.15);
      ctx.lineTo(point.x + rippleWidth * 0.22, point.y - crownHeight * 0.6);
      ctx.stroke();
    }
    ctx.restore();
  });
}

function drawWeather(viewport, battle) {
  const weather = battle.arena?.weather;
  if (!weather || weather === "clear") return;
  const field = battle.weatherField || [];
  const baseScale = getBaseScale(viewport);
  const rainLayers = Array.isArray(field) ? field : (field.layers || []);
  const rainSplashes = Array.isArray(field) ? [] : (field.splashes || []);
  ctx.save();
  if (weather === "mist") {
    field.forEach((cloud) => {
      const worldX = ((cloud.x * FIELD.width) + battle.time * cloud.speed) % (FIELD.width + cloud.width * 2) - cloud.width;
      const worldY = FIELD.height * cloud.y;
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.fillStyle = `rgba(228, 238, 228, ${cloud.alpha})`;
      ctx.beginPath();
      ctx.ellipse(point.x, point.y, cloud.width * point.scale / baseScale, cloud.height * point.scale / baseScale, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (weather === "drizzle") {
    drawRainSplashes(viewport, battle, rainSplashes, baseScale, 0.9);
    drawWeatherRainLayers(viewport, battle, rainLayers, WEATHER_RAIN_LIGHT_ASSET);
  } else if (weather === "embers") {
    field.forEach((ember) => {
      const worldX = (ember.x * FIELD.width) + Math.sin((battle.time + ember.x) * 1.4) * ember.sway;
      const worldY = FIELD.height - (((ember.y * FIELD.height) + battle.time * ember.speed) % (FIELD.height + 80));
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.fillStyle = `rgba(255, ${ember.glow}, 92, ${ember.alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, ember.radius * point.scale / baseScale, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (weather === "downpour") {
    drawRainSplashes(viewport, battle, rainSplashes, baseScale, 1.15);
    drawWeatherRainLayers(viewport, battle, rainLayers, WEATHER_RAIN_HEAVY_ASSET);
    ctx.fillStyle = "rgba(187, 213, 255, 0.08)";
    ctx.fillRect(0, 0, viewport.width, viewport.height);
  } else if (weather === "ashfall") {
    field.forEach((flake) => {
      const worldX = (flake.x * FIELD.width) + Math.sin((battle.time + flake.x) * 1.25) * flake.sway;
      const worldY = ((flake.y * FIELD.height) + battle.time * flake.speed) % (FIELD.height + 40) - 20;
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.fillStyle = `rgba(${flake.shade}, ${flake.shade - 10}, ${flake.shade - 18}, ${flake.alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, flake.radius * point.scale / baseScale, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (weather === "fireflies") {
    field.forEach((light) => {
      const pulse = 0.35 + (Math.sin((battle.time + light.x * 2) * light.pulse * 2.2) + 1) * 0.3;
      const worldX = (light.x * FIELD.width) + Math.sin((battle.time + light.y) * 1.1) * light.sway;
      const worldY = (light.y * FIELD.height) + Math.cos((battle.time + light.x) * 0.9) * light.drift;
      const point = worldToScreen(worldX, worldY, viewport);
      const radius = light.radius * point.scale / baseScale;
      const gradient = ctx.createRadialGradient(point.x, point.y, 1, point.x, point.y, radius * 7);
      gradient.addColorStop(0, `rgba(255, 247, 157, ${light.alpha * pulse})`);
      gradient.addColorStop(1, "rgba(255, 247, 157, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 244, 143, ${Math.min(0.95, light.alpha + pulse * 0.2)})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (weather === "snowfall") {
    field.forEach((flake) => {
      const worldX = (flake.x * FIELD.width) + Math.sin((battle.time + flake.x) * 0.9) * flake.sway;
      const worldY = ((flake.y * FIELD.height) + battle.time * flake.speed) % (FIELD.height + 50) - 25;
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.fillStyle = `rgba(244, 248, 255, ${flake.alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, flake.radius * point.scale / baseScale, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  ctx.restore();
}

function drawGroundProps(viewport, props) {
  props.forEach((prop) => drawSingleGroundProp(viewport, prop));
}

function drawSingleGrave(viewport, grave) {
  const point = worldToScreen(grave.x, grave.y, viewport);
  const imageGrave = grave.renderMode === "image" ? grave.asset : null;
  if (imageGrave?.image?.complete) {
    const renderScale = Math.min(1, grave.imageScale || GROUND_PROP_IMAGE_SCALE) * point.scale * (grave.scale || 1) * GRAVE_RENDER_SCALE;
    const drawWidth = Math.max(1, imageGrave.width || 1) * renderScale;
    const drawHeight = Math.max(1, imageGrave.height || 1) * renderScale;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.drawImage(imageGrave.image, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
    ctx.restore();
    return;
  }
  const variant = getGraveVariant(grave);
  const scale = (point.scale / 2.1) * GRAVE_RENDER_SCALE;
  const bodyPath = variant.__bodyPath;
  const accentPath = variant.__accentPath || null;
  ctx.save();
  ctx.translate(point.x, point.y + 2 * point.scale / 2.1);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(0, 6 * scale, variant.kind === "remains" ? 9 * scale : 11 * scale, variant.kind === "remains" ? 4 * scale : 5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.scale(scale, scale);
  ctx.fillStyle = variant.kind === "remains" ? "rgba(204, 198, 184, 0.92)" : "rgba(128, 124, 118, 0.94)";
  ctx.fill(bodyPath);
  if (accentPath) {
    ctx.fillStyle = variant.kind === "remains" ? "rgba(126, 117, 102, 0.42)" : "rgba(168, 164, 158, 0.7)";
    ctx.fill(accentPath);
  }
  ctx.restore();
}

function drawSingleGroundProp(viewport, prop) {
  const point = worldToScreen(prop.x, prop.y, viewport);
  const scale = point.scale * prop.scale;
  const imageProp = prop.renderMode === "image" ? prop.asset : null;
  let drawHeight = null;
  let drawWidth = null;
  if (imageProp) {
    const imageWidth = Math.max(1, imageProp.width || 1);
    const imageHeight = Math.max(1, imageProp.height || 1);
    const renderScale = Math.min(1, prop.imageScale || GROUND_PROP_IMAGE_SCALE) * point.scale * prop.scale;
    drawWidth = imageWidth * renderScale;
    drawHeight = imageHeight * renderScale;
  }
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(prop.rotation);
  if (imageProp?.image?.complete) {
    const image = getTintedGroundPropImage(imageProp.image, imageProp.url, prop.tintColor, prop.tintAlpha);
    ctx.drawImage(image || imageProp.image, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
  } else {
    PROP_RENDERERS[prop.type]?.(scale, prop.tint);
  }
  ctx.restore();
}

function drawSelectedGroundPropIndicator(viewport) {
  if (!state.propResizeMode) return;
  const selectedProp = getSelectedBattleProp();
  if (!selectedProp) return;
  const metrics = getGroundPropScreenMetrics(selectedProp, viewport);
  const arrowX = metrics.point.x;
  const arrowY = metrics.top - 12;
  const size = Math.max(5, metrics.point.scale * 4.5);
  ctx.save();
  ctx.translate(arrowX, arrowY);
  ctx.fillStyle = "#ffe6a4";
  ctx.strokeStyle = "rgba(50, 28, 11, 0.9)";
  ctx.lineWidth = Math.max(1, metrics.point.scale * 0.75);
  ctx.beginPath();
  ctx.moveTo(0, size * 1.3);
  ctx.lineTo(-size, 0);
  ctx.lineTo(size, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -size * 1.7);
  ctx.stroke();
  ctx.restore();
}

function getTintedGroundPropImage(image, url, color, alpha = GROUND_PROP_TINT_ALPHA) {
  if (!image || !image.complete || !url || !color || alpha <= 0) return image;
  const cacheKey = `${url}|${color}|${alpha.toFixed(3)}`;
  if (!state.tintedGroundProps.has(cacheKey)) {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const tintCtx = canvas.getContext("2d");
    tintCtx.drawImage(image, 0, 0);
    tintCtx.globalCompositeOperation = "source-atop";
    tintCtx.fillStyle = hexToRgba(color, alpha);
    tintCtx.fillRect(0, 0, canvas.width, canvas.height);
    tintCtx.globalCompositeOperation = "source-over";
    state.tintedGroundProps.set(cacheKey, canvas);
  }
  return state.tintedGroundProps.get(cacheKey);
}

function getAvailableGroundPropAssets() {
  return Array.isArray(state.groundPropCatalog.items) ? state.groundPropCatalog.items : [];
}

function getAvailableGraveAssets() {
  return Array.isArray(state.graveCatalog.items) ? state.graveCatalog.items : [];
}

function getRandomGraveAsset() {
  const items = getAvailableGraveAssets();
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function getImageLowestOpaquePixel(image) {
  if (!image || !image.complete) return 0;
  const width = image.naturalWidth || image.width || 1;
  const height = image.naturalHeight || image.height || 1;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const scanCtx = canvas.getContext("2d", { willReadFrequently: true });
  scanCtx.drawImage(image, 0, 0, width, height);
  const { data } = scanCtx.getImageData(0, 0, width, height);
  for (let y = height - 1; y >= 0; y -= 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[((y * width) + x) * 4 + 3] > 12) return y;
    }
  }
  return height - 1;
}

async function preloadGroundPropAssets() {
  if (!HAS_BATTLE_PAGE) return [];
  if (state.groundPropCatalog.status === "loaded" || state.groundPropCatalog.status === "missing") {
    return getAvailableGroundPropAssets();
  }
  if (state.groundPropCatalog.promise) return state.groundPropCatalog.promise;

  state.groundPropCatalog.status = "loading";
  state.groundPropCatalog.promise = (async () => {
    try {
      const items = [];
      let consecutiveMisses = 0;
      for (let index = 1; index <= GROUND_PROP_MAX_SCAN_INDEX; index += 1) {
        const file = `${String(index).padStart(GROUND_PROP_FILENAME_DIGITS, "0")}.png`;
        const url = resolveGroundPropAssetUrl(file);
        try {
          const image = await loadImageAsset(url);
          items.push({
            file,
            width: image.naturalWidth || image.width || 1,
            height: image.naturalHeight || image.height || 1,
            image,
            url,
          });
          consecutiveMisses = 0;
        } catch (error) {
          consecutiveMisses += 1;
          if (items.length && consecutiveMisses >= GROUND_PROP_SCAN_MISS_LIMIT) break;
        }
      }
      state.groundPropCatalog.items = items;
      state.groundPropCatalog.status = state.groundPropCatalog.items.length ? "loaded" : "missing";
    } catch (error) {
      state.groundPropCatalog.items = [];
      state.groundPropCatalog.status = "missing";
    } finally {
      state.groundPropCatalog.promise = null;
    }
    return getAvailableGroundPropAssets();
  })();

  return state.groundPropCatalog.promise;
}

async function preloadGraveAssets() {
  if (!HAS_BATTLE_PAGE) return [];
  if (state.graveCatalog.status === "loaded" || state.graveCatalog.status === "missing") {
    return getAvailableGraveAssets();
  }
  if (state.graveCatalog.promise) return state.graveCatalog.promise;

  state.graveCatalog.status = "loading";
  state.graveCatalog.promise = (async () => {
    try {
      const items = [];
      let consecutiveMisses = 0;
      for (let index = 1; index <= GROUND_PROP_MAX_SCAN_INDEX; index += 1) {
        const file = `${String(index).padStart(GROUND_PROP_FILENAME_DIGITS, "0")}.png`;
        const url = resolveGraveAssetUrl(file);
        try {
          const image = await loadImageAsset(url);
          items.push({
            file,
            width: image.naturalWidth || image.width || 1,
            height: image.naturalHeight || image.height || 1,
            image,
            url,
            lowestOpaquePixel: getImageLowestOpaquePixel(image),
          });
          consecutiveMisses = 0;
        } catch (error) {
          consecutiveMisses += 1;
          if (items.length && consecutiveMisses >= GROUND_PROP_SCAN_MISS_LIMIT) break;
        }
      }
      state.graveCatalog.items = items;
      state.graveCatalog.status = state.graveCatalog.items.length ? "loaded" : "missing";
    } catch (error) {
      state.graveCatalog.items = [];
      state.graveCatalog.status = "missing";
    } finally {
      state.graveCatalog.promise = null;
    }
    return getAvailableGraveAssets();
  })();

  return state.graveCatalog.promise;
}

function resolveGroundPropAssetUrl(fileName) {
  try {
    return new URL(fileName, new URL(GROUND_PROP_ASSET_BASE_URL, window.location.href)).toString();
  } catch (error) {
    return `${GROUND_PROP_ASSET_BASE_URL}${fileName}`;
  }
}

function resolveGraveAssetUrl(fileName) {
  try {
    return new URL(fileName, new URL(GRAVE_ASSET_BASE_URL, window.location.href)).toString();
  } catch (error) {
    return `${GRAVE_ASSET_BASE_URL}${fileName}`;
  }
}

function renderBracketTracker() {
  const tournament = state.tournament;
  const tournamentResult = state.tournamentResult;
  if (!tournament) {
    if (tournamentResult) {
      const stats = tournamentResult.stats || {};
      els.arenaLabel.textContent = "Completed bracket";
      els.viewTournamentStoryBtn.disabled = false;
      els.bracketSummary.textContent = tournamentResult.championId
        ? `${tournamentResult.championTitle} won the tournament after ${stats.completedHeats || 0} heats and ${stats.totalPerished || 0} battlefield losses.`
        : `The tournament ended without a champion after ${stats.completedHeats || 0} heats.`;
      els.bracketTracker.innerHTML = `
        <div class="bracket-match complete champion-showcase">
          <div class="bracket-match-header">
            <p class="bracket-match-title">${tournamentResult.championId ? "Ultimate Victor" : "Tournament Complete"}</p>
            <span class="bracket-badge">${stats.totalEntrants || 0} armies</span>
          </div>
          <div class="bracket-entries">
            <div class="bracket-entry advanced champion">
              <span>${escapeHtml(tournamentResult.championTitle || "No champion")}</span>
              <span>${tournamentResult.championId ? `${stats.armiesOutlasted || 0} armies defeated` : "Mutual destruction"}</span>
            </div>
            <div class="bracket-entry complete">
              <span>Bracket carnage</span>
              <span>${stats.totalPerished || 0} perished, ${stats.totalRouted || 0} routed</span>
            </div>
          </div>
        </div>
      `;
      if (!els.tournamentStoryModal.classList.contains("hidden")) renderTournamentStoryModal();
      return;
    }

    els.arenaLabel.textContent = state.battle?.arena?.name || "Single arena";
    els.viewTournamentStoryBtn.disabled = true;
    els.bracketSummary.textContent = state.factions.length > 1
      ? `${state.factions.length} armies enter one decisive battle.`
      : "One battle decides the next read.";
    els.bracketTracker.innerHTML = state.factions.length ? `
      <div class="bracket-match active">
        <div class="bracket-match-header">
          <p class="bracket-match-title">Grand Melee</p>
          <span class="bracket-badge">${state.battle?.arena?.weather || "clear"}</span>
        </div>
        <div class="bracket-entries">
          ${state.factions.map((faction) => `<div class="bracket-entry"><span>${escapeHtml(faction.title)}</span><span>${faction.armySize}</span></div>`).join("")}
        </div>
      </div>
    ` : "";
    if (!els.tournamentStoryModal.classList.contains("hidden")) renderTournamentStoryModal();
    return;
  }

  const currentMatch = getCurrentTournamentMatch(tournament);
  els.viewTournamentStoryBtn.disabled = false;
  els.arenaLabel.textContent = currentMatch?.arena?.name || "Bracket arena";
  els.bracketSummary.textContent = tournament.complete
    ? (tournament.championId ? `${findSourceFaction(tournament.championId)?.title || "A champion"} conquered the bracket.` : "No title survived the bracket.")
    : `${tournament.originalFactionIds.length} armies have been split into ${tournament.rounds[0].matches.length} opening heats.`;

  els.bracketTracker.innerHTML = tournament.rounds.map((round, roundIndex) => `
    <section class="bracket-round">
      <h3 class="bracket-round-title">${round.label}</h3>
      ${round.matches.map((match, matchIndex) => `
        <article class="bracket-match ${match.status}">
          <div class="bracket-match-header">
            <p class="bracket-match-title">${match.label}</p>
            <span class="bracket-badge">${match.arena.weather}</span>
          </div>
          <div class="arena-weather">${match.arena.name}</div>
          <div class="bracket-entries">
            ${match.factionIds.map((factionId) => {
              const faction = getTournamentFactionRecord(tournament, factionId);
              const status = getTournamentEntryState(tournament, roundIndex, matchIndex, match, factionId);
              const statusLabel = status === "eliminated" ? "Out" : getTournamentEntryLabel(status);
              return `<div class="bracket-entry ${status}"><span>${escapeHtml(faction?.title || "TBD")}</span><span>${escapeHtml(statusLabel)}</span></div>`;
            }).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `).join("");
  if (!els.tournamentStoryModal.classList.contains("hidden")) renderTournamentStoryModal();
}

function updateAdvanceButtonLabel() {
  if (state.tournamentResult) {
    els.advanceQueueBtn.textContent = shouldUseTournament(state.factions) ? "Start Next Tournament" : "Apply Result To Queue";
    return;
  }
  if (state.tournament && !state.tournament.complete) {
    els.advanceQueueBtn.textContent = "Advance Bracket";
    return;
  }
  els.advanceQueueBtn.textContent = "Apply Winner To Queue";
}

function drawPropCart(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#7b5733" : "#855f3a";
  ctx.fillRect(-15 * scale / 2.1, -2 * scale / 2.1, 30 * scale / 2.1, 13 * scale / 2.1);
  ctx.fillStyle = "#96714a";
  ctx.fillRect(-10 * scale / 2.1, -9 * scale / 2.1, 20 * scale / 2.1, 8 * scale / 2.1);
  ctx.strokeStyle = "#403022";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.arc(-10 * scale / 2.1, 12 * scale / 2.1, 6 * scale / 2.1, 0, Math.PI * 2);
  ctx.arc(10 * scale / 2.1, 12 * scale / 2.1, 6 * scale / 2.1, 0, Math.PI * 2);
  ctx.stroke();
}

function drawPropRuin(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#92836d" : "#7d705d";
  ctx.beginPath();
  ctx.moveTo(-16 * scale / 2.1, 9 * scale / 2.1);
  ctx.lineTo(-12 * scale / 2.1, -10 * scale / 2.1);
  ctx.lineTo(-2 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(5 * scale / 2.1, -14 * scale / 2.1);
  ctx.lineTo(15 * scale / 2.1, 8 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(56, 47, 39, 0.32)";
  ctx.fillRect(-3 * scale / 2.1, -2 * scale / 2.1, 5 * scale / 2.1, 10 * scale / 2.1);
}

function drawPropCamp(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#9f6f43" : "#b17c4b";
  ctx.beginPath();
  ctx.moveTo(-14 * scale / 2.1, 9 * scale / 2.1);
  ctx.lineTo(0, -13 * scale / 2.1);
  ctx.lineTo(14 * scale / 2.1, 9 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#e7ba78";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-4 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(0, 2 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, 10 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 178, 88, 0.62)";
  ctx.beginPath();
  ctx.arc(0, 4 * scale / 2.1, 3 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
}

function drawPropStakes(scale, tint) {
  ctx.strokeStyle = tint > 0.5 ? "#6b4d2d" : "#7e5a35";
  ctx.lineWidth = 2.2 * scale / 2.1;
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 6 * scale / 2.1, 10 * scale / 2.1);
    ctx.lineTo((i * 6 + (i % 2 ? -2 : 2)) * scale / 2.1, -8 * scale / 2.1);
    ctx.stroke();
  }
}

function drawPropCrate(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#8c6138" : "#7a5330";
  ctx.fillRect(-11 * scale / 2.1, -7 * scale / 2.1, 22 * scale / 2.1, 18 * scale / 2.1);
  ctx.strokeStyle = "#4f3823";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.strokeRect(-11 * scale / 2.1, -7 * scale / 2.1, 22 * scale / 2.1, 18 * scale / 2.1);
  ctx.beginPath();
  ctx.moveTo(-11 * scale / 2.1, 1 * scale / 2.1);
  ctx.lineTo(11 * scale / 2.1, 1 * scale / 2.1);
  ctx.moveTo(0, -7 * scale / 2.1);
  ctx.lineTo(0, 11 * scale / 2.1);
  ctx.stroke();
}

function drawPropStones(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#8f8b80" : "#757266";
  [[-10, 6, 8], [0, 0, 10], [11, 7, 6], [-2, 8, 5]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x * scale / 2.1, y * scale / 2.1, radius * scale / 2.1, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPropObelisk(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#8c8579" : "#736c61";
  ctx.beginPath();
  ctx.moveTo(0, -20 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -8 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(-2 * scale / 2.1, -14 * scale / 2.1, 3 * scale / 2.1, 20 * scale / 2.1);
}

function drawPropBrazier(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#5f4934" : "#4e3d2f";
  ctx.fillRect(-8 * scale / 2.1, 2 * scale / 2.1, 16 * scale / 2.1, 8 * scale / 2.1);
  ctx.strokeStyle = "#2f241b";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-2 * scale / 2.1, 16 * scale / 2.1);
  ctx.moveTo(6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(2 * scale / 2.1, 16 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 175, 93, 0.78)";
  ctx.beginPath();
  ctx.moveTo(-4 * scale / 2.1, 4 * scale / 2.1);
  ctx.quadraticCurveTo(0, -10 * scale / 2.1, 4 * scale / 2.1, 4 * scale / 2.1);
  ctx.quadraticCurveTo(0, -3 * scale / 2.1, -4 * scale / 2.1, 4 * scale / 2.1);
  ctx.fill();
}

function drawPropReeds(scale, tint) {
  ctx.strokeStyle = tint > 0.5 ? "#6d8552" : "#597043";
  ctx.lineWidth = 1.8 * scale / 2.1;
  for (let i = -3; i <= 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 3 * scale / 2.1, 12 * scale / 2.1);
    ctx.quadraticCurveTo((i * 4 + (i % 2 ? -5 : 5)) * scale / 2.1, 2 * scale / 2.1, (i * 2) * scale / 2.1, -12 * scale / 2.1);
    ctx.stroke();
  }
}

function drawPropBones(scale, tint) {
  ctx.strokeStyle = tint > 0.5 ? "#d9cfbb" : "#bcae96";
  ctx.lineWidth = 2.2 * scale / 2.1;
  [[-8, 4, 8, -2], [-2, -1, 10, 7]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1 * scale / 2.1, y1 * scale / 2.1);
    ctx.lineTo(x2 * scale / 2.1, y2 * scale / 2.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x1 * scale / 2.1, y1 * scale / 2.1, 2.5 * scale / 2.1, 0, Math.PI * 2);
    ctx.arc(x2 * scale / 2.1, y2 * scale / 2.1, 2.5 * scale / 2.1, 0, Math.PI * 2);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
  });
}

function drawPropMushrooms(scale, tint) {
  ctx.fillStyle = tint > 0.5 ? "#b85f51" : "#9b4a40";
  [[-8, 3, 6], [0, -2, 8], [8, 4, 5]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x * scale / 2.1, y * scale / 2.1, radius * scale / 2.1, Math.PI, 0, false);
    ctx.fill();
  });
  ctx.strokeStyle = "#ead9bf";
  ctx.lineWidth = 2 * scale / 2.1;
  [[-8, 3], [0, -2], [8, 4]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x * scale / 2.1, y * scale / 2.1);
    ctx.lineTo(x * scale / 2.1, (y + 8) * scale / 2.1);
    ctx.stroke();
  });
}

function drawPropSignpost(scale, tint) {
  ctx.strokeStyle = tint > 0.5 ? "#6a4f33" : "#5a432c";
  ctx.lineWidth = 2.2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(0, -12 * scale / 2.1);
  ctx.lineTo(0, 14 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = tint > 0.5 ? "#9c7447" : "#845f3b";
  ctx.fillRect(-10 * scale / 2.1, -10 * scale / 2.1, 20 * scale / 2.1, 8 * scale / 2.1);
  ctx.fillRect(-7 * scale / 2.1, -1 * scale / 2.1, 16 * scale / 2.1, 7 * scale / 2.1);
}

function drawSingleBanner(viewport, faction) {
  const point = worldToScreen(faction.bannerPos.x, faction.bannerPos.y, viewport);
  const scale = point.scale;
  const poleHeight = 96 * scale / 2.1;
  const clothWidth = 44 * scale / 2.1;
  const clothHeight = 92 * scale / 2.1;
  const clothLeft = point.x + 6 * scale / 2.1;
  const clothTop = point.y - 2 * scale / 2.1;
  const clothBottom = clothTop + clothHeight;

  ctx.strokeStyle = "rgba(50, 28, 16, 0.84)";
  ctx.lineWidth = Math.max(2, 4 * scale / 2.1);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y - 8 * scale / 2.1);
  ctx.lineTo(point.x, point.y + poleHeight);
  ctx.stroke();
  ctx.fillStyle = "#d8c6a2";
  ctx.beginPath();
  ctx.arc(point.x, point.y - 10 * scale / 2.1, 4.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  traceBannerCloth(clothLeft, clothTop, clothWidth, clothBottom, scale);
  ctx.fillStyle = faction.color;
  ctx.fill();
  ctx.clip();

  if (faction.image && faction.image.complete) {
    const imageTop = clothTop + 6 * scale / 2.1;
    const imageHeight = 52 * scale / 2.1;
    ctx.drawImage(faction.image, clothLeft + 3 * scale / 2.1, imageTop, clothWidth - 6 * scale / 2.1, imageHeight);
  } else {
    const bannerGradient = ctx.createLinearGradient(clothLeft, clothTop, clothLeft, clothBottom);
    bannerGradient.addColorStop(0, shadeColor(faction.color, 0.2));
    bannerGradient.addColorStop(1, shadeColor(faction.color, -0.18));
    ctx.fillStyle = bannerGradient;
    ctx.fillRect(clothLeft, clothTop, clothWidth, clothHeight);
  }

  ctx.fillStyle = "rgba(255, 246, 223, 0.88)";
  ctx.fillRect(clothLeft + 4 * scale / 2.1, clothTop + 60 * scale / 2.1, clothWidth - 8 * scale / 2.1, 20 * scale / 2.1);
  ctx.restore();

  ctx.strokeStyle = "rgba(54, 35, 22, 0.72)";
  ctx.lineWidth = Math.max(1.8, 2.8 * scale / 2.1);
  traceBannerCloth(clothLeft, clothTop, clothWidth, clothBottom, scale);
  ctx.stroke();

  ctx.fillStyle = "#3b2718";
  ctx.font = `${Math.max(8, 10 * scale / 2.1)}px "Cinzel", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const bannerLines = formatBannerTitle(faction.title);
  bannerLines.forEach((line, index) => {
    ctx.fillText(line, clothLeft + clothWidth / 2, clothTop + (67 + index * 9) * scale / 2.1, clothWidth - 10 * scale / 2.1);
  });
}

function formatBannerTitle(title) {
  const words = `${title || ""}`.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return ["Untitled"];
  if (words.length === 1) return [truncateBannerTitle(words[0], 10)];
  return [
    truncateBannerTitle(words.slice(0, Math.ceil(words.length / 2)).join(" "), 12),
    truncateBannerTitle(words.slice(Math.ceil(words.length / 2)).join(" "), 12),
  ];
}

function traceBannerCloth(clothLeft, clothTop, clothWidth, clothBottom, scale) {
  ctx.beginPath();
  ctx.moveTo(clothLeft, clothTop);
  ctx.lineTo(clothLeft + clothWidth, clothTop);
  ctx.lineTo(clothLeft + clothWidth, clothBottom - 18 * scale / 2.1);
  ctx.lineTo(clothLeft + clothWidth / 2, clothBottom);
  ctx.lineTo(clothLeft, clothBottom - 18 * scale / 2.1);
  ctx.closePath();
}

function truncateBannerTitle(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

function truncateTitle(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦`;
}

function drawProjectiles(viewport, projectiles) {
  projectiles.forEach((projectile) => {
    const current = getProjectilePoint(projectile, projectile.progress);
    const point = worldToScreen(current.x, current.y, viewport);
    getProjectileDefinition(projectile)?.render?.({ projectile, point, viewport });
  });
}

function drawArrowProjectile({ projectile, point, viewport }) {
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
}

function drawBombProjectile({ projectile, point }) {
  if (projectile.landed) {
    ctx.fillStyle = "#2f2519";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 7 * point.scale / 2.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffb25a";
    ctx.lineWidth = 2 * point.scale / 2.1;
    ctx.beginPath();
    ctx.arc(point.x, point.y, (9 + Math.sin(projectile.timer * 10) * 1.5) * point.scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(projectile.progress * 8);
  ctx.fillStyle = "#443323";
  ctx.beginPath();
  ctx.arc(0, 0, 7 * point.scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#20150f";
  ctx.lineWidth = Math.max(1.2, 2 * point.scale / 2.1);
  ctx.beginPath();
  ctx.moveTo(-2 * point.scale / 2.1, -6 * point.scale / 2.1);
  ctx.lineTo(4 * point.scale / 2.1, -10 * point.scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#ffb25a";
  ctx.beginPath();
  ctx.arc(4 * point.scale / 2.1, -10 * point.scale / 2.1, 2.2 * point.scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPoisonBottleProjectile({ projectile, point }) {
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(projectile.progress * 6.5);
  ctx.fillStyle = "#5ebf64";
  ctx.beginPath();
  ctx.moveTo(0, -9 * point.scale / 2.1);
  ctx.lineTo(6 * point.scale / 2.1, -3 * point.scale / 2.1);
  ctx.lineTo(5 * point.scale / 2.1, 8 * point.scale / 2.1);
  ctx.lineTo(-5 * point.scale / 2.1, 8 * point.scale / 2.1);
  ctx.lineTo(-6 * point.scale / 2.1, -3 * point.scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(232,255,236,0.82)";
  ctx.fillRect(-2.2 * point.scale / 2.1, -12 * point.scale / 2.1, 4.4 * point.scale / 2.1, 4 * point.scale / 2.1);
  ctx.restore();
}

function drawNetProjectile({ projectile, point }) {
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(projectile.progress * 7);
  ctx.strokeStyle = "rgba(198, 224, 233, 0.95)";
  ctx.lineWidth = Math.max(1.2, 1.8 * point.scale / 2.1);
  const size = 9 * point.scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-size, -size);
  ctx.lineTo(size, size);
  ctx.moveTo(-size, size);
  ctx.lineTo(size, -size);
  ctx.moveTo(-size, 0);
  ctx.lineTo(size, 0);
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.stroke();
  ctx.restore();
}

function drawHuntingKnifeProjectile({ projectile, point, viewport }) {
  const next = getProjectilePoint(projectile, Math.min(1, projectile.progress + 0.03));
  const nextPoint = worldToScreen(next.x, next.y, viewport);
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(angle);
  ctx.strokeStyle = "#4c331b";
  ctx.lineWidth = Math.max(1.6, 2.2 * point.scale / 2.1);
  ctx.beginPath();
  ctx.moveTo(-8 * point.scale / 2.1, 0);
  ctx.lineTo(7 * point.scale / 2.1, 0);
  ctx.stroke();
  ctx.fillStyle = "#d8d3c4";
  ctx.beginPath();
  ctx.moveTo(8 * point.scale / 2.1, 0);
  ctx.lineTo(1.5 * point.scale / 2.1, -3.6 * point.scale / 2.1);
  ctx.lineTo(1.5 * point.scale / 2.1, 3.6 * point.scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(214, 184, 166, 0.56)";
  ctx.lineWidth = Math.max(1, 1.2 * point.scale / 2.1);
  ctx.beginPath();
  ctx.moveTo(-6 * point.scale / 2.1, -2.8 * point.scale / 2.1);
  ctx.lineTo(-1.5 * point.scale / 2.1, 0);
  ctx.lineTo(-6 * point.scale / 2.1, 2.8 * point.scale / 2.1);
  ctx.stroke();
  ctx.restore();
}

function drawCatapultProjectile({ projectile, point, viewport }) {
  const ground = getProjectileGroundPoint(projectile, projectile.progress);
  const groundPoint = worldToScreen(ground.x, ground.y, viewport);
  const altitude = Math.max(0, groundPoint.y - point.y);
  const shadowScale = clamp(1 - altitude / 140, 0.36, 1);
  ctx.fillStyle = `rgba(0,0,0,${0.24 * shadowScale})`;
  ctx.beginPath();
  ctx.ellipse(groundPoint.x, groundPoint.y + 3 * groundPoint.scale / 2.1, 10 * groundPoint.scale / 2.1 * shadowScale, 5 * groundPoint.scale / 2.1 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(projectile.progress * projectile.spin);
  ctx.fillStyle = "#6f6254";
  ctx.beginPath();
  ctx.arc(0, 0, 9 * point.scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.beginPath();
  ctx.arc(-2.5 * point.scale / 2.1, -3 * point.scale / 2.1, 3 * point.scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#4d4136";
  ctx.lineWidth = 2 * point.scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-5 * point.scale / 2.1, -2 * point.scale / 2.1);
  ctx.lineTo(3 * point.scale / 2.1, 5 * point.scale / 2.1);
  ctx.moveTo(4 * point.scale / 2.1, -4 * point.scale / 2.1);
  ctx.lineTo(-3 * point.scale / 2.1, 2 * point.scale / 2.1);
  ctx.stroke();
  ctx.restore();
}

function drawOrbProjectile({ point }) {
  const gradient = ctx.createRadialGradient(point.x, point.y, 1, point.x, point.y, 10 * point.scale / 2.1);
  gradient.addColorStop(0, "#e0ffff");
  gradient.addColorStop(1, "#49bedd");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 8 * point.scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
}

function getProjectilePoint(projectile, progress) {
  const x = lerp(projectile.startX, projectile.endX, progress);
  const yBase = lerp(projectile.startY, projectile.endY, progress);
  return { x, y: yBase - Math.sin(progress * Math.PI) * (getProjectileDefinition(projectile)?.arcHeight || 26) };
}

function getProjectileGroundPoint(projectile, progress) {
  return {
    x: lerp(projectile.startX, projectile.endX, progress),
    y: lerp(projectile.startY, projectile.endY, progress),
  };
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
  const cullBounds = getViewportWorldBounds(viewport, 150);
  const livingUnits = factions.flatMap((faction) => faction.units
    .filter((unit) => !unit.dead && !unit.fled && !(unit.type === "phantom" && unit.possessedUnitId))
    .map((unit) => ({ ...unit, factionColor: getUnitDisplayFactionColor(unit, state.battle) || faction.color })));
  const units = buildVisibleUnitRenderEntries(viewport, livingUnits, cullBounds);
  state.renderDebug.totalUnits = livingUnits.length;
  state.renderDebug.visibleUnits = units.length;
  state.renderDebug.culledUnits = Math.max(0, livingUnits.length - units.length);
  state.renderDebug.overlapShadowCasters = units.reduce((total, entry) => total + (entry.rearShadowStrength > 0 ? 1 : 0), 0);
  units.forEach((entry) => drawSingleUnit(viewport, entry.unit, entry));
}

function drawDepthSortedGroundEntities(viewport, battle) {
  const cullBounds = getViewportWorldBounds(viewport, 150);
  const visibleBanners = battle.factions.filter((faction) =>
    faction.alive
    && !faction.excludeFromResults
    && faction.bannerPos.x >= cullBounds.minX - 60
    && faction.bannerPos.x <= cullBounds.maxX + 60
    && faction.bannerPos.y >= cullBounds.minY - 120
    && faction.bannerPos.y <= cullBounds.maxY + 120);
  const livingUnits = battle.factions.flatMap((faction) => faction.units
    .filter((unit) => !unit.dead && !unit.fled && !(unit.type === "phantom" && unit.possessedUnitId))
    .map((unit) => ({ ...unit, factionColor: getUnitDisplayFactionColor(unit, battle) || faction.color })));
  const visibleUnits = buildVisibleUnitRenderEntries(viewport, livingUnits, cullBounds);
  const visibleProps = (battle.props || []).filter((prop) =>
    prop.x >= cullBounds.minX - 60
    && prop.x <= cullBounds.maxX + 60
    && prop.y >= cullBounds.minY - 60
    && prop.y <= cullBounds.maxY + 60);
  const visibleGraves = (battle.graves || []).filter((grave) =>
    grave.x >= cullBounds.minX - 60
    && grave.x <= cullBounds.maxX + 60
    && grave.y >= cullBounds.minY - 60
    && grave.y <= cullBounds.maxY + 60);
  state.renderDebug.totalUnits = livingUnits.length;
  state.renderDebug.visibleUnits = visibleUnits.length;
  state.renderDebug.culledUnits = Math.max(0, livingUnits.length - visibleUnits.length);
  state.renderDebug.overlapShadowCasters = visibleUnits.reduce((total, entry) => total + (entry.rearShadowStrength > 0 ? 1 : 0), 0);

  const drawEntries = [
    ...visibleProps.map((prop, index) => ({ kind: "prop", sortY: getGroundPropSortDepth(viewport, prop), index, prop })),
    ...visibleGraves.map((grave, index) => ({ kind: "grave", sortY: getGraveSortDepth(viewport, grave), index, grave })),
    ...visibleBanners.map((faction, index) => ({ kind: "banner", sortY: getBannerSortDepth(viewport, faction), index, faction })),
    ...visibleUnits.map((entry, index) => ({ kind: "unit", sortY: entry.sortY, index, unit: entry.unit, unitRenderEntry: entry })),
  ].sort((a, b) => {
    if (a.sortY !== b.sortY) return a.sortY - b.sortY;
    if (a.kind !== b.kind) {
      const priority = { prop: 0, grave: 1, banner: 2, unit: 3 };
      return (priority[a.kind] ?? 99) - (priority[b.kind] ?? 99);
    }
    return a.index - b.index;
  });

  drawEntries.forEach((entry) => {
    if (entry.kind === "prop") {
      drawSingleGroundProp(viewport, entry.prop);
    } else if (entry.kind === "grave") {
      drawSingleGrave(viewport, entry.grave);
    } else if (entry.kind === "banner") {
      drawSingleBanner(viewport, entry.faction);
    } else {
      drawSingleUnit(viewport, entry.unit, entry.unitRenderEntry);
    }
  });
}

function buildVisibleUnitRenderEntries(viewport, livingUnits, cullBounds = getViewportWorldBounds(viewport, 150)) {
  const visibleUnits = livingUnits
    .filter((unit) => isUnitInViewport(unit, cullBounds))
    .map((unit) => {
      const pose = getUnitRenderPose(unit, viewport);
      const layout = getUnitVisualSortLayout(unit);
      const renderScale = pose.scale * getUnitRenderScale(unit);
      const baseHeight = layout?.height || (unit.type === "inklord" ? 74 : 39);
      const shadowRenderScale = renderScale * getLayoutHeightScale(layout);
      const sortY = getUnitSortDepth(viewport, unit, pose, renderScale, layout);
      return {
        unit,
        sortY,
        pointX: pose.point.x,
        pointY: pose.point.y,
        bodyY: pose.bodyY,
        scale: pose.scale,
        renderScale,
        shadowRenderScale,
        overlapRadiusX: Math.max(12, baseHeight * renderScale / 5.8),
        overlapRadiusY: Math.max(18, baseHeight * renderScale / 3.5),
        clipCenterY: unit.type === "inklord"
          ? pose.bodyY - 42 * renderScale / 2.1
          : pose.bodyY - 10 * renderScale / 2.1,
        clipRadiusX: Math.max(14, (unit.type === "inklord" ? 34 : 16) * renderScale / 2.1),
        clipRadiusY: Math.max(18, (unit.type === "inklord" ? 54 : 24) * renderScale / 2.1),
        rearShadowStrength: 0,
        rearShadowTargets: [],
      };
    })
    .sort((a, b) => a.sortY - b.sortY);
  if (!state.useUnitOverlapShadows) return visibleUnits;
  visibleUnits.forEach((entry, index) => {
    let overlapCount = 0;
    for (let offset = 1; offset <= UNIT_OVERLAP_SHADOW_NEIGHBOR_LIMIT; offset += 1) {
      const other = visibleUnits[index - offset];
      if (!other) break;
      const depthGap = entry.sortY - other.sortY;
      const yLimit = Math.max(entry.overlapRadiusY, other.overlapRadiusY) * 0.92;
      if (depthGap > yLimit) break;
      const xLimit = (entry.overlapRadiusX + other.overlapRadiusX) * 0.82;
      if (Math.abs(entry.pointX - other.pointX) > xLimit) continue;
      overlapCount += 1;
      entry.rearShadowTargets.push(other);
    }
    if (overlapCount > 0) {
      entry.rearShadowStrength = clamp(
        UNIT_OVERLAP_SHADOW_BASE_ALPHA + overlapCount * UNIT_OVERLAP_SHADOW_ALPHA_STEP,
        0,
        UNIT_OVERLAP_SHADOW_MAX_ALPHA,
      );
    }
  });
  return visibleUnits;
}

function drawUnitRearOverlapShadow(unit, renderEntry) {
  const shadowTargets = renderEntry?.rearShadowTargets || [];
  if (!shadowTargets.length || (renderEntry?.rearShadowStrength || 0) <= 0.01) return;
  const unitDef = getUnitDefinition(unit);
  const receiverAlpha = unitDef.getRenderAlpha ? unitDef.getRenderAlpha(unit, unitDef) : 1;
  if (receiverAlpha <= 0.01) return;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    renderEntry.pointX,
    renderEntry.clipCenterY,
    renderEntry.clipRadiusX,
    renderEntry.clipRadiusY,
    0,
    0,
    Math.PI * 2,
  );
  ctx.clip();
  ctx.globalCompositeOperation = "multiply";
  shadowTargets.forEach((target) => {
    const depthGap = renderEntry.sortY - target.sortY;
    const yLimit = Math.max(renderEntry.overlapRadiusY, target.overlapRadiusY) * 0.92;
    const closeness = 1 - clamp(depthGap / Math.max(1, yLimit), 0, 1);
    if (closeness <= 0.02) return;
    const alpha = receiverAlpha * clamp(
      UNIT_OVERLAP_SHADOW_BASE_ALPHA + (closeness * UNIT_OVERLAP_SHADOW_ALPHA_STEP),
      0,
      UNIT_OVERLAP_SHADOW_MAX_ALPHA,
    );
    const shadowScale = target.shadowRenderScale || target.renderScale;
    const rawRadiusX = UNIT_OVERLAP_SHADOW_RADIUS_X * shadowScale / 2.1;
    const rawRadiusY = UNIT_OVERLAP_SHADOW_RADIUS_Y * shadowScale / 2.1;
    if (rawRadiusX <= 10 || rawRadiusY <= 14) return;
    const radiusX = rawRadiusX;
    const radiusY = rawRadiusY;
    ctx.save();
    ctx.translate(target.pointX, target.clipCenterY);
    ctx.scale(radiusX, radiusY);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    gradient.addColorStop(0, hexToRgba(UNIT_OVERLAP_SHADOW_TINT, alpha));
    gradient.addColorStop(0.42, hexToRgba(UNIT_OVERLAP_SHADOW_TINT, alpha * 0.72));
    gradient.addColorStop(0.76, hexToRgba(UNIT_OVERLAP_SHADOW_TINT, alpha * 0.22));
    gradient.addColorStop(1, hexToRgba(UNIT_OVERLAP_SHADOW_TINT, 0));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

function drawSingleUnit(viewport, unit, renderEntry = null) {
  const unitDef = getUnitDefinition(unit);
  const { pose, renderScale, healthBarY, healthBarX, hpWidth } = getUnitHoverMetrics(unit, viewport);
  const { point, scale, bodyY } = pose;
  const strideMotion = getUnitStrideMotionOffset(unit, scale);
  const main = unit.factionColor;
  const dark = shadeColor(main, -0.28);
  const light = shadeColor(main, 0.26);
  const isHovered = state.hover.focusedUnitId === unit.id && state.hover.shiftHeld;
  if (getUnitStatus(unit, "immobilized")) {
    drawImmobilizedGroundNet(point, scale, unit);
  }
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(point.x, point.y + 10 * scale / 2.1, (10 + Math.abs(unit.stride) * 1.6) * renderScale / 2.1, (5 - unit.bob * 0.9) * renderScale / 2.1, 0, 0, Math.PI * 2);
  ctx.fill();
  if (unit.type === "inklord") {
    drawInkLordGroundAura(point, scale, unit);
  }
  if (isHovered) drawHoveredUnitGlow(unit, pose, renderScale, light);
  if ((renderEntry?.rearShadowStrength || 0) > 0) {
    drawUnitRearOverlapShadow(unit, renderEntry);
  }
  ctx.save();
  ctx.globalAlpha = unitDef.getRenderAlpha ? unitDef.getRenderAlpha(unit, unitDef) : 1;
  ctx.translate(point.x + strideMotion.x, bodyY + strideMotion.y);
  ctx.rotate((unit.walkTilt || 0) + (unit.rotation || 0));
  ctx.scale(unit.displayFacingX, 1);
  if (!drawUnitSprite(unit, main, scale)) {
    unitDef.render?.(main, dark, light, renderScale, unit);
  }
  drawUnitStatusOverlay(unit, renderScale);
  ctx.restore();
  drawUnitStatusBadges(unit, point.x + 16 * renderScale / 2.1, bodyY - 30 * renderScale / 2.1, scale);
  if (state.hover.inspectSlowActive || state.alwaysShowHealthbars) {
    ctx.fillStyle = "rgba(37,24,16,0.5)";
    ctx.fillRect(healthBarX - hpWidth / 2, healthBarY, hpWidth, 4 * scale / 2.1);
    ctx.fillStyle = unit.health / unit.maxHealth > 0.4 ? "#9ae085" : "#e7915d";
    ctx.fillRect(healthBarX - hpWidth / 2, healthBarY, hpWidth * (unit.health / unit.maxHealth), 4 * scale / 2.1);
  }
  if (isHovered) drawHoveredUnitLabels(unit, pose, renderScale, healthBarX, healthBarY, hpWidth);
}

function getGroundPropSortDepth(viewport, prop) {
  return worldToScreen(prop.x, prop.y, viewport).y;
}

function getGraveSortDepth(viewport, grave) {
  const point = worldToScreen(grave.x, grave.y, viewport);
  const imageGrave = grave.renderMode === "image" ? grave.asset : null;
  if (imageGrave?.image?.complete) {
    const renderScale = Math.min(1, grave.imageScale || GROUND_PROP_IMAGE_SCALE) * point.scale * (grave.scale || 1) * GRAVE_RENDER_SCALE;
    const lowestOpaquePixel = imageGrave.lowestOpaquePixel ?? Math.max(0, (imageGrave.height || 1) - 1);
    const imageHeight = Math.max(1, imageGrave.height || 1) * renderScale;
    const lowestOpaqueOffset = Math.max(0, Math.min(imageHeight, (lowestOpaquePixel + 1) * renderScale));
    return (point.y - imageHeight) + lowestOpaqueOffset;
  }
  return point.y + 2 * point.scale / 2.1 * GRAVE_RENDER_SCALE;
}

function getBannerSortDepth(viewport, faction) {
  const point = worldToScreen(faction.bannerPos.x, faction.bannerPos.y, viewport);
  const scale = point.scale;
  const clothHeight = 92 * scale / 2.1;
  const clothTop = point.y - 2 * scale / 2.1;
  return clothTop + clothHeight;
}

function getUnitSortDepth(viewport, unit, pose = null, renderScale = null, layout = null) {
  const resolvedPose = pose || getUnitRenderPose(unit, viewport);
  const resolvedRenderScale = renderScale ?? (resolvedPose.scale * getUnitRenderScale(unit));
  const resolvedLayout = layout || getUnitVisualSortLayout(unit);
  const layoutBottom = resolvedLayout
    ? resolvedPose.bodyY + (((resolvedLayout.height || DEFAULT_RIG_LAYOUT.height) * resolvedRenderScale / 2.1) * (1 - (resolvedLayout.anchorY ?? DEFAULT_RIG_LAYOUT.anchorY)))
    : -Infinity;
  const groundedFallback = resolvedPose.bodyY + getUnitGroundedBottomOffset(unit, resolvedRenderScale);
  return Math.max(layoutBottom, groundedFallback);
}

function getUnitVisualSortLayout(unit) {
  const rigSource = state.useRiggedSprites ? getRiggedUnitSpriteSource(unit?.type) : null;
  if (rigSource?.status === "loaded" && rigSource.manifest?.layout) {
    return rigSource.manifest.layout;
  }
  return UNIT_SPRITE_LAYOUTS[unit?.type] || null;
}

function getUnitGroundedBottomOffset(unit, renderScale) {
  if (unit?.type === "inklord") return 18 * renderScale / 2.1;
  if (unit?.type === "spiderswarm") return 9 * renderScale / 2.1;
  if (unit?.type === "turret") return 8 * renderScale / 2.1;
  return 12 * renderScale / 2.1;
}

function drawRenderDebugOverlay() {
  const {
    visibleUnits,
    culledUnits,
    totalUnits,
    overlapShadowCasters,
    fps,
  } = state.renderDebug;
  const lines = [
    `FPS: ${fps.toFixed(1)}`,
    `Units drawn: ${visibleUnits}`,
    `Units culled: ${culledUnits}`,
    `Units total: ${totalUnits}`,
    `Overlap shadows: ${overlapShadowCasters}`,
  ];
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "10px monospace";
  const padding = 6;
  const lineHeight = 12;
  const width = lines.reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0) + padding * 2;
  const height = lines.length * lineHeight + padding * 2;
  ctx.fillStyle = "rgba(12, 10, 16, 0.68)";
  ctx.fillRect(8, 8, width, height);
  ctx.strokeStyle = "rgba(255, 245, 220, 0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(8.5, 8.5, width - 1, height - 1);
  ctx.fillStyle = "#f2e6c9";
  lines.forEach((line, index) => {
    ctx.fillText(line, 8 + padding, 8 + padding + index * lineHeight);
  });
  ctx.restore();
}

function drawImmobilizedGroundNet(point, scale, unit) {
  const pulse = 0.5 + Math.max(0, Math.sin((state.battle?.time || 0) * 5.1 + unit.statusVisualSeed)) * 0.3;
  const radiusX = 17 * scale / 2.1;
  const radiusY = 8 * scale / 2.1;
  const centerY = point.y + 10 * scale / 2.1;
  ctx.save();
  ctx.strokeStyle = `rgba(179, 225, 240, ${0.54 + pulse * 0.14})`;
  ctx.lineWidth = Math.max(1.1, 1.7 * scale / 2.1);
  ctx.beginPath();
  ctx.ellipse(point.x, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
  for (let index = -2; index <= 2; index += 1) {
    const offset = index * 5.5 * scale / 2.1;
    ctx.beginPath();
    ctx.moveTo(point.x - radiusX * 0.82, centerY + offset * 0.32);
    ctx.lineTo(point.x + radiusX * 0.82, centerY - offset * 0.32);
    ctx.stroke();
  }
  for (let index = -1; index <= 1; index += 1) {
    const offset = index * 7 * scale / 2.1;
    ctx.beginPath();
    ctx.moveTo(point.x + offset, centerY - radiusY * 0.9);
    ctx.lineTo(point.x - offset, centerY + radiusY * 0.9);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHoveredUnitGlow(unit, pose, renderScale, glowColor) {
  const pulse = 0.55 + Math.max(0, Math.sin((state.battle?.time || 0) * 5.4 + unit.statusVisualSeed)) * 0.35;
  const radiusX = (unit.type === "inklord" ? 34 : 17) * renderScale / 2.1;
  const radiusY = (unit.type === "inklord" ? 54 : 25) * renderScale / 2.1;
  ctx.save();
  ctx.shadowColor = hexToRgba(glowColor, 0.9);
  ctx.shadowBlur = 20 * renderScale / 2.1;
  ctx.strokeStyle = hexToRgba(glowColor, 0.45 + pulse * 0.28);
  ctx.lineWidth = Math.max(2, 3 * renderScale / 2.1);
  ctx.beginPath();
  ctx.ellipse(pose.point.x, pose.bodyY - 10 * renderScale / 2.1, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = hexToRgba(glowColor, 0.08 + pulse * 0.08);
  ctx.fill();
  ctx.restore();
}

function drawHoveredUnitLabels(unit, pose, renderScale, healthBarX, healthBarY, hpWidth) {
  const name = `${getUnitDefinition(unit).name}${unit.veteran ? " Veteran" : ""}`;
  const healthText = `${formatHoverStatNumber(unit.health)} / ${formatHoverStatNumber(unit.maxHealth)}`;
  const paddingX = 8 * pose.scale / 2.1;
  const pillHeight = 16 * pose.scale / 2.1;
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${Math.max(10, 12 * pose.scale / 2.1)}px Manrope`;
  const nameWidth = ctx.measureText(name).width + paddingX * 2;
  roundRect(ctx, pose.point.x - nameWidth / 2, healthBarY - 28 * pose.scale / 2.1, nameWidth, pillHeight, 999);
  ctx.fillStyle = "rgba(28, 22, 16, 0.86)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 236, 196, 0.22)";
  ctx.lineWidth = 1.2 * pose.scale / 2.1;
  ctx.stroke();
  ctx.fillStyle = "#fff6e6";
  ctx.fillText(name, pose.point.x, healthBarY - 20 * pose.scale / 2.1);
  roundRect(ctx, healthBarX - hpWidth / 2, healthBarY - 13 * pose.scale / 2.1, hpWidth, pillHeight, 999);
  ctx.fillStyle = "rgba(22, 18, 14, 0.9)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 236, 196, 0.16)";
  ctx.stroke();
  ctx.fillStyle = "#fff0dc";
  ctx.font = `700 ${Math.max(9, 10 * pose.scale / 2.1)}px Manrope`;
  ctx.fillText(healthText, healthBarX, healthBarY - 5 * pose.scale / 2.1);
  ctx.restore();
}

function drawInkLordGroundAura(point, scale, unit) {
  const battleTime = state.battle?.time || 0;
  const pulse = 0.22 + Math.max(0, Math.sin(battleTime * 3.6 + unit.statusVisualSeed * 0.5)) * 0.18;
  const radiusX = 44 * scale / 2.1;
  const radiusY = 14 * scale / 2.1;
  const centerY = point.y + 13 * scale / 2.1;
  ctx.save();
  ctx.fillStyle = `rgba(12, 10, 19, ${0.26 + pulse * 0.12})`;
  ctx.beginPath();
  ctx.ellipse(point.x, centerY + 2 * scale / 2.1, radiusX * 1.18, radiusY * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(104, 87, 255, ${0.08 + pulse * 0.09})`;
  ctx.beginPath();
  ctx.ellipse(point.x, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(174, 158, 255, ${0.18 + pulse * 0.16})`;
  ctx.lineWidth = 1.8 * scale / 2.1;
  ctx.beginPath();
  ctx.ellipse(point.x, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = `rgba(73, 63, 120, ${0.42 + pulse * 0.18})`;
  ctx.lineWidth = 1.2 * scale / 2.1;
  for (let i = 0; i < 6; i += 1) {
    const start = (battleTime * 0.7) + (i * Math.PI / 3);
    const end = start + 0.45;
    ctx.beginPath();
    ctx.ellipse(point.x, centerY, radiusX * 0.84, radiusY * 0.84, 0, start, end);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBossBubbles(viewport, battle) {
  (battle.bossBubbles || []).forEach((bubble) => {
    const source = findUnitById(battle, bubble.sourceId);
    if (!source || source.dead || source.fled) return;
    const pose = getUnitRenderPose(source, viewport);
    const alpha = clamp(1 - (bubble.age / bubble.life), 0, 1);
    const x = pose.point.x + 56 * pose.scale / 2.1;
    const y = pose.bodyY - 124 * pose.scale / 2.1 - (bubble.rise || 0) * pose.scale / 2.1;
    const maxWidth = 280 * pose.scale / 2.1;
    const paddingX = 12 * pose.scale / 2.1;
    const paddingY = 8 * pose.scale / 2.1;
    const lineHeight = 16 * pose.scale / 2.1;
    const fontSize = Math.max(10, 12 * pose.scale / 2.1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `700 ${fontSize}px Manrope`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const lines = wrapCanvasText(bubble.text, maxWidth - paddingX * 2);
    const widestLine = Math.max(...lines.map((line) => ctx.measureText(line).width), 0);
    const bubbleWidth = Math.min(maxWidth, widestLine + paddingX * 2);
    const bubbleHeight = Math.max(lineHeight + paddingY * 2, lines.length * lineHeight + paddingY * 2);
    const left = clamp(x, 10 * pose.scale / 2.1, viewport.width - bubbleWidth - 10 * pose.scale / 2.1);
    const top = y - bubbleHeight;
    roundRect(ctx, left, top, bubbleWidth, bubbleHeight, 12 * pose.scale / 2.1);
    ctx.fillStyle = "rgba(250, 245, 255, 0.94)";
    ctx.fill();
    ctx.strokeStyle = "rgba(80, 63, 126, 0.95)";
    ctx.lineWidth = 2 * pose.scale / 2.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left + 18 * pose.scale / 2.1, top + bubbleHeight);
    ctx.lineTo(left + 28 * pose.scale / 2.1, top + bubbleHeight + 10 * pose.scale / 2.1);
    ctx.lineTo(left + 34 * pose.scale / 2.1, top + bubbleHeight - 1 * pose.scale / 2.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2c223b";
    lines.forEach((line, index) => {
      ctx.fillText(line, left + paddingX, top + paddingY + index * lineHeight);
    });
    ctx.restore();
  });
}

function wrapCanvasText(text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    if (ctx.measureText(word).width > maxWidth) {
      const broken = breakCanvasWord(word, maxWidth);
      if (line) {
        lines.push(line);
        line = "";
      }
      lines.push(...broken.slice(0, -1));
      line = broken[broken.length - 1] || "";
      return;
    }
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [String(text || "")];
}

function breakCanvasWord(word, maxWidth) {
  const chars = Array.from(String(word || ""));
  const parts = [];
  let current = "";
  chars.forEach((char) => {
    const next = `${current}${char}`;
    if (current && ctx.measureText(next).width > maxWidth) {
      parts.push(current);
      current = char;
    } else {
      current = next;
    }
  });
  if (current) parts.push(current);
  return parts.length ? parts : [word];
}

function roundRect(context, x, y, width, height, radius) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawBodyguardAuras(viewport, factions) {
  const battleTime = state.battle?.time || 0;
  const pulse = Math.sin(2 * battleTime) ** 6;
  factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled || unit.type !== "bodyguard") return;
      const point = worldToScreen(unit.x, unit.y, viewport);
      const stats = getUnitStats(unit);
      const radius = stats.auraRadius * point.scale;
      ctx.save();
      ctx.lineCap = "round";
      ctx.setLineDash([10 * point.scale, 7 * point.scale]);
      ctx.strokeStyle = hexToRgba(faction.color, pulse * 0.42);
      ctx.lineWidth = Math.max(1.4, (pulse * 0.9) * point.scale);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = hexToRgba(shadeColor(faction.color, 0.18), pulse * 0.09);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  });
}

function getBardSongVisuals(songKind) {
  if (songKind === "bardicvalor") return { color: "#ffb46a", fill: "rgba(255, 191, 120, 0.1)" };
  if (songKind === "bardicguard") return { color: "#d79bff", fill: "rgba(214, 155, 255, 0.1)" };
  return { color: "#86dcff", fill: "rgba(134, 220, 255, 0.1)" };
}

function drawMusicNote(x, y, scale, color, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  // Normalize the scale to match the footprint of the original script
  const s = scale / 2.1;

  // 1. Define dimensions and coordinates
  const radiusX = 1.6 * s;
  const radiusY = 1.1 * s;
  const tilt = -0.4; // Tilt noteheads by approx -23 degrees

  const head1X = -2.8 * s;
  const head1Y = 3.0 * s;
  const head2X = 2.8 * s;
  const head2Y = 1.5 * s;

  const stemWidth = 0.5 * s;
  const beamHeight = 1.5 * s;

  // Stems attach to the right side of the noteheads
  const stem1X = head1X + 1.3 * s;
  const stem2X = head2X + 1.3 * s;

  // Tops of the stems (right stem is higher to angle the beam)
  const stem1TopY = -4.5 * s;
  const stem2TopY = -6.0 * s;

  // 2. Draw Stems
  ctx.lineWidth = stemWidth;
  ctx.lineCap = "butt"; // Flat caps so they merge into the beam seamlessly
  ctx.beginPath();
  ctx.moveTo(stem1X, head1Y);
  ctx.lineTo(stem1X, stem1TopY);
  ctx.moveTo(stem2X, head2Y);
  ctx.lineTo(stem2X, stem2TopY);
  ctx.stroke();

  // 3. Draw the Beam (Thick filled polygon)
  ctx.beginPath();
  ctx.moveTo(stem1X - stemWidth / 2, stem1TopY);              // Top-left
  ctx.lineTo(stem2X + stemWidth / 2, stem2TopY);              // Top-right
  ctx.lineTo(stem2X + stemWidth / 2, stem2TopY + beamHeight); // Bottom-right
  ctx.lineTo(stem1X - stemWidth / 2, stem1TopY + beamHeight); // Bottom-left
  ctx.closePath();
  ctx.fill();

  // 4. Draw Noteheads (Drawn last so they cleanly overlap the bottoms of the stems)
  ctx.beginPath();
  // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
  ctx.ellipse(head1X, head1Y, radiusX, radiusY, tilt, 0, Math.PI * 2);
  ctx.ellipse(head2X, head2Y, radiusX, radiusY, tilt, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBardAuras(viewport, factions) {
  const battleTime = state.battle?.time || 0;
  const pulse = Math.sin(2 * battleTime) ** 6;
  factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled || unit.type !== "bard") return;
      const point = worldToScreen(unit.x, unit.y, viewport);
      const stats = getUnitStats(unit);
      const radius = stats.auraRadius * point.scale;
      const songKind = unit.activeSongKind || "bardichaste";
      const visuals = getBardSongVisuals(songKind);
      ctx.save();
      ctx.setLineDash([8 * point.scale, 6 * point.scale]);
      ctx.strokeStyle = hexToRgba(visuals.color, pulse * 0.42);
      ctx.lineWidth = Math.max(1.4, (pulse * 0.9) * point.scale);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = hexToRgba(visuals.color, pulse * 0.09);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 3; i += 1) {
        const orbit = battleTime * (1.4 + i * 0.22) + unit.statusVisualSeed + i * (Math.PI * 2 / 3);
        const noteRadius = (18 + i * 8) * point.scale / 2.1;
        drawMusicNote(
          point.x + Math.cos(orbit) * noteRadius,
          point.y - 18 * point.scale / 2.1 + Math.sin(orbit * 0.9) * 10 * point.scale / 2.1,
          point.scale * (0.85 + i * 0.08),
          hexToRgba(visuals.color, 0.72),
          Math.sin(orbit) * 0.18,
        );
      }
      ctx.restore();
    });
  });
}

function drawNecromancerLinks(viewport, battle) {
  battle.factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled || unit.type !== "necromancer") return;
      getLivingThrallIds(unit, battle).forEach((thrallId, index, thrallIds) => {
        const thrall = findUnitById(battle, thrallId);
        if (!thrall || thrall.dead || thrall.fled) return;
        const sourcePose = getUnitRenderPose(unit, viewport);
        const targetPose = getUnitRenderPose(thrall, viewport);
        const baseScale = Math.min(sourcePose.scale, targetPose.scale) / 2.1;
        const dx = targetPose.point.x - sourcePose.point.x;
        const dy = targetPose.bodyY - sourcePose.bodyY;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const normalX = -dy / distance;
        const normalY = dx / distance;
        const laneIndex = index - (thrallIds.length - 1) / 2;
        const sideBias = laneIndex === 0 ? (Math.sin(unit.statusVisualSeed + thrall.statusVisualSeed) >= 0 ? 1 : -1) : Math.sign(laneIndex);
        const laneSpread = Math.min(28, 8 + Math.abs(laneIndex) * 10) * baseScale;
        const drift = Math.sin((battle.time * 3.8) + unit.statusVisualSeed * 0.7 + thrall.statusVisualSeed) * 5.5 * baseScale;
        const startX = sourcePose.point.x + normalX * laneSpread * sideBias;
        const startY = sourcePose.bodyY - 12 * sourcePose.scale / 2.1 + normalY * laneSpread * 0.35 * sideBias;
        const endX = targetPose.point.x + normalX * laneSpread * sideBias * 0.55;
        const endY = targetPose.bodyY - 9 * targetPose.scale / 2.1 + normalY * laneSpread * 0.28 * sideBias;
        const midpointX = (startX + endX) / 2;
        const midpointY = (startY + endY) / 2;
        const controlLift = Math.min(24, distance * 0.08) * baseScale;
        const control1X = midpointX + normalX * (16 * baseScale + laneSpread * 0.55) * sideBias + drift;
        const control1Y = midpointY - controlLift - 12 * baseScale + normalY * 7 * baseScale * sideBias;
        const control2X = midpointX + normalX * (22 * baseScale + laneSpread * 0.85) * sideBias - drift * 0.45;
        const control2Y = midpointY + controlLift + 8 * baseScale + normalY * 10 * baseScale * sideBias;
        const pulseBase = Math.max(0, Math.sin(2 * battle.time + unit.statusVisualSeed * 0.12 + thrall.statusVisualSeed * 0.08));
        const pulseAlpha = pulseBase ** 10;
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(17, 8, 22, ${0.9 * pulseAlpha})`;
        ctx.lineWidth = 2.4 * baseScale;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
        ctx.stroke();

        ctx.strokeStyle = `rgba(87, 48, 102, ${0.56 * pulseAlpha})`;
        ctx.lineWidth = 1.15 * baseScale;
        ctx.stroke();

        const knotCount = Math.max(2, Math.min(5, Math.round(distance / 150) + 1));
        for (let knotIndex = 1; knotIndex <= knotCount; knotIndex += 1) {
          const t = knotIndex / (knotCount + 1);
          const point = getCubicBezierPoint(
            startX,
            startY,
            control1X,
            control1Y,
            control2X,
            control2Y,
            endX,
            endY,
            t,
          );
          const radius = (2.3 - t * 0.65) * baseScale;
          ctx.fillStyle = `rgba(31, 15, 37, ${(0.82 - t * 0.12) * pulseAlpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(120, 80, 138, ${(0.24 - t * 0.03) * pulseAlpha})`;
          ctx.lineWidth = 0.7 * baseScale;
          ctx.stroke();
        }
        ctx.restore();
      });
    });
  });
}

function drawUnitStatusOverlay(unit, scale) {
  const battleTime = state.battle?.time || 0;
  const poisonStacks = getStatusStacks(unit, "poison");
  if (poisonStacks > 0) {
    const poisonPulse = Math.max(0, Math.sin(battleTime * 8 + unit.statusVisualSeed));
    if (poisonPulse > 0.7) {
      ctx.fillStyle = `rgba(126, 234, 132, ${(poisonPulse - 0.68) * 0.35})`;
      ctx.beginPath();
      ctx.ellipse(0, -2 * scale / 2.1, 12 * scale / 2.1, 18 * scale / 2.1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const igniteStacks = getStatusStacks(unit, "ignite");
  if (igniteStacks > 0) {
    const ignitePulse = 0.18 + Math.max(0, Math.sin(battleTime * 12 + unit.statusVisualSeed * 1.7)) * 0.22;
    ctx.fillStyle = `rgba(255, 171, 82, ${ignitePulse})`;
    ctx.beginPath();
    ctx.ellipse(0, -1 * scale / 2.1, 13 * scale / 2.1, 19 * scale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (getStatusStacks(unit, "zombie") > 0) {
    const zombiePulse = 0.16 + Math.max(0, Math.sin(battleTime * 5 + unit.statusVisualSeed * 0.8)) * 0.14;
    ctx.fillStyle = `rgba(118, 145, 88, ${zombiePulse})`;
    ctx.beginPath();
    ctx.ellipse(0, 1 * scale / 2.1, 12 * scale / 2.1, 17 * scale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (getStatusStacks(unit, "shielded") > 0) {
    const shieldPulse = 0.12 + Math.max(0, Math.sin(battleTime * 6 + unit.statusVisualSeed * 0.6)) * 0.16;
    ctx.strokeStyle = `rgba(142, 227, 255, ${shieldPulse + 0.12})`;
    ctx.lineWidth = 1.4 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -3 * scale / 2.1, 14 * scale / 2.1, 0.18, Math.PI - 0.18);
    ctx.stroke();
  }
  if (getStatusStacks(unit, "bardichaste") > 0) {
    ctx.strokeStyle = "rgba(134, 218, 255, 0.34)";
    ctx.lineWidth = 1.2 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 15 * scale / 2.1, Math.PI * 0.08, Math.PI * 0.92);
    ctx.stroke();
  }
  if (getStatusStacks(unit, "bardicvalor") > 0) {
    ctx.strokeStyle = "rgba(255, 188, 110, 0.36)";
    ctx.lineWidth = 1.2 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 16 * scale / 2.1, Math.PI * 1.06, Math.PI * 1.94);
    ctx.stroke();
  }
  if (getStatusStacks(unit, "bardicguard") > 0) {
    ctx.strokeStyle = "rgba(219, 162, 255, 0.34)";
    ctx.lineWidth = 1.2 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -3 * scale / 2.1, 13 * scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (getStatusStacks(unit, "possessed") > 0) {
    const possessor = state.battle ? getPossessingPhantom(unit, state.battle) : null;
    const possessorFaction = possessor && state.battle ? findFaction(state.battle, possessor.factionId) : null;
    const glowColor = possessorFaction?.color || "#9f87ff";
    const possessPulse = 0.18 + Math.max(0, Math.sin(battleTime * 6.4 + unit.statusVisualSeed * 1.4)) * 0.18;
    ctx.shadowColor = hexToRgba(glowColor, 0.55 + possessPulse * 0.25);
    ctx.shadowBlur = 14 * scale / 2.1;
    ctx.strokeStyle = hexToRgba(glowColor, 0.36 + possessPulse * 0.42);
    ctx.lineWidth = 1.6 * scale / 2.1;
    for (let i = 0; i < 2; i += 1) {
      const radius = (13 + i * 3.2) * scale / 2.1;
      ctx.beginPath();
      ctx.arc(0, -4 * scale / 2.1, radius, battleTime * (1.1 + i * 0.3), battleTime * (1.1 + i * 0.3) + Math.PI * 1.2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = hexToRgba(glowColor, 0.08 + possessPulse * 0.18);
    ctx.beginPath();
    ctx.ellipse(0, -2 * scale / 2.1, 13 * scale / 2.1, 18 * scale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function getUnitStatusBadges(unit) {
  const badges = [];
  if (unit.veteran) badges.push({ kind: "veteran", stacks: 0, color: "#ffe39b", accentColor: "#fff3c7" });
  (unit.statuses || []).forEach((status) => {
    const statusDef = getStatusDefinition(status.kind);
    if (!statusDef) return;
    badges.push({ kind: status.kind, stacks: Math.max(1, Math.round(status.stacks)), color: statusDef.badgeColor, accentColor: statusDef.accentColor });
  });
  return badges.slice(0, 3);
}

function drawUnitStatusBadges(unit, x, y, scale) {
  const badges = getUnitStatusBadges(unit);
  badges.forEach((badge, index) => {
    drawStatusBadge(badge, x, y + index * 18 * scale / 2.1, scale);
  });
}

function drawStatusBadge(badge, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  const badgeRadius = 8 * scale / 2.1;
  ctx.fillStyle = "rgba(31, 22, 12, 0.82)";
  ctx.beginPath();
  ctx.arc(0, 0, badgeRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(badge.color, 0.95);
  ctx.lineWidth = 1.5 * scale / 2.1;
  ctx.stroke();
  if (!drawStatusBadgeSprite(badge.kind, scale)) {
    if (badge.kind === "veteran") drawVeteranBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "poison") drawPoisonBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "ignite") drawIgniteBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "zombie") drawZombieBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "shielded") drawShieldedBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "bardichaste") drawBardHasteBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "bardicvalor") drawBardValorBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "bardicguard") drawBardGuardBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "bloodfrenzy") drawBloodFrenzyBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "immobilized") drawImmobilizedBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "bleed") drawBleedBadgeIcon(scale, badge.accentColor);
    if (badge.kind === "possessed") drawPossessedBadgeIcon(scale, badge.accentColor);
  }
  if (badge.stacks > 1) {
    const pipRadius = 4.4 * scale / 2.1;
    ctx.fillStyle = "rgba(20, 14, 9, 0.96)";
    ctx.beginPath();
    ctx.arc(5 * scale / 2.1, 5 * scale / 2.1, pipRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1 * scale / 2.1;
    ctx.stroke();
    ctx.fillStyle = "#fff7e6";
    ctx.font = `700 ${Math.max(7, 7.5 * scale / 2.1)}px Georgia`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${badge.stacks}`, 5 * scale / 2.1, 5.2 * scale / 2.1);
  }
  ctx.restore();
}

function drawVeteranBadgeIcon(scale, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.6 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-5.5 * scale / 2.1, 1.5 * scale / 2.1);
  ctx.lineTo(0, -4.5 * scale / 2.1);
  ctx.lineTo(5.5 * scale / 2.1, 1.5 * scale / 2.1);
  ctx.stroke();
}

function drawPoisonBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -5.5 * scale / 2.1);
  ctx.bezierCurveTo(4.5 * scale / 2.1, -2.5 * scale / 2.1, 4.5 * scale / 2.1, 3.5 * scale / 2.1, 0, 5.5 * scale / 2.1);
  ctx.bezierCurveTo(-4.5 * scale / 2.1, 3.5 * scale / 2.1, -4.5 * scale / 2.1, -2.5 * scale / 2.1, 0, -5.5 * scale / 2.1);
  ctx.fill();
}

function drawIgniteBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -6.3 * scale / 2.1);
  ctx.bezierCurveTo(2.4 * scale / 2.1, -4.8 * scale / 2.1, 3.7 * scale / 2.1, -1.8 * scale / 2.1, 3.6 * scale / 2.1, 1.2 * scale / 2.1);
  ctx.bezierCurveTo(3.5 * scale / 2.1, 4.2 * scale / 2.1, 1.8 * scale / 2.1, 6.2 * scale / 2.1, 0, 6.2 * scale / 2.1);
  ctx.bezierCurveTo(-2.1 * scale / 2.1, 6.2 * scale / 2.1, -3.9 * scale / 2.1, 4.3 * scale / 2.1, -3.9 * scale / 2.1, 1.4 * scale / 2.1);
  ctx.bezierCurveTo(-3.9 * scale / 2.1, -0.7 * scale / 2.1, -3 * scale / 2.1, -2.5 * scale / 2.1, -1.9 * scale / 2.1, -4.2 * scale / 2.1);
  ctx.bezierCurveTo(-1.5 * scale / 2.1, -2.8 * scale / 2.1, -0.8 * scale / 2.1, -1.6 * scale / 2.1, -0.2 * scale / 2.1, -0.5 * scale / 2.1);
  ctx.bezierCurveTo(0.4 * scale / 2.1, -2.3 * scale / 2.1, 1.1 * scale / 2.1, -4.1 * scale / 2.1, 0, -6.3 * scale / 2.1);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 223, 150, 0.95)";
  ctx.beginPath();
  ctx.moveTo(0.1 * scale / 2.1, -3.6 * scale / 2.1);
  ctx.bezierCurveTo(1.4 * scale / 2.1, -2.6 * scale / 2.1, 2.1 * scale / 2.1, -1.0 * scale / 2.1, 2.1 * scale / 2.1, 0.8 * scale / 2.1);
  ctx.bezierCurveTo(2.1 * scale / 2.1, 2.9 * scale / 2.1, 1.0 * scale / 2.1, 4.1 * scale / 2.1, 0, 4.1 * scale / 2.1);
  ctx.bezierCurveTo(-1.2 * scale / 2.1, 4.1 * scale / 2.1, -2.1 * scale / 2.1, 3.0 * scale / 2.1, -2.1 * scale / 2.1, 1.3 * scale / 2.1);
  ctx.bezierCurveTo(-2.1 * scale / 2.1, 0.0, -1.6 * scale / 2.1, -1.1 * scale / 2.1, -0.8 * scale / 2.1, -2.2 * scale / 2.1);
  ctx.bezierCurveTo(-0.5 * scale / 2.1, -1.2 * scale / 2.1, -0.1 * scale / 2.1, -0.4 * scale / 2.1, 0.2 * scale / 2.1, 0.5 * scale / 2.1);
  ctx.bezierCurveTo(0.5 * scale / 2.1, -0.6 * scale / 2.1, 0.9 * scale / 2.1, -1.9 * scale / 2.1, 0.1 * scale / 2.1, -3.6 * scale / 2.1);
  ctx.fill();
}

function drawZombieBadgeIcon(scale, color) {
  const scaled = scale / 2.1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-4.8 * scaled, -2.2 * scaled);
  ctx.quadraticCurveTo(-4.7 * scaled, -6.2 * scaled, 0, -6.2 * scaled);
  ctx.quadraticCurveTo(4.7 * scaled, -6.2 * scaled, 4.8 * scaled, -2.2 * scaled);
  ctx.lineTo(4.8 * scaled, 1.1 * scaled);
  ctx.quadraticCurveTo(4.7 * scaled, 4.1 * scaled, 2.1 * scaled, 4.2 * scaled);
  ctx.lineTo(1.4 * scaled, 5.8 * scaled);
  ctx.lineTo(-1.4 * scaled, 5.8 * scaled);
  ctx.lineTo(-2.1 * scaled, 4.2 * scaled);
  ctx.quadraticCurveTo(-4.7 * scaled, 4.1 * scaled, -4.8 * scaled, 1.1 * scaled);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(36, 30, 20, 0.92)";
  ctx.beginPath();
  ctx.arc(-2.05 * scaled, -1.1 * scaled, 1.35 * scaled, 0, Math.PI * 2);
  ctx.arc(2.05 * scaled, -1.1 * scaled, 1.35 * scaled, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 0.2 * scaled);
  ctx.lineTo(1.05 * scaled, 2.1 * scaled);
  ctx.lineTo(-1.05 * scaled, 2.1 * scaled);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(36, 30, 20, 0.92)";
  ctx.lineWidth = 1.25 * scaled;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-2.3 * scaled, 3.9 * scaled);
  ctx.lineTo(2.3 * scaled, 3.9 * scaled);
  ctx.moveTo(-1.2 * scaled, 4.8 * scaled);
  ctx.lineTo(1.2 * scaled, 4.8 * scaled);
  ctx.stroke();
}

function getCubicBezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
  const inverse = 1 - t;
  const a = inverse ** 3;
  const b = 3 * inverse * inverse * t;
  const c = 3 * inverse * t * t;
  const d = t ** 3;
  return {
    x: (a * x0) + (b * x1) + (c * x2) + (d * x3),
    y: (a * y0) + (b * y1) + (c * y2) + (d * y3),
  };
}

function drawStepLegs(dark, scale, unit, spread = 7, back = 10) {
  const stride = (unit?.stride || 0) * scale / 2.1;
  const lift = Math.abs(unit?.stride || 0) * 1.4 * scale / 2.1;
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-4 * scale / 2.1, back * scale / 2.1);
  ctx.lineTo((-spread - stride) * scale / 2.1, (back + 7) * scale / 2.1 - lift);
  ctx.moveTo(4 * scale / 2.1, back * scale / 2.1);
  ctx.lineTo((spread - stride) * scale / 2.1, (back + 7) * scale / 2.1 + lift * 0.45);
  ctx.stroke();
}

function getUnitAttackSwing(unit, multiplier = 1) {
  return clamp(unit?.attackSwing || 0, 0, 1) * multiplier;
}

function drawSwingArm(scale, shoulderX, shoulderY, handX, handY, attackSwing, swingRange, drawFn) {
  const scaled = scale / 2.1;
  const originX = shoulderX * scaled;
  const originY = shoulderY * scaled;
  const reachX = (handX - shoulderX) * scaled;
  const reachY = (handY - shoulderY) * scaled;
  const length = Math.hypot(reachX, reachY);
  const baseAngle = Math.atan2(reachY, reachX);
  ctx.save();
  ctx.translate(originX, originY);
  ctx.rotate(baseAngle + attackSwing * swingRange);
  drawFn({ scaled, length });
  ctx.restore();
}

function drawArcher(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 0.9);
  drawStepLegs(dark, scale, unit, 6.4, 10);
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
  drawSwingArm(scale, 6.5, -3, 12, -1, attack, -0.95, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length * 0.42, length * 0.08);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(length + 1.5 * scaled, 1 * scaled, 8 * scaled, -1.2, 1.2);
    ctx.stroke();
  });
}

function drawMage(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 0.95);
  drawStepLegs(dark, scale, unit, 5.5, 9);
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
  drawSwingArm(scale, 8, -4, 15, -16, attack, -1.05, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#c4f2ff";
    ctx.beginPath();
    ctx.arc(length + 1.2 * scaled, -2.4 * scaled, 3.2 * scaled, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawShieldedBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -5.5 * scale / 2.1);
  ctx.lineTo(4.9 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, 3.2 * scale / 2.1);
  ctx.lineTo(0, 6.1 * scale / 2.1);
  ctx.lineTo(-4 * scale / 2.1, 3.2 * scale / 2.1);
  ctx.lineTo(-4.9 * scale / 2.1, -3 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(27, 63, 81, 0.82)";
  ctx.lineWidth = 0.9 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(0, -3 * scale / 2.1);
  ctx.lineTo(0, 3.9 * scale / 2.1);
  ctx.moveTo(-2.3 * scale / 2.1, 0.4 * scale / 2.1);
  ctx.lineTo(2.3 * scale / 2.1, 0.4 * scale / 2.1);
  ctx.stroke();
}

function drawBardHasteBadgeIcon(scale, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Re-scaled slightly so the wide speed streaks comfortably fit the original bounds
  const s = scale / 2.6;

  // Tilt to convey an explosive forward/upward bounding motion
  ctx.rotate(-0.15); // ~8.5 degrees

  // --- 1. Draw the Shoe Silhouette with a Cutout ---
  ctx.beginPath();
  
  // Outer Shoe Path (Starts at the front of the ankle and draws the silhouette)
  ctx.moveTo(0.5 * s, -2.5 * s); 
  ctx.bezierCurveTo(-1.0 * s, -1.0 * s, -2.5 * s, 1.0 * s, -2.5 * s, 3.5 * s); // Achilles/Heel
  ctx.bezierCurveTo(-0.5 * s, 4.5 * s, 3.0 * s, 4.5 * s, 5.5 * s, 3.5 * s);  // Sole/Bottom
  ctx.bezierCurveTo(7.0 * s, 3.0 * s, 7.0 * s, 1.5 * s, 5.0 * s, 1.0 * s);   // Toe box
  ctx.bezierCurveTo(3.5 * s, 0.5 * s, 2.5 * s, 0.0 * s, 1.5 * s, -2.5 * s);  // Vamp/Instep
  ctx.closePath();

  // Inner Aerodynamic Stripe (Drawn as a sub-path)
  ctx.moveTo(0.0 * s, 1.5 * s); 
  ctx.bezierCurveTo(1.0 * s, 1.0 * s, 2.5 * s, 1.0 * s, 3.5 * s, 1.5 * s);   // Bottom edge
  ctx.bezierCurveTo(4.0 * s, 1.8 * s, 4.5 * s, 1.5 * s, 4.5 * s, 1.5 * s);   // Tip
  ctx.bezierCurveTo(3.0 * s, 2.2 * s, 1.5 * s, 2.5 * s, -0.5 * s, 2.0 * s);  // Top edge
  ctx.closePath();

  // Fill using "evenodd" rule to punch the inner cutout through the solid shoe
  ctx.fill("evenodd");

  // --- 2. Draw Speed Blur Lines (Streaks) ---
  ctx.lineWidth = 1.0 * s;
  ctx.beginPath();

  // Top streak
  ctx.moveTo(-5.5 * s, -1.0 * s);
  ctx.lineTo(-2.5 * s, -1.0 * s);

  // Middle streak (longer, conveying maximum speed)
  ctx.moveTo(-7.0 * s, 1.0 * s);
  ctx.lineTo(-3.5 * s, 1.0 * s);

  // Bottom streak
  ctx.moveTo(-5.0 * s, 3.0 * s);
  ctx.lineTo(-3.0 * s, 3.0 * s);

  ctx.stroke();

  ctx.restore();
}

function drawBardValorBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  
  // Start at the top right tip
  ctx.moveTo(2 * scale / 2.1, -6.5 * scale / 2.1);
  
  // Slant down-left to the far left outer edge
  ctx.lineTo(-4 * scale / 2.1, 1 * scale / 2.1);
  
  // Cut horizontally right to the inner left corner
  ctx.lineTo(0.5 * scale / 2.1, 1 * scale / 2.1);
  
  // Slant down-left to the very bottom tip
  ctx.lineTo(-2 * scale / 2.1, 6.5 * scale / 2.1);
  
  // Slant up-right to the far right outer edge
  ctx.lineTo(4 * scale / 2.1, -1 * scale / 2.1);
  
  // Cut horizontally left to the inner right corner
  ctx.lineTo(-0.5 * scale / 2.1, -1 * scale / 2.1);
  
  // Close path automatically connects back to the top right tip
  ctx.closePath();
  ctx.fill();
}

function drawBardGuardBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -5.8 * scale / 2.1);
  ctx.lineTo(4.6 * scale / 2.1, -3.1 * scale / 2.1);
  ctx.lineTo(4.1 * scale / 2.1, 3 * scale / 2.1);
  ctx.lineTo(0, 6.2 * scale / 2.1);
  ctx.lineTo(-4.1 * scale / 2.1, 3 * scale / 2.1);
  ctx.lineTo(-4.6 * scale / 2.1, -3.1 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(61, 31, 77, 0.82)";
  ctx.lineWidth = 0.9 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(0, -2.8 * scale / 2.1);
  ctx.lineTo(0, 3.8 * scale / 2.1);
  ctx.moveTo(-2.1 * scale / 2.1, 0.2 * scale / 2.1);
  ctx.lineTo(2.1 * scale / 2.1, 0.2 * scale / 2.1);
  ctx.stroke();
}

function drawBloodFrenzyBadgeIcon(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -7 * scale / 2.1);
  ctx.lineTo(4.5 * scale / 2.1, -1.5 * scale / 2.1);
  ctx.lineTo(1.6 * scale / 2.1, -1.5 * scale / 2.1);
  ctx.lineTo(5.5 * scale / 2.1, 7 * scale / 2.1);
  ctx.lineTo(-4.4 * scale / 2.1, 0.8 * scale / 2.1);
  ctx.lineTo(-1.2 * scale / 2.1, 0.8 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(94, 33, 28, 0.94)";
  ctx.lineWidth = 0.9 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-2.8 * scale / 2.1, -4.2 * scale / 2.1);
  ctx.lineTo(1.2 * scale / 2.1, -0.8 * scale / 2.1);
  ctx.moveTo(-2.4 * scale / 2.1, 2.4 * scale / 2.1);
  ctx.lineTo(2.8 * scale / 2.1, 5.2 * scale / 2.1);
  ctx.stroke();
}

function drawImmobilizedBadgeIcon(scale, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1 * scale / 2.1;
  const size = 6 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-size, -size);
  ctx.lineTo(size, size);
  ctx.moveTo(-size, size);
  ctx.lineTo(size, -size);
  ctx.moveTo(-size, 0);
  ctx.lineTo(size, 0);
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 8 * scale / 2.1, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBleedBadgeIcon(scale, color) {
  const scaled = scale / 2.1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -7.2 * scaled);
  ctx.bezierCurveTo(3.9 * scaled, -4.9 * scaled, 5.9 * scaled, -1.1 * scaled, 5.3 * scaled, 2.2 * scaled);
  ctx.bezierCurveTo(4.6 * scaled, 5.5 * scaled, 2.2 * scaled, 7.2 * scaled, 0, 7.2 * scaled);
  ctx.bezierCurveTo(-2.2 * scaled, 7.2 * scaled, -4.6 * scaled, 5.5 * scaled, -5.3 * scaled, 2.2 * scaled);
  ctx.bezierCurveTo(-5.9 * scaled, -1.1 * scaled, -3.9 * scaled, -4.9 * scaled, 0, -7.2 * scaled);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255, 242, 243, 0.26)";
  ctx.beginPath();
  ctx.ellipse(-1.6 * scaled, -1.8 * scaled, 1.5 * scaled, 2.4 * scaled, -0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawPossessedBadgeIcon(scale, color) {
  const scaled = scale / 2.1;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3 * scaled;
  ctx.beginPath();
  ctx.moveTo(-4.2 * scaled, -5.5 * scaled);
  ctx.quadraticCurveTo(0, -8.4 * scaled, 4.2 * scaled, -5.5 * scaled);
  ctx.lineTo(4.2 * scaled, 1.6 * scaled);
  ctx.quadraticCurveTo(2.2 * scaled, 0.9 * scaled, 0, 3.0 * scaled);
  ctx.quadraticCurveTo(-2.2 * scaled, 0.9 * scaled, -4.2 * scaled, 1.6 * scaled);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(-1.7 * scaled, -2.1 * scaled, 0.82 * scaled, 0, Math.PI * 2);
  ctx.arc(1.7 * scaled, -2.1 * scaled, 0.82 * scaled, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-2.4 * scaled, 1.2 * scaled);
  ctx.quadraticCurveTo(0, 3.4 * scaled, 2.4 * scaled, 1.2 * scaled);
  ctx.stroke();
}

function drawMedic(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 0.88);
  drawStepLegs(dark, scale, unit, 5.8, 9.5);
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(2 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-2 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -3 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 4.9 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.fillRect(-4 * scale / 2.1, -2 * scale / 2.1, 8 * scale / 2.1, 8 * scale / 2.1);
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(0, -1.5 * scale / 2.1);
  ctx.lineTo(0, 5.5 * scale / 2.1);
  ctx.moveTo(-3.5 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(3.5 * scale / 2.1, 2 * scale / 2.1);
  ctx.stroke();
  drawSwingArm(scale, 8, -1, 14, -10, attack, -0.92, ({ length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
  });
  ctx.fillStyle = shadeColor(main, -0.12);
  ctx.fillRect(-9 * scale / 2.1, 1 * scale / 2.1, 3 * scale / 2.1, 8 * scale / 2.1);
}

function drawBard(main, dark, light, scale, unit) {
  drawStepLegs(dark, scale, unit, 5.7, 9.7);
  ctx.fillStyle = shadeColor(main, -0.18);
  ctx.beginPath();
  ctx.moveTo(0, -15 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -12 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -13.2 * scale / 2.1, 4.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6f4b2f";
  ctx.lineWidth = 1.8 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(7.5 * scale / 2.1, -7 * scale / 2.1);
  ctx.lineTo(7.5 * scale / 2.1, 4 * scale / 2.1);
  ctx.stroke();
  ctx.strokeStyle = "#e2b46f";
  ctx.lineWidth = 1.7 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(7.5 * scale / 2.1, -7 * scale / 2.1);
  ctx.quadraticCurveTo(13.5 * scale / 2.1, -10 * scale / 2.1, 16 * scale / 2.1, -4 * scale / 2.1);
  ctx.quadraticCurveTo(13.5 * scale / 2.1, 1.5 * scale / 2.1, 7.5 * scale / 2.1, -0.8 * scale / 2.1);
  ctx.stroke();
  const songColor = getBardSongVisuals(unit.activeSongKind || "bardichaste").color;
  drawMusicNote(13.5 * scale / 2.1, -16 * scale / 2.1, scale * 0.7, hexToRgba(songColor, 0.78), -0.18);
}

function drawBomber(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 0.9);
  drawStepLegs(dark, scale, unit, 6.1, 11);
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -11 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(12 * scale / 2.1, 7 * scale / 2.1);
  ctx.lineTo(3 * scale / 2.1, 14 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, -7 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -12 * scale / 2.1, 5.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = shadeColor(main, -0.18);
  ctx.fillRect(-6 * scale / 2.1, -1 * scale / 2.1, 12 * scale / 2.1, 3 * scale / 2.1);
  ctx.fillRect(-6 * scale / 2.1, 5 * scale / 2.1, 12 * scale / 2.1, 3 * scale / 2.1);
  drawSwingArm(scale, 7, -2, 12, 0, attack, -1.0, ({ scaled, length }) => {
    ctx.strokeStyle = "#f0ad62";
    ctx.lineWidth = 2 * scaled;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#2c2217";
    ctx.beginPath();
    ctx.arc(length + 0.6 * scaled, 4 * scaled, 5.6 * scaled, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f0ad62";
    ctx.beginPath();
    ctx.moveTo(length + 0.6 * scaled, 0);
    ctx.lineTo(length + 4.6 * scaled, -7 * scaled);
    ctx.stroke();
  });
  ctx.strokeStyle = "#f0ad62";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-7 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(-14 * scale / 2.1, -10 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#80562f";
  ctx.fillRect(-13 * scale / 2.1, -12 * scale / 2.1, 7 * scale / 2.1, 11 * scale / 2.1);
}

function drawAssassin(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.18);
  drawStepLegs(dark, scale, unit, 6.1, 10);
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(0, -16 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -12 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, -4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 4.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(236,236,255,0.72)";
  ctx.lineWidth = 1.8 * scale / 2.1;
  drawSwingArm(scale, -12, 4, -18, 12, attack * 0.55, 0.7, ({ length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
  });
  drawSwingArm(scale, 12, 4, 18, 12, attack, -1.2, ({ length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
  });
}

function drawKnight(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.05);
  drawStepLegs(dark, scale, unit, 7.5, 12);
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
  drawSwingArm(scale, 9, -3, 16, -17, attack, -1.15, ({ length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
  });
}

function drawBodyguard(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1);
  drawStepLegs(dark, scale, unit, 7.1, 11.6);
  ctx.fillStyle = shadeColor(main, -0.16);
  ctx.beginPath();
  ctx.moveTo(0, -14 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 5.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = shadeColor(main, 0.08);
  ctx.beginPath();
  ctx.moveTo(0, -3 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 1 * scale / 2.1);
  ctx.lineTo(6.5 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(0, 16 * scale / 2.1);
  ctx.lineTo(-6.5 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 1 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#e1f4ff";
  ctx.lineWidth = 1.5 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(0, -1 * scale / 2.1);
  ctx.lineTo(0, 10 * scale / 2.1);
  ctx.moveTo(-3.2 * scale / 2.1, 4.3 * scale / 2.1);
  ctx.lineTo(3.2 * scale / 2.1, 4.3 * scale / 2.1);
  ctx.stroke();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2.2 * scale / 2.1;
  drawSwingArm(scale, 10, -2, 16, -16, attack, -1.08, ({ length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
  });
}

function drawKrieger(main, dark, light, scale, unit) {
  drawStepLegs(dark, scale * 1.2, unit, 8.8, 14.5);
  ctx.fillStyle = shadeColor(main, -0.22);
  ctx.beginPath();
  ctx.moveTo(0, -18 * scale / 2.1);
  ctx.lineTo(14 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, 8 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 18 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, 17 * scale / 2.1);
  ctx.lineTo(-16 * scale / 2.1, 7 * scale / 2.1);
  ctx.lineTo(-14 * scale / 2.1, -8 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.ellipse(0, 3 * scale / 2.1, 13 * scale / 2.1, 16 * scale / 2.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = shadeColor(main, 0.08);
  ctx.beginPath();
  ctx.ellipse(0, 1 * scale / 2.1, 8.5 * scale / 2.1, 11 * scale / 2.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -15 * scale / 2.1, 6.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2.8 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-13 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(-18 * scale / 2.1, 14 * scale / 2.1);
  ctx.moveTo(13 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(18 * scale / 2.1, 14 * scale / 2.1);
  ctx.moveTo(-4 * scale / 2.1, -16 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, -22 * scale / 2.1);
  ctx.moveTo(4 * scale / 2.1, -16 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, -22 * scale / 2.1);
  ctx.stroke();
  if (getUnitStatus(unit, "bloodfrenzy")) {
    ctx.strokeStyle = "rgba(214, 92, 84, 0.78)";
    ctx.lineWidth = 2.2 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 17 * scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawHuntsman(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.08);
  drawStepLegs(dark, scale, unit, 6.3, 10.4);
  ctx.fillStyle = shadeColor(main, -0.24);
  ctx.beginPath();
  ctx.moveTo(0, -17 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -6 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -6 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shadeColor(main, -0.06);
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14.5 * scale / 2.1, 4.9 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(55, 44, 29, 0.92)";
  ctx.beginPath();
  ctx.moveTo(-5 * scale / 2.1, -16 * scale / 2.1);
  ctx.lineTo(0, -20.5 * scale / 2.1);
  ctx.lineTo(5 * scale / 2.1, -16 * scale / 2.1);
  ctx.lineTo(3 * scale / 2.1, -12.5 * scale / 2.1);
  ctx.lineTo(-3 * scale / 2.1, -12.5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  drawSwingArm(scale, 6.2, -1.5, 14.8, -7.2, attack, -1.15, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#d7d0c6";
    ctx.beginPath();
    ctx.moveTo(length + 0.4 * scaled, -1.1 * scaled);
    ctx.lineTo(length + 5.4 * scaled, 2 * scaled);
    ctx.lineTo(length - 2.2 * scaled, 5.4 * scaled);
    ctx.closePath();
    ctx.fill();
  });

  ctx.strokeStyle = "rgba(191, 224, 232, 0.94)";
  ctx.lineWidth = 1.45 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-8.8 * scale / 2.1, -1.2 * scale / 2.1);
  ctx.lineTo(-15.4 * scale / 2.1, -7.2 * scale / 2.1);
  ctx.lineTo(-14.2 * scale / 2.1, 5.8 * scale / 2.1);
  ctx.lineTo(-8.1 * scale / 2.1, 10.4 * scale / 2.1);
  ctx.lineTo(-3.8 * scale / 2.1, 3.2 * scale / 2.1);
  ctx.stroke();
  ctx.lineWidth = 1.05 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-13.6 * scale / 2.1, -4.4 * scale / 2.1);
  ctx.lineTo(-5.5 * scale / 2.1, 4.2 * scale / 2.1);
  ctx.moveTo(-15 * scale / 2.1, 0.2 * scale / 2.1);
  ctx.lineTo(-6.6 * scale / 2.1, 7.7 * scale / 2.1);
  ctx.moveTo(-11.7 * scale / 2.1, -6.9 * scale / 2.1);
  ctx.lineTo(-12.8 * scale / 2.1, 6.5 * scale / 2.1);
  ctx.stroke();
  if (getUnitStatus(unit, "immobilized")) {
    ctx.strokeStyle = "rgba(174, 221, 239, 0.72)";
    ctx.lineWidth = 1.6 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, 0, 14 * scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawArtificer(main, dark, light, scale, unit) {
  drawStepLegs(dark, scale, unit, 5.9, 10.1);
  ctx.fillStyle = shadeColor(main, -0.22);
  ctx.beginPath();
  ctx.moveTo(0, -16 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -6 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -6 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f1c54f";
  ctx.beginPath();
  ctx.moveTo(-6.2 * scale / 2.1, -16.2 * scale / 2.1);
  ctx.quadraticCurveTo(0, -21.2 * scale / 2.1, 6.2 * scale / 2.1, -16.2 * scale / 2.1);
  ctx.lineTo(5.4 * scale / 2.1, -12.2 * scale / 2.1);
  ctx.lineTo(-5.4 * scale / 2.1, -12.2 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#d39627";
  ctx.fillRect(-6.4 * scale / 2.1, -13.6 * scale / 2.1, 12.8 * scale / 2.1, 2.8 * scale / 2.1);

  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -10.8 * scale / 2.1, 4.6 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#6b573a";
  ctx.lineWidth = 2.2 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(7.2 * scale / 2.1, -2.6 * scale / 2.1);
  ctx.lineTo(13.8 * scale / 2.1, -9.8 * scale / 2.1);
  ctx.stroke();
  ctx.strokeStyle = "#d6dde2";
  ctx.lineWidth = 2.1 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(13.6 * scale / 2.1, -10.1 * scale / 2.1);
  ctx.quadraticCurveTo(18.3 * scale / 2.1, -12.4 * scale / 2.1, 18.2 * scale / 2.1, -7.8 * scale / 2.1);
  ctx.quadraticCurveTo(16.3 * scale / 2.1, -5.2 * scale / 2.1, 12.8 * scale / 2.1, -6.5 * scale / 2.1);
  ctx.stroke();
}

function drawPhantom(main, dark, light, scale, unit) {
  const bodyScale = scale / 2.1;
  const battleTime = state.battle?.time || 0;
  const ripple = Math.sin(battleTime * 4.4 + unit.statusVisualSeed);
  ctx.fillStyle = hexToRgba(shadeColor(main, -0.08), 0.24);
  ctx.beginPath();
  ctx.ellipse(0, 10 * bodyScale, 10.5 * bodyScale, 4.8 * bodyScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = hexToRgba(main, 0.88);
  ctx.beginPath();
  ctx.moveTo(0, -18 * bodyScale);
  ctx.quadraticCurveTo(10 * bodyScale, -16 * bodyScale, 11 * bodyScale, -4 * bodyScale);
  ctx.lineTo(11 * bodyScale, 9 * bodyScale);
  ctx.quadraticCurveTo(8 * bodyScale, 5 * bodyScale, 4.5 * bodyScale, 9 * bodyScale);
  ctx.quadraticCurveTo(2 * bodyScale, 12.6 * bodyScale, 0, 8.6 * bodyScale);
  ctx.quadraticCurveTo(-2 * bodyScale, 12.6 * bodyScale, -4.5 * bodyScale, 9 * bodyScale);
  ctx.quadraticCurveTo(-8 * bodyScale, 5 * bodyScale, -11 * bodyScale, 9 * bodyScale);
  ctx.lineTo(-11 * bodyScale, -4 * bodyScale);
  ctx.quadraticCurveTo(-10 * bodyScale, -16 * bodyScale, 0, -18 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = hexToRgba(light, 0.34);
  ctx.beginPath();
  ctx.moveTo(-6 * bodyScale, -10 * bodyScale);
  ctx.quadraticCurveTo(-0.5 * bodyScale, -18 * bodyScale, 5.5 * bodyScale, -12 * bodyScale);
  ctx.quadraticCurveTo(1.8 * bodyScale, -10 * bodyScale, -2.3 * bodyScale, -8 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f4fbff";
  ctx.beginPath();
  ctx.arc(-3.1 * bodyScale, -6.2 * bodyScale, 1.2 * bodyScale, 0, Math.PI * 2);
  ctx.arc(3.1 * bodyScale, -6.2 * bodyScale, 1.2 * bodyScale, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(244, 250, 255, ${0.7 + Math.max(0, ripple) * 0.12})`;
  ctx.lineWidth = 1.15 * bodyScale;
  ctx.beginPath();
  ctx.moveTo(-4.1 * bodyScale, -1.7 * bodyScale);
  ctx.quadraticCurveTo(0, 1.5 * bodyScale, 4.1 * bodyScale, -1.7 * bodyScale);
  ctx.stroke();
}

function drawPaladin(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.12);
  drawStepLegs(dark, scale, unit, 7.1, 11.4);
  ctx.fillStyle = shadeColor(main, -0.15);
  ctx.beginPath();
  ctx.moveTo(0, -15 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -6 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -6 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -12.5 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 10.5 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 10.5 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 5.3 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 241, 188, 0.96)";
  ctx.lineWidth = 1.7 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, -3 * scale / 2.1);
  ctx.lineTo(0, 8 * scale / 2.1);
  ctx.moveTo(-4 * scale / 2.1, 2.5 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, 2.5 * scale / 2.1);
  ctx.stroke();
  ctx.strokeStyle = dark;
  ctx.lineWidth = 2.2 * scale / 2.1;
  drawSwingArm(scale, 9.5, -3, 15.5, -17, attack, -1.2, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#d9d9dc";
    ctx.beginPath();
    ctx.moveTo(length - 3 * scaled, -2.5 * scaled);
    ctx.lineTo(length + 2.5 * scaled, 2 * scaled);
    ctx.lineTo(length - 1.5 * scaled, 7.5 * scaled);
    ctx.lineTo(length - 6.5 * scaled, 4 * scaled);
    ctx.closePath();
    ctx.fill();
  });
}

function drawTurret(main, dark, light, scale, unit) {
  const bodyScale = scale / 2.1;
  const pulse = 0.45 + Math.max(0, Math.sin((state.battle?.time || 0) * 11 + unit.statusVisualSeed)) * 0.22;
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 11 * bodyScale, 12 * bodyScale, 4.8 * bodyScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = shadeColor(main, -0.28);
  ctx.beginPath();
  ctx.moveTo(-10 * bodyScale, 7 * bodyScale);
  ctx.lineTo(0, 15 * bodyScale);
  ctx.lineTo(10 * bodyScale, 7 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(-7.8 * bodyScale, -1 * bodyScale);
  ctx.lineTo(7.8 * bodyScale, -1 * bodyScale);
  ctx.quadraticCurveTo(11 * bodyScale, -1 * bodyScale, 11 * bodyScale, 2.2 * bodyScale);
  ctx.lineTo(11 * bodyScale, 6.8 * bodyScale);
  ctx.quadraticCurveTo(11 * bodyScale, 10 * bodyScale, 7.8 * bodyScale, 10 * bodyScale);
  ctx.lineTo(-7.8 * bodyScale, 10 * bodyScale);
  ctx.quadraticCurveTo(-11 * bodyScale, 10 * bodyScale, -11 * bodyScale, 6.8 * bodyScale);
  ctx.lineTo(-11 * bodyScale, 2.2 * bodyScale);
  ctx.quadraticCurveTo(-11 * bodyScale, -1 * bodyScale, -7.8 * bodyScale, -1 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = shadeColor(main, 0.14);
  ctx.fillRect(-5 * bodyScale, -10 * bodyScale, 10 * bodyScale, 10 * bodyScale);

  ctx.save();
  ctx.translate(0, -5 * bodyScale);
  ctx.rotate(unit.turretAimAngle || 0);
  ctx.fillStyle = "#756441";
  ctx.fillRect(-2.6 * bodyScale, -3 * bodyScale, 12 * bodyScale, 6 * bodyScale);
  ctx.fillStyle = `rgba(255, 231, 180, ${pulse})`;
  ctx.fillRect(7.8 * bodyScale, -1.5 * bodyScale, 3.6 * bodyScale, 3 * bodyScale);
  ctx.restore();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 1.6 * bodyScale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-7 * bodyScale, 10 * bodyScale);
  ctx.lineTo(0, 15 * bodyScale);
  ctx.lineTo(7 * bodyScale, 10 * bodyScale);
  ctx.stroke();

  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -5 * bodyScale, 2.2 * bodyScale, 0, Math.PI * 2);
  ctx.fill();
}

function drawMountainMan(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 0.98);
  drawStepLegs(dark, scale, unit, 5.9, 10);
  ctx.fillStyle = shadeColor(main, -0.22);
  ctx.beginPath();
  ctx.moveTo(0, -17 * scale / 2.1);
  ctx.lineTo(12 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-12 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, -4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -15 * scale / 2.1, 5.1 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#4f3924";
  ctx.lineWidth = 2 * scale / 2.1;
  drawSwingArm(scale, 9, -4, 15, -17, attack, -1.05, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#9ff0a1";
    ctx.beginPath();
    ctx.arc(length + 1.2 * scaled, -1.2 * scaled, 3.1 * scaled, 0, Math.PI * 2);
    ctx.fill();
  });
  if (unit.activeSpellId) {
    ctx.strokeStyle = "rgba(192,255,189,0.6)";
    ctx.lineWidth = 1.6 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 10 * scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawPoisoner(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.02);
  drawStepLegs(dark, scale, unit, 5.8, 10);
  ctx.fillStyle = shadeColor(main, -0.18);
  ctx.beginPath();
  ctx.moveTo(0, -15 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -12 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 4.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  drawSwingArm(scale, 6, -4, 11, 2, attack, -1.0, ({ scaled, length }) => {
    ctx.fillStyle = "#6fe17a";
    ctx.beginPath();
    ctx.moveTo(length - 3 * scaled, -7 * scaled);
    ctx.lineTo(length + 2 * scaled, -2 * scaled);
    ctx.lineTo(length + 1 * scaled, 8 * scaled);
    ctx.lineTo(length - 7 * scaled, 8 * scaled);
    ctx.lineTo(length - 6 * scaled, -2 * scaled);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(240,255,242,0.72)";
    ctx.fillRect(length - 4 * scaled, -10 * scaled, 3 * scaled, 3 * scaled);
  });
}

function drawFirebreather(main, dark, light, scale, unit) {
  drawStepLegs(dark, scale, unit, 6.2, 10.5);
  ctx.fillStyle = shadeColor(main, -0.2);
  ctx.beginPath();
  ctx.moveTo(-9 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(0, -16 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, 12 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(-7 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(0, -12 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 11 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(-1 * scale / 2.1, -13 * scale / 2.1, 5 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffac52";
  ctx.beginPath();
  ctx.moveTo(6 * scale / 2.1, -6 * scale / 2.1);
  ctx.quadraticCurveTo(15 * scale / 2.1, -6 * scale / 2.1, 18 * scale / 2.1, 0);
  ctx.quadraticCurveTo(12 * scale / 2.1, 2 * scale / 2.1, 8 * scale / 2.1, 6 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffe1a0";
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -4 * scale / 2.1);
  ctx.quadraticCurveTo(13 * scale / 2.1, -3 * scale / 2.1, 15 * scale / 2.1, 0);
  ctx.quadraticCurveTo(11 * scale / 2.1, 1 * scale / 2.1, 8 * scale / 2.1, 4 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  if (getStatusStacks(unit, "ignite") > 0) {
    ctx.fillStyle = "rgba(255, 185, 102, 0.55)";
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 11 * scale / 2.1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNecromancer(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.02);
  drawStepLegs(dark, scale, unit, 6.3, 11);
  ctx.fillStyle = "rgba(20, 12, 27, 0.95)";
  ctx.beginPath();
  ctx.moveTo(0, -20 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -13 * scale / 2.1);
  ctx.lineTo(13 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(0, 15 * scale / 2.1);
  ctx.lineTo(-4 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, 13 * scale / 2.1);
  ctx.lineTo(-13 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, -13 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(-8 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(-15 * scale / 2.1, 5 * scale / 2.1);
  ctx.lineTo(-12 * scale / 2.1, 9 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, 7 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(15 * scale / 2.1, 5 * scale / 2.1);
  ctx.lineTo(12 * scale / 2.1, 9 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, 7 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -16 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -10 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(2 * scale / 2.1, 8 * scale / 2.1);
  ctx.lineTo(0, 12 * scale / 2.1);
  ctx.lineTo(-2 * scale / 2.1, 8 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-9 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -10 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(232, 226, 215, 0.96)";
  ctx.beginPath();
  ctx.moveTo(0, -17 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, -13 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(1 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(-1 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(-4 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(-4 * scale / 2.1, -13 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#59f2af";
  ctx.beginPath();
  ctx.moveTo(-3 * scale / 2.1, -11.2 * scale / 2.1);
  ctx.lineTo(-0.8 * scale / 2.1, -10.1 * scale / 2.1);
  ctx.lineTo(-2 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(-4.4 * scale / 2.1, -9.1 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(3 * scale / 2.1, -11.2 * scale / 2.1);
  ctx.lineTo(0.8 * scale / 2.1, -10.1 * scale / 2.1);
  ctx.lineTo(2 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(4.4 * scale / 2.1, -9.1 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#6f43a0";
  ctx.beginPath();
  ctx.moveTo(-1 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(1 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(1 * scale / 2.1, -1 * scale / 2.1);
  ctx.lineTo(3 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(0, 5 * scale / 2.1);
  ctx.lineTo(-3 * scale / 2.1, 2 * scale / 2.1);
  ctx.lineTo(-1 * scale / 2.1, -1 * scale / 2.1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#402456";
  ctx.lineWidth = 2.1 * scale / 2.1;
  drawSwingArm(scale, 8, -3, 17, -17, attack, -1.08, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#a47ae0";
    ctx.beginPath();
    ctx.moveTo(length - 2 * scaled, -1 * scaled);
    ctx.lineTo(length + 2 * scaled, 4 * scaled);
    ctx.lineTo(length, 11 * scaled);
    ctx.lineTo(length - 5 * scaled, 8 * scaled);
    ctx.lineTo(length - 5 * scaled, 2 * scaled);
    ctx.closePath();
    ctx.fill();
  });
}

function drawGraverobber(main, dark, light, scale, unit) {
  const attack = getUnitAttackSwing(unit, 1.08);
  drawStepLegs(dark, scale, unit, 6.1, 10.2);
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(9 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, 11 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -3 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(-1 * scale / 2.1, -13 * scale / 2.1, 4.7 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6b4c2b";
  ctx.lineWidth = 2.2 * scale / 2.1;
  drawSwingArm(scale, 8, -4, 16, -14, attack, -1.15, ({ scaled, length }) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.fillStyle = "#bbb7af";
    ctx.beginPath();
    ctx.moveTo(length - 4 * scaled, -2 * scaled);
    ctx.quadraticCurveTo(length + 2 * scaled, 0, length, 6 * scaled);
    ctx.lineTo(length - 5 * scaled, 4 * scaled);
    ctx.quadraticCurveTo(length - 4 * scaled, 0, length - 4 * scaled, -2 * scaled);
    ctx.fill();
  });
}

function drawArachnomist(main, dark, light, scale, unit) {
  drawStepLegs(dark, scale, unit, 6, 10.4);
  ctx.fillStyle = shadeColor(main, -0.24);
  ctx.beginPath();
  ctx.moveTo(0, -17 * scale / 2.1);
  ctx.lineTo(10 * scale / 2.1, -6 * scale / 2.1);
  ctx.lineTo(8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-8 * scale / 2.1, 12 * scale / 2.1);
  ctx.lineTo(-10 * scale / 2.1, -6 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -13 * scale / 2.1);
  ctx.lineTo(7 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-6 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(-7 * scale / 2.1, -5 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, -14 * scale / 2.1, 4.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#2f1c17";
  ctx.lineWidth = 1.9 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-9 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(-16 * scale / 2.1, -9 * scale / 2.1);
  ctx.moveTo(9 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, -9 * scale / 2.1);
  ctx.moveTo(-10 * scale / 2.1, 4 * scale / 2.1);
  ctx.lineTo(-17 * scale / 2.1, 10 * scale / 2.1);
  ctx.moveTo(10 * scale / 2.1, 4 * scale / 2.1);
  ctx.lineTo(17 * scale / 2.1, 10 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#211315";
  ctx.beginPath();
  ctx.arc(14 * scale / 2.1, -11 * scale / 2.1, 4.1 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#b7ef76";
  ctx.beginPath();
  ctx.arc(12.5 * scale / 2.1, -12 * scale / 2.1, 1.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.arc(15.8 * scale / 2.1, -12 * scale / 2.1, 1.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpiderSwarm(main, dark, light, scale, unit) {
  const bodyScale = scale / 2.1;
  ctx.strokeStyle = dark;
  ctx.lineWidth = 1.35 * bodyScale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  [-1, 1].forEach((side) => {
    [
      { startX: 2.8, startY: -5.4, midX: 7.2, midY: -8.8, endX: 11.3, endY: -10.6 },
      { startX: 3.4, startY: -2.4, midX: 8.8, midY: -4.9, endX: 12.8, endY: -5.2 },
      { startX: 3.7, startY: 1.4, midX: 9.2, midY: 2.9, endX: 12.4, endY: 5.8 },
      { startX: 3.2, startY: 4.7, midX: 7.8, midY: 8.5, endX: 10.6, endY: 12.4 },
    ].forEach((leg) => {
      ctx.beginPath();
      ctx.moveTo(side * leg.startX * bodyScale, leg.startY * bodyScale);
      ctx.lineTo(side * leg.midX * bodyScale, leg.midY * bodyScale);
      ctx.lineTo(side * leg.endX * bodyScale, leg.endY * bodyScale);
      ctx.stroke();
    });
  });

  ctx.fillStyle = shadeColor(main, -0.22);
  ctx.beginPath();
  ctx.ellipse(0, 3.6 * bodyScale, 7.2 * bodyScale, 5.6 * bodyScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.ellipse(0, -1.4 * bodyScale, 4.9 * bodyScale, 3.8 * bodyScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = shadeColor(main, 0.12);
  ctx.beginPath();
  ctx.ellipse(0, 5.1 * bodyScale, 3.5 * bodyScale, 2.4 * bodyScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 1.05 * bodyScale;
  ctx.beginPath();
  ctx.moveTo(-1.8 * bodyScale, -3.7 * bodyScale);
  ctx.lineTo(-3.7 * bodyScale, -6.1 * bodyScale);
  ctx.moveTo(1.8 * bodyScale, -3.7 * bodyScale);
  ctx.lineTo(3.7 * bodyScale, -6.1 * bodyScale);
  ctx.stroke();

  ctx.fillStyle = light;
  [-2.2, -0.7, 0.7, 2.2].forEach((xOffset) => {
    ctx.beginPath();
    ctx.arc(xOffset * bodyScale, -2.1 * bodyScale, 0.72 * bodyScale, 0, Math.PI * 2);
    ctx.fill();
  });

  if (getStatusStacks(unit, "poison") > 0) {
    ctx.fillStyle = "rgba(131, 232, 117, 0.35)";
    ctx.beginPath();
    ctx.arc(0, 1 * bodyScale, 9 * bodyScale, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawInkLord(main, dark, light, scale, unit) {
  const bodyScale = (scale * 2.15) / 2.1;
  const battleTime = state.battle?.time || 0;
  const pulse = 0.3 + Math.max(0, Math.sin(battleTime * 3.8 + unit.statusVisualSeed)) * 0.28;
  ctx.fillStyle = `rgba(28, 21, 43, ${0.38 + pulse * 0.18})`;
  ctx.beginPath();
  ctx.moveTo(-20 * bodyScale, -10 * bodyScale);
  ctx.quadraticCurveTo(-30 * bodyScale, 12 * bodyScale, -18 * bodyScale, 28 * bodyScale);
  ctx.lineTo(0, 35 * bodyScale);
  ctx.lineTo(18 * bodyScale, 28 * bodyScale);
  ctx.quadraticCurveTo(31 * bodyScale, 10 * bodyScale, 21 * bodyScale, -12 * bodyScale);
  ctx.lineTo(10 * bodyScale, -30 * bodyScale);
  ctx.lineTo(-8 * bodyScale, -30 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = `rgba(171, 154, 255, ${0.28 + pulse * 0.22})`;
  ctx.lineWidth = 2 * bodyScale;
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 7 * bodyScale, -25 * bodyScale);
    ctx.lineTo(i * 13 * bodyScale, -38 * bodyScale);
    ctx.lineTo(i * 18 * bodyScale, -26 * bodyScale);
    ctx.stroke();
  }

  drawStepLegs("#0b0911", scale * 1.8, unit, 8.8, 15);
  ctx.fillStyle = "#09090d";
  ctx.beginPath();
  ctx.moveTo(0, -25 * bodyScale);
  ctx.lineTo(16 * bodyScale, -10 * bodyScale);
  ctx.lineTo(14 * bodyScale, 16 * bodyScale);
  ctx.lineTo(6 * bodyScale, 20 * bodyScale);
  ctx.lineTo(0, 25 * bodyScale);
  ctx.lineTo(-6 * bodyScale, 20 * bodyScale);
  ctx.lineTo(-14 * bodyScale, 16 * bodyScale);
  ctx.lineTo(-16 * bodyScale, -10 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.moveTo(0, -19 * bodyScale);
  ctx.lineTo(11 * bodyScale, -8 * bodyScale);
  ctx.lineTo(10 * bodyScale, 15 * bodyScale);
  ctx.lineTo(4 * bodyScale, 18 * bodyScale);
  ctx.lineTo(0, 22 * bodyScale);
  ctx.lineTo(-4 * bodyScale, 18 * bodyScale);
  ctx.lineTo(-10 * bodyScale, 15 * bodyScale);
  ctx.lineTo(-11 * bodyScale, -8 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(242, 236, 255, 0.92)";
  ctx.beginPath();
  ctx.moveTo(0, -23 * bodyScale);
  ctx.lineTo(6 * bodyScale, -16 * bodyScale);
  ctx.lineTo(3 * bodyScale, -7 * bodyScale);
  ctx.lineTo(-3 * bodyScale, -7 * bodyScale);
  ctx.lineTo(-6 * bodyScale, -16 * bodyScale);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#a999ff";
  ctx.beginPath();
  ctx.arc(-2.4 * bodyScale, -13.5 * bodyScale, 1.2 * bodyScale, 0, Math.PI * 2);
  ctx.arc(2.4 * bodyScale, -13.5 * bodyScale, 1.2 * bodyScale, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(201, 187, 255, ${0.4 + pulse * 0.25})`;
  ctx.lineWidth = 1.4 * bodyScale;
  ctx.beginPath();
  ctx.arc(0, -14 * bodyScale, 7.6 * bodyScale, Math.PI * 1.07, Math.PI * 1.93);
  ctx.stroke();

  ctx.strokeStyle = "#efe8ff";
  ctx.lineWidth = 3.1 * bodyScale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(12 * bodyScale, -7 * bodyScale);
  ctx.lineTo(27 * bodyScale, -32 * bodyScale);
  ctx.stroke();

  ctx.fillStyle = "#d8d1e8";
  ctx.beginPath();
  ctx.moveTo(26 * bodyScale, -34 * bodyScale);
  ctx.lineTo(36 * bodyScale, -14 * bodyScale);
  ctx.lineTo(31 * bodyScale, 10 * bodyScale);
  ctx.lineTo(23 * bodyScale, 4 * bodyScale);
  ctx.lineTo(22 * bodyScale, -10 * bodyScale);
  ctx.closePath();
  ctx.fill();

  const swordGlow = ctx.createLinearGradient(18 * bodyScale, -24 * bodyScale, 34 * bodyScale, 6 * bodyScale);
  swordGlow.addColorStop(0, `rgba(251, 244, 255, ${0.36 + pulse * 0.18})`);
  swordGlow.addColorStop(1, "rgba(109, 92, 255, 0)");
  ctx.strokeStyle = swordGlow;
  ctx.lineWidth = 6 * bodyScale;
  ctx.beginPath();
  ctx.moveTo(22 * bodyScale, -25 * bodyScale);
  ctx.lineTo(32 * bodyScale, 8 * bodyScale);
  ctx.stroke();
}

function drawCatapult(main, dark, light, scale) {
  const wheelY = 11 * scale / 2.1;
  ctx.strokeStyle = "#4f3821";
  ctx.lineWidth = 2.2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(-13 * scale / 2.1, wheelY);
  ctx.lineTo(13 * scale / 2.1, wheelY);
  ctx.moveTo(-6 * scale / 2.1, 5 * scale / 2.1);
  ctx.lineTo(6 * scale / 2.1, 5 * scale / 2.1);
  ctx.stroke();

  ctx.strokeStyle = main;
  ctx.lineWidth = 4.4 * scale / 2.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-8 * scale / 2.1, wheelY);
  ctx.lineTo(1 * scale / 2.1, -11 * scale / 2.1);
  ctx.lineTo(11 * scale / 2.1, wheelY - 1 * scale / 2.1);
  ctx.stroke();

  ctx.fillStyle = shadeColor(main, -0.14);
  ctx.beginPath();
  ctx.arc(-10 * scale / 2.1, wheelY, 5.6 * scale / 2.1, 0, Math.PI * 2);
  ctx.arc(11 * scale / 2.1, wheelY, 5.6 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 1.4 * scale / 2.1;
  [-10, 11].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo((x - 4) * scale / 2.1, wheelY);
    ctx.lineTo((x + 4) * scale / 2.1, wheelY);
    ctx.moveTo(x * scale / 2.1, (11 - 4) * scale / 2.1);
    ctx.lineTo(x * scale / 2.1, (11 + 4) * scale / 2.1);
    ctx.stroke();
  });

  ctx.fillStyle = "#74685e";
  ctx.beginPath();
  ctx.arc(4 * scale / 2.1, -14 * scale / 2.1, 4.7 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(2.5 * scale / 2.1, -16 * scale / 2.1, 1.8 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
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

function drawTraces(viewport, traces) {
  (traces || []).forEach((trace) => {
    const start = worldToScreen(trace.startX, trace.startY, viewport);
    const end = worldToScreen(trace.endX, trace.endY, viewport);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    if (length <= 0.001) return;
    const progress = clamp((trace.age || 0) / Math.max(trace.duration || 0.001, 0.001), 0, 1);
    const tailProgress = clamp(progress - (trace.trailFraction || 0.22), 0, 1);
    const headX = lerp(start.x, end.x, progress);
    const headY = lerp(start.y, end.y, progress);
    const tailX = lerp(start.x, end.x, tailProgress);
    const tailY = lerp(start.y, end.y, tailProgress);
    const alpha = clamp(1 - progress * 0.65, 0, 1);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = trace.color || "#ffe4a8";
    ctx.lineWidth = (trace.width || 3) * start.scale / 2.1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.stroke();

    const glow = ctx.createLinearGradient(tailX, tailY, headX, headY);
    glow.addColorStop(0, "rgba(255, 250, 232, 0)");
    glow.addColorStop(0.35, "rgba(255, 244, 198, 0.95)");
    glow.addColorStop(1, "rgba(255, 232, 162, 0)");
    ctx.strokeStyle = glow;
    ctx.lineWidth = (trace.width || 3) * 2.4 * start.scale / 2.1;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.stroke();

    ctx.translate(headX, headY);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = "rgba(255, 239, 189, 0.95)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-8 * end.scale / 2.1, 2.4 * end.scale / 2.1);
    ctx.lineTo(-8 * end.scale / 2.1, -2.4 * end.scale / 2.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
}

function drawSpells(viewport, battle) {
  battle.spells.forEach((spell) => {
    const source = findUnitById(battle, spell.sourceId);
    const target = findUnitById(battle, spell.targetId);
    if (!source || !target) return;
    if (spell.kind === "flame-breath") {
      drawFireBreathSpell(viewport, spell, source, target);
      return;
    }
    const sourcePose = getUnitRenderPose(source, viewport);
    const targetPose = getUnitRenderPose(target, viewport);
    const start = {
      x: sourcePose.point.x,
      y: sourcePose.bodyY - 18 * sourcePose.scale / 2.1,
      scale: sourcePose.scale,
    };
    const end = {
      x: targetPose.point.x,
      y: targetPose.bodyY,
      scale: targetPose.scale,
    };
    ctx.strokeStyle = hexToRgba(spell.color || "#89e1ff", 0.82);
    ctx.lineWidth = 3 * start.scale / 2.1;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });
}

function drawFireBreathSpell(viewport, spell, source, target) {
  const sourcePose = getUnitRenderPose(source, viewport);
  const startX = sourcePose.point.x + (source.displayFacingX || 1) * 8 * sourcePose.scale / 2.1;
  const startY = sourcePose.bodyY - 7 * sourcePose.scale / 2.1;
  const breathAngle = Math.atan2(target.y - source.y, target.x - source.x);
  const coneLength = spell.range * sourcePose.scale / 2.1;
  const leftAngle = breathAngle - spell.coneAngle * 0.5;
  const rightAngle = breathAngle + spell.coneAngle * 0.5;
  const leftX = startX + Math.cos(leftAngle) * coneLength;
  const leftY = startY + Math.sin(leftAngle) * coneLength * 0.72;
  const rightX = startX + Math.cos(rightAngle) * coneLength;
  const rightY = startY + Math.sin(rightAngle) * coneLength * 0.72;
  const gradient = ctx.createRadialGradient(startX, startY, 3, startX, startY, coneLength);
  gradient.addColorStop(0, "rgba(255, 244, 194, 0.92)");
  gradient.addColorStop(0.35, "rgba(255, 161, 72, 0.72)");
  gradient.addColorStop(1, "rgba(255, 98, 24, 0.04)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(leftX, leftY);
  ctx.quadraticCurveTo(
    startX + Math.cos(breathAngle) * coneLength * 0.85,
    startY + Math.sin(breathAngle) * coneLength * 0.64,
    rightX,
    rightY,
  );
  ctx.closePath();
  ctx.fill();
}

function getUnitRenderPose(unit, viewport) {
  const point = worldToScreen(unit.x, unit.y, viewport);
  const scale = point.scale;
  const gaitBob = unit.bob * 5.5 * scale / 2.1;
  const bodyY = point.y - unit.z * scale / 2.1 - gaitBob;
  return { point, scale, bodyY };
}

function drawParticles(viewport, particles) {
  particles.forEach((particle) => {
    const point = worldToScreen(particle.x, particle.y, viewport);
    const alpha = 1 - particle.age / particle.life;
    if (particle.kind === "shockwave" || particle.kind === "ring" || particle.kind === "debug-ring") {
      ctx.strokeStyle = hexToRgba(particle.color, particle.kind === "shockwave" ? alpha * 0.85 : particle.kind === "debug-ring" ? alpha : alpha * 0.45);
      ctx.lineWidth = (particle.lineWidth || 4) * point.scale / (particle.kind === "debug-ring" ? 1 : 2.1) * (particle.kind === "shockwave" ? (1 - alpha * 0.25) : 1);
      ctx.beginPath();
      ctx.arc(point.x, point.y, particle.size * point.scale, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    if (particle.kind === "debris") {
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(particle.rotation || 0);
      ctx.fillStyle = hexToRgba(particle.color, alpha);
      ctx.fillRect(
        -(particle.size * 0.55) * point.scale / 2.1,
        -(particle.size * 0.4) * point.scale / 2.1,
        particle.size * point.scale / 2.1,
        particle.size * 0.8 * point.scale / 2.1,
      );
      ctx.restore();
      return;
    }
    if (particle.kind === "dust") {
      ctx.fillStyle = hexToRgba(particle.color, alpha * 0.45);
      ctx.beginPath();
      ctx.ellipse(point.x, point.y, particle.size * point.scale / 2.1, particle.size * 0.62 * point.scale / 2.1, 0, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (particle.kind === "ink-spark") {
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate((particle.rotation || 0) + particle.age * 3.5);
      ctx.fillStyle = hexToRgba(particle.color, alpha * 0.9);
      ctx.beginPath();
      ctx.moveTo(0, -(particle.size * 0.85) * point.scale / 2.1);
      ctx.lineTo((particle.size * 0.35) * point.scale / 2.1, 0);
      ctx.lineTo(0, (particle.size * 0.85) * point.scale / 2.1);
      ctx.lineTo(-(particle.size * 0.35) * point.scale / 2.1, 0);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = hexToRgba("#efe8ff", alpha * 0.65);
      ctx.lineWidth = 1.1 * point.scale / 2.1;
      ctx.stroke();
      ctx.restore();
      return;
    }
    ctx.fillStyle = hexToRgba(particle.color, particle.kind === "blast-glow" ? alpha * 0.22 : alpha);
    ctx.beginPath();
    ctx.arc(point.x, point.y, particle.size * point.scale * (particle.kind === "blast-glow" ? 1 : alpha), 0, Math.PI * 2);
    ctx.fill();
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }
function smoothStep(edge0, edge1, value) {
  const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function getCameraBezierPoint(start, control1, control2, end, t) {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;
  return {
    x: (uuu * start.x) + (3 * uu * t * control1.x) + (3 * u * tt * control2.x) + (ttt * end.x),
    y: (uuu * start.y) + (3 * uu * t * control1.y) + (3 * u * tt * control2.y) + (ttt * end.y),
  };
}

function normalizeAngle(angle) {
  let normalized = angle;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  while (normalized < -Math.PI) normalized += Math.PI * 2;
  return normalized;
}

function lerpAngle(from, to, t) {
  return from + normalizeAngle(to - from) * t;
}
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


