# TBR Warfare

Static browser battle simulator for resolving a TBR queue by turning book submissions into armies and letting them fight for reading order.

This project has no build step and no `npm install` requirement. You serve the folder locally, open it in a browser, and the simulator runs as-is.

## 1. Setup

This section is written for the "I just want it running" path first.

### What you need

- A desktop browser
- This project folder on your computer
- A local static file server

The easiest server option in this repo uses Python 3, but the game itself does not depend on Python. Python is only the simplest way to serve the files over `http://127.0.0.1`.

### Easiest Windows launch

If you are on Windows, the simplest option is:

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `launch-server.cmd`.
4. Wait a moment for a PowerShell window to open.
5. Your browser should open `http://127.0.0.1:4173/index.html` automatically.

Keep that PowerShell window open while you use the simulator. Closing it stops the local server.

### If `launch-server.cmd` does not work

That usually means Python 3 is not installed, or the `py` launcher is unavailable on your machine.

Use this fix:

1. Install Python 3.
2. During installation, enable the option to add Python to your PATH if the installer offers it.
3. Return to this folder.
4. Double-click `launch-server.cmd` again.

### Manual launch from a terminal

If you prefer to start the server yourself:

1. Open PowerShell in this project folder.
2. Run:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

3. Leave that terminal running.
4. Open this address in your browser:

`http://127.0.0.1:4173/index.html`

### Why not just double-click `index.html`?

Do not run the app from `file://...`. The simulator loads assets with `fetch()`, so it works best when the folder is being served by a local web server.

### Browser notes

- Save data lives in your browser `localStorage`.
- Chromium-based browsers are recommended for creator workflows that need folder write access, such as sprite export and prop scale saving.
- If you already use another static file server, that is fine. Anything that serves this folder on `localhost` or `127.0.0.1` should work.

## 2. Using the Battle Simulator

### Basic loop

Once the page is open, the normal workflow is:

1. Load army data.
2. Review or edit the armies in the Army Workshop.
3. Run a battle or tournament heat.
4. Apply the winner to the queue.
5. Repeat until the bracket or queue state is where you want it.

### Loading army data

You have three easy ways to populate the simulator:

- Click `Load Sample Armies` to instantly populate the app with demo entries.
- Use the file picker in `Queue Data` to import a CSV file.
- Paste CSV text directly into the large text box, then click `Import CSV`.

A sample file is included at `sample-armies.csv`.

### CSV format

Expected columns:

`title,coverUrl,armySize,submissionType,composition,fledReserve`

What each column means:

- `title`: book or entry title
- `coverUrl`: image URL for the cover thumbnail
- `armySize`: total troop count for that book
- `submissionType`: `digital` or `paperback`
- `composition`: unit mix string such as `mage:2, archer:3, knight:5`
- `fledReserve`: routed troops that rejoin later

Useful `composition` shortcuts:

- Leave it blank for the default mix
- Use `default` for the standard starter mix
- Use `random` for an 8-draw random composition

The importer is forgiving:

- Unknown unit names in `composition` are ignored instead of breaking the row
- The app also recognizes a few alternate composition-style column names internally, but the six-column format above is the safest format to document and share

Use `Download CSV` any time you want to export the current queue back out of the app.

### Editing armies by hand

The `Army Workshop` section below the battle view is the manual editor.

Each army card lets you change:

- Title
- Cover URL
- Army Size
- Submission type
- Fled Reserve
- Composition via `Edit Composition`

You can also click `Add Book Army` to create a new entry from scratch or `Remove` on a card to delete one.

### Running battles

Main controls on the top-left panel:

- `Run Battle`: starts the current matchup
- `Reset Battle`: resets only the current fight
- `Reset Tournament`: restarts the whole bracket when one exists
- `Apply Winner To Queue`: advances queue logic after a result is finalized
- `Randomize Arena + Weather`: rerolls the battlefield without changing the armies

### Battle controls and shortcuts

Mouse controls:

- Drag to pan the camera
- Mousewheel to zoom
- Use the `Camera Mode` button to cycle between `Frame All`, `Cinematic`, and `Manual`

Battle speed controls:

- Click the numbered speed buttons in the header
- Click `Pause` to freeze or resume the battle
- Click `Instant Resolve` to finish the current round with a headless sim when available

Keyboard shortcuts:

- `Space`: pause or resume
- `1` through `5`: set simulation speed
- `0`: stop a currently running battle
- Hold `Shift`: temporarily slow the battle and show the hovered unit tooltip

### Tournaments and the story screen

The app switches from a single battle to a tournament bracket automatically when the number of eligible armies is greater than `Max Factions Per Heat`.

The `War Bracket` panel shows the current bracket summary. From there:

- `View Tournament Story` opens `tournament.html`, a separate live bracket viewer
- `Reset Tournament` restarts the entire bracket from round one

The tournament page supports:

- Live bracket syncing from the main battle page
- Drag to pan
- Mousewheel to zoom
- Fast-forward progress display while the bracket is being auto-resolved

### Tournament config and performance settings

Open the `Tournament Config` panel to control larger simulations.

Settings there include:

- `Min Factions Per Heat`
- `Max Factions Per Heat`
- `Max Units On Battlefield`
- `InkLord Invasion Delay (s)`
- `Paperback submissions only`

For slower machines, `Max Units On Battlefield` is the most important setting. Lower values reduce battlefield crowding and usually improve framerate.

`Auto-Calibrate Performance` runs a series of sample battles, measures FPS, and then writes back a recommended battlefield unit cap. In practice, this is the easiest way to tune the simulator if you are not sure what your machine can handle.

## 3. Built-in Tooling

### Hidden `Ctrl+1` menu

Press `Ctrl+1` anywhere on the main page to open the hidden developer shelf at the top.

Current controls there:

- `Enable terrain texturing`
- `Add regional terrain color variation`
- `Use rigged units when available`
- `Cast overlap shadows onto rear units`
- `Healthbars always visible`
- `Show FPS and culling overlay`
- `Prop resize mode`
- `Disable shift-inspect tooltip cooldown`
- `Build Sprite Atlas`
- `Open Sprite Workshop`
- `Open Balance Lab`

The FPS/culling overlay is especially useful when you are tuning large fights or checking whether a render-heavy feature is too expensive.

### Sprite Workshop

Use `Open Sprite Workshop` from the hidden shelf, or open:

`http://127.0.0.1:4173/sprite-workshop.html`

The workshop is the built-in art pipeline for rigged units and deployables. Its core workflow is:

1. `Upload Source Sprite`
2. Mark body parts and pivots on the source image
3. Preview animation clips and runtime blends
4. Save a workshop asset if you want to keep editing later
5. Choose an export directory
6. Export the runtime rig

Important notes:

- `Save Workshop Asset` stores the editable workshop project
- `Choose Export Directory` and direct folder export require a Chromium browser with the File System Access API
- The runtime export writes the packed sprite sheet, manifest JSON, and the workshop asset together

### Sprite atlas builder

`Build Sprite Atlas` rescans the asset folders and rebuilds the atlas used by the game runtime. This is useful after adding new props, graves, or other asset files that should be indexed without relying on repeated path probing.

### Prop ingest

If you have new prop sheets to break into individual prop images:

1. Put the source PNG sheets into `assets/Props_ingest`
2. Run:

```powershell
.\scripts\ingest-prop-sheets.ps1
```

What that script does:

- Scans `assets/Props_ingest/*.png`
- Finds alpha-separated pixel islands
- Saves each extracted prop into `assets/Props` as numbered PNG files like `0001.png`
- Deletes the source sheets after a successful ingest by default

### Prop scaling mode

`Prop resize mode` lives in the hidden `Ctrl+1` shelf.

When enabled:

- The battlefield becomes a prop workshop layout
- The app spawns one of each available prop in a spread-out arrangement
- Clicking a prop selects that prop family
- Mousewheel resizes the selected family instead of zooming the camera

Scale overrides are stored in:

`assets/Props/prop-scales.json`

Saving those overrides from the browser requires granting write access to the props directory, which again works best in Chromium-based browsers.

### Balance Lab

`Open Balance Lab` opens a separate analysis page for high-volume matchup sampling. It is mainly a developer/balance tool for generating sheets such as:

- unit pressure
- army compositions
- pair synergies
- counter matrix

## 4. Misc Notes

- The project is dependency-free for normal use. No package manager or build process is required.
- The main app is `index.html`, the live bracket page is `tournament.html`, the rigging tool is `sprite-workshop.html`, and the balance analysis page is `balance-lab.html`.
- Unit art can be overridden with PNG files named after the unit id, with `assets/unit-sprites/<unit-id>.png` as the preferred location.
- If creator features seem unable to save to disk, the usual cause is browser support or missing directory permissions rather than a simulator bug.
