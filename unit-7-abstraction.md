# Unit 7: Abstraction & Custom Blocks (2 sessions)

*Teaching him to think in building blocks — which is how he already thinks physically.*

**CS Concepts:** Procedures, abstraction, decomposition, code reuse

---

## Session 7.1 — The Messy Code Problem

Pull up one of his bigger projects. The scripts are probably getting long and tangled. Ask: "If I asked you to change how the character jumps, where would you look?" He'll struggle to find it.

Introduce `My Blocks` (custom blocks). Refactor the jump into a `jump` block, the shooting into a `shoot` block. Suddenly the main game loop reads like plain language.

### Demo: Refactored Game Loop

**Before** (messy — the forever loop is a wall of blocks):

```
when green flag clicked
forever
  if <key [left arrow v] pressed?> then
    change x by (-5)
    point in direction (-90)
    next costume
  end
  if <key [right arrow v] pressed?> then
    change x by (5)
    point in direction (90)
    next costume
  end
  if <key [space v] pressed?> then
    change y by (10)
    repeat (10)
      change y by (5)
    end
    repeat (10)
      change y by (-5)
    end
    change y by (-10)
  end
end
```

**After** (clean — each block is a named action):

```
when green flag clicked
forever
  if <key [left arrow v] pressed?> then
    move-left
  end
  if <key [right arrow v] pressed?> then
    move-right
  end
  if <key [space v] pressed?> then
    jump
  end
end

define move-left
change x by (-5)
point in direction (-90)
next costume

define move-right
change x by (5)
point in direction (90)
next costume

define jump
change y by (10)
repeat (10)
  change y by (5)
end
repeat (10)
  change y by (-5)
end
change y by (-10)
```

**Blocks to point out:** Go to "My Blocks" category → "Make a Block" → type a name → click OK. This creates a `define` hat block and a new block you can drag into your scripts. The `define` block is where you put the *implementation* — what the block actually does. The block itself (the one you drag into `forever`) just *calls* it.

**Analogy that'll click for him:** Custom blocks are like the sub-assemblies he builds with household items. You build the wheel separately, then just attach it to the car. You don't rebuild the wheel every time.

**Key benefit to show him:** Now when he wants to change how jumping works, he goes to the `define jump` block. He doesn't have to search through a giant script. And if he wants to add jumping somewhere else (maybe an enemy jumps too), he just uses the same block.

---

## Session 7.2 — Blocks with Inputs

Custom blocks can take parameters. Now one block can draw a triangle, square, pentagon — anything.

### Demo: Draw Polygon

Go to "My Blocks" → "Make a Block" → type "draw-polygon" → click "Add an input" → name it "sides" → "Add an input" again → name it "size" → OK.

```
define draw-polygon (sides) (size)
pen down
repeat (sides)
  move (size) steps
  turn right ((360) / (sides)) degrees
end
pen up
```

Now he can call it:

```
when green flag clicked
erase all

draw-polygon (3) (100)
// draws a triangle with side length 100

draw-polygon (5) (60)
// draws a pentagon with side length 60

draw-polygon (8) (40)
// draws an octagon with side length 40
```

**Blocks to point out:** The inputs (`sides`, `size`) are oval-shaped — they're like variables, but they only exist inside the `define` block. When you call `draw-polygon (5) (60)`, the `sides` oval becomes 5 and `size` becomes 60 *for that call*. Next time you call it with different numbers, it draws something different.

### Demo: Connecting Back to Unit 2

Rewrite the spirograph using custom blocks:

```
define draw-shape (repeats) (distance) (angle)
pen down
repeat (repeats)
  move (distance) steps
  turn right (angle) degrees
  change pen color by (1)
end
pen up

when green flag clicked
erase all
set pen size to (1)
draw-shape (36) (100) (170)

when [1 v] key pressed
erase all
draw-shape (36) (100) (170)

when [2 v] key pressed
erase all
draw-shape (100) (100) (144)

when [3 v] key pressed
erase all
draw-shape (200) (80) (91)
```

Same spirograph machine from Unit 2, but now the code is clean and the pattern is reusable. One block, three parameters, infinite designs.

### Tinker Challenge: Enemy Factory Block

Build a custom `make-enemy (speed) (health) (color)` block for the space game and use it to create different enemy types cleanly.

**Hint — blocks he'll need:**

```
define make-enemy (speed) (health) (enemy-color)
set [hp v] to (health)
set [fall-speed v] to (speed)
set [color v] effect to (enemy-color)
create clone of [myself v]

// Usage:
when green flag clicked
make-enemy (3) (1) (0)
// fast, fragile, normal color

wait (2) seconds
make-enemy (1) (3) (100)
// slow, tough, blue-shifted

wait (2) seconds
make-enemy (5) (1) (50)
// very fast, fragile, green-shifted
```

The `make-enemy` block sets up the properties *before* creating the clone. The clone inherits whatever the sprite's variables were at the moment it was cloned. This is a slick pattern — the custom block becomes a factory with knobs.

**Note:** This only works if `hp`, `fall-speed`, etc. are "For this sprite only" variables (see Unit 6). Otherwise all clones share the same values and the last `make-enemy` call wins.
