# TBR Warfare

Static browser game for resolving a blogger's TBR queue through a stylized 2.5D battle simulation.

## Dependencies

This project does not use a build step or package manager. There is no `npm install` step and no required third-party library download for normal play.

You only need:

- a modern desktop browser
- a local static file server

Optional tools used by the repo:

- Python 3: easiest way to run the included local server command
- Windows PowerShell: used by the included `.ps1` helper scripts and `launch-server.cmd`
- A Chromium-based browser: recommended if you want dev features that rely on the File System Access API, such as choosing a writable export directory from inside the app

## Installation And Setup

1. Download or clone this repository.
2. Open a terminal in the project folder.
3. Start a local static server.
4. Open `http://127.0.0.1:4173/index.html` in your browser.

### Quick Start With Python

If Python 3 is installed, run:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html).

On Windows, you can also double-click `launch-server.cmd`, which starts the same Python server and opens the game automatically.

### Is Python Required?

No. Python is not required by the game itself. It is only the included convenience option for serving the files locally.

If you already use another static server, that is fine too. Any option that serves this folder over `http://localhost` or `http://127.0.0.1` should work.

### Browser Notes

- A local server is recommended instead of opening `index.html` directly from `file://`, because the app loads project assets with `fetch()`.
- Save data is stored in your browser via `localStorage`.
- Some creator/dev workflows work best in Chromium-based browsers because they use the File System Access API.

## Run

From this folder, start a local server:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html).

The standalone sprite rigging tool is at [http://127.0.0.1:4173/sprite-workshop.html](http://127.0.0.1:4173/sprite-workshop.html).

## Props

Battlefield prop-sheet ingest is currently manual. To split any new prop sheets in `assets/Props_ingest` into numbered PNG props in `assets/Props`, run:

```powershell
.\scripts\ingest-prop-sheets.ps1
```

That script:

- scans `assets/Props_ingest/*.png`
- isolates alpha-separated pixel islands into individual numbered files like `0001.png`
- deletes the source sheets from `assets/Props_ingest` after a successful ingest

At runtime, the game scans `assets/Props` for numbered PNGs and prefers those generated props for new maps. If no generated prop assets are available, it falls back to the built-in SVG-style decor renderers.

Prop scale overrides are loaded from `assets/Props/prop-scales.json`. In the hidden dev panel you can enable prop resize mode, click a prop to select it, and use the mousewheel to resize every instance of that prop family on the current map. Those overrides are written back to `prop-scales.json` when the browser has been granted write access to the `assets/Props` directory through the File System Access API.

## Dev Tools

Press `Ctrl+1` to toggle the hidden dev panel at the top of the page.

The panel currently includes:

- `Enable terrain texturing`
- `Use rigged units when available`
- `Show FPS and culling overlay`
- `Prop resize mode`
- `Open Sprite Workshop`

The FPS/culling overlay is off by default. When enabled, it shows a compact render-debug panel with FPS, units drawn, units culled, and total units.

Prop resize mode swaps the battlefield into a prop workshop layout that spawns every available prop asset once in a shuffled, evenly distributed arrangement away from the field edges. While a prop is selected, the mousewheel resizes that prop family instead of zooming. With no prop selected, mousewheel keeps the normal cursor-centered camera zoom behavior.

## CSV format

`title,coverUrl,armySize,submissionType,composition,fledReserve`

- `submissionType`: `digital` or `paperback`
- `composition`: optional free-form unit mix such as `mage:2, archer:3, knight:5`
- Use `default` for the standard `archer:1, mage:1, knight:1` mix, or leave it blank for the same result
- Use `random` to generate an 8-draw random mix during import
- Unknown unit names inside the composition string are ignored so the row still imports
- `fledReserve`: routed units that rejoin on the next run

A starter file is included at `sample-armies.csv`.

## Notes

- Winner removal and reinforcement rules follow the requested queue logic: non-winning digital entries gain 2 troops, paperback entries gain 4.
- The current implementation is dependency-free and uses canvas plus localStorage for persistence.
- Unit art can be overridden with PNG files named after the unit id, such as `archer.png`. The app checks common project subdirectories first, with `assets/unit-sprites/archer.png` as the preferred location, then falls back to the built-in SVG-style canvas rendering if no PNG is found.
