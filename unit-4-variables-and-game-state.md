# Unit 4: Variables & Game State (3-4 sessions)

*This is where "toys" become "real games."*

**CS Concepts:** Variables, state, incrementing, game loops

---

## Session 4.1 — What's the Score?

Start with a question: "In your maze game, how would the computer remember your score?" He can't do it with what he knows. Introduce variables as **the computer's memory** — a labeled box that holds a number.

### Demo: Click Frenzy

A sprite appears at random positions, you click it, score goes up by 1, it moves somewhere new. Timer counts down from 30.

**Prep:** Make or pick a fun sprite (use something with personality — a donut, a bat, whatever he's into).

```
when green flag clicked
set [score v] to (0)
set [time left v] to (30)
go to x: (pick random (-200) to (200)) y: (pick random (-150) to (150))

when green flag clicked
repeat until <(time left) = (0)>
  wait (1) seconds
  change [time left v] by (-1)
end
say (join [Final score: ] (score)) for (3) seconds
stop [all v]

when this sprite clicked
change [score v] by (1)
play sound [pop v] until done
go to x: (pick random (-200) to (200)) y: (pick random (-150) to (150))
```

**Blocks to point out:** Variables need to be created first — go to Variables category → "Make a Variable" → name it "score". `set` puts a specific value in the box. `change by` adds to whatever's already there. The variable shows up on the stage as a display automatically (right-click it to change the display style). There are two separate `when green flag clicked` scripts — that's fine! They run simultaneously.

---

## Session 4.2 — Catch Game

Build a proper **falling objects game**: objects fall from the sky, a basket/character moves with arrow keys, catching objects increases score, missing them costs a life. Three lives and you're out.

This combines: forever loops (game loop), conditionals (touching? hit bottom?), variables (score, lives), events (arrow keys).

### Demo: Fruit Catcher

**Prep:** You need two sprites — a basket/character at the bottom, and a falling object (apple, star, whatever). Create three variables: `score`, `lives`, `speed`.

**Basket sprite:**

```
when green flag clicked
go to x: (0) y: (-150)
forever
  if <key [right arrow v] pressed?> then
    change x by (8)
  end
  if <key [left arrow v] pressed?> then
    change x by (-8)
  end
end
```

**Falling object sprite:**

```
when green flag clicked
set [score v] to (0)
set [lives v] to (3)
set [speed v] to (3)
forever
  go to x: (pick random (-220) to (220)) y: (170)
  show
  repeat until <<touching [Basket v]?> or <(y position) < (-170)>>
    change y by ((0) - (speed))
  end
  if <touching [Basket v]?> then
    change [score v] by (1)
    play sound [pop v] until done
  else
    change [lives v] by (-1)
    play sound [buzz v] until done
  end
  hide
  if <(lives) < (1)> then
    say (join [Game Over! Score: ] (score)) for (3) seconds
    stop [all v]
  end
end
```

**Blocks to point out:** `(0) - (speed)` is how you make something move down — it's a subtraction operator (green, under Operators) with 0 minus the speed variable. The `repeat until` block keeps running until its condition becomes true. `touching [Basket]?` checks if this sprite is overlapping the basket sprite.

**This is his first "real" game.** Let him feel that.

---

## Session 4.3 — Difficulty Ramp

Revisit the catch game: "How do we make it get harder?" Introduce the idea that variables can control game behavior.

### Demo: Gradual Speed Increase

Add this as a separate script on the falling object sprite:

```
when green flag clicked
set [speed v] to (2)
forever
  wait (3) seconds
  change [speed v] by (0.3)
end
```

Now the game gets progressively faster. Every 3 seconds, the fall speed ticks up. He doesn't need to change anything else — the falling script already uses `(speed)`, so it automatically gets harder.

**Key insight:** Variables aren't just for score. They control *how the game behaves*. Speed, gravity, spawn rate — these are all just numbers you can change. This is a powerful idea.

### Variations to Try

```
// Random speed per drop (instead of gradual ramp)
set [speed v] to (pick random (2) to (6))

// Speed based on score (harder as you do better)
set [speed v] to ((2) + ((score) * (0.2)))
```

### Tinker Challenge: Power-Ups

Add a "power-up" object (a different sprite or costume) that slows things down or gives bonus points.

**Hint — blocks he'll need:**

A second falling sprite (duplicate the first one, change the costume):

```
when green flag clicked
hide
forever
  wait (pick random (5) to (15)) seconds
  go to x: (pick random (-220) to (220)) y: (170)
  show
  repeat until <<touching [Basket v]?> or <(y position) < (-170)>>
    change y by (-4)
  end
  if <touching [Basket v]?> then
    change [score v] by (5)
    change [speed v] by (-1)
    play sound [collect v] until done
  end
  hide
end
```

The power-up appears less often (`wait (pick random (5) to (15))` seconds), is worth more points, and reduces the speed variable — making everything temporarily easier. This requires another conditional inside the game loop concept and reinforces that variables are levers that control the whole game.
