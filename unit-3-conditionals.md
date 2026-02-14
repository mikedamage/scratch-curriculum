# Unit 3: Conditionals & Decision-Making (2-3 sessions)

*This is the biggest conceptual leap. Take it slow.*

**CS Concepts:** Boolean logic, if/then, if/then/else, sensing

---

## Session 3.1 — The Floor Is Lava

Build a simple world: a sprite, some colored platforms, and red "lava." Introduce `if <touching color?> then` — if you touch lava, go back to start. He now has a **maze game**.

Start with just `if/then`. Don't introduce `else` yet. One concept per session.

### Demo: Lava Maze

**Prep:** Paint a backdrop with black platforms and red lava areas (or use a simple hand-drawn one). Set the sprite to a small character.

```
when green flag clicked
go to x: (-200) y: (-150)
forever
  if <key [right arrow v] pressed?> then
    change x by (3)
  end
  if <key [left arrow v] pressed?> then
    change x by (-3)
  end
  if <key [up arrow v] pressed?> then
    change y by (3)
  end
  if <key [down arrow v] pressed?> then
    change y by (-3)
  end
  if <touching color [#ff0000]?> then
    go to x: (-200) y: (-150)
    say [Ouch!] for (1) seconds
  end
end
```

**Blocks to point out:** `if/then` is under Control. `touching color?` is under Sensing — click the color swatch and then use the eyedropper to pick the exact red from the backdrop. `key pressed?` is also under Sensing. The movement blocks (`change x by`, `change y by`) are under Motion.

**Key insight to draw out:** The computer is *constantly checking* a question and *deciding* what to do based on the answer. "If this, then that" is how all decisions work in code. The `forever` loop runs these checks over and over — without it, the check would only happen once.

### Tinker Challenge: Multi-Color Hazards

Add a second color that does something different (green = speed boost, blue = teleport).

**Hint — blocks he'll need:**

```
// Inside the forever loop, add:
if <touching color [#00ff00]?> then
  change x by (10)
end
if <touching color [#0000ff]?> then
  go to x: (pick random (-200) to (200)) y: (pick random (-150) to (150))
  say [Whooooa!] for (0.5) seconds
end
```

Each new color is another `if` block. He's building up a pattern: one condition, one response. The conditions are all checked every frame inside that `forever` loop.

---

## Session 3.2 — Hot & Cold

Build a **treasure hunt**: a hidden sprite, and another sprite that says "warmer" or "colder" as you move the mouse. This requires `if/then/else`.

### Demo: Treasure Hunt

**Prep:** Create two sprites — a small "treasure" sprite and a "detector" sprite that follows the mouse. Hide the treasure by setting its `ghost` effect to 100 (it's invisible but still detectable).

**Treasure sprite:**

```
when green flag clicked
set [ghost v] effect to (100)
go to x: (pick random (-200) to (200)) y: (pick random (-150) to (150))
```

**Detector sprite:**

```
when green flag clicked
set [last distance v] to (500)
forever
  go to [mouse-pointer v]
  if <(distance to [Treasure v]) < (last distance)> then
    say [Warmer!]
    set [color v] effect to (0)
  else
    say [Colder!]
    set [color v] effect to (100)
  end
  set [last distance v] to (distance to [Treasure v])
  wait (0.3) seconds
end
```

**Blocks to point out:** `if/then/else` is under Control — it's a different block than `if/then` (wider, with two mouths). `distance to` is under Sensing. The variable `last distance` remembers where you *were* so it can compare to where you *are now*. He'll need to create this variable (Variables → Make a Variable).

This introduces `else` naturally — there are exactly two cases, and you need to handle both.

### Adding a Win Condition

```
// Add this inside the forever loop, before the if/else:
if <(distance to [Treasure v]) < (30)> then
  set [ghost v] effect to (0) // on the treasure sprite
  say [You found it!] for (2) seconds
  stop [all v]
end
```

### Tinker Challenge: Temperature Levels

Add more levels: "freezing / cold / warm / hot / ON FIRE" using nested if/else.

**Hint — blocks he'll need:**

```
if <(distance to [Treasure v]) < (30)> then
  say [ON FIRE!]
  set size to (200) %
else
  if <(distance to [Treasure v]) < (80)> then
    say [Hot!]
    set size to (150) %
  else
    if <(distance to [Treasure v]) < (150)> then
      say [Warm]
      set size to (120) %
    else
      if <(distance to [Treasure v]) < (250)> then
        say [Cold]
        set size to (100) %
      else
        say [Freezing!]
        set size to (80) %
      end
    end
  end
end
```

This is challenging but his reading level can handle the block nesting, and it's fun to make the reactions dramatic. The size changes give a nice visual cue beyond just the text. In Scratch, the nested if/else blocks visually indent, which actually makes the structure pretty clear.
