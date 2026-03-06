# TBR Warfare

Static browser game for resolving a blogger's TBR queue through a stylized 2.5D battle simulation.

## Run

From this folder:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html).

## CSV format

`title,coverUrl,armySize,submissionType,archers,mages,knights,fledReserve`

- `submissionType`: `digital` or `paperback`
- `archers,mages,knights`: percentage mix used to spawn the army
- `fledReserve`: routed units that rejoin on the next run

A starter file is included at `sample-armies.csv`.

## Notes

- Winner removal and reinforcement rules follow the requested queue logic: non-winning digital entries gain 2 troops, paperback entries gain 4.
- The live OpenAI image generation workflow is documented in `output/imagegen/visual-direction.md`, but generating those assets requires a local `OPENAI_API_KEY`.
- The current implementation is dependency-free and uses canvas plus localStorage for persistence.
