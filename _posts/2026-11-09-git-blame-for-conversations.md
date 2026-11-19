---
title: "git blame, but for conversations"
subject:
layout: post_plain
type: Technology
---

**the short story:**

Last week I wrote a brief post about how the future of agentic editing is [multiplayer](/2026/11/05/the-future-is-multiplayer.html). I believe in the same way that
git allowed multiplayer editing before, we need to build a new primitive that syncs the conversations along with the file changes.

I have prototyped a tool ([loch](https://github.com/ness-dev/loch)) which hooks into claude code (other harnesses coming soon) and tracks file changes per conversation
turn. You can `loch blame <file>` to figure out which agent made a change, and `loch ask <file:line>` to resume the conversation that made the change.

In its current state it's useful for:

 1. Re-addressing an agent if a problem comes up. New bugs can be fixed with the context of the previous agent
 2. Reviewing a colleague's chat alongside their change

In the future I intend to add:

 1. Easy tooling so that a new agent can ask the old one in a "subagent" pattern
 2. Harness agnostic. The chat logs are already stored agnostically, but I only built the transformer for claude code JSONLs
 3. Integration into [ness](https://getness.dev) and vscode-likes so that you can see the blames in-context

---

**the slightly less short story:**

In [the future is multiplayer](/2026/11/05/the-future-is-multiplayer.html) I said we are going to be checking in our conversations. 

More and more I find myself wishing I could just talk to the chat who made a change to figure out the context, to debug a new issue,
or to continue a conversation when I have feedback in a pull request. So I built [loch](https://github.com/ness-dev/loch).

**1. hook it up**

```terminal
loch install     # Installs hooks into claude code (other harnesses coming soon)
loch backfill    # Attempts to link previous chats based on all of your locally stored sessions
```

Conversations are stored and compressed into `.loch/`. They can be synced to a shared S3 backend if you'd like to share with teammates. WARNING: I 
try to clean secrets out of chat logs, but it's obviously not 100% successful. I really recommend you just don't give agents access to secrets.

From there, two basic primitives have been added on top:

**2. blame a file**

```terminal
$ loch blame myfile.py
loch/format.py
        1-2  45b565e  Add loch format v1 and the Claude Code ingest converter
                      session 37d467e5 — asked: "I would prefer this tool to be agnostic of the editor that surrounds it…"
     19-100  6eb7b0d  Canonicalize per RFC 8785, fold agent events into facts
                      session 37d467e5 — asked: "honeslty none of those seem like open questions they all seem like you …"
```

Instead of just a commit and an author, every block of lines comes with the request that led to it. Typos included.

**3. ask it (or resume a chat)**

```terminal
$ loch ask myfile.py:105 "why did you write this by hand instead of using json.dumps?"
forked session 37d467e5, which made 6eb7b0d, to its end: 765 records, as e87ec144-3a54-4d0e-8cd4-a30e2d2cc020

  ⋮ (the rest of the original conversation)

> why did you write this by hand instead of using json.dumps?

⏺ I wrote format.canonical by hand because json.dumps doesn't match RFC 8785: it
  prints floats in Python's exponent forms (1e-05 instead of 0.00001), sorts keys by
  code point instead of UTF-16 code units, and writes lone surrogates raw instead of
  escaping them, so a second implementation in another language couldn't reproduce
  the ids byte for byte.
```

It forks the original conversation (rather than resuming it) and will allow you to speak to an agent that has exactly the same context.

---

So far this is very experimental. I would love people's thoughts on this direction.
