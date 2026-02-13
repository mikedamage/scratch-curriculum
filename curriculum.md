# Scratch Curriculum for a Gifted 7-Year-Old

This is designed around how he learns: **see it working → take it apart → understand the mechanism → build his own version → push it further**. Every session ends with something playable. No session should feel like homework.

---

## Guiding Principles

1. **Reverse-engineer first, build second.** Start each concept by handing him a finished project and letting him poke at the code. "How do you think this works?" before "Here's how to make this."
2. **Name the concept after he's already using it.** Let him discover that a "forever" loop makes the cat keep moving, *then* say "that's called a loop." Vocabulary follows intuition.
3. **30-40 minute sessions max.** Quit while he's still engaged, never when he's bored. If he's on fire, let him keep going, but plan for 30.
4. **Every session produces a toy.** Something he can show someone else or play with later.
5. **"What if..." is the whole point.** Build in tinker time. The extensions aren't homework — they're provocations.

---

## Unit 1: Sequences & Events (2-3 sessions)
*He's already touched this — this unit formalizes it.*

**CS Concepts:** Sequential execution, event handling, order matters

### Session 1.1 — The Bossy Robot

Away from the computer: you are a robot. He writes instructions on index cards (one step per card) to make you walk to the fridge and get a snack. You follow them *literally*. If he says "open the fridge" before "walk to the fridge," you mime opening an invisible fridge where you stand. This gets funny fast, and the lesson — **order matters, computers are literal** — lands through laughter.

Then on Scratch: give him a sprite and a goal ("make the cat walk to the edge, say 'hello!', then do a flip"). He sequences motion, looks, and sound blocks under a `when green flag clicked`.

**Tinker challenge:** Make a 3-sprite skit where characters take turns talking. (This naturally introduces the idea that timing/sequencing gets harder with multiple actors — setting up Unit 5's broadcasting.)

### Session 1.2 — Event Mashup

Start with: "What are all the different ways you can make something happen?" Let him discover `when key pressed`, `when this sprite clicked`, `when backdrop switches`, etc. Goal: build a **sound board** — different keys trigger different sounds/animations. Each key is a separate event.

**Key insight to draw out:** A program isn't one long list of instructions. It's a bunch of small scripts, each waiting for its trigger. This is a *genuinely important* idea and Scratch makes it tangible.

**Tinker challenge:** Make a "band" with multiple sprites, each controlled by different keys, and perform a song.

---

## Unit 2: Loops & Generative Art (2-3 sessions)
*This is where his engineering brain will light up.*

**CS Concepts:** Repeat loops, forever loops, iteration, parameters changing output

### Session 2.1 — Bouncing Without Exhaustion

Open with a problem: "Make the cat bounce back and forth across the screen forever." Let him try it with sequences first. He'll start copy-pasting `move 10 steps` blocks. After 30 seconds of this, he'll feel the pain. *Now* introduce `forever` and `repeat`. The relief of solving a tedious problem with an elegant tool is addictive.

Build a **bouncing ball** that moves forever, bounces off edges. Add: `if on edge, bounce`, rotation style.

### Session 2.2 — Spirograph Machine

Introduce the **pen extension**. Show him this script and let him run it:

```
pen down
repeat (36) {
  move (100) steps
  turn (170) degrees
}
```

Then ask: "What happens if you change 170 to 160? What about 144? What about 91?" Let him experiment. He's doing modular arithmetic without knowing it. The visual feedback is instant and beautiful.

**Key insight:** A loop with slightly different numbers produces wildly different results. **Parameters matter.** This is the seed of computational thinking — same structure, different inputs, different outputs.

**Tinker challenge:** Build a "spirograph machine" where pressing different number keys draws different patterns. Add color changes inside the loop (`change pen color by 1`).

### Session 2.3 (optional) — Nested Loops

If he's ready: "What happens if you put a loop *inside* a loop?" Let him predict, then try it. A `repeat 10` containing a `repeat 36` that draws a star, turning slightly between each star, creates stunning mandala patterns. This concept (nesting) recurs everywhere in programming.

---

## Unit 3: Conditionals & Decision-Making (2-3 sessions)
*This is the biggest conceptual leap. Take it slow.*

**CS Concepts:** Boolean logic, if/then, if/then/else, sensing

### Session 3.1 — The Floor Is Lava

Build a simple world: a sprite, some colored platforms, and red "lava." Introduce `if <touching color red?> then` — if you touch lava, go back to start. He now has a **maze game**.

Start with just `if/then`. Don't introduce `else` yet. One concept per session.

**Key insight to draw out:** The computer is *constantly checking* a question and *deciding* what to do based on the answer. "If this, then that" is how all decisions work in code.

**Tinker challenge:** Add a second color that does something different (green = speed boost, blue = teleport). Each new color is another `if` block, reinforcing the pattern.

### Session 3.2 — Hot & Cold

Build a **treasure hunt**: a hidden sprite, and another sprite that says "warmer" or "colder" as you move the mouse. This requires `if/then/else`:

```
if <(distance to [hidden thing]) < (last distance)> then
  say "Warmer!"
else
  say "Colder!"
end
```

This introduces `else` naturally — there are exactly two cases, and you need to handle both.

**Tinker challenge:** Add more levels — "freezing / cold / warm / hot / ON FIRE" using nested if/else. This is challenging but his reading level can handle the block nesting, and it's fun to make the reactions dramatic.

---

## Unit 4: Variables & Game State (3-4 sessions)
*This is where "toys" become "real games."*

**CS Concepts:** Variables, state, incrementing, game loops

### Session 4.1 — What's the Score?

Start with a question: "In your maze game, how would the computer remember your score?" He can't do it with what he knows. Introduce variables as **the computer's memory** — a labeled box that holds a number.

Build a **click-the-target game**: a sprite appears at random positions, you click it, score goes up by 1, it moves somewhere new. Timer counts down from 30.

Key blocks: `set [score] to 0`, `change [score] by 1`, `set [timer] to 30`.

### Session 4.2 — Catch Game

Build a proper **falling objects game**: objects fall from the sky, a basket/character moves with arrow keys, catching objects increases score, missing them costs a life. Three lives and you're out.

This combines: forever loops (game loop), conditionals (touching? hit bottom?), variables (score, lives), events (arrow keys).

**This is his first "real" game.** Let him feel that.

### Session 4.3 — Difficulty Ramp

Revisit the catch game: "How do we make it get harder?" Introduce the idea that variables can control game behavior:

```
set [speed] to 2
forever {
  change [speed] by 0.1  // gets faster over time
}
```

**Key insight:** Variables aren't just for score. They control *how the game behaves*. Speed, gravity, spawn rate — these are all just numbers you can change. This is a powerful idea.

**Tinker challenge:** Add a "power-up" object (different color) that slows things down or gives bonus points. This requires another conditional inside the game loop.

---

## Unit 5: Messaging & Multi-Sprite Coordination (2 sessions)
*Solving the "how do sprites talk to each other?" problem.*

**CS Concepts:** Broadcasting, message passing, event-driven coordination

### Session 5.1 — Boss Battle

Problem: "When the player's laser hits the enemy, the enemy should lose health. But the laser is one sprite and the enemy is another. How does the enemy *know* it got hit?"

Introduce `broadcast` and `when I receive`. Build a simple **space shooter**: ship at bottom, enemy at top, pressing space shoots a laser (new sprite or clone), when laser touches enemy → `broadcast [hit]` → enemy receives it, reduces health variable.

**Key insight:** Sprites are independent actors. They don't automatically know about each other. Broadcasting is how they communicate. This is a genuinely deep CS concept (message passing) delivered through a game he wants to build.

### Session 5.2 — Level Transitions

Add levels to the space shooter (or any prior game). When score hits a threshold → `broadcast [next level]` → backdrop changes, new enemies appear, difficulty increases.

**Tinker challenge:** Add a "Game Over" screen and a "You Win" screen using broadcasts and backdrop switches.

---

## Unit 6: Cloning & Spawning (2-3 sessions)
*The "whoa" unit.*

**CS Concepts:** Cloning (object instantiation), managing multiple instances, randomness

### Session 6.1 — Rain Machine

Show him: one raindrop sprite. `when green flag clicked → forever { create clone of myself }`. Each clone: starts at random x at top, falls, deletes when hitting bottom. Suddenly it's *raining*.

Let the "whoa" moment land. Then dissect it: the original sprite is a **factory**. Each clone is an independent copy that runs its own script.

### Session 6.2 — Space Invaders

Rebuild the space shooter, but now enemies are clones. One enemy sprite, cloning itself into a grid. Each clone moves independently. Player shoots, laser touches a clone, *that clone* deletes itself.

This is a substantial project. Break it into pieces:
1. Get the enemy grid spawning
2. Get the player shooting
3. Get the hit detection working
4. Add score

**Key insight:** Cloning lets you create *many* from *one*. You write the behavior once, and every copy follows it. This is the seed of object-oriented thinking.

**Tinker challenge:** Different enemy types (some take 2 hits, some shoot back). This requires clone-local variables — a meaty challenge.

---

## Unit 7: Abstraction & Custom Blocks (2 sessions)
*Teaching him to think in building blocks — which is how he already thinks physically.*

**CS Concepts:** Procedures, abstraction, decomposition, code reuse

### Session 7.1 — The Messy Code Problem

Pull up one of his bigger projects. The scripts are probably getting long and tangled. Ask: "If I asked you to change how the character jumps, where would you look?" He'll struggle to find it.

Introduce `My Blocks` (custom blocks). Refactor the jump into a `jump` block, the shooting into a `shoot` block. Suddenly the main game loop reads like plain language:

```
forever {
  if <key [left arrow] pressed?> then move-left
  if <key [right arrow] pressed?> then move-right
  if <key [space] pressed?> then shoot
}
```

**Analogy that'll click for him:** Custom blocks are like the sub-assemblies he builds with household items. You build the wheel separately, then just attach it to the car. You don't rebuild the wheel every time.

### Session 7.2 — Blocks with Inputs

Custom blocks can take parameters: `draw-polygon (sides) (size)`. Now one block can draw a triangle, square, pentagon — anything. Connect this back to Unit 2's spirograph: rewrite it using a custom `draw-shape` block.

**Tinker challenge:** Build a custom `make-enemy (speed) (health) (color)` block for the space game and use it to create different enemy types cleanly.

---

## Unit 8: Capstone Project (3-5 sessions)

**He designs and builds his own game from scratch.** Your role shifts to consultant.

### Session 8.1 — Design Doc (on paper)

Together, sketch out:
- What kind of game? (Platformer? Top-down adventure? Puzzle?)
- What does the player do?
- How do you win/lose?
- What sprites do you need?
- What variables do you need?

This is **algorithm design**. He's planning the logic before touching the computer.

### Sessions 8.2-8.4 — Build Sprint

He builds. You help when asked, but resist the urge to take over. When he gets stuck, ask questions instead of giving answers:
- "What should happen when those two things touch?"
- "How will the computer know when the player has won?"
- "What information does this sprite need to remember?"

### Session 8.5 — Playtest & Share

Have someone else play it (sibling, friend, other parent). Watch where they get confused or stuck. This teaches **user perspective** — another critical engineering skill.

---

## Concept Progression Summary

| Unit | Core Concept | Project |
|------|-------------|---------|
| 1 | Sequences, Events | Sound board, sprite skit |
| 2 | Loops, Parameters | Spirograph machine |
| 3 | Conditionals | Maze game, treasure hunt |
| 4 | Variables, Game state | Catch game with lives/score |
| 5 | Broadcasting | Space shooter with levels |
| 6 | Cloning | Space Invaders |
| 7 | Abstraction | Refactored game + reusable blocks |
| 8 | Everything | His own game |

---

## Practical Tips

**When he's stuck:** Don't explain — ask. "What do you *want* to happen? What's happening *instead*? Where could the problem be?" Debugging is the most valuable skill in programming, and it's a muscle built by struggling productively, not by being rescued.

**When he's bored:** Skip ahead. This curriculum is ordered by dependency, not difficulty. If he groks loops immediately, don't make him do three loop exercises. Move to conditionals. The catch game in Unit 4 will make him use loops anyway.

**When he wants to go off-script:** Let him. If he decides mid-Unit 3 that he wants to build a Pokemon battle simulator, help him figure out what concepts he needs and learn them in context. Motivation beats curriculum order every time.

**When he wants to show you something:** Stop everything and look at it. A kid sharing their creation is a kid who identifies as a creator. Protect that at all costs.
