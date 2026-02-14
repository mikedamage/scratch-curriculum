# Unit 8: Capstone Project (3-5 sessions)

**He designs and builds his own game from scratch.** Your role shifts to consultant.

---

## Session 8.1 — Design Doc (on paper)

Together, sketch out:
- What kind of game? (Platformer? Top-down adventure? Puzzle?)
- What does the player do?
- How do you win/lose?
- What sprites do you need?
- What variables do you need?

This is **algorithm design**. He's planning the logic before touching the computer.

### Prompts to Help Him Think It Through

Don't fill in the answers — ask the questions and let him work through them:

- "When the player does [action], what should happen?"
- "How will the computer know when you've won? What number or condition means 'you win'?"
- "List every sprite you need. For each one, what does it do?"
- "What numbers does the game need to remember?" (These are his variables.)
- "What messages need to pass between sprites?" (These are his broadcasts.)

### Example: Skeleton Design Doc

If he's unsure how to start, walk through an example together (but let him pick his own game):

```
Game: Dungeon Escape
Goal: Reach the exit of each room before time runs out

Sprites:
- Player (arrow key movement)
- Key (collect to open door)
- Door (opens when key is collected)
- Enemies (move in patterns, touching = lose a life)
- Timer display

Variables:
- lives (starts at 3)
- has-key (0 or 1)
- level (starts at 1)
- time-left (counts down)

Broadcasts:
- "key collected" → door opens
- "door reached" → next level
- "game over" → game over screen
- "you win" → win screen

Backdrops:
- Room 1, Room 2, Room 3, Game Over, You Win
```

He can draw the rooms, sketch the sprites, and map out the flow on paper. This is the hardest and most valuable part — resist the urge to jump to the computer.

---

## Sessions 8.2-8.4 — Build Sprint

He builds. You help when asked, but resist the urge to take over.

### Suggested Build Order

For any game, this sequence generally works:

1. **Get the player moving.** Arrow keys, basic movement, feels good.
2. **Build one room/level.** Paint the backdrop, place the sprites.
3. **Add the core mechanic.** Whatever makes the game a game (collecting, shooting, avoiding, solving).
4. **Add win/lose conditions.** Variables for lives/score, game over screen.
5. **Polish.** Sounds, animations, extra levels, difficulty ramp.

### When He Gets Stuck — Questions, Not Answers

- "What should happen when those two things touch?"
- "How will the computer know when the player has won?"
- "What information does this sprite need to remember?"
- "Is there a game we already built that did something like this?"
- "Can you break this into a smaller problem?"

### Quick Reference: Common Patterns He's Learned

These are patterns from earlier units he might need to recall:

**Arrow key movement** (Unit 3):
```
forever
  if <key [right arrow v] pressed?> then
    change x by (5)
  end
  if <key [left arrow v] pressed?> then
    change x by (-5)
  end
  if <key [up arrow v] pressed?> then
    change y by (5)
  end
  if <key [down arrow v] pressed?> then
    change y by (-5)
  end
end
```

**Collision detection** (Unit 3):
```
if <touching color [#ff0000]?> then
  // do something
end
if <touching [Sprite v]?> then
  // do something
end
```

**Countdown timer** (Unit 4):
```
set [time left v] to (30)
repeat until <(time left) = (0)>
  wait (1) seconds
  change [time left v] by (-1)
end
```

**Spawning with clones** (Unit 6):
```
when green flag clicked
hide
forever
  create clone of [myself v]
  wait (1) seconds
end

when I start as a clone
// set up position, behavior
show
// do stuff
delete this clone
```

**Sprite communication** (Unit 5):
```
// Sender:
broadcast [event name v]

// Receiver:
when I receive [event name v]
// respond
```

---

## Session 8.5 — Playtest & Share

Have someone else play it (sibling, friend, other parent). Watch where they get confused or stuck. This teaches **user perspective** — another critical engineering skill.

### Playtest Prompts

While watching someone play, he should notice:
- Did they understand what to do without being told?
- Where did they get stuck?
- Was anything too easy or too hard?
- Did anything break?

After the playtest, he picks 2-3 things to fix or improve. This is iteration — the last and most professional step in the engineering process.

### Sharing on Scratch

If he wants to share it with the world, he can publish it on the Scratch community site (scratch.mit.edu). Other kids can play it, remix it, and comment on it. This is optional but can be hugely motivating — real people playing his game.
