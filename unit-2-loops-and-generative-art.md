# Unit 2: Loops & Generative Art (2-3 sessions)

*This is where his engineering brain will light up.*

**CS Concepts:** Repeat loops, forever loops, iteration, parameters changing output

---

## Session 2.1 — Bouncing Without Exhaustion

Open with a problem: "Make the cat bounce back and forth across the screen forever." Let him try it with sequences first. He'll start copy-pasting `move 10 steps` blocks. After 30 seconds of this, he'll feel the pain. *Now* introduce `forever` and `repeat`. The relief of solving a tedious problem with an elegant tool is addictive.

### Demo: Bouncing Ball

```
when green flag clicked
set rotation style [left-right v]
forever
  move (10) steps
  if on edge, bounce
end
```

That's it — three blocks inside a `forever` and the ball bounces endlessly. The `set rotation style` keeps the sprite from flipping upside down (without it, the cat goes belly-up when it bounces, which is funny but distracting).

**Blocks to point out:** `forever` is under Control — it's a loop that never stops. `if on edge, bounce` is a single block under Motion that handles all the edge detection. `set rotation style` is also under Motion — try all three options and see what they do.

### Variations to try together

```
// Slower, floatier
when green flag clicked
forever
  move (3) steps
  if on edge, bounce
end

// With a trail (needs Pen extension)
when green flag clicked
pen down
forever
  move (5) steps
  if on edge, bounce
  change pen color by (1)
end
```

---

## Session 2.2 — Spirograph Machine

Introduce the **pen extension** (click "Add Extension" at bottom-left, choose "Pen"). Show him this script and let him run it:

### Demo: Star Burst

```
when green flag clicked
erase all
pen down
set pen size to (2)
set pen color to [#9966ff]
repeat (36)
  move (100) steps
  turn right (170) degrees
end
```

Then ask: "What happens if you change 170 to 160? What about 144? What about 91?" Let him experiment. He's doing modular arithmetic without knowing it. The visual feedback is instant and beautiful.

### Cheat Sheet: Angles That Look Cool

| Angle | What it draws |
|-------|--------------|
| 170 | 36-pointed star burst |
| 160 | 18-pointed star |
| 144 | 5-pointed star (classic) |
| 135 | Octagon star |
| 120 | Triangle |
| 91  | Slowly spiraling square |
| 89  | Slowly spiraling square (other direction) |
| 61  | Dense spirograph |

### Demo: Color-Shifting Spirograph

```
when green flag clicked
erase all
pen down
set pen size to (1)
repeat (200)
  move (100) steps
  turn right (91) degrees
  change pen color by (1)
end
```

**Key insight:** A loop with slightly different numbers produces wildly different results. **Parameters matter.** This is the seed of computational thinking — same structure, different inputs, different outputs.

### Tinker Challenge: Spirograph Machine

Build a "spirograph machine" where pressing different number keys draws different patterns.

**Hint — blocks he'll need:**

```
when [1 v] key pressed
erase all
pen down
set pen color to [#ff0000]
repeat (36)
  move (100) steps
  turn right (170) degrees
  change pen color by (3)
end

when [2 v] key pressed
erase all
pen down
set pen color to [#0099ff]
repeat (100)
  move (100) steps
  turn right (144) degrees
  change pen color by (1)
end

when [3 v] key pressed
erase all
pen down
set pen color to [#00cc44]
repeat (200)
  move (80) steps
  turn right (91) degrees
  change pen color by (2)
end
```

Each key = different angle + different repeat count + different colors. He can tune the numbers and build up a whole gallery.

---

## Session 2.3 (optional) — Nested Loops

If he's ready: "What happens if you put a loop *inside* a loop?" Let him predict, then try it.

### Demo: Mandala

```
when green flag clicked
erase all
pen down
set pen size to (1)
repeat (10)
  repeat (36)
    move (50) steps
    turn right (170) degrees
  end
  turn right (36) degrees
  change pen color by (10)
end
```

The inner loop draws a star. The outer loop draws 10 of them, each rotated 36 degrees from the last (360 / 10 = 36). The result is a mandala.

**Blocks to point out:** The inner `repeat (36)` runs completely — drawing one full star — before the outer loop turns and starts the next one. This concept (nesting) recurs everywhere in programming.

### Tinker Challenge: Nested Loop Art

Let him experiment with different numbers. Some starting points:

```
// Circle of squares
repeat (12)
  repeat (4)
    move (60) steps
    turn right (90) degrees
  end
  turn right (30) degrees
end

// Circle of triangles
repeat (8)
  repeat (3)
    move (80) steps
    turn right (120) degrees
  end
  turn right (45) degrees
end
```

The outer repeat count times the outer turn should equal 360 for a complete rotation. That's the only "rule" — everything else is fair game.
