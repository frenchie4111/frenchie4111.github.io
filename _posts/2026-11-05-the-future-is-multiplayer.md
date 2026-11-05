---
title: "The future is multiplayer"
subject:
layout: post_plain
type: Technology
---

**the short story:**

In the future we are going to be checking in all of our conversations, I have started trying to figure out what that might be shaped like with [loch](https://github.com/ness-dev/loch). I would love to see other people's take on the same idea.

---

**the slightly less short story:**

It is inevitable that multiplayer agent chats are the future of software development. **In my private harness I have had multiplayer chats for months**. Being able to jump in to someone's conversation with a question, being able to pick up where they left off, or make slight tweaks to their implementation. These are all huge unlocks, and hard to lose once you get used to them.

The more I feel around the edges of this problem, the more it feels like we are going to need a git-like tool for managing conversations. Software has always worked best by building sharp, specialized software at each layer of abstraction (rather than single vertically integrated monoliths)

The tool is going to need to do these basic things:

1. Store conversation history indefinitely
    1. Both sides of the conversation
    2. Enough metadata to be able to attribute every message (action) in the system to an actor
2. Allow for N-actors in a conversation
    1. Conversation participants can be agents or humans
3. Allow for forking conversations
    1. Two actors should be able to continue a conversation in parallel, without causing any immediate problems
    2. Conversations will need to be mergable
        1. Multiple merging strategies will be supported
4. Allow for storing file / binary artifacts alongside conversations & tools
    1. _Unclear if git is suitable for this half of the task_

The tool should not:

1. Be an editor or chat harness itself
    1. The tool exists to manage other chat histories, not to run them itself
    2. The tool is primarily used to handle the business logic of the chat history manipulation, not to be a human based interface on top of that
        1. With the exception that some choices will need to be made in favor of the upstream UX
2. Have a favoritism or opinion on harness
    1. There's a chance that outside of a few main harnesses, we can allow anyone to integrate their own harness in to the tool

Requirements last edited 11/5/2026

Using this set (probably evolving over time) of requirements I am spinning up a new project called [loch]. Loch will be an exploration into what a tool shaped like this would be. If you are still reading this message then loch is still experimental, and should not be used for anything other than curiosity.

[loch]: https://github.com/ness-dev/loch
