
const STORAGE_KEY = "tbr-warfare-state-v1";
const FIELD = { width: 1180, height: 760 };
const SPEED_OPTIONS = [0.35, 0.65, 1, 1.4, 1.85];
const AUDIO_DEFAULT_FADE_SECONDS = 1.8;
const AUDIO_END_FADE_SECONDS = 0.4;
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
const INKLORD_DEBUG_DELAY = 60;
const HEALTH_CHART_SAMPLE_INTERVAL = 0.16;
const HEALTH_CHART_VISIBLE_SECONDS = 30;
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
const DEFAULT_COMPOSITION = { archer: 1, mage: 1, knight: 1, bodyguard: 0, medic: 0, bomber: 0, assassin: 0, mountainman: 0, catapult: 0, poisoner: 0, firebreather: 0, necromancer: 0, graverobber: 0, arachnomist: 0 };
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
const UNIT_SPRITE_LAYOUTS = {
  archer: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  mage: { height: 39, anchorX: 0.5, anchorY: 0.88 },
  knight: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  bodyguard: { height: 43, anchorX: 0.5, anchorY: 0.88 },
  medic: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  bomber: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  assassin: { height: 38, anchorX: 0.5, anchorY: 0.88 },
  mountainman: { height: 41, anchorX: 0.5, anchorY: 0.88 },
  catapult: { height: 48, anchorX: 0.5, anchorY: 0.9 },
  poisoner: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  firebreather: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  necromancer: { height: 42, anchorX: 0.5, anchorY: 0.88 },
  graverobber: { height: 40, anchorX: 0.5, anchorY: 0.88 },
  arachnomist: { height: 41, anchorX: 0.5, anchorY: 0.88 },
  spiderswarm: { height: 26, anchorX: 0.5, anchorY: 0.92 },
};
const UNIT_SPRITE_TINT_ALPHA = 0.56;
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
    stats: { maxHealth: 210, speed: 28, range: 26, damage: 38, cooldown: 1.05 },
    healthBarWidth: 30,
    iconPaths: getKnightIconSvgPaths,
    getMoveSpeed: (unit, unitDef) => getUnitStats(unit, unitDef).speed,
    performAttack: performKnightAttack,
    render: drawKnight,
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
    isTargetable: ({ unit, attacker }) => !(unit.invisible && attacker && attacker.factionId !== unit.factionId),
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
    propWeights: {
      common: { ...DEFAULT_PROP_WEIGHTS, ...commonProps },
      rare: { ...rareProps },
    },
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

const state = {
  factions: [],
  battle: null,
  tournament: null,
  images: new Map(),
  unitSpriteSources: new Map(),
  statusBadgeSources: new Map(),
  tintedUnitSprites: new Map(),
  running: false,
  roundsApplied: 0,
  speedIndex: 2,
  audio: createAudioState(),
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
  randomizeArenaBtn: document.getElementById("randomizeArenaBtn"),
  seedSampleBtn: document.getElementById("seedSampleBtn"),
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
  battleTicker: document.getElementById("battleTicker"),
  battleHealthChart: document.getElementById("battleHealthChart"),
  battleHealthChartCanvas: document.getElementById("battleHealthChartCanvas"),
  knockoutAnnouncement: document.getElementById("knockoutAnnouncement"),
  bossAnnouncement: document.getElementById("bossAnnouncement"),
  winnerCard: document.getElementById("winnerCard"),
  winnerModal: document.getElementById("winnerModal"),
  closeWinnerModalBtn: document.getElementById("closeWinnerModalBtn"),
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
const chartCtx = els.battleHealthChartCanvas.getContext("2d");
let lastFrame = performance.now();

bootstrap();

function bootstrap() {
  loadState();
  if (!state.factions.length) {
    state.factions = cloneData(SAMPLE_BOOKS).map(withFactionDefaults);
    saveState();
  }
  bindUi();
  initializeBattleAudio();
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
  els.randomizeArenaBtn.addEventListener("click", randomizeArenaAndWeather);
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
  els.winnerModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeWinner) closeWinnerModal();
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
  const pauseButton = document.createElement("button");
  const canResume = state.battle && !state.battle.completed && state.battle.time > 0;
  pauseButton.className = `speed-btn${!state.running && canResume ? " active" : ""}`;
  pauseButton.textContent = "Pause";
  pauseButton.title = state.running ? "Pause the current battle" : "Resume the current battle";
  pauseButton.disabled = !state.battle || state.battle.completed || (!state.running && !canResume);
  pauseButton.addEventListener("click", togglePauseBattle);
  els.speedControls.appendChild(pauseButton);
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


function getUnitIconMarkup(unitId) {
  return `
    <svg class="unit-icon-svg unit-${unitId}" viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">
      ${getUnitIconSvgPaths(unitId)}
    </svg>
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
    bodyguard: row.bodyguard ?? row.bodyguards,
    medic: row.medic ?? row.medics,
    bomber: row.bomber ?? row.bombers,
    assassin: row.assassin ?? row.assassins,
    mountainman: row.mountainman ?? row.mountainmen ?? row.menofthemountain,
    catapult: row.catapult ?? row.catapults,
    poisoner: row.poisoner ?? row.poisoners,
    firebreather: row.firebreather ?? row.firebreathers,
    arachnomist: row.arachnomist ?? row.arachnomists,
  };
}

function parseCompositionString(text) {
  if (!text?.trim()) return { ...DEFAULT_COMPOSITION };
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
    return unit.name.toLowerCase().includes(term)
      || unit.keywords.some((word) => word.includes(term))
      || unit.description.toLowerCase().includes(term);
  });

  els.compositionResults.innerHTML = available.map((unit) => `
    <div class="unit-result">
      <div class="unit-panel-main">
        <div class="unit-icon unit-icon-${unit.id}">${getUnitIconMarkup(unit.id)}</div>
        <div class="unit-copy">
          <div class="unit-header">
            <strong>${unit.name}</strong>
            <p class="unit-keywords">${unit.keywords.join(", ")}</p>
          </div>
          <p class="unit-description">${unit.description}</p>
          <p class="unit-veteran-copy">Veteran: ${getVeteranGoalLabel(unit.id)}</p>
        </div>
      </div>
      <div class="unit-actions">
        <button class="ghost small" data-add-unit="${unit.id}">Select</button>
      </div>
    </div>
  `).join("") || '<p class="hint">No matching units.</p>';

  els.compositionSelected.innerHTML = UNIT_LIBRARY.filter((unit) => draft[unit.id] > 0).map((unit) => `
    <div class="selected-unit">
      <div class="unit-panel-main">
        <div class="unit-icon unit-icon-${unit.id}">${getUnitIconMarkup(unit.id)}</div>
        <div class="unit-copy">
          <div class="unit-header">
            <strong>${unit.name}</strong>
            <p class="unit-keywords">${unit.keywords.join(", ")}</p>
          </div>
          <p class="unit-description">${unit.description}</p>
        </div>
      </div>
      <div class="button-row unit-actions">
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
  const chartRect = els.battleHealthChartCanvas.getBoundingClientRect();
  els.battleHealthChartCanvas.width = Math.max(1, Math.round(chartRect.width * dpr));
  els.battleHealthChartCanvas.height = Math.max(1, Math.round(chartRect.height * dpr));
  chartCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function resetBattle() {
  state.running = false;
  endBattleAudio();
  state.tournament = shouldUseTournament(state.factions) ? createTournament(state.factions) : null;
  state.battle = buildActiveBattle();
  clearKnockoutAnnouncement();
  clearBossAnnouncement();
  resetCamera();
  els.battleState.textContent = state.tournament ? getCurrentMatchLabel(state.tournament) : "Ready";
  els.winnerLabel.textContent = "None yet";
  closeWinnerModal();
  renderArmyEditors();
  renderBracketTracker();
  updateAdvanceButtonLabel();
  renderSpeedControls();
  setTicker(state.factions.length ? getReadyMessage() : "Add at least one army to begin.");
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
}

function shouldUseTournament(factions) {
  return factions.length > MAX_BATTLE_FACTIONS;
}

function getReadyMessage() {
  if (!state.tournament) return "Armies are awaiting the signal.";
  const match = getCurrentTournamentMatch(state.tournament);
  return match ? `${getCurrentMatchLabel(state.tournament)} awaits in ${match.arena.name}.` : "Bracket stands ready.";
}

function buildActiveBattle() {
  if (state.tournament) {
    const match = getCurrentTournamentMatch(state.tournament);
    if (match) {
      return buildBattle(match.factionIds.map((id) => findSourceFaction(id)).filter(Boolean).map((faction) => cloneData(faction)), match.arena, {
        tournamentRound: state.tournament.currentRoundIndex,
        tournamentMatch: state.tournament.currentMatchIndex,
      });
    }
  }
  return buildBattle(state.factions, createRandomArenaVariant(0, 0, state.factions.length), null);
}

function buildBattle(factionPool = state.factions, arena = createArenaVariant(0, 0, factionPool.length), meta = null) {
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
  const battle = {
    field,
    factions,
    graves: [],
    projectiles: [],
    particles: [],
    spells: [],
    swipes: [],
    bossBubbles: [],
    stuckArrows: [],
    bombs: [],
    arena,
    weatherField: createWeatherField(arena.weather),
    props: buildFieldProps(field, arena),
    pendingWinner: null,
    completed: false,
    meta,
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
  return {
    id: `grave-${unit.id}-${Math.random().toString(36).slice(2, 7)}`,
    x: unit.x,
    y: unit.y,
    factionId: unit.factionId,
    unitType: unit.type,
    variantId: variant.id,
    variantKind: variant.kind,
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
  return GRAVE_VARIANTS.find((variant) => variant.id === grave?.variantId) || GRAVE_VARIANTS[0];
}

function findSourceFaction(factionId) {
  return state.factions.find((entry) => entry.id === factionId);
}

function getActiveBattleFactions() {
  return state.battle?.factions || state.factions;
}

function createTournament(factions) {
  const factionIds = factions.map((faction) => faction.id);
  return {
    originalFactionIds: factionIds,
    currentRoundIndex: 0,
    currentMatchIndex: 0,
    rounds: [createTournamentRound(factionIds, 0)],
    eliminated: Object.fromEntries(factionIds.map((id) => [id, { fled: 0, growth: 0, eliminated: false }])),
    championId: null,
    complete: false,
  };
}

function createTournamentRound(factionIds, roundIndex) {
  const groups = chunkEvenly(factionIds, Math.ceil(factionIds.length / MAX_BATTLE_FACTIONS));
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
    return Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      length: 12 + Math.random() * 18,
      drift: 8 + Math.random() * 11,
      speed: 280 + Math.random() * 180,
      alpha: 0.12 + Math.random() * 0.2,
    }));
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
    return Array.from({ length: 320 }, () => ({
      x: Math.random(),
      y: Math.random(),
      length: 18 + Math.random() * 24,
      drift: 10 + Math.random() * 14,
      speed: 420 + Math.random() * 240,
      alpha: 0.18 + Math.random() * 0.26,
    }));
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
  battle.props = buildFieldProps(battle.field, arena);
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
  if (["damage", "heal", "backstabDamage", "slashDamage", "impulseDamage", "holdDamage", "poisonDamage", "igniteDamage", "biteDamage", "biteHeal"].includes(stat)) return value * VETERAN_BONUSES.power;
  if (["range", "abductRange", "splash", "deathSplash", "impulseRange", "impulseDistance", "holdRange", "resetRadius", "contagionRadius", "raiseRange", "graveRange", "graveDeadZone", "auraRadius", "aggroRadius"].includes(stat)) return value * VETERAN_BONUSES.radius;
  if (stat === "speed") return value * VETERAN_BONUSES.speed;
  if (stat === "cooldown") return value * VETERAN_BONUSES.cooldown;
  if (["holdDuration", "poisonDuration", "igniteDuration", "breathDuration"].includes(stat)) return value * VETERAN_BONUSES.duration;
  return value;
}

function scaleZombieStat(stat, value) {
  if (typeof value !== "number") return value;
  if (stat === "maxHealth") return value * ZOMBIE_PENALTIES.maxHealth;
  if (["damage", "heal", "backstabDamage", "slashDamage", "impulseDamage", "holdDamage", "poisonDamage", "igniteDamage", "biteDamage", "biteHeal"].includes(stat)) return value * ZOMBIE_PENALTIES.power;
  if (["range", "abductRange", "splash", "deathSplash", "impulseRange", "impulseDistance", "holdRange", "resetRadius", "contagionRadius", "raiseRange", "graveRange", "graveDeadZone", "auraRadius", "aggroRadius"].includes(stat)) return value * ZOMBIE_PENALTIES.radius;
  if (stat === "speed") return value * ZOMBIE_PENALTIES.speed;
  if (stat === "cooldown") return value * ZOMBIE_PENALTIES.cooldown;
  if (["holdDuration", "poisonDuration", "igniteDuration", "breathDuration"].includes(stat)) return value * ZOMBIE_PENALTIES.duration;
  return value;
}

function getUnitStats(unitOrType, unitDef = getUnitDefinition(unitOrType)) {
  const unit = typeof unitOrType === "string" ? null : unitOrType;
  const zombie = Boolean(unit && getUnitStatus(unit, "zombie"));
  if (!unit?.veteran && !zombie && !unitDef.modifyStats) return unitDef.stats;
  const scaledStats = {};
  Object.entries(unitDef.stats).forEach(([stat, value]) => {
    let nextValue = value;
    if (unit?.veteran) nextValue = scaleVeteranStat(stat, nextValue);
    if (zombie) nextValue = scaleZombieStat(stat, nextValue);
    scaledStats[stat] = nextValue;
  });
  return unitDef.modifyStats ? unitDef.modifyStats(unit, scaledStats) : scaledStats;
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
  return unit?.veteran ? VETERAN_BONUSES.spriteScale : 1;
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
  if (!unit || unit.dead || !statusDef || stacks <= 0) return null;
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
    bravery: 0.28 + Math.random() * 0.65,
    dead: false,
    fled: false,
    fleeing: false,
    liftedBySpellId: null,
    displacedBySpellId: null,
    activeSpellId: null,
    killStreak: 0,
    walkTilt: 0,
    rotation: 0,
    gaitPhase: Math.random() * Math.PI * 2,
    stride: 0,
    bob: 0,
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

function drawStatusBadgeSprite(statusId, scale) {
  const source = getStatusBadgeSource(statusId);
  if (!source || source.status !== "loaded" || !source.image?.complete) return false;
  const size = 11.5 * scale / 2.1;
  ctx.drawImage(source.image, -size / 2, -size / 2, size, size);
  return true;
}

function loop(timestamp) {
  const dt = Math.min(0.033, (timestamp - lastFrame) / 1000);
  lastFrame = timestamp;
  const simDt = dt * SPEED_OPTIONS[state.speedIndex];
  if (state.running && state.battle) stepBattle(state.battle, simDt);
  updateAudioFades(dt);
  updateCamera(dt);
  render();
  requestAnimationFrame(loop);
}

function stepBattle(battle, dt) {
  battle.time += dt;
  updateInkLordEvent(battle, dt);
  updateBodyguardAuras(battle);
  updateStatuses(battle, dt);
  battle.factions.forEach((faction) => {
    updateFactionBanner(faction);
    faction.alive = faction.units.some((unit) => !unit.dead && !unit.fled);
    faction.units.forEach((unit) => updateUnit(unit, faction, battle, dt));
  });
  updateBodyguardAuras(battle);
  updateProjectiles(battle, dt);
  updateParticles(battle, dt);
  updateSpells(battle, dt);
  updateBossBubbles(battle, dt);
  updateSwipes(battle, dt);
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
    state.running = false;
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
    state.running = false;
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
      living.forEach((ally) => {
        if (Math.hypot(ally.x - bodyguard.x, ally.y - bodyguard.y) <= stats.auraRadius) {
          applyStatus(ally, "shielded", 1, 0.3, bodyguard, battle);
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
    status.duration -= dt;
    status.tickTimer += dt;
    while (status.tickTimer >= statusDef.tickInterval) {
      status.tickTimer -= statusDef.tickInterval;
      const damagePerTick = (status.dps ?? statusDef.dps) * status.stacks * statusDef.tickInterval;
      const source = findUnitById(battle, status.sourceId);
      applyDamage(unit, damagePerTick, battle, source, { damageKind: "status" });
      if (unit.dead) return false;
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
  if (!state.battle || state.battle.completed || (!state.running && state.battle.time <= 0)) return;
  state.running = !state.running;
  if (state.running) {
    resumeBattleAudio();
  } else {
    pauseBattleAudio();
  }
  els.battleState.textContent = state.running
    ? (state.tournament ? `${getCurrentMatchLabel(state.tournament)} in progress` : "Battling")
    : "Paused";
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
  Object.values(state.audio.tracks).forEach((track) => {
    track.element.pause();
  });
}

function resumeBattleAudio() {
  if (state.audio.activeMusicKey) ensureTrackPlayback(state.audio.activeMusicKey);
  const ambience = state.audio.tracks.ambience;
  if (ambience?.targetVolume > 0) ensureTrackPlayback("ambience");
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
  const unitDef = getUnitDefinition(unit);
  const stats = getUnitStats(unit, unitDef);
  const graves = battle.graves || [];
  if (unit.liftedBySpellId) {
    unit.vx = 0;
    unit.vy = 0;
    unit.walkTilt += (0 - unit.walkTilt) * 0.24;
    unit.stride += (0 - unit.stride) * 0.24;
    unit.bob += (0 - unit.bob) * 0.2;
    return;
  }
  if (unit.displacedBySpellId) {
    unit.vx = 0;
    unit.vy = 0;
    unit.walkTilt += (0 - unit.walkTilt) * 0.24;
    unit.stride += (0 - unit.stride) * 0.24;
    unit.bob += (0 - unit.bob) * 0.18;
    return;
  }

  unit.z += (0 - unit.z) * 0.18;
  const allies = findFaction(battle, faction.id).units.filter((ally) => (
    !ally.dead
    && !ally.fled
    && (unit.hostileToAll || !ally.hostileToAll || ally.id === unit.id)
  ));
  const enemies = getTargetableEnemies(battle, faction.id, unit);
  unitDef.beforeStep?.({ unit, faction, battle, allies, enemies, graves, unitDef, dt });
  if (unit.dead || unit.fled) return;
  if (!enemies.length && !graves.length && !unitDef.canActWithoutEnemies) return;
  const target = selectUnitTarget(unit, unitDef, enemies, allies, graves, battle);
  const distance = target ? Math.hypot(target.x - unit.x, target.y - unit.y) : 9999;
  const panicThreshold = unit.maxHealth * (0.28 + (1 - unit.bravery) * 0.3);
  unit.fleeing = unit.health < panicThreshold && Math.random() > unit.bravery * 0.86;

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
    unit.cooldown -= dt;
    if (unit.cooldown <= 0) {
      unitDef.performAttack?.({ unit, target, battle, unitDef });
      unit.cooldown = stats.cooldown * (0.8 + Math.random() * 0.5);
    }
  }

  unit.x += unit.vx * dt;
  unit.y += unit.vy * dt;
  keepOnField(unit, battle.field);
  applyThrallLeash(unit, battle, dt);
  unitDef.afterMove?.({ unit, faction, battle, allies, enemies, graves, target, unitDef, dt });

  const distFromCenter = Math.hypot(unit.x - battle.field.centerX, unit.y - battle.field.centerY);
  if (unit.fleeing && distFromCenter > battle.field.radius + 150) {
    unit.fled = true;
    setTicker(`${faction.title} has a routed survivor who may return next round.`);
    setHighlight(`${faction.title} breaks and vanishes in dust`);
    spawnBurst(battle, unit.x, unit.y - 8, "#f6e4b7", 26);
  }
}

function getTargetableEnemies(battle, factionId, attacker) {
  return battle.factions
    .flatMap((entry) => entry.units.filter((enemy) => (
      !enemy.dead
      && !enemy.fled
      && enemy.id !== attacker?.id
      && canUnitBeTargeted(enemy, attacker)
      && (enemy.factionId !== factionId || enemy.hostileToAll)
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
  if (unitDef.getMoveSpeed) return unitDef.getMoveSpeed(unit, unitDef);
  return stats.speed * (0.42 + 0.58 * (unit.health / unit.maxHealth));
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
  if (locked) return locked;
  const wounded = allies.filter((ally) => ally.id !== unit.id && (ally.health < ally.maxHealth || hasNegativeStatuses(ally)) && !ally.liftedBySpellId);
  if (wounded.length) {
    const target = wounded.sort((a, b) => {
      const aUrgency = (hasNegativeStatuses(a) ? 1 : 0) * 2 + (1 - a.health / a.maxHealth);
      const bUrgency = (hasNegativeStatuses(b) ? 1 : 0) * 2 + (1 - b.health / b.maxHealth);
      return bUrgency - aUrgency;
    })[0];
    unit.focusTargetId = target?.id || null;
    return target;
  }
  unit.focusTargetId = null;
  return allies.find((ally) => ally.id !== unit.id && !ally.liftedBySpellId) || null;
}

function selectBodyguardTarget({ unit, enemies, battle, unitDef }) {
  const locked = unit.guardTargetId ? findUnitById(battle, unit.guardTargetId) : null;
  if (locked && !locked.dead && !locked.fled && canUnitBeTargeted(locked, unit)) {
    unit.currentTargetKind = "enemy";
    unit.currentGraveId = null;
    return locked;
  }
  unit.guardTargetId = null;
  const stats = getUnitStats(unit, unitDef);
  let best = null;
  let bestDistance = Infinity;
  enemies.forEach((enemy) => {
    const distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
    if (distance > stats.aggroRadius || distance >= bestDistance) return;
    best = enemy;
    bestDistance = distance;
  });
  unit.guardTargetId = best?.id || null;
  unit.currentTargetKind = best ? "enemy" : null;
  unit.currentGraveId = null;
  return best;
}

function getBodyguardDestination({ unit, target, destination, battle, unitDef }) {
  if (target && unit.currentTargetKind === "enemy") return destination;
  const anchor = findFaction(battle, unit.factionId)?.bannerPos;
  if (!anchor) return { x: unit.x, y: unit.y };
  const distance = Math.hypot(anchor.x - unit.x, anchor.y - unit.y);
  if (distance <= 14) return { x: unit.x, y: unit.y };
  unit.guardTargetId = null;
  return { x: anchor.x, y: anchor.y };
}

function updateAssassinState({ unit, faction, battle, enemies }) {
  const stats = getUnitStats(unit);
  if (unit.behaviorState !== "retreat") {
    unit.invisible = true;
  }
  if (unit.behaviorState === "retreat") {
    unit.invisible = false;
    const homeBase = findFaction(battle, faction.id)?.homeBase || { x: unit.x, y: unit.y };
    if (Math.hypot(unit.x - homeBase.x, unit.y - homeBase.y) <= stats.resetRadius) {
      unit.behaviorState = "stalking";
      unit.invisible = true;
      unit.focusTargetId = null;
      unit.slashCooldown = 0;
      unit.cooldown = Math.max(unit.cooldown, 0.3);
    }
  }
  if (unit.focusTargetId && !enemies.some((enemy) => enemy.id === unit.focusTargetId)) {
    unit.focusTargetId = null;
  }
}

function selectAssassinTarget({ unit, enemies }) {
  if (unit.behaviorState === "retreat") return null;
  const locked = enemies.find((enemy) => enemy.id === unit.focusTargetId);
  if (locked) return locked;
  const target = enemies
    .slice()
    .sort((a, b) => {
      const scoreA = Math.hypot(a.x - unit.x, a.y - unit.y) * 0.7 + a.health * 0.3;
      const scoreB = Math.hypot(b.x - unit.x, b.y - unit.y) * 0.7 + b.health * 0.3;
      return scoreA - scoreB;
    })[0] || null;
  unit.focusTargetId = target?.id || null;
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
  const targetTilt = speed > 10 ? clamp(unit.vx / 80, -1, 1) * 0.12 : 0;
  const gaitSpeed = clamp(speed / 38, 0, 2.4);
  unit.gaitPhase += dt * (7 + gaitSpeed * 7.5);
  const targetStride = speed > 8 ? Math.sin(unit.gaitPhase) * Math.min(1, gaitSpeed) : 0;
  const targetBob = speed > 8 ? (0.5 - Math.cos(unit.gaitPhase * 2) * 0.5) * Math.min(1, gaitSpeed) : 0;
  unit.walkTilt += (targetTilt - unit.walkTilt) * Math.min(1, dt * 10);
  unit.stride += (targetStride - unit.stride) * Math.min(1, dt * 12);
  unit.bob += (targetBob - unit.bob) * Math.min(1, dt * 12);
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

function selectDefaultTarget({ unit, enemies }) {
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
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

function updateNecromancerState({ unit, battle }) {
  if (unit.thrallOwnerId) {
    unit.thrallIds = [];
    return;
  }
  unit.thrallIds = getLivingThrallIds(unit, battle);
}

function selectNecromancerTarget({ unit, enemies, graves, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (unit.thrallOwnerId) {
    unit.currentTargetKind = "enemy";
    unit.currentGraveId = null;
    return selectDefaultTarget({ unit, enemies });
  }
  unit.thrallIds = unit.thrallIds || [];
  if (unit.thrallIds.length < stats.maxThralls) {
    const grave = findNearestGrave(unit, graves);
    if (grave) {
      unit.currentTargetKind = "grave";
      unit.currentGraveId = grave.id;
      return grave;
    }
  }
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
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
    removeGrave(battle, grave.id);
    spawnBurst(battle, grave.x, grave.y - 4, "#7d5ab8", 20);
    battle.particles.push({ kind: "ring", x: grave.x, y: grave.y, vx: 0, vy: 0, life: 0.55, age: 0, color: "#5e3f82", size: 18, lineWidth: 4 });
    setHighlight(`${findFaction(battle, unit.factionId).title}'s necromancer raises a ${getUnitDefinition(thrall).name.toLowerCase()} thrall`);
    return;
  }
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 6) return;
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
    return grave;
  }
  unit.currentTargetKind = "enemy";
  unit.currentGraveId = null;
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
    unit.gravesRobbed = (unit.gravesRobbed || 0) + 1;
    syncUnitMaxHealth(unit, true);
    spawnBurst(battle, grave.x, grave.y - 3, "#b59363", 16);
    setHighlight(`${findFaction(battle, unit.factionId).title}'s graverobber plunders a grave and grows bolder`);
    return;
  }
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
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
  applyDamage(target, stats.biteDamage * (0.88 + Math.random() * 0.28), battle, unit);
  applyStatus(target, "poison", stats.poisonStacks, stats.poisonDuration, unit, battle);
  battle.swipes.push({ x: target.x, y: target.y - 4, angle: unit.facing, life: 0.14, maxLife: 0.14, color: "rgba(120, 173, 82, 0.9)" });
  spawnBurst(battle, target.x, target.y - 1, "#8bd266", 4);
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
  return battle.factions.flatMap((faction) => faction.units.filter((unit) => (
    !unit.dead
    && !unit.fled
    && unit.id !== attacker.id
    && canUnitBeTargeted(unit, attacker)
    && (unit.factionId !== attacker.factionId || unit.hostileToAll)
    && Math.hypot(unit.x - x, unit.y - y) <= radius
  )));
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
    return;
  }
  if (distance <= stats.range) {
    battle.projectiles.push({ kind: "orb", sourceId: unit.id, progress: 0, duration: 0.44 + Math.random() * 0.24, startX: unit.x, startY: unit.y - 24, endX: target.x, endY: target.y, targetId: target.id, damage: stats.damage * (1.05 + Math.random() * 0.65), radius: 44 * (unit.veteran ? VETERAN_BONUSES.radius : 1) });
  }
}

function performFirebreatherAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target) return;
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
    castMountainHold(unit, target, battle, unitDef);
    return;
  }
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
  battle.spells.push({
    id: spellId,
    kind: "mountain-hold",
    sourceId: unit.id,
    targetId: target.id,
    time: 0,
    duration: stats.holdDuration,
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
    applyDamage(target, amount, battle, unit, { damageKind: "healing" });
    battle.particles.push({ x: target.x, y: target.y - 10, vx: 0, vy: -14, life: 0.5, age: 0, color: "#7f6a57", size: 6 });
    setHighlight(`${findFaction(battle, unit.factionId).title}'s medic burns a zombie thrall with restorative energy`);
    if (target.dead) unit.focusTargetId = null;
    return;
  }
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
  const endX = target.x + (Math.random() - 0.5) * 14;
  const endY = target.y + (Math.random() - 0.5) * 14;
  const throwDistance = Math.hypot(endX - unit.x, endY - unit.y);
  battle.projectiles.push({ kind: "bomb", sourceId: unit.id, progress: 0, duration: clamp(0.48 + throwDistance / 250 + Math.random() * 0.12, 0.5, 1.15), startX: unit.x, startY: unit.y - 16, endX, endY, targetId: target.id, damage: stats.damage, radius: stats.splash, fuse: stats.fuse, landed: false, timer: 0 });
}

function performBodyguardAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (!target || Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  applyDamage(target, stats.damage * (0.9 + Math.random() * 0.3), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 10, angle: unit.facing, life: 0.2, maxLife: 0.2, color: "rgba(188, 233, 247, 0.82)" });
  spawnBurst(battle, target.x, target.y - 2, "#cdefff", 8);
}

function performKnightAttack({ unit, target, battle, unitDef }) {
  const stats = getUnitStats(unit, unitDef);
  if (Math.hypot(target.x - unit.x, target.y - unit.y) > stats.range + 4) return;
  applyDamage(target, stats.damage * (0.92 + Math.random() * 0.46), battle, unit);
  battle.swipes.push({ x: target.x, y: target.y - 12, angle: unit.facing, life: 0.22, maxLife: 0.22, color: shadeColor(findFaction(battle, unit.factionId).color, 0.35) });
  spawnBurst(battle, target.x, target.y, "#ffd59b", 10);
}

function findFaction(battle, factionId) {
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
  battle.factions.forEach((faction) => {
    faction.units.forEach((other) => {
      if (other.id === source.id || other.dead || other.fled) return;
      const dx = other.x - source.x;
      const dy = other.y - source.y;
      const distance = Math.hypot(dx, dy);
      if (distance > spell.range) return;
      const angleDiff = Math.abs(normalizeAngle(Math.atan2(dy, dx) - breathAngle));
      if (angleDiff > spell.coneAngle * 0.5) return;
      const distanceScale = clamp(1 - distance / spell.range, 0.35, 1);
      applyDamage(other, spell.dps * distanceScale * dt, battle, source);
      if (faction.id !== source.factionId) {
        trackFlameExposure(other, source, spell, dt, battle);
      }
    });
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
  target.x = clamp(source.x + spell.holdOffsetX, 24, battle.field.width - 24);
  target.y = clamp(source.y - spell.holdOffsetY, 24, battle.field.height - 24);
  target.z = 24 + Math.sin(spell.time * 7) * 4;
  target.vx = 0;
  target.vy = 0;
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

function getExplosionReadableRadius(radius) {
  return Math.max(0, radius - EXPLOSION_READABILITY_INSET);
}

function explodeAt(battle, x, y, radius, damage, attacker, color, burstCount, showDebugRings = false) {
  battle.factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (unit.dead || unit.fled) return;
      const readableRadius = getExplosionReadableRadius(radius);
      if (readableRadius <= 0) return;
      const dist = Math.hypot(unit.x - x, unit.y - y);
      if (dist <= readableRadius) {
        applyDamage(unit, damage * Math.max(0.70, 1 - dist / readableRadius), battle, attacker);
      }
    });
  });
  const readableRadius = getExplosionReadableRadius(radius);
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
  const damageKind = options.damageKind || "direct";
  let resolvedAmount = amount;
  const shieldStatus = getUnitStatus(unit, "shielded");
  if (damageKind !== "healing" && damageKind !== "status" && shieldStatus) {
    const shieldSource = shieldStatus.sourceId ? findUnitById(battle, shieldStatus.sourceId) : null;
    const reduction = getUnitStats(shieldSource || "bodyguard").shieldReduction ?? 0.25;
    resolvedAmount *= Math.max(0, 1 - reduction);
  }
  const previousHealth = unit.health;
  unit.health -= resolvedAmount;
  const actualDamage = Math.max(0, Math.min(previousHealth, resolvedAmount));
  if (!options.noAttackerCredit && attacker && attacker.factionId !== unit.factionId && actualDamage > 0) {
    recordUnitContribution(attacker, "damage", actualDamage, battle);
  }
  if (unit.health <= 0) {
    const unitDef = getUnitDefinition(unit);
    unit.dead = true;
    unit.health = 0;
    unit.liftedBySpellId = null;
    unit.displacedBySpellId = null;
    if (unitDef.leavesGrave !== false) spawnGrave(unit, battle);
    unitDef.onDeath?.({ unit, battle, attacker, unitDef });
    if (!options.noAttackerCredit && attacker && !attacker.dead) {
      attacker.killStreak = (attacker.killStreak || 0) + 1;
      recordUnitContribution(attacker, "kills", 1, battle);
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

function applyWinnerToQueue() {
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
}

function advanceTournament() {
  const tournament = state.tournament;
  const round = tournament.rounds[tournament.currentRoundIndex];
  const match = round.matches[tournament.currentMatchIndex];
  const winnerId = state.battle.pendingWinner;

  match.winnerId = winnerId;
  match.status = "complete";
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
    state.battle = buildActiveBattle();
    resetCamera();
    closeWinnerModal();
    els.battleState.textContent = getCurrentMatchLabel(tournament);
    els.winnerLabel.textContent = winnerId ? findSourceFaction(winnerId)?.title || "Advancing" : "Mutual destruction";
    setTicker(`${getCurrentMatchLabel(tournament)} is ready in ${nextMatch.arena.name}.`);
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderArmyEditors();
    return;
  }

  const advancingIds = round.matches.map((entry) => entry.winnerId).filter(Boolean);
  if (advancingIds.length > 1) {
    tournament.currentRoundIndex += 1;
    tournament.currentMatchIndex = 0;
    const upcomingRound = createTournamentRound(advancingIds, tournament.currentRoundIndex);
    tournament.rounds.push(upcomingRound);
    upcomingRound.matches[0].status = "active";
    upcomingRound.matches[0].arena = createRandomArenaVariant(tournament.currentRoundIndex, 0, upcomingRound.matches[0].factionIds.length);
    state.battle = buildActiveBattle();
    resetCamera();
    closeWinnerModal();
    els.battleState.textContent = getCurrentMatchLabel(tournament);
    els.winnerLabel.textContent = winnerId ? findSourceFaction(winnerId)?.title || "Advancing" : "Mutual destruction";
    setTicker(`${upcomingRound.label} begins in ${upcomingRound.matches[0].arena.name}.`);
    renderBracketTracker();
    updateAdvanceButtonLabel();
    renderArmyEditors();
    return;
  }

  tournament.complete = true;
  tournament.championId = advancingIds[0] || null;
  state.factions = state.factions.flatMap((faction) => {
    if (faction.id === tournament.championId) return [];
    const record = tournament.eliminated[faction.id];
    const growth = record?.growth || 0;
    const fled = record?.fled || 0;
    return [withFactionDefaults({ ...faction, armySize: faction.armySize + growth + fled, fledReserve: 0 })];
  });
  state.roundsApplied += 1;
  state.tournament = null;
  saveState();
  syncCsvInput();
  renderArmyEditors();
  resetBattle();
  setTicker(advancingIds[0] ? "Tournament complete. The champion is removed and the defeated armies regroup." : "Tournament complete with no surviving champion. The bracket resets around the remaining queue.");
}

function setTicker(text) {
  els.battleTicker.textContent = text;
}

function setHighlight(text) {
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
  const words = title.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "KO";
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
  state.camera.zoom = clamp(state.camera.zoom * (Math.sign(event.deltaY) > 0 ? 0.9 : 1.1), 0.28, 4.2);
  state.camera.targetZoom = state.camera.zoom;
  clampCameraToField();
}

function markCameraManual() {
  state.camera.manualUntil = performance.now() + 6000;
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
  return { x: clamp((minX + maxX) / 2, 0, FIELD.width), y: clamp((minY + maxY) / 2, 0, FIELD.height), zoom: clamp(fitZoom, 0.32, 2.25) };
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

function render() {
  if (!state.battle) return;
  const viewport = getViewport();
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  drawField(viewport, state.battle);
  drawGroundDecor(viewport, state.battle);
  drawGroundProps(viewport, state.battle.props || []);
  drawGraves(viewport, state.battle.graves || []);
  drawStuckArrows(viewport, state.battle.stuckArrows);
  drawBanners(viewport, state.battle.factions);
  drawProjectiles(viewport, state.battle.projectiles);
  drawBodyguardAuras(viewport, state.battle.factions);
  drawUnits(viewport, state.battle.factions);
  drawBossBubbles(viewport, state.battle);
  drawNecromancerLinks(viewport, state.battle);
  drawSwipes(viewport, state.battle.swipes);
  drawSpells(viewport, state.battle);
  drawParticles(viewport, state.battle.particles);
  drawWeather(viewport, state.battle);
  drawBattleHealthChart(state.battle);
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
  const count = 14 + Math.floor(Math.random() * 9);
  const themeWeights = arena?.propWeights || { common: DEFAULT_PROP_WEIGHTS, rare: {} };
  return Array.from({ length: count }, (_, index) => ({
    id: `prop-${index}-${Math.random().toString(36).slice(2, 7)}`,
    type: chooseArenaPropType(themeWeights, index, count),
    x: 90 + Math.random() * (field.width - 180),
    y: 100 + Math.random() * (field.height - 200),
    scale: 0.82 + Math.random() * 0.75,
    rotation: (Math.random() - 0.5) * 0.35,
    tint: Math.random(),
  })).sort((a, b) => a.y - b.y);
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

function drawWeather(viewport, battle) {
  const weather = battle.arena?.weather;
  if (!weather || weather === "clear") return;
  const field = battle.weatherField || [];
  const baseScale = getBaseScale(viewport);
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
    field.forEach((drop) => {
      const worldX = drop.x * FIELD.width;
      const worldY = ((drop.y * FIELD.height) + battle.time * drop.speed) % (FIELD.height + drop.length + 80) - drop.length - 40;
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.strokeStyle = `rgba(196, 223, 255, ${drop.alpha})`;
      ctx.lineWidth = 1.1 * point.scale / baseScale;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - drop.drift * point.scale / baseScale, point.y + drop.length * point.scale / baseScale);
      ctx.stroke();
    });
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
    field.forEach((drop) => {
      const worldX = drop.x * FIELD.width;
      const worldY = ((drop.y * FIELD.height) + battle.time * drop.speed) % (FIELD.height + drop.length + 100) - drop.length - 50;
      const point = worldToScreen(worldX, worldY, viewport);
      ctx.strokeStyle = `rgba(188, 219, 255, ${drop.alpha})`;
      ctx.lineWidth = 1.4 * point.scale / baseScale;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - drop.drift * point.scale / baseScale, point.y + drop.length * point.scale / baseScale);
      ctx.stroke();
    });
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
  props.forEach((prop) => {
    const point = worldToScreen(prop.x, prop.y, viewport);
    const scale = point.scale * prop.scale;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(prop.rotation);
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 11 * scale / 2.1, 20 * scale / 2.1, 8 * scale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
    PROP_RENDERERS[prop.type]?.(scale, prop.tint);
    ctx.restore();
  });
}

function renderBracketTracker() {
  const tournament = state.tournament;
  if (!tournament) {
    els.arenaLabel.textContent = state.battle?.arena?.name || "Single arena";
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
          ${state.factions.map((faction) => `<div class="bracket-entry"><span>${faction.title}</span><span>${faction.armySize}</span></div>`).join("")}
        </div>
      </div>
    ` : "";
    return;
  }

  const currentMatch = getCurrentTournamentMatch(tournament);
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
              const faction = findSourceFaction(factionId);
              const status = match.winnerId === factionId
                ? "advanced"
                : match.status === "complete"
                  ? "eliminated"
                  : roundIndex === tournament.currentRoundIndex && matchIndex === tournament.currentMatchIndex
                    ? "active"
                    : "pending";
              const statusLabel = match.winnerId === factionId ? "Advances" : match.status === "complete" ? "Out" : "Queued";
              return `<div class="bracket-entry ${status}"><span>${faction?.title || "TBD"}</span><span>${statusLabel}</span></div>`;
            }).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `).join("");
}

function updateAdvanceButtonLabel() {
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

function drawBanners(viewport, factions) {
  factions.forEach((faction) => {
    if (!faction.alive || faction.excludeFromResults) return;
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
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
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
  const units = factions.flatMap((faction) => faction.units.filter((unit) => !unit.dead && !unit.fled).map((unit) => ({ ...unit, factionColor: faction.color }))).sort((a, b) => a.y - b.y);
  units.forEach((unit) => {
    const unitDef = getUnitDefinition(unit);
    const pose = getUnitRenderPose(unit, viewport);
    const { point, scale, bodyY } = pose;
    const renderScale = scale * getUnitRenderScale(unit);
    const strideOffset = unit.stride * 2.8 * scale / 2.1;
    const main = unit.factionColor;
    const dark = shadeColor(main, -0.28);
    const light = shadeColor(main, 0.26);
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(point.x, point.y + 10 * scale / 2.1, (10 + Math.abs(unit.stride) * 1.6) * renderScale / 2.1, (5 - unit.bob * 0.9) * renderScale / 2.1, 0, 0, Math.PI * 2);
    ctx.fill();
    if (unit.type === "inklord") {
      drawInkLordGroundAura(point, scale, unit);
    }
    ctx.save();
    ctx.globalAlpha = unitDef.getRenderAlpha ? unitDef.getRenderAlpha(unit, unitDef) : 1;
    ctx.translate(point.x + strideOffset * unit.displayFacingX * 0.35, bodyY);
    ctx.rotate((unit.walkTilt || 0) + (unit.rotation || 0));
    ctx.scale(unit.displayFacingX, 1);
    if (!drawUnitSprite(unit, main, scale)) {
      unitDef.render?.(main, dark, light, renderScale, unit);
    }
    drawUnitStatusOverlay(unit, renderScale);
    ctx.restore();
    const hpWidth = unitDef.healthBarWidth || 20;
    drawUnitStatusBadges(unit, point.x + 16 * renderScale / 2.1, bodyY - 30 * renderScale / 2.1, scale);
    const healthBarY = unit.type === "inklord"
      ? bodyY - 156 * scale / 2.1
      : bodyY - 24 * scale / 2.1;
    ctx.fillStyle = "rgba(37,24,16,0.5)";
    ctx.fillRect(point.x - hpWidth * renderScale / 4.2, healthBarY, hpWidth * renderScale / 2.1, 4 * scale / 2.1);
    ctx.fillStyle = unit.health / unit.maxHealth > 0.4 ? "#9ae085" : "#e7915d";
    ctx.fillRect(point.x - hpWidth * renderScale / 4.2, healthBarY, hpWidth * renderScale / 2.1 * (unit.health / unit.maxHealth), 4 * scale / 2.1);
  });
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
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
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

function drawGraves(viewport, graves) {
  graves
    .slice()
    .sort((a, b) => a.y - b.y)
    .forEach((grave) => {
      const point = worldToScreen(grave.x, grave.y, viewport);
      const variant = getGraveVariant(grave);
      const scale = point.scale / 2.1;
      const bodyPath = new Path2D(variant.bodyPath);
      const accentPath = variant.accentPath ? new Path2D(variant.accentPath) : null;
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

function drawArcher(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.arc(10 * scale / 2.1, -1 * scale / 2.1, 8 * scale / 2.1, -1.2, 1.2);
  ctx.stroke();
}

function drawMage(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(15 * scale / 2.1, -16 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#c4f2ff";
  ctx.beginPath();
  ctx.arc(16 * scale / 2.1, -18 * scale / 2.1, 3.2 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
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

function drawMedic(main, dark, light, scale, unit) {
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
  ctx.moveTo(8 * scale / 2.1, -1 * scale / 2.1);
  ctx.lineTo(14 * scale / 2.1, -10 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = shadeColor(main, -0.12);
  ctx.fillRect(-9 * scale / 2.1, 1 * scale / 2.1, 3 * scale / 2.1, 8 * scale / 2.1);
}

function drawBomber(main, dark, light, scale, unit) {
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
  ctx.fillStyle = "#2c2217";
  ctx.beginPath();
  ctx.arc(12 * scale / 2.1, 4 * scale / 2.1, 5.6 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#f0ad62";
  ctx.lineWidth = 2 * scale / 2.1;
  ctx.beginPath();
  ctx.moveTo(12 * scale / 2.1, 0);
  ctx.lineTo(16 * scale / 2.1, -7 * scale / 2.1);
  ctx.moveTo(-7 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(-14 * scale / 2.1, -10 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#80562f";
  ctx.fillRect(-13 * scale / 2.1, -12 * scale / 2.1, 7 * scale / 2.1, 11 * scale / 2.1);
}

function drawAssassin(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(-12 * scale / 2.1, 4 * scale / 2.1);
  ctx.lineTo(-18 * scale / 2.1, 12 * scale / 2.1);
  ctx.moveTo(12 * scale / 2.1, 4 * scale / 2.1);
  ctx.lineTo(18 * scale / 2.1, 12 * scale / 2.1);
  ctx.stroke();
}

function drawKnight(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(9 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, -17 * scale / 2.1);
  ctx.stroke();
}

function drawBodyguard(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(10 * scale / 2.1, -2 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, -16 * scale / 2.1);
  ctx.stroke();
}

function drawMountainMan(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(9 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(15 * scale / 2.1, -17 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#9ff0a1";
  ctx.beginPath();
  ctx.arc(16 * scale / 2.1, -18 * scale / 2.1, 3.1 * scale / 2.1, 0, Math.PI * 2);
  ctx.fill();
  if (unit.activeSpellId) {
    ctx.strokeStyle = "rgba(192,255,189,0.6)";
    ctx.lineWidth = 1.6 * scale / 2.1;
    ctx.beginPath();
    ctx.arc(0, -2 * scale / 2.1, 10 * scale / 2.1, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawPoisoner(main, dark, light, scale, unit) {
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
  ctx.fillStyle = "#6fe17a";
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -5 * scale / 2.1);
  ctx.lineTo(13 * scale / 2.1, 0);
  ctx.lineTo(12 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(4 * scale / 2.1, 10 * scale / 2.1);
  ctx.lineTo(5 * scale / 2.1, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(240,255,242,0.72)";
  ctx.fillRect(7 * scale / 2.1, -8 * scale / 2.1, 3 * scale / 2.1, 3 * scale / 2.1);
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
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -3 * scale / 2.1);
  ctx.lineTo(17 * scale / 2.1, -17 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#a47ae0";
  ctx.beginPath();
  ctx.moveTo(15 * scale / 2.1, -18 * scale / 2.1);
  ctx.lineTo(19 * scale / 2.1, -13 * scale / 2.1);
  ctx.lineTo(17 * scale / 2.1, -6 * scale / 2.1);
  ctx.lineTo(12 * scale / 2.1, -9 * scale / 2.1);
  ctx.lineTo(12 * scale / 2.1, -15 * scale / 2.1);
  ctx.closePath();
  ctx.fill();
}

function drawGraverobber(main, dark, light, scale, unit) {
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
  ctx.beginPath();
  ctx.moveTo(8 * scale / 2.1, -4 * scale / 2.1);
  ctx.lineTo(16 * scale / 2.1, -14 * scale / 2.1);
  ctx.stroke();
  ctx.fillStyle = "#bbb7af";
  ctx.beginPath();
  ctx.moveTo(12 * scale / 2.1, -16 * scale / 2.1);
  ctx.quadraticCurveTo(18 * scale / 2.1, -14 * scale / 2.1, 16 * scale / 2.1, -8 * scale / 2.1);
  ctx.lineTo(11 * scale / 2.1, -10 * scale / 2.1);
  ctx.quadraticCurveTo(12 * scale / 2.1, -14 * scale / 2.1, 12 * scale / 2.1, -16 * scale / 2.1);
  ctx.fill();
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
function normalizeAngle(angle) {
  let normalized = angle;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  while (normalized < -Math.PI) normalized += Math.PI * 2;
  return normalized;
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


