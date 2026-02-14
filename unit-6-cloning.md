# Unit 6: Cloning & Spawning (2-3 sessions)

*The "whoa" unit.*

**CS Concepts:** Cloning (object instantiation), managing multiple instances, randomness

---

## Session 6.1 — Rain Machine

Show him: one raindrop sprite, and suddenly it's *raining*. Let the "whoa" moment land. Then dissect it: the original sprite is a **factory**. Each clone is an independent copy that runs its own script.

### Demo: Rain

**Prep:** Draw a small raindrop sprite (or use a simple circle). That's it.

```
when green flag clicked
hide
forever
  create clone of [myself v]
  wait (0.05) seconds
end

when I start as a clone
go to x: (pick random (-240) to (240)) y: (180)
set size to (pick random (20) to (80)) %
set [ghost v] effect to (pick random (0) to (50))
show
repeat until <(y position) < (-180)>
  change y by (pick random (-8) to (-3))
end
delete this clone
```

**Blocks to point out:** `create clone of myself` is under Control — it makes a copy of this sprite. `when I start as a clone` is a hat block, also under Control — it's the script that each clone runs when it's born. `delete this clone` cleans up when the raindrop reaches the bottom (without this, clones pile up and the project slows down).

The original sprite stays hidden — it's the factory. Every clone starts at a random x position at the top, with random size and transparency, and falls at a random speed. Each one is independent.

### Variations to Try

```
// Snow (slower, drifting sideways)
when I start as a clone
go to x: (pick random (-240) to (240)) y: (180)
set size to (pick random (10) to (40)) %
show
repeat until <(y position) < (-180)>
  change y by (-2)
  change x by (pick random (-2) to (2))
  turn right (pick random (-10) to (10)) degrees
end
delete this clone

// Confetti (colorful, spinning)
when I start as a clone
go to x: (pick random (-240) to (240)) y: (180)
set size to (pick random (30) to (60)) %
set [color v] effect to (pick random (0) to (200))
show
repeat until <(y position) < (-180)>
  change y by (pick random (-5) to (-1))
  change x by (pick random (-3) to (3))
  turn right (15) degrees
end
delete this clone
```

---

## Session 6.2 — Space Invaders

Rebuild the space shooter, but now enemies are clones. One enemy sprite, cloning itself into a grid. Each clone moves independently. Player shoots, laser touches a clone, *that clone* deletes itself.

This is a substantial project. Break it into pieces.

### Step 1: Enemy Grid

```
when green flag clicked
hide
set [row v] to (0)
repeat (3)
  set [column v] to (0)
  repeat (8)
    create clone of [myself v]
    change [column v] by (1)
  end
  change [row v] by (1)
end

when I start as a clone
go to x: ((-140) + ((column) * (40))) y: ((120) - ((row) * (40)))
show
```

**Blocks to point out:** The math in `go to` places each clone in a grid. Column controls x (left-right), row controls y (up-down). The `-140` and `120` are the starting position of the grid. The `* 40` is the spacing between enemies. He doesn't need to get the math perfect on the first try — tweak the numbers until the grid looks right.

### Step 2: Enemy Movement

Add to the clone script:

```
when I start as a clone
go to x: ((-140) + ((column) * (40))) y: ((120) - ((row) * (40)))
show
forever
  repeat (30)
    change x by (2)
  end
  change y by (-10)
  repeat (30)
    change x by (-2)
  end
  change y by (-10)
end
```

Classic Space Invaders march: right, drop, left, drop, repeat.

### Step 3: Hit Detection

```
// Add to the clone's forever loop:
if <touching [Laser v]?> then
  change [score v] by (10)
  play sound [pop v] until done
  delete this clone
end
```

When a laser touches *this specific clone*, only that clone deletes itself. The others keep going. This is the magic of clones — each one is its own independent actor.

### Step 4: Score and Game Over

```
// On the stage:
when green flag clicked
set [score v] to (0)

// Add to each clone's forever loop:
if <(y position) < (-140)> then
  broadcast [game over v]
end
```

If any enemy reaches the bottom, game over.

**Key insight:** Cloning lets you create *many* from *one*. You write the behavior once, and every copy follows it. This is the seed of object-oriented thinking.

### Tinker Challenge: Enemy Types

Different enemy types — some take 2 hits, some shoot back. This requires clone-local variables.

**Hint — blocks he'll need:**

Scratch doesn't have true clone-local variables, but "for this sprite only" variables work per-clone:

```
// Create a variable called "hp" and select "For this sprite only"

when I start as a clone
set [hp v] to (2)
// ... position and show ...

// In the hit detection:
if <touching [Laser v]?> then
  change [hp v] by (-1)
  set [color v] effect to (50)
  if <(hp) < (1)> then
    change [score v] by (20)
    delete this clone
  end
end
```

The "For this sprite only" option when creating the variable is the key — it means each clone has its own copy of `hp`. Without it, all clones share one `hp` and shooting one enemy would affect them all.
