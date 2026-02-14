# Unit 1: Sequences & Events (2-3 sessions)

*He's already touched this — this unit formalizes it.*

**CS Concepts:** Sequential execution, event handling, order matters

---

## Session 1.1 — The Bossy Robot

Away from the computer: you are a robot. He writes instructions on index cards (one step per card) to make you walk to the fridge and get a snack. You follow them *literally*. If he says "open the fridge" before "walk to the fridge," you mime opening an invisible fridge where you stand. This gets funny fast, and the lesson — **order matters, computers are literal** — lands through laughter.

Then on Scratch: give him a sprite and a goal — "make the cat walk to the edge, say 'hello!', then do a flip."

### Demo: Walk, Talk, Flip

Build this ahead of time and let him run it, then take it apart:

```
when green flag clicked
glide (1) secs to x: (200) y: (0)
say [Hello!] for (2) seconds
repeat (36)
  turn right (10) degrees
  wait (0.03) seconds
end
```

**Blocks to point out:** The `glide` block is under Motion (it moves smoothly instead of teleporting). `say` is under Looks. `repeat` and `wait` are under Control — the `wait` inside the repeat is what makes the flip visible instead of instant.

### Tinker Challenge: Three-Sprite Skit

Make a 3-sprite skit where characters take turns talking. This naturally introduces the idea that timing/sequencing gets harder with multiple actors — setting up Unit 5's broadcasting.

**Hint — blocks he'll need:**

```
// Sprite 1
when green flag clicked
say [Hey, what's up?] for (2) seconds

// Sprite 2
when green flag clicked
wait (2) seconds
say [Not much, just hanging out.] for (2) seconds

// Sprite 3
when green flag clicked
wait (4) seconds
say [Can I join you guys?] for (2) seconds
```

The key insight: each sprite has its own script that starts at the same time (green flag), so he needs `wait` blocks to stagger the dialogue. If the timing is off, they'll talk over each other — which is a useful thing to let happen so he can debug it.

---

## Session 1.2 — Event Mashup

Start with: "What are all the different ways you can make something happen?" Let him discover `when key pressed`, `when this sprite clicked`, `when backdrop switches`, etc.

### Demo: Sound Board

Goal: different keys trigger different sounds/animations. Each key is a separate event.

```
when [a v] key pressed
play sound [meow v] until done

when [b v] key pressed
play sound [boing v] until done

when [c v] key pressed
play sound [drum v] until done
set size to (150) %
wait (0.2) seconds
set size to (100) %

when this sprite clicked
say [You clicked me!] for (1) seconds
play sound [pop v] until done
```

**Blocks to point out:** Each `when ... key pressed` is a separate script — they're all sitting on the same sprite but they're independent. The size change on the `c` key gives a visual "bounce" when the sound plays. `play sound until done` is under Sound — there's also `start sound` which doesn't wait for it to finish.

**Key insight to draw out:** A program isn't one long list of instructions. It's a bunch of small scripts, each waiting for its trigger. This is a *genuinely important* idea and Scratch makes it tangible.

### Tinker Challenge: The Band

Make a "band" with multiple sprites, each controlled by different keys, and perform a song.

**Hint — blocks he'll need:**

```
// Drum sprite
when [d v] key pressed
switch costume to [drum-hit v]
play sound [drum v] until done
switch costume to [drum-rest v]

// Guitar sprite
when [g v] key pressed
play sound [guitar v] until done
change [color v] effect by (25)

// Singer sprite
when [s v] key pressed
say [La la la!] for (1) seconds
play sound [sing v] until done
```

Each sprite is its own instrument. He assigns keys, picks sounds (the Scratch sound library has tons), and adds animations. Performing a "song" means pressing the right keys in the right rhythm — which is fun and also secretly reinforces that *he* is the sequencer now.
