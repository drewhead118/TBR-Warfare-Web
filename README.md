# TBR Warfare

Static browser game for resolving a blogger's TBR queue through a stylized 2.5D battle simulation.

## Run

From this folder:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html).

## CSV format

`title,coverUrl,armySize,submissionType,composition,fledReserve`

- `submissionType`: `digital` or `paperback`
- `composition`: optional free-form unit mix such as `mage:2, archer:3, knight:5`
- If `composition` is omitted or blank, the importer defaults to `archer:1, mage:1, knight:1`
- Unknown unit names inside the composition string are ignored so the row still imports
- `fledReserve`: routed units that rejoin on the next run

A starter file is included at `sample-armies.csv`.

## Notes

- Winner removal and reinforcement rules follow the requested queue logic: non-winning digital entries gain 2 troops, paperback entries gain 4.
- The live OpenAI image generation workflow is documented in `output/imagegen/visual-direction.md`, but generating those assets requires a local `OPENAI_API_KEY`.
- The current implementation is dependency-free and uses canvas plus localStorage for persistence.
- Unit art can be overridden with PNG files named after the unit id, such as `archer.png`. The app checks common project subdirectories first, with `assets/unit-sprites/archer.png` as the preferred location, then falls back to the built-in SVG-style canvas rendering if no PNG is found.
