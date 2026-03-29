+++
title = "Threads"
weight = 1
+++

Sable has full support for Matrix threads, letting you have focused side conversations without cluttering the main room timeline.

# Thread Drawer

Click any **thread chip** (the reply count shown below a threaded message) to open the thread drawer on the right side of the screen. Inside the drawer you can:

- Read all replies in the thread
- Send replies, edit your own messages, and add reactions
- Use the emoji picker and sticker picker
- Press **↑** (up arrow) in the compose box to edit your last message in the thread

The original message (thread root) is shown at the top of the drawer. Long root messages have a scrollable preview capped at 200px so replies are always reachable.

# Thread Browser

Click the **Threads** button in the room header to open the thread browser. This lists all threads in the current room with a preview of the latest reply and an unread badge if you have unread replies.

Click a thread preview to open it in the drawer. Use the **Jump** button on a thread preview to jump directly to the thread root in the main timeline.

Use the **Load more** button at the bottom of the thread browser to fetch threads that are older than what is currently loaded locally.

# Unread Badges

Thread chips on messages show an unread badge when there are new replies you haven't read. The thread browser list also shows per-thread unread counts.

# Notifications

Clicking an inbox notification for a thread reply automatically opens the correct thread drawer in the right room.

> **Note:** Threads require your homeserver to support the Matrix threads specification (Synapse 1.75+ or equivalent). On servers without thread support, replies will still be visible in the main timeline as regular replies.
