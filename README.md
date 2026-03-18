# TBR Warfare

Static browser game for resolving a blogger's TBR queue through a stylized 2.5D battle simulation.

## Run

From this folder:

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
- The live OpenAI image generation workflow is documented in `output/imagegen/visual-direction.md`, but generating those assets requires a local `OPENAI_API_KEY`.
- The current implementation is dependency-free and uses canvas plus localStorage for persistence.
- Unit art can be overridden with PNG files named after the unit id, such as `archer.png`. The app checks common project subdirectories first, with `assets/unit-sprites/archer.png` as the preferred location, then falls back to the built-in SVG-style canvas rendering if no PNG is found.
