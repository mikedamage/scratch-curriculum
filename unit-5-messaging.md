# Unit 5: Messaging & Multi-Sprite Coordination (2 sessions)

*Solving the "how do sprites talk to each other?" problem.*

**CS Concepts:** Broadcasting, message passing, event-driven coordination

---

## Session 5.1 — Boss Battle

Problem: "When the player's laser hits the enemy, the enemy should lose health. But the laser is one sprite and the enemy is another. How does the enemy *know* it got hit?"

Introduce `broadcast` and `when I receive`. Build a simple **space shooter**: ship at bottom, enemy at top, pressing space shoots a laser, when laser touches enemy → broadcast → enemy receives it, reduces health variable.

### Demo: Space Shooter

**Prep:** Three sprites — a ship, a laser (small rectangle), and an enemy. Two variables: `enemy health`, `score`.

**Ship sprite:**

```
when green flag clicked
go to x: (0) y: (-150)
forever
  if <key [right arrow v] pressed?> then
    change x by (7)
  end
  if <key [left arrow v] pressed?> then
    change x by (-7)
  end
end

when [space v] key pressed
broadcast [shoot v]
```

**Laser sprite:**

```
when green flag clicked
hide

when I receive [shoot v]
go to [Ship v]
show
repeat until <<touching [Enemy v]?> or <(y position) > (170)>>
  change y by (15)
end
if <touching [Enemy v]?> then
  broadcast [hit v]
end
hide
```

**Enemy sprite:**

```
when green flag clicked
set [enemy health v] to (10)
go to x: (0) y: (120)
set size to (150) %

when I receive [hit v]
change [enemy health v] by (-1)
set [color v] effect to (pick random (1) to (200))
say [Ow!] for (0.3) seconds
if <(enemy health) < (1)> then
  broadcast [enemy defeated v]
  say [You win!] for (2) seconds
  hide
  stop [all v]
end
```

**Blocks to point out:** `broadcast` is under Events — it sends a message that *any* sprite can listen for. `when I receive` is also under Events — it's a hat block like `when green flag clicked`. The laser doesn't need to "know" about the enemy's health. It just shouts "hit!" and the enemy handles the rest. That separation is the whole point.

**Key insight:** Sprites are independent actors. They don't automatically know about each other. Broadcasting is how they communicate. This is a genuinely deep CS concept (message passing) delivered through a game he wants to build.

### Tinker Challenge: Enemy Shoots Back

**Hint — blocks he'll need:**

New sprite: enemy laser.

```
// Enemy sprite — add this script:
when green flag clicked
forever
  wait (pick random (1) to (3)) seconds
  broadcast [enemy shoot v]
end

// Enemy laser sprite:
when green flag clicked
hide

when I receive [enemy shoot v]
go to [Enemy v]
show
repeat until <<touching [Ship v]?> or <(y position) < (-170)>>
  change y by (-10)
end
if <touching [Ship v]?> then
  broadcast [player hit v]
end
hide

// Ship sprite — add this script:
when I receive [player hit v]
change [lives v] by (-1)
say [Hit!] for (0.3) seconds
set [color v] effect to (50)
wait (0.1) seconds
set [color v] effect to (0)
```

Same broadcast pattern, just going the other direction. The enemy periodically broadcasts `enemy shoot`, the enemy laser listens, and if it hits the ship, it broadcasts `player hit`.

---

## Session 5.2 — Level Transitions

Add levels to the space shooter (or any prior game). When score hits a threshold → `broadcast [next level]` → backdrop changes, new enemies appear, difficulty increases.

### Demo: Two-Level Space Shooter

**Prep:** Create two backdrops (e.g., "Space Level 1" with stars, "Space Level 2" with a nebula). Add a `level` variable.

**Game manager script** (put this on the Stage, not a sprite):

```
when green flag clicked
set [level v] to (1)
switch backdrop to [Space Level 1 v]

when I receive [enemy defeated v]
if <(level) = (1)> then
  set [level v] to (2)
  broadcast [start level 2 v]
  switch backdrop to [Space Level 2 v]
else
  broadcast [you win v]
end
```

**Enemy sprite — add:**

```
when I receive [start level 2 v]
set [enemy health v] to (20)
go to x: (0) y: (120)
set size to (200) %
show
set [color v] effect to (100)
```

**Blocks to point out:** The Stage can have scripts too — click on the stage in the sprite list to see its scripts area. Putting "game manager" logic on the stage keeps things organized. `switch backdrop` is under Looks (it shows up when you have the stage selected).

### Tinker Challenge: Game Over & Victory Screens

Add a "Game Over" screen and a "You Win" screen using broadcasts and backdrop switches.

**Hint — blocks he'll need:**

```
// Stage:
when I receive [game over v]
switch backdrop to [Game Over v]
stop [all v]

when I receive [you win v]
switch backdrop to [You Win v]
stop [all v]

// Ship sprite — modify the player hit handler:
when I receive [player hit v]
change [lives v] by (-1)
if <(lives) < (1)> then
  broadcast [game over v]
end
```

Create "Game Over" and "You Win" as backdrops — he can draw big text, explosions, confetti, whatever he wants. The broadcast → backdrop switch pattern is clean and reusable.
